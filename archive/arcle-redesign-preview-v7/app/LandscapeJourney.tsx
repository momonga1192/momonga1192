"use client";

/* Three.js render loops intentionally mutate camera and Object3D instances. */
/* eslint-disable react-hooks/immutability */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
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
    id: "confluence",
    short: "合流点",
    eyebrow: "CONNECTED LANDSCAPE",
    title: ["ばらばらの流れを、", "ひとつの景色へ。"],
    body: "情シス、データ、生成AI、Web。会社の中に散らばる課題を見渡し、ひとつの流れとして整えます。",
    tags: ["愛知・一宮", "中小企業向け", "相談窓口を一本化"],
    accent: "#496d60",
  },
  {
    id: "foundation",
    short: "情シス",
    eyebrow: "IT FOUNDATION",
    title: ["仕事が止まらない、", "静かな土台を。"],
    body: "PC、アカウント、セキュリティ。目立たないけれど大切な足元を整え、毎日の仕事を支えます。",
    tags: ["ヘルプデスク", "SaaS管理", "セキュリティ"],
    accent: "#56685b",
  },
  {
    id: "terraces",
    short: "データ",
    eyebrow: "DATA TERRACES",
    title: ["数字の流れに、", "意味を見つける。"],
    body: "Excelや複数システムに分かれた数字を重ね、経営と現場が同じ地図を見られる状態へ変えます。",
    tags: ["Tableau", "Power BI", "KPI設計"],
    accent: "#9a6949",
  },
  {
    id: "grove",
    short: "生成AI",
    eyebrow: "KNOWLEDGE GROVE",
    title: ["知識を、使える力に", "育てていく。"],
    body: "ルール、社内検索、問い合わせ対応、業務自動化。会社の知識が根づき、現場で育つAIをつくります。",
    tags: ["導入支援", "社内RAG", "業務自動化"],
    accent: "#766b55",
  },
  {
    id: "horizon",
    short: "Web",
    eyebrow: "OPEN HORIZON",
    title: ["価値を、", "外の世界へひらく。"],
    body: "会社の強みを言葉とデザインで磨き、まだ出会っていない人へ届くWebサイトへ育てます。",
    tags: ["コーポレート", "LP", "SEO・運用"],
    accent: "#a87645",
  },
];

const sceneStops = [0.015, 0.245, 0.475, 0.705, 0.93];
const clamp = (value: number) => Math.min(1, Math.max(0, value));

function Stone({ position, scale = 1, color = "#b9aa91", rotation = [0, 0, 0] }: {
  position: [number, number, number];
  scale?: number;
  color?: string;
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation} scale={[1.25 * scale, 0.72 * scale, scale]} castShadow receiveShadow>
      <dodecahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color={color} roughness={1} />
    </mesh>
  );
}

function Hill({ position, scale, color = "#819078" }: {
  position: [number, number, number];
  scale: [number, number, number];
  color?: string;
}) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <sphereGeometry args={[1, 28, 14]} />
      <meshStandardMaterial color={color} roughness={1} />
    </mesh>
  );
}

