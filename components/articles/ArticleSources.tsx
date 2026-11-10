import React from 'react';
import { ac } from './articleComic';
import type { ServiceKey } from '../next/theme';

// 記事の「出典」。料金・制度・機能など、書く前に確かめた公式の情報へのリンクを並べる。
// よくある質問のすぐ下に置く。どこから来た情報かを読む人とAIに示し、記事を信頼してもらう
const ArticleSources: React.FC<{ service: ServiceKey; items: { label: string; url: string }[] }> = ({ service, items }) =>
  items.length ? (
    <section className="mt-14">
      <h2 id="sources" className={ac.h2[service]}>出典</h2>
      <ul className="space-y-2 text-sm leading-[1.9] text-[#30343F]">
        {items.map((item) => (
          <li key={item.url} className="pl-4 -indent-4">
            ・{item.label}
            <br />
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="break-all underline underline-offset-4 hover:bg-mustard/40">{item.url}</a>
          </li>
        ))}
      </ul>
    </section>
  ) : null;

export default ArticleSources;
