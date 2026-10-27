import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ContactCta, PageHeader } from '../next/parts';
import { serviceByName, services, illust } from '../next/theme';

export const articles = [
  {
    title: '中小企業向け 情シス代行の選び方',
    description: '情シス代行を検討する際の比較ポイント、費用感、失敗しない導入手順を解説します。',
    href: '/articles/ichinomiya-josys-outsourcing-guide',
    published: '2026-03-06',
    tag: '情シス代行'
  },
  {
    title: 'TableauとPower BIはどちらを選ぶべき？',
    description: '中小企業のデータ活用でよくある悩みに対して、導入目的別に判断基準を整理します。',
    href: '/articles/sme-bi-tableau-powerbi',
    published: '2026-03-06',
    tag: 'データ活用'
  },
  {
    title: 'ChatGPT導入前に作るべき社内ルール',
    description: '情報漏えいリスクを抑えながら生成AIを活用するための、最小限のガイドラインを紹介します。',
    href: '/articles/chatgpt-security-policy-sme',
    published: '2026-03-06',
    tag: '生成AI'
  }
];

const ArticlesIndex: React.FC = () => {
  return (
    <div className="bg-cream text-sumi">
      <Helmet>
        <title>記事一覧 | Arcle</title>
        <meta
          name="description"
          content="ArcleのITコンサルティング記事一覧です。情シス代行、データ活用、生成AI導入の実務ノウハウを発信しています。"
        />
        <link rel="canonical" href="https://www.arcle.net/articles" />
      </Helmet>
      <PageHeader
        en="Articles"
        title="実務に使える記事"
        lead="中小企業のIT課題に向き合う現場目線で、導入判断に役立つ情報をまとめています。"
        crumbs={[{ label: 'お役立ち記事' }]}
      />
      <section className="py-20 md:py-28 bg-white rounded-t-[48px] md:rounded-t-[80px]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article) => {
              const service = serviceByName(article.tag) ?? services[0];
              return (
                <a
                  key={article.href}
                  href={article.href}
                  className="group flex flex-col border border-warm-line rounded-[28px] bg-cream p-6 md:p-8 hover:shadow-[0_16px_40px_rgb(31_36_48/0.08)] transition-shadow"
                >
                  <div className={`rounded-full ${service.dot} aspect-square w-40 self-center mb-8 overflow-hidden`}>
                    <img src={illust(`svc-${service.key}`)} alt="" className="w-full h-full object-contain" loading="lazy" />
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${service.tint} ${service.text}`}>{article.tag}</span>
                    <time dateTime={article.published} className="font-en text-xs text-sumi-muted">{article.published}</time>
                  </div>
                  <h2 className="font-head text-xl font-bold leading-relaxed text-sumi mb-3 [word-break:auto-phrase]">{article.title}</h2>
                  <p className="text-sumi-muted text-[15px] leading-[1.9] mb-6">{article.description}</p>
                  <span className={`mt-auto pt-5 border-t border-warm-line inline-flex items-center font-bold ${service.text}`}>
                    記事を読む
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
      <ContactCta />
    </div>
  );
};

export default ArticlesIndex;
