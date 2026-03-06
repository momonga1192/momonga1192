import React from 'react';
import { Helmet } from 'react-helmet-async';

const ArticleJosysGuide: React.FC = () => {
  return (
    <article className="pt-24 pb-20 bg-white min-h-screen">
      <Helmet>
        <title>一宮市の中小企業向け 情シス代行の選び方 | Arcle</title>
        <meta
          name="description"
          content="一宮市で情シス代行を検討する中小企業向けに、比較ポイント、費用目安、導入ステップを実務目線で解説します。"
        />
        <link rel="canonical" href="https://arcle.net/articles/ichinomiya-josys-outsourcing-guide" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: '情シス代行はどの規模の会社に向いていますか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '専任のIT担当者がいない、または兼任で負担が大きい中小企業に特に有効です。'
                }
              },
              {
                '@type': 'Question',
                name: '費用はどれくらい見込むべきですか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'ライトで月5万円前後、標準で月10-20万円、包括支援では月20万円以上が目安です。'
                }
              },
              {
                '@type': 'Question',
                name: '導入前に何を準備すれば良いですか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '問い合わせ件数、IT作業時間、現行の運用ルールを棚卸ししておくと移管がスムーズです。'
                }
              }
            ]
          })}
        </script>
      </Helmet>
      <div className="container mx-auto px-6 max-w-3xl">
        <p className="text-sm text-blue-600 font-medium mb-4">情シス代行 / 2026-03-06</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
          一宮市の中小企業向け
          <br />
          情シス代行の選び方
        </h1>
        <p className="text-gray-700 leading-8 mb-8">
          IT担当者が専任でいない企業では、PCトラブル対応やSaaS管理、セキュリティ対策が後回しになりやすくなります。
          情シス代行は、その不足を外部で補う有効な手段です。
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">比較で見るべき3つの観点</h2>
        <ul className="list-disc pl-6 text-gray-700 leading-8 space-y-2">
          <li>対応範囲: ヘルプデスクだけか、運用設計やセキュリティまで含むか</li>
          <li>対応スピード: 受付時間、緊急時のSLA、現地対応の可否</li>
          <li>体制: 担当固定か、属人化しないナレッジ運用があるか</li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">費用感の目安</h2>
        <p className="text-gray-700 leading-8 mb-4">一般的には以下のように分かれます。</p>
        <ul className="list-disc pl-6 text-gray-700 leading-8 space-y-2">
          <li>ライト: 月5万円前後（相談窓口、軽微な問い合わせ対応）</li>
          <li>標準: 月10-20万円（運用支援、アカウント管理、定例報告）</li>
          <li>包括: 月20万円以上（IT戦略、セキュリティ、継続改善）</li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">失敗しない導入ステップ</h2>
        <ol className="list-decimal pl-6 text-gray-700 leading-8 space-y-2">
          <li>現状棚卸し: 困りごとと業務量を見える化する</li>
          <li>優先順位決定: まず止めてはいけない業務から移管する</li>
          <li>運用ルール策定: 依頼窓口、報告形式、権限管理を明文化する</li>
        </ol>
        <div className="mt-14 p-6 rounded-xl bg-gray-50 border border-gray-200">
          <p className="text-gray-800 font-medium mb-2">次のアクション</p>
          <p className="text-gray-700">
            まずは「毎月発生しているIT問い合わせ件数」と「担当者の実作業時間」を計測すると、
            必要な外部支援の規模を見積もりやすくなります。
          </p>
        </div>
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">よくある質問</h2>
          <div className="space-y-5 text-gray-700 leading-8">
            <div>
              <h3 className="font-bold text-gray-900">情シス代行はどの規模の会社に向いていますか？</h3>
              <p>専任のIT担当者がいない、または兼任で負担が大きい中小企業に特に有効です。</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">費用はどれくらい見込むべきですか？</h3>
              <p>ライトで月5万円前後、標準で月10-20万円、包括支援では月20万円以上が目安です。</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">導入前に何を準備すれば良いですか？</h3>
              <p>問い合わせ件数、IT作業時間、現行の運用ルールを棚卸ししておくと移管がスムーズです。</p>
            </div>
          </div>
        </section>
        <section className="mt-14 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">関連記事</h2>
          <div className="space-y-3">
            <a href="/articles/sme-bi-tableau-powerbi" className="block text-blue-600 hover:text-blue-700 underline">
              TableauとPower BIはどちらを選ぶべき？
            </a>
            <a href="/articles/chatgpt-security-policy-sme" className="block text-blue-600 hover:text-blue-700 underline">
              ChatGPT導入前に作るべき社内ルール
            </a>
            <a href="/articles" className="block text-gray-700 hover:text-gray-900 underline">
              記事一覧を見る
            </a>
          </div>
        </section>
      </div>
    </article>
  );
};

export default ArticleJosysGuide;
