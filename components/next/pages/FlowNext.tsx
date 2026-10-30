import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowDown, ArrowRight, MapPin, Monitor, Plus } from 'lucide-react';
import { ContactCta, PageHeader, SectionHead, Ticker, comicIllust } from '../parts';
import { Bubble, Burst, Caption, SfxText, panel } from '../comic';

// ご相談の流れ（アメコミ版）。4つのステップを、お客さまとヒーローの物語の4コマとして読ませる

const steps = [
  { image: 'services-flow-step-contact', title: 'お問い合わせ', body: 'まずはフォームよりお気軽にご連絡ください。「何に困っているかうまく説明できない」という段階の、ささいなご相談でも構いません。' },
  { image: 'services-flow-step-hearing', title: '無料相談', body: '現状の課題や目標をお聞きし、どのような解決策があるかを整理します。ご訪問・オンラインのどちらでも対応します。' },
  { image: 'services-flow-step-plan', title: 'ご提案・お見積り', body: 'お客様に合ったプランとスケジュール、明確な費用をご提示します。ご納得いただけるまで調整します。' },
  { image: 'services-flow-step-start', title: 'ご契約・開始', body: '合意いただけましたら契約を締結し、スタートします。始まってからも、困ったときにすぐ相談できる距離で伴走します。' }
];

// 絵に重ねる英語の吹き出し（飾り）。at は位置、tail は尾の出る位置%、lean は尾の向き。尾は話している人に向ける
const balloons: { text: string; at: string; tail: number; lean: number; tilt: number; side?: boolean }[] = [
  { text: 'HELLO, ARCLE?', at: 'left-[6%] top-[10%]', tail: 82, lean: 0.9, tilt: -5 },
  { text: 'I SEE...', at: 'left-[52%] top-[7%]', tail: 40, lean: 0.2, tilt: 4 },
  { text: "HERE'S THE PLAN!", at: 'left-[14%] top-[7%]', tail: 50, lean: 0, tilt: -3, side: true },
  { text: "LET'S GO!", at: 'left-[44%] top-[6%]', tail: 40, lean: 0.1, tilt: 5 }
];

const faqs = [
  {
    q: '情シス代行とはどのようなサービスですか？',
    a: '情シス代行は、IT専任担当者がいない企業様に代わって、IT部門の役割を担うサービスです。PCトラブル対応、SaaS導入・管理、セキュリティ対策、社内ネットワーク構築など、日々のIT業務を包括的にサポートします。月額3万円〜のライトプランから、IT戦略コンサルティングを含むプレミアムプランまでご用意しています。'
  },
  {
    q: '対応エリアはどこですか？',
    a: '東海エリアは訪問にも対応しています。リモート対応が可能な業務については、エリアを問わずご相談いただけます。'
  },
  {
    q: '相談や見積りは無料ですか？',
    a: 'はい、初回のご相談・お見積りは無料です。お問い合わせフォームよりご連絡いただければ、通常2営業日以内に担当よりご連絡いたします。現状の課題やご要望をヒアリングし、最適なソリューションをご提案します。'
  },
  {
    q: '生成AI（ChatGPT等）の導入支援はどのような内容ですか？',
    a: 'ChatGPT Enterprise/Team版の導入支援、セキュリティポリシー・利用ガイドライン策定、社内独自AIチャットボット（RAG）開発、プロンプトエンジニアリング研修、業務プロセスへのAI組み込み・自動化など、導入から定着・独自開発まで包括的に支援します。月額5万円〜のスタータープランからご利用いただけます。'
  },
  {
    q: 'データ活用支援ではどのようなツールを使いますか？',
    a: '主にTableauやPowerBIといったBIツールを活用し、経営ダッシュボードの構築やデータ分析基盤の設計を行います。代表の栗原はTableau Certified Data AnalystおよびKnight of DATA Saberの資格を保有しており、データの収集・統合から可視化・分析まで一貫してサポートします。'
  }
];

