import React, { useEffect, useRef } from 'react';
import { PageHeader, ContactCta } from '../next/parts';
import { illust } from '../next/theme';
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
    <div className="bg-cream text-sumi">
      <Helmet>
        {/* 広告用LP。同じ内容のサービスページと評価が割れないよう、検索には出さない */}
        <meta name="robots" content="noindex, follow" />
        <title>情シスレスキュー | IT専任者がいない企業のためのIT代行サービス - Arcle</title>
        <meta name="description" content="情シスレスキューはArcleが提供するIT代行サービス。PCトラブル対応・セキュリティ対策・SaaS管理・ネットワーク構築を月額3万円〜で包括サポート。IT専任者がいない中小企業の味方です。" />
        <link rel="canonical" href="https://www.arcle.net/lp/josys-rescue" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://www.arcle.net/" },
            { "@type": "ListItem", "position": 2, "name": "情シスレスキュー", "item": "https://www.arcle.net/lp/josys-rescue" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "情シスレスキュー",
          "provider": { "@id": "https://www.arcle.net/#organization" },
          "description": "IT専任者がいない企業のためのIT代行サービス。PCトラブル対応・セキュリティ対策・SaaS管理・ネットワーク構築を月額3万円〜で包括サポート。",
          "areaServed": [{ "@type": "State", "name": "愛知県" }, { "@type": "State", "name": "岐阜県" }, { "@type": "State", "name": "三重県" }],
          "offers": [
            { "@type": "Offer", "name": "ライトプラン", "price": "30000", "priceCurrency": "JPY", "description": "IT相談窓口・簡易トラブル対応・リモートサポート" },
            { "@type": "Offer", "name": "スタンダードプラン", "price": "150000", "priceCurrency": "JPY", "description": "Lightの全内容+PCキッティング・システム導入支援・訪問サポート・セキュリティ対策" },
            { "@type": "Offer", "name": "プレミアムプラン", "price": "300000", "priceCurrency": "JPY", "description": "Standardの全内容+IT戦略コンサルティング・DX戦略策定・実行" }
          ]
        })}</script>
      </Helmet>

      {/* ========== 1. Hero Section ========== */}
      <PageHeader
        en="Josys Rescue"
        title={<>
                その"ITの困った"、<br />
                丸ごと引き受けます。
              </>}
        lead={<><p>
                情シスレスキューは、IT専任者がいない企業のための<br className="hidden md:block" />
                "もうひとつのIT部門"です。<br />
                月額3万円〜、必要な時だけプロがサポート。
              </p><a href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-sumi px-7 py-4 font-bold text-white hover:bg-svc-josys transition-colors">無料で相談する<ArrowRight className="w-4 h-4" /></a></>}
        crumbs={[{ label: '情シスレスキュー' }]}
        service="josys"
        image={illust('svc-josys')}
      />

      {/* ========== 2. Pain Points Section ========== */}
      <section className="py-20 md:py-28 bg-cream-dark relative">
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="text-center mb-16 reveal-hidden">
            <span className="text-svc-josys font-en tracking-widest text-xs font-bold uppercase mb-3 block">Pain Points</span>
            <h2 className="font-head [word-break:auto-phrase] text-3xl md:text-4xl font-bold text-sumi mb-4">
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
                className="bg-white p-8 rounded-[28px] border border-warm-line shadow-[0_16px_40px_rgb(31_36_48/0.08)] transition-all duration-500 reveal-hidden text-center"
              >
                <div className="w-16 h-16 rounded-full bg-svc-josys/10 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-svc-josys" />
                </div>
                <h3 className="font-head [word-break:auto-phrase] text-lg font-bold text-sumi mb-4 whitespace-pre-line leading-relaxed">{item.title}</h3>
                <p className="text-sm text-sumi-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 3. Solution Section ========== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-svc-josys font-en tracking-widest text-xs font-bold uppercase mb-3 block">Solutions</span>
            <h2 className="font-head [word-break:auto-phrase] text-3xl md:text-4xl font-bold text-sumi mb-6">
              情シスレスキューが<span className="text-svc-josys">解決</span>します
            </h2>
            <p className="text-sumi-muted max-w-2xl mx-auto">
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



                mainIcon: Headphones,
                mainIconColor: 'text-svc-josys',
                subIcons: [
                  { icon: MessageCircle, color: 'text-svc-josys', position: '-top-3 -right-4', size: 'w-11 h-11', iconSize: 'w-5 h-5', rounded: 'rounded-[28px]' },
                  { icon: Monitor, color: 'text-svc-josys', position: '-bottom-2 -left-5', size: 'w-10 h-10', iconSize: 'w-5 h-5', rounded: 'rounded-lg' },
                  { icon: LifeBuoy, color: 'text-svc-josys', position: '-bottom-4 right-2', size: 'w-9 h-9', iconSize: 'w-4 h-4', rounded: 'rounded-lg' },
                ],
                bgAccent1: 'bg-svc-josys/10',
                bgAccent2: 'bg-svc-josys/10',
                borderAccent: 'border-svc-josys/20',
                reverse: false
              },
              {
                icon: ShieldCheck,
                number: '02',
                title: 'セキュリティ対策',
                titleEn: 'Security',
                desc: '情報漏洩リスクの診断から、対策の実施・運用まで。ウイルス対策・アクセス制御・バックアップ体制を整えます。',



                mainIcon: ShieldCheck,
                mainIconColor: 'text-svc-josys',
                subIcons: [
                  { icon: Lock, color: 'text-svc-josys', position: '-top-3 -right-5', size: 'w-11 h-11', iconSize: 'w-5 h-5', rounded: 'rounded-[28px]' },
                  { icon: Key, color: 'text-svc-josys', position: '-bottom-3 -left-4', size: 'w-10 h-10', iconSize: 'w-5 h-5', rounded: 'rounded-lg' },
                  { icon: Database, color: 'text-svc-josys', position: '-bottom-5 right-1', size: 'w-9 h-9', iconSize: 'w-4 h-4', rounded: 'rounded-lg' },
                ],
                bgAccent1: 'bg-svc-josys/10',
                bgAccent2: 'bg-svc-josys/10',
                borderAccent: 'border-svc-josys/20',
                reverse: true
              },
              {
                icon: Settings,
                number: '03',
                title: 'SaaS・ツール管理',
                titleEn: 'SaaS Management',
                desc: '導入選定・アカウント管理・コスト最適化をまるっと代行。「誰が何を使っているか」を可視化し、無駄を削減します。',



                mainIcon: Settings,
                mainIconColor: 'text-svc-josys',
                subIcons: [
                  { icon: Cloud, color: 'text-svc-josys', position: '-top-4 -right-4', size: 'w-11 h-11', iconSize: 'w-5 h-5', rounded: 'rounded-[28px]' },
                  { icon: BarChart3, color: 'text-svc-josys', position: '-bottom-2 -left-5', size: 'w-10 h-10', iconSize: 'w-5 h-5', rounded: 'rounded-lg' },
                  { icon: Globe, color: 'text-svc-josys', position: '-bottom-4 right-3', size: 'w-9 h-9', iconSize: 'w-4 h-4', rounded: 'rounded-lg' },
                ],
                bgAccent1: 'bg-svc-josys/10',
                bgAccent2: 'bg-svc-josys/10',
                borderAccent: 'border-svc-josys/20',
                reverse: false
              },
              {
                icon: Wifi,
                number: '04',
                title: 'ネットワーク・インフラ',
                titleEn: 'Network & Infra',
                desc: '社内Wi-Fiからクラウド環境まで安定稼働を支援。「ネットが遅い」「VPNが繋がらない」といったお困りごとも解消します。',



                mainIcon: Wifi,
                mainIconColor: 'text-svc-josys',
                subIcons: [
                  { icon: Server, color: 'text-svc-josys', position: '-top-3 -right-5', size: 'w-11 h-11', iconSize: 'w-5 h-5', rounded: 'rounded-[28px]' },
                  { icon: Cpu, color: 'text-svc-josys', position: '-bottom-3 -left-4', size: 'w-10 h-10', iconSize: 'w-5 h-5', rounded: 'rounded-lg' },
                  { icon: Globe, color: 'text-svc-josys', position: '-bottom-5 right-2', size: 'w-9 h-9', iconSize: 'w-4 h-4', rounded: 'rounded-lg' },
                ],
                bgAccent1: 'bg-svc-josys/10',
                bgAccent2: 'bg-svc-josys/10',
                borderAccent: 'border-svc-josys/20',
                reverse: true
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-col ${item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 reveal-hidden`}
              >
                <div className="lg:w-1/2">
                  <div className="relative group">
                    <div className={`absolute -inset-4 bg-svc-josys/10 rounded-[28px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className={`relative aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_16px_40px_rgb(31_36_48/0.08)] border border-warm-line bg-svc-josys/10`}>
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
                          <div className="absolute -inset-14 border border-warm-line rounded-full" />
                          {/* メインアイコン */}
                          <div className={`w-20 h-20 bg-white rounded-[28px] shadow-[0_16px_40px_rgb(31_36_48/0.08)]  flex items-center justify-center border ${item.borderAccent} group-hover:scale-105 transition-transform duration-500`}>
                            <item.mainIcon className={`w-10 h-10 ${item.mainIconColor}`} />
                          </div>
                          {/* サブアイコン群 */}
                          {item.subIcons.map((sub, si) => (
                            <div key={si} className={`absolute ${sub.position} ${sub.size} bg-white ${sub.rounded} shadow-[0_16px_40px_rgb(31_36_48/0.08)] flex items-center justify-center border border-warm-line group-hover:scale-110 transition-transform duration-500`} style={{ transitionDelay: `${si * 75}ms` }}>
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
                    <div className={`w-12 h-12 rounded-full bg-svc-josys/10 flex items-center justify-center`}>
                      <item.icon className={`w-6 h-6 text-svc-josys`} />
                    </div>
                    <span className="text-sm font-en font-bold text-sumi-muted">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="font-head [word-break:auto-phrase] text-sm font-bold text-svc-josys mb-2">{item.title}</h3>
                  <h4 className="font-head [word-break:auto-phrase] text-3xl font-en font-bold text-sumi mb-6">{item.titleEn}</h4>
                  <p className="text-sumi-muted leading-relaxed text-lg mb-8">{item.desc}</p>
                  <ul className="space-y-4">
                    {['24時間365日の監視体制', '専門スタッフによる迅速対応', 'コスト削減の具体案提示'].map((feature, i) => (
                      <li key={i} className="flex items-center text-sumi">
                        <Check className="w-5 h-5 text-svc-josys mr-3" />
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
      <section className="py-20 md:py-28 bg-cream-dark relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-svc-josys font-en tracking-widest text-xs font-bold uppercase mb-3 block">Pricing</span>
            <h2 className="font-head [word-break:auto-phrase] text-[26px] md:text-[38px] font-bold text-sumi mb-6">料金プラン</h2>
            <p className="text-sumi-muted max-w-2xl mx-auto">
              御社の規模や課題に合わせた3つのプランをご用意。<br className="hidden md:block" />
              すべてのプランで、専門スタッフが丁寧にサポートします。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {[
              {
                name: 'Light',
                sub: 'ライト',
                price: '3万円〜',
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
                className={`relative p-8 rounded-[28px] reveal-hidden transition-all duration-500 flex flex-col ${
                  plan.recommended
                    ? 'bg-svc-josys text-white shadow-[0_16px_40px_rgb(31_36_48/0.08)] md:scale-105 z-10'
                    : 'bg-white border border-warm-line text-sumi hover:border-warm-line'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-svc-josys text-white text-[10px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">
                    おすすめ
                  </div>
                )}
                <div className="mb-6 text-center">
                  <h3 className={`font-head [word-break:auto-phrase] text-3xl font-en font-bold mb-1 ${plan.recommended ? 'text-white' : 'text-sumi'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm font-bold ${plan.recommended ? 'text-white/80' : 'text-sumi-muted'}`}>{plan.sub}</p>
                  <p className={`text-xs mt-2 ${plan.recommended ? 'text-white/80' : 'text-sumi-muted'}`}>{plan.desc}</p>
                  <div className="mt-4">
                    <span className={`text-xs ${plan.recommended ? 'text-white/80' : 'text-sumi-muted'}`}>月額</span>
                    <p className={`text-3xl font-bold ${plan.recommended ? 'text-white' : 'text-sumi'}`}>{plan.price}</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${plan.recommended ? 'text-white' : 'text-svc-josys'}`} />
                      <span className={`text-sm font-medium leading-relaxed ${plan.recommended ? 'text-white/80' : 'text-sumi-muted'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="text-center mt-auto">
                  <a
                    href="/contact"
                    className={`inline-block w-full py-4 rounded-full font-bold text-sm transition-all duration-300 ${
                      plan.recommended
                        ? 'bg-mustard text-sumi hover:bg-white'
                        : 'bg-sumi text-white hover:bg-svc-josys'
                    }`}
                  >
                    お問い合わせ
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 reveal-hidden space-y-2">
            <p className="text-sumi-muted text-xs">※料金は税抜です。</p>
            <p className="text-sumi-muted text-xs">※東海エリアは訪問にも対応します。</p>
          </div>
        </div>
      </section>

      {/* ========== 5. FAQ Section ========== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16 reveal-hidden">
            <span className="text-svc-josys font-en tracking-widest text-xs font-bold uppercase mb-3 block">FAQ</span>
            <h2 className="font-head [word-break:auto-phrase] text-3xl md:text-4xl font-bold text-sumi mb-6">よくある質問</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: '対応エリアはどこですか？',
                a: '東海エリアは訪問にも対応しています。リモート対応は全国可能です。',
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
                className="bg-cream-dark rounded-[28px] p-8 reveal-hidden hover:bg-cream-dark transition-colors duration-300"
              >
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-svc-josys flex items-center justify-center flex-shrink-0 mr-4 mt-0.5">
                    <HelpCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-head [word-break:auto-phrase] text-lg font-bold text-sumi mb-3">{item.q}</h3>
                    <p className="text-sumi-muted leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 6. CTA Section ========== */}
      <ContactCta title={<>
            ITの"困った"、<br />
            今日で終わりにしませんか？
          </>} body={"まずは無料相談から。御社のIT課題をお聞かせください。"} />
    </div>
  );
};

export default JosysRescue;
