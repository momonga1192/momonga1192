import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

// 画面に入ったとき・絞り込みで値が変わったときに、0から最終値まで動かす。動きを減らす設定なら最初から最終値
export function useReveal(token: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let visible = false;
    setProgress(media.matches ? 1 : 0);
    const play = () => {
      cancelAnimationFrame(frame);
      if (media.matches) { setProgress(1); return; }
      setProgress(0);
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / 1150, 1);
        setProgress(t);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    // 新しく表示された部品が、空のまま残らないようにする
    const fallback = window.setTimeout(() => {
      cancelAnimationFrame(frame);
      setProgress(1);
    }, 1800);
    const node = ref.current;
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !visible) play();
      visible = entry.isIntersecting;
      if (!visible) {
        cancelAnimationFrame(frame);
        setProgress(1);
      }
    }, { threshold: 0 });
    if (node) {
      observer?.observe(node);
      const box = node.getBoundingClientRect();
      visible = box.bottom > 0 && box.top < window.innerHeight && box.right > 0 && box.left < window.innerWidth;
      if (visible || !observer) play();
    }
    const change = () => { if (media.matches || visible) play(); };
    media.addEventListener('change', change);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
      media.removeEventListener('change', change);
    };
  }, [token]);
  return { ref, progress, ease: 1 - (1 - progress) ** 3 };
}

// 少し行き過ぎてから戻る動き（針やバーの「グイーン」「ピューン」）
const overshoot = (t: number) => 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2;

// 「ここをクリック！」と同じステッカー。カードの上の縁に重ねて浮かせ、下向きの矢印でそのカードの中を指す
export const PeekHint: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => (
  <span aria-hidden="true" className={`pointer-events-none absolute z-20 dash-hint ${className}`}>
    <span className="flex items-center gap-1 -rotate-3 whitespace-nowrap rounded-lg bg-coral px-2.5 py-1 text-xs font-black text-white border-2 border-sumi shadow-[2px_2px_0_#1F2430]">
      {text}
      <ArrowDown className="w-3.5 h-3.5" strokeWidth={3.2} />
    </span>
  </span>
);

export function Count({ value }: { value: string }) {
  const { ref, ease } = useReveal(value);
  const match = value.match(/^([+-]?)([\d,.]+)(.*)$/);
  const decimals = match?.[2].split('.')[1]?.length ?? 0;
  return <div ref={ref}>{match ? `${match[1]}${(Number(match[2].replaceAll(',', '')) * ease).toLocaleString('ja-JP', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${match[3]}` : value}</div>;
}

export const palette = ['#5B5BD6', '#1E9C8C', '#F2B544', '#E77B71', '#9292CC'];

// --- 売上：スピードメーター ---
const point = (angle: number, r: number) => ({ x: 160 + Math.cos(angle) * r, y: 151 - Math.sin(angle) * r });
const arc = (from: number, to: number, max: number) => {
  const a = point(Math.PI * (1 - from / max), 116);
  const b = point(Math.PI * (1 - to / max), 116);
  return `M${a.x},${a.y} A116,116 0 0 1 ${b.x},${b.y}`;
};

export function Gauge({ value, title, sub }: { value: number; title: string; sub: string }) {
  const { ref, progress, ease } = useReveal(`${value}`);
  const max = 140;
  const angle = Math.PI * (1 - (Math.min(value, max) / max) * overshoot(progress));
  const needle = point(angle, 87);
  const bands: [number, number, string][] = [[0, 80, '#C93C3C'], [80, 100, '#B7770A'], [100, 140, '#1E9C8C']];
  return (
    <div ref={ref} className="min-w-0 rounded-2xl border-2 border-sumi bg-cream p-4 shadow-[3px_3px_0_#5B5BD6]">
      <p className="text-xs font-black tracking-widest text-svc-data">PERFORMANCE</p>
      <h4 className="mt-1 text-lg font-black">{title}</h4>
      <svg viewBox="0 0 320 230" className="mx-auto block w-full max-w-[360px]" role="img" aria-label={`${title} ${value.toFixed(1)}%`}>
        {bands.map(([a, b, color]) => <path key={a} d={arc(a, b, max)} fill="none" stroke={color} strokeWidth="17" />)}
        {Array.from({ length: 15 }, (_, i) => {
          const a = Math.PI * (1 - i / 14); const p = point(a, 99); const q = point(a, i % 2 ? 93 : 88); const t = point(a, 138);
          return <g key={i}><line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#1F2430" strokeWidth="2" />{i % 2 === 0 && <text x={t.x} y={t.y + 4} textAnchor="middle" fontSize="11" fill="#50566A">{i * 10}</text>}</g>;
        })}
        <line x1="160" y1="151" x2={needle.x} y2={needle.y} stroke="#1F2430" strokeWidth="5" strokeLinecap="round" />
        <circle cx="160" cy="151" r="9" fill="#5B5BD6" stroke="#1F2430" strokeWidth="3" />
        <text x="160" y="198" textAnchor="middle" fontSize="38" fontWeight="900" fill="#1F2430">{(value * ease).toFixed(1)}%</text>
        <text x="160" y="221" textAnchor="middle" fontSize="12" fill="#50566A">{sub}</text>
      </svg>
    </div>
  );
}

