import React, { useEffect, useRef, useState } from 'react';
import { Hand } from 'lucide-react';

// Each visual replays when it enters the viewport or its filtered data changes.
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
    // Never leave a newly mounted or interrupted visual in its empty state.
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

export const TouchHint = ({ text = 'グラフに触れて詳細をチェック' }: { text?: string }) => (
  <p className="dash-touch mt-2 flex items-center gap-1.5 text-[11px] font-bold text-svc-data"><Hand size={14} aria-hidden="true" className="shrink-0" />{text}</p>
);

export function Count({ value }: { value: string }) {
  const { ref, ease } = useReveal(value);
  const match = value.match(/^([+-]?)([\d,.]+)(.*)$/);
  const decimals = match?.[2].split('.')[1]?.length ?? 0;
  return <div ref={ref}>{match ? `${match[1]}${(Number(match[2].replaceAll(',', '')) * ease).toLocaleString('ja-JP', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${match[3]}` : value}</div>;
}

const colors = ['#5B5BD6', '#1E9C8C', '#F2B544', '#E77B71', '#9292CC'];
const point = (angle: number, r: number) => ({ x: 160 + Math.cos(angle) * r, y: 151 - Math.sin(angle) * r });
const arc = (from: number, to: number, max: number) => {
  const a = point(Math.PI * (1 - from / max), 116);
  const b = point(Math.PI * (1 - to / max), 116);
  return `M${a.x},${a.y} A116,116 0 0 1 ${b.x},${b.y}`;
};

export function Gauge({ value, title, detail, inventory = false }: { value: number; title: string; detail: string; inventory?: boolean }) {
  const { ref, progress, ease } = useReveal(`${value}:${detail}`);
  const [active, setActive] = useState(false);
  const max = 140;
  const overshoot = 1 + 2.70158 * (progress - 1) ** 3 + 1.70158 * (progress - 1) ** 2;
  const angle = Math.PI * (1 - Math.min(value, max) / max * overshoot);
  const needle = point(angle, 87);
  const bands: [number, number, string][] = inventory ? [[0, 80, '#C93C3C'], [80, 120, '#1E9C8C'], [120, 140, '#B7770A']] : [[0, 80, '#C93C3C'], [80, 100, '#B7770A'], [100, 140, '#1E9C8C']];
  return <div ref={ref} className="min-w-0 rounded-2xl border-2 border-sumi bg-cream p-4 shadow-[3px_3px_0_#5B5BD6]">
    <p className="text-xs font-black tracking-widest text-svc-data">PERFORMANCE</p>
    <h4 className="mt-1 text-lg font-black">{title}</h4>
    <button type="button" className="block w-full rounded-xl text-left focus-visible:outline-2 focus-visible:outline-svc-data" onPointerEnter={() => setActive(true)} onPointerLeave={() => setActive(false)} onClick={() => setActive(true)} onFocus={() => setActive(true)} onBlur={() => setActive(false)} aria-label={`${title} ${value.toFixed(1)}%。${detail}`} aria-expanded={active}>
      <svg viewBox="0 0 320 230" className="mx-auto block w-full max-w-[360px]" aria-hidden="true">
        {bands.map(([a,b,color]) => <path key={a} d={arc(a,b,max)} fill="none" stroke={color} strokeWidth="17" />)}
        {Array.from({ length: 15 }, (_, i) => {
          const a = Math.PI * (1 - i / 14); const p = point(a, 99); const q = point(a, i % 2 ? 93 : 88); const t = point(a, 138);
          return <g key={i}><line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#1F2430" strokeWidth="2" />{i % 2 === 0 && <text x={t.x} y={t.y + 4} textAnchor="middle" fontSize="11" fill="#50566A">{i * 10}</text>}</g>;
        })}
        <line x1="160" y1="151" x2={needle.x} y2={needle.y} stroke="#1F2430" strokeWidth="5" strokeLinecap="round" />
        <circle cx="160" cy="151" r="9" fill="#5B5BD6" stroke="#1F2430" strokeWidth="3" />
        <text x="160" y="196" textAnchor="middle" fontSize="36" fontWeight="900" fill="#1F2430">{(value * ease).toFixed(1)}%</text>
        <text x="160" y="219" textAnchor="middle" fontSize="11" fill="#50566A">{inventory ? '適正範囲 80〜120%（100%が基準）' : '目標ライン 100%'}</text>
      </svg>
      <p className={`min-h-[76px] rounded-lg px-3 py-2 text-xs leading-relaxed ${active ? 'bg-svc-data text-white' : 'bg-white text-sumi-muted'}`}>{active ? detail : (inventory ? ['▼ 80%未満：不足', '● 80〜120%：適正', '▲ 120%超：過剰'] : ['▼ 80%未満：要改善', '◆ 80〜100%未満：あと一歩', '● 100%以上：達成']).map(label => <span key={label} className="block">{label}</span>)}</p>
    </button>
    <TouchHint text="ゲージに触れて集計の詳細をチェック" />
  </div>;
}

