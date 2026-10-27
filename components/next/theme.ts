// リニューアル（A案）で共通に使う事業ごとの色・イラスト・文言
// Tailwindが検出できるよう、クラス名は完全な文字列で持つ

export const illust = (name: string) => `/images/illust-pop/${name}.webp`;

export type ServiceKey = 'josys' | 'data' | 'ai' | 'web';

export const services: {
  key: ServiceKey;
  name: string;
  en: string;
  href: string;
  lead: string;
  points: string[];
  worry: string;
  text: string;
  bg: string;
  tint: string;
  border: string;
  dot: string;
}[] = [
  {
    key: 'josys',
    name: '情シス代行',
    en: 'IT Management',
    href: '/josys',
    lead: 'IT担当者がいない会社の「IT部門」として、PCやネットワークのトラブル対応から、Microsoft 365の管理、セキュリティ対策までまとめてお引き受けします。',
    points: ['PC・プリンタのトラブル対応', 'Microsoft 365・アカウント管理', 'セキュリティ対策・ルールづくり'],
    worry: 'PCやメールのトラブルを、\n詳しい社員が片手間で対応している',
    text: 'text-svc-josys',
    bg: 'bg-svc-josys',
    tint: 'bg-svc-josys/10',
    border: 'border-svc-josys',
    dot: 'bg-svc-josys/15'
  },
  {
    key: 'data',
    name: 'データ活用',
    en: 'Data Consulting',
    href: '/data-consulting',
    lead: 'Excelや基幹システムに散らばった数字を集めて、Power BIなどで「見ればわかる」形に。経営判断に使えるダッシュボードをつくります。',
    points: ['売上・在庫・原価の見える化', 'Power BI・Tableauの導入', '集計作業の自動化'],
    worry: '毎月の集計に何日もかかり、\n数字が出るころには手遅れ',
    text: 'text-svc-data',
    bg: 'bg-svc-data',
    tint: 'bg-svc-data/10',
    border: 'border-svc-data',
    dot: 'bg-svc-data/15'
  },
  {
    key: 'ai',
    name: '生成AI活用',
    en: 'Generative AI',
    href: '/gen-ai',
    lead: 'ChatGPTなどの生成AIを、安全なルールのもとで業務に取り入れます。使い方の研修から、社内資料に答えるAIの開発まで伴走します。',
    points: ['社内利用ルールの策定', '業務での使い方研修', '社内向けAIチャットの開発'],
    worry: 'AIを使ってみたいけれど、\n情報漏えいが心配で踏み出せない',
    text: 'text-svc-ai',
    bg: 'bg-svc-ai',
    tint: 'bg-svc-ai/10',
    border: 'border-svc-ai',
    dot: 'bg-svc-ai/15'
  },
  {
    key: 'web',
    name: 'Web制作',
    en: 'Web Production',
    href: '/web-production',
    lead: '初期費用0円・月額4,800円から。サーバーやドメイン、公開後の更新までまとめてお任せいただける、月額制のホームページ制作です。',
    points: ['初期費用0円の月額制', 'サーバー・メールも込み', '公開後の更新もお任せ'],
    worry: 'ホームページが古いまま、\n更新のしかたもわからない',
    text: 'text-svc-web',
    bg: 'bg-svc-web',
    tint: 'bg-svc-web/10',
    border: 'border-svc-web',
    dot: 'bg-svc-web/15'
  }
];

// 支援モデルケースの service（'生成AI' など）から事業を引く
export const serviceByName = (name: string) => services.find((service) => service.name.startsWith(name));
