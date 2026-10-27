import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ContactCta, PageHeader } from '../next/parts';
import { services } from '../next/theme';

const title = '月額制と買い切りのホームページ比較｜愛知・東海の会社向け';
// 画面の見出しには地域名を出さない（地域名はtitleとmetaだけ）
const pageTitle = 'ホームページは月額制と買い切りのどちらがいい？比較と選び方';
const description = '愛知・東海の中小企業向けに、ホームページの月額制と買い切り制作を比較。初期費用だけでなく総額、更新費、サーバー・ドメイン代、最低契約期間や解約時のデータの扱いまで、会社に合う選び方と契約前の確認事項を解説します。';
const canonical = 'https://www.arcle.net/articles/monthly-vs-one-time-website';
const date = '2026-10-27';
const heading = 'font-head text-2xl md:text-[28px] font-bold text-svc-web [word-break:auto-phrase] mt-12 mb-4';
const paragraph = 'text-sumi-muted leading-[2] mb-4';
const faqs = [
  {
    q: 'ホームページは月額制と買い切りのどちらが安いですか？',
    a: '利用期間と更新内容によって変わります。同じ期間・ページ数・更新回数で、初期費用、月額費用、サーバー・ドメイン代、追加更新費、終了時の費用を合計して比較してください。買い切りでも公開後の維持費がなくなるとは限りません。'
  },
  {
    q: '月額制ホームページの主なデメリットは何ですか？',
    a: '利用中の支払いが続くこと、契約によって最低契約期間や途中解約時の負担があること、更新やデータ引き渡しに条件があることです。契約前に金額と範囲を書面で確認しましょう。'
  },
  {
    q: 'Arcleは途中解約や解約後の利用ができますか？',
    a: '途中解約は可能ですが、契約期間の途中では制作費の未払い分を解約金として請求します。計算方法は契約前に説明します。制作費の支払いが済んでいればホームページのデータをお渡しし、ご自身で用意したサーバー・ドメインへ移して使い続けられます。デザインやプログラムの著作権はArcleに帰属します。'
  },
  {
    q: 'Arcleの月額料金にはどこまで含まれますか？',
    a: 'サーバー、ドメイン1つ、独自ドメインのメール、スマホ対応、文章・写真の差し替えやお知らせ掲載などの軽微な修正を含みます。.co.jpなどの属性型JPドメインは通常のドメインとの差額を年に一度実費で請求します。ページの新規追加やデザイン変更など作業量が大きいものは事前見積もりです。'
  }
];
const comparisons = [
  ['初期費用', '抑えられるプランがあります。別途費用の有無を確認します。', '制作費を契約・納品などのタイミングで支払う形が基本です。'],
  ['利用期間全体の総額', '月額×利用月数に、初期費用や追加費用を足します。', '制作費に、利用期間中の維持・更新費を足します。'],
  ['文章・写真の更新', '含まれる作業と回数・量の条件を確認します。', '社内で行うか、制作会社への依頼費を見込みます。'],
  ['サーバー・ドメイン', '月額に含むか、別契約かを確認します。', '制作費に含む期間と、その後の更新費を確認します。'],
  ['運営の担当', '依頼窓口をまとめられるか確認します。', '管理担当や外部の保守窓口を決めておきます。'],
  ['終了・移行', '最低契約期間、解約金、データ引き渡し条件を確認します。', '納品物、利用できる範囲、他社への移行条件を確認します。']
];

