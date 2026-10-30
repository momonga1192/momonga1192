import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ContactCta, PageHeader, comicIllust } from '../next/parts';
import { services } from '../next/theme';
import { ac, promoHeroSrc } from './articleComic';

const title = '愛知・東海の中小企業向け｜売上データの見える化を始める手順';
// 画面の見出しには地域名を出さない（地域名はtitleとmetaだけ）
const pageTitle = '売上データの見える化を始める手順';
const description = '愛知・東海の中小企業向けに、売上データの見える化を始める手順を解説します。最初に見る数字の決め方、集計しやすい元データの整え方、Excelのピボットテーブルでの集計とグラフ化、前年同月比や顧客別の読み方、社内で見る習慣のつくり方までまとめました。';
const canonical = 'https://www.arcle.net/articles/sales-data-visualization-first-steps';
const published = '2026-10-30';
const faqs = [
  { q: '売上の見える化は、BIツールがないと始められませんか？', a: 'Excelのピボットテーブルとグラフだけでも始められます。まずは月別や顧客別の集計を作り、毎月見る数字が決まってから、更新の手間や共有のしかたに合わせてBIツールを検討する順番がおすすめです。' },
  { q: '販売管理システムのデータは、どうやって取り出せばよいですか？', a: '多くの販売管理システムには、売上の明細をCSVなどの形式で書き出す機能があります。メニューの名前や出力できる項目はシステムごとに違うため、操作マニュアルやシステムの提供元に「売上明細を1行1取引で出力する方法」を確認してください。' },
  { q: '毎月どのくらいの時間をかければよいですか？', a: '会社の規模やデータの量によって変わります。最初は元データの整理に時間がかかりますが、表の形が決まれば、毎月の作業は新しい月の明細を追加して集計を更新するだけに近づきます。作業時間を記録しておくと、自動化を検討するときの判断材料になります。' },
  { q: '数字を見ても、何をすればよいか分からないときは？', a: '数字を見る前に「この数字が下がったら何を確認するか」を決めておくと、次の行動につながりやすくなります。たとえば、ある顧客の売上が前年より下がっていたら、担当者に取引の状況を聞く、といった具合です。数字は話し合いのきっかけとして使いましょう。' }
];
const heading = ac.h2.data;
const paragraph = ac.p;
const subheading = ac.h3;

