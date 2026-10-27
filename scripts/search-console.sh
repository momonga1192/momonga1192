#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  scripts/search-console.sh submit-sitemap <site_url> <sitemap_url>
  scripts/search-console.sh inspect-url <site_url> <page_url> [language_code]
  scripts/search-console.sh inspect-batch <site_url> <url_file> [language_code]

Examples:
  scripts/search-console.sh submit-sitemap https://www.arcle.net https://www.arcle.net/sitemap.xml
  scripts/search-console.sh inspect-url https://www.arcle.net https://www.arcle.net/articles
  scripts/search-console.sh inspect-batch https://www.arcle.net scripts/new-article-urls.txt

Notes:
  - Requires gcloud CLI authentication:
      gcloud auth application-default login
  - URL Inspection API can check status, but cannot request indexing.
EOF
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing command: $1" >&2
    exit 1
  fi
}

urlencode() {
  python3 -c 'import urllib.parse, sys; print(urllib.parse.quote(sys.argv[1], safe=""))' "$1"
}

get_token() {
  gcloud auth application-default print-access-token
}

get_quota_project() {
  if [[ -n "${GCP_QUOTA_PROJECT:-}" ]]; then
    echo "${GCP_QUOTA_PROJECT}"
    return
  fi

  local adc_file="${HOME}/.config/gcloud/application_default_credentials.json"
  if [[ -f "${adc_file}" ]]; then
    local adc_quota
    adc_quota="$(python3 - <<'PY'
import json, os
path = os.path.expanduser("~/.config/gcloud/application_default_credentials.json")
try:
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    print(data.get("quota_project_id", ""))
except Exception:
    print("")
PY
)"
    if [[ -n "${adc_quota}" ]]; then
      echo "${adc_quota}"
      return
    fi
  fi

  gcloud config get-value project 2>/dev/null || true
}

require_quota_project() {
  local quota_project="$1"
  if [[ -z "${quota_project}" || "${quota_project}" == "(unset)" ]]; then
    echo "Quota project is not set. Set GCP_QUOTA_PROJECT or run: gcloud auth application-default set-quota-project <PROJECT_ID>" >&2
    exit 1
  fi
}

submit_sitemap() {
  local site_url="$1"
  local sitemap_url="$2"
  local token
  local quota_project
  token="$(get_token)"
  quota_project="$(get_quota_project)"
  require_quota_project "${quota_project}"
  local response
  local body
  local http_code

  response="$(curl -sS -w $'\n%{http_code}' -X PUT \
    "https://www.googleapis.com/webmasters/v3/sites/$(urlencode "$site_url")/sitemaps/$(urlencode "$sitemap_url")" \
    -H "Authorization: Bearer ${token}" \
    -H "x-goog-user-project: ${quota_project}" \
    -H "Content-Type: application/json")"

  body="$(printf '%s' "$response" | sed '$d')"
  http_code="$(printf '%s' "$response" | tail -n1)"

  if [[ "$http_code" -ge 200 && "$http_code" -lt 300 ]]; then
    echo "${body}"
    echo "Sitemap submitted: ${sitemap_url}"
    return 0
  fi

  echo "${body}" >&2
  echo "Sitemap submit failed with HTTP ${http_code}" >&2
  return 1
}

inspect_url() {
  local site_url="$1"
  local page_url="$2"
  local language_code="${3:-ja-JP}"
  local token
  local quota_project
  token="$(get_token)"
  quota_project="$(get_quota_project)"
  require_quota_project "${quota_project}"

  local response
  local body
  local http_code

  response="$(curl -sS -w $'\n%{http_code}' -X POST \
    "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect" \
    -H "Authorization: Bearer ${token}" \
    -H "x-goog-user-project: ${quota_project}" \
    -H "Content-Type: application/json" \
    -d "{
      \"inspectionUrl\": \"${page_url}\",
      \"siteUrl\": \"${site_url}\",
      \"languageCode\": \"${language_code}\"
    }")"

  body="$(printf '%s' "$response" | sed '$d')"
  http_code="$(printf '%s' "$response" | tail -n1)"

  if [[ "$http_code" -ge 200 && "$http_code" -lt 300 ]]; then
    echo "${body}"
    return 0
  fi

  echo "${body}" >&2
  echo "URL inspect failed with HTTP ${http_code} for ${page_url}" >&2
  return 1
}

inspect_batch() {
  local site_url="$1"
  local url_file="$2"
  local language_code="${3:-ja-JP}"

  if [[ ! -f "$url_file" ]]; then
    echo "URL file not found: ${url_file}" >&2
    exit 1
  fi

  while IFS= read -r page_url; do
    if [[ -z "$page_url" || "$page_url" =~ ^# ]]; then
      continue
    fi

    echo "Inspecting: ${page_url}"
    inspect_url "$site_url" "$page_url" "$language_code" || true
    echo
  done <"$url_file"
}

main() {
  require_cmd curl
  require_cmd gcloud
  require_cmd python3

  if [[ $# -lt 1 ]]; then
    usage
    exit 1
  fi

  local cmd="$1"
  shift

  case "$cmd" in
    submit-sitemap)
      [[ $# -eq 2 ]] || { usage; exit 1; }
      submit_sitemap "$1" "$2"
      ;;
    inspect-url)
      [[ $# -ge 2 && $# -le 3 ]] || { usage; exit 1; }
      inspect_url "$1" "$2" "${3:-ja-JP}"
      ;;
    inspect-batch)
      [[ $# -ge 2 && $# -le 3 ]] || { usage; exit 1; }
      inspect_batch "$1" "$2" "${3:-ja-JP}"
      ;;
    *)
      usage
      exit 1
      ;;
  esac
}

main "$@"
