import { CommonEngine } from "@angular/ssr/node";
import express from "express";
import http from "node:http";
import https from "node:https";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import bootstrap from "./src/main.server";
import {
  buildBreadcrumbItems,
  getBlogCategoryBySlug,
  getBlogPostBySlug,
  getInfoPageByKey,
  getServiceBySlug,
  goneRoutes,
  legacyRedirects,
  publicStaticPaths,
  SITE_URL,
} from "./src/app/site/content/site-content";

type BlogListResponse = {
  items?: Array<{
    slug?: string;
  }>;
};

type CachedBlogSlugs = {
  slugs: Set<string>;
  cachedAt: number;
};

const BLOG_SLUG_CACHE_TTL_MS = 60_000;
let cachedBlogSlugs: CachedBlogSlugs = {
  slugs: new Set<string>(),
  cachedAt: 0,
};

function getApiInternalUrl(): URL {
  return new URL(process.env["API_INTERNAL_URL"] || "http://127.0.0.1:3001");
}

function getCanonicalHost(): string {
  return (process.env["CANONICAL_HOST"] || "electroria.com").trim();
}

function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value === null || value.trim() === "") {
    return fallback;
  }

  return value.toLowerCase() === "true";
}

function normalizePath(path: string): string {
  if (!path || path === "/") {
    return "/";
  }

  const clean = path.split("?")[0]?.split("#")[0] || "/";
  return clean.endsWith("/") ? clean.slice(0, -1) || "/" : clean;
}

function getPublicRuntimeConfig() {
  return {
    chatWidgetEnabled: parseBoolean(process.env["CHAT_WIDGET_ENABLED"], true),
    chatWidgetBaseUrl:
      process.env["CHAT_WIDGET_BASE_URL"] || "https://talkaris.com/widget/",
    chatWidgetApiBaseUrl:
      process.env["CHAT_WIDGET_API_BASE_URL"] || "https://talkaris.com/api",
    chatWidgetSiteKey:
      process.env["CHAT_WIDGET_SITE_KEY"] || "electroria-public-site-key",
    turnstileEnabled: parseBoolean(process.env["TURNSTILE_ENABLED"], false),
    turnstileSiteKey: process.env["TURNSTILE_SITE_KEY"] || "",
  };
}

function proxyToApi(targetBase: URL): express.RequestHandler {
  return (req, res) => {
    const targetUrl = new URL(req.originalUrl, targetBase);
    const transport = targetUrl.protocol === "https:" ? https : http;

    const upstream = transport.request(
      targetUrl,
      {
        method: req.method,
        headers: {
          ...req.headers,
          host: targetUrl.host,
          "x-forwarded-host": req.headers.host ?? "",
          "x-forwarded-proto": req.protocol,
        },
      },
      (upstreamResponse) => {
        res.status(upstreamResponse.statusCode || 502);

        Object.entries(upstreamResponse.headers).forEach(([key, value]) => {
          if (value !== undefined) {
            res.setHeader(key, value as string | string[]);
          }
        });

        upstreamResponse.pipe(res);
      }
    );

    upstream.on("error", (error) => {
      console.error("API proxy error:", error);
      if (!res.headersSent) {
        res.status(503).json({
          code: "API_UNAVAILABLE",
          message: "La API no está disponible en este momento.",
        });
      }
    });

    req.pipe(upstream);
  };
}

function findLegacyRedirect(path: string) {
  const originalPath = path.endsWith("/") ? path : `${path}/`;
  return legacyRedirects.find((entry) => entry.from === originalPath || entry.from === path);
}

function isGoneRoute(path: string): boolean {
  return goneRoutes.some((entry) => path === entry || path.startsWith(`${entry}/`));
}

async function fetchPublishedBlogSlugs(apiTarget: URL): Promise<Set<string>> {
  const now = Date.now();
  if (now - cachedBlogSlugs.cachedAt < BLOG_SLUG_CACHE_TTL_MS && cachedBlogSlugs.slugs.size) {
    return cachedBlogSlugs.slugs;
  }

  try {
    const response = await fetch(new URL("/api/v1/blog", apiTarget));
    if (!response.ok) {
      return cachedBlogSlugs.slugs;
    }

    const payload = (await response.json()) as BlogListResponse;
    const slugs = new Set<string>();
    (payload.items ?? []).forEach((item) => {
      const slug = String(item.slug ?? "").trim();
      if (slug) {
        slugs.add(slug);
      }
    });

    if (slugs.size) {
      cachedBlogSlugs = {
        slugs,
        cachedAt: now,
      };
    }

    return cachedBlogSlugs.slugs;
  } catch {
    return cachedBlogSlugs.slugs;
  }
}

