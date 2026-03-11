# Deploy SSR Electroria en VPS

## Topologia final
- `web`: Angular SSR en `127.0.0.1:4200`
- `api`: Express + PostgreSQL en `127.0.0.1:3201`
- `postgres`: servicio local del host
- `nginx`: proxy inverso publico para `electroria.com` y `www.electroria.com`
- `systemd`: `electroria-api.service` y `electroria-web.service`
- `Cloudflare`: proxy de `electroria.com` y `www.electroria.com`, SSL `Full (strict)`

## Requisitos
- Ubuntu 24.04 LTS
- Node.js 22
- PostgreSQL local en el host
- Nginx en el host
- Certbot
- DNS de `electroria.com` y `www.electroria.com` gestionados en Cloudflare

## Directorios persistentes
- `/etc/electroria/api.env`
- `/etc/electroria/web.env`
- `/var/lib/electroria/uploads`
- `/var/www/letsencrypt`

## Variables de entorno
Usa estas plantillas como base:
- `infra/env/api.env.example`
- `infra/env/web.env.example`

Obligatorias en `api.env`:
- `NODE_ENV=production`
- `PORT=3201`
- `DATABASE_URL`
- `CORS_ORIGIN=https://electroria.com`
- `UPLOADS_DIR=/var/lib/electroria/uploads`
- `ELECTRORIA_SITE_URL=https://electroria.com`
- `CONTACT_NOTIFICATION_EMAIL`
- `TALKARIS_LEAD_WEBHOOK_SECRET`
- `AUCTORIO_WEBHOOK_SECRET`

Obligatorias en `web.env`:
- `NODE_ENV=production`
- `PORT=4200`
- `API_INTERNAL_URL=http://127.0.0.1:3201`
- `CANONICAL_HOST=electroria.com`

## Provision inicial
```bash
sudo useradd --system --home /var/lib/electroria --shell /usr/sbin/nologin electroria || true
sudo mkdir -p /etc/electroria /var/lib/electroria/uploads /var/www/letsencrypt
sudo chown -R electroria:electroria /var/lib/electroria
```

## Build
```bash
cd /var/www/electroria
npm ci
npm run build
```

## PostgreSQL
Crear rol y base dedicados en el host:

```bash
sudo -u postgres psql
CREATE ROLE electroria LOGIN PASSWORD 'change-me';
CREATE DATABASE electroria OWNER electroria;
\q
```

## systemd
Instala las unidades del repo:

```bash
sudo cp infra/systemd/electroria-api.service /etc/systemd/system/
sudo cp infra/systemd/electroria-web.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now electroria-api.service electroria-web.service
```

La API ejecuta antes de arrancar:
- migraciones SQL
- seed idempotente del blog legacy

## Nginx
### Bootstrap HTTP para emitir Let’s Encrypt
1. Instala `infra/nginx/bootstrap-http.conf` en `/etc/nginx/sites-available/electroria.conf`.
2. Enlaza el sitio y recarga Nginx.

```bash
sudo cp infra/nginx/bootstrap-http.conf /etc/nginx/sites-available/electroria.conf
sudo ln -sfn /etc/nginx/sites-available/electroria.conf /etc/nginx/sites-enabled/electroria.conf
sudo nginx -t
sudo systemctl reload nginx
```

### Emitir certificado
Tras apuntar `electroria.com` y `www.electroria.com` al VPS:

```bash
sudo certbot certonly \
  --webroot \
  -w /var/www/letsencrypt \
  -d electroria.com \
  -d www.electroria.com
```

### Configuracion final HTTPS
```bash
sudo cp infra/nginx/default.conf /etc/nginx/sites-available/electroria.conf
sudo nginx -t
sudo systemctl reload nginx
```

## Cloudflare cutover
El script del repo usa el token compartido del VPS en `~/.config/cloudflare/api.env`.

Secuencia recomendada:
1. Cambiar `electroria.com` y `www.electroria.com` al VPS con proxy desactivado temporalmente.
2. Emitir Let’s Encrypt.
3. Activar proxy para ambos hostnames.
4. Dejar el modo SSL en `strict`.
5. Purgar caché.

El corte final puede ejecutarse con:

```bash
CF_ZONE_NAME=electroria.com CF_ORIGIN_IPV4=109.123.248.164 bash infra/cloudflare-cutover.sh
```

## Smoke tests
```bash
curl http://127.0.0.1:3201/health
curl http://127.0.0.1:4200/health
curl -H 'Host: electroria.com' http://127.0.0.1/
curl https://electroria.com/
curl https://electroria.com/servicios
curl https://electroria.com/blog
curl https://electroria.com/contacto
curl https://electroria.com/health
curl https://electroria.com/api/v1/health
curl https://electroria.com/sitemap.xml
curl https://electroria.com/robots.txt
```

## Operaciones post-deploy
- Logs API: `journalctl -u electroria-api.service -f`
- Logs web: `journalctl -u electroria-web.service -f`
- Reinicio: `sudo systemctl restart electroria-api.service electroria-web.service`
- Backup: `bash infra/scripts/backup-postgres.sh`
- Restore: `bash infra/scripts/restore-postgres.sh /ruta/backup.sql.gz`
