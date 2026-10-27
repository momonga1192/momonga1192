import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { publishedWorks, serviceLinks } from './worksData';
import { serviceStyles } from './serviceStyles';
import { ContactCta, PageHeader } from '../next/parts';

const SectionHeading: React.FC<{ no: string; en: string; title: string }> = ({ no, en, title }) => (
  <div className="flex items-end gap-4 mb-8">
    <span className="font-en text-5xl font-bold text-mustard leading-none select-none">{no}</span>
    <div>
      <p className="font-en text-xs font-bold tracking-widest uppercase text-sumi-muted mb-1">{en}</p>
      <h2 className="font-head [word-break:auto-phrase] text-2xl md:text-3xl font-bold text-sumi">{title}</h2>
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
  const others = publishedWorks.filter((w) => w.slug !== work.slug).slice(0, 3);
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
        service={style.service}
        crumbs={[{ label: '支援モデルケース', href: '/works' }, { label: work.title }]}
        lead={work.summary}
      />
      <div className="max-w-6xl mx-auto px-5 pb-10">
        <span className={`inline-flex text-xs font-bold px-3 py-1 rounded-full border ${style.badge}`}>{work.service}</span>
        <p className="mt-6 max-w-3xl rounded-[24px] border border-mustard/40 bg-mustard/15 px-6 py-5 text-sm text-sumi-muted leading-[1.9]">
          これは、よくあるご相談をもとに作成した架空のモデルケースです。企業名・数値は説明のためのもので、実在の企業や実績ではありません。
        </p>
      </div>

      {/* Metrics */}
      <section className="max-w-6xl mx-auto px-5 relative">
        <div className="grid md:grid-cols-3 gap-4">
          {work.metrics.map((metric) => (
            <div key={metric.label} className="rounded-[28px] bg-white border border-warm-line shadow-[0_16px_40px_rgb(31_36_48/0.08)] p-6">
              <p className="text-xs font-bold text-sumi-muted mb-4">{metric.label}</p>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-en text-[10px] tracking-widest uppercase text-sumi-muted">現状</p>
                  <p className="text-sm text-sumi-muted">{metric.before}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-sumi-muted shrink-0" />
                <div>
                  <p className={`font-en text-[10px] tracking-widest uppercase ${style.text}`}>想定</p>
                  <p className={`text-2xl font-bold ${style.text}`}>{metric.after}</p>
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
                <div key={c.title} className="flex flex-col sm:flex-row gap-3 sm:gap-6 rounded-[28px] bg-white border border-warm-line p-6">
                  <p className="font-en text-xs font-bold text-sumi-muted sm:pt-1 shrink-0 sm:w-14">Issue {i + 1}</p>
                  <div>
                    <h3 className="font-head [word-break:auto-phrase] font-bold text-sumi mb-2 leading-snug">{c.title}</h3>
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
                <li key={step.title} className="relative pl-12 pb-12 last:pb-0">
                  {i < work.process.length - 1 && (
                    <span className="absolute left-[15px] top-8 bottom-0 w-px bg-warm-line" aria-hidden="true" />
                  )}
                  <span className={`absolute left-0 top-0 w-8 h-8 rounded-full ${style.accent} text-white font-en text-sm font-bold flex items-center justify-center`}>
                    {i + 1}
                  </span>
                  <p className={`text-xs font-bold mb-1 ${style.text}`}>{step.phase}</p>
                  <h3 className="font-head [word-break:auto-phrase] text-xl font-bold text-sumi mb-2">{step.title}</h3>
                  <p className="text-sumi-muted leading-7 mb-4">{step.detail}</p>
                  <ul className="rounded-[24px] border border-warm-line bg-cream p-5 space-y-2">
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
              {work.results.map((r) => (
                <div key={r.title} className="flex gap-5 rounded-[28px] border border-warm-line bg-white p-6">
                  <span className={`w-1 shrink-0 rounded-full ${style.accent}`} aria-hidden="true" />
                  <div>
                    <h3 className="font-head [word-break:auto-phrase] text-lg font-bold text-sumi mb-2">{r.title}</h3>
                    <p className="text-sumi-muted leading-7">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Point */}
          <section className="flex gap-5 items-start">
            <div className="w-14 h-14 shrink-0 rounded-full bg-sumi text-white font-en font-bold flex items-center justify-center">
              A
            </div>
            <div className="rounded-[28px] rounded-tl-none bg-white border border-warm-line p-6">
              <p className="text-xs font-bold text-sumi-muted mb-2">支援のポイント</p>
              <p className="text-sumi-muted leading-8">{work.point}</p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 self-start space-y-6">
          <div className="rounded-[28px] border border-warm-line bg-white p-6">
            <p className="font-en text-xs font-bold tracking-widest uppercase text-sumi-muted mb-4">Profile</p>
            <dl className="divide-y divide-warm-line">
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
                <span key={tool} className="text-xs px-2.5 py-1 rounded-md bg-cream-dark text-sumi-muted">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] bg-sumi text-white p-6">
            <p className="font-bold mb-2">同じようなお悩みはありませんか？</p>
            <p className="text-sm text-white/75 leading-relaxed mb-5">
              {work.cta ?? 'ご相談・お見積りは無料です。まずは現状をお聞かせください。'}
            </p>
            <a
              href="/contact"
              className="group flex items-center justify-center w-full px-5 py-3 bg-mustard text-sumi rounded-full text-sm font-bold hover:bg-cream transition-colors"
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
        <section className="max-w-6xl mx-auto px-5 mt-24 pt-16 border-t border-warm-line">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-head [word-break:auto-phrase] text-2xl font-bold text-sumi">その他のモデルケース</h2>
            <a href="/works" className="hidden md:inline-flex items-center text-sm font-medium text-sumi-muted hover:text-sumi">
              一覧を見る
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {others.map((w) => {
              const s = serviceStyles[w.service];
              return (
                <a
                  key={w.slug}
                  href={`/works/${w.slug}`}
                  className="group rounded-[28px] border border-warm-line bg-white p-6 hover:shadow-[0_16px_40px_rgb(31_36_48/0.08)] hover:border-warm-line transition-all"
                >
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mb-4 ${s.badge}`}>{w.service}</span>
                  <h3 className="font-head [word-break:auto-phrase] font-bold text-sumi leading-snug mb-3 group-hover:underline">{w.title}</h3>
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
