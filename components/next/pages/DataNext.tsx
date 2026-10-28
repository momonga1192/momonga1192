import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, ArrowRight, BarChart, PieChart, TrendingUp, Database, Activity, Search } from 'lucide-react';
import { PageHeader, PlanCard, SectionHead, ContactCta, IconTile, Mark, Sparkle, Ticker, card, press } from '../parts';
import DashboardSample from '../DashboardSample';
import { illust, services } from '../theme';

const service = services.find((s) => s.key === 'data')!;

const concerns = [
                  { title: "データの散在", desc: "部署ごとにデータがバラバラで統合できない", icon: Database },
                  { title: "可視化の遅れ", desc: "集計作業に追われ、分析まで手が回らない", icon: Activity },
                  { title: "意思決定の属人化", desc: "経験と勘頼みの経営から脱却したい", icon: Search }
                ];

const solutions = [
              { 
                title: "BI Implementation", 
                sub: "BIツール導入", 
                desc: "TableauやPowerBI等の導入・設定から、ダッシュボード構築まで支援。データの収集から可視化まで、スムーズな立ち上げを実現します。", 
                icon: BarChart
              },
              {
                title: "Data Platform",
                sub: "データ基盤構築",
                desc: "社内に散在するデータを統合し、分析しやすい環境を整備。一元化された高品質なデータによって、分析の精度とスピードを向上させます。",
                icon: Database
              },
              {
                title: "KPI Design",
                sub: "KPI設計・モニタリング",
                desc: "ビジネスゴールに直結する指標を設計し、常に現状を把握できる仕組みを構築。全社で共有可能な「客観的な指標」を確立します。",
                icon: TrendingUp
              },
              {
                title: "Data Literacy",
                sub: "データリテラシー研修",
                desc: "社員一人ひとりがデータを読み解き、自律的に活用できるよう、分析マインドと実務スキルの両面から定着をサポートします。",
                icon: PieChart
              }
            ];

const cases = [
              {
                problem: {
                  title: "データが散在していて、全体像が見えない",
                  desc: "部署ごとにデータがバラバラで、統合して分析できない。どこにどんなデータがあるのかも把握できていない。"
                },
                solution: {
                  title: "データ基盤の統合と可視化",
                  desc: "社内に散在するデータを統合し、一元管理できるデータ基盤を構築。BIツールで全社のデータを一元的に可視化し、リアルタイムで現状を把握できる環境を整備します。",
                  features: ["データ統合基盤の構築", "BIツール導入・設定", "ダッシュボード構築", "データカタログ整備"]
                }
              },
              {
                problem: {
                  title: "集計作業に追われ、分析まで手が回らない",
                  desc: "毎月のレポート作成に時間がかかり、本来の分析や改善施策の検討に時間を割けない。"
                },
                solution: {
                  title: "自動化と効率化による時間創出",
                  desc: "定型的な集計・レポート作業を自動化し、分析に集中できる環境を構築。ダッシュボードで必要な情報をすぐに確認でき、意思決定のスピードを劇的に向上させます。",
                  features: ["レポート自動化", "リアルタイムダッシュボード", "データ更新の自動化", "分析時間の創出"]
                }
              },
              {
                problem: {
                  title: "経験と勘頼みの経営から脱却したい",
                  desc: "データに基づいた意思決定をしたいが、何を見ればいいのか、どう分析すればいいのか分からない。"
                },
                solution: {
                  title: "データドリブンな意思決定の仕組みづくり",
                  desc: "ビジネスゴールに直結するKPIを設計し、常に現状を把握できるモニタリング体制を構築。データリテラシー研修を通じて、社員一人ひとりがデータを活用できる組織へと変革を支援します。",
                  features: ["KPI設計・モニタリング", "データリテラシー研修", "分析フレームワーク提供", "意思決定プロセスの改善"]
                }
              },
              {
                problem: {
                  title: "データの品質に不安がある",
                  desc: "データが正確かどうか分からない。重複や欠損があり、信頼して使えない。"
                },
                solution: {
                  title: "データ品質の担保とガバナンス",
                  desc: "データクレンジングから、データ品質管理の仕組み構築まで支援。データガバナンスを策定し、信頼できるデータ基盤を確立します。",
                  features: ["データクレンジング", "データ品質チェック", "データガバナンス策定", "品質管理プロセスの構築"]
                }
              }
            ];

