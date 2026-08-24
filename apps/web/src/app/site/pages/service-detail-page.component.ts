import { CommonModule } from "@angular/common";
import { Component, DestroyRef, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterModule } from "@angular/router";
import {
  buildBreadcrumbItems,
  getServiceBySlug,
  getServiceImage,
  services,
  type ServiceEntry,
} from "../content/site-content";
import { SeoService } from "../services/seo.service";

@Component({
  selector: "app-service-detail-page",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <ng-container *ngIf="service as current; else missingService">
      <section class="page-hero section">
        <div class="site-container page-hero__split">
          <div>
            <span class="eyebrow">{{ current.badge }}</span>
            <h1>{{ current.heroTitle }}</h1>
            <p class="lead">{{ current.heroIntro }}</p>

            <div class="hero-actions">
              <a class="button button-primary" routerLink="/contacto">Solicitar presupuesto</a>
              <a class="button button-secondary" routerLink="/servicios">Volver a servicios</a>
            </div>
          </div>

          <aside class="surface-card">
            <figure class="service-detail__image" *ngIf="imageOf(current) as image">
              <img
                [src]="image"
                [alt]="current.name"
                width="600"
                height="400"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              >
            </figure>
            <span class="panel-label">Encaje habitual</span>
            <ul class="plain-list">
              <li *ngFor="let sector of current.sectors">{{ sector }}</li>
            </ul>
          </aside>
        </div>
      </section>

      <section class="section">
        <div class="site-container card-grid card-grid--three">
          <article class="surface-card" *ngFor="let item of current.highlights">
            <h3>{{ item }}</h3>
          </article>
        </div>
      </section>

      <section class="section section-accent">
        <div class="site-container page-hero__split">
          <article class="surface-card service-card service-card--full">
            <span class="eyebrow">Qué entregamos</span>
            <div class="service-card__body">
              <ul class="plain-list">
                <li *ngFor="let item of current.deliverables">{{ item }}</li>
              </ul>
            </div>
          </article>

          <article class="surface-card service-card service-card--full">
            <span class="eyebrow">Por qué se contrata</span>
            <div class="service-card__body">
              <ul class="plain-list">
                <li *ngFor="let item of current.differentiators">{{ item }}</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section class="section">
        <div class="site-container section-head">
          <span class="eyebrow">FAQ del servicio</span>
          <h2>Preguntas frecuentes sobre {{ current.shortName.toLowerCase() }}.</h2>
        </div>
        <div class="site-container faq-list">
          <details class="faq-item" *ngFor="let item of current.faqs">
            <summary>{{ item.question }}</summary>
            <p>{{ item.answer }}</p>
          </details>
        </div>
      </section>

      <section class="section section-dark">
        <div class="site-container split-head">
          <div>
            <span class="eyebrow">Servicios relacionados</span>
            <h2>Otros servicios conectados a este tipo de intervención.</h2>
          </div>
        </div>
        <div class="site-container card-grid card-grid--three">
          <article class="surface-card surface-card--soft-dark" *ngFor="let item of relatedServices">
            <span class="chip chip-soft">{{ item.badge }}</span>
            <h3>{{ item.name }}</h3>
            <p>{{ item.summary }}</p>
            <a class="text-link" [routerLink]="item.seo.path">Ver detalle</a>
          </article>
        </div>
      </section>
    </ng-container>

    <ng-template #missingService>
      <section class="section">
        <div class="site-container surface-card">
          <span class="eyebrow">Servicio no encontrado</span>
          <h1>Este servicio no existe o ya no está disponible.</h1>
          <p class="lead">
            Puedes volver al listado de servicios o escribirnos para revisar tu caso.
          </p>
          <div class="hero-actions">
            <a class="button button-primary" routerLink="/servicios">Volver a servicios</a>
            <a class="button button-secondary" routerLink="/contacto">Contactar</a>
          </div>
        </div>
      </section>
    </ng-template>
  `,
})
export class ServiceDetailPageComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  service?: ServiceEntry;
  relatedServices: ServiceEntry[] = [];

  imageOf(service: ServiceEntry): string | undefined {
    return getServiceImage(service.slug);
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly seo: SeoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const slug = params.get("slug");
      this.service = getServiceBySlug(slug);
      this.relatedServices = services
        .filter((service) => service.slug !== slug)
        .slice(0, 3);

      if (!this.service) {
        this.seo.update({
          title: "Servicio no encontrado",
          description: "La URL solicitada no corresponde a un servicio activo de Electroria.",
          path: "/404",
          noIndex: true,
        });
        return;
      }

      this.seo.update({
        title: this.service.seo.title,
        description: this.service.seo.description,
        path: this.service.seo.path,
        keywords: this.service.seo.keywords,
        schemas: [
          this.seo.createBreadcrumbSchema(
            buildBreadcrumbItems([
              { name: "Inicio", path: "/" },
              { name: "Servicios", path: "/servicios" },
              { name: this.service.name, path: this.service.seo.path },
            ])
          ),
          this.seo.createServiceSchema(
            this.service.name,
            this.service.seo.description,
            this.service.seo.path
          ),
          this.seo.createFaqSchema(this.service.faqs),
        ],
      });
    });
  }
}
