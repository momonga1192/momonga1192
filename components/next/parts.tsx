import React from 'react';
import { ArrowRight, Check, ChevronRight, Plus } from 'lucide-react';
import { services, type ServiceKey } from './theme';
import { Burst, Caption, ComicHead } from './comic';

// 下層ページの共通部品（アメコミ版）。トップの HomeComic.tsx と同じ見た目にそろえる。
// 使い方は components/next/DESIGN.md を参照

// アメコミ版のイラスト（public/images/illust-comic/ にある WebP）
export const comicIllust = (name: string) => `/images/illust-comic/${name}.webp`;

// 屋号の由来（弧＝Arcをつないで円＝Circleにする）を、4事業の色の弧で表す
export const Arcs: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
    {['#3B6FE0', '#5B5BD6', '#8E5BD0', '#C8509F'].map((color, i) => (
      <path
        key={color}
        d="M 100 8 A 92 92 0 0 1 192 100"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        transform={`rotate(${i * 90 + 6} 100 100)`}
        pathLength={100}
        style={{ strokeDasharray: '86 100' }}
      />
    ))}
  </svg>
);

// コマの枠：太い黒線とずらした影（ぼかさない）。press は押すと影の分だけ沈む
export const card = 'border-[3px] border-[#111] shadow-[6px_6px_0_#111]';
export const press = 'transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_#111]';

// アメコミのボタン（四角・太線・ずらした影・Dela Gothic One）。色は後ろに足す：`${comicBtn} bg-mustard text-[#111]`
// 影の色を変えたいときは comicBtnShape に影を自分で足す（例：`${comicBtnShape} bg-[#111] text-white shadow-[5px_5px_0_#F2B544] hover:shadow-[2px_2px_0_#F2B544]`）
export const comicBtnShape =
  'inline-flex justify-center items-center gap-2 px-7 py-4 border-[3px] border-[#111] font-manga text-[16px] transition-all hover:translate-x-[3px] hover:translate-y-[3px]';
export const comicBtn = `${comicBtnShape} shadow-[5px_5px_0_#111] hover:shadow-[2px_2px_0_#111]`;

// 4つの尖りのキラキラ（黒いふち付き）。色は text-* で指定する
export const Sparkle: React.FC<{ className?: string; still?: boolean }> = ({ className = '', still }) => (
  <svg viewBox="-2 -2 28 28" className={`${still ? '' : 'pop-twinkle'} overflow-visible ${className}`} aria-hidden="true">
    <path d="M12 0c.9 6.4 5.1 10.6 12 12-6.9 1.4-11.1 5.6-12 12-.9-6.4-5.1-10.6-12-12C6.9 10.6 11.1 6.4 12 0z" fill="currentColor" stroke="#111" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

// 傾けた黄色のラベル（コミックのナレーションの箱と同じ形：四角・黒い線・ずらした影）
export const Sticker: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`inline-block -rotate-3 bg-mustard px-3 py-0.5 text-[#111] border-[3px] border-[#111] shadow-[3px_3px_0_#111] ${className}`}>{children}</span>
);

// 見出しの中の、いちばん伝えたい言葉の下に敷く、黒いふち付きの帯。1つの見出しに1か所まで。className は帯の色
export const Mark: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = 'bg-mustard' }) => (
  <span className="relative inline-block isolate">
    <span className={`absolute inset-x-[-0.12em] bottom-[0.02em] h-[0.46em] -skew-x-12 -rotate-1 border-[2.5px] border-[#111] -z-10 ${className}`} aria-hidden="true" />
    <span className="relative">{children}</span>
  </span>
);

// 番号付きのカードの起点。傾けた四角のコマにアイコンを置き、角に番号の札を貼る
export const IconTile: React.FC<{ icon: React.ReactNode; num?: number; bg: string; className?: string }> = ({ icon, num, bg, className = '' }) => (
  <span className={`relative inline-grid place-items-center w-14 h-14 text-white border-[3px] border-[#111] shadow-[4px_4px_0_#111] -rotate-6 ${bg} ${className}`}>
    {icon}
    {num !== undefined && (
      <span className="absolute -top-3.5 -right-3.5 grid place-items-center min-w-8 h-8 px-1 bg-mustard text-[#111] font-comic text-[20px] leading-none border-[3px] border-[#111] shadow-[2px_2px_0_#111] rotate-12">
        {num}
      </span>
    )}
  </span>
);

