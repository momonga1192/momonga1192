import React from 'react';
import { ContactCta, PlanCard, Ticker, comicIllust, type Plan } from '../next/parts';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Lightbulb, Bot, GraduationCap } from 'lucide-react';
import { LpFaq, LpHead, LpHero, LpNotes, LpPains, LpSection, LpSolutions, type Pain, type Solution } from './LpComic';

// はじめてのAI導入（広告用LP）のアメコミ版。部品は LpComic.tsx

const pains: Pain[] = [
  {
    img: 'genai-worry-idea',
    title: '何に使えるか分からない',
    desc: 'ChatGPTが話題だけど、何に使えるか分からない',
    imgPos: 'object-bottom scale-[1.3] origin-bottom',
    tail: 42,
    shout: { text: 'HUH?!', color: '#C9A6FF', at: 'left-[6%] top-[8%]', tilt: -10 }
  },
  {
    img: 'worry-ai',
    title: '情報漏洩が怖い',
    desc: '情報漏洩が怖くて、社内でAIを使わせられない',
    imgPos: 'object-[50%_40%]',
    tail: 32
  },
  {
    img: 'genai-worry-dev',
    title: '技術がない',
    desc: '自社専用のAIチャットボットを作りたいが技術がない',
    imgPos: 'object-bottom scale-[1.35] origin-bottom',
    tail: 50
  }
];

// 4つの解決策は、どれも同じ3つの特長を持つ（元のページのまま）
const features = ['2週間のスピード導入', '伴走型の定着支援', '個別カスタマイズ対応'];
const solutions: Solution[] = [
  {
    icon: ShieldCheck,
    title: '安全な導入設計',
    titleEn: 'Safe Setup',
    desc: 'セキュリティポリシー策定・利用ガイドラインで安心して使える環境を構築。情報漏洩リスクを最小限に抑え、組織的な利用を実現します。',
    points: features
  },
  {
    icon: Lightbulb,
    title: '業務別AI活用提案',
    titleEn: 'AI Proposal',
    desc: '「あなたの業務のここにAIが使えます」を具体的にご提案。現場の課題をヒアリングし、即効性のある活用シーンを可視化します。',
    points: features
  },
  {
    icon: Bot,
    title: '社内AIボット開発',
    titleEn: 'Custom Bot',
    desc: '社内資料を学習したRAGチャットボット。自社専用のAIアシスタントが、ナレッジの検索性向上と業務効率化を強力にサポートします。',
    points: features
  },
  {
    icon: GraduationCap,
    title: 'プロンプト研修',
    titleEn: 'Prompt Training',
    desc: 'AIから望む回答を引き出すコツを、実践形式でレクチャー。社員一人ひとりのAI活用スキルを底上げし、定着化を支援します。',
    points: features
  }
];

// desc（帯の説明文）は元のページにないので空にする
const plans: Plan[] = [
  {
    name: 'Starter',
    sub: 'スターター',
    desc: '',
    prefix: '月額',
    amount: '5',
    unit: '万円〜',
    features: ['AI導入支援', 'セキュリティポリシー策定', '基礎研修', 'プロンプトテンプレート']
  },
  {
    name: 'Standard',
    sub: 'スタンダード',
    desc: '',
    prefix: '月額',
    amount: '20',
    unit: '万円〜',
    features: ['Starterの全内容', '部門別コンサル', '効果測定レポート', '推進チーム育成'],
    recommended: true
  },
  {
    name: 'Development',
    sub: '開発',
    desc: '',
    amount: '50',
    unit: '万円〜',
    features: ['Standardの全内容', 'RAGシステム開発', '専用AIボット開発', '運用保守']
  }
];

const faqs = [
  {
    q: 'ChatGPTを全く使ったことがなくても大丈夫ですか？',
    a: 'はい、ゼロからサポートします。基礎研修込みなので、初めての方でも安心です。'
  },
  {
    q: '社内の機密情報が漏洩するリスクはありませんか？',
    a: 'セキュリティポリシーの策定と、Enterprise版などの安全な環境構築を最初に行います。'
  },
  {
    q: 'どれくらいで効果が出ますか？',
    a: '導入後1〜2ヶ月で日常業務での活用が定着し、3ヶ月目以降で効率化の効果を実感される企業様が多いです。'
  }
];

