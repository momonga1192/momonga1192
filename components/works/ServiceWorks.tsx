import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionHead, comicBtn } from '../next/parts';
import { panel, panelPress } from '../next/comic';
import { ServiceKey, services } from '../next/theme';
import { publishedWorks, type WorkService } from './worksData';
import { serviceStyles } from './serviceStyles';

// サービスのキー（josys など）から、事例のサービス名（情シス代行 など）を引く
export const workServiceOf = (key: ServiceKey): WorkService | undefined =>
  (Object.keys(serviceStyles) as WorkService[]).find((name) => serviceStyles[name].service === key);

export const worksOfService = (key: ServiceKey) => {
  const name = workServiceOf(key);
  return publishedWorks.filter((work) => work.service === name);
};

// サービスページに置く「支援事例」。そのサービスの事例をすべて並べる（事例を足せば自動で入る）。
// 事例のページを一覧からだけでなくサービスページからもたどれるようにして、孤立させない
const ServiceWorks: React.FC<{ service: ServiceKey }> = ({ service: key }) => {
  const service = services.find((item) => item.key === key)!;
  const works = worksOfService(key);
  if (works.length === 0) return null;
  const style = serviceStyles[works[0].service];

  return (
    <section className="py-20 md:py-24 bg-[#FAF3E0] comic-dots border-t-[4px] border-[#111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="Works" enClass={service.text} title={`${service.name}の支援事例`} lead="実際の支援をもとに、会社が特定されないよう一部を変えて紹介しています。" center />
        <div className={`grid gap-8 md:gap-6 pt-4 ${works.length >= 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
          {works.map((work, i) => (
            <a
              key={work.slug}
              href={`/works/${work.slug}`}
              className={`group pop-reveal flex flex-col bg-white p-5 md:p-6 ${panel} ${panelPress}`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span className={`pop-wiggle self-start -rotate-3 text-xs font-manga px-3 py-1 text-white border-[3px] border-[#111] mb-4 ${style.accent}`}>{work.industry}</span>
              <h3 className="font-manga [word-break:auto-phrase] text-[17px] md:text-[18px] text-[#111] leading-snug mb-3 group-hover:underline decoration-2 underline-offset-4">{work.title}</h3>
              <p className="text-xs font-bold text-sumi-muted mb-5">{work.client} / {work.employees} / {work.region}</p>
              <span className={`mt-auto self-start inline-flex items-center gap-1.5 font-manga text-[14px] ${service.text}`}>
                事例を読む
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={3} aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="/works" className={`${comicBtn} bg-white text-[#111]`}>
            支援事例の一覧を見る
            <ArrowRight className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceWorks;