function GroveTree({ position, scale = 1, tone = "#657b61" }: {
  position: [number, number, number];
  scale?: number;
  tone?: string;
}) {
  const crown = [
    [-0.62, 3.2, 0.12, 0.9],
    [0.35, 3.55, 0, 1.12],
    [0.92, 2.88, -0.12, 0.76],
    [-0.12, 4.2, -0.1, 0.82],
  ] as const;
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.55, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.38, 3.3, 9]} />
        <meshStandardMaterial color="#7e654b" roughness={1} />
      </mesh>
      <mesh position={[-0.36, 2.5, 0]} rotation={[0, 0, -0.55]} castShadow>
        <cylinderGeometry args={[0.09, 0.16, 1.5, 8]} />
        <meshStandardMaterial color="#7e654b" roughness={1} />
      </mesh>
      {crown.map(([x, y, z, s], index) => (
        <mesh key={index} position={[x, y, z]} scale={s} castShadow>
          <dodecahedronGeometry args={[0.82, 1]} />
          <meshStandardMaterial color={index % 2 ? tone : "#78906e"} roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function WaterCourse() {
  const main = useMemo(() => new CatmullRomCurve3([
    new Vector3(0.8, 0.02, 12),
    new Vector3(0.2, 0.02, 2),
    new Vector3(5.6, 0.02, -19),
    new Vector3(2.1, 0.02, -31),
    new Vector3(-4.5, 0.02, -42),
    new Vector3(-0.8, 0.02, -54),
    new Vector3(4.2, 0.02, -64),
    new Vector3(1.2, 0.02, -77),
    new Vector3(0, 0.02, -98),
  ], false, "catmullrom", 0.48), []);
  const tributaries = useMemo(() => [
    new CatmullRomCurve3([new Vector3(-11, 0, 10), new Vector3(-7, 0, 6), new Vector3(0.2, 0, 2)]),
    new CatmullRomCurve3([new Vector3(11, 0, 12), new Vector3(7, 0, 6), new Vector3(0.2, 0, 2)]),
    new CatmullRomCurve3([new Vector3(-3, 0, 15), new Vector3(-1.5, 0, 8), new Vector3(0.2, 0, 2)]),
  ], []);
  return (
    <>
      <mesh position={[0, -0.12, 0]} receiveShadow>
        <tubeGeometry args={[main, 320, 1.6, 18, false]} />
        <meshStandardMaterial color="#6f8072" roughness={1} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <tubeGeometry args={[main, 320, 1.15, 20, false]} />
        <meshPhysicalMaterial color="#7faab0" roughness={0.26} metalness={0.02} transparent opacity={0.82} clearcoat={0.35} />
      </mesh>
      {tributaries.map((curve, index) => (
        <group key={index}>
          <mesh position={[0, -0.12, 0]} receiveShadow>
            <tubeGeometry args={[curve, 80, 0.72, 14, false]} />
            <meshStandardMaterial color="#708173" roughness={1} />
          </mesh>
          <mesh position={[0, 0.04, 0]}>
            <tubeGeometry args={[curve, 80, 0.48, 14, false]} />
            <meshPhysicalMaterial color="#8bb4b8" roughness={0.3} transparent opacity={0.78} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Confluence() {
  return (
    <group position={[0, 0, 1]}>
      <Hill position={[-8, -0.5, -1]} scale={[5.5, 1.35, 5]} color="#82917a" />
      <Hill position={[8, -0.65, -2]} scale={[5.4, 1.25, 4.6]} color="#87987f" />
      <Hill position={[-4, -0.75, 9]} scale={[4.8, 1.05, 4]} color="#93a088" />
      <Stone position={[-3.8, 0.5, 1]} scale={0.85} />
      <Stone position={[3.9, 0.38, 1.4]} scale={0.68} color="#c7b99e" />
      <Stone position={[1.9, 0.28, 6.2]} scale={0.5} />
      <GroveTree position={[-6.2, 0, 2.7]} scale={0.82} />
      <GroveTree position={[6.8, 0, -1.8]} scale={0.7} tone="#728768" />
      {[0, 1, 2].map((index) => (
        <Float key={index} speed={0.45 + index * 0.08} floatIntensity={0.12} rotationIntensity={0.04}>
          <mesh position={[-1.5 + index * 1.6, 1.2 + index * 0.25, 0.7 - index * 0.4]} rotation={[Math.PI / 2, 0, index * 0.35]}>
            <torusGeometry args={[0.56 + index * 0.12, 0.065, 10, 38]} />
            <meshStandardMaterial color={index === 1 ? "#b78051" : "#e0d4bd"} roughness={0.85} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function StoneBridge() {
  const blocks = Array.from({ length: 11 }, (_, index) => {
    const angle = (index / 10) * Math.PI;
    return { x: Math.cos(angle) * 4.15, y: Math.sin(angle) * 4.15 + 0.65, angle };
  });
  return (
    <group position={[5.6, 0, -20.5]} rotation={[0, -0.04, 0]}>
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <torusGeometry args={[4.15, 0.72, 16, 84, Math.PI]} />
        <meshStandardMaterial color="#a99c84" roughness={1} />
      </mesh>
      {blocks.map(({ x, y, angle }, index) => (
        <mesh key={index} position={[x, y, 0]} rotation={[0, 0, angle - Math.PI / 2]} scale={[0.65, 0.42, 1.6]} castShadow>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={index % 2 ? "#b9aa90" : "#c4b69c"} roughness={1} />
        </mesh>
      ))}
      <RoundedBox args={[3.2, 2.3, 2.8]} radius={0.2} position={[-4.1, 0.4, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#9c927d" roughness={1} />
      </RoundedBox>
      <RoundedBox args={[3.2, 2.3, 2.8]} radius={0.2} position={[4.1, 0.4, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#9c927d" roughness={1} />
      </RoundedBox>
      <Hill position={[-6.8, -0.2, 0]} scale={[4.2, 1.1, 4.5]} color="#77866f" />
      <Hill position={[6.8, -0.15, -0.5]} scale={[4.4, 1.18, 4.6]} color="#7e8d75" />
      <GroveTree position={[-7.1, 0, 1.5]} scale={0.88} />
      <GroveTree position={[7.4, 0, -1.2]} scale={0.72} tone="#6b8067" />
      <Stone position={[-2.9, 0.35, 3]} scale={0.7} />
      <Stone position={[3.2, 0.3, -2.6]} scale={0.6} color="#c1b298" />
    </group>
  );
}

function DataTerraces({ progress }: { progress: JourneyProgress }) {
  const rising = useRef<Group>(null);
  useFrame(() => {
    if (!rising.current) return;
    const local = clamp((progress.current.current - 0.36) / 0.22);
    rising.current.scale.y = MathUtils.lerp(0.12, 1, local);
  });
  const levels = [
    [7.8, 0.25, 6.3, 0],
    [6.6, 0.63, 5.2, -0.15],
    [5.25, 1.02, 4.1, -0.35],
    [3.8, 1.4, 3.1, -0.55],
  ] as const;
  return (
    <group position={[-4.5, 0, -42]} rotation={[0, 0.12, 0]}>
      <Hill position={[-5.4, -0.6, -0.2]} scale={[5.6, 1.6, 7]} color="#8e9475" />
      <group position={[-2.1, 0, 0.4]}>
        {levels.map(([width, y, depth, z], index) => (
          <RoundedBox key={index} args={[width, 0.5, depth]} radius={0.5} position={[0, y, z]} receiveShadow castShadow>
            <meshStandardMaterial color={index % 2 ? "#9b9a72" : "#a9a27d"} roughness={1} />
          </RoundedBox>
        ))}
        {levels.slice(1).map(([width, y, depth, z], index) => (
          <RoundedBox key={index} args={[width - 0.42, 0.08, depth - 0.4]} radius={0.25} position={[0, y + 0.29, z]}>
            <meshPhysicalMaterial color="#799fa0" roughness={0.34} transparent opacity={0.72} />
          </RoundedBox>
        ))}
      </group>
      <group ref={rising} position={[2.6, 0.3, -0.7]}>
        {[1.3, 2.1, 3.05, 4, 3.4, 2.55].map((height, index) => (
          <mesh key={index} position={[(index - 2.5) * 0.64, height / 2, Math.sin(index * 1.7) * 0.35]} castShadow>
            <cylinderGeometry args={[0.17, 0.28, height, 12]} />
            <meshStandardMaterial color={index === 3 ? "#ae7049" : index % 2 ? "#637a66" : "#cab897"} roughness={0.92} />
          </mesh>
        ))}
      </group>
      <GroveTree position={[6.1, 0, 0.5]} scale={0.78} tone="#65795e" />
      <GroveTree position={[-7.1, 0, -2.5]} scale={0.62} />
      <Stone position={[4.9, 0.4, 3]} scale={0.65} color="#b6a88d" />
    </group>
  );
}

function KnowledgeGrove({ progress }: { progress: JourneyProgress }) {
  const seed = useRef<Group>(null);
  useFrame(({ clock }, delta) => {
    if (!seed.current) return;
    const local = clamp((progress.current.current - 0.6) / 0.24);
    seed.current.rotation.y += delta * (0.12 + local * 0.34);
    seed.current.position.y = 2.6 + Math.sin(clock.elapsedTime * 0.55) * 0.12 + local * 0.7;
  });
  const paperLeaves = [
    [-2.6, 3.1, 0.2, -0.3],
    [-1.5, 4.45, -0.6, 0.18],
    [1.7, 4.2, 0, -0.22],
    [2.75, 2.9, -0.7, 0.3],
    [0.4, 5.25, -0.8, 0.12],
  ] as const;
  return (
    <group position={[4.1, 0, -64]}>
      <Hill position={[0, -0.7, -1]} scale={[9.2, 1.45, 7]} color="#6f806a" />
      <GroveTree position={[-5.4, 0, -0.8]} scale={1.18} tone="#526c54" />
      <GroveTree position={[5.6, 0, -1.5]} scale={1.05} tone="#5e7459" />
      <GroveTree position={[-3.6, 0, -4.1]} scale={0.8} />
      <GroveTree position={[3.4, 0, -4.5]} scale={0.86} tone="#536b51" />
      <group ref={seed} position={[0, 2.6, -0.8]}>
        <mesh castShadow>
          <icosahedronGeometry args={[1.05, 2]} />
          <meshStandardMaterial color="#c79b5a" roughness={0.62} />
        </mesh>
        <mesh scale={1.34}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshBasicMaterial color="#f2dec0" wireframe transparent opacity={0.45} />
        </mesh>
      </group>
      {paperLeaves.map(([x, y, z, rotation], index) => (
        <Float key={index} speed={0.48 + index * 0.06} floatIntensity={0.18} rotationIntensity={0.08}>
          <RoundedBox args={[1.3, 0.86, 0.08]} radius={0.12} position={[x, y, z]} rotation={[0, rotation, rotation * 0.55]} castShadow>
            <meshStandardMaterial color={index === 2 ? "#d2bc94" : "#eee5d3"} roughness={0.88} />
          </RoundedBox>
        </Float>
      ))}
      <Stone position={[-1.9, 0.42, 2.6]} scale={0.8} color="#a99b82" />
      <Stone position={[2.5, 0.3, 2.9]} scale={0.58} />
    </group>
  );
}

function OpenHorizon({ progress }: { progress: JourneyProgress }) {
  const sails = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!sails.current) return;
    const local = clamp((progress.current.current - 0.79) / 0.2);
    sails.current.position.z = MathUtils.lerp(2, -4.5, local);
    sails.current.position.y = Math.sin(clock.elapsedTime * 0.42) * 0.18 + local * 1.4;
    sails.current.rotation.y = local * 0.3;
  });
  return (
    <group position={[0, 0, -88]}>
      <Hill position={[-8.5, -0.65, 1]} scale={[7.2, 1.35, 8]} color="#87967c" />
      <Hill position={[8.5, -0.7, -0.5]} scale={[7.4, 1.22, 8.5]} color="#92a083" />
      <mesh position={[0, 10, -12]}>
        <sphereGeometry args={[4.1, 32, 32]} />
        <meshBasicMaterial color="#efd49b" transparent opacity={0.9} />
      </mesh>
      <group ref={sails} position={[0, 1.9, 2]}>
        {[
          [-3.1, 1.4, 0, 0.7],
          [-1.3, 3.1, -0.8, 0.52],
          [1.1, 2.4, 0.2, 0.82],
          [3.1, 4.1, -1.2, 0.58],
        ].map(([x, y, z, scale], index) => (
          <mesh key={index} position={[x, y, z]} scale={[1.25 * scale, 1.7 * scale, 0.14]} rotation={[0.2, index * 0.34, index % 2 ? 0.18 : -0.22]} castShadow>
            <tetrahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={index % 2 ? "#e7ddca" : "#c9a16d"} roughness={0.82} />
          </mesh>
        ))}
      </group>
      <GroveTree position={[-7, 0, 2]} scale={0.72} />
      <GroveTree position={[7.2, 0, 1]} scale={0.64} tone="#6e8566" />
      <Stone position={[-4.7, 0.28, 4]} scale={0.62} />
      <Stone position={[4.6, 0.35, 3.2]} scale={0.75} color="#c1b092" />
    </group>
  );
}

function AirMotes() {
  const group = useRef<Group>(null);
  const motes = useMemo(() => Array.from({ length: 46 }, (_, index) => ({
    x: Math.sin(index * 8.7) * 13,
    y: 1.5 + ((index * 1.31) % 7),
    z: 10 - ((index * 7.73) % 112),
    scale: 0.025 + (index % 4) * 0.013,
  })), []);
  useFrame(({ clock }) => {
    if (group.current) group.current.position.y = Math.sin(clock.elapsedTime * 0.2) * 0.22;
  });
  return (
    <group ref={group}>
      {motes.map((mote, index) => (
        <mesh key={index} position={[mote.x, mote.y, mote.z]} scale={mote.scale}>
          <sphereGeometry args={[1, 7, 7]} />
          <meshBasicMaterial color={index % 5 === 0 ? "#d2a45d" : "#fff4d9"} transparent opacity={0.68} />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig({ progress }: { progress: JourneyProgress }) {
  const { camera, size } = useThree();
  const path = useMemo(() => new CatmullRomCurve3([
    new Vector3(0.8, 3.2, 15),
    new Vector3(0.1, 2.9, 7),
    new Vector3(0.5, 2.65, -1),
    new Vector3(3.6, 2.7, -10),
    new Vector3(5.6, 2.55, -18),
    new Vector3(5.4, 2.52, -23),
    new Vector3(1.8, 2.82, -31),
    new Vector3(-4.3, 3, -39),
    new Vector3(-4.5, 2.7, -47),
    new Vector3(-0.7, 3.1, -55),
    new Vector3(4, 2.75, -61),
    new Vector3(4, 2.85, -69),
    new Vector3(1.2, 3.15, -77),
    new Vector3(0, 3.1, -91),
  ], false, "catmullrom", 0.45), []);
  const desiredPosition = useMemo(() => new Vector3(), []);
  const lookPoint = useMemo(() => new Vector3(), []);
  const targetQuaternion = useMemo(() => new Quaternion(), []);
  const guide = useMemo(() => new PerspectiveCamera(), []);

  useFrame((_, delta) => {
    const damping = 1 - Math.exp(-delta * 3.35);
    progress.current.current = MathUtils.lerp(progress.current.current, progress.current.target, damping);
    const p = clamp(progress.current.current);
    path.getPointAt(p, desiredPosition);
    camera.position.lerp(desiredPosition, 1 - Math.exp(-delta * 4.3));
    path.getPointAt(Math.min(1, p + (size.width < 700 ? 0.025 : 0.04)), lookPoint);
    lookPoint.y -= size.width < 700 ? 0.08 : 0.22;
    guide.position.copy(camera.position);
    guide.lookAt(lookPoint);
    targetQuaternion.copy(guide.quaternion);
    camera.quaternion.slerp(targetQuaternion, 1 - Math.exp(-delta * 3.6));
    camera.fov = MathUtils.lerp(camera.fov, size.width < 700 ? 61 : 47, 0.08);
    camera.updateProjectionMatrix();
  });
  return null;
}

function LandscapeWorld({ progress }: { progress: JourneyProgress }) {
  return (
    <>
      <color attach="background" args={["#dfe1cd"]} />
      <fog attach="fog" args={["#dfe1cd", 14, 44]} />
      <ambientLight intensity={1.15} color="#fff5dd" />
      <hemisphereLight args={["#fff3d6", "#62705f", 1.65]} />
      <directionalLight position={[-10, 17, 8]} intensity={2.5} color="#ffe7b8" castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.00018} />
      <mesh position={[0, -1.05, -43]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[96, 140, 1, 1]} />
        <meshStandardMaterial color="#8d9a80" roughness={1} />
      </mesh>
      <WaterCourse />
      <Confluence />
      <StoneBridge />
      <DataTerraces progress={progress} />
      <KnowledgeGrove progress={progress} />
      <OpenHorizon progress={progress} />
      <AirMotes />
      <CameraRig progress={progress} />
    </>
  );
}

function Wordmark() {
  return <span className="landscape-mark" aria-hidden="true"><i /><i /><b /></span>;
}

export default function LandscapeJourney() {
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
      root.style.setProperty("--landscape-progress", value.toString());
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
    <section ref={rootRef} className="landscape-journey" id="top" aria-label="水脈をたどってArcleの支援領域を巡る3Dストーリー">
      <div className="landscape-sticky">
        <div className={`landscape-canvas ${ready ? "is-ready" : ""}`} aria-hidden="true">
          <Canvas
            shadows
            dpr={[1, 1.5]}
            frameloop={reducedMotion ? "demand" : "always"}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            camera={{ position: [0.8, 3.2, 15], fov: 47, near: 0.1, far: 90 }}
            onCreated={({ gl }) => {
              gl.setClearColor(new Color("#dfe1cd"));
              gl.domElement.addEventListener("webglcontextlost", (event) => event.preventDefault(), false);
              setReady(true);
            }}
          >
            <Suspense fallback={null}><LandscapeWorld progress={progress} /></Suspense>
          </Canvas>
        </div>
        <div className="landscape-veil" aria-hidden="true" />
        <div className="landscape-contours" aria-hidden="true" />
        <div className="landscape-progress" aria-hidden="true"><i /></div>

        <header className="landscape-header">
          <a className="landscape-brand" href="#top"><Wordmark /><strong>Arcle</strong></a>
          <nav aria-label="風景のナビゲーション">
            {scenes.map((scene, index) => (
              <button key={scene.id} type="button" onClick={() => jumpTo(index)} className={activeScene === index ? "is-active" : ""}>{scene.short}</button>
            ))}
          </nav>
          <a className="landscape-cta" href="#contact">相談する <span>↗</span></a>
        </header>

        <div className="landscape-copy-stack">
          {scenes.map((scene, index) => (
            <article key={scene.id} className={`landscape-copy ${activeScene === index ? "is-active" : ""}`} style={{ "--landscape-accent": scene.accent } as React.CSSProperties}>
              <span className="landscape-number">{String(index + 1).padStart(2, "0")} — 05</span>
              <span className="landscape-eyebrow">{scene.eyebrow}</span>
              <h1>{scene.title.map((line) => <span key={line}>{line}</span>)}</h1>
              <p>{scene.body}</p>
              <ul>{scene.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              {index === 0 && <a href="#services">風景の先へ <b>↓</b></a>}
            </article>
          ))}
        </div>

        <div className="landscape-route" aria-label="現在の風景">
          {scenes.map((scene, index) => (
            <button type="button" key={scene.id} onClick={() => jumpTo(index)} className={activeScene === index ? "is-active" : ""} aria-label={`${scene.short}へ移動`}>
              <i /><span>{scene.short}</span>
            </button>
          ))}
        </div>
        <div className="landscape-hint" aria-hidden="true"><span>FOLLOW THE CURRENT</span><i /></div>
        <p className="landscape-caption" aria-hidden="true">A continuous landscape for work, knowledge and growth.</p>
      </div>
    </section>
  );
}
