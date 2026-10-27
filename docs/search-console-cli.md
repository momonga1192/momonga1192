# Search Console CLIメモ

更新日: 2026-03-06

## 前提
- Search Consoleに`https://www.arcle.net`を登録済み
- `gcloud`インストール済み
- 認証済み:
  - `gcloud auth application-default login --scopes=https://www.googleapis.com/auth/webmasters,https://www.googleapis.com/auth/webmasters.readonly,openid,https://www.googleapis.com/auth/userinfo.email`

## 実行コマンド
- サイトマップ再送信:
  - `npm run gsc:submit-sitemap`
- 新規記事URLの検査:
  - `npm run gsc:inspect:new`

## siteUrlの確認
Search Console APIは `siteUrl` の完全一致が必要です（例: `https://www.arcle.net/` または `sc-domain:arcle.net`）。

```bash
TOKEN="$(gcloud auth application-default print-access-token)"
curl -sS "https://www.googleapis.com/webmasters/v3/sites" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "x-goog-user-project: ${GCP_QUOTA_PROJECT:-arcle-489401}"
```

返ってきた `siteEntry[].siteUrl` をそのまま使ってください。

## 補足
- `scripts/search-console.sh`は次をサポート:
  - `submit-sitemap`
  - `inspect-url`
  - `inspect-batch`
- URL Inspection APIはインデックス状態の確認のみ可能です。
- 「インデックス登録をリクエスト」はSearch Console画面から手動実行が必要です。
- `ACCESS_TOKEN_SCOPE_INSUFFICIENT` が出る場合は、上記スコープ付きで `application-default login` をやり直してください。