// --- 売上：ドーナツ ---
export function Donut({ rows, unit }: { rows: { label: string; value: number }[]; unit: string }) {
  const token = JSON.stringify(rows);
  const { ref, ease } = useReveal(token);
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => setSelected(null), [token]);
  const total = rows.reduce((s, r) => s + r.value, 0);
  const active = selected === null ? null : rows[selected];
  let offset = 0;
  return (
    <div ref={ref} className="dash-donut-layout">
      <div className="relative mx-auto w-full max-w-[200px]">
        <svg viewBox="0 0 240 240" className="w-full overflow-visible" style={{ touchAction: 'pan-y' }} onPointerMove={e => {
          if (e.pointerType !== 'touch' || !e.buttons) return;
          const box = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - box.left) / box.width * 240 - 120;
          const y = (e.clientY - box.top) / box.height * 240 - 120;
          if (Math.hypot(x, y) < 65 || Math.hypot(x, y) > 110) return;
          const fraction = ((Math.atan2(y, x) + Math.PI / 2 + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2);
          let accumulated = 0;
          setSelected(rows.findIndex(row => { accumulated += row.value / total; return fraction <= accumulated; }));
        }} role="group" aria-label="構成比。各項目を選ぶと詳細を表示">
          <circle cx="120" cy="120" r="87" fill="none" stroke="#F0EEE8" strokeWidth="25" />
          {rows.map((row, i) => {
            const share = total ? row.value / total : 0; const start = offset; offset += share * 100;
            return <circle key={row.label} cx="120" cy="120" r="87" pathLength="100" fill="none" stroke={palette[i % palette.length]} strokeWidth={selected === i ? 34 : 25} strokeDasharray={`${Math.max(share * 100 - 1, 0) * ease} 100`} strokeDashoffset={-start} transform="rotate(-90 120 120)" className="cursor-pointer focus:outline-none" style={{ transition: 'stroke-width 180ms' }} role="button" tabIndex={0} aria-label={`${row.label} ${row.value.toLocaleString()}${unit} ${(share * 100).toFixed(1)}%`} aria-pressed={selected === i} onPointerEnter={() => setSelected(i)} onPointerLeave={() => setSelected(null)} onClick={() => setSelected(i)} onFocus={() => setSelected(i)} onBlur={() => setSelected(null)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(i); } }} />;
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-10 text-center" aria-live="polite">
          <p className="text-[11px] text-sumi-muted">{active?.label ?? '合計'}</p>
          <p className="mt-1 font-en text-2xl font-black">{Math.round((active?.value ?? total) * ease).toLocaleString()}<span className="ml-0.5 text-xs">{unit}</span></p>
          <p className="text-sm font-black text-svc-data">{active ? `${(active.value / total * 100).toFixed(1)}%` : '100%'}</p>
        </div>
      </div>
      <div className="grid gap-1.5">{rows.map((row, i) => <button key={row.label} type="button" onPointerEnter={() => setSelected(i)} onPointerLeave={() => setSelected(null)} onFocus={() => setSelected(i)} onBlur={() => setSelected(null)} onClick={() => setSelected(i)} className={`flex min-w-0 items-center gap-2 rounded-lg px-2 py-1 text-xs text-left ${selected === i ? 'bg-svc-data/10 font-bold' : ''}`}><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: palette[i % palette.length] }} /><span className="flex-1">{row.label}</span><span className="font-en font-bold">{(total ? row.value / total * 100 : 0).toFixed(1)}%</span></button>)}</div>
    </div>
  );
}