// セクションの見出し。トップの ComicHead と同じ（傾いた英字の札＋白ぶちの太い日本語見出し）。
// enTone で札の色を直接指定できる。enClass（text-svc-xxx）を渡すと、その事業の色の札になる（以前の書き方との互換）
export const SectionHead: React.FC<{
  en: string;
  title: React.ReactNode;
  lead?: string;
  center?: boolean;
  enClass?: string;
  enTone?: string;
  dark?: boolean;
}> = ({ en, title, lead, center, enClass, enTone, dark }) => {
  const tone = enTone ?? (enClass?.startsWith('text-') ? `${enClass.replace('text-', 'bg-')} text-white` : dark ? 'bg-mustard text-[#111]' : 'bg-coral text-white');
  return <ComicHead en={en} title={title} lead={lead} center={center} dark={dark} enTone={tone} />;
};

type Crumb = { label: string; href?: string };

// 下層ページの見出し：コミックの表紙。網点とスピード線の地に、からし色の集中線のコマ（ナレーションの箱＋白ぶちの太いタイトル）。
// image があれば右に傾けたもう1つのコマを置き、見出しのコマを重ねる。
// imageMode：'panel'（四角い絵をコマに入れる。illust-comic の絵）／'cutout'（透過の切り抜きを事業色の集中線のコマからはみ出させる）。
// 省略すると、illust-pop の絵は cutout、それ以外は panel にする
export const PageHeader: React.FC<{
  en: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs: Crumb[];
  service?: ServiceKey;
  image?: string;
  imageMode?: 'panel' | 'cutout';
  // 長いタイトル（記事・支援事例など）は compact で一回り小さくする
  compact?: boolean;
}> = ({ en, title, lead, crumbs, service, image, imageMode, compact }) => {
  const s = services.find((item) => item.key === service);
  const mode = imageMode ?? (image?.includes('/illust-pop/') ? 'cutout' : 'panel');
  return (
    <section className="relative overflow-hidden comic-dots bg-[#FAF3E0] border-b-[4px] border-[#111]">
      <div className="absolute inset-0 comic-speed" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-5 pt-6 pb-16 md:pt-8 md:pb-24">
        <nav aria-label="パンくずリスト" className="flex flex-wrap items-center gap-1 text-xs font-bold text-sumi mb-8 md:mb-10">
          <a href="/" className="bg-white border-2 border-[#111] px-2 py-0.5 hover:bg-mustard">
            ホーム
          </a>
          {crumbs.map((crumb) => (
            <React.Fragment key={crumb.label}>
              <ChevronRight className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" />
              {crumb.href ? (
                <a href={crumb.href} className="bg-white border-2 border-[#111] px-2 py-0.5 hover:bg-mustard">
                  {crumb.label}
                </a>
              ) : (
                <span className="px-1 py-0.5 [word-break:auto-phrase]">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        <div className={`grid items-center gap-12 ${image ? 'lg:grid-cols-[1fr_1fr] lg:gap-0' : ''}`}>
          <div className={`relative z-10 ${image ? 'lg:-mr-10' : 'max-w-3xl'}`}>
            {/* 見出しのコマ */}
            <div className={`pop-reveal relative -rotate-1 comic-rays [--ray-a:#F2B544] [--ray-b:#F6C35F] px-5 pt-8 pb-7 sm:px-9 sm:pt-10 sm:pb-9 border-[4px] border-[#111] shadow-[10px_10px_0_#111]`}>
              <Caption tone={s ? `${s.bg} text-white` : 'bg-white text-[#111]'} className="relative -mt-[50px] sm:-mt-[58px] mb-5 -ml-1 sm:-ml-3 -rotate-2 w-fit max-w-full">
                <span className="font-comic font-normal text-[18px] md:text-[22px] leading-none tracking-[0.08em] uppercase">{en}</span>
              </Caption>
              <h1
                className={`font-manga text-white leading-[1.4] [paint-order:stroke_fill] [word-break:auto-phrase] ${
                  compact
                    ? 'text-[23px] md:text-[34px] [-webkit-text-stroke:6px_#111] [text-shadow:3px_3px_0_#111]'
                    : 'text-[30px] md:text-[48px] [-webkit-text-stroke:8px_#111] [text-shadow:5px_5px_0_#111]'
                }`}
              >
                {title}
              </h1>
            </div>
            {/* 見出しのコマは絵に40pxかぶせるので、説明文はその分だけ右を空けて絵の下に入らないようにする */}
            {lead && <div className={`pop-reveal mt-8 text-[15px] md:text-[17px] leading-[2] font-bold text-sumi max-w-2xl [word-break:auto-phrase] ${image ? 'lg:pr-16' : ''}`}>{lead}</div>}
          </div>

          {image && mode === 'panel' && (
            <div className="pop-reveal group relative w-full max-w-[600px] justify-self-center lg:justify-self-end lg:rotate-[1.5deg]" style={{ animationDelay: '120ms' }}>
              <div className={`relative aspect-[3/2] overflow-hidden bg-white border-[4px] border-[#111] shadow-[10px_10px_0_#111]`}>
                <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
            </div>
          )}
          {image && mode === 'cutout' && (
            <div className="pop-reveal group relative mt-10 lg:mt-14 w-full max-w-[560px] justify-self-center lg:justify-self-end" style={{ animationDelay: '120ms' }}>
              <div className={`aspect-[16/11] rotate-[1.5deg] comic-rays border-[4px] border-[#111] shadow-[10px_10px_0_#111] ${s ? '' : '[--ray-a:#1F2430] [--ray-b:#2A3142]'}`} style={s ? ({ '--ray-a': rayColor[s.key][0], '--ray-b': rayColor[s.key][1] } as React.CSSProperties) : undefined} />
              {/* 横長でも正方形でも、上へのはみ出しが2割ほどに収まるよう高さで合わせる */}
              <img src={image} alt="" className="pop-tilt absolute left-1/2 bottom-[4%] h-[118%] w-full sm:w-[108%] max-w-none -translate-x-1/2 object-contain object-bottom" />
            </div>
          )}
          {/* 絵のない見出しは、PCのときだけ右の余白にヒーローを飛ばす */}
          {!image && (
            <img
              src={comicIllust('parts/hero-fly')}
              alt=""
              className="pop-float hidden lg:block absolute right-0 xl:-right-6 top-1/2 -translate-y-1/2 w-[340px] xl:w-[380px] -scale-x-100 rotate-6 drop-shadow-[6px_6px_0_rgb(17_17_17/0.25)] pointer-events-none"
            />
          )}
        </div>
      </div>
    </section>
  );
};

// 事業色の集中線（濃い色・少し明るい色の2色を交互に並べる）
const rayColor: Record<ServiceKey, [string, string]> = {
  josys: ['#3B6FE0', '#4A7DEA'],
  data: ['#5B5BD6', '#6A6AE0'],
  ai: ['#8E5BD0', '#9A69DA'],
  web: ['#C8509F', '#D25EAA']
};

// 下層ページの最後に置く相談への誘導。トップの「CALL ARCLE!」のコマと同じ形に、受話器を持ったヒーローをはみ出させる
export const ContactCta: React.FC<{ title?: React.ReactNode; body?: string }> = ({
  title = (
    <>
      「何から相談すればいいか
      <br className="hidden md:block" />
      わからない」でも大丈夫です。
    </>
  ),
  body = 'いまの困りごとをお聞きして、やるべきことの順番から一緒に整理します。ご相談・お見積りは無料です。'
}) => (
  <section data-hide-banner className="py-20 md:py-28 comic-dots bg-[#FAF3E0] overflow-x-clip">
    <div className="max-w-6xl mx-auto px-4 sm:px-5">
      <div className="pop-reveal relative grid md:grid-cols-[1.45fr_1fr] items-end comic-rays [--ray-a:#3B6FE0] [--ray-b:#4A7DEA] text-white border-[4px] border-[#111] shadow-[10px_10px_0_#111]">
        <Caption className="absolute z-20 -top-4 left-5 -rotate-2">困ったときは、呼んでください！</Caption>
        <Burst
          text={
            <>
              相談
              <br />
              無料!
            </>
          }
          className="w-24 md:w-32 -top-10 -right-3 md:-right-6"
          fill="#F2B544"
          core="#F07A5A"
          textClass="font-manga text-[18px] md:text-[24px] text-center text-white [-webkit-text-stroke:5px_#111]"
          rotate={10}
          delay={0.2}
        />
        <div className="relative z-10 p-7 pt-12 sm:p-10 sm:pt-14 md:p-14">
          <p className="font-comic text-[44px] md:text-[64px] leading-none tracking-[0.04em] text-mustard [paint-order:stroke_fill] [-webkit-text-stroke:8px_#111] [text-shadow:5px_5px_0_#111]">CALL ARCLE!</p>
          <h2 className="font-manga text-[23px] md:text-[32px] leading-snug mt-5 [paint-order:stroke_fill] [-webkit-text-stroke:6px_#111] [word-break:auto-phrase]">{title}</h2>
          <p className="mt-5 bg-white text-sumi border-[3px] border-[#111] px-4 py-3 leading-[1.9] font-bold max-w-lg shadow-[4px_4px_0_#111]">{body}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="/contact" className={`${comicBtn} bg-mustard text-[#111]`}>
              無料で相談する
              <ArrowRight className="w-5 h-5" strokeWidth={3} />
            </a>
            <a href="/flow" className={`${comicBtn} bg-white text-[#111]`}>
              ご相談の流れを見る
            </a>
          </div>
        </div>
        {/* ヒーロー：スマホはコマの下に小さく、PCはコマの右下から上へはみ出させる */}
        {/* 左右と下はコマの枠で切り、上だけはみ出させる（clip-path の上側をマイナスにする） */}
        <div className="group relative h-[290px] sm:h-[330px] md:h-full md:min-h-[440px] [clip-path:inset(-60%_0_0_0)]">
          <img
            src={comicIllust('fd-cta-hero')}
            alt=""
            className="pop-tilt absolute bottom-0 left-1/2 -translate-x-[46%] w-[300px] sm:w-[340px] md:w-[500px] lg:w-[540px] max-w-none"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
);

// 斜めに流れるテープ。items を繰り返して横に流す。区切りは小さな爆発形
export const Ticker: React.FC<{ items: string[]; className?: string; tone?: string }> = ({ items, className = '', tone = 'bg-mustard text-[#111]' }) => (
  <div className={`relative z-10 -rotate-[1.5deg] border-y-[4px] border-[#111] py-3 overflow-hidden ${tone} ${className}`} aria-hidden="true">
    <div className="pop-ticker flex w-max">
      {[0, 1].map((n) => (
        <div key={n} className="flex shrink-0">
          {items.map((t) => (
            <span key={t} className="flex items-center gap-5 pr-5 font-manga text-lg md:text-xl whitespace-nowrap">
              {t}
              <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
                <path d="M12 1l2.6 6.4L21 5l-2.8 6.2L23 15l-6.6.4L15 22l-3-5.8L9 22l-1.4-6.6L1 15l4.8-3.8L3 5l6.4 2.4z" fill="currentColor" stroke="#111" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

// 料金プランのカード：1つのコマ。事業色の網点の帯（プラン名）→ 帯に重ねた傾いた値札 → 内容 → ボタン の順に、上から一本道で読める
// 「〇〇プランの全内容」は、下のプランを丸ごと含むことが分かるよう黄色のナレーションの箱にする。おすすめには爆発形を1つだけ付ける
export type Plan = {
  name: string;
  sub: string;
  desc: string;
  amount: string;
  unit: string;
  prefix?: string;
  chip?: string;
  priceNote?: string;
  features: string[];
  note?: string;
  recommended?: boolean;
};

export const PlanCard: React.FC<{ plan: Plan; service: ServiceKey; index: number; cta?: string; ctaLabel?: string }> = ({ plan, service, index, cta = 'お問い合わせ', ctaLabel }) => {
  const s = services.find((item) => item.key === service)!;
  const hot = plan.recommended;
  const included = plan.features.filter((f) => f.endsWith('プランの全内容'));
  const features = plan.features.filter((f) => !f.endsWith('プランの全内容'));
  return (
    <div style={{ animationDelay: `${index * 110}ms` }} className={`pop-reveal relative ${hot ? 'lg:-translate-y-4 z-10' : ''}`}>
      <article
        className={`group relative h-full flex flex-col bg-white border-[4px] border-[#111] transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 ${
          hot ? 'shadow-[10px_10px_0_#F2B544,13px_13px_0_#111] hover:shadow-[13px_13px_0_#F2B544,16px_16px_0_#111]' : 'shadow-[8px_8px_0_#111] hover:shadow-[11px_11px_0_#111]'
        }`}
      >
        {hot && (
          <Burst
            text="おすすめ!"
            className="w-[104px] -top-12 -right-5"
            fill="#F2B544"
            core="#F07A5A"
            textClass="font-manga text-[15px] text-white [-webkit-text-stroke:4px_#111]"
            rotate={12}
            delay={0.3}
          />
        )}
        {/* プラン名の帯 */}
        <div className={`relative overflow-hidden border-b-[4px] border-[#111] px-6 pt-6 pb-16 ${hot ? `${s.bg} text-white` : s.tint}`}>
          <span className={`absolute inset-0 ${hot ? 'comic-dots-light' : 'comic-dots'} opacity-70`} aria-hidden="true" />
          <p className={`relative font-comic text-[38px] leading-none tracking-[0.03em] [paint-order:stroke_fill] ${hot ? 'text-mustard [-webkit-text-stroke:6px_#111] [text-shadow:3px_3px_0_#111]' : `${s.text} [-webkit-text-stroke:6px_#fff]`}`}>{plan.name}</p>
          <h3 className="relative font-manga text-[19px] leading-snug mt-2 [word-break:auto-phrase]">{plan.sub}</h3>
          <p className={`relative mt-1.5 text-sm font-bold leading-relaxed ${hot ? 'text-white' : 'text-sumi'}`}>{plan.desc}</p>
        </div>
        {/* 帯に重ねた値札 */}
        <div className="relative -mt-11 px-4">
          <div className={`pop-wiggle inline-block bg-white border-[3px] border-[#111] pl-4 pr-5 py-3 shadow-[5px_5px_0_#111] ${index % 2 ? 'rotate-2' : '-rotate-2'}`}>
            {plan.chip && <span className={`inline-block px-2.5 py-0.5 text-xs font-manga text-white border-2 border-[#111] ${s.bg}`}>{plan.chip}</span>}
            <p className="mt-1 flex items-baseline whitespace-nowrap">
              {plan.prefix && <span className="font-manga text-[15px] mr-1.5">{plan.prefix}</span>}
              <span className={`font-comic text-[56px] lg:text-[62px] leading-none tracking-[0.02em] ${s.text} [paint-order:stroke_fill] [-webkit-text-stroke:5px_#111] [text-shadow:3px_3px_0_#111]`}>{plan.amount}</span>
              <span className="font-manga text-lg ml-1">{plan.unit}</span>
            </p>
            {plan.priceNote && <p className="text-xs font-bold text-sumi-muted mt-1">{plan.priceNote}</p>}
          </div>
        </div>
        {/* 内容 */}
        <div className="px-6 pt-7 pb-7 flex flex-col flex-1">
          {included.map((f) => (
            <p key={f} className="mb-4">
              <span className="inline-flex items-center gap-1 -rotate-2 bg-mustard px-3 py-1 text-[13px] font-manga border-[3px] border-[#111] shadow-[3px_3px_0_#111]">
                <Plus className="w-3.5 h-3.5" strokeWidth={3.5} aria-hidden="true" />
                {f}
              </span>
            </p>
          ))}
          <ul className="space-y-3.5 flex-1">
            {features.map((f) => (
              <li key={f} className="flex gap-2.5 text-sm font-bold leading-relaxed">
                <span className={`shrink-0 mt-0.5 w-5 h-5 grid place-items-center border-2 border-[#111] text-white ${s.bg}`}>
                  <Check className="w-3 h-3" strokeWidth={4} aria-hidden="true" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          {plan.note && <p className="text-xs text-sumi-muted mt-7">{plan.note}</p>}
          <a href="/contact" aria-label={ctaLabel} className={`mt-6 ${hot ? `${comicBtnShape} bg-[#111] text-white shadow-[5px_5px_0_#F2B544] hover:shadow-[2px_2px_0_#F2B544]` : `${comicBtn} bg-white text-[#111]`}`}>
            {cta}
            <ArrowRight className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
          </a>
        </div>
      </article>
    </div>
  );
};
