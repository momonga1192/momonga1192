// 診断結果の解禁フォームの送り先
// TODO: Googleスプレッドシート＋Apps Script（ウェブアプリ）に差し替える。シートに記録し、資料PDFをメールで送る
// 今はGoogleフォーム形式（…/formResponse と entry ID）のまま
// action が空のあいだは送信せずに、画面の解禁だけ行う（開発中の確認用）
export const leadForm = {
  action: '',
  entries: {
    company: '',
    name: '',
    email: '',
    phone: '',
    // 総合点・分野ごとの点数・回答をまとめた文字列
    result: ''
  }
};

// 資料PDF（はじめてのDX読本）は画面では渡さず、送信先（Apps Script）からメールで送る
// 明らかなダミーのアドレスは受け付けない（フリーメールは中小企業でも使うので弾かない）
export const isDummyEmail = (email: string) => /^(test|sample|dummy|example|a+|x+)@|@(example\.(com|jp|net|org)|test\.(com|jp)|sample\.(com|jp))$/i.test(email.trim());

export type Lead = { company: string; name: string; email: string; phone: string };

export const sendLead = async (lead: Lead, result: string) => {
  if (!leadForm.action) return;
  const body = new URLSearchParams();
  const { entries } = leadForm;
  body.append(entries.company, lead.company);
  body.append(entries.name, lead.name);
  body.append(entries.email, lead.email);
  if (entries.phone) body.append(entries.phone, lead.phone);
  if (entries.result) body.append(entries.result, result);
  // Googleフォームは別オリジンなので、応答は読めない（no-cors）。送れたかどうかは確かめずに進む
  await fetch(leadForm.action, { method: 'POST', mode: 'no-cors', body });
};
