import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ContactCta, PageHeader, comicIllust } from '../next/parts';
import { services } from '../next/theme';
import { ac, promoHeroSrc } from './articleComic';

const title = '愛知・東海の中小企業向け｜退職者のMicrosoft 365アカウントの止め方';
// 画面の見出しには地域名を出さない（地域名はtitleとmetaだけ）
const pageTitle = '退職者のMicrosoft 365アカウントの止め方とデータの引き継ぎ';
const description = '愛知・東海の中小企業向けに、退職者のMicrosoft 365アカウントの止め方を解説します。退職日のサインイン停止、メールを共有メールボックスにして引き継ぐ方法、OneDriveのファイルの移し方、ライセンスの支払いを止める手順まで、チェックリスト付きでまとめました。';
const canonical = 'https://www.arcle.net/articles/retired-employee-m365-account';
const published = '2026-11-02';
const faqs = [
  { q: '退職者のアカウントは、すぐに削除したほうがよいですか？', a: 'すぐに削除するより、まずサインインを止めて、メールとファイルの引き継ぎを済ませてから削除するほうが安全です。Microsoftの公式ドキュメントでは、削除したアカウントは30日以内なら復元できると案内されていますが、期間を過ぎるとデータは戻せません。共有メールボックスに変換した場合や転送を設定した場合は、アカウントを削除しないでください。' },
  { q: '退職者のメールアドレスに届くメールを、後任者が受け取るにはどうすればよいですか？', a: '方法は二つあります。一つは、退職者のメールボックスを共有メールボックスに変換し、後任者に閲覧の権限を付ける方法です。過去のメールもそのまま見られます。もう一つは、新しく届くメールだけを後任者に転送する方法です。転送の場合は、アカウントとライセンスを残しておく必要があります。' },
  { q: 'ライセンスを外せば、その分の料金はかからなくなりますか？', a: 'ユーザーからライセンスを外したり、アカウントを削除したりしただけでは、契約しているライセンスの数は変わらず、支払いが続く場合があります。管理センターの「課金情報」で、契約するライセンスの数を減らす手続きが必要です。年間契約や販売店経由の契約では、途中で減らせないことがあるため、契約内容を確認してください。' },
  { q: '退職者が会社のファイルを自宅のパソコンに同期していた場合はどうなりますか？', a: 'Microsoftの公式ドキュメントでは、個人のパソコンにダウンロードや同期されたファイルを、管理者が削除する方法はないと説明されています。退職後の対策では防げないため、在職中から私物のパソコンでの同期を認めるかどうかを決め、退職時の誓約書などで会社のデータの返却や削除を求める運用を検討しましょう。' }
];
const heading = ac.h2.josys;
const paragraph = ac.p;
const subheading = ac.h3;
const link = 'text-svc-josys underline underline-offset-4';

