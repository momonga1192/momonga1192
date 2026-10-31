import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { serviceByName, services } from './theme';
import { Ticker } from './parts';
import { HeroStage, useHeroIntro } from './HeroIntro';
import { Bubble, Burst, Caption, ComicHead, SfxText, SlantPanel, panel, panelPress } from './comic';
import { publishedWorks } from '../works/worksData';
import { articles } from '../articles/ArticlesIndex';

// トップページのアメコミ版（往年のヒーローコミックの表紙・コマ割り・網点・効果音）
const comic = (name: string) => `/images/illust-comic/${name}.webp`;
const ticker = ['情シス代行', 'データ活用', '生成AI活用', 'Web制作', 'ご相談・お見積り無料', '東海エリアは訪問対応'];

// お悩みのコマ割り。points は段の箱に対する%の頂点（斜めの境目で2コマに分ける）。line は登場人物のせりふ
// talk は吹き出しの置き場所・傾き・尾（at は尾の出る位置%、lean は尾の向き）、shout は叫び声の置き場所と傾き。
// 顔に少しかかってもよいので、コマごとに位置と傾きを変えて動きを出す
type Worry = {
  key: string;
  img: string;
  shout: string;
  shoutAt: string;
  shoutTilt: number;
  shoutColor: string;
  shoutMood?: 'shake' | 'droop';
  imgPos?: string;
  talk: { at: string; tilt: number; tail: number; lean: number };
  line: React.ReactNode;
  points: [number, number][];
  layers?: Layer[];
};

// 部品に分けた絵（奥から順に重ねる）。depth はスクロールしたときのずれ方（back は遅れ、front は先に動く）、
// motion は画面に入ったときの動きと、そのあと続ける小さな動き。部品は public/images/illust-comic/layers/ に置く
type Layer = { img: string; depth: 'back' | 'mid' | 'front'; motion: 'bg' | 'pop' | 'rise' | 'fly' | 'smoke' | 'glow' | 'recoil' | 'sigh' | 'hero' | 'spark' | 'wobble' | 'panic' | 'fling' | 'cheer'; alt?: string };
// box は絵の箱の置き方（コマより絵が大きいときに、どこを見せるか）。既定は正方形の絵を上に合わせる
const LayerScene: React.FC<{ layers: Layer[]; className?: string; box?: string }> = ({ layers, className = '', box = 'inset-x-0 top-0 aspect-square' }) => (
  <span className={`layer-scene pop-reveal pop-late absolute ${box} block transition-transform duration-300 ${className}`}>
    {layers.map((l) => (
      <span key={l.img} className={`layer-${l.depth}`}>
        <img src={`/images/illust-comic/layers/${l.img}.webp`} alt={l.alt ?? ''} className={`layer-${l.motion}`} loading="lazy" />
      </span>
    ))}
    {/* ため息のコマは静かに見せたいので、集中線は出さない */}
    {!layers.some((l) => l.motion === 'sigh') && <span className="layer-flash comic-focus" aria-hidden="true" />}
  </span>
);
const worryPanels: Worry[][] = [
  [
    {
      key: 'josys',
      img: 'worry-pc',
      imgPos: 'object-top scale-[1.14] translate-y-[6%] md:scale-100 md:translate-y-0 group-hover:scale-[1.19] md:group-hover:scale-105',
      shout: 'OH NO!',
      shoutAt: 'left-[6%] top-[46%]',
      shoutTilt: -12,
      shoutColor: '#F07A5A',
      talk: { at: 'left-[22%] md:left-[36%] top-[4%] md:top-[2%]', tilt: -5, tail: 18, lean: -0.8 },
      line: <>またPCが動かない！<br />社内に詳しい人もいないのに…</>,
      points: [[0, 0], [58, 0], [52, 100], [0, 100]],
      layers: [
        { img: 'wp-bg', depth: 'back', motion: 'bg' },
        { img: 'wp-woman', depth: 'mid', motion: 'pop' },
        { img: 'wp-smoke', depth: 'mid', motion: 'smoke' },
        { img: 'wp-desk', depth: 'front', motion: 'rise' },
        { img: 'wp-papers', depth: 'front', motion: 'fly' }
      ]
    },
    {
      key: 'data',
      img: 'worry-data',
      shout: 'HELP!!',
      shoutAt: 'right-[6%] top-[52%]',
      shoutTilt: 10,
      shoutColor: '#F2B544',
      talk: { at: 'left-[6%] md:left-[10%] top-[6%]', tilt: 4, tail: 62, lean: 0.4 },
      line: <>毎月の集計に何日も…<br />数字が出るころには手遅れだ！</>,
      points: [[60, 0], [100, 0], [100, 100], [54, 100]],
      layers: [
        { img: 'wd-bg', depth: 'back', motion: 'bg' },
        { img: 'wd-piles', depth: 'mid', motion: 'wobble' },
        { img: 'wd-man', depth: 'mid', motion: 'panic' },
        { img: 'wd-front', depth: 'front', motion: 'rise' },
        { img: 'wd-fly', depth: 'front', motion: 'fling' }
      ]
    }
  ],
  [
    {
      key: 'ai',
      img: 'worry-ai',
      shout: 'WHAT?!',
      shoutAt: 'right-[10%] md:right-[14%] top-[58%]',
      shoutTilt: 8,
      shoutColor: '#C9A6FF',
      talk: { at: 'left-[3%] top-[3%]', tilt: -3, tail: 30, lean: 0 },
      line: <>AIを使ってみたいが、<br />情報が漏れたら大変だ…</>,
      points: [[0, 0], [44, 0], [50, 100], [0, 100]],
      layers: [
        { img: 'wa-bg', depth: 'back', motion: 'bg' },
        { img: 'wa-robot', depth: 'mid', motion: 'glow' },
        { img: 'wa-man', depth: 'mid', motion: 'recoil' },
        { img: 'wa-desk', depth: 'front', motion: 'rise' }
      ]
    },
    {
      key: 'web',
      img: 'worry-web',
      shout: 'SIGH...',
      shoutAt: 'right-[8%] top-[40%]',
      shoutTilt: -4,
      shoutColor: '#9FC3FF',
      shoutMood: 'droop',
      talk: { at: 'left-[24%] md:left-[32%] top-[7%]', tilt: 3, tail: 26, lean: -0.4 },
      line: <>ホームページが古いまま…<br />問い合わせも全然来ない</>,
      points: [[46, 0], [100, 0], [100, 100], [52, 100]],
      layers: [
        { img: 'ww-bg', depth: 'back', motion: 'bg' },
        { img: 'ww-woman', depth: 'mid', motion: 'sigh' },
        { img: 'ww-desk', depth: 'front', motion: 'rise' }
      ]
    }
  ]
];
const serviceOf = (key: string) => services.find((x) => x.key === key) ?? services[0];

