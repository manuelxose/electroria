# Deploy SSR Electroria en VPS

## Topologia final
- `web`: Angular 20 SSR en `127.0.0.1:4000`
- `api`: Express + PostgreSQL en red privada Docker
- `postgres`: persistencia de leads y blog
- `nginx` host-level: proxy inverso publico `electroria.com` y `www.electroria.com`
- `Talkaris`: servicio externo consumido por widget white-label
- `Auctorio`: servicio externo que publica via webhook firmado

## Requisitos
- Ubuntu 24.04 LTS
- Docker Engine + Docker Compose plugin
- Nginx en host
- Certbot o equivalente para TLS
- DNS `A` de `electroria.com` y `www.electroria.com` apuntando al VPS

## Variables de entorno
Usa `infra/.env.example` como base para `infra/.env`.

Minimas obligatorias:
- `WEB_PUBLIC_URL`
- `CORS_ORIGIN`
- `DATABASE_URL`
- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `CONTACT_NOTIFICATION_EMAIL`
- `TALKARIS_LEAD_WEBHOOK_SECRET`
- `AUCTORIO_WEBHOOK_SECRET`

Opcionales:
- `SMTP_*` para notificaciones por email
- `TURNSTILE_ENABLED`, `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`
- `CHAT_WIDGET_*` si cambian host, API o site key de Talkaris

## Arranque inicial
```bash
cd /var/www/electroria
cp infra/.env.example infra/.env
docker compose --env-file infra/.env -f infra/docker-compose.yml up -d --build
```

La API ejecuta automaticamente:
- migraciones SQL
- seed idempotente del blog legacy
- arranque del servidor Express

## Nginx host
Instala `infra/nginx/default.conf` como sitio en `/etc/nginx/sites-available/electroria.conf` y enlazalo en `sites-enabled`.

Reemplaza si hace falta:
- rutas de certificado LetsEncrypt
- `server_name`

Despues:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## TLS
Ejemplo con Certbot:
```bash
sudo certbot --nginx -d electroria.com -d www.electroria.com
```

## systemd
Servicio de stack preparado en:
- `infra/systemd/electroria-stack.service`

Instalacion:
```bash
sudo cp infra/systemd/electroria-stack.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now electroria-stack.service
```

## Smoke tests
```bash
curl -I https://electroria.com/
curl -I https://electroria.com/servicios
curl -I https://electroria.com/blog
curl -I https://electroria.com/contacto
curl https://electroria.com/health
curl https://electroria.com/api/v1/health
curl https://electroria.com/sitemap.xml
curl https://electroria.com/robots.txt
```

## Operaciones post-deploy
- Actualizar: `docker compose --env-file infra/.env -f infra/docker-compose.yml up -d --build`
- Logs web: `docker compose --env-file infra/.env -f infra/docker-compose.yml logs -f web`
- Logs api: `docker compose --env-file infra/.env -f infra/docker-compose.yml logs -f api`
- Backup: `bash infra/scripts/backup-postgres.sh`
- Restore: `bash infra/scripts/restore-postgres.sh /ruta/backup.sql.gz`
- Rollback rapido: `bash infra/scripts/rollback-release.sh`
