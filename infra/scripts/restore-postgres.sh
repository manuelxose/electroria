#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 /path/to/backup.sql.gz" >&2
  exit 1
fi

BACKUP_FILE="$1"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${ROOT_DIR}/.env"

set -a
source "${ENV_FILE}"
set +a

gunzip -c "${BACKUP_FILE}" | docker compose --env-file "${ENV_FILE}" -f "${ROOT_DIR}/docker-compose.yml" exec -T postgres \
  psql -U "${POSTGRES_USER:-postgres}" -d "${POSTGRES_DB:-electroria}"

echo "Restore completed from ${BACKUP_FILE}"
