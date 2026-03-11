#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 /path/to/backup.sql.gz" >&2
  exit 1
fi

BACKUP_FILE="$1"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SHARED_ENV_FILE="${ROOT_DIR}/.env"

if [[ -f "${SHARED_ENV_FILE}" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "${SHARED_ENV_FILE}"
  set +a
fi

API_ENV_FILE="${API_ENV_FILE:-/etc/electroria/api.env}"

if [[ ! -f "${API_ENV_FILE}" ]]; then
  echo "Missing API env file: ${API_ENV_FILE}" >&2
  exit 1
fi

if [[ ! -f "${BACKUP_FILE}" ]]; then
  echo "Backup file not found: ${BACKUP_FILE}" >&2
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "${API_ENV_FILE}"
set +a

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "DATABASE_URL is required in ${API_ENV_FILE}" >&2
  exit 1
fi

gunzip -c "${BACKUP_FILE}" | psql "${DATABASE_URL}"

echo "Restore completed from ${BACKUP_FILE}"
