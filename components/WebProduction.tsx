import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, ArrowRight, Monitor, Smartphone, Layout, Code, Search, PenTool } from 'lucide-react';

const WebProduction: React.FC = () => {
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
        <title>Web制作・ホームページ制作 | コーポレートサイト・LP - Arcle</title>
        <meta name="description" content="愛知県一宮市のArcleが提供するWeb制作サービス。コーポレートサイト・LP制作、UI/UXデザイン、WordPress等CMS導入、SEO内部対策・パフォーマンス最適化。10万円〜の明確な料金体系。" />
        <link rel="canonical" href="https://arcle.net/web-production" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://arcle.net/" },
            { "@type": "ListItem", "position": 2, "name": "Web制作", "item": "https://arcle.net/web-production" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Web制作サービス",
          "provider": { "@type": "Organization", "name": "Arcle" },
          "description": "コーポレートサイト・LP制作、UI/UXデザイン、CMS導入、SEO対策でビジネスを加速",
          "areaServed": { "@type": "City", "name": "一宮市" },
          "offers": [
            { "@type": "Offer", "name": "LP・シングルページ", "price": "100000", "priceCurrency": "JPY" },
            { "@type": "Offer", "name": "スタンダード", "price": "300000", "priceCurrency": "JPY" }
          ]
        })}</script>
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-teal-50/50 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-green-50/80 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="lg:w-1/2 text-left reveal-hidden transition-all duration-1000 ease-out">
              <span className="inline-block py-1 px-3 rounded-full bg-teal-50 text-teal-600 text-xs font-en font-semibold tracking-widest uppercase mb-6 border border-teal-100">
                Web Production
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
                  想いをカタチに、
                </span>
                <span className="block mt-2">
                  世界へ届ける。
                </span>
              </h1>
              <p className="text-xl text-gray-500 mb-12 leading-relaxed font-light">
                Webサイトは、企業の「顔」であり、最強の「営業マン」です。<br />
                デザインと技術の力で、ブランドの価値を最大化します。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/contact" className="group inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-teal-600 transition-all duration-300 shadow-lg hover:shadow-teal-500/30">
                  <span className="mr-2">まずは無料で相談する</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#services" className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-all duration-300">
                  サービス詳細を見る
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 reveal-hidden transition-all duration-1000 delay-300 ease-out">
              <div className="relative">
                <div className="absolute inset-0 bg-teal-400 rounded-3xl blur-2xl opacity-10 animate-pulse" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 aspect-[4/3] bg-gradient-to-br from-teal-50 via-white to-teal-100">
                  <div className="absolute top-10 right-16 w-32 h-32 rounded-full bg-teal-100/60 blur-xl" />
                  <div className="absolute bottom-16 left-10 w-24 h-24 rounded-full bg-teal-200/40 blur-lg" />
                  <div className="absolute top-1/4 left-1/3 w-12 h-12 rounded-full bg-teal-50/80" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Monitor className="w-32 h-32 text-teal-300/60" />
                  </div>
                </div>
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
                そのWebサイト、<br />
                <span className="text-teal-600">機能して</span>いますか？
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                ただ作っただけのWebサイトでは、成果は上がりません。
                デザイン性、使いやすさ、そして運用しやすさを兼ね備えたサイトが必要です。
              </p>
              <div className="space-y-6">
                {[
                  { title: "デザインの陳腐化", desc: "古臭いデザインでブランドイメージを損なっている", icon: PenTool },
                  { title: "スマホ対応不備", desc: "モバイルで見づらく、ユーザーが離脱している", icon: Smartphone },
                  { title: "更新のしにくさ", desc: "ちょっとした修正も外部に依頼しなければならない", icon: Code }
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 group">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mr-4 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors duration-300">
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
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-teal-50 to-white relative overflow-hidden flex items-center justify-center p-8">
                <img
                  src="/images/web_production.png"
                  alt="Web制作のイラスト：デザイン・スマホ対応・CMS開発"
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
            <span className="text-teal-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Our Services</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Creative & Tech</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">戦略立案からデザイン、実装、運用まで。ワンストップでWeb制作を支援します。</p>
          </div>

          <div className="max-w-6xl mx-auto space-y-24">
            {[
              { 
                title: "Corporate Site", 
                sub: "コーポレートサイト制作", 
                desc: "企業の信頼性を高め、ブランディングを強化するサイトを構築。ステークホルダーに響く、本質的な価値を伝えるデザインを追求します。", 
                icon: Monitor, 
                color: "teal",
                reverse: false
              },
              {
                title: "UI/UX Design",
                sub: "UI/UXデザイン",
                desc: "ユーザー視点に立った、使いやすく美しいインターフェースを設計。直感的な操作感と、目的達成までのスムーズな動線を実現します。",
                icon: Layout,
                color: "indigo",
                reverse: true
              },
              {
                title: "CMS Dev",
                sub: "CMS導入・開発",
                desc: "WordPressやヘッドレスCMSを導入し、更新しやすい環境を整備。社内のナレッジを迅速に発信できる、自律的なサイト運営を支えます。",
                icon: Code,
                color: "blue",
                reverse: false
              },
              {
                title: "SEO / Performance",
                sub: "SEO・高速化",
                desc: "検索エンジン対策と表示速度の最適化で、集客とUXを向上。テクニカルな最適化からコンテンツ戦略まで、包括的にサポートします。",
                icon: Search,
                color: "green",
                reverse: true
              }
            ].map((item, index) => (
              <div key={index} className={`flex flex-col ${item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 reveal-hidden`}>
                <div className="lg:w-1/2">
                  <div className="relative group">
                    <div className={`absolute -inset-4 bg-${item.color}-500/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className={`relative rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 aspect-video flex items-center justify-center bg-gradient-to-br from-${item.color}-50 via-white to-${item.color}-100/50`}>
                      <item.icon className={`w-20 h-20 text-${item.color}-300/60 transform group-hover:scale-110 transition-transform duration-700`} />
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
                  <h3 className="text-sm font-bold text-teal-600 mb-2">{item.sub}</h3>
                  <h4 className="text-3xl font-en font-bold text-gray-900 mb-6">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed text-lg mb-8">{item.desc}</p>
                  <ul className="space-y-4">
                    {['徹底した競合調査と分析', '完全オーダーメイドのデザイン', '最新技術を用いた高品質な実装'].map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <Check className="w-5 h-5 text-teal-500 mr-3" />
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

      {/* Pricing Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-teal-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">プラン一覧</h2>
            <p className="text-gray-500">目的と予算に合わせた制作プラン</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {[
              { name: "LP / Single", sub: "LP・シングルページ", desc: "商品紹介やキャンペーンに", price: "10万円~", features: ["1ページ完結", "お問い合わせフォーム", "スマホ対応"] },
              { name: "Standard", sub: "スタンダード", desc: "一般的なコーポレートサイト", price: "30万円~", features: ["TOP + 下層5ページ", "CMS導入(お知らせ等)", "SEO内部対策", "更新マニュアル"], recommended: true },
              { name: "Premium", sub: "プレミアム", desc: "高機能・大規模サイト", price: "応相談", features: ["ページ数無制限", "高度なアニメーション", "システム連携", "多言語対応"] }
            ].map((plan, index) => (
              <div key={index} className={`relative p-8 rounded-3xl reveal-hidden transition-all duration-500 ${plan.recommended ? 'bg-gray-900 text-white shadow-2xl scale-110 z-10' : 'bg-white border border-gray-100 text-gray-900 hover:border-gray-300'}`}>
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                    おすすめ
                  </div>
                )}
                <div className="mb-8 text-center">
                  <h3 className={`text-3xl font-en font-bold mb-2 ${plan.recommended ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                  <p className={`text-sm font-bold ${plan.recommended ? 'text-gray-400' : 'text-gray-500'}`}>{plan.sub}</p>
                  <p className={`text-xs mt-2 ${plan.recommended ? 'text-gray-500' : 'text-gray-400'}`}>{plan.desc}</p>
                  <p className={`text-2xl font-bold mt-4 ${plan.recommended ? 'text-white' : 'text-gray-900'}`}>{plan.price}</p>
                </div>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center justify-center">
                      <Check className={`w-4 h-4 mr-2 ${plan.recommended ? 'text-teal-400' : 'text-teal-600'}`} />
                      <span className={`text-sm font-medium ${plan.recommended ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <a href="/contact" className={`inline-block w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 ${plan.recommended ? 'bg-teal-600 text-white hover:bg-teal-500' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}>
                    お問い合わせ
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-xs mt-12 reveal-hidden">※料金は税抜です。具体的な金額はヒアリング後にご提示します。</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 text-center relative z-10 reveal-hidden">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            Webで、<br />
            ビジネスを変える。
          </h2>
          <p className="text-gray-500 mb-12 max-w-xl mx-auto">
            ただ作るだけではありません。<br />
            貴社のビジネスゴールを達成するためのWebサイトをご提案します。
          </p>
          <a href="/contact" className="group inline-flex items-center px-10 py-5 bg-teal-600 text-white rounded-full font-bold text-lg hover:bg-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
            無料で相談してみる
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default WebProduction;
