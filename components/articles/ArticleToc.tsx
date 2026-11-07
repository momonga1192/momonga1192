import React from 'react';
import type { ServiceKey } from '../next/theme';

// 記事の冒頭（導入文のすぐ下）に置く目次。本文の大見出し（h2）に付けた id へ飛ぶ。
// サーバーで描いたHTMLにもそのまま入るよう、見出しは記事の側で items に書く（画面から拾わない）
const numColor: Record<ServiceKey, string> = {
  josys: 'bg-svc-josys',
  data: 'bg-svc-data',
  ai: 'bg-svc-ai',
  web: 'bg-svc-web'
};

const ArticleToc: React.FC<{ service: ServiceKey; items: { id: string; label: string }[] }> = ({ service, items }) => (
  <nav aria-label="目次" className="relative mt-12 mb-4 bg-[#FAF3E0] border-[3px] border-[#111] shadow-[5px_5px_0_#111] p-5 pt-8 md:p-7 md:pt-9">
    <p className="absolute -top-4 left-4 -rotate-2 bg-mustard border-[3px] border-[#111] px-3 py-0.5 font-manga text-[15px] md:text-[16px] text-[#111] shadow-[3px_3px_0_#111]">目次</p>
    <ol className="space-y-2.5">
      {items.map((item, i) => (
        <li key={item.id}>
          <a href={`#${item.id}`} className="group flex gap-3 items-start font-bold leading-relaxed text-[#111]">
            <span aria-hidden="true" className={`mt-[0.15em] shrink-0 w-6 h-6 grid place-items-center border-[2.5px] border-[#111] font-comic text-[14px] leading-none text-white ${numColor[service]}`}>{i + 1}</span>
            <span className="underline-offset-4 decoration-2 group-hover:underline [word-break:auto-phrase]">{item.label}</span>
          </a>
        </li>
      ))}
    </ol>
  </nav>
);

export default ArticleToc;
