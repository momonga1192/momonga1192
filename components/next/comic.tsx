import React from 'react';

// アメコミ版のトップで使う部品（効果音の爆発形・吹き出し・ナレーションの箱・コマ）

// ギザギザの爆発形の頂点。尖りの長さを交互に少しずつ変えて、手描きらしくする
const burstPoints = (spikes: number, inner: number) =>
  Array.from({ length: spikes * 2 }, (_, i) => {
    const angle = (Math.PI * i) / spikes - Math.PI / 2;
    const r = i % 2 ? inner : [1, 0.9, 0.97, 0.86, 1, 0.93][(i / 2) % 6];
    return `${(50 + 50 * r * Math.cos(angle)).toFixed(1)},${(50 + 50 * r * Math.sin(angle)).toFixed(1)}`;
  }).join(' ');

const outerBurst = burstPoints(14, 0.68);
const innerBurst = burstPoints(14, 0.6);
// 横長の爆発形（wide）。尖りを増やし、横に引き伸ばして使う
const wideOuter = burstPoints(22, 0.8);
const wideInner = burstPoints(22, 0.74);

// 効果音（SMAAASH! など）。className で位置と幅、rotate で傾き、delay で出るタイミングを決める
export const Burst: React.FC<{
  text: React.ReactNode;
  className?: string;
  fill?: string;
  core?: string;
  textClass?: string;
  rotate?: number;
  delay?: number;
  wide?: boolean;
}> = ({ text, className = '', fill = '#F2B544', core = '#F07A5A', textClass = 'text-white text-[clamp(18px,4.2vw,56px)]', rotate = -8, delay = 0, wide }) => (
  <span
    className={`comic-pop absolute z-10 grid place-items-center ${wide ? 'aspect-[3/1]' : 'aspect-square'} pointer-events-none ${className}`}
    style={{ '--r': `${rotate}deg`, animationDelay: `${delay}s, ${delay + 1.8}s` } as React.CSSProperties}
    aria-hidden="true"
  >
    <svg viewBox="-4 -4 108 108" preserveAspectRatio={wide ? 'none' : undefined} className="absolute inset-0 w-full h-full overflow-visible">
      <polygon points={wide ? wideOuter : outerBurst} fill="#111" transform={wide ? 'translate(1.2 4)' : 'translate(3 3)'} />
      <polygon points={wide ? wideOuter : outerBurst} fill={fill} stroke="#111" strokeWidth={wide ? 3 : 2.5} strokeLinejoin="round" vectorEffect={wide ? 'non-scaling-stroke' : undefined} />
      <polygon points={wide ? wideInner : innerBurst} fill={core} transform={`translate(50 50) scale(${wide ? 0.72 : 0.62}) translate(-50 -50)`} />
    </svg>
    <span className={`relative font-comic leading-[1.05] tracking-[0.03em] whitespace-nowrap [paint-order:stroke_fill] [-webkit-text-stroke:0.14em_#111] [text-shadow:0.07em_0.07em_0_#111] ${textClass}`}>{text}</span>
  </span>
);

// 吹き出し。talk は日本語のせりふ用で、折り返して複数行にする。
// 尾は、下の辺の tailAt（吹き出しの左端からの%）から出し、lean で先を左右に傾ける（-1 で左、1 で右）。side を付けると右の辺から右向きに出す
export const Bubble: React.FC<{
  children: React.ReactNode;
  className?: string;
  tailAt?: number;
  lean?: number;
  side?: boolean;
  rotate?: number;
  delay?: number;
  talk?: boolean;
}> = ({ children, className = '', tailAt = 30, lean = 0, side, rotate = -4, delay = 0, talk }) => {
  const tip = 17 + lean * 14;
  // 吹き出しは楕円なので、端に寄るほど下の辺が上がる。尾の付け根をその辺の高さに合わせる
  const dx = Math.min(Math.abs(tailAt / 50 - 1), 0.92);
  const edge = 50 + 50 * Math.sqrt(1 - dx * dx);
  return (
    <span
      className={`comic-pop absolute z-10 pointer-events-none ${className}`}
      style={{ '--r': `${rotate}deg`, animationDelay: `${delay}s, ${delay + 1.8}s` } as React.CSSProperties}
      {...(talk ? {} : { 'aria-hidden': true })}
    >
      <span
        className={`relative z-[1] block bg-white border-[3px] border-[#111] shadow-[4px_4px_0_#111] text-[#111] ${
          talk ? 'rounded-[48%] px-[0.9em] py-[0.75em] md:px-[1.2em] md:py-[0.9em] font-manga leading-[1.45] text-center [word-break:auto-phrase]' : 'rounded-[50%] px-[0.6em] py-[0.4em] font-comic leading-none whitespace-nowrap'
        }`}
      >
        {children}
      </span>
      <svg
        viewBox="0 0 40 30"
        className={`absolute z-[2] w-10 h-8 ${side ? 'top-1/2 -right-[27px] -translate-y-1/2 -rotate-90' : '-translate-x-1/2'}`}
        style={side ? undefined : { left: `${tailAt}%`, top: `calc(${edge.toFixed(1)}% - 7px)` }}
        aria-hidden="true"
      >
        <path d={`M8 0 L${tip} 28 L26 0`} fill="#fff" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
        <rect x="6" y="-6" width="22" height="7" fill="#fff" />
      </svg>
    </span>
  );
};

