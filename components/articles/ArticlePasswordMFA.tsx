import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ContactCta, PageHeader, comicIllust } from '../next/parts';
import { services } from '../next/theme';
import { ac, promoHeroSrc } from './articleComic';

const title = '愛知・東海の中小企業向け｜パスワード管理と多要素認証の始め方';
// 画面の見出しには地域名を出さない（地域名はtitleとmetaだけ）
const pageTitle = '中小企業のパスワード管理と多要素認証の始め方';
const description = '愛知・東海の中小企業向けに、パスワード管理と多要素認証の始め方を解説します。社内のパスワードルールの決め方、保管と共有の方法、認証方式の選び方、Microsoft 365やGoogle Workspaceでの導入手順、機種変更や退職時の注意点まで、チェックリスト付きでまとめました。';
const canonical = 'https://www.arcle.net/articles/sme-password-management-mfa';
const published = '2026-10-29';
const faqs = [
  { q: 'パスワードは定期的に変更したほうがよいですか？', a: '総務省の「国民のためのサイバーセキュリティサイト」では、流出や乗っ取りの事実がなければ定期的な変更は必要ないとしています。それよりも、サービスごとに使い回しのない固有のパスワードを設定することが大切です。流出の連絡を受けたときや、不審なログインに気づいたときはすぐに変更します。' },
  { q: '社員の個人のスマホに認証アプリを入れてもらってもよいですか？', a: '会社として認めるかどうかを先に決めておきましょう。個人のスマホを使う場合は、本人の了承を得ること、機種変更や紛失のときの連絡先、退職時の扱いを周知しておくと安心です。スマホを使えない社員がいる場合は、セキュリティキーなど別の方式を用意できるか検討します。' },
  { q: '多要素認証を設定すれば、パスワードは簡単なものでもよいですか？', a: 'よくありません。多要素認証は、パスワードが漏れたときの被害を減らすための追加の守りです。パスワードそのものも、長く、推測されにくく、使い回さないものにしておく必要があります。両方をそろえることで、不正ログインを防ぎやすくなります。' },
  { q: '複合機や古いメールソフトが多要素認証に対応していない場合はどうすればよいですか？', a: '多要素認証に対応しない古い接続方式を使っている機器やソフトは、設定を強めたあとに使えなくなることがあります。導入前に、スキャンしたデータをメールで送る複合機や、古いメールソフトの設定を一覧にして確認しましょう。対応方法は機器やサービスによって違うため、各メーカーやサービスの公式情報を確認してください。' }
];
const heading = ac.h2.josys;
const paragraph = ac.p;
const subheading = ac.h3;
const link = 'text-svc-josys underline underline-offset-4';