async function resolveStatusCode(path: string, apiTarget: URL): Promise<number> {
  if (publicStaticPaths.includes(path)) {
    return 200;
  }

  if (path.startsWith("/servicios/")) {
    const slug = path.split("/")[2] || "";
    return getServiceBySlug(slug) ? 200 : 404;
  }

  if (path.startsWith("/blog/categoria/")) {
    const slug = path.split("/")[3] || "";
    return getBlogCategoryBySlug(slug) ? 200 : 404;
  }

  if (path.startsWith("/blog/")) {
    const slug = path.split("/")[2] || "";
    if (getBlogPostBySlug(slug)) {
      return 200;
    }

    const apiSlugs = await fetchPublishedBlogSlugs(apiTarget);
    return apiSlugs.has(slug) ? 200 : 404;
  }

  const infoPageKeys = ["empresa", "zonas", "proyectos", "certificaciones", "aviso-legal", "privacidad", "cookies"];
  if (infoPageKeys.includes(path.slice(1))) {
    return getInfoPageByKey(path.slice(1)) ? 200 : 404;
  }

  return 404;
}

async function buildSitemapXml(apiTarget: URL): Promise<string> {
  const apiSlugs = await fetchPublishedBlogSlugs(apiTarget);
  const dynamicPaths = Array.from(apiSlugs)
    .filter((slug) => !getBlogPostBySlug(slug))
    .map((slug) => `/blog/${slug}`);
  const allPaths = Array.from(new Set([...publicStaticPaths, ...dynamicPaths])).sort();
  const timestamp = new Date().toISOString();

  const xmlItems = allPaths
    .map((path) => {
      const url = `${SITE_URL}${path === "/" ? "" : path}`;
      return `<url><loc>${escapeXml(url)}</loc><lastmod>${timestamp}</lastmod></url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlItems}</urlset>`;
}

function buildRobotsTxt(): string {
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /uploads/",
    "Disallow: /404",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function shouldRedirectToCanonicalHost(hostname: string): boolean {
  const canonicalHost = getCanonicalHost();
  return Boolean(canonicalHost && hostname === `www.${canonicalHost}`);
}

export function app(): express.Express {
  const server = express();
  server.set("trust proxy", 1);

  const commonEngine = new CommonEngine();
  const port = process.env["PORT"] || 4000;
  const apiTarget = getApiInternalUrl();
  const serverDistPath = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistPath, "../browser");
  const indexHtml = join(serverDistPath, "index.server.html");

  server.get("/health", (_req, res) => {
    res.json({
      ok: true,
      service: "electroria-web",
      timestamp: new Date().toISOString(),
    });
  });

  server.get("/robots.txt", (_req, res) => {
    res.type("text/plain").send(buildRobotsTxt());
  });

  server.get("/sitemap.xml", async (_req, res) => {
    const xml = await buildSitemapXml(apiTarget);
    res.type("application/xml").send(xml);
  });

  server.use("/api", proxyToApi(apiTarget));
  server.use("/uploads", proxyToApi(apiTarget));

  server.get(
    "*.*",
    express.static(browserDistFolder, {
      maxAge: "1y",
      immutable: true,
    })
  );

  server.get("*", async (req, res) => {
    const normalizedPath = normalizePath(req.path);
    const hostname = req.hostname;

    if (shouldRedirectToCanonicalHost(hostname)) {
      const canonicalHost = getCanonicalHost();
      res.redirect(301, `${req.protocol}://${canonicalHost}${req.originalUrl}`);
      return;
    }

    const legacyRedirect = findLegacyRedirect(req.path);
    if (legacyRedirect) {
      res.redirect(legacyRedirect.statusCode, legacyRedirect.to);
      return;
    }

    if (normalizedPath !== "/" && req.path.endsWith("/")) {
      res.redirect(301, normalizedPath);
      return;
    }

    if (isGoneRoute(normalizedPath)) {
      res.status(410).type("text/plain").send("Gone");
      return;
    }

    const statusCode = await resolveStatusCode(normalizedPath, apiTarget);
    const incomingHost = req.headers.host || `localhost:${port}`;
    const renderUrl = `${req.protocol}://${incomingHost}${req.originalUrl}`;

    try {
      const html = await commonEngine.render({
        bootstrap,
        documentFilePath: indexHtml,
        url: renderUrl,
        publicPath: browserDistFolder,
      });

      const runtimeScript = `<script>window.__ELECTRORIA_RUNTIME__=${JSON.stringify(
        getPublicRuntimeConfig()
      )};</script>`;

      res.status(statusCode);
      res.setHeader("Cache-Control", "no-store");
      res.send(html.replace("</head>", `${runtimeScript}</head>`));
    } catch (error) {
      console.error("SSR Error:", error);
      res.status(500).send("Error rendering page");
    }
  });

  return server;
}

function run(): void {
  const port = process.env["PORT"] || 4000;
  const server = app();

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
