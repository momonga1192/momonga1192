import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, ArrowRight, BarChart, PieChart, TrendingUp, Database, Activity, Search } from 'lucide-react';
import { PageHeader, SectionHead, ContactCta } from '../parts';
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

const DataNext: React.FC = () => (
  <div className="bg-cream text-sumi">
      <Helmet>
        <title>データ活用支援・Power BI／Tableau導入 | 愛知・東海の中小企業向け - Arcle</title>
        <meta name="description" content="愛知・東海の中小企業向けのデータ活用支援。Tableau・PowerBI導入、経営ダッシュボード構築、データ分析基盤設計、KPI設計・モニタリング、データリテラシー研修で中小企業のデータドリブン経営を実現。" />
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
          "areaServed": [{ "@type": "State", "name": "愛知県" }, { "@type": "State", "name": "岐阜県" }, { "@type": "State", "name": "三重県" }]
        })}</script>
      </Helmet>
    <PageHeader
      en="Data Consulting"
      title={<>データに語らせ、<br />未来を拓く。</>}
      lead={<>
        <p>埋もれたデータは、磨けば輝く「原石」です。<br />確かな分析と可視化で、意思決定のスピードと精度を劇的に高めます。</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href='/contact' className="inline-flex items-center gap-2 rounded-full bg-sumi px-7 py-4 text-base font-bold text-white hover:bg-svc-data transition-colors">
            まずは無料で相談する<ArrowRight className="h-4 w-4" />
          </a>
          <a href="#services" className="inline-flex items-center rounded-full border-2 border-sumi px-7 py-4 text-base font-bold text-sumi hover:bg-white transition-colors">サービス詳細を見る</a>
        </div>
      </>}
      crumbs={[{ label: 'サービス', href: '/services' }, { label: 'データ活用' }]}
      service="data"
      image={illust('svc-data')}
    />

    <section className="rounded-t-[40px] bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-center">
        <div>
          <SectionHead en="Your Concerns" enClass={service.text}
            title={<>そのデータ、<br /><span className={service.text}>眠らせたまま</span>にしていませんか？</>}
            lead="日々蓄積される膨大なデータ。しかし、それを活用できている企業はごくわずかです。「見えない」「分からない」「使えない」を解消し、データを武器に変えます。" />
          <div className="space-y-4">
            {concerns.map((item) => (
              <div key={item.title} className="flex gap-4 rounded-[28px] bg-cream p-5 md:p-6">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${service.dot} ${service.text}`}>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-head font-bold text-lg [word-break:auto-phrase]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-[1.9] text-sumi-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`rounded-[40px] ${service.tint} p-6 md:p-10`}>
          <img src={illust('worry-data')} alt="データの集計や活用に悩む様子" className="w-full" loading="lazy" />
        </div>
      </div>
    </section>

    <section id="services" className="py-20 md:py-28 bg-cream-dark scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="Data Solutions" enClass={service.text} title="データの収集から分析、活用まで。"
          lead="データの収集から分析、活用まで。フェーズに合わせた最適な支援を提供します。" />
        <div className="grid md:grid-cols-2 gap-6">
          {solutions.map((item, index) => (
            <article key={item.title} className="rounded-[28px] bg-white p-7 md:p-9">
              <div className="flex items-center justify-between gap-4 mb-7">
                <div className={`flex h-16 w-16 items-center justify-center rounded-full ${service.dot} ${service.text}`}>
                  <item.icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <span className={`font-en text-4xl font-semibold ${service.text} opacity-30`}>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <p className={`font-en text-sm tracking-wider ${service.text}`}>{item.title}</p>
              <h3 className="mt-2 font-head text-2xl font-bold [word-break:auto-phrase]">{item.sub}</h3>
              <p className="mt-5 leading-[1.9] text-sumi-muted">{item.desc}</p>
              <ul className="mt-7 pt-6 border-t border-warm-line space-y-3">
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

    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="What We Can Do" enClass={service.text} title={<>困り事から、<br className="sm:hidden" />解決策へ</>}
          lead="よくある課題と、私たちが提供するソリューションをご紹介します。" />
        <div className="space-y-6">
          {cases.map((item, index) => (
            <article key={item.problem.title} className="grid md:grid-cols-2 overflow-hidden rounded-[28px] border border-warm-line">
              <div className="p-7 md:p-9 bg-cream">
                <p className="flex items-center gap-3 text-sm font-bold text-sumi-muted">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mustard/25 font-en text-sumi">{String(index + 1).padStart(2, '0')}</span>
                  こんな困り事
                </p>
                <h3 className="mt-5 font-head text-xl md:text-2xl font-bold leading-snug [word-break:auto-phrase]">{item.problem.title}</h3>
                <p className="mt-4 text-sumi-muted leading-[1.9]">{item.problem.desc}</p>
              </div>
              <div className={`p-7 md:p-9 ${service.tint}`}>
                <p className={`font-bold text-sm ${service.text}`}>私たちができること</p>
                <h3 className="mt-5 font-head text-xl md:text-2xl font-bold leading-snug [word-break:auto-phrase]">{item.solution.title}</h3>
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

    <ContactCta
      title={<>データの力で、<br />ビジネスを加速させる。</>}
      body="まずは現状のデータ環境診断から。貴社のデータ活用レベルに合わせたロードマップをご提案します。"
    />
  </div>
);

export default DataNext;
