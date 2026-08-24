import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import {
  buildBreadcrumbItems,
  getServiceImage,
  serviceFaqs,
  serviceGroups,
  services,
  SITE_URL,
  type ServiceEntry,
} from "../content/site-content";
import { serviceIcon as serviceIconSvg } from "../services/service-icons";
import { SeoService } from "../services/seo.service";

@Component({
  selector: "app-services-page",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="page-hero section">
      <div class="site-container page-hero__inner">
        <span class="eyebrow">Servicios</span>
        <h1>Servicios eléctricos organizados por necesidad técnica real.</h1>
        <p class="lead">
          Instalaciones, cuadros, mantenimiento, automatización, eficiencia y
          urgencias para clientes que necesitan una base eléctrica seria y
          mantenible.
        </p>
      </div>
    </section>

    <section class="section section-accent">
      <div class="site-container card-grid card-grid--two">
        <article class="surface-card" *ngFor="let group of groups">
          <h2>{{ group.title }}</h2>
          <p>{{ group.description }}</p>
          <ul class="plain-list">
            <li *ngFor="let slug of group.serviceSlugs">{{ getServiceName(slug) }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="site-container section-head">
        <span class="eyebrow">Catálogo</span>
        <h2>Qué hacemos exactamente en cada línea de servicio.</h2>
        <p>
          Cada servicio cierra con alcance claro, ejecución coordinada y
          documentación preparada para explotación y mantenimiento.
        </p>
      </div>
      <div class="site-container card-grid card-grid--three">
        <article class="service-card surface-card service-card--media" *ngFor="let service of serviceList">
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
            <h2>{{ service.name }}</h2>
            <p>{{ service.summary }}</p>
            <ul class="plain-list">
              <li *ngFor="let item of service.deliverables.slice(0, 2)">{{ item }}</li>
            </ul>
            <div class="service-card__footer">
              <a class="text-link" [routerLink]="service.seo.path">Ver servicio <span aria-hidden="true">→</span></a>
              <a class="text-link" routerLink="/contacto">Presupuesto</a>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="section section-accent">
      <div class="site-container section-head">
        <span class="eyebrow">FAQ</span>
        <h2>Dudas habituales antes de contratar una intervención.</h2>
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
export class ServicesPageComponent implements OnInit {
  groups = serviceGroups;
  serviceList = services;
  faqs = serviceFaqs;

  constructor(
    private readonly seo: SeoService,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.seo.update({
      title: "Servicios eléctricos en Vigo y Galicia",
      description:
        "Servicios de Electroria: instalaciones eléctricas, cuadros a medida, mantenimiento preventivo, automatización industrial, eficiencia energética y emergencias 24/7.",
      path: "/servicios",
      keywords: [
        "servicios electricos vigo",
        "instalaciones electricas galicia",
        "cuadros electricos a medida",
      ],
      schemas: [
        this.seo.createBreadcrumbSchema(
          buildBreadcrumbItems([
            { name: "Inicio", path: "/" },
            { name: "Servicios", path: "/servicios" },
          ])
        ),
        this.seo.createFaqSchema(this.faqs),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Servicios eléctricos de Electroria",
          itemListElement: services.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.name,
            url: `${SITE_URL}${service.seo.path}`,
          })),
        },
      ],
    });
  }

  getServiceName(slug: string): string {
    return services.find((service) => service.slug === slug)?.name ?? slug;
  }

  imageOf(service: ServiceEntry): string | undefined {
    return getServiceImage(service.slug);
  }

  serviceIcon(slug: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(serviceIconSvg(slug));
  }
}
