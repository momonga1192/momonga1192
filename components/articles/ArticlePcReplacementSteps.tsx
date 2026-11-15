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

const title = '会社のパソコン入れ替え手順｜データ移行から廃棄までの5つの段取り';
// 画面の見出しには地域名を出さない（地域名はtitleとmetaだけ）
const pageTitle = '会社のパソコンを入れ替えるときの段取り（データ移行・設定・廃棄）';
const description = '愛知・東海の中小企業向けに、会社のパソコンを入れ替える手順を解説します。今のパソコンの洗い出し、新しいパソコンの設定、データ移行で移らないもの、配る日の確認、古いパソコンのデータ消去と処分まで、4週間前からの段取り表付きでまとめました。';
const canonical = 'https://www.arcle.net/articles/pc-replacement-steps-sme';
const published = '2026-11-16';
const modified = '2026-11-16';
const faqs = [
  { q: 'パソコンは何年ごとに入れ替えるのがよいですか？', a: '決まった年数はありません。税務上の耐用年数はパソコンで4年ですが、これは減価償却の計算に使う年数です。動作の遅さ、Windowsやソフトのサポートの期限、修理の保証の期限を見て、1台ずつ判断しましょう。' },
  { q: 'Windowsのバックアップ機能を使えば、会社のパソコンのデータも丸ごと移せますか？', a: 'Windows バックアップは、職場や学校のアカウントでは使えないとMicrosoftは説明しています。会社のアカウントで使っているパソコンは、OneDriveや共有フォルダにファイルを置いてから、新しいパソコンで開き直す形で移すのが基本です。' },
  { q: 'Windowsの初期化（PCのリセット）をすれば、データは消えますか？', a: '「すべて削除する」と「データの消去」を選べば、復元しにくくなります。ただし、政府や業界のデータ消去の基準は満たしていないとMicrosoftは説明しています。顧客情報などを保存していたパソコンは、消去ソフトや物理的な破壊、証明書を出す業者も検討してください。' },
  { q: '入れ替えの作業は、業者にどこまで頼めますか？', a: '初期設定、データの移し替え、古いパソコンのデータ消去と回収は、外に頼みやすい作業です。誰にどのパソコンを渡すか、どのデータを残すか、いつ配るかは社内で決めます。' }
];
const heading = ac.h2.josys;
const paragraph = ac.p;
const subheading = ac.h3;
const link = 'text-svc-josys underline underline-offset-4';

