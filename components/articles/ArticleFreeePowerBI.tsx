import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ContactCta, PageHeader, comicIllust } from '../next/parts';
import { services } from '../next/theme';
import { ac, promoHeroSrc } from './articleComic';
import ArticleWorks from '../works/ArticleWorks';

const title = '愛知・東海の中小企業向け｜freeeの会計データをPower BIで見る';
// 画面の見出しには地域名を出さない（地域名はtitleとmetaだけ）
const pageTitle = 'freeeの会計データをPower BIで見る手順';
const description = '愛知・東海の中小企業向けに、freee会計のデータをPower BIで見る手順を解説します。仕訳帳のCSVの書き出し、つなぎ方の選び方、部門や品目のタグの付け方、取り込みと整形、毎月の更新、試算表と数字が合わないときの確認方法までまとめました。';
const canonical = 'https://www.arcle.net/articles/freee-data-power-bi';
const published = '2026-11-05';
const faqs = [
  { q: 'freeeのレポート機能だけでは足りませんか？', a: '試算表や月次推移など、freeeの画面で確認できることは多くあります。会計の数字だけを見るならfreeeで十分な場合もあります。販売管理のExcelや勤怠の記録など、会計以外のデータと並べて見たいときや、見たい切り口を毎月同じ画面で共有したいときに、Power BIを検討するとよいでしょう。' },
  { q: 'Power BIを使うには費用がかかりますか？', a: 'レポートを作るPower BI Desktopは無料で使えます。作ったレポートを社内の人とWeb上で共有するには、有料のライセンスが必要になるのが基本です。必要なライセンスは見る人の人数や共有のしかたで変わるため、最新の料金と条件はMicrosoftの公式サイトで確認してください。' },
  { q: 'MacでもPower BIのレポートを作れますか？', a: 'Power BI DesktopはWindows向けのアプリです。Macしかない場合は、Windowsの環境を用意するか、Web版のPower BIでできる範囲を確かめる必要があります。作ったレポートを見るだけなら、ブラウザーやスマホのアプリからも閲覧できます。' },
  { q: '顧問税理士とデータの見方がずれないか心配です', a: '決算整理仕訳を入れる時期や、税込・税抜のどちらで見るかを、顧問税理士と先に確認しておくと安心です。Power BIの数字は、毎月freeeの試算表と照らし合わせ、合っていることを確かめてから会議に使いましょう。' }
];
const heading = ac.h2.data;
const paragraph = ac.p;
const subheading = ac.h3;

