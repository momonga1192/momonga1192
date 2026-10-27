import React, { useEffect, useRef, useState } from 'react';
import { PageHeader, ContactCta } from '../next/parts';
import { illust } from '../next/theme';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, ShieldCheck, Lightbulb, Bot, GraduationCap, ChevronDown, MessageCircleQuestion, Lock, AlertTriangle, Brain, Sparkles, MessageSquare, Zap, FileCheck, Users, BookOpen, Target, Code, Database, Shield, Cpu } from 'lucide-react';

const HajimeteAI: React.FC = () => {
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
        {/* 広告用LP。同じ内容のサービスページと評価が割れないよう、検索には出さない */}
        <meta name="robots" content="noindex, follow" />
        <title>はじめてのAI導入 | ChatGPT導入・生成AI活用支援 - Arcle</title>
        <meta name="description" content="はじめてのAI導入はArcleが提供する生成AI活用支援サービス。ChatGPT Enterprise導入、AI利用ガイドライン策定、社内RAGチャットボット開発、プロンプト研修を月額5万円〜で提供。" />
        <link rel="canonical" href="https://www.arcle.net/lp/hajimete-ai" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://www.arcle.net/" },
            { "@type": "ListItem", "position": 2, "name": "はじめてのAI導入", "item": "https://www.arcle.net/lp/hajimete-ai" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "はじめてのAI導入",
          "provider": { "@id": "https://www.arcle.net/#organization" },
          "description": "ChatGPT等の生成AIを安全に・効果的に業務へ導入するための伴走型サービス。導入から定着、独自開発まで。",
          "areaServed": [{ "@type": "State", "name": "愛知県" }, { "@type": "State", "name": "岐阜県" }, { "@type": "State", "name": "三重県" }],
          "offers": [
            { "@type": "Offer", "name": "Starterプラン", "price": "50000", "priceCurrency": "JPY" },
            { "@type": "Offer", "name": "Standardプラン", "price": "200000", "priceCurrency": "JPY" },
            { "@type": "Offer", "name": "Developmentプラン", "price": "500000", "priceCurrency": "JPY" }
          ]
        })}</script>
      </Helmet>

      {/* Hero Section */}
      <PageHeader
        en="First Step to AI"
        title={<>
                <span>AI、何から始めれば？</span>
                <span>の答えがここに。</span>
              </>}
        lead={<><p>
                はじめてのAI導入は、ChatGPTなどの生成AIを<br className="hidden md:block" />
                安全に・効果的に業務へ組み込むための伴走型サービスです。<br className="hidden md:block" />
                導入から定着、独自開発まで。
              </p><a href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-sumi px-7 py-4 font-bold text-white hover:bg-svc-ai transition-colors">無料で相談する<ArrowRight className="w-4 h-4" /></a></>}
        crumbs={[{ label: 'はじめてのAI導入' }]}
        service="ai"
        image={illust('svc-ai')}
      />

      {/* Problems Section */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16 reveal-hidden">
            <span className="text-svc-ai font-en tracking-widest text-xs font-bold uppercase mb-3 block">Pain Points</span>
            <h2 className="font-head [word-break:auto-phrase] text-3xl md:text-4xl font-bold text-sumi mb-6 leading-tight">
              こんな<span className="text-svc-ai">お悩み</span>ありませんか？
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: MessageCircleQuestion,
                title: '何に使えるか分からない',
                desc: 'ChatGPTが話題だけど、何に使えるか分からない'
              },
              {
                icon: Lock,
                title: '情報漏洩が怖い',
                desc: '情報漏洩が怖くて、社内でAIを使わせられない'
              },
              {
                icon: AlertTriangle,
                title: '技術がない',
                desc: '自社専用のAIチャットボットを作りたいが技術がない'
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-8 rounded-[28px] bg-cream-dark border border-warm-line reveal-hidden">
                <div className="w-16 h-16 rounded-full bg-svc-ai/10 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-svc-ai" />
                </div>
                <h3 className="font-head [word-break:auto-phrase] text-lg font-bold text-sumi mb-3">{item.title}</h3>
                <p className="text-sm text-sumi-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 md:py-28 bg-cream-dark relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-svc-ai font-en tracking-widest text-xs font-bold uppercase mb-3 block">Solutions</span>
            <h2 className="font-head [word-break:auto-phrase] text-[26px] md:text-[38px] font-bold text-sumi mb-6">
              はじめてのAI導入が<br className="md:hidden" />解決します
            </h2>
            <p className="text-sumi-muted max-w-2xl mx-auto">
              導入設計から研修、独自開発まで。<br className="hidden md:block" />
              AIの「何から始めれば？」を一緒に解消します。
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-24">
            {[
              {
                title: 'Safe Setup',
                sub: '安全な導入設計',
                desc: 'セキュリティポリシー策定・利用ガイドラインで安心して使える環境を構築。情報漏洩リスクを最小限に抑え、組織的な利用を実現します。',
                icon: ShieldCheck,

                reverse: false,
                mainIcon: Shield,
                subIcons: [
                  { icon: FileCheck, position: '-top-4 -right-4', size: 'w-12 h-12', iconSize: 'w-6 h-6', rounded: 'rounded-[28px]', color: 'text-svc-ai' },
                  { icon: Lock, position: '-bottom-3 -left-5', size: 'w-11 h-11', iconSize: 'w-5 h-5', rounded: 'rounded-[28px]', color: 'text-svc-ai' },
                  { icon: Check, position: 'top-1 -left-8', size: 'w-9 h-9', iconSize: 'w-4 h-4', rounded: 'rounded-lg', color: 'text-svc-ai' }
                ],

                orbColors: ['bg-svc-ai/10', 'bg-svc-ai/10'],
                mainIconColor: 'text-svc-ai',
                borderColor: 'border-svc-ai/20',
                shadowColor: 'shadow-none'
              },
              {
                title: 'AI Proposal',
                sub: '業務別AI活用提案',
                desc: '「あなたの業務のここにAIが使えます」を具体的にご提案。現場の課題をヒアリングし、即効性のある活用シーンを可視化します。',
                icon: Lightbulb,

                reverse: true,
                mainIcon: Target,
                subIcons: [
                  { icon: Lightbulb, position: '-top-4 -right-3', size: 'w-12 h-12', iconSize: 'w-6 h-6', rounded: 'rounded-[28px]', color: 'text-svc-ai' },
                  { icon: Zap, position: '-bottom-3 -right-5', size: 'w-10 h-10', iconSize: 'w-5 h-5', rounded: 'rounded-[28px]', color: 'text-svc-ai' },
                  { icon: Sparkles, position: '-top-2 -left-6', size: 'w-9 h-9', iconSize: 'w-4 h-4', rounded: 'rounded-lg', color: 'text-svc-ai' }
                ],

                orbColors: ['bg-svc-ai/10', 'bg-svc-ai/10'],
                mainIconColor: 'text-svc-ai',
                borderColor: 'border-svc-ai/20',
                shadowColor: 'shadow-none'
              },
              {
                title: 'Custom Bot',
                sub: '社内AIボット開発',
                desc: '社内資料を学習したRAGチャットボット。自社専用のAIアシスタントが、ナレッジの検索性向上と業務効率化を強力にサポートします。',
                icon: Bot,

                reverse: false,
                mainIcon: Cpu,
                subIcons: [
                  { icon: Bot, position: '-top-4 -right-4', size: 'w-12 h-12', iconSize: 'w-6 h-6', rounded: 'rounded-[28px]', color: 'text-svc-ai' },
                  { icon: Database, position: '-bottom-3 -left-5', size: 'w-11 h-11', iconSize: 'w-5 h-5', rounded: 'rounded-[28px]', color: 'text-svc-ai' },
                  { icon: Code, position: 'top-0 -left-7', size: 'w-9 h-9', iconSize: 'w-4 h-4', rounded: 'rounded-lg', color: 'text-svc-ai' }
                ],

                orbColors: ['bg-svc-ai/10', 'bg-svc-ai/10'],
                mainIconColor: 'text-svc-ai',
                borderColor: 'border-svc-ai/20',
                shadowColor: 'shadow-none'
              },
              {
                title: 'Prompt Training',
                sub: 'プロンプト研修',
                desc: 'AIから望む回答を引き出すコツを、実践形式でレクチャー。社員一人ひとりのAI活用スキルを底上げし、定着化を支援します。',
                icon: GraduationCap,

                reverse: true,
                mainIcon: BookOpen,
                subIcons: [
                  { icon: GraduationCap, position: '-top-4 -right-3', size: 'w-12 h-12', iconSize: 'w-6 h-6', rounded: 'rounded-[28px]', color: 'text-svc-ai' },
                  { icon: Users, position: '-bottom-3 -left-5', size: 'w-11 h-11', iconSize: 'w-5 h-5', rounded: 'rounded-[28px]', color: 'text-svc-ai' },
                  { icon: MessageSquare, position: '-top-2 -left-7', size: 'w-9 h-9', iconSize: 'w-4 h-4', rounded: 'rounded-lg', color: 'text-svc-ai' }
                ],

                orbColors: ['bg-svc-ai/10', 'bg-svc-ai/10'],
                mainIconColor: 'text-svc-ai',
                borderColor: 'border-svc-ai/20',
                shadowColor: 'shadow-none'
              }
            ].map((item, index) => (
              <div key={index} className={`flex flex-col ${item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 reveal-hidden`}>
                <div className="lg:w-1/2">
                  <div className="relative group">
                    <div className={`absolute -inset-4 bg-svc-ai/10 rounded-[28px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className={`relative rounded-[28px] overflow-hidden shadow-[0_16px_40px_rgb(31_36_48/0.08)] border border-warm-line aspect-video bg-svc-ai/10`}>
                      {/* Decorative orbs */}
                      <div className={`absolute top-4 right-4 w-20 h-20 ${item.orbColors[0]} rounded-full blur-xl`} />
                      <div className={`absolute bottom-6 left-6 w-28 h-28 ${item.orbColors[1]} rounded-full blur-2xl`} />

                      {/* Subtle dot pattern */}
                      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #6b21a8 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                      {/* Icon composition */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative group-hover:scale-105 transition-transform duration-700">
                          {/* Decorative ring */}
                          <div className={`absolute -inset-8 border ${item.borderColor} rounded-full opacity-60`} />

                          {/* Main icon card */}
                          <div className={`w-20 h-20 bg-white rounded-[28px] shadow-[0_16px_40px_rgb(31_36_48/0.08)] ${item.shadowColor} flex items-center justify-center border ${item.borderColor}`}>
                            <item.mainIcon className={`w-10 h-10 ${item.mainIconColor}`} />
                          </div>

                          {/* Sub icons */}
                          {item.subIcons.map((sub, i) => (
                            <div key={i} className={`absolute ${sub.position} ${sub.size} bg-white ${sub.rounded} shadow-[0_16px_40px_rgb(31_36_48/0.08)] flex items-center justify-center border border-warm-line`}>
                              <sub.icon className={`${sub.iconSize} ${sub.color}`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-full bg-svc-ai/10 flex items-center justify-center`}>
                      <item.icon className={`w-6 h-6 text-svc-ai`} />
                    </div>
                    <span className="text-sm font-en font-bold text-sumi-muted">0{index + 1}</span>
                  </div>
                  <h3 className="font-head [word-break:auto-phrase] text-sm font-bold text-svc-ai mb-2">{item.sub}</h3>
                  <h4 className="font-head [word-break:auto-phrase] text-3xl font-en font-bold text-sumi mb-6">{item.title}</h4>
                  <p className="text-sumi-muted leading-relaxed text-lg mb-8">{item.desc}</p>
                  <ul className="space-y-4">
                    {['2週間のスピード導入', '伴走型の定着支援', '個別カスタマイズ対応'].map((feature, i) => (
                      <li key={i} className="flex items-center text-sumi">
                        <Check className="w-5 h-5 text-svc-ai mr-3" />
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
            <span className="text-svc-ai font-en tracking-widest text-xs font-bold uppercase mb-3 block">Pricing</span>
            <h2 className="font-head [word-break:auto-phrase] text-[26px] md:text-[38px] font-bold text-sumi mb-6">料金プラン</h2>
            <p className="text-sumi-muted max-w-2xl mx-auto">
              導入から定着、独自開発まで。<br className="hidden md:block" />
              貴社のフェーズに合わせた最適なプランをご用意しています。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {[
              {
                name: 'Starter',
                sub: 'スターター',
                price: '月額5万円〜',
                features: [
                  'AI導入支援',
                  'セキュリティポリシー策定',
                  '基礎研修',
                  'プロンプトテンプレート'
                ]
              },
              {
                name: 'Standard',
                sub: 'スタンダード',
                price: '月額20万円〜',
                features: [
                  'Starterの全内容',
                  '部門別コンサル',
                  '効果測定レポート',
                  '推進チーム育成'
                ],
                recommended: true
              },
              {
                name: 'Development',
                sub: '開発',
                price: '50万円〜',
                features: [
                  'Standardの全内容',
                  'RAGシステム開発',
                  '専用AIボット開発',
                  '運用保守'
                ]
              }
            ].map((plan, index) => (
              <div key={index} className={`relative p-8 rounded-[28px] reveal-hidden transition-all duration-500 flex flex-col ${plan.recommended ? 'bg-svc-ai text-white shadow-[0_16px_40px_rgb(31_36_48/0.08)] md:scale-105 z-10' : 'bg-white border border-warm-line text-sumi hover:border-warm-line'}`}>
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-svc-ai text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                    おすすめ
                  </div>
                )}
                <div className="mb-6 text-center">
                  <h3 className={`font-head [word-break:auto-phrase] text-3xl font-en font-bold mb-2 ${plan.recommended ? 'text-white' : 'text-sumi'}`}>{plan.name}</h3>
                  <p className={`text-sm font-bold ${plan.recommended ? 'text-white/80' : 'text-sumi-muted'}`}>{plan.sub}</p>
                  <p className={`text-3xl font-bold mt-4 ${plan.recommended ? 'text-white' : 'text-sumi'}`}>{plan.price}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${plan.recommended ? 'text-white' : 'text-svc-ai'}`} />
                      <span className={`text-xs font-medium leading-relaxed ${plan.recommended ? 'text-white/80' : 'text-sumi-muted'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center mt-auto">
                  <a href="/contact" className={`inline-block w-full py-4 rounded-full font-bold text-sm transition-all duration-300 ${plan.recommended ? 'bg-mustard text-sumi hover:bg-white' : 'bg-sumi text-white hover:bg-svc-ai'}`}>
                    お問い合わせ
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 reveal-hidden space-y-2">
            <p className="text-sumi-muted text-xs">※料金は税抜です。</p>
            <p className="text-sumi-muted text-xs">※Developmentプランは要件定義後に個別見積もり。</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-cream-dark">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16 reveal-hidden">
            <span className="text-svc-ai font-en tracking-widest text-xs font-bold uppercase mb-3 block">FAQ</span>
            <h2 className="font-head [word-break:auto-phrase] text-3xl md:text-4xl font-bold text-sumi mb-6">よくある質問</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 reveal-hidden">
            {[
              {
                q: 'ChatGPTを全く使ったことがなくても大丈夫ですか？',
                a: 'はい、ゼロからサポートします。基礎研修込みなので、初めての方でも安心です。'
              },
              {
                q: '社内の機密情報が漏洩するリスクはありませんか？',
                a: 'セキュリティポリシーの策定と、Enterprise版などの安全な環境構築を最初に行います。'
              },
              {
                q: 'どれくらいで効果が出ますか？',
                a: '導入後1〜2ヶ月で日常業務での活用が定着し、3ヶ月目以降で効率化の効果を実感される企業様が多いです。'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-[28px] border border-warm-line overflow-hidden transition-all duration-300 hover:border-warm-line">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base font-bold text-sumi pr-4">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-sumi-muted flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 pb-6' : 'max-h-0'}`}>
                  <p className="px-6 text-sm text-sumi-muted leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ContactCta title={<>
            AIの第一歩、<br />
            一緒に踏み出しましょう。
          </>} body={"\"何から始めればいいか分からない\"でOK。その段階からサポートします。"} />
    </div>
  );
};

export default HajimeteAI;
