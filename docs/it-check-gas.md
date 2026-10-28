# IT健康診断の申し込みを受けるApps Script

`/it-check` の解禁フォームから送られた内容をGoogleスプレッドシートに記録し、入力されたメールアドレスに『はじめてのDX読本』のリンクを送ります。あわせて、Arcle宛てにも「申し込みがありました」のメールを送ります。

## 設定の手順（5分くらい）

1. Googleドライブで新しいスプレッドシートを作る（名前の例：「IT健康診断の申し込み」）
2. メニューの「拡張機能」→「Apps Script」を開く
3. 最初から入っている `function myFunction() {}` を消して、下の「スクリプト」を丸ごと貼り付けて保存する
4. 右上の「デプロイ」→「新しいデプロイ」
   - 種類の選択（歯車）で「ウェブアプリ」
   - 次のユーザーとして実行：**自分**
   - アクセスできるユーザー：**全員**
   - 「デプロイ」を押す
5. 初回は「アクセスを承認」を求められるので、自分のGoogleアカウントを選んで許可する（「このアプリはGoogleで確認されていません」と出たら「詳細」→「（安全ではないページ）に移動」）
6. 表示された「ウェブアプリのURL」（`https://script.google.com/macros/s/…/exec`）をコピーして、Claudeに渡す
   - Claudeが `components/next/check/leadForm.ts` の `endpoint` に入れて公開すると、資料PDFはメールでだけ渡る形に切り替わる

送信元は、スクリプトを作ったGoogleアカウントのGmailになります。無料のGoogleアカウントは1日100通まで送れます（Google Workspaceなら1,500通）。

## スクリプト

```javascript
// IT健康診断（https://www.arcle.net/it-check）の申し込みを受け取る
const PDF_URL = 'https://www.arcle.net/docs/arcle-dx-guide-k7m2.pdf';
// 申し込みのお知らせを受け取るアドレス（空ならスクリプトを作ったアカウント）
const NOTIFY_TO = '';

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const email = String(data.email || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return ContentService.createTextOutput('invalid');

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(['日時', '会社名', 'お名前', 'メールアドレス', '電話番号', '診断結果', 'ページ']);
  sheet.appendRow([new Date(), data.company, data.name, email, data.phone, data.result, data.page]);

  MailApp.sendEmail({
    to: email,
    name: 'Arcle（アークル）',
    subject: '【Arcle】『はじめてのDX読本』をお送りします',
    body: [
      `${data.company}`,
      `${data.name} 様`,
      '',
      'このたびは「会社のIT健康診断」をご利用いただき、ありがとうございます。',
      'お約束の資料『IT担当がいない会社のための はじめてのDX読本』は、こちらからダウンロードいただけます。',
      '',
      PDF_URL,
      '',
      '■ 診断結果',
      `${data.result}`.replace(/ \/ 回答:.*$/, ''),
      '',
      '診断結果をもとに、何から始めればよいかを一緒に整理する無料相談も承っています。',
      'お気軽にご相談ください。',
      'https://www.arcle.net/contact',
      '',
      '――――――――――',
      'Arcle（アークル）',
      '〒491-0835 愛知県一宮市あずら2丁目8',
      'https://www.arcle.net',
      '※お心当たりのない場合は、お手数ですがこのメールを破棄してください。'
    ].join('\n')
  });

  MailApp.sendEmail({
    to: NOTIFY_TO || Session.getEffectiveUser().getEmail(),
    subject: `【IT健康診断】${data.company} ${data.name} 様から申し込みがありました`,
    body: [`会社名：${data.company}`, `お名前：${data.name}`, `メール：${email}`, `電話：${data.phone || '（なし）'}`, '', `診断結果：${data.result}`, '', `シート：${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`].join('\n')
  });

  return ContentService.createTextOutput('ok');
}
```

## スクリプトを直したとき

「デプロイ」→「デプロイを管理」→ 鉛筆のアイコン →「バージョン：新しいバージョン」→「デプロイ」。URLは変わりません。
