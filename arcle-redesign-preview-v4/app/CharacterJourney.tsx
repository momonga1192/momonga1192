"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Float, RoundedBox } from "@react-three/drei";
import {
  CatmullRomCurve3,
  Color,
  Group,
  MathUtils,
  Mesh,
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

type StoryProgress = MutableRefObject<{ target: number; current: number; velocity: number }>;

const chapters = [
  {
    id: "hello",
    nav: "はじまり",
    eyebrow: "A SMALL GUIDE FOR BIG QUESTIONS",
    title: ["仕事の迷子を、", "迎えにいこう。"],
    body: "会社の中に散らばった「これ、誰に聞けばいい？」を、小さな案内役と一緒に拾い集める旅です。",
    tags: ["愛知・一宮", "中小企業向け", "相談はひとつの窓口へ"],
    whisper: "まずは、困りごとを見つけるところから。",
    accent: "#4d69b1",
  },
  {
    id: "it",
    nav: "情シス",
    eyebrow: "CHAPTER 01 / IT SUPPORT",
    title: ["つまずく前に、", "足もとを整える。"],
    body: "PC、アカウント、SaaS、セキュリティ。毎日の小さな不安を受け止め、止まりにくい環境を育てます。",
    tags: ["ヘルプデスク", "端末・アカウント", "セキュリティ"],
    whisper: "雨の日も、仕事が止まらないように。",
    accent: "#587c69",
  },
  {
    id: "data",
    nav: "データ",
    eyebrow: "CHAPTER 02 / DATA",
    title: ["散らばる数字に、", "順番をつくる。"],
    body: "Excelや複数のシステムに眠る数字を、誰もが読める景色へ。次の一手が見えるダッシュボードをつくります。",
    tags: ["Tableau", "Power BI", "KPI設計"],
    whisper: "並べてみると、数字はちゃんと話し始める。",
    accent: "#b06f4d",
  },
  {
    id: "ai",
    nav: "生成AI",
    eyebrow: "CHAPTER 03 / GENERATIVE AI",
    title: ["AIに、会社の仕事を", "教えていく。"],
    body: "社内ルール、検索、問い合わせ、業務自動化。AIを魔法ではなく、現場で一緒に働ける道具へ育てます。",
    tags: ["導入ルール", "社内RAG", "業務自動化"],
    whisper: "答えを出す前に、会社のことを教えよう。",
    accent: "#826596",
  },
  {
    id: "web",
    nav: "Web",
    eyebrow: "CHAPTER 04 / WEB & GROWTH",
    title: ["できた価値を、", "外の世界へ。"],
    body: "会社の強みを言葉とデザインに変え、見つけてもらい、相談につながるWebサイトとして届けます。",
    tags: ["コーポレート", "LP", "SEO・運用"],
    whisper: "つないだものを、次の縁へ届けよう。",
    accent: "#c18c43",
  },
];

const chapterStops = [0.015, 0.25, 0.5, 0.745, 0.965];
const clamp = (value: number) => Math.min(1, Math.max(0, value));
const localProgress = (value: number, start: number, end: number) => clamp((value - start) / (end - start));

function Pebble({ position, color = "#d3c4af", scale = 1 }: { position: [number, number, number]; color?: string; scale?: number }) {
  return (
    <mesh position={position} scale={[1.25 * scale, 0.58 * scale, scale]} castShadow receiveShadow>
      <dodecahedronGeometry args={[0.75, 2]} />
      <meshStandardMaterial color={color} roughness={1} />
    </mesh>
  );
}

function PaperPlant({ position, scale = 1, color = "#71886b" }: { position: [number, number, number]; scale?: number; color?: string }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.82, 0]} castShadow>
        <cylinderGeometry args={[0.075, 0.12, 1.65, 8]} />
        <meshStandardMaterial color="#8b6849" roughness={.94} />
      </mesh>
      {[
        [-.33, 1.35, 0, .46],
        [.28, 1.55, -.03, .55],
        [0, 1.9, .02, .5],
        [.45, 1.13, .03, .36],
      ].map(([x, y, z, s], index) => (
        <mesh key={index} position={[x, y, z]} scale={s} castShadow>
          <dodecahedronGeometry args={[.64, 1]} />
          <meshStandardMaterial color={index % 2 ? color : "#8fa083"} roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function LooseThings() {
  return (
    <group position={[0, 0, 0]}>
      <Float speed={.7} floatIntensity={.18} rotationIntensity={.08}>
        <RoundedBox args={[2.8, 1.65, .22]} radius={.18} position={[2.8, 2.15, -.8]} rotation={[0, -.1, -.08]} castShadow>
          <meshStandardMaterial color="#f0e5d5" roughness={.94} />
        </RoundedBox>
        <mesh position={[2.2, 2.25, -.63]}><circleGeometry args={[.22, 24]} /><meshStandardMaterial color="#c27d55" /></mesh>
        <mesh position={[2.95, 2.25, -.63]}><circleGeometry args={[.22, 24]} /><meshStandardMaterial color="#6f8c74" /></mesh>
        <mesh position={[3.7, 2.25, -.63]}><circleGeometry args={[.22, 24]} /><meshStandardMaterial color="#5671ae" /></mesh>
      </Float>
      <RoundedBox args={[3.7, .42, 2.2]} radius={.2} position={[2.7, .2, -.8]} castShadow receiveShadow>
        <meshStandardMaterial color="#ddceb8" roughness={1} />
      </RoundedBox>
      <PaperPlant position={[6.2, -.15, -.5]} scale={.9} />
      <Pebble position={[-3.2, .25, .2]} scale={.8} />
      <Pebble position={[5.7, .16, 1.3]} scale={.48} color="#c7b291" />
    </group>
  );
}

function ItShelter() {
  return (
    <group position={[18, 0, 0]}>
      <mesh position={[1.2, 3.2, -.6]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[2.65, .28, 12, 54, Math.PI]} />
        <meshStandardMaterial color="#6f8b72" roughness={.92} />
      </mesh>
      {[-1.45, 3.85].map((x) => (
        <mesh key={x} position={[x, 1.6, -.6]} castShadow>
          <cylinderGeometry args={[.18, .22, 3.2, 12]} />
          <meshStandardMaterial color="#876746" roughness={.94} />
        </mesh>
      ))}
      <RoundedBox args={[7.2, .42, 3.3]} radius={.24} position={[1.2, .08, -.6]} castShadow receiveShadow>
        <meshStandardMaterial color="#d9c9b3" roughness={1} />
      </RoundedBox>
      {[-.65, 1.15, 2.95].map((x, index) => (
        <Float key={x} speed={.55 + index * .1} floatIntensity={.1} rotationIntensity={.03}>
          <RoundedBox args={[1.35, 1.55, .18]} radius={.15} position={[x, 1.45 + (index % 2) * .2, -.35]} castShadow>
            <meshStandardMaterial color={index === 1 ? "#6e8973" : "#efe7db"} roughness={.9} />
          </RoundedBox>
          <mesh position={[x, 1.56 + (index % 2) * .2, -.22]}>
            <circleGeometry args={[.17, 20]} />
            <meshStandardMaterial color={index === 1 ? "#f2eadf" : "#718a74"} />
          </mesh>
        </Float>
      ))}
      <PaperPlant position={[5.3, -.08, -.5]} scale={.74} color="#657e67" />
      <Pebble position={[-3.9, .18, .6]} scale={.6} color="#bda98c" />
    </group>
  );
}

function GrowingBar({ x, height, color, progress, delay }: { x: number; height: number; color: string; progress: StoryProgress; delay: number }) {
  const ref = useRef<Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    const amount = MathUtils.smoothstep(localProgress(progress.current.current, .36 + delay, .56 + delay), 0, 1);
    ref.current.scale.y = MathUtils.lerp(.08, 1, amount);
    ref.current.position.y = height * ref.current.scale.y / 2;
  });
  return (
    <mesh ref={ref} position={[x, height / 2, -.6]} castShadow>
      <cylinderGeometry args={[.42, .52, height, 18]} />
      <meshStandardMaterial color={color} roughness={.9} />
    </mesh>
  );
}

function DataSteps({ progress }: { progress: StoryProgress }) {
  const bars = [
    [-2.1, 1.3, "#889b82"],
    [-.95, 2.2, "#d7c6ae"],
    [.2, 3.15, "#b17150"],
    [1.35, 4.15, "#779078"],
    [2.5, 5.1, "#c28a55"],
  ] as const;
  return (
    <group position={[36, 0, 0]}>
      <RoundedBox args={[8.2, .42, 3.7]} radius={.25} position={[.2, .08, -.6]} castShadow receiveShadow>
        <meshStandardMaterial color="#ded0bd" roughness={1} />
      </RoundedBox>
      {bars.map(([x, height, color], index) => <GrowingBar key={x} x={x} height={height} color={color} progress={progress} delay={index * .018} />)}
      {[0, 1, 2].map((index) => (
        <Float key={index} speed={.56 + index * .1} floatIntensity={.14} rotationIntensity={.04}>
          <mesh position={[-3.1 + index * .8, 2.4 + index * .72, -.25]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[.48 + index * .11, .075, 9, 32]} />
            <meshStandardMaterial color={index === 1 ? "#b17150" : "#eee4d6"} roughness={.82} />
          </mesh>
        </Float>
      ))}
      <PaperPlant position={[5.1, -.08, .2]} scale={.7} />
      <Pebble position={[-4.8, .2, .5]} scale={.68} />
    </group>
  );
}

function AiBook() {
  const cards = [
    [-2.5, 3.35, -.2, -.18],
    [-1.4, 4.45, -.65, .12],
    [1.75, 4.25, -.4, -.14],
    [2.9, 3.1, -.12, .2],
  ] as const;
  return (
    <group position={[54, 0, 0]}>
      <RoundedBox args={[7.6, .42, 3.6]} radius={.25} position={[.25, .08, -.6]} castShadow receiveShadow>
        <meshStandardMaterial color="#d8cab8" roughness={1} />
      </RoundedBox>
      <group position={[.3, 1.1, -.65]} rotation={[.08, 0, 0]}>
        <RoundedBox args={[3.4, .24, 2.5]} radius={.12} position={[-1.7, .4, 0]} rotation={[0, 0, -.2]} castShadow>
          <meshStandardMaterial color="#f1e7d9" roughness={.94} />
        </RoundedBox>
        <RoundedBox args={[3.4, .24, 2.5]} radius={.12} position={[1.7, .4, 0]} rotation={[0, 0, .2]} castShadow>
          <meshStandardMaterial color="#eadccc" roughness={.94} />
        </RoundedBox>
      </group>
      <Float speed={.52} floatIntensity={.2} rotationIntensity={.07}>
        <mesh position={[.25, 3.45, -.5]} castShadow>
          <icosahedronGeometry args={[1.05, 2]} />
          <meshStandardMaterial color="#8d75a0" roughness={.74} />
        </mesh>
        <mesh position={[.25, 3.45, -.5]} scale={1.28}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial color="#f2e8da" wireframe transparent opacity={.34} />
        </mesh>
      </Float>
      {cards.map(([x, y, z, rotation], index) => (
        <Float key={index} speed={.62 + index * .09} floatIntensity={.18} rotationIntensity={.08}>
          <RoundedBox args={[1.28, .86, .12]} radius={.1} position={[x, y, z]} rotation={[0, rotation, rotation * .6]} castShadow>
            <meshStandardMaterial color={index === 2 ? "#cab79d" : "#efe5d7"} roughness={.9} />
          </RoundedBox>
        </Float>
      ))}
      <PaperPlant position={[5.1, -.06, .2]} scale={.68} color="#778b70" />
      <Pebble position={[-4.6, .18, .7]} scale={.6} color="#c8b496" />
    </group>
  );
}

function WebWindow({ progress }: { progress: StoryProgress }) {
  const planes = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!planes.current) return;
    const reveal = localProgress(progress.current.current, .78, .98);
    planes.current.children.forEach((child, index) => {
      child.position.x = 2.7 + index * 1.25 + reveal * (1.2 + index * .6);
      child.position.y = 3.1 + Math.sin(clock.elapsedTime * .8 + index) * .12 + index * .45;
      child.rotation.z = -.18 + index * .12 + reveal * .1;
    });
  });
  return (
    <group position={[72, 0, 0]}>
      <mesh position={[1.2, 3.3, -.8]} castShadow>
        <torusGeometry args={[3.25, .3, 13, 64]} />
        <meshStandardMaterial color="#d0b181" roughness={.92} />
      </mesh>
      <RoundedBox args={[8.4, .42, 3.8]} radius={.28} position={[1.2, .08, -.8]} castShadow receiveShadow>
        <meshStandardMaterial color="#ded0bc" roughness={1} />
      </RoundedBox>
      <Float speed={.48} floatIntensity={.12} rotationIntensity={.025}>
        <RoundedBox args={[5.5, 3.75, .22]} radius={.25} position={[1.1, 3.15, -.9]} rotation={[0, -.08, 0]} castShadow>
          <meshStandardMaterial color="#f2e9dd" roughness={.88} />
        </RoundedBox>
        <RoundedBox args={[1.8, 2.2, .12]} radius={.15} position={[2.1, 3.05, -.74]} rotation={[0, -.08, 0]}>
          <meshStandardMaterial color="#c8a263" roughness={.85} />
        </RoundedBox>
        {[0, 1, 2].map((index) => (
          <RoundedBox key={index} args={[2 - index * .18, .12, .07]} radius={.04} position={[-.75, 3.75 - index * .52, -.72]} rotation={[0, -.08, 0]}>
            <meshStandardMaterial color={index === 0 ? "#5470ac" : "#c8b9a5"} roughness={.8} />
          </RoundedBox>
        ))}
      </Float>
      <group ref={planes}>
        {[0, 1, 2].map((index) => (
          <mesh key={index} position={[3 + index, 3 + index * .4, .5]} rotation={[0, 0, index * .08]} castShadow>
            <coneGeometry args={[.34, 1.2, 3]} />
            <meshStandardMaterial color={index === 1 ? "#c28055" : "#f1e4d1"} side={2} roughness={.86} />
          </mesh>
        ))}
      </group>
      <PaperPlant position={[-4.2, -.06, -.1]} scale={.75} />
      <Pebble position={[5.4, .2, .6]} scale={.62} color="#c8b28f" />
    </group>
  );
}