const FlowNext: React.FC = () => (
  <div className="bg-[#FAF3E0] text-sumi overflow-x-clip">
    <Helmet>
      <title>ご相談の流れ・よくあるご質問 | Arcle（アークル）</title>
      <meta name="description" content="Arcleへのご相談の流れと、よくあるご質問。お問い合わせから無料相談、ご提案、ご契約までの流れと、対応エリアをご案内します。" />
      <link rel="canonical" href="https://www.arcle.net/flow" />
      <script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } }))
      })}</script>
    </Helmet>

    <PageHeader
      en="Flow & FAQ"
      title="ご相談の流れ"
      lead="お問い合わせからご契約まで、4つのステップでご案内します。ご相談・お見積りは無料です。"
      crumbs={[{ label: 'ご相談の流れ' }]}
      image={comicIllust('services-flow-flow-header')}
      imageMode="panel"
    />

    {/* 流れ：4コマのコミック。コマの上の辺に STEP の札をまたがせ、絵に英語の吹き出しを重ねる */}
    <section className="py-20 md:py-28 bg-white comic-dots">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="HOW IT WORKS" title="ご相談から開始まで" center />
        <ol className="grid md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-20 pt-4">
          {steps.map((step, i) => {
            const b = balloons[i];
            return (
              <li
                key={step.title}
                className={`group pop-reveal relative flex flex-col bg-[#FAF3E0] ${panel} ${i % 2 ? 'md:rotate-[1deg]' : 'md:-rotate-[1deg]'}`}
                style={{ animationDelay: `${(i % 2) * 110}ms` }}
              >
                {/* STEP の札 */}
                <span className="absolute z-20 -top-7 -left-3 sm:-left-4 -rotate-6 flex items-end gap-1.5 border-[3px] border-[#111] bg-coral px-3 pt-1 pb-0.5 font-comic leading-none text-white shadow-[4px_4px_0_#111]">
                  <span className="text-[18px] tracking-[0.12em] pb-1.5">STEP</span>
                  <span className="text-[44px] [paint-order:stroke_fill] [-webkit-text-stroke:5px_#111] [text-shadow:3px_3px_0_#111]">{i + 1}</span>
                </span>
                {i === 1 && (
                  <Burst
                    text="FREE!"
                    className="w-[96px] sm:w-[112px] -top-12 -right-4 sm:-right-6"
                    fill="#F2B544"
                    core="#3B6FE0"
                    textClass="text-white text-[26px] sm:text-[30px]"
                    rotate={12}
                    delay={0.4}
                  />
                )}
                {/* 絵のコマ */}
                <div className="relative aspect-[3/2] overflow-hidden border-b-[4px] border-[#111] bg-white">
                  <img src={comicIllust(step.image)} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                  <span className="pop-reveal absolute inset-0 block">
                    <Bubble className={`${b.at} text-[clamp(18px,5vw,26px)] md:text-[clamp(18px,2.2vw,26px)]`} tailAt={b.tail} lean={b.lean} side={b.side} rotate={b.tilt} delay={0.25}>
                      {b.text}
                    </Bubble>
                  </span>
                </div>
                {/* 説明（ナレーション） */}
                <div className="relative px-6 pt-6 pb-7 sm:px-8 flex-1">
                  <h3 className="font-manga text-[24px] md:text-[28px] leading-snug text-[#111] comic-outline-white">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.9] font-bold text-sumi">{step.body}</p>
                </div>
                {/* 次のコマへの矢印（スマホは下へ、PCは同じ段の右のコマへ） */}
                {i < steps.length - 1 && (
                  <span
                    className={`absolute z-20 grid place-items-center w-11 h-11 bg-mustard border-[3px] border-[#111] shadow-[3px_3px_0_#111] left-1/2 -translate-x-1/2 -bottom-[62px] ${
                      i % 2 === 0 ? 'md:left-auto md:translate-x-0 md:-right-[50px] lg:-right-[58px] md:bottom-auto md:top-1/2 md:-translate-y-1/2' : 'md:hidden'
                    }`}
                    aria-hidden="true"
                  >
                    <ArrowDown className="w-6 h-6 md:hidden" strokeWidth={3.5} />
                    <ArrowRight className="w-6 h-6 hidden md:block" strokeWidth={3.5} />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>

    <Ticker items={[...steps.map((step) => step.title), 'ご相談・お見積りは無料']} className="-my-4" tone="bg-[#111] text-mustard" />

    {/* 対応エリア：訪問とオンラインの2コマ */}
    <section className="py-20 md:py-28 comic-dots border-b-[4px] border-[#111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="WE COME TO YOU!" enTone="bg-svc-josys text-white" title="対応エリア" center />
        <div className="grid md:grid-cols-2 gap-12 md:gap-10">
          <div className="group pop-reveal relative flex flex-col bg-white border-[4px] border-[#111] shadow-[8px_8px_0_#111] md:-rotate-[1deg]">
            <Caption className="absolute z-20 -top-5 left-4 -rotate-2">
              <MapPin className="inline w-4 h-4 -mt-0.5 mr-1" strokeWidth={3} />
              東海エリアは訪問対応
            </Caption>
            <div className="relative aspect-[16/10] overflow-hidden border-b-[4px] border-[#111]">
              <img src={comicIllust('reason-local')} alt="" className="absolute inset-0 w-full h-full object-cover object-[50%_30%] transition-transform duration-300 group-hover:scale-105" loading="lazy" />
              <span className="pop-reveal absolute inset-0 block">
                <SfxText text="ZOOM!" color="#F2B544" className="right-[6%] top-[8%] text-[clamp(30px,8vw,48px)] md:text-[clamp(30px,3.6vw,48px)]" rotate={-8} delay={0.3} />
              </span>
            </div>
            <div className="flex gap-4 p-6 sm:p-8">
              <span className="shrink-0 grid place-items-center w-12 h-12 bg-coral text-white border-[3px] border-[#111] shadow-[3px_3px_0_#111] -rotate-6">
                <MapPin className="w-6 h-6" strokeWidth={2.6} />
              </span>
              <span className="min-w-0">
                <span className="block font-manga text-[20px] sm:text-[22px] md:text-[26px] leading-snug text-[#111] [word-break:auto-phrase]">訪問でのサポート</span>
                <span className="block mt-2 leading-[1.9] font-bold text-sumi">東海エリアは訪問にも対応しています。リモートで対応できる業務は、エリアを問わずご相談ください。</span>
              </span>
            </div>
          </div>
          <div className="group pop-reveal relative flex flex-col bg-white border-[4px] border-[#111] shadow-[8px_8px_0_#111] md:rotate-[1deg]" style={{ animationDelay: '110ms' }}>
            <div className="relative aspect-[16/10] overflow-hidden border-b-[4px] border-[#111] comic-rays [--ray-a:#3B6FE0] [--ray-b:#4A7DEA]">
              <span className="absolute inset-0 comic-focus opacity-50" aria-hidden="true" />
              <img src={comicIllust('parts/laptop-ok')} alt="" className="pop-tilt absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[92%] w-auto max-w-none" loading="lazy" />
              <span className="pop-reveal absolute inset-0 block">
                <SfxText text="ONLINE!" color="#F2B544" className="left-[6%] top-[8%] text-[clamp(28px,7.4vw,44px)] md:text-[clamp(28px,3.3vw,44px)]" rotate={-6} delay={0.4} />
              </span>
            </div>
            <div className="flex gap-4 p-6 sm:p-8">
              <span className="shrink-0 grid place-items-center w-12 h-12 bg-svc-josys text-white border-[3px] border-[#111] shadow-[3px_3px_0_#111] -rotate-6">
                <Monitor className="w-6 h-6" strokeWidth={2.6} />
              </span>
              <span className="min-w-0">
                <span className="block font-manga text-[20px] sm:text-[22px] md:text-[26px] leading-snug text-[#111] [word-break:auto-phrase]">オンラインでのサポート</span>
                <span className="block mt-2 leading-[1.9] font-bold text-sumi">リモートで対応できる業務は、エリアを問わずご相談いただけます。打ち合わせもオンラインで行えます。</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* よくあるご質問：Q の札とA の札を付けたコマ。開くと答えの箱が出る */}
    <section id="faq" className="py-20 md:py-28 scroll-mt-20 bg-white comic-dots">
      <div className="max-w-3xl mx-auto px-4 sm:px-5">
        <SectionHead en="Q & A" enTone="bg-svc-data text-white" title="よくあるご質問" center />
        <div className="space-y-6">
          {faqs.map((item, i) => (
            <details
              key={item.q}
              className="group pop-reveal bg-[#FAF3E0] border-[3px] border-[#111] shadow-[6px_6px_0_#111] open:shadow-[6px_6px_0_#F2B544,9px_9px_0_#111]"
              style={{ animationDelay: `${i * 70}ms` }}
              open={i === 0}
            >
              <summary className="flex items-center gap-4 p-5 sm:p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="grid place-items-center w-10 h-10 shrink-0 -rotate-6 bg-svc-josys text-white font-comic text-[26px] leading-none border-[3px] border-[#111] shadow-[2px_2px_0_#111]">Q</span>
                <span className="flex-1 font-manga text-[16px] md:text-[18px] leading-relaxed text-[#111] [word-break:auto-phrase]">{item.q}</span>
                <span className="w-9 h-9 shrink-0 bg-mustard border-[3px] border-[#111] grid place-items-center group-open:rotate-45 transition-transform">
                  <Plus className="w-4 h-4" strokeWidth={3.5} />
                </span>
              </summary>
              <div className="flex gap-4 px-5 pb-6 sm:px-6">
                <span className="grid place-items-center w-10 h-10 shrink-0 -rotate-6 bg-coral text-white font-comic text-[26px] leading-none border-[3px] border-[#111] shadow-[2px_2px_0_#111]">A</span>
                <p className="flex-1 min-w-0 bg-white border-[3px] border-[#111] px-4 py-3 leading-[1.9] font-bold text-sumi">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>

    <ContactCta />
  </div>
);

export default FlowNext;
