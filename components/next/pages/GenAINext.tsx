import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Bot, Check, Code, Cpu, Lock, MessageSquare, Zap } from 'lucide-react';
import { ContactCta, PageHeader, SectionHead } from '../parts';
import { illust, services } from '../theme';

const ai = services.find((service) => service.key === 'ai')!;
const concerns = [
  { title: "セキュリティリスク", desc: "情報漏洩が怖くて社内導入が進まない", icon: Lock },
  { title: "活用イメージの欠如", desc: "具体的にどの業務に使えるか分からない", icon: Zap },
  { title: "開発リソース不足", desc: "自社専用のAIボットを作りたいが技術がない", icon: Code }
];
const offerings = [
  { 
    title: "ChatGPT Intro", 
    sub: "ChatGPT導入支援", 
    desc: "Enterprise版やTeam版の導入、ガイドライン策定をサポート。安全な利用環境を構築し、社内のAI活用を加速させます。", 
    icon: MessageSquare,
  },
  {
    title: "Custom Bot Dev",
    sub: "社内独自ボット開発",
    desc: "社内データを学習させたRAG（検索拡張生成）ボットを構築。社内のナレッジアクセスを劇的に効率化します。",
    icon: Bot,
  },
  {
    title: "Prompt Eng.",
    sub: "プロンプト研修",
    desc: "AIから望む回答を引き出すための技術を、実践形式でレクチャー。社員一人ひとりのAI活用能力を底上げします。",
    icon: Zap,
  },
  {
    title: "AI Automation",
    sub: "業務自動化",
    desc: "APIを活用し、既存の業務フローにAIを組み込んで自動化を実現。単純作業から解放され、コア業務に集中できる環境を作ります。",
    icon: Cpu,
  }
];
const plans = [
  { 
    name: "Starter", 
    sub: "導入支援プラン", 
    desc: "生成AIの安全な第一歩", 
    price: "5万円~", 
    features: [
      "ビジネス向け生成AIツール導入支援",
      "セキュリティポリシー策定",
      "利用ガイドライン作成",
      "AI基礎研修",
      "業務別プロンプトテンプレート提供",
      "導入後1ヶ月間の質問対応"
    ] 
  },
  { 
    name: "Standard", 
    sub: "活用定着プラン", 
    desc: "組織全体でのAI活用推進", 
    price: "20万円~", 
    features: [
      "Starterプランの全内容",
      "部門別AI活用コンサルティング",
      "カスタムプロンプト作成支援",
      "月次効果測定レポート＆改善提案",
      "社内AI推進チーム育成支援",
      "定例ミーティング",
      "チャット・メールサポート（無制限）",
      "ビジネス向けAI活用研修(応用)"
    ], 
    recommended: true 
  },
  { 
    name: "Development", 
    sub: "独自開発プラン", 
    desc: "専用AIシステムの構築", 
    price: "50万円~", 
    features: [
      "Standardプランの全内容",
      "社内データ学習RAGシステム開発",
      "既存システムとのデータ連携",
      "セキュアなプライベート環境構築",
      "専用AIチャットボット開発",
      "運用保守・継続的精度改善",
      "技術ドキュメント作成",
    ] 
  }
];
const features = ['最新のAIモデルに対応', 'セキュアな導入プロセスの徹底', '継続的な活用ロードマップ提示'];

