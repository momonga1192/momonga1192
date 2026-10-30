import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Bubble, Burst, Caption } from './comic';

// トップのヒーローの「切り抜きアニメ」。部品（背景・机・女性・PC・ヴィラン・ヒーロー）を重ねて動かす
// 流れ：ある日のPC → 壊れる → ヴィラン登場 → 襲いかかる → 「そのとき——！」→ ヒーローが殴る（ここまで画面いっぱい）
//       → 定位置に縮む → キャッチがドーン
// 本番では同じタブで1回だけ流す（確認用のサーバーや手元では毎回流す）。動きを減らす設定の人には最後の場面だけを見せる

const part = (name: string) => `/images/illust-comic/parts/${name}.webp`;
const seenKey = 'arcle-hero-intro';
const partNames = ['bg-office', 'desk', 'woman-calm', 'woman-panic', 'woman-happy', 'laptop-ok', 'laptop-broken', 'villain', 'hero-fly'];

export const phases = ['calm', 'boom', 'villain', 'attack', 'whoosh', 'fly', 'smash', 'cheer', 'shrink', 'catch', 'done'] as const;
export type Phase = (typeof phases)[number];
// 各場面に入る時刻（ミリ秒）
const timeline: [Phase, number][] = [
  ['boom', 1300],
  ['villain', 2600],
  ['attack', 3600],
  ['whoosh', 4300],
  ['fly', 4750],
  ['smash', 4950],
  ['cheer', 5700],
  ['shrink', 6500],
  ['catch', 7200],
  ['done', 8200]
];

// 殴った瞬間のヴィランの破片。飛ぶ向き（x, y は破片の大きさに対する%）と回転
const shards = [
  [-520, -260, -400],
  [-380, 120, 300],
  [-200, -420, 520],
  [160, -380, -300],
  [-640, 40, 260],
  [-300, 360, -520],
  [80, 300, 420],
  [-460, -520, 200],
  [260, -120, -260],
  [-120, 480, 380]
];

const shouldPlay = () => {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
  if (window.location.hostname !== 'www.arcle.net') return true;
  try {
    return !sessionStorage.getItem(seenKey);
  } catch {
    return false;
  }
};

// 画面いっぱいのときのステージの位置（3:2 を画面に収める）。
// 縦長のスマホでは小さくなりすぎるので、横にはみ出すほど大きくする。前半は女性・PCのいる左側、
// ヒーローが来るころ（right）からは右側を見せ、カメラを振ったように動かす。殴ったあと（whole）は引いて全体を見せる
const fullRect = (right = false, whole = false) => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (vw < vh && !whole) {
    const w = vw * 1.45;
    return { left: right ? vw - w * 0.99 : -w * 0.01, top: (vh - w / 1.5) / 2, width: w, height: w / 1.5 };
  }
  const w = Math.min(vw * 0.94, vh * 0.78 * 1.5);
  const h = w / 1.5;
  return { left: (vw - w) / 2, top: (vh - h) / 2, width: w, height: h };
};

export const useHeroIntro = () => {
  const [phase, setPhase] = useState<Phase>(() => (shouldPlay() ? 'calm' : 'done'));
  const playing = useRef(phase !== 'done');
  const [ready, setReady] = useState(false);
  const timers = useRef<number[]>([]);

  const finish = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    playing.current = false;
    document.documentElement.style.overflow = '';
    setPhase('done');
  }, []);

  useEffect(() => {
    // 読み込み中に被せていた黒い幕（public/hero-intro.js）を、React側の幕に引き継ぐ
    delete document.documentElement.dataset.intro;
    if (!playing.current) return;
    try {
      sessionStorage.setItem(seenKey, '1');
    } catch {
      /* 記録できなくても流すだけ */
    }
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = 'hidden';
    // 部品を読み込んでから流す（回線が遅くても3秒で見切って始める）
    let cancelled = false;
    const load = (name: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => resolve();
        img.src = part(name);
      });
    Promise.race([Promise.all(partNames.map(load)), new Promise((r) => window.setTimeout(r, 3000))]).then(() => {
      if (cancelled) return;
      setReady(true);
      timers.current = timeline.map(([p, t]) => window.setTimeout(() => (p === 'done' ? finish() : setPhase(p)), t));
    });
    return () => {
      cancelled = true;
      timers.current.forEach((t) => window.clearTimeout(t));
      document.documentElement.style.overflow = '';
    };
  }, [finish]);

  const reached = (p: Phase) => phases.indexOf(phase) >= phases.indexOf(p);
  return { phase, reached, skip: finish, ready: ready || phase === 'done' };
};

