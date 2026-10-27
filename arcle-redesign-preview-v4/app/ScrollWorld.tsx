"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

type Scene = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  tags: string[];
  poster: string;
  clip: string;
  accent: string;
  motion: "connect" | "it" | "data" | "ai" | "web";
};

type Segment = {
  id: string;
  kind: "scene" | "transition";
  sceneIndex: number;
  nextSceneIndex?: number;
  poster: string;
  clip: string;
  weight: number;
};

const scenes: Scene[] = [
  {
    id: "connect",
    label: "はじまり",
    eyebrow: "CONNECTED IT PARTNER",
    title: "会社のITが、\nひとつにつながる。",
    body: "情シス、データ、生成AI、Web。会社の中に散らばる課題を、ひとつの窓口でつないで整えます。",
    tags: ["愛知・一宮", "中小企業向け", "相談窓口を一本化"],
    poster: "/scenes-v2/scene-01-connect.png",
    clip: "/video-v2/scene-01-connect.mp4",
    accent: "#4867ee",
    motion: "connect",
  },
  {
    id: "it",
    label: "情シス",
    eyebrow: "IT MANAGEMENT",
    title: "困った時、\nすぐそばに。",
    body: "PC、アカウント、セキュリティ。小さな問い合わせから運用の土台づくりまで、社内IT担当として伴走します。",
    tags: ["ヘルプデスク", "SaaS管理", "セキュリティ"],
    poster: "/scenes-v2/scene-02-it.png",
    clip: "/video-v2/scene-02-it.mp4",
    accent: "#5275ed",
    motion: "it",
  },
  {
    id: "data",
    label: "データ",
    eyebrow: "DATA & INSIGHT",
    title: "数字が、\n次の一手を教える。",
    body: "Excelや複数システムに分かれた数字をひとつに。経営と現場が、同じ景色を見られる状態をつくります。",
    tags: ["Tableau", "Power BI", "KPI設計"],
    poster: "/scenes-v2/scene-03-data.png",
    clip: "/video-v2/scene-03-data.mp4",
    accent: "#2c82c6",
    motion: "data",
  },
  {
    id: "ai",
    label: "生成AI",
    eyebrow: "GENERATIVE AI",
    title: "AIを、現場で\n働く力に。",
    body: "ルールづくり、社内検索、問い合わせ対応、業務自動化。安全で、毎日の仕事に使えるAIを一緒につくります。",
    tags: ["導入支援", "社内RAG", "業務自動化"],
    poster: "/scenes-v2/scene-04-ai.png",
    clip: "/video-v2/scene-04-ai.mp4",
    accent: "#5b7fd8",
    motion: "ai",
  },
  {
    id: "web",
    label: "Web",
    eyebrow: "WEB & GROWTH",
    title: "伝わるWebで、\n次の縁へ。",
    body: "会社の強みを言葉とデザインで整理し、見つけてもらい、相談につながるWebサイトへ育てます。",
    tags: ["コーポレート", "LP", "SEO・運用"],
    poster: "/scenes-v2/scene-05-web.png",
    clip: "/video-v2/scene-05-web.mp4",
    accent: "#d79247",
    motion: "web",
  },
];

const transitionClips = [
  "/video-v2/transition-01-02.mp4",
  "/video-v2/transition-02-03.mp4",
  "/video-v2/transition-03-04.mp4",
  "/video-v2/transition-04-05.mp4",
];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smooth = (value: number) => {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
};

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><i /><i /><b /></span>;
}

function MotionOverlay({ kind }: { kind: Scene["motion"] }) {
  if (kind === "connect") {
    return <div className="motion-overlay motion-connect" aria-hidden="true"><i /><i /><i /><span /><span /><span /><span /></div>;
  }
  if (kind === "it") {
    return <div className="motion-overlay motion-it" aria-hidden="true"><span /><span /><span /><i /><i /><b /></div>;
  }
  if (kind === "data") {
    return <div className="motion-overlay motion-data" aria-hidden="true"><span /><span /><span /><span /><span /><i /></div>;
  }
  if (kind === "ai") {
    return <div className="motion-overlay motion-ai" aria-hidden="true"><span /><span /><span /><i /><i /><i /><b /></div>;
  }
  return <div className="motion-overlay motion-web" aria-hidden="true"><span /><span /><span /><i /><i /><b /></div>;
}

