import React, { useState } from 'react';
import { ArrowRight, Check, ChevronDown, ChevronRight } from 'lucide-react';
import { services, type ServiceKey } from '../next/theme';
import { Burst, Caption, SfxText, panel } from '../next/comic';
import { comicBtn, comicIllust, IconTile } from '../next/parts';

// 広告用LP（components/lp/*.tsx）のアメコミ版の部品。トップ（HomeComic.tsx）と同じコミックの1冊に見えるようにそろえる。
// 表紙（LpHero）→ お悩みのコマ（LpPains）→ 解決の見開き（LpSolutions）→ 料金・流れ → Q&A（LpFaq）→ ContactCta の順に使う

const svc = (key: ServiceKey) => services.find((s) => s.key === key) ?? services[0];

// 事業色の集中線（濃い色・少し明るい色）
const rays: Record<ServiceKey, [string, string]> = {
  josys: ['#3B6FE0', '#4A7DEA'],
  data: ['#5B5BD6', '#6A6AE0'],
  ai: ['#8E5BD0', '#9A69DA'],
  web: ['#C8509F', '#D25EAA']
};
const rayStyle = (key: ServiceKey) => ({ '--ray-a': rays[key][0], '--ray-b': rays[key][1] }) as React.CSSProperties;
// 背景のスピード線も事業の色にする
const speedStyle = (key: ServiceKey) => ({ '--speed': `${rays[key][0]}40` }) as React.CSSProperties;

// 見出し（ComicHead と同じ形。lead に改行入りの要素を渡せる）
export const LpHead: React.FC<{ en: string; title: React.ReactNode; lead?: React.ReactNode; service: ServiceKey; center?: boolean; dark?: boolean }> = ({
  en,
  title,
  lead,
  service,
  center = true,
  dark
}) => (
  <div className={`pop-reveal mb-12 md:mb-16 ${center ? 'text-center' : ''}`}>
    <span className={`inline-block -rotate-3 border-[3px] border-[#111] px-4 pt-1.5 pb-1 font-comic text-xl md:text-2xl tracking-[0.06em] uppercase text-white shadow-[4px_4px_0_#111] ${svc(service).bg}`}>{en}</span>
    <h2
      className={`font-manga text-[28px] md:text-[44px] leading-[1.35] mt-5 [word-break:auto-phrase] [paint-order:stroke_fill] ${
        dark ? 'text-white [-webkit-text-stroke:6px_#111] [text-shadow:4px_4px_0_#111]' : 'text-[#111] [-webkit-text-stroke:6px_#fff] [text-shadow:4px_4px_0_#F2B544]'
      }`}
    >
      {title}
    </h2>
    {lead && <p className={`mt-4 leading-[1.9] font-bold [word-break:auto-phrase] max-w-2xl ${center ? 'mx-auto' : ''} ${dark ? 'text-white/85' : 'text-sumi'}`}>{lead}</p>}
  </div>
);