// 構築作業も月額に含めて初期費用なし（最低契約期間6ヶ月）。2026-10-28 に決定
const plans = [
  {
    name: 'Light',
    sub: 'まずは見える化',
    desc: '毎月の手作業の集計を、まずなくしたい',
    price: 5,
    features: ['1つのテーマ（売上など）のダッシュボードを作成', 'Excelや既存システムのデータから自動で更新', '操作の説明', 'メール・チャットでのご相談', '軽い修正・数字の確認']
  },
  {
    name: 'Standard',
    sub: 'データ活用を全社に',
    desc: '部門ごとの数字を、全社で同じように見たい',
    price: 15,
    features: ['Lightプランの全内容', '複数のデータをまとめて自動で更新', '部門別など、ダッシュボードを複数作成', 'KPI（見るべき数字）の設計', '月1回の定例ミーティング', '社内向けの操作研修'],
    recommended: true
  },
  {
    name: 'Premium',
    sub: 'データ経営パートナー',
    desc: 'データをもとに経営判断する仕組みを作りたい',
    price: 30,
    features: ['Standardプランの全内容', '散らばったデータをまとめる基盤づくり', 'データの品質・管理ルールの整備', 'AIを使った分析・予測', 'データリテラシー研修', '経営会議への同席と改善提案']
  }
];

