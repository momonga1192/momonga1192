import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, BarChart3, Bot, Gift, Globe, Lock, Mail, Printer, RotateCcw, Shield } from 'lucide-react';
import { IconTile, Mark, PageHeader, Sparkle, Sticker, card, press } from '../parts';
import { illust, prices, services } from '../theme';
import { allGoodType, areas, choices, levelLabel, questionCount, scoreAnswers, type AreaScore } from './checkData';
import { isDummyEmail, sendLead, type Lead } from './leadForm';

// 会社のIT健康診断。20問に答えると、総合点・レーダーチャート・一番弱い分野までは無料で見せ、
// 分野ごとの解説・進める順番・おすすめサービスは、会社名などを入力すると解禁する。資料PDFは入力されたメールアドレスに送る
const STORE = 'arcle-it-check';

type Saved = { answers: number[]; unlocked: boolean };

const track = (name: string, params?: Record<string, unknown>) => window.gtag?.('event', name, params);

// 質問を通し番号で引けるよう、分野と一緒に平らに並べる
const flat = areas.flatMap((area) => area.questions.map((q) => ({ area, q })));

const service = (key: string) => services.find((s) => s.key === key)!;
const areaIcon = { josys: Shield, data: BarChart3, ai: Bot, web: Globe };

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
    <div className="bg-cream text-sumi overflow-x-clip">
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
            <Mark>会社のIT健康診断</Mark>
          </>
        }
        lead={
          <>
            <p>20問に「できている・一部だけ・できていない」で答えるだけ。PC・セキュリティ、データ活用、生成AI活用、ホームページの4分野から、御社のITの得意と苦手が分かります。</p>
            <p className="mt-6 flex flex-wrap items-center gap-4">
              <button type="button" onClick={start} className={`inline-flex items-center gap-2 px-8 py-4 rounded-full bg-sumi text-white font-black text-base border-[2.5px] border-sumi shadow-[5px_5px_0_#F2B544] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_#F2B544]`}>
                {step === 'result' ? 'もう一度診断する' : '診断をはじめる'}
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold text-sumi">無料・登録なしで結果が見られます<br className="sm:hidden" /><span className="hidden sm:inline">／</span>診断後に『はじめてのDX読本』もプレゼント</span>
            </p>
          </>
        }
        crumbs={[{ label: '会社のIT健康診断' }]}
        image={illust('check-hero')}
      />
      </div>

      <div ref={top} className="scroll-mt-20" />
      {step === 'intro' && <Intro onStart={start} />}
      {typeof step === 'number' && <Quiz index={step} onAnswer={answer} onBack={() => setStep(Math.max(0, step - 1))} />}
      {step === 'result' && <Result answers={answers} unlocked={unlocked} onUnlock={unlock} onRetry={start} />}
    </div>
  );
};

