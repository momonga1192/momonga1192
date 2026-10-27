import React, { useEffect, useRef, useState } from 'react';
import { PageHeader, ContactCta } from '../next/parts';
import { illust } from '../next/theme';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, BarChart3, LayoutDashboard, Database, GraduationCap, MessageCircleQuestion, ChevronDown, FileSpreadsheet, Brain, Puzzle, Check, PieChart, TrendingUp, Activity, Layers, Server, Users, BookOpen, LineChart, Gauge, Table, Workflow, Share2 } from 'lucide-react';

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
    <div className="bg-cream text-sumi">
      <Helmet>
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
          "provider": { "@type": "Organization", "name": "Arcle" },
          "description": "Tableau・PowerBI導入、経営ダッシュボード構築、データ基盤設計で中小企業のデータドリブン経営を実現",
          "areaServed": [{ "@type": "State", "name": "愛知県" }, { "@type": "State", "name": "岐阜県" }, { "@type": "State", "name": "三重県" }]
        })}</script>
      </Helmet>

      {/* Hero Section */}
      <PageHeader
        en="Mieruka"
        title={<>
                <span>
                  経営データ、
                </span>
                <span>
                  <span>"見える"</span>だけで変わります。
                </span>
              </>}
        lead={<><p>
                ミエルカは、社内に眠るデータを"見える化"し、<br className="hidden md:block" />
                感覚ではなくデータで意思決定できる環境をつくるサービスです。
              </p><a href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-sumi px-7 py-4 font-bold text-white hover:bg-svc-data transition-colors">無料で相談する<ArrowRight className="w-4 h-4" /></a></>}
        crumbs={[{ label: 'ミエルカ' }]}
        service="data"
        image={illust('svc-data')}
      />

      {/* Problems Section */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16 reveal-hidden">
            <span className="text-svc-data font-en tracking-widest text-xs font-bold uppercase mb-3 block">Pain Points</span>
            <h2 className="font-head [word-break:auto-phrase] text-[26px] md:text-[38px] font-bold text-sumi mb-6">
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
              <div key={index} className="reveal-hidden text-center p-8 rounded-[28px] border border-warm-line bg-white hover:border-svc-data/20 shadow-[0_16px_40px_rgb(31_36_48/0.08)] transition-all duration-500">
                <div className="w-16 h-16 rounded-full bg-svc-data/10 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-svc-data" />
                </div>
                <h3 className="font-head [word-break:auto-phrase] text-lg font-bold text-sumi mb-3">{item.title}</h3>
                <p className="text-sm text-sumi-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 md:py-28 bg-cream-dark relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-svc-data font-en tracking-widest text-xs font-bold uppercase mb-3 block">Solutions</span>
            <h2 className="font-head [word-break:auto-phrase] text-[26px] md:text-[38px] font-bold text-sumi mb-6">
              ミエルカが<br className="md:hidden" />解決します
            </h2>
            <p className="text-sumi-muted max-w-2xl mx-auto">データの導入から定着まで、一気通貫でサポートします。</p>
          </div>

          <div className="max-w-6xl mx-auto space-y-24">
            {[
              {
                title: "BI Implementation",
                sub: "BIツール導入",
                desc: "Tableau・PowerBIの選定から導入・初期設定まで完全サポート。お客様の規模や業務に最適なツールをご提案し、データの収集から可視化までをスムーズに実現します。",
                icon: BarChart3,



                mainIcon: BarChart3,
                mainIconColor: "text-svc-data",
                subIcons: [
                  { Icon: PieChart, color: "text-svc-data", position: "-top-3 -right-4", size: "w-11 h-11", iconSize: "w-5 h-5", rounded: "rounded-[28px]" },
                  { Icon: TrendingUp, color: "text-svc-data", position: "-bottom-2 -left-5", size: "w-10 h-10", iconSize: "w-5 h-5", rounded: "rounded-lg" },
                  { Icon: Table, color: "text-svc-data", position: "top-1/2 -translate-y-1/2 -right-10", size: "w-8 h-8", iconSize: "w-4 h-4", rounded: "rounded-lg" },
                ],
                accentColor: "bg-svc-data/10",
                accentColor2: "bg-svc-data/10",
                borderColor: "border-svc-data/20",
                ringColor: "ring-warm-line",
                reverse: false
              },
              {
                title: "Dashboard",
                sub: "経営ダッシュボード構築",
                desc: "リアルタイムで売上・KPIを一目で把握できるダッシュボードを構築。多角的な分析により、隠れた課題やチャンスを即座に発見できる環境を整えます。",
                icon: LayoutDashboard,



                mainIcon: LayoutDashboard,
                mainIconColor: "text-svc-data",
                subIcons: [
                  { Icon: Gauge, color: "text-svc-data", position: "-top-3 -right-4", size: "w-11 h-11", iconSize: "w-5 h-5", rounded: "rounded-[28px]" },
                  { Icon: Activity, color: "text-svc-data", position: "-bottom-2 -left-5", size: "w-10 h-10", iconSize: "w-5 h-5", rounded: "rounded-lg" },
                  { Icon: LineChart, color: "text-svc-data", position: "top-1/2 -translate-y-1/2 -right-10", size: "w-8 h-8", iconSize: "w-4 h-4", rounded: "rounded-lg" },
                ],
                accentColor: "bg-svc-data/10",
                accentColor2: "bg-svc-data/10",
                borderColor: "border-svc-data/20",
                ringColor: "ring-warm-line",
                reverse: true
              },
              {
                title: "Data Platform",
                sub: "データ基盤設計",
                desc: "散在するデータを統合し、クリーニングされた「使いやすい」データ基盤を整備。部署を横断したデータの一元管理により、社内の情報格差を解消します。",
                icon: Database,



                mainIcon: Database,
                mainIconColor: "text-svc-data",
                subIcons: [
                  { Icon: Server, color: "text-svc-data", position: "-top-3 -right-4", size: "w-11 h-11", iconSize: "w-5 h-5", rounded: "rounded-[28px]" },
                  { Icon: Layers, color: "text-svc-data", position: "-bottom-2 -left-5", size: "w-10 h-10", iconSize: "w-5 h-5", rounded: "rounded-lg" },
                  { Icon: Workflow, color: "text-svc-data", position: "top-1/2 -translate-y-1/2 -right-10", size: "w-8 h-8", iconSize: "w-4 h-4", rounded: "rounded-lg" },
                ],
                accentColor: "bg-svc-data/10",
                accentColor2: "bg-svc-data/10",
                borderColor: "border-svc-data/20",
                ringColor: "ring-warm-line",
                reverse: false
              },
              {
                title: "Training",
                sub: "データリテラシー研修",
                desc: "社員が自らデータを読み解き、根拠に基づいた提案ができる組織へ。操作方法だけでなく、ビジネスに活かすための分析思考を実践的に養います。",
                icon: GraduationCap,



                mainIcon: GraduationCap,
                mainIconColor: "text-svc-data",
                subIcons: [
                  { Icon: Users, color: "text-svc-data", position: "-top-3 -right-4", size: "w-11 h-11", iconSize: "w-5 h-5", rounded: "rounded-[28px]" },
                  { Icon: BookOpen, color: "text-svc-data", position: "-bottom-2 -left-5", size: "w-10 h-10", iconSize: "w-5 h-5", rounded: "rounded-lg" },
                  { Icon: Share2, color: "text-svc-data", position: "top-1/2 -translate-y-1/2 -right-10", size: "w-8 h-8", iconSize: "w-4 h-4", rounded: "rounded-lg" },
                ],
                accentColor: "bg-svc-data/10",
                accentColor2: "bg-svc-data/10",
                borderColor: "border-svc-data/20",
                ringColor: "ring-warm-line",
                reverse: true
              }
            ].map((item, index) => (
              <div key={index} className={`flex flex-col ${item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 reveal-hidden`}>
                <div className="lg:w-1/2">
                  <div className="relative group">
                    <div className={`absolute -inset-4 bg-svc-data/10 rounded-[28px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className={`relative rounded-[28px] overflow-hidden shadow-[0_16px_40px_rgb(31_36_48/0.08)] border border-warm-line aspect-video bg-svc-data/10`}>
                      {/* Decorative blurred shapes */}
                      <div className={`absolute top-6 right-6 w-24 h-24 ${item.accentColor} rounded-full blur-xl`} />
                      <div className={`absolute bottom-8 left-8 w-28 h-28 ${item.accentColor2} rounded-full blur-2xl`} />

                      {/* Subtle grid pattern */}
                      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                      {/* Icon composition */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          {/* Main icon card */}
                          <div className={`w-20 h-20 bg-white/90 backdrop-blur-sm rounded-[28px] shadow-[0_16px_40px_rgb(31_36_48/0.08)]  flex items-center justify-center ${item.borderColor} border ring-1 ${item.ringColor}`}>
                            <item.mainIcon className={`w-10 h-10 ${item.mainIconColor}`} />
                          </div>

                          {/* Sub icon cards */}
                          {item.subIcons.map((sub, i) => (
                            <div key={i} className={`absolute ${sub.position} ${sub.size} bg-white/90 backdrop-blur-sm ${sub.rounded} shadow-[0_16px_40px_rgb(31_36_48/0.08)] flex items-center justify-center border border-warm-line`}>
                              <sub.Icon className={`${sub.iconSize} ${sub.color}`} />
                            </div>
                          ))}

                          {/* Decorative ring */}
                          <div className="absolute -inset-8 border border-dashed border-warm-line rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-full bg-svc-data/10 flex items-center justify-center`}>
                      <item.icon className={`w-6 h-6 text-svc-data`} />
                    </div>
                    <span className="text-sm font-en font-bold text-sumi-muted">0{index + 1}</span>
                  </div>
                  <h3 className="font-head [word-break:auto-phrase] text-sm font-bold text-svc-data mb-2">{item.sub}</h3>
                  <h4 className="font-head [word-break:auto-phrase] text-3xl font-en font-bold text-sumi mb-6">{item.title}</h4>
                  <p className="text-sumi-muted leading-relaxed text-lg mb-8">{item.desc}</p>
                  <ul className="space-y-4">
                    {['短期間でのプロトタイプ作成', '既存データ資産の有効活用', '実務に即したダッシュボード設計'].map((feature, i) => (
                      <li key={i} className="flex items-center text-sumi">
                        <Check className="w-5 h-5 text-svc-data mr-3" />
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
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-svc-data font-en tracking-widest text-xs font-bold uppercase mb-3 block">Flow</span>
            <h2 className="font-head [word-break:auto-phrase] text-[26px] md:text-[38px] font-bold text-sumi mb-6">導入の流れ</h2>
            <p className="text-sumi-muted max-w-2xl mx-auto">4つのステップで、データドリブンな経営環境を構築します。</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-svc-data/10    hidden md:block" />

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
                    <div className="hidden md:flex absolute left-0 top-6 w-10 h-10 rounded-full bg-svc-data text-white items-center justify-center shadow-[0_16px_40px_rgb(31_36_48/0.08)] shadow-none">
                      <span className="text-xs font-en font-bold">{item.step}</span>
                    </div>

                    <div className="bg-cream-dark rounded-[28px] p-8 md:p-10 border border-warm-line hover:border-svc-data/20 shadow-[0_16px_40px_rgb(31_36_48/0.08)] transition-all duration-500">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="md:hidden inline-flex items-center justify-center w-8 h-8 rounded-full bg-svc-data text-white text-xs font-en font-bold">{item.step}</span>
                        <h3 className="font-head [word-break:auto-phrase] text-xl md:text-2xl font-bold text-sumi">{item.title}</h3>
                      </div>
                      <p className="text-sumi-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-cream-dark relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-svc-data font-en tracking-widest text-xs font-bold uppercase mb-3 block">FAQ</span>
            <h2 className="font-head [word-break:auto-phrase] text-[26px] md:text-[38px] font-bold text-sumi mb-6">よくある質問</h2>
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
                  className="w-full bg-white rounded-[28px] border border-warm-line hover:border-svc-data/20 transition-all duration-300 text-left"
                >
                  <div className="flex items-center justify-between p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <MessageCircleQuestion className="w-5 h-5 text-svc-data mt-0.5 flex-shrink-0" />
                      <span className="text-lg font-bold text-sumi">{item.q}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-sumi-muted flex-shrink-0 ml-4 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 md:px-8 pb-6 md:pb-8 pl-[52px] md:pl-[68px]">
                      <p className="text-sumi-muted leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ContactCta title={<>
            まずはデータの<br />
            "健康診断"から。
          </>} body={"御社のデータ環境を無料で診断します。お気軽にご相談ください。"} />
    </div>
  );
};

export default Mieruka;
