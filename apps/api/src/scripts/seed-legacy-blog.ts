import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "../db/pool.js";

type LegacyBlogPost = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  author?: string;
  publishedAt: string;
  updatedAt: string;
  featuredImage?: string;
  contentHtml: string;
  sourceUrl: string;
};

async function run(): Promise<void> {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const sourcePath = path.resolve(
    __dirname,
    "../../../web/src/app/site/content/generated/legacy-blog-posts.json"
  );
  const raw = await readFile(sourcePath, "utf8");
  const posts = JSON.parse(raw) as LegacyBlogPost[];

  for (const post of posts) {
    await pool.query(
      `INSERT INTO blog_posts (
         slug,
         title,
         short_description,
         content,
         body_html,
         image,
         featured_image,
         tags,
         author,
         category_slug,
         seo_title,
         seo_description,
         status,
         external_id,
         published_at,
         source_url,
         metadata
       ) VALUES (
         $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'published',$13,$14,$15,$16
       )
       ON CONFLICT (slug) DO UPDATE SET
         title = EXCLUDED.title,
         short_description = EXCLUDED.short_description,
         content = EXCLUDED.content,
         body_html = EXCLUDED.body_html,
         image = EXCLUDED.image,
         featured_image = EXCLUDED.featured_image,
         tags = EXCLUDED.tags,
         author = EXCLUDED.author,
         category_slug = EXCLUDED.category_slug,
         seo_title = EXCLUDED.seo_title,
         seo_description = EXCLUDED.seo_description,
         status = 'published',
         external_id = EXCLUDED.external_id,
         published_at = EXCLUDED.published_at,
         source_url = EXCLUDED.source_url,
         metadata = EXCLUDED.metadata,
         updated_at = NOW()`,
      [
        post.slug,
        post.title,
        post.summary,
        post.contentHtml,
        post.contentHtml,
        post.featuredImage ?? null,
        post.featuredImage ?? null,
        [post.category],
        post.author?.trim() || "Electroria",
        "cuadros-electricos",
        post.title,
        post.summary,
        `legacy:${post.slug}`,
        post.publishedAt,
        post.sourceUrl,
        JSON.stringify({
          origin: "legacy_wordpress",
          updatedAt: post.updatedAt,
        }),
      ]
    );
  }
}

run()
  .then(async () => {
    await pool.end();
    console.log("Legacy blog seed completed");
  })
  .catch(async (error) => {
    console.error("Legacy blog seed failed", error);
    await pool.end();
    process.exit(1);
  });