const DataNext: React.FC = () => (
  <div className="bg-cream text-sumi overflow-x-clip">
      <Helmet>
        <title>データ活用支援・Power BI／Tableau導入 | 愛知・東海の中小企業向け - Arcle</title>
        <meta name="description" content="愛知・東海の中小企業向けのデータ活用支援。Tableau・PowerBI導入、経営ダッシュボード構築、データ分析基盤設計、KPI設計・モニタリング、データリテラシー研修で中小企業のデータドリブン経営を実現。初期費用0円・月額5万円〜。" />
        <link rel="canonical" href="https://www.arcle.net/data-consulting" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://www.arcle.net/" },
            { "@type": "ListItem", "position": 2, "name": "データ活用支援", "item": "https://www.arcle.net/data-consulting" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "データ活用支援サービス",
          "provider": { "@id": "https://www.arcle.net/#organization" },
          "description": "Tableau・PowerBI導入、経営ダッシュボード構築、データ分析基盤設計、KPI設計で中小企業のデータドリブン経営を実現",
          "areaServed": [{ "@type": "State", "name": "愛知県" }, { "@type": "State", "name": "岐阜県" }, { "@type": "State", "name": "三重県" }],
          "offers": plans.map((plan) => ({ "@type": "Offer", "name": `${plan.name}（${plan.sub}）`, "price": String(plan.price * 10000), "priceCurrency": "JPY" }))
        })}</script>
      </Helmet>
    <PageHeader
      en="Data Consulting"
      title={<>データに語らせ、<br />未来を拓く。</>}
      lead={<>
        <p>埋もれたデータは、磨けば輝く「原石」です。<br />確かな分析と可視化で、意思決定のスピードと精度を劇的に高めます。</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href='/contact' className="inline-flex items-center gap-2 rounded-full bg-sumi px-7 py-4 text-base font-bold text-white border-[2.5px] border-sumi shadow-[5px_5px_0_#F2B544] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_#F2B544]">
            まずは無料で相談する<ArrowRight className="h-4 w-4" />
          </a>
          <a href="#services" className={`inline-flex items-center rounded-full bg-white px-7 py-4 text-base font-bold text-sumi ${card} shadow-[5px_5px_0_#1F2430] ${press}`}>サービス詳細を見る</a>
        </div>
      </>}
      crumbs={[{ label: 'サービス', href: '/services' }, { label: 'データ活用' }]}
      service="data"
      image={illust('svc-data')}
    />

    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-center">
        <div>
          <SectionHead en="Your Concerns" enClass={service.text}
            title={<>そのデータ、<br /><Mark><span className={service.text}>眠らせたまま</span></Mark>にしていませんか？</>}
            lead="日々蓄積される膨大なデータ。しかし、それを活用できている企業はごくわずかです。「見えない」「分からない」「使えない」を解消し、データを武器に変えます。" />
          <div className="space-y-4">
            {concerns.map((item, i) => (
              <div key={item.title} className={`group pop-reveal flex gap-4 rounded-[28px] bg-cream p-5 md:p-6 ${card}`} style={{ animationDelay: `${i * 80}ms` }}>
                <div className={`pop-wiggle flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white border-2 border-sumi shadow-[3px_3px_0_#1F2430] -rotate-6 ${service.bg}`}>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-head font-black text-xl md:text-2xl [word-break:auto-phrase]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-[1.9] text-sumi-muted [word-break:auto-phrase]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 困っている人のイラストは、ふわふわ浮かせる */}
        <div className={`group pop-float relative aspect-square grid place-items-center rounded-[32px] ${service.tint} max-w-md w-full justify-self-center p-6 ${card}`}>
          <img src={illust('worry-data')} alt="データの集計や活用に悩む様子" className="pop-tilt w-full" loading="lazy" />
          <Sparkle className="absolute -top-5 -right-3 w-9 h-9 text-mustard" />
        </div>
      </div>
    </section>

    <section id="services" className="py-20 md:py-28 bg-cream bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px] border-y-[2.5px] border-sumi scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="Data Solutions" enClass={service.text} title={<>データの収集から分析、<Mark>活用</Mark>まで。</>}
          lead="データの収集から分析、活用まで。フェーズに合わせた最適な支援を提供します。" />
        <div className="grid md:grid-cols-2 gap-6">
          {solutions.map((item, index) => (
            <article key={item.title} className={`group pop-reveal rounded-[28px] bg-white p-7 md:p-9 ${card}`} style={{ animationDelay: `${index * 80}ms` }}>
              <IconTile icon={<item.icon className="h-7 w-7" aria-hidden="true" />} num={index + 1} bg={service.bg} className="pop-wiggle" />
              <p className={`mt-6 font-en text-sm font-bold tracking-wider ${service.text}`}>{item.title}</p>
              <h3 className="mt-1 font-head text-2xl md:text-[28px] font-black leading-snug [word-break:auto-phrase]">{item.sub}</h3>
              <p className="mt-5 leading-[1.9] text-sumi-muted">{item.desc}</p>
              <ul className="mt-7 pt-6 border-t-2 border-dashed border-warm-line space-y-3">
                {['ビジネス課題に直結した分析設計', '実務で使いこなせる操作研修', '持続可能なデータ運用体制の構築'].map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-relaxed">
                    <Check className={`h-5 w-5 shrink-0 ${service.text}`} aria-hidden="true" />{feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* 支援の名前を流すテープ */}
    <Ticker items={solutions.map((item) => item.sub)} tone="bg-svc-data text-white" className="-mb-4 -mt-[2.5px]" />

    {/* ダッシュボードの見本（触れる） */}
    <section id="dashboard" className="py-20 md:py-28 bg-svc-data/10 bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px] border-b-[2.5px] border-sumi scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead
          en="Dashboard Sample"
          enClass={service.text}
          title={<>ダッシュボードって、<br className="sm:hidden" /><Mark>こういうもの</Mark>です。</>}
          lead="Excelや販売管理システムにある数字を自動で集めて、1つの画面にまとめたものです。下の見本は、架空の卸売業のデータで作っています。期間や営業所を切り替えて、触ってみてください。"
          center
        />
        <div className="pop-reveal relative">
          <Sparkle className="absolute -top-5 -left-3 w-9 h-9 text-mustard z-10" />
          <DashboardSample />
        </div>
        <ul className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            ['集計の手作業がなくなる', '元のデータが更新されると、画面の数字も自動で新しくなります。'],
            ['全員が同じ数字を見られる', '会議の前に資料を作らなくても、同じ画面を見ながら話せます。'],
            ['気になるところを掘り下げられる', '営業所や期間を切り替えて、どこで何が起きているかを確かめられます。']
          ].map(([t, d]) => (
            <li key={t} className={`rounded-[24px] bg-white p-5 ${card}`}>
              <p className="font-head font-black text-lg flex items-center gap-2"><Check className={`w-5 h-5 shrink-0 ${service.text}`} strokeWidth={3} />{t}</p>
              <p className="mt-2 text-sm text-sumi-muted leading-[1.85]">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="What We Can Do" enClass={service.text} title={<>困り事から、<br className="sm:hidden" />解決策へ</>}
          lead="よくある課題と、私たちが提供するソリューションをご紹介します。" />
        <div className="space-y-8">
          {cases.map((item, index) => (
            <article key={item.problem.title} className={`group pop-reveal grid md:grid-cols-2 overflow-hidden rounded-[28px] ${card}`}>
              <div className="p-7 md:p-9 bg-cream">
                <p className="flex items-center gap-3 text-sm font-bold text-sumi-muted">
                  <span className="pop-wiggle grid h-10 w-10 place-items-center rounded-full bg-coral text-white font-en font-black italic text-lg border-2 border-sumi -rotate-12">{index + 1}</span>
                  こんな困り事
                </p>
                <h3 className="mt-5 font-head text-xl md:text-2xl font-black leading-snug [word-break:auto-phrase]">{item.problem.title}</h3>
                <p className="mt-4 text-sumi-muted leading-[1.9]">{item.problem.desc}</p>
              </div>
              <div className={`p-7 md:p-9 border-t-[2.5px] md:border-t-0 md:border-l-[2.5px] border-sumi ${service.tint}`}>
                <p><span className={`inline-block -rotate-3 rounded-lg px-3 py-1 text-sm font-black text-white border-2 border-sumi ${service.bg}`}>私たちができること</span></p>
                <h3 className="mt-5 font-head text-xl md:text-2xl font-black leading-snug [word-break:auto-phrase]">{item.solution.title}</h3>
                <p className="mt-4 text-sumi-muted leading-[1.9]">{item.solution.desc}</p>
                <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                  {item.solution.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm leading-relaxed">
                      <Check className={`h-5 w-5 shrink-0 ${service.text}`} aria-hidden="true" />{feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-white border-t-[2.5px] border-sumi">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="Pricing" enClass={service.text} title="プラン一覧" lead="ダッシュボードの構築も月額に含まれるので、初期費用はかかりません。まずは1つのテーマの見える化から始められます。" center />
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-6 items-stretch pt-4">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} index={i} service="data" plan={{ ...plan, chip: '初期費用 0円', prefix: '月額', amount: String(plan.price), unit: '万円〜', priceNote: '税抜' }} />
          ))}
        </div>
        <div className="mt-10 rounded-[28px] bg-cream border-2 border-dashed border-sumi/40 p-6 text-sm text-sumi-muted leading-[1.9] space-y-2">
          <p>※料金は税抜です。ダッシュボードの構築作業も月額に含まれます（最低契約期間は6ヶ月です）。</p>
          <p>※Power BI・TableauなどのBIツールのライセンス費は、別途必要です。</p>
          <p>※データの整理に大きな手間がかかる場合は、ヒアリングのうえ別途お見積りします。</p>
        </div>
      </div>
    </section>

    <ContactCta
      title={<>データの力で、<br />ビジネスを加速させる。</>}
      body="まずは現状のデータ環境診断から。貴社のデータ活用レベルに合わせたロードマップをご提案します。"
    />
  </div>
);

export default DataNext;
