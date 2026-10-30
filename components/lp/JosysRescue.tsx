import React from 'react';
import { ContactCta, PlanCard, Ticker, comicIllust, type Plan } from '../next/parts';
import { Helmet } from 'react-helmet-async';
import { Headphones, ShieldCheck, Settings, Wifi } from 'lucide-react';
import { LpFaq, LpHead, LpHero, LpNotes, LpPains, LpSection, LpSolutions, type Pain, type Solution } from './LpComic';

// 情シスレスキュー（広告用LP）のアメコミ版。部品は LpComic.tsx

const pains: Pain[] = [
  {
    img: 'worry-pc',
    title: '「PCが動かない」のたびに\n業務が止まる',
    desc: '社内にITに詳しい人がおらず、トラブルのたびに業務が長時間ストップ。対応コストが見えないまま膨らんでいませんか？',
    imgPos: 'object-[50%_30%]',
    tail: 46,
    shout: { text: 'OH NO!', color: '#F07A5A', at: 'right-[6%] top-[8%]', tilt: 10 }
  },
  {
    img: 'lp-josys-worry-security',
    title: 'セキュリティ対策、\n何をすればいいか分からない',
    desc: 'ウイルス対策ソフトだけで大丈夫？情報漏洩のニュースを見るたびに不安になるけれど、何から手をつければいいか分からない。',
    imgPos: 'object-[50%_30%]',
    tail: 40
  },
  {
    img: 'josys-concerns',
    title: 'SaaSやツールが増えすぎて\n管理できない',
    desc: '気づけばサブスクだらけ。誰が何を使っているか把握できず、無駄なコストが発生しているかもしれません。',
    imgPos: 'object-[38%_50%]',
    tail: 34
  }
];

const solutions: Solution[] = [
  {
    icon: Headphones,
    title: 'ITヘルプデスク',
    titleEn: 'IT Helpdesk',
    desc: 'PCトラブルからソフト操作まで、メール・チャット・リモート操作でサポート。「PCが動かない」「設定が分からない」もお気軽にご相談ください。',
    points: ['メール・チャットでのご相談', 'リモート操作でのトラブル対応', '東海エリアは訪問にも対応']
  },
  {
    icon: ShieldCheck,
    title: 'セキュリティ対策',
    titleEn: 'Security',
    desc: '情報漏洩リスクの診断から、対策の実施・運用まで。ウイルス対策・アクセス制御・バックアップ体制を整えます。',
    points: ['今のセキュリティ状況の確認', '多要素認証・バックアップなど基本対策の導入', '社内ルールづくりの支援']
  },
  {
    icon: Settings,
    title: 'SaaS・ツール管理',
    titleEn: 'SaaS Management',
    desc: '導入選定・アカウント管理・コストの見直しをまるっと代行。「誰が何を使っているか」を一覧にし、無駄を減らします。',
    points: ['契約中のサービスとアカウントの棚卸し', '入退社時のアカウント管理', '使っていない契約の見直し']
  },
  {
    icon: Wifi,
    title: 'ネットワーク・インフラ',
    titleEn: 'Network & Infra',
    desc: '社内Wi-Fiからクラウド環境まで安定稼働を支援。「ネットが遅い」「VPNが繋がらない」といったお困りごともご相談ください。',
    points: ['ネットワーク・Wi-Fi環境の確認と見直し', 'ルーター・VPNなど機器の設定', 'Microsoft 365などクラウドの設定']
  }
];

const plans: Plan[] = [
  {
    name: 'Light',
    sub: 'ライト',
    desc: 'まずは気軽に相談から',
    prefix: '月額',
    amount: '3',
    unit: '万円〜',
    features: ['IT相談窓口', '簡易トラブル対応', 'リモートサポート']
  },
  {
    name: 'Standard',
    sub: 'スタンダード',
    desc: '情シス業務を包括サポート',
    prefix: '月額',
    amount: '15',
    unit: '万円〜',
    features: ['Lightの全内容', 'PCキッティング', 'システム導入支援', '訪問サポート', 'セキュリティ対策'],
    recommended: true
  },
  {
    name: 'Premium',
    sub: 'プレミアム',
    desc: 'IT戦略パートナー',
    prefix: '月額',
    amount: '30',
    unit: '万円〜',
    features: ['Standardの全内容', 'IT戦略コンサルティング', 'DX戦略策定・実行']
  }
];

const faqs = [
  {
    q: '対応エリアはどこですか？',
    a: '東海エリアは訪問にも対応しています。リモート対応は全国可能です。'
  },
  {
    q: '契約期間の縛りはありますか？',
    a: '最低契約期間は設けておりません。月単位でのご契約が可能です。'
  },
  {
    q: '今使っているシステムの相談もできますか？',
    a: 'はい、既存システムの運用改善や乗り換え相談も承っています。'
  }
];

