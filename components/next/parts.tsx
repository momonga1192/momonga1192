import React from 'react';
import { ArrowRight, Check, ChevronRight, Plus } from 'lucide-react';
import { illust, services, type ServiceKey } from './theme';

// 社名の由来（弧＝Arcをつないで円＝Circleにする）を、4事業の色の弧で表す
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

// ポップ版の共通の見た目：太い輪郭線とずらした影。press は押すと影の分だけ沈む
export const card = 'border-[2.5px] border-sumi shadow-[6px_6px_0_#1F2430]';
export const press = 'transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_#1F2430]';

// 4つの尖りのキラキラ。色は text-* で指定する
export const Sparkle: React.FC<{ className?: string; still?: boolean }> = ({ className = '', still }) => (
  <svg viewBox="0 0 24 24" className={`${still ? '' : 'pop-twinkle'} ${className}`} aria-hidden="true">
    <path d="M12 0c.9 6.4 5.1 10.6 12 12-6.9 1.4-11.1 5.6-12 12-.9-6.4-5.1-10.6-12-12C6.9 10.6 11.1 6.4 12 0z" fill="currentColor" />
  </svg>
);

// 傾けた黄色のラベル（作例のバナーの「CHECK!」と同じ形）
export const Sticker: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`inline-block -rotate-3 rounded-lg bg-mustard px-3 py-0.5 text-sumi shadow-[3px_3px_0_#1E9C8C] ${className}`}>{children}</span>
);

// 見出しの中の、いちばん伝えたい言葉に引くマーカー。1つの見出しに1か所まで
export const Mark: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = 'bg-mustard' }) => (
  <span className="relative inline-block isolate">
    <span className={`absolute inset-x-[-0.15em] bottom-[0.06em] h-[0.42em] -skew-x-6 rounded-sm -z-10 ${className}`} aria-hidden="true" />
    <span className="relative">{children}</span>
  </span>
);

// 番号付きのカードの起点。アイコンの角丸タイルに番号のシールを貼り、目線の入口を1か所にまとめる
export const IconTile: React.FC<{ icon: React.ReactNode; num?: number; bg: string; className?: string }> = ({ icon, num, bg, className = '' }) => (
  <span className={`relative inline-grid place-items-center w-14 h-14 rounded-2xl text-white border-[2.5px] border-sumi shadow-[3px_3px_0_#1F2430] -rotate-6 ${bg} ${className}`}>
    {icon}
    {num !== undefined && (
      <span className="absolute -top-3 -right-3 grid place-items-center w-7 h-7 rounded-full bg-mustard text-sumi font-en font-black italic text-sm border-2 border-sumi rotate-6">{num}</span>
    )}
  </span>
);

// 英字ラベル（ステッカー）＋日本語見出し＋リード文。enClass はラベル横のキラキラの色
export const SectionHead: React.FC<{
  en: string;
  title: React.ReactNode;
  lead?: string;
  center?: boolean;
  enClass?: string;
  dark?: boolean;
}> = ({ en, title, lead, center, enClass = 'text-svc-josys', dark }) => (
  <div className={`group pop-reveal mb-12 md:mb-16 ${center ? 'text-center' : ''}`}>
    <span className="inline-flex items-center gap-2">
      <Sticker className="pop-wiggle font-en text-sm font-black italic tracking-[0.12em] uppercase">{en}</Sticker>
      <Sparkle className={`w-5 h-5 ${enClass}`} />
    </span>
    <h2 className={`font-head text-[28px] md:text-[46px] font-black leading-[1.35] tracking-[0.01em] mt-4 [word-break:auto-phrase] ${dark ? 'text-white' : 'text-sumi'}`}>{title}</h2>
    {lead && <p className={`mt-4 leading-[1.9] [word-break:auto-phrase] max-w-2xl ${center ? 'mx-auto' : ''} ${dark ? 'text-white/75' : 'text-sumi-muted'}`}>{lead}</p>}
  </div>
);

type Crumb = { label: string; href?: string };