function GuideCharacter({ progress }: { progress: StoryProgress }) {
  const root = useRef<Group>(null);
  const body = useRef<Group>(null);
  const leftFoot = useRef<Group>(null);
  const rightFoot = useRef<Group>(null);
  const leftArm = useRef<Group>(null);
  const rightArm = useRef<Group>(null);
  const last = useRef(0);

  useFrame(({ clock }, delta) => {
    if (!root.current || !body.current || !leftFoot.current || !rightFoot.current || !leftArm.current || !rightArm.current) return;
    const p = progress.current.current;
    const rawVelocity = (p - last.current) / Math.max(delta, .001);
    progress.current.velocity = MathUtils.lerp(progress.current.velocity, rawVelocity, .14);
    last.current = p;
    const motion = clamp(Math.abs(progress.current.velocity) * 30);
    const direction = progress.current.velocity < -.0005 ? -1 : 1;
    const step = clock.elapsedTime * (2.5 + motion * 7.5);
    root.current.position.x = p * 72;
    root.current.position.y = .55 + Math.abs(Math.sin(step)) * .11 * motion;
    root.current.rotation.y = MathUtils.lerp(root.current.rotation.y, direction * -.2, .08);
    body.current.rotation.z = Math.sin(step) * .035 * motion;
    leftFoot.current.position.y = Math.max(0, Math.sin(step) * .18 * motion);
    rightFoot.current.position.y = Math.max(0, -Math.sin(step) * .18 * motion);
    leftFoot.current.position.x = -.34 + Math.sin(step) * .15 * motion;
    rightFoot.current.position.x = .34 - Math.sin(step) * .15 * motion;
    leftArm.current.rotation.z = -.28 + Math.sin(step) * .35 * motion;
    rightArm.current.rotation.z = .28 - Math.sin(step) * .35 * motion;
  });

  return (
    <group ref={root} position={[0, .55, 1.4]}>
      <group ref={body}>
        <mesh position={[0, 1.15, 0]} castShadow>
          <capsuleGeometry args={[.66, 1.12, 10, 20]} />
          <meshStandardMaterial color="#f1e2cd" roughness={.96} />
        </mesh>
        <mesh position={[0, 2.33, .02]} scale={[1.03, .94, 1]} castShadow>
          <sphereGeometry args={[.83, 28, 28]} />
          <meshStandardMaterial color="#f4e7d4" roughness={.94} />
        </mesh>
        <mesh position={[-.25, 2.44, .77]} scale={[.78, 1, .55]}>
          <sphereGeometry args={[.075, 14, 14]} />
          <meshStandardMaterial color="#343632" roughness={.8} />
        </mesh>
        <mesh position={[.25, 2.44, .77]} scale={[.78, 1, .55]}>
          <sphereGeometry args={[.075, 14, 14]} />
          <meshStandardMaterial color="#343632" roughness={.8} />
        </mesh>
        <mesh position={[0, 2.14, .79]} scale={[1, .28, .42]}>
          <torusGeometry args={[.14, .027, 7, 18, Math.PI]} />
          <meshStandardMaterial color="#8d6e56" roughness={.86} />
        </mesh>
        <mesh position={[0, 2.8, -.12]} rotation={[0, 0, -.34]} castShadow>
          <torusGeometry args={[.66, .11, 9, 30, Math.PI * 1.62]} />
          <meshStandardMaterial color="#5571ad" roughness={.86} />
        </mesh>
        <mesh position={[.55, 2.96, -.08]} rotation={[0, 0, -.55]} castShadow>
          <coneGeometry args={[.16, .45, 4]} />
          <meshStandardMaterial color="#c98052" roughness={.88} />
        </mesh>
        <mesh position={[0, 1.62, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[.64, .105, 10, 32]} />
          <meshStandardMaterial color="#5470ad" roughness={.82} />
        </mesh>
        <group ref={leftArm} position={[-.68, 1.45, 0]} rotation={[0, 0, -.28]}>
          <mesh position={[-.28, -.12, 0]} castShadow><capsuleGeometry args={[.13, .55, 6, 12]} /><meshStandardMaterial color="#e9d7bf" roughness={.95} /></mesh>
        </group>
        <group ref={rightArm} position={[-.68 * -1, 1.45, 0]} rotation={[0, 0, .28]}>
          <mesh position={[.28, -.12, 0]} castShadow><capsuleGeometry args={[.13, .55, 6, 12]} /><meshStandardMaterial color="#e9d7bf" roughness={.95} /></mesh>
        </group>
        <group ref={leftFoot} position={[-.34, .15, .08]}>
          <mesh scale={[1.2, .58, 1.45]} castShadow><sphereGeometry args={[.36, 18, 18]} /><meshStandardMaterial color="#4f6659" roughness={.9} /></mesh>
        </group>
        <group ref={rightFoot} position={[.34, .15, .08]}>
          <mesh scale={[1.2, .58, 1.45]} castShadow><sphereGeometry args={[.36, 18, 18]} /><meshStandardMaterial color="#4f6659" roughness={.9} /></mesh>
        </group>
        <Float speed={1.1} floatIntensity={.1} rotationIntensity={.08}>
          <mesh position={[1.05, 1.27, .2]} castShadow>
            <sphereGeometry args={[.34, 20, 20]} />
            <meshStandardMaterial color="#5571ad" roughness={.9} />
          </mesh>
        </Float>
      </group>
    </group>
  );
}

function StoryCamera({ progress }: { progress: StoryProgress }) {
  const { camera, size } = useThree();
  const desired = useMemo(() => new Vector3(), []);
  const lookPoint = useMemo(() => new Vector3(), []);
  const targetQuaternion = useMemo(() => new Quaternion(), []);
  const guide = useMemo(() => new PerspectiveCamera(), []);

  useFrame((_, delta) => {
    const damping = 1 - Math.exp(-delta * 3.6);
    progress.current.current = MathUtils.lerp(progress.current.current, progress.current.target, damping);
    const p = clamp(progress.current.current);
    const x = p * 72;
    desired.set(x - (size.width < 700 ? .1 : 1.35), size.width < 700 ? 4.6 : 4.2, size.width < 700 ? 14.8 : 13.4);
    camera.position.lerp(desired, 1 - Math.exp(-delta * 4.8));
    lookPoint.set(x + (size.width < 700 ? 0 : 1.2), 1.85, 0);
    guide.position.copy(camera.position);
    guide.lookAt(lookPoint);
    targetQuaternion.copy(guide.quaternion);
    camera.quaternion.slerp(targetQuaternion, 1 - Math.exp(-delta * 4));
    camera.fov = MathUtils.lerp(camera.fov, size.width < 700 ? 55 : 43, .08);
    camera.updateProjectionMatrix();
  });
  return null;
}

function FloatingMotes() {
  const group = useRef<Group>(null);
  const motes = useMemo(() => Array.from({ length: 48 }, (_, index) => ({
    position: [((index * 13.7) % 84) - 6, 1 + ((index * 1.43) % 7), -2 + Math.sin(index * 2.1) * 4] as [number, number, number],
    scale: .025 + (index % 4) * .012,
  })), []);
  useFrame(({ clock }) => {
    if (group.current) group.current.position.y = Math.sin(clock.elapsedTime * .25) * .17;
  });
  return (
    <group ref={group}>
      {motes.map((mote, index) => (
        <mesh key={index} position={mote.position} scale={mote.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={index % 5 === 0 ? "#c78656" : "#fff4dd"} transparent opacity={.72} />
        </mesh>
      ))}
    </group>
  );
}

function StoryWorld({ progress }: { progress: StoryProgress }) {
  const thread = useMemo(() => new CatmullRomCurve3([
    new Vector3(-5, .28, 1.15),
    new Vector3(3, .35, 1.1),
    new Vector3(12, .3, .8),
    new Vector3(20, .38, 1.05),
    new Vector3(30, .32, .82),
    new Vector3(39, .36, 1.12),
    new Vector3(48, .3, .85),
    new Vector3(57, .36, 1.05),
    new Vector3(66, .31, .8),
    new Vector3(78, .4, 1.1),
  ], false, "catmullrom", .46), []);

  return (
    <>
      <color attach="background" args={["#eee4d6"]} />
      <fog attach="fog" args={["#eee4d6", 15, 34]} />
      <ambientLight intensity={1.45} color="#fff5e4" />
      <hemisphereLight args={["#fff7e8", "#8d806c", 1.65]} />
      <directionalLight position={[-8, 15, 10]} intensity={2.3} color="#ffedcf" castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-.00015} />
      <mesh position={[36, -.7, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[105, 26]} />
        <meshStandardMaterial color="#e5d9c7" roughness={1} />
      </mesh>
      <mesh position={[36, .02, -5]}>
        <planeGeometry args={[110, 28]} />
        <meshBasicMaterial color="#eee4d6" />
      </mesh>
      <mesh>
        <tubeGeometry args={[thread, 300, .075, 9, false]} />
        <meshStandardMaterial color="#5571ad" roughness={.82} />
      </mesh>
      <LooseThings />
      <ItShelter />
      <DataSteps progress={progress} />
      <AiBook />
      <WebWindow progress={progress} />
      <GuideCharacter progress={progress} />
      <FloatingMotes />
      <ContactShadows position={[36, -.42, 0]} opacity={.4} scale={96} blur={2.6} far={17} color="#70634f" />
      <StoryCamera progress={progress} />
    </>
  );
}

function StoryMark() {
  return <span className="story-mark" aria-hidden="true"><i /><i /><b /></span>;
}

export default function CharacterJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const progress = useRef({ target: 0, current: 0, velocity: 0 });
  const [activeChapter, setActiveChapter] = useState(0);
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const travel = Math.max(1, root.offsetHeight - window.innerHeight);
      const value = clamp(-rect.top / travel);
      progress.current.target = value;
      root.style.setProperty("--story-progress", value.toString());
      let next = 0;
      chapterStops.forEach((stop, index) => { if (value >= stop - .085) next = index; });
      setActiveChapter((current) => current === next ? current : next);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(read); };
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
    window.scrollTo({ top: top + travel * chapterStops[index], behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section ref={rootRef} className="storybook" id="top" aria-label="案内役と巡るArcleの仕事の物語">
      <div className="storybook-sticky">
        <div className={`story-canvas ${ready ? "is-ready" : ""}`} aria-hidden="true">
          <Canvas
            shadows
            frameloop={reduceMotion ? "demand" : "always"}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            camera={{ position: [-1.35, 4.2, 13.4], fov: 43, near: .1, far: 65 }}
            onCreated={({ gl }) => {
              gl.setClearColor(new Color("#eee4d6"));
              gl.domElement.addEventListener("webglcontextlost", (event) => event.preventDefault(), false);
              setReady(true);
            }}
          >
            <Suspense fallback={null}><StoryWorld progress={progress} /></Suspense>
          </Canvas>
        </div>
        <div className="story-grain" aria-hidden="true" />
        <div className="story-progress" aria-hidden="true"><i /></div>

        <header className="story-header">
          <a className="story-brand" href="#top"><StoryMark /><strong>Arcle</strong></a>
          <nav aria-label="物語の章">
            {chapters.map((chapter, index) => <button key={chapter.id} type="button" className={activeChapter === index ? "is-active" : ""} onClick={() => jumpTo(index)}>{chapter.nav}</button>)}
          </nav>
          <a className="story-cta" href="#contact">話してみる</a>
        </header>

        <div className="story-copy-stack">
          {chapters.map((chapter, index) => (
            <article key={chapter.id} className={`story-copy ${activeChapter === index ? "is-active" : ""}`} style={{ "--chapter-accent": chapter.accent } as React.CSSProperties}>
              <span className="story-number">STORY 0{index + 1} / 05</span>
              <span className="story-eyebrow">{chapter.eyebrow}</span>
              <h1>{chapter.title.map((line) => <span key={line}>{line}</span>)}</h1>
              <p>{chapter.body}</p>
              <ul>{chapter.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              {index === 0 && <a href="#services">旅をはじめる <b>→</b></a>}
            </article>
          ))}
        </div>

        <div className="guide-note" style={{ "--chapter-accent": chapters[activeChapter].accent } as React.CSSProperties}>
          <span>ARCLE GUIDE</span><strong>アル</strong><p>{chapters[activeChapter].whisper}</p>
        </div>

        <div className="story-route" aria-label="現在の章">
          {chapters.map((chapter, index) => <button type="button" key={chapter.id} onClick={() => jumpTo(index)} className={activeChapter === index ? "is-active" : ""} aria-label={`${chapter.nav}へ移動`}><i /><span>{chapter.nav}</span></button>)}
        </div>
        <div className="story-hint" aria-hidden="true"><span>SCROLL TO WALK WITH ARU</span><i /></div>
      </div>
    </section>
  );
}