const ArticleRetiredEmployeeM365: React.FC = () => {
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
          <p className="text-[#30343F] leading-[2] mb-8">社員が退職したあと、その人のMicrosoft 365のアカウントをどうすればよいか迷う会社は少なくありません。すぐに削除すると、取引先とのメールや作りかけの資料が消えてしまうかもしれません。反対に放置すると、退職者が社外から会社のメールやファイルを見られる状態が続き、ライセンスの料金も払い続けることになります。この記事では、IT担当者がいない会社でも進められるよう、退職日にアカウントを止める手順から、メールとファイルの引き継ぎ、ライセンスの後片付けまでを順に整理します。</p>

          <h2 className={heading}>1. 退職者のアカウントで最初に決めること</h2>
          <p className={paragraph}>Microsoft 365のアカウントは、メール（Outlook）、ファイルの保存場所（OneDrive）、チャットや会議（Teams）をまとめて使うための入り口です。退職者のアカウントには、仕事で使ったメールやファイルがすべて結び付いています。そのため、いきなり削除するのではなく、「止める」「引き継ぐ」「片付ける」の三段階に分けて進めるのが基本です。</p>
          <p className={paragraph}>作業を始める前に、次の三つを決めておきましょう。一つ目は、アカウントを止める日時です。最終出社日の終業後にするのか、有給休暇の消化が終わる退職日にするのかで、引き継ぎの段取りが変わります。二つ目は、メールとファイルを引き継ぐ後任者です。三つ目は、作業を担当する人です。Microsoft 365の管理者の権限を持つ人が社内にいるか、委託先の業者がいるかを確認します。</p>
          <p className={paragraph}>あわせて、退職者本人に依頼しておくことも整理します。たとえば、取引先への担当交代の連絡、OneDriveにある資料のうち共有フォルダに移すもの、パスワードを知っている社内システムの一覧などです。本人がいるうちに済ませておくと、退職後に管理者が探し回る手間を減らせます。</p>

          <h2 className={heading}>2. 退職日にサインインを止める手順</h2>
          <p className={paragraph}>退職日に最初に行うのは、退職者がMicrosoft 365に入れないようにすることです。Microsoftの公式ドキュメントでは、元従業員を削除するまでの流れを7つの手順に分けて案内しており、最初の手順がサインインを止めることです（<a href="https://learn.microsoft.com/ja-jp/microsoft-365/admin/add-users/remove-former-employee" className={link} target="_blank" rel="noopener">Microsoft Learn：元従業員を削除する - 概要</a>）。</p>
          <h3 className={subheading}>パスワードを変えて、すべての端末からサインアウトさせる</h3>
          <p className={paragraph}>Microsoft 365 管理センターの「ユーザー」から「アクティブなユーザー」を開き、退職者を選んで「パスワードのリセット」を行います。続けて、「アカウント」タブの「すべてのセッションからサインアウト」を選びます。公式ドキュメントでは、これで1時間以内、または利用中のページを離れた時点で、もう一度サインインを求められると説明されています。</p>
          <h3 className={subheading}>サインインをブロックする</h3>
          <p className={paragraph}>同じ画面の「サインインのブロック」で、そのユーザーがサインインできないようにします。ただし、公式ドキュメントでは、ブロックが効くまでに最大24時間かかることがあるとされています。すぐに止めたいときは、先にパスワードのリセットを済ませておくことが大切です。</p>
          <h3 className={subheading}>スマホやメールソフトからの接続も確認する</h3>
          <p className={paragraph}>退職者が個人のスマホで会社のメールを見ていた場合は、その端末からの接続も止めます。Exchange 管理センターでは、メールボックスごとに、Outlookのアプリやスマホのメールアプリなど、接続方法ごとにオンとオフを切り替えられます。会社が貸し出したスマホやパソコンは、返却を受けてから初期化の要否を判断しましょう。</p>

          <h2 className={heading}>3. メールの引き継ぎ方を選ぶ</h2>
          <p className={paragraph}>退職者のメールアドレスには、退職後も取引先からメールが届くことがあります。過去のメールを残したいのか、これから届くメールを受け取りたいのかによって、選ぶ方法が変わります。主な方法を表にまとめました。</p>
          <div className={`overflow-x-auto my-7 ${ac.tableWrap}`} role="region" aria-label="退職者のメールの引き継ぎ方法の比較（横にスクロールできます）" tabIndex={0}>
            <table className="w-full min-w-[640px] text-sm border-collapse text-[#30343F]">
              <caption className={ac.caption}>退職者のメールを引き継ぐ方法</caption>
              <thead className={ac.thead}><tr><th scope="col" className="p-4 text-left">方法</th><th scope="col" className="p-4 text-left">過去のメール</th><th scope="col" className="p-4 text-left">ライセンス</th><th scope="col" className="p-4 text-left">向いている場面</th></tr></thead>
              <tbody>
                {[
                  ['共有メールボックスに変換する', '残る。後任者が見られる', '50GB未満なら不要（変換の時点では必要）', '取引先とのやり取りが多く、過去の経緯も確認したい'],
                  ['後任者に転送する', '退職者のメールボックスに残る', 'アカウントとライセンスを残す', '新しく届くメールだけを、しばらく受け取りたい'],
                  ['データを書き出して保管する', 'ファイル（.pst）として残る', '書き出し後は不要', 'メールアドレスは使わないが、記録は残したい'],
                  ['引き継がずに削除する', '30日を過ぎると戻せない', '不要', '業務でほとんどメールを使っていなかった']
                ].map(([way, past, license, fit]) => <tr key={way}><th scope="row" className="p-4 border-t-2 border-[#111]/20 text-left font-bold text-sumi">{way}</th><td className="p-4 border-t-2 border-[#111]/20">{past}</td><td className="p-4 border-t-2 border-[#111]/20">{license}</td><td className="p-4 border-t-2 border-[#111]/20">{fit}</td></tr>)}
              </tbody>
            </table>
          </div>
          <h3 className={subheading}>共有メールボックスに変換する</h3>
          <p className={paragraph}>共有メールボックスは、複数の人で同じメールアドレスの受信箱を見られる仕組みです。管理センターで退職者を選び、「メール」タブの「共有メールボックスに変換」を選びます。公式ドキュメントによると、変換するときはライセンスが付いている必要があり、変換したあとはライセンスを外せます。ライセンスがない共有メールボックスの容量は50GBまでで、超える場合はライセンスが必要です（<a href="https://learn.microsoft.com/ja-jp/microsoft-365/admin/email/convert-user-mailbox-to-shared-mailbox" className={link} target="_blank" rel="noopener">Microsoft Learn：ユーザー メールボックスを共有メールボックスに変換する</a>）。</p>
          <p className={paragraph}>注意したいのは、変換しただけでは元のユーザー名とパスワードで入れてしまう点です。変換の前後に、前の章のパスワードのリセットとサインインのブロックを済ませておきましょう。また、共有メールボックスは元のアカウントに結び付いて動くため、変換したあとにアカウントを削除してはいけません。法的な理由でメールを保全する設定（訴訟ホールド）を使う場合は、別途ライセンスが必要になります。</p>
          <h3 className={subheading}>転送を設定する場合の注意</h3>
          <p className={paragraph}>転送は、管理センターの「メール」タブにある「メール転送の管理」から設定します。転送されるのは、設定したあとに届く新しいメールだけです。公式ドキュメントでは、転送を設定したアカウントはライセンスを外せず、外すと転送が止まると案内されています。料金がかかり続けるため、転送は「取引先に担当交代を伝え終えるまで」など、期間を決めて使うとよいでしょう。</p>

          <h2 className={heading}>4. OneDriveのファイルを引き継ぐ</h2>
          <p className={paragraph}>OneDriveは、社員一人ひとりに用意されるファイルの保存場所です。退職者が見積書や提案書を自分のOneDriveに置いていた場合は、削除の前に共有フォルダや後任者のOneDriveへ移します。チームで使うSharePointのファイルは、退職者のアカウントを削除しても残るため、移す必要はありません。</p>
          <h3 className={subheading}>管理センターからファイルを開いて移す</h3>
          <p className={paragraph}>管理センターで退職者を選び、「OneDrive」タブの「ファイルへのリンクの作成」を選ぶと、退職者のOneDriveを開けます。そこから、必要なファイルを共有フォルダにコピーしたり、パソコンにダウンロードしたりします。公式ドキュメントでは、変更の履歴が残っているファイルを移すと、最新の版だけが移ると説明されています（<a href="https://learn.microsoft.com/ja-jp/microsoft-365/admin/add-users/remove-former-employee-step-5" className={link} target="_blank" rel="noopener">Microsoft Learn：別の従業員に OneDrive と Outlook のデータへのアクセス権を付与する</a>）。</p>
          <h3 className={subheading}>削除したあとの保持期間を知っておく</h3>
          <p className={paragraph}>アカウントを削除すると、OneDriveのファイルは既定で30日間残ります。既定では、上司（マネージャー）が登録されていれば、その人に閲覧の権限が自動で付き、削除の予定を知らせるメールが届く仕組みです。この期間はSharePoint 管理センターで延ばせます。また、ライセンスのないOneDriveは93日目に自動で有料のアーカイブ状態になると案内されています（<a href="https://learn.microsoft.com/ja-jp/sharepoint/retention-and-deletion" className={link} target="_blank" rel="noopener">Microsoft Learn：OneDrive の保持と削除</a>）。ライセンスだけ外して放置するのではなく、ファイルを移したらアカウントの削除まで進めましょう。</p>

          <div className={ac.promo}>
            <img src={promoHeroSrc} alt="" className={ac.promoHero} loading="lazy" />
            <span aria-hidden="true" className={ac.promoLabel}>ARCLE TIP!</span>
            <p className={ac.promoTitle}>入退社のアカウント管理を任せたい方へ</p>
            <p className={paragraph}>Arcleの情シス代行では、Microsoft 365の管理者設定とアカウント管理、アカウント・ライセンスの棚卸しをお手伝いしています。退職者のアカウントが残ったままになっていないかの確認から、入退社のときの手順づくりまで、自社の状況に合わせて一緒に進められます。</p>
            <a href={service.href} className="inline-flex items-center gap-2 text-svc-josys font-bold hover:underline underline-offset-4">情シス代行の対応内容を確認する<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </div>

          <h2 className={heading}>5. ライセンスとアカウントを片付ける</h2>
          <p className={paragraph}>メールとファイルの引き継ぎが終わったら、ライセンスとアカウントを片付けます。ここで見落としやすいのが、料金の止め方です。公式ドキュメントでは、ユーザーを削除してもライセンスの支払いは続くと説明されています（<a href="https://learn.microsoft.com/ja-jp/microsoft-365/admin/add-users/delete-a-user" className={link} target="_blank" rel="noopener">Microsoft Learn：組織からユーザーを削除する</a>）。</p>
          <ol className="list-decimal pl-6 text-[#30343F] leading-[2] space-y-3">
            <li><strong className="text-sumi">ライセンスを後任者に回すか決める：</strong>近いうちに新しい社員が入るなら、外したライセンスをその人に割り当てます。ライセンスが自動でほかの人に付くことはありません。</li>
            <li><strong className="text-sumi">アカウントを削除する：</strong>共有メールボックスにした場合と、転送を設定した場合は削除しません。それ以外は、引き継ぎが終わったことを確かめてから削除します。削除したアカウントは30日以内なら復元できます。</li>
            <li><strong className="text-sumi">契約するライセンスの数を減らす：</strong>管理センターの「課金情報」から「お使いの製品」を開き、契約の数を減らします。年間契約や、販売店を通して購入した契約では、途中で減らせない場合があります。</li>
            <li><strong className="text-sumi">作業の記録を残す：</strong>止めた日時、メールとファイルの引き継ぎ先、削除した日を台帳に残します。あとで「あのメールはどこへ行ったか」と聞かれたときに答えられます。</li>
          </ol>
          <p className={`${paragraph} mt-4`}>自社の契約が月ごとか年ごとか分からない場合は、管理センターの「課金情報」で確認するか、契約した販売店に問い合わせてください。画面の名前や手順は変わることがあるため、作業の前に最新の公式ドキュメントも確認しましょう。</p>

          <h2 className={heading}>6. 退職時のアカウント手続きチェックリスト</h2>
          <p className={paragraph}>退職のたびに手順を思い出すのは大変です。次のチェックリストを社内の手順書に入れておくと、担当者が替わっても同じ流れで進められます。</p>
          <div className={ac.box}>
            <p className={ac.boxTitle}>退職者のMicrosoft 365アカウント 手続きチェックリスト</p>
            <ul className="space-y-2 text-[#30343F] leading-[2]">
              {[
                'アカウントを止める日時と、引き継ぎの後任者を決めた',
                '退職者本人に、取引先への連絡とファイルの整理を依頼した',
                'パスワードをリセットし、すべてのセッションからサインアウトさせた',
                'サインインをブロックし、スマホのメールアプリなどの接続も止めた',
                'メールを共有メールボックスにするか、転送するか、書き出すかを決めて実施した',
                'OneDriveの必要なファイルを、共有フォルダや後任者に移した',
                '共有メールボックスにした場合は、アカウントを残してライセンスを外した',
                'ライセンスを後任者に回すか、契約の数を減らした',
                'Microsoft 365以外のサービス（会計、勤怠、ホームページの管理画面など）のアカウントも止めた',
                '作業の日時と引き継ぎ先を台帳に記録した'
              ].map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className={ac.check} />{item}</li>)}
            </ul>
          </div>
          <p className={paragraph}>見落としがちなのが、Microsoft 365以外のサービスです。会計ソフトや勤怠管理、ネット銀行、ホームページの管理画面など、退職者が使っていたサービスは会社によってさまざまです。在職中から、誰がどのサービスを使っているかを一覧にしておくと、退職時に止め忘れを防げます。パスワードの管理全般は、<a href="/articles/sme-password-management-mfa" className={link}>中小企業のパスワード管理と多要素認証の始め方</a>でも紹介しています。</p>
          <p className={paragraph}>入社のときの手順と対にしておくことも大切です。たとえば、入社時に「上司（マネージャー）の登録」を済ませておけば、退職時にOneDriveの閲覧の権限が自動で上司に付きます。入社のときにどのサービスのアカウントを作ったかを記録しておけば、退職時の一覧づくりもすぐに終わります。</p>

          <h2 className={heading}>まとめ：止める・引き継ぐ・片付けるの順で進める</h2>
          <p className={paragraph}>退職者のMicrosoft 365アカウントは、すぐに削除するのではなく、サインインを止め、メールとファイルを引き継いでから片付けるのが安全です。メールは共有メールボックスにすると過去のやり取りも残せますが、アカウントを削除しないことと、変換前後にパスワードを変えることを忘れないようにしましょう。ライセンスは、外すだけでなく契約の数を減らさないと料金がかかり続けることがあります。まずは今いる社員とアカウントの一覧を見比べて、退職者のアカウントが残っていないかを確かめるところから始めてみてください。</p>

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

export default ArticleRetiredEmployeeM365;
