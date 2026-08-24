import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { firstValueFrom } from "rxjs";
import {
  BLOG_REPOSITORY,
  BlogRepository,
} from "src/app/domain/repositories/blog.repository";
import { ContactFormComponent } from "../components/contact-form.component";
import {
  buildBreadcrumbItems,
  competitiveAdvantages,
  coverageHighlights,
  getServiceImage,
  heroHighlights,
  homeFaqs,
  localities,
  processSteps,
  serviceCards,
  SITE_PHONE_LABEL,
  SITE_WHATSAPP,
  trustMetrics,
  type ServiceEntry,
} from "../content/site-content";
import { serviceIcon as serviceIconSvg } from "../services/service-icons";
import { SeoService } from "../services/seo.service";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [CommonModule, RouterModule, ContactFormComponent],
  template: `
    <section class="hero-rebuild">
      <div class="site-container hero-rebuild__grid">
        <div class="hero-rebuild__copy">
          <span class="eyebrow eyebrow--dark">Electroria · Vigo · Galicia</span>
          <h1>
            Instalaciones eléctricas en Vigo con
            <span class="hero-rebuild__highlight">rigor técnico</span> y
            documentación completa.
          </h1>
          <p class="lead hero-rebuild__lead">
            Diseñamos, ejecutamos y mantenemos instalaciones eléctricas con
            cuadros a medida, documentación trazable y respuesta técnica cuando
            la instalación no admite improvisación.
          </p>

          <div class="hero-actions">
            <a class="button button-primary" routerLink="/contacto">Solicitar presupuesto</a>
            <a class="button button-whatsapp" [href]="whatsapp" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
              WhatsApp
            </a>
            <a class="button button-ghost" href="tel:+34682047802">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {{ phoneLabel }}
            </a>
          </div>

          <ul class="hero-rebuild__checks">
            <li *ngFor="let item of highlights">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <div class="hero-rebuild__media">
          <figure class="hero-rebuild__main">
            <img
              src="/assets/images/hero-panel.png"
              alt="Cuadro eléctrico con protecciones y cableado etiquetado"
              width="800"
              height="600"
              loading="eager"
              decoding="async"
              fetchpriority="high"
            >
          </figure>
          <div class="hero-rebuild__float hero-rebuild__float--top">
            <span class="hero-rebuild__float-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            </span>
            <span>
              <strong>Cuadros a medida</strong>
              <small>Diseño y fabricación propios</small>
            </span>
          </div>
          <div class="hero-rebuild__float hero-rebuild__float--bottom">
            <span class="hero-rebuild__float-icon hero-rebuild__float-icon--gold">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
            </span>
            <span>
              <strong>REBT · Cierre documental</strong>
              <small>Normativa y trazabilidad en cada intervención</small>
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-metrics">
      <div class="site-container card-grid card-grid--four">
        <article class="metric-card" *ngFor="let item of metrics">
          <strong class="metric-value">{{ item.value }}</strong>
          <span class="metric-label">{{ item.label }}</span>
          <p class="metric-detail">{{ item.detail }}</p>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="site-container section-head">
        <span class="eyebrow">Servicios</span>
        <h2>Seis líneas de servicio para cada necesidad técnica.</h2>
        <p>
          Instalaciones completas, cuadros a medida, mantenimiento, automatización,
          eficiencia y urgencias 24/7 para vivienda, comercio e industria en Galicia.
        </p>
      </div>

      <div class="site-container card-grid card-grid--three">
        <article class="service-card surface-card service-card--media" *ngFor="let service of services">
          <figure class="service-card__media">
            <img
              *ngIf="imageOf(service) as image"
              [src]="image"
              [alt]="service.name"
              width="600"
              height="400"
              loading="lazy"
              decoding="async"
            >
          </figure>
          <div class="service-card__body">
            <span class="service-card__icon" [innerHTML]="serviceIcon(service.slug)"></span>
            <span class="chip">{{ service.badge }}</span>
            <h3>{{ service.name }}</h3>
            <p>{{ service.summary }}</p>
            <ul class="plain-list">
              <li *ngFor="let item of service.highlights.slice(0, 2)">{{ item }}</li>
            </ul>
            <div class="service-card__footer">
              <a class="text-link" [routerLink]="service.seo.path">
                Ver servicio <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="section section-dark">
      <div class="site-container section-head section-head--light">
        <span class="eyebrow">Por qué Electroria</span>
        <h2>Cuatro principios que definen cómo preparamos, ejecutamos y cerramos cada proyecto.</h2>
      </div>

      <div class="site-container card-grid card-grid--four">
        <article class="surface-card surface-card--soft-dark advantage-card" *ngFor="let item of advantages; let i = index">
          <span class="advantage-card__num">0{{ i + 1 }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </article>
      </div>
    </section>

    <section class="section section-accent">
      <div class="site-container section-head">
        <span class="eyebrow">Proceso de trabajo</span>
        <h2>Del primer contacto a la entrega técnica sin zonas grises.</h2>
        <p>Un proceso claro que minimiza sorpresas y maximiza la trazabilidad del trabajo realizado.</p>
      </div>

      <div class="site-container timeline-grid timeline-grid--light">
        <article class="timeline-step timeline-step--light" *ngFor="let step of process">
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="site-container split-head">
        <div>
          <span class="eyebrow">Cobertura</span>
          <h2>Base operativa en Vigo. Cobertura en toda Galicia.</h2>
        </div>
        <a class="button button-secondary" routerLink="/zonas">Ver zonas de trabajo</a>
      </div>

      <div class="site-container card-grid card-grid--three">
        <article class="surface-card" *ngFor="let item of coverage">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </article>
      </div>

      <div class="site-container chip-links">
        <a *ngFor="let locality of localityLinks" [routerLink]="locality.path">
          Electricista en {{ locality.label }}
        </a>
      </div>
    </section>

    <section class="section section-accent" *ngIf="latestPosts.length">
      <div class="site-container split-head">
        <div>
          <span class="eyebrow">Blog técnico</span>
          <h2>Últimos artículos sobre instalaciones y cuadros eléctricos.</h2>
        </div>
        <a class="button button-secondary" routerLink="/blog">Ver el blog</a>
      </div>

      <div class="site-container card-grid card-grid--three">
        <article class="surface-card article-card" *ngFor="let post of latestPosts">
          <figure class="article-card__image" *ngIf="post.image">
            <img
              [src]="post.image"
              [alt]="post.title"
              width="1280"
              height="720"
              loading="lazy"
              decoding="async"
            >
          </figure>
          <h3>{{ post.title }}</h3>
          <p>{{ post.summary }}</p>
          <div class="article-meta">{{ formatDate(post.publishedAt) }}</div>
          <a class="text-link" [routerLink]="post.path">Leer artículo</a>
        </article>
      </div>
    </section>

    <app-contact-form></app-contact-form>

    <section class="section">
      <div class="site-container section-head">
        <span class="eyebrow">Preguntas frecuentes</span>
        <h2>Respuestas directas a las dudas más habituales.</h2>
      </div>

      <div class="site-container faq-list faq-list--wide">
        <details class="faq-item" *ngFor="let item of faqs">
          <summary>{{ item.question }}</summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </section>
  `,
})
export class HomePageComponent implements OnInit {
  highlights = heroHighlights;
  metrics = trustMetrics;
  services = serviceCards;
  advantages = competitiveAdvantages;
  coverage = coverageHighlights;
  process = processSteps;
  faqs = homeFaqs;
  whatsapp = SITE_WHATSAPP;
  phoneLabel = SITE_PHONE_LABEL;
  localityLinks = localities.map((locality) => ({
    label: locality.name,
    path: locality.seo.path,
  }));
  latestPosts: Array<{
    title: string;
    summary: string;
    path: string;
    publishedAt: string;
    image: string | null;
  }> = [];

