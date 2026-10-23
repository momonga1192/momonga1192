import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { publishedWorks, serviceLinks } from './worksData';
import { serviceStyles } from './serviceStyles';

const SectionHeading: React.FC<{ no: string; en: string; title: string }> = ({ no, en, title }) => (
  <div className="flex items-end gap-4 mb-8">
    <span className="font-en text-5xl font-bold text-gray-200 leading-none select-none">{no}</span>
    <div>
      <p className="font-en text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">{en}</p>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
    </div>
  </div>
);

const WorkDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const work = publishedWorks.find((w) => w.slug === slug);

  if (!work) {
    return (
      <div className="pt-24 pb-20 bg-white min-h-screen">
        <Helmet>
          <title>ページが見つかりません | Arcle</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="container mx-auto px-6 max-w-3xl py-20">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">ページが見つかりません</h1>
          <a href="/works" className="text-blue-600 hover:text-blue-700 underline">
            モデルケース一覧へ戻る
          </a>
        </div>
      </div>
    );
  }

  const style = serviceStyles[work.service];
  const Icon = style.icon;
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
    <article className="pt-24 pb-20 bg-white min-h-screen">
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

      {/* Hero */}
      <header className={`relative bg-gradient-to-br ${style.panel} overflow-hidden`}>
        <Icon className={`absolute -right-10 -bottom-10 w-72 h-72 opacity-[0.07] ${style.text}`} />
        <div className="container mx-auto px-6 max-w-6xl relative pt-12 pb-20 md:pt-20 md:pb-28">
          <nav aria-label="パンくずリスト" className="flex items-center gap-1 text-xs text-gray-500 mb-8">
            <a href="/" className="hover:text-gray-900">ホーム</a>
            <ChevronRight className="w-3 h-3" />
            <a href="/works" className="hover:text-gray-900">支援モデルケース</a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400 truncate">{work.client}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${style.badge}`}>
              <Icon className="w-3.5 h-3.5" />
              {work.service}
            </span>
            <span className="font-en text-xs tracking-widest uppercase text-gray-400">{style.en}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight max-w-4xl mb-6">
            {work.title}
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-3xl md:text-lg">{work.summary}</p>
          <p className="mt-6 max-w-3xl rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900 leading-relaxed">
            これは、よくあるご相談をもとに作成した架空のモデルケースです。企業名・数値は説明のためのもので、実在の企業や実績ではありません。
          </p>
        </div>
      </header>

      {/* Metrics */}
      <section className="container mx-auto px-6 max-w-6xl -mt-10 relative z-10">
        <div className="grid md:grid-cols-3 gap-4">
          {work.metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl bg-white border border-gray-200 shadow-lg shadow-gray-200/50 p-6">
              <p className="text-xs font-bold text-gray-500 mb-4">{metric.label}</p>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-en text-[10px] tracking-widest uppercase text-gray-400">現状</p>
                  <p className="text-sm text-gray-500">{metric.before}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
                <div>
                  <p className={`font-en text-[10px] tracking-widest uppercase ${style.text}`}>想定</p>
                  <p className={`text-2xl font-bold ${style.text}`}>{metric.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-6xl mt-16 md:mt-24 grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">
        <div className="min-w-0 space-y-20 md:space-y-24">
          {/* Background */}
          <section>
            <SectionHeading no="01" en="Background" title="想定する状況" />
            <div className="space-y-5 text-gray-700 leading-8">
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
                <div key={c.title} className="flex flex-col sm:flex-row gap-3 sm:gap-6 rounded-2xl bg-gray-50 border border-gray-100 p-6">
                  <p className="font-en text-xs font-bold text-gray-400 sm:pt-1 shrink-0 sm:w-14">Issue {i + 1}</p>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 leading-snug">{c.title}</h3>
                    <p className="text-sm text-gray-600 leading-7">{c.detail}</p>
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
                    <span className="absolute left-[15px] top-8 bottom-0 w-px bg-gray-200" aria-hidden="true" />
                  )}
                  <span className={`absolute left-0 top-0 w-8 h-8 rounded-full ${style.accent} text-white font-en text-sm font-bold flex items-center justify-center`}>
                    {i + 1}
                  </span>
                  <p className={`text-xs font-bold mb-1 ${style.text}`}>{step.phase}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-7 mb-4">{step.detail}</p>
                  <ul className="rounded-xl border border-gray-100 bg-gray-50/60 p-5 space-y-2">
                    {step.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2 text-sm text-gray-700 leading-6">
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
                <div key={r.title} className="flex gap-5 rounded-2xl border border-gray-200 p-6">
                  <span className={`w-1 shrink-0 rounded-full ${style.accent}`} aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{r.title}</h3>
                    <p className="text-gray-600 leading-7">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Point */}
          <section className="flex gap-5 items-start">
            <div className="w-14 h-14 shrink-0 rounded-full bg-gray-900 text-white font-en font-bold flex items-center justify-center">
              A
            </div>
            <div className="rounded-2xl rounded-tl-none bg-gray-50 border border-gray-100 p-6">
              <p className="text-xs font-bold text-gray-500 mb-2">支援のポイント</p>
              <p className="text-gray-700 leading-8">{work.point}</p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 self-start space-y-6">
          <div className="rounded-2xl border border-gray-200 p-6">
            <p className="font-en text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Profile</p>
            <dl className="divide-y divide-gray-100">
              {profile.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 py-3 text-sm">
                  <dt className="text-gray-500 shrink-0">{label}</dt>
                  <dd className="text-gray-900 font-medium text-right">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs text-gray-500 mt-4 mb-2">利用するツール</p>
            <div className="flex flex-wrap gap-2">
              {work.tools.map((tool) => (
                <span key={tool} className="text-xs px-2.5 py-1 rounded-md bg-gray-100 text-gray-700">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-gray-900 text-white p-6">
            <p className="font-bold mb-2">同じようなお悩みはありませんか？</p>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              {work.cta ?? 'ご相談・お見積りは無料です。まずは現状をお聞かせください。'}
            </p>
            <a
              href="/contact"
              className="group flex items-center justify-center w-full px-5 py-3 bg-white text-gray-900 rounded-full text-sm font-bold hover:bg-blue-50 transition-colors"
            >
              無料で相談する
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={serviceLinks[work.service]}
              className="flex items-center justify-center w-full mt-3 px-5 py-3 border border-gray-700 rounded-full text-sm text-gray-300 hover:border-gray-400 hover:text-white transition-colors"
            >
              {work.service}サービスを見る
            </a>
          </div>
        </aside>
      </div>

      {/* Other works */}
      {others.length > 0 && (
        <section className="container mx-auto px-6 max-w-6xl mt-24 pt-16 border-t border-gray-100">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">その他のモデルケース</h2>
            <a href="/works" className="hidden md:inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
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
                  className="group rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all"
                >
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mb-4 ${s.badge}`}>{w.service}</span>
                  <h3 className="font-bold text-gray-900 leading-snug mb-3 group-hover:underline">{w.title}</h3>
                  <p className="text-xs text-gray-500">
                    {w.client} / {w.employees}
                  </p>
                </a>
              );
            })}
          </div>
          <a href="/works" className="md:hidden mt-8 inline-flex items-center text-sm font-medium text-gray-600">
            <ArrowLeft className="w-4 h-4 mr-1" />
            モデルケース一覧へ戻る
          </a>
        </section>
      )}
    </article>
  );
};

export default WorkDetail;
