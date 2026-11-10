import React from 'react';
import { Plus } from 'lucide-react';
import { SectionHead } from './parts';
import { services, type ServiceKey } from './theme';

export type Faq = { q: string; a: string };

// サービスページの「よくある質問」。Q と A の札を付けたコマで並べる（ご相談の流れのページと同じ形）。
// 答えはサイトに書いてある事実の範囲で書く。AIの答えにも引用されやすいよう、FAQPage の構造化データを serviceFaqLd で添える
const qColor: Record<ServiceKey, string> = { josys: 'bg-svc-josys', data: 'bg-svc-data', ai: 'bg-svc-ai', web: 'bg-svc-web' };

export const serviceFaqLd = (faqs: Faq[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } }))
});

const ServiceFaq: React.FC<{ service: ServiceKey; title: string; faqs: Faq[] }> = ({ service, title, faqs }) => {
  const s = services.find((x) => x.key === service)!;
  return (
    <section className="py-20 md:py-24 bg-white comic-dots">
      <div className="max-w-3xl mx-auto px-4 sm:px-5">
        <SectionHead en="Q & A" enClass={s.text} title={title} center />
        <div className="space-y-6">
          {faqs.map((item, i) => (
            <details
              key={item.q}
              className="group pop-reveal bg-[#FAF3E0] border-[3px] border-[#111] shadow-[6px_6px_0_#111] open:shadow-[6px_6px_0_#F2B544,9px_9px_0_#111]"
              style={{ animationDelay: `${i * 70}ms` }}
              open={i === 0}
            >
              <summary className="flex items-center gap-4 p-5 sm:p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className={`grid place-items-center w-10 h-10 shrink-0 -rotate-6 ${qColor[service]} text-white font-comic text-[26px] leading-none border-[3px] border-[#111] shadow-[2px_2px_0_#111]`}>Q</span>
                <h3 className="flex-1 font-manga text-[16px] md:text-[18px] leading-relaxed text-[#111] [word-break:auto-phrase]">{item.q}</h3>
                <span className="w-9 h-9 shrink-0 bg-mustard border-[3px] border-[#111] grid place-items-center group-open:rotate-45 transition-transform">
                  <Plus className="w-4 h-4" strokeWidth={3.5} aria-hidden="true" />
                </span>
              </summary>
              <div className="flex gap-4 px-5 pb-6 sm:px-6">
                <span className="grid place-items-center w-10 h-10 shrink-0 -rotate-6 bg-coral text-white font-comic text-[26px] leading-none border-[3px] border-[#111] shadow-[2px_2px_0_#111]">A</span>
                <p className="flex-1 min-w-0 bg-white border-[3px] border-[#111] px-4 py-3 leading-[1.9] font-bold text-sumi">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFaq;