// 下層ページの見出し。service を渡すとその事業の色になり、image は色の面から上にはみ出して置く
export const PageHeader: React.FC<{
  en: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs: Crumb[];
  service?: ServiceKey;
  image?: string;
  // 長いタイトル（記事・モデルケースなど）は compact で一回り小さくする
  compact?: boolean;
}> = ({ en, title, lead, crumbs, service, image, compact }) => {
  const s = services.find((item) => item.key === service);
  return (
    <section className="relative bg-cream bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px] border-b-[2.5px] border-sumi">
      <div className={`relative max-w-6xl mx-auto px-5 pt-8 pb-16 md:pb-20 grid gap-14 lg:gap-10 items-center ${image ? 'lg:grid-cols-[1.1fr_1fr]' : ''}`}>
        <div className={image ? '' : 'max-w-3xl'}>
          <nav aria-label="パンくずリスト" className="flex flex-wrap items-center gap-1 text-xs text-sumi-muted mb-10">
            <a href="/" className="hover:text-sumi">
              ホーム
            </a>
            {crumbs.map((crumb) => (
              <React.Fragment key={crumb.label}>
                <ChevronRight className="w-3.5 h-3.5" />
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-sumi">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-sumi font-bold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
          <span className="group inline-flex items-center gap-2">
            <Sticker className="pop-wiggle font-en text-sm font-black italic tracking-[0.12em] uppercase">{en}</Sticker>
            <Sparkle className={`w-5 h-5 ${s ? s.text : 'text-svc-josys'}`} />
          </span>
          <h1 className={`font-head font-black leading-[1.4] tracking-[0.01em] mt-5 [word-break:auto-phrase] ${compact ? 'text-[26px] md:text-[38px]' : 'text-[31px] md:text-[50px]'}`}>{title}</h1>
          {lead && <div className="mt-6 text-[15px] md:text-[17px] leading-[2] text-sumi-muted max-w-2xl">{lead}</div>}
        </div>
        {image && (
          <div className="group relative mt-8 lg:mt-14 lg:mb-4 w-full max-w-[560px] justify-self-center">
            <div className={`aspect-[16/11] rounded-[32px] ${s ? s.bg : 'bg-sumi'} ${card}`} />
            {/* 横長でも正方形でも、上へのはみ出しが2割ほどに収まるよう高さで合わせる */}
            <img src={image} alt="" className="pop-tilt absolute left-1/2 bottom-[4%] h-[118%] w-[108%] max-w-none -translate-x-1/2 object-contain object-bottom" />
            <Sparkle className="absolute -top-6 right-[10%] w-8 h-8 text-mustard" />
          </div>
        )}
      </div>
    </section>
  );
};

// 下層ページの最後に置く相談への誘導（濃紺の面にイラストをはみ出させる）
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
  <section data-hide-banner className="py-20 md:py-28 bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px]">
    <div className="max-w-6xl mx-auto px-5">
      <div className={`relative rounded-[40px] bg-sumi text-white p-10 md:p-16 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center bg-[radial-gradient(circle_at_10%_100%,rgb(30_156_140/0.55),transparent_50%),radial-gradient(circle_at_100%_0%,rgb(242_181_68/0.3),transparent_45%)] ${card}`}>
        <Sparkle className="absolute right-10 top-10 w-10 h-10 text-mustard" />
        <div className="relative">
          <Sticker className="font-en text-sm font-black italic tracking-[0.12em] uppercase">Contact</Sticker>
          <h2 className="font-head text-[26px] md:text-[34px] font-black leading-snug mt-5 [word-break:auto-phrase]">{title}</h2>
          <p className="mt-5 text-white/75 leading-[1.9]">{body}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-mustard text-sumi font-black border-[2.5px] border-sumi shadow-[5px_5px_0_#1E9C8C] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_#1E9C8C]">
              無料で相談する
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/flow" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-white/50 font-bold hover:border-white hover:bg-white/10 transition-colors">
              ご相談の流れを見る
            </a>
          </div>
        </div>
        <div className="group relative hidden md:block justify-self-center md:-my-24">
          <img src={illust('flow-talk')} alt="" className="pop-float pop-tilt w-full max-w-[340px] drop-shadow-[0_12px_18px_rgb(0_0_0/0.25)]" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
);

// 斜めに流れるテープ。items を繰り返して横に流す
export const Ticker: React.FC<{ items: string[]; className?: string; tone?: string }> = ({ items, className = '', tone = 'bg-mustard text-sumi' }) => (
  <div className={`relative z-10 -rotate-[1.5deg] border-y-[2.5px] border-sumi py-3 overflow-hidden ${tone} ${className}`} aria-hidden="true">
    <div className="pop-ticker flex w-max">
      {[0, 1].map((n) => (
        <div key={n} className="flex shrink-0">
          {items.map((t) => (
            <span key={t} className="flex items-center gap-5 pr-5 font-head font-black text-lg md:text-xl whitespace-nowrap">
              {t}
              <Sparkle still className="w-4 h-4" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

// 料金プランのカード。事業色の帯（プラン名）→ 帯に重ねた値札 → 内容 → ボタン の順に、上から一本道で読める
// 「〇〇プランの全内容」は、下のプランを丸ごと含むことが分かるよう黄色のシールにする
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
      <article className={`group relative h-full flex flex-col rounded-[28px] bg-white border-[2.5px] border-sumi transition-[translate,rotate,box-shadow] duration-300 hover:-translate-y-2 ${index % 2 ? 'hover:rotate-1' : 'hover:-rotate-1'} ${hot ? 'shadow-[8px_8px_0_#F2B544] hover:shadow-[12px_12px_0_#F2B544]' : 'shadow-[6px_6px_0_#1F2430] hover:shadow-[10px_10px_0_#1F2430]'}`}>
        {hot && (
          <span className="pop-float absolute -top-6 -right-3 z-20 grid place-items-center w-[80px] h-[80px] rounded-full bg-mustard text-sumi font-head font-black text-[14px] leading-tight text-center border-[2.5px] border-sumi shadow-[3px_3px_0_#1F2430] rotate-12">
            おすすめ!
          </span>
        )}
        {/* プラン名の帯 */}
        <div className={`relative rounded-t-[25px] border-b-[2.5px] border-sumi px-7 pt-7 pb-16 ${hot ? `${s.bg} text-white` : s.tint}`}>
          <p className="font-en font-black italic text-[34px] leading-none tracking-tight">{plan.name}</p>
          <h3 className="font-head font-black text-lg mt-2 [word-break:auto-phrase]">{plan.sub}</h3>
          <p className={`mt-1 text-sm leading-relaxed ${hot ? 'text-white/85' : 'text-sumi-muted'}`}>{plan.desc}</p>
          {hot && <Sparkle className="absolute right-8 top-[88px] w-7 h-7 text-mustard" />}
        </div>
        {/* 帯に重ねた値札 */}
        <div className="relative -mt-11 px-5">
          <div className={`pop-wiggle inline-block rounded-2xl bg-white border-[2.5px] border-sumi pl-5 pr-6 py-3.5 shadow-[4px_4px_0_#1F2430] ${index % 2 ? 'rotate-2' : '-rotate-2'}`}>
            {plan.chip && <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-black text-white border-2 border-sumi ${s.bg}`}>{plan.chip}</span>}
            <p className="mt-1 flex items-baseline whitespace-nowrap">
              {plan.prefix && <span className="font-bold mr-1.5">{plan.prefix}</span>}
              <span className={`font-en font-black italic text-[52px] lg:text-[58px] leading-none tracking-tight ${s.text}`}>{plan.amount}</span>
              <span className="font-head font-black text-lg ml-1">{plan.unit}</span>
            </p>
            {plan.priceNote && <p className="text-xs text-sumi-muted mt-1">{plan.priceNote}</p>}
          </div>
        </div>
        {/* 内容 */}
        <div className="px-7 pt-7 pb-7 flex flex-col flex-1">
          {included.map((f) => (
            <p key={f} className="mb-4">
              <span className="inline-flex items-center gap-1 -rotate-2 rounded-lg bg-mustard px-3 py-1 text-[13px] font-black border-2 border-sumi shadow-[2px_2px_0_#1F2430]">
                <Plus className="w-3.5 h-3.5" strokeWidth={3.5} aria-hidden="true" />
                {f}
              </span>
            </p>
          ))}
          <ul className="space-y-3.5 flex-1">
            {features.map((f) => (
              <li key={f} className="flex gap-2.5 text-sm leading-relaxed">
                <span className={`shrink-0 mt-0.5 w-5 h-5 rounded-full grid place-items-center border-2 border-sumi text-white ${s.bg}`}>
                  <Check className="w-3 h-3" strokeWidth={4} aria-hidden="true" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          {plan.note && <p className="text-xs text-sumi-muted mt-7">{plan.note}</p>}
          <a
            href="/contact"
            aria-label={ctaLabel}
            className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-bold text-sm border-[2.5px] border-sumi transition-all hover:translate-x-[3px] hover:translate-y-[3px] ${hot ? 'bg-sumi text-white shadow-[5px_5px_0_#F2B544] hover:shadow-[2px_2px_0_#F2B544]' : 'bg-white shadow-[5px_5px_0_#1F2430] hover:shadow-[2px_2px_0_#1F2430]'}`}
          >
            {cta}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </article>
    </div>
  );
};
