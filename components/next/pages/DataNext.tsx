import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, ArrowRight, BarChart, PieChart, TrendingUp, Database, Activity, Search } from 'lucide-react';
import { PageHeader, PlanCard, SectionHead, ContactCta, IconTile, Mark, Ticker, comicBtn, comicBtnShape, comicIllust } from '../parts';
import { Bubble, Burst, Caption, SfxText, SlantPanel, panel } from '../comic';
import DashboardSample from '../DashboardSample';
import { services } from '../theme';

const service = services.find((s) => s.key === 'data')!;

// お悩みは3コマの漫画にする。img はコマの絵、talk は吹き出しの置き場所と尾（tail は尾の出る位置%、lean は尾の向き）、
// sfx は文字だけの効果音。絵は上の3割を余白にして描いてあるので、吹き出しはそこに置き、尾を人物の顔へ向ける
const concerns = [
                  {
                    title: "データの散在", desc: "部署ごとにデータがバラバラで統合できない", icon: Database,
                    img: 'data-scatter', talk: { at: 'left-[6%] top-[15%]', tilt: -3, tail: 40, lean: 0.4 },
                    sfx: { text: 'CRACK!', color: '#F07A5A', at: 'left-[38%] md:left-[34%] top-[54%]', tilt: 10 }
                  },
                  {
                    title: "可視化の遅れ", desc: "集計作業に追われ、分析まで手が回らない", icon: Activity,
                    img: 'worry-data', talk: { at: 'left-[8%] top-[15%]', tilt: 3, tail: 52, lean: -0.2 },
                    sfx: { text: 'HELP!!', color: '#F2B544', at: 'right-[5%] top-[50%]', tilt: -8 }
                  },
                  {
                    title: "意思決定の属人化", desc: "経験と勘頼みの経営から脱却したい", icon: Search,
                    img: 'data-gut', talk: { at: 'left-[6%] top-[15%]', tilt: -2, tail: 64, lean: 0.3 },
                    sfx: { text: 'HMM...', color: '#C9A6FF', at: 'right-[5%] top-[46%]', tilt: -4, mood: 'droop' as const }
                  }
                ];

