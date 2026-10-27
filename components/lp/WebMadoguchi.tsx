import React, { useEffect, useRef, useState } from 'react';
import { PageHeader, ContactCta } from '../next/parts';
import { illust } from '../next/theme';
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
    <div className="bg-cream text-sumi">
      <Helmet>
        <title>ウェブの窓口 | ホームページ制作・リニューアル - Arcle</title>
        <meta name="description" content="ウェブの窓口は愛知県一宮市のArcleが提供するWeb制作サービス。コーポレートサイト・LP制作、WordPress導入、SEO内部対策、保守運用を初期費用0円・月額4,800円〜（税抜）で提供。スマホ対応・デザインリニューアルもお任せ。" />
        <link rel="canonical" href="https://www.arcle.net/lp/web-madoguchi" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://www.arcle.net/" },
            { "@type": "ListItem", "position": 2, "name": "ウェブの窓口", "item": "https://www.arcle.net/lp/web-madoguchi" }
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
  {
    "@type": "Offer",
    "name": "ライト",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": 4800,
      "priceCurrency": "JPY",
      "unitCode": "MON",
      "valueAddedTaxIncluded": false
    }
  },
  {
    "@type": "Offer",
    "name": "スタンダード",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": 7500,
      "priceCurrency": "JPY",
      "unitCode": "MON",
      "valueAddedTaxIncluded": false
    }
  },
  {
    "@type": "Offer",
    "name": "オーダーメイド",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": 9800,
      "priceCurrency": "JPY",
      "unitCode": "MON",
      "valueAddedTaxIncluded": false
    }
  }
]
        })}</script>
      </Helmet>

      {/* Hero Section */}
      <PageHeader
        en="Web Madoguchi"
        title={<>
                <span>
                  ホームページのこと、
                </span>
                <span>
                  全部相談できる場所。
                </span>
              </>}
        lead={<><p>
                ウェブの窓口は、企業のWeb制作・リニューアルをワンストップでサポートするサービスです。<br />
                デザインから集客まで、まるっとお任せください。
              </p><a href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-sumi px-7 py-4 font-bold text-white hover:bg-svc-web transition-colors">無料で相談する<ArrowRight className="w-4 h-4" /></a></>}
        crumbs={[{ label: 'ウェブの窓口' }]}
        service="web"
        image={illust('svc-web')}
      />

      {/* Problems Section */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16 reveal-hidden">
            <span className="text-svc-web font-en tracking-widest text-xs font-bold uppercase mb-3 block">Problems</span>
            <h2 className="font-head [word-break:auto-phrase] text-[26px] md:text-[38px] font-bold text-sumi mb-6">
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
              <div key={index} className="bg-cream-dark p-8 rounded-[28px] text-center reveal-hidden shadow-[0_16px_40px_rgb(31_36_48/0.08)] transition-all duration-500">
                <div className="w-16 h-16 rounded-full bg-svc-web/10 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-svc-web" />
                </div>
                <p className="text-sumi font-medium leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 md:py-28 bg-cream-dark relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-svc-web font-en tracking-widest text-xs font-bold uppercase mb-3 block">Solutions</span>
            <h2 className="font-head [word-break:auto-phrase] text-[26px] md:text-[38px] font-bold text-sumi mb-6">ウェブの窓口が解決します</h2>
            <p className="text-sumi-muted max-w-2xl mx-auto">デザインから運用まで。ワンストップでWebの課題を解決します。</p>
          </div>

          <div className="max-w-6xl mx-auto space-y-24">
            {[
              {
                title: 'Modern Design',
                sub: 'モダンデザイン',
                desc: 'スマホ対応は当たり前。ブランドイメージを高める洗練されたデザインをご提供します。ユーザーが迷わない、使いやすさを追求したUI/UXをご提案します。',
                icon: Palette,



                orbColor1: 'bg-svc-web/10',
                orbColor2: 'bg-svc-web/10',
                mainIconColor: 'text-svc-web',
                mainBg: 'shadow-none border-svc-web/20',
                subIcons: [
                  { icon: Layout, color: 'text-svc-web', pos: '-top-4 -right-4', size: 'w-12 h-12', rounded: 'rounded-[28px]', iconSize: 'w-6 h-6' },
                  { icon: Smartphone, color: 'text-svc-web', pos: '-bottom-3 -left-5', size: 'w-11 h-11', rounded: 'rounded-[28px]', iconSize: 'w-5 h-5' },
                  { icon: MousePointerClick, color: 'text-svc-web', pos: 'top-1/2 -translate-y-1/2 -right-14', size: 'w-9 h-9', rounded: 'rounded-lg', iconSize: 'w-4 h-4' },
                ],
                reverse: false
              },
              {
                title: 'CMS Setup',
                sub: 'CMS導入',
                desc: 'WordPress等を導入し、お客様自身で簡単に更新・管理できる環境を整備します。専門知識がなくても、ブログ感覚でサイトを成長させることが可能です。',
                icon: Settings,



                orbColor1: 'bg-svc-web/10',
                orbColor2: 'bg-svc-web/10',
                mainIconColor: 'text-svc-web',
                mainBg: 'shadow-none border-svc-web/20',
                subIcons: [
                  { icon: Database, color: 'text-svc-web', pos: '-top-4 -right-4', size: 'w-12 h-12', rounded: 'rounded-[28px]', iconSize: 'w-6 h-6' },
                  { icon: FileText, color: 'text-svc-web', pos: '-bottom-3 -left-5', size: 'w-11 h-11', rounded: 'rounded-[28px]', iconSize: 'w-5 h-5' },
                  { icon: Code, color: 'text-svc-web', pos: 'top-1/2 -translate-y-1/2 -right-14', size: 'w-9 h-9', rounded: 'rounded-lg', iconSize: 'w-4 h-4' },
                ],
                reverse: true
              },
              {
                title: 'SEO Strategy',
                sub: 'SEO内部対策',
                desc: '検索エンジンに評価される構造・コンテンツ設計で集客力をUPさせます。Googleのガイドラインに準拠した、持続的な価値を生むサイト構築を行います。',
                icon: Search,



                orbColor1: 'bg-svc-web/10',
                orbColor2: 'bg-svc-web/10',
                mainIconColor: 'text-svc-web',
                mainBg: 'shadow-none border-svc-web/20',
                subIcons: [
                  { icon: BarChart3, color: 'text-svc-web', pos: '-top-4 -right-4', size: 'w-12 h-12', rounded: 'rounded-[28px]', iconSize: 'w-6 h-6' },
                  { icon: TrendingUp, color: 'text-svc-web', pos: '-bottom-3 -left-5', size: 'w-11 h-11', rounded: 'rounded-[28px]', iconSize: 'w-5 h-5' },
                  { icon: Globe, color: 'text-svc-web', pos: 'top-1/2 -translate-y-1/2 -right-14', size: 'w-9 h-9', rounded: 'rounded-lg', iconSize: 'w-4 h-4' },
                ],
                reverse: false
              },
              {
                title: 'Maintenance',
                sub: '保守・運用サポート',
                desc: '公開後も安心。サーバー管理、セキュリティ対策、定期的なバックアップなど、Webサイトの安定稼働をバックアップします。',
                icon: Shield,



                orbColor1: 'bg-svc-web/10',
                orbColor2: 'bg-svc-web/10',
                mainIconColor: 'text-svc-web',
                mainBg: 'shadow-none border-svc-web/20',
                subIcons: [
                  { icon: Server, color: 'text-svc-web', pos: '-top-4 -right-4', size: 'w-12 h-12', rounded: 'rounded-[28px]', iconSize: 'w-6 h-6' },
                  { icon: Wrench, color: 'text-svc-web', pos: '-bottom-3 -left-5', size: 'w-11 h-11', rounded: 'rounded-[28px]', iconSize: 'w-5 h-5' },
                  { icon: Lock, color: 'text-svc-web', pos: 'top-1/2 -translate-y-1/2 -right-14', size: 'w-9 h-9', rounded: 'rounded-lg', iconSize: 'w-4 h-4' },
                ],
                reverse: true
              }
            ].map((item, index) => (
              <div key={index} className={`flex flex-col ${item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 reveal-hidden`}>
                <div className="lg:w-1/2">
                  <div className="relative group">
                    <div className={`absolute -inset-4 bg-svc-web/10 rounded-[28px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className={`relative rounded-[28px] overflow-hidden shadow-[0_16px_40px_rgb(31_36_48/0.08)] border border-warm-line aspect-video bg-svc-web/10`}>
                      {/* Decorative background orbs */}
                      <div className={`absolute top-6 right-6 w-20 h-20 ${item.orbColor1} rounded-full blur-xl`} />
                      <div className={`absolute bottom-8 left-6 w-24 h-24 ${item.orbColor2} rounded-full blur-2xl`} />

                      {/* Subtle dot pattern */}
                      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                      {/* Icon composition */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          {/* Main icon */}
                          <div className={`w-20 h-20 bg-white/90 backdrop-blur-sm rounded-[28px] shadow-[0_16px_40px_rgb(31_36_48/0.08)] ${item.mainBg} flex items-center justify-center ring-1 ring-white/60`}>
                            <item.icon className={`w-10 h-10 ${item.mainIconColor}`} />
                          </div>

                          {/* Sub icons */}
                          {item.subIcons.map((sub, i) => (
                            <div key={i} className={`absolute ${sub.pos} ${sub.size} bg-white/95 backdrop-blur-sm ${sub.rounded} shadow-[0_16px_40px_rgb(31_36_48/0.08)] flex items-center justify-center border border-warm-line ring-1 ring-white`}>
                              <sub.icon className={`${sub.iconSize} ${sub.color}`} />
                            </div>
                          ))}

                          {/* Decorative dots */}
                          <div className={`absolute -bottom-7 right-2 w-2.5 h-2.5 bg-svc-web/10 rounded-full`} />
                          <div className={`absolute -top-6 left-4 w-2 h-2 bg-svc-web/10 rounded-full`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-full bg-svc-web/10 flex items-center justify-center`}>
                      <item.icon className={`w-6 h-6 text-svc-web`} />
                    </div>
                    <span className="text-sm font-en font-bold text-sumi-muted">0{index + 1}</span>
                  </div>
                  <h3 className="font-head [word-break:auto-phrase] text-sm font-bold text-svc-web mb-2">{item.sub}</h3>
                  <h4 className="font-head [word-break:auto-phrase] text-3xl font-en font-bold text-sumi mb-6">{item.title}</h4>
                  <p className="text-sumi-muted leading-relaxed text-lg mb-8">{item.desc}</p>
                  <ul className="space-y-4">
                    {['ヒアリング重視の提案', 'スピード感のある制作', '公開後の手厚いサポート'].map((feature, i) => (
                      <li key={i} className="flex items-center text-sumi">
                        <Check className="w-5 h-5 text-svc-web mr-3" />
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
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-svc-web font-en tracking-widest text-xs font-bold uppercase mb-3 block">Pricing</span>
            <h2 className="font-head [word-break:auto-phrase] text-[26px] md:text-[38px] font-bold text-sumi mb-6">料金プラン</h2>
            <p className="text-sumi-muted">初期費用0円。目的と予算に合わせた月額制の制作プラン</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {[
              {
                name: 'Light',
                sub: 'ライト',
                price: '月額4,800円',
                features: ['TOP＋4ページ', 'テンプレートデザイン', 'お知らせ更新機能', 'お問い合わせフォーム']
              },
              {
                name: 'Standard',
                sub: 'スタンダード',
                price: '月額7,500円',
                features: ['TOP＋6ページ（追加可）', 'テンプレートを御社向けにカスタマイズ', 'お知らせ更新機能', 'お問い合わせフォーム', '5年経過後は月額4,800円'],
                recommended: true
              },
              {
                name: 'Order Made',
                sub: 'オーダーメイド',
                price: '月額9,800円',
                features: ['TOP＋6ページ（追加可）', '完全オリジナルデザイン', 'お知らせ更新機能', 'お問い合わせフォーム', '5年経過後は月額4,800円']
              }
            ].map((plan, index) => (
              <div key={index} className={`relative p-8 rounded-[28px] reveal-hidden transition-all duration-500 flex flex-col ${plan.recommended ? 'bg-svc-web text-white shadow-[0_16px_40px_rgb(31_36_48/0.08)] md:scale-105 z-10' : 'bg-white border border-warm-line text-sumi hover:border-warm-line'}`}>
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-svc-web text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                    おすすめ
                  </div>
                )}
                <div className="mb-8 text-center">
                  <h3 className={`font-head [word-break:auto-phrase] text-3xl font-en font-bold mb-2 ${plan.recommended ? 'text-white' : 'text-sumi'}`}>{plan.name}</h3>
                  <p className={`text-sm font-bold ${plan.recommended ? 'text-white/80' : 'text-sumi-muted'}`}>{plan.sub}</p>
                  <p className={`text-2xl font-bold mt-4 ${plan.recommended ? 'text-white' : 'text-sumi'}`}>{plan.price}</p>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center justify-center">
                      <Check className={`w-4 h-4 mr-2 ${plan.recommended ? 'text-white' : 'text-svc-web'}`} />
                      <span className={`text-sm font-medium ${plan.recommended ? 'text-white/80' : 'text-sumi-muted'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center mt-auto">
                  <a href="/contact" className={`inline-block w-full py-4 rounded-full font-bold text-sm transition-all duration-300 ${plan.recommended ? 'bg-mustard text-sumi hover:bg-white' : 'bg-sumi text-white hover:bg-svc-web'}`}>
                    お問い合わせ
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 reveal-hidden space-y-2">
            <p className="text-sumi-muted text-xs">※料金は税抜です。</p>
            <p className="text-sumi-muted text-xs">※最低契約期間は1年です。契約期間は1〜5年からお選びいただけます。</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-cream-dark relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-svc-web font-en tracking-widest text-xs font-bold uppercase mb-3 block">FAQ</span>
            <h2 className="font-head [word-break:auto-phrase] text-[26px] md:text-[38px] font-bold text-sumi mb-6">よくある質問</h2>
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
              <div key={index} className="bg-white rounded-[28px] border border-warm-line overflow-hidden reveal-hidden transition-all duration-500 hover:border-svc-web/20">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center">
                    <HelpCircle className="w-5 h-5 text-svc-web mr-3 flex-shrink-0" />
                    <span className="font-bold text-sumi">{item.q}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-sumi-muted transition-transform duration-300 flex-shrink-0 ml-4 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 pl-14">
                    <p className="text-sumi-muted leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ContactCta title={<>
            Webのこと、<br />
            まずは気軽に聞いてみませんか？
          </>} body={"ホームページの新規制作もリニューアルも。まずは無料相談から始めましょう。"} />
    </div>
  );
};

export default WebMadoguchi;
