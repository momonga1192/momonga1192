import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Monitor, Plus } from 'lucide-react';
import { illust } from '../theme';
import { ContactCta, PageHeader, SectionHead, Ticker, card } from '../parts';

const steps = [
  { image: 'flow-talk', title: 'お問い合わせ', body: 'まずはフォームよりお気軽にご連絡ください。「何に困っているかうまく説明できない」という段階の、ささいなご相談でも構いません。' },
  { image: 'flow-hearing', title: '無料相談', body: '現状の課題や目標をお聞きし、どのような解決策があるかを整理します。ご訪問・オンラインのどちらでも対応します。' },
  { image: 'flow-plan', title: 'ご提案・お見積り', body: 'お客様に合ったプランとスケジュール、明確な費用をご提示します。ご納得いただけるまで調整します。' },
  { image: 'flow-support', title: 'ご契約・開始', body: '合意いただけましたら契約を締結し、スタートします。始まってからも、困ったときにすぐ相談できる距離で伴走します。' }
];

const faqs = [
  {
    q: '情シス代行とはどのようなサービスですか？',
    a: '情シス代行は、IT専任担当者がいない企業様に代わって、IT部門の役割を担うサービスです。PCトラブル対応、SaaS導入・管理、セキュリティ対策、社内ネットワーク構築など、日々のIT業務を包括的にサポートします。月額5万円〜のライトプランから、IT戦略コンサルティングを含むプレミアムプランまでご用意しています。'
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
    a: '主にTableauやPowerBIといったBIツールを活用し、経営ダッシュボードの構築やデータ分析基盤の設計を行います。代表の栗原はTableau Certified Data AnalystおよびDATA Saberの資格を保有しており、データの収集・統合から可視化・分析まで一貫してサポートします。'
  }
];

const FlowNext: React.FC = () => (
  <div className="bg-cream text-sumi overflow-x-clip">
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
      image={illust('flow-hearing')}
    />

    {/* 流れ */}
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="Process" title="ご相談から開始まで" center />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 pt-4">
          {steps.map((step, i) => (
            <li key={step.title} className={`group pop-reveal relative flex flex-col rounded-[28px] bg-cream p-6 ${card} ${i % 2 ? 'lg:rotate-[1deg]' : 'lg:-rotate-[1deg]'}`} style={{ animationDelay: `${i * 90}ms` }}>
              <span className="pop-wiggle absolute z-10 -top-5 -left-3 -rotate-6 px-4 py-1 rounded-lg bg-coral text-white font-en text-base font-black italic tracking-widest border-[2.5px] border-sumi shadow-[3px_3px_0_#1F2430]">STEP {i + 1}</span>
              <div className="aspect-square rounded-[20px] bg-white border-2 border-sumi mb-5 mt-3">
                <img src={illust(step.image)} alt="" className="pop-tilt w-full h-full object-contain p-2" loading="lazy" />
              </div>
              <h3 className="font-head text-2xl font-black">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.9] text-sumi-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <Ticker items={[...steps.map((step) => step.title), 'ご相談・お見積りは無料']} className="-my-4" />

    {/* 対応エリア */}
    <section className="py-20 md:py-28 bg-cream bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px] border-y-[2.5px] border-sumi">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="Area" title="対応エリア" center />
        <div className="grid md:grid-cols-2 gap-6">
          <div className={`group pop-reveal relative rounded-[28px] bg-white p-8 ${card}`}>
            <span className="pop-float absolute -top-5 right-6 rotate-[4deg] rounded-2xl bg-mustard px-4 py-1.5 font-head font-bold text-sm border-[2.5px] border-sumi shadow-[3px_3px_0_#1F2430]">
              <MapPin className="inline w-4 h-4 -mt-0.5 mr-1" strokeWidth={2.5} />
              東海エリアは訪問対応
            </span>
            <span className="pop-wiggle w-14 h-14 rounded-2xl bg-coral text-white grid place-items-center border-[2.5px] border-sumi shadow-[3px_3px_0_#1F2430] -rotate-6">
              <MapPin className="w-7 h-7" strokeWidth={2.2} />
            </span>
            <h3 className="font-head text-2xl font-black mt-5">訪問でのサポート</h3>
            <p className="mt-3 leading-[1.9] text-sumi-muted">東海エリアは訪問にも対応しています。リモートで対応できる業務は、エリアを問わずご相談ください。</p>
          </div>
          <div className={`group pop-reveal rounded-[28px] bg-white p-8 ${card}`} style={{ animationDelay: '90ms' }}>
            <span className="pop-wiggle w-14 h-14 rounded-2xl bg-svc-josys text-white grid place-items-center border-[2.5px] border-sumi shadow-[3px_3px_0_#1F2430] -rotate-6">
              <Monitor className="w-7 h-7" strokeWidth={2.2} />
            </span>
            <h3 className="font-head text-2xl font-black mt-5">オンラインでのサポート</h3>
            <p className="mt-3 leading-[1.9] text-sumi-muted">リモートで対応できる業務は、エリアを問わずご相談いただけます。打ち合わせもオンラインで行えます。</p>
          </div>
        </div>
      </div>
    </section>

    {/* よくあるご質問 */}
    <section id="faq" className="py-20 md:py-28 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-5">
        <SectionHead en="FAQ" title="よくあるご質問" center />
        <div className="space-y-5">
          {faqs.map((item, i) => (
            <details key={item.q} className="group pop-reveal rounded-[24px] bg-white border-[2.5px] border-sumi shadow-[4px_4px_0_#1F2430]" style={{ animationDelay: `${i * 70}ms` }} open={i === 0}>
              <summary className="flex items-center gap-4 p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="pop-wiggle grid place-items-center w-9 h-9 shrink-0 -rotate-6 rounded-xl bg-svc-josys text-white font-en font-black italic text-lg border-2 border-sumi">Q</span>
                <span className="flex-1 font-head font-black text-[16px] md:text-[18px] leading-relaxed">{item.q}</span>
                <span className="w-8 h-8 shrink-0 rounded-full bg-mustard border-2 border-sumi grid place-items-center group-open:rotate-45 transition-transform">
                  <Plus className="w-4 h-4" strokeWidth={3} />
                </span>
              </summary>
              <div className="flex gap-4 px-6 pb-6">
                <span className="grid place-items-center w-9 h-9 shrink-0 -rotate-6 rounded-xl bg-coral text-white font-en font-black italic text-lg border-2 border-sumi">A</span>
                <p className="flex-1 pt-1 leading-[1.9] text-sumi-muted">{item.a}</p>
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
