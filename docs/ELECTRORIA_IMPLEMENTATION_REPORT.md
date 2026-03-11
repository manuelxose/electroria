# 1. Resumen ejecutivo
- Electroria queda reimplementada en Angular 20 SSR con routing público limpio, SEO server-side, blog preservado, formularios propios y despliegue preparado para VPS.
- Talkaris se integra como widget white-label embebido en páginas de captación.
- Auctorio se integra como pipeline editorial por webhook HMAC para publicar y despublicar posts.
- La base operativa queda soportada por `apps/web`, `apps/api`, `infra/` y la documentación en `docs/`.

# 2. Inventario del sitio actual de Electroria
- URLs públicas auditadas:
  - `/`
  - `/contacto/`
  - `/blog/`
  - `/instalaciones-electricas/`
  - `/diseno-de-cuadros-electricos/`
  - `/cuadros-electricos-galicia/`
  - `/instalacion-electrica-en-viviendas-guia-completa/`
  - `/cuadros-electricos-funcionamiento-y-componentes/`
  - `/cuadros-electricos-regulaciones-y-normativa/`
  - `/category/cuadros-electricos/`
- Contenido preservado:
  - hero comercial
  - claim de experiencia
  - métricas de confianza
  - servicios
  - ventajas competitivas
  - cobertura
  - proceso
  - testimonios
  - contacto y FAQ
  - 3 posts visibles del blog
- Inventario bruto y rastreo:
  - `docs/audit/electroria-site-inventory.json`
  - `docs/audit/url-map-master.csv`

# 3. Problemas e inconsistencias detectadas
- Branding inconsistente entre `Electroria`, `ElectroRía` y `TecnoRia`.
- Canonicals mezclados entre apex y `www`.
- Home legacy con doble `H1`.
- Canonical roto en `/diseno-de-cuadros-electricos/`.
- Páginas legales enlazadas pero inexistentes.
- Enlaces de menú/footer hacia rutas sin contenido real.
- Teléfonos y emails inconsistentes en distintos bloques.
- Blog legacy con HTML contaminado por Divi/TOC y wrappers residuales.

# 4. Auditoría funcional y técnica de Talkaris
- Naturaleza:
  - plataforma de conversación/chat web con widget embebible y backend propio
  - foco claro en captación, conversación y entrega de lead
- Estado técnico detectado:
  - `chat-api`
  - `widget`
  - `ingest-worker`
  - persistencia PostgreSQL/pgvector en el repositorio original
- Integrabilidad:
  - mejor encaje por widget white-label
  - evita iframe genérico y evita microfrontend innecesario
  - entrega leads a Electroria por `POST /api/v1/contact`
- Valor para Electroria:
  - chat comercial en home, servicios, blog y contacto
  - captación asistida sin exponer marca externa

# 5. Auditoría funcional y técnica de Auctorio
- Naturaleza:
  - estudio/plataforma editorial con publicación multi-site
  - orientado a drafts, revisión humana y publicación
- Estado técnico detectado:
  - studio web privado
  - publisher genérico por webhook
  - firma HMAC `x-content-signature`
- Integrabilidad:
  - no debe aparecer como landing pública
  - encaja como pipeline interno del blog corporativo
- Valor para Electroria:
  - publicar, actualizar y retirar artículos sin tocar código
  - escalar el blog técnico/comercial con control editorial

# 6. Estrategia de integración de Electroria + Talkaris + Auctorio
- Opción validada: Electroria como marca pública única con Talkaris y Auctorio operando en white-label/interno.
- Talkaris:
  - widget embebido con `brandLabel=Electroria`
  - `entryContext` por tipo de página
  - sink seguro hacia la API de Electroria
- Auctorio:
  - webhook firmado `POST /api/v1/auctorio/publish`
  - soporta `publishDraft`, `updateDraft`, `publish`, `unpublish`
- Visualmente:
  - no se muestra marca Talkaris/Auctorio en navegación pública
  - la integración se nota como capacidad de producto, no como parche externo

