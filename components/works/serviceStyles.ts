import { BarChart3, Globe, Server, Sparkles, type LucideIcon } from 'lucide-react';
import type { WorkService } from './worksData';

// Tailwindが検出できるよう、クラス名は完全な文字列で持つ
export const serviceStyles: Record<
  WorkService,
  { icon: LucideIcon; en: string; badge: string; text: string; panel: string; accent: string }
> = {
  情シス代行: {
    icon: Server,
    en: 'IT Outsourcing',
    badge: 'bg-blue-50 text-blue-700 border-blue-100',
    text: 'text-blue-600',
    panel: 'from-blue-50 via-white to-blue-100/60',
    accent: 'bg-blue-600'
  },
  データ活用: {
    icon: BarChart3,
    en: 'Data Consulting',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    text: 'text-indigo-600',
    panel: 'from-indigo-50 via-white to-indigo-100/60',
    accent: 'bg-indigo-600'
  },
  生成AI: {
    icon: Sparkles,
    en: 'Generative AI',
    badge: 'bg-purple-50 text-purple-700 border-purple-100',
    text: 'text-purple-600',
    panel: 'from-purple-50 via-white to-purple-100/60',
    accent: 'bg-purple-600'
  },
  Web制作: {
    icon: Globe,
    en: 'Web Production',
    badge: 'bg-teal-50 text-teal-700 border-teal-100',
    text: 'text-teal-600',
    panel: 'from-teal-50 via-white to-teal-100/60',
    accent: 'bg-teal-600'
  }
};
