# Operativa diaria Electroria

## Build
```bash
cd /var/www/electroria
npm run build
```

## Servicios del VPS
```bash
sudo systemctl status electroria-api.service
sudo systemctl status electroria-web.service
sudo journalctl -u electroria-api.service -f
sudo journalctl -u electroria-web.service -f
```

Puertos esperados:
- API: `127.0.0.1:3201`
- SSR: `127.0.0.1:4200`

## Base de datos
- Backup: `bash infra/scripts/backup-postgres.sh`
- Restore: `bash infra/scripts/restore-postgres.sh /ruta/backup.sql.gz`
- Migraciones manuales: `set -a; source /etc/electroria/api.env; set +a; node apps/api/dist/scripts/migrate.js`
- Seed blog legacy: `set -a; source /etc/electroria/api.env; set +a; node apps/api/dist/scripts/seed-legacy-blog.js`

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

## Datos visibles editables
- contenido corporativo: `apps/web/src/app/site/content/site-content.ts`
- posts legacy migrados: `apps/web/src/app/site/content/generated/legacy-blog-posts.json`
- mapa de URLs: `docs/audit/url-map-master.csv`
- env API: `/etc/electroria/api.env`
- env web: `/etc/electroria/web.env`

## Checklist rapido antes de publicar
1. Ejecutar `npm run build`.
2. Verificar `curl http://127.0.0.1:3201/health`.
3. Verificar `curl http://127.0.0.1:4200/health`.
4. Verificar `curl https://electroria.com/health`.
5. Verificar `curl https://electroria.com/api/v1/health`.
6. Probar un formulario real.
7. Probar una publicacion firmada desde Auctorio.
8. Revisar redirects `301` y rutas `410`.
