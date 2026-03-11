#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SHARED_ENV_FILE="${ROOT_DIR}/.env"

if [[ -f "${SHARED_ENV_FILE}" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "${SHARED_ENV_FILE}"
  set +a
fi

API_ENV_FILE="${API_ENV_FILE:-/etc/electroria/api.env}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/electroria}"
TIMESTAMP="$(date +%F-%H%M%S)"

if [[ ! -f "${API_ENV_FILE}" ]]; then
  echo "Missing API env file: ${API_ENV_FILE}" >&2
  exit 1
fi

mkdir -p "${BACKUP_DIR}"

set -a
# shellcheck disable=SC1090
source "${API_ENV_FILE}"
set +a

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "DATABASE_URL is required in ${API_ENV_FILE}" >&2
  exit 1
fi

pg_dump --dbname="${DATABASE_URL}" | gzip > "${BACKUP_DIR}/electroria-postgres-${TIMESTAMP}.sql.gz"

find "${BACKUP_DIR}" -type f -name 'electroria-postgres-*.sql.gz' -mtime +14 -delete

echo "Backup created at ${BACKUP_DIR}/electroria-postgres-${TIMESTAMP}.sql.gz"
