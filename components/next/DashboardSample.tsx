import React, { useEffect, useMemo, useRef, useState } from 'react';
import { card } from './parts';

// データ活用ページの「ダッシュボードの見本」。架空の卸売業の売上データで、営業所と期間を切り替えて触れる
// 色：今年＝藍（事業の色）、前年＝青緑。2色は色覚の違いでも見分けられることを確かめてある
const NOW = '#5B5BD6';
const PREV = '#1E9C8C';

const months = ['11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'];
const branches = ['名古屋', '一宮', '岐阜'] as const;
type Branch = (typeof branches)[number];

// 月ごとの売上（万円）。見本なので固定の数字
const sales: Record<Branch, { now: number[]; prev: number[]; target: number; margin: number; orders: number }> = {
  名古屋: { now: [1820, 2140, 1610, 1690, 2050, 1880, 1930, 2010, 2160, 1790, 2080, 2240], prev: [1710, 1980, 1580, 1600, 1890, 1800, 1820, 1850, 1990, 1720, 1900, 2010], target: 24000, margin: 23.4, orders: 412 },
  一宮: { now: [960, 1110, 870, 900, 1040, 990, 1010, 1060, 1120, 930, 1090, 1150], prev: [980, 1060, 900, 880, 1010, 970, 990, 1000, 1050, 940, 1030, 1070], target: 12600, margin: 25.1, orders: 236 },
  岐阜: { now: [640, 760, 590, 610, 700, 660, 690, 720, 750, 630, 730, 790], prev: [600, 700, 560, 590, 650, 640, 650, 670, 700, 610, 680, 720], target: 8600, margin: 21.8, orders: 158 }
};
const categoryShare: Record<Branch, number[]> = {
  名古屋: [0.31, 0.27, 0.18, 0.14, 0.1],
  一宮: [0.22, 0.24, 0.29, 0.15, 0.1],
  岐阜: [0.35, 0.21, 0.16, 0.18, 0.1]
};
const categories = ['日用品', '食品', '業務用資材', '文具・事務用品', 'その他'];

const yen = (man: number) => (man >= 10000 ? `${(man / 10000).toFixed(2)}億円` : `${man.toLocaleString()}万円`);

// 親の幅に合わせてSVGを描く（スマホで文字が縮まないように）
const useWidth = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(560);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
};

const TrendChart: React.FC<{ now: number[]; prev: number[]; labels: string[] }> = ({ now, prev, labels }) => {
  const [ref, width] = useWidth();
  const [hover, setHover] = useState<number | null>(null);
  const H = 220;
  const pad = { l: 46, r: 44, t: 14, b: 26 };
  // 目盛りは切りのいい数字にする（1・2・2.5・5 の10の累乗）
  const hi = Math.max(...now, ...prev);
  const lo = Math.min(...now, ...prev) * 0.85;
  const rough = (hi - lo) / 3;
  const pow = 10 ** Math.floor(Math.log10(rough));
  const step = ([1, 2, 2.5, 5, 10].find((m) => m * pow >= rough) ?? 10) * pow;
  const min = Math.max(0, Math.floor(lo / step) * step);
  const max = Math.ceil(hi / step) * step;
  const x = (i: number) => pad.l + (i * (width - pad.l - pad.r)) / Math.max(labels.length - 1, 1);
  const y = (v: number) => pad.t + (1 - (v - min) / (max - min)) * (H - pad.t - pad.b);
  const path = (vals: number[]) => vals.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ');
  const ticks = Array.from({ length: Math.round((max - min) / step) + 1 }, (_, n) => min + step * n);
  const last = now.length - 1;

  const onMove = (e: React.PointerEvent<SVGRectElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - box.left + pad.l;
    const i = Math.round(((px - pad.l) / (width - pad.l - pad.r)) * (labels.length - 1));
    setHover(Math.min(Math.max(i, 0), labels.length - 1));
  };

  return (
    <div ref={ref} className="relative">
      <svg width={width} height={H} className="block" role="img" aria-label={`月別の売上。${labels.map((m, i) => `${m} 今年${now[i]}万円・前年${prev[i]}万円`).join('、')}`}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={width - pad.r} y1={y(t)} y2={y(t)} stroke="#E6E4DF" strokeWidth="1" />
            <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#6B7080">
              {t.toLocaleString()}
            </text>
          </g>
        ))}
        {labels.map((m, i) => (
          <text key={m} x={x(i)} y={H - 6} textAnchor="middle" fontSize="11" fill="#6B7080" className={labels.length > 6 && i % 2 && width < 480 ? 'hidden' : ''}>
            {m}
          </text>
        ))}
        <path d={`${path(now)} L${x(last)},${y(min)} L${x(0)},${y(min)} Z`} fill={NOW} fillOpacity="0.1" />
        <path d={path(prev)} fill="none" stroke={PREV} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <path d={path(now)} fill="none" stroke={NOW} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {/* 線の終わりに名前を置く（凡例の補助） */}
        <circle cx={x(last)} cy={y(now[last])} r="4.5" fill={NOW} stroke="#fff" strokeWidth="2" />
        <circle cx={x(last)} cy={y(prev[last])} r="4.5" fill={PREV} stroke="#fff" strokeWidth="2" />
        <text x={x(last) + 8} y={y(now[last]) + (now[last] >= prev[last] ? -2 : 10)} fontSize="11" fontWeight="700" fill="#1F2430">今年</text>
        <text x={x(last) + 8} y={y(prev[last]) + (now[last] >= prev[last] ? 12 : -2)} fontSize="11" fill="#50566A">前年</text>
        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={H - pad.b} stroke="#1F2430" strokeOpacity="0.35" strokeWidth="1" />
            <circle cx={x(hover)} cy={y(prev[hover])} r="4.5" fill={PREV} stroke="#fff" strokeWidth="2" />
            <circle cx={x(hover)} cy={y(now[hover])} r="4.5" fill={NOW} stroke="#fff" strokeWidth="2" />
          </g>
        )}
        <rect x={pad.l} y={0} width={Math.max(width - pad.l - pad.r, 0)} height={H} fill="transparent" onPointerMove={onMove} onPointerLeave={() => setHover(null)} />
      </svg>
      {hover !== null && (
        <div
          className="pointer-events-none absolute top-1 z-10 rounded-xl bg-white border border-sumi/15 shadow-[0_6px_18px_rgb(31_36_48/0.12)] px-3 py-2 text-xs"
          style={{ left: Math.min(Math.max(x(hover) - 70, 0), width - 150), width: 140 }}
        >
          <p className="text-sumi-muted">{labels[hover]}</p>
          <p className="flex items-center gap-2 mt-1">
            <span className="w-3 h-0.5 rounded" style={{ background: NOW }} />
            <b className="text-sumi">{now[hover].toLocaleString()}万円</b>
            <span className="text-sumi-muted">今年</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="w-3 h-0.5 rounded" style={{ background: PREV }} />
            <b className="text-sumi">{prev[hover].toLocaleString()}万円</b>
            <span className="text-sumi-muted">前年</span>
          </p>
        </div>
      )}
    </div>
  );
};

