import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Building2, MapPin, Users } from 'lucide-react';
import { publishedWorks, type WorkService } from './worksData';
import { caseArt, metricAfter, serviceStyles } from './serviceStyles';
import { ContactCta, PageHeader, Ticker, comicIllust } from '../next/parts';
import { Caption, panel, panelPress } from '../next/comic';
import { services } from '../next/theme';

const filters: ('すべて' | WorkService)[] = ['すべて', '情シス代行', 'データ活用', '生成AI', 'Web制作'];

// 支援事例の一覧（アメコミ版）。1件ずつ「事件ファイル」の表紙のようなコマにする
const WorksIndex: React.FC = () => {
  const [filter, setFilter] = useState<(typeof filters)[number]>('すべて');
  const visibleFilters = filters.filter((f) => f === 'すべて' || publishedWorks.some((w) => w.service === f));
  const works = filter === 'すべて' ? publishedWorks : publishedWorks.filter((w) => w.service === filter);

  return (
    <div className="bg-[#FAF3E0] text-sumi min-h-screen overflow-x-clip">
      <Helmet>
        <title>支援事例 | 中小企業のIT・データ・AI・Web活用 - Arcle</title>
        <meta
          name="description"
          content="Arcleの支援事例です。中小企業の情シス・データ活用・生成AI・Web制作について、課題の背景から支援の流れまでを紹介します。"
        />
        <link rel="canonical" href="https://www.arcle.net/works" />
      </Helmet>

      <PageHeader
        en="Case Files"
        title="支援事例"
        crumbs={[{ label: '支援事例' }]}
        image={comicIllust('works-articles-works-header')}
        imageMode="panel"
        lead={<span className="block lg:max-w-[30rem]">中小企業の課題に、Arcleがどのように取り組んだかをまとめました。<br className="hidden md:block" />課題の背景から具体的な支援内容までをご紹介します。</span>}
      />

      <section className="comic-dots pt-14 md:pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-5">
          {/* 注意書き：黄色のナレーションの箱 */}
          <div className="pop-reveal relative max-w-3xl -rotate-[0.5deg] bg-mustard border-[3px] border-[#111] shadow-[5px_5px_0_#111] px-5 pt-7 pb-4 md:px-6">
            <Caption tone="bg-white text-[#111]" className="absolute -top-4 left-4 -rotate-2 font-comic tracking-[0.08em] text-[17px] md:text-[18px] leading-none pt-1.5">
              NOTE
            </Caption>
            <p className="text-sm font-bold text-[#111] leading-[1.9]">
              実際の支援をもとに、企業の特定や機密情報の開示を避けるため、一部情報を加工しています。効果はお客様の状況により異なります。
            </p>
          </div>

          {/* 絞り込み：太線の四角い札 */}
          {visibleFilters.length > 2 && (
            <div className="mt-12 flex flex-wrap gap-3" role="tablist" aria-label="サービスで絞り込む">
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
                    className={`shrink-0 inline-flex items-center border-[3px] border-[#111] px-4 py-2 font-manga text-[14px] transition-all ${
                      active
                        ? `${f === 'すべて' ? 'bg-[#111]' : serviceStyles[f].accent} text-white -rotate-2 shadow-[4px_4px_0_#F2B544]`
                        : 'bg-white text-[#111] shadow-[4px_4px_0_#111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#111] hover:bg-mustard/30'
                    }`}
                  >
                    {f}
                    <span className={`ml-2 font-comic text-[19px] leading-none tracking-[0.04em] ${active ? 'text-mustard' : 'text-sumi-muted'}`}>{count}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 事件ファイルのコマ */}
      <section className="comic-dots pt-12 pb-20 md:pt-14 md:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-5">
          {works.length === 0 ? (
            <p className="text-sumi-muted py-16 text-center">支援事例は準備中です。</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-10 md:gap-x-10 md:gap-y-14">
              {works.map((work, i) => {
                const style = serviceStyles[work.service];
                const Icon = style.icon;
                const metric = work.metrics[0];
                return (
                  <a
                    key={work.slug}
                    href={`/works/${work.slug}`}
                    className={`group pop-reveal relative flex flex-col bg-white ${panel} ${panelPress} ${i % 2 ? 'md:rotate-[0.6deg]' : 'md:-rotate-[0.6deg]'}`}
                    style={{ animationDelay: `${(i % 2) * 100}ms` }}
                  >
                    {/* 表紙の絵と号数ラベル */}
                    <div className="relative aspect-[16/9] md:aspect-[16/8] border-b-[4px] border-[#111] overflow-hidden bg-[#111]">
                      <img
                        src={comicIllust(caseArt(style.service, i))}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover object-[50%_30%] transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className={`absolute left-3 top-3 -rotate-3 flex flex-col items-center border-[3px] border-[#111] px-3 pt-1 pb-0.5 font-comic leading-none text-white shadow-[3px_3px_0_#111] ${style.accent}`}>
                        <span className="text-[11px] tracking-[0.2em]">CASE</span>
                        <span className="text-[28px] [text-shadow:2px_2px_0_#111]">No.{String(i + 1).padStart(2, '0')}</span>
                      </span>
                      <span className={`absolute right-3 top-3 rotate-2 inline-flex items-center gap-1.5 border-[3px] border-[#111] bg-white px-2.5 py-1 font-manga text-xs text-[#111] shadow-[3px_3px_0_#111]`}>
                        <Icon className={`w-3.5 h-3.5 ${style.text}`} strokeWidth={2.5} />
                        {work.service}
                        <span className="font-sans font-bold text-sumi-muted">支援事例</span>
                      </span>
                    </div>

                    {/* 効果の札：絵の下の辺にまたがせる */}
                    <div className="relative -mt-9 px-4 sm:px-6">
                      <div className={`inline-block max-w-full bg-white border-[3px] border-[#111] px-4 py-3 shadow-[5px_5px_0_#111] ${i % 2 ? 'rotate-1' : '-rotate-1'}`}>
                        <p className="text-xs font-bold text-[#111]">
                          {metric.label}
                          <span className="font-normal text-sumi-muted">（想定）</span>
                        </p>
                        <p className="mt-1.5 flex items-center gap-x-2.5 gap-y-1 flex-wrap">
                          <span className="text-sm font-bold text-sumi-muted line-through decoration-2 decoration-[#111]/40">{metric.before}</span>
                          <ArrowRight className="w-5 h-5 text-[#111] shrink-0" strokeWidth={3} />
                          <span className={metricAfter(style.text, 'text-[28px] md:text-[34px]')}>{metric.after}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col flex-1 px-5 sm:px-7 pt-5 pb-6">
                      <h2 className="font-manga [word-break:auto-phrase] text-[20px] md:text-[23px] text-[#111] leading-[1.45] mb-3">{work.title}</h2>
                      <p className="text-sm text-[#30343F] leading-[1.9] mb-6 line-clamp-3">{work.summary}</p>
                      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-sumi-muted border-t-[3px] border-dashed border-[#111]/25 pt-4">
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
                        <span className={`ml-auto inline-flex items-center gap-1 border-[3px] border-[#111] px-3 py-1 font-manga text-[13px] text-white shadow-[3px_3px_0_#111] ${style.accent}`}>
                          詳しく見る
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" strokeWidth={3} />
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