// 斜めのコマ。points は段（行）の箱に対する%の頂点で、時計回りに並べる。
// 外側を黒で切り抜き、内側を線の太さだけ中心へ寄せて切り抜くと、斜めの辺にも黒い枠線が付く
type Pt = [number, number];
export const SlantPanel: React.FC<{ points: Pt[]; href?: string; label?: string; className?: string; children: React.ReactNode }> = ({
  points,
  href,
  label,
  className = '',
  children
}) => {
  const xs = points.map(([x]) => x);
  const left = Math.min(...xs);
  const width = Math.max(...xs) - left;
  const own = points.map(([x, y]) => [((x - left) / width) * 100, y] as Pt);
  const clip = (inset: number) =>
    `polygon(${own
      .map(([x, y]) => `calc(${x.toFixed(2)}% ${x < 50 ? '+' : '-'} ${inset}px) calc(${y}% ${y < 50 ? '+' : '-'} ${inset}px)`)
      .join(', ')})`;
  const Tag = href ? 'a' : 'div';
  return (
    <Tag
      href={href}
      aria-label={label}
      className={`group absolute top-0 h-full bg-[#111] ${className}`}
      style={{ left: `${left}%`, width: `${width}%`, clipPath: clip(0) }}
    >
      <span className="absolute inset-0 block overflow-clip" style={{ clipPath: clip(4) }}>
        {children}
      </span>
    </Tag>
  );
};

// ナレーションの箱（「そのとき——」など）。黄色の四角に黒い線
export const Caption: React.FC<{ children: React.ReactNode; className?: string; tone?: string }> = ({ children, className = '', tone = 'bg-mustard text-[#111]' }) => (
  <span className={`inline-block border-[3px] border-[#111] px-3 py-1.5 font-manga text-[13px] md:text-[15px] leading-snug shadow-[3px_3px_0_#111] ${tone} ${className}`}>{children}</span>
);

// コマの枠。太い黒線とずらした影
export const panel = 'border-[4px] border-[#111] shadow-[8px_8px_0_#111]';
export const panelPress = 'transition-all hover:-translate-y-1 hover:shadow-[11px_11px_0_#111]';

// アメコミの見出し。英字の効果音ふうラベル＋日本語の太い見出し
export const ComicHead: React.FC<{ en: string; title: React.ReactNode; lead?: string; center?: boolean; dark?: boolean; enTone?: string }> = ({
  en,
  title,
  lead,
  center,
  dark,
  enTone = 'bg-coral text-white'
}) => (
  <div className={`pop-reveal mb-12 md:mb-16 ${center ? 'text-center' : ''}`}>
    <span className={`inline-block -rotate-3 border-[3px] border-[#111] px-4 pt-1.5 pb-1 font-comic text-xl md:text-2xl tracking-[0.06em] shadow-[4px_4px_0_#111] ${enTone}`}>{en}</span>
    <h2
      className={`font-manga text-[28px] md:text-[46px] leading-[1.35] mt-5 [word-break:auto-phrase] [paint-order:stroke_fill] ${
        dark ? 'text-white [-webkit-text-stroke:6px_#111] [text-shadow:4px_4px_0_#111]' : 'text-[#111] [-webkit-text-stroke:6px_#fff] [text-shadow:4px_4px_0_#F2B544]'
      }`}
    >
      {title}
    </h2>
    {lead && <p className={`mt-4 leading-[1.9] font-bold [word-break:auto-phrase] max-w-2xl ${center ? 'mx-auto' : ''} ${dark ? 'text-white/85' : 'text-sumi'}`}>{lead}</p>}
  </div>
);

// 文字だけの効果音（お悩みのコマ用）。1文字ずつ少しずつ傾けて手描きらしくし、mood で動きを変える
// shake：ふるえる（周りに震え線）、droop：しぼんで下がっていく
export const SfxText: React.FC<{ text: string; color: string; mood?: 'shake' | 'droop'; className?: string; rotate?: number; delay?: number }> = ({
  text,
  color,
  mood = 'shake',
  className = '',
  rotate = -8,
  delay = 0
}) => (
  <span
    className={`comic-pop absolute z-10 pointer-events-none ${className}`}
    style={{ '--r': `${rotate}deg`, animationDelay: `${delay}s, ${delay + 1.8}s` } as React.CSSProperties}
    aria-hidden="true"
  >
    <span className={`relative inline-flex items-end font-comic leading-none ${mood === 'shake' ? 'sfx-shake' : 'sfx-droop'}`}>
      {mood === 'shake' && (
        <svg viewBox="0 0 20 40" className="absolute -left-[0.55em] top-1/2 -translate-y-1/2 h-[1.1em] w-[0.5em]" fill="none" stroke="#111" strokeWidth="3.5" strokeLinecap="round">
          <path d="M14 4 L6 12 M16 16 L4 24 M14 28 L7 36" />
        </svg>
      )}
      {[...text].map((ch, i) => (
        <span
          key={i}
          className="inline-block [paint-order:stroke_fill] [-webkit-text-stroke:0.16em_#111] [text-shadow:0.08em_0.08em_0_#111]"
          style={{
            color,
            rotate: `${mood === 'droop' ? i * 4 : [-6, 5, -3, 7, -5, 4][i % 6]}deg`,
            translate: `0 ${mood === 'droop' ? i * 0.09 : [0, -0.06, 0.04, -0.03, 0.05, -0.04][i % 6]}em`,
            fontSize: mood === 'droop' ? `${1 - i * 0.06}em` : undefined
          }}
        >
          {ch === " " ? "\u00a0" : ch}
        </span>
      ))}
      {mood === 'shake' && (
        <svg viewBox="0 0 20 40" className="absolute -right-[0.55em] top-1/2 -translate-y-1/2 h-[1.1em] w-[0.5em] -scale-x-100" fill="none" stroke="#111" strokeWidth="3.5" strokeLinecap="round">
          <path d="M14 4 L6 12 M16 16 L4 24 M14 28 L7 36" />
        </svg>
      )}
    </span>
  </span>
);
