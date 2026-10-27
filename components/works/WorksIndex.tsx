import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Building2, MapPin, Users } from 'lucide-react';
import { publishedWorks, type WorkService } from './worksData';
import { serviceStyles } from './serviceStyles';
import { ContactCta, PageHeader } from '../next/parts';

const filters: ('すべて' | WorkService)[] = ['すべて', '情シス代行', 'データ活用', '生成AI', 'Web制作'];

const WorksIndex: React.FC = () => {
  const [filter, setFilter] = useState<(typeof filters)[number]>('すべて');
  const visibleFilters = filters.filter((f) => f === 'すべて' || publishedWorks.some((w) => w.service === f));
  const works = filter === 'すべて' ? publishedWorks : publishedWorks.filter((w) => w.service === filter);

  return (
    <div className="bg-cream text-sumi min-h-screen">
      <Helmet>
        <title>支援モデルケース | Arcle</title>
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
      <div className="max-w-6xl mx-auto px-5">
        <p className="max-w-3xl rounded-[24px] border border-mustard/40 bg-mustard/15 px-6 py-5 text-sm text-sumi-muted leading-[1.9]">
          掲載しているのは、よくあるご相談をもとに作成した架空のモデルケースです。企業名・数値は説明のためのもので、実在の企業や実績ではありません。効果はお客様の状況により異なります。
        </p>
      </div>

      {/* Filter */}
      {visibleFilters.length > 2 && (
        <section className="mt-10 border-y border-warm-line bg-cream-dark">
          <div className="max-w-6xl mx-auto px-5">
            <div className="flex gap-2 py-3 overflow-x-auto" role="tablist" aria-label="サービスで絞り込む">
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
                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      active ? (f === 'すべて' ? 'bg-sumi text-white' : `${serviceStyles[f].accent} text-white`) : (f === 'すべて' ? 'bg-white text-sumi-muted hover:bg-cream' : `${serviceStyles[f].badge} hover:opacity-80`)
                    }`}
                  >
                    {f}
                    <span className={`ml-2 text-xs ${active ? 'text-white/75' : 'text-sumi-muted'}`}>{count}</span>
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
            <div className="grid md:grid-cols-2 gap-8">
              {works.map((work) => {
                const style = serviceStyles[work.service];
                const Icon = style.icon;
                const metric = work.metrics[0];
                return (
                  <a
                    key={work.slug}
                    href={`/works/${work.slug}`}
                    className="group flex flex-col rounded-[28px] border border-warm-line overflow-hidden bg-white hover:shadow-[0_16px_40px_rgb(31_36_48/0.08)] hover:-translate-y-1 hover:border-warm-line transition-all duration-300"
                  >
                    <div className={`relative px-8 pt-8 pb-6 ${style.panel}`}>
                      <span className={`absolute right-6 top-6 grid w-14 h-14 place-items-center rounded-full ${style.panel}`} aria-hidden="true"><Icon className={`w-7 h-7 ${style.text}`} /></span>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${style.badge}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {work.service}
                      </span>
                      <span className="ml-2 text-xs text-sumi-muted">モデルケース</span>
                      <p className="mt-6 text-xs text-sumi-muted">{metric.label}（想定）</p>
                      <p className="mt-1 flex items-baseline gap-3 flex-wrap">
                        <span className="text-sm text-sumi-muted">{metric.before}</span>
                        <ArrowRight className="w-4 h-4 text-sumi-muted self-center" />
                        <span className={`text-3xl font-bold ${style.text}`}>{metric.after}</span>
                      </p>
                    </div>
                    <div className="flex flex-col flex-1 px-8 py-6">
                      <h2 className="font-head [word-break:auto-phrase] text-xl font-bold text-sumi leading-snug mb-3">{work.title}</h2>
                      <p className="text-sm text-sumi-muted leading-relaxed mb-6 line-clamp-3">{work.summary}</p>
                      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-sumi-muted border-t border-warm-line pt-4">
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
                        <span className="ml-auto inline-flex items-center font-medium text-sumi">
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

      <ContactCta
        title="同じようなお悩みはありませんか？"
        body="「何から手をつければいいか分からない」という段階でも大丈夫です。現状をお聞きしたうえで、進め方をご提案します。ご相談・お見積りは無料です。"
      />
    </div>
  );
};

export default WorksIndex;
