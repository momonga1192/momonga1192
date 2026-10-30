import React from 'react';
import { ContactCta, Ticker, comicIllust } from '../next/parts';
import { Helmet } from 'react-helmet-async';
import { BarChart3, LayoutDashboard, Database, GraduationCap } from 'lucide-react';
import { LpFaq, LpFlow, LpHead, LpHero, LpPains, LpSection, LpSolutions, type Pain, type Solution } from './LpComic';

// ミエルカ（広告用LP）のアメコミ版。部品は LpComic.tsx

const pains: Pain[] = [
  {
    img: 'worry-data',
    title: 'Excel集計に追われる',
    desc: 'Excelの集計作業に毎月何時間もかかっている',
    imgPos: 'object-[50%_35%]',
    tail: 52,
    shout: { text: 'HELP!!', color: '#F2B544', at: 'right-[6%] top-[8%]', tilt: 10 }
  },
  {
    img: 'data-gut',
    title: 'データが活かせない',
    desc: 'データはあるのに、経営判断に活かせていない',
    imgPos: 'object-bottom scale-[1.15] origin-bottom',
    tail: 34
  },
  {
    img: 'data-scatter',
    title: '全体像が見えない',
    desc: '部署ごとにデータがバラバラで全体像が見えない',
    imgPos: 'object-[50%_40%]',
    tail: 50
  }
];

// 4つの解決策は、どれも同じ3つの特長を持つ（元のページのまま）
const features = ['短期間でのプロトタイプ作成', '既存データ資産の有効活用', '実務に即したダッシュボード設計'];
const solutions: Solution[] = [
  {
    icon: BarChart3,
    title: 'BIツール導入',
    titleEn: 'BI Implementation',
    desc: 'Tableau・PowerBIの選定から導入・初期設定まで完全サポート。お客様の規模や業務に最適なツールをご提案し、データの収集から可視化までをスムーズに実現します。',
    points: features
  },
  {
    icon: LayoutDashboard,
    title: '経営ダッシュボード構築',
    titleEn: 'Dashboard',
    desc: 'リアルタイムで売上・KPIを一目で把握できるダッシュボードを構築。多角的な分析により、隠れた課題やチャンスを即座に発見できる環境を整えます。',
    points: features
  },
  {
    icon: Database,
    title: 'データ基盤設計',
    titleEn: 'Data Platform',
    desc: '散在するデータを統合し、クリーニングされた「使いやすい」データ基盤を整備。部署を横断したデータの一元管理により、社内の情報格差を解消します。',
    points: features
  },
  {
    icon: GraduationCap,
    title: 'データリテラシー研修',
    titleEn: 'Training',
    desc: '社員が自らデータを読み解き、根拠に基づいた提案ができる組織へ。操作方法だけでなく、ビジネスに活かすための分析思考を実践的に養います。',
    points: features
  }
];

const steps = [
  {
    step: '01',
    title: '無料相談',
    desc: '現状のデータ環境をヒアリング。課題やゴールを丁寧にお伺いし、最適な進め方をご提案します。'
  },
  {
    step: '02',
    title: 'データ診断',
    desc: 'データの棚卸し・課題の可視化。社内にどんなデータがあるかを整理し、活用の優先度を明確にします。'
  },
  {
    step: '03',
    title: 'ダッシュボード構築',
    desc: 'BIツールで経営に必要な画面を構築。売上・KPI・コストなど、見たい指標をリアルタイムで確認できるようにします。'
  },
  {
    step: '04',
    title: '定着支援',
    desc: '研修・運用サポートで組織にデータ文化を根付かせる。社員が自走できるようになるまで伴走します。'
  }
];

const faqs = [
  {
    q: 'どのBIツールがおすすめですか？',
    a: 'お客様の規模やご予算に応じてTableauまたはPowerBIをご提案します。いずれも代表が資格を保有しています。'
  },
  {
    q: 'データ分析の経験がなくても大丈夫ですか？',
    a: 'はい、研修込みでサポートします。社員の方が自分で使えるようになるまで伴走します。'
  },
  {
    q: '既存のExcel業務も効率化できますか？',
    a: 'はい、Excel集計の自動化やBIツールへの移行もお任せください。'
  }
];