// お悩みのコマの中身（絵・せりふ・叫び声・サービスへのラベル）。right は右寄せのコマ
const worryContent = (w: Worry, right: boolean, n: number) => {
  const s = serviceOf(w.key);
  return (
    <>
      {w.layers ? (
        <LayerScene layers={w.layers} className={w.imgPos ?? 'group-hover:scale-105'} />
      ) : (
        <img src={comic(w.img)} alt="" className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${w.imgPos ?? 'group-hover:scale-105'}`} loading="lazy" />
      )}
      <span className="pop-reveal pop-late absolute inset-0 block">
        <Bubble talk className={`${w.talk.at} max-w-[78%] md:max-w-[86%] text-[15px] md:text-[20px]`} tailAt={w.talk.tail} lean={w.talk.lean} rotate={w.talk.tilt} delay={0.15 + n * 0.15}>
          {w.line}
        </Bubble>
        <SfxText text={w.shout} color={w.shoutColor} mood={w.shoutMood} className={`text-[clamp(26px,7vw,40px)] md:text-[clamp(24px,3vw,40px)] ${w.shoutAt}`} rotate={w.shoutTilt} delay={0.5 + n * 0.15} />
      </span>
      <span className={`absolute bottom-[6%] ${right ? 'right-[4%]' : 'left-[4%]'} inline-flex items-center gap-1 border-[3px] border-[#111] px-3 py-1 font-manga text-[14px] text-white ${s.bg}`}>
        {s.name}で解決
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
      </span>
    </>
  );
};

const pointLine = (
  <>
    まだ知らないのかい？
    <br />
    会社のITの困りごとは、
    <br />
    <span className="inline-block -rotate-2 my-1 px-2 bg-svc-josys text-white border-[3px] border-[#111]">Arcle</span>に
    <span className="inline-block rotate-1 mx-1 px-2 bg-coral text-white border-[3px] border-[#111]">まるごと</span>
    <br />
    相談できるじゃないか!!!
  </>
);

const serviceSfx: Record<string, string> = { josys: 'POW!', data: 'ZAP!', ai: 'WHOOSH!', web: 'BOOM!' };

// サービスの絵の部品（奥から順）。PCでマウスを乗せて動かすと、カードがマウスの向きに傾き、部品が別々にずれて立体的に見える。
// tilt はずれる量（px。マイナスは逆向き＝奥）、depth はスクロールしたときのずれ方（スマホではこれだけ効く）
type ServiceLayer = { img: string; tilt: number; depth: 'back' | 'mid' | 'front' };
const serviceLayers: Record<string, ServiceLayer[]> = {
  josys: [
    { img: 'sj-bg', tilt: -10, depth: 'back' },
    { img: 'sj-villain', tilt: 8, depth: 'mid' },
    { img: 'sj-hero', tilt: 16, depth: 'mid' },
    { img: 'sj-fx', tilt: 26, depth: 'front' }
  ],
  data: [
    { img: 'sd-bg', tilt: -10, depth: 'back' },
    { img: 'sd-hero', tilt: 12, depth: 'mid' },
    { img: 'sd-fx', tilt: 20, depth: 'mid' },
    { img: 'sd-crowd', tilt: 26, depth: 'front' }
  ],
  ai: [
    { img: 'sa-bg', tilt: -10, depth: 'back' },
    { img: 'sa-fx', tilt: 10, depth: 'mid' },
    { img: 'sa-robot', tilt: 16, depth: 'mid' },
    { img: 'sa-hero', tilt: 20, depth: 'mid' },
    { img: 'sa-crowd', tilt: 26, depth: 'front' }
  ],
  web: [
    { img: 'sw-bg', tilt: -10, depth: 'back' },
    { img: 'sw-panels', tilt: 10, depth: 'mid' },
    { img: 'sw-hero', tilt: 16, depth: 'mid' },
    { img: 'sw-fx', tilt: 26, depth: 'front' }
  ]
};

const ServiceArt: React.FC<{ layers: ServiceLayer[] }> = ({ layers }) => {
  const ref = useRef<HTMLSpanElement>(null);
  // カード全体がリンクで絵の上を覆っているので、カード（article）でマウスの位置を拾い、-1〜1 にして CSS に渡す（タッチでは傾けない）
  useEffect(() => {
    const el = ref.current;
    const card = el?.closest('article');
    if (!el || !card) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--tx', Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1)).toFixed(3));
      el.style.setProperty('--ty', Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1)).toFixed(3));
      el.classList.add('is-tilt');
    };
    const leave = () => {
      el.style.removeProperty('--tx');
      el.style.removeProperty('--ty');
      el.classList.remove('is-tilt');
    };
    card.addEventListener('pointermove', move);
    card.addEventListener('pointerleave', leave);
    return () => {
      card.removeEventListener('pointermove', move);
      card.removeEventListener('pointerleave', leave);
    };
  }, []);
  return (
    <span ref={ref} className="tilt-card absolute inset-0 block">
      {layers.map((l) => (
        <span key={l.img} className={`layer-${l.depth}`}>
          <img src={`/images/illust-comic/layers/${l.img}.webp`} alt="" className="tilt-layer" style={{ '--d': l.tilt } as React.CSSProperties} loading="lazy" />
        </span>
      ))}
      <span className="tilt-glare" aria-hidden="true" />
    </span>
  );
};

