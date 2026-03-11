#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${ROOT_DIR}/.env"

docker compose --env-file "${ENV_FILE}" -f "${ROOT_DIR}/docker-compose.yml" down
docker compose --env-file "${ENV_FILE}" -f "${ROOT_DIR}/docker-compose.yml" up -d

echo "Rollback/restart executed. Verify containers and health endpoints."
