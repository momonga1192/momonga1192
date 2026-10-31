import { BarChart3, Globe, Server, Sparkles, type LucideIcon } from 'lucide-react';
import type { ServiceKey } from '../next/theme';
import type { WorkService } from './worksData';

// Tailwindが検出できるよう、クラス名は完全な文字列で持つ
export const serviceStyles: Record<
  WorkService,
  { icon: LucideIcon; service: ServiceKey; en: string; badge: string; text: string; panel: string; accent: string }
> = {
  情シス代行: {
    icon: Server,
    service: 'josys',
    en: 'IT Outsourcing',
    badge: 'bg-svc-josys/10 text-svc-josys border-svc-josys/20',
    text: 'text-svc-josys',
    panel: 'bg-svc-josys/10',
    accent: 'bg-svc-josys'
  },
  データ活用: {
    icon: BarChart3,
    service: 'data',
    en: 'Data Consulting',
    badge: 'bg-svc-data/10 text-svc-data border-svc-data/20',
    text: 'text-svc-data',
    panel: 'bg-svc-data/10',
    accent: 'bg-svc-data'
  },
  生成AI: {
    icon: Sparkles,
    service: 'ai',
    en: 'Generative AI',
    badge: 'bg-svc-ai/10 text-svc-ai border-svc-ai/20',
    text: 'text-svc-ai',
    panel: 'bg-svc-ai/10',
    accent: 'bg-svc-ai'
  },
  Web制作: {
    icon: Globe,
    service: 'web',
    en: 'Web Production',
    badge: 'bg-svc-web/10 text-svc-web border-svc-web/20',
    text: 'text-svc-web',
    panel: 'bg-svc-web/10',
    accent: 'bg-svc-web'
  }
};

// 支援事例の表紙の絵（アメコミ版）。同じ事業が続いても単調にならないよう、事業の絵とお悩みの絵を交互に使う
const worryArt: Record<ServiceKey, string> = { josys: 'worry-pc', data: 'worry-data', ai: 'worry-ai', web: 'worry-web' };
export const caseArt = (service: ServiceKey, index: number) => (index % 2 ? worryArt[service] : `svc-${service}`);
export const worryArtOf = (service: ServiceKey) => worryArt[service];

// 効果の数字（「月6.6万円」など日本語まじり）を、事業の色の太い文字に黒ぶちで見せる
export const metricAfter = (text: string, size: string) =>
  `inline-block font-manga leading-[1.1] break-words [paint-order:stroke_fill] [-webkit-text-stroke:5px_#111] [text-shadow:3px_3px_0_#111] ${text} ${size}`;
