import React from 'react';
import type { ServiceKey } from '../next/theme';

// 記事の冒頭（日付のすぐ下）に置く「この記事の結論」。答えを先に3〜4文で書く。
// 読む人が最初に答えを知れるようにし、AIの答えにも引用されやすくする
const labelColor: Record<ServiceKey, string> = {
  josys: 'bg-svc-josys',
  data: 'bg-svc-data',
  ai: 'bg-svc-ai',
  web: 'bg-svc-web'
};

const ArticleSummary: React.FC<{ service: ServiceKey; children: React.ReactNode }> = ({ service, children }) => (
  <section aria-label="この記事の結論" className="relative mt-4 mb-10 bg-white border-[3px] border-[#111] shadow-[5px_5px_0_#111] p-5 pt-8 md:p-7 md:pt-9">
    <p className={`absolute -top-4 left-4 -rotate-2 border-[3px] border-[#111] px-3 py-0.5 font-manga text-[15px] md:text-[16px] text-white shadow-[3px_3px_0_#111] ${labelColor[service]}`}>この記事の結論</p>
    <p className="font-bold text-[#111] leading-[1.95]">{children}</p>
  </section>
);

export default ArticleSummary;