type Intro = ReturnType<typeof useHeroIntro>;

// ステージ。slot が定位置（3:2の枠）で、ローディング中はステージだけを画面いっぱいに固定表示する
export const HeroStage: React.FC<{ intro: Intro; className?: string }> = ({ intro, className = '' }) => {
  const { phase, reached, skip } = intro;
  const slot = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<React.CSSProperties | null>(() => (phase === 'done' ? null : typeof window === 'undefined' ? null : fullRect()));
  const loading = !reached('shrink');

  // 縮むときは、画面いっぱいの位置から定位置へ動かす
  useLayoutEffect(() => {
    if (phase === 'shrink' && slot.current) {
      const r = slot.current.getBoundingClientRect();
      setRect({ left: r.left, top: r.top, width: r.width, height: r.height });
    }
    if (phase === 'whoosh') setRect(fullRect(true));
    if (phase === 'cheer') setRect(fullRect(true, true));
    if (phase === 'catch' || phase === 'done') setRect(null);
  }, [phase]);

  // 揺れ・止め・反転・ズームは、部品を作り直さないよう Web Animations で絵全体にかける
  const scene = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scene.current;
    if (!el?.animate) return;
    if (phase === 'boom') {
      el.animate(
        [0, -1, 1, -0.7, 0.7, -0.4, 0].map((k, i) => ({ transform: `translate(${k * 1.4}%, ${(i % 2 ? -k : k) * 0.8}%) rotate(${k * 0.6}deg)` })),
        { duration: 600, easing: 'ease-out' }
      );
    }
    if (phase === 'smash') {
      // 一瞬止めて白黒を反転し、寄ってから大きく揺らす
      el.animate(
        [
          { transform: 'scale(1)', filter: 'invert(1) grayscale(1) contrast(1.6)', offset: 0 },
          { transform: 'scale(1.14)', filter: 'invert(1) grayscale(1) contrast(1.6)', offset: 0.22 },
          { transform: 'scale(1.14) translate(-2%, 1.4%) rotate(-1.4deg)', filter: 'none', offset: 0.3 },
          { transform: 'scale(1.1) translate(2%, -1.4%) rotate(1.4deg)', filter: 'none', offset: 0.42 },
          { transform: 'scale(1.06) translate(-1.4%, -0.8%) rotate(-0.8deg)', filter: 'none', offset: 0.56 },
          { transform: 'scale(1.03) translate(0.8%, 0.6%)', filter: 'none', offset: 0.72 },
          { transform: 'none', filter: 'none', offset: 1 }
        ],
        { duration: 900, easing: 'ease-out' }
      );
    }
  }, [phase]);

  useEffect(() => {
    if (!loading) return;
    const onResize = () => setRect(fullRect(reached('whoosh'), reached('cheer')));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [loading]);

  const at = (p: Phase) => reached(p);
  const woman = at('cheer') ? 'woman-happy' : at('boom') ? 'woman-panic' : 'woman-calm';
  const dark = at('villain') && !at('smash');
  const smashing = phase === 'smash' || phase === 'cheer';

  const cover = (
    <>
      {/* ローディング中の黒い幕とSKIP */}
      {phase !== 'done' && (
        <div
          className={`fixed inset-0 z-[60] grid place-items-center bg-[#111] comic-dots-light transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-hidden="true"
        >
          {!intro.ready && <span className="font-comic text-3xl tracking-[0.1em] text-mustard animate-pulse">LOADING...</span>}
        </div>
      )}
      {loading && (
        <button type="button" onClick={skip} className="fixed right-4 bottom-4 z-[62] border-[3px] border-[#111] bg-white px-4 py-1.5 font-comic text-xl tracking-[0.08em] shadow-[4px_4px_0_#F2B544]">
          SKIP ▶▶
        </button>
      )}
    </>
  );

  const stage = (
    <div
      className={`@container overflow-hidden bg-white ${intro.ready ? '' : 'opacity-0'} ${rect ? 'fixed z-[61] border-[4px] border-[#111]' : 'absolute inset-0'} ${
        phase === 'shrink' ? 'transition-[left,top,width,height] duration-[650ms] ease-[cubic-bezier(0.6,0,0.2,1)]' : phase === 'whoosh' || phase === 'cheer' ? 'transition-[left,top,width,height] duration-[450ms] ease-[cubic-bezier(0.5,0,0.2,1)]' : ''
      }`}
      style={rect ?? undefined}
      role="img"
      aria-label="ITトラブルに困る社員のもとへ、ヒーローに扮したArcleが駆けつけ、PCから出てきたウイルスの怪物を退治するアメコミ風のアニメーション"
    >
      <div ref={scene} className="absolute inset-0 origin-[52%_40%]">
        <img src={part('bg-office')} alt="" className="absolute inset-0 w-full h-full object-cover" />
        {/* ヴィランが出てくるあいだは画面を暗くする */}
        <div className={`absolute inset-0 bg-[#2A1450] transition-opacity duration-700 ${dark ? (at('attack') ? 'opacity-60' : 'opacity-45') : 'opacity-0'}`} />
        <img src={part(woman)} alt="" className={`absolute left-[1%] bottom-[16%] w-[44%] ${phase === 'calm' ? 'intro-typing' : ''} ${phase === 'attack' || phase === 'whoosh' ? 'intro-tremble' : ''}`} />
        <img src={part('desk')} alt="" className="absolute left-0 -bottom-[2%] w-full" />
        <img src={part(at('boom') ? 'laptop-broken' : 'laptop-ok')} alt="" className="absolute left-[33%] bottom-[4%] w-[34%]" />
        {at('boom') && !at('smash') && (
          <span className="absolute left-[50%] bottom-[44%] w-[6%] aspect-square" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="intro-smoke absolute inset-0 rounded-full bg-[#8a8590] border-[0.35cqw] border-[#111]" style={{ animationDelay: `${i * 0.35}s` }} />
            ))}
          </span>
        )}
        {/* ヴィラン：PCから這い出し、女性に襲いかかり、殴られると砕け散る */}
        <img
          src={part('villain')}
          alt=""
          className={`absolute left-[28%] bottom-[24%] w-[44%] origin-bottom transition-all ${
            at('smash')
              ? 'duration-300 ease-out opacity-0 -translate-x-[30%] -translate-y-[10%] -rotate-[30deg] scale-[1.25]'
              : at('attack')
                ? 'duration-[450ms] ease-[cubic-bezier(0.3,1.6,0.5,1)] opacity-100 -translate-x-[18%] -rotate-[8deg] scale-[1.15] intro-villain'
                : at('villain')
                  ? 'duration-[900ms] ease-[cubic-bezier(0.3,1.4,0.5,1)] opacity-100 intro-villain'
                  : 'duration-0 opacity-0 translate-y-[45%] scale-[0.25]'
          }`}
        />
        {smashing && (
          <span className="absolute left-[46%] top-[36%] w-[7%] aspect-square" aria-hidden="true">
            {shards.map(([x, y, r], i) => (
              <span
                key={i}
                className="intro-shard absolute inset-0 bg-[#8E5BD0] border-[0.3cqw] border-[#111]"
                style={{ '--sx': `${x}%`, '--sy': `${y}%`, '--sr': `${r}deg`, clipPath: i % 2 ? 'polygon(0 0, 100% 30%, 40% 100%)' : 'polygon(20% 0, 100% 60%, 0 100%)' } as React.CSSProperties}
              />
            ))}
          </span>
        )}
        {/* ヒーロー：スピード線のあと、右上から一気に飛び込む */}
        <img
          src={part('hero-fly')}
          alt=""
          className={`absolute right-[-8%] top-[-6%] w-[60%] transition-all ${
            at('fly') ? `ease-out opacity-100 ${at('cheer') ? 'duration-700 -translate-x-[14%] translate-y-[4%] intro-hover' : 'duration-200'}` : 'duration-0 opacity-0 translate-x-[90%] -translate-y-[90%] scale-[0.5]'
          }`}
        />
        {/* 殴った瞬間の集中線 */}
        {phase === 'smash' && <span className="intro-impact absolute inset-0" aria-hidden="true" />}
      </div>

      {/* スピード線（右上から左下へ流れる） */}
      {(phase === 'whoosh' || phase === 'fly') && <span className="intro-speed absolute inset-0 z-[5]" aria-hidden="true" />}

      {/* 文字（揺れの外に置く） */}
      {!at('attack') && <Caption className="comic-pop absolute left-[3%] top-[4%] z-10 [--r:-2deg] text-[clamp(20px,5.2cqw,56px)]! px-[0.5em]! py-[0.2em]!">ある日、会社のPCが……！</Caption>}
      {at('attack') && !at('smash') && (
        <Caption tone="bg-coral text-white" className="comic-pop absolute left-[3%] top-[4%] z-10 [--r:-3deg] text-[clamp(24px,7cqw,76px)]! px-[0.45em]! py-[0.15em]!">
          そのとき——！
        </Caption>
      )}
      {at('boom') && !at('villain') && <Burst text="BOOM!" className="w-[22%] left-[40%] top-[16%]" fill="#F07A5A" core="#F2B544" textClass="text-white text-[5cqw]" rotate={-12} />}
      {at('boom') && !at('attack') && (
        <Bubble className="left-[3%] top-[18%] text-[4.4cqw]" tailAt={72} lean={0.5} rotate={-6} delay={0.2}>
          OH NO!
        </Bubble>
      )}
      {at('attack') && !at('smash') && (
        <Bubble className="left-[3%] top-[22%] text-[5.4cqw]" tailAt={72} lean={0.5} rotate={-8}>
          HELP!!
        </Bubble>
      )}
      {at('villain') && !at('whoosh') && (
        <span
          className="comic-pop absolute left-[44%] top-[17%] z-10 font-comic text-[7cqw] text-[#B98CFF] [paint-order:stroke_fill] [-webkit-text-stroke:0.12em_#111] [text-shadow:0.06em_0.06em_0_#111] [--r:8deg]"
          aria-hidden="true"
        >
          GRRR...!
        </span>
      )}
      {phase === 'whoosh' && (
        <span
          className="comic-pop absolute right-[4%] top-[6%] z-10 font-comic text-[9cqw] text-white [paint-order:stroke_fill] [-webkit-text-stroke:0.12em_#111] [text-shadow:0.06em_0.06em_0_#3B6FE0] [--r:-14deg]"
          aria-hidden="true"
        >
          WHOOSH!
        </span>
      )}
      {/* 殴った瞬間は大きく叩きつけ、そのあとは小さくして女性とヒーローを見せる */}
      {phase === 'smash' ? (
        <Burst wide text="SMAAASH!!" className="w-[56%] left-[5%] top-[3%] portrait:w-[44%] portrait:left-[30%]" textClass="text-white text-[9cqw]" rotate={-8} delay={0.18} />
      ) : (
        at('cheer') && <Burst wide text="SMAAASH!!" className="w-[40%] left-[24%] top-[3%]" textClass="text-white text-[5.8cqw]" rotate={-8} />
      )}
      {at('cheer') && (
        <Bubble className="left-[3%] lg:left-[9%] top-[10%] text-[3.8cqw]" tailAt={72} lean={0.5} rotate={-6} delay={0.3}>
          MY HERO!
        </Bubble>
      )}
    </div>
  );

  // 幕・SKIP・画面いっぱいのステージは body 直下に出す（傾いた枠などの中では fixed が画面に固定されないため）
  return (
    <>
      {phase !== 'done' && createPortal(cover, document.body)}
      <div ref={slot} className={`relative aspect-[3/2] ${className}`}>
        {!rect && stage}
      </div>
      {rect && createPortal(stage, document.body)}
    </>
  );
};
