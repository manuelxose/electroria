import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { environment } from "src/environments/environment";

export type ConsentDecision = "granted" | "denied" | null;

const CONSENT_STORAGE_KEY = "electroria-consent";
const GA_SCRIPT_ID = "electroria-ga4-loader";

type AnalyticsWindow = Window &
  typeof globalThis & {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  };

/**
 * Privacidad por diseño: la etiqueta de medición no se carga hasta que
 * el usuario otorga consentimiento explícito desde el banner.
 */
@Injectable({ providedIn: "root" })
export class AnalyticsService {
  private enabled = false;
  private measurementId = "";
  private bootstrapped = false;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  bootstrap(): void {
    if (this.bootstrapped || !isPlatformBrowser(this.platformId)) {
      return;
    }

    this.bootstrapped = true;
    const runtime = this.document.defaultView?.__ELECTRORIA_RUNTIME__;
    this.enabled =
      runtime?.analyticsEnabled ??
      (environment.analyticsEnabled as boolean | undefined) ??
      false;
    this.measurementId = (
      runtime?.analyticsMeasurementId ??
      (environment.analyticsMeasurementId as string | undefined) ??
      ""
    ).trim();

    if (this.enabled && this.measurementId && this.readConsent() === "granted") {
      this.loadGoogleTag();
    }
  }

  isEnabled(): boolean {
    return this.enabled && Boolean(this.measurementId);
  }

  hasConsent(): ConsentDecision {
    return this.readConsent();
  }

  grantConsent(decision: Exclude<ConsentDecision, null>): void {
    this.storeConsent(decision);

    if (decision === "granted") {
      this.loadGoogleTag();
    }
  }

  trackEvent(name: string, params: Record<string, unknown> = {}): void {
    if (!this.isEnabled() || this.readConsent() !== "granted") {
      return;
    }

    const view = this.document.defaultView as AnalyticsWindow | null;
    view?.gtag?.("event", name, params);
  }

  private loadGoogleTag(): void {
    if (!this.isEnabled()) {
      return;
    }

    if (this.document.getElementById(GA_SCRIPT_ID)) {
      return;
    }

    const view = this.document.defaultView as AnalyticsWindow | null;
    if (!view) {
      return;
    }

    view.dataLayer = view.dataLayer ?? [];
    const gtag = (...args: unknown[]) => {
      view.dataLayer?.push(args);
    };
    view.gtag = gtag;
    gtag("js", new Date());
    gtag("config", this.measurementId, { anonymize_ip: true });

    const script = this.document.createElement("script");
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
      this.measurementId
    )}`;
    this.document.head.appendChild(script);
  }

  private readConsent(): ConsentDecision {
    if (typeof localStorage === "undefined") {
      return null;
    }

    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    return raw === "granted" || raw === "denied" ? raw : null;
  }

  private storeConsent(decision: Exclude<ConsentDecision, null>): void {
    if (typeof localStorage === "undefined") {
      return;
    }

    localStorage.setItem(CONSENT_STORAGE_KEY, decision);
  }
}
