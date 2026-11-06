#!/usr/bin/env bash
# 毎朝cronから呼ぶ：アクセス日報を作ってFolioのメモ「Arcleアクセス日報」（id arcle-access-report）を置き換える。
# 履歴は ~/.local/state/arcle-report/YYYY-MM-DD.md に残す。
set -uo pipefail
export PATH=$HOME/google-cloud-sdk/bin:$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin
cd "$(dirname "$0")/.."
state=$HOME/.local/state/arcle-report
mkdir -p "$state"
out=$state/$(TZ=Asia/Tokyo date +%F).md
put() { node "$HOME/dev/morning-triage/tools/folio_put_doc.mjs" arcle-access-report "Arcleアクセス日報" "$1"; }
if node scripts/access-report.mjs > "$out.tmp" 2> "$state/last-error.log"; then
  mv "$out.tmp" "$out"
  put "$out" && echo "$(date '+%F %T') ok $out" >> "$state/history.log"
else
  { echo "$(TZ=Asia/Tokyo date '+%-m/%-d %H:%M') の日報は作れませんでした。"; echo; echo '```'; tail -n 5 "$state/last-error.log"; echo '```'; echo; echo 'gcloud の認証切れなら、UM350で `gcloud auth application-default login` をやり直してください。'; } > "$out.tmp"
  put "$out.tmp"
  echo "$(date '+%F %T') error $(tail -n 1 "$state/last-error.log")" >> "$state/history.log"
  exit 1
fi