const ArticlePcReplacementSteps: React.FC = () => {
  const service = services.find((item) => item.key === 'josys')!;

  return (
    <div className={ac.page}>
      <Helmet>
        <title>{title} | Arcle</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Article', headline: title, description,
          datePublished: published, dateModified: modified,
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
            <time dateTime={modified} className={ac.dateJa}>更新日 {modified}</time>
          </div>
          <ArticleSummary service="josys">会社のパソコンの入れ替えは、今のパソコンの洗い出し、新しいパソコンの設定、データの移し替え、配る日の確認、古いパソコンの処分の5つの順で進めます。データは、パソコンの中にしかないものだけを移し、電子証明書や業務ソフトのように道具では移らないものを先に確かめます。古いパソコンは、しばらく保管して漏れがないと確かめてから、データを消して処分します。</ArticleSummary>
          <p className="text-[#30343F] leading-[2] mb-8">会社のパソコンをまとめて入れ替えるとき、新しいパソコンを買って配るだけなら簡単そうに見えます。実際には、データの移し忘れや、プリンターや業務ソフトが使えないことで仕事が止まりがちです。古いパソコンの処分も、情報漏えいにつながるため後回しにできません。この記事では、IT担当者がいない会社でも進められるよう、入れ替えを5つの段取りに分け、4週間前からの段取り表とあわせて整理します。</p>

          <ArticleToc service="josys" items={[{"id":"sec-1","label":"今のパソコンと使い方を洗い出す"},{"id":"sec-2","label":"新しいパソコンを選び、会社としての設定を決める"},{"id":"sec-3","label":"データは「パソコンの中にしかないもの」だけを移す"},{"id":"sec-4","label":"配る日を決め、1台目で手順を確かめる"},{"id":"sec-5","label":"古いパソコンはデータを消してから処分する"},{"id":"sec-6","label":"入れ替えの段取り表（4週間前から処分まで）"},{"id":"sec-7","label":"まとめ：移す・確かめる・消すの順で進める"},{"id":"faq","label":"よくある質問"}]}/>
          <h2 id="sec-1" className={heading}>1. 今のパソコンと使い方を洗い出す</h2>
          <p className={paragraph}>最初に行うのは、今のパソコンの洗い出しです。誰が、どのパソコンで、何をしているかが分からないと、必要な性能も移すデータも決められません。一覧はExcelで十分で、そのままIT機器の台帳として使えます。</p>
          <ul className="list-disc pl-6 text-[#30343F] leading-[2] space-y-2">
            <li>使う人と用途：事務、設計、外回りなど</li>
            <li>機種と購入時期：メーカー、型番、買った年、Windowsのバージョン</li>
            <li>所有の区分：買い取りか、リースやレンタルか（リースは返却の条件を確認）</li>
            <li>使っているソフト：会計、給与、販売管理、CADなど、インストールが必要なもの</li>
            <li>つないでいる機器：プリンター、複合機、スキャナー、ラベルプリンターなど</li>
            <li>データの置き場所：パソコンの中、共有フォルダ（NAS）、OneDriveなどのクラウド</li>
          </ul>
          <p className={`${paragraph} mt-4`}>入れ替える時期もここで決めます。税務上の耐用年数は、パソコン（サーバー用を除く）で4年と国税庁の表に定められています（<a href="https://www.keisan.nta.go.jp/r5yokuaru/aoiroshinkoku/hitsuyokeihi/genkashokyakuhi/taiyonensukigu1.html" className={link} target="_blank" rel="noopener">国税庁：耐用年数（器具・備品）</a>）。ただし、これは減価償却の計算に使う年数で、使える年数ではありません。動作の遅さ、修理の保証の期限、OSのサポートの期限を見て、1台ずつ判断しましょう。たとえば2025年10月14日にサポートが終わったWindows 10のパソコンは、優先して入れ替えを考える対象です。</p>
          
          <h2 id="sec-2" className={heading}>2. 新しいパソコンを選び、会社としての設定を決める</h2>
          <p className={paragraph}>次に機種を決めます。業務ソフトの動作環境（必要なWindowsのバージョンやメモリの量）は、ソフトの会社の案内で確かめてください。なるべく同じ機種にそろえると、設定の手順が一つで済みます。</p>
          <h3 className={subheading}>1台ずつばらばらにしないために、先に決めること</h3>
          <p className={paragraph}>初期設定は、パソコンを使える状態にする作業で、キッティングとも呼ばれます。1台ずつ思い思いに設定すると、困ったときに原因を探しにくくなるため、次の点を会社として先に決めておきます。</p>
          <ul className="list-disc pl-6 text-[#30343F] leading-[2] space-y-2">
            <li>サインインに使うアカウント：会社のMicrosoft 365のアカウントにするか、パソコンごとのアカウントにするか</li>
            <li>管理者の権限：社員が自分でソフトを入れられるようにするか、管理する人だけにするか</li>
            <li>回復キーの保管先：ドライブの暗号化（BitLocker）を使う場合、回復キーを会社としてどこに保管するか</li>
            <li>入れるソフトの一覧：全員に入れるものと、一部の人だけに入れるもの</li>
          </ul>
          <p className={`${paragraph} mt-4`}>BitLocker（パソコンの中身を暗号化するWindowsの機能）の回復キーが見つからないと、中身を取り出せません。Microsoftの公式の案内では、失った回復キーをMicrosoftのサポートが取り出したり作り直したりすることはできないとされています（<a href="https://support.microsoft.com/ja-jp/windows/6b71ad27-0b89-ea08-f143-056f5ab347d6" className={link} target="_blank" rel="noopener">Microsoft サポート：BitLocker 回復キーの検索</a>）。保存先は1台目の設定のときに確かめます。</p>
          <h3 className={subheading}>Officeのアプリは古いパソコンからサインアウトする</h3>
          <p className={paragraph}>Microsoft 365のOfficeアプリ（Word、Excelなど）は、1つのライセンスで、パソコン5台、タブレット5台、スマホ5台まで入れて使えると説明されています（<a href="https://learn.microsoft.com/ja-jp/microsoft-365-apps/licensing-activation/overview-licensing-activation-microsoft-365-apps" className={link} target="_blank" rel="noopener">Microsoft Learn：Microsoft 365 Apps のライセンスとライセンス認証の概要</a>）。古いパソコンは、Office.comの「アプリ」の画面などでサインアウトしておくと、使っている台数を把握しやすくなります。</p>

          <h2 id="sec-3" className={heading}>3. データは「パソコンの中にしかないもの」だけを移す</h2>
          <p className={paragraph}>データの移し替えでは、全部を移そうとしないことが大切です。共有フォルダやOneDriveのファイルは、新しいパソコンでサインインすれば開けます。移すのは、デスクトップやドキュメントのフォルダなど、そのパソコンの中にしかないものだけです。</p>
          <p className={paragraph}>Windowsには、ファイルや設定を新しいパソコンに移す「Windows バックアップ」があります。ただし、個人用のMicrosoftアカウントが条件で、職場や学校のアカウントでは使えないと公式に説明されています（<a href="https://support.microsoft.com/ja-jp/help/17143" className={link} target="_blank" rel="noopener">Microsoft サポート：Windows バックアップを使用したバックアップと復元</a>）。</p>
          <div className={`overflow-x-auto my-7 ${ac.tableWrap}`} role="region" aria-label="データの種類ごとの移し方（横にスクロールできます）" tabIndex={0}>
            <table className="w-full min-w-[640px] text-sm border-collapse text-[#30343F]">
              <caption className={ac.caption}>データの種類ごとの移し方と注意点</caption>
              <thead className={ac.thead}><tr><th scope="col" className="p-4 text-left">データの種類</th><th scope="col" className="p-4 text-left">移し方</th><th scope="col" className="p-4 text-left">見落としやすい点</th></tr></thead>
              <tbody>
                {[
                  ['共有フォルダ・クラウドのファイル', '移さない。新しいパソコンでサインインして開く', 'ショートカットやネットワークドライブの割り当ては作り直す'],
                  ['パソコンの中のファイル', 'OneDriveや共有フォルダに移してから開き直す', 'デスクトップに置いたままのファイルを確かめる'],
                  ['メール', 'Microsoft 365などのクラウドのメールは移さない', 'パソコンに保存する方式のメールは、データのファイルを移す必要がある'],
                  ['ブラウザーのお気に入りとパスワード', 'ブラウザーの同期機能か、書き出しと読み込みで移す', '保存したパスワードの一覧を、どこに移すか決めておく'],
                  ['業務ソフトとそのデータ', 'ソフトの会社の手順書どおりに入れ直し、データを移す', 'ライセンスの解除や登録の変更が必要なことがある'],
                  ['電子証明書', '発行元の手順で、新しいパソコンで取り直すか移す', 'ネットバンキングや電子申告で使うものは、期限と手続きに時間がかかることがある']
                ].map(([kind, how, point]) => <tr key={kind}><th scope="row" className="p-4 border-t-2 border-[#111]/20 text-left font-bold text-sumi">{kind}</th><td className="p-4 border-t-2 border-[#111]/20">{how}</td><td className="p-4 border-t-2 border-[#111]/20">{point}</td></tr>)}
              </tbody>
            </table>
          </div>
          <h3 className={subheading}>道具では移らないものを先に確かめる</h3>
          <p className={paragraph}>特に気を付けたいのが、コピーしただけでは使えないものです。会計ソフトや給与ソフトは、古いパソコンの登録を解除してから新しいパソコンで登録し直す決まりのことがあるため、ソフトの会社の手順書を先に読みましょう。</p>
          <p className={paragraph}>ネットバンキングや電子申告で使う電子証明書も、パソコンに入っている場合があります。取り直す手続きに日数がかかることもあるため、振込や納付の期限の直前は避け、経理の担当者と早めに手順を確かめてください。</p>
          <p className={paragraph}>メールの署名やプリンターの設定も移し忘れが多いため、古いパソコンの設定画面を写真に撮っておきます。</p>

          <h2 id="sec-4" className={heading}>4. 配る日を決め、1台目で手順を確かめる</h2>
          <p className={paragraph}>まず1台だけ設定し、実際に使う人に試してもらいます。手順をメモしながら進め、つまずいた点を直してから残りに取りかかります。1台目は、使うソフトや機器が多い人のものにすると漏れを見つけやすくなります。</p>
          <h3 className={subheading}>配る日は仕事の山を避ける</h3>
          <p className={paragraph}>渡す日は、月末の請求や給与計算のような忙しい時期を避けます。入れ替えた直後は小さな問い合わせが続くため、午前中に渡し、その日のうちに対応できるようにしておくと安心です。</p>
          <h3 className={subheading}>渡すときの確認リスト</h3>
          <p className={paragraph}>渡すときは、使う人と一緒に次の点を確かめ、確認した日付を台帳に書いておきます。</p>
          <div className={ac.box}>
            <p className={ac.boxTitle}>新しいパソコンを渡すときの確認リスト</p>
            <ul className="space-y-2 text-[#30343F] leading-[2]">
              {[
                '会社のアカウントでサインインでき、パスワードとサインインの確認方法を本人が分かっている',
                'メールの送受信ができ、署名が設定されている',
                '共有フォルダとOneDriveのファイルを開いて保存できる',
                'いつも使うプリンターと複合機で、印刷とスキャンができる',
                '業務ソフトが起動し、データが正しく表示される',
                'Teamsなどの会議ツールで、カメラとマイクが使える',
                '古いパソコンにしかなかったファイルが、新しいパソコンで開ける'
              ].map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className={ac.check} />{item}</li>)}
            </ul>
          </div>

          <div className={ac.promo}>
            <img src={promoHeroSrc} alt="" className={ac.promoHero} loading="lazy" />
            <span aria-hidden="true" className={ac.promoLabel}>ARCLE TIP!</span>
            <p className={ac.promoTitle}>パソコンの初期設定をまとめて任せたい方へ</p>
            <p className={paragraph}>Arcleの情シス代行では、パソコンの初期設定（キッティング）の代行や、Microsoft 365のアカウントとライセンスの管理をお手伝いしています。訪問でのサポートにも対応しているので、入れ替えの段取りを決めるところから、自社の状況に合わせて一緒に進められます。</p>
            <a href={service.href} className="inline-flex items-center gap-2 text-svc-josys font-bold hover:underline underline-offset-4">情シス代行の対応内容を確認する<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </div>

          <h2 id="sec-5" className={heading}>5. 古いパソコンはデータを消してから処分する</h2>
          <p className={paragraph}>新しいパソコンを渡しても、古いパソコンはすぐに処分しないでください。移し忘れたファイルがあとから見つかることがあるためです。2週間から1か月ほど鍵のかかる場所に保管し、使う人に「もう要らない」と確かめてから、データを消して処分します。</p>
          <h3 className={subheading}>ファイルを削除しただけでは、データは消えない</h3>
          <p className={paragraph}>ファイルを削除しただけでは、専用の道具でデータを取り出せることがあります。Windowsの「PCをリセット」で「すべて削除する」を選び、「データの消去」を有効にすると、削除したファイルを復元しにくくなります。ただし、Microsoftの公式の案内では、この機能は一般の利用者向けで、政府や業界のデータ消去の基準は満たしていないとされています（<a href="https://support.microsoft.com/ja-jp/windows/experience/backup-recovery/reset-your-pc" className={link} target="_blank" rel="noopener">Microsoft サポート：PC を初期状態に戻す</a>）。顧客情報を保存していたパソコンは、専用の消去ソフト、物理的な破壊、証明書を出す業者の利用を検討しましょう。</p>
          <h3 className={subheading}>処分の方法を選ぶ</h3>
          <p className={paragraph}>会社で使ったパソコンは、家庭のごみとしては出せません。どの方法でも、誰が、いつ、どうデータを消したかを台帳に残しておきます。</p>
          <div className={`overflow-x-auto my-7 ${ac.tableWrap}`} role="region" aria-label="古いパソコンの処分方法の比較（横にスクロールできます）" tabIndex={0}>
            <table className="w-full min-w-[640px] text-sm border-collapse text-[#30343F]">
              <caption className={ac.caption}>会社の古いパソコンの処分方法</caption>
              <thead className={ac.thead}><tr><th scope="col" className="p-4 text-left">方法</th><th scope="col" className="p-4 text-left">データ消去</th><th scope="col" className="p-4 text-left">確かめること</th></tr></thead>
              <tbody>
                {[
                  ['メーカーやパソコン3R推進協会の回収', '自社で消してから出す', '対象のメーカーか、見積もりと梱包の方法'],
                  ['産業廃棄物の処理業者に頼む', '業者による消去を頼める場合がある', '収集運搬と処分の許可、消去の方法と証明書の有無'],
                  ['買い取り・リユース業者に売る', '業者による消去を頼める場合がある', '消去の方法と証明書、動かないパソコンの扱い'],
                  ['リース会社に返す', '契約で決まっている', 'データを消すのが自社か、リース会社か']
                ].map(([way, erase, check]) => <tr key={way}><th scope="row" className="p-4 border-t-2 border-[#111]/20 text-left font-bold text-sumi">{way}</th><td className="p-4 border-t-2 border-[#111]/20">{erase}</td><td className="p-4 border-t-2 border-[#111]/20">{check}</td></tr>)}
              </tbody>
            </table>
          </div>
          <p className={paragraph}>パソコンメーカーの業界団体であるパソコン3R推進協会は、公式サイトによると環境省の産業廃棄物の広域認定を受け、約30社のメーカーに代わって会社のパソコンを回収・再資源化しています。データは利用者が消してから梱包し、宅配便で回収される流れで、産業廃棄物管理票（マニフェスト）は要らず、廃棄の証明になる報告書が出ると案内されています（<a href="https://www.pc3r.jp/office/" className={link} target="_blank" rel="noopener">パソコン3R推進協会：事業系PCリサイクル</a>）。料金や対象のメーカーは、最新の情報を公式サイトで確かめてください。</p>
          
          <h2 id="sec-6" className={heading}>入れ替えの段取り表（4週間前から処分まで）</h2>
          <p className={paragraph}>5つの段取りを時期ごとにまとめました。10台前後を想定した目安で、台数や業務ソフトが多いときは早めに始めてください。</p>
          <div className={`overflow-x-auto my-7 ${ac.tableWrap}`} role="region" aria-label="パソコン入れ替えの段取り表（横にスクロールできます）" tabIndex={0}>
            <table className="w-full min-w-[640px] text-sm border-collapse text-[#30343F]">
              <caption className={ac.caption}>パソコン入れ替えの段取り表</caption>
              <thead className={ac.thead}><tr><th scope="col" className="p-4 text-left">時期</th><th scope="col" className="p-4 text-left">やること</th><th scope="col" className="p-4 text-left">社内で決めること</th></tr></thead>
              <tbody>
                {[
                  ['4週間前', '今のパソコンの洗い出し、機種の選定と注文', '入れ替える台数、予算、配る日の候補'],
                  ['3週間前', '業務ソフトと電子証明書の移し方を確かめる', '経理や現場の担当者との日程の調整'],
                  ['2週間前', '1台目を設定し、使う人に試してもらう', '全員に入れるソフトと設定の決定'],
                  ['1週間前', '残りの台数を設定し、ファイルをOneDriveや共有フォルダへ移す', '配る順番と、当日の問い合わせ先'],
                  ['当日', '新しいパソコンを渡し、確認リストで一緒に確かめる', '困ったときの連絡方法'],
                  ['2週間〜1か月後', '古いパソコンのデータを消して処分し、台帳を更新する', '処分の方法と、消去の記録の残し方']
                ].map(([when, todo, decide]) => <tr key={when}><th scope="row" className="p-4 border-t-2 border-[#111]/20 text-left font-bold text-sumi">{when}</th><td className="p-4 border-t-2 border-[#111]/20">{todo}</td><td className="p-4 border-t-2 border-[#111]/20">{decide}</td></tr>)}
              </tbody>
            </table>
          </div>
          <h3 className={subheading}>社内で決めることと、外に頼める作業を分ける</h3>
          <p className={paragraph}>表の右の列は、仕事の中身を知っている社内の人にしか決められません。一方で、初期設定、データの移し替え、古いパソコンのデータ消去と回収は、台数に比例して増える作業で、業者に頼みやすい部分です。</p>
          <p className={paragraph}>業者に頼むときは、作業の範囲、設定内容を書面で受け取れるか、パスワードや回復キーの受け渡し方法、データ消去の方法と証明書の有無を、見積もりの段階で確かめましょう。退職者のパソコンなら、アカウントの扱いもあわせて決めます。手順は<a href="/articles/retired-employee-m365-account" className={link}>退職者のMicrosoft 365アカウントの止め方とデータの引き継ぎ</a>で紹介しています。</p>

          <h2 id="sec-7" className={heading}>まとめ：移す・確かめる・消すの順で進める</h2>
          <p className={paragraph}>会社のパソコンの入れ替えは、今のパソコンの洗い出し、新しいパソコンの設定、データの移し替え、配る日の確認、古いパソコンの処分の5つの順で進めます。データはパソコンの中にしかないものだけを移し、業務ソフトや電子証明書のようにコピーだけでは使えないものを先に確かめます。古いパソコンはしばらく保管してから、データを消して処分し、記録を台帳に残しましょう。まずは、今あるパソコンを一覧にするところから始めてみてください。</p>

          <section className="mt-14">
            <h2 id="faq" className={heading}>よくある質問</h2>
            <div className={ac.faq}>
              {faqs.map((faq) => <div key={faq.q}><h3 className={ac.faqQ}>{faq.q}</h3><p>{faq.a}</p></div>)}
            </div>
          </section>
          <ArticleSources service="josys" items={[
            { label: "Microsoft サポート「Windows バックアップを使用したバックアップと復元」", url: "https://support.microsoft.com/ja-jp/help/17143" },
            { label: "Microsoft サポート「BitLocker 回復キーの検索」", url: "https://support.microsoft.com/ja-jp/windows/6b71ad27-0b89-ea08-f143-056f5ab347d6" },
            { label: "Microsoft サポート「PC を初期状態に戻す」", url: "https://support.microsoft.com/ja-jp/windows/experience/backup-recovery/reset-your-pc" },
            { label: "Microsoft Learn「Microsoft 365 Apps のライセンスとライセンス認証の概要」", url: "https://learn.microsoft.com/ja-jp/microsoft-365-apps/licensing-activation/overview-licensing-activation-microsoft-365-apps" },
            { label: "Microsoft「Windows 10 サポート終了 - Windows 10 for business」", url: "https://www.microsoft.com/ja-jp/area/biz/windows/eos" },
            { label: "国税庁 確定申告書等作成コーナー「耐用年数（器具・備品）（その1）」", url: "https://www.keisan.nta.go.jp/r5yokuaru/aoiroshinkoku/hitsuyokeihi/genkashokyakuhi/taiyonensukigu1.html" },
            { label: "パソコン3R推進協会「事業系PCリサイクル」", url: "https://www.pc3r.jp/office/" }
          ]}/>
          <ArticleWorks service="josys"/>
    <section className={ac.related}>
            <h2 className={ac.h2Flat.josys}>関連記事</h2>
            <div className="space-y-3">
              <a href="/articles/retired-employee-m365-account" className={ac.relatedLink}>退職者のMicrosoft 365アカウントの止め方とデータの引き継ぎ</a>
              <a href="/articles/sme-password-management-mfa" className={ac.relatedLink}>中小企業のパスワード管理と多要素認証の始め方</a>
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

export default ArticlePcReplacementSteps;
