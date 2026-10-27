"use client";

/* Three.js render loops intentionally mutate camera and Object3D instances. */
/* eslint-disable react-hooks/immutability */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import {
  CatmullRomCurve3,
  Color,
  Group,
  MathUtils,
  PerspectiveCamera,
  Quaternion,
  Vector3,
} from "three";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";

type JourneyProgress = { current: { target: number; current: number } };

const scenes = [
  {
    id: "unfold",
    short: "入口",
    verb: "UNFOLD",
    title: ["見えない仕組みを、", "動く力へ。"],
    body: "情シス、データ、生成AI、Web。会社の中で平面のまま眠っている仕組みを、使える空間へ組み直します。",
    tags: ["愛知・一宮", "中小企業向け", "相談窓口を一本化"],
    accent: "#373936",
  },
  {
    id: "lock",
    short: "情シス",
    verb: "LOCK",
    title: ["仕事を支える骨格を、", "静かに組む。"],
    body: "PC、アカウント、SaaS、セキュリティ。日常が止まらないように、見えないところで構造を噛み合わせます。",
    tags: ["ヘルプデスク", "SaaS管理", "セキュリティ"],
    accent: "#6f6a61",
  },
  {
    id: "align",
    short: "データ",
    verb: "ALIGN",
    title: ["散らばった数字を、", "ひとつの視点へ。"],
    body: "複数のシステムやExcelに分かれた数字を重ね、経営と現場が同じ全体像を見られる状態に変えます。",
    tags: ["Tableau", "Power BI", "KPI設計"],
    accent: "#aa4b39",
  },
  {
    id: "recompose",
    short: "生成AI",
    verb: "RECOMPOSE",
    title: ["知識は、組み替えるほど", "強くなる。"],
    body: "社内の言葉、ルール、経験を再構成し、検索、問い合わせ対応、業務自動化へつながるAIに変えます。",
    tags: ["導入支援", "社内RAG", "業務自動化"],
    accent: "#244d87",
  },
  {
    id: "open",
    short: "Web",
    verb: "OPEN",
    title: ["整えた価値を、", "外の世界へ。"],
    body: "会社の強みを言葉とデザインへ変換し、まだ出会っていない人へ届くWebサイトとしてひらきます。",
    tags: ["コーポレート", "LP", "SEO・運用"],
    accent: "#c08a31",
  },
];

const sceneStops = [0.01, 0.245, 0.48, 0.715, 0.935];
const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => {
  const v = clamp(value);
  return v * v * (3 - 2 * v);
};

function PaperSurface({ position, args, rotation = [0, 0, 0], color = "#e9e5dc" }: {
  position: [number, number, number];
  args: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}) {
  return (
    <RoundedBox args={args} radius={0.1} smoothness={4} position={position} rotation={rotation} castShadow receiveShadow>
      <meshStandardMaterial color={color} roughness={0.94} />
    </RoundedBox>
  );
}