// 表紙：事件のコマ（新しい絵）に、傾いた見出しのコマを重ねる。リードは白いナレーションの箱、その下に大きな相談ボタン
export const LpHero: React.FC<{
  en: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  crumb: string;
  service: ServiceKey;
  image: string;
  alt: string;
  imgPos?: string;
  sfx?: { text: string; color: string; at: string; tilt?: number };
}> = ({ en, title, lead, crumb, service, image, alt, imgPos = 'object-[92%_50%] sm:object-center', sfx }) => {
  const s = svc(service);
  return (
    <section className="relative overflow-hidden comic-dots bg-[#FAF3E0] border-b-[4px] border-[#111]">
      <div className="absolute inset-0 comic-speed" style={speedStyle(service)} aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-16 md:pt-8 md:pb-24">
        <nav aria-label="パンくずリスト" className="flex flex-wrap items-center gap-1 text-xs font-bold text-sumi mb-6 md:mb-8">
          <a href="/" className="bg-white border-2 border-[#111] px-2 py-0.5 hover:bg-mustard">
            ホーム
          </a>
          <ChevronRight className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" />
          <span className="px-1 py-0.5">{crumb}</span>
        </nav>

        <div className="relative flex flex-col lg:grid lg:grid-cols-[44%_56%] lg:items-center">
          {/* 事件のコマ。スマホは上に、PCは右に置く */}
          <div className="pop-reveal relative order-first lg:order-none lg:col-start-2 lg:row-start-1 lg:rotate-[1.2deg]">
            {/* 絵の左端は見出しのコマを重ねるための余白なので、スマホは右寄せで切り詰めて絵を大きく見せる */}
            <div className={`group relative aspect-[5/4] sm:aspect-[3/2] overflow-hidden bg-white ${panel} shadow-[10px_10px_0_#111]`}>
              <img src={image} alt={alt} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${imgPos}`} />
              {sfx && (
                <span className="pop-reveal absolute inset-0 block">
                  <SfxText text={sfx.text} color={sfx.color} className={`text-[clamp(28px,7vw,56px)] ${sfx.at}`} rotate={sfx.tilt ?? -10} delay={0.5} />
                </span>
              )}
            </div>
          </div>

          {/* 見出しのコマ＋リード＋ボタン。スマホは絵の下に少し重ね、PCは絵の左に重ねる */}
          <div className="relative z-10 -mt-10 sm:-mt-14 lg:mt-0 lg:col-start-1 lg:row-start-1 lg:-mr-20">
            <div className={`pop-reveal relative mx-1 sm:mx-6 lg:mx-0 -rotate-2 comic-rays [--ray-a:#F2B544] [--ray-b:#F6C35F] px-5 pt-9 pb-8 sm:px-9 sm:pt-11 sm:pb-10 ${panel} shadow-[10px_10px_0_#111]`}>
              <Caption tone={`${s.bg} text-white`} className="absolute -top-5 left-3 sm:left-5 -rotate-2">
                <span className="font-comic font-normal text-[18px] md:text-[22px] leading-none tracking-[0.08em] uppercase">{en}</span>
              </Caption>
              <h1 className="font-manga text-white text-[27px] sm:text-[38px] lg:text-[36px] xl:text-[44px] leading-[1.42] [paint-order:stroke_fill] [-webkit-text-stroke:8px_#111] [text-shadow:5px_5px_0_#111] [word-break:auto-phrase]">
                {title}
              </h1>
              <Burst
                text={
                  <>
                    相談
                    <br />
                    無料!
                  </>
                }
                className="w-[88px] sm:w-[112px] -bottom-11 -right-3 sm:-right-7"
                fill="#fff"
                core={rays[service][0]}
                textClass="font-manga text-[16px] sm:text-[20px] text-center text-white [-webkit-text-stroke:5px_#111]"
                rotate={14}
                delay={0.45}
              />
            </div>
            <div className="pop-reveal mt-10 mx-1 sm:mx-6 lg:mx-0 lg:mr-24 xl:mr-28" style={{ animationDelay: '120ms' }}>
              <div className="bg-white border-[3px] border-[#111] shadow-[5px_5px_0_#111] px-5 py-4 text-[15px] md:text-[16px] leading-[1.95] font-bold text-sumi [word-break:auto-phrase]">{lead}</div>
              <a href="/contact" className={`mt-7 ${comicBtn} bg-coral text-white text-[18px] px-8 py-[18px] w-full sm:w-auto`}>
                無料で相談する
                <ArrowRight className="w-5 h-5" strokeWidth={3} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 吹き出し（文章の流れの中に置く版）。尾は上の辺から出し、上のコマの話し手に向ける。at は尾の位置%
const TalkUp: React.FC<{ children: React.ReactNode; at?: number; className?: string }> = ({ children, at = 30, className = '' }) => (
  <div className={`relative bg-white border-[3px] border-[#111] rounded-[46%] shadow-[4px_4px_0_#111] ${className}`}>
    <svg viewBox="0 0 40 30" className="absolute -top-[25px] w-10 h-8 -translate-x-1/2" style={{ left: `${at}%` }} aria-hidden="true">
      <path d="M8 30 L22 2 L28 30" fill="#fff" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
      <rect x="5" y="27" width="26" height="6" fill="#fff" />
    </svg>
    {children}
  </div>
);

// お悩み：黒い帯の見出し＋3つのコマ。コマの絵の中の人が、下の吹き出しでお悩みを口にする
export type Pain = { img: string; title: React.ReactNode; desc?: string; imgPos?: string; tail?: number; shout?: { text: string; color: string; at: string; tilt?: number; mood?: 'shake' | 'droop' } };
export const LpPains: React.FC<{ en: string; items: Pain[] }> = ({ en, items }) => (
  <section className="pt-24 pb-20 md:pt-32 md:pb-28 bg-mustard comic-dots overflow-x-clip">
    <div className="pop-reveal relative -rotate-1 bg-[#111] py-4 md:py-6 mb-14 md:mb-20 border-y-[4px] border-white">
      <Caption tone="bg-white text-[#111]" className="absolute -top-5 left-1/2 -translate-x-1/2 rotate-2 font-comic font-normal tracking-[0.1em] uppercase text-[16px] md:text-[18px]">
        {en}
      </Caption>
      <h2 className="text-center font-manga text-white text-[24px] sm:text-[34px] md:text-[46px] leading-tight px-3">
        こんな<span className="mx-1 text-mustard text-[1.4em] [text-shadow:4px_4px_0_#F07A5A]">お悩み</span>
        <br className="sm:hidden" />
        ありませんか？
      </h2>
    </div>
    <div className="max-w-6xl mx-auto px-4 sm:px-5 grid md:grid-cols-3 gap-12 md:gap-7">
      {items.map((p, i) => (
        <div key={i} style={{ animationDelay: `${i * 120}ms` }} className={`pop-reveal relative flex flex-col bg-white ${panel} ${['md:-rotate-[1.2deg]', 'md:rotate-[0.8deg] md:mt-6', 'md:-rotate-[0.6deg]'][i % 3]}`}>
          <div className="relative aspect-[4/3] overflow-hidden border-b-[4px] border-[#111]">
            <img src={comicIllust(p.img)} alt="" className={`absolute inset-0 w-full h-full object-cover ${p.imgPos ?? 'object-center'}`} loading="lazy" />
            {p.shout && <SfxText text={p.shout.text} color={p.shout.color} mood={p.shout.mood} className={`text-[clamp(26px,7vw,36px)] md:text-[30px] lg:text-[34px] ${p.shout.at}`} rotate={p.shout.tilt ?? -8} delay={0.4 + i * 0.15} />}
            <span className="absolute left-2 top-2 -rotate-3 border-[3px] border-[#111] bg-mustard px-2 pt-0.5 font-comic text-[20px] leading-tight text-[#111] shadow-[2px_2px_0_#111]">#{i + 1}</span>
          </div>
          <div className="px-4 pb-6 flex flex-col flex-1">
            <TalkUp at={p.tail ?? 30} className="-mt-7 px-5 py-4 text-center">
              <h3 className="font-manga text-[17px] md:text-[17px] lg:text-[19px] leading-[1.5] text-[#111] whitespace-pre-line [word-break:auto-phrase]">{p.title}</h3>
            </TalkUp>
            {p.desc && <p className="mt-5 text-[14px] md:text-[15px] leading-[1.85] font-bold text-sumi">{p.desc}</p>}
          </div>
        </div>
      ))}
    </div>
  </section>
);

// 解決：見出し → ヒーロー登場の大ゴマ → 4つの番号付きのコマ（事業色の集中線の帯に英字のタイトル）
export type Solution = { icon: React.ElementType; title: string; titleEn: string; desc: string; points: string[] };
export const LpSolutions: React.FC<{
  en: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  service: ServiceKey;
  splash: string;
  splashAlt: string;
  splashPos?: string;
  splashSfx?: { text: string; color: string; at: string; tilt?: number };
  items: Solution[];
}> = ({ en, title, lead, service, splash, splashAlt, splashPos = 'object-center', splashSfx, items }) => {
  const s = svc(service);
  return (
    <section className="relative py-20 md:py-28 bg-[#FAF3E0] comic-dots overflow-x-clip">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <LpHead en={en} title={title} lead={lead} service={service} />

        {/* ヒーロー登場の大ゴマ */}
        <div className="pop-reveal relative mb-16 md:mb-20 md:-rotate-[0.6deg]">
          <Caption className="absolute z-20 -top-4 left-4 -rotate-2 font-comic font-normal tracking-[0.1em] text-[16px] md:text-[20px]">TO THE RESCUE!</Caption>
          <div className={`relative aspect-[3/2] md:aspect-[21/9] overflow-hidden bg-white ${panel}`}>
            <img src={comicIllust(splash)} alt={splashAlt} className={`absolute inset-0 w-full h-full object-cover ${splashPos}`} loading="lazy" />
            {splashSfx && (
              <span className="pop-reveal absolute inset-0 block">
                <SfxText text={splashSfx.text} color={splashSfx.color} className={`text-[clamp(28px,6vw,60px)] ${splashSfx.at}`} rotate={splashSfx.tilt ?? -8} delay={0.4} />
              </span>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-x-9 md:gap-y-12">
          {items.map((item, i) => (
            <article key={item.title} style={{ animationDelay: `${(i % 2) * 120}ms` }} className={`pop-reveal relative flex flex-col bg-white ${panel} ${i % 2 ? 'md:rotate-[0.7deg] md:translate-y-6' : 'md:-rotate-[0.7deg]'}`}>
              <div className="relative overflow-hidden comic-rays border-b-[4px] border-[#111] px-5 pt-6 pb-5 sm:px-7 flex items-center gap-5" style={rayStyle(service)}>
                <IconTile icon={<item.icon className="w-7 h-7" strokeWidth={2.4} />} num={i + 1} bg="bg-white text-[#111]!" className="shrink-0" />
                <p className="font-comic text-[34px] sm:text-[40px] leading-none tracking-[0.03em] text-white [paint-order:stroke_fill] [-webkit-text-stroke:6px_#111] [text-shadow:3px_3px_0_#111] uppercase">{item.titleEn}</p>
              </div>
              <div className="p-6 sm:p-7 flex flex-col flex-1">
                <h3 className="self-start -rotate-1 font-manga text-[20px] md:text-[22px] leading-snug bg-mustard border-[3px] border-[#111] px-3 py-1 shadow-[3px_3px_0_#111] [word-break:auto-phrase]">{item.title}</h3>
                <p className="mt-5 text-[15px] leading-[1.9] text-sumi">{item.desc}</p>
                <ul className="mt-5 space-y-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-[14px] md:text-[15px] font-bold leading-relaxed">
                      <span className={`shrink-0 mt-0.5 w-5 h-5 grid place-items-center border-2 border-[#111] text-white ${s.bg}`}>
                        <Check className="w-3 h-3" strokeWidth={4} aria-hidden="true" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// 料金・流れのセクションの地（白い網点）。料金のカードは parts.tsx の PlanCard を使う
export const LpSection: React.FC<{ children: React.ReactNode; tone?: string; className?: string }> = ({ children, tone = 'bg-white comic-dots', className = '' }) => (
  <section className={`relative py-20 md:py-28 border-t-[4px] border-[#111] overflow-x-clip ${tone} ${className}`}>
    <div className="max-w-6xl mx-auto px-4 sm:px-5">{children}</div>
  </section>
);

export const LpNotes: React.FC<{ notes: string[] }> = ({ notes }) => (
  <div className="pop-reveal mt-14 flex flex-col items-center gap-2">
    {notes.map((n) => (
      <p key={n} className="bg-white border-2 border-[#111] px-3 py-1 text-xs font-bold text-sumi">
        {n}
      </p>
    ))}
  </div>
);

// 導入の流れ：コミックの4コマ。STEPの番号を英字で大きく、コマの間に矢印
export const LpFlow: React.FC<{ service: ServiceKey; items: { step: string; title: string; desc: string }[] }> = ({ service, items }) => {
  const s = svc(service);
  return (
    <ol className="grid lg:grid-cols-4 gap-12 lg:gap-6">
      {items.map((item, i) => (
        <li key={item.step} style={{ animationDelay: `${i * 110}ms` }} className={`pop-reveal relative flex flex-col bg-[#FAF3E0] ${panel} ${i % 2 ? 'lg:rotate-[1deg] lg:mt-8' : 'lg:-rotate-[1deg]'}`}>
          <div className={`relative border-b-[4px] border-[#111] px-5 pt-4 pb-3 ${s.bg} overflow-hidden`}>
            <span className="absolute inset-0 comic-dots-light" aria-hidden="true" />
            <p className="relative font-comic text-white leading-none tracking-[0.04em] [paint-order:stroke_fill] [-webkit-text-stroke:5px_#111] [text-shadow:3px_3px_0_#111]">
              <span className="text-[20px] mr-2">STEP</span>
              <span className="text-[52px] text-mustard">{item.step}</span>
            </p>
          </div>
          <div className="p-5 sm:p-6 flex-1">
            <h3 className="font-manga text-[21px] leading-snug [word-break:auto-phrase]">{item.title}</h3>
            <p className="mt-3 text-[14px] md:text-[15px] leading-[1.85] text-sumi">{item.desc}</p>
          </div>
          {i < items.length - 1 && (
            <span className="absolute z-10 left-1/2 -bottom-[42px] -translate-x-1/2 rotate-90 lg:rotate-0 lg:left-auto lg:translate-x-0 lg:-right-[30px] lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 grid place-items-center w-9 h-9 bg-mustard border-[3px] border-[#111] shadow-[2px_2px_0_#111]" aria-hidden="true">
              <ArrowRight className="w-5 h-5" strokeWidth={3.5} />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
};

// よくある質問：お客さまの顔＋質問の箱、ヒーローの顔＋答えの吹き出し。accordion のときは質問を押して開く（1つずつ）
const askers = ['data-face-blonde', 'data-face-boss', 'data-face-man', 'data-face-bob'];
const Face: React.FC<{ src: string; hero?: boolean }> = ({ src, hero }) => (
  <span className={`shrink-0 relative w-12 h-12 sm:w-14 sm:h-14 overflow-hidden border-[3px] border-[#111] shadow-[3px_3px_0_#111] ${hero ? 'comic-rays [--ray-a:#F2B544] [--ray-b:#F6C35F] rotate-3' : 'bg-white -rotate-3'}`} aria-hidden="true">
    <img src={src} alt="" className={hero ? 'absolute left-1/2 top-[-6%] w-[230%] max-w-none -translate-x-[48%]' : 'absolute inset-0 w-full h-full object-cover'} loading="lazy" />
  </span>
);

export const LpFaq: React.FC<{ items: { q: string; a: string }[]; service: ServiceKey; accordion?: boolean; faceOffset?: number }> = ({ items, service, accordion, faceOffset = 0 }) => {
  const [open, setOpen] = useState<number | null>(null);
  const s = svc(service);
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {items.map((item, i) => {
        const shown = !accordion || open === i;
        const question = (
          <>
            <Face src={comicIllust(askers[(i + faceOffset) % askers.length])} />
            <span className="flex-1 min-w-0 flex items-center gap-3 bg-white border-[3px] border-[#111] shadow-[4px_4px_0_#111] px-4 py-3 sm:px-5 sm:py-4 text-left">
              <span className={`shrink-0 grid place-items-center w-8 h-8 -rotate-6 border-2 border-[#111] font-comic text-[22px] leading-none text-white ${s.bg}`} aria-hidden="true">Q</span>
              <span className="flex-1 font-manga text-[15px] sm:text-[17px] leading-[1.55] text-[#111] [word-break:auto-phrase]">{item.q}</span>
              {accordion && <ChevronDown className={`shrink-0 w-5 h-5 transition-transform duration-300 ${shown ? 'rotate-180' : ''}`} strokeWidth={3} aria-hidden="true" />}
            </span>
          </>
        );
        return (
          <div key={item.q} style={{ animationDelay: `${i * 90}ms` }} className="pop-reveal">
            {accordion ? (
              <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={shown} className="w-full flex items-center gap-3 sm:gap-4 transition-transform hover:-translate-y-0.5">
                {question}
              </button>
            ) : (
              <h3 className="flex items-center gap-3 sm:gap-4">{question}</h3>
            )}
            <div className={`grid transition-all duration-300 ${shown ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <div className="flex items-end gap-3 sm:gap-4 pt-5 pl-8 sm:pl-16 pb-2 pr-1">
                  <div className="relative flex-1 min-w-0 rounded-[28px] bg-white border-[3px] border-[#111] shadow-[4px_4px_0_#111] px-5 py-4 sm:px-6">
                    <p className="text-[14px] sm:text-[15px] leading-[1.85] font-bold text-sumi">
                      <span className="inline-grid place-items-center w-7 h-7 mr-2 align-[-0.35em] rotate-6 border-2 border-[#111] bg-coral font-comic text-[19px] leading-none text-white" aria-hidden="true">A</span>
                      {item.a}
                    </p>
                    <svg viewBox="0 0 30 30" className="absolute -right-[22px] bottom-3 w-7 h-7" aria-hidden="true">
                      <path d="M0 6 L28 20 L0 24" fill="#fff" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
                      <rect x="-6" y="4" width="8" height="22" fill="#fff" />
                    </svg>
                  </div>
                  <Face src={comicIllust('data-guide')} hero />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
