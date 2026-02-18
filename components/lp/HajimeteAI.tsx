import React, { useEffect, useRef, useState } from 'react';
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
    <div className="pt-24 pb-20 bg-white">
      <Helmet>
        <title>はじめてのAI導入 | ChatGPT導入・生成AI活用支援 - Arcle</title>
        <meta name="description" content="はじめてのAI導入は愛知県一宮市のArcleが提供する生成AI活用支援サービス。ChatGPT Enterprise導入、AI利用ガイドライン策定、社内RAGチャットボット開発、プロンプト研修を月額5万円〜で提供。" />
        <link rel="canonical" href="https://arcle.net/lp/hajimete-ai" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://arcle.net/" },
            { "@type": "ListItem", "position": 2, "name": "はじめてのAI導入", "item": "https://arcle.net/lp/hajimete-ai" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "はじめてのAI導入",
          "provider": { "@type": "Organization", "name": "Arcle" },
          "description": "ChatGPT等の生成AIを安全に・効果的に業務へ導入するための伴走型サービス。導入から定着、独自開発まで。",
          "areaServed": { "@type": "City", "name": "一宮市" },
          "offers": [
            { "@type": "Offer", "name": "Starterプラン", "price": "50000", "priceCurrency": "JPY" },
            { "@type": "Offer", "name": "Standardプラン", "price": "200000", "priceCurrency": "JPY" },
            { "@type": "Offer", "name": "Developmentプラン", "price": "500000", "priceCurrency": "JPY" }
          ]
        })}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="lg:w-1/2 text-left reveal-hidden transition-all duration-1000 ease-out">
              <span className="inline-block py-1 px-4 rounded-full bg-white/10 text-white/90 text-xs font-en font-semibold tracking-widest uppercase mb-8 border border-white/20 backdrop-blur-sm">
                First Step to AI
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.15] tracking-tight">
                <span className="block">AI、何から始めれば？</span>
                <span className="block mt-2 text-purple-200">の答えがここに。</span>
              </h1>
              <p className="text-lg md:text-xl text-purple-100 mb-12 leading-relaxed font-light">
                はじめてのAI導入は、ChatGPTなどの生成AIを<br className="hidden md:block" />
                安全に・効果的に業務へ組み込むための伴走型サービスです。<br className="hidden md:block" />
                導入から定着、独自開発まで。
              </p>
              <a href="/contact" className="group inline-flex items-center justify-center px-8 py-4 bg-white text-purple-700 rounded-full font-bold hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1">
                <span className="mr-2">無料で相談する</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="lg:w-1/2 reveal-hidden transition-all duration-1000 delay-300 ease-out">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-400 rounded-3xl blur-2xl opacity-20 animate-pulse" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3] bg-gradient-to-br from-white/10 via-purple-500/10 to-indigo-500/10 backdrop-blur-sm">
                  {/* Decorative blurred orbs */}
                  <div className="absolute top-8 right-8 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl" />
                  <div className="absolute bottom-12 left-8 w-40 h-40 bg-indigo-300/15 rounded-full blur-3xl" />
                  <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-violet-400/10 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2" />

                  {/* Subtle grid pattern */}
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                  {/* Main icon composition */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Central brain icon with glass card */}
                      <div className="w-32 h-32 bg-white/15 backdrop-blur-md rounded-3xl shadow-2xl shadow-purple-900/20 flex items-center justify-center border border-white/20 ring-1 ring-white/10 ring-offset-2 ring-offset-transparent">
                        <Brain className="w-16 h-16 text-white drop-shadow-lg" />
                      </div>

                      {/* Sparkles - top right */}
                      <div className="absolute -top-5 -right-5 w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg shadow-purple-900/10 flex items-center justify-center border border-white/25 animate-bounce" style={{ animationDuration: '3s' }}>
                        <Sparkles className="w-7 h-7 text-yellow-200 drop-shadow" />
                      </div>

                      {/* Bot - bottom left */}
                      <div className="absolute -bottom-4 -left-8 w-13 h-13 bg-white/15 backdrop-blur-md rounded-xl shadow-lg shadow-purple-900/10 flex items-center justify-center border border-white/20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
                        <Bot className="w-6 h-6 text-purple-200 drop-shadow" />
                      </div>

                      {/* MessageSquare - top left */}
                      <div className="absolute -top-8 -left-6 w-11 h-11 bg-white/15 backdrop-blur-md rounded-xl shadow-md flex items-center justify-center border border-white/20 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
                        <MessageSquare className="w-5 h-5 text-indigo-200 drop-shadow" />
                      </div>

                      {/* Zap - bottom right */}
                      <div className="absolute -bottom-6 -right-3 w-10 h-10 bg-white/15 backdrop-blur-md rounded-lg shadow-md flex items-center justify-center border border-white/20 animate-bounce" style={{ animationDuration: '3.8s', animationDelay: '1.5s' }}>
                        <Zap className="w-5 h-5 text-amber-200 drop-shadow" />
                      </div>

                      {/* Decorative ring */}
                      <div className="absolute -inset-10 border border-white/[0.08] rounded-full" />
                      <div className="absolute -inset-20 border border-white/[0.04] rounded-full" />
                    </div>
                  </div>

                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
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
            <span className="text-purple-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Pain Points</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              こんな<span className="text-purple-600">お悩み</span>ありませんか？
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
              <div key={index} className="text-center p-8 rounded-2xl bg-gray-50 border border-gray-100 reveal-hidden">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-purple-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Solutions</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              はじめてのAI導入が<br className="md:hidden" />解決します
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
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
                color: 'purple',
                reverse: false,
                mainIcon: Shield,
                subIcons: [
                  { icon: FileCheck, position: '-top-4 -right-4', size: 'w-12 h-12', iconSize: 'w-6 h-6', rounded: 'rounded-2xl', color: 'text-emerald-500' },
                  { icon: Lock, position: '-bottom-3 -left-5', size: 'w-11 h-11', iconSize: 'w-5 h-5', rounded: 'rounded-xl', color: 'text-purple-500' },
                  { icon: Check, position: 'top-1 -left-8', size: 'w-9 h-9', iconSize: 'w-4 h-4', rounded: 'rounded-lg', color: 'text-green-500' }
                ],
                gradient: 'from-purple-50 via-white to-emerald-50/40',
                orbColors: ['bg-purple-100/40', 'bg-emerald-100/30'],
                mainIconColor: 'text-purple-600',
                borderColor: 'border-purple-100/50',
                shadowColor: 'shadow-purple-100/50'
              },
              {
                title: 'AI Proposal',
                sub: '業務別AI活用提案',
                desc: '「あなたの業務のここにAIが使えます」を具体的にご提案。現場の課題をヒアリングし、即効性のある活用シーンを可視化します。',
                icon: Lightbulb,
                color: 'indigo',
                reverse: true,
                mainIcon: Target,
                subIcons: [
                  { icon: Lightbulb, position: '-top-4 -right-3', size: 'w-12 h-12', iconSize: 'w-6 h-6', rounded: 'rounded-2xl', color: 'text-amber-500' },
                  { icon: Zap, position: '-bottom-3 -right-5', size: 'w-10 h-10', iconSize: 'w-5 h-5', rounded: 'rounded-xl', color: 'text-indigo-500' },
                  { icon: Sparkles, position: '-top-2 -left-6', size: 'w-9 h-9', iconSize: 'w-4 h-4', rounded: 'rounded-lg', color: 'text-violet-400' }
                ],
                gradient: 'from-indigo-50 via-white to-amber-50/30',
                orbColors: ['bg-indigo-100/40', 'bg-amber-100/30'],
                mainIconColor: 'text-indigo-600',
                borderColor: 'border-indigo-100/50',
                shadowColor: 'shadow-indigo-100/50'
              },
              {
                title: 'Custom Bot',
                sub: '社内AIボット開発',
                desc: '社内資料を学習したRAGチャットボット。自社専用のAIアシスタントが、ナレッジの検索性向上と業務効率化を強力にサポートします。',
                icon: Bot,
                color: 'pink',
                reverse: false,
                mainIcon: Cpu,
                subIcons: [
                  { icon: Bot, position: '-top-4 -right-4', size: 'w-12 h-12', iconSize: 'w-6 h-6', rounded: 'rounded-2xl', color: 'text-pink-500' },
                  { icon: Database, position: '-bottom-3 -left-5', size: 'w-11 h-11', iconSize: 'w-5 h-5', rounded: 'rounded-xl', color: 'text-rose-500' },
                  { icon: Code, position: 'top-0 -left-7', size: 'w-9 h-9', iconSize: 'w-4 h-4', rounded: 'rounded-lg', color: 'text-fuchsia-400' }
                ],
                gradient: 'from-pink-50 via-white to-rose-50/40',
                orbColors: ['bg-pink-100/40', 'bg-rose-100/30'],
                mainIconColor: 'text-pink-600',
                borderColor: 'border-pink-100/50',
                shadowColor: 'shadow-pink-100/50'
              },
              {
                title: 'Prompt Training',
                sub: 'プロンプト研修',
                desc: 'AIから望む回答を引き出すコツを、実践形式でレクチャー。社員一人ひとりのAI活用スキルを底上げし、定着化を支援します。',
                icon: GraduationCap,
                color: 'blue',
                reverse: true,
                mainIcon: BookOpen,
                subIcons: [
                  { icon: GraduationCap, position: '-top-4 -right-3', size: 'w-12 h-12', iconSize: 'w-6 h-6', rounded: 'rounded-2xl', color: 'text-blue-500' },
                  { icon: Users, position: '-bottom-3 -left-5', size: 'w-11 h-11', iconSize: 'w-5 h-5', rounded: 'rounded-xl', color: 'text-sky-500' },
                  { icon: MessageSquare, position: '-top-2 -left-7', size: 'w-9 h-9', iconSize: 'w-4 h-4', rounded: 'rounded-lg', color: 'text-cyan-400' }
                ],
                gradient: 'from-blue-50 via-white to-sky-50/40',
                orbColors: ['bg-blue-100/40', 'bg-sky-100/30'],
                mainIconColor: 'text-blue-600',
                borderColor: 'border-blue-100/50',
                shadowColor: 'shadow-blue-100/50'
              }
            ].map((item, index) => (
              <div key={index} className={`flex flex-col ${item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 reveal-hidden`}>
                <div className="lg:w-1/2">
                  <div className="relative group">
                    <div className={`absolute -inset-4 bg-${item.color}-500/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className={`relative rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 aspect-video bg-gradient-to-br ${item.gradient}`}>
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
                          <div className={`w-20 h-20 bg-white rounded-2xl shadow-lg ${item.shadowColor} flex items-center justify-center border ${item.borderColor}`}>
                            <item.mainIcon className={`w-10 h-10 ${item.mainIconColor}`} />
                          </div>

                          {/* Sub icons */}
                          {item.subIcons.map((sub, i) => (
                            <div key={i} className={`absolute ${sub.position} ${sub.size} bg-white ${sub.rounded} shadow-md flex items-center justify-center border border-gray-50`}>
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
                    <div className={`w-12 h-12 rounded-xl bg-${item.color}-50 flex items-center justify-center`}>
                      <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                    </div>
                    <span className="text-sm font-en font-bold text-gray-300">0{index + 1}</span>
                  </div>
                  <h3 className="text-sm font-bold text-purple-600 mb-2">{item.sub}</h3>
                  <h4 className="text-3xl font-en font-bold text-gray-900 mb-6">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed text-lg mb-8">{item.desc}</p>
                  <ul className="space-y-4">
                    {['2週間のスピード導入', '伴走型の定着支援', '個別カスタマイズ対応'].map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <Check className="w-5 h-5 text-purple-500 mr-3" />
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
            <span className="text-purple-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">料金プラン</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
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
              <div key={index} className={`relative p-8 rounded-3xl reveal-hidden transition-all duration-500 flex flex-col ${plan.recommended ? 'bg-gray-900 text-white shadow-2xl md:scale-105 z-10' : 'bg-white border border-gray-100 text-gray-900 hover:border-gray-300'}`}>
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                    おすすめ
                  </div>
                )}
                <div className="mb-6 text-center">
                  <h3 className={`text-3xl font-en font-bold mb-2 ${plan.recommended ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                  <p className={`text-sm font-bold ${plan.recommended ? 'text-gray-400' : 'text-gray-500'}`}>{plan.sub}</p>
                  <p className={`text-3xl font-bold mt-4 ${plan.recommended ? 'text-white' : 'text-gray-900'}`}>{plan.price}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${plan.recommended ? 'text-purple-400' : 'text-purple-600'}`} />
                      <span className={`text-xs font-medium leading-relaxed ${plan.recommended ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center mt-auto">
                  <a href="/contact" className={`inline-block w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 ${plan.recommended ? 'bg-purple-600 text-white hover:bg-purple-500' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}>
                    お問い合わせ
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 reveal-hidden space-y-2">
            <p className="text-gray-400 text-xs">※料金は税抜です。</p>
            <p className="text-gray-400 text-xs">※Developmentプランは要件定義後に個別見積もり。</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal-hidden">
            <span className="text-purple-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">よくある質問</h2>
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
              <div key={index} className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:border-gray-200">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base font-bold text-gray-900 pr-4">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 pb-6' : 'max-h-0'}`}>
                  <p className="px-6 text-sm text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-purple-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto px-6 text-center relative z-10 reveal-hidden">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            AIの第一歩、<br />
            一緒に踏み出しましょう。
          </h2>
          <p className="text-purple-100 mb-12 max-w-xl mx-auto leading-relaxed">
            "何から始めればいいか分からない"でOK。<br />
            その段階からサポートします。
          </p>
          <a href="/contact" className="group inline-flex items-center px-10 py-5 bg-white text-purple-700 rounded-full font-bold text-lg hover:bg-purple-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
            無料で相談する
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default HajimeteAI;
