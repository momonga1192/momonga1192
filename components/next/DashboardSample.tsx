import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowDown, MousePointerClick } from 'lucide-react';
import { card } from './parts';

// データ活用ページの「ダッシュボードの見本」。架空の会社のデータで、売上・在庫・生産の3つを切り替えて触れる
// 色：主＝藍（事業の色）、比べる相手＝青緑。2色は色覚の違いでも見分けられることを確かめてある
// 状態の色（欠品・過剰など）は、必ずアイコンと文字を添えて使う
const MAIN = '#5B5BD6';
const SUB = '#1E9C8C';
const CRITICAL = '#C93C3C';
const WARNING = '#B7770A';

const months = ['11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'];
const sumOf = (vals: number[]) => vals.reduce((a, b) => a + b, 0);
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

// 目盛りを切りのいい数字にする（1・2・2.5・5 の10の累乗）
const niceScale = (lo: number, hi: number) => {
  const rough = (hi - lo) / 3 || 1;
  const pow = 10 ** Math.floor(Math.log10(rough));
  const step = ([1, 2, 2.5, 5, 10].find((m) => m * pow >= rough) ?? 10) * pow;
  const min = Math.max(0, Math.floor(lo / step) * step);
  const max = Math.ceil(hi / step) * step;
  const ticks = Array.from({ length: Math.round((max - min) / step) + 1 }, (_, n) => min + step * n);
  return { min, max, ticks };
};

type Series = { name: string; color: string; values: number[]; kind?: 'line' | 'column' };