  imageOf(service: ServiceEntry): string | undefined {
    return getServiceImage(service.slug);
  }

  serviceIcon(slug: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(serviceIconSvg(slug));
  }

  constructor(
    private readonly seo: SeoService,
    private readonly sanitizer: DomSanitizer,
    @Inject(BLOG_REPOSITORY) private readonly blogRepository: BlogRepository
  ) {}

  ngOnInit(): void {
    this.seo.update({
      title: "Instalaciones eléctricas profesionales en Galicia",
      description:
        "Electroria realiza instalaciones eléctricas, cuadros a medida, mantenimiento preventivo, automatización industrial, eficiencia energética y emergencias 24/7 en Galicia.",
      path: "/",
      keywords: [
        "instalaciones electricas galicia",
        "electricistas en vigo",
        "cuadros electricos a medida",
        "mantenimiento electrico",
      ],
      schemas: [
        this.seo.createBreadcrumbSchema(buildBreadcrumbItems([{ name: "Inicio", path: "/" }])),
        this.seo.createFaqSchema(this.faqs),
      ],
    });

    void this.loadLatestPosts();
  }

  private async loadLatestPosts(): Promise<void> {
    try {
      const snapshot = await firstValueFrom(this.blogRepository.list());
      const docs = snapshot?.docs ?? [];
      const posts = docs
        .map((doc: any) => {
          const data = typeof doc.data === "function" ? doc.data() : doc;
          return {
            title: String(data.title ?? ""),
            summary: String(data.shortDescription ?? data.excerpt ?? ""),
            path: `/blog/${String(data.slug ?? "")}`,
            publishedAt: String(data.publishedAt ?? data.createdAt ?? ""),
            image: String(data.featuredImage ?? "").trim() || null,
          };
        })
        .filter((post) => post.title && post.path !== "/blog/")
        .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))
        .slice(0, 3);

      if (posts.length) {
        this.latestPosts = posts;
      }
    } catch {
      // La home no depende del blog: sin artículos, la sección se oculta.
    }
  }

  formatDate(value: string): string {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return "Publicado recientemente";
    }

    return parsed.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
}
