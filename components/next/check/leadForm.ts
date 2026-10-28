// 診断結果の解禁フォームの送り先（Googleスプレッドシート＋Apps Script のウェブアプリ）
// 送られた内容をシートに記録し、資料PDFのリンクをメールで送る。スクリプトと設定手順は docs/it-check-gas.md
// endpoint が空のあいだは送信せず、画面で資料PDFをそのままダウンロードしてもらう
export const leadForm = {
  endpoint: ''
};

// 資料PDF（はじめてのDX読本）。scripts/dx-guide/build.mjs で作る
export const guidePdf = '/docs/arcle-dx-guide-k7m2.pdf';

// 送信先があるときは、資料PDFはメールでだけ渡す（適当な入力対策）
export const deliverByMail = Boolean(leadForm.endpoint);

// 明らかなダミーのアドレスは受け付けない（フリーメールは中小企業でも使うので弾かない）
export const isDummyEmail = (email: string) => /^(test|sample|dummy|example|a+|x+)@|@(example\.(com|jp|net|org)|test\.(com|jp)|sample\.(com|jp))$/i.test(email.trim());

export type Lead = { company: string; name: string; email: string; phone: string };

export const sendLead = async (lead: Lead, result: string) => {
  if (!leadForm.endpoint) return;
  // Apps Script は別オリジンで応答を読めない（no-cors）。text/plain にして事前確認（preflight）を起こさない
  await fetch(leadForm.endpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ ...lead, result, page: location.href })
  });
};
