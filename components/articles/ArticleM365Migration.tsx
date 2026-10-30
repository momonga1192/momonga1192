import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ContactCta, PageHeader, comicIllust } from '../next/parts';
import { services } from '../next/theme';
import { ac, promoHeroSrc } from './articleComic';

const title = '愛知・東海の中小企業へ｜Microsoft 365導入・移行手順';
// 画面の見出しには地域名を出さない（地域名はtitleとmetaだけ）
const pageTitle = '中小企業のMicrosoft 365導入・移行手順';
const description = '愛知・東海の中小企業向けに、Microsoft 365の導入・移行手順を解説。アカウント・メール・ファイル・PCの棚卸し、プラン選定、多要素認証、バックアップ、入退社時の管理まで、担当者が確認できるチェックリスト付きで紹介します。';
const canonical = 'https://www.arcle.net/articles/microsoft-365-migration-sme';
const published = '2026-10-27';
const heading = ac.h2.josys;
const paragraph = ac.p;
const list = 'list-disc pl-6 text-[#30343F] leading-[2] space-y-2';
const faqs = [
  { question: '今のメールアドレスを引き継げますか？', answer: '会社が管理する独自ドメインのメールは、契約と設定の条件を確認したうえで引き継ぎを計画できます。ドメインの管理権限、現在のメール契約、DNSの変更権限を事前に確認してください。' },
  { question: '全社員を同じ日に移行する必要はありますか？', answer: '必ずしも同じ日に移行する必要はありません。少人数で試験し、部署ごとに広げる方法もあります。ただしメールの受信先やファイルの正本が分かれるため、併用期間のルールと切り替え日を決めてください。' },
  { question: 'クラウドに保存すればバックアップは不要ですか？', answer: '同期だけをバックアップと考えるのは避けましょう。誤削除や上書きから何をいつまで戻す必要があるかを決め、標準機能の復元条件と照合します。不足する場合は追加のバックアップを検討し、復元テストを行います。' },
  { question: 'IT担当者がいなくても導入できますか？', answer: '社内で判断する責任者と問い合わせ窓口を決めることが出発点です。ドメイン変更や権限設計など判断が難しい作業は外部支援を活用し、完了後の管理手順を社内に残すと運用を引き継ぎやすくなります。' }
];

