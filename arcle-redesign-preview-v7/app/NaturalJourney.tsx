"use client";

/* Legacy Three.js render loop intentionally mutates camera and Object3D instances. */
/* eslint-disable react-hooks/immutability */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Float, RoundedBox } from "@react-three/drei";
import {
  CatmullRomCurve3,
  Color,
  Group,
  MathUtils,
  PerspectiveCamera,
  Quaternion,
  Vector3,
} from "three";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";

type JourneyProgress = MutableRefObject<{ target: number; current: number }>;

const scenes = [
  {
    id: "connect",
    short: "はじまり",
    eyebrow: "A GENTLE CONNECTION",
    title: ["会社のITが、", "ひとつにつながる。"],
    body: "情シス、データ、生成AI、Web。会社の中に散らばる課題を、ひとつの窓口でつないで整えます。",
    tags: ["愛知・一宮", "中小企業向け", "相談窓口を一本化"],
    accent: "#526aa1",
  },
  {
    id: "it",
    short: "情シス",
    eyebrow: "IT MANAGEMENT",
    title: ["困った時、", "すぐそばに。"],
    body: "PC、アカウント、セキュリティ。小さな問い合わせから運用の土台づくりまで、社内IT担当として伴走します。",
    tags: ["ヘルプデスク", "SaaS管理", "セキュリティ"],
    accent: "#627a6a",
  },
  {
    id: "data",
    short: "データ",
    eyebrow: "DATA & INSIGHT",
    title: ["数字が、", "次の一手を教える。"],
    body: "Excelや複数システムに分かれた数字をひとつに。経営と現場が、同じ景色を見られる状態をつくります。",
    tags: ["Tableau", "Power BI", "KPI設計"],
    accent: "#b1704e",
  },
  {
    id: "ai",
    short: "生成AI",
    eyebrow: "GENERATIVE AI",
    title: ["AIを、現場で", "働く力に。"],
    body: "ルールづくり、社内検索、問い合わせ対応、業務自動化。安全で、毎日の仕事に使えるAIを一緒につくります。",
    tags: ["導入支援", "社内RAG", "業務自動化"],
    accent: "#79668e",
  },
  {
    id: "web",
    short: "Web",
    eyebrow: "WEB & GROWTH",
    title: ["伝わるWebで、", "次の縁へ。"],
    body: "会社の強みを言葉とデザインで整理し、見つけてもらい、相談につながるWebサイトへ育てます。",
    tags: ["コーポレート", "LP", "SEO・運用"],
    accent: "#b88745",
  },
];

const sceneStops = [0.02, 0.255, 0.49, 0.72, 0.94];
const clamp = (value: number) => Math.min(1, Math.max(0, value));

function LeafCluster({
  position,
  scale = 1,
  tone = "#7f9271",
}: {
  position: [number, number, number];
  scale?: number;
  tone?: string;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.16, 1.4, 8]} />
        <meshStandardMaterial color="#826b4f" roughness={0.92} />
      </mesh>
      {[
        [-0.38, 1.5, 0.05, 0.52],
        [0.28, 1.72, 0.08, 0.64],
        [0.02, 2.05, -0.08, 0.58],
        [0.46, 1.32, -0.02, 0.44],
      ].map(([x, y, z, s], index) => (
        <mesh key={index} position={[x, y, z]} scale={s} castShadow>
          <dodecahedronGeometry args={[0.78, 1]} />
          <meshStandardMaterial color={index % 2 ? tone : "#94a283"} roughness={0.98} />
        </mesh>
      ))}
    </group>
  );
}

function Stone({ position, scale = 1, color = "#d8cec0" }: { position: [number, number, number]; scale?: number; color?: string }) {
  return (
    <mesh position={position} scale={[1.35 * scale, 0.48 * scale, scale]} castShadow receiveShadow>
      <dodecahedronGeometry args={[1, 2]} />
      <meshStandardMaterial color={color} roughness={1} />
    </mesh>
  );
}

function Passage({ position, color = "#d6c6ad", rotation = 0 }: { position: [number, number, number]; color?: string; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh castShadow>
        <torusGeometry args={[3.3, 0.32, 14, 72]} />
        <meshStandardMaterial color={color} roughness={0.88} />
      </mesh>
      <mesh position={[0, -3.3, 0]} receiveShadow>
        <boxGeometry args={[7.3, 0.32, 1.2]} />
        <meshStandardMaterial color="#cbb99f" roughness={0.96} />
      </mesh>
    </group>
  );
}

