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
