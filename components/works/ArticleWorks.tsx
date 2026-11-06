import React from 'react';
import { ServiceKey } from '../next/theme';
import { ac } from '../articles/articleComic';
import { worksOfService } from './ServiceWorks';

// お役立ち記事の「関連記事」の上に置く「関連する支援事例」。記事のサービスの事例を2件まで出す
const ArticleWorks: React.FC<{ service: ServiceKey }> = ({ service }) => {
  const works = worksOfService(service).slice(0, 2);
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
