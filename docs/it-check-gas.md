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
// form が contact ならお問い合わせ（「お問い合わせ」シート＋お知らせメール）、it_check ならIT健康診断（1枚目のシート）
// 返事は {"ok":true} か {"ok":false,"error":"invalid|busy"}。サイトはこれを見て、受け付けた画面か、送れなかった知らせを出す
// サイトの画面のチェックは、このURLに直接送られると素通りするので、確かめることはすべてここでもう一度行う

// 項目ごとの文字数の上限
const LIMITS = { company: 100, name: 50, email: 254, phone: 30, topic: 50, message: 3000, result: 2000, page: 300 };
// お問い合わせの種別（サイトの components/ContactForm.tsx の topics と同じにする）
const TOPICS = ['サービスに関するご相談', '見積もり・料金に関するお問い合わせ', '業務提携・パートナーシップに関するお問い合わせ', 'その他'];
// 大量送信よけ：全体で1時間に受け付ける件数と、同じアドレスから続けて送れない秒数
const MAX_PER_HOUR = 30;
const SAME_EMAIL_SECONDS = 60;

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply('invalid');
  }
  if (!isValid(data)) return reply('invalid');

  // 同時に届いても、件数の数え間違いや行の重なりが起きないように1件ずつ処理する
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return reply('busy');
  try {
    if (!allow(data.email)) return reply('busy');
    const v = {};
    for (const k in LIMITS) v[k] = cell(data[k]);
    // 電話番号は先頭の 0 が消えないように、いつも文字として記録する
    v.phone = "'" + String(data.phone).replace(/^'/, '');

    const book = SpreadsheetApp.getActiveSpreadsheet();
    if (data.form === 'contact') {
      const sheet = book.getSheetByName('お問い合わせ') || book.insertSheet('お問い合わせ');
      if (sheet.getLastRow() === 0) sheet.appendRow(['日時', '会社名', 'お名前', 'メールアドレス', '電話番号', '種別', '内容', 'ページ', '対応']);
      sheet.appendRow([new Date(), v.company, v.name, v.email, v.phone, v.topic, v.message, v.page, '']);
      notify(data, book.getUrl());
    } else {
      const sheet = book.getSheets()[0];
      if (sheet.getLastRow() === 0) sheet.appendRow(['日時', '会社名', 'お名前', 'メールアドレス', '電話番号', '診断結果', 'ページ', 'メール送付']);
      sheet.appendRow([new Date(), v.company, v.name, v.email, v.phone, v.result, v.page, '']);
    }
    return reply();
  } finally {
    lock.releaseLock();
  }
}

// 送られた内容が、サイトのフォームから来る形になっているか
function isValid(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
  if (data.form !== 'contact' && data.form !== 'it_check') return false;
  for (const k in LIMITS) {
    if (data[k] === undefined) continue;
    if (typeof data[k] !== 'string' || data[k].length > LIMITS[k]) return false;
  }
  const filled = (k) => typeof data[k] === 'string' && data[k].trim() !== '';
  if (!['company', 'name', 'email', 'phone'].every(filled)) return false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) return false;
  if (!/^'?[0-9+\- ]{10,20}$/.test(data.phone)) return false;
  if (data.form === 'contact') return TOPICS.indexOf(data.topic) >= 0 && filled('message');
  return filled('result');
}

// 大量送信よけ。受け付けるときは数を1つ増やして true を返す
function allow(email) {
  const cache = CacheService.getScriptCache();
  const mailKey = 'mail:' + email.trim().toLowerCase();
  if (cache.get(mailKey)) return false;
  const countKey = 'count:' + Math.floor(Date.now() / 3600000);
  const count = Number(cache.get(countKey) || 0);
  if (count >= MAX_PER_HOUR) return false;
  cache.put(countKey, String(count + 1), 3600);
  cache.put(mailKey, '1', SAME_EMAIL_SECONDS);
  return true;
}

