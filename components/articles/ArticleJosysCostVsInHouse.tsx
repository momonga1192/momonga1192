import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ContactCta, PageHeader, comicIllust } from '../next/parts';
import { services } from '../next/theme';
import { ac, promoHeroSrc } from './articleComic';
import ArticleWorks from '../works/ArticleWorks';
import ArticleToc from './ArticleToc';
import ArticleSummary from './ArticleSummary';
import ArticleSources from './ArticleSources';

const title = '情シス代行の料金相場と採用費用の比べ方｜年額で見る5つの手順';
// 画面の見出しには地域名を出さない（地域名はdescriptionだけ）
const pageTitle = '情シス代行の料金と社内IT担当の採用費用の比べ方';
const description = '愛知・東海の中小企業向けに、情シス代行の料金と社内IT担当を採用する費用の比べ方を解説します。料金が決まる要素、給与以外にかかる社会保険料の会社負担、年額にそろえる5つの手順、費用以外の向き不向き、少人数の会社の判断の目安をまとめました。';
const canonical = 'https://www.arcle.net/articles/josys-cost-vs-in-house';
const published = '2026-11-12';
const faqs = [
  { q: '情シス代行の料金相場はいくらですか？', a: '各社が公開している料金には、月額数万円の相談中心のプランから、月額数十万円の包括的なプランまで幅があります。金額は任せる範囲、作業の量、訪問の有無で変わるため、相場の数字だけで判断せず、自社が任せたい仕事を書き出して同じ条件で見積もりを取り、年額で比べます。' },
  { q: '社員を1人採用すると、給与のほかにいくらかかりますか？', a: '会社が負担する社会保険料として、健康保険料と厚生年金保険料の半分、子ども・子育て拠出金、雇用保険料の会社負担分などがかかります。令和8年度の料率で概算すると、給与と賞与の合計のおよそ15〜16％です。このほか、求人の費用、パソコン、研修の費用も見込みます。' },
  { q: '何人くらいの会社から、専任のIT担当を採用したほうがよいですか？', a: '人数だけでは決まりません。目安になるのは、ITの仕事が毎日フルタイムであるかどうかです。月の作業時間を書き出して、1人分の勤務時間に近いなら採用、週に数時間から十数時間なら代行や兼任が合いやすくなります。自社専用のシステムを日々直す必要があるかも判断の材料です。' },
  { q: '情シス代行と社内のIT担当を組み合わせることはできますか？', a: 'できます。日々の問い合わせは社内の兼任の担当者が受け、設定の変更やセキュリティ対策、機器の入れ替えのような専門的な作業は代行に任せる分け方があります。担当者が休んだときや退職したときの備えにもなります。どちらが何を受け持つかは、契約の前に書面で決めておきます。' }
];
const heading = ac.h2.josys;
const paragraph = ac.p;
const subheading = ac.h3;
const link = 'text-svc-josys underline underline-offset-4';
const cell = 'p-4 border-t-2 border-[#111]/20';
const head = 'p-4 border-t-2 border-[#111]/20 text-left font-bold text-sumi';