const reasons = [
  { img: 'reason-local', sfx: 'ZOOM!', title: '東海エリアなら、駆けつけます', body: '東海エリアのお客さまには訪問で対応します。顔の見える距離だから、ちょっとしたことも気軽に相談できます。' },
  { img: 'reason-onestop', sfx: 'CATCH!', title: 'ITのことを、ひとつの窓口で', body: 'PC・データ・AI・Webを別々の会社に頼む必要はありません。会社全体を見渡したうえで、優先順位から一緒に考えます。' },
  { img: 'reason-small', sfx: 'GROW!', title: '小さく始めて、一緒に育てる', body: '最初から大きな投資は必要ありません。まずは困りごとをひとつ解決するところから始め、成果を見ながら広げていきます。' }
];

const ctaButton =
  'inline-flex justify-center items-center gap-2 px-7 py-4 border-[3px] border-[#111] font-manga text-[16px] shadow-[5px_5px_0_#111] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_#111]';

const HomeComic: React.FC = () => {
  const cases = publishedWorks.slice(0, 3);
  const intro = useHeroIntro();
  // キャッチはヒーローが殴ったあとにドーンと出す。説明のコマは少し遅れて出す
  const catchMotion = intro.phase === 'done' ? '' : intro.reached('catch') ? 'intro-slam' : 'opacity-0';

  return (
    <div className="bg-[#FAF3E0] text-sumi overflow-x-clip">
      <Helmet>
        <title>Arcle（アークル）| 愛知・東海の中小企業のIT支援 - 情シス代行・データ活用・生成AI・Web制作</title>
        <meta
          name="description"
          content="Arcle（アークル）は、愛知・東海エリアの中小企業の「IT部門」として、情シス代行、データ活用（Power BI・Tableau）、生成AI活用、月額制のホームページ制作をまとめて支援します。ご相談・お見積りは無料です。"
        />
        <link rel="canonical" href="https://www.arcle.net/" />
      </Helmet>

      {/* ヒーロー：コミックの表紙のような2コマ。大きな事件のコマに、傾けた見出しのコマを重ねる */}
      <section className="relative overflow-hidden comic-dots">
        {/* 背景の斜めのスピード線 */}
        <div className="absolute inset-0 opacity-60 bg-[repeating-linear-gradient(-28deg,transparent_0_46px,rgb(242_181_68/0.35)_46px_52px)]" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-20 md:pt-12 md:pb-28 lg:min-h-[640px] lg:flex lg:items-center">
          {/* 事件のコマ（切り抜きアニメ。ローディング中は画面いっぱいに出す） */}
          <div className={`relative lg:ml-[34%] lg:w-[66%] lg:rotate-[1.2deg] bg-white ${panel} shadow-[10px_10px_0_#111]`}>
            <HeroStage intro={intro} />
          </div>

          {/* 見出しのコマ。事件のコマの左側に斜めに重ねる */}
          <div
            className={`relative z-10 -mt-10 mx-2 sm:mx-8 -rotate-2 lg:absolute lg:m-0 lg:left-6 lg:top-1/2 lg:-translate-y-[46%] lg:w-[38%] lg:-rotate-[4deg] ${catchMotion} comic-rays [--ray-a:#F2B544] [--ray-b:#F6C35F] p-6 pt-8 sm:p-9 xl:p-12 ${panel} shadow-[10px_10px_0_#111]`}
          >
            <Caption tone="bg-white text-[#111]" className="-rotate-2">中小企業のITに、ヒーロー参上！</Caption>
            <h1 className="mt-5 font-manga text-[28px] sm:text-[42px] lg:text-[40px] xl:text-[48px] leading-[1.4] text-white [paint-order:stroke_fill] [-webkit-text-stroke:8px_#111] [text-shadow:5px_5px_0_#111] [word-break:auto-phrase]">
              <span className="inline-block">会社のITの</span>
              <span className="inline-block">「困った」を、</span>
              <br />
              <span className="inline-block -rotate-3 my-1.5 mr-1 px-2 bg-coral border-[3px] border-[#111] [-webkit-text-stroke:0] [text-shadow:none] shadow-[5px_5px_0_#111] text-[1.12em]">まるごと</span>
              <span className="inline-block">相談できる</span>
              <span className="inline-block">場所。</span>
            </h1>
            {intro.reached('catch') && (
            <Burst
              text={<>相談<br />無料!</>}
              className="w-[96px] sm:w-[120px] -bottom-10 -right-5 sm:-right-8"
              fill="#fff"
              core="#3B6FE0"
              textClass="font-manga text-[17px] sm:text-[21px] text-center text-white [-webkit-text-stroke:5px_#111]"
              rotate={14}
              delay={0.45}
            />
            )}
          </div>
        </div>
      </section>

      <Ticker items={ticker} className="-my-4" tone="bg-[#111] text-mustard" />

      {/* お悩み：コミックのページのようなコマ割り。斜めの境目で困っている人を並べ、最後のコマでヒーローが解決を告げる */}
      <section className="pt-20 pb-20 md:pt-28 md:pb-28 bg-mustard comic-dots">
        <div className="pop-reveal relative -rotate-1 bg-[#111] py-4 md:py-6 mb-10 md:mb-14 border-y-[4px] border-white">
          <h2 className="text-center font-manga text-white text-[24px] sm:text-[34px] md:text-[48px] leading-tight">
            こんな<span className="mx-1 text-mustard text-[1.45em] [text-shadow:4px_4px_0_#F07A5A]">お悩み</span>ありませんか？
          </h2>
        </div>
        <div className="max-w-5xl mx-auto px-3 sm:px-5 flex flex-col gap-3 md:gap-5 drop-shadow-[6px_6px_0_#111]">
          {/* スマホは1コマずつ縦に並べ（上下の辺を斜めにする）、PCは斜めの境目で2コマずつ並べる */}
          {worryPanels.flat().map((w, n) => (
            <div key={w.key} className="md:hidden relative aspect-square">
              <SlantPanel points={n % 2 ? [[0, 4], [100, 0], [100, 100], [0, 96]] : [[0, 0], [100, 4], [100, 96], [0, 100]]} href={serviceOf(w.key).href} label={`${serviceOf(w.key).name}のページへ`}>
                {worryContent(w, n % 2 === 1, n)}
              </SlantPanel>
            </div>
          ))}
          {worryPanels.map((row, r) => (
            <div key={r} className="hidden md:block relative aspect-[21/9]">
              {row.map((w, i) => (
                <SlantPanel key={w.key} points={w.points} href={serviceOf(w.key).href} label={`${serviceOf(w.key).name}のページへ`}>
                  {worryContent(w, i === 1, r * 2 + i)}
                </SlantPanel>
              ))}
            </div>
          ))}
          {/* 解決のコマ。スマホは絵を切らずに見せ、せりふは絵の上に別の吹き出しとして出す */}
          <p className="md:hidden pop-reveal pop-late relative mt-3 mx-1 rounded-[46%] bg-white border-[3px] border-[#111] px-6 py-5 text-center font-manga text-[16px] leading-[1.55] text-[#111] [word-break:auto-phrase]">
            {pointLine}
            <svg viewBox="0 0 40 30" className="absolute -bottom-[26px] right-[25%] w-10 h-8" aria-hidden="true">
              <path d="M4 0 L18 28 L26 0" fill="#fff" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
              <rect x="2" y="-4" width="28" height="5" fill="#fff" />
            </svg>
          </p>
          <div className="relative aspect-[2/1] md:aspect-[21/9]">
            <SlantPanel points={[[0, 0], [100, 0], [100, 100], [0, 100]]} href="#services" label="サービスを見る">
              <LayerScene
                box="inset-x-0 top-1/2 -translate-y-1/2 aspect-[2/1]"
                layers={[
                  { img: 'wo-bg', depth: 'back', motion: 'bg' },
                  { img: 'wo-hero', depth: 'mid', motion: 'hero', alt: '困っていた社員たちに、ヒーローに扮したArcleが「まるごと相談できる」と教えるイラスト' },
                  { img: 'wo-spark', depth: 'mid', motion: 'spark' },
                  { img: 'wo-crowd', depth: 'front', motion: 'cheer' }
                ]}
              />
              <span className="pop-reveal pop-late absolute inset-0 block">
                <Bubble talk className="hidden md:block left-[3%] top-[6%] w-[56%] text-[26px]" side rotate={-2} delay={0.2}>
                  {pointLine}
                </Bubble>
                <SfxText text="WOW!" color="#F2B544" className="left-[33%] md:left-[36%] bottom-[16%] text-[clamp(28px,5vw,58px)]" rotate={-10} delay={0.6} />
              </span>
            </SlantPanel>
          </div>
        </div>
      </section>

      {/* サービス：ヒーローが活躍するコマ */}
      <section id="services" className="py-20 md:py-28 scroll-mt-16 comic-dots">
        <div className="max-w-6xl mx-auto px-4 sm:px-5">
          <ComicHead
            en="TO THE RESCUE!"
            enTone="bg-svc-josys text-white"
            title={
              <>
                4つのサービスで、
                <br className="sm:hidden" />
                会社のITをまるごと支える
              </>
            }
            lead="ひとつだけのご依頼も、まとめてのご依頼も歓迎です。窓口がひとつなので、「どこに頼めばいいか」で迷いません。"
          />
          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {services.map((s, i) => (
              <article key={s.key} style={{ animationDelay: `${(i % 2) * 120}ms` }} className={`pop-reveal group relative flex flex-col bg-white ${panel} ${panelPress}`}>
                <div className="relative aspect-[3/2] border-b-[4px] border-[#111] overflow-clip">
                  <ServiceArt layers={serviceLayers[s.key]} />
                  {/* コミックの表紙の号数ラベル */}
                  <span className={`absolute left-3 top-3 -rotate-3 flex flex-col items-center border-[3px] border-[#111] px-3 pt-1 pb-0.5 font-comic leading-none text-white shadow-[3px_3px_0_#111] ${s.bg}`}>
                    <span className="text-[11px] tracking-[0.2em]">ISSUE</span>
                    <span className="text-[30px] [text-shadow:2px_2px_0_#111]">No.{i + 1}</span>
                  </span>
                </div>
                <Burst text={serviceSfx[s.key]} className="w-[28%] max-w-[140px] -top-9 left-[24%] comic-shake-hover" textClass="text-white text-[clamp(20px,3.2vw,36px)]" rotate={i % 2 ? -12 : 10} delay={0.2} />
                <div className="flex flex-col flex-1 p-6 md:p-8">
                  <p className={`font-comic text-lg tracking-[0.1em] ${s.text}`}>{s.en}</p>
                  <h3 className="font-manga text-[28px] md:text-[32px] leading-tight mt-1">{s.name}</h3>
                  <p className="mt-4 text-[15px] leading-[1.9] text-sumi">{s.lead}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.points.map((p) => (
                      <li key={p} className="text-[13px] font-bold px-3 py-1 bg-mustard/30 border-2 border-[#111]">
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a href={s.href} className={`mt-auto pt-7 inline-flex items-center gap-2 font-manga ${s.text} after:absolute after:inset-0 after:content-['']`}>
                    {s.name}について詳しく
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 選ばれる理由：夜空のような濃紺に、3つのコマ */}
      <section className="relative py-20 md:py-28 bg-sumi comic-dots-light border-y-[4px] border-[#111]">
        <div className="max-w-6xl mx-auto px-4 sm:px-5">
          <ComicHead en="WHY ARCLE?" enTone="bg-mustard text-[#111]" title="Arcleが選ばれる3つの理由" center dark />
          <div className="grid md:grid-cols-3 gap-10 md:gap-7">
            {reasons.map((r, i) => (
              <div key={r.title} style={{ animationDelay: `${i * 120}ms` }} className={`pop-reveal group relative bg-[#FAF3E0] ${panel} shadow-[8px_8px_0_#F2B544] ${i % 2 ? 'md:rotate-[1deg]' : 'md:-rotate-[1deg]'}`}>
                <div className="relative aspect-square border-b-[4px] border-[#111] overflow-hidden">
                  <img src={comic(r.img)} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                </div>
                <Burst text={`${i + 1}`} className="w-20 -top-7 -left-6" fill="#F07A5A" core="#F2B544" textClass="text-white text-[40px]" rotate={-12} delay={0.2} />
                <Caption className="absolute right-3 top-3 rotate-3 font-comic tracking-[0.08em] text-lg">{r.sfx}</Caption>
                <div className="p-6">
                  <h3 className="font-manga text-[21px] leading-snug text-center [word-break:auto-phrase]">{r.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.9] text-sumi">{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 支援事例 */}
      <section className="py-20 md:py-28 bg-white comic-dots">
        <div className="max-w-6xl mx-auto px-4 sm:px-5">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <ComicHead en="CASE FILES" enTone="bg-svc-data text-white" title="支援事例" lead="中小企業の課題に、Arcleがどのように取り組んだかをご紹介します。" />
            <a href="/works" className={`md:mb-16 self-start md:self-auto shrink-0 ${ctaButton} py-2.5 px-5 text-[14px] bg-white text-[#111]`}>
              すべて見る
              <ArrowRight className="w-4 h-4" strokeWidth={3} />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {cases.map((w, i) => {
              const s = serviceByName(w.service) ?? services[0];
              const metric = w.metrics[0];
              return (
                <a key={w.slug} href={`/works/${w.slug}`} style={{ animationDelay: `${i * 100}ms` }} className={`pop-reveal group flex flex-col bg-[#FAF3E0] p-6 ${panel} ${panelPress}`}>
                  <span className={`self-start -rotate-2 text-xs font-manga px-3 py-1 text-white border-[3px] border-[#111] ${s.bg}`}>{w.service}</span>
                  <h3 className="font-manga text-xl leading-snug mt-4 flex-1 [word-break:auto-phrase]">{w.title}</h3>
                  {metric && (
                    <p className="mt-5 bg-white px-4 py-3 text-sm border-[3px] border-[#111]">
                      <span className="block text-xs text-sumi-muted">{metric.label}（想定）</span>
                      <span className="text-sumi-muted">{metric.before}</span>
                      <span className="mx-2">→</span>
                      <span className={`font-manga text-2xl ${s.text}`}>{metric.after}</span>
                    </p>
                  )}
                  <p className="mt-4 text-xs text-sumi-muted">
                    {w.industry}｜{w.region}
                  </p>
                </a>
              );
            })}
          </div>
          <p className="mt-6 text-xs text-sumi-muted">※実際の支援をもとに、企業の特定や機密情報の開示を避けるため、一部情報を加工しています。</p>
        </div>
      </section>

      {/* お問い合わせとお役立ち記事 */}
      <section data-hide-banner className="py-20 md:py-28 comic-dots">
        <div className="max-w-6xl mx-auto px-4 sm:px-5 grid lg:grid-cols-[1.4fr_1fr] gap-8">
          <div className={`relative comic-rays [--ray-a:#3B6FE0] [--ray-b:#4A7DEA] text-white p-8 pt-12 md:p-14 ${panel}`}>
            <Caption className="absolute -top-4 left-5 -rotate-2">困ったときは、呼んでください！</Caption>
            <Burst text={<>相談<br />無料!</>} className="w-28 md:w-36 -top-10 -right-4 md:right-6" fill="#F2B544" core="#F07A5A" textClass="font-manga text-[20px] md:text-[26px] text-center text-white [-webkit-text-stroke:5px_#111]" rotate={10} delay={0.2} />
            <p className="font-comic text-[44px] md:text-[64px] leading-none tracking-[0.04em] text-mustard [paint-order:stroke_fill] [-webkit-text-stroke:8px_#111] [text-shadow:5px_5px_0_#111]">CALL ARCLE!</p>
            <h2 className="font-manga text-[24px] md:text-[32px] leading-snug mt-5 [paint-order:stroke_fill] [-webkit-text-stroke:6px_#111] [word-break:auto-phrase]">
              「何から相談すればいいか
              <br className="hidden md:block" />
              わからない」でも大丈夫です。
            </h2>
            <p className="mt-5 bg-white text-sumi border-[3px] border-[#111] px-4 py-3 leading-[1.9] font-bold max-w-lg shadow-[4px_4px_0_#111]">
              いまの困りごとをお聞きして、やるべきことの順番から一緒に整理します。ご相談・お見積りは無料です。
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="/contact" className={`${ctaButton} bg-mustard text-[#111]`}>
                無料で相談する
                <ArrowRight className="w-5 h-5" strokeWidth={3} />
              </a>
              <a href="/flow" className={`${ctaButton} bg-white text-[#111]`}>
                ご相談の流れを見る
              </a>
            </div>
          </div>
          <div className={`bg-white p-7 md:p-9 ${panel}`}>
            <div className="flex items-center justify-between">
              <p className="font-manga text-xl">お役立ち記事</p>
              <a href="/articles" className="font-manga text-sm text-svc-josys hover:underline">
                一覧へ
              </a>
            </div>
            <ul className="mt-4 divide-y-[3px] divide-dashed divide-[#111]/25">
              {articles.slice(0, 3).map((a) => {
                const s = serviceByName(a.tag);
                return (
                  <li key={a.href}>
                    <a href={a.href} className="group block py-5">
                      <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 text-white border-2 border-[#111] ${s?.bg ?? 'bg-sumi-muted'}`}>{a.tag}</span>
                      <span className="block font-bold leading-relaxed mt-2 group-hover:underline">{a.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeComic;
