# Operativa diaria Electroria

## Build
```bash
npm run build:types
npm run build:api
npm run build:web
```

## Desarrollo local
```bash
npm run dev:deps:up
npm run dev:api
npm run dev:web
```

Dependencias locales:
- PostgreSQL en `127.0.0.1:5432`
- Mailpit en `127.0.0.1:1025` y UI `http://127.0.0.1:8025`

## Blog editorial
- Seed inicial legacy: `npm run seed:blog`
- Publicacion remota: `POST /api/v1/auctorio/publish`
- Firma requerida: `x-content-signature`

## Formularios
- Endpoint corporativo: `POST /api/v1/contact`
- Anti-spam:
  - honeypot `website`
  - rate limit por IP
  - Turnstile opcional si se configuran claves
- Sink Talkaris:
  - mismo endpoint
  - header `x-talkaris-chat-secret`

## Logs
```bash
docker compose --env-file infra/.env -f infra/docker-compose.yml logs -f web
docker compose --env-file infra/.env -f infra/docker-compose.yml logs -f api
docker compose --env-file infra/.env -f infra/docker-compose.yml logs -f postgres
```

## Backups
- Script: `infra/scripts/backup-postgres.sh`
- Retencion por defecto: 14 dias
- Restauracion: `infra/scripts/restore-postgres.sh`

## Datos visibles editables
- contenido corporativo: `apps/web/src/app/site/content/site-content.ts`
- posts legacy migrados: `apps/web/src/app/site/content/generated/legacy-blog-posts.json`
- mapa de URLs: `docs/audit/url-map-master.csv`
- variables de integracion: `infra/.env`

## Checklist rapido antes de publicar
1. Ejecutar `npm run build:api` y `npm run build:web`.
2. Verificar `curl https://electroria.com/health`.
3. Verificar `curl https://electroria.com/api/v1/health`.
4. Probar un formulario real.
5. Probar una publicacion firmada desde Auctorio.
6. Revisar redirects `301` y rutas `410`.
