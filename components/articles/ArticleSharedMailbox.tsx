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

const title = '共有メールボックスの使い方｜info@を複数人で管理する5つの手順';
// 画面の見出しには地域名を出さない（地域名はtitleとmetaだけ）
const pageTitle = 'info@などの共有メールアドレスを複数人で管理する方法';
const description = '愛知・東海の中小企業向けに、info@などの共有メールアドレスを複数人で管理する方法を解説します。パスワードを回し合う運用の問題、Microsoft 365の共有メールボックスとGoogleグループの共同トレイの比べ方、切り替えの5つの手順、二重返信を防ぐルールまでまとめました。';
const canonical = 'https://www.arcle.net/articles/shared-mailbox-info-address';
const published = '2026-11-19';
const modified = '2026-11-19';
const faqs = [
  { q: 'Microsoft 365の共有メールボックスには、追加の料金がかかりますか？', a: 'データが50GBまでなら、共有メールボックス自体にライセンスは要りません。ただし、開く人はそれぞれメールを使えるライセンスが必要です。50GBを超える場合やアーカイブを使う場合は、別のライセンスが要ります。' },
  { q: '社外の人や、Gmailを使っている人も共有メールボックスを使えますか？', a: '使えません。Microsoft 365の共有メールボックスは組織の中のユーザーだけが使え、Gmailなど社外のアカウントには権限を付けられません。外部の人と使うなら、Microsoft 365グループなどを検討します。' },
  { q: '共有メールボックスはスマホでも見られますか？', a: '見られます。Outlookのスマホアプリ（iPhone・Android）に共有メールボックスを追加するか、ブラウザーでOutlook on the webを開いて使います。Microsoftの案内では、スマホのアプリで追加できるのはOutlookのアプリだけとされています。' },
  { q: '何人まで同じ共有メールボックスを使えますか？', a: 'Microsoftは最大25人としています。同時に使う人が多すぎると、接続のエラーやメールの重複が起きることがあるためです。それより多い場合は、Microsoft 365グループを使うよう案内されています。' }
];
const heading = ac.h2.josys;
const paragraph = ac.p;
const subheading = ac.h3;
const link = 'text-svc-josys underline underline-offset-4';

