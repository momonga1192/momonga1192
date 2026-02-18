import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, BarChart3, LayoutDashboard, Database, GraduationCap, MessageCircleQuestion, ChevronDown, FileSpreadsheet, Brain, Puzzle, Check } from 'lucide-react';

const Mieruka: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="pt-24 pb-20 bg-white">
      <Helmet>
        <title>ミエルカ | データ見える化サービス（Tableau・PowerBI導入） - Arcle</title>
        <meta name="description" content="ミエルカは愛知県一宮市のArcleが提供するデータ見える化サービス。Tableau・PowerBI導入、経営ダッシュボード構築、データ基盤設計で中小企業のデータドリブン経営を実現。無料データ診断実施中。" />
        <link rel="canonical" href="https://arcle.net/lp/mieruka" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://arcle.net/" },
            { "@type": "ListItem", "position": 2, "name": "ミエルカ", "item": "https://arcle.net/lp/mieruka" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "ミエルカ - データ見える化サービス",
          "provider": { "@type": "Organization", "name": "Arcle" },
          "description": "Tableau・PowerBI導入、経営ダッシュボード構築、データ基盤設計で中小企業のデータドリブン経営を実現",
          "areaServed": { "@type": "City", "name": "一宮市" }
        })}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-100/60 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-50/80 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="lg:w-1/2 text-left reveal-hidden transition-all duration-1000 ease-out">
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-en font-semibold tracking-widest uppercase mb-6 border border-indigo-100">
                Mieruka
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
                  経営データ、
                </span>
                <span className="block mt-2">
                  <span className="text-indigo-600">"見える"</span>だけで変わります。
                </span>
              </h1>
              <p className="text-xl text-gray-500 mb-12 leading-relaxed font-light">
                ミエルカは、社内に眠るデータを"見える化"し、<br className="hidden md:block" />
                感覚ではなくデータで意思決定できる環境をつくるサービスです。
              </p>
              <a href="/contact" className="group inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30">
                <span className="mr-2">無料で相談する</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="lg:w-1/2 reveal-hidden transition-all duration-1000 delay-300 ease-out">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-400 rounded-3xl blur-2xl opacity-10 animate-pulse" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 aspect-[4/3]">
                  <img 
                    src="/images/lp/mieruka_hero_v1.jpg" 
                    alt="Data Dashboard Visualization" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal-hidden">
            <span className="text-indigo-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Pain Points</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              こんなお悩み<br className="md:hidden" />ありませんか？
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: FileSpreadsheet,
                title: "Excel集計に追われる",
                desc: "Excelの集計作業に毎月何時間もかかっている"
              },
              {
                icon: Brain,
                title: "データが活かせない",
                desc: "データはあるのに、経営判断に活かせていない"
              },
              {
                icon: Puzzle,
                title: "全体像が見えない",
                desc: "部署ごとにデータがバラバラで全体像が見えない"
              }
            ].map((item, index) => (
              <div key={index} className="reveal-hidden text-center p-8 rounded-2xl border border-gray-100 bg-white hover:border-indigo-200 hover:shadow-lg transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-rose-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-indigo-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Solutions</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              ミエルカが<br className="md:hidden" />解決します
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">データの導入から定着まで、一気通貫でサポートします。</p>
          </div>

          <div className="max-w-6xl mx-auto space-y-24">
            {[
              {
                title: "BI Implementation",
                sub: "BIツール導入",
                desc: "Tableau・PowerBIの選定から導入・初期設定まで完全サポート。お客様の規模や業務に最適なツールをご提案し、データの収集から可視化までをスムーズに実現します。",
                icon: BarChart3,
                color: "indigo",
                image: "/images/lp/mieruka_bi_tools.jpg",
                reverse: false
              },
              {
                title: "Dashboard",
                sub: "経営ダッシュボード構築",
                desc: "リアルタイムで売上・KPIを一目で把握できるダッシュボードを構築。多角的な分析により、隠れた課題やチャンスを即座に発見できる環境を整えます。",
                icon: LayoutDashboard,
                color: "blue",
                image: "/images/lp/mieruka_dashboard.jpg",
                reverse: true
              },
              {
                title: "Data Platform",
                sub: "データ基盤設計",
                desc: "散在するデータを統合し、クリーニングされた「使いやすい」データ基盤を整備。部署を横断したデータの一元管理により、社内の情報格差を解消します。",
                icon: Database,
                color: "purple",
                image: "/images/lp/mieruka_platform.jpg",
                reverse: false
              },
              {
                title: "Training",
                sub: "データリテラシー研修",
                desc: "社員が自らデータを読み解き、根拠に基づいた提案ができる組織へ。操作方法だけでなく、ビジネスに活かすための分析思考を実践的に養います。",
                icon: GraduationCap,
                color: "teal",
                image: "/images/lp/mieruka_training.jpg",
                reverse: true
              }
            ].map((item, index) => (
              <div key={index} className={`flex flex-col ${item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 reveal-hidden`}>
                <div className="lg:w-1/2">
                  <div className="relative group">
                    <div className={`absolute -inset-4 bg-${item.color}-500/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 aspect-video">
                      <img 
                        src={item.image} 
                        alt={item.sub} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-${item.color}-50 flex items-center justify-center`}>
                      <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                    </div>
                    <span className="text-sm font-en font-bold text-gray-300">0{index + 1}</span>
                  </div>
                  <h3 className="text-sm font-bold text-indigo-600 mb-2">{item.sub}</h3>
                  <h4 className="text-3xl font-en font-bold text-gray-900 mb-6">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed text-lg mb-8">{item.desc}</p>
                  <ul className="space-y-4">
                    {['短期間でのプロトタイプ作成', '既存データ資産の有効活用', '実務に即したダッシュボード設計'].map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <Check className="w-5 h-5 text-indigo-500 mr-3" />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-indigo-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Flow</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">導入の流れ</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">4つのステップで、データドリブンな経営環境を構築します。</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-200 via-indigo-300 to-indigo-200 hidden md:block" />

              <div className="space-y-10">
                {[
                  {
                    step: "01",
                    title: "無料相談",
                    desc: "現状のデータ環境をヒアリング。課題やゴールを丁寧にお伺いし、最適な進め方をご提案します。"
                  },
                  {
                    step: "02",
                    title: "データ診断",
                    desc: "データの棚卸し・課題の可視化。社内にどんなデータがあるかを整理し、活用の優先度を明確にします。"
                  },
                  {
                    step: "03",
                    title: "ダッシュボード構築",
                    desc: "BIツールで経営に必要な画面を構築。売上・KPI・コストなど、見たい指標をリアルタイムで確認できるようにします。"
                  },
                  {
                    step: "04",
                    title: "定着支援",
                    desc: "研修・運用サポートで組織にデータ文化を根付かせる。社員が自走できるようになるまで伴走します。"
                  }
                ].map((item, index) => (
                  <div key={index} className="reveal-hidden relative md:pl-16">
                    {/* Step marker */}
                    <div className="hidden md:flex absolute left-0 top-6 w-10 h-10 rounded-full bg-indigo-600 text-white items-center justify-center shadow-lg shadow-indigo-200">
                      <span className="text-xs font-en font-bold">{item.step}</span>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-500">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="md:hidden inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-en font-bold">{item.step}</span>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{item.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-indigo-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">よくある質問</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "どのBIツールがおすすめですか？",
                a: "お客様の規模やご予算に応じてTableauまたはPowerBIをご提案します。いずれも代表が資格を保有しています。"
              },
              {
                q: "データ分析の経験がなくても大丈夫ですか？",
                a: "はい、研修込みでサポートします。社員の方が自分で使えるようになるまで伴走します。"
              },
              {
                q: "既存のExcel業務も効率化できますか？",
                a: "はい、Excel集計の自動化やBIツールへの移行もお任せください。"
              }
            ].map((item, index) => (
              <div key={index} className="reveal-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all duration-300 text-left"
                >
                  <div className="flex items-center justify-between p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <MessageCircleQuestion className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="text-lg font-bold text-gray-900">{item.q}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 ml-4 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 md:px-8 pb-6 md:pb-8 pl-[52px] md:pl-[68px]">
                      <p className="text-gray-600 leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-50/40 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10 reveal-hidden">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            まずはデータの<br />
            <span className="text-indigo-600">"健康診断"</span>から。
          </h2>
          <p className="text-gray-500 mb-12 max-w-xl mx-auto">
            御社のデータ環境を無料で診断します。<br />
            お気軽にご相談ください。
          </p>
          <a href="/contact" className="group inline-flex items-center px-10 py-5 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
            無料で相談する
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Mieruka;