# 7. Arquitectura Angular final recomendada
- `apps/web`: Angular 20 standalone + SSR/hydration
- `apps/api`: Express + PostgreSQL
- `packages/shared-types`: contratos mínimos reutilizables
- Rutas públicas finales:
  - `/`
  - `/servicios`
  - `/servicios/:slug`
  - `/empresa`
  - `/zonas`
  - `/proyectos`
  - `/certificaciones`
  - `/blog`
  - `/blog/categoria/:slug`
  - `/blog/:slug`
  - `/contacto`
  - `/aviso-legal`
  - `/privacidad`
  - `/cookies`
  - `/404`
- SEO:
  - meta tags por ruta
  - sitemap dinámico
  - robots dinámico
  - JSON-LD `Electrician`, `Service`, `Article`, `FAQPage`, `BreadcrumbList`

# 8. Plan de migración/reimplementación
- Fase 1 completada:
  - auditoría de WordPress legacy
  - inventario de URLs, roturas e inconsistencias
- Fase 2 completada:
  - normalización del contenido útil
  - importación de 3 posts visibles
- Fase 3 completada:
  - Angular SSR público
  - API same-origin
  - formularios y legales
- Fase 4 completada:
  - widget white-label de Talkaris
  - webhook editorial de Auctorio
  - redirects `301` y rutas `410`

# 9. Plan de despliegue en VPS
- SO recomendado: Ubuntu 24.04 LTS
- Orquestación: Docker Compose
- Reverse proxy: Nginx en host
- SSL: Let’s Encrypt
- Rollout:
  - `docker compose up -d --build`
  - Nginx proxy a `127.0.0.1:4000`
- Hardening base:
  - HTTPS forzado
  - HSTS
  - `X-Content-Type-Options`
  - `X-Frame-Options`
  - `Referrer-Policy`
- Operativa:
  - backups PostgreSQL
  - restore
  - service file systemd
  - rollback simple por compose

# 10. Mapa de URLs original → final
Consulta completa:
- `docs/audit/url-map-master.csv`

Decisiones clave:
- páginas válidas preservadas: `200`
- páginas históricas recolocadas: `301`
- rutas fantasma sin continuidad: `410`

# 11. Riesgos y mitigaciones
- Riesgo: contenido legacy con HTML sucio.
  - Mitigación: limpieza runtime y seed editorial controlado.
- Riesgo: formularios spam.
  - Mitigación: honeypot, rate limit y Turnstile opcional.
- Riesgo: dependencia de servicios externos Talkaris/Auctorio.
  - Mitigación: contratos simples por widget/webhook y fallback funcional del sitio.
- Riesgo: deuda residual del clon técnico inicial.
  - Mitigación: runtime público ya desacoplado y API reescrita.

# 12. Checklist QA
- Validar `200/301/410` de todas las rutas del CSV maestro.
- Validar `GET /health` y `GET /api/v1/health`.
- Validar render SSR en home, servicios, blog, post, contacto y legales.
- Validar envío de formulario web.
- Validar entrega de lead desde Talkaris.
- Validar publicación y retirada desde webhook Auctorio.
- Validar sitemap y robots.
- Validar responsive móvil/escritorio.

# 13. Documentación operativa
- Deploy SSR:
  - `docs/DEPLOYMENT_SSR.md`
- Operativa diaria:
  - `docs/OPERATIONS.md`
- Infra:
  - `infra/env/api.env.example`
  - `infra/env/web.env.example`
  - `infra/nginx/bootstrap-http.conf`
  - `infra/nginx/default.conf`
  - `infra/systemd/electroria-api.service`
  - `infra/systemd/electroria-web.service`
  - `infra/scripts/backup-postgres.sh`
  - `infra/scripts/restore-postgres.sh`
  - `infra/scripts/rollback-release.sh`

# 14. Mejoras recomendadas a futuro
- Purga definitiva de carpetas legacy no usadas del clon inicial.
- Panel editorial propio en Electroria si se quiere operar sin depender de Auctorio.
- Observabilidad: Sentry, uptime externo y métricas de formularios.
- Lighthouse/perf pass adicional para reducir bundle inicial.
- Ampliación SEO del blog con nuevas categorías y clusters locales por zona/servicio.