const JosysRescue: React.FC = () => {
  return (
    <div className="bg-[#FAF3E0] text-sumi overflow-x-clip">
      <Helmet>
        {/* 広告用LP。同じ内容のサービスページと評価が割れないよう、検索には出さない */}
        <meta name="robots" content="noindex, follow" />
        <title>情シスレスキュー | IT専任者がいない企業のためのIT代行サービス - Arcle</title>
        <meta name="description" content="情シスレスキューはArcleが提供するIT代行サービス。PCトラブル対応・セキュリティ対策・SaaS管理・ネットワーク構築を月額3万円〜で包括サポート。IT専任者がいない中小企業の味方です。" />
        <link rel="canonical" href="https://www.arcle.net/lp/josys-rescue" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://www.arcle.net/" },
            { "@type": "ListItem", "position": 2, "name": "情シスレスキュー", "item": "https://www.arcle.net/lp/josys-rescue" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "情シスレスキュー",
          "provider": { "@id": "https://www.arcle.net/#organization" },
          "description": "IT専任者がいない企業のためのIT代行サービス。PCトラブル対応・セキュリティ対策・SaaS管理・ネットワーク構築を月額3万円〜で包括サポート。",
          "areaServed": [{ "@type": "State", "name": "愛知県" }, { "@type": "State", "name": "岐阜県" }, { "@type": "State", "name": "三重県" }],
          "offers": [
            { "@type": "Offer", "name": "ライトプラン", "price": "30000", "priceCurrency": "JPY", "description": "IT相談窓口・簡易トラブル対応・リモートサポート" },
            { "@type": "Offer", "name": "スタンダードプラン", "price": "150000", "priceCurrency": "JPY", "description": "Lightの全内容+PCキッティング・システム導入支援・訪問サポート・セキュリティ対策" },
            { "@type": "Offer", "name": "プレミアムプラン", "price": "300000", "priceCurrency": "JPY", "description": "Standardの全内容+IT戦略コンサルティング・DX戦略策定・実行" }
          ]
        })}</script>
      </Helmet>

      {/* 表紙：ウイルスの怪物を殴り飛ばして社員を救うヒーロー */}
      <LpHero
        en="Josys Rescue"
        title={
          <>
            その"ITの困った"、
            <br />
            丸ごと引き受けます。
          </>
        }
        lead={
          <p>
            情シスレスキューは、IT専任者がいない企業のための
            <br className="hidden md:block" />
            "もうひとつのIT部門"です。
            <br />
            月額3万円〜、必要な時だけプロがサポート。
          </p>
        }
        crumb="情シスレスキュー"
        service="josys"
        image={comicIllust('lp-josys-hero')}
        alt="PCから飛び出したウイルスの怪物を、窓から飛び込んだヒーローが殴り飛ばし、社員を救うイラスト"
        sfx={{ text: 'POW!', color: '#F2B544', at: 'left-[50%] top-[4%]', tilt: -12 }}
      />

      <Ticker items={['ITヘルプデスク', 'セキュリティ対策', 'SaaS・ツール管理', 'ネットワーク・インフラ', '月額3万円〜']} className="-my-4" tone="bg-[#111] text-mustard" />

      {/* お悩み */}
      <LpPains en="Pain Points" items={pains} />

      {/* 解決 */}
      <LpSolutions
        en="Solutions"
        service="josys"
        title={
          <>
            情シスレスキューが<span className="text-svc-josys">解決</span>します
          </>
        }
        lead={
          <>
            あなたの会社のIT部門として、4つの領域をまるごとカバー。
            <br className="hidden md:block" />
            必要な時に、必要なだけ、プロが対応します。
          </>
        }
        splash="josys-header"
        splashAlt="道具箱を持ったヒーローが、オフィスの社員たちに親指を立てるイラスト"
        splashPos="object-[50%_8%]"
        splashSfx={{ text: 'ALL CLEAR!', color: '#9FC3FF', at: 'left-[4%] bottom-[8%]', tilt: -8 }}
        items={solutions}
      />

      {/* 料金 */}
      <LpSection>
        <LpHead
          en="Pricing"
          service="josys"
          title="料金プラン"
          lead={
            <>
              御社の規模や課題に合わせた3つのプランをご用意。
              <br className="hidden md:block" />
              すべてのプランで、代表の栗原が直接サポートします。
            </>
          }
        />
        <div className="grid gap-12 lg:gap-7 lg:grid-cols-3 max-w-md lg:max-w-none mx-auto pt-4">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} service="josys" index={i} ctaLabel={`${plan.sub}プランについてお問い合わせ`} />
          ))}
        </div>
        <LpNotes notes={['※料金は税抜です。', '※東海エリアは訪問にも対応します。']} />
      </LpSection>

      {/* よくある質問 */}
      <LpSection tone="bg-[#FAF3E0] comic-dots">
        <LpHead en="FAQ" service="josys" title="よくある質問" />
        <LpFaq items={faqs} service="josys" />
      </LpSection>

      {/* ========== 6. CTA Section ========== */}
      <ContactCta title={<>
            ITの"困った"、<br />
            今日で終わりにしませんか？
          </>} body={"まずは無料相談から。御社のIT課題をお聞かせください。"} />
    </div>
  );
};

export default JosysRescue;
