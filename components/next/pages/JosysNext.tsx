import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Cpu, Globe, Shield, Users, Zap } from 'lucide-react';
import { ContactCta, IconTile, Mark, PageHeader, SectionHead, Sparkle, Ticker, card, press } from '../parts';
import { illust, services } from '../theme';

const service = services.find((s) => s.key === 'josys')!;
const concerns = [
                  { title: "専門知識の不足", desc: "「誰に聞けばいいか分からない」を解消", icon: Users },
                  { title: "リソース不足", desc: "ノンコア業務に費やす時間を削減", icon: Zap },
                  { title: "セキュリティ不安", desc: "情報漏洩のリスクから資産を守る", icon: Shield }
                ];
const offerings = [
              { 
                title: "IT Helpdesk", 
                sub: "ITヘルプデスク", 
                desc: "PC操作からトラブル対応まで、チャットや電話で迅速に解決。社員の生産性を守り、業務の停滞を防ぎます。緊急時は優先対応で即座にサポート。", 
                icon: Users, 
              },
              {
                title: "System Integration",
                sub: "システム導入・DX推進",
                desc: "業務効率化ツールの選定から導入、運用定着まで一貫サポート。DX戦略の立案・実行を通じて、デジタル化による競争力強化を実現します。",
                icon: Cpu,
              },
              {
                title: "Security & Asset",
                sub: "セキュリティ・資産管理",
                desc: "情報漏洩対策やアクセス管理などのセキュリティ強化と、ITライセンス・アカウントの一元管理でコストとリスクを最適化します。",
                icon: Shield,
              },
              {
                title: "Cloud & Infra",
                sub: "クラウド・インフラ支援",
                desc: "M365やGoogle Workspaceなどクラウドサービスの選定・導入・運用を包括サポート。サーバー・ネットワーク環境の最適化も実現します。",
                icon: Globe,
              }
            ];
const plans = [
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
            ];