const ArticleSalesVisualization: React.FC = () => {
  const service = services.find((item) => item.key === 'data')!;

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
      <PageHeader en="Articles" title={pageTitle} service="data" compact image={comicIllust('svc-data')} imageMode="panel" crumbs={[{ label: 'お役立ち記事', href: '/articles' }, { label: pageTitle }]} />
      <article className={ac.article}>
        <div className={ac.sheet}>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className={ac.tag.data}>データ活用</span>
            <time dateTime={published} className={ac.date}>{published}</time>
          </div>
          <p className="text-[#30343F] leading-[2] mb-8">「売上は毎月集計しているのに、増えた理由も減った理由もよく分からない」。そんな悩みを持つ会社は少なくありません。売上の見える化とは、売上の数字を月や顧客、商品ごとに分けて、表やグラフでひと目で分かる形にすることです。大がかりなシステムがなくても、Excelと手元のデータから始められます。この記事では、最初に見る数字の決め方から、元データの整え方、Excelでの集計、数字の読み方、社内で見る習慣づくりまでを順に整理します。</p>

          <h2 className={heading}>1. 売上の見える化で答えたい問いを決める</h2>
          <p className={paragraph}>見える化を始めるときに、いきなりグラフを作るのは避けましょう。先に決めたいのは「この数字を見て、何を判断したいか」です。問いが決まっていないと、グラフをたくさん作っても眺めて終わりになりがちです。</p>
          <p className={paragraph}>中小企業で最初の問いになりやすいのは、次のようなものです。今月の売上は去年の同じ月と比べてどうか。売上を支えている顧客や商品はどれか。減っている取引先はないか。担当者や営業所によって差があるか。このうち、経営者や営業の責任者がいちばん知りたいものを一つか二つ選びます。</p>
          <p className={paragraph}>問いを選んだら、その答えを見たあとに取る行動も書き出しておきます。たとえば「前年より売上が下がった顧客が分かったら、担当者に状況を聞く」といった形です。行動まで決めておくと、必要な数字の細かさや、どのくらいの頻度で見ればよいかが見えてきます。</p>

          <h2 className={heading}>2. 最初に見る数字と切り口を選ぶ</h2>
          <p className={paragraph}>売上は、どの切り口で分けるかによって見え方が変わります。切り口とは、数字を分ける単位のことです。月、顧客、商品、担当者などがあり、それぞれ分かることと必要なデータが違います。</p>
          <div className={`overflow-x-auto my-7 ${ac.tableWrap}`} role="region" aria-label="売上を見る切り口の比較（横にスクロールできます）" tabIndex={0}>
            <table className="w-full min-w-[640px] text-sm border-collapse text-[#30343F]">
              <caption className={ac.caption}>売上を見る主な切り口</caption>
              <thead className={ac.thead}><tr><th scope="col" className="p-4 text-left">切り口</th><th scope="col" className="p-4 text-left">分かること</th><th scope="col" className="p-4 text-left">元データに必要な列</th><th scope="col" className="p-4 text-left">向いているグラフ</th></tr></thead>
              <tbody>
                {[
                  ['月別', '売上の推移、季節による波、前年との比較', '売上日、金額', '折れ線グラフ、棒グラフ'],
                  ['顧客別', '売上を支える取引先、減っている取引先', '顧客コード、顧客名、金額', '横向きの棒グラフ（多い順）'],
                  ['商品別', 'よく売れる商品、伸びている商品群', '商品コード、商品名、商品分類、金額', '横向きの棒グラフ（多い順）'],
                  ['担当者・営業所別', '担当ごとの売上の差、目標との差', '担当者、営業所、金額', '棒グラフ、目標と実績の表'],
                  ['粗利（あらり）', '売上から原価を引いた、実際にもうけた額', '金額、原価', '表、棒グラフ']
                ].map(([axis, know, cols, chart]) => <tr key={axis}><th scope="row" className="p-4 border-t-2 border-[#111]/20 text-left font-bold text-sumi">{axis}</th><td className="p-4 border-t-2 border-[#111]/20">{know}</td><td className="p-4 border-t-2 border-[#111]/20">{cols}</td><td className="p-4 border-t-2 border-[#111]/20">{chart}</td></tr>)}
              </tbody>
            </table>
          </div>
          <p className={paragraph}>最初は「月別」と、もう一つだけを選ぶのがおすすめです。月別の推移は、どの会社でも基本になるうえ、売上日と金額があれば作れます。二つ目は、第1章で決めた問いに合わせて、顧客別か商品別を選びましょう。粗利は経営判断に役立つ数字ですが、原価のデータがそろっていないことも多いため、売上の見える化が回り始めてから加えても遅くありません。</p>

          <h2 className={heading}>3. 元データを集計しやすい形に整える</h2>
          <p className={paragraph}>見える化でいちばん手間がかかるのは、グラフ作りではなく元データの準備です。元データとは、集計のもとになる売上の明細のことです。販売管理システムや会計ソフトから書き出したもの、請求書を手入力した一覧などが当てはまります。</p>
          <h3 className={subheading}>1行に1件の取引を書く</h3>
          <p className={paragraph}>集計しやすい表の基本は、1行に1件の取引を書き、1列に1種類の項目を入れることです。見た目を整えるために月ごとに表を分けたり、顧客ごとに小計の行を挟んだりした表は、人が読むには便利でも集計には向きません。月ごとのシートに分かれている場合は、一つのシートにまとめ、売上日の列で月を区別します。</p>
          <h3 className={subheading}>コードと表記をそろえる</h3>
          <p className={paragraph}>同じ顧客が「株式会社〇〇」「（株）〇〇」「〇〇」と別々に書かれていると、集計では別の顧客として扱われます。顧客や商品にはコード（番号）を付け、名前ではなくコードで集計できるようにしましょう。システムから書き出したデータなら、多くの場合コードの列がすでにあります。</p>
          <div className={ac.box}>
            <p className={ac.boxTitle}>元データの確認チェックリスト</p>
            <ul className="space-y-2 text-[#30343F] leading-[2]">
              {[
                '見出しの行が1行だけで、列の名前が重複していないか',
                '結合したセルや、途中の空白行・小計の行がないか',
                '売上日が日付として入っているか（文字の「10月分」などになっていないか）',
                '金額の列に、数字以外の文字や単位が混ざっていないか',
                '顧客と商品にコードがあり、表記ゆれがないか',
                '返品や値引きをどう記録しているか（マイナスの行か、別の列か）が決まっているか',
                '税抜きと税込みのどちらで集計するかがそろっているか',
                '毎月どこからデータを取り出し、誰が追加するかが決まっているか'
              ].map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className={ac.check} />{item}</li>)}
            </ul>
          </div>
          <p className={paragraph}>見出しを1行にする、列の中の値の種類をそろえる、といった考え方は、ExcelだけでなくBIツールにデータを読み込むときにも共通する基本です。ここで整えた表は、あとでツールを替えてもそのまま使えます。</p>

          <h2 className={heading}>4. Excelのピボットテーブルで集計とグラフを作る</h2>
          <p className={paragraph}>元データが整ったら、Excelのピボットテーブルで集計します。ピボットテーブルは、関数を書かずに、項目を選ぶだけで合計や件数を集計できる機能です。手順は次のとおりです。</p>
          <ol className="list-decimal pl-6 text-[#30343F] leading-[2] space-y-3">
            <li><strong className="text-sumi">元データをテーブルにする：</strong>明細の範囲を選び、テーブルとして書式設定します。テーブルにしておくと、行を追加したときに集計の範囲が自動で広がります。</li>
            <li><strong className="text-sumi">ピボットテーブルを作る：</strong>テーブル内のセルを選んでピボットテーブルを挿入し、新しいシートに置きます。</li>
            <li><strong className="text-sumi">月別に集計する：</strong>行に売上日、値に金額を入れます。日付は月や四半期、年の単位にグループ化できます。</li>
            <li><strong className="text-sumi">切り口を足す：</strong>行を顧客名や商品分類に替えたり、列に年を入れて前年と並べたりします。金額の多い順に並べ替えると、上位がすぐに分かります。</li>
            <li><strong className="text-sumi">絞り込みのボタンを付ける：</strong>スライサーを付けると、担当者や営業所をボタンで切り替えられます。タイムラインを付けると、期間を年・四半期・月・日の単位で選べます。</li>
            <li><strong className="text-sumi">グラフにする：</strong>ピボットグラフを挿入し、月別は折れ線か棒、顧客別や商品別は横向きの棒グラフにします。</li>
          </ol>
          <p className={`${paragraph} mt-4`}>グラフは種類を増やしすぎないことが大切です。円グラフや立体のグラフは見栄えはしても、項目が多いと差が読み取りにくくなります。一つのグラフで伝えることは一つに絞り、タイトルに「月別売上の推移（前年比較）」のように、何を見るグラフかを書いておきましょう。画面の操作や名前はExcelの版によって異なることがあるため、迷ったときはMicrosoftのサポートページで確認してください。</p>

          <div className={ac.promo}>
            <img src={promoHeroSrc} alt="" className={ac.promoHero} loading="lazy" />
            <span aria-hidden="true" className={ac.promoLabel}>ARCLE TIP!</span>
            <p className={ac.promoTitle}>売上の見える化を一緒に始めたい方へ</p>
            <p className={paragraph}>Arcleのデータ活用支援では、売上などのテーマを一つ決めて、Excelや既存システムのデータから自動で更新されるダッシュボードを作るところから支援しています。どの数字から見ればよいかの整理や、作ったあとの操作の説明も含めてご相談いただけます。</p>
            <a href={service.href} className="inline-flex items-center gap-2 text-svc-data font-bold hover:underline underline-offset-4">データ活用支援の内容を確認する<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </div>

          <h2 className={heading}>5. 見える化した売上の数字を読むポイント</h2>
          <p className={paragraph}>集計ができたら、次は数字の読み方です。同じグラフでも、どこを見るかを決めておかないと、人によって受け取り方がばらばらになります。</p>
          <h3 className={subheading}>前月より前年同月と比べる</h3>
          <p className={paragraph}>売上には季節の波があることが多いため、前の月と比べるだけでは、増減が季節によるものか、本当の変化かを区別できません。去年の同じ月と比べる「前年同月比」を基本にしましょう。月ごとの増減が大きい業種では、1月からの累計や、直近12か月の合計の推移もあわせて見ると、流れをつかみやすくなります。</p>
          <h3 className={subheading}>上位の顧客と商品の偏りを確かめる</h3>
          <p className={paragraph}>顧客別や商品別の売上を多い順に並べ、上から順に足していくと、売上が一部の顧客や商品にどのくらい偏っているかが分かります。このように上位から順に区分して重点を決める方法は、ABC分析と呼ばれます。上位の顧客は取引が続くよう関係を保ち、伸びている商品は在庫や提案を厚くする、といった判断につなげます。偏りが大きいと分かった場合は、特定の取引先に頼りすぎていないかを考えるきっかけにもなります。</p>
          <h3 className={subheading}>件数と単価に分けて考える</h3>
          <p className={paragraph}>売上が下がったとき、原因が「取引の件数が減った」のか「1件あたりの金額が下がった」のかで、打つ手は変わります。売上の合計だけでなく、取引の件数と平均の単価も並べて見ておくと、原因を探しやすくなります。ピボットテーブルでは、値に金額の合計と件数を並べれば確認できます。</p>
          <p className={paragraph}>数字の変化に気づいたら、すぐに結論を出さず、現場の担当者に事情を聞きましょう。大口の受注が前倒しになっただけ、ということもあります。数字は判断の材料であり、話し合いのきっかけとして使うのが現実的です。</p>

          <h2 className={heading}>6. 社内で見る習慣をつくり、次の段階を考える</h2>
          <p className={paragraph}>見える化は、作って終わりではなく、決まったタイミングで見られて初めて役に立ちます。次の三つを決めておくと、続けやすくなります。</p>
          <ul className="list-disc pl-6 text-[#30343F] leading-[2] space-y-2">
            <li>更新の担当と期日：誰が、毎月何日までに新しい月のデータを追加するかを決めます。</li>
            <li>見る場面：月初の営業会議や経営会議など、数字を見る場を決め、最初の数分で確認する流れにします。</li>
            <li>置き場所：最新のファイルを一つの共有フォルダに置き、古い版のコピーが出回らないようにします。</li>
          </ul>
          <p className={`${paragraph} mt-4`}>しばらく続けると、「毎月の更新に時間がかかる」「複数のシステムのデータを合わせたい」「スマートフォンでも見たい」といった要望が出てきます。そのときがBIツールを検討する時期です。BIツールは、データを集めて自動で集計し、グラフや表にまとめて共有できるソフトです。たとえばMicrosoftのPower BI Desktopは、レポートを無料で作成できるアプリとして案内されています。一方、Power BIのサービス上でレポートを同僚と共有するには、Power BI Proなどの有料ライセンスが必要になる場合があります。料金や条件は変わることがあるため、最新の情報は公式サイトで確認してください。</p>
          <p className={paragraph}>Excelで月次の報告を自動化する流れは<a href="/articles/excel-report-automation-power-bi" className="text-svc-data hover:underline underline-offset-4">Excel集計を自動化する｜Power BIで月次報告</a>で、ツールの選び方は<a href="/articles/sme-bi-tableau-powerbi" className="text-svc-data hover:underline underline-offset-4">中小企業のためのTableauとPower BIの選び方</a>で紹介しています。Excelで見る数字と表の形が決まっていれば、ツールを移すときの手戻りを減らせます。</p>

          <h2 className={heading}>まとめ：問いを決め、整った明細から小さく始める</h2>
          <p className={paragraph}>売上データの見える化は、答えたい問いを決め、月別ともう一つの切り口に絞って始めるのが近道です。いちばん手間がかかるのは、1行1取引の明細にそろえる元データの準備です。ここを整えれば、Excelのピボットテーブルだけでも、前年同月比や上位の顧客を確かめられます。まずは直近2年分の売上明細を書き出し、月別の推移を一枚のグラフにするところから始めてみてください。</p>

          <section className="mt-14">
            <h2 className={heading}>よくある質問</h2>
            <div className={ac.faq}>
              {faqs.map((faq) => <div key={faq.q}><h3 className={ac.faqQ}>{faq.q}</h3><p>{faq.a}</p></div>)}
            </div>
          </section>
          <section className={ac.related}>
            <h2 className={ac.h2Flat.data}>関連記事</h2>
            <div className="space-y-3">
              <a href="/articles/excel-report-automation-power-bi" className={ac.relatedLink}>Excel集計を自動化する｜Power BIで月次報告</a>
              <a href="/articles/sme-bi-tableau-powerbi" className={ac.relatedLink}>中小企業のためのTableauとPower BIの選び方</a>
              <a href="/articles" className={ac.allLink}>記事一覧を見る</a>
            </div>
          </section>
          <section className={ac.svcBox.data}>
            <h2 className={ac.svcTitle}>関連サービス</h2>
            <a href={service.href} className={ac.svcBtn}>{service.name}を詳しく見る<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </section>
          <p className={ac.author}>この記事を書いた人：栗原 勇太（Arcle代表）<br /><a href="/company/message" className="text-svc-data hover:underline underline-offset-4">代表メッセージを見る</a></p>
        </div>
      </article>
      <ContactCta />
    </div>
  );
};

export default ArticleSalesVisualization;
