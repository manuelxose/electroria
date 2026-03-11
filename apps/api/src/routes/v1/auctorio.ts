import type { Request } from "express";
import { Router } from "express";
import { z } from "zod";
import { env } from "../../config/env.js";
import { pool } from "../../db/pool.js";
import { createRateLimiter, getClientIp } from "../../lib/http.js";
import { createHmacSha256, safeCompare } from "../../lib/security.js";

const router = Router();
const webhookLimiter = createRateLimiter(
  env.RATE_LIMIT_AUCTORIO_MAX,
  env.RATE_LIMIT_AUCTORIO_WINDOW_MS
);

const PublicationEventSchema = z.object({
  site: z.record(z.string(), z.unknown()).optional(),
  project: z.object({
    id: z.string().optional(),
    slug: z.string().optional(),
    title: z.string().optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
  }),
  version: z.object({
    title: z.string().min(1),
    excerpt: z.string().optional(),
    bodyHtml: z.string().min(1),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
  publication: z.object({
    action: z.enum(["publishDraft", "updateDraft", "publish", "unpublish"]),
    targetStatus: z.enum(["draft", "publish"]).nullable().optional(),
    externalId: z.string().optional(),
  }),
  assetUrl: z.string().url().nullable().optional(),
});

router.post("/publish", async (req: Request & { rawBody?: string }, res) => {
  const clientIp = getClientIp(req);
  const limitResult = webhookLimiter.consume(`auctorio:${clientIp}`);
  res.setHeader("X-RateLimit-Remaining", String(limitResult.remaining));

  if (!limitResult.allowed) {
    res.setHeader("Retry-After", String(Math.ceil(limitResult.retryAfterMs / 1000)));
    res.status(429).json({
      code: "RATE_LIMITED",
      message: "Too many webhook requests",
    });
    return;
  }

  if (!env.AUCTORIO_WEBHOOK_SECRET) {
    res.status(503).json({
      code: "AUCTORIO_NOT_CONFIGURED",
      message: "Auctorio webhook is not configured",
    });
    return;
  }

  const signature = String(req.header("x-content-signature") || "").trim();
  const rawBody = req.rawBody || JSON.stringify(req.body || {});
  const expectedSignature = createHmacSha256(env.AUCTORIO_WEBHOOK_SECRET, rawBody);

  if (!signature || !safeCompare(signature, expectedSignature)) {
    res.status(401).json({
      code: "INVALID_SIGNATURE",
      message: "Invalid webhook signature",
    });
    return;
  }

  const parsed = PublicationEventSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      code: "INVALID_PAYLOAD",
      message: "Invalid publication payload",
      details: parsed.error.flatten(),
    });
    return;
  }

  const event = parsed.data;
  const metadata = event.project.metadata || {};
  const explicitSlug = sanitizeSlug(String(metadata["slug"] || ""));
  const projectSlug = sanitizeSlug(String(event.project.slug || ""));
  const titleSlug = slugify(event.version.title);
  const slug = explicitSlug || projectSlug || titleSlug;
  const tags = extractTags(metadata["tags"], metadata["categories"]);
  const categorySlug = sanitizeSlug(String(metadata["categorySlug"] || "")) || "cuadros-electricos";
  const author = String(metadata["author"] || env.ELECTRORIA_SITE_NAME).trim() || env.ELECTRORIA_SITE_NAME;
  const externalId =
    String(event.publication.externalId || "").trim() ||
    String(event.project.id || "").trim() ||
    slug;
  const shouldPublish = event.publication.action === "publish";
  const status =
    event.publication.action === "unpublish"
      ? "unpublished"
      : shouldPublish
        ? "published"
        : "draft";
  const publishedAt = shouldPublish ? new Date().toISOString() : null;
  const sourceUrl = String(metadata["sourceUrl"] || "").trim() || null;

  const query = await pool.query(
    `INSERT INTO blog_posts (
       slug,
       title,
       short_description,
       content,
       body_html,
       image,
       featured_image,
       tags,
       author,
       category_slug,
       seo_title,
       seo_description,
       status,
       external_id,
       published_at,
       source_url,
       metadata
     ) VALUES (
       $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17
     )
     ON CONFLICT (slug) DO UPDATE SET
       title = EXCLUDED.title,
       short_description = EXCLUDED.short_description,
       content = EXCLUDED.content,
       body_html = EXCLUDED.body_html,
       image = EXCLUDED.image,
       featured_image = EXCLUDED.featured_image,
       tags = EXCLUDED.tags,
       author = EXCLUDED.author,
       category_slug = EXCLUDED.category_slug,
       seo_title = EXCLUDED.seo_title,
       seo_description = EXCLUDED.seo_description,
       status = EXCLUDED.status,
       external_id = EXCLUDED.external_id,
       published_at = CASE
         WHEN EXCLUDED.status = 'published' THEN COALESCE(EXCLUDED.published_at, blog_posts.published_at, NOW())
         WHEN EXCLUDED.status = 'unpublished' THEN NULL
         ELSE blog_posts.published_at
       END,
       source_url = EXCLUDED.source_url,
       metadata = EXCLUDED.metadata,
       updated_at = NOW()
     RETURNING
       id,
       slug,
       status,
       external_id AS "externalId",
       COALESCE(published_at, created_at) AS "publishedAt"`,
    [
      slug,
      event.version.title,
      String(event.version.excerpt || "").trim(),
      event.version.bodyHtml,
      event.version.bodyHtml,
      event.assetUrl ?? null,
      event.assetUrl ?? null,
      tags,
      author,
      categorySlug,
      String(event.version.seoTitle || "").trim() || null,
      String(event.version.seoDescription || "").trim() || null,
      status,
      externalId,
      publishedAt,
      sourceUrl,
      JSON.stringify({
        projectId: event.project.id || null,
        publication: event.publication,
        site: event.site || null,
        metadata,
      }),
    ]
  );

  res.json({
    ok: true,
    action: event.publication.action,
    status,
    id: query.rows[0].id,
    externalId: query.rows[0].externalId,
    slug: query.rows[0].slug,
    publishedAt: query.rows[0].publishedAt,
    url:
      status === "published"
        ? `${env.ELECTRORIA_SITE_URL.replace(/\/$/, "")}/blog/${query.rows[0].slug}`
        : null,
  });
});

function sanitizeSlug(value: string): string {
  return value.trim().replace(/^\/+|\/+$/g, "");
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractTags(...sources: unknown[]): string[] {
  const values = sources.flatMap((source) => {
    if (Array.isArray(source)) {
      return source.map((item) => String(item).trim()).filter(Boolean);
    }

    if (typeof source === "string") {
      return source
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  });

  return Array.from(new Set(values));
}

export default router;
