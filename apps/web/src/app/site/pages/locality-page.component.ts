import { CommonModule } from "@angular/common";
import { Component, DestroyRef, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterModule } from "@angular/router";
import {
  buildBreadcrumbItems,
  getLocalityBySlug,
  getServiceBySlug,
  getServiceImage,
  type LocalityEntry,
  type ServiceEntry,
} from "../content/site-content";
import { SeoService } from "../services/seo.service";

@Component({
  selector: "app-locality-page",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <ng-container *ngIf="locality as current; else missingLocality">
      <section class="page-hero section">
        <div class="site-container page-hero__inner">
          <span class="eyebrow">{{ current.eyebrow }}</span>
          <h1>{{ current.title }}</h1>
          <p class="lead">{{ current.intro }}</p>
          <div class="hero-actions">
            <a class="button button-primary" routerLink="/contacto">Solicitar presupuesto</a>
            <a class="button button-secondary" routerLink="/servicios">Ver servicios</a>
          </div>
        </div>
      </section>

      <section class="section section-accent">
        <div class="site-container card-grid card-grid--three">
          <article class="surface-card" *ngFor="let item of current.highlights">
            <h3>{{ item }}</h3>
          </article>
        </div>
      </section>

      <section class="section">
        <div class="site-container section-head">
          <span class="eyebrow">Servicios en {{ current.name }}</span>
          <h2>Líneas de servicio disponibles en la zona.</h2>
        </div>
        <div class="site-container card-grid card-grid--three">
          <article
            class="surface-card service-card service-card--stacked"
            *ngFor="let service of coveredServices"
          >
            <figure class="service-card__image" *ngIf="imageOf(service) as image">
              <img
                [src]="image"
                [alt]="service.name"
                width="600"
                height="400"
                loading="lazy"
                decoding="async"
              >
            </figure>
            <span class="chip">{{ service.badge }}</span>
            <h3>{{ service.name }}</h3>
            <p>{{ service.summary }}</p>
            <div class="service-card__footer">
              <a class="text-link" [routerLink]="service.seo.path">Ver detalle</a>
            </div>
          </article>
        </div>
      </section>

      <section class="section section-dark">
        <div class="site-container final-cta">
          <span class="eyebrow">Siguiente paso</span>
          <h2>Cuéntanos el alcance y coordinamos revisión, plan y presupuesto.</h2>
          <div class="cta-actions">
            <a class="button button-primary" routerLink="/contacto">Solicitar presupuesto</a>
            <a class="button button-ghost" href="tel:+34682047802">682 04 78 02</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="site-container section-head">
          <span class="eyebrow">FAQ</span>
          <h2>Preguntas frecuentes sobre la cobertura en {{ current.name }}.</h2>
        </div>
        <div class="site-container faq-list">
          <details class="faq-item" *ngFor="let item of current.faqs">
            <summary>{{ item.question }}</summary>
            <p>{{ item.answer }}</p>
          </details>
        </div>
      </section>
    </ng-container>

    <ng-template #missingLocality>
      <section class="section">
        <div class="site-container surface-card">
          <span class="eyebrow">Zona no encontrada</span>
          <h1>La zona solicitada no existe.</h1>
          <p class="lead">Puedes revisar la página de cobertura o contactar directamente.</p>
          <div class="hero-actions">
            <a class="button button-primary" routerLink="/zonas">Ver cobertura</a>
            <a class="button button-secondary" routerLink="/contacto">Contactar</a>
          </div>
        </div>
      </section>
    </ng-template>
  `,
})
export class LocalityPageComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  locality?: LocalityEntry;
  coveredServices: ServiceEntry[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly seo: SeoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const slug = params.get("slug");
      this.locality = getLocalityBySlug(slug);
      this.coveredServices = (this.locality?.servicesCovered ?? [])
        .map((serviceSlug) => getServiceBySlug(serviceSlug))
        .filter((service): service is ServiceEntry => Boolean(service));

      if (!this.locality) {
        this.seo.update({
          title: "Zona no encontrada",
          description: "La zona solicitada no existe en la cobertura de Electroria.",
          path: "/404",
          noIndex: true,
        });
        return;
      }

      this.seo.update({
        title: this.locality.seo.title,
        description: this.locality.seo.description,
        path: this.locality.seo.path,
        keywords: this.locality.seo.keywords,
        schemas: [
          this.seo.createBreadcrumbSchema(
            buildBreadcrumbItems([
              { name: "Inicio", path: "/" },
              { name: "Cobertura", path: "/zonas" },
              { name: this.locality.name, path: this.locality.seo.path },
            ])
          ),
          this.seo.createFaqSchema(this.locality.faqs),
        ],
      });
    });
  }

  imageOf(service: ServiceEntry): string | undefined {
    return getServiceImage(service.slug);
  }
}
