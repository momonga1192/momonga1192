import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Headphones, ShieldCheck, Settings, Wifi, AlertTriangle, HelpCircle, ChevronDown, Shield, Server, Monitor, Cloud, Lock, Database, Globe, Cpu, Key, BarChart3, MessageCircle, LifeBuoy } from 'lucide-react';

const JosysRescue: React.FC = () => {
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
    <div className="bg-white">
      <Helmet>
        <title>情シスレスキュー | IT専任者がいない企業のためのIT代行サービス - Arcle</title>
        <meta name="description" content="情シスレスキューは愛知県一宮市のArcleが提供するIT代行サービス。PCトラブル対応・セキュリティ対策・SaaS管理・ネットワーク構築を月額5万円〜で包括サポート。IT専任者がいない中小企業の味方です。" />
        <link rel="canonical" href="https://arcle.net/lp/josys-rescue" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://arcle.net/" },
            { "@type": "ListItem", "position": 2, "name": "情シスレスキュー", "item": "https://arcle.net/lp/josys-rescue" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "情シスレスキュー",
          "provider": { "@type": "Organization", "name": "Arcle" },
          "description": "IT専任者がいない企業のためのIT代行サービス。PCトラブル対応・セキュリティ対策・SaaS管理・ネットワーク構築を月額5万円〜で包括サポート。",
          "areaServed": { "@type": "City", "name": "一宮市" },
          "offers": [
            { "@type": "Offer", "name": "ライトプラン", "price": "50000", "priceCurrency": "JPY", "description": "IT相談窓口・簡易トラブル対応・リモートサポート" },
            { "@type": "Offer", "name": "スタンダードプラン", "price": "150000", "priceCurrency": "JPY", "description": "Lightの全内容+PCキッティング・システム導入支援・訪問サポート・セキュリティ対策" },
            { "@type": "Offer", "name": "プレミアムプラン", "price": "300000", "priceCurrency": "JPY", "description": "Standardの全内容+IT戦略コンサルティング・DX戦略策定・実行" }
          ]
        })}</script>
      </Helmet>

      {/* ========== 1. Hero Section ========== */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="lg:w-1/2 text-left reveal-hidden transition-all duration-1000 ease-out">
              <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-blue-100 text-xs font-en font-semibold tracking-widest uppercase mb-8 border border-white/20 backdrop-blur-sm">
                Josys Rescue
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-[1.15] tracking-tight">
                その"ITの困った"、<br />
                丸ごと引き受けます。
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-12 leading-relaxed font-light">
                情シスレスキューは、IT専任者がいない企業のための<br className="hidden md:block" />
                "もうひとつのIT部門"です。<br />
                月額5万円〜、必要な時だけプロがサポート。
              </p>
              <a
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-0.5"
              >
                <span className="mr-2">無料で相談する</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="lg:w-1/2 reveal-hidden transition-all duration-1000 delay-300 ease-out">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-3xl blur-2xl opacity-20 animate-pulse" />
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-blue-800/80 via-indigo-800/60 to-blue-900/80 backdrop-blur-sm">
                  {/* 装飾的な背景要素 */}
                  <div className="absolute top-8 right-8 w-32 h-32 bg-blue-400/15 rounded-full blur-2xl" />
                  <div className="absolute bottom-12 left-8 w-40 h-40 bg-indigo-400/10 rounded-full blur-3xl" />
                  <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-cyan-400/10 rounded-full blur-xl" />
                  {/* 装飾的グリッドライン */}
                  <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                  {/* メインアイコンコンポジション */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* メインシールド */}
                      <div className="w-28 h-28 bg-white/10 rounded-3xl shadow-2xl shadow-blue-900/30 flex items-center justify-center border border-white/20 backdrop-blur-md">
                        <Shield className="w-14 h-14 text-blue-200" />
                      </div>
                      {/* サブアイコン：Server（右上） */}
                      <div className="absolute -top-5 -right-6 w-14 h-14 bg-white/10 rounded-2xl shadow-lg shadow-blue-900/20 flex items-center justify-center border border-white/15 backdrop-blur-md">
                        <Server className="w-7 h-7 text-indigo-300" />
                      </div>
                      {/* サブアイコン：Headphones（左下） */}
                      <div className="absolute -bottom-4 -left-8 w-12 h-12 bg-white/10 rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center border border-white/15 backdrop-blur-md">
                        <Headphones className="w-6 h-6 text-cyan-300" />
                      </div>
                      {/* サブアイコン：Settings（右下） */}
                      <div className="absolute -bottom-6 right-0 w-11 h-11 bg-white/10 rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center border border-white/15 backdrop-blur-md">
                        <Settings className="w-5 h-5 text-blue-300" />
                      </div>
                      {/* サブアイコン：Monitor（左上） */}
                      <div className="absolute -top-3 -left-10 w-10 h-10 bg-white/10 rounded-lg shadow-md flex items-center justify-center border border-white/10 backdrop-blur-md">
                        <Monitor className="w-5 h-5 text-indigo-200" />
                      </div>
                      {/* 装飾的リング */}
                      <div className="absolute -inset-12 border border-white/5 rounded-full" />
                      <div className="absolute -inset-20 border border-white/[0.03] rounded-full" />
                      {/* 装飾的ドット */}
                      <div className="absolute -top-14 left-1/2 w-2 h-2 bg-blue-300/40 rounded-full" />
                      <div className="absolute top-1/2 -right-16 w-1.5 h-1.5 bg-indigo-300/30 rounded-full" />
                      <div className="absolute -bottom-12 left-0 w-2 h-2 bg-cyan-300/30 rounded-full" />
                    </div>
                  </div>
                  {/* 下部グラデーションオーバーレイ */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/50" />
        </div>
      </section>

      {/* ========== 2. Pain Points Section ========== */}
      <section className="py-24 md:py-32 bg-gray-50 relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 reveal-hidden">
            <span className="text-blue-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Pain Points</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              こんなお悩みありませんか？
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: AlertTriangle,
                title: '「PCが動かない」のたびに\n業務が止まる',
                desc: '社内にITに詳しい人がおらず、トラブルのたびに業務が長時間ストップ。対応コストが見えないまま膨らんでいませんか？',
              },
              {
                icon: ShieldCheck,
                title: 'セキュリティ対策、\n何をすればいいか分からない',
                desc: 'ウイルス対策ソフトだけで大丈夫？情報漏洩のニュースを見るたびに不安になるけれど、何から手をつければいいか分からない。',
              },
              {
                icon: Settings,
                title: 'SaaSやツールが増えすぎて\n管理できない',
                desc: '気づけばサブスクだらけ。誰が何を使っているか把握できず、無駄なコストが発生しているかもしれません。',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 reveal-hidden text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 whitespace-pre-line leading-relaxed">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 3. Solution Section ========== */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-blue-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Solutions</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              情シスレスキューが<span className="text-blue-600">解決</span>します
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              あなたの会社のIT部門として、4つの領域をまるごとカバー。<br className="hidden md:block" />
              必要な時に、必要なだけ、プロが対応します。
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-24">
            {[
              {
                icon: Headphones,
                number: '01',
                title: 'ITヘルプデスク',
                titleEn: 'IT Helpdesk',
                desc: 'PCトラブルからソフト操作まで、チャット・電話で即対応。「PCが動かない」「設定が分からない」もすぐに解決します。',
                color: 'blue',
                gradientFrom: 'from-blue-50',
                gradientTo: 'to-cyan-50/50',
                mainIcon: Headphones,
                mainIconColor: 'text-blue-600',
                subIcons: [
                  { icon: MessageCircle, color: 'text-blue-500', position: '-top-3 -right-4', size: 'w-11 h-11', iconSize: 'w-5 h-5', rounded: 'rounded-xl' },
                  { icon: Monitor, color: 'text-cyan-500', position: '-bottom-2 -left-5', size: 'w-10 h-10', iconSize: 'w-5 h-5', rounded: 'rounded-lg' },
                  { icon: LifeBuoy, color: 'text-indigo-400', position: '-bottom-4 right-2', size: 'w-9 h-9', iconSize: 'w-4 h-4', rounded: 'rounded-lg' },
                ],
                bgAccent1: 'bg-blue-100/40',
                bgAccent2: 'bg-cyan-100/30',
                borderAccent: 'border-blue-100/50',
                reverse: false
              },
              {
                icon: ShieldCheck,
                number: '02',
                title: 'セキュリティ対策',
                titleEn: 'Security',
                desc: '情報漏洩リスクの診断から、対策の実施・運用まで。ウイルス対策・アクセス制御・バックアップ体制を整えます。',
                color: 'indigo',
                gradientFrom: 'from-indigo-50',
                gradientTo: 'to-purple-50/50',
                mainIcon: ShieldCheck,
                mainIconColor: 'text-indigo-600',
                subIcons: [
                  { icon: Lock, color: 'text-indigo-500', position: '-top-3 -right-5', size: 'w-11 h-11', iconSize: 'w-5 h-5', rounded: 'rounded-xl' },
                  { icon: Key, color: 'text-purple-500', position: '-bottom-3 -left-4', size: 'w-10 h-10', iconSize: 'w-5 h-5', rounded: 'rounded-lg' },
                  { icon: Database, color: 'text-indigo-400', position: '-bottom-5 right-1', size: 'w-9 h-9', iconSize: 'w-4 h-4', rounded: 'rounded-lg' },
                ],
                bgAccent1: 'bg-indigo-100/40',
                bgAccent2: 'bg-purple-100/30',
                borderAccent: 'border-indigo-100/50',
                reverse: true
              },
              {
                icon: Settings,
                number: '03',
                title: 'SaaS・ツール管理',
                titleEn: 'SaaS Management',
                desc: '導入選定・アカウント管理・コスト最適化をまるっと代行。「誰が何を使っているか」を可視化し、無駄を削減します。',
                color: 'purple',
                gradientFrom: 'from-purple-50',
                gradientTo: 'to-pink-50/50',
                mainIcon: Settings,
                mainIconColor: 'text-purple-600',
                subIcons: [
                  { icon: Cloud, color: 'text-purple-500', position: '-top-4 -right-4', size: 'w-11 h-11', iconSize: 'w-5 h-5', rounded: 'rounded-xl' },
                  { icon: BarChart3, color: 'text-pink-500', position: '-bottom-2 -left-5', size: 'w-10 h-10', iconSize: 'w-5 h-5', rounded: 'rounded-lg' },
                  { icon: Globe, color: 'text-purple-400', position: '-bottom-4 right-3', size: 'w-9 h-9', iconSize: 'w-4 h-4', rounded: 'rounded-lg' },
                ],
                bgAccent1: 'bg-purple-100/40',
                bgAccent2: 'bg-pink-100/30',
                borderAccent: 'border-purple-100/50',
                reverse: false
              },
              {
                icon: Wifi,
                number: '04',
                title: 'ネットワーク・インフラ',
                titleEn: 'Network & Infra',
                desc: '社内Wi-Fiからクラウド環境まで安定稼働を支援。「ネットが遅い」「VPNが繋がらない」といったお困りごとも解消します。',
                color: 'teal',
                gradientFrom: 'from-teal-50',
                gradientTo: 'to-emerald-50/50',
                mainIcon: Wifi,
                mainIconColor: 'text-teal-600',
                subIcons: [
                  { icon: Server, color: 'text-teal-500', position: '-top-3 -right-5', size: 'w-11 h-11', iconSize: 'w-5 h-5', rounded: 'rounded-xl' },
                  { icon: Cpu, color: 'text-emerald-500', position: '-bottom-3 -left-4', size: 'w-10 h-10', iconSize: 'w-5 h-5', rounded: 'rounded-lg' },
                  { icon: Globe, color: 'text-teal-400', position: '-bottom-5 right-2', size: 'w-9 h-9', iconSize: 'w-4 h-4', rounded: 'rounded-lg' },
                ],
                bgAccent1: 'bg-teal-100/40',
                bgAccent2: 'bg-emerald-100/30',
                borderAccent: 'border-teal-100/50',
                reverse: true
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-col ${item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 reveal-hidden`}
              >
                <div className="lg:w-1/2">
                  <div className="relative group">
                    <div className={`absolute -inset-4 bg-${item.color}-500/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className={`relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo}`}>
                      {/* 装飾的な背景要素 */}
                      <div className={`absolute top-6 right-6 w-24 h-24 ${item.bgAccent1} rounded-full blur-xl`} />
                      <div className={`absolute bottom-8 left-8 w-32 h-32 ${item.bgAccent2} rounded-full blur-2xl`} />
                      <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-white/20 rounded-full blur-lg" />
                      {/* 装飾的ドットパターン */}
                      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                      {/* メインアイコンコンポジション */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          {/* 装飾リング */}
                          <div className={`absolute -inset-8 border ${item.borderAccent} rounded-full`} />
                          <div className="absolute -inset-14 border border-gray-100/30 rounded-full" />
                          {/* メインアイコン */}
                          <div className={`w-20 h-20 bg-white rounded-2xl shadow-lg shadow-gray-200/50 flex items-center justify-center border ${item.borderAccent} group-hover:scale-105 transition-transform duration-500`}>
                            <item.mainIcon className={`w-10 h-10 ${item.mainIconColor}`} />
                          </div>
                          {/* サブアイコン群 */}
                          {item.subIcons.map((sub, si) => (
                            <div key={si} className={`absolute ${sub.position} ${sub.size} bg-white ${sub.rounded} shadow-md flex items-center justify-center border border-gray-50 group-hover:scale-110 transition-transform duration-500`} style={{ transitionDelay: `${si * 75}ms` }}>
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
                    <span className="text-sm font-en font-bold text-gray-300">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-blue-600 mb-2">{item.title}</h3>
                  <h4 className="text-3xl font-en font-bold text-gray-900 mb-6">{item.titleEn}</h4>
                  <p className="text-gray-600 leading-relaxed text-lg mb-8">{item.desc}</p>
                  <ul className="space-y-4">
                    {['24時間365日の監視体制', '専門スタッフによる迅速対応', 'コスト削減の具体案提示'].map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <Check className="w-5 h-5 text-blue-500 mr-3" />
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

      {/* ========== 4. Pricing Section ========== */}
      <section className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-blue-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">料金プラン</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              御社の規模や課題に合わせた3つのプランをご用意。<br className="hidden md:block" />
              すべてのプランで、専門スタッフが丁寧にサポートします。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {[
              {
                name: 'Light',
                sub: 'ライト',
                price: '5万円〜',
                desc: 'まずは気軽に相談から',
                features: [
                  'IT相談窓口',
                  '簡易トラブル対応',
                  'リモートサポート',
                ],
                recommended: false,
              },
              {
                name: 'Standard',
                sub: 'スタンダード',
                price: '15万円〜',
                desc: '情シス業務を包括サポート',
                features: [
                  'Lightの全内容',
                  'PCキッティング',
                  'システム導入支援',
                  '訪問サポート',
                  'セキュリティ対策',
                ],
                recommended: true,
              },
              {
                name: 'Premium',
                sub: 'プレミアム',
                price: '30万円〜',
                desc: 'IT戦略パートナー',
                features: [
                  'Standardの全内容',
                  'IT戦略コンサルティング',
                  'DX戦略策定・実行',
                ],
                recommended: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-3xl reveal-hidden transition-all duration-500 flex flex-col ${
                  plan.recommended
                    ? 'bg-gray-900 text-white shadow-2xl md:scale-105 z-10'
                    : 'bg-white border border-gray-100 text-gray-900 hover:border-gray-300'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">
                    おすすめ
                  </div>
                )}
                <div className="mb-6 text-center">
                  <h3 className={`text-3xl font-en font-bold mb-1 ${plan.recommended ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm font-bold ${plan.recommended ? 'text-gray-400' : 'text-gray-500'}`}>{plan.sub}</p>
                  <p className={`text-xs mt-2 ${plan.recommended ? 'text-gray-500' : 'text-gray-400'}`}>{plan.desc}</p>
                  <div className="mt-4">
                    <span className={`text-xs ${plan.recommended ? 'text-gray-400' : 'text-gray-500'}`}>月額</span>
                    <p className={`text-3xl font-bold ${plan.recommended ? 'text-white' : 'text-gray-900'}`}>{plan.price}</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${plan.recommended ? 'text-blue-400' : 'text-blue-600'}`} />
                      <span className={`text-sm font-medium leading-relaxed ${plan.recommended ? 'text-gray-300' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="text-center mt-auto">
                  <a
                    href="/contact"
                    className={`inline-block w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                      plan.recommended
                        ? 'bg-blue-600 text-white hover:bg-blue-500'
                        : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    お問い合わせ
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 reveal-hidden space-y-2">
            <p className="text-gray-400 text-xs">※料金は税抜です。</p>
            <p className="text-gray-400 text-xs">※訪問サポートは一宮市近郊は無料。その他エリアは別途交通費を頂戴します。</p>
          </div>
        </div>
      </section>

      {/* ========== 5. FAQ Section ========== */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal-hidden">
            <span className="text-blue-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">よくある質問</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: '対応エリアはどこですか？',
                a: '愛知県一宮市近郊の企業様を中心に承っています。リモート対応は全国可能です。',
              },
              {
                q: '契約期間の縛りはありますか？',
                a: '最低契約期間は設けておりません。月単位でのご契約が可能です。',
              },
              {
                q: '今使っているシステムの相談もできますか？',
                a: 'はい、既存システムの運用改善や乗り換え相談も承っています。',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 reveal-hidden hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mr-4 mt-0.5">
                    <HelpCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{item.q}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 6. CTA Section ========== */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

        <div className="container mx-auto px-6 text-center relative z-10 reveal-hidden">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            ITの"困った"、<br />
            今日で終わりにしませんか？
          </h2>
          <p className="text-blue-100 mb-12 max-w-xl mx-auto text-lg leading-relaxed">
            まずは無料相談から。<br />
            御社のIT課題をお聞かせください。
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center justify-center px-10 py-5 bg-white text-blue-700 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            <span className="mr-2">無料で相談する</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default JosysRescue;
