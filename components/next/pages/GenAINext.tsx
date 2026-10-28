import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Bot, Check, Code, Cpu, Lock, MessageSquare, Zap } from 'lucide-react';
import { ContactCta, IconTile, Mark, PageHeader, PlanCard, SectionHead, Sparkle, Ticker, card, press } from '../parts';
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
  <div className="bg-cream text-sumi overflow-x-clip">
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
        <div className="mt-8 flex flex-wrap gap-4">
          <a href='/contact' className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-sumi text-white text-sm font-bold border-[2.5px] border-sumi shadow-[5px_5px_0_#F2B544] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_#F2B544]">
            まずは無料で相談する<ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <a href='/gen-ai#services' className={`inline-flex items-center px-7 py-4 rounded-full bg-white text-sumi text-sm font-bold ${card} shadow-[5px_5px_0_#1F2430] ${press}`}>サービス詳細を見る</a>
        </div>
      </>}
      crumbs={[{ label: 'サービス', href: '/services' }, { label: '生成AI活用' }]}
      service="ai"
      image={illust('svc-ai')}
    />

    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-center">
        <div>
          <SectionHead en="Your Concerns" enClass={ai.text} title={<>AIの波に、<br /><Mark><span className={ai.text}>乗り遅れて</span></Mark>いませんか？</>} lead="ChatGPTをはじめとする生成AIの進化は止まりません。導入への不安やリスクを解消し、安全かつ効果的にAIを業務に組み込みます。" />
          <div className={`group pop-reveal relative aspect-square grid place-items-center rounded-[32px] ${ai.tint} max-w-[320px] mx-auto p-5 ${card}`}>
            <img src={illust('worry-ai')} alt="" className="pop-tilt w-full" loading="lazy" />
            <Sparkle className="absolute -top-5 -right-3 w-9 h-9 text-mustard" />
          </div>
        </div>
        <div className="space-y-5">
          {concerns.map((item, i) => (
            <article key={item.title} className={`group pop-reveal flex items-start gap-5 rounded-[28px] bg-cream p-6 md:p-8 ${card}`} style={{ animationDelay: `${i * 80}ms` }}>
              <span className={`pop-wiggle shrink-0 w-12 h-12 grid place-items-center rounded-2xl text-white border-2 border-sumi shadow-[3px_3px_0_#1F2430] -rotate-6 ${ai.bg}`}><item.icon className="w-6 h-6" aria-hidden="true" /></span>
              <div>
                <h3 className="font-head text-xl md:text-2xl font-black [word-break:auto-phrase]">{item.title}</h3>
                <p className="mt-2 text-sm leading-[1.9] text-sumi-muted [word-break:auto-phrase]">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="services" className="py-20 md:py-28 bg-cream bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px] border-y-[2.5px] border-sumi scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="AI Integration" enClass={ai.text} title={<>導入支援から<Mark>独自開発</Mark>まで</>} lead="導入支援から独自開発まで。貴社のAIトランスフォーメーションを加速させます。" />
        <div className="grid md:grid-cols-2 gap-6">
          {offerings.map((item, index) => (
            <article key={item.title} className={`group pop-reveal rounded-[28px] bg-white p-7 md:p-9 ${card}`} style={{ animationDelay: `${index * 80}ms` }}>
              <IconTile icon={<item.icon className="w-7 h-7" aria-hidden="true" />} num={index + 1} bg={ai.bg} className="pop-wiggle" />
              <p className={`mt-6 font-en text-sm font-bold tracking-wider ${ai.text}`}>{item.title}</p>
              <h3 className="mt-1 font-head text-2xl md:text-[28px] font-black leading-snug [word-break:auto-phrase]">{item.sub}</h3>
              <p className="mt-4 text-[15px] leading-[1.9] text-sumi-muted">{item.desc}</p>
              <ul className="mt-6 pt-5 border-t-2 border-dashed border-warm-line space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed"><Check className={`w-4 h-4 shrink-0 mt-1 ${ai.text}`} aria-hidden="true" />{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* サービスの名前を流すテープ */}
    <Ticker items={offerings.map((item) => item.sub)} tone="bg-svc-ai text-white" className="-mb-4 -mt-[2.5px]" />

    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="Pricing" enClass={ai.text} title="プラン一覧" lead="導入から定着、独自開発まで。貴社の成長段階に合わせて最適なAI活用支援プランをご提供します" center />
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-6 items-stretch pt-4">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} index={i} service="ai" ctaLabel={`${plan.sub}についてお問い合わせ`} plan={{ ...plan, amount: plan.price.replace(/万円~$/, ''), unit: '万円〜', priceNote: '税抜' }} />
          ))}
        </div>
        <div className="mt-10 rounded-[28px] bg-cream border-2 border-dashed border-sumi/40 p-6 space-y-2 text-xs leading-[1.9] text-sumi-muted">
          <p>※料金は税抜です。お客様の状況やご要望に応じてカスタマイズ可能です。</p>
          <p>※Developmentプランは要件定義後に個別見積もりとなります。まずはお気軽にご相談ください。</p>
        </div>
      </div>
    </section>

    <ContactCta title={<span className="[word-break:auto-phrase]">AIの可能性を、<br />あなたのビジネスに。</span>} body="「何から始めればいいか分からない」という段階でも大丈夫です。AI活用の第一歩を、私たちがサポートします。" />
  </div>
);

export default GenAINext;