const DashboardSample: React.FC = () => {
  const [branch, setBranch] = useState<'全社' | Branch>('全社');
  const [span, setSpan] = useState<6 | 12>(12);

  const view = useMemo(() => {
    const picked = branch === '全社' ? [...branches] : [branch];
    const from = 12 - span;
    const sum = (key: 'now' | 'prev') => months.slice(from).map((_, i) => picked.reduce((n, b) => n + sales[b][key][from + i], 0));
    const now = sum('now');
    const prev = sum('prev');
    const total = now.reduce((a, b) => a + b, 0);
    const prevTotal = prev.reduce((a, b) => a + b, 0);
    const margin = picked.reduce((n, b) => n + sales[b].margin * sales[b].now.slice(from).reduce((x, y) => x + y, 0), 0) / total;
    const orders = Math.round(picked.reduce((n, b) => n + sales[b].orders, 0) * (span / 12));
    const cats = categories.map((c, ci) => ({ c, v: Math.round(picked.reduce((n, b) => n + sales[b].now.slice(from).reduce((x, y) => x + y, 0) * categoryShare[b][ci], 0)) }));
    const goals = branches.map((b) => {
      const done = sales[b].now.slice(from).reduce((x, y) => x + y, 0);
      const target = (sales[b].target * span) / 12;
      return { b, rate: done / target };
    });
    return { now, prev, labels: months.slice(from), total, growth: (total / prevTotal - 1) * 100, margin, orders, cats, goals };
  }, [branch, span]);

  const catMax = Math.max(...view.cats.map((c) => c.v));
  const select = 'rounded-lg bg-white border border-sumi/20 px-3 py-2 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-svc-data/20';

  return (
    <div className={`rounded-[28px] bg-white overflow-hidden ${card}`}>
      {/* 画面の枠（ブラウザ風） */}
      <div className="flex items-center gap-3 border-b-[2.5px] border-sumi bg-cream px-5 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-coral border-2 border-sumi" />
          <span className="w-3 h-3 rounded-full bg-mustard border-2 border-sumi" />
          <span className="w-3 h-3 rounded-full bg-[#1E9C8C] border-2 border-sumi" />
        </span>
        <p className="font-bold text-sm whitespace-nowrap">売上ダッシュボード</p>
        <span className="ml-auto shrink-0 rounded-full bg-sumi px-3 py-0.5 text-[11px] font-black text-white">
          見本<span className="hidden sm:inline">・架空のデータです</span>
        </span>
      </div>

      <div className="p-4 md:p-7 bg-[#FCFCFB]">
        {/* 絞り込み（すべてのグラフに効く） */}
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-bold text-sumi-muted">
            期間
            <select className={select} value={span} onChange={(e) => setSpan(Number(e.target.value) as 6 | 12)}>
              <option value={12}>直近12か月</option>
              <option value={6}>直近6か月</option>
            </select>
          </label>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="営業所">
            {(['全社', ...branches] as const).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBranch(b)}
                aria-pressed={branch === b}
                className={`rounded-lg px-3 py-2 text-sm font-bold border transition-colors ${branch === b ? 'bg-svc-data text-white border-svc-data' : 'bg-white border-sumi/20 hover:border-svc-data'}`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* 数字のタイル */}
        <div className="mt-5 grid grid-cols-3 lg:grid-cols-4 gap-3">
          <div className="col-span-3 lg:col-span-1 rounded-2xl bg-white border border-sumi/10 p-4">
            <p className="text-xs text-sumi-muted">売上の合計</p>
            <p className="font-en font-black text-[34px] md:text-[40px] leading-tight text-sumi">{yen(view.total)}</p>
          </div>
          <div className="rounded-2xl bg-white border border-sumi/10 p-3 sm:p-4">
            <p className="text-xs text-sumi-muted">前年比</p>
            <p className="font-en font-black text-xl sm:text-2xl md:text-[28px] leading-tight text-sumi">
              {view.growth >= 0 ? '+' : ''}
              {view.growth.toFixed(1)}%
            </p>
            <p className="hidden md:block text-[11px] text-sumi-muted">前年の同じ期間とくらべて</p>
          </div>
          <div className="rounded-2xl bg-white border border-sumi/10 p-3 sm:p-4">
            <p className="text-xs text-sumi-muted">粗利率</p>
            <p className="font-en font-black text-xl sm:text-2xl md:text-[28px] leading-tight text-sumi">{view.margin.toFixed(1)}%</p>
          </div>
          <div className="rounded-2xl bg-white border border-sumi/10 p-3 sm:p-4">
            <p className="text-xs text-sumi-muted">受注件数</p>
            <p className="font-en font-black text-xl sm:text-2xl md:text-[28px] leading-tight text-sumi">{view.orders.toLocaleString()}件</p>
          </div>
        </div>

        <div className="mt-3 grid lg:grid-cols-[1.6fr_1fr] gap-3">
          {/* 月別の推移 */}
          <div className="rounded-2xl bg-white border border-sumi/10 p-4 min-w-0">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <p className="font-bold text-sm">
                月別の売上<span className="ml-1 text-xs font-normal text-sumi-muted">（万円）</span>
              </p>
              <span className="flex items-center gap-1.5 text-xs text-sumi-muted">
                <span className="w-4 h-0.5 rounded" style={{ background: NOW }} />
                今年
              </span>
              <span className="flex items-center gap-1.5 text-xs text-sumi-muted">
                <span className="w-4 h-0.5 rounded" style={{ background: PREV }} />
                前年
              </span>
            </div>
            <div className="mt-2">
              <TrendChart now={view.now} prev={view.prev} labels={view.labels} />
            </div>
            <details className="mt-2 text-xs">
              <summary className="cursor-pointer text-sumi-muted font-bold">数字を表で見る</summary>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className="text-sumi-muted">
                      <th className="text-left font-normal py-1">月</th>
                      <th className="font-normal">今年</th>
                      <th className="font-normal">前年</th>
                    </tr>
                  </thead>
                  <tbody>
                    {view.labels.map((m, i) => (
                      <tr key={m} className="border-t border-sumi/10">
                        <td className="text-left py-1">{m}</td>
                        <td>{view.now[i].toLocaleString()}万円</td>
                        <td>{view.prev[i].toLocaleString()}万円</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>

          <div className="grid gap-3">
            {/* 商品カテゴリ別 */}
            <div className="rounded-2xl bg-white border border-sumi/10 p-4">
              <p className="font-bold text-sm">商品カテゴリ別の売上</p>
              <ul className="mt-3 space-y-2.5">
                {view.cats.map(({ c, v }) => (
                  <li key={c} className="grid grid-cols-[88px_1fr] items-center gap-2 text-xs">
                    <span className="text-sumi-muted truncate">{c}</span>
                    <span className="flex items-center gap-2 min-w-0">
                      <span className="h-3.5 rounded-r-[4px] transition-[width] duration-500" style={{ width: `${(v / catMax) * 72}%`, background: NOW }} />
                      <span className="shrink-0 font-bold text-sumi">{v.toLocaleString()}万円</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 営業所別の目標達成率 */}
            <div className="rounded-2xl bg-white border border-sumi/10 p-4">
              <p className="font-bold text-sm">営業所別の目標達成率</p>
              <ul className="mt-3 space-y-3">
                {view.goals.map(({ b, rate }) => (
                  <li key={b} className={`text-xs transition-opacity ${branch !== '全社' && branch !== b ? 'opacity-40' : ''}`}>
                    <span className="flex justify-between">
                      <span className="text-sumi-muted">{b}</span>
                      <b className="text-sumi">{Math.round(rate * 100)}%</b>
                    </span>
                    <span className="relative mt-1 block h-2.5 rounded-full bg-svc-data/15">
                      <span className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500" style={{ width: `${Math.min(rate, 1) * 100}%`, background: NOW }} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSample;
