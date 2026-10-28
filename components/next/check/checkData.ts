import type { ServiceKey } from '../theme';

// 会社のIT健康診断（/it-check）の質問・採点・結果の文章
// 4分野×5問。1問 0〜2点で、分野ごとに0〜10点になる

export type Level = 'low' | 'mid' | 'high';

export type Area = {
  key: ServiceKey;
  label: string;
  short: string;
  questions: string[];
  // レーダーチャートの細かい軸。分野を2つに分け、q はその分野の質問の番号（0始まり）
  facets: { label: string; q: number[] }[];
  // 一番弱い分野になったときの呼び名
  type: string;
  results: Record<Level, { text: string; todo: string[] }>;
};

export const choices = [
  { label: 'できている', point: 2 },
  { label: '一部だけ', point: 1 },
  { label: 'できていない・わからない', point: 0 }
];

export const areas: Area[] = [
  {
    key: 'josys',
    label: 'PC・セキュリティ',
    short: '守り',
    questions: [
      '社内のPC・アカウント・契約中のサービスが、一覧にまとまっている',
      'PCやメールのトラブルのとき、誰に相談するかが決まっている（詳しい社員の片手間ではない）',
      '社員が辞めたとき、その日のうちにアカウントを止めている',
      'Microsoft 365やGoogle Workspaceなどに、二段階認証を設定している',
      '大事なデータのバックアップを取っていて、元に戻せることを確かめている'
    ],
    facets: [
      { label: '管理・体制', q: [0, 1, 2] },
      { label: 'セキュリティ', q: [3, 4] }
    ],
    type: 'まずは足元固めタイプ',
    results: {
      low: {
        text: 'PCやアカウントの管理が人まかせで、トラブルや情報漏えいが起きたときに止められない状態です。まずは「何があるか」を一覧にするところから始めましょう。',
        todo: ['PC・アカウント・契約中のサービスを一覧にする', '退職や異動のときに、アカウントを止める手順を決める', 'Microsoft 365などに二段階認証を設定する']
      },
      mid: {
        text: '基本の対策はできていますが、詳しい人の頑張りに頼っている部分が残っています。担当者が休んでも回る仕組みにしておくと安心です。',
        todo: ['トラブルのときの相談先と手順を決めて、社内で共有する', 'バックアップから実際に戻せるかを一度試す', 'OSやソフトの更新の状況を、定期的に確認する']
      },
      high: {
        text: '守りの土台はしっかりしています。この土台があるので、データ活用やAIなど「攻め」のIT活用に安心して進めます。',
        todo: ['年に一度、アカウントと機器の一覧を見直す', '社員向けに、セキュリティの注意点を共有する', '次はデータ活用やAI活用で、業務を楽にする']
      }
    }
  },
  {
    key: 'data',
    label: 'データ活用',
    short: '見える化',
    questions: [
      '売上や在庫などの数字を、見たいときにすぐ見られる',
      '毎月の集計や報告資料づくりに、手作業で何時間もかかっていない',
      '同じデータが複数のExcelに散らばっていない（どれが最新か迷わない）',
      '会議では、感覚ではなく数字をもとに話し合っている',
      '顧客や商談の情報が、担当者の頭やメモではなく、共有の場所にある'
    ],
    facets: [
      { label: '集計・見える化', q: [0, 1, 2] },
      { label: '活用・共有', q: [3, 4] }
    ],
    type: '数字が眠っているタイプ',
    results: {
      low: {
        text: '数字がExcelや担当者の手元に散らばっていて、集めるだけで時間がかかっている状態です。置き場所をそろえるだけでも、集計の手間はぐっと減ります。',
        todo: ['毎月作っている集計や報告資料を書き出す', '元になるデータの置き場所を、1か所にまとめる', '一番時間がかかっている集計を1つ選んで、自動にする']
      },
      mid: {
        text: '必要な数字は集められていますが、手作業の集計が残っていて、見たいときにすぐ見られない状態です。',
        todo: ['手作業の集計を、自動で更新される表にする', '会議で見る数字を、5つくらいにしぼる', 'ダッシュボードで、いつでも同じ数字を見られるようにする']
      },
      high: {
        text: '数字をもとに判断できる状態です。データがそろっているので、AIでの分析や予測にもつなげやすいです。',
        todo: ['数字を見て次の打ち手を決める、会議の流れをつくる', '社内のデータを、AIで探したり分析したりできるようにする', '現場の入力の手間を、さらに減らす']
      }
    }
  },
  {
    key: 'ai',
    label: '生成AI活用',
    short: '効率化',
    questions: [
      '生成AI（ChatGPTなど）を仕事で使うときの、社内ルールがある',
      '会社として、社員が安心して使える生成AIのツールを用意している',
      '業務で生成AIを使っている社員がいる',
      '議事録・メール・資料づくりなど、AIに任せられそうな作業が分かっている',
      '社内のマニュアルや過去の資料を、すぐに探し出せる'
    ],
    facets: [
      { label: 'ルール・環境', q: [0, 1] },
      { label: '業務での活用', q: [2, 3, 4] }
    ],
    type: 'AIはこれからタイプ',
    results: {
      low: {
        text: '生成AIをまだ使えていないか、社員が個人の判断で使っている状態です。ルールがないままだと、情報漏えいのおそれもあります。',
        todo: ['生成AIを使うときの社内ルールをつくる', '会社として使うツールを決める', '議事録やメールの下書きなど、まず試す業務を1つ決める']
      },
      mid: {
        text: '一部の人は使い始めていますが、会社全体の活用にはなっていない状態です。使い方を共有すると、効果が一気に広がります。',
        todo: ['うまくいった使い方を、社内で共有する', 'よく使う指示文（プロンプト）を、ひな形にする', '社員向けの研修で、使える人を増やす']
      },
      high: {
        text: '生成AIを業務に取り入れられています。社内の資料やデータと組み合わせると、さらに大きく効率化できます。',
        todo: ['社内のマニュアルや資料に答える、AIチャットをつくる', '問い合わせ対応や書類づくりを、AIで自動にする', '効果を測って、使う業務を広げる']
      }
    }
  },
  {
    key: 'web',
    label: 'ホームページ',
    short: '発信',
    questions: [
      'ホームページの会社概要・サービス・連絡先が、最新になっている',
      'スマホで見ても、ホームページが読みやすい',
      'お知らせや実績を、年に数回以上は更新している',
      'ホームページの更新を、社内か依頼先ですぐにできる',
      'ホームページから、問い合わせや採用の応募が来ている'
    ],
    facets: [
      { label: '情報の鮮度', q: [0, 2, 3] },
      { label: '集客力', q: [1, 4] }
    ],
    type: '会社の顔をみがきたいタイプ',
    results: {
      low: {
        text: 'ホームページが古いままか、すぐに更新できない状態です。お客さまや求職者は、まずホームページで会社を確かめます。',
        todo: ['会社概要・サービス・連絡先を最新にする', 'スマホで見やすいかを確かめる', '誰がどうやって更新するかを決める']
      },
      mid: {
        text: 'ホームページはありますが、更新が止まりがちで、問い合わせや応募につながりきっていない状態です。',
        todo: ['お知らせや実績を、定期的に載せる', '問い合わせまでの流れを見直す', 'よくある質問や料金の目安を載せる']
      },
      high: {
        text: 'ホームページが、会社の顔としてしっかり働いています。',
        todo: ['問い合わせの数や、どこから来たかを定期的に見る', '採用ページや事例を充実させる', 'お役立ち記事で、検索から見つけてもらう']
      }
    }
  }
];

