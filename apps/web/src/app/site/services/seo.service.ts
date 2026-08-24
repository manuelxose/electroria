import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import {
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE,
  SITE_REGION,
  SITE_TAGLINE,
  SITE_URL,
} from "../content/site-content";

export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  type?: "website" | "article";
  image?: string;
  articlePublishedAt?: string;
  articleModifiedAt?: string;
  schemas?: Record<string, unknown>[];
}

@Injectable({ providedIn: "root" })
export class SeoService {
  private jsonLdNodes: HTMLScriptElement[] = [];

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  update(config: SeoConfig): void {
    const pageTitle = `${config.title} | ${SITE_NAME}`;
    const canonicalUrl = `${SITE_URL}${config.path === "/" ? "" : config.path}`;

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: "description", content: config.description });
    this.meta.updateTag({
      name: "robots",
      content: config.noIndex ? "noindex, nofollow" : "index, follow",
    });
    this.meta.updateTag({ name: "author", content: SITE_NAME });
    this.meta.updateTag({ name: "theme-color", content: "#101a2e" });
    this.meta.updateTag({ name: "application-name", content: SITE_NAME });
    this.meta.updateTag({ property: "og:title", content: pageTitle });
    this.meta.updateTag({
      property: "og:description",
      content: config.description,
    });
    this.meta.updateTag({
      property: "og:type",
      content: config.type ?? "website",
    });
    this.meta.updateTag({ property: "og:url", content: canonicalUrl });
    this.meta.updateTag({ property: "og:site_name", content: SITE_NAME });
    this.meta.updateTag({ property: "og:locale", content: "es_ES" });

    const image = config.image ?? `${SITE_URL}/assets/images/og-default.png`;
    this.meta.updateTag({ property: "og:image", content: image });
    this.meta.updateTag({ property: "og:image:alt", content: config.title });
    this.meta.updateTag({ name: "twitter:card", content: "summary_large_image" });
    this.meta.updateTag({ name: "twitter:image", content: image });

    this.meta.updateTag({ name: "twitter:title", content: pageTitle });
    this.meta.updateTag({
      name: "twitter:description",
      content: config.description,
    });

    if (config.articlePublishedAt) {
      this.meta.updateTag({
        property: "article:published_time",
        content: config.articlePublishedAt,
      });
      this.meta.updateTag({
        property: "article:modified_time",
        content: config.articleModifiedAt ?? config.articlePublishedAt,
      });
    } else {
      this.meta.removeTag("property='article:published_time'");
      this.meta.removeTag("property='article:modified_time'");
    }

    this.ensureCanonical(canonicalUrl);

    const schemas = [
      this.createOrganizationSchema(),
      this.createWebPageSchema(pageTitle, config.description, canonicalUrl),
      ...(config.schemas ?? []),
    ];
    this.updateSchemas(schemas);
  }

  createBreadcrumbSchema(
    items: Array<{ name: string; path: string }>
  ): Record<string, unknown> {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
      })),
    };
  }

  createFaqSchema(
    faqs: Array<{ question: string; answer: string }>
  ): Record<string, unknown> {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
  }

  createServiceSchema(
    name: string,
    description: string,
    path: string
  ): Record<string, unknown> {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: name,
      name,
      description,
      areaServed: {
        "@type": "Country",
        name: "España",
      },
      provider: {
        "@type": "ProfessionalService",
        name: SITE_NAME,
        url: SITE_URL,
      },
      url: `${SITE_URL}${path === "/" ? "" : path}`,
    };
  }

  createArticleSchema(
    headline: string,
    description: string,
    path: string,
    datePublished: string,
    dateModified?: string,
    image?: string
  ): Record<string, unknown> {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline,
      description,
      datePublished,
      dateModified: dateModified ?? datePublished,
      image: image ? [image] : undefined,
      author: {
        "@type": "Organization",
        name: SITE_NAME,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
      },
      mainEntityOfPage: `${SITE_URL}${path === "/" ? "" : path}`,
    };
  }

  private createOrganizationSchema(): Record<string, unknown> {
    return {
      "@context": "https://schema.org",
      "@type": "Electrician",
      name: SITE_NAME,
      description: SITE_TAGLINE,
      url: SITE_URL,
      email: SITE_EMAIL,
      telephone: SITE_PHONE,
      areaServed: SITE_REGION,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Calle Alfonso XIII, 15",
        addressLocality: "Vigo",
        addressRegion: "Pontevedra",
        postalCode: "36204",
        addressCountry: "ES",
      },
    };
  }

  private createWebPageSchema(
    title: string,
    description: string,
    canonicalUrl: string
  ): Record<string, unknown> {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: canonicalUrl,
      inLanguage: "es",
    };
  }

  private ensureCanonical(url: string): void {
    let canonical = this.document.querySelector(
      "link[rel='canonical']"
    ) as HTMLLinkElement | null;

    if (!canonical) {
      canonical = this.document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      this.document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", url);
  }

  private updateSchemas(schemas: Record<string, unknown>[]): void {
    this.jsonLdNodes.forEach((node) => node.remove());
    this.jsonLdNodes = schemas.map((schema) => {
      const node = this.document.createElement("script");
      node.type = "application/ld+json";
      node.text = JSON.stringify(schema);
      this.document.head.appendChild(node);
      return node;
    });
  }
}
