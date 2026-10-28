import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '../parts';

const enacted = '2026年10月28日';
const heading = 'font-head text-xl md:text-2xl font-bold text-sumi [word-break:auto-phrase] mt-12 mb-4';
const paragraph = 'text-sumi-muted leading-[2] mb-4';
const list = 'list-disc pl-6 text-sumi-muted leading-[2] space-y-1 mb-4';

const PrivacyNext: React.FC = () => (
  <div className="bg-cream text-sumi">
    <Helmet>
      <title>プライバシーポリシー | Arcle（アークル）</title>
      <meta name="description" content="Arcle（アークル）のプライバシーポリシー。お問い合わせやIT健康診断でお預かりする個人情報の利用目的、管理の方法、開示等のご請求の手続き、お問い合わせ窓口を定めています。" />
      <link rel="canonical" href="https://www.arcle.net/privacy" />
    </Helmet>
    <PageHeader en="Privacy Policy" title="プライバシーポリシー" crumbs={[{ label: 'プライバシーポリシー' }]} />
    <section className="bg-white rounded-t-[48px] md:rounded-t-[80px] py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-5 text-[16px] leading-[2]">
        <p className={paragraph}>Arcle（アークル。以下「当事業者」）は、お客様からお預かりする個人情報の重要性を認識し、個人情報の保護に関する法律その他の関係法令を守り、次のとおり適切に取り扱います。</p>

        <h2 className={heading}>1. 取得する個人情報</h2>
        <p className={paragraph}>当事業者は、適正な手段により、次の個人情報を取得します。</p>
        <ul className={list}>
          <li>お問い合わせフォーム：会社名、お名前、メールアドレス、電話番号、お問い合わせの内容など、フォームに入力いただいた情報</li>
          <li>IT健康診断：会社名、お名前、メールアドレス、電話番号、診断でのご回答と結果</li>
          <li>ご契約とご支援：ご担当者の連絡先、契約・請求に必要な情報、ご支援の中でお預かりする情報</li>
          <li>名刺交換やメール、お打ち合わせなどを通じてお知らせいただいた情報</li>
        </ul>

        <h2 className={heading}>2. 利用目的</h2>
        <p className={paragraph}>取得した個人情報は、次の目的の範囲で利用します。目的の範囲を超えて利用する場合は、あらかじめご本人の同意をいただきます。</p>
        <ul className={list}>
          <li>お問い合わせやご相談への回答、ご連絡のため</li>
          <li>IT健康診断の結果と資料をご提供するため</li>
          <li>お見積り、ご契約、サービスの提供、請求とお支払いの手続きのため</li>
          <li>当事業者のサービスやセミナー、お役立ち情報をご案内するため</li>
          <li>サービスとウェブサイトの改善のため（個人を特定しない統計として利用します）</li>
        </ul>
        <p className={paragraph}>ご案内のメールなどが不要な場合は、お問い合わせ窓口までお知らせください。以後のご案内を停止します。</p>

        <h2 className={heading}>3. 第三者への提供</h2>
        <p className={paragraph}>当事業者は、次の場合を除き、ご本人の同意なく個人情報を第三者に提供しません。</p>
        <ul className={list}>
          <li>法令に基づく場合</li>
          <li>人の生命、身体または財産の保護のために必要があり、ご本人の同意を得ることが難しい場合</li>
          <li>公衆衛生の向上や児童の健全な育成のために特に必要があり、ご本人の同意を得ることが難しい場合</li>
          <li>国の機関や地方公共団体などが法令の定める事務を行うことに協力する必要があり、ご本人の同意を得ると事務の遂行に支障を及ぼすおそれがある場合</li>
        </ul>

        <h2 className={heading}>4. 業務の委託と外部サービスの利用</h2>
        <p className={paragraph}>当事業者は、利用目的の達成に必要な範囲で、個人情報の取扱いを外部に委託することがあります。その場合は、個人情報を適切に取り扱う委託先を選び、必要な監督を行います。</p>
        <p className={paragraph}>また、お問い合わせやIT健康診断の受付と記録には、Google LLC（米国）が提供するGoogle フォームやGoogle スプレッドシートなどのクラウドサービスを利用しています。</p>

        <h2 className={heading}>5. 安全管理のための措置</h2>
        <p className={paragraph}>当事業者は、個人情報の漏えい、滅失またはき損を防ぐため、次の措置を講じます。</p>
        <ul className={list}>
          <li>基本方針と取扱いのルールを定め、個人情報を取り扱う者と責任者を明確にします。</li>
          <li>個人情報を取り扱う者に、必要な教育と監督を行います。</li>
          <li>個人情報を保管する機器や書類の盗難・紛失を防ぎ、不要になったものは復元できない方法で廃棄します。</li>
          <li>アクセスできる者を限定し、不正アクセスやウイルスへの対策を行います。</li>
          <li>外国の事業者が提供するクラウドサービスを利用する場合は、その国の個人情報の保護に関する制度を把握したうえで、安全管理のための措置を講じます。</li>
        </ul>

        <h2 className={heading}>6. アクセス状況の把握とCookie</h2>
        <p className={paragraph}>当サイトでは、利用状況を把握し改善に役立てるため、Google アナリティクスなどのアクセス解析ツールを利用する場合があります。これらのツールはCookieを使い、個人を特定しない形でアクセスの情報を集めます。また、地図の表示にGoogle マップを、フォームの表示にGoogle フォームを埋め込んでおり、Googleが独自にCookieなどを利用することがあります。</p>
        <p className={paragraph}>Cookieは、お使いのブラウザの設定で無効にできます。Googleによるデータの取扱いは、<a href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank" rel="noopener noreferrer" className="text-sumi underline underline-offset-4">Googleのポリシー</a>をご確認ください。</p>

        <h2 className={heading}>7. 開示などのご請求</h2>
        <p className={paragraph}>ご本人から、保有個人データの利用目的の通知、開示、内容の訂正・追加・削除、利用の停止・消去、第三者提供の停止、第三者提供の記録の開示のご請求があった場合は、ご本人であることを確認したうえで、法令に従い遅滞なく対応します。ご請求は、下記のお問い合わせ窓口までご連絡ください。</p>

        <h2 className={heading}>8. お問い合わせ窓口</h2>
        <p className={paragraph}>個人情報の取扱いに関するご質問、ご相談、苦情は、次の窓口で承ります。</p>
        <dl className="rounded-[28px] bg-cream p-6 md:p-8 grid grid-cols-[6em_1fr] gap-x-4 gap-y-2 text-sumi-muted leading-[1.9]">
          <dt className="font-bold text-sumi">事業者名</dt><dd>Arcle（アークル）</dd>
          <dt className="font-bold text-sumi">代表</dt><dd>栗原 勇太</dd>
          <dt className="font-bold text-sumi">所在地</dt><dd>〒491-0835 愛知県一宮市あずら2丁目8</dd>
          <dt className="font-bold text-sumi">連絡方法</dt><dd><a href="/contact" className="text-sumi underline underline-offset-4">お問い合わせフォーム</a>より承ります。</dd>
        </dl>

        <h2 className={heading}>9. 改定</h2>
        <p className={paragraph}>当事業者は、法令の改正やサービスの変更に合わせて、このプライバシーポリシーを改定することがあります。改定後の内容は、このページに掲載した時点から適用します。</p>

        <p className="mt-12 text-sm text-sumi-muted text-right">制定日：{enacted}</p>
      </div>
    </section>
  </div>
);

export default PrivacyNext;