export function Donut({ rows, unit }: { rows: { label: string; value: number }[]; unit: string }) {
  const token = JSON.stringify(rows);
  const { ref, ease } = useReveal(token);
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => setSelected(null), [token]);
  const total = rows.reduce((s,r) => s + r.value, 0);
  const active = selected === null ? null : rows[selected];
  let offset = 0;
  return <div ref={ref}>
    <div className="dash-donut-layout">
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
          return <circle key={row.label} cx="120" cy="120" r="87" pathLength="100" fill="none" stroke={colors[i % colors.length]} strokeWidth={selected === i ? 34 : 25} strokeDasharray={`${Math.max(share * 100 - 1, 0) * ease} 100`} strokeDashoffset={-start} transform="rotate(-90 120 120)" className="cursor-pointer focus:outline-none" style={{ transition: 'stroke-width 180ms' }} role="button" tabIndex={0} aria-label={`${row.label} ${row.value.toLocaleString()}${unit} ${(share * 100).toFixed(1)}%`} aria-pressed={selected === i} onPointerEnter={() => setSelected(i)} onPointerLeave={() => setSelected(null)} onClick={() => setSelected(i)} onFocus={() => setSelected(i)} onBlur={() => setSelected(null)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(i); } }} />;
        })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-10 text-center" aria-live="polite">
        <p className="text-[11px] text-sumi-muted">{active?.label ?? '合計'}</p>
        <p className="mt-1 font-en text-2xl font-black">{Math.round((active?.value ?? total) * ease).toLocaleString()}<span className="ml-0.5 text-xs">{unit}</span></p>
        <p className="text-sm font-black text-svc-data">{active ? `${(active.value / total * 100).toFixed(1)}%` : '100%'}</p>
      </div>
    </div>
    <div className="grid gap-1.5">{rows.map((row,i) => <button key={row.label} type="button" onPointerEnter={() => setSelected(i)} onPointerLeave={() => setSelected(null)} onFocus={() => setSelected(i)} onBlur={() => setSelected(null)} onClick={() => setSelected(i)} className={`flex min-w-0 items-center gap-2 rounded-lg px-2 py-1 text-xs text-left ${selected === i ? 'bg-svc-data/10 font-bold' : ''}`}><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: colors[i % colors.length] }} /><span className="flex-1">{row.label}</span><span className="font-en font-bold">{(total ? row.value / total * 100 : 0).toFixed(1)}%</span></button>)}</div>
    </div>
    <TouchHint text="リングや項目に触れて内訳をチェック" />
  </div>;
}

export const MotionStyles = () => <style>{`
.dash-donut-layout { display:grid; align-items:center; gap:8px; grid-template-columns:minmax(0,1fr) minmax(0,1fr); }
@media(max-width:420px) { .dash-donut-layout { grid-template-columns:1fr; } }
@keyframes dash-touch { 0%,100% { opacity:1; } 50% { opacity:.65; } }
@keyframes dash-hint { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-3px); } }
.dash-touch { animation:dash-touch 3s ease-in-out infinite; }
.dash-hint { animation:dash-hint 2s ease-in-out infinite; }
@media(prefers-reduced-motion:reduce) { .dash-touch,.dash-hint { animation:none!important; } }
`}</style>;