const ArticlePasswordMFA: React.FC = () => {
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
            <time dateTime={published} className={ac.date}>{published}</time>
          </div>
          <p className="text-[#30343F] leading-[2] mb-8">メール、会計ソフト、ネットバンキング、取引先とのファイル共有など、仕事で使うサービスにはどれもIDとパスワードがあります。IT担当者がいない会社では、パスワードの決め方も保管のしかたも社員任せになりがちです。この記事では、社内のパスワードルールの決め方から、多要素認証の選び方と導入手順、つまずきやすい点まで、今日から始められる順に整理します。</p>

          <h2 className={heading}>1. パスワード管理が会社の守りになる理由</h2>
          <p className={paragraph}>不正ログインの多くは、特別な技術よりも、弱いパスワードや使い回しから起こります。あるサービスから流出したIDとパスワードを、攻撃者が別のサービスで試す手口があるためです。社員が私用のサービスと同じパスワードを仕事のメールに使っていれば、会社とは関係のない流出から社内に入られるおそれがあります。</p>
          <p className={paragraph}>IPA（情報処理推進機構）が中小企業向けにまとめた「情報セキュリティ6か条」でも、「パスワードを強化しよう！」が基本対策の一つに挙げられています。パスワードは「長く」「複雑に」「使い回さない」ようにして強化し、可能な場合は多要素認証やパスキーなどの認証を強める機能を使う、という内容です。詳しくは<a href="https://www.ipa.go.jp/security/guide/sme/about.html" className={link} target="_blank" rel="noopener">IPAの「中小企業の情報セキュリティ対策ガイドライン」</a>で確認できます。</p>
          <p className={paragraph}>メールのアカウントに入られると、取引先へのなりすましメールや、請求書の振込先を書き換える詐欺に使われることがあります。被害は自社だけにとどまりません。パスワード管理は、取引先からの信頼を守るための仕事でもあります。</p>

          <h2 className={heading}>2. 社内のパスワードルールを決める</h2>
          <p className={paragraph}>まずは、社員全員が守れる短いルールを決めます。以前は「3か月ごとに変更する」「記号を必ず入れる」といったルールがよく使われていました。しかし、頻繁に変えさせると「末尾の数字だけ変える」ような規則的なパスワードが増え、かえって推測されやすくなります。</p>
          <p className={paragraph}>総務省の「国民のためのサイバーセキュリティサイト」では、流出の事実がなければパスワードを変更する必要はなく、定期的に変えるよりも、機器やサービスの間で使い回しのない固有のパスワードを設定することが求められる、としています（<a href="https://www.soumu.go.jp/main_sosiki/cybersecurity/kokumin/security/business/staff/06/" className={link} target="_blank" rel="noopener">安全なパスワードの設定・管理</a>）。社内ルールも、この考え方に合わせて見直しましょう。</p>
          <div className={`overflow-x-auto my-7 ${ac.tableWrap}`} role="region" aria-label="パスワードルールの見直し（横にスクロールできます）" tabIndex={0}>
            <table className="w-full min-w-[600px] text-sm border-collapse text-[#30343F]">
              <caption className={ac.caption}>社内のパスワードルールの見直し例</caption>
              <thead className={ac.thead}><tr><th scope="col" className="p-4 text-left">項目</th><th scope="col" className="p-4 text-left">よくある古いルール</th><th scope="col" className="p-4 text-left">見直し後のルール</th></tr></thead>
              <tbody>
                {[
                  ['長さ', '8文字以上', '英数字記号を含めて10文字以上。覚えるものは無関係な単語を複数つなげて長くする'],
                  ['変更のタイミング', '3か月ごとに全員が変更', '定期変更はしない。流出の連絡や不審なログインがあったらすぐに変更する'],
                  ['使い回し', '特に決めていない', 'サービスごとに別のパスワードにする。私用のサービスと同じものは使わない'],
                  ['使わない言葉', '特に決めていない', '名前、電話番号、誕生日、社名、簡単な英単語は使わない'],
                  ['初期パスワード', '配布されたまま使う', '機器やサービスの初期設定のパスワードは、使い始める前に変更する']
                ].map(([label, before, after]) => <tr key={label}><th scope="row" className="p-4 border-t-2 border-[#111]/20 text-left font-bold text-sumi">{label}</th><td className="p-4 border-t-2 border-[#111]/20">{before}</td><td className="p-4 border-t-2 border-[#111]/20">{after}</td></tr>)}
              </tbody>
            </table>
          </div>
          <p className={paragraph}>ルールは一枚の紙に収まる量にし、なぜそうするのかを一言ずつ添えます。たとえば「使い回さない：ほかのサービスで流出したときに、会社のアカウントまで入られないようにするため」と書けば、社員も納得して守りやすくなります。ルールの対象は、会社のメールやクラウドサービスだけでなく、ルーターや複合機の管理画面、ネットバンキングまで含めて考えましょう。</p>

          <h2 className={heading}>3. パスワードの保管と共有のしかた</h2>
          <h3 className={subheading}>付箋やExcelの一覧は見直す</h3>
          <p className={paragraph}>パスワードを長く、サービスごとに別にすると、覚えきれなくなります。そこで、モニターに付箋を貼ったり、パスワードを並べたExcelファイルを共有フォルダに置いたりする会社は少なくありません。付箋は来客や清掃の業者からも見えますし、Excelの一覧は、共有フォルダに入られたときにすべてのパスワードを一度に渡すことになります。</p>
          <h3 className={subheading}>パスワード管理ツールを会社で選ぶ</h3>
          <p className={paragraph}>パスワード管理ツールは、IDとパスワードを暗号化して保管し、ログインのときに呼び出せる仕組みです。一つの強いパスワード（マスターパスワード）と多要素認証でツールを守れば、ほかのパスワードは覚えなくて済みます。長くランダムなパスワードを自動で作る機能があるものも多く、使い回しを減らせます。</p>
          <p className={paragraph}>会社で使う場合は、社員がそれぞれ好きなツールを入れるのではなく、会社として一つを選びます。確認したいのは、管理者が利用者を追加・削除できるか、部署ごとに共有の範囲を分けられるか、退職者の利用を止められるか、といった点です。料金やプランの内容はツールごとに違い、変わることもあるため、最新の情報は各サービスの公式サイトで確認してください。</p>
          <h3 className={subheading}>共有アカウントは減らし、残すなら管理者を決める</h3>
          <p className={paragraph}>「受付用」「経理用」のように、複数の人が同じIDとパスワードを使うアカウントは、誰がいつ使ったのかが分からなくなります。退職者が出るたびにパスワードを変える必要もあり、変更し忘れも起きやすくなります。サービスが対応していれば、一人ひとりにアカウントを発行し、必要な権限を付ける形に切り替えましょう。どうしても共有が必要なアカウントは、管理する人を決め、パスワード管理ツールの共有機能で必要な人だけに渡します。チャットや通常のメールにパスワードをそのまま書いて送るのは避けてください。</p>

          <h2 className={heading}>4. 多要素認証の仕組みと方式の選び方</h2>
          <p className={paragraph}>多要素認証は、「知っているもの」（パスワードなど）、「持っているもの」（スマホやセキュリティキーなど）、「本人に関するもの」（指紋や顔など）のうち、二つ以上を組み合わせて本人を確かめる仕組みです。パスワードが漏れても、もう一つの要素がなければログインできないため、不正ログインの被害を大きく減らせます。Googleでは同じような仕組みを「2段階認証プロセス」と呼んでいます。</p>
          <p className={paragraph}>方式にはいくつかの種類があり、手軽さと強さが違います。社員のスマホの状況や、使っているサービスが対応している方式を見て選びましょう。</p>
          <div className={`overflow-x-auto my-7 ${ac.tableWrap}`} role="region" aria-label="多要素認証の方式の比較（横にスクロールできます）" tabIndex={0}>
            <table className="w-full min-w-[640px] text-sm border-collapse text-[#30343F]">
              <caption className={ac.caption}>多要素認証のおもな方式</caption>
              <thead className={ac.thead}><tr><th scope="col" className="p-4 text-left">方式</th><th scope="col" className="p-4 text-left">しくみ</th><th scope="col" className="p-4 text-left">向いている場面</th><th scope="col" className="p-4 text-left">気をつける点</th></tr></thead>
              <tbody>
                {[
                  ['SMS・電話での確認コード', '携帯電話に届くコードを入力する', 'ほかの方式が使えない人の当面の手段', '確認コードをだまし取る偽サイトの手口がある'],
                  ['認証アプリ', 'スマホのアプリに出る通知を承認するか、アプリのコードを入力する', '社員の多くがスマホを持っている会社', '機種変更のときに引き継ぎが必要'],
                  ['パスキー', 'スマホやパソコンと、指紋・顔・PINなどの組み合わせで本人を確かめる', '対応しているサービスを使う場合', '対応状況はサービスごとに違う'],
                  ['セキュリティキー', 'USBなどの小さな専用機器をパソコンに差したり、かざしたりする', 'スマホを使えない人、管理者アカウント', '機器の購入と、紛失したときの予備が必要']
                ].map(([way, how, fit, care]) => <tr key={way}><th scope="row" className="p-4 border-t-2 border-[#111]/20 text-left font-bold text-sumi">{way}</th><td className="p-4 border-t-2 border-[#111]/20">{how}</td><td className="p-4 border-t-2 border-[#111]/20">{fit}</td><td className="p-4 border-t-2 border-[#111]/20">{care}</td></tr>)}
              </tbody>
            </table>
          </div>
          <p className={paragraph}>IPAの解説では、パスキーはパスワードや確認コードを入力しないため、偽サイトに認証情報を盗まれにくい方式だと説明されています。一方で、SMSで届く確認コードを盗もうとする手口も確認されているとして、不審なメールやサイトに注意するよう呼びかけています。最初は認証アプリを基本にし、対応しているサービスから順にパスキーを使う、という進め方が取り組みやすいでしょう。</p>

          <h2 className={heading}>5. 多要素認証を社内に導入する手順</h2>
          <ol className="list-decimal pl-6 text-[#30343F] leading-[2] space-y-3">
            <li><strong className="text-sumi">使っているサービスを洗い出す：</strong>メール、ファイル共有、会計、勤怠、ネットバンキング、ホームページの管理画面などを一覧にし、多要素認証に対応しているかを確認します。社外に情報が出たときの影響が大きいものから優先します。</li>
            <li><strong className="text-sumi">管理者アカウントから始める：</strong>設定を変えられる管理者のアカウントは、狙われたときの被害が大きくなります。社員に広げる前に、管理者が先に設定し、登録の手順や画面を確かめておきます。</li>
            <li><strong className="text-sumi">社員に予定と理由を伝える：</strong>なぜ始めるのか、いつまでに登録するのか、どの方式を使うのか、困ったときの連絡先はどこかを伝えます。登録手順は画面の写真付きで一枚にまとめると、問い合わせが減ります。</li>
            <li><strong className="text-sumi">登録期間を設けてから必須にする：</strong>いきなり必須にすると、登録が済んでいない社員がログインできなくなります。登録状況を確認し、全員が終わったところで必須に切り替えます。</li>
            <li><strong className="text-sumi">例外と復旧の手順を決める：</strong>スマホを持っていない社員や、スマホを紛失したときの対応を決めます。本人確認をしてから認証をやり直す手順を、管理者が実行できるようにしておきます。</li>
          </ol>
          <h3 className={subheading}>Microsoft 365を使っている場合</h3>
          <p className={paragraph}>Microsoft 365のアカウントは、Microsoft Entra IDという仕組みで管理されています。Microsoftの公式ドキュメントでは、「セキュリティの既定値群」を有効にすると、追加費用なしで、すべてのユーザーに多要素認証の登録を求め、管理者にはサインインのたびに多要素認証を求める設定が適用されると説明されています。多要素認証に対応しない古い接続方式もブロックされるため、古いメールソフトや、スキャンをメールで送る複合機を使っている場合は、先に影響を確認してください（<a href="https://learn.microsoft.com/ja-jp/entra/fundamentals/security-defaults" className={link} target="_blank" rel="noopener">Microsoft Learn：セキュリティの既定値群</a>）。上位のライセンスで「条件付きアクセス」を使っている場合は、設定の考え方が変わります。</p>
          <h3 className={subheading}>Google Workspaceを使っている場合</h3>
          <p className={paragraph}>Google Workspaceでは、管理コンソールでユーザーが2段階認証プロセスを使えるようにし、登録を案内してから、組織部門やグループごとに必須にできます。Googleのヘルプでは、必須にするときに新しいユーザーの登録期間を設定でき、その間はパスワードだけでログインできると案内されています。SMSや電話以外の方式に限定する設定もあるため、使ってほしい方式を先に決めておきましょう（<a href="https://knowledge.workspace.google.com/admin/security/deploy-2-step-verification?hl=ja" className={link} target="_blank" rel="noopener">Google Workspace 管理者ヘルプ：2 段階認証プロセスを導入する</a>）。</p>
          <p className={paragraph}>どちらの場合も、画面の名前や設定の項目は変わることがあります。作業の前に、最新の公式ドキュメントを確認してください。Microsoft 365の導入や移行全体の流れは、<a href="/articles/microsoft-365-migration-sme" className={link}>中小企業のMicrosoft 365導入・移行手順</a>でも紹介しています。</p>

          <div className={ac.promo}>
            <img src={promoHeroSrc} alt="" className={ac.promoHero} loading="lazy" />
            <span aria-hidden="true" className={ac.promoLabel}>ARCLE TIP!</span>
            <p className={ac.promoTitle}>アカウント管理やルールづくりを任せたい方へ</p>
            <p className={paragraph}>Arcleの情シス代行では、Microsoft 365などのアカウント・ライセンス管理や、セキュリティ対策・社内ルールづくりをお手伝いしています。今使っているサービスの洗い出しから、多要素認証の登録案内づくりまで、自社の状況に合わせて一緒に進められます。</p>
            <a href={service.href} className="inline-flex items-center gap-2 text-svc-josys font-bold hover:underline underline-offset-4">情シス代行の対応内容を確認する<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </div>

          <h2 className={heading}>6. 導入後につまずきやすい場面と備え</h2>
          <p className={paragraph}>多要素認証は、設定したあとの運用でつまずくことが多い仕組みです。よくある場面を先に想定し、対応を決めておきましょう。</p>
          <ul className="list-disc pl-6 text-[#30343F] leading-[2] space-y-2">
            <li>スマホの機種変更：古いスマホを手放す前に、認証アプリの引き継ぎか、新しいスマホでの登録をやり直すよう案内します。手放してから気づくと、管理者による再設定が必要になります。</li>
            <li>スマホの紛失や故障：本人からの連絡を受けたら、本人確認をしたうえで、管理者が認証の登録をやり直せるようにします。連絡先は登録手順の紙に書いておきます。</li>
            <li>管理者が一人しかいない：その人がログインできなくなると、誰も設定を直せなくなります。管理者の権限を持つ人を二人以上にするか、外部の支援先と復旧の手順を共有しておきます。</li>
            <li>入社と退職：入社時はアカウントの発行と多要素認証の登録をセットで行います。退職時は、アカウントの停止、パスワード管理ツールの共有の解除、共有アカウントのパスワード変更を同じ日に行います。</li>
            <li>確認の通知が何度も届く：本人がログインしていないのに承認を求める通知が届いたら、承認せずに管理者へ連絡するよう伝えます。誰かがパスワードを知っている可能性があるため、パスワードも変更します。</li>
          </ul>
          <p className={`${paragraph} mt-4`}>こうした対応は、担当者の頭の中だけにあると、休みや異動のときに止まってしまいます。手順は短い文書にまとめ、管理者が見られる場所に置いておきましょう。</p>

          <h2 className={heading}>7. 今日から使えるチェックリスト</h2>
          <p className={paragraph}>自社の状況を確かめるために、次の項目を順に見てください。できていない項目があれば、上から順に取り組むと進めやすくなります。</p>
          <div className={ac.box}>
            <p className={ac.boxTitle}>パスワード管理と多要素認証のチェックリスト</p>
            <ul className="space-y-2 text-[#30343F] leading-[2]">
              {[
                '仕事で使っているサービスと、その管理者が一覧になっている',
                '社内のパスワードルールが一枚にまとまり、社員に伝わっている',
                '私用のサービスと同じパスワードを使わないよう周知している',
                'ルーターや複合機などの初期設定のパスワードを変更している',
                'パスワードを付箋や共有フォルダのExcelで管理していない',
                '共有アカウントの数と、それぞれの管理者を把握している',
                '管理者アカウントに多要素認証を設定している',
                '社員のアカウントに多要素認証を設定している、または登録期限を決めている',
                'スマホの紛失や機種変更のときの連絡先と手順を決めている',
                '退職時にアカウントを止める手順と担当者を決めている'
              ].map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className={ac.check} />{item}</li>)}
            </ul>
          </div>
          <p className={paragraph}>すべてを一度に整える必要はありません。たとえば今月は管理者アカウントの多要素認証とルールづくり、来月は社員への展開、その次はパスワード管理ツールの検討、というように、月ごとに一つずつ進める計画でも十分に効果があります。</p>

          <h2 className={heading}>まとめ：ルールを短く決め、管理者から多要素認証を</h2>
          <p className={paragraph}>パスワード管理は、長く、推測されにくく、使い回さないパスワードを、安全な方法で保管することが基本です。定期的な変更よりも、流出したときにすぐ変えられる体制を整えましょう。そのうえで多要素認証を加えれば、パスワードが漏れたときの被害を大きく減らせます。まずは仕事で使うサービスを一覧にし、管理者アカウントの多要素認証から始めてみてください。</p>

          <section className="mt-14">
            <h2 className={heading}>よくある質問</h2>
            <div className={ac.faq}>
              {faqs.map((faq) => <div key={faq.q}><h3 className={ac.faqQ}>{faq.q}</h3><p>{faq.a}</p></div>)}
            </div>
          </section>
          <section className={ac.related}>
            <h2 className={ac.h2Flat.josys}>関連記事</h2>
            <div className="space-y-3">
              <a href="/articles/microsoft-365-migration-sme" className={ac.relatedLink}>中小企業のMicrosoft 365導入・移行手順</a>
              <a href="/articles/ichinomiya-josys-outsourcing-guide" className={ac.relatedLink}>中小企業向け 情シス代行の選び方</a>
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

export default ArticlePasswordMFA;