const ArticleFreeePowerBI: React.FC = () => {
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
          <p className="text-[#30343F] leading-[2] mb-8">freee会計で日々の記帳を進めていると、「部門ごとの利益を毎月並べて見たい」「販売管理のExcelと合わせて分析したい」と感じる場面が出てきます。そんなときの選択肢の一つが、Power BIです。Power BIは、Microsoftが提供するBIツール（データを集めてグラフや表で見られるようにするツール）です。この記事では、freeeの会計データをPower BIで見るための、つなぎ方の選び方から書き出し、取り込み、毎月の更新までを順に説明します。</p>

          <h2 className={heading}>1. freeeとPower BIの役割を分けて考える</h2>
          <p className={paragraph}>最初に整理したいのは、freeeでできることと、Power BIに任せたいことの線引きです。freee会計には、試算表や月次推移など、会計の数字を確認する画面がそろっています。会計の数字を確認するだけなら、まずはfreeeの画面を使いこなすほうが早い場合もあります。</p>
          <p className={paragraph}>Power BIが向いているのは、見たい切り口が決まっていて、それを毎月同じ形で見たい場合です。たとえば、部門別の粗利を12か月並べて前年と比べる、会計の売上と販売管理の受注件数を一枚の画面で見る、といった使い方です。会計以外のデータと組み合わせたいときや、経営会議で同じ画面を見ながら話したいときに、効果を感じやすくなります。</p>
          <p className={paragraph}>反対に、仕訳を入力する、帳簿を締める、決算書を作るといった作業はfreeeで行います。Power BIは数字を見るための道具で、会計データを書き換える場所ではありません。「入力と確定はfreee、見る・比べるはPower BI」と役割を分けておくと、どちらの数字が正しいのかで迷わずに済みます。</p>

          <h2 className={heading}>2. freeeのデータをPower BIにつなぐ三つの方法</h2>
          <p className={paragraph}>2026年11月時点で、Microsoftが公開しているPower Query（Power BIでデータを取り込む機能）のコネクタ一覧に、freeeは含まれていません。そのため、freeeのデータは、ファイルを書き出すか、別の仕組みを使ってPower BIに渡すことになります。代表的な方法を比べると次のとおりです。</p>
          <div className={`overflow-x-auto my-7 ${ac.tableWrap}`} role="region" aria-label="freeeのデータをPower BIにつなぐ方法の比較（横にスクロールできます）" tabIndex={0}>
            <table className="w-full min-w-[640px] text-sm border-collapse text-[#30343F]">
              <caption className={ac.caption}>freeeのデータをPower BIにつなぐ方法</caption>
              <thead className={ac.thead}><tr><th scope="col" className="p-4 text-left">方法</th><th scope="col" className="p-4 text-left">向いている会社</th><th scope="col" className="p-4 text-left">手間と費用</th><th scope="col" className="p-4 text-left">気をつける点</th></tr></thead>
              <tbody>
                {[
                  ['CSVを書き出して取り込む', '月に一度、締めたあとの数字を見られればよい会社', '毎月の書き出しが数分。追加の費用はかかりにくい', '書き出す期間と保存先のルールを決める'],
                  ['freee APIで自動で取り出す', '毎日の数字を見たい、手作業をなくしたい会社', '仕組みを作る開発が必要。保守の担当も要る', '認証の管理、仕様変更への対応'],
                  ['外部の連携サービスを使う', '開発はしたくないが、自動化はしたい会社', 'サービスの利用料がかかる', '提供元、取得できるデータ、料金を確認する']
                ].map(([way, fit, cost, care]) => <tr key={way}><th scope="row" className="p-4 border-t-2 border-[#111]/20 text-left font-bold text-sumi">{way}</th><td className="p-4 border-t-2 border-[#111]/20">{fit}</td><td className="p-4 border-t-2 border-[#111]/20">{cost}</td><td className="p-4 border-t-2 border-[#111]/20">{care}</td></tr>)}
              </tbody>
            </table>
          </div>
          <p className={paragraph}>APIは、ソフト同士がデータをやり取りするための窓口です。freeeのヘルプでは、freee会計の公開APIは全プランで使えると案内されています。ただし、APIを使うにはプログラムを作り、動かし続ける必要があります。IT担当者がいない会社では、まずCSVで始め、見たい画面が固まってから自動化を考える順番がおすすめです。この記事でも、CSVを使う方法を中心に説明します。</p>

          <h2 className={heading}>3. 始める前に、見る数字とタグの付け方を決める</h2>
          <p className={paragraph}>Power BIでどんな切り口で見られるかは、freeeにどんな情報を付けて記帳しているかで決まります。freeeでは、取引に「取引先」「部門」「品目」「メモタグ」などのタグを付けられます。部門タグが付いていない取引は、Power BIでも部門別に分けられません。グラフを作る前に、見たい切り口とタグの付け方をそろえておきましょう。</p>
          <ul className="list-disc pl-6 text-[#30343F] leading-[2] space-y-2">
            <li>見たい数字：売上、粗利、販管費、営業利益のうち、毎月の会議で何を見るかを決めます。</li>
            <li>切り口：部門別、取引先別、品目（商品やサービスの種類）別など、どの単位で分けたいかを決めます。</li>
            <li>タグのルール：どの取引にどのタグを付けるか、付け忘れたときに誰が直すかを決めます。</li>
            <li>月の区切り：取引日で見るのか、締め後の確定した月で見るのかをそろえます。</li>
            <li>税込か税抜か：経理の方式と合わせ、レポートでどちらを表示するかを決めます。</li>
          </ul>
          <p className={`${paragraph} mt-4`}>過去の取引にタグが付いていない場合は、すべてを直そうとせず、「今期の初めから付ける」と区切るのも一つの方法です。前年との比較は、タグがそろっている期間だけで行うと決めておけば、数字の意味を誤解せずに済みます。</p>

          <h2 className={heading}>4. freeeから仕訳帳をCSVで書き出す</h2>
          <p className={paragraph}>Power BIに取り込むデータは、仕訳帳が扱いやすい形です。試算表や月次推移は集計済みの表なので、Power BIで切り口を変えにくくなります。仕訳帳なら、一件ずつの仕訳に日付、勘定科目、金額、タグが入っているため、Power BIの側で好きな単位に集計できます。</p>
          <h3 className={subheading}>手順1：期間を絞り込んで書き出す</h3>
          <p className={paragraph}>freee会計の「仕訳帳」画面で期間などの条件を指定して絞り込み、［インポート・エクスポート］からCSVで書き出します。条件を指定しないと、今の会計期間の仕訳がまとめて出力されます。以前に書き出したファイルは「出力した帳票一覧」から再びダウンロードできます。画面の名前や手順は変わることがあるため、迷ったときはfreeeのヘルプで最新の手順を確認してください。帳票によっては、契約しているプランで書き出せないものもあります。</p>
          <h3 className={subheading}>手順2：ファイル名と置き場所を決める</h3>
          <p className={paragraph}>書き出したCSVは、決まった場所に、決まった名前で保存します。たとえば「仕訳帳_2026-10.csv」のように月が分かる名前にし、社内のSharePointやOneDriveの決めたフォルダーに置きます。個人のパソコンのデスクトップに置くと、その人が休んだときに更新が止まります。後で説明する自動更新のためにも、クラウド上の共有フォルダーにまとめておきましょう。</p>
          <h3 className={subheading}>手順3：文字化けや列の変化を確かめる</h3>
          <p className={paragraph}>CSVを開いて文字化けしている場合は、文字コード（文字をデータとして表す方式）が合っていない可能性があります。保存し直すときに文字コードを指定すると直ることがあります。また、書き出しの形式を途中で変えると、列の名前や並びが変わり、Power BIでの取り込みが失敗します。毎月同じ形式で書き出すよう、手順をメモに残しておきましょう。</p>

          <div className={ac.promo}>
            <img src={promoHeroSrc} alt="" className={ac.promoHero} loading="lazy" />
            <span aria-hidden="true" className={ac.promoLabel}>ARCLE TIP!</span>
            <p className={ac.promoTitle}>freeeの数字を見える化する仕組みづくりを相談したい方へ</p>
            <p className={paragraph}>Arcleのデータ活用支援では、Excelや既存システムのデータから自動で更新されるダッシュボードを作り、操作の説明までお手伝いします。Arcle代表はfreee認定 会計上級エキスパートの資格を持っており、会計データの見方も含めてご相談いただけます。まずは売上など一つのテーマから始められます。</p>
            <a href={service.href} className="inline-flex items-center gap-2 text-svc-data font-bold hover:underline underline-offset-4">データ活用の支援内容を確認する<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </div>

          <h2 className={heading}>5. Power BIで取り込んで、会計の形に整える</h2>
          <p className={paragraph}>レポートは、無料のPower BI Desktopで作ります。毎月のCSVを一つずつ取り込むのではなく、「フォルダー」や「SharePointフォルダー」から取り込み、フォルダー内のファイルをまとめて結合する設定にします。こうしておけば、新しい月のCSVをフォルダーに置くだけで、次の更新から自動で対象に入ります。</p>
          <h3 className={subheading}>借方と貸方を一つの金額にそろえる</h3>
          <p className={paragraph}>仕訳は、借方と貸方の二つの欄に分かれています。そのままでは「売上がいくらか」を集計しにくいため、Power Queryで整えます。売上などの収益は「貸方の金額から借方の金額を引く」、費用は「借方の金額から貸方の金額を引く」と決めて、一つの金額の列を作るのが基本の考え方です。この計算を誤ると、返品や取消の仕訳で数字が二重に増えるなどのずれが起きます。</p>
          <h3 className={subheading}>勘定科目の表と日付の表を用意する</h3>
          <p className={paragraph}>勘定科目を損益計算書の順に並べるには、別に勘定科目の表を作ります。勘定科目ごとに「売上高」「売上原価」「販管費」などの区分と並び順を書いた、小さなExcelの表で十分です。あわせて、日付の表（カレンダー）を作り、年度や四半期で切り替えられるようにします。会計年度が4月始まりなどの場合は、日付の表で年度の区切りを合わせておくと、前年比較がしやすくなります。</p>
          <h3 className={subheading}>最初の画面は一枚に絞る</h3>
          <p className={paragraph}>最初から多くのグラフを作る必要はありません。たとえば「月別の売上と粗利の推移」「部門別の営業利益」「前年同月との差」の三つを一枚の画面に置くところから始めます。会議で実際に使い、「ここが知りたい」という声が出てから画面を足すほうが、使われるレポートになります。</p>

          <h2 className={heading}>6. 毎月の更新と共有の流れを決める</h2>
          <p className={paragraph}>レポートができたら、毎月誰が何をするかを決めます。作ったときは正しい数字が出ていても、更新の手順が決まっていないと、数か月で使われなくなってしまいます。</p>
          <ol className="list-decimal pl-6 text-[#30343F] leading-[2] space-y-3">
            <li><strong className="text-sumi">月次の締めを終える：</strong>経理担当者が記帳とタグの付け忘れを確認し、その月の数字を確定します。</li>
            <li><strong className="text-sumi">仕訳帳を書き出して置く：</strong>決めた名前で、決めたフォルダーにCSVを保存します。</li>
            <li><strong className="text-sumi">レポートを更新する：</strong>Power BIの画面で更新を実行し、最新の月が反映されたか確かめます。</li>
            <li><strong className="text-sumi">試算表と照らし合わせる：</strong>売上と営業利益の合計が、freeeの試算表と合っているかを確認してから共有します。</li>
          </ol>
          <p className={`${paragraph} mt-4`}>作ったレポートをWeb上のPower BIに発行すると、スケジュール更新を設定できます。Microsoftの説明では、SharePoint OnlineやOneDriveのようなクラウド上のデータは、直接つながる場合はデータゲートウェイ（社内のパソコンとPower BIをつなぐ中継ソフト）なしで更新できます。一方、社内のパソコンやNASに置いたファイルを更新するには、ゲートウェイの準備が必要です。また、Power BI Proなどで使う共有容量では、スケジュール更新は1日8回までと案内されています。月次の会計データであれば、この回数で困ることは少ないでしょう。</p>
          <p className={paragraph}>社内の人とレポートを共有するには、有料のライセンスが必要になるのが基本です。誰が作り、誰が見るのかを整理してから、必要なライセンスを確かめましょう。最新の料金と条件は、Microsoftの公式サイトで確認してください。</p>

          <h2 className={heading}>7. 試算表と数字が合わないときの確認ポイント</h2>
          <p className={paragraph}>Power BIの数字がfreeeの試算表と合わないと、レポート全体が信用されなくなります。ずれが出たときは、次の観点で順に確認してください。</p>
          <div className={ac.box}>
            <p className={ac.boxTitle}>数字が合わないときのチェックリスト</p>
            <ul className="space-y-2 text-[#30343F] leading-[2]">
              {[
                '書き出した仕訳帳の期間が、比べている試算表の期間と同じか',
                '同じ月のCSVを二重に置いていないか（ファイル名の付け間違いを含む）',
                '収益と費用で、借方と貸方の引き算の向きを正しく分けているか',
                '決算整理仕訳や月末の振替仕訳を、両方で同じように含めているか',
                '税込・税抜の表示が、試算表の設定とそろっているか',
                '勘定科目の表に、新しく追加した勘定科目が入っているか',
                '部門タグが空の取引を、「部門なし」として集計に含めているか'
              ].map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className={ac.check} />{item}</li>)}
            </ul>
          </div>
          <p className={paragraph}>特に見落としやすいのは、新しく作った勘定科目です。勘定科目の表に載っていないと、その科目の金額がどの区分にも入らず、合計が合わなくなります。勘定科目を追加したら表も直す、という手順を毎月の流れに加えておきましょう。原因を見つけたら、チェックリストに書き足して次の月に生かします。</p>

          <h2 className={heading}>まとめ：CSVで小さく始め、毎月の照合で信頼を育てる</h2>
          <p className={paragraph}>freeeの会計データをPower BIで見るには、仕訳帳のCSVを決めた場所に置き、Power BIでまとめて取り込む方法が始めやすい選択です。その前に、見たい数字とタグの付け方をそろえておくことで、部門別や取引先別の分析ができるようになります。毎月の更新手順を決め、試算表と照らし合わせてから共有すれば、会議で安心して使える数字になります。まずは直近12か月の仕訳帳を書き出し、月別の売上と粗利を一枚の画面にするところから試してみてください。</p>

          <section className="mt-14">
            <h2 className={heading}>よくある質問</h2>
            <div className={ac.faq}>
              {faqs.map((faq) => <div key={faq.q}><h3 className={ac.faqQ}>{faq.q}</h3><p>{faq.a}</p></div>)}
            </div>
          </section>
          <ArticleWorks service="data"/>
    <section className={ac.related}>
            <h2 className={ac.h2Flat.data}>関連記事</h2>
            <div className="space-y-3">
              <a href="/articles/excel-report-automation-power-bi" className={ac.relatedLink}>Excel集計を自動化する｜Power BIで月次報告</a>
              <a href="/articles/sales-data-visualization-first-steps" className={ac.relatedLink}>売上データの見える化を始める手順</a>
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

export default ArticleFreeePowerBI;
