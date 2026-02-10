import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, ArrowRight, Bot, MessageSquare, Zap, Lock, Code, Cpu } from 'lucide-react';

const GenAI: React.FC = () => {
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
        <title>生成AI活用支援 | Arcle</title>
        <meta name="description" content="AIと共に、創造の先へ。ArcleのChatGPT導入支援、社内独自ボット開発、プロンプト研修、業務自動化で、生成AIをビジネスの力に変えます。" />
        <link rel="canonical" href="https://arcle.net/gen-ai" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-50/50 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-pink-50/80 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="reveal-hidden transition-all duration-1000 ease-out">
              <span className="inline-block py-1 px-3 rounded-full bg-purple-50 text-purple-600 text-xs font-en font-semibold tracking-widest uppercase mb-6 border border-purple-100">
                Generative AI
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
                  AIと共に、
                </span>
                <span className="block mt-2">
                  創造の先へ。
                </span>
              </h1>
              <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-2xl font-light">
                生成AIは、単なるツールではありません。<br />
                ビジネスの常識を覆し、圧倒的な生産性を生み出す「パートナー」です。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/contact" className="group inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/30">
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
                AIの波に、<br />
                <span className="text-purple-600">乗り遅れて</span>いませんか？
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                ChatGPTをはじめとする生成AIの進化は止まりません。
                導入への不安やリスクを解消し、安全かつ効果的にAIを業務に組み込みます。
              </p>
              <div className="space-y-6">
                {[
                  { title: "セキュリティリスク", desc: "情報漏洩が怖くて社内導入が進まない", icon: Lock },
                  { title: "活用イメージの欠如", desc: "具体的にどの業務に使えるか分からない", icon: Zap },
                  { title: "開発リソース不足", desc: "自社専用のAIボットを作りたいが技術がない", icon: Code }
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 group">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mr-4 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors duration-300">
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
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-50 to-white relative overflow-hidden flex items-center justify-center p-8">
                <img
                  src="/images/gen_ai.png"
                  alt="生成AI活用支援のイラスト：ChatGPT導入・AIボット開発・業務自動化"
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
            <span className="text-purple-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Our Services</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">AI Integration</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">導入支援から独自開発まで。貴社のAIトランスフォーメーションを加速させます。</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[
              { title: "ChatGPT Intro", sub: "ChatGPT導入支援", desc: "Enterprise版やTeam版の導入、ガイドライン策定をサポート。", icon: MessageSquare, color: "purple" },
              { title: "Custom Bot Dev", sub: "社内独自ボット開発", desc: "社内データを学習させたRAG（検索拡張生成）ボットを構築。", icon: Bot, color: "indigo" },
              { title: "Prompt Eng.", sub: "プロンプト研修", desc: "AIから望む回答を引き出すための技術を、実践形式でレクチャー。", icon: Zap, color: "pink" },
              { title: "AI Automation", sub: "業務自動化", desc: "APIを活用し、既存の業務フローにAIを組み込んで自動化を実現。", icon: Cpu, color: "blue" }
            ].map((item, index) => (
              <div key={index} className="group bg-white p-10 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-500 reveal-hidden">
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-${item.color}-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon className={`w-7 h-7 text-${item.color}-600`} />
                  </div>
                  <span className="text-xs font-en font-bold text-gray-300 group-hover:text-purple-600 transition-colors duration-300">0{index + 1}</span>
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
            <span className="text-purple-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">プラン一覧</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              導入から定着、独自開発まで。貴社の成長段階に合わせて<br className="hidden md:block" />
              最適なAI活用支援プランをご提供します
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {[
              { 
                name: "Starter", 
                sub: "導入支援プラン", 
                desc: "生成AIの安全な第一歩", 
                price: "5万円~", 
                features: [
                  "ビジネス向け生成AIツール導入支援",
                  "セキュリティポリシー策定",
                  "利用ガイドライン作成",
                  "AI基礎研修",
                  "業務別プロンプトテンプレート提供",
                  "導入後1ヶ月間の質問対応"
                ] 
              },
              { 
                name: "Standard", 
                sub: "活用定着プラン", 
                desc: "組織全体でのAI活用推進", 
                price: "20万円~", 
                features: [
                  "Starterプランの全内容",
                  "部門別AI活用コンサルティング",
                  "カスタムプロンプト作成支援",
                  "月次効果測定レポート＆改善提案",
                  "社内AI推進チーム育成支援",
                  "定例ミーティング",
                  "チャット・メールサポート（無制限）",
                  "ビジネス向けAI活用研修(応用)"
                ], 
                recommended: true 
              },
              { 
                name: "Development", 
                sub: "独自開発プラン", 
                desc: "専用AIシステムの構築", 
                price: "50万円~", 
                features: [
                  "Standardプランの全内容",
                  "社内データ学習RAGシステム開発",
                  "既存システムとのデータ連携",
                  "セキュアなプライベート環境構築",
                  "専用AIチャットボット開発",
                  "運用保守・継続的精度改善",
                  "技術ドキュメント作成",
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
                  <p className={`text-xs mt-2 ${plan.recommended ? 'text-gray-500' : 'text-gray-400'}`}>{plan.desc}</p>
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
            <p className="text-gray-400 text-xs">※料金は税抜です。お客様の状況やご要望に応じてカスタマイズ可能です。</p>
            <p className="text-gray-400 text-xs">※Developmentプランは要件定義後に個別見積もりとなります。まずはお気軽にご相談ください。</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 text-center relative z-10 reveal-hidden">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            AIの可能性を、<br />
            あなたのビジネスに。
          </h2>
          <p className="text-gray-500 mb-12 max-w-xl mx-auto">
            「何から始めればいいか分からない」という段階でも大丈夫です。<br />
            AI活用の第一歩を、私たちがサポートします。
          </p>
          <a href="/contact" className="group inline-flex items-center px-10 py-5 bg-purple-600 text-white rounded-full font-bold text-lg hover:bg-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
            無料で相談してみる
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default GenAI;
