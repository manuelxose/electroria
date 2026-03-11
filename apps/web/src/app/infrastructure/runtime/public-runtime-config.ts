export type PublicRuntimeConfig = {
  googleClientId?: string;
  chatWidgetEnabled?: boolean;
  chatWidgetBaseUrl?: string;
  chatWidgetApiBaseUrl?: string;
  chatWidgetSiteKey?: string;
  turnstileEnabled?: boolean;
  turnstileSiteKey?: string;
};

declare global {
  interface Window {
    __ELECTRORIA_RUNTIME__?: PublicRuntimeConfig;
  }
}

export function getPublicRuntimeConfig(): PublicRuntimeConfig {
  if (typeof window === "undefined") {
    return {};
  }

  return window.__ELECTRORIA_RUNTIME__ ?? {};
}
