import { CommonModule } from "@angular/common";
import { Component, DestroyRef, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterModule } from "@angular/router";
import {
  buildBreadcrumbItems,
  getBlogCategoryBySlug,
  getBlogPostsByCategory,
} from "../content/site-content";
import { SeoService } from "../services/seo.service";

@Component({
  selector: "app-blog-category-page",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <ng-container *ngIf="category as current; else missingCategory">
      <section class="page-hero section">
        <div class="site-container page-hero__inner">
          <span class="eyebrow">Categoría</span>
          <h1>{{ current.label }}</h1>
          <p class="lead">{{ current.description }}</p>
        </div>
      </section>

      <section class="section">
        <div class="site-container card-grid card-grid--three">
          <article class="surface-card article-card" *ngFor="let post of posts">
            <span class="chip chip-soft">{{ post.category }}</span>
            <h2>{{ post.title }}</h2>
            <p>{{ post.summary }}</p>
            <div class="article-meta">{{ post.readingTimeMinutes }} min</div>
            <a class="text-link" [routerLink]="post.seo.path">Leer artículo</a>
          </article>
        </div>
      </section>
    </ng-container>

    <ng-template #missingCategory>
      <section class="section">
        <div class="site-container surface-card">
          <span class="eyebrow">Categoría no encontrada</span>
          <h1>La categoría solicitada no existe.</h1>
          <p class="lead">Puedes volver al blog principal para explorar el contenido disponible.</p>
          <a class="button button-primary" routerLink="/blog">Volver al blog</a>
        </div>
      </section>
    </ng-template>
  `,
})
export class BlogCategoryPageComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  category = getBlogCategoryBySlug("cuadros-electricos");
  posts = getBlogPostsByCategory("cuadros-electricos");

  constructor(
    private readonly route: ActivatedRoute,
    private readonly seo: SeoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const slug = params.get("slug");
      this.category = getBlogCategoryBySlug(slug);
      this.posts = getBlogPostsByCategory(slug);

      if (!this.category) {
        this.seo.update({
          title: "Categoría no encontrada",
          description: "La categoría solicitada no existe en el blog de Electroria.",
          path: "/404",
          noIndex: true,
        });
        return;
      }

      this.seo.update({
        title: `${this.category.label} | Blog`,
        description: this.category.description,
        path: `/blog/categoria/${this.category.slug}`,
        schemas: [
          this.seo.createBreadcrumbSchema(
            buildBreadcrumbItems([
              { name: "Inicio", path: "/" },
              { name: "Blog", path: "/blog" },
              {
                name: this.category.label,
                path: `/blog/categoria/${this.category.slug}`,
              },
            ])
          ),
        ],
      });
    });
  }
}
