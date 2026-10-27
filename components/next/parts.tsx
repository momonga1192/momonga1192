import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { illust, services, type ServiceKey } from './theme';

// 社名の由来（弧＝Arcをつないで円＝Circleにする）を、4事業の色の弧で表す
export const Arcs: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
    {['#3B6FE0', '#5B5BD6', '#8E5BD0', '#1E9C8C'].map((color, i) => (
      <path
        key={color}
        d="M 100 8 A 92 92 0 0 1 192 100"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        transform={`rotate(${i * 90 + 6} 100 100)`}
        pathLength={100}
        style={{ strokeDasharray: '86 100' }}
      />
    ))}
  </svg>
);

export const SectionHead: React.FC<{
  en: string;
  title: React.ReactNode;
  lead?: string;
  center?: boolean;
  enClass?: string;
}> = ({ en, title, lead, center, enClass = 'text-svc-josys' }) => (
  <div className={`mb-12 md:mb-16 ${center ? 'text-center' : ''}`}>
    <p className={`font-en text-sm font-semibold tracking-[0.2em] uppercase ${enClass}`}>{en}</p>
    <h2 className="font-head text-[26px] md:text-[38px] font-bold leading-snug text-sumi mt-2 [word-break:auto-phrase]">{title}</h2>
    {lead && <p className={`mt-4 text-sumi-muted leading-[1.9] [word-break:auto-phrase] ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>{lead}</p>}
  </div>
);

type Crumb = { label: string; href?: string };

// 下層ページの見出し。service を渡すとその事業の色になる
export const PageHeader: React.FC<{
  en: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs: Crumb[];
  service?: ServiceKey;
  image?: string;
}> = ({ en, title, lead, crumbs, service, image }) => {
  const s = services.find((item) => item.key === service);
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className={`absolute -right-32 -top-48 w-[560px] h-[560px] rounded-full ${s ? s.tint : 'bg-svc-josys/8'}`} />
      <div className="absolute -left-20 bottom-[-120px] w-[240px] h-[240px] rounded-full bg-mustard/20" />
      <div className={`relative max-w-6xl mx-auto px-5 pt-8 pb-16 md:pb-20 grid gap-8 items-center ${image ? 'lg:grid-cols-[1.1fr_1fr]' : ''}`}>
        <div className={image ? '' : 'max-w-3xl'}>
          <nav aria-label="パンくずリスト" className="flex flex-wrap items-center gap-1 text-xs text-sumi-muted mb-10">
            <a href='/' className="hover:text-sumi">
              ホーム
            </a>
            {crumbs.map((crumb) => (
              <React.Fragment key={crumb.label}>
                <ChevronRight className="w-3.5 h-3.5" />
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-sumi">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-sumi">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
          <p className={`font-en text-sm font-semibold tracking-[0.2em] uppercase ${s ? s.text : 'text-svc-josys'}`}>{en}</p>
          <h1 className="font-head font-black text-[30px] md:text-[46px] leading-[1.4] mt-2 [word-break:auto-phrase]">{title}</h1>
          {lead && <div className="mt-6 text-[15px] md:text-[17px] leading-[2] text-sumi-muted max-w-2xl">{lead}</div>}
        </div>
        {image && <img src={image} alt="" className="w-full max-w-[560px] justify-self-center" />}
      </div>
    </section>
  );
};

// 下層ページの最後に置く相談への誘導
export const ContactCta: React.FC<{ title?: React.ReactNode; body?: string }> = ({
  title = (
    <>
      「何から相談すればいいか
      <br className="hidden md:block" />
      わからない」でも大丈夫です。
    </>
  ),
  body = 'いまの困りごとをお聞きして、やるべきことの順番から一緒に整理します。ご相談・お見積りは無料です。'
}) => (
  <section className="py-20 md:py-28">
    <div className="max-w-6xl mx-auto px-5">
      <div className="relative overflow-hidden rounded-[40px] bg-sumi text-white p-10 md:p-16 grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
        <Arcs className="absolute -right-28 -bottom-28 w-96 h-96 opacity-60" />
        <div className="relative">
          <p className="font-en text-sm font-semibold tracking-[0.2em] uppercase text-mustard">Contact</p>
          <h2 className="font-head text-[26px] md:text-[36px] font-bold leading-snug mt-3">{title}</h2>
          <p className="mt-5 text-white/75 leading-[1.9]">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-mustard text-sumi font-bold hover:bg-white transition-colors">
              無料で相談する
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href='/flow' className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-white/40 font-bold hover:border-white transition-colors">
              ご相談の流れを見る
            </a>
          </div>
        </div>
        <img src={illust('flow-talk')} alt="" className="relative hidden md:block w-full max-w-[320px] justify-self-center rounded-full bg-cream p-4" loading="lazy" />
      </div>
    </div>
  </section>
);