function ConnectionGarden() {
  return (
    <group position={[0, 0, 1]}>
      <Passage position={[0, 3.3, 0]} color="#d8c7ac" />
      <Float speed={0.75} rotationIntensity={0.1} floatIntensity={0.22}>
        <group position={[2.6, 2.2, -0.6]}>
          {[0, 1, 2].map((index) => (
            <mesh key={index} rotation={[Math.PI / 2, index * 0.48, 0]} scale={1 - index * 0.18} castShadow>
              <torusGeometry args={[1.25, 0.095, 12, 48]} />
              <meshStandardMaterial color={index === 1 ? "#526aa1" : "#efe7da"} roughness={0.76} />
            </mesh>
          ))}
          <mesh>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial color="#c89152" roughness={0.62} />
          </mesh>
        </group>
      </Float>
      <RoundedBox args={[4.2, 0.36, 2.2]} radius={0.18} position={[2.6, 0.2, -0.6]} receiveShadow castShadow>
        <meshStandardMaterial color="#e4d7c4" roughness={0.96} />
      </RoundedBox>
      <LeafCluster position={[-4.8, -0.2, 1.2]} scale={1.2} />
      <LeafCluster position={[5.1, -0.2, -2.2]} scale={0.85} tone="#6f866b" />
      <Stone position={[-2.8, 0.1, -1.2]} scale={0.85} />
      <Stone position={[4.5, 0.05, 1.7]} scale={0.55} color="#c9b99f" />
    </group>
  );
}

function ItStudio() {
  return (
    <group position={[7, 0, -19]} rotation={[0, -0.12, 0]}>
      <Passage position={[0, 3.3, 3.9]} color="#c8b99f" rotation={0.1} />
      <RoundedBox args={[8.5, 0.42, 7.2]} radius={0.28} position={[0, -0.16, 0]} receiveShadow>
        <meshStandardMaterial color="#d7cbb8" roughness={1} />
      </RoundedBox>
      {[-3.3, 3.3].map((x) => (
        <mesh key={x} position={[x, 2.2, -1.3]} castShadow>
          <cylinderGeometry args={[0.22, 0.28, 4.8, 14]} />
          <meshStandardMaterial color="#a9825d" roughness={0.9} />
        </mesh>
      ))}
      <RoundedBox args={[5.8, 0.36, 1.55]} radius={0.16} position={[0, 1.05, -1.45]} castShadow>
        <meshStandardMaterial color="#a9825d" roughness={0.86} />
      </RoundedBox>
      {[-1.7, 0, 1.7].map((x, index) => (
        <Float key={x} speed={0.65 + index * 0.12} floatIntensity={0.12} rotationIntensity={0.04}>
          <RoundedBox args={[1.35, 1.65, 0.14]} radius={0.16} position={[x, 2.35, -1.28]} castShadow>
            <meshStandardMaterial color={index === 1 ? "#6f846f" : "#f1eadf"} roughness={0.82} />
          </RoundedBox>
          <mesh position={[x, 2.55, -1.17]}>
            <circleGeometry args={[0.18, 24]} />
            <meshStandardMaterial color={index === 1 ? "#f4eee5" : "#758a78"} />
          </mesh>
        </Float>
      ))}
      <LeafCluster position={[-3.7, 0, 0.7]} scale={0.78} />
      <LeafCluster position={[3.7, 0, 0.5]} scale={0.62} tone="#849779" />
      <Stone position={[2.4, 0.3, 2.6]} scale={0.48} />
    </group>
  );
}