const ArticleSharedMailbox: React.FC = () => {
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
          <ArticleSummary service="josys">info@などの共有アドレスは、1つのIDとパスワードを回し合うのではなく、各自のアカウントから開ける仕組みで管理します。Microsoft 365なら共有メールボックス、Google Workspaceならグループの共同トレイが使えます。切り替えは、今の使い方の洗い出しから古いパスワードの変更までの5つの手順で進めます。あわせて、誰が返信するかと、対応済みの印の付け方を決めておきます。</ArticleSummary>
          <p className="text-[#30343F] leading-[2] mb-8">ホームページに載せているinfo@のようなアドレスを、複数の社員で見ている会社は多いはずです。よくあるのが、そのアドレスのIDとパスワードを全員で使い回す運用です。手軽な反面、誰が返信したか分からない、辞めた人も読めるといった問題が残ります。この記事では、IT担当者がいない会社向けに、管理方法の比べ方、切り替えの5つの手順、運用のルールを整理します。</p>

          <ArticleToc service="josys" items={[{"id":"sec-1","label":"パスワードを回し合う運用で起きること"},{"id":"sec-2","label":"共有アドレスを複数人で使う方法の比べ方"},{"id":"sec-3","label":"Microsoft 365で共有メールボックスに切り替える5つの手順"},{"id":"sec-4","label":"Google Workspaceの会社は共同トレイを使う"},{"id":"sec-5","label":"対応漏れと二重返信を防ぐ運用ルール"},{"id":"sec-6","label":"人が入れ替わるときにすること"},{"id":"sec-7","label":"まとめ：各自のアカウントから開き、印で対応を分ける"},{"id":"faq","label":"よくある質問"}]}/>
          <h2 id="sec-1" className={heading}>1. パスワードを回し合う運用で起きること</h2>
          <p className={paragraph}>共有アドレスのIDとパスワードを全員で使う運用は、設定がいらず始めやすい方法です。ただ、仕組みから見ると「1人用のアカウントを、複数人が同じ人として使っている」状態で、次の問題が起きやすくなります。</p>
          <ul className="list-disc pl-6 text-[#30343F] leading-[2] space-y-2">
            <li>誰が読み、誰が返信したかが記録に残らない</li>
            <li>辞めた人や異動した人も、パスワードを覚えていれば読めてしまう</li>
            <li>多要素認証（パスワードのほかにスマホなどで本人確認する仕組み）を付けにくい</li>
          </ul>
          <p className={`${paragraph} mt-4`}>共有のアカウントだけパスワードのみで守られていると、そこが外から狙われる入り口になりかねません。パスワード管理と多要素認証の考え方は、<a href="/articles/sme-password-management-mfa" className={link}>中小企業のパスワード管理と多要素認証の始め方</a>でも紹介しています。</p>
          <p className={paragraph}>解決の方向は、共有アドレスの受信箱を、社員一人ひとりのアカウントから開けるようにすることです。権限を外せば、その人は読めなくなります。</p>

          <h2 id="sec-2" className={heading}>2. 共有アドレスを複数人で使う方法の比べ方</h2>
          <p className={paragraph}>方法は大きく5つあり、今のメールのサービスと、返信の状況をどこまで管理したいかで選びます。</p>
          <div className={`overflow-x-auto my-7 ${ac.tableWrap}`} role="region" aria-label="共有アドレスの管理方法の比較（横にスクロールできます）" tabIndex={0}>
            <table className="w-full min-w-[680px] text-sm border-collapse text-[#30343F]">
              <caption className={ac.caption}>共有アドレスを複数人で使う方法の比較</caption>
              <thead className={ac.thead}><tr><th scope="col" className="p-4 text-left">方法</th><th scope="col" className="p-4 text-left">向いている会社</th><th scope="col" className="p-4 text-left">返信の状況の分かりやすさ</th><th scope="col" className="p-4 text-left">気を付ける点</th></tr></thead>
              <tbody>
                {[
                  ['IDとパスワードを回し合う', '仕組みをすぐ変えられない会社', '分からない', '辞めた人が読める。多要素認証を付けにくい'],
                  ['各自のアドレスへ転送する', '返信は個人のアドレスでよい会社', '分からない', '返信が個人のアドレスから出る'],
                  ['Microsoft 365の共有メールボックス', 'Microsoft 365でメールを使っている会社', 'フォルダや印を決めれば分かる', '開く人にはライセンスが要る。使えるのは25人まで'],
                  ['Googleグループの共同トレイ', 'Google Workspaceでメールを使っている会社', '担当者の割り当てと「完了」の印で分かる', 'グループの設定と権限を決める必要がある'],
                  ['メール共有の専用サービス', '問い合わせの件数や対応する人が多い会社', '担当や進み具合を細かく管理できる', '月額の費用がかかる。機能と料金は各社の公式サイトで確認']
                ].map(([way, fit, status, note]) => <tr key={way}><th scope="row" className="p-4 border-t-2 border-[#111]/20 text-left font-bold text-sumi">{way}</th><td className="p-4 border-t-2 border-[#111]/20">{fit}</td><td className="p-4 border-t-2 border-[#111]/20">{status}</td><td className="p-4 border-t-2 border-[#111]/20">{note}</td></tr>)}
              </tbody>
            </table>
          </div>
          <p className={paragraph}>IT担当者がいない少人数の会社なら、まずは今のメールのサービスに付いている機能を使うのが現実的です。追加の契約がいらず、いつものOutlookやGmailの画面から使えます。</p>
          <p className={paragraph}>専用サービスは、たとえば問い合わせが多く、返信までの時間を数字で見たい場合に検討します。まず標準の機能でルールを固め、足りない点が見えてから比べても遅くありません。</p>

          <h2 id="sec-3" className={heading}>3. Microsoft 365で共有メールボックスに切り替える5つの手順</h2>
          <p className={paragraph}>共有メールボックスは、複数の人が同じ受信箱を開き、同じアドレスから送信できるMicrosoft 365の機能です。保存するデータが50GBまでなら、共有メールボックス自体にライセンスは要りません。一方で、開く人は各自がメールを使えるライセンスを持っている必要があります（<a href="https://learn.microsoft.com/ja-jp/microsoft-365/admin/email/about-shared-mailboxes?view=o365-worldwide" className={link} target="_blank" rel="noopener">Microsoft Learn：Microsoft 365 の共有メールボックスについて</a>）。メールを含まないプラン（Microsoft 365 Apps for businessなど）では作れません。</p>

          <h3 className={subheading}>手順1：今の使い方を洗い出す</h3>
          <p className={paragraph}>最初に、誰がどの端末で共有アドレスを見ているか、振り分けのルールや自動返信を使っているかを書き出します。問い合わせフォームや複合機に、このアドレスのパスワードを設定していないかも確かめます。</p>

          <h3 className={subheading}>手順2：今のアカウントを変換するか、新しく作るかを決める</h3>
          <p className={paragraph}>info@がすでに1人分のアカウントなら、共有メールボックスに変換できます。メールと予定表はそのまま残り、50GB未満ならライセンスを外せます。ただし、アカウント自体は削除してはいけません（<a href="https://learn.microsoft.com/ja-jp/microsoft-365/admin/email/convert-user-mailbox-to-shared-mailbox?view=o365-worldwide" className={link} target="_blank" rel="noopener">Microsoft Learn：ユーザー メールボックスを共有メールボックスに変換する</a>）。新しく作る場合は、管理センターの「チームとグループ」→「共有メールボックス」から作成します。</p>

          <h3 className={subheading}>手順3：使う人と権限を決めて追加する</h3>
          <p className={paragraph}>共有メールボックスの「メンバー」に、使う人を追加します。権限には、受信箱を読み書きできる「フルアクセス」、共有アドレスとして送れる「メールボックス所有者として送信」、「〇〇の代理として△△」と表示される「代理人として送信」があります（<a href="https://learn.microsoft.com/ja-jp/microsoft-365/admin/email/create-a-shared-mailbox?view=o365-worldwide" className={link} target="_blank" rel="noopener">Microsoft Learn：共有メールボックスを作成する</a>）。代表アドレスとして返信するなら、フルアクセスと所有者として送信の2つを付けるのが基本です。</p>
          <p className={paragraph}>追加した人のOutlookには、再起動後に共有メールボックスが自動で表示されます。ただし、セキュリティグループでまとめて権限を付けた場合は自動では表示されないため、少人数なら1人ずつ追加するほうが迷いません。</p>

          <h3 className={subheading}>手順4：受信・返信・スマホでの表示を試す</h3>
          <p className={paragraph}>全員に知らせる前に、1人で次の点を試します。差出人を共有アドレスにして送ると、相手には共有アドレスだけが表示されます（<a href="https://support.microsoft.com/ja-jp/office/d94a8e9e-21f1-4240-808b-de9c9c088afd" className={link} target="_blank" rel="noopener">Microsoft サポート：Outlook で共有メールボックスを開いて使用する</a>）。権限を付けた直後に「アクセス許可がありません」と出る場合は、1時間ほど待てば解消すると案内されています。</p>
          <div className={ac.box}>
            <p className={ac.boxTitle}>切り替え前に試すことのリスト</p>
            <ul className="space-y-2 text-[#30343F] leading-[2]">
              {[
                '社外のアドレスから共有アドレスに送ったメールが、Outlookの共有メールボックスに届く',
                '差出人を共有アドレスにして返信でき、相手側で個人名が出ていない',
                '送ったメールが、共有メールボックスの「送信済みアイテム」に残っているかを確かめた',
                'Outlookのスマホアプリか、ブラウザーのOutlook on the webで共有メールボックスを開ける',
                '問い合わせフォームや複合機からのメールが、今までどおり届く'
              ].map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className={ac.check} />{item}</li>)}
            </ul>
          </div>

          <h3 className={subheading}>手順5：古いパスワードを変えて、回し合いを終わらせる</h3>
          <p className={paragraph}>見落としやすいのがこの手順です。Microsoftの案内では、パスワードを変えずに変換すると、元のIDとパスワードが変換後も使えるままになります。問い合わせフォームや複合機がこのパスワードで送信している場合は、先に設定を変えます。</p>
          <p className={paragraph}>共有メールボックスのサインインは常にブロックしておくよう案内されています（新しく作った場合は最初からブロック済み）。変換した場合は、パスワードを誰にも知らせない値に変え、サインインのブロックを確かめてから、各端末の古い設定を消してもらいます。</p>
          <div className={ac.promo}>
            <img src={promoHeroSrc} alt="" className={ac.promoHero} loading="lazy" />
            <span aria-hidden="true" className={ac.promoLabel}>ARCLE TIP!</span>
            <p className={ac.promoTitle}>共有アドレスの切り替えを任せたい方へ</p>
            <p className={paragraph}>Arcleの情シス代行では、Microsoft 365のアカウントとライセンスの管理をお手伝いしています。共有メールボックスへの切り替えや、メンバーの追加・削除のような日々の変更も、メールやチャット、リモート操作でご相談いただけます。訪問でのサポートにも対応しています。</p>
            <a href={service.href} className="inline-flex items-center gap-2 text-svc-josys font-bold hover:underline underline-offset-4">情シス代行の対応内容を確認する<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </div>

          <h2 id="sec-4" className={heading}>4. Google Workspaceの会社は共同トレイを使う</h2>
          <p className={paragraph}>Google Workspaceの会社では、Googleグループの「共同トレイ」が使えます。グループのオーナーかマネージャーが、グループ設定の「追加の Google グループの機能を有効にする」で「共同トレイ」を選ぶと使えます（<a href="https://support.google.com/a/users/answer/10375787?hl=ja" className={link} target="_blank" rel="noopener">Google Workspace ラーニング センター：グループを共同トレイにする</a>）。</p>
          <p className={paragraph}>共同トレイでは、届いたメールを自分や他のメンバーに割り当てられます。割り当てられた人には、自動でお知らせのメールが届きます。対応が終わったら「完了」「対応不要」「別の会話との重複」のいずれかの印を付けます。「未割り当て」「未解決」などで絞り込めるため、手付かずのメールを探しやすくなります（<a href="https://support.google.com/a/users/answer/167430?hl=ja" className={link} target="_blank" rel="noopener">Google Workspace ラーニング センター：グループを共同トレイとして使用する</a>）。</p>
          <h3 className={subheading}>グループのアドレスで返信するための設定</h3>
          <p className={paragraph}>返信をグループのアドレスから出すには、各自のGmailで「別のアドレスから送信」にグループのアドレスを追加します。確認コードのメールがグループ宛に届くため、グループ設定の「投稿できるユーザー」を一時的に「ウェブ上のすべてのユーザー」にし、確認が済んだら元に戻します（<a href="https://support.google.com/groups/answer/10309372?hl=ja" className={link} target="_blank" rel="noopener">Google グループ ヘルプ：Gmail でグループをメールアドレスとして追加する</a>）。</p>
          <p className={paragraph}>なお、管理コンソールから作る「共有受信トレイ」という機能も、Business Starter・Standard・Plusを対象に段階的に公開されています（<a href="https://knowledge.workspace.google.com/admin/users/create-a-shared-inbox?hl=ja" className={link} target="_blank" rel="noopener">Google Workspace 管理者ヘルプ：共有受信トレイを作成する</a>）。使えるかは自社の管理コンソールで確認してください。</p>

          <h2 id="sec-5" className={heading}>5. 対応漏れと二重返信を防ぐ運用ルール</h2>
          <p className={paragraph}>仕組みを入れただけでは、「誰かが返信しただろう」という見落としや、二重返信は防げません。既読・未読では「誰が対応したか」までは分からないためです。最初に、次のようなルールを決めて共有します。</p>
          <div className={`overflow-x-auto my-7 ${ac.tableWrap}`} role="region" aria-label="共有アドレスの運用ルールの例（横にスクロールできます）" tabIndex={0}>
            <table className="w-full min-w-[640px] text-sm border-collapse text-[#30343F]">
              <caption className={ac.caption}>共有アドレスで決めておく運用ルールの例</caption>
              <thead className={ac.thead}><tr><th scope="col" className="p-4 text-left">決めること</th><th scope="col" className="p-4 text-left">Microsoft 365の共有メールボックス</th><th scope="col" className="p-4 text-left">Googleグループの共同トレイ</th></tr></thead>
              <tbody>
                {[
                  ['最初に見る人', '曜日や時間帯ごとに担当を決める', '同じ。未割り当てのメールを担当が割り振る'],
                  ['対応中の印', '「対応中」フォルダに移す、または担当者名のフラグや分類を付ける', '自分に割り当てる'],
                  ['対応済みの印', '「対応済み」フォルダに移す', '「完了」の印を付ける'],
                  ['返信しないメール', '営業メールなどは「対応不要」フォルダに移す', '「対応不要」の印を付ける'],
                  ['削除してよい人', '削除は止められないため、削除しない約束にする', '解決済みの削除は元に戻せないため、担当を限る']
                ].map(([item, ms, gw]) => <tr key={item}><th scope="row" className="p-4 border-t-2 border-[#111]/20 text-left font-bold text-sumi">{item}</th><td className="p-4 border-t-2 border-[#111]/20">{ms}</td><td className="p-4 border-t-2 border-[#111]/20">{gw}</td></tr>)}
              </tbody>
            </table>
          </div>
          <p className={paragraph}>共有メールボックスには、メンバーの削除を止める設定がありません。「削除はしない、移動で整理する」という約束にしておくと安心です。</p>
          <p className={paragraph}>共有アドレス用の署名に返信した人の名前を入れておくと、次のメールが来たときに前回の担当がすぐ分かります。</p>

          <h2 id="sec-6" className={heading}>6. 人が入れ替わるときにすること</h2>
          <p className={paragraph}>各自のアカウントで開く形にすると、人が入れ替わってもパスワードを変えて知らせ直す必要はなく、権限を足したり外したりするだけで済みます。</p>
          <h3 className={subheading}>入社・担当の追加のとき</h3>
          <p className={paragraph}>共有メールボックスのメンバーか、共同トレイのグループに追加し、5章の運用ルールを伝えます。Microsoft 365では、本人にメールを使えるライセンスがあるかも確かめます。</p>
          <h3 className={subheading}>退職・異動のとき</h3>
          <p className={paragraph}>外す前に対応中のメールがないかを確かめ、担当を引き継いでからメンバーから外します。退職者本人のアカウントの止め方は、<a href="/articles/retired-employee-m365-account" className={link}>退職者のMicrosoft 365アカウントの止め方とデータの引き継ぎ</a>で手順を紹介しています。</p>
          <p className={paragraph}>共有アドレスのメンバーの一覧も年に1〜2回見直し、権限だけが残っている人がいないかを確かめましょう。</p>

          <h2 id="sec-7" className={heading}>まとめ：各自のアカウントから開き、印で対応を分ける</h2>
          <p className={paragraph}>info@などの共有アドレスは、IDとパスワードを回し合わず、各自のアカウントから開ける仕組みで管理します。Microsoft 365なら共有メールボックス、Google Workspaceなら共同トレイが出発点です。切り替えは、洗い出し、変換か新規作成かの判断、権限の追加、送受信の確認、古いパスワードの変更の5つの手順で進め、返信の担当と対応済みの印の付け方を決めます。まずは、共有アドレスを今どこで誰が見ているかを書き出してみてください。</p>

          <section className="mt-14">
            <h2 id="faq" className={heading}>よくある質問</h2>
            <div className={ac.faq}>
              {faqs.map((faq) => <div key={faq.q}><h3 className={ac.faqQ}>{faq.q}</h3><p>{faq.a}</p></div>)}
            </div>
          </section>
          <ArticleSources service="josys" items={[
            { label: "Microsoft Learn「Microsoft 365 の共有メールボックスについて」", url: "https://learn.microsoft.com/ja-jp/microsoft-365/admin/email/about-shared-mailboxes?view=o365-worldwide" },
            { label: "Microsoft Learn「共有メールボックスを作成する」", url: "https://learn.microsoft.com/ja-jp/microsoft-365/admin/email/create-a-shared-mailbox?view=o365-worldwide" },
            { label: "Microsoft Learn「ユーザー メールボックスを共有メールボックスに変換する」", url: "https://learn.microsoft.com/ja-jp/microsoft-365/admin/email/convert-user-mailbox-to-shared-mailbox?view=o365-worldwide" },
            { label: "Microsoft サポート「Outlook で共有メールボックスを開いて使用する」", url: "https://support.microsoft.com/ja-jp/office/d94a8e9e-21f1-4240-808b-de9c9c088afd" },
            { label: "Google Workspace ラーニング センター「グループを共同トレイにする」", url: "https://support.google.com/a/users/answer/10375787?hl=ja" },
            { label: "Google Workspace ラーニング センター「グループを共同トレイとして使用する」", url: "https://support.google.com/a/users/answer/167430?hl=ja" },
            { label: "Google グループ ヘルプ「Gmail でグループをメールアドレスとして追加する」", url: "https://support.google.com/groups/answer/10309372?hl=ja" },
            { label: "Google Workspace 管理者ヘルプ「共有受信トレイを作成する」", url: "https://knowledge.workspace.google.com/admin/users/create-a-shared-inbox?hl=ja" }
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

export default ArticleSharedMailbox;
