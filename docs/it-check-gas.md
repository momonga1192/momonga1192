# IT健康診断の申し込みとお問い合わせを受けるApps Script

サイトの2つのフォームから送られた内容を、同じGoogleスプレッドシートに1行ずつ記録します。

- `/it-check` の解禁フォーム：1枚目のシート
- `/contact` のお問い合わせフォーム：「お問い合わせ」シート（なければ自動で作る）。届いたらArcleのGmailにお知らせメールを送る

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
// サイト（https://www.arcle.net）のフォームから送られた内容を、このスプレッドシートに記録する
// form が contact ならお問い合わせ（「お問い合わせ」シート＋お知らせメール）、それ以外はIT健康診断（1枚目のシート）
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  // = や + で始まる入力が、シートで数式として動かないようにする（電話番号はサイト側で ' を付けて送る）
  for (const k of ['company', 'name', 'email', 'topic', 'message', 'result']) {
    if (typeof data[k] === 'string' && /^[=+\-@]/.test(data[k])) data[k] = "'" + data[k];
  }
  const book = SpreadsheetApp.getActiveSpreadsheet();
  if (data.form === 'contact') {
    const sheet = book.getSheetByName('お問い合わせ') || book.insertSheet('お問い合わせ');
    if (sheet.getLastRow() === 0) sheet.appendRow(['日時', '会社名', 'お名前', 'メールアドレス', '電話番号', '種別', '内容', 'ページ', '対応']);
    sheet.appendRow([new Date(), data.company, data.name, data.email, data.phone, data.topic, data.message, data.page, '']);
    MailApp.sendEmail({
      to: Session.getEffectiveUser().getEmail(),
      replyTo: data.email,
      subject: '【Arcle】お問い合わせ：' + data.company + ' ' + data.name + '様',
      body: ['サイトのお問い合わせフォームから届きました。', '',
        '会社名：' + data.company, 'お名前：' + data.name, 'メール：' + data.email, '電話：' + String(data.phone).replace(/^'/, ''),
        '種別：' + data.topic, '', data.message, '', '一覧：' + book.getUrl()].join('\n')
    });
    return ContentService.createTextOutput('ok');
  }
  const sheet = book.getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(['日時', '会社名', 'お名前', 'メールアドレス', '電話番号', '診断結果', 'ページ', 'メール送付']);
  sheet.appendRow([new Date(), data.company, data.name, data.email, data.phone, data.result, data.page, '']);
  return ContentService.createTextOutput('ok');
}

// メールを送る許可を出すための関数。スクリプトを貼り替えたあと、エディタでこれを1回だけ実行する
function authorize() {
  MailApp.getRemainingDailyQuota();
}
```

IT健康診断の「メール送付」の列は空で記録されます。資料を送ったら「済」などと書いておくと、送り忘れを防げます。お問い合わせの「対応」の列も同じように使えます。

お知らせメールは、スクリプトを持っているGoogleアカウント（デプロイした人）のGmailに届きます。返信すると、お問い合わせした方のアドレスに返ります。

「お問い合わせ」シートは、1枚目より後ろに置いてください（IT健康診断は1枚目のシートに書くため）。

## スクリプトを直したとき

スクリプトを貼り替えて保存し、「デプロイ」→「デプロイを管理」→ 鉛筆のアイコン →「バージョン：新しいバージョン」→「デプロイ」。URLは変わりません。

メールを送る処理が新しく入ったときは、デプロイの前に、エディタ上部の関数の選択で `authorize` を選んで「実行」し、出てきた画面でメール送信を許可してください（許可しないと、お問い合わせの記録もできません）。

## あとでIT健康診断の資料メールを自動にするとき

`doPost` の最後の `appendRow` のあとに `MailApp.sendEmail({ to: data.email, subject: …, body: … })` を足し、新しいバージョンでデプロイし直す（メール送信の許可を求められる）。あわせてサイトの「追ってお送りします」の文言を見直す。