// シートに入れる値。= + - @ や空白・タブ・改行で始まると数式として動くことがあるので、先頭に ' を付けて文字にする
function cell(value) {
  const s = value === undefined ? '' : String(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  return /^[\s=+\-@]/.test(s) ? "'" + s : s;
}

// お問い合わせのお知らせメール。送れなくても、シートへの記録は済んでいるので受け付けとして扱う
function notify(data, bookUrl) {
  if (MailApp.getRemainingDailyQuota() < 1) return;
  const oneLine = (s) => String(s).replace(/[\r\n]+/g, ' ').slice(0, 60);
  try {
    MailApp.sendEmail({
      to: Session.getEffectiveUser().getEmail(),
      replyTo: data.email.trim(),
      subject: '【Arcle】お問い合わせ：' + oneLine(data.company) + ' ' + oneLine(data.name) + '様',
      body: ['サイトのお問い合わせフォームから届きました。', '',
        '会社名：' + data.company, 'お名前：' + data.name, 'メール：' + data.email, '電話：' + String(data.phone).replace(/^'/, ''),
        '種別：' + data.topic, '', data.message, '',
        '※ 名前・アドレス・内容は、送った人が入力したままのものです。本文中のリンクや、振込・ログインの依頼には注意してください。',
        '一覧：' + bookUrl].join('\n')
    });
  } catch (err) {
    console.error(err);
  }
}

function reply(error) {
  const body = error ? { ok: false, error: error } : { ok: true };
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}

// メールを送る許可を出すための関数。スクリプトを貼り替えたあと、エディタでこれを1回だけ実行する
function authorize() {
  MailApp.getRemainingDailyQuota();
}
```

IT健康診断の「メール送付」の列は空で記録されます。資料を送ったら「済」などと書いておくと、送り忘れを防げます。お問い合わせの「対応」の列も同じように使えます。

お知らせメールは、スクリプトを持っているGoogleアカウント（デプロイした人）のGmailに届きます。返信すると、お問い合わせした方のアドレスに返ります。

「お問い合わせ」シートは、1枚目より後ろに置いてください（IT健康診断は1枚目のシートに書くため）。

## 受け付ける前の確認（いたずら・大量送信よけ）

このURLはサイトのJavaScriptに入っていて誰でも見られるので、画面を通さずに直接送られることを前提にしています。

- 形の確認：`form` が `contact` か `it_check`、必須の項目がそろっている、文字数が上限以内、メールアドレスと電話番号の形、お問い合わせの種別が決まった4つのどれか。外れたら記録せず `{"ok":false,"error":"invalid"}`
- 数式よけ：シートに入れる値はすべて、`=` `+` `-` `@` や空白・タブ・改行で始まるとき先頭に `'` を付ける（シートでは `'` は表示されない）
- 大量送信よけ：全体で1時間に30件まで、同じメールアドレスからは60秒あけないと受け付けない。外れたら `{"ok":false,"error":"busy"}`。数は `MAX_PER_HOUR` と `SAME_EMAIL_SECONDS` で変えられる
- お知らせメール：1日の送信の上限を使い切っていたら送らない（記録はする）。本文の最後に、なりすましへの注意書きを入れている

サイトは返事を読んで、`ok` でなければ「送信できませんでした」と出し、入力を残したまま送り直してもらいます。お問い合わせの種別を変えるときは、`TOPICS` と `components/ContactForm.tsx` の `topics` を両方直してください。

迷惑な送信がそれでも続くときは、Cloudflare Turnstile（ロボットかどうかの確認）を足します。サイトキーとシークレットキーの発行が必要です。

## スクリプトを直したとき

スクリプトを貼り替えて保存し、「デプロイ」→「デプロイを管理」→ 鉛筆のアイコン →「バージョン：新しいバージョン」→「デプロイ」。URLは変わりません。

デプロイしたら、シートに記録されない送り方で、返事が届くかを確かめます（`invalid` が返ればOK。前のスクリプトのままだとエラーの画面が返る）。

```bash
curl -sL -X POST -H 'Content-Type: text/plain' --data '{"form":"check"}' 'https://script.google.com/macros/s/…/exec'
```

メールを送る処理が新しく入ったときは、デプロイの前に、エディタ上部の関数の選択で `authorize` を選んで「実行」し、出てきた画面でメール送信を許可してください（許可しないと、お問い合わせの記録もできません）。

## あとでIT健康診断の資料メールを自動にするとき

`doPost` の IT健康診断の `appendRow` のあとに `MailApp.sendEmail({ to: data.email, subject: …, body: … })` を足し、新しいバージョンでデプロイし直す（メール送信の許可を求められる）。あわせてサイトの「追ってお送りします」の文言を見直す。
