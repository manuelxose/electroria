import { CommonModule } from "@angular/common";
import { Component, DestroyRef, Inject, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { firstValueFrom } from "rxjs";
import {
  BLOG_REPOSITORY,
  BlogRepository,
} from "src/app/domain/repositories/blog.repository";
import {
  BlogPostEntry,
  buildBreadcrumbItems,
  getBlogCategoryBySlug,
  getBlogPostsByCategory,
  SITE_NAME,
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
            <figure class="article-card__image" *ngIf="post.featuredImage">
              <img
                [src]="post.featuredImage"
                [alt]="post.title"
                width="1280"
                height="720"
                loading="lazy"
                decoding="async"
              >
            </figure>
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
    private readonly seo: SeoService,
    @Inject(BLOG_REPOSITORY) private readonly blogRepository: BlogRepository
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      void this.loadCategory(params.get("slug"));
    });
  }

  private async loadCategory(slug: string | null): Promise<void> {
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

    await this.loadFromApi(this.category.slug);
  }

  private async loadFromApi(categorySlug: string): Promise<void> {
    try {
      const snapshot = await firstValueFrom(this.blogRepository.list());
      const docs = snapshot?.docs ?? [];
      const apiPosts: BlogPostEntry[] = [];

      docs.forEach((doc: any) => {
        const data = typeof doc.data === "function" ? doc.data() : doc;
        const slug = String(data.slug ?? "");
        const postCategorySlug = String(data.categorySlug ?? "");
        if (!slug || postCategorySlug !== categorySlug) {
          return;
        }

        apiPosts.push({
          slug,
          title: String(data.title ?? ""),
          summary: String(data.shortDescription ?? data.excerpt ?? ""),
          excerpt: String(data.shortDescription ?? data.excerpt ?? ""),
          category:
            Array.isArray(data.tags) && data.tags.length
              ? String(data.tags[0])
              : this.category?.label ?? "Blog",
          categorySlug: postCategorySlug,
          author: String(data.author ?? SITE_NAME),
          publishedAt: String(data.publishedAt ?? data.createdAt ?? ""),
          updatedAt: String(data.updatedAt ?? data.publishedAt ?? ""),
          featuredImage: String(data.featuredImage ?? "").trim() || "",
          contentHtml: String(data.content ?? ""),
          readingTimeMinutes: this.estimateReadingTimeMinutes(
            String(data.content ?? "")
          ),
          seo: {
            title: String(data.seoTitle ?? data.title ?? ""),
            description: String(data.seoDescription ?? data.shortDescription ?? ""),
            path: `/blog/${slug}`,
          },
          sourceUrl: "",
          origin: "existing",
        });
      });

      if (apiPosts.length) {
        this.posts = apiPosts.sort((left, right) =>
          right.publishedAt.localeCompare(left.publishedAt)
        );
      }
    } catch {
      // Se mantiene el contenido estático migrado como respaldo.
    }
  }

  private estimateReadingTimeMinutes(value: string): number {
    const words = value
      .replace(/<[^>]+>/g, " ")
      .split(/\s+/)
      .filter(Boolean).length;
    return Math.max(3, Math.ceil(words / 180));
  }
}
