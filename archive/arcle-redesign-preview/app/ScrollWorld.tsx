"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const scenes = [
  {
    label: "はじまり",
    eyebrow: "CONNECTED IT PARTNER",
    title: "会社のITが、\nひとつにつながる。",
    body: "情シス、データ、生成AI、Web。散らばっていた課題を、ひとつの窓口でつないで整えます。",
    tags: ["愛知・一宮", "中小企業向け"],
    video: "/video/01-overview.mp4",
    poster: "/scenes/01-overview.png",
    accent: "#4867ee",
  },
  {
    label: "情シス",
    eyebrow: "IT MANAGEMENT",
    title: "困った時、\nすぐそばに。",
    body: "PC、アカウント、セキュリティ。日々の小さな困りごとから、社内ITの土台づくりまで伴走します。",
    tags: ["ヘルプデスク", "SaaS管理", "セキュリティ"],
    video: "/video/02-support.mp4",
    poster: "/scenes/02-support.png",
    accent: "#5f7cf3",
  },
  {
    label: "データ",
    eyebrow: "DATA & INSIGHT",
    title: "数字が、\n次の一手を教える。",
    body: "Excelや複数システムに分かれた数字をひとつに。経営と現場が、同じ景色を見られる状態をつくります。",
    tags: ["Tableau", "Power BI", "KPI設計"],
    video: "/video/03-data.mp4",
    poster: "/scenes/03-data.png",
    accent: "#2f83c8",
  },
  {
    label: "生成AI",
    eyebrow: "GENERATIVE AI",
    title: "AIを、現場で\n働く力に。",
    body: "ルールづくり、社内検索、業務自動化。安全で、毎日の仕事に本当に使えるAIを一緒につくります。",
    tags: ["導入支援", "社内RAG", "業務自動化"],
    video: "/video/04-ai.mp4",
    poster: "/scenes/04-ai.png",
    accent: "#8869e8",
  },
  {
    label: "Web",
    eyebrow: "WEB & COMMUNICATION",
    title: "伝わるWebで、\n次の縁へ。",
    body: "会社の強みを言葉とデザインで整理し、見つけてもらい、相談につながるWebサイトへ育てます。",
    tags: ["コーポレート", "LP", "SEO・運用"],
    video: "/video/05-web.mp4",
    poster: "/scenes/05-web.png",
    accent: "#dc8d4f",
  },
];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smooth = (value: number) => {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
};

function Mark() {
  return <span className="flight-mark" aria-hidden="true"><i /><i /><b /></span>;
}

export default function ScrollWorld() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = scenes.map(() => 0);
    const current = scenes.map(() => 0);
    let raf = 0;
    let scrollRaf = 0;

    const update = () => {
      scrollRaf = 0;
      const travel = Math.max(1, root.offsetHeight - window.innerHeight);
      const y = clamp(-root.getBoundingClientRect().top, 0, travel);
      const progress = y / travel;
      const scaled = progress * (scenes.length - 1);
      const next = Math.min(scenes.length - 1, Math.floor(scaled + 0.5));
      setActive((value) => (value === next ? value : next));
      root.style.setProperty("--world-progress", progress.toString());
      root.style.setProperty("--active-accent", scenes[next].accent);

      scenes.forEach((_, index) => {
        const layer = root.querySelector<HTMLElement>(`[data-scene="${index}"]`);
        const opacity = smooth(1 - Math.abs(scaled - index));
        if (layer) {
          layer.style.opacity = opacity.toString();
          layer.style.zIndex = index === next ? "4" : "3";
        }
        targets[index] = reduceMotion ? 0 : index === 0
          ? clamp(scaled, 0, 1)
          : clamp(scaled - (index - 1), 0, 1);
      });
    };

    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(update);
    };

    const seekVideos = () => {
      videoRefs.current.forEach((video, index) => {
        if (!video || !Number.isFinite(video.duration) || video.duration <= 0 || video.seeking) return;
        current[index] += (targets[index] - current[index]) * 0.16;
        const targetTime = clamp(current[index], 0, 0.998) * video.duration;
        if (Math.abs(video.currentTime - targetTime) > 0.018) {
          try { video.currentTime = targetTime; } catch { /* decoder may still be priming */ }
        }
      });
      raf = requestAnimationFrame(seekVideos);
    };

    update();
    raf = requestAnimationFrame(seekVideos);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
    };
  }, []);

  const jumpTo = (index: number) => {
    const root = rootRef.current;
    if (!root) return;
    const start = root.getBoundingClientRect().top + window.scrollY;
    const travel = root.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: start + travel * (index / (scenes.length - 1)),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <section
      className="scroll-world"
      id="top"
      ref={rootRef}
      style={{ "--scene-count": scenes.length, "--active-accent": scenes[0].accent } as CSSProperties}
      aria-label="Arcleの支援領域を巡るスクロールストーリー"
    >
      <div className="world-sticky">
        <div className="world-sky" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>

        <header className="flight-header">
          <a className="flight-brand" href="#top"><Mark /><strong>Arcle</strong></a>
          <nav aria-label="ストーリーナビゲーション">
            {scenes.map((scene, index) => (
              <button type="button" className={active === index ? "is-active" : ""} onClick={() => jumpTo(index)} key={scene.label}>{scene.label}</button>
            ))}
          </nav>
          <a className="flight-cta" href="#contact">無料相談</a>
        </header>

        <div className="world-progress" aria-hidden="true"><i /></div>

        <div className="scene-stack">
          {scenes.map((scene, index) => (
            <div className="world-scene" data-scene={index} style={{ "--scene-accent": scene.accent } as CSSProperties} key={scene.label}>
              <img src={scene.poster} alt="" aria-hidden="true" />
              <video
                ref={(node) => { videoRefs.current[index] = node; }}
                src={scene.video}
                poster={scene.poster}
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
              />
              <div className="scene-shade" />
            </div>
          ))}
        </div>

        <div className="scene-copy-wrap">
          {scenes.map((scene, index) => (
            <article className={`scene-copy ${active === index ? "is-active" : ""}`} aria-hidden={active !== index} key={scene.label}>
              <span className="scene-number">{String(index + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}</span>
              <span className="scene-eyebrow">{scene.eyebrow}</span>
              <h1>{scene.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
              <p>{scene.body}</p>
              <ul>{scene.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              {index === scenes.length - 1 && <a className="scene-button" href="#contact">まずは相談する <b>→</b></a>}
            </article>
          ))}
        </div>

        <div className="scene-route" aria-label="現在のシーン">
          {scenes.map((scene, index) => (
            <button type="button" aria-label={scene.label} className={active === index ? "is-active" : ""} onClick={() => jumpTo(index)} key={scene.label}><span>{scene.label}</span><i /></button>
          ))}
        </div>

        <div className="scroll-hint" aria-hidden="true"><span>SCROLL TO CONNECT</span><i /></div>
      </div>
    </section>
  );
}
