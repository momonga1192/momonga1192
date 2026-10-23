import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Building2, MapPin, Users } from 'lucide-react';
import { publishedWorks, type WorkService } from './worksData';
import { serviceStyles } from './serviceStyles';

const filters: ('すべて' | WorkService)[] = ['すべて', '情シス代行', 'データ活用', '生成AI', 'Web制作'];

const WorksIndex: React.FC = () => {
  const [filter, setFilter] = useState<(typeof filters)[number]>('すべて');
  const visibleFilters = filters.filter((f) => f === 'すべて' || publishedWorks.some((w) => w.service === f));
  const works = filter === 'すべて' ? publishedWorks : publishedWorks.filter((w) => w.service === filter);

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <Helmet>
        <title>支援モデルケース | Arcle</title>
        <meta
          name="description"
          content="Arcleの支援モデルケースです。中小企業によくある情シス・データ活用・生成AI・Web制作のご相談をもとに、課題の背景から支援の流れ、想定される効果までを紹介します。"
        />
        <link rel="canonical" href="https://www.arcle.net/works" />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-16 pb-12 md:pt-24 md:pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-50/80 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="container mx-auto px-6 max-w-6xl relative">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-en font-semibold tracking-widest uppercase mb-6 border border-blue-100">
            Works
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">支援モデルケース</h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            よくあるご相談をもとに、Arcleならどのように支援するかをまとめました。
            <br className="hidden md:block" />
            課題の背景から支援の流れ、想定される効果までをご紹介します。
          </p>
          <p className="mt-8 max-w-3xl rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900 leading-relaxed">
            掲載しているのは、よくあるご相談をもとに作成した架空のモデルケースです。企業名・数値は説明のためのもので、実在の企業や実績ではありません。効果はお客様の状況により異なります。
          </p>
        </div>
      </section>

      {/* Filter */}
      {visibleFilters.length > 2 && (
        <section className="sticky top-[64px] z-20 bg-white/90 backdrop-blur-md border-y border-gray-100">
          <div className="container mx-auto px-6 max-w-6xl">
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
                      active ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {f}
                    <span className={`ml-2 text-xs ${active ? 'text-gray-300' : 'text-gray-400'}`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Cards */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          {works.length === 0 ? (
            <p className="text-gray-500 py-16 text-center">モデルケースは準備中です。</p>
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
                    className="group flex flex-col rounded-3xl border border-gray-200 overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 hover:border-gray-300 transition-all duration-300"
                  >
                    <div className={`relative px-8 pt-8 pb-6 bg-gradient-to-br ${style.panel}`}>
                      <Icon className={`absolute right-6 top-6 w-16 h-16 opacity-15 ${style.text}`} />
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${style.badge}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {work.service}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">モデルケース</span>
                      <p className="mt-6 text-xs text-gray-500">{metric.label}（想定）</p>
                      <p className="mt-1 flex items-baseline gap-3 flex-wrap">
                        <span className="text-sm text-gray-400">{metric.before}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 self-center" />
                        <span className={`text-3xl font-bold ${style.text}`}>{metric.after}</span>
                      </p>
                    </div>
                    <div className="flex flex-col flex-1 px-8 py-6">
                      <h2 className="text-xl font-bold text-gray-900 leading-snug mb-3">{work.title}</h2>
                      <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">{work.summary}</p>
                      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 border-t border-gray-100 pt-4">
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
                        <span className="ml-auto inline-flex items-center font-medium text-gray-900">
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

      {/* CTA */}
      <section className="pb-8">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="rounded-3xl bg-gray-900 text-white px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">同じようなお悩みはありませんか？</h2>
              <p className="text-gray-400 leading-relaxed">
                「何から手をつければいいか分からない」という段階でも大丈夫です。
                <br className="hidden md:block" />
                現状をお聞きしたうえで、進め方をご提案します。ご相談・お見積りは無料です。
              </p>
            </div>
            <a
              href="/contact"
              className="group shrink-0 inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-blue-50 transition-colors"
            >
              無料で相談する
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorksIndex;