const GenAINext: React.FC = () => (
  <div className="bg-cream text-sumi">
    <Helmet>
        <title>生成AI活用支援・ChatGPT導入 | 愛知・東海の中小企業向け - Arcle</title>
        <meta name="description" content="愛知・東海の中小企業向けの生成AI活用支援。ChatGPT Enterprise導入支援、社内独自RAGチャットボット開発、AI利用ガイドライン策定、プロンプトエンジニアリング研修、業務自動化。中小企業のAI活用を月額5万円〜で支援。" />
        <link rel="canonical" href="https://www.arcle.net/gen-ai" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://www.arcle.net/" },
            { "@type": "ListItem", "position": 2, "name": "生成AI活用支援", "item": "https://www.arcle.net/gen-ai" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "生成AI活用支援サービス",
          "provider": { "@id": "https://www.arcle.net/#organization" },
          "description": "ChatGPT Enterprise導入、社内独自RAGチャットボット開発、プロンプト研修、業務AI自動化を支援",
          "areaServed": [{ "@type": "State", "name": "愛知県" }, { "@type": "State", "name": "岐阜県" }, { "@type": "State", "name": "三重県" }],
          "offers": [
            { "@type": "Offer", "name": "導入支援プラン", "price": "50000", "priceCurrency": "JPY" },
            { "@type": "Offer", "name": "活用定着プラン", "price": "200000", "priceCurrency": "JPY" },
            { "@type": "Offer", "name": "独自開発プラン", "price": "500000", "priceCurrency": "JPY" }
          ]
        })}</script>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500;700;900&display=swap" />
    </Helmet>

    <PageHeader
      en="Generative AI"
      title={<>生成AI活用支援<br /><span className={ai.text}>AIと共に、創造の先へ。</span></>}
      lead={<>
        <p>生成AIは、単なるツールではありません。<br />ビジネスの常識を覆し、圧倒的な生産性を生み出す「パートナー」です。</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href='/contact' className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-sumi text-white text-sm font-bold hover:bg-svc-ai transition-colors">
            まずは無料で相談する<ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <a href='/gen-ai#services' className="inline-flex items-center px-7 py-4 rounded-full border-2 border-sumi text-sumi text-sm font-bold hover:bg-white transition-colors">サービス詳細を見る</a>
        </div>
      </>}
      crumbs={[{ label: 'サービス', href: '/services' }, { label: '生成AI活用' }]}
      service="ai"
      image={illust('svc-ai')}
    />

    <section className="py-20 md:py-28 bg-white rounded-t-[40px]">
      <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-center">
        <div>
          <SectionHead en="Your Concerns" enClass={ai.text} title={<>AIの波に、<br /><span className={ai.text}>乗り遅れて</span>いませんか？</>} lead="ChatGPTをはじめとする生成AIの進化は止まりません。導入への不安やリスクを解消し、安全かつ効果的にAIを業務に組み込みます。" />
          <div className={`rounded-full ${ai.tint} max-w-[300px] mx-auto`}>
            <img src={illust('worry-ai')} alt="" className="w-full" loading="lazy" />
          </div>
        </div>
        <div className="space-y-4">
          {concerns.map((item) => (
            <article key={item.title} className="flex items-start gap-5 rounded-[28px] bg-cream p-6 md:p-8">
              <span className={`shrink-0 w-12 h-12 grid place-items-center rounded-full ${ai.dot} ${ai.text}`}><item.icon className="w-6 h-6" aria-hidden="true" /></span>
              <div>
                <h3 className="font-head text-lg font-bold [word-break:auto-phrase]">{item.title}</h3>
                <p className="mt-2 text-sm leading-[1.9] text-sumi-muted">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="services" className="py-20 md:py-28 bg-cream-dark scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="AI Integration" enClass={ai.text} title="導入支援から独自開発まで" lead="導入支援から独自開発まで。貴社のAIトランスフォーメーションを加速させます。" />
        <div className="grid md:grid-cols-2 gap-6">
          {offerings.map((item, index) => (
            <article key={item.title} className="rounded-[28px] bg-white p-7 md:p-9">
              <div className="flex justify-between items-center gap-4">
                <span className={`w-16 h-16 rounded-full grid place-items-center ${ai.dot} ${ai.text}`}><item.icon className="w-8 h-8" aria-hidden="true" /></span>
                <span className={`font-en text-4xl font-bold ${ai.text} opacity-40`}>0{index + 1}</span>
              </div>
              <p className={`mt-7 font-en text-sm font-semibold tracking-wider ${ai.text}`}>{item.title}</p>
              <h3 className="mt-2 font-head text-2xl font-bold [word-break:auto-phrase]">{item.sub}</h3>
              <p className="mt-4 text-[15px] leading-[1.9] text-sumi-muted">{item.desc}</p>
              <ul className="mt-6 pt-5 border-t border-warm-line space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed"><Check className={`w-4 h-4 shrink-0 mt-1 ${ai.text}`} aria-hidden="true" />{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="Pricing" enClass={ai.text} title="プラン一覧" lead="導入から定着、独自開発まで。貴社の成長段階に合わせて最適なAI活用支援プランをご提供します" center />
        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <article key={plan.name} className={`relative flex flex-col rounded-[28px] border p-7 md:p-8 ${plan.recommended ? `${ai.tint} ${ai.border} shadow-[0_16px_40px_rgb(31_36_48/0.08)]` : 'bg-cream border-warm-line'}`}>
              {plan.recommended && <span className={`absolute -top-3 left-7 px-4 py-1 rounded-full text-xs font-bold text-white ${ai.bg}`}>おすすめ</span>}
              <p className={`font-en text-xl font-semibold ${ai.text}`}>{plan.name}</p>
              <h3 className="mt-2 font-head text-xl font-bold [word-break:auto-phrase]">{plan.sub}</h3>
              <p className="mt-3 text-sm text-sumi-muted">{plan.desc}</p>
              <p className="mt-6 text-4xl font-head font-bold">{plan.price}</p>
              <ul className="mt-7 mb-8 pt-6 border-t border-warm-line space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm leading-[1.8] text-sumi-muted"><Check className={`w-4 h-4 shrink-0 mt-1 ${ai.text}`} aria-hidden="true" /><span>{feature}</span></li>
                ))}
              </ul>
              <a href='/contact' aria-label={`${plan.sub}についてお問い合わせ`} className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-bold transition-colors ${plan.recommended ? 'bg-sumi text-white hover:bg-svc-ai' : 'border-2 border-sumi hover:bg-white'}`}>お問い合わせ<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
            </article>
          ))}
        </div>
        <div className="mt-8 space-y-2 text-xs leading-[1.9] text-sumi-muted">
          <p>※料金は税抜です。お客様の状況やご要望に応じてカスタマイズ可能です。</p>
          <p>※Developmentプランは要件定義後に個別見積もりとなります。まずはお気軽にご相談ください。</p>
        </div>
      </div>
    </section>

    <ContactCta title={<span className="[word-break:auto-phrase]">AIの可能性を、<br />あなたのビジネスに。</span>} body="「何から始めればいいか分からない」という段階でも大丈夫です。AI活用の第一歩を、私たちがサポートします。" />
  </div>
);

export default GenAINext;
