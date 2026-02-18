import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, ArrowRight, Smartphone, RefreshCw, Search, Palette, Settings, Shield, HelpCircle, ChevronDown, Monitor, Code, Layout, MousePointerClick, Database, FileText, BarChart3, TrendingUp, Globe, Wrench, Server, Lock } from 'lucide-react';

const WebMadoguchi: React.FC = () => {
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
        <title>ウェブの窓口 | ホームページ制作・リニューアル - Arcle</title>
        <meta name="description" content="ウェブの窓口は愛知県一宮市のArcleが提供するWeb制作サービス。コーポレートサイト・LP制作、WordPress導入、SEO内部対策、保守運用を10万円〜で提供。スマホ対応・デザインリニューアルもお任せ。" />
        <link rel="canonical" href="https://arcle.net/lp/web-madoguchi" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://arcle.net/" },
            { "@type": "ListItem", "position": 2, "name": "ウェブの窓口", "item": "https://arcle.net/lp/web-madoguchi" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "ウェブの窓口",
          "provider": { "@type": "Organization", "name": "Arcle" },
          "description": "企業のWeb制作・リニューアルをワンストップでサポート。デザインから集客まで、まるっとお任せ。",
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
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-teal-100/60 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="lg:w-1/2 text-left reveal-hidden transition-all duration-1000 ease-out">
              <span className="inline-block py-1 px-3 rounded-full bg-teal-50 text-teal-600 text-xs font-en font-semibold tracking-widest uppercase mb-6 border border-teal-100">
                Web Madoguchi
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
                  ホームページのこと、
                </span>
                <span className="block mt-2">
                  全部相談できる場所。
                </span>
              </h1>
              <p className="text-xl text-gray-500 mb-12 leading-relaxed font-light">
                ウェブの窓口は、企業のWeb制作・リニューアルをワンストップでサポートするサービスです。<br />
                デザインから集客まで、まるっとお任せください。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/contact" className="group inline-flex items-center justify-center px-8 py-4 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-teal-500/30">
                  <span className="mr-2">無料で相談する</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 reveal-hidden transition-all duration-1000 delay-300 ease-out">
              <div className="relative">
                <div className="absolute inset-0 bg-teal-400 rounded-3xl blur-2xl opacity-10 animate-pulse" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100/50 aspect-[4/3] bg-gradient-to-br from-teal-50 via-white to-emerald-50">
                  {/* Decorative blurred orbs */}
                  <div className="absolute top-8 right-8 w-28 h-28 bg-teal-200/30 rounded-full blur-2xl" />
                  <div className="absolute bottom-12 left-8 w-36 h-36 bg-emerald-200/25 rounded-full blur-2xl" />
                  <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-teal-100/40 rounded-full blur-xl" />

                  {/* Subtle grid pattern */}
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #0d9488 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                  {/* Main icon composition */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Central monitor icon */}
                      <div className="w-32 h-32 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg shadow-teal-200/40 flex items-center justify-center border border-teal-100/60 ring-1 ring-teal-50">
                        <Monitor className="w-16 h-16 text-teal-600" />
                      </div>

                      {/* Orbiting satellite icons */}
                      <div className="absolute -top-5 -right-5 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-2xl shadow-md shadow-teal-100/30 flex items-center justify-center border border-teal-50 ring-1 ring-white">
                        <Code className="w-7 h-7 text-emerald-500" />
                      </div>
                      <div className="absolute -bottom-4 -left-7 w-13 h-13 bg-white/95 backdrop-blur-sm rounded-xl shadow-md shadow-teal-100/30 flex items-center justify-center border border-teal-50 ring-1 ring-white p-2.5">
                        <Palette className="w-6 h-6 text-teal-500" />
                      </div>
                      <div className="absolute top-1/2 -translate-y-1/2 -right-16 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm flex items-center justify-center border border-emerald-50">
                        <Layout className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="absolute -top-3 -left-12 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm flex items-center justify-center border border-teal-50">
                        <MousePointerClick className="w-5 h-5 text-teal-400" />
                      </div>

                      {/* Decorative dots and rings */}
                      <div className="absolute -bottom-10 right-4 w-3 h-3 bg-teal-300/60 rounded-full" />
                      <div className="absolute -top-9 left-6 w-2 h-2 bg-emerald-300/50 rounded-full" />
                      <div className="absolute top-0 -right-10 w-2 h-2 bg-teal-400/40 rounded-full" />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/5 to-transparent" />
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
            <span className="text-teal-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Problems</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              こんなお悩みありませんか？
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Smartphone,
                text: 'ホームページが古くて、スマホで見づらい'
              },
              {
                icon: RefreshCw,
                text: '作ったきりで更新できず、放置状態になっている'
              },
              {
                icon: Search,
                text: '検索しても自社サイトが全然出てこない'
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl text-center reveal-hidden hover:shadow-lg transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-teal-600" />
                </div>
                <p className="text-gray-700 font-medium leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-teal-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Solutions</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">ウェブの窓口が解決します</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">デザインから運用まで。ワンストップでWebの課題を解決します。</p>
          </div>

          <div className="max-w-6xl mx-auto space-y-24">
            {[
              {
                title: 'Modern Design',
                sub: 'モダンデザイン',
                desc: 'スマホ対応は当たり前。ブランドイメージを高める洗練されたデザインをご提供します。ユーザーが迷わない、使いやすさを追求したUI/UXをご提案します。',
                icon: Palette,
                color: 'teal',
                gradientFrom: 'from-teal-50',
                gradientTo: 'to-emerald-50/50',
                orbColor1: 'bg-teal-200/30',
                orbColor2: 'bg-emerald-100/40',
                mainIconColor: 'text-teal-600',
                mainBg: 'shadow-teal-200/40 border-teal-100/60',
                subIcons: [
                  { icon: Layout, color: 'text-emerald-500', pos: '-top-4 -right-4', size: 'w-12 h-12', rounded: 'rounded-2xl', iconSize: 'w-6 h-6' },
                  { icon: Smartphone, color: 'text-teal-500', pos: '-bottom-3 -left-5', size: 'w-11 h-11', rounded: 'rounded-xl', iconSize: 'w-5 h-5' },
                  { icon: MousePointerClick, color: 'text-teal-400', pos: 'top-1/2 -translate-y-1/2 -right-14', size: 'w-9 h-9', rounded: 'rounded-lg', iconSize: 'w-4 h-4' },
                ],
                reverse: false
              },
              {
                title: 'CMS Setup',
                sub: 'CMS導入',
                desc: 'WordPress等を導入し、お客様自身で簡単に更新・管理できる環境を整備します。専門知識がなくても、ブログ感覚でサイトを成長させることが可能です。',
                icon: Settings,
                color: 'blue',
                gradientFrom: 'from-blue-50',
                gradientTo: 'to-sky-50/50',
                orbColor1: 'bg-blue-200/30',
                orbColor2: 'bg-sky-100/40',
                mainIconColor: 'text-blue-600',
                mainBg: 'shadow-blue-200/40 border-blue-100/60',
                subIcons: [
                  { icon: Database, color: 'text-sky-500', pos: '-top-4 -right-4', size: 'w-12 h-12', rounded: 'rounded-2xl', iconSize: 'w-6 h-6' },
                  { icon: FileText, color: 'text-blue-500', pos: '-bottom-3 -left-5', size: 'w-11 h-11', rounded: 'rounded-xl', iconSize: 'w-5 h-5' },
                  { icon: Code, color: 'text-blue-400', pos: 'top-1/2 -translate-y-1/2 -right-14', size: 'w-9 h-9', rounded: 'rounded-lg', iconSize: 'w-4 h-4' },
                ],
                reverse: true
              },
              {
                title: 'SEO Strategy',
                sub: 'SEO内部対策',
                desc: '検索エンジンに評価される構造・コンテンツ設計で集客力をUPさせます。Googleのガイドラインに準拠した、持続的な価値を生むサイト構築を行います。',
                icon: Search,
                color: 'green',
                gradientFrom: 'from-green-50',
                gradientTo: 'to-emerald-50/50',
                orbColor1: 'bg-green-200/30',
                orbColor2: 'bg-emerald-100/40',
                mainIconColor: 'text-green-600',
                mainBg: 'shadow-green-200/40 border-green-100/60',
                subIcons: [
                  { icon: BarChart3, color: 'text-emerald-500', pos: '-top-4 -right-4', size: 'w-12 h-12', rounded: 'rounded-2xl', iconSize: 'w-6 h-6' },
                  { icon: TrendingUp, color: 'text-green-500', pos: '-bottom-3 -left-5', size: 'w-11 h-11', rounded: 'rounded-xl', iconSize: 'w-5 h-5' },
                  { icon: Globe, color: 'text-green-400', pos: 'top-1/2 -translate-y-1/2 -right-14', size: 'w-9 h-9', rounded: 'rounded-lg', iconSize: 'w-4 h-4' },
                ],
                reverse: false
              },
              {
                title: 'Maintenance',
                sub: '保守・運用サポート',
                desc: '公開後も安心。サーバー管理、セキュリティ対策、定期的なバックアップなど、Webサイトの安定稼働をバックアップします。',
                icon: Shield,
                color: 'indigo',
                gradientFrom: 'from-indigo-50',
                gradientTo: 'to-violet-50/50',
                orbColor1: 'bg-indigo-200/30',
                orbColor2: 'bg-violet-100/40',
                mainIconColor: 'text-indigo-600',
                mainBg: 'shadow-indigo-200/40 border-indigo-100/60',
                subIcons: [
                  { icon: Server, color: 'text-violet-500', pos: '-top-4 -right-4', size: 'w-12 h-12', rounded: 'rounded-2xl', iconSize: 'w-6 h-6' },
                  { icon: Wrench, color: 'text-indigo-500', pos: '-bottom-3 -left-5', size: 'w-11 h-11', rounded: 'rounded-xl', iconSize: 'w-5 h-5' },
                  { icon: Lock, color: 'text-indigo-400', pos: 'top-1/2 -translate-y-1/2 -right-14', size: 'w-9 h-9', rounded: 'rounded-lg', iconSize: 'w-4 h-4' },
                ],
                reverse: true
              }
            ].map((item, index) => (
              <div key={index} className={`flex flex-col ${item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 reveal-hidden`}>
                <div className="lg:w-1/2">
                  <div className="relative group">
                    <div className={`absolute -inset-4 bg-${item.color}-500/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className={`relative rounded-[2rem] overflow-hidden shadow-xl border border-gray-100/50 aspect-video bg-gradient-to-br ${item.gradientFrom} via-white ${item.gradientTo}`}>
                      {/* Decorative background orbs */}
                      <div className={`absolute top-6 right-6 w-20 h-20 ${item.orbColor1} rounded-full blur-xl`} />
                      <div className={`absolute bottom-8 left-6 w-24 h-24 ${item.orbColor2} rounded-full blur-2xl`} />

                      {/* Subtle dot pattern */}
                      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                      {/* Icon composition */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          {/* Main icon */}
                          <div className={`w-20 h-20 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg ${item.mainBg} flex items-center justify-center ring-1 ring-white/60`}>
                            <item.icon className={`w-10 h-10 ${item.mainIconColor}`} />
                          </div>

                          {/* Sub icons */}
                          {item.subIcons.map((sub, i) => (
                            <div key={i} className={`absolute ${sub.pos} ${sub.size} bg-white/95 backdrop-blur-sm ${sub.rounded} shadow-md flex items-center justify-center border border-gray-50 ring-1 ring-white`}>
                              <sub.icon className={`${sub.iconSize} ${sub.color}`} />
                            </div>
                          ))}

                          {/* Decorative dots */}
                          <div className={`absolute -bottom-7 right-2 w-2.5 h-2.5 bg-${item.color}-300/50 rounded-full`} />
                          <div className={`absolute -top-6 left-4 w-2 h-2 bg-${item.color}-200/60 rounded-full`} />
                        </div>
                      </div>
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
                    {['ヒアリング重視の提案', 'スピード感のある制作', '公開後の手厚いサポート'].map((feature, i) => (
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
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">料金プラン</h2>
            <p className="text-gray-500">目的と予算に合わせた制作プラン</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {[
              {
                name: 'LP / Single',
                sub: 'LP・シングルページ',
                price: '10万円〜',
                features: ['1ページ完結', 'お問い合わせフォーム', 'スマホ対応']
              },
              {
                name: 'Standard',
                sub: 'スタンダード',
                price: '30万円〜',
                features: ['TOP + 下層5ページ', 'CMS導入', 'SEO内部対策', '更新マニュアル'],
                recommended: true
              },
              {
                name: 'Premium',
                sub: 'プレミアム',
                price: '応相談',
                features: ['ページ数無制限', '高度なアニメーション', 'システム連携', '多言語対応']
              }
            ].map((plan, index) => (
              <div key={index} className={`relative p-8 rounded-3xl reveal-hidden transition-all duration-500 flex flex-col ${plan.recommended ? 'bg-gray-900 text-white shadow-2xl md:scale-105 z-10' : 'bg-white border border-gray-100 text-gray-900 hover:border-gray-300'}`}>
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                    おすすめ
                  </div>
                )}
                <div className="mb-8 text-center">
                  <h3 className={`text-3xl font-en font-bold mb-2 ${plan.recommended ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                  <p className={`text-sm font-bold ${plan.recommended ? 'text-gray-400' : 'text-gray-500'}`}>{plan.sub}</p>
                  <p className={`text-2xl font-bold mt-4 ${plan.recommended ? 'text-white' : 'text-gray-900'}`}>{plan.price}</p>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center justify-center">
                      <Check className={`w-4 h-4 mr-2 ${plan.recommended ? 'text-teal-400' : 'text-teal-600'}`} />
                      <span className={`text-sm font-medium ${plan.recommended ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center mt-auto">
                  <a href="/contact" className={`inline-block w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 ${plan.recommended ? 'bg-teal-600 text-white hover:bg-teal-500' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}>
                    お問い合わせ
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 reveal-hidden space-y-2">
            <p className="text-gray-400 text-xs">※料金は税抜です。</p>
            <p className="text-gray-400 text-xs">※具体的な金額はヒアリング後にご提示します。</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-teal-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">よくある質問</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: '制作期間はどれくらいですか？',
                a: 'LPで約2〜3週間、スタンダードプランで約1〜2ヶ月が目安です。'
              },
              {
                q: 'デザインのイメージが固まっていないのですが？',
                a: '大丈夫です。ヒアリングを通じて、御社に合ったデザインを一緒に考えていきます。'
              },
              {
                q: '公開後の更新も依頼できますか？',
                a: 'はい、保守・運用サポートプランをご用意しています。更新代行も承ります。'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-100 overflow-hidden reveal-hidden transition-all duration-500 hover:border-teal-200">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center">
                    <HelpCircle className="w-5 h-5 text-teal-600 mr-3 flex-shrink-0" />
                    <span className="font-bold text-gray-900">{item.q}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 pl-14">
                    <p className="text-gray-600 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-teal-50/30 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10 reveal-hidden">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            Webのこと、<br />
            まずは気軽に聞いてみませんか？
          </h2>
          <p className="text-gray-500 mb-12 max-w-xl mx-auto">
            ホームページの新規制作もリニューアルも。<br />
            まずは無料相談から始めましょう。
          </p>
          <a href="/contact" className="group inline-flex items-center px-10 py-5 bg-teal-600 text-white rounded-full font-bold text-lg hover:bg-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
            無料で相談する
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default WebMadoguchi;
