import React, { useEffect, useRef } from 'react';
import { Check, ArrowRight, BarChart, PieChart, TrendingUp, Database, Activity, Search } from 'lucide-react';

const DataConsulting: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            entry.target.classList.remove('reveal-hidden');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal-hidden').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-50/50 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-50/80 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="reveal-hidden transition-all duration-1000 ease-out">
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-en font-semibold tracking-widest uppercase mb-6 border border-indigo-100">
                Data Consulting
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
                  データに語らせ、
                </span>
                <span className="block mt-2">
                  未来を拓く。
                </span>
              </h1>
              <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-2xl font-light">
                埋もれたデータは、磨けば輝く「原石」です。<br />
                確かな分析と可視化で、意思決定のスピードと精度を劇的に高めます。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/contact" className="group inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30">
                  <span className="mr-2">まずは無料で相談する</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#services" className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-all duration-300">
                  サービス詳細を見る
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal-hidden">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                そのデータ、<br />
                <span className="text-indigo-600">眠らせたまま</span>にしていませんか？
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                日々蓄積される膨大なデータ。しかし、それを活用できている企業はごくわずかです。
                「見えない」「分からない」「使えない」を解消し、データを武器に変えます。
              </p>
              <div className="space-y-6">
                {[
                  { title: "データの散在", desc: "部署ごとにデータがバラバラで統合できない", icon: Database },
                  { title: "可視化の遅れ", desc: "集計作業に追われ、分析まで手が回らない", icon: Activity },
                  { title: "意思決定の属人化", desc: "経験と勘頼みの経営から脱却したい", icon: Search }
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 group">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mr-4 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-300">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative reveal-hidden delay-200">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-indigo-50 to-white relative overflow-hidden flex items-center justify-center p-8">
                <img 
                  src="/images/data_consulting.png" 
                  alt="Data Consulting Illustration" 
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-indigo-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Our Services</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Data Solutions</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">データの収集から分析、活用まで。フェーズに合わせた最適な支援を提供します。</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[
              { title: "BI Implementation", sub: "BIツール導入", desc: "TableauやPowerBI等の導入・設定から、ダッシュボード構築まで支援。", icon: BarChart, color: "indigo" },
              { title: "Data Platform", sub: "データ基盤構築", desc: "社内に散在するデータを統合し、分析しやすい環境を整備。", icon: Database, color: "blue" },
              { title: "KPI Design", sub: "KPI設計・モニタリング", desc: "ビジネスゴールに直結する指標を設計し、常に現状を把握できる仕組みを構築。", icon: TrendingUp, color: "purple" },
              { title: "Data Literacy", sub: "データリテラシー研修", desc: "社員一人ひとりがデータを活用できるよう、教育・定着をサポート。", icon: PieChart, color: "teal" }
            ].map((item, index) => (
              <div key={index} className="group bg-white p-10 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-500 reveal-hidden">
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-${item.color}-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon className={`w-7 h-7 text-${item.color}-600`} />
                  </div>
                  <span className="text-xs font-en font-bold text-gray-300 group-hover:text-indigo-600 transition-colors duration-300">0{index + 1}</span>
                </div>
                <h3 className="text-2xl font-en font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm font-bold text-gray-400 mb-4">{item.sub}</p>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems & Solutions Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-indigo-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">What We Can Do</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">困り事から、<br />解決策へ</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">よくある課題と、私たちが提供するソリューションをご紹介します。</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
              <div className="space-y-8">
            {[
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
            ].map((item, index) => (
              <article key={index} className="reveal-hidden group relative pl-14">
                {/* timeline marker */}
                <div className="absolute left-0 top-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                  <span className="text-[11px] font-en font-bold tracking-widest text-gray-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm overflow-hidden transition-all duration-500 shadow-[0_1px_0_rgba(0,0,0,0.04)] group-hover:shadow-2xl group-hover:border-gray-200">
                  <div className="grid md:grid-cols-2">
                    {/* Problem */}
                    <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-100">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="inline-flex items-center gap-3 text-[11px] font-en font-bold tracking-[0.2em] text-rose-600 uppercase">
                          <span className="w-10 h-px bg-rose-200" />
                          Problem
                        </span>
                        <span className="text-xs text-gray-400">こんな困り事</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-4">
                        {item.problem.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.problem.desc}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="p-8 md:p-10 bg-gradient-to-br from-indigo-50/70 via-white to-white">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="inline-flex items-center gap-3 text-[11px] font-en font-bold tracking-[0.2em] text-indigo-600 uppercase">
                          <span className="w-10 h-px bg-indigo-200" />
                          Solution
                        </span>
                        <span className="text-xs text-gray-400">私たちができること</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-4">
                        {item.solution.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.solution.desc}
                      </p>

                      <div className="mt-7 pt-7 border-t border-indigo-100/70">
                        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                          {item.solution.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm">
                              <span className="mt-1 w-5 h-5 rounded-full bg-white border border-indigo-100 flex items-center justify-center flex-shrink-0">
                                <Check className="w-3.5 h-3.5 text-indigo-600" />
                              </span>
                              <span className="text-gray-700 leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 text-center relative z-10 reveal-hidden">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            データの力で、<br />
            ビジネスを加速させる。
          </h2>
          <p className="text-gray-500 mb-12 max-w-xl mx-auto">
            まずは現状のデータ環境診断から。<br />
            貴社のデータ活用レベルに合わせたロードマップをご提案します。
          </p>
          <a href="/contact" className="group inline-flex items-center px-10 py-5 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
            無料で相談してみる
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default DataConsulting;
