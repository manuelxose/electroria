import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ContactFormComponent } from "../components/contact-form.component";
import {
  buildBreadcrumbItems,
  competitiveAdvantages,
  coverageHighlights,
  heroHighlights,
  homeFaqs,
  processSteps,
  serviceCards,
  testimonials,
  trustMetrics,
} from "../content/site-content";
import { SeoService } from "../services/seo.service";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [CommonModule, RouterModule, ContactFormComponent],
  template: `
    <section class="hero-section section">
      <div class="site-container hero-grid">
        <div class="hero-copy">
          <span class="eyebrow">Electroria · Vigo · Galicia</span>
          <h1>Instalaciones eléctricas en Vigo con rigor técnico y documentación completa.</h1>
          <p class="lead">
            Diseñamos, ejecutamos y mantenemos instalaciones eléctricas con
            cuadros a medida, documentación trazable y respuesta técnica cuando
            la instalación no admite improvisación.
          </p>

          <div class="hero-actions">
            <a class="button button-primary" routerLink="/contacto">Solicitar presupuesto</a>
            <a class="button button-secondary" routerLink="/servicios">Ver servicios</a>
          </div>

          <div class="bullet-list">
            <div class="bullet-list__item" *ngFor="let item of highlights">
              <span class="bullet-dot"></span>
              <span>{{ item }}</span>
            </div>
          </div>
        </div>

        <aside class="hero-panel surface-card surface-card--contrast">
          <span class="panel-label">Instaladores autorizados · Galicia</span>
          <h2>Seguridad, continuidad y cumplimiento técnico en cada intervención.</h2>
          <p>
            Cubrimos instalaciones completas, cuadros eléctricos a medida,
            mantenimiento preventivo, automatización y emergencias 24/7.
          </p>
          <div class="hero-panel-certs">
            <span class="cert-badge">REBT</span>
            <span class="cert-badge">24/7</span>
            <span class="cert-badge">+500 proyectos</span>
            <span class="cert-badge">2 años garantía</span>
          </div>
        </aside>
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
        <article class="service-card surface-card service-card--stacked" *ngFor="let service of services">
          <span class="chip">{{ service.badge }}</span>
          <h3>{{ service.name }}</h3>
          <p>{{ service.summary }}</p>
          <ul class="plain-list">
            <li *ngFor="let item of service.highlights">{{ item }}</li>
          </ul>
          <div class="service-card__footer">
            <a class="button button-secondary" [routerLink]="service.seo.path">Ver detalle</a>
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
        <article class="surface-card surface-card--soft-dark" *ngFor="let item of advantages">
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
    </section>

    <section class="section">
      <div class="site-container split-head">
        <div>
          <span class="eyebrow">Clientes</span>
          <h2>Lo que dicen los clientes sobre ejecución, claridad y resultado.</h2>
        </div>
      </div>

      <div class="site-container card-grid card-grid--three">
        <article class="surface-card surface-card--story" *ngFor="let item of customerQuotes">
          <p class="testimonial-quote">"{{ item.quote }}"</p>
          <div class="story-block">
            <strong>{{ item.name }}</strong>
            <p>{{ item.role }} · {{ item.company }}</p>
          </div>
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
  customerQuotes = testimonials;
  faqs = homeFaqs;

  constructor(private readonly seo: SeoService) {}

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
  }
}
