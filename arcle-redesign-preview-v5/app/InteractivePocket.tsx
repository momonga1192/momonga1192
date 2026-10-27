"use client";

import { useMemo, useRef, useState, type CSSProperties, type DragEvent, type PointerEvent } from "react";

type Issue = {
  id: string;
  number: string;
  short: string;
  question: string;
  route: string;
  action: string;
  color: string;
};

const issues: Issue[] = [
  {
    id: "it",
    number: "A",
    short: "PC・アカウント",
    question: "入退社や端末管理が、いつも誰かの善意頼み。",
    route: "情シスの足もとから",
    action: "端末・アカウント・SaaS・セキュリティを棚卸しし、問い合わせ窓口を整えます。",
    color: "#a8dfc1",
  },
  {
    id: "data",
    number: "B",
    short: "Excel・数字",
    question: "集計だけで月末が終わる。数字も人によって違う。",
    route: "数字の交通整理から",
    action: "散らばったデータと定義を揃え、判断に使えるダッシュボードへ変えます。",
    color: "#ffaf91",
  },
  {
    id: "ai",
    number: "C",
    short: "AIどう使う？",
    question: "試してはいる。でも安全な使い方と次の一手が曖昧。",
    route: "使い道の発見から",
    action: "ルール、社内検索、問い合わせ、自動化の中から効果が見える一歩を選びます。",
    color: "#cbb4ef",
  },
  {
    id: "web",
    number: "D",
    short: "Webが古い",
    question: "強みが伝わらず、更新も止まり、相談につながらない。",
    route: "言葉の整理から",
    action: "会社の価値を言葉と構成にし、見つけてもらえるWebへ育てます。",
    color: "#ffd969",
  },
];

export default function InteractivePocket() {
  const rootRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [chewing, setChewing] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);

  const selectedIssues = useMemo(() => selected.map((id) => issues.find((issue) => issue.id === id)).filter(Boolean) as Issue[], [selected]);
  const subject = encodeURIComponent(`Arcle相談：${selectedIssues.map((issue) => issue.short).join("・") || "まずは相談"}`);

  const feed = (id: string) => {
    setSelected((current) => current.includes(id) ? current : [...current, id]);
    setChewing(false);
    requestAnimationFrame(() => setChewing(true));
    window.setTimeout(() => setChewing(false), 520);
  };

  const toggle = (id: string) => {
    if (selected.includes(id)) setSelected((current) => current.filter((item) => item !== id));
    else feed(id);
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - .5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - .5) * 2));
    root.style.setProperty("--look-x", `${x * 8}px`);
    root.style.setProperty("--look-y", `${y * 6}px`);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    if (issues.some((issue) => issue.id === id)) feed(id);
    setDragging(null);
  };

  return (
    <section className="pocket-hero" id="top" ref={rootRef} onPointerMove={onPointerMove}>
      <header className="pocket-header">
        <a className="pocket-logo" href="#top" aria-label="Arcle トップへ"><span>Arcle</span><i>IT / DX PARTNER</i></a>
        <nav aria-label="サイトナビゲーション"><a href="#approach">考え方</a><a href="#services">できること</a><a href="#profile">私たち</a></nav>
        <a className="pocket-header-cta" href="#contact">相談する ↗</a>
      </header>

      <div className="pocket-grid">
        <div className="pocket-intro">
          <span className="pocket-kicker">DON&apos;T PICK A SERVICE YET.</span>
          <h1>その「なんか困る」を、<br /><em>投げてください。</em></h1>
          <p>サービス名を決めなくて大丈夫。気になるカードを、クリックするかポッケへドラッグしてください。</p>
        </div>

        <div className="issue-deck" aria-label="相談したい困りごと">
          {issues.map((issue) => (
            <button
              type="button"
              key={issue.id}
              draggable
              aria-pressed={selected.includes(issue.id)}
              className={`issue-token issue-${issue.id} ${selected.includes(issue.id) ? "is-selected" : ""} ${dragging === issue.id ? "is-dragging" : ""}`}
              style={{ "--token-color": issue.color } as CSSProperties}
              onClick={() => toggle(issue.id)}
              onDragStart={(event) => { event.dataTransfer.setData("text/plain", issue.id); setDragging(issue.id); }}
              onDragEnd={() => setDragging(null)}
            >
              <span>{issue.number}</span><strong>{issue.short}</strong><small>{selected.includes(issue.id) ? "ポッケに入っています" : "これも気になる"}</small><b>{selected.includes(issue.id) ? "✓" : "+"}</b>
            </button>
          ))}
        </div>

        <div
          className={`pocket-character-zone ${dragging ? "is-awaiting" : ""}`}
          onDragOver={(event) => event.preventDefault()}
          onDrop={onDrop}
          role="img"
          aria-label="困りごとを整理する案内役 ポッケ"
        >
          <div className="character-caption"><span>HELLO, I&apos;M</span><strong>ポッケ</strong></div>
          <div className={`pocke ${chewing ? "is-chewing" : ""} ${selected.length ? "has-items" : ""}`}>
            <i className="pocke-shadow" />
            <i className="pocke-ear pocke-ear-left" /><i className="pocke-ear pocke-ear-right" />
            <div className="pocke-body">
              <i className="pocke-eye pocke-eye-left"><b /></i><i className="pocke-eye pocke-eye-right"><b /></i>
              <i className="pocke-mouth" />
              <div className="pocke-pocket">
                <span>{selected.length ? `${selected.length}件` : "DROP"}</span>
                <div>{selectedIssues.map((issue) => <i key={issue.id} style={{ background: issue.color }} />)}</div>
              </div>
            </div>
            <i className="pocke-arm pocke-arm-left" /><i className="pocke-arm pocke-arm-right" />
            <i className="pocke-leg pocke-leg-left" /><i className="pocke-leg pocke-leg-right" />
          </div>
          <p className="drop-instruction">{dragging ? "ここへどうぞ！" : selected.length ? "ちゃんと整理しています。" : "カードをポッケへ"}</p>
        </div>

        <aside className={`route-builder ${selected.length ? "has-route" : ""}`} aria-live="polite">
          <div className="route-heading"><span>YOUR STARTING POINT</span><b>{String(selected.length).padStart(2, "0")}</b></div>
          {selected.length === 0 ? (
            <div className="route-empty"><strong>相談内容は、<br />まだ言葉になっていなくてOK。</strong><p>左のカードから、少しでも気になるものを選んでみてください。</p></div>
          ) : (
            <>
              <strong className="route-title">この順番で、<br />一緒にほどきます。</strong>
              <ol>{selectedIssues.map((issue, index) => <li key={issue.id}><span>0{index + 1}</span><div><strong>{issue.route}</strong><p>{issue.action}</p></div><button type="button" aria-label={`${issue.short}を外す`} onClick={() => toggle(issue.id)}>×</button></li>)}</ol>
              <div className="route-actions"><a href={`mailto:contact@arcle.net?subject=${subject}`}>この内容で相談する <b>→</b></a><button type="button" onClick={() => setSelected([])}>リセット</button></div>
            </>
          )}
        </aside>
      </div>
      <a className="pocket-scroll" href="#approach"><span>MORE ABOUT ARCLE</span><i>↓</i></a>
    </section>
  );
}
