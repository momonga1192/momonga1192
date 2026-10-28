import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { publishedWorks, serviceLinks } from './worksData';
import { serviceStyles } from './serviceStyles';
import { ContactCta, PageHeader, card, press } from '../next/parts';
import { illust } from '../next/theme';

const SectionHeading: React.FC<{ no: string; en: string; title: string }> = ({ no, en, title }) => (
  <div className="group pop-reveal flex items-end gap-4 mb-8">
    <span className="pop-wiggle grid place-items-center w-16 h-16 shrink-0 -rotate-6 rounded-2xl bg-mustard font-en text-3xl font-black italic text-sumi border-[2.5px] border-sumi shadow-[3px_3px_0_#1E9C8C] select-none">{no}</span>
    <div>
      <p className="font-en text-xs font-black italic tracking-widest uppercase text-sumi-muted mb-1">{en}</p>
      <h2 className="font-head [word-break:auto-phrase] text-[26px] md:text-4xl font-black text-sumi leading-tight">{title}</h2>
    </div>
  </div>
);

const WorkDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const work = publishedWorks.find((w) => w.slug === slug);

  if (!work) {
    return (
      <div className="bg-cream text-sumi min-h-screen">
        <Helmet>
          <title>ページが見つかりません | Arcle</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <PageHeader en="Works" title="ページが見つかりません" crumbs={[{ label: '支援モデルケース', href: '/works' }, { label: 'ページが見つかりません' }]} />
        <div className="max-w-6xl mx-auto px-5 py-10">
          
          <a href="/works" className="text-svc-josys hover:text-sumi underline">
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
    <article className="bg-cream text-sumi min-h-screen">
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
        image={illust(`svc-${style.service}`)}
        crumbs={[{ label: '支援モデルケース', href: '/works' }, { label: work.title }]}
        lead={work.summary}
      />
      <div className="max-w-6xl mx-auto px-5 pt-12 pb-10">
        <span className={`inline-flex -rotate-3 text-xs font-bold px-3 py-1 rounded-lg text-white border-2 border-sumi ${style.accent}`}>{work.service}</span>
        <p className="mt-6 max-w-3xl -rotate-[0.5deg] rounded-[24px] border-2 border-sumi bg-mustard/25 px-6 py-5 text-sm text-sumi leading-[1.9] shadow-[4px_4px_0_#1F2430]">
          これは、よくあるご相談をもとに作成した架空のモデルケースです。企業名・数値は説明のためのもので、実在の企業や実績ではありません。
        </p>
      </div>

      {/* Metrics */}
      <section className="max-w-6xl mx-auto px-5 relative">
        <div className="grid md:grid-cols-3 gap-6">
          {work.metrics.map((metric, i) => (
            <div key={metric.label} className={`group pop-reveal rounded-[28px] bg-white p-6 ${card}`} style={{ animationDelay: `${i * 90}ms` }}>
              <p className="font-head text-base font-black text-sumi mb-4">{metric.label}</p>
              <div className="flex items-end gap-3 flex-wrap">
                <div>
                  <p className="font-en text-[10px] tracking-widest uppercase text-sumi-muted">現状</p>
                  <p className="text-sm text-sumi-muted line-through decoration-2 decoration-sumi/40">{metric.before}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-sumi shrink-0 mb-1" strokeWidth={3} />
                <div>
                  <p className={`font-en text-[10px] tracking-widest uppercase ${style.text}`}>想定</p>
                  <p className={`pop-wiggle font-en text-[34px] leading-none font-black italic ${style.text}`}>{metric.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 mt-16 md:mt-24 grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">
        <div className="min-w-0 space-y-20 md:space-y-24">
          {/* Background */}
          <section>
            <SectionHeading no="01" en="Background" title="想定する状況" />
            <div className="space-y-5 text-sumi-muted leading-8">
              {work.background.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>

          {/* Challenges */}
          <section>
            <SectionHeading no="02" en="Challenges" title="導入前の課題" />
            <div className="space-y-4">
              {work.challenges.map((c, i) => (
                <div key={c.title} style={{ animationDelay: `${i * 80}ms` }} className="group pop-reveal flex flex-col sm:flex-row gap-3 sm:gap-6 rounded-[28px] bg-white border-[2.5px] border-sumi shadow-[4px_4px_0_#1F2430] p-6">
                  <p className="pop-wiggle self-start -rotate-3 rounded-lg bg-coral px-2 py-0.5 font-en text-xs font-black italic text-white border-2 border-sumi shrink-0">Issue {i + 1}</p>
                  <div>
                    <h3 className="font-head [word-break:auto-phrase] text-lg md:text-xl font-black text-sumi mb-2 leading-snug">{c.title}</h3>
                    <p className="text-sm text-sumi-muted leading-7">{c.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Process */}
          <section>
            <SectionHeading no="03" en="Approach" title="Arcleの支援内容" />
            <ol>
              {work.process.map((step, i) => (
                <li key={step.title} className="group pop-reveal relative pl-12 pb-12 last:pb-0">
                  {i < work.process.length - 1 && (
                    <span className="absolute left-[17px] top-10 bottom-0 border-l-[2.5px] border-dashed border-sumi" aria-hidden="true" />
                  )}
                  <span className={`pop-wiggle absolute left-0 top-0 w-9 h-9 -rotate-6 rounded-xl ${style.accent} text-white font-en text-base font-black italic flex items-center justify-center border-2 border-sumi shadow-[2px_2px_0_#1F2430]`}>
                    {i + 1}
                  </span>
                  <p className={`text-xs font-bold mb-1 ${style.text}`}>{step.phase}</p>
                  <h3 className="font-head [word-break:auto-phrase] text-xl md:text-2xl font-black text-sumi mb-2 leading-snug">{step.title}</h3>
                  <p className="text-sumi-muted leading-7 mb-4">{step.detail}</p>
                  <ul className="rounded-[24px] border-2 border-sumi bg-white p-5 space-y-2">
                    {step.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2 text-sm text-sumi-muted leading-6">
                        <CheckCircle2 className={`w-4 h-4 mt-1 shrink-0 ${style.text}`} />
                        {task}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>

          {/* Results */}
          <section>
            <SectionHeading no="04" en="Expected Results" title="想定される効果" />
            <div className="space-y-4">
              {work.results.map((r, i) => (
                <div key={r.title} style={{ animationDelay: `${i * 80}ms` }} className="pop-reveal flex gap-5 rounded-[28px] border-[2.5px] border-sumi shadow-[4px_4px_0_#1F2430] bg-white p-6">
                  <span className={`w-2 shrink-0 rounded-full border-2 border-sumi ${style.accent}`} aria-hidden="true" />
                  <div>
                    <h3 className="font-head [word-break:auto-phrase] text-xl md:text-2xl font-black text-sumi mb-2 leading-snug">{r.title}</h3>
                    <p className="text-sumi-muted leading-7">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Point */}
          <section className="pop-reveal flex gap-5 items-start">
            <div className="pop-float w-14 h-14 shrink-0 -rotate-6 rounded-full bg-sumi text-white font-en text-xl font-black italic flex items-center justify-center border-[2.5px] border-sumi shadow-[3px_3px_0_#F2B544]">
              A
            </div>
            <div className="rounded-[28px] rounded-tl-none bg-white border-[2.5px] border-sumi shadow-[4px_4px_0_#1F2430] p-6">
              <p className="font-head text-lg font-black text-sumi mb-2">支援のポイント</p>
              <p className="text-sumi-muted leading-8">{work.point}</p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 self-start space-y-6">
          <div className={`rounded-[28px] bg-white p-6 ${card}`}>
            <p className="mb-4"><span className="inline-block -rotate-3 rounded-lg bg-mustard px-2.5 py-0.5 font-en text-xs font-black italic tracking-widest uppercase text-sumi shadow-[2px_2px_0_#1E9C8C]">Profile</span></p>
            <dl className="divide-y-2 divide-dashed divide-warm-line">
              {profile.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 py-3 text-sm">
                  <dt className="text-sumi-muted shrink-0">{label}</dt>
                  <dd className="text-sumi font-medium text-right">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs text-sumi-muted mt-4 mb-2">利用するツール</p>
            <div className="flex flex-wrap gap-2">
              {work.tools.map((tool) => (
                <span key={tool} className="text-xs font-bold px-2.5 py-1 rounded-full bg-cream border-2 border-sumi">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className={`rounded-[28px] bg-sumi text-white p-6 bg-[radial-gradient(circle_at_10%_100%,rgb(30_156_140/0.55),transparent_55%)] ${card}`}>
            <p className="font-head text-xl font-black leading-snug mb-2">同じようなお悩みはありませんか？</p>
            <p className="text-sm text-white/75 leading-relaxed mb-5">
              {work.cta ?? 'ご相談・お見積りは無料です。まずは現状をお聞かせください。'}
            </p>
            <a
              href="/contact"
              className="group flex items-center justify-center w-full px-5 py-3 bg-mustard text-sumi rounded-full text-sm font-black border-2 border-sumi shadow-[3px_3px_0_#1E9C8C] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#1E9C8C]"
            >
              無料で相談する
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={serviceLinks[work.service]}
              className="flex items-center justify-center w-full mt-3 px-5 py-3 border-2 border-white/40 rounded-full text-sm text-white/75 hover:border-white hover:text-white transition-colors"
            >
              {work.service}サービスを見る
            </a>
          </div>
        </aside>
      </div>

      {/* Other works */}
      {others.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 mt-24 pt-16 border-t-2 border-dashed border-sumi/30">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-head [word-break:auto-phrase] text-[26px] md:text-4xl font-black text-sumi">その他のモデルケース</h2>
            <a href="/works" className="hidden md:inline-flex items-center text-sm font-bold text-sumi hover:underline">
              一覧を見る
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {others.map((w, i) => {
              const s = serviceStyles[w.service];
              return (
                <a
                  key={w.slug}
                  href={`/works/${w.slug}`}
                  className={`group pop-reveal rounded-[28px] bg-white p-6 ${card} ${press}`}
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <span className={`pop-wiggle inline-block -rotate-3 text-xs font-bold px-3 py-1 rounded-lg text-white border-2 border-sumi mb-4 ${s.accent}`}>{w.service}</span>
                  <h3 className="font-head [word-break:auto-phrase] text-lg md:text-xl font-black text-sumi leading-snug mb-3 group-hover:underline">{w.title}</h3>
                  <p className="text-xs text-sumi-muted">
                    {w.client} / {w.employees}
                  </p>
                </a>
              );
            })}
          </div>
          <a href="/works" className="md:hidden mt-8 inline-flex items-center text-sm font-medium text-sumi-muted">
            <ArrowLeft className="w-4 h-4 mr-1" />
            モデルケース一覧へ戻る
          </a>
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
