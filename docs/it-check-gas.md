# IT健康診断の申し込みを受けるApps Script

`/it-check` の解禁フォームから送られた内容を、Googleスプレッドシートに1行ずつ記録します。
資料PDF（『はじめてのDX読本』）のメールは、今はArcleが手作業で送ります（2026-10-28 栗原さんの判断）。
PDFのURL：https://www.arcle.net/docs/arcle-dx-guide-k7m2.pdf

- 記録先のスプレッドシート：https://docs.google.com/spreadsheets/d/19A4kLbvYPrNafHE8ZBM4X4lyWtBPm3JU9S5PVm33tRQ/edit

## 設定の手順

1. 記録先のスプレッドシートで「拡張機能」→「Apps Script」を開く
2. 最初から入っている `function myFunction() {}` を消して、下の「スクリプト」を丸ごと貼り付けて保存する
3. 右上の「デプロイ」→「新しいデプロイ」
   - 種類の選択（歯車）で「ウェブアプリ」
   - 次のユーザーとして実行：**自分**
   - アクセスできるユーザー：**全員**
   - 「デプロイ」を押す
4. 初回は「アクセスを承認」を求められるので、自分のGoogleアカウントを選んで許可する（「このアプリはGoogleで確認されていません」と出たら「詳細」→「（安全ではないページ）に移動」）
5. 表示された「ウェブアプリのURL」（`https://script.google.com/macros/s/…/exec`）を `components/next/check/leadForm.ts` の `endpoint` に入れて公開する

## スクリプト

```javascript
// IT健康診断（https://www.arcle.net/it-check）の申し込みを、このシートに記録する
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(['日時', '会社名', 'お名前', 'メールアドレス', '電話番号', '診断結果', 'ページ', 'メール送付']);
  sheet.appendRow([new Date(), data.company, data.name, data.email, data.phone, data.result, data.page, '']);
  return ContentService.createTextOutput('ok');
}
```

最後の「メール送付」の列は空で記録されます。資料を送ったら「済」などと書いておくと、送り忘れを防げます。

## スクリプトを直したとき

「デプロイ」→「デプロイを管理」→ 鉛筆のアイコン →「バージョン：新しいバージョン」→「デプロイ」。URLは変わりません。

## あとでメールを自動にするとき

`doPost` の `appendRow` のあとに `MailApp.sendEmail({ to: data.email, subject: …, body: … })` を足し、新しいバージョンでデプロイし直す（メール送信の許可を求められる）。あわせてサイトの「追ってお送りします」の文言を見直す。