function CurvedThreshold() {
  const strips = Array.from({ length: 13 }, (_, index) => {
    const t = index / 12;
    const angle = t * Math.PI * 0.5;
    return {
      y: 0.48 + Math.sin(angle) * 3.15,
      z: 0.4 + Math.cos(angle) * 3.15,
      angle,
    };
  });
  return (
    <group position={[-5.4, 0, 1]}>
      {strips.map((strip, index) => (
        <RoundedBox
          key={index}
          args={[9.4, 0.62, 0.16]}
          radius={0.09}
          smoothness={3}
          position={[0, strip.y, strip.z]}
          rotation={[strip.angle, 0, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color={index % 3 === 0 ? "#eeeae1" : "#e7e3da"} roughness={0.96} />
        </RoundedBox>
      ))}
      <PaperSurface position={[0, 7.4, 0.7]} args={[9.4, 7.3, 0.2]} />
    </group>
  );
}

function FoldingEntrance({ progress }: { progress: JourneyProgress }) {
  const left = useRef<Group>(null);
  const right = useRef<Group>(null);
  const slit = useRef<Group>(null);
  useFrame(() => {
    const local = ease(progress.current.current / 0.16);
    if (left.current) left.current.rotation.x = MathUtils.lerp(-0.74, 0, local);
    if (right.current) right.current.rotation.x = MathUtils.lerp(-1.02, 0, local);
    if (slit.current) slit.current.position.x = MathUtils.lerp(0.35, 1.25, local);
  });
  return (
    <group position={[0, 0, -1]}>
      <PaperSurface position={[0, -0.18, 5]} args={[31, 0.26, 25]} color="#dedbd2" />
      <CurvedThreshold />
      <group ref={left}>
        <PaperSurface position={[-4.7, 4.65, -1.7]} args={[7.8, 9.3, 0.28]} color="#ebe7de" />
      </group>
      <group ref={right}>
        <PaperSurface position={[5.1, 4.2, -2.3]} args={[5.2, 8.4, 0.3]} color="#d8d4cb" />
      </group>
      <group ref={slit} position={[1.25, 0, 0]}>
        <PaperSurface position={[1.6, 5.2, -3.2]} args={[0.28, 10.4, 1.1]} color="#2f302e" />
        <PaperSurface position={[-0.15, 6.7, -3.2]} args={[3.6, 0.22, 1.1]} color="#cbc6bb" />
      </group>
      <PaperSurface position={[5.5, 2.4, -5.6]} args={[2.4, 4.8, 0.18]} color="#a64b3b" />
      <PaperSurface position={[3.8, 1.1, -6.2]} args={[1.45, 2.2, 0.15]} color="#d3a14d" />
    </group>
  );
}

function MetalFrame({ width, height, depth, tone = "#8d8980" }: {
  width: number;
  height: number;
  depth: number;
  tone?: string;
}) {
  const thickness = 0.22;
  return (
    <group>
      <RoundedBox args={[width, thickness, thickness]} radius={0.06} position={[0, height / 2, 0]} castShadow>
        <meshStandardMaterial color={tone} metalness={0.78} roughness={0.22} />
      </RoundedBox>
      <RoundedBox args={[width, thickness, thickness]} radius={0.06} position={[0, -height / 2, 0]} castShadow>
        <meshStandardMaterial color={tone} metalness={0.78} roughness={0.22} />
      </RoundedBox>
      <RoundedBox args={[thickness, height, thickness]} radius={0.06} position={[-width / 2, 0, 0]} castShadow>
        <meshStandardMaterial color={tone} metalness={0.78} roughness={0.22} />
      </RoundedBox>
      <RoundedBox args={[thickness, height, thickness]} radius={0.06} position={[width / 2, 0, 0]} castShadow>
        <meshStandardMaterial color={tone} metalness={0.78} roughness={0.22} />
      </RoundedBox>
      <mesh position={[0, 0, depth]} visible={false}><boxGeometry args={[0.01, 0.01, 0.01]} /></mesh>
    </group>
  );
}

function FrameCorridor({ progress }: { progress: JourneyProgress }) {
  const frames = useRef<Group>(null);
  useFrame(() => {
    if (!frames.current) return;
    const local = ease((progress.current.current - 0.13) / 0.2);
    frames.current.children.forEach((child, index) => {
      const direction = index % 2 ? 1 : -1;
      child.position.x = direction * (1 - local) * (3.8 + index * 0.22);
      child.position.y = (1 - local) * Math.sin(index * 1.7) * 2.1;
      child.rotation.z = direction * (1 - local) * 0.16;
    });
  });
  return (
    <group position={[2.8, 3.25, -22]}>
      <group ref={frames}>
        {Array.from({ length: 9 }, (_, index) => (
          <group key={index} position={[0, 0, -index * 2.05]}>
            <MetalFrame width={7.4 - index * 0.12} height={6.4 - index * 0.08} depth={0} tone={index % 3 === 0 ? "#746f66" : "#a29e95"} />
          </group>
        ))}
      </group>
      <PaperSurface position={[-5.2, 0.5, -6.5]} args={[2.5, 7.3, 7]} color="#d5d0c6" />
      <PaperSurface position={[5.5, -0.3, -7.6]} args={[2.3, 5.9, 5]} color="#e4dfd6" />
      <PaperSurface position={[4.3, 0.9, -1.8]} args={[1.1, 4.6, 0.22]} color="#244d87" />
    </group>
  );
}

function GlassLayer({ position, rotation, tone, size }: {
  position: [number, number, number];
  rotation: [number, number, number];
  tone: string;
  size: [number, number];
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={[size[0], size[1], 0.09]} />
      <meshPhysicalMaterial color={tone} roughness={0.18} metalness={0.03} transparent opacity={0.27} transmission={0.12} clearcoat={0.35} depthWrite={false} />
    </mesh>
  );
}

function DataLayers({ progress }: { progress: JourneyProgress }) {
  const marks = useRef<Group>(null);
  const layers = [
    [-5.8, 3.2, 2.4, -0.08, "#cad1cf", 3.8, 5.8],
    [5.7, 3.3, 0.5, 0.11, "#d6c9bd", 4.2, 6.2],
    [-4.2, 2.7, -3, 0.09, "#b9c6cb", 3.1, 5],
    [4.6, 3.2, -5.8, -0.12, "#ae4f3e", 3.4, 5.8],
    [-5.3, 3.6, -8.7, 0.07, "#c8b78f", 4, 6.7],
    [4.1, 3.1, -11.4, -0.09, "#315786", 2.8, 5.4],
  ] as const;
  useFrame(() => {
    if (!marks.current) return;
    const local = ease((progress.current.current - 0.37) / 0.23);
    marks.current.children.forEach((child, index) => {
      const column = (index % 6) - 2.5;
      const row = Math.floor(index / 6) - 1;
      const scatteredX = Math.sin(index * 7.3) * 4.8;
      const scatteredY = 1.5 + ((index * 1.37) % 4.5);
      child.position.x = MathUtils.lerp(scatteredX, column * 0.68, local);
      child.position.y = MathUtils.lerp(scatteredY, 2.9 + row * 0.72, local);
      child.position.z = MathUtils.lerp(Math.cos(index * 2.3) * 3, row * -0.4, local);
    });
  });
  return (
    <group position={[-2.6, 0, -43]}>
      {layers.map(([x, y, z, ry, tone, width, height], index) => (
        <GlassLayer key={index} position={[x, y, z]} rotation={[0, ry, 0]} tone={tone} size={[width, height]} />
      ))}
      <group ref={marks}>
        {Array.from({ length: 18 }, (_, index) => (
          <mesh key={index} position={[0, 0, 0]} castShadow>
            <sphereGeometry args={[index % 5 === 0 ? 0.18 : 0.1, 14, 14]} />
            <meshStandardMaterial color={index % 5 === 0 ? "#b44e3a" : index % 3 === 0 ? "#2d5688" : "#c6a35d"} roughness={0.58} />
          </mesh>
        ))}
      </group>
      <PaperSurface position={[0, -0.2, -4]} args={[17, 0.2, 22]} color="#d8d4cb" />
    </group>
  );
}

function RecomposeRoom({ progress }: { progress: JourneyProgress }) {
  const blocks = useRef<Group>(null);
  const source = useMemo(() => Array.from({ length: 18 }, (_, index) => ({
    x: Math.sin(index * 5.9) * 6.1,
    y: 1 + ((index * 1.63) % 6),
    z: Math.cos(index * 3.4) * 5.4,
    rx: (index % 3 - 1) * 0.32,
    ry: (index % 4 - 1.5) * 0.26,
  })), []);
  useFrame(({ clock }) => {
    if (!blocks.current) return;
    const local = ease((progress.current.current - 0.58) / 0.25);
    blocks.current.children.forEach((child, index) => {
      const ring = index % 9;
      const targetAngle = (ring / 9) * Math.PI * 2 + local * 0.45;
      const targetRadius = index < 9 ? 3.2 : 5.15;
      const targetX = Math.cos(targetAngle) * targetRadius;
      const targetY = 3.4 + Math.sin(targetAngle * 2) * 1.25;
      const targetZ = Math.sin(targetAngle) * targetRadius * 0.55;
      child.position.x = MathUtils.lerp(source[index].x, targetX, local);
      child.position.y = MathUtils.lerp(source[index].y, targetY, local) + Math.sin(clock.elapsedTime * 0.32 + index) * 0.06;
      child.position.z = MathUtils.lerp(source[index].z, targetZ, local);
      child.rotation.x = MathUtils.lerp(source[index].rx, 0, local);
      child.rotation.y = MathUtils.lerp(source[index].ry, targetAngle * 0.12, local);
    });
  });
  return (
    <group position={[3, 0, -64]}>
      <group ref={blocks}>
        {source.map((_, index) => (
          <RoundedBox key={index} args={[1.45 + (index % 3) * 0.28, 0.88 + (index % 2) * 0.24, 0.25]} radius={0.1} castShadow>
            <meshStandardMaterial
              color={index % 7 === 0 ? "#a84b3a" : index % 5 === 0 ? "#285080" : index % 4 === 0 ? "#c6943d" : "#e1ddd4"}
              roughness={index % 5 === 0 ? 0.32 : 0.86}
              metalness={index % 5 === 0 ? 0.12 : 0}
            />
          </RoundedBox>
        ))}
      </group>
      <group position={[0, 3.4, -0.6]} scale={0.78}>
        <MetalFrame width={5.4} height={5.4} depth={0} tone="#88837a" />
      </group>
      <PaperSurface position={[0, -0.25, 0]} args={[19, 0.2, 18]} color="#d9d5cc" />
      <PaperSurface position={[-7.4, 3.6, -3.5]} args={[2.1, 7.2, 5.8]} color="#d0cbc1" />
      <PaperSurface position={[7.2, 4.5, -4.8]} args={[2.6, 9, 4.2]} color="#e4e0d7" />
    </group>
  );
}

function OpeningStage({ progress }: { progress: JourneyProgress }) {
  const left = useRef<Group>(null);
  const right = useRef<Group>(null);
  const portal = useRef<Group>(null);
  useFrame(() => {
    const local = ease((progress.current.current - 0.79) / 0.2);
    if (left.current) left.current.position.x = MathUtils.lerp(-2.8, -8.7, local);
    if (right.current) right.current.position.x = MathUtils.lerp(2.8, 8.7, local);
    if (portal.current) portal.current.scale.setScalar(MathUtils.lerp(0.68, 1.18, local));
  });
  return (
    <group position={[0, 0, -87]}>
      <group ref={portal} position={[0, 4.1, -7]}>
        <mesh>
          <circleGeometry args={[6.5, 64]} />
          <meshBasicMaterial color="#fff8e8" />
        </mesh>
        <mesh position={[0, 0, -0.15]} scale={1.15}>
          <circleGeometry args={[6.5, 64]} />
          <meshBasicMaterial color="#d7a248" transparent opacity={0.2} />
        </mesh>
      </group>
      <group ref={left} position={[-2.8, 0, 0]}>
        <PaperSurface position={[0, 4.2, 0]} args={[7, 8.4, 0.5]} color="#a94a37" />
        <PaperSurface position={[-0.7, 1.5, 1.2]} args={[2.2, 3, 0.38]} color="#d0a146" />
      </group>
      <group ref={right} position={[2.8, 0, 0]}>
        <PaperSurface position={[0, 4.2, 0]} args={[7, 8.4, 0.5]} color="#244d87" />
        <PaperSurface position={[0.8, 5.7, 1.1]} args={[2.4, 2.1, 0.35]} color="#d8d3ca" />
      </group>
      <PaperSurface position={[0, -0.2, 2]} args={[28, 0.2, 23]} color="#d8d4ca" />
    </group>
  );
}

function Dust() {
  const motes = useMemo(() => Array.from({ length: 36 }, (_, index) => ({
    x: Math.sin(index * 8.4) * 12,
    y: 1.2 + ((index * 1.41) % 7),
    z: 11 - ((index * 8.3) % 112),
    scale: 0.018 + (index % 4) * 0.009,
  })), []);
  const group = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.position.y = Math.sin(clock.elapsedTime * 0.18) * 0.13;
  });
  return (
    <group ref={group}>
      {motes.map((mote, index) => (
        <mesh key={index} position={[mote.x, mote.y, mote.z]} scale={mote.scale}>
          <sphereGeometry args={[1, 7, 7]} />
          <meshBasicMaterial color={index % 6 === 0 ? "#bd863a" : "#fffaf0"} transparent opacity={0.52} />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig({ progress }: { progress: JourneyProgress }) {
  const { camera, size } = useThree();
  const path = useMemo(() => new CatmullRomCurve3([
    new Vector3(0, 2.55, 15),
    new Vector3(0, 2.35, 7),
    new Vector3(0.4, 2.4, -1.5),
    new Vector3(2.2, 2.55, -10),
    new Vector3(2.8, 2.55, -19),
    new Vector3(2.5, 2.52, -27),
    new Vector3(0.6, 2.75, -34),
    new Vector3(-2.6, 2.7, -41),
    new Vector3(-2.5, 2.62, -50),
    new Vector3(0.6, 2.8, -56),
    new Vector3(3, 2.65, -63),
    new Vector3(2.7, 2.6, -72),
    new Vector3(0.6, 2.9, -79),
    new Vector3(0, 2.9, -92),
  ], false, "catmullrom", 0.45), []);
  const position = useMemo(() => new Vector3(), []);
  const lookPoint = useMemo(() => new Vector3(), []);
  const targetQuaternion = useMemo(() => new Quaternion(), []);
  const guide = useMemo(() => new PerspectiveCamera(), []);

  useFrame((_, delta) => {
    const damping = 1 - Math.exp(-delta * 3.5);
    progress.current.current = MathUtils.lerp(progress.current.current, progress.current.target, damping);
    const p = clamp(progress.current.current);
    path.getPointAt(p, position);
    camera.position.lerp(position, 1 - Math.exp(-delta * 4.45));
    path.getPointAt(Math.min(1, p + (size.width < 700 ? 0.024 : 0.039)), lookPoint);
    lookPoint.y -= size.width < 700 ? 0.02 : 0.16;
    guide.position.copy(camera.position);
    guide.lookAt(lookPoint);
    targetQuaternion.copy(guide.quaternion);
    camera.quaternion.slerp(targetQuaternion, 1 - Math.exp(-delta * 3.7));
    camera.fov = MathUtils.lerp(camera.fov, size.width < 700 ? 63 : 48, 0.08);
    camera.updateProjectionMatrix();
  });
  return null;
}

function ConstructedWorld({ progress }: { progress: JourneyProgress }) {
  return (
    <>
      <color attach="background" args={["#ddd9d0"]} />
      <fog attach="fog" args={["#ddd9d0", 17, 50]} />
      <ambientLight intensity={1.3} color="#fffaf0" />
      <hemisphereLight args={["#fff8ea", "#77736b", 1.4]} />
      <directionalLight position={[-7, 14, 7]} intensity={2.4} color="#fff7e9" castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.00016} />
      <directionalLight position={[8, 8, -25]} intensity={0.8} color="#d9e4f1" />
      <mesh position={[0, -0.62, -43]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[72, 132]} />
        <meshStandardMaterial color="#d7d3ca" roughness={1} />
      </mesh>
      <FoldingEntrance progress={progress} />
      <FrameCorridor progress={progress} />
      <DataLayers progress={progress} />
      <RecomposeRoom progress={progress} />
      <OpeningStage progress={progress} />
      <Dust />
      <CameraRig progress={progress} />
    </>
  );
}

function Mark() {
  return <span className="construct-mark" aria-hidden="true"><i /><i /><b /></span>;
}

export default function UnfoldingJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const progress = useRef({ target: 0, current: 0 });
  const [activeScene, setActiveScene] = useState(0);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const travel = Math.max(1, root.offsetHeight - window.innerHeight);
      const value = clamp(-rect.top / travel);
      progress.current.target = value;
      if (reducedMotion) progress.current.current = value;
      root.style.setProperty("--construct-progress", value.toString());
      let nextScene = 0;
      sceneStops.forEach((stop, index) => {
        if (value >= stop - 0.075) nextScene = index;
      });
      setActiveScene((current) => current === nextScene ? current : nextScene);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  const jumpTo = (index: number) => {
    const root = rootRef.current;
    if (!root) return;
    const top = window.scrollY + root.getBoundingClientRect().top;
    const travel = root.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * sceneStops[index], behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <section ref={rootRef} className="construct-journey" id="top" aria-label="組み上がる空間を通ってArcleの支援領域を巡る3Dストーリー">
      <div className="construct-sticky">
        <div className={`construct-canvas ${ready ? "is-ready" : ""}`} aria-hidden="true">
          <Canvas
            shadows
            dpr={[1, 1.5]}
            frameloop={reducedMotion ? "demand" : "always"}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            camera={{ position: [0, 2.55, 15], fov: 48, near: 0.1, far: 110 }}
            onCreated={({ gl }) => {
              gl.setClearColor(new Color("#ddd9d0"));
              gl.domElement.addEventListener("webglcontextlost", (event) => event.preventDefault(), false);
              setReady(true);
            }}
          >
            <Suspense fallback={null}><ConstructedWorld progress={progress} /></Suspense>
          </Canvas>
        </div>
        <div className="construct-veil" aria-hidden="true" />
        <div className="construct-grain" aria-hidden="true" />
        <div className="construct-progress" aria-hidden="true"><i /></div>

        <header className="construct-header">
          <a className="construct-brand" href="#top"><Mark /><strong>Arcle</strong></a>
          <nav aria-label="空間のナビゲーション">
            {scenes.map((scene, index) => (
              <button key={scene.id} type="button" onClick={() => jumpTo(index)} className={activeScene === index ? "is-active" : ""}>{scene.short}</button>
            ))}
          </nav>
          <a className="construct-cta" href="#contact">相談する <span>↗</span></a>
        </header>

        <div className="construct-copy-stack">
          {scenes.map((scene, index) => (
            <article key={scene.id} className={`construct-copy ${activeScene === index ? "is-active" : ""}`} style={{ "--construct-accent": scene.accent } as React.CSSProperties}>
              <div className="construct-label"><span>{String(index + 1).padStart(2, "0")}</span><i /> <b>{scene.verb}</b></div>
              <h1>{scene.title.map((line) => <span key={line}>{line}</span>)}</h1>
              <p>{scene.body}</p>
              <ul>{scene.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              {index === 0 && <a href="#services">構造を見る <b>↓</b></a>}
            </article>
          ))}
        </div>

        <div className="construct-route" aria-label="現在の工程">
          {scenes.map((scene, index) => (
            <button type="button" key={scene.id} onClick={() => jumpTo(index)} className={activeScene === index ? "is-active" : ""} aria-label={`${scene.short}へ移動`}>
              <i /><span>{scene.verb}</span>
            </button>
          ))}
        </div>
        <div className="construct-hint" aria-hidden="true"><span>SCROLL TO ENTER</span><i /></div>
        <p className="construct-side-note" aria-hidden="true">STRUCTURE / KNOWLEDGE / VALUE</p>
      </div>
    </section>
  );
}
