export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  content: string;
  bodyHtml?: string;
  excerpt?: string;
  image?: string | null;
  featuredImage?: string | null;
  tags: string[];
  author: string;
  status?: "draft" | "published" | "unpublished" | "archived";
  categorySlug?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  publishedAt?: string | null;
  sourceUrl?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ContactRequest = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service1?: string;
  service2?: string;
  message: string;
  sourcePath?: string;
  sourceLabel?: string;
  propertyType?: string;
  urgency?: string;
  budget?: string;
  website?: string;
  privacy?: boolean;
  turnstileToken?: string;
  createdAt?: string;
};

export type BlogCategory = {
  slug: string;
  label: string;
  description: string;
};

export type PublicationEvent = {
  site?: Record<string, unknown>;
  project: {
    id?: string;
    slug?: string;
    title?: string;
    metadata?: Record<string, unknown>;
  };
  version: {
    title: string;
    excerpt?: string;
    bodyHtml: string;
    seoTitle?: string;
    seoDescription?: string;
  };
  publication: {
    action: "publishDraft" | "updateDraft" | "publish" | "unpublish";
    targetStatus?: "draft" | "publish" | null;
    externalId?: string;
  };
  assetUrl?: string | null;
};

export type AuditUrlEntry = {
  original: string;
  final: string;
  action: "200" | "301" | "410";
  note?: string;
};

export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
};
