#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${ROOT_DIR}/.env"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/electroria}"
TIMESTAMP="$(date +%F-%H%M%S)"

mkdir -p "${BACKUP_DIR}"
set -a
source "${ENV_FILE}"
set +a

docker compose --env-file "${ENV_FILE}" -f "${ROOT_DIR}/docker-compose.yml" exec -T postgres \
  pg_dump -U "${POSTGRES_USER:-postgres}" "${POSTGRES_DB:-electroria}" \
  | gzip > "${BACKUP_DIR}/electroria-postgres-${TIMESTAMP}.sql.gz"

find "${BACKUP_DIR}" -type f -name 'electroria-postgres-*.sql.gz' -mtime +14 -delete

echo "Backup created at ${BACKUP_DIR}/electroria-postgres-${TIMESTAMP}.sql.gz"