const ArticleM365Migration: React.FC = () => {
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
          '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(({ question, answer }) => ({
            '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer }
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
          <p className="text-[#30343F] leading-[2] mb-8">中小企業でMicrosoft 365の導入を進めるとき、最初に必要なのは契約ではなく、現在の仕事とデータの整理です。メールが届かない、共有資料が見つからないといった混乱を避けるため、何を移し、誰が確認し、いつ切り替えるかを決めます。この記事では、IT担当者がいない会社の経営者・総務担当者に向けて、Microsoft 365の移行手順と導入後の管理を解説します。</p>

          <h2 className={heading}>1. Microsoft 365導入前の棚卸し</h2>
          <p className={paragraph}>まず「利用者・契約・データ・端末」の台帳を作ります。社員名簿だけでは、代表メール、複合機の送信設定、退職者のPCにしかない資料などを見落とします。各部署に確認し、利用目的と管理者、移行の要否を一つの表にまとめてください。</p>
          <ul className={list}>
            <li>アカウント：利用者、部署、ログイン名、契約中のサービス、管理者、共有利用の有無を確認します。</li>
            <li>メール：アドレス、別名、転送、共有窓口、保存量、連絡先・予定表、PC内だけの過去メールを確認します。</li>
            <li>ファイル：PC、共有サーバー、外部ストレージの保存場所、容量、所有者、社外共有、閲覧権限を整理します。</li>
            <li>PC：利用者、OSと更新状況、Officeの契約、空き容量、業務ソフトやExcelマクロへの影響を確認します。</li>
            <li>契約と権限：ドメインの契約先、更新担当、DNSを変更できる人、旧サービスの解約条件を確認します。</li>
          </ul>
          <p className={`${paragraph} mt-4`}>ドメインは会社のメールアドレスなどに使う名前、DNSはその宛先を案内する設定です。Web制作会社が管理している場合もあるため、変更を依頼できる窓口まで押さえます。台帳にはパスワードを書かず、認証情報は閲覧者を限定した別の方法で管理してください。</p>
          <p className={paragraph}>次に「移行する」「保管だけする」「所有者に確認する」に分類します。使われていないデータまで無条件に移すと、不要な共有権限も持ち込みがちです。削除は保存義務や業務上の必要性を確認して承認を得てから行い、移行対象を確定します。</p>

          <h2 className={heading}>2. 中小企業のプラン選びは業務から</h2>
          <p className={paragraph}>プラン名だけで選ぶと、必要な機能が不足したり、使わない機能を契約したりします。「メールを移すか」「PCにインストールするOfficeが必要か」「端末も管理したいか」を利用者ごとに整理しましょう。メールや会議などを含む範囲は契約により異なるため、必要機能が含まれるかを個別に確認します。</p>
          <div className={`overflow-x-auto my-7 ${ac.tableWrap}`}>
            <table className="w-full min-w-[560px] text-left text-sm text-[#30343F] leading-[2]">
              <caption className={ac.caption}>プランを比較するときの判断表</caption>
              <thead className={ac.thead}><tr><th scope="col" className="p-4">仕事の条件</th><th scope="col" className="p-4">確認する機能</th><th scope="col" className="p-4">試験で見る点</th></tr></thead>
              <tbody>
                <tr className={ac.row}><th scope="row" className="p-4">ブラウザー中心の作業</th><td className="p-4">Web版アプリ、会社メール</td><td className="p-4">既存帳票の表示・編集</td></tr>
                <tr className={ac.row}><th scope="row" className="p-4">複雑なExcelやオフライン作業</th><td className="p-4">デスクトップ版アプリの利用権</td><td className="p-4">マクロ、印刷、他ソフト連携</td></tr>
                <tr className={ac.row}><th scope="row" className="p-4">社外利用や端末管理</th><td className="p-4">端末管理、アクセス制御の範囲</td><td className="p-4">対象端末と必要な設定</td></tr>
              </tbody>
            </table>
          </div>
          <p className={paragraph}>全員に同じ使い方を求めず、事務、営業、現場などの役割で必要条件を分けます。利用人数だけでなく、移行作業、社員への説明、運用に必要な担当者の時間も見積もってください。既存のOffice契約と重複しないか、更新日や契約条件も確認します。</p>
          <p className={paragraph}>契約前には、必要機能を記した一覧と公式の仕様を照合します。最新の料金は公式サイトで確認してください。機能と契約条件は、<a href="https://www.microsoft.com/ja-jp/microsoft-365/business/microsoft-365-plans-and-pricing" className="text-svc-josys underline underline-offset-4">Microsoft公式の一般法人向けプラン比較</a>を参照できます。</p>

          <h2 className={heading}>3. Microsoft 365のメール移行手順</h2>
          <p className={paragraph}>メールは移行元によって方法が変わります。メール本文だけでなく、連絡先、予定表、共有窓口も対象にするかを決めます。ある方法でメールをコピーできても、他の情報まで同時に移るとは限りません。<a href="https://learn.microsoft.com/en-us/exchange/mailbox-migration/mailbox-migration" className="text-svc-josys underline underline-offset-4">Microsoft公式のメール移行方法</a>で対象と制約を確認し、試験してから本番に進みます。</p>
          <ol className="list-decimal pl-6 text-[#30343F] leading-[2] space-y-2">
            <li>移行計画を作ります。責任者、作業日、問い合わせ先、業務への影響、延期や切り戻しの条件を決めます。</li>
            <li>会社用の管理環境と利用者を用意し、ドメインの所有確認、必要なライセンスの割り当て、認証設定を行います。</li>
            <li>代表的な利用者で試験移行します。過去メール、添付ファイル、フォルダー、連絡先・予定表の対象範囲を確認します。</li>
            <li>本番データを移し、受信先を示すDNSのMXレコードなどを切り替えます。送信元確認の設定も移行先の案内に沿って見直します。</li>
            <li>社内外との送受信、返信、共有窓口、スマートフォン、複合機からの送信を試し、残ったデータと旧環境を確認します。</li>
          </ol>
          <p className={`${paragraph} mt-4`}>DNSの変更はすべての場所に同時には反映されません。切り替え前後に旧環境へ届いたメールの扱いと、追加分を移す方法を用意します。切り戻す場合も両環境に届いたデータの整合を取る必要があるため、単に設定を戻すだけで完了とは考えないでください。</p>
          <p className={paragraph}>切り替え日は業務が少ない時間帯を選び、社員にはログイン方法、変更点、連絡先を事前に伝えます。旧契約は新環境の受け入れ確認前に解約しないことが大切です。完了条件を「送受信できた」だけにせず、業務で必要なメールが検索できるところまで確認します。</p>

          <div className={ac.promo}>
            <img src={promoHeroSrc} alt="" className={ac.promoHero} loading="lazy" />
            <span aria-hidden="true" className={ac.promoLabel}>ARCLE TIP!</span>
            <p className={ac.promoTitle}>棚卸しや切り替え計画で迷ったら</p>
            <p className="text-sumi-muted">Arcleの情シス代行では、クラウドサービスの選定・導入・運用、アカウント管理、セキュリティ対策を支援しています。専任担当者のいない企業も、現在の契約や困りごとの整理からご相談いただけます。</p>
            <a href={service.href} className="inline-flex items-center gap-2 mt-4 text-svc-josys font-bold hover:underline underline-offset-4">情シス代行の支援内容を見る<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </div>

          <h2 className={heading}>4. ファイル移行は保存先と権限を先に決定</h2>
          <p className={paragraph}>ファイルはコピーを始める前に、個人の作業用と会社で共有する資料を分けます。OneDriveは個人の作業ファイル、SharePointは部署や会社で共有する資料の置き場として使い分ける考え方があります。担当者が退職しても会社の資料を引き継げる構成にすることが重要です。</p>
          <p className={paragraph}>部署の責任者とフォルダー構成を決め、閲覧だけの人、編集できる人、社外へ共有できる人を整理します。権限は業務上必要な範囲に絞り、原則として部署や役割のグループ単位で付けると、異動時の変更漏れを減らせます。移行先で古い共有リンクをそのまま使えるとは考えず、案内の更新も予定します。</p>
          <ol className="list-decimal pl-6 text-[#30343F] leading-[2] space-y-2">
            <li>小さなフォルダーで試し、ファイル名、パスの長さ、開けない形式、リンク切れなどの問題を洗い出します。</li>
            <li>本番をコピーし、コピー後に更新された差分を反映します。旧保存先での編集を止める時刻を周知します。</li>
            <li>件数や容量、エラー記録を確認し、部署の担当者が重要ファイルを開いて内容・権限を確かめます。</li>
            <li>旧保存先は参照専用にするなど正本を一本化し、確認と承認が終わってから保管・廃止します。</li>
          </ol>
          <p className={`${paragraph} mt-4`}>よくあるつまずきは「コピーは終わったが業務で使えない」状態です。Excelの外部参照、マクロ、業務ソフトの保存先、スキャナーの保存設定も検証してください。部署ごとに確認者を置き、問題を記録して対応済みかどうかを判断できるようにします。</p>

          <h2 className={heading}>5. アカウント管理と多要素認証を整える</h2>
          <p className={paragraph}>アカウントは原則として一人ずつ発行し、同じIDとパスワードの使い回しを避けます。共通窓口のメールも、対応する社員に必要な権限を付ける方式を検討します。利用条件やライセンス要件を確認し、「共有だから全員で同じ認証情報を使う」という運用を残さないようにしましょう。</p>
          <p className={paragraph}>多要素認証は、パスワードに加えて認証アプリなど別の要素でも本人を確認する仕組みです。管理者から先に設定し、利用者には登録方法と問い合わせ先を案内します。<a href="https://support.microsoft.com/en-us/office/account-management/set-up-your-microsoft-365-sign-in-for-multi-factor-authentication" className="text-svc-josys underline underline-offset-4">Microsoft公式の多要素認証の登録案内</a>も参考になります。</p>
          <p className={paragraph}>スマートフォンの紛失・機種変更、認証できない場合の本人確認と復旧手順も決めます。困った社員のために安易に認証を外すのではなく、申請者が本人であることを確認してから再登録を支援してください。管理者権限は通常業務用と分け、必要な人に必要な範囲だけ付けます。</p>
          <p className={paragraph}>管理者が一人しかいないと、不在時に誰も復旧できなくなります。予備の管理手段と緊急時の連絡経路を用意し、保管情報へのアクセスを限定します。外部支援を使う場合も、会社自身が管理権限と契約情報を把握し、支援終了時に権限を外せる状態にしてください。</p>

          <h2 className={heading}>6. バックアップと入退社の運用を決める</h2>
          <p className={paragraph}>クラウドへの同期は、別の場所に同じ状態を反映する仕組みです。削除や上書きも反映され得るため、それだけで十分なバックアップとは判断できません。「どのデータを、いつの状態まで、どれくらいの時間で戻すか」を決め、契約と設定に応じた復元可能な範囲を確認します。</p>
          <p className={paragraph}>標準のごみ箱や履歴、保持機能で満たせない要件があれば、追加のバックアップを検討します。対象のメール・ファイル、保存期間、復元権限、費用を確認し、実際に復元するテストを行いましょう。バックアップの成功通知を見るだけでなく、業務で開けるデータに戻るかまで確認します。</p>
          <ul className={list}>
            <li>入社時：責任者が申請を承認し、個人アカウント、必要なライセンス、部署の権限、PC、多要素認証を準備します。</li>
            <li>異動時：新しい権限を付けるだけでなく、前の部署で不要になった権限や社外共有も外します。</li>
            <li>退職時：就業終了の時刻に合わせてサインイン停止と既存セッションへの対応を行い、端末を回収します。</li>
            <li>引き継ぎ時：メールと個人領域のファイル、共有資料の所有者を確認し、保存方針に沿って必要なデータを引き継ぎます。</li>
            <li>整理時：データ保持への影響を確認してからライセンス解除・アカウント削除を行い、作業記録を残します。</li>
          </ul>
          <p className={`${paragraph} mt-4`}>退職者のアカウントを先に削除すると、必要な情報を取り出せなくなるおそれがあります。停止、引き継ぎ、保管、削除を別の作業として管理してください。人事から誰にいつ連絡するか、実施後に誰が確認するかまで決めると、忙しい時期にも対応漏れを防ぎやすくなります。</p>

          <h2 className={heading}>7. まとめ：移行前の最終チェックリスト</h2>
          <p className={paragraph}>Microsoft 365の導入は、契約やコピーの完了ではなく、社員が仕事を続けられ、会社が管理を引き継げたところを完了とします。次の項目を責任者と確認し、未完了の項目には担当と期限を付けてください。</p>
          <ul className={list}>
            <li>アカウント・メール・ファイル・PCと、ドメイン管理者を把握しましたか。</li>
            <li>必要機能とプランを照合し、代表的な業務で試験しましたか。</li>
            <li>メールの送受信と過去データ、ファイルの内容と権限を確認しましたか。</li>
            <li>切り替え日時、延期条件、障害時の連絡先、旧環境の扱いを決めましたか。</li>
            <li>多要素認証、復旧手順、バックアップの復元確認を済ませましたか。</li>
            <li>入社・異動・退職の申請と承認、操作記録の保管方法を決めましたか。</li>
          </ul>
          <p className={`${paragraph} mt-4`}>最初からすべてを一度に変えず、試験で課題を見つけてから対象を広げると、判断しやすくなります。移行後も問い合わせを集め、使い方の説明と設定を見直し、日常の運用に定着させましょう。</p>

          <section className="mt-14">
            <h2 className={heading}>よくある質問</h2>
            <div className={ac.faq}>
              {faqs.map(({ question, answer }) => <div key={question}><h3 className={ac.faqQ}>{question}</h3><p>{answer}</p></div>)}
            </div>
          </section>
          <section className={ac.related}>
            <h2 className={ac.h2Flat.josys}>関連記事</h2>
            <div className="space-y-3">
              <a href="/articles/ichinomiya-josys-outsourcing-guide" className={ac.relatedLink}>中小企業向け 情シス代行の選び方</a>
              <a href="/works/accounting-office-m365-security" className={ac.relatedLink}>Microsoft 365・セキュリティの支援モデルケース</a>
              <p className="text-sm text-sumi-muted">支援モデルケースは架空のモデルケースであり、実際のお客様の導入実績ではありません。</p>
              <a href="/articles" className={ac.allLink}>記事一覧を見る</a>
            </div>
          </section>
          <section className={ac.svcBox.josys}>
            <h2 className={ac.svcTitle}>関連サービス</h2>
            <p className="mt-4 text-sumi-muted">クラウドの導入からアカウント管理、セキュリティの運用まで、情シス代行の対応範囲をご確認ください。</p>
            <a href={service.href} className={ac.svcBtn}>{service.name}を詳しく見る<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </section>
          <p className={ac.author}>この記事を書いた人：<a href="/company/message" className="text-svc-josys underline underline-offset-4">栗原 勇太（Arcle代表）</a></p>
        </div>
      </article>
      <ContactCta />
    </div>
  );
};

export default ArticleM365Migration;
