import React from 'react';
import { Helmet } from 'react-helmet-async';

const ArticleChatGPTPolicy: React.FC = () => {
  return (
    <article className="pt-24 pb-20 bg-white min-h-screen">
      <Helmet>
        <title>ChatGPT導入前に作るべき社内ルール | Arcle</title>
        <meta
          name="description"
          content="中小企業がChatGPTを安全に導入するために必要な社内ルールを、情報管理・権限・運用フローの観点で整理します。"
        />
        <link rel="canonical" href="https://arcle.net/articles/chatgpt-security-policy-sme" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'ChatGPTで入力してはいけない情報は？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '顧客情報、契約情報、未公開の業績情報など機密情報は入力禁止にするべきです。'
                }
              },
              {
                '@type': 'Question',
                name: '社内ルールはどこまで細かく作るべきですか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '最初はA4一枚で運用できる最小ルールから始め、運用しながら更新する方法が現実的です。'
                }
              },
              {
                '@type': 'Question',
                name: '生成AIの出力はそのまま業務利用できますか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '最終責任は人が持つ前提で、内容確認のレビュー手順を設ける必要があります。'
                }
              }
            ]
          })}
        </script>
      </Helmet>
      <div className="container mx-auto px-6 max-w-3xl">
        <p className="text-sm text-purple-600 font-medium mb-4">生成AI / 2026-03-06</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
          ChatGPT導入前に作るべき社内ルール
        </h1>
        <p className="text-gray-700 leading-8 mb-8">
          生成AIは業務効率を上げる一方で、使い方を誤ると情報漏えいリスクを高めます。
          導入前に最小限のルールを定義しておくことが重要です。
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">最低限決めるべき4項目</h2>
        <ul className="list-disc pl-6 text-gray-700 leading-8 space-y-2">
          <li>入力禁止情報: 顧客情報、契約情報、未公開の業績情報</li>
          <li>利用目的: 文案作成、要約、調査補助などの許可範囲</li>
          <li>権限管理: 利用者の申請手順、退職時のアカウント廃止</li>
          <li>ログ管理: プロンプト監査と定期レビューの運用責任者</li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">現場で機能する運用フロー</h2>
        <ol className="list-decimal pl-6 text-gray-700 leading-8 space-y-2">
          <li>利用ガイドを1枚にまとめる</li>
          <li>社内FAQを作成して、よくある誤用を共有する</li>
          <li>月1回、利用ログから改善点を見つける</li>
        </ol>
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">導入時の注意点</h2>
        <p className="text-gray-700 leading-8">
          無料版と業務版ではデータ取り扱い条件が異なるため、契約プランに応じて社内ルールも更新が必要です。
          また、生成結果の最終責任は人が持つ前提を明文化してください。
        </p>
        <div className="mt-14 p-6 rounded-xl bg-gray-50 border border-gray-200">
          <p className="text-gray-800 font-medium mb-2">次のアクション</p>
          <p className="text-gray-700">
            まずは10項目程度の「入力してはいけない情報リスト」を作り、全社で合意するところから始めるのが最短です。
          </p>
        </div>
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">よくある質問</h2>
          <div className="space-y-5 text-gray-700 leading-8">
            <div>
              <h3 className="font-bold text-gray-900">ChatGPTで入力してはいけない情報は？</h3>
              <p>顧客情報、契約情報、未公開の業績情報など機密情報は入力禁止にするべきです。</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">社内ルールはどこまで細かく作るべきですか？</h3>
              <p>A4一枚で運用できる最小ルールから始め、運用しながら更新する方法が現実的です。</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">生成AIの出力はそのまま業務利用できますか？</h3>
              <p>最終責任は人が持つ前提で、内容確認のレビュー手順を設ける必要があります。</p>
            </div>
          </div>
        </section>
        <section className="mt-14 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">関連記事</h2>
          <div className="space-y-3">
            <a href="/articles/ichinomiya-josys-outsourcing-guide" className="block text-blue-600 hover:text-blue-700 underline">
              一宮市の中小企業向け 情シス代行の選び方
            </a>
            <a href="/articles/sme-bi-tableau-powerbi" className="block text-blue-600 hover:text-blue-700 underline">
              TableauとPower BIはどちらを選ぶべき？
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

export default ArticleChatGPTPolicy;