const HajimeteAI: React.FC = () => {
  return (
    <div className="bg-[#FAF3E0] text-sumi overflow-x-clip">
      <Helmet>
        {/* 広告用LP。同じ内容のサービスページと評価が割れないよう、検索には出さない */}
        <meta name="robots" content="noindex, follow" />
        <title>はじめてのAI導入 | ChatGPT導入・生成AI活用支援 - Arcle</title>
        <meta name="description" content="はじめてのAI導入はArcleが提供する生成AI活用支援サービス。ChatGPT Enterprise導入、AI利用ガイドライン策定、社内RAGチャットボット開発、プロンプト研修を月額5万円〜で提供。" />
        <link rel="canonical" href="https://www.arcle.net/lp/hajimete-ai" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://www.arcle.net/" },
            { "@type": "ListItem", "position": 2, "name": "はじめてのAI導入", "item": "https://www.arcle.net/lp/hajimete-ai" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "はじめてのAI導入",
          "provider": { "@id": "https://www.arcle.net/#organization" },
          "description": "ChatGPT等の生成AIを安全に・効果的に業務へ導入するための伴走型サービス。導入から定着、独自開発まで。",
          "areaServed": [{ "@type": "State", "name": "愛知県" }, { "@type": "State", "name": "岐阜県" }, { "@type": "State", "name": "三重県" }],
          "offers": [
            { "@type": "Offer", "name": "Starterプラン", "price": "50000", "priceCurrency": "JPY" },
            { "@type": "Offer", "name": "Standardプラン", "price": "200000", "priceCurrency": "JPY" },
            { "@type": "Offer", "name": "Developmentプラン", "price": "500000", "priceCurrency": "JPY" }
          ]
        })}</script>
      </Helmet>

      {/* 表紙：ヒーローが安全のバリアを張り、社長がロボットと握手する */}
      <LpHero
        en="First Step to AI"
        title={
          <>
            <span className="inline-block">AI、何から始めれば？</span>
            <span className="inline-block">の答えがここに。</span>
          </>
        }
        lead={
          <p>
            はじめてのAI導入は、ChatGPTなどの生成AIを
            <br className="hidden md:block" />
            安全に・効果的に業務へ組み込むための伴走型サービスです。
            <br className="hidden md:block" />
            導入から定着、独自開発まで。
          </p>
        }
        crumb="はじめてのAI導入"
        service="ai"
        image={comicIllust('lp-ai-hero')}
        alt="ヒーローが錠前の光るバリアで守る中、社長が相棒ロボットと握手するイラスト"
        sfx={{ text: 'HELLO!', color: '#C9A6FF', at: 'right-[4%] top-[4%]', tilt: 8 }}
      />

      <Ticker items={['安全な導入設計', '業務別AI活用提案', '社内AIボット開発', 'プロンプト研修', '月額5万円〜']} className="-my-4" tone="bg-[#111] text-mustard" />

      {/* お悩み */}
      <LpPains en="Pain Points" items={pains} />

      {/* 解決 */}
      <LpSolutions
        en="Solutions"
        service="ai"
        title={
          <>
            はじめてのAI導入が
            <br className="md:hidden" />
            解決します
          </>
        }
        lead={
          <>
            導入設計から研修、独自開発まで。
            <br className="hidden md:block" />
            AIの「何から始めれば？」を一緒に解消します。
          </>
        }
        splash="svc-ai"
        splashAlt="ヒーローと相棒ロボットが街の上を飛び、社員たちに書類やアイデアを届けるイラスト"
        splashPos="object-[50%_30%]"
        splashSfx={{ text: 'WHOOSH!', color: '#C9A6FF', at: 'left-[4%] top-[8%]', tilt: -8 }}
        items={solutions}
      />

      {/* 料金 */}
      <LpSection>
        <LpHead
          en="Pricing"
          service="ai"
          title="料金プラン"
          lead={
            <>
              導入から定着、独自開発まで。
              <br className="hidden md:block" />
              貴社のフェーズに合わせた最適なプランをご用意しています。
            </>
          }
        />
        <div className="grid gap-12 lg:gap-7 lg:grid-cols-3 max-w-md lg:max-w-none mx-auto pt-4">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} service="ai" index={i} ctaLabel={`${plan.sub}プランについてお問い合わせ`} />
          ))}
        </div>
        <LpNotes notes={['※料金は税抜です。', '※Developmentプランは要件定義後に個別見積もり。']} />
      </LpSection>

      {/* よくある質問 */}
      <LpSection tone="bg-[#FAF3E0] comic-dots">
        <LpHead en="FAQ" service="ai" title="よくある質問" />
        <LpFaq items={faqs} service="ai" accordion faceOffset={2} />
      </LpSection>

      {/* CTA Section */}
      <ContactCta title={<>
            AIの第一歩、<br />
            一緒に踏み出しましょう。
          </>} body={"\"何から始めればいいか分からない\"でOK。その段階からサポートします。"} />
    </div>
  );
};

export default HajimeteAI;