// PCでお悩みの3コマを横に並べるときの、斜めの境目（段の箱に対する%）
const concernPoints: [number, number][][] = [
  [[0, 0], [34.5, 0], [31.5, 100], [0, 100]],
  [[36, 0], [66, 0], [69, 100], [33, 100]],
  [[67.5, 0], [100, 0], [100, 100], [70.5, 100]]
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

// 困り事のコマに出す、困っている人の顔（脇役の設定画から切り抜き）
const caseFaces = ['data-face-blonde', 'data-face-man', 'data-face-boss', 'data-face-bob'];

const solutionsLead = 'データの収集から分析、活用まで。フェーズに合わせた最適な支援を提供します。';

// 黒い四角に白いチェック（コミック版のチェックの印）
const Tick: React.FC<{ tone?: string }> = ({ tone = service.bg }) => (
  <span className={`shrink-0 mt-0.5 w-5 h-5 grid place-items-center border-2 border-[#111] text-white ${tone}`}>
    <Check className="w-3 h-3" strokeWidth={4} aria-hidden="true" />
  </span>
);

// お悩みのコマの中身（絵・見出しのナレーション箱・せりふの吹き出し・文字だけの効果音）
const concernContent = (item: (typeof concerns)[number], n: number) => (
  <>
    <img src={comicIllust(item.img)} alt="" className="absolute inset-0 w-full h-full object-cover object-bottom transition-transform duration-300 group-hover:scale-105" loading="lazy" />
    <h3 className="absolute left-[5%] top-[4%] z-10 inline-flex items-center gap-1.5 -rotate-2 border-[3px] border-[#111] bg-mustard px-3 py-1 font-manga text-[16px] md:text-[17px] leading-snug text-[#111] shadow-[3px_3px_0_#111]">
      <item.icon className="w-4 h-4 shrink-0" strokeWidth={3} aria-hidden="true" />
      {item.title}
    </h3>
    <span className="pop-reveal absolute inset-0 block">
      <Bubble talk className={`${item.talk.at} max-w-[78%] md:max-w-[88%] text-[15px] md:text-[16px]`} tailAt={item.talk.tail} lean={item.talk.lean} rotate={item.talk.tilt} delay={0.15 + n * 0.15}>
        {item.desc}
      </Bubble>
      <SfxText text={item.sfx.text} color={item.sfx.color} mood={item.sfx.mood} className={`text-[clamp(26px,7vw,36px)] md:text-[clamp(22px,2.6vw,34px)] ${item.sfx.at}`} rotate={item.sfx.tilt} delay={0.5 + n * 0.15} />
    </span>
  </>
);

const DataNext: React.FC = () => (
  <div className="bg-[#FAF3E0] text-sumi overflow-x-clip">
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

    {/* 表紙：紙の山から「データの原石」を掘り出して掲げるヒーロー */}
    <PageHeader
      en="Data Consulting"
      title={<>データに語らせ、<br />未来を拓く。</>}
      lead={<>
        <p>埋もれたデータは、磨けば輝く「原石」です。<br />確かな分析と可視化で、意思決定のスピードと精度を劇的に高めます。</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href='/contact' className={`${comicBtnShape} bg-[#111] text-white shadow-[5px_5px_0_#F2B544] hover:shadow-[2px_2px_0_#F2B544]`}>
            まずは無料で相談する<ArrowRight className="h-4 w-4" strokeWidth={3} />
          </a>
          <a href="#services" className={`${comicBtn} bg-white text-[#111]`}>サービス詳細を見る</a>
        </div>
      </>}
      crumbs={[{ label: 'サービス', href: '/services' }, { label: 'データ活用' }]}
      service="data"
      image={comicIllust('data-header')}
      imageMode="panel"
    />

    {/* お悩み：トップと同じ黒い帯の見出しに、困っている人の3コマ漫画 */}
    <section className="pt-20 pb-20 md:pt-28 md:pb-28 bg-mustard comic-dots border-b-[4px] border-[#111]">
      <div className="pop-reveal relative -rotate-1 bg-[#111] px-4 py-5 md:py-7 border-y-[4px] border-white">
        <p className="text-center">
          <span className="inline-block -rotate-2 border-[3px] border-white bg-svc-data px-4 pt-1.5 pb-1 font-comic text-xl md:text-2xl tracking-[0.06em] text-white">Your Concerns</span>
        </p>
        <h2 className="mt-3 text-center font-manga text-white text-[24px] sm:text-[34px] md:text-[44px] leading-[1.35] [word-break:auto-phrase]">
          そのデータ、<br className="sm:hidden" />
          <span className="mx-1 text-mustard text-[1.25em] [text-shadow:4px_4px_0_#5B5BD6]">眠らせたまま</span>にしていませんか？
        </h2>
      </div>
      <div className="max-w-6xl mx-auto px-3 sm:px-5">
        <p className="pop-reveal mx-auto -mt-2 mb-10 md:mb-14 max-w-3xl bg-white border-[3px] border-[#111] px-5 py-4 font-bold leading-[1.9] text-sumi shadow-[5px_5px_0_#111] [word-break:auto-phrase]">
          日々蓄積される膨大なデータ。しかし、それを活用できている企業はごくわずかです。「見えない」「分からない」「使えない」を解消し、データを武器に変えます。
        </p>
        <div className="flex flex-col gap-3 md:gap-0 drop-shadow-[6px_6px_0_#111]">
          {/* スマホは1コマずつ縦に（上下の辺を斜めに）、PCは斜めの境目で3コマを横に並べる */}
          {concerns.map((item, n) => (
            <div key={item.title} className="md:hidden relative aspect-square">
              <SlantPanel points={n % 2 ? [[0, 4], [100, 0], [100, 100], [0, 96]] : [[0, 0], [100, 4], [100, 96], [0, 100]]}>
                {concernContent(item, n)}
              </SlantPanel>
            </div>
          ))}
          <div className="hidden md:block relative aspect-[5/2]">
            {concerns.map((item, n) => (
              <SlantPanel key={item.title} points={concernPoints[n]}>
                {concernContent(item, n)}
              </SlantPanel>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* 支援の内容：ヒーローがダッシュボードを操る大ゴマ＋4つのコマ */}
    <section id="services" className="py-20 md:py-28 bg-[#FAF3E0] comic-dots scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="Data Solutions" enClass={service.text} title={<>データの収集から分析、<Mark>活用</Mark>まで。</>} />

        {/* スマホは吹き出しを絵の上に別に出し、PCは絵の中に重ねる */}
        <p className="md:hidden pop-reveal relative mx-2 mb-8 rounded-[46%] bg-white border-[3px] border-[#111] px-6 py-5 text-center font-manga text-[16px] leading-[1.6] text-[#111] shadow-[4px_4px_0_#111] [word-break:auto-phrase]">
          {solutionsLead}
          <svg viewBox="0 0 40 30" className="absolute -bottom-[26px] left-[55%] w-10 h-8" aria-hidden="true">
            <path d="M4 0 L18 28 L26 0" fill="#fff" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
            <rect x="2" y="-4" width="28" height="5" fill="#fff" />
          </svg>
        </p>
        <div className="pop-reveal relative aspect-[3/2] md:aspect-[21/9] drop-shadow-[8px_8px_0_#111]">
          <SlantPanel points={[[0, 0], [100, 2], [100, 100], [0, 97]]}>
            <img src={comicIllust('svc-data')} alt="ヒーローに扮したArcleが、散らばった表を集めてダッシュボードの画面にまとめるイラスト" className="absolute inset-0 w-full h-full object-cover object-[50%_35%]" loading="lazy" />
            <Bubble talk className="hidden md:block left-[3%] top-[8%] w-[38%] text-[20px] lg:text-[22px]" tailAt={84} lean={1} rotate={-2} delay={0.2}>
              {solutionsLead}
            </Bubble>
          </SlantPanel>
          <Burst text="ZAP!" className="w-[86px] md:w-[130px] -top-9 md:-top-12 right-[6%]" textClass="text-white text-[24px] md:text-[38px]" rotate={12} delay={0.3} />
        </div>

        <div className="mt-14 md:mt-16 grid md:grid-cols-2 gap-8 md:gap-10">
          {solutions.map((item, index) => (
            <article key={item.title} className={`group pop-reveal relative flex flex-col bg-white ${panel} ${index % 2 ? 'md:rotate-[0.6deg]' : 'md:-rotate-[0.6deg]'}`} style={{ animationDelay: `${(index % 2) * 120}ms` }}>
              {/* 英字の名前を大きく入れた帯 */}
              <div className={`relative overflow-hidden border-b-[4px] border-[#111] px-6 md:px-8 pt-6 pb-5 ${service.tint}`}>
                <span className="absolute inset-0 comic-dots opacity-70" aria-hidden="true" />
                <div className="relative flex items-center justify-between gap-4">
                  <p className={`font-comic text-[30px] md:text-[38px] leading-none tracking-[0.03em] uppercase ${service.text} [paint-order:stroke_fill] [-webkit-text-stroke:6px_#fff]`}>{item.title}</p>
                  <IconTile icon={<item.icon className="h-7 w-7" aria-hidden="true" />} num={index + 1} bg={service.bg} className="pop-wiggle shrink-0" />
                </div>
              </div>
              <div className="flex flex-col flex-1 p-6 md:p-8">
                <h3 className="font-manga text-[24px] md:text-[28px] leading-snug [word-break:auto-phrase]">{item.sub}</h3>
                <p className="mt-4 text-[15px] leading-[1.9] text-sumi">{item.desc}</p>
                <ul className="mt-6 pt-6 border-t-[3px] border-dashed border-[#111]/25 space-y-3">
                  {['ビジネス課題に直結した分析設計', '実務で使いこなせる操作研修', '持続可能なデータ運用体制の構築'].map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm font-bold leading-relaxed">
                      <Tick />{feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* 支援の名前を流すテープ */}
    <Ticker items={solutions.map((item) => item.sub)} tone="bg-svc-data text-white" className="-my-4" />

    {/* ダッシュボードの見本（触れる）。指さしで案内するヒーローが、見本のコマの上から顔を出す */}
    <section id="dashboard" className="py-20 md:py-28 bg-[#E6E6F8] comic-dots border-y-[4px] border-[#111] scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <div className="md:pr-[250px] lg:pr-[300px]">
          <SectionHead
            en="Dashboard Sample"
            enClass={service.text}
            title={<>ダッシュボードって、<br /><Mark>こういうもの</Mark>です。</>}
            lead="Excelや販売管理システム、生産の記録などにある数字を自動で集めて、1つの画面にまとめたものです。下の見本は、架空の会社のデータで作った売上・在庫・生産のダッシュボードです。タブや営業所を切り替えて、触ってみてください。"
          />
        </div>
        <div className="relative">
          {/* スマホは見本の上にヒーローの分の高さをとり、PCは見出しの右の余白にはみ出させる */}
          <div className="pop-reveal relative h-[150px] -mt-4 md:mt-0 md:h-0">
            <img src={comicIllust('data-guide')} alt="" className="absolute right-0 md:right-4 -bottom-[6px] w-[176px] md:w-[270px] lg:w-[300px] pointer-events-none" loading="lazy" />
            <Bubble className="right-[160px] md:right-[262px] lg:right-[292px] bottom-[64px] md:bottom-[150px] text-[26px] md:text-[34px]" side rotate={-6} delay={0.3}>
              TRY IT!
            </Bubble>
          </div>
          <div className="pop-reveal relative z-10 [&>div]:rounded-none [&>div]:border-[4px] [&>div]:shadow-[10px_10px_0_#111]">
            <Caption tone={`${service.bg} text-white`} className="absolute z-20 -top-5 left-4 -rotate-2">
              <span className="font-comic text-[18px] md:text-[20px] leading-none tracking-[0.08em]">LIVE SAMPLE</span>
            </Caption>
            <DashboardSample />
          </div>
        </div>
        <ul className="mt-12 grid md:grid-cols-3 gap-8 md:gap-6">
          {[
            ['集計の手作業がなくなる', '元のデータが更新されると、画面の数字も自動で新しくなります。'],
            ['全員が同じ数字を見られる', '会議の前に資料を作らなくても、同じ画面を見ながら話せます。'],
            ['気になるところを掘り下げられる', '営業所や期間を切り替えて、どこで何が起きているかを確かめられます。']
          ].map(([t, d], i) => (
            <li key={t} style={{ animationDelay: `${i * 100}ms` }} className={`pop-reveal relative bg-white p-5 pt-7 ${panel} shadow-[6px_6px_0_#111]`}>
              <span className="absolute -top-4 -left-3 grid place-items-center w-10 h-10 -rotate-6 bg-mustard border-[3px] border-[#111] font-comic text-[24px] leading-none shadow-[3px_3px_0_#111]" aria-hidden="true">{i + 1}</span>
              <p className="font-manga text-[18px] leading-snug flex items-start gap-2 [word-break:auto-phrase]"><Tick />{t}</p>
              <p className="mt-2 text-sm text-sumi leading-[1.85]">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* 困り事から解決策へ：夜空の濃紺に、「困り事」→「できること」の2コマを並べる */}
    <section className="py-20 md:py-28 bg-sumi comic-dots-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="What We Can Do" enTone="bg-mustard text-[#111]" dark title={<>困り事から、<br className="sm:hidden" />解決策へ</>}
          lead="よくある課題と、私たちが提供するソリューションをご紹介します。" />
        <div className="space-y-14 md:space-y-12">
          {cases.map((item, index) => (
            <article key={item.problem.title} className="group pop-reveal grid md:grid-cols-[1fr_56px_1.3fr] items-stretch">
              {/* 困り事のコマ：困っている人の顔と、そのせりふの吹き出し（尾は顔に向ける） */}
              <div className={`relative flex flex-col bg-[#FAF3E0] comic-dots p-5 pt-10 md:p-7 md:pt-11 border-[4px] border-[#111] shadow-[8px_8px_0_#F07A5A] ${index % 2 ? 'md:rotate-[0.8deg]' : 'md:-rotate-[0.8deg]'}`}>
                <p className="absolute -top-5 left-4 flex items-center gap-2">
                  <span className="grid h-11 w-11 place-items-center bg-coral text-white font-comic text-[26px] leading-none border-[3px] border-[#111] shadow-[3px_3px_0_#111] -rotate-12 [paint-order:stroke_fill] [-webkit-text-stroke:4px_#111]">{index + 1}</span>
                  <Caption tone="bg-white text-[#111]" className="-rotate-2">こんな困り事</Caption>
                </p>
                <div className="relative flex-1 flex flex-col justify-center">
                  <div className="relative ml-[76px] md:ml-[104px] bg-white border-[3px] border-[#111] rounded-[26px] px-5 py-4 md:px-6 md:py-5 shadow-[4px_4px_0_#111]">
                    <h3 className="font-manga text-[18px] md:text-[21px] leading-snug [word-break:auto-phrase]">{item.problem.title}</h3>
                    <p className="mt-3 text-[14px] md:text-[15px] text-sumi leading-[1.85]">{item.problem.desc}</p>
                    {/* 尾：吹き出しの左下から、左の顔へ */}
                    <svg viewBox="0 0 30 40" className="absolute -left-[27px] bottom-5 w-[30px] h-10" aria-hidden="true">
                      <path d="M30 6 L2 30 L30 26" fill="#fff" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
                      <rect x="27" y="4" width="6" height="24" fill="#fff" />
                    </svg>
                  </div>
                  <img src={comicIllust(caseFaces[index])} alt="" className="absolute left-0 bottom-0 w-[64px] h-[64px] md:w-[88px] md:h-[88px] -rotate-3 border-[3px] border-[#111] bg-white shadow-[3px_3px_0_#111]" loading="lazy" />
                </div>
              </div>
              {/* コマのあいだの矢印 */}
              <div className="relative z-10 flex items-center justify-center -my-3 md:my-0 md:-mx-2" aria-hidden="true">
                <span className="grid place-items-center w-12 h-12 bg-mustard border-[3px] border-[#111] shadow-[3px_3px_0_#111] rotate-6">
                  <ArrowRight className="w-7 h-7 rotate-90 md:rotate-0" strokeWidth={3.5} />
                </span>
              </div>
              {/* 私たちができることのコマ */}
              <div className={`relative bg-white border-[4px] border-[#111] shadow-[8px_8px_0_#5B5BD6] ${index % 2 ? 'md:-rotate-[0.5deg]' : 'md:rotate-[0.5deg]'}`}>
                <div className={`relative overflow-hidden border-b-[4px] border-[#111] px-6 md:px-8 pt-5 pb-4 text-white ${service.bg}`}>
                  <span className="absolute inset-0 comic-dots-light" aria-hidden="true" />
                  <p className="relative"><span className="inline-block -rotate-2 bg-mustard text-[#111] border-[3px] border-[#111] px-3 py-1 font-manga text-[13px] md:text-[14px] shadow-[3px_3px_0_#111]">私たちができること</span></p>
                  <h3 className="relative mt-3 font-manga text-[20px] md:text-[23px] leading-snug [paint-order:stroke_fill] [-webkit-text-stroke:5px_#111] [word-break:auto-phrase]">{item.solution.title}</h3>
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-[15px] text-sumi leading-[1.9]">{item.solution.desc}</p>
                  <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                    {item.solution.features.map((feature) => (
                      <li key={feature} className="flex gap-2 text-sm font-bold leading-relaxed">
                        <Tick />{feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* 料金プラン */}
    <section className="py-20 md:py-28 bg-white comic-dots border-t-[4px] border-[#111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="Pricing" enClass={service.text} title="プラン一覧" lead="ダッシュボードの構築も月額に含まれるので、初期費用はかかりません。まずは1つのテーマの見える化から始められます。" center />
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-6 items-stretch pt-4">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} index={i} service="data" plan={{ ...plan, chip: '初期費用 0円', prefix: '月額', amount: String(plan.price), unit: '万円〜', priceNote: '税抜' }} />
          ))}
        </div>
        <div className="pop-reveal relative mt-14 bg-[#FAF3E0] border-[3px] border-[#111] shadow-[6px_6px_0_#111] p-6 pt-8 text-sm text-sumi leading-[1.9] space-y-2">
          <Caption className="absolute -top-4 left-4 -rotate-2">
            <span className="font-comic text-[17px] leading-none tracking-[0.08em]">NOTE</span>
          </Caption>
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
