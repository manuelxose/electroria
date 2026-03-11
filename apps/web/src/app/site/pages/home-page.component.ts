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
          <h1>Instalaciones eléctricas profesionales para viviendas, comercio e industria.</h1>
          <p class="lead">
            Diseñamos, ejecutamos y mantenemos instalaciones eléctricas con
            cuadros a medida, documentación trazable y respuesta técnica cuando
            la instalación no admite improvisación.
          </p>

          <div class="hero-actions">
            <a class="button button-primary" routerLink="/contacto">Solicitar presupuesto gratis</a>
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
          <span class="panel-label">Experiencia +15 años</span>
          <h2>Seguridad, continuidad y cumplimiento técnico en cada intervención.</h2>
          <p>
            Cubrimos instalaciones completas, cuadros eléctricos a medida,
            mantenimiento preventivo, automatización y emergencias 24/7 con
            instaladores autorizados.
          </p>

          <div class="panel-stack">
            <div class="mini-metric" *ngFor="let item of metrics">
              <strong>{{ item.value }}</strong> · {{ item.label }}
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section class="section section-accent">
      <div class="site-container card-grid card-grid--four">
        <article class="surface-card" *ngFor="let item of metrics">
          <span class="chip chip-soft">{{ item.value }}</span>
          <h3>{{ item.label }}</h3>
          <p>{{ item.detail }}</p>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="site-container section-head">
        <span class="eyebrow">Servicios</span>
        <h2>Seis líneas de servicio conectadas con la necesidad real del cliente.</h2>
        <p>
          Reorganizamos instalaciones, fabricamos cuadros, reducimos incidencias
          y damos cobertura técnica donde la seguridad o la continuidad sí son
          importantes.
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
            <a class="text-link" [routerLink]="service.seo.path">Explorar servicio</a>
          </div>
        </article>
      </div>
    </section>

    <section class="section section-dark">
      <div class="site-container section-head section-head--light">
        <span class="eyebrow">Ventajas competitivas</span>
        <h2>Una base eléctrica fiable también necesita criterio de operación.</h2>
        <p>
          La nueva web y el nuevo proceso comercial están preparados para captar
          mejor, responder con más contexto y sostener la relación técnica
          después de la instalación.
        </p>
      </div>

      <div class="site-container card-grid card-grid--four">
        <article class="surface-card surface-card--soft-dark" *ngFor="let item of advantages">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="site-container split-head">
        <div>
          <span class="eyebrow">Cobertura</span>
          <h2>Base operativa en Vigo con capacidad para proyectos en Galicia.</h2>
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

    <section class="section section-accent">
      <div class="site-container section-head">
        <span class="eyebrow">Proceso de trabajo</span>
        <h2>Del diagnóstico inicial a la entrega técnica sin zonas grises.</h2>
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
          <span class="eyebrow">Testimonios</span>
          <h2>Percepción de clientes sobre ejecución, claridad y continuidad.</h2>
        </div>
      </div>

      <div class="site-container card-grid card-grid--three">
        <article class="surface-card surface-card--story" *ngFor="let item of customerQuotes">
          <p>{{ item.quote }}</p>
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
        <h2>Respuestas rápidas antes de pedir presupuesto.</h2>
      </div>

      <div class="site-container faq-list">
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
