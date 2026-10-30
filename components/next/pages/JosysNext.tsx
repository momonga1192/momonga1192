import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Cpu, Globe, Shield, Users, Zap } from 'lucide-react';
import { ContactCta, IconTile, Mark, PageHeader, PlanCard, SectionHead, Ticker, comicBtn, comicBtnShape, comicIllust } from '../parts';
import { Caption, SfxText, panel } from '../comic';
import { services } from '../theme';

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
                desc: "PCの操作からトラブル対応まで、メールやチャット、リモート操作でサポートします。リモートで解決しないときは、東海エリアなら訪問して対応します。", 
                icon: Users,
                points: ["メール・チャットでのご相談", "リモート操作でのトラブル対応", "東海エリアは訪問にも対応"], 
              },
              {
                title: "System Integration",
                sub: "システム導入・DX推進",
                desc: "業務効率化ツールの選定から導入、社内での定着までを一貫してサポートします。何からデジタル化するかの優先順位づけからご相談いただけます。",
                icon: Cpu,
                points: ["ツールの比較・選定のご提案", "導入時の設定と移行", "使い方の説明と定着のフォロー"],
              },
              {
                title: "Security & Asset",
                sub: "セキュリティ・資産管理",
                desc: "情報漏洩対策やアクセス管理などのセキュリティ強化と、ITライセンス・アカウントの一元管理で、ムダなコストとリスクを減らします。",
                icon: Shield,
                points: ["アカウント・ライセンスの棚卸し", "多要素認証など基本対策の導入", "社内ルールづくりの支援"],
              },
              {
                title: "Cloud & Infra",
                sub: "クラウド・インフラ支援",
                desc: "Microsoft 365やGoogle Workspaceなどクラウドサービスの選定・導入・運用をサポートします。社内のネットワークやWi-Fi環境の見直しもご相談いただけます。",
                icon: Globe,
                points: ["Microsoft 365・Google Workspaceの導入・移行", "管理者設定とアカウント管理", "ネットワーク・Wi-Fi環境の見直し"],
              }
            ];