// 全分野が高いときの呼び名
export const allGoodType = '次のステージへタイプ';

export const questionCount = areas.reduce((n, a) => n + a.questions.length, 0);

// 点数の割合からランクを出す（S〜D）。level は結果の文章の出し分けに使う
export const rankOf = (rate: number) => (rate >= 0.9 ? 'S' : rate >= 0.8 ? 'A' : rate >= 0.6 ? 'B' : rate >= 0.4 ? 'C' : 'D');
export const levelLabel: Record<Level, string> = { low: 'これから', mid: 'もう一歩', high: 'できている' };

// 回答（質問の順に点数、未回答は -1）から分野ごとの点数を出す
export type AreaScore = { area: Area; score: number; max: number; rate: number; rank: string; level: Level; facets: { label: string; rate: number }[] };

export const scoreAnswers = (answers: number[]) => {
  let offset = 0;
  const byArea: AreaScore[] = areas.map((area) => {
    const own = area.questions.map((_, n) => Math.max(answers[offset + n] ?? 0, 0));
    offset += area.questions.length;
    const max = own.length * 2;
    const score = own.reduce((a, b) => a + b, 0);
    const rate = score / max;
    const level: Level = rate < 0.6 ? 'low' : rate < 0.8 ? 'mid' : 'high';
    const facets = area.facets.map((f) => ({ label: f.label, rate: f.q.reduce((a, q) => a + own[q], 0) / (f.q.length * 2) }));
    return { area, score, max, rate, rank: rankOf(rate), level, facets };
  });
  const total = Math.round((byArea.reduce((n, a) => n + a.score, 0) / (questionCount * 2)) * 100);
  const weakest = [...byArea].sort((a, b) => a.rate - b.rate)[0];
  const allGood = byArea.every((a) => a.level === 'high');
  // 進める順番：守り（情シス）が弱ければ最初に固め、そのあとは点数の低い順
  const order = [...byArea].sort((a, b) => {
    const guard = (s: AreaScore) => (s.area.key === 'josys' && s.level !== 'high' ? -1 : 0);
    return guard(a) - guard(b) || a.rate - b.rate;
  });
  return { byArea, total, weakest, allGood, order };
};
