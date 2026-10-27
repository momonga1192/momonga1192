import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Building2, MapPin, Users } from 'lucide-react';
import { publishedWorks, type WorkService } from './worksData';
import { serviceStyles } from './serviceStyles';
import { ContactCta, PageHeader, Ticker, card, press } from '../next/parts';
import { services } from '../next/theme';

const filters: ('すべて' | WorkService)[] = ['すべて', '情シス代行', 'データ活用', '生成AI', 'Web制作'];

const WorksIndex: React.FC = () => {
  const [filter, setFilter] = useState<(typeof filters)[number]>('すべて');
  const visibleFilters = filters.filter((f) => f === 'すべて' || publishedWorks.some((w) => w.service === f));
  const works = filter === 'すべて' ? publishedWorks : publishedWorks.filter((w) => w.service === filter);

  return (
    <div className="bg-cream text-sumi min-h-screen overflow-x-clip">
      <Helmet>
        <title>支援モデルケース | 中小企業のIT・データ・AI・Web活用 - Arcle</title>
        <meta
          name="description"
          content="Arcleの支援モデルケースです。中小企業によくある情シス・データ活用・生成AI・Web制作のご相談をもとに、課題の背景から支援の流れ、想定される効果までを紹介します。"
        />
        <link rel="canonical" href="https://www.arcle.net/works" />
      </Helmet>

      <PageHeader
        en="Works"
        title="支援モデルケース"
        crumbs={[{ label: '支援モデルケース' }]}
        lead={<>よくあるご相談をもとに、Arcleならどのように支援するかをまとめました。<br className="hidden md:block" />課題の背景から支援の流れ、想定される効果までをご紹介します。</>}
      />
      <div className="max-w-6xl mx-auto px-5 pt-12">
        <p className="max-w-3xl -rotate-[0.5deg] rounded-[24px] border-2 border-sumi bg-mustard/25 px-6 py-5 text-sm text-sumi leading-[1.9] shadow-[4px_4px_0_#1F2430]">
          掲載しているのは、よくあるご相談をもとに作成した架空のモデルケースです。企業名・数値は説明のためのもので、実在の企業や実績ではありません。効果はお客様の状況により異なります。
        </p>
      </div>

      {/* Filter */}
      {visibleFilters.length > 2 && (
        <section className="mt-12 border-y-[2.5px] border-sumi bg-white">
          <div className="max-w-6xl mx-auto px-5">
            <div className="flex gap-3 py-4 overflow-x-auto" role="tablist" aria-label="サービスで絞り込む">
              {visibleFilters.map((f) => {
                const count = f === 'すべて' ? publishedWorks.length : publishedWorks.filter((w) => w.service === f).length;
                const active = filter === f;
                return (
                  <button
                    key={f}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(f)}
                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold border-2 border-sumi transition-all ${
                      active
                        ? `${f === 'すべて' ? 'bg-sumi' : serviceStyles[f].accent} text-white shadow-[3px_3px_0_#F2B544]`
                        : 'bg-cream text-sumi hover:bg-white shadow-[3px_3px_0_#1F2430] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#1F2430]'
                    }`}
                  >
                    {f}
                    <span className={`ml-2 text-xs font-en font-black ${active ? 'text-white/80' : 'text-sumi-muted'}`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Cards */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-5">
          {works.length === 0 ? (
            <p className="text-sumi-muted py-16 text-center">モデルケースは準備中です。</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-10">
              {works.map((work, i) => {
                const style = serviceStyles[work.service];
                const Icon = style.icon;
                const metric = work.metrics[0];
                return (
                  <a
                    key={work.slug}
                    href={`/works/${work.slug}`}
                    className={`group pop-reveal flex flex-col rounded-[28px] overflow-hidden bg-white ${card} ${press}`}
                    style={{ animationDelay: `${(i % 2) * 100}ms` }}
                  >
                    <div className={`relative px-8 pt-8 pb-6 border-b-[2.5px] border-sumi ${style.panel}`}>
                      <span className={`pop-wiggle inline-flex items-center gap-1.5 -rotate-3 text-xs font-bold px-3 py-1 rounded-lg text-white border-2 border-sumi ${style.accent}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {work.service}
                      </span>
                      <span className="ml-2 text-xs text-sumi-muted">モデルケース</span>
                      <p className="mt-6 text-sm font-bold text-sumi">{metric.label}<span className="font-normal text-sumi-muted">（想定）</span></p>
                      <p className="mt-2 flex items-center gap-3 flex-wrap">
                        <span className="text-base text-sumi-muted line-through decoration-2 decoration-sumi/40">{metric.before}</span>
                        <ArrowRight className="w-5 h-5 text-sumi" strokeWidth={3} />
                        <span className={`pop-wiggle inline-block font-en text-[40px] md:text-5xl leading-none font-black italic ${style.text}`}>{metric.after}</span>
                      </p>
                    </div>
                    <div className="flex flex-col flex-1 px-8 py-6">
                      <h2 className="font-head [word-break:auto-phrase] text-xl md:text-2xl font-black text-sumi leading-snug mb-3">{work.title}</h2>
                      <p className="text-sm text-sumi-muted leading-relaxed mb-6 line-clamp-3">{work.summary}</p>
                      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-sumi-muted border-t-2 border-dashed border-warm-line pt-4">
                        <span className="inline-flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" />
                          {work.client}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {work.employees}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {work.region}
                        </span>
                        <span className="ml-auto inline-flex items-center font-bold text-sumi">
                          詳しく見る
                          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Ticker items={[...services.map((s) => s.name), 'ご相談・お見積り無料']} />

      <ContactCta
        title="同じようなお悩みはありませんか？"
        body="「何から手をつければいいか分からない」という段階でも大丈夫です。現状をお聞きしたうえで、進め方をご提案します。ご相談・お見積りは無料です。"
      />
    </div>
  );
};

export default WorksIndex;
