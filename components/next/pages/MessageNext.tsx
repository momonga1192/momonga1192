import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { ContactCta, Mark, PageHeader, SectionHead, Sparkle, comicBtn, comicIllust } from '../parts';
import { Caption, panel } from '../comic';

const career = [
  {
    title: '外資系自動車メーカー日本法人',
    role: 'Data Engineer',
    body: '大規模なデータ基盤の構築に従事。',
    color: 'bg-svc-josys'
  },
  {
    title: '食品製造業',
    role: 'DX Promoter',
    body: '全社的なDX推進プロジェクトをリード。現場の業務フロー改善からデータ分析環境の整備まで幅広く従事。',
    color: 'bg-svc-data'
  },
  {
    title: 'ITコンサルティング会社',
    role: 'IT Consultant',
    body: 'ITコンサルタントとして、企業のIT・データ活用の支援に従事。',
    color: 'bg-svc-ai'
  },
  {
    title: 'IT・DX Consultant (Freelance)',
    role: 'Owner',
    body: '数多くの中堅・中小企業のDX推進を支援。',
    color: 'bg-svc-web'
  }
];

const specialties = ['DX Strategy', 'Data Engineering', 'AWS Cloud', 'Tableau', 'Generative AI'];
const certifications = [
  'AWS All Certificate',
  'Tableau Certified Data Analyst',
  'Knight of DATA Saber',
  'PMP（米国PMI認定 プロジェクトマネジメント・プロフェッショナル）',
  'freee認定 会計上級エキスパート',
  'freee認定 人事労務エキスパート'
];

// 吹き出しの尾（白い三角＋黒い線）。スマホは上のプロフィールへ、PCは左のプロフィールへ向ける
const BubbleTail: React.FC<{ className: string }> = ({ className }) => (
  <svg viewBox="0 0 40 30" className={`absolute w-10 h-8 ${className}`} aria-hidden="true">
    <path d="M8 0 L14 28 L26 0" fill="#fff" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
    <rect x="6" y="-6" width="22" height="7" fill="#fff" />
  </svg>
);

