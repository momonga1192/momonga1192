import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ContactCta, PageHeader } from '../next/parts';
import { services } from '../next/theme';

const ArticleBIToolChoice: React.FC = () => {
  const service = services.find((item) => item.key === 'data')!;

  return (
    <div className="bg-cream text-sumi">
      <Helmet>
        <title>TableauとPower BIはどちらを選ぶべき？ | Arcle</title>
        <meta
          name="description"
          content="中小企業のBI導入で迷いやすいTableauとPower BIの選び方を、目的・予算・運用体制の観点で比較します。"
        />
        <link rel="canonical" href="https://www.arcle.net/articles/sme-bi-tableau-powerbi" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Power BIはどんな会社に向いていますか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Microsoft 365を中心に使っていて、コストを抑えてBIを始めたい会社に向いています。'
                }
              },
              {
                '@type': 'Question',
                name: 'Tableauはどんな場面で強みがありますか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '可視化の表現力が高く、分析の深さを重視する場面で強みを発揮します。'
                }
              },
              {
                '@type': 'Question',
                name: '導入時に最初に作るべきダッシュボードは？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '役員会や定例会で必ず使う指標を1画面にまとめたダッシュボードから始めるのが有効です。'
                }
              }
            ]
          })}
        </script>
      </Helmet>
      <PageHeader
        en="Articles"
        title="TableauとPower BIはどちらを選ぶべき？"
        service="data"
        crumbs={[{ label: 'お役立ち記事', href: '/articles' }, { label: 'TableauとPower BIはどちらを選ぶべき？' }]}
      />
      <article className="bg-white rounded-t-[48px] md:rounded-t-[80px] py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-5 text-[16px] leading-[2]">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className={`rounded-full px-4 py-1 text-sm font-bold ${service.tint} ${service.text}`}>データ活用</span>
            <time dateTime="2026-03-06" className="font-en text-sm text-sumi-muted">2026-03-06</time>
          </div>
          <p className="text-sumi-muted leading-[2] mb-8">
            BIツール選定で重要なのは、機能の多さより「組織に定着するか」です。
            特に中小企業では、運用担当者のスキルと既存環境との相性が成否を左右します。
          </p>
          <h2 className="font-head text-2xl md:text-[28px] font-bold text-svc-data [word-break:auto-phrase] mt-12 mb-4">判断基準を先に決める</h2>
          <ul className="list-disc pl-6 text-sumi-muted leading-[2] space-y-2">
            <li>目的: 経営ダッシュボードが主目的か、詳細分析まで行うか</li>
            <li>データ更新: 日次更新で十分か、準リアルタイムが必要か</li>
            <li>運用体制: 社内で作るか、外部と分担するか</li>
          </ul>
          <h2 className="font-head text-2xl md:text-[28px] font-bold text-svc-data [word-break:auto-phrase] mt-12 mb-4">使い分けの目安</h2>
          <p className="text-sumi-muted leading-[2] mb-4">一般的には次の方針が合いやすいです。</p>
          <ul className="list-disc pl-6 text-sumi-muted leading-[2] space-y-2">
            <li>Power BI: Microsoft 365中心でコストを抑えたい組織</li>
            <li>Tableau: 可視化品質を重視し、分析力を強化したい組織</li>
          </ul>
          <h2 className="font-head text-2xl md:text-[28px] font-bold text-svc-data [word-break:auto-phrase] mt-12 mb-4">導入を失敗させないコツ</h2>
          <ol className="list-decimal pl-6 text-sumi-muted leading-[2] space-y-2">
            <li>最初のダッシュボードは「役員会で毎月使う1枚」に絞る</li>
            <li>定義を揃える（売上、粗利、案件数などの集計ルール）</li>
            <li>担当者研修と運用ルールを同時に設計する</li>
          </ol>
          <div className={`mt-14 p-6 md:p-8 rounded-[28px] border ${service.border} ${service.tint}`}>
            <p className="font-head text-sumi font-bold mb-2">次のアクション</p>
            <p className="text-sumi-muted">
              2週間のPoCで、同じデータを両ツールで1画面ずつ作成すると、
              自社に合う運用コストが比較しやすくなります。
            </p>
          </div>
          <section className="mt-14">
            <h2 className="font-head text-2xl md:text-[28px] font-bold text-svc-data [word-break:auto-phrase] mb-4">よくある質問</h2>
            <div className="space-y-5 text-sumi-muted leading-[2] [&>div]:rounded-[28px] [&>div]:bg-cream [&>div]:p-6 [&_h3]:mb-2">
              <div>
                <h3 className="font-head font-bold text-sumi [word-break:auto-phrase]">Power BIはどんな会社に向いていますか？</h3>
                <p>Microsoft 365を中心に使っていて、コストを抑えてBIを始めたい会社に向いています。</p>
              </div>
              <div>
                <h3 className="font-head font-bold text-sumi [word-break:auto-phrase]">Tableauはどんな場面で強みがありますか？</h3>
                <p>可視化の表現力が高く、分析の深さを重視する場面で強みを発揮します。</p>
              </div>
              <div>
                <h3 className="font-head font-bold text-sumi [word-break:auto-phrase]">導入時に最初に作るべきダッシュボードは？</h3>
                <p>役員会や定例会で必ず使う指標を1画面にまとめたダッシュボードから始めるのが有効です。</p>
              </div>
            </div>
          </section>
          <section className="mt-14 border-t border-warm-line pt-10">
            <h2 className="font-head text-2xl md:text-[28px] font-bold text-svc-data [word-break:auto-phrase] mb-4">関連記事</h2>
            <div className="space-y-3">
              <a href="/articles/ichinomiya-josys-outsourcing-guide" className="block text-svc-josys hover:underline underline-offset-4 py-1">
                一宮市の中小企業向け 情シス代行の選び方
              </a>
              <a href="/articles/chatgpt-security-policy-sme" className="block text-svc-ai hover:underline underline-offset-4 py-1">
                ChatGPT導入前に作るべき社内ルール
              </a>
              <a href="/articles" className="block text-sumi-muted hover:text-sumi underline">
                記事一覧を見る
              </a>
            </div>
          </section>
          <section className={`mt-14 rounded-[28px] p-6 md:p-8 ${service.tint}`}>
            <h2 className="font-head text-2xl font-bold [word-break:auto-phrase]">関連サービス</h2>
            <a href={service.href} className="mt-5 inline-flex items-center gap-2 rounded-full bg-sumi text-white px-6 py-3 font-bold hover:opacity-90">
              {service.name}を詳しく見る
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </section>
        </div>
      </article>
      <ContactCta />
    </div>
  );
};

export default ArticleBIToolChoice;
