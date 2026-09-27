#!/usr/bin/env bash
set -euo pipefail
: "${COOLIFY_WEBHOOK:?Missing deployment webhook}"
: "${COOLIFY_APP_UUID:?Missing target application UUID}"
: "${COOLIFY_TOKEN:?Missing deployment token}"
: "${HEALTH_URL:?Missing public health URL}"
response=$(curl --fail --silent --show-error --max-time 60 \
  --request POST "$COOLIFY_WEBHOOK" \
  --header "Authorization: Bearer $COOLIFY_TOKEN" \
  --header 'Content-Type: application/json' \
  --data "$(jq -nc --arg uuid "$COOLIFY_APP_UUID" '{uuid:$uuid,force:false}')")
deployment_uuid=$(jq -er '.deployments[0].deployment_uuid' <<<"$response")
echo "Coolify deployment: $deployment_uuid"
status_url="${COOLIFY_WEBHOOK%/deploy}/deployments/$deployment_uuid"
for attempt in $(seq 1 72); do
  result=$(curl --fail --silent --show-error --max-time 30 \
    --header "Authorization: Bearer $COOLIFY_TOKEN" "$status_url")
  status=$(jq -er '.status' <<<"$result")
  case "$status" in
    finished)
      curl --fail --silent --show-error --max-time 30 --retry 5 --retry-delay 5 \
        --output /dev/null "$HEALTH_URL"
      echo 'Deployment and public health check finished successfully'
      exit 0
      ;;
    failed|cancelled|canceled) echo "Deployment $status"; exit 1 ;;
    *) echo "Deployment status: $status"; sleep 10 ;;
  esac
done
echo 'Timed out waiting for deployment'
exit 1