const ArticleWebMonthlyVsOneTime: React.FC = () => {
  const service = services.find((item) => item.key === 'web')!;
  return (
    <div className="bg-cream text-sumi">
      <Helmet>
        <title>{title} | Arcle</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Article', headline: title, description,
          datePublished: date, dateModified: date,
          author: { '@type': 'Person', name: '栗原 勇太', url: 'https://www.arcle.net/company/message' },
          publisher: { '@type': 'Organization', name: 'Arcle', logo: { '@type': 'ImageObject', url: 'https://www.arcle.net/images/ogp.png' } },
          mainEntityOfPage: canonical, image: 'https://www.arcle.net/images/ogp.png'
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://www.arcle.net/' },
            { '@type': 'ListItem', position: 2, name: 'お役立ち記事', item: 'https://www.arcle.net/articles' },
            { '@type': 'ListItem', position: 3, name: title, item: canonical }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((item) => ({
            '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a }
          }))
        })}</script>
      </Helmet>
      <PageHeader en="Articles" title={pageTitle} service="web"
        crumbs={[{ label: 'お役立ち記事', href: '/articles' }, { label: pageTitle }]} />
      <article className="bg-white rounded-t-[48px] md:rounded-t-[80px] py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-5 text-[16px] leading-[2]">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className={`rounded-full px-4 py-1 text-sm font-bold ${service.tint} ${service.text}`}>Web制作</span>
            <time dateTime={date} className="font-en text-sm text-sumi-muted">{date}</time>
          </div>
          <p className="text-sumi-muted leading-[2] mb-8">
            ホームページの月額制と買い切りを比較するとき、「初期費用が少ないほうが安心」「一度払えば安く済む」と迷うことはありませんか。大切なのは、公開してから誰が更新し、何年使い、いくら支払うかです。IT担当者のいない中小企業が選ぶ場合も、制作と運営を一緒に考えると判断しやすくなります。この記事では、費用の整理方法から契約前の確認事項まで順に解説します。
          </p>

          <h2 className={heading}>1．ホームページの月額制と買い切りを比較</h2>
          <p className={paragraph}>月額制は、毎月の料金で制作や運営を利用する方式です。買い切りは、制作費を支払ってホームページの納品を受ける方式を指します。ただし、名称だけではサービスの中身は決まりません。月額制でも更新が別料金の場合があり、買い切りでも保守契約を別途結ぶ場合があります。保守とは、公開後の点検や不具合への対応など、サイトを維持するための作業です。</p>
          <p className={paragraph}>まずは次の表を使い、見積書の同じ欄に条件を書き込んでください。「含まれる」とだけ書かれている項目は、どの作業までかを質問します。表は比較の観点であり、すべての制作会社に共通する条件ではありません。</p>
          <div className="overflow-x-auto rounded-[28px] border border-warm-line" role="region" aria-label="月額制と買い切りの比較表（横にスクロールできます）" tabIndex={0}>
            <table className="w-full min-w-[640px] text-sm border-collapse text-sumi-muted">
              <caption className="p-4 text-left font-bold text-sumi">見積もりでそろえる比較項目</caption>
              <thead className={service.tint}><tr>{['比較項目', '月額制', '買い切り制作'].map((label) => <th key={label} scope="col" className="p-4 text-left text-sumi">{label}</th>)}</tr></thead>
              <tbody>{comparisons.map(([label, monthly, oneTime]) => <tr key={label}>
                <th scope="row" className="p-4 border-t border-warm-line text-left text-sumi">{label}</th>
                <td className="p-4 border-t border-warm-line">{monthly}</td><td className="p-4 border-t border-warm-line">{oneTime}</td>
              </tr>)}</tbody>
            </table>
          </div>

          <h2 className={heading}>2．初期費用より利用期間全体の総額を見る</h2>
          <p className={paragraph}>比較する期間は、社内で使う予定に合わせて統一します。例えば「まずは3年間運営する」と置き、両方の見積もりを同じ期間で合計します。片方は制作費だけ、もう片方は更新込みの月額では、公平に比べられません。消費税の扱いもそろえ、初年度だけ無料の項目があれば翌年度以降も確認しましょう。</p>
          <ul className="list-disc pl-6 text-sumi-muted leading-[2] space-y-2 mb-4">
            <li>月額制の総額：初期費用＋月額費用×利用月数＋範囲外の作業費＋終了時に必要な費用</li>
            <li>買い切りの総額：制作費＋期間中のサーバー・ドメイン代＋保守費＋更新依頼費＋移行費など</li>
          </ul>
          <p className={paragraph}>サーバーはサイトのデータを置く場所、ドメインは「example.com」のようなインターネット上の住所です。制作費を払っても、公開を続けるための契約や更新手続きは残ります。メールを同じ契約で使うなら、その料金も表に入れます。外部サービスを追加する場合は、最新の料金は公式サイトで確認してください。</p>
          <p className={paragraph}>更新費は「年に何回、何を変えるか」を仮に決めると比較できます。営業日のお知らせ、採用情報の修正、施工写真の差し替えなど、自社で起きる作業を列挙しましょう。総務担当が作業する場合も、原稿確認や操作に使う時間は必要です。支払額だけでなく、担当者が無理なく続けられるかも評価します。</p>

          <h2 className={heading}>3．月額制ホームページ制作のメリット・デメリット</h2>
          <h3 className="font-head font-bold text-sumi text-xl mb-3 [word-break:auto-phrase]">初期負担と日々の運営をまとめて考えられる</h3>
          <p className={paragraph}>初期費用を抑えられるプランなら、開業時や設備投資の時期に支出を分散できます。更新やサーバー管理も含む契約であれば、社内では変更内容をまとめて依頼する流れを作れます。担当者が交代しても窓口が決まっていることは、運営を続けるうえでの利点です。ただし、対応内容や受付方法は事前に確認してください。</p>
          <h3 className="font-head font-bold text-sumi text-xl mb-3 [word-break:auto-phrase]">支払いの継続と契約上の制約を確認する</h3>
          <p className={paragraph}>月額制のデメリットは、利用中の支払いが続くことです。更新をほとんど依頼しなくても月額が発生する契約なら、その前提で予算を確保します。また、最低契約期間がある場合、短期間で閉鎖すると想定外の負担が生じることがあります。「月額だからいつでも費用なしでやめられる」と考えないことが大切です。</p>
          <p className={paragraph}>もう一つの注意点は、自由に変更できる範囲です。選べるデザインや機能、ページ数に制限があるか、追加にいくらかかるかを確認します。予約受付や会員機能を後から付けたい場合は、最初に予定を伝えましょう。更新込みでも、全面的な作り直しまで含むとは限りません。</p>

          <div className={`mt-10 p-6 md:p-8 rounded-[28px] border ${service.border} ${service.tint}`}>
            <p className="font-head text-sumi font-bold mb-2">Arcleの月額制を比較に入れるなら</p>
            <p className={paragraph}>Arcleは初期費用0円で、ライトは月額4,800円、スタンダードは7,500円、オーダーメイドは9,800円です（いずれも税抜）。サーバー・ドメイン・独自ドメインのメールや軽微な修正などを含みます。最低契約期間は1年で、1〜5年から選べます。契約期間と必要な内容をそろえて見積もりをご確認ください。</p>
            <a href={service.href} className="inline-flex items-center gap-2 font-bold text-svc-web hover:underline underline-offset-4">月額制ホームページの料金・範囲を見る<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </div>

          <h2 className={heading}>4．買い切り制作の利点と運営で起きやすい失敗</h2>
          <p className={paragraph}>買い切りは、制作時の要件と納品物を決め、公開後の運営を自社で組み立てたい会社に向いています。要件とは「何ページ必要か」「どの機能を付けるか」といった制作の条件です。更新できる担当者や保守の依頼先が決まっている場合は、必要な作業ごとに発注する運営も選べます。ただし、デザインの自由度やデータの利用範囲は契約次第です。</p>
          <p className={paragraph}>よくある失敗は、納品後に誰も更新しなくなることです。担当者を決めずに公開すると、求人の募集状況や営業時間が古いまま残るおそれがあります。社内で更新するなら、文章を修正する画面の使い方、操作手順の引き継ぎ先、困ったときの相談先まで決めておきましょう。</p>
          <p className={paragraph}>別の失敗は、安い制作費だけを見て保守を外し、障害時の連絡先が分からなくなることです。データの控えを取るバックアップや、使用している仕組みの更新を誰が行うか確認します。買い切りでも、すべての権利や管理用アカウントが自動的に自社へ渡ると決めつけず、納品一覧に残すことが必要です。</p>

          <h2 className={heading}>5．どちらが向く会社かを判断する手順</h2>
          <p className={paragraph}>方式を選ぶ前に、ホームページの目的を一つか二つに絞ります。「取引先に会社概要を確認してもらう」「採用応募につなげる」など、見る人に取ってほしい行動を決めましょう。必要なページと更新頻度が具体的になり、不要な機能を減らせます。</p>
          <ol className="list-decimal pl-6 text-sumi-muted leading-[2] space-y-2 mb-4">
            <li>目的と必須ページを整理し、今すぐ必要な機能と将来の希望を分けます。</li>
            <li>社内で原稿を用意する人と、公開・修正を操作する人を決めます。</li>
            <li>予定する利用期間で、通常運営と途中終了の両方の費用を確認します。</li>
            <li>同じ条件の見積もりを並べ、更新の手間と継続のしやすさも評価します。</li>
          </ol>
          <p className={paragraph}>初期支出を抑えたい、管理を任せたい、社内に更新担当を置きにくい会社は、運営を含む月額制を検討しやすいでしょう。一方、社内に更新できる体制があり、制作と運営を分けて管理したい会社は、買い切りも候補になります。既存サイトの内容を保ったまま管理だけ任せたい場合は、作り直し以外に運用支援を依頼できるか相談する方法もあります。</p>

          <h2 className={heading}>6．契約前に確認する期間・データ・更新範囲</h2>
          <p className={paragraph}>最後は、営業説明と見積書、契約書の内容が一致しているかを確認します。口頭で「全部込み」と聞くだけでは判断できません。次の項目を質問し、回答を残しておくと、担当者の交代や将来の移行にも備えられます。</p>
          <ul className="list-disc pl-6 text-sumi-muted leading-[2] space-y-2 mb-4">
            <li>最低契約期間、更新の方法、解約を申し出る期限はいつか。</li>
            <li>途中解約では何の費用が残り、どのように金額を計算するか。</li>
            <li>終了後に渡されるデータと、渡されないものは何か。</li>
            <li>現在のドメインを使い続けられるか。契約名義、移管手順、費用、メールへの影響はどうなるか。</li>
            <li>文章変更、写真差し替え、ページ追加のどこまでが料金内か。依頼量や納期に条件があるか。</li>
          </ul>
          <p className={paragraph}>Arcleでは、途中解約時は制作費の未払い分を解約金として請求し、計算方法は契約前に説明します。制作費の支払いが済んでいればデータをお渡しし、ご自身で用意したサーバー・ドメインへ移して使い続けられます。ただし、デザインやプログラムの著作権はArcleに帰属します。データを受け取れることと、著作権を持つことは区別して確認してください。</p>
          <p className={paragraph}>また、Arcleの軽微な修正には文章・写真の差し替え、お知らせの掲載を含みますが、ページの新規追加やデザイン変更など作業量が大きいものは事前見積もりです。解約時の既存ドメインの扱いや具体的な移行手順は、契約前に個別に確認しましょう。日々の依頼例と終了時の希望を伝えると、必要な条件を整理しやすくなります。</p>

          <h2 className={heading}>まとめ：制作費と運営の負担を一緒に比べる</h2>
          <p className={paragraph}>月額制と買い切りの選択は、初期費用だけでは決まりません。同じ利用期間で総額を計算し、誰が更新するか、契約終了後も使えるかを確認しましょう。比較前に「目的・必須ページ・更新内容・社内担当・利用期間」を一枚にまとめれば、相談時にも条件をそろえやすくなります。契約条件が曖昧な部分は、署名前に書面で確かめてください。</p>

          <section className="mt-14">
            <h2 className={heading}>よくある質問</h2>
            <div className="space-y-5 text-sumi-muted leading-[2] [&>div]:rounded-[28px] [&>div]:bg-cream [&>div]:p-6 [&_h3]:mb-2">
              {faqs.map((item) => <div key={item.q}><h3 className="font-head font-bold text-sumi [word-break:auto-phrase]">{item.q}</h3><p>{item.a}</p></div>)}
            </div>
          </section>
          <section className="mt-14 border-t border-warm-line pt-10">
            <h2 className="font-head text-2xl md:text-[28px] font-bold text-svc-web [word-break:auto-phrase] mb-4">関連記事</h2>
            <div className="space-y-3">
              <a href="/articles/website-company-guide-aichi-tokai" className="block text-svc-web hover:underline underline-offset-4 py-1">中小企業向け ホームページ制作会社の選び方</a>
              <a href="/samples" target="_blank" rel="noopener" className="block text-svc-web hover:underline underline-offset-4 py-1">業種別のホームページ作例を見る</a>
              <a href="/articles" className="block text-sumi-muted hover:text-sumi underline">記事一覧を見る</a>
            </div>
          </section>
          <section className={`mt-14 rounded-[28px] p-6 md:p-8 ${service.tint}`}>
            <h2 className="font-head text-2xl font-bold [word-break:auto-phrase]">関連サービス</h2>
            <a href={service.href} className="mt-5 inline-flex items-center gap-2 rounded-full bg-sumi text-white px-6 py-3 font-bold hover:opacity-90">{service.name}を詳しく見る<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </section>
          <p className="mt-12 text-sm text-sumi-muted">この記事を書いた人：<a href="/company/message" className="text-svc-web hover:underline underline-offset-4">栗原 勇太（Arcle代表）</a></p>
        </div>
      </article>
      <ContactCta />
    </div>
  );
};

export default ArticleWebMonthlyVsOneTime;
