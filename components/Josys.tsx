import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, ArrowRight, Shield, Cpu, Users, Zap, BarChart, Globe } from 'lucide-react';

const Josys: React.FC = () => {
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
      <Helmet>
        <title>情シス代行サービス | Arcle</title>
        <meta name="description" content="ITの専門家を、必要な時だけ。Arcleの情シス代行サービスは、ITヘルプデスク、システム導入・DX推進、セキュリティ・資産管理、クラウド・インフラ支援を包括的にサポートします。" />
        <link rel="canonical" href="https://arcle.jp/josys" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-50/50 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-gray-50/80 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="reveal-hidden transition-all duration-1000 ease-out">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-en font-semibold tracking-widest uppercase mb-6 border border-blue-100">
                Information Systems Outsourcing
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
                  ITの専門家を、
                </span>
                <span className="block mt-2">
                  必要な時だけ。
                </span>
              </h1>
              <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-2xl font-light">
                あなたの会社の「見えない情シス部門」として。<br />
                技術と信頼で、ビジネスの成長を足元から支えます。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/contact" className="group inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30">
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
                そのIT業務、<br />
                <span className="text-blue-600">後回し</span>にしていませんか？
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                コア業務に集中したいのに、ITのトラブルや雑務に時間を奪われている。
                そんな経営者様・ご担当者様のお悩みを、私たちが解決します。
              </p>
              <div className="space-y-6">
                {[
                  { title: "専門知識の不足", desc: "「誰に聞けばいいか分からない」を解消", icon: Users },
                  { title: "リソース不足", desc: "ノンコア業務に費やす時間を削減", icon: Zap },
                  { title: "セキュリティ不安", desc: "情報漏洩のリスクから資産を守る", icon: Shield }
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 group">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mr-4 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300">
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
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 relative overflow-hidden flex items-center justify-center p-8">
                <img
                  src="/images/josys_problems.png"
                  alt="IT業務の課題を表すイラスト：専門知識不足・リソース不足・セキュリティ不安"
                  className="w-full h-full object-contain mix-blend-multiply"
                  loading="lazy"
                  decoding="async"
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
            <span className="text-blue-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Our Services</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Total Support</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">貴社のIT環境を包括的にサポート。課題に合わせて最適なソリューションを提供します。</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[
              { 
                title: "IT Helpdesk", 
                sub: "ITヘルプデスク", 
                desc: "PC操作からトラブル対応まで、チャットや電話で迅速に解決。社員の生産性を守り、業務の停滞を防ぎます。緊急時は優先対応で即座にサポート。", 
                icon: Users, 
                color: "blue" 
              },
              { 
                title: "System Integration", 
                sub: "システム導入・DX推進", 
                desc: "業務効率化ツールの選定から導入、運用定着まで一貫サポート。DX戦略の立案・実行を通じて、デジタル化による競争力強化を実現します。", 
                icon: Cpu, 
                color: "indigo" 
              },
              { 
                title: "Security & Asset", 
                sub: "セキュリティ・資産管理", 
                desc: "情報漏洩対策やアクセス管理などのセキュリティ強化と、ITライセンス・アカウントの一元管理でコストとリスクを最適化します。", 
                icon: Shield, 
                color: "purple" 
              },
              { 
                title: "Cloud & Infra", 
                sub: "クラウド・インフラ支援", 
                desc: "M365やGoogle Workspaceなどクラウドサービスの選定・導入・運用を包括サポート。サーバー・ネットワーク環境の最適化も実現します。", 
                icon: Globe, 
                color: "teal" 
              }
            ].map((item, index) => (
              <div key={index} className="group bg-white p-10 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500 reveal-hidden">
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-${item.color}-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon className={`w-7 h-7 text-${item.color}-600`} />
                  </div>
                  <span className="text-xs font-en font-bold text-gray-300 group-hover:text-blue-600 transition-colors duration-300">0{index + 1}</span>
                </div>
                <h3 className="text-2xl font-en font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm font-bold text-gray-400 mb-4">{item.sub}</p>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-blue-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">プラン一覧</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              スポット対応から包括的なIT運用まで。<br className="hidden md:block" />
              貴社の規模や課題に合わせた最適なサポートプランをご提供します
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {[
              { 
                name: "Light", 
                sub: "ライトプラン", 
                desc: "まずは気軽に相談から", 
                price: "5万円~", 
                features: [
                  "IT相談窓口（メール・チャット）",
                  "簡易トラブルシューティング",
                  "リモートサポート対応",
                  "IT機器・サービス選定アドバイス",

                ] 
              },
              { 
                name: "Standard", 
                sub: "スタンダードプラン", 
                desc: "情シス業務を包括サポート", 
                price: "15万円~", 
                features: [
                  "Lightプランの全内容",
                  "PCキッティング・初期設定代行",
                  "システム・ツール導入支援",
                  "アカウント・ライセンス管理",
                  "訪問サポート",
                  "セキュリティ基本対策",
                  "ITヘルプデスク",
                ], 
                recommended: true 
              },
              { 
                name: "Premium", 
                sub: "プレミアムプラン", 
                desc: "IT戦略パートナー", 
                price: "30万円~", 
                features: [
                  "Standardプランの全内容",
                  "IT戦略コンサルティング",
                  "DX戦略策定・実行",
                  "高度なセキュリティ対策",
                  "システム運用・保守",
                ] 
              }
            ].map((plan, index) => (
              <div key={index} className={`relative p-8 rounded-3xl reveal-hidden transition-all duration-500 flex flex-col ${plan.recommended ? 'bg-gray-900 text-white shadow-2xl md:scale-105 z-10' : 'bg-white border border-gray-100 text-gray-900 hover:border-gray-300'}`}>
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                    おすすめ
                  </div>
                )}
                <div className="mb-6 text-center">
                  <h3 className={`text-3xl font-en font-bold mb-2 ${plan.recommended ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                  <p className={`text-sm font-bold ${plan.recommended ? 'text-gray-400' : 'text-gray-500'}`}>{plan.sub}</p>
                  <p className={`text-xs mt-2 ${plan.recommended ? 'text-gray-500' : 'text-gray-400'}`}>{plan.desc}</p>
                  <p className={`text-3xl font-bold mt-4 ${plan.recommended ? 'text-white' : 'text-gray-900'}`}>{plan.price}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${plan.recommended ? 'text-blue-400' : 'text-blue-600'}`} />
                      <span className={`text-xs font-medium leading-relaxed ${plan.recommended ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center mt-auto">
                  <a href="/contact" className={`inline-block w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 ${plan.recommended ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}>
                    お問い合わせ
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 reveal-hidden space-y-2">
            <p className="text-gray-400 text-xs">※料金は税抜です。企業規模や対応範囲に応じてカスタマイズ可能です。</p>
            <p className="text-gray-400 text-xs">※訪問サポートは一宮市近郊は無料。その他エリアは別途交通費を頂戴します。</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 text-center relative z-10 reveal-hidden">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            ITの悩み、<br />
            私たちにお聞かせください。
          </h2>
          <p className="text-gray-500 mb-12 max-w-xl mx-auto">
            些細なことでも構いません。専門家が丁寧にお話を伺い、<br />
            貴社に最適な解決策をご提案します。
          </p>
          <a href="/contact" className="group inline-flex items-center px-10 py-5 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
            無料で相談してみる
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Josys;