const ArticleJosysCostVsInHouse: React.FC = () => {
  const service = services.find((item) => item.key === 'josys')!;

  return (
    <div className={ac.page}>
      <Helmet>
        <title>{title} | Arcle</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Article', headline: title, description,
          datePublished: published, dateModified: published,
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
          '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({
            '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a }
          }))
        })}</script>
      </Helmet>
      <PageHeader en="Articles" title={pageTitle} service="josys" compact image={comicIllust('svc-josys')} imageMode="panel" crumbs={[{ label: 'お役立ち記事', href: '/articles' }, { label: pageTitle }]} />
      <article className={ac.article}>
        <div className={ac.sheet}>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className={ac.tag.josys}>情シス代行</span>
            <time dateTime={published} className={ac.dateJa}>公開日 {published}</time>
          </div>
          <ArticleSummary service="josys">情シス代行と社内IT担当の採用は、月額と月給ではなく、年額にそろえて比べます。採用には給与のほかに、会社が負担する社会保険料（給与と賞与のおよそ15〜16％）、求人や機器の費用がかかります。ITの仕事が毎日フルタイムであるなら採用、週に数時間から十数時間なら代行が合いやすくなります。まずは1か月分のITの仕事と時間を書き出します。</ArticleSummary>
          <p className="text-[#30343F] leading-[2] mb-8">パソコンやメールのトラブルを、詳しい社員が本業の合間に見ている。そろそろ限界なので、情シス代行（会社のIT管理を外部に任せるサービス）に頼むか、IT担当を1人採用するかで迷っている。そのような会社に向けて、2つの費用を同じ物差しで比べる方法をまとめました。IT担当者がいない会社でも計算できるよう、公的な料率を使った例と、判断の目安を添えています。</p>

          <ArticleToc service="josys" items={[
            { id: 'sec-1', label: '情シス代行の料金相場は任せる範囲で決まる' },
            { id: 'sec-2', label: '社内IT担当を採用したときにかかる費用' },
            { id: 'sec-3', label: '年額で比べる5つの手順' },
            { id: 'sec-4', label: '費用以外で比べる向き不向き' },
            { id: 'sec-5', label: '少人数の会社が判断するときの目安' },
            { id: 'sec-6', label: '契約や採用の前に確かめること' },
            { id: 'sec-7', label: 'まとめ：月額と月給ではなく年額で比べる' },
            { id: 'faq', label: 'よくある質問' }
          ]}/>
          <h2 id="sec-1" className={heading}>1. 情シス代行の料金相場は任せる範囲で決まる</h2>
          <p className={paragraph}>情シス代行の料金を調べると、月額数万円のプランもあれば、月額数十万円のプランもあります。幅が大きいのは、同じ「情シス代行」という名前でも、任せる仕事の中身が違うからです。相談に答えるだけのプランと、パソコンの設定からセキュリティ対策まで引き受けるプランでは、かかる手間がまったく変わります。</p>
          <p className={paragraph}>そのため、相場の数字を1つ覚えても、自社の見積もりが高いか安いかは判断できません。先に見るのは、料金を動かしている要素です。</p>
          <ul className="list-disc pl-6 text-[#30343F] leading-[2] space-y-2">
            <li>任せる範囲：相談だけか、設定作業やアカウント管理、機器の入れ替えまで含むか</li>
            <li>作業の量：社員の人数、パソコンの台数、月の問い合わせの件数</li>
            <li>対応の方法：メールやチャットとリモート操作だけか、訪問も含むか</li>
            <li>受付の時間：平日の日中だけか、夜間や休日も受けるか</li>
            <li>契約の形：毎月決まった額を払う月額制か、頼んだときだけ払うスポットか</li>
          </ul>
          <p className={`${paragraph} mt-4`}>見積書では、月額に含まれる作業と、別料金になる作業を分けて確認します。訪問の交通費、時間外の対応、機器やソフトの購入代は、月額とは別に請求されることが多い項目です。初期費用（最初の調査や引き継ぎにかかる費用）があるかどうかも聞いておきます。</p>
          <p className={paragraph}>料金の比べ方よりも前に、依頼先の選び方から知りたい場合は、<a href="/articles/ichinomiya-josys-outsourcing-guide" className={link}>情シス代行の選び方</a>の記事も参考にしてください。</p>

          <h2 id="sec-2" className={heading}>2. 社内IT担当を採用したときにかかる費用</h2>
          <p className={paragraph}>採用の費用は、求人票に書く月給だけでは見えません。会社が実際に払うお金は、大きく4つに分かれます。</p>
          <h3 className={subheading}>給与と賞与</h3>
          <p className={paragraph}>毎月の給与と賞与です。金額は地域と経験で大きく変わります。自社の地域でIT担当者を募集している求人をハローワークや求人サイトで調べると、実際に提示されている水準が分かります。</p>
          <h3 className={subheading}>会社が負担する社会保険料</h3>
          <p className={paragraph}>社員を雇うと、給与とは別に、会社が社会保険料を負担します。下の表は、令和8年度（2026年度）の料率を公式の資料で確かめてまとめたものです。</p>
          <div className={`overflow-x-auto my-7 ${ac.tableWrap}`} role="region" aria-label="会社が負担する社会保険料の料率（横にスクロールできます）" tabIndex={0}>
            <table className="w-full min-w-[620px] text-sm border-collapse text-[#30343F]">
              <caption className={ac.caption}>会社が負担する社会保険料の料率（令和8年度・一般の事業）</caption>
              <thead className={ac.thead}><tr><th scope="col" className="p-4 text-left">項目</th><th scope="col" className="p-4 text-left">全体の料率</th><th scope="col" className="p-4 text-left">会社の負担</th></tr></thead>
              <tbody>
                {[
                  ['健康保険料（協会けんぽ）', '9.21〜10.55％（都道府県で違う）', '半分'],
                  ['介護保険料（40〜64歳の社員）', '1.62％', '半分（0.81％）'],
                  ['子ども・子育て支援金', '0.23％', '半分（0.115％）'],
                  ['厚生年金保険料', '18.3％', '半分（9.15％）'],
                  ['子ども・子育て拠出金', '0.36％', '全額（0.36％）'],
                  ['雇用保険料', '1.35％', '0.85％']
                ].map(([label, rate, share]) => <tr key={label}><th scope="row" className={head}>{label}</th><td className={cell}>{rate}</td><td className={cell}>{share}</td></tr>)}
              </tbody>
            </table>
          </div>
          <p className={paragraph}>健康保険料率が10％の都道府県で、40歳未満の社員を雇う場合、会社の負担は合わせて約15.5％です。40歳以上なら介護保険料が加わり、約16.3％になります。このほかに労災保険料もかかります。労災保険の料率は事業の種類ごとに決まっているので、厚生労働省の労災保険率表で自社の業種を確認します。</p>
          <p className={paragraph}>健康保険組合に入っている会社は、料率が協会けんぽと違います。料率は年度ごとに見直されるため、計算するときは最新の情報を公式サイトで確認してください。</p>
          <h3 className={subheading}>採用と受け入れの費用</h3>
          <p className={paragraph}>求人広告の掲載料や、人材紹介会社を使う場合の紹介手数料がかかります。入社後は、パソコン、ソフトのライセンス、机などの備品も必要です。これらは最初の年にまとめて出ていく費用です。</p>
          <h3 className={subheading}>見えにくい費用</h3>
          <p className={paragraph}>面接や社内の調整に使う経営者の時間、入社してから仕事を任せられるまでの期間、研修や資格の費用も費用のうちです。IT担当が1人だけの場合は、その人が休んだときや退職したときに仕事が止まります。もう一度採用する費用と、引き継ぎの手間も考えに入れておきます。</p>

          <h2 id="sec-3" className={heading}>3. 年額で比べる5つの手順</h2>
          <p className={paragraph}>代行は月額、採用は月給で示されるので、そのまま並べると採用が安く見えることがあります。次の5つの手順で、どちらも年額にそろえます。</p>
          <ol className="list-decimal pl-6 text-[#30343F] leading-[2] space-y-3">
            <li><strong className="text-sumi">ITの仕事を書き出す：</strong>1か月のあいだに誰が、どんなITの仕事を、何時間しているかを書き出します。パソコンの設定、アカウントの発行と停止、トラブルの対応、業者とのやり取りなどです。正確でなくてもかまいません。</li>
            <li><strong className="text-sumi">任せたい範囲を決める：</strong>書き出した仕事を「外に任せたい」「社内に残す」に分けます。ここで決めた範囲が、見積もりを頼むときの条件になります。</li>
            <li><strong className="text-sumi">代行の年額を出す：</strong>同じ範囲で見積もりを取り、「月額×12＋初期費用＋別料金の見込み」を計算します。税抜と税込をそろえます。</li>
            <li><strong className="text-sumi">採用の年額を出す：</strong>「給与と賞与＋会社が負担する社会保険料＋採用と受け入れの費用」を計算します。2年目からは採用と受け入れの費用が減るので、初年度と2年目以降を分けて出します。</li>
            <li><strong className="text-sumi">時間あたりで見直す：</strong>年額を、実際にITの仕事に使う時間で割ります。フルタイムで雇っても、ITの仕事が月に20時間しかなければ、残りの時間に何を任せるかまで決めないと割高になります。</li>
          </ol>
          <h3 className={subheading}>計算の例</h3>
          <p className={paragraph}>たとえば、月給30万円、賞与が年60万円のIT担当を1人採用する場合と、月額15万円の情シス代行を使う場合を比べます。金額はどちらも仮のものです。社会保険料は、上の表の料率で、健康保険料率10％・40歳未満として概算しました。</p>
          <div className={`overflow-x-auto my-7 ${ac.tableWrap}`} role="region" aria-label="年額の比較の例（横にスクロールできます）" tabIndex={0}>
            <table className="w-full min-w-[620px] text-sm border-collapse text-[#30343F]">
              <caption className={ac.caption}>年額にそろえた比較の例（仮の金額）</caption>
              <thead className={ac.thead}><tr><th scope="col" className="p-4 text-left">項目</th><th scope="col" className="p-4 text-left">採用（月給30万円・賞与60万円）</th><th scope="col" className="p-4 text-left">代行（月額15万円）</th></tr></thead>
              <tbody>
                {[
                  ['毎年かかる基本の額', '給与と賞与 420万円', '月額×12 180万円'],
                  ['社会保険料の会社負担', '約65万円（420万円×約15.5％）', 'なし'],
                  ['小計', '約485万円', '180万円'],
                  ['このほかに見込むもの', '労災保険料、求人の費用、パソコン、研修', '初期費用、訪問や時間外などの別料金、消費税'],
                  ['使える時間', 'フルタイム（ほかの仕事も任せられる）', '契約で決めた範囲と時間']
                ].map(([label, hire, outsource]) => <tr key={label}><th scope="row" className={head}>{label}</th><td className={cell}>{hire}</td><td className={cell}>{outsource}</td></tr>)}
              </tbody>
            </table>
          </div>
          <p className={paragraph}>この例では、年額に約300万円の差があります。ただし、金額が小さいほうが得だとは限りません。採用した社員はフルタイムで社内にいて、IT以外の仕事も任せられます。代行は、契約した範囲と時間のなかで動きます。自社の数字を当てはめ、手順5のとおり「ITの仕事にどれだけ時間が要るか」と合わせて判断します。</p>

          <h2 id="sec-4" className={heading}>4. 費用以外で比べる向き不向き</h2>
          <p className={paragraph}>費用が近いときや、どちらにも決めきれないときは、費用以外の違いを見ます。今のまま社員が兼任を続ける場合も、比べる相手に入れておきます。</p>
          <div className={`overflow-x-auto my-7 ${ac.tableWrap}`} role="region" aria-label="代行・採用・兼任の比較（横にスクロールできます）" tabIndex={0}>
            <table className="w-full min-w-[680px] text-sm border-collapse text-[#30343F]">
              <caption className={ac.caption}>情シス代行・採用・兼任の違い</caption>
              <thead className={ac.thead}><tr><th scope="col" className="p-4 text-left">比べる点</th><th scope="col" className="p-4 text-left">情シス代行</th><th scope="col" className="p-4 text-left">専任を採用</th><th scope="col" className="p-4 text-left">社員が兼任</th></tr></thead>
              <tbody>
                {[
                  ['始めるまでの期間', '契約と引き継ぎが済めば始められる', '募集から入社、慣れるまで時間がかかる', '今すぐ続けられる'],
                  ['その場での対応', 'リモートが中心。訪問は契約による', '社内にいるのですぐ動ける', '本業の合間になる'],
                  ['知識の幅', '複数の分野を相談できる', '本人の経験による', '本人の経験による'],
                  ['休みや退職への備え', '契約が続くかぎり窓口が残る', '1人だと仕事が止まる', '本人が辞めると分かる人がいなくなる'],
                  ['社内の事情の理解', '最初に共有が要る', '日々の仕事で深まる', 'いちばん詳しい'],
                  ['やめやすさ', '契約の条件で見直せる', '簡単には変えられない', '本業への影響が続く']
                ].map(([label, a, b, c]) => <tr key={label}><th scope="row" className={head}>{label}</th><td className={cell}>{a}</td><td className={cell}>{b}</td><td className={cell}>{c}</td></tr>)}
              </tbody>
            </table>
          </div>
          <p className={paragraph}>兼任は、お金が出ていかないので費用がかからないように見えます。実際には、本業に使えたはずの時間がITの対応に回っています。手順1で書き出した時間に、その社員の時間あたりの人件費を掛けると、兼任の費用も金額にできます。</p>
          <div className={ac.promo}>
            <img src={promoHeroSrc} alt="" className={ac.promoHero} loading="lazy" />
            <span aria-hidden="true" className={ac.promoLabel}>ARCLE TIP!</span>
            <p className={ac.promoTitle}>任せる範囲と費用を相談したい方へ</p>
            <p className={paragraph}>Arcleの情シス代行には、IT相談窓口が中心のライトプラン（月額3万円〜）、情シス業務を包括してサポートするスタンダードプラン（月額15万円〜）、IT戦略まで扱うプレミアムプラン（月額30万円〜）があります（いずれも税抜）。企業の規模や対応範囲に合わせて内容を調整できます。初回のご相談とお見積もりは無料です。</p>
            <a href={service.href} className="inline-flex items-center gap-2 text-svc-josys font-bold hover:underline underline-offset-4">情シス代行の対応内容を確認する<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </div>

          <h2 id="sec-5" className={heading}>5. 少人数の会社が判断するときの目安</h2>
          <p className={paragraph}>IT担当者がいない少人数の会社では、「ITの仕事が毎日フルタイムであるか」が分かれ目になります。社員の人数だけでは決まりません。10人の会社でも、自社専用のシステムを毎日直しているなら専任が要ります。50人の会社でも、クラウドサービスが中心で仕組みが整っていれば、週に数時間の作業で回ることがあります。</p>
          <div className={ac.box}>
            <p className={ac.boxTitle}>代行と採用の判断チェックリスト</p>
            <p className="font-bold text-sumi mb-2">当てはまるものが多いほど、情シス代行が合いやすい</p>
            <ul className="space-y-2 text-[#30343F] leading-[2] mb-6">
              {[
                'ITの仕事は、合わせて週に数時間から十数時間ほどである',
                '問い合わせの多くは、パソコン・メール・アカウント・プリンターのことである',
                '使っているのは、Microsoft 365やGoogle Workspaceなどのクラウドサービスが中心である',
                'セキュリティや機器の選び方について、相談できる相手がいない',
                'IT担当を募集しても、面接でITの力を見極められる人が社内にいない'
              ].map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className={ac.check} /><span>{item}</span></li>)}
            </ul>
            <p className="font-bold text-sumi mb-2">当てはまるものが多いほど、専任の採用が合いやすい</p>
            <ul className="space-y-2 text-[#30343F] leading-[2]">
              {[
                'ITの仕事が毎日あり、合わせると1人分の勤務時間に近い',
                '自社専用のシステムや機械と結び付いた仕組みがあり、日々の手直しが要る',
                '現場ですぐに対応しないと、製造や出荷などの仕事が止まる',
                '採用した人に、IT以外の仕事も合わせて任せる予定がある',
                '入社後の教育や、休んだときの代わりを用意できる'
              ].map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className={ac.check} /><span>{item}</span></li>)}
            </ul>
          </div>
          <p className={paragraph}>どちらにも当てはまる場合は、組み合わせる方法があります。日々の問い合わせは社内の兼任の担当者が受け、設定の変更やセキュリティ対策、機器の入れ替えは代行に任せる分け方です。専任を採用したあとも、その人が休むときの備えや、詳しくない分野の相談先として代行を残す会社もあります。</p>
          <p className={paragraph}>迷うときは、先に代行を小さく始めて、1年ほど仕事の量を記録する進め方もあります。記録があれば、採用するときに任せる仕事と必要な経験をはっきり書けます。</p>

          <h2 id="sec-6" className={heading}>6. 契約や採用の前に確かめること</h2>
          <h3 className={subheading}>情シス代行を契約する前</h3>
          <p className={paragraph}>月額に含まれる作業と別料金になる作業、受付の時間と返事までの目安、訪問の条件、最低の契約期間と解約の手続きを確認します。管理者のアカウントやパスワードの一覧を誰が持つかも決めておきます。契約が終わったときに、設定の記録や手順書を受け取れるかどうかも大切です。口頭で聞いた内容は、見積書やメールに残します。</p>
          <h3 className={subheading}>IT担当を採用する前</h3>
          <p className={paragraph}>任せる仕事を具体的に書き出し、求人票に載せます。「ITに詳しい人」だけでは、応募する側も会社側も判断できません。面接でITの力を見極めにくいときは、外部の詳しい人に同席を頼む方法があります。入社後は、設定やパスワードを本人だけが知っている状態にしないよう、記録を残す決まりを最初に作ります。</p>
          <p className={paragraph}>どちらを選んでも、管理者の権限と契約の名義は会社が持ち続けます。任せる相手が変わっても、仕事を引き継げるようにするためです。</p>

          <h2 id="sec-7" className={heading}>まとめ：月額と月給ではなく年額で比べる</h2>
          <p className={paragraph}>情シス代行の料金は、任せる範囲と量で決まります。採用の費用は、給与に加えて、会社が負担する社会保険料、求人や機器の費用まで入れて考えます。どちらも年額にそろえ、ITの仕事に必要な時間と合わせて比べると、自社に合う方法が見えてきます。まずは1か月分のITの仕事と時間を書き出すところから始めてください。</p>

          <section className="mt-14">
            <h2 id="faq" className={heading}>よくある質問</h2>
            <div className={ac.faq}>
              {faqs.map((faq) => <div key={faq.q}><h3 className={ac.faqQ}>{faq.q}</h3><p>{faq.a}</p></div>)}
            </div>
          </section>
          <ArticleSources service="josys" items={[
            { label: '全国健康保険協会「令和8年度の協会けんぽの保険料率は3月分（4月納付分）から改定されます」', url: 'https://www.kyoukaikenpo.or.jp/about/business/insurance_rate/rate_prefectures/r08' },
            { label: '全国健康保険協会「費用の負担」', url: 'https://www.kyoukaikenpo.or.jp/about/business/overview/001/index.html' },
            { label: '日本年金機構「厚生年金保険料額表」', url: 'https://www.nenkin.go.jp/service/kounen/hokenryo/ryogaku/ryogakuhyo/index.html' },
            { label: '日本年金機構「厚生年金保険料額表（令和8年度版）」', url: 'https://www.nenkin.go.jp/service/kounen/hokenryo/ryogaku/ryogakuhyo/20200825.files/R08ryougaku.pdf' },
            { label: '厚生労働省「令和8（2026）年度 雇用保険料率のご案内」', url: 'https://www.mhlw.go.jp/content/001692566.pdf' },
            { label: '厚生労働省「令和8年度の労災保険率について」', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/rousai/rousaihoken06/rousai_hokenritsu_kaitei.html' }
          ]}/>
          <ArticleWorks service="josys"/>
          <section className={ac.related}>
            <h2 className={ac.h2Flat.josys}>関連記事</h2>
            <div className="space-y-3">
              <a href="/articles/ichinomiya-josys-outsourcing-guide" className={ac.relatedLink}>中小企業向け 情シス代行の選び方</a>
              <a href="/articles/retired-employee-m365-account" className={ac.relatedLink}>退職者のMicrosoft 365アカウントの止め方とデータの引き継ぎ</a>
              <a href="/articles" className={ac.allLink}>記事一覧を見る</a>
            </div>
          </section>
          <section className={ac.svcBox.josys}>
            <h2 className={ac.svcTitle}>関連サービス</h2>
            <a href={service.href} className={ac.svcBtn}>{service.name}を詳しく見る<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </section>
          <p className={ac.author}>この記事を書いた人：栗原 勇太（Arcle代表）<br /><a href="/company/message" className="text-svc-josys hover:underline underline-offset-4">代表メッセージを見る</a></p>
        </div>
      </article>
      <ContactCta />
    </div>
  );
};

export default ArticleJosysCostVsInHouse;
