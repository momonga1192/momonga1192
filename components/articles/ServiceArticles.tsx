import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionHead, comicBtn } from '../next/parts';
import { panel, panelPress } from '../next/comic';
import { ServiceKey, serviceByName, services } from '../next/theme';
import { articles } from './ArticlesIndex';

// サービスページの下に置く「関連するお役立ち記事」。同じ事業のタグの記事を新しい順に3本出す（記事を足せば自動で入れ替わる）
const ServiceArticles: React.FC<{ service: ServiceKey }> = ({ service: key }) => {
  const service = services.find((item) => item.key === key)!;
  const related = articles.filter((article) => serviceByName(article.tag)?.key === key).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="py-20 md:py-24 bg-white comic-dots border-t-[4px] border-[#111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="Articles" enClass={service.text} title="関連するお役立ち記事" lead={`${service.name}について、導入前に知っておきたいことをまとめています。`} center />
        <div className="grid md:grid-cols-3 gap-8 md:gap-6 pt-4">
          {related.map((article, i) => (
            <a
              key={article.href}
              href={article.href}
              className={`group pop-reveal flex flex-col bg-white px-5 pt-5 pb-6 ${panel} ${panelPress}`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <time dateTime={article.published} className="font-comic text-[16px] leading-none tracking-[0.06em] text-[#111] mb-3">{article.published}</time>
              <h3 className="font-manga text-[18px] leading-[1.5] text-[#111] mb-3 [word-break:auto-phrase]">{article.title}</h3>
              <p className="text-[#30343F] text-[14px] leading-[1.9] mb-5">{article.description}</p>
              <span className={`mt-auto self-start inline-flex items-center gap-1.5 font-manga text-[14px] ${service.text}`}>
                記事を読む
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
              </span>
            </a>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="/articles" className={`${comicBtn} bg-mustard text-[#111]`}>
            記事一覧を見る
            <ArrowRight className="w-4 h-4" strokeWidth={3} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceArticles;
