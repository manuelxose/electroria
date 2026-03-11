import { Router } from "express";
import { pool } from "../../db/pool.js";

const router = Router();

router.get("/", async (_req, res) => {
  const query = await pool.query(
    `SELECT
       id,
       slug,
       title,
       short_description AS "shortDescription",
       short_description AS excerpt,
       content,
       body_html AS "bodyHtml",
       image,
       COALESCE(featured_image, image) AS "featuredImage",
       tags,
       author,
       category_slug AS "categorySlug",
       seo_title AS "seoTitle",
       seo_description AS "seoDescription",
       status,
       source_url AS "sourceUrl",
       published_at AS "publishedAt",
       created_at AS "createdAt",
       updated_at AS "updatedAt"
     FROM blog_posts
     WHERE status = 'published'
     ORDER BY COALESCE(published_at, created_at) DESC, created_at DESC`
  );
  res.json({ items: query.rows });
});

router.get("/:slug", async (req, res) => {
  const query = await pool.query(
    `SELECT
       id,
       slug,
       title,
       short_description AS "shortDescription",
       short_description AS excerpt,
       content,
       body_html AS "bodyHtml",
       image,
       COALESCE(featured_image, image) AS "featuredImage",
       tags,
       author,
       category_slug AS "categorySlug",
       seo_title AS "seoTitle",
       seo_description AS "seoDescription",
       status,
       source_url AS "sourceUrl",
       published_at AS "publishedAt",
       created_at AS "createdAt",
       updated_at AS "updatedAt"
     FROM blog_posts
     WHERE slug = $1 AND status = 'published'
     LIMIT 1`,
    [req.params.slug]
  );
  if (query.rowCount === 0) {
    res.status(404).json({ code: "NOT_FOUND", message: "Post not found" });
    return;
  }
  res.json(query.rows[0]);
});

export default router;