const JosysNext: React.FC = () => (
  <div className="bg-cream text-sumi overflow-x-clip">
      <Helmet>
        <title>情シス代行サービス | 愛知・東海の中小企業のIT担当を代行 - Arcle</title>
        <meta name="description" content="愛知・東海の中小企業向けの情シス代行サービス。IT専任担当者がいない会社に代わって、ヘルプデスク・PCキッティング・SaaS導入・セキュリティ対策・ネットワーク構築を月額5万円〜で包括サポート。" />
        <link rel="canonical" href="https://www.arcle.net/josys" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://www.arcle.net/" },
            { "@type": "ListItem", "position": 2, "name": "情シス代行", "item": "https://www.arcle.net/josys" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "情シス代行サービス",
          "provider": { "@id": "https://www.arcle.net/#organization" },
          "description": "IT専任担当者不在の企業向けに、ITヘルプデスク・システム導入・セキュリティ対策・クラウド支援を包括サポート",
          "areaServed": [{ "@type": "State", "name": "愛知県" }, { "@type": "State", "name": "岐阜県" }, { "@type": "State", "name": "三重県" }],
          "offers": [
            { "@type": "Offer", "name": "ライトプラン", "price": "50000", "priceCurrency": "JPY", "description": "IT相談窓口・簡易トラブルシューティング" },
            { "@type": "Offer", "name": "スタンダードプラン", "price": "150000", "priceCurrency": "JPY", "description": "情シス業務を包括サポート" },
            { "@type": "Offer", "name": "プレミアムプラン", "price": "300000", "priceCurrency": "JPY", "description": "IT戦略パートナー" }
          ]
        })}</script>
      </Helmet>
    <PageHeader
      en="Information Systems Outsourcing"
      title={<>情シス代行<span className={`block mt-4 ${service.text}`}>ITの専門家を、<br />必要な時だけ。</span></>}
      lead={
        <>
          <p>あなたの会社の「見えない情シス部門」として。<br />技術と信頼で、ビジネスの成長を足元から支えます。</p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <a href='/contact' className="inline-flex items-center gap-2 rounded-full bg-sumi px-7 py-4 font-bold text-white border-[2.5px] border-sumi shadow-[5px_5px_0_#F2B544] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_#F2B544]">
              まずは無料で相談する<ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a href='/josys#services' className={`inline-flex items-center rounded-full bg-white px-7 py-4 font-bold text-sumi ${card} shadow-[5px_5px_0_#1F2430] ${press}`}>サービス詳細を見る</a>
          </div>
        </>
      }
      crumbs={[{ label: 'サービス', href: '/services' }, { label: '情シス代行' }]}
      service="josys"
      image={illust('svc-josys')}
    />

    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          <SectionHead
            en="Your Concerns"
            enClass={service.text}
            title={<>そのIT業務、<br /><Mark><span className={service.text}>後回し</span></Mark>にしていませんか？</>}
            lead="コア業務に集中したいのに、ITのトラブルや雑務に時間を奪われている。そんな経営者様・ご担当者様のお悩みを、私たちが解決します。"
          />
          <div className="space-y-4">
            {concerns.map((item, i) => (
              <div key={item.title} className={`group pop-reveal flex items-start gap-4 rounded-[28px] bg-cream p-5 md:p-6 ${card}`} style={{ animationDelay: `${i * 80}ms` }}>
                <span className={`pop-wiggle grid place-items-center shrink-0 w-12 h-12 rounded-2xl text-white border-2 border-sumi shadow-[3px_3px_0_#1F2430] -rotate-6 ${service.bg}`}>
                  <item.icon className="w-6 h-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-head font-black text-xl md:text-2xl [word-break:auto-phrase]">{item.title}</h3>
                  <p className="mt-1 text-sm text-sumi-muted leading-relaxed [word-break:auto-phrase]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`group pop-reveal relative aspect-square grid place-items-center rounded-[32px] ${service.tint} max-w-md w-full justify-self-center p-6 ${card}`}>
          <img src={illust('worry-pc')} alt="" className="pop-tilt w-full" loading="lazy" />
          <Sparkle className="absolute -top-5 -right-3 w-9 h-9 text-mustard" />
        </div>
      </div>
    </section>

    <section id="services" className="py-20 md:py-28 bg-cream bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px] border-y-[2.5px] border-sumi scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="Our Services" enClass={service.text} title={<>Total <Mark>Support</Mark></>} lead="貴社のIT環境を包括的にサポート。課題に合わせて最適なソリューションを提供します。" center />
        <div className="grid md:grid-cols-2 gap-6">
          {offerings.map((item, index) => (
            <article key={item.title} className={`group pop-reveal rounded-[28px] bg-white p-7 md:p-9 ${card}`} style={{ animationDelay: `${index * 80}ms` }}>
              <IconTile icon={<item.icon className="w-7 h-7" aria-hidden="true" />} num={index + 1} bg={service.bg} className="pop-wiggle" />
              <p className={`mt-6 font-en text-sm font-bold tracking-wider ${service.text}`}>{item.title}</p>
              <h3 className="font-head text-2xl md:text-[28px] font-black leading-snug mt-1 [word-break:auto-phrase]">{item.sub}</h3>
              <p className="mt-5 text-sumi-muted leading-[1.9]">{item.desc}</p>
              <ul className="mt-6 pt-6 border-t-2 border-dashed border-warm-line space-y-3">
                {['24時間365日の監視体制', '専門スタッフによる迅速対応', 'コスト削減の具体案提示'].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed">
                    <Check className={`w-4 h-4 shrink-0 mt-1 ${service.text}`} aria-hidden="true" />{feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* サービスの名前を流すテープ */}
    <Ticker items={offerings.map((item) => item.sub)} tone="bg-svc-josys text-white" className="-mb-4 -mt-[2.5px]" />

    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="Pricing" enClass={service.text} title="プラン一覧" lead="スポット対応から包括的なIT運用まで。貴社の規模や課題に合わせた最適なサポートプランをご提供します" center />
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6 items-stretch">
          {plans.map((plan, i) => (
            <article key={plan.name} style={{ animationDelay: `${i * 80}ms` }} className={`pop-reveal relative rounded-[28px] border-[2.5px] border-sumi p-7 md:p-8 flex flex-col ${plan.recommended ? `${service.tint} shadow-[8px_8px_0_#F2B544] lg:-translate-y-3` : 'bg-cream shadow-[6px_6px_0_#1F2430]'}`}>
              {plan.recommended && <span className="pop-float absolute -top-4 left-6 -rotate-3 rounded-lg px-4 py-1 text-sm font-black text-white bg-coral border-2 border-sumi shadow-[3px_3px_0_#1F2430]">おすすめ</span>}
              <p className={`font-en font-black italic text-lg tracking-wider ${service.text}`}>{plan.name}</p>
              <h3 className="font-head text-2xl font-black mt-1 [word-break:auto-phrase]">{plan.sub}</h3>
              <p className="mt-3 text-sm text-sumi-muted">{plan.desc}</p>
              <p className={`my-7 font-en font-black italic text-5xl tracking-tight ${service.text}`}>{plan.price}</p>
              <ul className="space-y-4 border-t-2 border-dashed border-warm-line pt-7 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm leading-relaxed">
                    <Check className={`w-4 h-4 shrink-0 mt-1 ${service.text}`} aria-hidden="true" />{feature}
                  </li>
                ))}
              </ul>
              <a href='/contact' className="inline-flex items-center justify-center gap-2 rounded-full bg-sumi text-white px-6 py-4 font-bold text-sm border-[2.5px] border-sumi shadow-[4px_4px_0_#F2B544] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#F2B544]">
                お問い合わせ<ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-[28px] bg-cream border-2 border-dashed border-sumi/40 p-6 text-sm text-sumi-muted leading-[1.9] space-y-2">
          <p>※料金は税抜です。企業規模や対応範囲に応じてカスタマイズ可能です。</p>
          <p>※東海エリアは訪問にも対応します。</p>
        </div>
      </div>
    </section>

    <ContactCta
      title={<span className="[word-break:auto-phrase]">ITの悩み、<br />私たちにお聞かせください。</span>}
      body="些細なことでも構いません。専門家が丁寧にお話を伺い、貴社に最適な解決策をご提案します。"
    />
  </div>
);

export default JosysNext;