export default function ScrollWorld() {
  const rootRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeScene, setActiveScene] = useState(0);

  const segments = useMemo<Segment[]>(() => {
    const result: Segment[] = [];
    scenes.forEach((scene, index) => {
      result.push({
        id: `scene-${scene.id}`,
        kind: "scene",
        sceneIndex: index,
        poster: scene.poster,
        clip: scene.clip,
        weight: 1.35,
      });
      if (index < scenes.length - 1) {
        result.push({
          id: `transition-${scene.id}-${scenes[index + 1].id}`,
          kind: "transition",
          sceneIndex: index,
          nextSceneIndex: index + 1,
          poster: scene.poster,
          clip: transitionClips[index],
          weight: 0.75,
        });
      }
    });
    return result;
  }, []);

  const totalWeight = useMemo(() => segments.reduce((sum, segment) => sum + segment.weight, 0), [segments]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = segments.map(() => 0);
    const current = segments.map(() => 0);
    let viewportHeight = window.innerHeight;
    let offsets: Array<{ start: number; end: number }> = [];
    let activeSegment = -1;
    let raf = 0;
    let scrollRaf = 0;

    const layout = () => {
      viewportHeight = window.innerHeight;
      let offset = 0;
      offsets = segments.map((segment) => {
        const start = offset * viewportHeight;
        offset += segment.weight;
        return { start, end: offset * viewportHeight };
      });
      read();
    };

    const read = () => {
      scrollRaf = 0;
      const maxTravel = totalWeight * viewportHeight;
      const y = clamp(-root.getBoundingClientRect().top, 0, maxTravel);
      const fade = 0.13 * viewportHeight;
      let currentIndex = segments.length - 1;

      offsets.forEach((offset, index) => {
        if (y >= offset.start && y < offset.end) currentIndex = index;
      });

      segments.forEach((segment, index) => {
        const offset = offsets[index];
        const local = clamp((y - offset.start) / Math.max(1, offset.end - offset.start));
        targets[index] = reduceMotion ? 0 : local;
        let outside = 0;
        if (y < offset.start) outside = offset.start - y;
        if (y > offset.end) outside = y - offset.end;
        const opacity = smooth(1 - outside / fade);
        const layer = layerRefs.current[index];
        if (layer) {
          layer.style.opacity = opacity.toString();
          layer.style.zIndex = index === currentIndex ? "8" : String(4 + Math.round(opacity * 2));
          layer.style.setProperty("--segment-progress", local.toString());
        }
      });

      const currentSegment = segments[currentIndex];
      const currentOffset = offsets[currentIndex];
      const currentProgress = clamp((y - currentOffset.start) / Math.max(1, currentOffset.end - currentOffset.start));
      const nextScene = currentSegment.kind === "scene"
        ? currentSegment.sceneIndex
        : currentProgress < 0.68
          ? currentSegment.sceneIndex
          : currentSegment.nextSceneIndex ?? currentSegment.sceneIndex;

      if (activeSegment !== currentIndex) activeSegment = currentIndex;
      setActiveScene((value) => (value === nextScene ? value : nextScene));
      root.style.setProperty("--world-progress", (y / maxTravel).toString());
      root.style.setProperty("--active-accent", scenes[nextScene].accent);
    };

    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(read);
    };

    const seek = () => {
      videoRefs.current.forEach((video, index) => {
        if (reduceMotion || !video || !Number.isFinite(video.duration) || video.duration <= 0 || video.seeking) return;
        current[index] += (targets[index] - current[index]) * 0.18;
        const time = clamp(current[index], 0, 0.998) * video.duration;
        if (Math.abs(video.currentTime - time) > 0.018) {
          try { video.currentTime = time; } catch { /* decoder is not ready yet */ }
        }
      });
      raf = requestAnimationFrame(seek);
    };

    layout();
    raf = requestAnimationFrame(seek);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
    };
  }, [segments, totalWeight]);

  const jumpTo = (sceneIndex: number) => {
    const root = rootRef.current;
    if (!root) return;
    const segmentIndex = segments.findIndex((segment) => segment.kind === "scene" && segment.sceneIndex === sceneIndex);
    const previousWeight = segments.slice(0, segmentIndex).reduce((sum, segment) => sum + segment.weight, 0);
    const start = root.getBoundingClientRect().top + window.scrollY;
    const destination = start + (previousWeight + segments[segmentIndex].weight * 0.42) * window.innerHeight;
    window.scrollTo({ top: destination, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <section
      className="scroll-world"
      id="top"
      ref={rootRef}
      style={{ "--world-height": totalWeight + 1, "--active-accent": scenes[0].accent } as CSSProperties}
      aria-label="Arcleの5つの支援領域を巡るスクロールストーリー"
    >
      <div className="world-sticky">
        <div className="world-atmosphere" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="world-progress" aria-hidden="true"><i /></div>

        <header className="world-header">
          <a className="world-brand" href="#top"><BrandMark /><strong>Arcle</strong></a>
          <nav aria-label="支援領域ナビゲーション">
            {scenes.map((scene, index) => <button type="button" key={scene.id} className={activeScene === index ? "is-active" : ""} onClick={() => jumpTo(index)}>{scene.label}</button>)}
          </nav>
          <a className="world-cta" href="#contact">無料相談</a>
        </header>

        <div className="segment-stack">
          {segments.map((segment, index) => {
            const scene = scenes[segment.kind === "scene" ? segment.sceneIndex : segment.nextSceneIndex ?? segment.sceneIndex];
            return (
              <div
                className={`world-segment world-segment-${segment.kind}`}
                data-segment={segment.id}
                ref={(node) => { layerRefs.current[index] = node; }}
                style={{ "--scene-accent": scene.accent } as CSSProperties}
                key={segment.id}
              >
                <img src={segment.poster} alt="" aria-hidden="true" />
                <video
                  ref={(node) => { videoRefs.current[index] = node; }}
                  src={segment.clip}
                  poster={segment.poster}
                  preload="auto"
                  muted
                  playsInline
                  disablePictureInPicture
                  aria-hidden="true"
                  onLoadedData={(event) => event.currentTarget.parentElement?.classList.add("has-video")}
                />
                <div className="scene-veil" />
                {segment.kind === "scene" && <MotionOverlay kind={scenes[segment.sceneIndex].motion} />}
              </div>
            );
          })}
        </div>

        <div className="world-copy-stack">
          {scenes.map((scene, index) => (
            <article className={`world-copy ${activeScene === index ? "is-active" : ""}`} aria-hidden={activeScene !== index} style={{ "--scene-accent": scene.accent } as CSSProperties} key={scene.id}>
              <span className="copy-number">{String(index + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}</span>
              <span className="copy-eyebrow">{scene.eyebrow}</span>
              <h1>{scene.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
              <p>{scene.body}</p>
              <ul>{scene.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              {index === scenes.length - 1 && <a className="copy-cta" href="#contact">まずは相談する <b>→</b></a>}
            </article>
          ))}
        </div>

        <div className="world-route" aria-label="現在位置">
          {scenes.map((scene, index) => (
            <button type="button" aria-label={scene.label} className={activeScene === index ? "is-active" : ""} onClick={() => jumpTo(index)} key={scene.id}><span>{scene.label}</span><i /></button>
          ))}
        </div>

        <div className="world-hint" aria-hidden="true"><span>SCROLL TO TRAVEL</span><i /></div>
      </div>
    </section>
  );
}