// --- 在庫：適正範囲の帯つきバー（80〜120%を帯で示し、いまの水準を印で示す） ---
export function RangeBars({ rows }: { rows: { label: string; rate: number; dim?: boolean }[] }) {
  const { ref, progress } = useReveal(JSON.stringify(rows));
  const scale = 1.6; // 160%までを横幅に収める
  const pos = (r: number) => `${(Math.min(r, scale) / scale) * 100}%`;
  return (
    <div ref={ref} className="space-y-6 py-1">
      {rows.map(({ label, rate, dim }) => {
        const state = rate < 0.8 ? { text: '▼ 不足', color: '#FF8A7A' } : rate > 1.2 ? { text: '▲ 過剰', color: '#F2B544' } : { text: '● 適正', color: '#5ED3BF' };
        return (
          <div key={label} className={`transition-opacity ${dim ? 'opacity-35' : ''}`}>
            <p className="flex items-baseline justify-between text-xs">
              <span className="text-white/70">{label}</span>
              <span className="font-bold" style={{ color: state.color }}>{state.text}　<span className="font-en text-base text-white">{Math.round(rate * 100 * Math.min(progress * 1.2, 1))}%</span></span>
            </p>
            <div className="relative mt-2 h-5 rounded-full bg-white/10">
              <span className="absolute inset-y-0 rounded-full bg-[#5ED3BF]/25 border border-[#5ED3BF]/50" style={{ left: pos(0.8), width: `calc(${pos(1.2)} - ${pos(0.8)})` }} />
              <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: pos(rate), background: `linear-gradient(90deg, transparent, ${state.color})`, transformOrigin: 'left', transform: `scaleX(${overshoot(progress)})` }} />
              <span className="absolute -inset-y-1 w-1.5 rounded-full bg-white shadow-[0_0_10px_#fff]" style={{ left: `calc(${pos(rate)} * ${overshoot(progress)} - 3px)` }} />
            </div>
          </div>
        );
      })}
      <p className="flex justify-between text-[10px] text-white/45 font-en"><span>0%</span><span className="pl-[10%]">適正 80〜120%</span><span>160%</span></p>
    </div>
  );
}

// --- 在庫：構成比の帯グラフ（1本の横帯） ---
export function StackBar({ rows, unit }: { rows: { label: string; value: number }[]; unit: string }) {
  const token = JSON.stringify(rows);
  const { ref, ease } = useReveal(token);
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => setSelected(null), [token]);
  const total = rows.reduce((s, r) => s + r.value, 0) || 1;
  return (
    <div ref={ref}>
      <div className="flex h-10 overflow-hidden rounded-xl border-2 border-white/15" style={{ width: `${ease * 100}%` }}>
        {rows.map((row, i) => (
          <button
            key={row.label}
            type="button"
            aria-label={`${row.label} ${row.value.toLocaleString()}${unit} ${((row.value / total) * 100).toFixed(1)}%`}
            onPointerEnter={() => setSelected(i)}
            onPointerLeave={() => setSelected(null)}
            onFocus={() => setSelected(i)}
            onBlur={() => setSelected(null)}
            onClick={() => setSelected(i)}
            className="h-full transition-[filter,opacity] duration-150 focus:outline-none"
            style={{ width: `${(row.value / total) * 100}%`, background: palette[i % palette.length], opacity: selected === null || selected === i ? 1 : 0.35 }}
          />
        ))}
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
        {rows.map((row, i) => (
          <li key={row.label} className={`flex items-center gap-2 rounded-md px-1.5 py-0.5 ${selected === i ? 'bg-white/10' : ''}`}>
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: palette[i % palette.length] }} />
            <span className="flex-1 text-white/75">{row.label}</span>
            <span className="font-en font-bold text-white">{((row.value / total) * 100).toFixed(0)}%</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 h-5 text-sm text-white" aria-live="polite">
        {selected !== null && <><b>{rows[selected].label}</b>　{rows[selected].value.toLocaleString()}{unit}</>}
      </p>
    </div>
  );
}

