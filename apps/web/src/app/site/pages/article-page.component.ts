import { CommonModule } from "@angular/common";
import { Component, DestroyRef, Inject, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { firstValueFrom } from "rxjs";
import {
  BLOG_REPOSITORY,
  BlogRepository,
} from "src/app/domain/repositories/blog.repository";
import { formatSpanishDate, sanitizeLegacyArticleHtml } from "../content/blog-helpers";
import {
  BlogPostEntry,
  buildBreadcrumbItems,
  getBlogPostBySlug,
  legacyBlogPosts,
} from "../content/site-content";
import { SeoService } from "../services/seo.service";

type RelatedPostView = {
  title: string;
  summary: string;
  category: string;
  path: string;
};

type ArticleView = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  contentHtml: string;
  publishedLabel: string;
  publishedAt: string;
  updatedAt: string | null;
  readingTimeLabel: string;
  path: string;
  featuredImage: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

@Component({
  selector: "app-article-page",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <ng-container *ngIf="article as current; else articleNotFound">
      <section class="page-hero section">
        <div class="site-container page-hero__inner">
          <span class="eyebrow">{{ current.category }}</span>
          <h1>{{ current.title }}</h1>
          <p class="lead">{{ current.summary }}</p>
          <div class="article-meta">{{ current.readingTimeLabel }} · {{ current.publishedLabel }}</div>
          <figure class="article-featured" *ngIf="current.featuredImage">
            <img
              [src]="current.featuredImage"
              [alt]="current.title"
              width="1280"
              height="720"
              loading="eager"
              decoding="async"
              fetchpriority="high"
            >
          </figure>
        </div>
      </section>

      <section class="section">
        <div class="site-container article-layout">
          <article class="article-content surface-card">
            <div class="article-richtext" [innerHTML]="current.contentHtml"></div>
          </article>

          <aside class="article-sidebar surface-card">
            <span class="panel-label">Siguiente paso</span>
            <p>
              Si este artículo encaja con tu caso, lo más útil es revisar el
              alcance técnico y valorar una siguiente actuación.
            </p>
            <a class="button button-primary" routerLink="/contacto">Solicitar presupuesto</a>
            <a class="button button-secondary" routerLink="/blog">Volver al blog</a>
          </aside>
        </div>
      </section>

      <section class="section section-accent">
        <div class="site-container split-head">
          <div>
            <span class="eyebrow">Relacionados</span>
            <h2>Más contenido conectado con instalaciones y cuadros eléctricos.</h2>
          </div>
        </div>
        <div class="site-container card-grid card-grid--three">
          <article class="surface-card article-card" *ngFor="let item of related">
            <span class="chip chip-soft">{{ item.category }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.summary }}</p>
            <a class="text-link" [routerLink]="item.path">Leer artículo</a>
          </article>
        </div>
      </section>
    </ng-container>

    <ng-template #articleNotFound>
      <section class="section">
        <div class="site-container surface-card">
          <span class="eyebrow">Artículo no encontrado</span>
          <h1>Esta URL no corresponde a un artículo disponible.</h1>
          <p class="lead">
            Puedes volver al blog o revisar nuestros servicios principales para seguir explorando.
          </p>
          <div class="hero-actions">
            <a class="button button-primary" routerLink="/blog">Volver al blog</a>
            <a class="button button-secondary" routerLink="/servicios">Ver servicios</a>
          </div>
        </div>
      </section>
    </ng-template>
  `,
})
export class ArticlePageComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  article?: ArticleView;
  related: RelatedPostView[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly seo: SeoService,
    @Inject(BLOG_REPOSITORY) private readonly blogRepository: BlogRepository
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      void this.loadArticle(params.get("slug"));
    });
  }

  private async loadArticle(slug: string | null): Promise<void> {
    this.article = undefined;
    this.related = [];

    if (!slug) {
      this.setNotFoundSeo();
      return;
    }

    const apiArticle = await this.loadFromApi(slug);
    if (apiArticle) {
      this.applyArticle(apiArticle);
      return;
    }

    const fallback = getBlogPostBySlug(slug);
    if (fallback) {
      this.applyArticle(this.mapLegacyPost(fallback));
      return;
    }

    this.setNotFoundSeo();
  }

  private async loadFromApi(slug: string): Promise<ArticleView | null> {
    try {
      const apiArticle = await this.blogRepository.detailBySlug(slug);
      if (!apiArticle) {
        return null;
      }

      const content = sanitizeLegacyArticleHtml(String(apiArticle.content ?? ""));
      const publishedAt = String(
        apiArticle.publishedAt ?? apiArticle.updatedAt ?? apiArticle.createdAt ?? ""
      );
      return {
        slug,
        title: String(apiArticle.title ?? ""),
        summary: String(apiArticle.shortDescription ?? apiArticle.excerpt ?? ""),
        category:
          Array.isArray(apiArticle.tags) && apiArticle.tags.length
            ? String(apiArticle.tags[0])
            : "Blog",
        contentHtml: content,
        publishedAt,
        publishedLabel: `Publicado el ${formatSpanishDate(publishedAt)}`,
        readingTimeLabel: `${Math.max(
          3,
          Math.ceil(content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 180)
        )} min`,
        path: `/blog/${slug}`,
        featuredImage: String(apiArticle.featuredImage ?? "").trim() || null,
        seoTitle: String(apiArticle.seoTitle ?? "").trim() || null,
        seoDescription: String(apiArticle.seoDescription ?? "").trim() || null,
        updatedAt: String(apiArticle.updatedAt ?? "").trim() || null,
      };
    } catch {
      return null;
    }
  }

  private mapLegacyPost(post: BlogPostEntry): ArticleView {
    return {
      slug: post.slug,
      title: post.title,
      summary: post.summary,
      category: post.category,
      contentHtml: sanitizeLegacyArticleHtml(post.contentHtml),
      publishedAt: post.publishedAt,
      publishedLabel: `Publicado el ${formatSpanishDate(post.publishedAt)}`,
      readingTimeLabel: `${post.readingTimeMinutes} min`,
      path: post.seo.path,
      featuredImage: post.featuredImage || null,
      seoTitle: post.seo.title || null,
      seoDescription: post.seo.description || null,
      updatedAt: post.updatedAt || null,
    };
  }

  private applyArticle(article: ArticleView): void {
    this.article = article;
    this.related = legacyBlogPosts
      .filter((post) => post.slug !== article.slug)
      .slice(0, 3)
      .map((post) => ({
        title: post.title,
        summary: post.summary,
        category: post.category,
        path: post.seo.path,
      }));

    const seoTitle = article.seoTitle || article.title;
    const seoDescription = article.seoDescription || article.summary;

    this.seo.update({
      title: seoTitle,
      description: seoDescription,
      path: article.path,
      type: "article",
      image: article.featuredImage ?? undefined,
      articlePublishedAt: article.publishedAt || undefined,
      articleModifiedAt:
        article.updatedAt || article.publishedAt || undefined,
      schemas: [
        this.seo.createBreadcrumbSchema(
          buildBreadcrumbItems([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: article.title, path: article.path },
          ])
        ),
        this.seo.createArticleSchema(
          article.title,
          seoDescription,
          article.path,
          article.publishedAt,
          article.updatedAt || article.publishedAt,
          article.featuredImage ?? undefined
        ),
      ],
    });
  }

  private setNotFoundSeo(): void {
    this.seo.update({
      title: "Artículo no encontrado",
      description: "La URL solicitada no corresponde a un artículo disponible en Electroria.",
      path: "/404",
      noIndex: true,
    });
  }
}
