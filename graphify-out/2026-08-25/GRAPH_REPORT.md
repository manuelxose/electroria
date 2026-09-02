# Graph Report - electroria  (2026-08-24)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 740 nodes · 1140 edges · 51 communities (43 shown, 8 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f9a1c44d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- contact-form.component.ts
- contact.ts
- options
- dependencies
- site-content.ts
- compilerOptions
- scripts
- server.ts
- tsconfig.app.json
- AnalyticsService
- scripts
- devDependencies
- app.config.ts
- seo.service.ts
- buildBreadcrumbItems
- dependencies
- dev.mjs
- article-page.component.ts
- ServiceEntry
- SeoService
- compilerOptions
- web-empresa
- SiteHeaderComponent
- compilerOptions
- api/package.json
- devDependencies
- ChatWidgetEmbedComponent
- ArticlePageComponent
- shared-types/package.json
- BlogRepository
- home-page.component.ts
- generate-images.mjs
- 001_init.sql
- services-page.component.ts
- shared-types/src/index.ts
- BlogPageComponent
- .loadCategory
- ServicesPageComponent
- typescript
- cloudflare-cutover.sh
- @types/express
- nodemailer.d.ts
- jasmine-core
- environment.prod.ts
- backup-postgres.sh
- restore-postgres.sh
- rollback-release.sh

## God Nodes (most connected - your core abstractions)
1. `SeoService` - 32 edges
2. `compilerOptions` - 24 edges
3. `buildBreadcrumbItems()` - 20 edges
4. `scripts` - 17 edges
5. `options` - 16 edges
6. `AnalyticsService` - 15 edges
7. `scripts` - 15 edges
8. `app()` - 14 edges
9. `BlogRepository` - 13 edges
10. `ContactFormComponent` - 12 edges

## Surprising Connections (you probably didn't know these)
- `files` --extends--> `src/polyfills.ts`  [EXTRACTED]
  apps/web/tsconfig.app.json → apps/web/angular.json
- `ApiBlogRepository` --implements--> `BlogRepository`  [EXTRACTED]
  apps/web/src/app/infrastructure/repositories/api/api-blog.repository.ts → apps/web/src/app/domain/repositories/blog.repository.ts
- `app()` --indirect_call--> `bootstrap()`  [INFERRED]
  apps/web/server.ts → apps/web/src/main.server.ts
- `ApiContactRepository` --implements--> `ContactRepository`  [EXTRACTED]
  apps/web/src/app/infrastructure/repositories/api/api-contact.repository.ts → apps/web/src/app/domain/repositories/contact.repository.ts
- `LocalityPageComponent` --references--> `LocalityEntry`  [EXTRACTED]
  apps/web/src/app/site/pages/locality-page.component.ts → apps/web/src/app/site/content/site-content.ts

## Import Cycles
- None detected.

## Communities (51 total, 8 thin omitted)

### Community 0 - "contact-form.component.ts"
Cohesion: 0.06
Nodes (29): CONTACT_REPOSITORY, ContactRepository, API_BASE_URL, normalizeBaseUrl(), ApiBlogPost, ApiBlogRepository, BlogSnapshotDoc, BlogSnapshotLike (+21 more)

### Community 1 - "contact.ts"
Cohesion: 0.07
Nodes (31): env, EnvSchema, parsed, smtpEnabled, pool, app, ensureDatabaseConnection(), start() (+23 more)

### Community 2 - "options"
Cohesion: 0.05
Nodes (49): build, extract-i18n, serve, test, builder, configurations, options, production (+41 more)

### Community 3 - "dependencies"
Cohesion: 0.07
Nodes (29): @angular/animations, @angular/common, @angular/compiler, @angular/core, @angular/forms, @angular/platform-browser, @angular/platform-browser-dynamic, @angular/platform-server (+21 more)

### Community 4 - "site-content.ts"
Cohesion: 0.08
Nodes (27): blogCategories, BlogCategoryEntry, ContentOrigin, ContentSection, CoverageEntry, estimateReadingTimeMinutes(), FaqEntry, goneRoutes (+19 more)

### Community 5 - "compilerOptions"
Cohesion: 0.07
Nodes (28): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames, importHelpers (+20 more)

### Community 6 - "scripts"
Cohesion: 0.07
Nodes (27): author, description, license, name, optionalDependencies, domino, private, scripts (+19 more)

### Community 7 - "server.ts"
Cohesion: 0.14
Nodes (26): app(), BlogListItem, BlogListResponse, buildRobotsTxt(), buildSitemapXml(), CachedBlogPosts, escapeXml(), fetchPublishedBlogPosts() (+18 more)

### Community 8 - "tsconfig.app.json"
Cohesion: 0.08
Nodes (24): @angular/localize, @angular/localize, compilerOptions, outDir, types, extends, files, include (+16 more)

### Community 9 - "AnalyticsService"
Cohesion: 0.13
Nodes (10): ConsentBannerComponent, Component, Inject, SiteFooterComponent, Component, SiteLayoutComponent, Component, AnalyticsService (+2 more)

### Community 10 - "scripts"
Cohesion: 0.08
Nodes (23): description, name, private, scripts, build, build:api, build:ssr:web, build:types (+15 more)

### Community 11 - "devDependencies"
Cohesion: 0.09
Nodes (23): @angular/cli, @angular/compiler-cli, @angular-devkit/build-angular, devDependencies, @angular/cli, @angular/compiler-cli, @angular-devkit/build-angular, @esbuild/linux-x64 (+15 more)

### Community 12 - "app.config.ts"
Cohesion: 0.15
Nodes (10): AppComponent, Component, Inject, appConfig, browserConfig, config, config, serverConfig (+2 more)