function DataTerrace() {
  const heights = [1.2, 2.05, 2.8, 3.65, 4.5, 3.45, 2.55];
  return (
    <group position={[-5, 0, -40]} rotation={[0, 0.08, 0]}>
      <Passage position={[2.1, 3.3, 4.6]} color="#dbc8af" rotation={-0.08} />
      <RoundedBox args={[9.4, 0.38, 7.4]} radius={0.3} position={[0, -0.18, 0]} receiveShadow>
        <meshStandardMaterial color="#e0d6c7" roughness={1} />
      </RoundedBox>
      <group position={[1.2, 0, -0.8]}>
        {heights.map((height, index) => (
          <mesh key={height + index} position={[(index - 3) * 0.72, height / 2, Math.sin(index) * 0.28]} castShadow>
            <cylinderGeometry args={[0.26, 0.34, height, 18]} />
            <meshStandardMaterial color={index === 4 ? "#b1704e" : index % 2 ? "#b9a78d" : "#7d927d"} roughness={0.88} />
          </mesh>
        ))}
      </group>
      {[0, 1, 2].map((index) => (
        <Float key={index} speed={0.55 + index * 0.15} floatIntensity={0.16} rotationIntensity={0.04}>
          <mesh position={[-2.7 + index * 1.1, 2.4 + index * 0.52, 1.5 - index * 0.4]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.55 + index * 0.15, 0.08, 10, 36]} />
            <meshStandardMaterial color={index === 1 ? "#b1704e" : "#e9dfd1"} roughness={0.76} />
          </mesh>
        </Float>
      ))}
      <LeafCluster position={[-4.3, 0, -1.4]} scale={0.72} tone="#708570" />
      <Stone position={[4, 0.1, 1.7]} scale={0.72} color="#cebda7" />
    </group>
  );
}

function AiLibrary() {
  const cards = [
    [-2.4, 2.8, 0.6, -0.22],
    [-1.35, 3.65, -0.35, 0.16],
    [1.5, 3.5, 0.15, -0.12],
    [2.55, 2.55, -0.55, 0.21],
  ];
  return (
    <group position={[5, 0, -61]} rotation={[0, -0.06, 0]}>
      <Passage position={[-1.2, 3.3, 4.5]} color="#d5c2a9" rotation={0.07} />
      <RoundedBox args={[9, 0.4, 7]} radius={0.3} position={[0, -0.18, 0]} receiveShadow>
        <meshStandardMaterial color="#d8cfc4" roughness={1} />
      </RoundedBox>
      <Float speed={0.58} floatIntensity={0.2} rotationIntensity={0.08}>
        <mesh position={[0.2, 2.65, -0.2]} castShadow>
          <icosahedronGeometry args={[1.15, 2]} />
          <meshStandardMaterial color="#88769b" roughness={0.7} />
        </mesh>
        <mesh position={[0.2, 2.65, -0.2]} scale={1.35}>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshStandardMaterial color="#eee6db" wireframe transparent opacity={0.38} />
        </mesh>
      </Float>
      {cards.map(([x, y, z, rotation], index) => (
        <Float key={index} speed={0.65 + index * 0.08} floatIntensity={0.18} rotationIntensity={0.06}>
          <RoundedBox args={[1.45, 1.05, 0.14]} radius={0.12} position={[x, y, z]} rotation={[0, rotation, rotation * 0.4]} castShadow>
            <meshStandardMaterial color={index === 2 ? "#c9b89e" : "#f0e9df"} roughness={0.88} />
          </RoundedBox>
        </Float>
      ))}
      {[-3.5, 3.5].map((x) => (
        <RoundedBox key={x} args={[1.2, 4.8, 1.45]} radius={0.18} position={[x, 2.25, -1.9]} castShadow>
          <meshStandardMaterial color="#a88663" roughness={0.94} />
        </RoundedBox>
      ))}
      <LeafCluster position={[-3.7, 0, 1.5]} scale={0.64} tone="#788b74" />
      <LeafCluster position={[3.7, 0, 1.3]} scale={0.55} />
    </group>
  );
}