const plans = [
              { 
                name: "Light", 
                sub: "ライトプラン", 
                desc: "まずは気軽に相談から", 
                price: "3万円~", 
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

// アメコミ版の飾り（絵・効果音・コマの番号）。文言は上のデータのまま使う
// お悩みは1枚の絵（josys-concerns）に3人を描いてある。1人ずつ切り出して各カードの上に出す（size は絵の拡大率、pos は背景の位置）。
// PC は縦長のコマにして、pcSize・pcPos で絵の上から下（机の上のPCやプリンター）まで見せる。
// 縦長のコマ（3:4）を埋めるため、pcSize は 250% 以上にする（絵の縦横比 1200:647）
const concernArt = [
  { sfx: 'HUH?', color: '#F07A5A', spAt: 'right-[6%] top-[5%]', tilt: -10, size: '280%', pos: '0% 0%', pcSize: '250%', pcPos: '0% 50%' },
  { sfx: 'PANIC!', color: '#F2B544', spAt: 'right-[5%] top-[5%]', tilt: 6, size: '300%', pos: '50% 0%', pcSize: '250%', pcPos: '48% 50%' },
  { sfx: 'EEK!', color: '#C9A6FF', spAt: 'left-[34%] top-[5%]', tilt: 10, size: '250%', pos: '100% 0%', pcSize: '250%', pcPos: '100% 50%' }
];
const offeringArt = [
  { img: 'josys-svc-helpdesk', sfx: 'CLICK!', at: 'right-[5%] bottom-[8%]', tilt: 8 },
  { img: 'josys-svc-dx', sfx: 'ZING!', at: 'left-[5%] bottom-[8%]', tilt: -8 },
  { img: 'josys-svc-security', sfx: 'BLAM!', at: 'left-[40%] top-[5%]', tilt: 10 },
  { img: 'josys-svc-cloud', sfx: 'WHOOSH!', at: 'right-[4%] top-[46%]', tilt: -6, pos: 'object-[50%_20%]' }
];

// 見出しの2行目：青い札を2枚、互い違いに傾けて貼る
const titleTag = 'inline-block px-2 my-1 bg-svc-josys text-white border-[3px] border-[#111] shadow-[5px_5px_0_#111] [-webkit-text-stroke:0] [text-shadow:none]';

const JosysNext: React.FC = () => (
  <div className="bg-[#FAF3E0] text-sumi overflow-x-clip">
      <Helmet>
        <title>情シス代行サービス | 愛知・東海の中小企業のIT担当を代行 - Arcle</title>
        <meta name="description" content="愛知・東海の中小企業向けの情シス代行サービス。IT専任担当者がいない会社に代わって、ヘルプデスク・PCキッティング・SaaS導入・セキュリティ対策・ネットワーク構築を月額3万円〜で包括サポート。" />
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
            { "@type": "Offer", "name": "ライトプラン", "price": "30000", "priceCurrency": "JPY", "description": "IT相談窓口・簡易トラブルシューティング" },
            { "@type": "Offer", "name": "スタンダードプラン", "price": "150000", "priceCurrency": "JPY", "description": "情シス業務を包括サポート" },
            { "@type": "Offer", "name": "プレミアムプラン", "price": "300000", "priceCurrency": "JPY", "description": "IT戦略パートナー" }
          ]
        })}</script>
      </Helmet>
    <PageHeader
      en="Information Systems Outsourcing"
      title={
        <>
          情シス代行
          <span className="block mt-3 text-[0.8em] leading-[1.5]">
            <span className={`${titleTag} -rotate-2`}>ITの専門家を、</span>
            <br />
            <span className={`${titleTag} rotate-1 ml-3 sm:ml-6`}>必要な時だけ。</span>
          </span>
        </>
      }
      lead={
        <>
          <p>あなたの会社の「見えない情シス部門」として。<br />技術と信頼で、ビジネスの成長を足元から支えます。</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href='/contact' className={`${comicBtnShape} bg-[#111] text-white shadow-[5px_5px_0_#F2B544] hover:shadow-[2px_2px_0_#F2B544]`}>
              まずは無料で相談する<ArrowRight className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
            </a>
            <a href='/josys#services' className={`${comicBtn} bg-white text-[#111]`}>サービス詳細を見る</a>
          </div>
        </>
      }
      crumbs={[{ label: 'サービス', href: '/services' }, { label: '情シス代行' }]}
      service="josys"
      image={comicIllust('josys-header')}
      imageMode="panel"
    />

    {/* お悩み：黒い帯の見出し → 1人1コマの、番号付きの3つのコマ */}
    <section className="pt-16 pb-20 md:pt-24 md:pb-28 bg-mustard comic-dots overflow-x-clip">
      <div className="pop-reveal text-center px-4">
        <span className="inline-block -rotate-3 border-[3px] border-[#111] px-4 pt-1.5 pb-1 font-comic text-xl md:text-2xl tracking-[0.06em] shadow-[4px_4px_0_#111] bg-svc-josys text-white">Your Concerns</span>
      </div>
      <div className="pop-reveal relative -rotate-1 bg-[#111] py-4 md:py-6 mt-6 border-y-[4px] border-white">
        <h2 className="text-center px-3 font-manga text-white text-[23px] sm:text-[34px] md:text-[46px] leading-[1.45] [word-break:auto-phrase]">
          そのIT業務、
          <br className="sm:hidden" />
          <span className="mx-1 text-mustard text-[1.3em] [text-shadow:4px_4px_0_#F07A5A]">後回し</span>にしていませんか？
        </h2>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <p className="pop-reveal mt-10 md:mt-12 mx-auto max-w-3xl bg-white border-[3px] border-[#111] shadow-[5px_5px_0_#111] px-5 py-4 md:px-7 md:py-5 font-bold leading-[1.9] [word-break:auto-phrase]">
          コア業務に集中したいのに、ITのトラブルや雑務に時間を奪われている。そんな経営者様・ご担当者様のお悩みを、Arcleが一緒に解決します。
        </p>

        <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-8 md:gap-6">
          {concerns.map((item, i) => (
            <div key={item.title} style={{ animationDelay: `${i * 100}ms` }} className={`pop-reveal group relative bg-white ${panel} ${i === 1 ? 'md:rotate-[1deg]' : 'md:-rotate-[0.8deg]'}`}>
              {/* 3人を描いた1枚の絵から、その人のところだけを切り出して、1人1コマにする */}
              <div
                className="relative aspect-square md:aspect-[3/4] overflow-hidden border-b-[4px] border-[#111] bg-no-repeat [background-size:var(--s)_auto] [background-position:var(--p)] md:[background-size:var(--s-pc)_auto] md:[background-position:var(--p-pc)]"
                style={{ backgroundImage: `url(${comicIllust('josys-concerns')})`, '--s': concernArt[i].size, '--p': concernArt[i].pos, '--s-pc': concernArt[i].pcSize, '--p-pc': concernArt[i].pcPos } as React.CSSProperties}
                aria-hidden="true"
              >
                <SfxText text={concernArt[i].sfx} color={concernArt[i].color} className={`text-[36px] ${concernArt[i].spAt}`} rotate={concernArt[i].tilt} delay={0.3} />
              </div>
              <div className="flex items-start gap-4 p-5 md:p-6">
                <IconTile icon={<item.icon className="w-6 h-6" aria-hidden="true" />} num={i + 1} bg="bg-svc-josys" className="pop-wiggle shrink-0" />
                <div>
                  <h3 className="font-manga text-[21px] md:text-[22px] leading-snug [word-break:auto-phrase]">{item.title}</h3>
                  <p className="mt-2 text-[15px] font-bold leading-relaxed text-sumi [word-break:auto-phrase]">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* サービス：青い地に、絵のコマと説明のコマを並べた4段のコミック。段ごとに左右を入れ替える */}
    <section id="services" className="relative py-20 md:py-28 bg-svc-josys comic-dots-light border-y-[4px] border-[#111] scroll-mt-24 overflow-x-clip">
      <div className="absolute inset-0 comic-speed [--speed:rgb(255_255_255/0.12)]" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="Our Services" enTone="bg-mustard text-[#111]" title={<>Total <Mark className="bg-coral">Support</Mark></>} lead="貴社のIT環境を包括的にサポート。課題に合わせて最適なソリューションを提供します。" center dark />
        <div className="flex flex-col gap-14 md:gap-16">
          {offerings.map((item, index) => {
            const art = offeringArt[index];
            const flip = index % 2 === 1;
            return (
              <article key={item.title} className="pop-reveal group grid md:grid-cols-[5fr_6fr] gap-5 md:gap-6 items-stretch" style={{ animationDelay: `${index * 60}ms` }}>
                {/* 絵のコマ */}
                <div className={`relative ${flip ? 'md:order-2 md:rotate-[1.2deg]' : 'md:-rotate-[1.2deg]'}`}>
                  <div className={`relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[340px] overflow-hidden bg-white ${panel}`}>
                    <img src={comicIllust(art.img)} alt="" className={`absolute inset-0 w-full h-full object-cover ${art.pos ?? 'object-[50%_40%]'} transition-transform duration-300 group-hover:scale-105`} loading="lazy" />
                    <SfxText text={art.sfx} color="#F2B544" className={`text-[clamp(30px,7vw,44px)] md:text-[clamp(28px,3vw,44px)] ${art.at}`} rotate={art.tilt} delay={0.4} />
                  </div>
                  {/* コミックの号数のような番号の札 */}
                  <span className={`absolute -top-5 ${flip ? '-right-2 md:-right-4 rotate-3' : '-left-2 md:-left-4 -rotate-3'} flex flex-col items-center border-[3px] border-[#111] px-3 pt-1 pb-0.5 font-comic leading-none text-[#111] bg-mustard shadow-[3px_3px_0_#111]`} aria-hidden="true">
                    <span className="text-[11px] tracking-[0.2em]">ISSUE</span>
                    <span className="text-[30px]">No.{index + 1}</span>
                  </span>
                </div>
                {/* 説明のコマ */}
                <div className={`relative bg-[#FAF3E0] p-6 pt-9 md:p-9 md:pt-11 ${panel} ${flip ? 'md:order-1' : ''}`}>
                  <Caption tone="bg-svc-josys text-white" className={`absolute -top-4 ${flip ? 'right-4 rotate-2' : 'left-4 -rotate-2'}`}>
                    <span className="font-comic font-normal text-[18px] md:text-[20px] leading-none tracking-[0.08em]">{item.title}</span>
                  </Caption>
                  <h3 className="font-manga text-[24px] md:text-[30px] leading-snug [word-break:auto-phrase]">{item.sub}</h3>
                  <p className="mt-4 text-[15px] leading-[1.9] text-sumi">{item.desc}</p>
                  <ul className="mt-6 pt-6 border-t-[3px] border-dashed border-[#111]/30 space-y-3">
                    {item.points.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm font-bold leading-relaxed">
                        <span className="shrink-0 mt-0.5 w-5 h-5 grid place-items-center border-2 border-[#111] text-white bg-svc-josys">
                          <Check className="w-3 h-3" strokeWidth={4} aria-hidden="true" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    {/* サービスの名前を流すテープ */}
    <Ticker items={offerings.map((item) => item.sub)} tone="bg-[#111] text-mustard" className="-mb-4 -mt-[4px]" />

    <section className="pt-20 md:pt-28 pb-2 md:pb-4 bg-[#FAF3E0] comic-dots">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="Pricing" enClass={service.text} title="プラン一覧" lead="スポット対応から包括的なIT運用まで。貴社の規模や課題に合わせた最適なサポートプランをご提供します" center />
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-6 items-stretch pt-4">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} index={i} service="josys" plan={{ ...plan, prefix: '月額', amount: plan.price.replace(/万円~$/, ''), unit: '万円〜', priceNote: '税抜' }} />
          ))}
        </div>
        {/* 注意書き：ナレーションの箱を上の辺にまたがせた白いコマ */}
        <div className="pop-reveal relative mt-14 bg-white border-[3px] border-[#111] shadow-[5px_5px_0_#111] px-5 pt-8 pb-5 md:px-7 text-sm font-bold text-sumi leading-[1.9] space-y-2">
          <Caption className="absolute -top-4 left-4 -rotate-2 font-comic tracking-[0.08em] text-[16px] md:text-[17px]">NOTE</Caption>
          <p>※料金は税抜です。企業規模や対応範囲に応じてカスタマイズ可能です。</p>
          <p>※東海エリアは訪問にも対応します。</p>
        </div>
      </div>
    </section>

    <ContactCta
      title={<span className="[word-break:auto-phrase]">ITの悩み、<br />お気軽にお聞かせください。</span>}
      body="些細なことでも構いません。代表の栗原が直接お話を伺い、貴社に合った解決策をご提案します。"
    />
  </div>
);

export default JosysNext;
