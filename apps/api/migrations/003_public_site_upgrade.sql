ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS body_html TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS featured_image TEXT,
  ADD COLUMN IF NOT EXISTS seo_title TEXT,
  ADD COLUMN IF NOT EXISTS seo_description TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published'
    CHECK (status IN ('draft', 'published', 'unpublished', 'archived')),
  ADD COLUMN IF NOT EXISTS external_id TEXT,
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS source_url TEXT,
  ADD COLUMN IF NOT EXISTS category_slug TEXT,
  ADD COLUMN IF NOT EXISTS metadata JSONB NOT NULL DEFAULT '{}'::jsonb;

UPDATE blog_posts
SET
  body_html = CASE WHEN COALESCE(body_html, '') = '' THEN content ELSE body_html END,
  featured_image = COALESCE(featured_image, image),
  seo_title = COALESCE(seo_title, title),
  seo_description = COALESCE(seo_description, short_description),
  published_at = COALESCE(published_at, created_at),
  category_slug = COALESCE(category_slug, 'cuadros-electricos')
WHERE TRUE;

CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_posts_external_id
  ON blog_posts(external_id)
  WHERE external_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_blog_posts_status_published_at
  ON blog_posts(status, published_at DESC);

ALTER TABLE contact_messages
  ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'website',
  ADD COLUMN IF NOT EXISTS source_path TEXT,
  ADD COLUMN IF NOT EXISTS source_label TEXT,
  ADD COLUMN IF NOT EXISTS property_type TEXT,
  ADD COLUMN IF NOT EXISTS urgency TEXT,
  ADD COLUMN IF NOT EXISTS budget TEXT,
  ADD COLUMN IF NOT EXISTS website TEXT,
  ADD COLUMN IF NOT EXISTS ip_address TEXT,
  ADD COLUMN IF NOT EXISTS user_agent TEXT,
  ADD COLUMN IF NOT EXISTS referer TEXT,
  ADD COLUMN IF NOT EXISTS consent_given BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS turnstile_passed BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS metadata JSONB NOT NULL DEFAULT '{}'::jsonb;

CREATE INDEX IF NOT EXISTS idx_contact_messages_source_created_at
  ON contact_messages(source, created_at DESC);
