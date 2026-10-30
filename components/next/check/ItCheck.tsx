import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, BarChart3, Bot, Download, Gift, Globe, Lock, Mail, Printer, RotateCcw, Shield } from 'lucide-react';
import { IconTile, Mark, PageHeader, comicBtn, comicBtnShape, comicIllust } from '../parts';
import { prices, services } from '../theme';
import { Bubble, Burst, Caption, panel } from '../comic';
import { allGoodType, areas, choices, levelLabel, questionCount, scoreAnswers, type AreaScore } from './checkData';
import { deliverByMail, guidePdf, isDummyEmail, sendLead, type Lead } from './leadForm';

// 会社のIT健康診断。20問に答えると、総合点・レーダーチャート・一番弱い分野までは無料で見せ、
// 分野ごとの解説・進める順番・おすすめサービスは、会社名などを入力すると解禁する。資料PDFは入力されたメールアドレスに送る
// 見た目はトップ（HomeComic.tsx）と同じアメコミ版。質問はヒーローの吹き出しで出す
const STORE = 'arcle-it-check';

type Saved = { answers: number[]; unlocked: boolean };

const track = (name: string, params?: Record<string, unknown>) => window.gtag?.('event', name, params);

// 質問を通し番号で引けるよう、分野と一緒に平らに並べる
const flat = areas.flatMap((area) => area.questions.map((q) => ({ area, q })));

const service = (key: string) => services.find((s) => s.key === key)!;
const areaIcon = { josys: Shield, data: BarChart3, ai: Bot, web: Globe };

// 事業色の集中線（濃い色・少し明るい色）
const rays: Record<string, React.CSSProperties> = {
  josys: { '--ray-a': '#3B6FE0', '--ray-b': '#4A7DEA' } as React.CSSProperties,
  data: { '--ray-a': '#5B5BD6', '--ray-b': '#6A6AE0' } as React.CSSProperties,
  ai: { '--ray-a': '#8E5BD0', '--ray-b': '#9A69DA' } as React.CSSProperties,
  web: { '--ray-a': '#C8509F', '--ray-b': '#D25EAA' } as React.CSSProperties
};

// 小さな英字の札（ADVICE・ROADMAP など）
const Tag: React.FC<{ children: React.ReactNode; tone?: string; className?: string }> = ({ children, tone = 'bg-coral text-white', className = '' }) => (
  <span className={`inline-block -rotate-3 border-[3px] border-[#111] px-3 pt-1 pb-0.5 font-comic text-[18px] md:text-[20px] leading-none tracking-[0.08em] shadow-[3px_3px_0_#111] ${tone} ${className}`}>{children}</span>
);

// 文の流れに置く吹き出し（質問用）。尾は、スマホは下の辺から右下へ、PCは右の辺から、右にいるヒーローへ向ける
const Say: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`relative bg-white border-[3px] border-[#111] rounded-[28px] md:rounded-[44px] shadow-[4px_4px_0_#111] ${className}`}>
    {children}
    <svg viewBox="0 0 30 36" className="md:hidden absolute right-[24%] -bottom-[31px] w-[30px] h-[36px]" aria-hidden="true">
      <path d="M4 2 L26 34 L22 2" fill="#fff" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
      <rect x="5.5" y="-4" width="15" height="7" fill="#fff" />
    </svg>
    <svg viewBox="0 0 36 30" className="hidden md:block absolute -right-[30px] bottom-[18%] w-[36px] h-[30px]" aria-hidden="true">
      <path d="M2 4 L34 24 L2 20" fill="#fff" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
      <rect x="-4" y="5.5" width="7" height="13" fill="#fff" />
    </svg>
  </div>
);

const ItCheck: React.FC = () => {
  const [answers, setAnswers] = useState<number[]>([]);
  const [step, setStep] = useState<'intro' | number | 'result'>('intro');
  const [unlocked, setUnlocked] = useState(false);
  const top = useRef<HTMLDivElement>(null);

  // 前回の回答が残っていれば、結果から再開する
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE) || 'null') as Saved | null;
      if (saved && saved.answers.length === questionCount) {
        setAnswers(saved.answers);
        setUnlocked(saved.unlocked);
        setStep('result');
      }
    } catch {
      /* 保存できない環境でも、診断はそのまま使える */
    }
  }, []);

  const save = (next: Saved) => {
    try {
      localStorage.setItem(STORE, JSON.stringify(next));
    } catch {
      /* 同上 */
    }
  };

  const scrollTop = () => top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const start = () => {
    setAnswers([]);
    setUnlocked(false);
    setStep(0);
    track('it_check_start');
    scrollTop();
  };

  const answer = (point: number) => {
    if (typeof step !== 'number') return;
    const next = [...answers.slice(0, step), point];
    setAnswers(next);
    if (step + 1 < questionCount) {
      setStep(step + 1);
    } else {
      setStep('result');
      save({ answers: next, unlocked: false });
      track('it_check_complete', { score: scoreAnswers(next).total });
      scrollTop();
    }
  };

  const unlock = () => {
    setUnlocked(true);
    save({ answers, unlocked: true });
  };

  return (
    <div className="bg-[#FAF3E0] print:bg-white text-sumi overflow-x-clip">
      <Helmet>
        <title>会社のIT健康診断（無料・3分）| 中小企業のITの弱点がわかる - Arcle</title>
        <meta
          name="description"
          content="20問に答えるだけで、PC・セキュリティ、データ活用、生成AI活用、ホームページの4分野から、会社のITの得意・苦手がわかる無料の診断です。登録なしで結果を見られます。"
        />
        <link rel="canonical" href="https://www.arcle.net/it-check" />
      </Helmet>

      <div className="no-print">
      <PageHeader
        en="IT Check"
        title={
          <>
            3分でわかる、
            <br />
            <Mark className="bg-coral">会社のIT健康診断</Mark>
          </>
        }
        lead={
          <>
            <p>20問に「できている・一部だけ・できていない」で答えるだけ。PC・セキュリティ、データ活用、生成AI活用、ホームページの4分野から、御社のITの得意と苦手が分かります。</p>
            <p className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-4">
              <button type="button" onClick={start} className={`${comicBtn} bg-coral text-white text-[17px] px-8`}>
                {step === 'result' ? 'もう一度診断する' : '診断をはじめる'}
                <ArrowRight className="w-5 h-5" strokeWidth={3} />
              </button>
              <span className="inline-block -rotate-1 bg-white border-[3px] border-[#111] px-3 py-2 text-sm font-bold leading-relaxed text-sumi shadow-[3px_3px_0_#111]">無料・登録なしで結果が見られます<br className="sm:hidden" /><span className="hidden sm:inline">／</span>診断後に『はじめてのDX読本』もプレゼント</span>
            </p>
          </>
        }
        crumbs={[{ label: '会社のIT健康診断' }]}
        image={comicIllust('contact-check-check-header')}
        imageMode="panel"
      />
      </div>

      <div ref={top} className="scroll-mt-20" />
      {step === 'intro' && <Intro onStart={start} />}
      {typeof step === 'number' && <Quiz index={step} onAnswer={answer} onBack={() => setStep(Math.max(0, step - 1))} />}
      {step === 'result' && <Result answers={answers} unlocked={unlocked} onUnlock={unlock} onRetry={start} />}
    </div>
  );
};