const Mieruka: React.FC = () => {
  return (
    <div className="bg-[#FAF3E0] text-sumi overflow-x-clip">
      <Helmet>
        {/* 広告用LP。同じ内容のサービスページと評価が割れないよう、検索には出さない */}
        <meta name="robots" content="noindex, follow" />
        <title>ミエルカ | データ見える化サービス（Tableau・PowerBI導入） - Arcle</title>
        <meta name="description" content="ミエルカはArcleが提供するデータ見える化サービス。Tableau・PowerBI導入、経営ダッシュボード構築、データ基盤設計で中小企業のデータドリブン経営を実現。無料データ診断実施中。" />
        <link rel="canonical" href="https://www.arcle.net/lp/mieruka" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://www.arcle.net/" },
            { "@type": "ListItem", "position": 2, "name": "ミエルカ", "item": "https://www.arcle.net/lp/mieruka" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "ミエルカ - データ見える化サービス",
          "provider": { "@id": "https://www.arcle.net/#organization" },
          "description": "Tableau・PowerBI導入、経営ダッシュボード構築、データ基盤設計で中小企業のデータドリブン経営を実現",
          "areaServed": [{ "@type": "State", "name": "愛知県" }, { "@type": "State", "name": "岐阜県" }, { "@type": "State", "name": "三重県" }]
        })}</script>
      </Helmet>

      {/* 表紙：カーテンを開けて、壁一面のダッシュボードを見せるヒーロー */}
      <LpHero
        en="Mieruka"
        title={
          <>
            <span className="inline-block">経営データ、</span>
            <br />
            <span className="inline-block">"見える"だけで</span>
            <span className="inline-block">変わります。</span>
          </>
        }
        lead={
          <p>
            ミエルカは、社内に眠るデータを"見える化"し、
            <br className="hidden md:block" />
            感覚ではなくデータで意思決定できる環境をつくるサービスです。
          </p>
        }
        crumb="ミエルカ"
        service="data"
        image={comicIllust('lp-mieruka-hero')}
        alt="ヒーローがカーテンを開けると壁一面にグラフのダッシュボードが現れ、社長と社員が驚き喜ぶイラスト"
        sfx={{ text: 'TA-DA!', color: '#F2B544', at: 'left-[34%] top-[3%]', tilt: -10 }}
      />

      <Ticker items={['BIツール導入', '経営ダッシュボード構築', 'データ基盤設計', 'データリテラシー研修', '無料データ診断実施中']} className="-my-4" tone="bg-[#111] text-mustard" />

      {/* お悩み */}
      <LpPains en="Pain Points" items={pains} />

      {/* 解決 */}
      <LpSolutions
        en="Solutions"
        service="data"
        title={
          <>
            ミエルカが
            <br className="md:hidden" />
            解決します
          </>
        }
        lead="データの導入から定着まで、一気通貫でサポートします。"
        splash="data-header"
        splashAlt="書類の山の上で、ヒーローが光る宝石を掲げ、社員たちが喜ぶイラスト"
        splashPos="object-[50%_0%]"
        splashSfx={{ text: 'SHINE!', color: '#F2B544', at: 'left-[4%] bottom-[8%]', tilt: -8 }}
        items={solutions}
      />

      {/* 導入の流れ */}
      <LpSection>
        <LpHead en="Flow" service="data" title="導入の流れ" lead="4つのステップで、データドリブンな経営環境を構築します。" />
        <LpFlow service="data" items={steps} />
      </LpSection>

      {/* よくある質問 */}
      <LpSection tone="bg-[#FAF3E0] comic-dots">
        <LpHead en="FAQ" service="data" title="よくある質問" />
        <LpFaq items={faqs} service="data" accordion faceOffset={1} />
      </LpSection>

      {/* CTA Section */}
      <ContactCta title={<>
            まずはデータの<br />
            "健康診断"から。
          </>} body={"御社のデータ環境を無料で診断します。お気軽にご相談ください。"} />
    </div>
  );
};

export default Mieruka;