function WebAtelier() {
  return (
    <group position={[0, 0, -83]}>
      <Passage position={[0, 3.3, 4]} color="#cfb58f" />
      <RoundedBox args={[10, 0.4, 8]} radius={0.32} position={[0, -0.18, 0]} receiveShadow>
        <meshStandardMaterial color="#e4d9c8" roughness={1} />
      </RoundedBox>
      <Float speed={0.46} floatIntensity={0.13} rotationIntensity={0.025}>
        <RoundedBox args={[5.9, 4.25, 0.24]} radius={0.28} position={[0.5, 3, -1.5]} rotation={[0, -0.12, 0]} castShadow>
          <meshStandardMaterial color="#f5efe5" roughness={0.84} />
        </RoundedBox>
        <RoundedBox args={[2.05, 2.5, 0.16]} radius={0.18} position={[1.65, 2.8, -1.32]} rotation={[0, -0.12, 0]}>
          <meshStandardMaterial color="#c9a56d" roughness={0.82} />
        </RoundedBox>
        {[0, 1, 2].map((index) => (
          <RoundedBox key={index} args={[2.25 - index * 0.2, 0.14, 0.08]} radius={0.05} position={[-1.05, 3.6 - index * 0.54, -1.3]} rotation={[0, -0.12, 0]}>
            <meshStandardMaterial color={index === 0 ? "#526aa1" : "#c8bba8"} roughness={0.75} />
          </RoundedBox>
        ))}
      </Float>
      <mesh position={[-3.2, 3.2, -2]}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshStandardMaterial color="#e8b86e" roughness={0.9} />
      </mesh>
      <LeafCluster position={[-4.2, 0, 1.2]} scale={0.92} tone="#70866c" />
      <LeafCluster position={[4.4, 0, 0.7]} scale={0.82} tone="#839576" />
      <Stone position={[3.3, 0.2, 2.4]} scale={0.74} color="#cbb89d" />
    </group>
  );
}

function Pollen() {
  const particles = useMemo(
    () => Array.from({ length: 42 }, (_, index) => ({
      position: [
        Math.sin(index * 12.7) * 12,
        1.2 + ((index * 1.37) % 7),
        8 - ((index * 7.31) % 98),
      ] as [number, number, number],
      scale: 0.025 + (index % 5) * 0.012,
    })),
    [],
  );
  const group = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.position.y = Math.sin(clock.elapsedTime * 0.22) * 0.18;
  });
  return (
    <group ref={group}>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={index % 4 === 0 ? "#c99a58" : "#fff7e8"} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig({ progress }: { progress: JourneyProgress }) {
  const { camera, size } = useThree();
  const path = useMemo(
    () => new CatmullRomCurve3([
      new Vector3(0, 3.15, 14),
      new Vector3(0, 2.85, 7.5),
      new Vector3(0.4, 2.7, -1),
      new Vector3(3.7, 2.55, -9),
      new Vector3(7, 2.5, -16),
      new Vector3(6.2, 2.65, -24),
      new Vector3(0.5, 2.9, -31),
      new Vector3(-5, 2.55, -38),
      new Vector3(-4.8, 2.5, -47),
      new Vector3(0, 2.75, -53),
      new Vector3(5, 2.55, -59),
      new Vector3(4.5, 2.5, -68),
      new Vector3(1.2, 2.85, -75),
      new Vector3(0, 2.65, -85),
    ], false, "catmullrom", 0.42),
    [],
  );
  const desiredPosition = useMemo(() => new Vector3(), []);
  const lookPoint = useMemo(() => new Vector3(), []);
  const lookMatrixTarget = useMemo(() => new Quaternion(), []);
  const cameraGuide = useMemo(() => new PerspectiveCamera(), []);

  useFrame((_, delta) => {
    const damping = 1 - Math.exp(-delta * 3.4);
    progress.current.current = MathUtils.lerp(progress.current.current, progress.current.target, damping);
    const p = clamp(progress.current.current);
    path.getPointAt(p, desiredPosition);
    camera.position.lerp(desiredPosition, 1 - Math.exp(-delta * 4.6));
    path.getPointAt(Math.min(1, p + (size.width < 700 ? 0.024 : 0.038)), lookPoint);
    lookPoint.y -= size.width < 700 ? 0.1 : 0.25;
    cameraGuide.position.copy(camera.position);
    cameraGuide.lookAt(lookPoint);
    lookMatrixTarget.copy(cameraGuide.quaternion);
    camera.quaternion.slerp(lookMatrixTarget, 1 - Math.exp(-delta * 3.8));
    camera.fov = MathUtils.lerp(camera.fov, size.width < 700 ? 62 : 48, 0.08);
    camera.updateProjectionMatrix();
  });
  return null;
}

function NaturalWorld({ progress }: { progress: JourneyProgress }) {
  const floorPath = useMemo(() => new CatmullRomCurve3([
    new Vector3(0, 0.03, 12),
    new Vector3(0, 0.03, 0),
    new Vector3(7, 0.03, -18),
    new Vector3(-5, 0.03, -40),
    new Vector3(5, 0.03, -61),
    new Vector3(0, 0.03, -85),
  ], false, "catmullrom", 0.4), []);

  return (
    <>
      <color attach="background" args={["#eee7da"]} />
      <fog attach="fog" args={["#eee7da", 15, 46]} />
      <ambientLight intensity={1.35} color="#fff7ea" />
      <hemisphereLight args={["#fff8e8", "#9f927e", 1.55]} />
      <directionalLight position={[-10, 15, 9]} intensity={2.4} color="#fff1d4" castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.00015} />
      <mesh position={[0, -0.65, -40]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[90, 135]} />
        <meshStandardMaterial color="#e7dece" roughness={1} />
      </mesh>
      <mesh>
        <tubeGeometry args={[floorPath, 240, 0.085, 10, false]} />
        <meshStandardMaterial color="#61779e" roughness={0.72} />
      </mesh>
      <ConnectionGarden />
      <ItStudio />
      <DataTerrace />
      <AiLibrary />
      <WebAtelier />
      <Pollen />
      <ContactShadows position={[0, -0.42, -38]} opacity={0.38} scale={115} blur={2.7} far={18} color="#736857" />
      <CameraRig progress={progress} />
    </>
  );
}

