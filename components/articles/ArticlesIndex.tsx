import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ContactCta, Mark, PageHeader, card, press } from '../next/parts';
import { serviceByName, services, illust } from '../next/theme';

export const articles = [
  {
    title: '中小企業のパスワード管理と多要素認証の始め方',
    description: '社内のパスワードルールの決め方、保管と共有の方法、多要素認証の方式の選び方と導入手順をチェックリスト付きでまとめました。',
    href: '/articles/sme-password-management-mfa',
    published: '2026-10-29',
    tag: '情シス代行'
  },
  {
    title: '生成AIで議事録を作る手順と注意点',
    description: '録音と文字起こしの準備、要約を頼む指示文の例、情報漏えいを防ぐルール、AIが間違えやすい箇所の確認方法をまとめました。',
    href: '/articles/ai-meeting-minutes-guide',
    published: '2026-10-28',
    tag: '生成AI'
  },
  {
    title: '中小企業のMicrosoft 365導入・移行手順',
    description: 'アカウントやメール、ファイルの棚卸しから多要素認証、入退社時の管理まで、移行の進め方を整理します。',
    href: '/articles/microsoft-365-migration-sme',
    published: '2026-10-27',
    tag: '情シス代行'
  },
  {
    title: 'Excel集計を自動化する｜Power BIで月次報告',
    description: '毎月の手作業の集計を減らすために、Power BIで月次報告を作る手順と小さく始めるコツを解説します。',
    href: '/articles/excel-report-automation-power-bi',
    published: '2026-10-27',
    tag: 'データ活用'
  },
  {
    title: 'ホームページは月額制と買い切りのどちらがいい？',
    description: '初期費用だけでなく、総額や更新費、契約期間、解約時の扱いまで比べて選ぶポイントを紹介します。',
    href: '/articles/monthly-vs-one-time-website',
    published: '2026-10-27',
    tag: 'Web制作'
  },
  {
    title: '中小企業向け ホームページ制作会社の選び方',
    description: '見積りの比べ方、更新のしやすさ、公開後のサポート、ドメインの名義など、依頼前に確認したい項目をまとめました。',
    href: '/articles/website-company-guide-aichi-tokai',
    published: '2026-10-27',
    tag: 'Web制作'
  },
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
        <title>お役立ち記事 | 中小企業のIT・データ活用・生成AI・Web制作 - Arcle</title>
        <meta
          name="description"
          content="中小企業のIT担当者・経営者向けのお役立ち記事。情シス代行の選び方、Microsoft 365の導入、Power BIでの集計の自動化、生成AIの社内ルール、ホームページ制作まで、実務のノウハウを解説します。"
        />
        <link rel="canonical" href="https://www.arcle.net/articles" />
      </Helmet>
      <PageHeader
        en="Articles"
        title={<><Mark>実務に使える</Mark>記事</>}
        lead="中小企業のIT課題に向き合う現場目線で、導入判断に役立つ情報をまとめています。"
        crumbs={[{ label: 'お役立ち記事' }]}
      />
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article, i) => {
              const service = serviceByName(article.tag) ?? services[0];
              return (
                <a
                  key={article.href}
                  href={article.href}
                  className={`group pop-reveal flex flex-col rounded-[28px] bg-cream p-6 md:p-7 ${card} ${press}`}
                  style={{ animationDelay: `${(i % 3) * 90}ms` }}
                >
                  <div className={`rounded-[20px] ${service.bg} aspect-[16/10] mb-6 border-[2.5px] border-sumi`}>
                    <img src={illust(`svc-${service.key}`)} alt="" className={`${i % 2 ? 'pop-tilt-r' : 'pop-tilt'} w-full h-full object-contain p-3`} loading="lazy" />
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`pop-wiggle -rotate-3 text-xs font-bold px-3 py-1 rounded-lg text-white border-2 border-sumi ${service.bg}`}>{article.tag}</span>
                    <time dateTime={article.published} className="font-en text-xs text-sumi-muted">{article.published}</time>
                  </div>
                  <h2 className="font-head text-xl md:text-[22px] font-black leading-snug text-sumi mb-3 [word-break:auto-phrase]">{article.title}</h2>
                  <p className="text-sumi-muted text-[15px] leading-[1.9] mb-6">{article.description}</p>
                  <span className={`mt-auto pt-5 border-t-2 border-dashed border-warm-line inline-flex items-center font-bold ${service.text}`}>
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