// はじめる前の説明（3つの手順）
const Intro: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <section className="py-20 md:py-28 bg-white border-t-[2.5px] border-sumi">
    <div className="max-w-6xl mx-auto px-5">
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: '20問に答える', body: '4分野×5問。考え込まずに、いまの会社の様子で答えてください。', icon: '01' },
          { title: 'その場で結果がわかる', body: '総合点と4分野のレーダーチャート、いちばん伸ばしたい分野がすぐに見られます。', icon: '02' },
          { title: '詳しい解説とDX読本を受け取る', body: '会社名などを入力すると、分野ごとの「まずやること」と進める順番が見られます。『はじめてのDX読本』もメールでプレゼントします。', icon: '03' }
        ].map((item, i) => (
          <div key={item.title} style={{ animationDelay: `${i * 80}ms` }} className={`group pop-reveal rounded-[28px] bg-cream p-7 ${card}`}>
            <span className="pop-wiggle inline-grid place-items-center w-12 h-12 rounded-full bg-coral text-white font-en font-black italic text-lg border-[2.5px] border-sumi shadow-[3px_3px_0_#1F2430] -rotate-6">{item.icon}</span>
            <h2 className="font-head font-black text-xl md:text-2xl mt-5">{item.title}</h2>
            <p className="mt-3 text-sm leading-[1.9] text-sumi-muted">{item.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-12 text-center">
        <button type="button" onClick={onStart} className={`inline-flex items-center gap-2 px-9 py-5 rounded-full bg-sumi text-white font-black text-lg border-[2.5px] border-sumi shadow-[5px_5px_0_#F2B544] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_#F2B544]`}>
          診断をはじめる
          <ArrowRight className="w-5 h-5" />
        </button>
      </p>
    </div>
  </section>
);

// 1問ずつ出す。答えるとすぐ次の質問へ進む
const Quiz: React.FC<{ index: number; onAnswer: (point: number) => void; onBack: () => void }> = ({ index, onAnswer, onBack }) => {
  const { area, q } = flat[index];
  const s = service(area.key);
  const inArea = area.questions.indexOf(q) + 1;
  return (
    <section className="py-14 md:py-20 bg-white border-t-[2.5px] border-sumi bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px]">
      <div className="max-w-2xl mx-auto px-5">
        {/* 進み具合 */}
        <div className="flex items-center justify-between text-sm font-bold">
          <span className="font-en font-black italic text-lg">
            Q{index + 1}
            <span className="text-sumi-muted text-sm"> / {questionCount}</span>
          </span>
          {index > 0 && (
            <button type="button" onClick={onBack} className="inline-flex items-center gap-1 text-sumi-muted hover:text-sumi">
              <ArrowLeft className="w-4 h-4" />
              前の質問
            </button>
          )}
        </div>
        <div className="mt-3 h-4 rounded-full bg-white border-2 border-sumi overflow-hidden">
          <div className={`h-full ${s.bg} transition-[width] duration-300`} style={{ width: `${(index / questionCount) * 100}%` }} />
        </div>

        <div key={index} className={`pop-in-now mt-8 rounded-[28px] bg-white p-7 md:p-10 ${card}`}>
          <span className="inline-flex items-center gap-3">
            <span className={`inline-block -rotate-3 rounded-lg px-3 py-1 text-sm font-black text-white border-2 border-sumi ${s.bg}`}>{area.label}</span>
            <span className="text-sm font-bold text-sumi-muted">
              {inArea} / {area.questions.length}
            </span>
          </span>
          <h2 className="font-head font-black text-[22px] md:text-[28px] leading-[1.5] mt-5 [word-break:auto-phrase]">{q}</h2>
          <div className="mt-8 grid gap-3">
            {choices.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => onAnswer(c.point)}
                className={`w-full text-left rounded-2xl px-6 py-4 font-bold bg-cream border-[2.5px] border-sumi shadow-[4px_4px_0_#1F2430] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1F2430] hover:bg-mustard/30`}
              >
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
          <polygon key={s.area.key} points={`0,0 ${mid((2 * k - 1 + n) % n, 2 * k)} ${at(2 * k, 1).join(',')} ${at(2 * k + 1, 1).join(',')} ${mid(2 * k + 1, (2 * k + 2) % n)}`} fill={colors[s.area.key]} fillOpacity="0.12" />
        ))}
        {[0.2, 0.4, 0.6, 0.8].map((r) => (
          <polygon key={r} points={ring(r)} fill="none" stroke="#1F2430" strokeOpacity="0.16" strokeWidth="1.2" strokeDasharray="3 4" />
        ))}
        {axes.map((_, i) => {
          const [x, y] = at(i, 1);
          return <line key={i} x1="0" y1="0" x2={x} y2={y} stroke="#1F2430" strokeOpacity="0.18" strokeWidth="1.2" />;
        })}
        <polygon points={ring(1)} fill="none" stroke="#1F2430" strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points={data.map((p) => p.join(',')).join(' ')} fill="#F2B544" fillOpacity="0.72" stroke="#1F2430" strokeWidth="3" strokeLinejoin="round" />
        {data.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" fill={colors[axes[i].key]} stroke="#1F2430" strokeWidth="2.5" />
        ))}
        {axes.map((a, i) => {
          const cos = Math.cos(angle(i));
          const sin = Math.sin(angle(i));
          const anchor = cos > 0.3 ? 'start' : cos < -0.3 ? 'end' : 'middle';
          return (
            <text key={a.label} x={cos * (R + 12)} y={sin * (R + 14) + 5} textAnchor={anchor} fontWeight="800" fontSize="14" fill={colors[a.key]}>
              {a.label}
            </text>
          );
        })}
      </svg>
      <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs font-bold">
        {scores.map((s) => (
          <li key={s.area.key} className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-sumi" style={{ background: colors[s.area.key] }} />
            {s.area.label}
          </li>
        ))}
      </ul>
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
      {/* 無料で見せる部分 */}
      <section className="py-16 md:py-24 bg-white border-t-[2.5px] border-sumi">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center">
            <Sticker className="font-en text-sm font-black italic tracking-[0.12em] uppercase">Result</Sticker>
            <h2 className="font-head font-black text-[28px] md:text-[44px] leading-[1.35] mt-4">診断結果</h2>
          </div>
          <div className="mt-12 grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
            <div className={`pop-reveal relative rounded-[32px] bg-cream p-6 md:p-8 ${card}`}>
              <Radar scores={byArea} />
              <Sparkle className="absolute -top-5 -right-3 w-9 h-9 text-mustard" />
            </div>
            <div className="pop-reveal">
              <p className="flex items-baseline gap-2">
                <span className="font-bold">総合</span>
                <span className="font-en font-black italic text-[84px] md:text-[104px] leading-none tracking-tight text-sumi">{total}</span>
                <span className="font-head font-black text-2xl">点</span>
                <span className="text-sm text-sumi-muted ml-1">/ 100点</span>
              </p>
              <p className="mt-6 text-sm font-bold text-sumi-muted">御社は…</p>
              <p className="font-head font-black text-[26px] md:text-[34px] leading-snug mt-1">
                <Mark>{typeName}</Mark>
              </p>
              {!allGood && (
                <div className={`mt-6 rounded-[24px] p-5 border-2 border-sumi ${ws.tint}`}>
                  <p className="text-sm font-black">
                    いちばん伸ばしたい分野：<span className={ws.text}>{weakest.area.label}</span>
                  </p>
                  <p className="mt-2 text-sm leading-[1.9]">{weakest.area.results[weakest.level].text}</p>
                </div>
              )}
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {byArea.map((a) => {
                  const s = service(a.area.key);
                  return (
                    <li key={a.area.key} className="flex items-center gap-3 rounded-2xl bg-white border-2 border-sumi px-3.5 py-3">
                      <span className={`shrink-0 grid place-items-center w-11 h-11 md:w-12 md:h-12 rounded-xl text-white font-en font-black italic text-2xl border-2 border-sumi shadow-[2px_2px_0_#1F2430] -rotate-6 ${s.bg}`}>{a.rank}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] md:text-xs font-bold leading-tight">{a.area.label}</span>
                        <span className="block text-sm font-black mt-0.5">{levelLabel[a.level]}</span>
                        <span className="mt-1.5 block h-1.5 rounded-full bg-sumi/10 overflow-hidden">
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
      <section className="relative py-16 md:py-24 border-t-[2.5px] border-sumi bg-cream bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px]">
        <div className="max-w-6xl mx-auto px-5">
          {unlocked ? (
            <>
              <Details byArea={byArea} order={order} />
              <div className="no-print mt-14 flex flex-wrap justify-center gap-4">
                <button type="button" onClick={() => window.print()} className={`inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white font-bold ${card} shadow-[5px_5px_0_#1F2430] ${press}`}>
                  <Printer className="w-4 h-4" />
                  結果を印刷・PDFで保存
                </button>
                <button type="button" onClick={onRetry} className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sumi-muted hover:text-sumi">
                  <RotateCcw className="w-4 h-4" />
                  もう一度診断する
                </button>
              </div>
            </>
          ) : (
            <div className="relative">
              {/* 中身が少し透けて見える状態にして、何が見られるかを伝える */}
              <div aria-hidden="true" className="blur-[7px] select-none pointer-events-none opacity-70 max-h-[900px] overflow-hidden">
                <Details byArea={byArea} order={order} />
              </div>
              <div className="absolute inset-0 flex items-start justify-center pt-14 md:pt-20">
                <UnlockForm summary={summary} onUnlock={onUnlock} />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

// 解禁後に見せる中身：分野ごとの解説、進める順番、おすすめのサービス、資料PDFの案内
const Details: React.FC<{ byArea: AreaScore[]; order: AreaScore[] }> = ({ byArea, order }) => {
  return (
    <>
      <div className="text-center">
        <Sticker className="font-en text-sm font-black italic tracking-[0.12em] uppercase">Advice</Sticker>
        <h2 className="font-head font-black text-[26px] md:text-[40px] leading-[1.35] mt-4 [word-break:auto-phrase]">
          分野ごとの<Mark>まずやること</Mark>
        </h2>
      </div>
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {byArea.map((a) => {
          const s = service(a.area.key);
          const r = a.area.results[a.level];
          return (
            <article key={a.area.key} className={`print-card rounded-[28px] bg-white p-7 ${card}`}>
              <div className="flex items-center gap-4">
                <IconTile bg={s.bg} icon={React.createElement(areaIcon[a.area.key], { className: 'w-6 h-6', strokeWidth: 2.4 })} />
                <div>
                  <h3 className="font-head font-black text-xl md:text-2xl">{a.area.label}</h3>
                  <p className="text-xs font-bold text-sumi-muted mt-0.5">
                    ランク{a.rank}・{levelLabel[a.level]}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-[1.9]">{r.text}</p>
              <ol className="mt-5 space-y-2.5">
                {r.todo.map((t, n) => (
                  <li key={t} className="flex gap-3 text-sm leading-relaxed font-bold">
                    <span className={`shrink-0 grid place-items-center w-6 h-6 rounded-full text-white text-xs font-en font-black italic border-2 border-sumi ${s.bg}`}>{n + 1}</span>
                    {t}
                  </li>
                ))}
              </ol>
            </article>
          );
        })}
      </div>

      <div className="mt-20 text-center">
        <Sticker className="font-en text-sm font-black italic tracking-[0.12em] uppercase">Roadmap</Sticker>
        <h2 className="font-head font-black text-[26px] md:text-[40px] leading-[1.35] mt-4 [word-break:auto-phrase]">
          御社に合った<Mark>進める順番</Mark>
        </h2>
        <p className="mt-4 text-sm text-sumi-muted leading-[1.9] max-w-2xl mx-auto [word-break:auto-phrase]">守りが手薄なら最初に固め、そのあとは点数の低い分野から順に進めるのがおすすめです。</p>
      </div>
      <ol className="mt-12 grid md:grid-cols-4 gap-6">
        {order.map((a, i) => {
          const s = service(a.area.key);
          return (
            <li key={a.area.key} className={`print-card relative rounded-[28px] bg-white p-6 flex flex-col ${card}`}>
              <span className="font-en font-black italic text-sm text-sumi-muted">STEP {i + 1}</span>
              <p className={`font-head font-black text-xl mt-1 ${s.text}`}>{a.area.label}</p>
              <p className="mt-2 text-sm font-bold leading-relaxed flex-1">{a.area.results[a.level].todo[0]}</p>
              <a href={s.href} className={`no-print mt-5 inline-flex items-center gap-1 text-sm font-black ${s.text} hover:underline`}>
                {s.name}を見る
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="mt-2 text-xs text-sumi-muted">料金の目安：{prices[a.area.key]}</p>
            </li>
          );
        })}
      </ol>

      <div className={`no-print mt-20 grid md:grid-cols-[1fr_1.3fr] gap-8 items-center rounded-[36px] bg-white p-8 md:p-12 ${card}`}>
        <img src={illust('check-book')} alt="" className="pop-float w-full max-w-[280px] mx-auto" loading="lazy" />
        <div>
          <Sticker className="text-sm font-bold">お役立ち資料</Sticker>
          <h3 className="font-head font-black text-[24px] md:text-[32px] leading-snug mt-4 [word-break:auto-phrase]">IT担当がいない会社のための はじめてのDX読本</h3>
          <p className="inline-flex items-center gap-2 mt-5 rounded-2xl bg-mustard/30 px-5 py-3 text-sm font-black border-2 border-sumi">
            <Mail className="w-4 h-4" />
            ご入力いただいたメールアドレスにお送りしました
          </p>
          <p className="mt-4 text-sm leading-[1.9] text-sumi-muted">今後のDXのご参考に、よくある困りごとや分野ごとの進め方、セルフチェックシート、支援のモデルケースをまとめました。社内での共有にもお使いください。メールが見当たらないときは、迷惑メールのフォルダもご確認ください。</p>
          <div className="mt-7 flex flex-wrap gap-4">
            <a href="/contact" className={`inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white font-bold ${card} shadow-[5px_5px_0_#1F2430] ${press}`}>
              結果をもとに無料で相談する
              <ArrowRight className="w-4 h-4" />
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
      setEmailError('資料をお送りできるメールアドレスを入力してください');
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

  const input = 'mt-1.5 w-full rounded-xl bg-white border-2 border-sumi px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-mustard/50';

  return (
    <form onSubmit={submit} className={`relative w-full max-w-lg rounded-[32px] bg-white p-7 md:p-9 ${card} shadow-[8px_8px_0_#1F2430]`}>
      {/* 入力するともらえる資料を、フォームの上で大きく打ち出す */}
      <div className="relative -mx-7 md:-mx-9 -mt-7 md:-mt-9 mb-6 rounded-t-[29px] border-b-[2.5px] border-sumi bg-mustard px-7 md:px-9 pt-6 pb-5 pr-[118px] md:pr-[150px]">
        <p className="inline-flex items-center gap-1.5 -rotate-2 rounded-lg bg-coral px-2.5 py-0.5 text-xs font-black text-white border-2 border-sumi">
          <Gift className="w-3.5 h-3.5" strokeWidth={2.6} />
          入力した方にもれなく
        </p>
        <p className="font-head font-black text-[22px] md:text-[27px] leading-tight mt-2 [word-break:auto-phrase]">
          『はじめてのDX読本』
          <br />
          プレゼント！
        </p>
        <p className="text-xs font-bold mt-1.5">PDF・13ページ／メールでお届けします</p>
        <img src={illust('check-book')} alt="" className="pop-float absolute right-1 md:right-2 -top-12 w-[118px] md:w-[148px]" />
      </div>
      <p className="inline-flex items-center gap-2 text-sm font-black">
        <Lock className="w-4 h-4" />
        診断結果の続きも、入力で見られます
      </p>
      <ul className="mt-3 space-y-1.5 text-sm font-bold">
        {['分野ごとの「まずやること」', '御社に合った進める順番と、おすすめのサービス', '『はじめてのDX読本』（PDF）をメールでお届け'].map((t) => (
          <li key={t} className="flex items-start gap-2">
            <span className="shrink-0 mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-sumi text-white text-[11px]">✓</span>
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-6 grid gap-4">
        <label className="block text-sm font-bold">
          会社名<span className="text-coral ml-1">必須</span>
          <input required value={lead.company} onChange={set('company')} autoComplete="organization" className={input} />
        </label>
        <label className="block text-sm font-bold">
          お名前<span className="text-coral ml-1">必須</span>
          <input required value={lead.name} onChange={set('name')} autoComplete="name" className={input} />
        </label>
        <label className="block text-sm font-bold">
          メールアドレス<span className="text-coral ml-1">必須</span>
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
            lead.email && <span className="block mt-1.5 text-xs font-normal text-sumi-muted break-all">『はじめてのDX読本』は「{lead.email}」にお送りします</span>
          )}
        </label>
        <label aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          ホームページ
          <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
        </label>
        <label className="block text-sm font-bold">
          電話番号<span className="text-sumi-muted font-normal ml-1">任意</span>
          <input type="tel" value={lead.phone} onChange={set('phone')} autoComplete="tel" className={input} />
        </label>
        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-sumi-muted">
          <input required type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 w-4 h-4 accent-sumi" />
          入力いただいた情報は、診断結果と資料のご提供、Arcleからのご連絡・ご案内にのみ使います。内容に同意して送信します。
        </label>
      </div>
      <button type="submit" disabled={sending} className="mt-6 w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-sumi text-white font-black border-[2.5px] border-sumi shadow-[5px_5px_0_#F2B544] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_#F2B544] disabled:opacity-60">
        {sending ? '送信しています…' : '結果の続きを見る・読本を受け取る'}
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};

export default ItCheck;
