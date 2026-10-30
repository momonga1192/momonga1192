// 診断結果の解禁フォームと、お問い合わせフォームの送り先（Googleスプレッドシート＋Apps Script のウェブアプリ）
// 送られた内容をシートに記録する。資料PDFのメールはArcleが手作業で送る。スクリプトと設定手順は docs/it-check-gas.md
export const leadForm = {
  endpoint: 'https://script.google.com/macros/s/AKfycbzllpLYVb3-jGw-EKIK386zkHI0lvD5fDYy1rb1Vq-IjaxTCnn4hCO2GYCgtaI8-RKciQ/exec'
};

// 資料PDF（はじめてのDX読本、scripts/dx-guide/build.mjs で作る）はArcleがメールで渡す。適当な入力で手に入らないよう、URLはサイトに書かない

// 明らかなダミーのアドレスは受け付けない（フリーメールは中小企業でも使うので弾かない）
export const isDummyEmail = (email: string) => /^(test|sample|dummy|example|a+|x+)@|@(example\.(com|jp|net|org)|test\.(com|jp)|sample\.(com|jp))$/i.test(email.trim());

export type Lead = { company: string; name: string; email: string; phone: string };

// 電話番号は全角を半角にそろえ、先頭に ' を付けてシートで数値にならないようにする（0 が消えるのを防ぐ）
const phoneCell = (phone: string) => `'${phone.replace(/[０-９－]/g, (c) => (c === '－' ? '-' : String.fromCharCode(c.charCodeAt(0) - 0xfee0)))}`;

// form でシートを分ける（it_check：1枚目のシート、contact：「お問い合わせ」シート）
// Apps Script の返事を読み、記録できなかったときは例外にする（画面で「送信できませんでした」と出す）
const post = async (form: 'it_check' | 'contact', data: Record<string, string>) => {
  if (!leadForm.endpoint) return;
  // text/plain にして事前確認（preflight）を起こさない。返事は転送先の script.googleusercontent.com から読める
  const res = await fetch(leadForm.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    // ページのURLは Apps Script の上限（300文字）に収める
    body: JSON.stringify({ form, ...data, page: location.href.slice(0, 300) })
  });
  const text = await res.text();
  // 今のスクリプトは {"ok":true}、前のスクリプトは ok とだけ返す
  let ok = text.trim() === 'ok';
  try {
    ok ||= JSON.parse(text).ok === true;
  } catch {
    /* JSONでない返事（エラーの画面など）は失敗として扱う */
  }
  if (!res.ok || !ok) throw new Error('lead not recorded');
};

export const sendLead = (lead: Lead, result: string) => post('it_check', { ...lead, phone: phoneCell(lead.phone), result });

// お問い合わせページ（/contact）のフォーム
export type Inquiry = Lead & { topic: string; message: string };

export const sendInquiry = (inquiry: Inquiry) => post('contact', { ...inquiry, phone: phoneCell(inquiry.phone) });
