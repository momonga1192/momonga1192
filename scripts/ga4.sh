#!/usr/bin/env bash
# GA4のデータをData APIで取る。
# gcloudのログインではアナリティクスの権限がブロックされるため、
# サービスアカウント ga4-reader に成り代わってトークンを取る（鍵ファイルは作らない）。
set -euo pipefail

SA="${GA4_SA:-ga4-reader@arcle-489401.iam.gserviceaccount.com}"
QUOTA_PROJECT="${GCP_QUOTA_PROJECT:-arcle-489401}"
PROPERTY="${GA4_PROPERTY_ID:-}"

usage() {
  cat <<'EOF'
Usage:
  scripts/ga4.sh properties
  scripts/ga4.sh report <開始日> <終了日> <ディメンション,...> <指標,...> [件数]
  scripts/ga4.sh raw <runReportのJSON>
  scripts/ga4.sh admin <keyEvents|customDimensions|dataStreams|dataRetentionSettings> [METHOD] [JSON]

Examples:
  scripts/ga4.sh report 28daysAgo yesterday date sessions,activeUsers
  scripts/ga4.sh report 28daysAgo yesterday pagePath screenPageViews,activeUsers 20
  scripts/ga4.sh report 28daysAgo yesterday sessionSourceMedium sessions,keyEvents
  scripts/ga4.sh report 28daysAgo yesterday eventName eventCount

Notes:
  - 設定を変えるときは GA4_SCOPE=https://www.googleapis.com/auth/analytics.edit を付ける
    （ga4-reader はプロパティの編集者）
  - GA4_PROPERTY_ID を指定しなければ、見えるプロパティが1つのときはそれを使う
  - 前提: gcloud auth application-default login 済み、かつ自分に ga4-reader の
    「サービスアカウント トークン作成者」権限、ga4-reader にGA4プロパティの閲覧者権限
EOF
}

user_token() { gcloud auth application-default print-access-token; }

sa_token() {
  curl -sS -X POST "https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${SA}:generateAccessToken" \
    -H "Authorization: Bearer $(user_token)" \
    -H "x-goog-user-project: ${QUOTA_PROJECT}" \
    -H "Content-Type: application/json" \
    -d "{\"scope\":[\"${GA4_SCOPE:-https://www.googleapis.com/auth/analytics.readonly}\"],\"lifetime\":\"900s\"}" |
    python3 -c 'import json,sys; d=json.load(sys.stdin); print(d["accessToken"]) if "accessToken" in d else sys.exit(json.dumps(d, ensure_ascii=False))'
}

# サービスアカウントのトークンは自分のプロジェクトで課金されるので x-goog-user-project は付けない
api() {
  local method="$1" url="$2" body="${3:-}"
  curl -sS -X "$method" "$url" \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Content-Type: application/json" \
    ${body:+-d "$body"}
}

list_properties() {
  api GET "https://analyticsadmin.googleapis.com/v1beta/accountSummaries" |
    python3 -c '
import json, sys
d = json.load(sys.stdin)
if "error" in d: sys.exit(json.dumps(d["error"], ensure_ascii=False))
for a in d.get("accountSummaries", []):
    for p in a.get("propertySummaries", []):
        print(p["property"].split("/")[1], p.get("displayName", ""), "(" + a.get("displayName", "") + ")", sep="\t")'
}

resolve_property() {
  [[ -n "$PROPERTY" ]] && return
  local props
  props="$(list_properties)"
  if [[ -z "$props" ]]; then
    echo "見えるGA4プロパティがありません。GA4の管理 → プロパティのアクセス管理で ${SA} を閲覧者に追加してください。" >&2
    exit 1
  fi
  if [[ "$(echo "$props" | wc -l)" -gt 1 ]]; then
    echo "プロパティが複数あります。GA4_PROPERTY_ID を指定してください:" >&2
    echo "$props" >&2
    exit 1
  fi
  PROPERTY="$(echo "$props" | cut -f1)"
}

print_report() {
  python3 -c '
import json, sys
d = json.load(sys.stdin)
if "error" in d: sys.exit(json.dumps(d["error"], ensure_ascii=False))
dims = [h["name"] for h in d.get("dimensionHeaders", [])]
mets = [h["name"] for h in d.get("metricHeaders", [])]
print("\t".join(dims + mets))
for r in d.get("rows", []):
    print("\t".join([v["value"] for v in r.get("dimensionValues", [])] + [v["value"] for v in r.get("metricValues", [])]))
print("(rows: %s)" % d.get("rowCount", 0), file=sys.stderr)'
}

cmd="${1:-}"
case "$cmd" in
  properties)
    TOKEN="$(sa_token)"
    list_properties
    ;;
  report)
    [[ $# -ge 5 ]] || { usage; exit 1; }
    TOKEN="$(sa_token)"
    resolve_property
    body="$(python3 -c '
import json, sys
start, end, dims, mets, limit = sys.argv[1:6]
first = mets.split(",")[0]
order = {"dimension": {"dimensionName": "date"}} if dims == "date" else {"metric": {"metricName": first}, "desc": True}
print(json.dumps({
    "dateRanges": [{"startDate": start, "endDate": end}],
    "dimensions": [{"name": n} for n in dims.split(",") if n],
    "metrics": [{"name": n} for n in mets.split(",")],
    "orderBys": [order],
    "limit": int(limit),
}))' "$2" "$3" "$4" "$5" "${6:-50}")"
    api POST "https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY}:runReport" "$body" | print_report
    ;;
  admin)
    [[ $# -ge 2 ]] || { usage; exit 1; }
    TOKEN="$(sa_token)"
    resolve_property
    api "${3:-GET}" "https://analyticsadmin.googleapis.com/${GA4_ADMIN_VERSION:-v1beta}/properties/${PROPERTY}/$2" "${4:-}"
    ;;
  raw)
    [[ $# -ge 2 ]] || { usage; exit 1; }
    TOKEN="$(sa_token)"
    resolve_property
    api POST "https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY}:runReport" "$2"
    ;;
  *)
    usage
    exit 1
    ;;
esac
