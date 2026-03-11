#!/usr/bin/env bash
set -euo pipefail

sudo systemctl restart electroria-api.service
sudo systemctl restart electroria-web.service
sudo systemctl reload nginx

echo "Services restarted. Verify health endpoints and journalctl output."