### Community 13 - "seo.service.ts"
Cohesion: 0.18
Nodes (16): contactPageFaqs, footerLinks, legalLinks, primaryNavigation, services, SITE_ADDRESS, SITE_EMAIL, SITE_NAME (+8 more)

### Community 14 - "buildBreadcrumbItems"
Cohesion: 0.15
Nodes (7): buildBreadcrumbItems(), ContactPageComponent, Component, HomePageComponent, Component, InfoPageComponent, Component

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, cors, dotenv, express, helmet, morgan, nodemailer, pg (+9 more)

### Community 16 - "dev.mjs"
Cohesion: 0.28
Nodes (15): children, colors, ensureDevDependencies(), ensurePortFree(), getDevComposeBaseArgs(), isTcpPortReachable(), logSystem(), main() (+7 more)

### Community 17 - "article-page.component.ts"
Cohesion: 0.20
Nodes (9): routes, BLOG_REPOSITORY, blogListIntro, BlogPostEntry, getBlogPostsByCategory(), legacyBlogPosts, ArticleView, RelatedPostView (+1 more)

### Community 18 - "ServiceEntry"
Cohesion: 0.23
Nodes (7): getServiceImage(), LocalityEntry, ServiceEntry, LocalityPageComponent, Component, ServiceDetailPageComponent, Component

### Community 19 - "SeoService"
Cohesion: 0.21
Nodes (5): NotFoundPageComponent, Component, SeoService, Inject, Injectable

### Community 20 - "compilerOptions"
Cohesion: 0.15
Nodes (12): compilerOptions, esModuleInterop, module, moduleResolution, outDir, resolveJsonModule, rootDir, skipLibCheck (+4 more)

### Community 21 - "web-empresa"
Cohesion: 0.15
Nodes (12): cli, analytics, newProjectRoot, projects, web-empresa, $schema, version, prefix (+4 more)

### Community 22 - "SiteHeaderComponent"
Cohesion: 0.26
Nodes (5): SiteHeaderComponent, Component, Inject, HostListener, ViewChild

### Community 23 - "compilerOptions"
Cohesion: 0.15
Nodes (12): compilerOptions, declaration, esModuleInterop, module, moduleResolution, outDir, rootDir, skipLibCheck (+4 more)

### Community 24 - "api/package.json"
Cohesion: 0.17
Nodes (11): main, name, private, scripts, build, dev, migrate, seed:blog (+3 more)

### Community 25 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, tsx, @types/cors, @types/morgan, @types/node, @types/pg, @types/node, @types/node (+4 more)

### Community 26 - "ChatWidgetEmbedComponent"
Cohesion: 0.27
Nodes (3): ChatWidgetEmbedComponent, Component, Inject

### Community 27 - "ArticlePageComponent"
Cohesion: 0.29
Nodes (4): formatSpanishDate(), sanitizeLegacyArticleHtml(), ArticlePageComponent, Component

### Community 28 - "shared-types/package.json"
Cohesion: 0.18
Nodes (10): files, main, name, private, scripts, build, type, types (+2 more)

### Community 29 - "BlogRepository"
Cohesion: 0.22
Nodes (4): BlogRepository, Inject, Inject, Inject

### Community 30 - "home-page.component.ts"
Cohesion: 0.22
Nodes (8): competitiveAdvantages, coverageHighlights, heroHighlights, homeFaqs, localities, processSteps, serviceCards, trustMetrics

### Community 31 - "generate-images.mjs"
Cohesion: 0.28
Nodes (8): __dirname, downloadImage(), generateImage(), IMAGES, main(), MODEL, OUTPUT_DIR, ROOT

### Community 32 - "001_init.sql"
Cohesion: 0.25
Nodes (6): blog_posts, contact_messages, scraper_jobs, users, access_requests, password_reset_tokens

### Community 33 - "services-page.component.ts"
Cohesion: 0.29
Nodes (5): serviceFaqs, serviceGroups, SITE_URL, SERVICE_ICONS, serviceIcon()

### Community 34 - "shared-types/src/index.ts"
Cohesion: 0.25
Nodes (7): ApiError, AuditUrlEntry, BlogCategory, BlogPost, ContactRequest, Paginated, PublicationEvent

### Community 35 - "BlogPageComponent"
Cohesion: 0.33
Nodes (3): BlogPageComponent, Component, Inject

### Community 38 - "typescript"
Cohesion: 0.40
Nodes (5): typescript, typescript, typescript, devDependencies, typescript

### Community 39 - "cloudflare-cutover.sh"
Cohesion: 0.80
Nodes (4): cf_api(), require_env(), cloudflare-cutover.sh script, upsert_a_record()

### Community 40 - "@types/express"
Cohesion: 0.67
Nodes (3): @types/express, @types/express, @types/express

## Knowledge Gaps
- **273 isolated node(s):** `ApiBlogPost`, `BlogSnapshotDoc`, `BlogSnapshotLike`, `PublicRuntimeConfig`, `Window` (+268 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `tsconfig.app.json`, `scripts`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `scripts`, `typescript`, `@types/express`, `jasmine-core`, `devDependencies`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `@angular/localize` connect `tsconfig.app.json` to `dependencies`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **What connects `ApiBlogPost`, `BlogSnapshotDoc`, `BlogSnapshotLike` to the rest of the system?**
  _273 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `contact-form.component.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.055904961565338925 - nodes in this community are weakly interconnected._
- **Should `contact.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07183673469387755 - nodes in this community are weakly interconnected._
- **Should `options` be split into smaller, more focused modules?**
  _Cohesion score 0.04591836734693878 - nodes in this community are weakly interconnected._