import React from 'react';
import { ContactCta, PlanCard, Ticker, comicIllust, type Plan } from '../next/parts';
import { Helmet } from 'react-helmet-async';
import { Palette, Settings, Search, Shield } from 'lucide-react';
import { LpFaq, LpHead, LpHero, LpNotes, LpPains, LpSection, LpSolutions, type Pain, type Solution } from './LpComic';

// ウェブの窓口（広告用LP）のアメコミ版。部品は LpComic.tsx

const pains: Pain[] = [
  {
    img: 'lp-web-worry-phone',
    title: 'ホームページが古くて、スマホで見づらい',
    imgPos: 'object-[50%_35%]',
    tail: 40
  },
  {
    img: 'worry-web',
    title: '作ったきりで更新できず、放置状態になっている',
    imgPos: 'object-[50%_45%]',
    tail: 36,
    shout: { text: 'SIGH...', color: '#9FC3FF', at: 'right-[6%] top-[8%]', tilt: -4, mood: 'droop' }
  },
  {
    img: 'lp-web-worry-search',
    title: '検索しても自社サイトが全然出てこない',
    imgPos: 'object-[50%_35%]',
    tail: 40
  }
];

// 4つの解決策は、どれも同じ3つの特長を持つ（元のページのまま）
const features = ['ヒアリング重視の提案', 'スピード感のある制作', '公開後の手厚いサポート'];
const solutions: Solution[] = [
  {
    icon: Palette,
    title: 'モダンデザイン',
    titleEn: 'Modern Design',
    desc: 'スマホ対応は当たり前。ブランドイメージを高める洗練されたデザインをご提供します。ユーザーが迷わない、使いやすさを追求したUI/UXをご提案します。',
    points: features
  },
  {
    icon: Settings,
    title: 'CMS導入',
    titleEn: 'CMS Setup',
    desc: 'WordPress等を導入し、お客様自身で簡単に更新・管理できる環境を整備します。専門知識がなくても、ブログ感覚でサイトを成長させることが可能です。',
    points: features
  },
  {
    icon: Search,
    title: 'SEO内部対策',
    titleEn: 'SEO Strategy',
    desc: '検索エンジンに評価される構造・コンテンツ設計で集客力をUPさせます。Googleのガイドラインに準拠した、持続的な価値を生むサイト構築を行います。',
    points: features
  },
  {
    icon: Shield,
    title: '保守・運用サポート',
    titleEn: 'Maintenance',
    desc: '公開後も安心。サーバー管理、セキュリティ対策、定期的なバックアップなど、Webサイトの安定稼働をバックアップします。',
    points: features
  }
];

// desc（帯の説明文）は元のページにないので空にする
const plans: Plan[] = [
  {
    name: 'Light',
    sub: 'ライト',
    desc: '',
    prefix: '月額',
    amount: '4,800',
    unit: '円',
    features: ['TOP＋4ページ', 'テンプレートデザイン', 'お知らせ更新機能', 'お問い合わせフォーム']
  },
  {
    name: 'Standard',
    sub: 'スタンダード',
    desc: '',
    prefix: '月額',
    amount: '7,500',
    unit: '円',
    features: ['TOP＋6ページ（追加可）', 'テンプレートを御社向けにカスタマイズ', 'お知らせ更新機能', 'お問い合わせフォーム', '5年経過後は月額4,800円'],
    recommended: true
  },
  {
    name: 'Order Made',
    sub: 'オーダーメイド',
    desc: '',
    prefix: '月額',
    amount: '9,800',
    unit: '円',
    features: ['TOP＋6ページ（追加可）', '完全オリジナルデザイン', 'お知らせ更新機能', 'お問い合わせフォーム', '5年経過後は月額4,800円']
  }
];

const faqs = [
  {
    q: '制作期間はどれくらいですか？',
    a: 'LPで約2〜3週間、スタンダードプランで約1〜2ヶ月が目安です。'
  },
  {
    q: 'デザインのイメージが固まっていないのですが？',
    a: '大丈夫です。ヒアリングを通じて、御社に合ったデザインを一緒に考えていきます。'
  },
  {
    q: '公開後の更新も依頼できますか？',
    a: 'はい、保守・運用サポートプランをご用意しています。更新代行も承ります。'
  }
];

