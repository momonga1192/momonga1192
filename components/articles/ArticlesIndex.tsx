import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';

const articles = [
  {
    title: '一宮市の中小企業向け 情シス代行の選び方',
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
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <Helmet>
        <title>記事一覧 | Arcle</title>
        <meta
          name="description"
          content="ArcleのITコンサルティング記事一覧です。情シス代行、データ活用、生成AI導入の実務ノウハウを発信しています。"
        />
        <link rel="canonical" href="https://arcle.net/articles" />
      </Helmet>
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-sm font-en tracking-widest text-blue-600 uppercase mb-3">Articles</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">実務に使える記事</h1>
          <p className="text-gray-600 mb-12">
            中小企業のIT課題に向き合う現場目線で、導入判断に役立つ情報をまとめています。
          </p>
          <div className="space-y-6">
            {articles.map((article) => (
              <a
                key={article.href}
                href={article.href}
                className="block border border-gray-200 rounded-2xl p-6 md:p-8 hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700">{article.tag}</span>
                  <time className="text-xs text-gray-500">{article.published}</time>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{article.title}</h2>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <span className="inline-flex items-center text-blue-600 font-medium">
                  記事を読む
                  <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlesIndex;