function Wordmark() {
  return <span className="natural-mark" aria-hidden="true"><i /><i /><b /></span>;
}

export default function NaturalJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const progress = useRef({ target: 0, current: 0 });
  const [activeScene, setActiveScene] = useState(0);
  const [ready, setReady] = useState(false);

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
      root.style.setProperty("--journey-progress", value.toString());
      let nextScene = 0;
      sceneStops.forEach((stop, index) => {
        if (value >= stop - 0.08) nextScene = index;
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
  }, []);

  const jumpTo = (index: number) => {
    const root = rootRef.current;
    if (!root) return;
    const top = window.scrollY + root.getBoundingClientRect().top;
    const travel = root.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * sceneStops[index], behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <section ref={rootRef} className="natural-journey" id="top" aria-label="Arcleの支援領域を巡る3Dストーリー">
      <div className="natural-sticky">
        <div className={`natural-canvas ${ready ? "is-ready" : ""}`} aria-hidden="true">
          <Canvas
            shadows
            dpr={[1, 1.55]}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            camera={{ position: [0, 3.15, 14], fov: 48, near: 0.1, far: 80 }}
            onCreated={({ gl }) => {
              gl.setClearColor(new Color("#eee7da"));
              gl.domElement.addEventListener("webglcontextlost", (event) => event.preventDefault(), false);
              setReady(true);
            }}
          >
            <Suspense fallback={null}><NaturalWorld progress={progress} /></Suspense>
          </Canvas>
        </div>
        <div className="natural-paper-grain" aria-hidden="true" />
        <div className="natural-progress" aria-hidden="true"><i /></div>

        <header className="natural-header">
          <a className="natural-brand" href="#top"><Wordmark /><strong>Arcle</strong></a>
          <nav aria-label="支援領域ナビゲーション">
            {scenes.map((scene, index) => (
              <button key={scene.id} type="button" onClick={() => jumpTo(index)} className={activeScene === index ? "is-active" : ""}>{scene.short}</button>
            ))}
          </nav>
          <a className="natural-cta" href="#contact">無料相談</a>
        </header>

        <div className="natural-copy-stack">
          {scenes.map((scene, index) => (
            <article key={scene.id} className={`natural-copy ${activeScene === index ? "is-active" : ""}`} style={{ "--natural-accent": scene.accent } as React.CSSProperties}>
              <span className="natural-number">0{index + 1} / 05</span>
              <span className="natural-eyebrow">{scene.eyebrow}</span>
              <h1>{scene.title.map((line) => <span key={line}>{line}</span>)}</h1>
              <p>{scene.body}</p>
              <ul>{scene.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              {index === 0 && <a href="#services">できることを見る <b>↓</b></a>}
            </article>
          ))}
        </div>

        <div className="natural-route" aria-label="現在のシーン">
          {scenes.map((scene, index) => <button type="button" key={scene.id} onClick={() => jumpTo(index)} className={activeScene === index ? "is-active" : ""} aria-label={`${scene.short}へ移動`}><i /><span>{scene.short}</span></button>)}
        </div>
        <div className="natural-hint" aria-hidden="true"><span>SCROLL TO WALK</span><i /></div>
      </div>
    </section>
  );
}
