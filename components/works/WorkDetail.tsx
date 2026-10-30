import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { publishedWorks, serviceLinks } from './worksData';
import { metricAfter, serviceStyles, worryArtOf } from './serviceStyles';
import { ContactCta, PageHeader, comicBtn, comicBtnShape, comicIllust } from '../next/parts';
import { Caption, ComicHead, SfxText, panel, panelPress } from '../next/comic';

// 章の見出し：傾いたからし色の四角に章番号（Bangers）、英字の札、白ぶちの太い日本語
const ChapterHead: React.FC<{ no: string; en: string; title: string; tone: string }> = ({ no, en, title, tone }) => (
  <div className="pop-reveal flex items-end gap-4 mb-9">
    <span className="pop-wiggle grid place-items-center w-16 h-16 md:w-[72px] md:h-[72px] shrink-0 -rotate-6 bg-mustard border-[3px] border-[#111] shadow-[4px_4px_0_#111] font-comic text-[38px] md:text-[44px] leading-none text-white [paint-order:stroke_fill] [-webkit-text-stroke:5px_#111] select-none">
      {no}
    </span>
    <div className="min-w-0">
      <span className={`inline-block -rotate-2 border-[2.5px] border-[#111] px-2.5 pt-1 pb-0.5 font-comic text-[15px] leading-none tracking-[0.1em] uppercase text-white shadow-[2px_2px_0_#111] ${tone}`}>{en}</span>
      <h2 className="mt-2 font-manga [word-break:auto-phrase] text-[25px] md:text-[34px] text-[#111] leading-tight [paint-order:stroke_fill] [-webkit-text-stroke:5px_#fff] [text-shadow:3px_3px_0_#F2B544]">{title}</h2>
    </div>
  </div>
);

// 吹き出しの尾。right は右の辺から右向き（PC）、down は下の辺から下向き（スマホ）
const BubbleTail: React.FC<{ className: string }> = ({ className }) => (
  <svg viewBox="0 0 40 30" className={`absolute w-12 h-9 ${className}`} aria-hidden="true">
    <path d="M6 0 L26 28 L30 0" fill="#fff" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
    <rect x="3" y="-6" width="30" height="7" fill="#fff" />
  </svg>
);

const WorkDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const work = publishedWorks.find((w) => w.slug === slug);

  if (!work) {
    return (
      <div className="bg-[#FAF3E0] text-sumi min-h-screen overflow-x-clip">
        <Helmet>
          <title>ページが見つかりません | Arcle</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <PageHeader en="Works" title="ページが見つかりません" crumbs={[{ label: '支援モデルケース', href: '/works' }, { label: 'ページが見つかりません' }]} />
        <div className="max-w-6xl mx-auto px-4 sm:px-5 py-14">
          <a href="/works" className={`${comicBtn} bg-white text-[#111]`}>
            <ArrowLeft className="w-4 h-4" strokeWidth={3} />
            モデルケース一覧へ戻る
          </a>
        </div>
        <ContactCta />
      </div>
    );
  }

  const style = serviceStyles[work.service];
  const url = `https://www.arcle.net/works/${work.slug}`;
  // ほかのモデルケースは、同じサービスのものを先に並べる
  const others = publishedWorks
    .filter((w) => w.slug !== work.slug)
    .sort((a, b) => Number(b.service === work.service) - Number(a.service === work.service))
    .slice(0, 3);
  const profile: [string, string][] = [
    ['想定企業', work.client],
    ['業種', work.industry],
    ['規模', work.employees],
    ['地域', work.region],
    ['期間の目安', work.period]
  ];

  return (
    <article className="bg-[#FAF3E0] text-sumi min-h-screen overflow-x-clip">
      <Helmet>
        <title>{`${work.title} | 支援モデルケース - Arcle`}</title>
        <meta name="description" content={work.summary} />
        <link rel="canonical" href={url} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://www.arcle.net/' },
              { '@type': 'ListItem', position: 2, name: '支援モデルケース', item: 'https://www.arcle.net/works' },
              { '@type': 'ListItem', position: 3, name: work.title, item: url }
            ]
          })}
        </script>
      </Helmet>

      <PageHeader
        en={style.en}
        title={work.title}
        compact
        service={style.service}
        image={comicIllust(`svc-${style.service}`)}
        imageMode="panel"
        crumbs={[{ label: '支援モデルケース', href: '/works' }, { label: work.title }]}
        lead={<span className="block lg:max-w-[30rem]">{work.summary}</span>}
      />

      {/* 事業の札と注意書き */}
      <div className="comic-dots">
        <div className="max-w-6xl mx-auto px-4 sm:px-5 pt-14 pb-12 md:pt-16">
          <div className="pop-reveal relative max-w-3xl -rotate-[0.5deg] bg-mustard border-[3px] border-[#111] shadow-[5px_5px_0_#111] px-5 pt-8 pb-4 md:px-6">
            <span className={`absolute -top-4 left-4 -rotate-3 inline-flex border-[3px] border-[#111] px-3 py-1 font-manga text-[13px] text-white shadow-[3px_3px_0_#111] ${style.accent}`}>{work.service}</span>
            <Caption tone="bg-white text-[#111]" className="absolute -top-4 left-32 sm:left-36 rotate-2 font-comic tracking-[0.08em] text-[16px] md:text-[17px] leading-none pt-1.5 py-1">
              NOTE
            </Caption>
            <p className="text-sm font-bold text-[#111] leading-[1.9]">
              これは、よくあるご相談をもとに作成した架空のモデルケースです。企業名・数値は説明のためのもので、実在の企業や実績ではありません。
            </p>
          </div>

          {/* 効果の数字：BEFORE → AFTER の3コマ */}
          <section className="mt-14 md:mt-16 grid md:grid-cols-3 gap-8 md:gap-6">
            {work.metrics.map((metric, i) => (
              <div
                key={metric.label}
                className={`pop-reveal flex flex-col bg-white ${panel} ${i % 2 ? 'md:rotate-[0.8deg]' : 'md:-rotate-[0.8deg]'}`}
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <p className={`relative overflow-hidden border-b-[4px] border-[#111] px-5 py-3 font-manga text-[16px] leading-snug text-white ${style.accent}`}>
                  <span className="absolute inset-0 comic-dots-light" aria-hidden="true" />
                  <span className="relative [word-break:auto-phrase]">{metric.label}</span>
                </p>
                <div className="flex-1 flex items-end gap-3 flex-wrap px-5 pt-4 pb-5">
                  <div>
                    <p className="font-comic text-[14px] leading-none tracking-[0.12em] text-sumi-muted">BEFORE<span className="font-sans font-bold text-[11px] tracking-normal ml-1.5">現状</span></p>
                    <p className="mt-1 text-sm font-bold text-sumi-muted line-through decoration-2 decoration-[#111]/40">{metric.before}</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-[#111] shrink-0 mb-1" strokeWidth={3.5} />
                  <div className="min-w-0">
                    <p className={`font-comic text-[14px] leading-none tracking-[0.12em] ${style.text}`}>AFTER<span className="font-sans font-bold text-[11px] tracking-normal ml-1.5">想定</span></p>
                    <p className={`pop-wiggle mt-1.5 ${metricAfter(style.text, 'text-[28px] md:text-[30px]')}`}>{metric.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

      <div className="comic-dots">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 pt-16 md:pt-24 grid lg:grid-cols-[1fr_300px] gap-14 lg:gap-14">
        <div className="min-w-0 space-y-24 md:space-y-28">
          {/* 想定する状況：ナレーションの箱 */}
          <section>
            <ChapterHead no="01" en="Background" title="想定する状況" tone={style.accent} />
            <div className="space-y-7">
              {work.background.map((p, i) => (
                <div
                  key={p}
                  className={`pop-reveal relative bg-[#FCEBC0] border-[3px] border-[#111] shadow-[5px_5px_0_#111] px-5 py-5 md:px-7 ${i % 2 ? 'md:ml-8 rotate-[0.4deg]' : 'md:mr-8 -rotate-[0.4deg]'}`}
                >
                  {i === 0 && (
                    <span className="absolute -top-4 left-4 -rotate-2 border-[3px] border-[#111] bg-white px-3 pt-1 pb-0.5 font-comic text-[16px] leading-none tracking-[0.1em] text-[#111] shadow-[3px_3px_0_#111]">
                      MEANWHILE...
                    </span>
                  )}
                  <p className={`text-[#30343F] leading-8 ${i === 0 ? 'pt-2' : ''}`}>{p}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 導入前の課題：困っている場面のコマ＋課題のコマ */}
          <section>
            <ChapterHead no="02" en="Challenges" title="導入前の課題" tone="bg-coral" />
            <div className={`pop-reveal relative aspect-[2/1] overflow-hidden bg-[#111] ${panel} -rotate-[0.6deg] mb-10`}>
              <img src={comicIllust(worryArtOf(style.service))} alt="" className="absolute inset-0 w-full h-full object-cover object-[50%_38%]" loading="lazy" />
              <SfxText text="OH NO!" color="#F07A5A" className="right-[6%] bottom-[12%] text-[clamp(30px,7vw,52px)]" rotate={-10} delay={0.3} />
            </div>
            <div className="space-y-6">
              {work.challenges.map((c, i) => (
                <div key={c.title} style={{ animationDelay: `${i * 80}ms` }} className={`pop-reveal relative flex flex-col sm:flex-row gap-3 sm:gap-6 bg-white ${panel} p-6 pt-8 sm:pt-6`}>
                  <p className="self-start -rotate-3 border-[3px] border-[#111] bg-coral px-2.5 pt-1 pb-0.5 font-comic text-[18px] leading-none tracking-[0.06em] text-white shadow-[3px_3px_0_#111] shrink-0">TROUBLE #{i + 1}</p>
                  <div>
                    <h3 className="font-manga [word-break:auto-phrase] text-[18px] md:text-[21px] text-[#111] mb-2 leading-snug">{c.title}</h3>
                    <p className="text-sm text-[#30343F] leading-7">{c.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Arcleの支援内容：番号付きのコマを矢印でつなぐ */}
          <section>
            <ChapterHead no="03" en="Approach" title="Arcleの支援内容" tone={style.accent} />
            <ol className="space-y-0">
              {work.process.map((step, i) => (
                <li key={step.title} className="pop-reveal relative">
                  <div className={`relative bg-white ${panel} pt-9 pb-6 px-5 sm:px-7 sm:pl-[104px]`}>
                    <Caption className="absolute -top-4 left-4 sm:left-[104px] -rotate-2">{step.phase}</Caption>
                    <span className={`sm:absolute sm:left-0 sm:top-0 sm:bottom-0 sm:w-[78px] mb-3 sm:mb-0 inline-grid sm:grid place-items-center border-[3px] sm:border-0 sm:border-r-[4px] border-[#111] px-3 py-1 sm:p-0 text-white ${style.accent}`}>
                      <span className="flex sm:flex-col items-center gap-1.5 sm:gap-0 font-comic leading-none">
                        <span className="text-[13px] tracking-[0.18em]">STEP</span>
                        <span className="text-[26px] sm:text-[46px] [paint-order:stroke_fill] [-webkit-text-stroke:5px_#111]">{i + 1}</span>
                      </span>
                    </span>
                    <h3 className="font-manga [word-break:auto-phrase] text-[20px] md:text-[24px] text-[#111] mb-2 leading-snug">{step.title}</h3>
                    <p className="text-[#30343F] leading-7 mb-4">{step.detail}</p>
                    <ul className="border-[3px] border-[#111] bg-[#FAF3E0] comic-dots p-4 sm:p-5 space-y-2.5">
                      {step.tasks.map((task) => (
                        <li key={task} className="flex items-start gap-2.5 text-sm font-bold text-[#111] leading-6">
                          <span className={`shrink-0 mt-0.5 w-5 h-5 grid place-items-center border-2 border-[#111] text-white ${style.accent}`}>
                            <Check className="w-3 h-3" strokeWidth={4} aria-hidden="true" />
                          </span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {i < work.process.length - 1 && (
                    <svg viewBox="0 0 48 36" className="block mx-auto my-2 w-12 h-9" aria-hidden="true">
                      <path d="M10 2 H38 V14 H46 L24 34 L2 14 H10 Z" fill="#F2B544" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
                    </svg>
                  )}
                </li>
              ))}
            </ol>
          </section>

          {/* 想定される効果：喜ぶ場面のコマ＋効果のコマ */}
          <section>
            <ChapterHead no="04" en="Expected Results" title="想定される効果" tone={style.accent} />
            <div className={`pop-reveal relative aspect-[3/2] overflow-hidden bg-[#111] ${panel} rotate-[0.6deg] mb-10`}>
              <img src={comicIllust('works-articles-result')} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <SfxText text="HOORAY!" color="#F2B544" className="left-[4%] top-[6%] text-[clamp(28px,6vw,50px)]" rotate={-8} delay={0.3} />
            </div>
            <div className="space-y-6">
              {work.results.map((r, i) => (
                <div key={r.title} style={{ animationDelay: `${i * 80}ms` }} className={`pop-reveal flex gap-4 sm:gap-5 bg-white ${panel} p-6`}>
                  <span className={`shrink-0 grid place-items-center w-10 h-10 -rotate-6 border-[3px] border-[#111] text-white shadow-[3px_3px_0_#111] ${style.accent}`} aria-hidden="true">
                    <Check className="w-5 h-5" strokeWidth={4} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-manga [word-break:auto-phrase] text-[19px] md:text-[23px] text-[#111] mb-2 leading-snug">{r.title}</h3>
                    <p className="text-[#30343F] leading-7">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 支援のポイント：ヒーローの吹き出し */}
          <section className="pop-reveal relative grid sm:grid-cols-[1fr_170px] md:grid-cols-[1fr_210px] items-end gap-0 sm:gap-2">
            <div className="relative bg-white border-[3px] border-[#111] shadow-[5px_5px_0_#111] rounded-[36px] sm:rounded-[44px] px-6 pt-9 pb-7 md:px-9 md:pt-10 mb-12 sm:mb-20">
              <Caption className="absolute -top-4 left-6 -rotate-2">支援のポイント</Caption>
              <p className="text-[#111] font-bold leading-8">{work.point}</p>
              {/* 尾はヒーローに向ける：スマホは下の辺の右寄りから下へ、PCは右の辺から右へ */}
              <BubbleTail className="sm:hidden -bottom-[30px] right-[22%]" />
              <BubbleTail className="hidden sm:block top-[62%] -right-[38px] -rotate-90" />
            </div>
            {/* ヒーローは事業色の集中線のコマに入れ、頭だけ上の枠からはみ出させる */}
            <div className="relative justify-self-end w-[190px] sm:w-full aspect-square -mt-2 sm:mt-0 border-[4px] border-[#111] shadow-[6px_6px_0_#111] rotate-2 [clip-path:inset(-40%_-12px_-12px_-12px)]">
              <span className={`absolute inset-0 ${style.accent}`} aria-hidden="true" />
              <span className="absolute inset-0 comic-focus" aria-hidden="true" />
              <img
                src={comicIllust('works-articles-advice')}
                alt=""
                className="pop-tilt absolute bottom-0 left-1/2 -translate-x-1/2 w-[112%] max-w-none"
                loading="lazy"
              />
            </div>
          </section>
        </div>

        {/* サイドバー */}
        <aside className="lg:sticky lg:top-28 self-start space-y-10">
          <div className={`bg-white ${panel}`}>
            <p className="relative overflow-hidden bg-[#111] border-b-[4px] border-[#111] px-5 py-3">
              <span className="absolute inset-0 comic-dots-light" aria-hidden="true" />
              <span className="relative font-comic text-[24px] leading-none tracking-[0.1em] text-mustard">PROFILE</span>
            </p>
            <div className="p-5">
              <dl className="divide-y-2 divide-dashed divide-[#111]/20">
                {profile.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 py-3 text-sm">
                    <dt className="font-bold text-sumi-muted shrink-0">{label}</dt>
                    <dd className="text-[#111] font-bold text-right">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-xs font-bold text-sumi-muted mt-4 mb-2">利用するツール</p>
              <div className="flex flex-wrap gap-2">
                {work.tools.map((tool) => (
                  <span key={tool} className="text-xs font-bold px-2.5 py-1 bg-mustard/30 border-2 border-[#111]">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={`relative bg-sumi comic-dots-light text-white p-6 pt-9 ${panel} shadow-[8px_8px_0_#F2B544]`}>
            <Caption className="absolute -top-4 left-4 -rotate-2 font-comic tracking-[0.08em] text-[17px] leading-none pt-1.5">CALL ARCLE!</Caption>
            <p className="font-manga text-[20px] leading-snug mb-3 [word-break:auto-phrase]">同じようなお悩みはありませんか？</p>
            <p className="text-sm text-white/85 font-bold leading-relaxed mb-6">{work.cta ?? 'ご相談・お見積りは無料です。まずは現状をお聞かせください。'}</p>
            <a href="/contact" className={`group w-full ${comicBtnShape} px-5 py-3.5 bg-mustard text-[#111] text-[15px] shadow-[4px_4px_0_#111] hover:shadow-[1px_1px_0_#111]`}>
              無料で相談する
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" strokeWidth={3} />
            </a>
            <a
              href={serviceLinks[work.service]}
              className="flex items-center justify-center w-full mt-4 px-5 py-3 border-[3px] border-white text-sm font-bold text-white hover:bg-white hover:text-[#111] transition-colors"
            >
              {work.service}サービスを見る
            </a>
          </div>
        </aside>
      </div>
      </div>

      {/* その他のモデルケース */}
      {others.length > 0 && (
        <section className="mt-24 md:mt-28 py-20 md:py-24 bg-white comic-dots border-y-[4px] border-[#111]">
          <div className="max-w-6xl mx-auto px-4 sm:px-5">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <ComicHead en="MORE CASES" enTone={`${style.accent} text-white`} title="その他のモデルケース" />
              <div className="hidden md:block md:mb-16 shrink-0">
                <a href="/works" className={`${comicBtn} py-2.5 px-5 text-[14px] bg-white text-[#111]`}>
                  一覧を見る
                  <ArrowRight className="w-4 h-4" strokeWidth={3} />
                </a>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8 md:gap-7">
              {others.map((w, i) => {
                const s = serviceStyles[w.service];
                return (
                  <a
                    key={w.slug}
                    href={`/works/${w.slug}`}
                    className={`group pop-reveal flex flex-col bg-[#FAF3E0] p-6 ${panel} ${panelPress}`}
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    <span className={`pop-wiggle self-start -rotate-3 text-xs font-manga px-3 py-1 text-white border-[3px] border-[#111] mb-4 ${s.accent}`}>{w.service}</span>
                    <h3 className="font-manga [word-break:auto-phrase] text-[18px] md:text-[19px] text-[#111] leading-snug mb-4 flex-1 group-hover:underline decoration-2 underline-offset-4">{w.title}</h3>
                    <p className="text-xs font-bold text-sumi-muted">
                      {w.client} / {w.employees}
                    </p>
                  </a>
                );
              })}
            </div>
            <a href="/works" className={`md:hidden mt-10 ${comicBtn} py-3 px-5 text-[14px] bg-white text-[#111]`}>
              <ArrowLeft className="w-4 h-4" strokeWidth={3} />
              モデルケース一覧へ戻る
            </a>
          </div>
        </section>
      )}
      <ContactCta
        title="同じようなお悩みはありませんか？"
        body={work.cta ?? 'ご相談・お見積りは無料です。まずは現状をお聞かせください。'}
      />
    </article>
  );
};

export default WorkDetail;
