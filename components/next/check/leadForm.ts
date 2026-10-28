// 診断結果の解禁フォームの送り先（Googleフォーム）
// フォームの「回答を送信するURL（…/formResponse）」と、各項目の entry ID（entry.123456789 の形）を入れる
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

// 資料PDF（はじめてのDX読本）の置き場所。空のあいだは「準備中」と表示する
export const guidePdf = '';

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