// はじめる前の説明（3つの手順）。左にヒーローの大ゴマ、右に手順の3コマ
const Intro: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <section className="relative py-20 md:py-28 bg-sumi comic-dots-light border-y-[4px] border-[#111]">
    <div className="max-w-6xl mx-auto px-4 sm:px-5">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-12 items-center">
        <div className={`pop-reveal relative aspect-[5/4] sm:aspect-[16/11] lg:aspect-[4/5] -rotate-1 comic-rays [--ray-a:#F2B544] [--ray-b:#F6C35F] ${panel} shadow-[10px_10px_0_#F07A5A] [clip-path:inset(-40%_-40%_0_-40%)]`}>
          <img
            src={comicIllust('contact-check-quiz')}
            alt=""
            className="absolute bottom-0 right-0 w-[78%] sm:w-[60%] lg:w-[92%] h-auto max-w-none"
            loading="lazy"
          />
          <Bubble className="left-[5%] top-[12%] lg:top-[6%] text-[clamp(30px,7vw,52px)] tracking-[0.04em]" tailAt={72} lean={0.7} rotate={-6} delay={0.2}>
            READY?
          </Bubble>
        </div>
        <ol className="space-y-6 md:space-y-7">
          {[
            { title: '20問に答える', body: '4分野×5問。考え込まずに、いまの会社の様子で答えてください。', icon: '01' },
            { title: 'その場で結果がわかる', body: '総合点と4分野のレーダーチャート、いちばん伸ばしたい分野がすぐに見られます。', icon: '02' },
            { title: '詳しい解説とDX読本を受け取る', body: `会社名などを入力すると、分野ごとの「まずやること」と進める順番が見られます。『はじめてのDX読本』も${deliverByMail ? 'メールで' : ''}プレゼントします。`, icon: '03' }
          ].map((item, i) => (
            <li
              key={item.title}
              style={{ animationDelay: `${i * 100}ms` }}
              className={`pop-reveal relative bg-[#FAF3E0] pl-5 pr-5 pt-8 pb-5 sm:pl-[104px] sm:pt-5 sm:min-h-[112px] ${panel} shadow-[8px_8px_0_#F2B544] ${i % 2 ? 'rotate-[0.6deg]' : '-rotate-[0.6deg]'}`}
            >
              <span className="absolute -top-5 left-4 sm:top-1/2 sm:-translate-y-1/2 sm:left-4 grid place-items-center w-14 h-12 sm:w-[68px] sm:h-[68px] bg-coral border-[3px] border-[#111] shadow-[3px_3px_0_#111] -rotate-6 font-comic text-[30px] sm:text-[40px] leading-none text-white [paint-order:stroke_fill] [-webkit-text-stroke:5px_#111]">
                {item.icon}
              </span>
              <h2 className="font-manga text-[20px] md:text-[24px] leading-snug [word-break:auto-phrase]">{item.title}</h2>
              <p className="mt-2 text-[15px] leading-[1.9] font-bold text-sumi">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-14 text-center">
        <button type="button" onClick={onStart} className={`${comicBtnShape} bg-mustard text-[#111] text-[19px] px-10 py-5 shadow-[6px_6px_0_#F07A5A] hover:shadow-[3px_3px_0_#F07A5A]`}>
          診断をはじめる
          <ArrowRight className="w-5 h-5" strokeWidth={3} />
        </button>
      </p>
    </div>
  </section>
);

// 1問ずつ出す。答えるとすぐ次の質問へ進む。質問はヒーローの吹き出しで、答えは下のボタンから選ぶ
const choiceTone = ['bg-svc-josys text-white', 'bg-mustard text-[#111]', 'bg-coral text-white'];

const Quiz: React.FC<{ index: number; onAnswer: (point: number) => void; onBack: () => void }> = ({ index, onAnswer, onBack }) => {
  const { area, q } = flat[index];
  const s = service(area.key);
  const inArea = area.questions.indexOf(q) + 1;
  return (
    <section className="py-12 md:py-20 bg-[#FAF3E0] comic-dots border-t-[4px] border-[#111]">
      <div className="max-w-3xl mx-auto px-4 sm:px-5">
        {/* 進み具合 */}
        <div className="flex items-end justify-between gap-3">
          <span className="inline-flex items-baseline gap-1.5 -rotate-2 bg-mustard border-[3px] border-[#111] px-3 pt-1 pb-0.5 shadow-[3px_3px_0_#111]">
            <span className="font-comic text-[30px] md:text-[36px] leading-none tracking-[0.04em]">Q{index + 1}</span>
            <span className="font-comic text-[18px] leading-none text-[#111]/70"> / {questionCount}</span>
          </span>
          {index > 0 && (
            <button type="button" onClick={onBack} className="inline-flex items-center gap-1 bg-white border-[3px] border-[#111] px-3 py-1.5 text-sm font-manga shadow-[3px_3px_0_#111] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#111]">
              <ArrowLeft className="w-4 h-4" strokeWidth={3} />
              前の質問
            </button>
          )}
        </div>
        <div className="mt-4 h-5 bg-white border-[3px] border-[#111] shadow-[3px_3px_0_#111] overflow-hidden">
          <div className={`relative h-full ${s.bg} border-r-[3px] border-[#111] transition-[width] duration-300`} style={{ width: `${(index / questionCount) * 100}%` }}>
            <span className="absolute inset-0 comic-dots-light" aria-hidden="true" />
          </div>
        </div>

        <div key={index} className={`pop-in-now mt-8 bg-white ${panel}`}>
          {/* 質問のコマ：事業色の集中線に、ヒーローと吹き出し */}
          <div className="relative overflow-hidden comic-rays border-b-[4px] border-[#111] px-4 sm:px-7 pt-5" style={rays[area.key]}>
            <span className="relative z-10 inline-flex items-center gap-2">
              <span className="inline-block -rotate-3 bg-white px-3 py-1 text-sm font-manga text-[#111] border-[3px] border-[#111] shadow-[3px_3px_0_#111]">{area.label}</span>
              <span className="font-comic text-[18px] tracking-[0.06em] text-white [paint-order:stroke_fill] [-webkit-text-stroke:4px_#111]">
                {inArea} / {area.questions.length}
              </span>
            </span>
            <div className="relative mt-4 md:grid md:grid-cols-[minmax(0,1fr)_210px] md:items-end md:gap-9">
              <Say className="relative z-10 md:mb-6 px-5 py-5 md:px-8 md:py-7 [word-break:auto-phrase]">
                <h2 className="font-manga text-[19px] sm:text-[21px] md:text-[25px] leading-[1.55] text-[#111]">{q}</h2>
              </Say>
              <img src={comicIllust('contact-check-quiz')} alt="" className="block ml-auto mr-[2%] -mt-1 w-[136px] sm:w-[160px] md:m-0 md:w-full h-auto translate-y-[2px]" />
            </div>
          </div>
          <div className="grid gap-4 p-5 sm:p-7">
            {choices.map((c, n) => (
              <button
                key={c.label}
                type="button"
                onClick={() => onAnswer(c.point)}
                className="group w-full flex items-center gap-4 text-left bg-white border-[3px] border-[#111] px-4 py-3.5 font-manga text-[16px] md:text-[18px] shadow-[5px_5px_0_#111] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_#111] hover:bg-mustard/40"
              >
                <span className={`shrink-0 grid place-items-center w-10 h-10 border-[3px] border-[#111] font-comic text-[24px] leading-none -rotate-6 transition-transform group-hover:rotate-6 ${choiceTone[n] ?? 'bg-white'}`} aria-hidden="true">
                  {String.fromCharCode(65 + n)}
                </span>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// 8軸のレーダーチャート。4分野をそれぞれ2つの軸に分け、分野ごとに背景を色分けする
const colors: Record<string, string> = { josys: '#3B6FE0', data: '#5B5BD6', ai: '#8E5BD0', web: '#C8509F' };

const Radar: React.FC<{ scores: AreaScore[] }> = ({ scores }) => {
  const R = 118;
  const axes = scores.flatMap((s) => s.facets.map((f) => ({ ...f, key: s.area.key })));
  const n = axes.length;
  // 分野の真ん中の向き（上・右・下・左）から、左右に半分ずつずらして2本の軸を置く
  const angle = (i: number) => ((-90 - 180 / n + (360 / n) * i) * Math.PI) / 180;
  const at = (i: number, r: number): [number, number] => [Math.cos(angle(i)) * R * r, Math.sin(angle(i)) * R * r];
  const ring = (r: number) => axes.map((_, i) => at(i, r).join(',')).join(' ');
  const mid = (i: number, j: number) => {
    const [x1, y1] = at(i, 1);
    const [x2, y2] = at(j, 1);
    return `${(x1 + x2) / 2},${(y1 + y2) / 2}`;
  };
  const data = axes.map((a, i) => at(i, Math.max(a.rate, 0.05)));
  return (
    <div>
      <svg viewBox="-228 -152 456 304" className="w-full max-w-[460px] mx-auto" role="img" aria-label={axes.map((a) => `${a.label} ${Math.round(a.rate * 100)}%`).join('、')}>
        <polygon points={ring(1)} fill="#fff" />
        {scores.map((s, k) => (
          <polygon key={s.area.key} points={`0,0 ${mid((2 * k - 1 + n) % n, 2 * k)} ${at(2 * k, 1).join(',')} ${at(2 * k + 1, 1).join(',')} ${mid(2 * k + 1, (2 * k + 2) % n)}`} fill={colors[s.area.key]} fillOpacity="0.14" />
        ))}
        {[0.2, 0.4, 0.6, 0.8].map((r) => (
          <polygon key={r} points={ring(r)} fill="none" stroke="#111" strokeOpacity="0.18" strokeWidth="1.2" strokeDasharray="3 4" />
        ))}
        {axes.map((_, i) => {
          const [x, y] = at(i, 1);
          return <line key={i} x1="0" y1="0" x2={x} y2={y} stroke="#111" strokeOpacity="0.2" strokeWidth="1.2" />;
        })}
        <polygon points={ring(1)} fill="none" stroke="#111" strokeWidth="3.5" strokeLinejoin="round" />
        <polygon points={data.map((p) => p.join(',')).join(' ')} transform="translate(4 4)" fill="#111" />
        <polygon points={data.map((p) => p.join(',')).join(' ')} fill="#F2B544" stroke="#111" strokeWidth="3.5" strokeLinejoin="round" />
        {data.map(([x, y], i) => (
          <rect key={i} x={x - 6} y={y - 6} width="12" height="12" transform={`rotate(45 ${x} ${y})`} fill={colors[axes[i].key]} stroke="#111" strokeWidth="2.5" />
        ))}
        {axes.map((a, i) => {
          const cos = Math.cos(angle(i));
          const sin = Math.sin(angle(i));
          const anchor = cos > 0.3 ? 'start' : cos < -0.3 ? 'end' : 'middle';
          return (
            <text key={a.label} x={cos * (R + 12)} y={sin * (R + 14) + 5} textAnchor={anchor} fontWeight="800" fontSize="14" fill={colors[a.key]} stroke="#fff" strokeWidth="4" paintOrder="stroke" strokeLinejoin="round">
              {a.label}
            </text>
          );
        })}
      </svg>
      <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs font-bold">
        {scores.map((s) => (
          <li key={s.area.key} className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 border-2 border-[#111]" style={{ background: colors[s.area.key] }} />
            {s.area.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

// 印刷・PDF保存用のレポート。A4の2ページに収まるよう、画面とは別に組む
// 1ページ目：総合点・レーダー・ランク・回答の一覧 ／ 2ページ目：まずやること・進める順番・ご相談の案内
const PrintReport: React.FC<{ answers: number[] }> = ({ answers }) => {
  const { byArea, total, weakest, allGood, order } = scoreAnswers(answers);
  const typeName = allGood ? allGoodType : weakest.area.type;
  const answerLabel = (point: number) => choices.find((c) => c.point === point)?.label ?? '';
  const today = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
  let q = 0;
  return (
    <div className="hidden print:block text-sumi bg-white text-[10.5px] leading-[1.6]">
      {/* 1ページ目 */}
      <div className="flex items-start justify-between border-b-[2.5px] border-sumi pb-3">
        <div>
          <p className="font-en font-black italic text-2xl leading-none">Arcle</p>
          <h1 className="font-head font-black text-[22px] mt-2">会社のIT健康診断 結果レポート</h1>
          <p className="text-sumi-muted mt-0.5">{today} 診断</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-right text-[9.5px] leading-snug">
            Arcle（アークル）
            <br />
            <b className="font-en">www.arcle.net</b>
          </p>
          <img src="/images/qr-arcle.svg" alt="ArcleのサイトのQRコード" className="w-[22mm] h-[22mm]" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[1fr_1fr] gap-5 items-center">
        <div className="rounded-2xl border-2 border-sumi p-2">
          <Radar scores={byArea} />
        </div>
        <div>
          <p className="flex items-baseline gap-1.5">
            <span className="font-bold">総合</span>
            <span className="font-en font-black italic text-[64px] leading-none">{total}</span>
            <span className="font-head font-black text-lg">点</span>
            <span className="text-sumi-muted">/ 100点</span>
          </p>
          <p className="mt-3 text-sumi-muted font-bold">御社は…</p>
          <p className="font-head font-black text-[20px]">
            <Mark>{typeName}</Mark>
          </p>
          {!allGood && (
            <div className="mt-3 rounded-xl border-2 border-sumi p-3">
              <p className="font-black">いちばん伸ばしたい分野：{weakest.area.label}</p>
              <p className="mt-1">{weakest.area.results[weakest.level].text}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {byArea.map((a) => {
          const s = service(a.area.key);
          return (
            <div key={a.area.key} className="flex items-center gap-2 rounded-xl border-2 border-sumi px-2.5 py-2">
              <span className={`shrink-0 grid place-items-center w-9 h-9 rounded-lg text-white font-en font-black italic text-lg border-2 border-sumi ${s.bg}`}>{a.rank}</span>
              <span>
                <span className="block text-[9.5px] font-bold leading-tight">{a.area.label}</span>
                <span className="block font-black">{levelLabel[a.level]}</span>
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-1 text-[9px] text-sumi-muted">ランクは S・A・B・C・D の5段階です（S がいちばん整っている状態）。</p>

      <h2 className="font-head font-black text-[14px] mt-4 mb-1.5">回答の一覧</h2>
      <table className="w-full border-collapse text-[9.5px]">
        <tbody>
          {areas.map((area) =>
            area.questions.map((text, n) => {
              const i = q++;
              return (
                <tr key={text} className="border-b border-sumi/15">
                  {n === 0 && (
                    <td rowSpan={area.questions.length} className={`w-[22mm] align-top py-1 pr-2 font-black text-white px-2 ${service(area.key).bg}`}>
                      {area.label}
                    </td>
                  )}
                  <td className="py-[3px] pl-2">
                    <b className="font-en mr-1">Q{i + 1}</b>
                    {text}
                  </td>
                  <td className="w-[30mm] text-right font-bold whitespace-nowrap">{answerLabel(answers[i])}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* 2ページ目 */}
      <div style={{ breakBefore: 'page' }}>
        <h2 className="font-head font-black text-[16px] mb-2">分野ごとの「まずやること」</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {byArea.map((a) => {
            const s = service(a.area.key);
            const r = a.area.results[a.level];
            return (
              <div key={a.area.key} className="rounded-xl border-2 border-sumi p-3" style={{ breakInside: 'avoid' }}>
                <p className="flex items-center gap-2">
                  <span className={`grid place-items-center w-7 h-7 rounded-lg text-white font-en font-black italic border-2 border-sumi ${s.bg}`}>{a.rank}</span>
                  <b className="font-head font-black text-[13px]">{a.area.label}</b>
                  <span className="text-sumi-muted">{levelLabel[a.level]}</span>
                </p>
                <p className="mt-1.5">{r.text}</p>
                <ol className="mt-1.5 space-y-0.5 font-bold">
                  {r.todo.map((t, n) => (
                    <li key={t}>
                      {n + 1}. {t}
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>

        <h2 className="font-head font-black text-[16px] mt-5 mb-2">御社に合った進める順番</h2>
        <div className="grid grid-cols-4 gap-2">
          {order.map((a, i) => {
            const s = service(a.area.key);
            return (
              <div key={a.area.key} className="rounded-xl border-2 border-sumi p-2.5" style={{ breakInside: 'avoid' }}>
                <p className="font-en font-black italic text-[9px] text-sumi-muted">STEP {i + 1}</p>
                <p className={`font-head font-black text-[12px] ${s.text}`}>{a.area.label}</p>
                <p className="mt-1 font-bold">{a.area.results[a.level].todo[0]}</p>
                <p className="mt-1.5 text-[9px] text-sumi-muted">
                  Arcleの{s.name}：{prices[a.area.key]}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mt-1 text-[9px] text-sumi-muted">守りが手薄なら最初に固め、そのあとは点数の低い分野から順に進めるのがおすすめです。料金は税抜の目安です。</p>

        <div className="mt-5 flex items-center gap-5 rounded-2xl bg-sumi text-white p-5" style={{ breakInside: 'avoid' }}>
          <div className="flex-1">
            <p className="font-head font-black text-[15px]">この結果をもとに、何から始めるかを一緒に整理します。</p>
            <p className="mt-1.5 text-white/80">ご相談・お見積りは無料です。東海エリアは訪問にも対応します。資料『はじめてのDX読本』もあわせてご覧ください。</p>
            <p className="mt-2 font-bold">
              無料相談のお申し込み <span className="font-en">www.arcle.net/contact</span>
            </p>
          </div>
          <div className="text-center">
            <img src="/images/qr-arcle.svg" alt="ArcleのサイトのQRコード" className="w-[26mm] h-[26mm] rounded-md bg-white p-1" />
            <p className="mt-1 text-[9px]">サイトはこちら</p>
          </div>
        </div>
        <p className="mt-3 text-[9px] text-sumi-muted">Arcle（アークル）〒491-0835 愛知県一宮市あずら2丁目8　https://www.arcle.net</p>
      </div>
    </div>
  );
};

const Result: React.FC<{ answers: number[]; unlocked: boolean; onUnlock: () => void; onRetry: () => void }> = ({ answers, unlocked, onUnlock, onRetry }) => {
  const { byArea, total, weakest, allGood, order } = scoreAnswers(answers);
  const typeName = allGood ? allGoodType : weakest.area.type;
  const ws = service(weakest.area.key);
  const summary = `総合${total}点 / ${byArea.map((a) => `${a.area.label} ${a.rank}(${a.score}/${a.max})`).join(' / ')} / 回答:${answers.join('')}`;

  return (
    <>
      {/* 印刷・PDF保存用のレポート（画面には出さない） */}
      {unlocked && <PrintReport answers={answers} />}

      {/* 無料で見せる部分 */}
      <section className="print:hidden pt-14 pb-20 md:pt-20 md:pb-28 bg-white comic-dots border-t-[4px] border-[#111]">
        {/* 見出し：トップの「お悩み」と同じ、傾いた黒い帯 */}
        <div className="pop-reveal relative -rotate-1 bg-[#111] py-4 md:py-5 border-y-[4px] border-mustard">
          <h2 className="flex items-center justify-center gap-3 md:gap-5 font-manga text-white text-[28px] md:text-[44px] leading-tight">
            <span className="font-comic text-mustard text-[30px] md:text-[48px] tracking-[0.06em] -rotate-3 [text-shadow:3px_3px_0_#F07A5A]">RESULT</span>
            診断結果
          </h2>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-5">
          <div className="mt-14 md:mt-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-12 lg:gap-12 items-center">
            {/* レーダーのコマ */}
            <div className={`pop-reveal relative bg-[#FAF3E0] px-3 pt-10 pb-6 sm:p-8 sm:pt-12 -rotate-1 ${panel}`}>
              <Caption tone="bg-svc-josys text-white" className="absolute -top-4 left-4 -rotate-2 font-comic !text-[18px] md:!text-[20px] tracking-[0.08em]">SCAN COMPLETE!</Caption>
              <Radar scores={byArea} />
            </div>
            <div className="pop-reveal min-w-0">
              {/* 総合点：爆発形の中に大きな数字 */}
              <p className="flex items-center gap-2 sm:gap-3">
                <span className="font-manga text-lg">総合</span>
                <span className="relative block w-[150px] sm:w-[180px] md:w-[200px] aspect-square shrink-0">
                  <Burst
                    text={total}
                    className="inset-0 w-full"
                    fill="#F2B544"
                    core="#F07A5A"
                    textClass="text-white text-[64px] sm:text-[78px] md:text-[88px]"
                    rotate={-6}
                    delay={0.15}
                  />
                  <span className="sr-only">{total}</span>
                </span>
                <span className="font-manga text-2xl">点</span>
                <span className="text-sm font-bold text-sumi-muted ml-1">/ 100点</span>
              </p>
              <p className="mt-4">
                <Caption tone="bg-white text-[#111]" className="-rotate-2">御社は…</Caption>
              </p>
              <p className="font-manga text-[26px] md:text-[36px] leading-snug mt-3 text-[#111] [paint-order:stroke_fill] [-webkit-text-stroke:6px_#fff] [text-shadow:4px_4px_0_#F2B544] [word-break:auto-phrase]">
                <Mark className="bg-coral">{typeName}</Mark>
              </p>
              {!allGood && (
                <div className={`relative mt-7 bg-white p-5 pt-7 border-[3px] border-[#111] shadow-[5px_5px_0_#111]`}>
                  <span className={`absolute inset-0 ${ws.tint}`} aria-hidden="true" />
                  <p className={`relative -mt-11 mb-3 w-fit -rotate-2 border-[3px] border-[#111] px-3 py-1 text-sm font-manga text-white shadow-[3px_3px_0_#111] ${ws.bg}`}>
                    いちばん伸ばしたい分野：<span>{weakest.area.label}</span>
                  </p>
                  <p className="relative text-[15px] leading-[1.9] font-bold">{weakest.area.results[weakest.level].text}</p>
                </div>
              )}
              <ul className="mt-7 grid grid-cols-2 gap-3">
                {byArea.map((a) => {
                  const s = service(a.area.key);
                  return (
                    <li key={a.area.key} className="flex items-center gap-3 bg-white border-[3px] border-[#111] px-3 py-3 shadow-[4px_4px_0_#111]">
                      <span className={`shrink-0 grid place-items-center w-11 h-11 md:w-12 md:h-12 text-white font-comic text-[30px] leading-none border-[3px] border-[#111] -rotate-6 [paint-order:stroke_fill] [-webkit-text-stroke:4px_#111] ${s.bg}`}>{a.rank}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] md:text-xs font-bold leading-tight [word-break:auto-phrase]">{a.area.label}</span>
                        <span className="block text-sm font-manga mt-0.5">{levelLabel[a.level]}</span>
                        <span className="mt-1.5 block h-2.5 bg-white border-2 border-[#111] overflow-hidden">
                          <span className={`block h-full ${s.bg}`} style={{ width: `${a.rate * 100}%` }} />
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-3 text-xs text-sumi-muted">ランクは S・A・B・C・D の5段階です（S がいちばん整っている状態）。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 解禁する部分 */}
      <section className="print:hidden relative py-20 md:py-28 border-t-[4px] border-[#111] bg-mustard comic-dots">
        <div className="max-w-6xl mx-auto px-4 sm:px-5">
          {unlocked ? (
            <>
              <Details byArea={byArea} order={order} />
              <div className="no-print mt-14 flex flex-wrap justify-center gap-4">
                <button type="button" onClick={() => window.print()} className={`${comicBtn} bg-white text-[#111]`}>
                  <Printer className="w-4 h-4" strokeWidth={2.6} />
                  結果を印刷・PDFで保存
                </button>
                <button type="button" onClick={onRetry} className="inline-flex items-center gap-2 px-6 py-4 font-manga text-[15px] text-[#111] underline decoration-[3px] underline-offset-4 hover:text-white">
                  <RotateCcw className="w-4 h-4" strokeWidth={2.6} />
                  もう一度診断する
                </button>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_460px] gap-14 lg:gap-12 items-start">
              <LockedPreview byArea={byArea} order={order} />
              <div className="lg:sticky lg:top-24 pt-14 lg:pt-16">
                <UnlockForm summary={summary} onUnlock={onUnlock} />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

// 入力前に見せる「入力すると見られるもの」。見出しと分野名ははっきり出し、中身だけぼかす
const LockedPreview: React.FC<{ byArea: AreaScore[]; order: AreaScore[] }> = ({ byArea, order }) => {
  const blur = 'blur-[5px] select-none pointer-events-none';
  return (
    <div className="min-w-0">
      <p className="inline-flex items-center gap-2 -rotate-1 bg-[#111] px-4 py-2 text-sm font-manga text-white border-[3px] border-[#111] shadow-[4px_4px_0_#fff]">
        <Lock className="w-4 h-4 text-mustard" strokeWidth={3} />
        入力すると、ここが見られます
      </p>

      <div className="mt-10">
        <Tag>ADVICE</Tag>
        <h2 className="font-manga text-[24px] md:text-[32px] leading-[1.4] mt-4 [word-break:auto-phrase]">
          分野ごとの<Mark className="bg-white">まずやること</Mark>
        </h2>
        <p className="mt-2 text-sm font-bold">4つの分野それぞれに、御社の状態に合わせた解説と「まずやること」3つ</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
          {byArea.map((a) => {
            const s = service(a.area.key);
            const r = a.area.results[a.level];
            return (
              <div key={a.area.key} className="bg-white p-3.5 sm:p-5 border-[3px] border-[#111] shadow-[4px_4px_0_#111] sm:shadow-[6px_6px_0_#111]">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <IconTile bg={s.bg} className="!w-9 !h-9 sm:!w-11 sm:!h-11" icon={React.createElement(areaIcon[a.area.key], { className: 'w-4 h-4 sm:w-5 sm:h-5', strokeWidth: 2.4 })} />
                  <div>
                    <p className="font-manga text-[14px] sm:text-[17px] leading-tight">{a.area.label}</p>
                    <p className="text-[11px] sm:text-xs font-bold text-sumi-muted mt-0.5">ランク{a.rank}・{levelLabel[a.level]}</p>
                  </div>
                </div>
                <div aria-hidden="true" className={`mt-3 text-xs leading-relaxed ${blur}`}>
                  <p className="hidden sm:block">{r.text}</p>
                  <p className="sm:mt-2 font-bold">1. {r.todo[0]}</p>
                  <p className="hidden sm:block font-bold">2. {r.todo[1]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-14">
        <Tag tone="bg-svc-josys text-white">ROADMAP</Tag>
        <h2 className="font-manga text-[24px] md:text-[32px] leading-[1.4] mt-4 [word-break:auto-phrase]">
          御社に合った<Mark className="bg-white">進める順番</Mark>
        </h2>
        <p className="mt-2 text-sm font-bold">どの分野から手をつけるか、おすすめのサービスと料金の目安つき</p>
        <ol className="mt-6 grid grid-cols-4 gap-2 sm:gap-3">
          {order.map((a, i) => (
            <li key={a.area.key} className="bg-white p-2.5 sm:p-4 border-[3px] border-[#111] shadow-[3px_3px_0_#111] sm:shadow-[4px_4px_0_#111]">
              <span className="font-comic text-[14px] sm:text-[18px] leading-none tracking-[0.04em]">STEP {i + 1}</span>
              <p aria-hidden="true" className={`mt-1 text-[10px] sm:text-xs font-bold leading-relaxed line-clamp-3 sm:line-clamp-none ${blur}`}>
                {a.area.label}
                <br />
                {a.area.results[a.level].todo[0]}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

// 解禁後に見せる中身：分野ごとの解説、進める順番、おすすめのサービス、資料PDFの案内
const Details: React.FC<{ byArea: AreaScore[]; order: AreaScore[] }> = ({ byArea, order }) => {
  return (
    <>
      <div className="text-center">
        <Tag>ADVICE</Tag>
        <h2 className="font-manga text-[26px] md:text-[42px] leading-[1.4] mt-5 [word-break:auto-phrase]">
          分野ごとの<Mark className="bg-white">まずやること</Mark>
        </h2>
      </div>
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        {byArea.map((a, k) => {
          const s = service(a.area.key);
          const r = a.area.results[a.level];
          return (
            <article key={a.area.key} className={`print-card bg-white ${panel} ${k % 2 ? 'md:rotate-[0.6deg]' : 'md:-rotate-[0.6deg]'}`}>
              {/* 分野の帯：事業色の網点。右にランクの札 */}
              <div className={`relative flex items-center gap-4 border-b-[4px] border-[#111] px-5 py-4 text-white ${s.bg}`}>
                <span className="absolute inset-0 comic-dots-light" aria-hidden="true" />
                <span className="relative grid place-items-center w-12 h-12 bg-white text-[#111] border-[3px] border-[#111] shadow-[3px_3px_0_#111] -rotate-6">
                  {React.createElement(areaIcon[a.area.key], { className: 'w-6 h-6', strokeWidth: 2.4 })}
                </span>
                <div className="relative min-w-0 flex-1">
                  <h3 className="font-manga text-xl md:text-2xl leading-tight [paint-order:stroke_fill] [-webkit-text-stroke:5px_#111]">{a.area.label}</h3>
                  <p className="text-xs font-bold mt-1">
                    ランク{a.rank}・{levelLabel[a.level]}
                  </p>
                </div>
                <span className="relative shrink-0 grid place-items-center w-14 h-14 bg-mustard border-[3px] border-[#111] shadow-[3px_3px_0_#111] rotate-6 font-comic text-[38px] leading-none text-white [paint-order:stroke_fill] [-webkit-text-stroke:5px_#111]" aria-hidden="true">
                  {a.rank}
                </span>
              </div>
              <div className="p-6">
                <p className="text-[15px] leading-[1.9]">{r.text}</p>
                <ol className="mt-5 space-y-3">
                  {r.todo.map((t, n) => (
                    <li key={t} className="flex gap-3 text-sm leading-relaxed font-bold">
                      <span className={`shrink-0 grid place-items-center w-7 h-7 text-white font-comic text-[17px] leading-none border-[3px] border-[#111] -rotate-6 ${s.bg}`}>{n + 1}</span>
                      {t}
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-24 text-center">
        <Tag tone="bg-svc-josys text-white">ROADMAP</Tag>
        <h2 className="font-manga text-[26px] md:text-[42px] leading-[1.4] mt-5 [word-break:auto-phrase]">
          御社に合った<Mark className="bg-white">進める順番</Mark>
        </h2>
        <p className="mt-4 text-sm font-bold leading-[1.9] max-w-2xl mx-auto [word-break:auto-phrase]">守りが手薄なら最初に固め、そのあとは点数の低い分野から順に進めるのがおすすめです。</p>
      </div>
      {/* 4コマ：左から順に読む。PCはコマの間に矢印 */}
      <ol className="mt-12 grid md:grid-cols-4 gap-8 md:gap-6">
        {order.map((a, i) => {
          const s = service(a.area.key);
          return (
            <li key={a.area.key} className={`print-card relative bg-white flex flex-col ${panel} ${i % 2 ? 'md:rotate-1' : 'md:-rotate-1'}`}>
              <div className="relative overflow-hidden border-b-[4px] border-[#111] px-5 pt-4 pb-3 comic-rays" style={rays[a.area.key]}>
                <span className="relative font-comic text-[30px] leading-none tracking-[0.04em] text-white [paint-order:stroke_fill] [-webkit-text-stroke:6px_#111] [text-shadow:3px_3px_0_#111]">STEP {i + 1}</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className={`font-manga text-xl ${s.text}`}>{a.area.label}</p>
                <p className="mt-2 text-sm font-bold leading-relaxed flex-1">{a.area.results[a.level].todo[0]}</p>
                <a href={s.href} className={`no-print mt-5 inline-flex items-center justify-center gap-1 bg-white border-[3px] border-[#111] px-3 py-2 text-sm font-manga shadow-[3px_3px_0_#111] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#111] ${s.text}`}>
                  {s.name}を見る
                  <ArrowRight className="w-4 h-4" strokeWidth={3} />
                </a>
                <p className="mt-3 text-xs font-bold text-sumi-muted">料金の目安：{prices[a.area.key]}</p>
              </div>
              {i < order.length - 1 && (
                <svg viewBox="0 0 24 32" className="hidden md:block absolute top-1/2 -right-[22px] z-10 w-6 h-8 -translate-y-1/2" aria-hidden="true">
                  <path d="M3 3 L21 16 L3 29 Z" fill="#F07A5A" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
                </svg>
              )}
            </li>
          );
        })}
      </ol>

      {/* お役立ち資料のコマ：左に本を差し出すヒーロー、右に案内 */}
      <div className={`no-print mt-24 grid md:grid-cols-[1fr_1.3fr] bg-white ${panel} shadow-[10px_10px_0_#111]`}>
        <div className="relative min-h-[300px] md:min-h-0 comic-rays [--ray-a:#3B6FE0] [--ray-b:#4A7DEA] border-b-[4px] md:border-b-0 md:border-r-[4px] border-[#111] overflow-hidden">
          <img src={comicIllust('contact-check-book')} alt="" className="pop-tilt absolute left-1/2 bottom-0 -translate-x-1/2 w-[86%] max-w-[340px] md:max-w-[380px]" loading="lazy" />
        </div>
        <div className="p-7 md:p-12">
          <Caption className="-rotate-2">お役立ち資料</Caption>
          <h3 className="font-manga text-[24px] md:text-[32px] leading-snug mt-5 [word-break:auto-phrase]">IT担当がいない会社のための はじめてのDX読本</h3>
          {deliverByMail ? (
            <p className="inline-flex items-center gap-2 mt-5 bg-mustard/40 px-5 py-3 text-sm font-manga border-[3px] border-[#111] shadow-[3px_3px_0_#111]">
              <Mail className="w-4 h-4 shrink-0" strokeWidth={2.6} />
              ご入力いただいたメールアドレスに、追ってお送りします
            </p>
          ) : (
            <p className="mt-5">
              <a href={guidePdf} download onClick={() => track('guide_download')} className={`${comicBtnShape} bg-[#111] text-white shadow-[5px_5px_0_#F2B544] hover:shadow-[2px_2px_0_#F2B544]`}>
                <Download className="w-4 h-4" strokeWidth={3} />
                資料PDFをダウンロード
              </a>
            </p>
          )}
          <p className="mt-5 text-sm leading-[1.9] text-sumi">今後のDXのご参考に、よくある困りごとや分野ごとの進め方、セルフチェックシート、支援のモデルケースをまとめました。社内での共有にもお使いください。{deliverByMail && 'メールが見当たらないときは、迷惑メールのフォルダもご確認ください。'}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/contact" className={`${comicBtn} bg-coral text-white`}>
              結果をもとに無料で相談する
              <ArrowRight className="w-4 h-4" strokeWidth={3} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const UnlockForm: React.FC<{ summary: string; onUnlock: () => void }> = ({ summary, onUnlock }) => {
  const [lead, setLead] = useState<Lead>({ company: '', name: '', email: '', phone: '' });
  const [agree, setAgree] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState('');
  // ロボットよけ：画面には見えない欄。ここが埋まっていたら送信しない
  const [trap, setTrap] = useState('');
  const set = (key: keyof Lead) => (e: React.ChangeEvent<HTMLInputElement>) => setLead({ ...lead, [key]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDummyEmail(lead.email)) {
      setEmailError('ご連絡のとれるメールアドレスを入力してください');
      return;
    }
    setSending(true);
    try {
      if (!trap) await sendLead(lead, summary);
    } catch {
      /* 送信に失敗しても、入力してくれた人には結果を見せる */
    }
    track('generate_lead', { form: 'it_check' });
    onUnlock();
  };

  const input = 'mt-1.5 w-full bg-white border-[3px] border-[#111] px-4 py-3 text-base font-normal shadow-[3px_3px_0_#111] focus:outline-none focus:bg-[#FFF8E6] focus:shadow-[3px_3px_0_#F07A5A]';
  const required = <span className="ml-1.5 inline-block bg-coral text-white border-2 border-[#111] px-1.5 text-[11px] font-manga leading-[1.5] align-[1px]">必須</span>;

  return (
    <form onSubmit={submit} className={`relative w-full max-w-lg mx-auto lg:mx-0 bg-white ${panel} shadow-[10px_10px_0_#111]`}>
      {/* 入力するともらえる資料を、フォームの上で大きく打ち出す。本を差し出すヒーローが上へはみ出す */}
      <div className="relative border-b-[4px] border-[#111] comic-rays [--ray-a:#F07A5A] [--ray-b:#F48B6E] px-5 sm:px-7 md:px-9 pt-7 pb-6">
        <p className="inline-flex items-center gap-1.5 -rotate-2 bg-mustard px-2.5 py-1 text-xs font-manga text-[#111] border-[3px] border-[#111] shadow-[2px_2px_0_#111]">
          <Gift className="w-3.5 h-3.5" strokeWidth={2.6} />
          入力した方にもれなく
        </p>
        <p className="font-manga text-[22px] md:text-[26px] leading-tight mt-4 text-white [paint-order:stroke_fill] [-webkit-text-stroke:6px_#111] [text-shadow:3px_3px_0_#111] [word-break:auto-phrase]">
          『はじめてのDX読本』
          <br />
          プレゼント！
        </p>
        <p className="mt-3 inline-block bg-white border-2 border-[#111] px-2 py-0.5 text-xs font-bold">PDF・30ページ／{deliverByMail ? 'メールでお届けします' : '入力後すぐにダウンロードできます'}</p>
        <img src={comicIllust('contact-check-book')} alt="" className="pop-float absolute -right-3 -top-[86px] w-[142px] sm:w-[150px] pointer-events-none" />
      </div>
      <div className="p-5 sm:p-7 md:p-9">
        <p className="inline-flex items-center gap-2 text-sm font-manga">
          <Lock className="w-4 h-4" strokeWidth={3} />
          診断結果の続きも、入力で見られます
        </p>
        <ul className="mt-3 space-y-1.5 text-sm font-bold">
          {['分野ごとの「まずやること」', '御社に合った進める順番と、おすすめのサービス', deliverByMail ? '『はじめてのDX読本』（PDF）をメールでお届け' : '『はじめてのDX読本』（PDF）のダウンロード'].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <span className="shrink-0 mt-0.5 grid place-items-center w-5 h-5 bg-svc-josys text-white text-[11px] border-2 border-[#111]">✓</span>
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-4">
          <label className="block text-sm font-bold">
            会社名{required}
            <input required value={lead.company} onChange={set('company')} autoComplete="organization" className={input} />
          </label>
          <label className="block text-sm font-bold">
            お名前{required}
            <input required value={lead.name} onChange={set('name')} autoComplete="name" className={input} />
          </label>
          <label className="block text-sm font-bold">
            メールアドレス{required}
            <input
              required
              type="email"
              value={lead.email}
              onChange={(e) => {
                setEmailError('');
                set('email')(e);
              }}
              autoComplete="email"
              aria-invalid={!!emailError}
              className={input}
            />
            {emailError ? (
              <span className="block mt-1.5 text-xs font-bold text-coral">{emailError}</span>
            ) : (
              deliverByMail && lead.email && <span className="block mt-1.5 text-xs font-normal text-sumi-muted break-all">『はじめてのDX読本』は「{lead.email}」にお送りします</span>
            )}
          </label>
          <label aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
            ホームページ
            <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
          </label>
          <label className="block text-sm font-bold">
            電話番号{required}
            <input required pattern="[0-9０-９\-－+ ]{10,}" title="電話番号を入力してください（例：0586-00-0000）" type="tel" value={lead.phone} onChange={set('phone')} autoComplete="tel" className={input} />
          </label>
          <label className="flex items-start gap-2.5 text-xs leading-relaxed text-sumi-muted">
            <input required type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 w-4 h-4 accent-[#111]" />
            <span>入力いただいた情報は、診断結果と資料のご提供、Arcleからのご連絡・ご案内にのみ使います。<a href="/privacy" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-sumi">プライバシーポリシー</a>に同意して送信します。</span>
          </label>
        </div>
        <button type="submit" disabled={sending} className={`mt-7 w-full ${comicBtnShape} px-4 sm:px-7 text-[15px] sm:text-[16px] whitespace-nowrap bg-[#111] text-white shadow-[5px_5px_0_#F2B544] hover:shadow-[2px_2px_0_#F2B544] disabled:opacity-60`}>
          {sending ? '送信しています…' : '結果の続きを見る・読本を受け取る'}
          <ArrowRight className="w-4 h-4" strokeWidth={3} />
        </button>
      </div>
    </form>
  );
};

export default ItCheck;
