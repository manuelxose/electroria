import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { firstValueFrom } from "rxjs";
import {
  BLOG_REPOSITORY,
  BlogRepository,
} from "src/app/domain/repositories/blog.repository";
import {
  blogListIntro,
  buildBreadcrumbItems,
  legacyBlogPosts,
} from "../content/site-content";
import { SeoService } from "../services/seo.service";

type BlogCardView = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  path: string;
  publishedAt: string;
  readingTimeLabel: string;
};

@Component({
  selector: "app-blog-page",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="page-hero section">
      <div class="site-container page-hero__inner">
        <span class="eyebrow">Blog</span>
        <h1>{{ title }}</h1>
        <p class="lead">{{ description }}</p>
      </div>
    </section>

    <section class="section" *ngIf="loadError">
      <div class="site-container">
        <div class="alert alert-error">{{ loadError }}</div>
      </div>
    </section>

    <section class="section">
      <div class="site-container card-grid card-grid--three">
        <article class="surface-card article-card" *ngFor="let post of posts">
          <span class="chip chip-soft">{{ post.category }}</span>
          <h2>{{ post.title }}</h2>
          <p>{{ post.summary }}</p>
          <div class="article-meta">{{ post.readingTimeLabel }} · {{ formatDate(post.publishedAt) }}</div>
          <a class="text-link" [routerLink]="post.path">Leer artículo</a>
        </article>
      </div>
    </section>
  `,
})
export class BlogPageComponent implements OnInit {
  title = blogListIntro.title;
  description = blogListIntro.description;
  posts: BlogCardView[] = legacyBlogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    category: post.category,
    path: post.seo.path,
    publishedAt: post.publishedAt,
    readingTimeLabel: `${post.readingTimeMinutes} min`,
  }));
  loadError = "";

  constructor(
    private readonly seo: SeoService,
    @Inject(BLOG_REPOSITORY) private readonly blogRepository: BlogRepository
  ) {}

  async ngOnInit(): Promise<void> {
    this.seo.update({
      title: "Blog técnico y comercial sobre instalaciones eléctricas",
      description:
        "Artículos de Electroria sobre instalaciones eléctricas, cuadros, normativa y mantenimiento, preservados del sitio actual y preparados para crecer.",
      path: "/blog",
      keywords: [
        "blog instalaciones electricas",
        "cuadros electricos normativa",
        "instalacion electrica vivienda guia",
      ],
      schemas: [
        this.seo.createBreadcrumbSchema(
          buildBreadcrumbItems([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
          ])
        ),
      ],
    });

    try {
      const snapshot = await firstValueFrom(this.blogRepository.list());
      const docs = snapshot?.docs ?? [];
      const merged = new Map<string, BlogCardView>();

      this.posts.forEach((post) => merged.set(post.slug, post));

      docs.forEach((doc: any) => {
        const data = typeof doc.data === "function" ? doc.data() : doc;
        const slug = String(data.slug ?? "");
        if (!slug) {
          return;
        }

        merged.set(slug, {
          slug,
          title: String(data.title ?? ""),
          summary: String(data.shortDescription ?? data.excerpt ?? ""),
          category:
            Array.isArray(data.tags) && data.tags.length ? String(data.tags[0]) : "Blog",
          path: `/blog/${slug}`,
          publishedAt: String(data.publishedAt ?? data.updatedAt ?? data.createdAt ?? ""),
          readingTimeLabel: `${this.estimateReadingTimeLabel(String(data.content ?? ""))}`,
        });
      });

      this.posts = Array.from(merged.values()).sort((left, right) =>
        right.publishedAt.localeCompare(left.publishedAt)
      );
    } catch {
      this.loadError =
        "No se ha podido cargar el contenido dinámico del blog. Mostramos el contenido migrado principal.";
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

  private estimateReadingTimeLabel(value: string): string {
    const words = value.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return `${Math.max(3, Math.ceil(words / 180))} min`;
  }
}
