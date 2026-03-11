# Electroria Plan Maestro - Estado de Ejecucion

Fecha de corte: 2026-03-11

## Estado actual

- Monorepo activo:
  - `apps/web`
  - `apps/api`
  - `packages/shared-types`
  - `infra`
  - `docs`
- Web Angular 20 SSR y API Express sobre PostgreSQL preparadas para despliegue host-level.
- Integraciones externas activas:
  - Talkaris como sink de leads
  - Auctorio como emisor del webhook editorial
- Uploads servidos en `/uploads/*`.
- Superficie publica reducida a sitio corporativo, blog, contacto y webhooks.

## Validaciones cerradas

- `npm run -w apps/web build`
- `npm run -w apps/api build`
- `npm run build`
- SSR smoke en `/`, `/servicios`, `/blog` y `/contacto`
- Contacto corporativo persistiendo en PostgreSQL
- Webhook editorial `/api/v1/auctorio/publish` disponible
- Configuracion de `nginx + systemd + PostgreSQL` definida para el VPS
- Cloudflare preparado para corte de `electroria.com` y `www.electroria.com`

## Legacy eliminado

- rutas legacy de autenticacion
- backoffice interno heredado
- repositorios y contratos de auth/scraper del frontend
- runtime `googleClientId`
- tablas legacy `users`, `access_requests`, `password_reset_tokens`, `scraper_jobs`

## Pendiente operativo

1. Mantener sincronizado el secreto de `AUCTORIO_WEBHOOK_SECRET` en el emisor externo si cambia.
