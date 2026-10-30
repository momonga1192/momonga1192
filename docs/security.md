# サイトのセキュリティ

2026-10-30に公開サイト（https://www.arcle.net）を外から点検し、見つかった弱いところを直した記録と、残りの作業です。

## 構成と、心配のいらないところ

- Vercelの静的配信。データベースはなく、SQLインジェクションの入口はない
- フォーム（`/contact`・`/it-check`）はGoogle Apps Scriptに送り、スプレッドシートに記録する（docs/it-check-gas.md）
- 記録先のスプレッドシートは、ログインしていない人には見えない
- `/.env`・`/.git/`・設定ファイル・ソースマップは公開されていない。公開しているJSにAPIキーは入っていない
- URLに入れた文字がページに出ることはなく、`dangerouslySetInnerHTML` も使っていない

## 2026-10-30に直したところ

- Apps Script：全部の項目の数式よけ、形の確認、大量送信よけ、`{"ok":…}` の返事（docs/it-check-gas.md）
- フォーム：Apps Scriptの返事を読み、記録できなかったら「送信できませんでした」と出す。IT健康診断も、送れないまま結果を開かない（読本のメールが届かなくなるため）
- 資料PDFのURLを、公開しているJSから外した。`/docs/` 以下は検索に載せない（`X-Robots-Tag: noindex`）。送ったメールのリンクが切れないよう、ファイル名は変えていない
- ヘッダー（vercel.json）：CSPに `frame-ancestors 'self'`、`X-XSS-Protection` を `0`（今のブラウザでは使われず、古いブラウザでは逆に穴になる）、HSTSから `preload` を外した（preload listには登録していない）
- 使っていない `netlify.toml` を消した（古いCSPが残っていた）
- react-router-dom を 7.18.5 に上げた（`npm audit` で0件）

## 残りの作業（お名前.comのDNS）

DNSはお名前.com（`dnsv.jp`）で管理している。

### DMARC（なりすましメールよけ）

今は `_dmarc` のレコードがなく、`@arcle.net` を名乗る偽メールが止められにくい。SPF（iCloud）とDKIM（`sig1._domainkey`）は設定済み。

1. まずは様子見で追加する（`rua` は集計レポートを受け取るアドレス）

   | ホスト名 | 種別 | 値 |
   |---|---|---|
   | `_dmarc` | TXT | `v=DMARC1; p=none; rua=mailto:<受け取るアドレス>` |

2. 2〜4週間レポートを見て、iCloud以外に `@arcle.net` で送っているサービス（メール配信など）がないことを確かめたら、`p=quarantine` に上げる
3. あわせてSPFの `~all` を `-all` にしてもよい

### CAA（証明書を発行できる事業者の指定）

今はCAAレコードがなく、どの認証局でも `arcle.net` の証明書を発行できる。今の証明書はLet's Encrypt（Vercelが発行）。

| ホスト名 | 種別 | 値 |
|---|---|---|
| （空欄＝arcle.net） | CAA | `0 issue "letsencrypt.org"` |

Vercelで証明書が発行できなくなったら、Vercelのドキュメントで今使っている認証局を確かめて足す。

### wwwなしのHSTS

`https://arcle.net` はVercelのドメイン設定で `www` に転送していて、HSTSはVercelの既定の値（`includeSubDomains` なし）になる。vercel.jsonでは変えられない。害は小さいので、このままでよい。
