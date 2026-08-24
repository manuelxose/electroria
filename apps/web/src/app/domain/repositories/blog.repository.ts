import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";

export interface BlogRepository {
  list(): Observable<any>;
  detailBySlug(slug: string): Promise<any>;
}

export const BLOG_REPOSITORY = new InjectionToken<BlogRepository>("BLOG_REPOSITORY");