// 折れ線（と縦棒）のグラフ。縦軸は1本だけ。マウスを乗せた月の数字をまとめて出す
const Chart: React.FC<{ labels: string[]; series: Series[]; unit: string; refLine?: { value: number; label: string }; zero?: boolean }> = ({ labels, series, unit, refLine, zero }) => {
  const [ref, width] = useWidth();
  const [hover, setHover] = useState<number | null>(null);
  const H = 220;
  const pad = { l: 46, r: 46, t: 14, b: 26 };
  const all = series.flatMap((s) => s.values).concat(refLine ? [refLine.value] : []);
  const { min, max, ticks } = niceScale(zero ? 0 : Math.min(...all) * 0.85, Math.max(...all));
  const hasColumns = series.some((s) => s.kind === 'column');
  const inner = width - pad.l - pad.r;
  // 縦棒があるときは、棒が端で切れないよう両端に半分ずつ余白を取る
  const x = (i: number) => (hasColumns ? pad.l + ((i + 0.5) * inner) / labels.length : pad.l + (i * inner) / Math.max(labels.length - 1, 1));
  const y = (v: number) => pad.t + (1 - (v - min) / (max - min)) * (H - pad.t - pad.b);
  const path = (vals: number[]) => vals.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ');
  const last = labels.length - 1;
  const barW = Math.min(18, (inner / labels.length) * 0.6);
  const skip = labels.length > 8 && width < 520;

  const onMove = (e: React.PointerEvent<SVGRectElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const rate = (e.clientX - box.left) / box.width;
    const i = hasColumns ? Math.floor(rate * labels.length) : Math.round(rate * (labels.length - 1));
    setHover(Math.min(Math.max(i, 0), last));
  };

  return (
    <div ref={ref} className="relative">
      <svg width={width} height={H} className="block" role="img" aria-label={labels.map((m, i) => `${m} ${series.map((s) => `${s.name}${s.values[i].toLocaleString()}${unit}`).join('・')}`).join('、')}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={width - pad.r} y1={y(t)} y2={y(t)} stroke="#E6E4DF" strokeWidth="1" />
            <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#6B7080">
              {t.toLocaleString()}
            </text>
          </g>
        ))}
        {labels.map((m, i) => (
          <text key={m} x={x(i)} y={H - 6} textAnchor="middle" fontSize="11" fill="#6B7080" className={skip && i % 2 ? 'hidden' : ''}>
            {m}
          </text>
        ))}
        {refLine && (
          <g>
            <line x1={pad.l} x2={width - pad.r} y1={y(refLine.value)} y2={y(refLine.value)} stroke="#1F2430" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="5 4" />
            <text x={width - pad.r + 6} y={y(refLine.value) + 4} fontSize="11" fill="#50566A">
              {refLine.label}
            </text>
          </g>
        )}
        {series
          .filter((s) => s.kind === 'column')
          .map((s) =>
            s.values.map((v, i) => {
              const top = y(v);
              const bottom = y(min);
              const r = Math.min(4, (bottom - top) / 2);
              const l = x(i) - barW / 2;
              return (
                <path
                  key={`${s.name}-${i}`}
                  d={`M${l},${bottom} V${top + r} Q${l},${top} ${l + r},${top} H${l + barW - r} Q${l + barW},${top} ${l + barW},${top + r} V${bottom} Z`}
                  fill={s.color}
                  fillOpacity={hover === null || hover === i ? 1 : 0.55}
                />
              );
            })
          )}
        {series
          .filter((s) => s.kind !== 'column')
          .map((s, n) => (
            <g key={s.name}>
              {n === 0 && !hasColumns && <path d={`${path(s.values)} L${x(last)},${y(min)} L${x(0)},${y(min)} Z`} fill={s.color} fillOpacity="0.1" />}
              <path d={path(s.values)} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              {!hasColumns && <circle cx={x(last)} cy={y(s.values[last])} r="4.5" fill={s.color} stroke="#fff" strokeWidth="2" />}
            </g>
          ))}
        {hover !== null && (
          <g>
            {!hasColumns && <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={H - pad.b} stroke="#1F2430" strokeOpacity="0.35" strokeWidth="1" />}
            {series
              .filter((s) => s.kind !== 'column')
              .map((s) => (
                <circle key={s.name} cx={x(hover)} cy={y(s.values[hover])} r="4.5" fill={s.color} stroke="#fff" strokeWidth="2" />
              ))}
          </g>
        )}
        <rect x={pad.l} y={0} width={Math.max(inner, 0)} height={H} fill="transparent" onPointerMove={onMove} onPointerLeave={() => setHover(null)} />
      </svg>
      {hover !== null && (
        <div
          className="pointer-events-none absolute top-1 z-10 rounded-xl bg-white border border-sumi/15 shadow-[0_6px_18px_rgb(31_36_48/0.12)] px-3 py-2 text-xs"
          style={{ left: Math.min(Math.max(x(hover) - 75, 0), width - 160), width: 150 }}
        >
          <p className="text-sumi-muted">{labels[hover]}</p>
          {series.map((s) => (
            <p key={s.name} className="flex items-center gap-2 mt-0.5">
              <span className={`w-3 rounded ${s.kind === 'column' ? 'h-2' : 'h-0.5'}`} style={{ background: s.color }} />
              <b className="text-sumi">
                {s.values[hover].toLocaleString()}
                {unit}
              </b>
              <span className="text-sumi-muted">{s.name}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

// 部品
const Tile: React.FC<{ label: string; value: string; note?: string; hero?: boolean }> = ({ label, value, note, hero }) => (
  <div className={`rounded-2xl bg-white border border-sumi/10 ${hero ? 'col-span-3 lg:col-span-1 p-4' : 'p-3 sm:p-4'}`}>
    <p className="text-xs text-sumi-muted">{label}</p>
    <p className={`font-en font-black leading-tight text-sumi ${hero ? 'text-[34px] md:text-[40px]' : 'text-xl sm:text-2xl md:text-[28px]'}`}>{value}</p>
    {note && <p className="hidden md:block text-[11px] text-sumi-muted">{note}</p>}
  </div>
);

const Panel: React.FC<{ title: React.ReactNode; legend?: Series[]; children: React.ReactNode; className?: string }> = ({ title, legend, children, className = '' }) => (
  <div className={`rounded-2xl bg-white border border-sumi/10 p-4 min-w-0 ${className}`}>
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      <p className="font-bold text-sm">{title}</p>
      {legend?.map((s) => (
        <span key={s.name} className="flex items-center gap-1.5 text-xs text-sumi-muted">
          <span className={`w-4 rounded ${s.kind === 'column' ? 'h-2.5' : 'h-0.5'}`} style={{ background: s.color }} />
          {s.name}
        </span>
      ))}
    </div>
    <div className="mt-3">{children}</div>
  </div>
);

const BarList: React.FC<{ rows: { label: string; value: number }[]; unit: string }> = ({ rows, unit }) => {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <ul className="space-y-2.5">
      {rows.map(({ label, value }) => (
        <li key={label} className="grid grid-cols-[88px_1fr] items-center gap-2 text-xs">
          <span className="text-sumi-muted truncate">{label}</span>
          <span className="flex items-center gap-2 min-w-0">
            <span className="h-3.5 rounded-r-[4px] transition-[width] duration-500" style={{ width: `${(value / max) * 70}%`, background: MAIN }} />
            <span className="shrink-0 font-bold text-sumi">
              {value.toLocaleString()}
              {unit}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
};

const Meters: React.FC<{ rows: { label: string; rate: number; dim?: boolean }[] }> = ({ rows }) => (
  <ul className="space-y-3">
    {rows.map(({ label, rate, dim }) => (
      <li key={label} className={`text-xs transition-opacity ${dim ? 'opacity-40' : ''}`}>
        <span className="flex justify-between">
          <span className="text-sumi-muted">{label}</span>
          <b className="text-sumi">{Math.round(rate * 100)}%</b>
        </span>
        <span className="relative mt-1 block h-2.5 rounded-full bg-svc-data/15">
          <span className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500" style={{ width: `${Math.min(rate, 1) * 100}%`, background: MAIN }} />
        </span>
      </li>
    ))}
  </ul>
);

// 絞り込みのボタン。最初は「ここをクリック」の矢印で、触れることを知らせる
const Filter: React.FC<{ options: readonly string[]; value: string; onChange: (v: string) => void; label: string; hint: boolean }> = ({ options, value, onChange, label, hint }) => (
  <div className="relative flex flex-wrap items-center gap-1.5" role="group" aria-label={label}>
    {options.map((o) => (
      <button
        key={o}
        type="button"
        onClick={() => onChange(o)}
        aria-pressed={value === o}
        className={`rounded-lg px-3 py-2 text-sm font-bold border transition-colors ${value === o ? 'bg-svc-data text-white border-svc-data' : 'bg-white border-sumi/20 hover:border-svc-data'}`}
      >
        {o}
      </button>
    ))}
    {hint && (
      <span aria-hidden="true" className="pointer-events-none absolute z-20 left-1/2 -translate-x-1/2 -top-12 sm:static sm:translate-x-0 sm:ml-2 flex items-center gap-1 animate-[pop-hint_1.1s_ease-in-out_infinite]">
        <ArrowLeft className="hidden sm:block w-6 h-6 text-coral" strokeWidth={3.2} />
        <span className="flex items-center gap-1 -rotate-3 whitespace-nowrap rounded-lg bg-coral px-2.5 py-1 text-xs font-black text-white border-2 border-sumi shadow-[2px_2px_0_#1F2430]">
          <MousePointerClick className="w-3.5 h-3.5" strokeWidth={2.6} />
          ここをクリック！
        </span>
        <ArrowDown className="sm:hidden absolute left-1/2 -translate-x-1/2 top-full w-5 h-5 text-coral" strokeWidth={3.2} />
      </span>
    )}
  </div>
);

const select = 'rounded-lg bg-white border border-sumi/20 px-3 py-2 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-svc-data/20';

// --- 売上ダッシュボード（卸売業） ---
const branches = ['名古屋', '一宮', '岐阜'] as const;
type Branch = (typeof branches)[number];
const sales: Record<Branch, { now: number[]; prev: number[]; target: number; margin: number; orders: number }> = {
  名古屋: { now: [1820, 2140, 1610, 1690, 2050, 1880, 1930, 2010, 2160, 1790, 2080, 2240], prev: [1710, 1980, 1580, 1600, 1890, 1800, 1820, 1850, 1990, 1720, 1900, 2010], target: 24000, margin: 23.4, orders: 412 },
  一宮: { now: [960, 1110, 870, 900, 1040, 990, 1010, 1060, 1120, 930, 1090, 1150], prev: [980, 1060, 900, 880, 1010, 970, 990, 1000, 1050, 940, 1030, 1070], target: 12600, margin: 25.1, orders: 236 },
  岐阜: { now: [640, 760, 590, 610, 700, 660, 690, 720, 750, 630, 730, 790], prev: [600, 700, 560, 590, 650, 640, 650, 670, 700, 610, 680, 720], target: 8600, margin: 21.8, orders: 158 }
};
const salesShare: Record<Branch, number[]> = { 名古屋: [0.31, 0.27, 0.18, 0.14, 0.1], 一宮: [0.22, 0.24, 0.29, 0.15, 0.1], 岐阜: [0.35, 0.21, 0.16, 0.18, 0.1] };
const salesCats = ['日用品', '食品', '業務用資材', '文具・事務用品', 'その他'];

const SalesBoard: React.FC<{ hint: boolean; onTouch: () => void }> = ({ hint, onTouch }) => {
  const [branch, setBranch] = useState<string>('全社');
  const [span, setSpan] = useState(12);
  const v = useMemo(() => {
    const picked = branch === '全社' ? [...branches] : [branch as Branch];
    const from = 12 - span;
    const series = (key: 'now' | 'prev') => months.slice(from).map((_, i) => picked.reduce((n, b) => n + sales[b][key][from + i], 0));
    const now = series('now');
    const prev = series('prev');
    const total = sumOf(now);
    const own = (b: Branch) => sumOf(sales[b].now.slice(from));
    return {
      labels: months.slice(from),
      now,
      prev,
      total,
      growth: (total / sumOf(prev) - 1) * 100,
      margin: picked.reduce((n, b) => n + sales[b].margin * own(b), 0) / total,
      orders: Math.round(picked.reduce((n, b) => n + sales[b].orders, 0) * (span / 12)),
      cats: salesCats.map((label, ci) => ({ label, value: Math.round(picked.reduce((n, b) => n + own(b) * salesShare[b][ci], 0)) })),
      goals: branches.map((b) => ({ label: b, rate: own(b) / ((sales[b].target * span) / 12), dim: branch !== '全社' && branch !== b }))
    };
  }, [branch, span]);
  const lines: Series[] = [
    { name: '今年', color: MAIN, values: v.now },
    { name: '前年', color: SUB, values: v.prev }
  ];
  return (
    <>
      <div className="flex flex-wrap items-center gap-3 pt-8 sm:pt-0">
        {/* スマホでは営業所のボタンを先に出し、「ここをクリック」が期間の欄に重ならないようにする */}
        <label className="order-2 sm:order-none flex items-center gap-2 text-xs font-bold text-sumi-muted">
          期間
          <select className={select} value={span} onChange={(e) => (setSpan(Number(e.target.value)), onTouch())}>
            <option value={12}>直近12か月</option>
            <option value={6}>直近6か月</option>
          </select>
        </label>
        <Filter label="営業所" options={['全社', ...branches]} value={branch} onChange={(b) => (setBranch(b), onTouch())} hint={hint} />
      </div>
      <div className="mt-5 grid grid-cols-3 lg:grid-cols-4 gap-3">
        <Tile hero label="売上の合計" value={yen(v.total)} />
        <Tile label="前年比" value={`${v.growth >= 0 ? '+' : ''}${v.growth.toFixed(1)}%`} note="前年の同じ期間とくらべて" />
        <Tile label="粗利率" value={`${v.margin.toFixed(1)}%`} />
        <Tile label="受注件数" value={`${v.orders.toLocaleString()}件`} />
      </div>
      <div className="mt-3 grid lg:grid-cols-[1.6fr_1fr] gap-3">
        <Panel title={<>月別の売上<span className="ml-1 text-xs font-normal text-sumi-muted">（万円）</span></>} legend={lines}>
          <Chart labels={v.labels} series={lines} unit="万円" />
        </Panel>
        <div className="grid gap-3">
          <Panel title="商品カテゴリ別の売上">
            <BarList rows={v.cats} unit="万円" />
          </Panel>
          <Panel title="営業所別の目標達成率">
            <Meters rows={v.goals} />
          </Panel>
        </div>
      </div>
    </>
  );
};

// --- 在庫ダッシュボード（卸売業） ---
const warehouses = ['本社倉庫', '第2倉庫'] as const;
type Warehouse = (typeof warehouses)[number];
const stock: Record<Warehouse, { value: number[]; proper: number; turnover: number }> = {
  本社倉庫: { value: [3180, 3420, 3650, 3390, 3120, 2980, 3050, 3270, 3510, 3740, 3460, 3290], proper: 3200, turnover: 34 },
  第2倉庫: { value: [1520, 1610, 1790, 1720, 1580, 1490, 1530, 1600, 1710, 1880, 1820, 1690], proper: 1500, turnover: 41 }
};
const stockShare: Record<Warehouse, number[]> = { 本社倉庫: [0.34, 0.25, 0.21, 0.12, 0.08], 第2倉庫: [0.18, 0.2, 0.38, 0.16, 0.08] };
// 要注意の品目。残り日数＝在庫数÷1日の出荷数
const watch: { name: string; wh: Warehouse; qty: number; daily: number }[] = [
  { name: 'ペーパータオル 200枚×5', wh: '本社倉庫', qty: 120, daily: 48 },
  { name: '業務用洗剤 4L', wh: '第2倉庫', qty: 36, daily: 15 },
  { name: 'ゴミ袋 45L 50枚', wh: '本社倉庫', qty: 210, daily: 62 },
  { name: 'コピー用紙 A4 5000枚', wh: '第2倉庫', qty: 1480, daily: 22 },
  { name: 'ストレッチフィルム', wh: '本社倉庫', qty: 960, daily: 14 },
  { name: '紙コップ 7oz 1000個', wh: '第2倉庫', qty: 640, daily: 9 }
];

const StockBoard: React.FC<{ hint: boolean; onTouch: () => void }> = ({ hint, onTouch }) => {
  const [wh, setWh] = useState<string>('全倉庫');
  const v = useMemo(() => {
    const picked = wh === '全倉庫' ? [...warehouses] : [wh as Warehouse];
    const value = months.map((_, i) => picked.reduce((n, w) => n + stock[w].value[i], 0));
    const current = value[value.length - 1];
    const items = watch
      .filter((it) => picked.includes(it.wh))
      .map((it) => ({ ...it, days: Math.round(it.qty / it.daily) }))
      .filter((it) => it.days <= 4 || it.days >= 60)
      .sort((a, b) => a.days - b.days);
    return {
      value,
      current,
      proper: picked.reduce((n, w) => n + stock[w].proper, 0),
      turnover: Math.round(picked.reduce((n, w) => n + stock[w].turnover * stock[w].value[11], 0) / current),
      short: items.filter((it) => it.days <= 4).length,
      over: items.filter((it) => it.days >= 60).length,
      items,
      cats: salesCats.map((label, ci) => ({ label, value: Math.round(picked.reduce((n, w) => n + stock[w].value[11] * stockShare[w][ci], 0)) }))
    };
  }, [wh]);
  const line: Series[] = [{ name: '在庫金額', color: MAIN, values: v.value }];
  return (
    <>
      <div className="flex flex-wrap items-center gap-3 pt-8 sm:pt-0">
        <span className="text-xs font-bold text-sumi-muted">倉庫</span>
        <Filter label="倉庫" options={['全倉庫', ...warehouses]} value={wh} onChange={(w) => (setWh(w), onTouch())} hint={hint} />
      </div>
      <div className="mt-5 grid grid-cols-3 lg:grid-cols-4 gap-3">
        <Tile hero label="いまの在庫金額" value={yen(v.current)} />
        <Tile label="在庫回転日数" value={`${v.turnover}日`} note="在庫が売れるまでの目安" />
        <Tile label="欠品が近い品目" value={`${v.short}品目`} note="残り4日分以下" />
        <Tile label="在庫が多すぎる品目" value={`${v.over}品目`} note="60日分以上" />
      </div>
      <div className="mt-3 grid lg:grid-cols-[1.6fr_1fr] gap-3">
        <Panel title={<>在庫金額の推移<span className="ml-1 text-xs font-normal text-sumi-muted">（万円）</span></>}>
          <Chart labels={months} series={line} unit="万円" refLine={{ value: v.proper, label: '適正' }} />
        </Panel>
        <Panel title="カテゴリ別の在庫金額">
          <BarList rows={v.cats} unit="万円" />
        </Panel>
      </div>
      <Panel title="要注意の品目" className="mt-3">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-xs">
            <thead>
              <tr className="text-sumi-muted text-left">
                <th className="font-normal py-1.5">品目</th>
                <th className="font-normal">倉庫</th>
                <th className="font-normal text-right">在庫数</th>
                <th className="font-normal text-right">1日の出荷</th>
                <th className="font-normal text-right">残り</th>
                <th className="font-normal pl-4">状態</th>
              </tr>
            </thead>
            <tbody>
              {v.items.map((it) => {
                const short = it.days <= 4;
                return (
                  <tr key={it.name} className="border-t border-sumi/10">
                    <td className="py-2 font-bold">{it.name}</td>
                    <td className="text-sumi-muted">{it.wh}</td>
                    <td className="text-right">{it.qty.toLocaleString()}</td>
                    <td className="text-right">{it.daily.toLocaleString()}</td>
                    <td className="text-right font-bold">{it.days}日分</td>
                    <td className="pl-4">
                      <span className="inline-flex items-center gap-1 font-bold" style={{ color: short ? CRITICAL : WARNING }}>
                        {short ? '▼ 欠品注意' : '▲ 多すぎ'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
};

// --- 生産ダッシュボード（製造業） ---
const lines = ['第1ライン', '第2ライン', '第3ライン'] as const;
type Line = (typeof lines)[number];
const days = ['10/1', '10/2', '10/3', '10/6', '10/7', '10/8', '10/9', '10/10', '10/14', '10/15', '10/16', '10/17'];
const prod: Record<Line, { actual: number[]; plan: number; uptime: number; defect: number }> = {
  第1ライン: { actual: [820, 790, 840, 760, 810, 850, 830, 700, 820, 860, 840, 810], plan: 820, uptime: 0.91, defect: 1.2 },
  第2ライン: { actual: [610, 640, 590, 620, 650, 600, 520, 610, 640, 660, 630, 650], plan: 640, uptime: 0.86, defect: 2.1 },
  第3ライン: { actual: [420, 450, 430, 400, 460, 470, 440, 450, 380, 460, 470, 480], plan: 450, uptime: 0.88, defect: 1.6 }
};
const defects = [
  { label: 'キズ・打痕', share: 0.38 },
  { label: '寸法ずれ', share: 0.27 },
  { label: '組付け不良', share: 0.19 },
  { label: '汚れ', share: 0.1 },
  { label: 'その他', share: 0.06 }
];

const ProductionBoard: React.FC<{ hint: boolean; onTouch: () => void }> = ({ hint, onTouch }) => {
  const [line, setLine] = useState<string>('全ライン');
  const v = useMemo(() => {
    const picked = line === '全ライン' ? [...lines] : [line as Line];
    const actual = days.map((_, i) => picked.reduce((n, l) => n + prod[l].actual[i], 0));
    const plan = picked.reduce((n, l) => n + prod[l].plan, 0);
    const total = sumOf(actual);
    const defectRate = picked.reduce((n, l) => n + prod[l].defect * sumOf(prod[l].actual), 0) / total;
    return {
      actual,
      plan: days.map(() => plan),
      total,
      achieve: total / (plan * days.length),
      defectRate,
      uptime: picked.reduce((n, l) => n + prod[l].uptime, 0) / picked.length,
      lineRates: lines.map((l) => ({ label: l, rate: prod[l].uptime, dim: line !== '全ライン' && line !== l })),
      defects: defects.map((d) => ({ label: d.label, value: Math.round(((total * defectRate) / 100) * d.share) }))
    };
  }, [line]);
  const series: Series[] = [
    { name: '実績', color: MAIN, values: v.actual, kind: 'column' },
    { name: '計画', color: SUB, values: v.plan }
  ];
  return (
    <>
      <div className="flex flex-wrap items-center gap-3 pt-8 sm:pt-0">
        <span className="text-xs font-bold text-sumi-muted">ライン</span>
        <Filter label="ライン" options={['全ライン', ...lines]} value={line} onChange={(l) => (setLine(l), onTouch())} hint={hint} />
      </div>
      <div className="mt-5 grid grid-cols-3 lg:grid-cols-4 gap-3">
        <Tile hero label="今月の生産数" value={`${v.total.toLocaleString()}個`} />
        <Tile label="計画達成率" value={`${(v.achieve * 100).toFixed(1)}%`} />
        <Tile label="不良率" value={`${v.defectRate.toFixed(1)}%`} />
        <Tile label="稼働率" value={`${Math.round(v.uptime * 100)}%`} note="動いていた時間の割合" />
      </div>
      <div className="mt-3 grid lg:grid-cols-[1.6fr_1fr] gap-3">
        <Panel title={<>日別の生産数<span className="ml-1 text-xs font-normal text-sumi-muted">（個）</span></>} legend={series}>
          <Chart labels={days} series={series} unit="個" zero />
        </Panel>
        <div className="grid gap-3">
          <Panel title="ライン別の稼働率">
            <Meters rows={v.lineRates} />
          </Panel>
          <Panel title="不良の内訳">
            <BarList rows={v.defects} unit="個" />
          </Panel>
        </div>
      </div>
    </>
  );
};

const boards = [
  { key: 'sales', label: '売上', title: '売上ダッシュボード', Board: SalesBoard },
  { key: 'stock', label: '在庫', title: '在庫ダッシュボード', Board: StockBoard },
  { key: 'production', label: '生産', title: '生産ダッシュボード', Board: ProductionBoard }
] as const;

const DashboardSample: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [touched, setTouched] = useState(false);
  const [tabTouched, setTabTouched] = useState(false);
  const { Board } = boards[tab];

  return (
    <div className={`rounded-[28px] bg-white overflow-hidden ${card}`}>
      {/* 画面の枠（ブラウザ風）。タブでダッシュボードを切り替える */}
      <div className="flex items-end gap-2 border-b-[2.5px] border-sumi bg-cream px-4 pt-3">
        <span className="hidden sm:flex gap-1.5 self-center pb-3 mr-1" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-coral border-2 border-sumi" />
          <span className="w-3 h-3 rounded-full bg-mustard border-2 border-sumi" />
          <span className="w-3 h-3 rounded-full bg-[#1E9C8C] border-2 border-sumi" />
        </span>
        <div className="flex gap-1" role="tablist" aria-label="ダッシュボードの種類">
          {boards.map((b, i) => (
            <button
              key={b.key}
              type="button"
              role="tab"
              aria-selected={tab === i}
              onClick={() => {
                setTab(i);
                setTabTouched(true);
              }}
              className={`-mb-[2.5px] rounded-t-xl border-[2.5px] px-3 sm:px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors ${tab === i ? 'bg-[#FCFCFB] border-sumi border-b-[#FCFCFB]' : 'bg-transparent border-transparent text-sumi-muted hover:text-sumi'}`}
            >
              {b.label}
              <span className="hidden md:inline">ダッシュボード</span>
            </button>
          ))}
        </div>
        {!tabTouched && (
          <span aria-hidden="true" className="hidden md:inline-flex self-center pb-2 items-center gap-1 text-xs font-black text-coral animate-[pop-hint_1.1s_ease-in-out_infinite]">
            <ArrowLeft className="w-4 h-4" strokeWidth={3} />
            ほかの例も見られます
          </span>
        )}
        <span className="ml-auto self-center mb-3 shrink-0 rounded-full bg-sumi px-3 py-0.5 text-[11px] font-black text-white">
          見本<span className="hidden sm:inline">・架空のデータです</span>
        </span>
      </div>

      <div className="p-4 md:p-7 bg-[#FCFCFB]" role="tabpanel" aria-label={boards[tab].title}>
        <Board key={boards[tab].key} hint={!touched} onTouch={() => setTouched(true)} />
      </div>
    </div>
  );
};

export default DashboardSample;
