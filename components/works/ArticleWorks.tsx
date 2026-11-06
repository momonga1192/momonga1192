import React from 'react';
import { useLocation } from 'react-router-dom';
import { ServiceKey } from '../next/theme';
import { ac } from '../articles/articleComic';
import { worksOfService } from './ServiceWorks';

// お役立ち記事の「関連記事」の上に置く「関連する支援事例」。記事のサービスの事例を2件まで出す。
// どの記事も同じ2件にならないよう、記事のURLから決まる位置から選ぶ（どの事例にもどこかの記事からリンクが付く）
const ArticleWorks: React.FC<{ service: ServiceKey }> = ({ service }) => {
  const { pathname } = useLocation();
  const all = worksOfService(service);
  const start = [...pathname].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % Math.max(all.length, 1);
  const works = all.length <= 2 ? all : [all[start], all[(start + 1) % all.length]];
  if (works.length === 0) return null;
  return (
    <section className={ac.related}>
      <h2 className={ac.h2Flat[service]}>関連する支援事例</h2>
      <div className="space-y-3">
        {works.map((work) => (
          <a key={work.slug} href={`/works/${work.slug}`} className={ac.relatedLink}>
            <span className="block text-xs text-sumi-muted mb-1">{work.client}（{work.industry}・{work.employees}）</span>
            {work.title}
          </a>
        ))}
        <a href="/works" className={ac.allLink}>支援事例の一覧を見る</a>
      </div>
    </section>
  );
};

export default ArticleWorks;