// --- 生産：ラインごとの進捗リングと表示灯 ---
export function Rings({ rows }: { rows: { label: string; rate: number; dim?: boolean }[] }) {
  const { ref, progress, ease } = useReveal(JSON.stringify(rows));
  return (
    <div ref={ref} className="grid grid-cols-3 gap-2">
      {rows.map(({ label, rate, dim }) => {
        const state = rate >= 0.9 ? { text: '順調', color: '#1E9C8C' } : rate >= 0.87 ? { text: '注意', color: '#B7770A' } : { text: '要確認', color: '#C93C3C' };
        return (
          <div key={label} className={`text-center transition-opacity ${dim ? 'opacity-35' : ''}`}>
            <div className="relative mx-auto w-full max-w-[120px]">
              <svg viewBox="0 0 120 120" className="w-full -rotate-90" role="img" aria-label={`${label} 稼働率${Math.round(rate * 100)}% ${state.text}`}>
                <circle cx="60" cy="60" r="48" fill="none" stroke="#EDEBE6" strokeWidth="12" />
                <circle cx="60" cy="60" r="48" fill="none" stroke={state.color} strokeWidth="12" strokeLinecap="round" pathLength="100" strokeDasharray={`${Math.min(rate * overshoot(progress), 1) * 100} 100`} />
              </svg>
              <span className="absolute inset-0 grid place-items-center font-en text-xl md:text-2xl font-black">{Math.round(rate * 100 * ease)}%</span>
            </div>
            <p className="mt-2 text-xs font-bold">{label}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 rounded-full border-2 border-sumi bg-white px-2 py-0.5 text-[11px] font-black">
              <span className="h-2.5 w-2.5 rounded-full dash-lamp" style={{ background: state.color, boxShadow: `0 0 8px ${state.color}` }} />
              {state.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// --- 生産：大きな進捗バー（計画を100%として、ピューンと伸びる） ---
export function BigProgress({ rate, label }: { rate: number; label: string }) {
  const { ref, progress, ease } = useReveal(`${rate}`);
  const width = Math.min(rate, 1.2) / 1.2;
  return (
    <div ref={ref}>
      <p className="flex items-baseline justify-between">
        <span className="text-xs font-bold text-sumi-muted">{label}</span>
        <span className="font-en text-3xl font-black">{(rate * 100 * ease).toFixed(1)}%</span>
      </p>
      <div className="relative mt-3 h-7 rounded-full border-[2.5px] border-sumi bg-white overflow-hidden">
        <span className="absolute inset-y-0 left-0 bg-[repeating-linear-gradient(-45deg,#F2B544_0_12px,#F7C96B_12px_24px)]" style={{ width: `${width * 100}%`, transformOrigin: 'left', transform: `scaleX(${overshoot(progress)})` }} />
        <span className="absolute inset-y-0 w-[2.5px] bg-sumi" style={{ left: `${(1 / 1.2) * 100}%` }} />
      </div>
      <p className="mt-1 text-[11px] text-sumi-muted text-right pr-[14%]">計画 100%</p>
    </div>
  );
}

// --- 生産：多い順の横棒（パレート図） ---
export function Pareto({ rows, unit }: { rows: { label: string; value: number }[]; unit: string }) {
  const { ref, progress } = useReveal(JSON.stringify(rows));
  const sorted = [...rows].sort((a, b) => b.value - a.value);
  const max = sorted[0]?.value || 1;
  const total = sorted.reduce((s, r) => s + r.value, 0) || 1;
  let acc = 0;
  return (
    <div ref={ref}><ul className="space-y-3">
      {sorted.map((row, i) => {
        acc += row.value;
        const t = Math.min(Math.max(progress * 1.4 - i * 0.1, 0), 1);
        return (
          <li key={row.label} className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-3 text-xs">
            <span className="font-bold truncate">{row.label}</span>
            <span className="relative h-4 rounded-r-md bg-sumi/5">
              <span className="absolute inset-y-0 left-0 rounded-r-md" style={{ width: `${(row.value / max) * 100}%`, background: i === 0 ? '#C93C3C' : '#5B5BD6', transformOrigin: 'left', transform: `scaleX(${overshoot(t)})` }} />
            </span>
            <span className="font-en text-right tabular-nums"><b>{row.value.toLocaleString()}</b>{unit}<span className="ml-2 text-sumi-muted">累計{Math.round((acc / total) * 100)}%</span></span>
          </li>
        );
      })}
    </ul></div>
  );
}

export const MotionStyles = () => <style>{`
.dash-donut-layout { display:grid; align-items:center; gap:8px; grid-template-columns:minmax(0,1fr) minmax(0,1fr); }
@media(max-width:420px) { .dash-donut-layout { grid-template-columns:1fr; } }
@keyframes dash-hint { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-3px); } }
@keyframes dash-lamp { 0%,100% { opacity:1; } 50% { opacity:.45; } }
.dash-hint { animation:dash-hint 2s ease-in-out infinite; }
.dash-lamp { animation:dash-lamp 1.6s ease-in-out infinite; }
@media(prefers-reduced-motion:reduce) { .dash-hint,.dash-lamp { animation:none!important; } }
`}</style>;