const WebMadoguchi: React.FC = () => {
  return (
    <div className="bg-[#FAF3E0] text-sumi overflow-x-clip">
      <Helmet>
        {/* 広告用LP。同じ内容のサービスページと評価が割れないよう、検索には出さない */}
        <meta name="robots" content="noindex, follow" />
        <title>ウェブの窓口 | ホームページ制作・リニューアル - Arcle</title>
        <meta name="description" content="ウェブの窓口はArcleが提供するWeb制作サービス。コーポレートサイト・LP制作、WordPress導入、SEO内部対策、保守運用を初期費用0円・月額4,800円〜（税抜）で提供。スマホ対応・デザインリニューアルもお任せ。" />
        <link rel="canonical" href="https://www.arcle.net/lp/web-madoguchi" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://www.arcle.net/" },
            { "@type": "ListItem", "position": 2, "name": "ウェブの窓口", "item": "https://www.arcle.net/lp/web-madoguchi" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "ウェブの窓口",
          "provider": { "@id": "https://www.arcle.net/#organization" },
          "description": "企業のWeb制作・リニューアルをワンストップでサポート。デザインから集客まで、まるっとお任せ。",
          "areaServed": [{ "@type": "State", "name": "愛知県" }, { "@type": "State", "name": "岐阜県" }, { "@type": "State", "name": "三重県" }],
          "offers": [
  {
    "@type": "Offer",
    "name": "ライト",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": 4800,
      "priceCurrency": "JPY",
      "unitCode": "MON",
      "valueAddedTaxIncluded": false
    }
  },
  {
    "@type": "Offer",
    "name": "スタンダード",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": 7500,
      "priceCurrency": "JPY",
      "unitCode": "MON",
      "valueAddedTaxIncluded": false
    }
  },
  {
    "@type": "Offer",
    "name": "オーダーメイド",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": 9800,
      "priceCurrency": "JPY",
      "unitCode": "MON",
      "valueAddedTaxIncluded": false
    }
  }
]
        })}</script>
      </Helmet>

      {/* 表紙：ホームページの相談窓口から身を乗り出すヒーロー */}
      <LpHero
        en="Web Madoguchi"
        title={
          <>
            <span className="inline-block">ホームページのこと、</span>
            <span className="inline-block">全部相談できる場所。</span>
          </>
        }
        lead={
          <p>
            ウェブの窓口は、企業のWeb制作・リニューアルをワンストップでサポートするサービスです。
            <br />
            デザインから集客まで、まるっとお任せください。
          </p>
        }
        crumb="ウェブの窓口"
        service="web"
        image={comicIllust('lp-web-hero')}
        alt="ホームページの相談窓口からヒーローが親指を立て、新しいサイトが映るタブレットに女性社員が喜ぶイラスト"
        sfx={{ text: 'DING!', color: '#F2B544', at: 'right-[4%] top-[4%]', tilt: 10 }}
      />

      <Ticker items={['モダンデザイン', 'CMS導入', 'SEO内部対策', '保守・運用サポート', '初期費用0円']} className="-my-4" tone="bg-[#111] text-mustard" />

      {/* お悩み */}
      <LpPains en="Problems" items={pains} />

      {/* 解決 */}
      <LpSolutions
        en="Solutions"
        service="web"
        title="ウェブの窓口が解決します"
        lead="デザインから運用まで。ワンストップでWebの課題を解決します。"
        splash="svc-web"
        splashAlt="ヒーローが大きなホームページの部品を組み立てるイラスト"
        splashPos="object-[50%_40%]"
        splashSfx={{ text: 'BOOM!', color: '#F2B544', at: 'right-[4%] bottom-[8%]', tilt: 8 }}
        items={solutions}
      />

      {/* 料金 */}
      <LpSection>
        <LpHead en="Pricing" service="web" title="料金プラン" lead="初期費用0円。目的と予算に合わせた月額制の制作プラン" />
        <div className="grid gap-12 lg:gap-7 lg:grid-cols-3 max-w-md lg:max-w-none mx-auto pt-4">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} service="web" index={i} ctaLabel={`${plan.sub}プランについてお問い合わせ`} />
          ))}
        </div>
        <LpNotes notes={['※料金は税抜です。', '※最低契約期間は1年です。契約期間は1〜5年からお選びいただけます。']} />
      </LpSection>

      {/* よくある質問 */}
      <LpSection tone="bg-[#FAF3E0] comic-dots">
        <LpHead en="FAQ" service="web" title="よくある質問" />
        <LpFaq items={faqs} service="web" accordion faceOffset={3} />
      </LpSection>

      {/* CTA Section */}
      <ContactCta title={<>
            Webのこと、<br />
            まずは気軽に聞いてみませんか？
          </>} body={"ホームページの新規制作もリニューアルも。まずは無料相談から始めましょう。"} />
    </div>
  );
};

export default WebMadoguchi;