const MessageNext: React.FC = () => (
  <div className="bg-[#FAF3E0] text-sumi overflow-x-clip">
    <Helmet>
      <title>代表あいさつ・経歴 | 事業者概要 - Arcle</title>
      <meta name="description" content="Arcle代表 栗原勇太のあいさつと経歴。データエンジニア・DX推進の経験をもとに、中小企業のIT・データ活用を支援しています。" />
      <link rel="canonical" href="https://www.arcle.net/company/message" />
    </Helmet>

    <PageHeader
      en="Message"
      title="代表あいさつ"
      crumbs={[{ label: '事業者概要', href: '/company' }, { label: '代表あいさつ' }]}
      image={comicIllust('company-identity')}
      imageMode="panel"
    />

    <section className="py-20 md:py-28 bg-white comic-dots">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 grid lg:grid-cols-[340px_1fr] gap-14 lg:gap-16 items-start">
        {/* プロフィールのカード（登場人物紹介のコマ） */}
        <div className="lg:sticky lg:top-28">
          <div className={`pop-reveal group relative mx-auto max-w-[340px] bg-[#FAF3E0] -rotate-1 ${panel}`}>
            <div className="relative aspect-square overflow-hidden border-b-[4px] border-[#111] bg-white">
              <img
                src="/images/Gemini_Generated_Image_guortkguortkguor.png"
                alt="Arcle代表 栗原勇太のプロフィール写真"
                className="absolute inset-0 w-full h-full object-cover object-[50%_16%] scale-[1.12] origin-[50%_20%] transition-transform duration-300 group-hover:scale-[1.17]"
              />
            </div>
            <Sparkle className="absolute -right-4 -top-4 w-10 h-10 text-mustard" />
            <div className="relative px-5 pb-7 text-center">
              <p className="-mt-4 inline-block -rotate-3 px-3 py-1 bg-svc-josys text-white font-comic text-[16px] tracking-[0.1em] border-[3px] border-[#111] shadow-[3px_3px_0_#111]">Data &amp; IT Consultant</p>
              <p className="mt-4 font-manga text-[34px] leading-tight">栗原 勇太</p>
              <p className="font-comic text-[20px] tracking-[0.14em] text-svc-josys">Yuta Kurihara</p>
              <ul className="mt-5 flex flex-wrap justify-center gap-2">
                {specialties.map((tag) => (
                  <li key={tag} className="text-xs font-bold px-2.5 py-1 bg-white border-2 border-[#111] shadow-[2px_2px_0_#111]">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <span className="inline-block -rotate-3 bg-coral border-[3px] border-[#111] px-4 pt-1.5 pb-1 font-comic text-xl md:text-2xl tracking-[0.06em] text-white shadow-[4px_4px_0_#111]">MESSAGE</span>
          <h2 className="font-manga text-[28px] md:text-[44px] leading-[1.4] mt-5 text-[#111] comic-outline-white [word-break:auto-phrase]">
            データとITの力で、
            <br />
            企業の<Mark>ポテンシャルを解放</Mark>する。
          </h2>

          {/* あいさつ：ひとことの吹き出し＋本文のコマ */}
          <div className="pop-reveal relative mt-12 md:mt-10 inline-block max-w-full bg-white border-[3px] border-[#111] shadow-[4px_4px_0_#111] rounded-[50%] px-8 py-5 md:px-10">
            <BubbleTail className="lg:hidden -top-[25px] left-[20%] rotate-180" />
            <BubbleTail className="hidden lg:block top-1/2 -left-[27px] -translate-y-1/2 rotate-90" />
            <p className="relative font-manga text-[17px] md:text-[20px] leading-[1.5] text-[#111] [word-break:auto-phrase]">はじめまして。Arcle代表の栗原です。</p>
          </div>
          <div className={`pop-reveal relative mt-8 bg-[#FAF3E0] px-6 py-6 md:px-9 md:py-8 space-y-5 text-[16px] leading-[2.05] font-bold text-sumi border-[3px] border-[#111] shadow-[6px_6px_0_#111]`} style={{ animationDelay: '120ms' }}>
            <p>これまで企業のITやデータ活用に携わる中で、「IT担当者がいれば…」「蓄積されたデータをうまく使えれば…」という場面を数多く見てきました。</p>
            <p>
              中小企業や個人事業主の方こそ、最新のテクノロジーを味方につけることで、その独自性を武器に大きく成長できると確信しています。私の経験が、日々挑戦を続ける皆様の課題解決の一助となれば幸いです。
            </p>
          </div>

          {/* 経歴：これまでの話を、番号付きのコマで順に読む */}
          <div className="mt-20">
            <SectionHead en="Biography" title="経歴" enTone="bg-svc-josys text-white" />
            <ol className="-mt-4 md:-mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-10">
              {career.map((item, i) => (
                <li
                  key={item.title}
                  className={`pop-reveal relative flex flex-col bg-white border-[3px] border-[#111] shadow-[6px_6px_0_#111] ${i % 2 ? 'sm:rotate-[0.8deg]' : 'sm:-rotate-[0.8deg]'}`}
                  style={{ animationDelay: `${(i % 2) * 110}ms` }}
                >
                  <div className={`relative overflow-hidden border-b-[3px] border-[#111] px-5 pt-4 pb-3 ${item.color}`}>
                    <span className="absolute inset-0 comic-dots-light" aria-hidden="true" />
                    <p className="relative flex items-baseline justify-between gap-3 font-comic leading-none text-white">
                      <span className="text-[15px] tracking-[0.18em]">CHAPTER</span>
                      <span className="text-[34px] [paint-order:stroke_fill] [-webkit-text-stroke:5px_#111] [text-shadow:3px_3px_0_#111]">{i + 1}</span>
                    </p>
                  </div>
                  <div className="flex-1 px-5 pt-4 pb-5">
                    <p className="font-manga text-[19px] md:text-[20px] leading-snug [word-break:auto-phrase]">{item.title}</p>
                    <p className="mt-1 font-comic text-[17px] tracking-[0.1em] text-sumi-muted">{item.role}</p>
                    <p className="mt-2 leading-[1.9] text-[15px] text-sumi">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* 保有資格 */}
          <div className={`pop-reveal relative mt-16 bg-mustard comic-dots px-5 pt-10 pb-6 md:px-8 md:pb-8 ${panel}`}>
            <Caption tone="bg-white text-[#111]" className="absolute -top-5 left-4 -rotate-2 text-[17px] md:text-[20px]">
              保有資格
            </Caption>
            <ul className="flex flex-wrap gap-3">
              {certifications.map((c, i) => (
                <li key={c} className={`pop-wiggle px-3.5 py-2 bg-white border-[3px] border-[#111] shadow-[3px_3px_0_#111] text-sm font-bold ${i % 2 ? 'rotate-1' : '-rotate-1'}`}>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <a href="/company" className={`mt-12 ${comicBtn} bg-white text-[#111]`}>
            <ArrowLeft className="w-5 h-5" strokeWidth={3} />
            事業者概要に戻る
          </a>
        </div>
      </div>
    </section>

    <ContactCta />
  </div>
);

export default MessageNext;
