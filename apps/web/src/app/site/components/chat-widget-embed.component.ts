import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { Component, DestroyRef, Inject, OnInit, PLATFORM_ID, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { environment } from "src/environments/environment";

type WidgetRuntimeConfig = {
  chatWidgetEnabled?: boolean;
  chatWidgetBaseUrl?: string;
  chatWidgetApiBaseUrl?: string;
  chatWidgetSiteKey?: string;
};

type WidgetWindow = Window &
  typeof globalThis & {
    TalkarisWidgetConfig?: {
      siteKey: string;
      apiBase: string;
      widgetBaseUrl: string;
      widgetOrigin: string;
      brandLabel: string;
      sourceSite: string;
      contactUrl: string;
      entryContext: string;
    };
    __ELECTRORIA_RUNTIME__?: WidgetRuntimeConfig;
  };

@Component({
  selector: "app-chat-widget-embed",
  standalone: true,
  template: "",
})
export class ChatWidgetEmbedComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly scriptId = "electroria-talkaris-widget-loader";
  private readonly allowedPrefixes = ["/servicios", "/blog", "/contacto"];

  constructor(
    private readonly router: Router,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.syncWidgetForUrl(this.router.url);

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event) => {
        this.syncWidgetForUrl(event.urlAfterRedirects || event.url);
      });
  }

  private syncWidgetForUrl(url: string): void {
    const runtime = this.getRuntimeConfig();
    if (!runtime.chatWidgetEnabled) {
      this.unmountWidget(runtime.chatWidgetBaseUrl ?? "");
      return;
    }

    const widgetBaseUrl = this.resolveWidgetBaseUrl(runtime.chatWidgetBaseUrl ?? "");
    const apiBase = (runtime.chatWidgetApiBaseUrl ?? "").trim();
    const siteKey = (runtime.chatWidgetSiteKey ?? "").trim();
    const path = this.normalizePath(url);

    if (!widgetBaseUrl || !apiBase || !siteKey || !this.shouldRenderForPath(path)) {
      this.unmountWidget(widgetBaseUrl);
      return;
    }

    this.unmountWidget(widgetBaseUrl);

    const view = this.document.defaultView as WidgetWindow | null;
    if (view) {
      view.TalkarisWidgetConfig = {
        siteKey,
        apiBase,
        widgetBaseUrl,
        widgetOrigin: widgetBaseUrl,
        brandLabel: "Electroria",
        sourceSite: "electroria.com",
        contactUrl: "/contacto",
        entryContext: this.resolveEntryContext(path),
      };
    }

    const script = this.document.createElement("script");
    script.id = this.scriptId;
    script.async = true;
    script.src = new URL("embed.js", widgetBaseUrl).toString();
    script.dataset["siteKey"] = siteKey;
    script.dataset["apiBase"] = apiBase;
    script.dataset["widgetBaseUrl"] = widgetBaseUrl;
    script.dataset["widgetOrigin"] = widgetBaseUrl;
    script.dataset["brandLabel"] = "Electroria";
    script.dataset["sourceSite"] = "electroria.com";
    script.dataset["contactUrl"] = "/contacto";
    script.dataset["entryContext"] = this.resolveEntryContext(path);
    this.document.body.appendChild(script);
  }

  private getRuntimeConfig(): Required<WidgetRuntimeConfig> {
    const view = this.document.defaultView as WidgetWindow | null;
    const runtime = view?.__ELECTRORIA_RUNTIME__ ?? {};

    return {
      chatWidgetEnabled:
        runtime.chatWidgetEnabled ?? (environment.chatWidgetEnabled as boolean | undefined) ?? false,
      chatWidgetBaseUrl:
        runtime.chatWidgetBaseUrl ?? (environment.chatWidgetBaseUrl as string | undefined) ?? "",
      chatWidgetApiBaseUrl:
        runtime.chatWidgetApiBaseUrl
        ?? (environment.chatWidgetApiBaseUrl as string | undefined)
        ?? "",
      chatWidgetSiteKey:
        runtime.chatWidgetSiteKey ?? (environment.chatWidgetSiteKey as string | undefined) ?? "",
    };
  }

  private resolveWidgetBaseUrl(value: string): string {
    if (!value) {
      return "";
    }

    const widgetUrl = new URL(value, this.document.baseURI);
    widgetUrl.hash = "";
    widgetUrl.search = "";
    if (!widgetUrl.pathname.endsWith("/")) {
      widgetUrl.pathname = `${widgetUrl.pathname}/`;
    }
    return widgetUrl.toString();
  }

  private normalizePath(url: string): string {
    const trimmed = (url || "/").trim();
    if (!trimmed || trimmed === "/") {
      return "/";
    }

    const normalized = trimmed.split("?")[0]?.split("#")[0] || "/";
    return normalized.endsWith("/") && normalized !== "/" ? normalized.slice(0, -1) : normalized;
  }

  private shouldRenderForPath(path: string): boolean {
    if (path === "/") {
      return true;
    }

    return this.allowedPrefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
  }

  private resolveEntryContext(path: string): string {
    if (path === "/") {
      return "electroria-home";
    }
    if (path === "/contacto") {
      return "electroria-contacto";
    }
    if (path.startsWith("/servicios")) {
      return "electroria-servicios";
    }
    if (path.startsWith("/blog")) {
      return "electroria-blog";
    }
    return "electroria-corporativo";
  }

  private unmountWidget(widgetBaseUrl: string): void {
    this.document.getElementById(this.scriptId)?.remove();

    const frameOrigin = widgetBaseUrl ? new URL(widgetBaseUrl).origin : "";
    Array.from(this.document.querySelectorAll("iframe")).forEach((node) => {
      const iframe = node as HTMLIFrameElement;
      const src = iframe.src || "";
      if (src.includes("frame.html") && (!frameOrigin || src.startsWith(frameOrigin))) {
        iframe.remove();
      }
    });
  }
}
