import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Bot, Check, Code, Cpu, Lock, MessageSquare, Zap } from 'lucide-react';
import { ContactCta, IconTile, Mark, PageHeader, PlanCard, SectionHead, Ticker, comicBtn, comicBtnShape, comicIllust } from '../parts';
import { Bubble, Caption, SfxText, SlantPanel, panel, panelPress } from '../comic';
import { services } from '../theme';
import ServiceArticles from '../../articles/ServiceArticles';

// 生成AI活用支援のページ（アメコミ版）。相棒ロボットが「AI」の役で、お悩みのコマの答えとプランの案内に出る
const ai = services.find((service) => service.key === 'ai')!;

// お悩み：コマごとに、絵・叫び声・せりふの吹き出しの置き場所を決める（トップの HomeComic.tsx と同じ考え方）
// talk は吹き出しの位置・傾き・尾（tail は尾の出る位置%、lean は尾の向き）。points はPCの段の中での斜めのコマの頂点
type Concern = {
  title: string;
  desc: string;
  icon: typeof Lock;
  img: string;
  imgPos?: string;
  shout: string;
  shoutAt: string;
  shoutTilt: number;
  shoutColor: string;
  talk: { at: string; tilt: number; tail: number; lean: number };
  points: [number, number][];
};
const concerns: Concern[] = [
  {
    title: "セキュリティリスク",
    desc: "情報漏洩が怖くて社内導入が進まない",
    icon: Lock,
    img: 'worry-ai',
    imgPos: 'object-[50%_60%]',
    shout: 'GULP!',
    shoutAt: 'left-[4%] top-[48%] md:top-[44%]',
    shoutTilt: -10,
    shoutColor: '#F07A5A',
    talk: { at: 'left-[18%] md:left-[22%] top-[5%]', tilt: -4, tail: 22, lean: -0.6 },
    points: [[0, 0], [58, 0], [52, 100], [0, 100]]
  },
  {
    title: "活用イメージの欠如",
    desc: "具体的にどの業務に使えるか分からない",
    icon: Zap,
    img: 'genai-worry-idea',
    shout: 'HUH?',
    shoutAt: 'right-[6%] top-[46%]',
    shoutTilt: 10,
    shoutColor: '#F2B544',
    talk: { at: 'left-[8%] md:left-[12%] top-[5%]', tilt: 3, tail: 40, lean: 0.3 },
    points: [[60, 0], [100, 0], [100, 100], [54, 100]]
  },
  {
    title: "開発リソース不足",
    desc: "自社専用のAIボットを作りたいが技術がない",
    icon: Code,
    img: 'genai-worry-dev',
    shout: 'UGH...',
    shoutAt: 'right-[8%] md:right-[12%] top-[50%]',
    shoutTilt: 6,
    shoutColor: '#C9A6FF',
    talk: { at: 'left-[5%] top-[5%]', tilt: -3, tail: 36, lean: 0.2 },
    points: [[0, 0], [44, 0], [50, 100], [0, 100]]
  }
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

// 生成AIの色の集中線
const aiRays = { '--ray-a': '#8E5BD0', '--ray-b': '#9A69DA' } as React.CSSProperties;

// お悩みのコマの中身（絵・せりふ・叫び声・お悩みの名前の箱）
const concernContent = (c: Concern, n: number) => (
  <>
    <img src={comicIllust(c.img)} alt="" className={`absolute inset-0 w-full h-full object-cover ${c.imgPos ?? ''}`} loading="lazy" />
    <span className="pop-reveal absolute inset-0 block">
      <Bubble talk className={`${c.talk.at} max-w-[76%] md:max-w-[80%] text-[15px] md:text-[19px]`} tailAt={c.talk.tail} lean={c.talk.lean} rotate={c.talk.tilt} delay={0.15 + n * 0.15}>
        {c.desc}
      </Bubble>
      <SfxText text={c.shout} color={c.shoutColor} className={`text-[clamp(26px,7vw,40px)] md:text-[clamp(24px,3vw,40px)] ${c.shoutAt}`} rotate={c.shoutTilt} delay={0.5 + n * 0.15} />
    </span>
    <div className={`absolute bottom-[6%] ${n % 2 ? 'right-[4%]' : 'left-[4%]'} inline-flex items-center gap-1.5 border-[3px] border-[#111] px-3 py-1 font-manga text-[14px] md:text-[16px] text-white shadow-[3px_3px_0_#111] ${ai.bg}`}>
      <c.icon className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
      <h3>{c.title}</h3>
    </div>
  </>
);

// お悩みへの答えのコマ：相棒ロボットが、紫の集中線の中から答える
const answerLine = '導入への不安やリスクを解消し、安全かつ効果的にAIを業務に組み込みます。';
const answerContent = (
  <>
    <span className="absolute inset-0 comic-rays" style={aiRays} aria-hidden="true" />
    <span className="absolute inset-0 comic-dots-light" aria-hidden="true" />
    <img src={comicIllust('genai-robot')} alt="" className="pop-float absolute right-[2%] bottom-[3%] w-[50%] md:w-[46%] max-w-[340px] drop-shadow-[5px_5px_0_#111]" loading="lazy" />
    <span className="pop-reveal absolute inset-0 block">
      <Caption className="absolute left-[5%] top-[7%] -rotate-2">そこで、相棒の出番！</Caption>
      <Bubble talk side className="left-[5%] top-[22%] md:top-[26%] w-[58%] md:w-[50%] text-[15px] md:text-[19px]" rotate={-2} delay={0.3}>
        {answerLine}
      </Bubble>
    </span>
  </>
);

const GenAINext: React.FC = () => (
  <div className="bg-[#FAF3E0] text-sumi overflow-x-clip">
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
      title={<>生成AI活用支援<br /><span className="inline-block -rotate-2 mt-2 px-2 bg-svc-ai border-[3px] border-[#111] shadow-[5px_5px_0_#111] text-[0.72em] [-webkit-text-stroke:0] [text-shadow:none]">AIと共に、創造の先へ。</span></>}
      lead={<>
        <p>生成AIは、単なるツールではありません。<br />ビジネスの常識を覆し、圧倒的な生産性を生み出す「パートナー」です。</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href='/contact' className={`${comicBtnShape} bg-[#111] text-white shadow-[5px_5px_0_#F2B544] hover:shadow-[2px_2px_0_#F2B544]`}>
            まずは無料で相談する<ArrowRight className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
          </a>
          <a href='/gen-ai#services' className={`${comicBtn} bg-white text-[#111]`}>サービス詳細を見る</a>
        </div>
      </>}
      crumbs={[{ label: 'サービス', href: '/services' }, { label: '生成AI活用' }]}
      service="ai"
      image={comicIllust('genai-header')}
      imageMode="panel"
    />

    {/* お悩み：コミックのページのようなコマ割り。困っている3人のコマのあと、相棒ロボットが答えるコマで締める */}
    <section className="py-20 md:py-28 bg-[#EFE6FA] comic-dots">
      <div className="max-w-5xl mx-auto px-4 sm:px-5">
        <SectionHead en="Your Concerns" enClass={ai.text} title={<>AIの波に、<br /><Mark><span className={ai.text}>乗り遅れて</span></Mark>いませんか？</>} lead="ChatGPTをはじめとする生成AIの進化は止まりません。" />
      </div>
      <div className="max-w-5xl mx-auto px-3 sm:px-5 flex flex-col gap-3 md:gap-5 drop-shadow-[6px_6px_0_#111]">
        {/* スマホは1コマずつ縦に並べ、PCは斜めの境目で2コマずつ並べる */}
        {concerns.map((c, n) => (
          <div key={c.title} className="md:hidden relative aspect-square">
            <SlantPanel points={n % 2 ? [[0, 4], [100, 0], [100, 100], [0, 96]] : [[0, 0], [100, 4], [100, 96], [0, 100]]}>{concernContent(c, n)}</SlantPanel>
          </div>
        ))}
        <div className="md:hidden relative aspect-square">
          <SlantPanel points={[[0, 0], [100, 4], [100, 100], [0, 100]]}>{answerContent}</SlantPanel>
        </div>
        <div className="hidden md:block relative aspect-[21/9]">
          {concerns.slice(0, 2).map((c, n) => (
            <SlantPanel key={c.title} points={c.points}>{concernContent(c, n)}</SlantPanel>
          ))}
        </div>
        <div className="hidden md:block relative aspect-[21/9]">
          <SlantPanel points={concerns[2].points}>{concernContent(concerns[2], 2)}</SlantPanel>
          <SlantPanel points={[[46, 0], [100, 0], [100, 100], [52, 100]]}>{answerContent}</SlantPanel>
        </div>
      </div>
    </section>

    {/* サービス：ヒーローとロボットの見開きのコマのあとに、4つのサービスのコマ */}
    <section id="services" className="relative py-20 md:py-28 bg-[#FAF3E0] comic-dots border-y-[4px] border-[#111] scroll-mt-24">
      <div className="absolute inset-0 comic-speed [--speed:rgb(142_91_208/0.18)]" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="AI Integration" enClass={ai.text} title={<>導入支援から<Mark>独自開発</Mark>まで</>} lead="導入支援から独自開発まで。貴社のAIトランスフォーメーションを加速させます。" />
        <div className={`pop-reveal relative aspect-[3/2] md:aspect-[21/9] mb-14 md:mb-16 bg-white overflow-hidden ${panel} md:-rotate-[0.6deg]`}>
          <img src={comicIllust('svc-ai')} alt="ヒーローに扮したArcleと相棒のAIロボットが、社員たちに書類を届けるイラスト" className="absolute inset-0 w-full h-full object-cover object-[50%_35%]" loading="lazy" />
          <SfxText text="WHOOSH!" color="#F2B544" className="left-[4%] top-[6%] text-[clamp(26px,5vw,56px)]" rotate={-10} delay={0.3} />
        </div>
        <div className="grid md:grid-cols-2 gap-10 md:gap-x-10 md:gap-y-12">
          {offerings.map((item, index) => (
            <article key={item.title} style={{ animationDelay: `${(index % 2) * 120}ms` }} className={`pop-reveal group relative flex flex-col bg-white ${panel} ${panelPress} ${index % 2 ? 'md:rotate-[0.8deg]' : 'md:-rotate-[0.8deg]'}`}>
              <Caption tone="bg-svc-ai text-white" className="absolute z-10 -top-5 left-5 -rotate-3">
                <span className="font-comic font-normal text-[20px] md:text-[22px] leading-none tracking-[0.08em]">{item.title}</span>
              </Caption>
              {/* サービス名の帯 */}
              <div className="relative overflow-hidden border-b-[4px] border-[#111] bg-[#EFE6FA] px-6 pt-9 pb-6 md:px-8 flex items-end justify-between gap-4">
                <span className="absolute inset-0 comic-dots opacity-70" aria-hidden="true" />
                <h3 className="relative font-manga text-[24px] md:text-[28px] leading-snug [word-break:auto-phrase]">{item.sub}</h3>
                <IconTile icon={<item.icon className="w-7 h-7" aria-hidden="true" />} num={index + 1} bg={ai.bg} className="pop-wiggle shrink-0 mr-1" />
              </div>
              <div className="flex flex-col flex-1 p-6 md:p-8">
                <p className="text-[15px] leading-[1.9] text-sumi">{item.desc}</p>
                <ul className="mt-6 pt-5 border-t-[3px] border-dashed border-[#111]/25 space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm font-bold leading-relaxed">
                      <span className={`shrink-0 mt-0.5 w-5 h-5 grid place-items-center border-2 border-[#111] text-white ${ai.bg}`}>
                        <Check className="w-3 h-3" strokeWidth={4} aria-hidden="true" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* サービスの名前を流すテープ */}
    <Ticker items={offerings.map((item) => item.sub)} tone="bg-svc-ai text-white" className="-mb-4 -mt-[4px]" />

    <section className="py-20 md:py-28 bg-white comic-dots">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="Pricing" enClass={ai.text} title="プラン一覧" lead="導入から定着、独自開発まで。貴社の成長段階に合わせて最適なAI活用支援プランをご提供します" center />
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-6 items-stretch pt-4">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} index={i} service="ai" ctaLabel={`${plan.sub}についてお問い合わせ`} plan={{ ...plan, amount: plan.price.replace(/万円~$/, ''), unit: '万円〜', priceNote: '税抜' }} />
          ))}
        </div>
        {/* 注意書き：ロボットが指さすナレーションの箱 */}
        <div className="pop-reveal relative mt-14 md:mt-16 md:pr-[220px]">
          <div className="relative -rotate-[0.6deg] bg-mustard border-[4px] border-[#111] shadow-[6px_6px_0_#111] p-5 md:p-6 space-y-2 text-[13px] md:text-sm font-bold leading-[1.9] text-[#111]">
            <p>※料金は税抜です。お客様の状況やご要望に応じてカスタマイズ可能です。</p>
            <p>※Developmentプランは要件定義後に個別見積もりとなります。まずはお気軽にご相談ください。</p>
          </div>
          <img src={comicIllust('genai-robot')} alt="" className="pop-float hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[200px] drop-shadow-[5px_5px_0_#111]" loading="lazy" />
        </div>
      </div>
    </section>

    <ServiceArticles service="ai" />

    <ContactCta title={<span className="[word-break:auto-phrase]">AIの可能性を、<br />あなたのビジネスに。</span>} body="「何から始めればいいか分からない」という段階でも大丈夫です。AI活用の第一歩を、私たちがサポートします。" />
  </div>
);

export default GenAINext;
