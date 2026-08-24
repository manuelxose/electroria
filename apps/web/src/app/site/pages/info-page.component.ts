import { CommonModule } from "@angular/common";
import { Component, DestroyRef, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { buildBreadcrumbItems, getInfoPageByKey } from "../content/site-content";
import { SeoService } from "../services/seo.service";

@Component({
  selector: "app-info-page",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <ng-container *ngIf="page as current; else missingPage">
      <section class="page-hero section">
        <div class="site-container page-hero__inner">
          <span class="eyebrow">{{ current.eyebrow }}</span>
          <h1>{{ current.title }}</h1>
          <p class="lead">{{ current.intro }}</p>
          <div class="chip-links" *ngIf="current.heroChips?.length">
            <a *ngFor="let chip of current.heroChips" [routerLink]="chip.path">
              {{ chip.label }}
            </a>
          </div>
          <figure class="info-hero__image" *ngIf="current.image">
            <img
              [src]="current.image"
              [alt]="current.title"
              width="800"
              height="500"
              loading="eager"
              decoding="async"
              fetchpriority="high"
            >
          </figure>
        </div>
      </section>

      <section class="section" *ngIf="current.highlights?.length">
        <div class="site-container card-grid card-grid--three">
          <article class="surface-card" *ngFor="let item of current.highlights">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="section" *ngFor="let section of current.sections; let index = index">
        <div class="site-container" [class.section-head]="index === 0">
          <div class="surface-card">
            <h2>{{ section.title }}</h2>
            <p *ngFor="let paragraph of section.paragraphs">{{ paragraph }}</p>
            <ul class="plain-list" *ngIf="section.bullets?.length">
              <li *ngFor="let item of section.bullets">{{ item }}</li>
            </ul>
            <ul class="zone-links" *ngIf="section.links?.length">
              <li *ngFor="let link of section.links">
                <a [routerLink]="link.path">{{ link.label }}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section" *ngIf="current.faqs?.length">
        <div class="site-container section-head">
          <span class="eyebrow">FAQ</span>
          <h2>Preguntas frecuentes</h2>
        </div>
        <div class="site-container faq-list">
          <details class="faq-item" *ngFor="let item of current.faqs">
            <summary>{{ item.question }}</summary>
            <p>{{ item.answer }}</p>
          </details>
        </div>
      </section>

      <section class="section section-dark" *ngIf="current.ctaLabel && current.ctaPath">
        <div class="site-container final-cta">
          <span class="eyebrow">Siguiente paso</span>
          <h2>Si necesitas aterrizar este punto en tu caso real, revisamos el alcance contigo.</h2>
          <div class="cta-actions">
            <a class="button button-primary" [routerLink]="current.ctaPath">{{ current.ctaLabel }}</a>
            <a class="button button-ghost" routerLink="/servicios">Ver servicios</a>
          </div>
        </div>
      </section>
    </ng-container>

    <ng-template #missingPage>
      <section class="section">
        <div class="site-container surface-card">
          <span class="eyebrow">Página no encontrada</span>
          <h1>La página solicitada no existe.</h1>
          <p class="lead">Puedes volver al inicio o explorar nuestros servicios principales.</p>
          <div class="hero-actions">
            <a class="button button-primary" routerLink="/">Ir al inicio</a>
            <a class="button button-secondary" routerLink="/servicios">Ver servicios</a>
          </div>
        </div>
      </section>
    </ng-template>
  `,
})
export class InfoPageComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  page = getInfoPageByKey("empresa");

  constructor(
    private readonly route: ActivatedRoute,
    private readonly seo: SeoService
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
      const pageKey = String(data["pageKey"] || "");
      this.page = getInfoPageByKey(pageKey);

      if (!this.page) {
        this.seo.update({
          title: "Página no encontrada",
          description: "La URL solicitada no corresponde a una página pública de Electroria.",
          path: "/404",
          noIndex: true,
        });
        return;
      }

      this.seo.update({
        title: this.page.seo.title,
        description: this.page.seo.description,
        path: this.page.seo.path,
        keywords: this.page.seo.keywords,
        schemas: [
          this.seo.createBreadcrumbSchema(
            buildBreadcrumbItems([
              { name: "Inicio", path: "/" },
              { name: this.page.eyebrow, path: this.page.seo.path },
            ])
          ),
          ...(this.page.faqs?.length ? [this.seo.createFaqSchema(this.page.faqs)] : []),
        ],
      });
    });
  }
}
