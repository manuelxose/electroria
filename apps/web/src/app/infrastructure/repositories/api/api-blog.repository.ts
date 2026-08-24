import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { firstValueFrom } from "rxjs";
import { BlogRepository } from "src/app/domain/repositories/blog.repository";
import { API_BASE_URL } from "../../http/api-base-url.token";

type ApiBlogPost = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  content: string;
  image?: string | File;
  featuredImage?: string | null;
  tags?: string[];
  author?: string;
  categorySlug?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  date?: string;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type BlogSnapshotDoc = {
  id: string;
  data: () => ApiBlogPost;
};

type BlogSnapshotLike = {
  docs: BlogSnapshotDoc[];
};

@Injectable()
export class ApiBlogRepository implements BlogRepository {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpClient,
    @Inject(API_BASE_URL) baseUrl: string
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  list(): Observable<BlogSnapshotLike> {
    return this.http
      .get<{ items: ApiBlogPost[] }>(`${this.baseUrl}/api/v1/blog`)
      .pipe(
        map((response) => ({
          docs: (response.items ?? []).map((item) => ({
            id: item.id,
            data: () => this.normalizePost(item),
          })),
        }))
      );
  }

  async detailBySlug(slug: string): Promise<ApiBlogPost | null> {
    try {
      const post = await firstValueFrom(
        this.http.get<ApiBlogPost>(`${this.baseUrl}/api/v1/blog/${slug}`)
      );
      return this.normalizePost(post);
    } catch {
      return null;
    }
  }

  private normalizePost(post: ApiBlogPost): ApiBlogPost {
    const dateFallback =
      post.publishedAt ?? post.date ?? post.createdAt ?? new Date().toISOString();
    return {
      ...post,
      date: dateFallback,
      publishedAt: post.publishedAt ?? null,
      featuredImage: post.featuredImage ?? null,
      tags: Array.isArray(post.tags) ? post.tags : [],
      author: post.author ?? "Electroria",
    };
  }
}
