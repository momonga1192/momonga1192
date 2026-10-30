import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ContactCta, Mark, PageHeader, comicIllust } from '../next/parts';
import { panel, panelPress } from '../next/comic';
import { serviceByName, services } from '../next/theme';

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

// 記事の表紙の絵。同じ事業が続いても単調にならないよう、事業の絵とお悩みの絵を交互に使う
const coverArt: Record<string, [string, string]> = {
  josys: ['svc-josys', 'worry-pc'],
  data: ['svc-data', 'worry-data'],
  ai: ['svc-ai', 'worry-ai'],
  web: ['svc-web', 'worry-web']
};

// お役立ち記事の一覧（アメコミ版）。1本ずつコミック誌の表紙のようなコマにする
const ArticlesIndex: React.FC = () => {
  // 事業ごとに何本目かを数えて、表紙の絵を交互にする
  const seen: Record<string, number> = {};
  return (
    <div className="bg-[#FAF3E0] text-sumi overflow-x-clip">
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
        image={comicIllust('works-articles-articles-header')}
        imageMode="panel"
      />
      <section className="py-20 md:py-28 comic-dots">
        <div className="max-w-6xl mx-auto px-4 sm:px-5">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 lg:gap-y-12">
            {articles.map((article, i) => {
              const service = serviceByName(article.tag) ?? services[0];
              const n = (seen[service.key] = (seen[service.key] ?? -1) + 1);
              return (
                <a
                  key={article.href}
                  href={article.href}
                  className={`group pop-reveal relative flex flex-col bg-white ${panel} ${panelPress} ${i % 2 ? 'md:rotate-[0.6deg]' : 'md:-rotate-[0.6deg]'}`}
                  style={{ animationDelay: `${(i % 3) * 90}ms` }}
                >
                  <div className="relative aspect-[16/10] border-b-[4px] border-[#111] overflow-hidden bg-[#111]">
                    <img
                      src={comicIllust(coverArt[service.key][n % 2])}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover object-[50%_30%] transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* コミック誌の号数ラベル */}
                    <span className={`absolute left-3 top-3 -rotate-3 flex flex-col items-center border-[3px] border-[#111] px-3 pt-1 pb-0.5 font-comic leading-none text-white shadow-[3px_3px_0_#111] ${service.bg}`}>
                      <span className="text-[11px] tracking-[0.2em]">ISSUE</span>
                      <span className="text-[26px] [text-shadow:2px_2px_0_#111]">No.{articles.length - i}</span>
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 px-5 sm:px-6 pt-5 pb-6">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`pop-wiggle -rotate-3 text-xs font-manga px-3 py-1 text-white border-[3px] border-[#111] shadow-[2px_2px_0_#111] ${service.bg}`}>{article.tag}</span>
                      <time dateTime={article.published} className="font-comic text-[17px] leading-none tracking-[0.06em] text-[#111]">{article.published}</time>
                    </div>
                    <h2 className="font-manga text-[19px] md:text-[20px] leading-[1.5] text-[#111] mb-3 [word-break:auto-phrase]">{article.title}</h2>
                    <p className="text-[#30343F] text-[15px] leading-[1.9] mb-6">{article.description}</p>
                    <span className={`mt-auto self-start inline-flex items-center gap-1.5 border-[3px] border-[#111] px-4 py-2 font-manga text-[14px] text-white shadow-[3px_3px_0_#111] transition-all group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[1px_1px_0_#111] ${service.bg}`}>
                      記事を読む
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                    </span>
                  </div>
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
