import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ContactCta, PageHeader } from '../next/parts';
import { services } from '../next/theme';
const title = "愛知・東海の中小企業へ｜ChatGPT導入の社内ルール";
// 画面の見出しには地域名を出さない（地域名はtitleとmetaだけ）
const pageTitle = "中小企業のChatGPT導入と社内ルールの作り方";
const description = "愛知・東海の中小企業向けに、ChatGPT導入前の社内ルールを解説。入力禁止情報、利用目的、アカウント権限、記録とレビューの決め方を整理します。運用例とチェックリスト、誤入力時の対応まで、総務担当者が使える形で紹介します。";
const canonical = "https://www.arcle.net/articles/chatgpt-security-policy-sme";
const faqs = [{ "question": "ChatGPTで入力してはいけない情報は？", "answer": "導入初期は顧客情報、契約情報、未公開の業績情報などの機密情報や、パスワードなどの認証情報を入力禁止にする運用から始めます。判断に迷う資料は入力せず、社内責任者に確認してください。" }, { "question": "社内ルールはどこまで細かく作るべきですか？", "answer": "最初は一枚で確認できる最小ルールを用意し、入力禁止情報、利用目的、権限管理、記録と見直しの責任者を明記します。運用で出た質問を追記して更新する方法が現実的です。" }, { "question": "生成AIの出力はそのまま業務利用できますか？", "answer": "事実や数字、引用元、会社として約束する内容を人が確認する手順が必要です。社外向け文書は通常の承認手順にも従い、判断できない内容をそのまま転用しないでください。" }];
const headingClass = 'font-head text-2xl md:text-[28px] font-bold text-svc-ai [word-break:auto-phrase] mt-12 mb-4';
const ArticleChatGPTPolicy: React.FC = () => {
    const service = services.find((item) => item.key === 'ai')!;
    return (<div className="bg-cream text-sumi">
      <Helmet>
        <title>{title} | Arcle</title>
        <meta name="description" content={description}/>
        <link rel="canonical" href={canonical}/>
        <script type="application/ld+json">{JSON.stringify({
            '@context': 'https://schema.org', '@type': 'Article',
            headline: title, description, datePublished: '2026-03-06', dateModified: '2026-10-27',
            author: { '@type': 'Person', name: '栗原 勇太', url: 'https://www.arcle.net/company/message' },
            publisher: { '@type': 'Organization', name: 'Arcle', logo: { '@type': 'ImageObject', url: 'https://www.arcle.net/images/ogp.png' } },
            mainEntityOfPage: canonical, image: 'https://www.arcle.net/images/ogp.png'
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
            '@context': 'https://schema.org', '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://www.arcle.net/' },
                { '@type': 'ListItem', position: 2, name: 'お役立ち記事', item: 'https://www.arcle.net/articles' },
                { '@type': 'ListItem', position: 3, name: title, item: canonical }
            ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
            '@context': 'https://schema.org', '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } }))
        })}</script>
      </Helmet>
      <PageHeader en="Articles" title={pageTitle} service="ai" crumbs={[{ label: 'お役立ち記事', href: '/articles' }, { label: pageTitle }]}/>
      <article className="bg-white rounded-t-[48px] md:rounded-t-[80px] py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-5 text-[16px] leading-[2]">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className={`rounded-full px-4 py-1 text-sm font-bold ${service.tint} ${service.text}`}>{service.name}</span>
            <time dateTime="2026-03-06" className="text-sm text-sumi-muted">公開日 2026-03-06</time>
            <time dateTime="2026-10-27" className="text-sm text-sumi-muted">更新日 2026-10-27</time>
          </div>
    <p className="text-sumi-muted leading-[2] mb-4">中小企業がChatGPTを導入する際は、使い方の研修と一緒に社内ルールを作ることが大切です。生成AIは文章作成や要約を助ける一方、顧客情報の入力や誤った回答の転用によって問題が起こる可能性があります。専任のIT担当者がいなくても、入力してよい情報、利用できる業務、承認する人を決めるところから始められます。導入を検討する経営者・総務担当者に向けて、現場で使える運用方法を整理します。</p>
    <h2 className="font-head text-2xl md:text-[28px] font-bold text-svc-ai [word-break:auto-phrase] mt-12 mb-4">ChatGPTの社内ルールは四つの項目から始める</h2>
    <p className="text-sumi-muted leading-[2] mb-4">最初から分厚い規程を作るより、社員が迷ったときに判断できる内容を一枚にまとめる方法が現実的です。最低限決めたいのは、入力禁止情報、利用目的、権限管理、記録と見直しの責任者です。プロンプトとはAIに渡す指示文のことで、この指示に何を書いてよいかを具体例で示すと伝わりやすくなります。</p>
    <p className="text-sumi-muted leading-[2] mb-4">「機密情報を入れない」だけでは、現場で判断が分かれます。顧客名を削った見積書はよいのか、社外秘の議事録を要約してよいのか、といった業務の場面に置き換えます。分からない場合は入力を止めて相談するという原則と、その相談先を決めてください。承認されるまで使わない情報を明確にすることが大切です。</p>
    <div className="overflow-x-auto my-6 rounded-[28px] border border-warm-line"><table className="w-full min-w-[560px] text-left text-sm leading-[1.9]"><caption className="px-5 py-3 text-left font-bold text-sumi">ChatGPTの社内ルールは四つの項目から始める：確認表</caption><thead className="bg-cream"><tr><th scope="col" className="p-4 font-bold text-sumi">決める項目</th><th scope="col" className="p-4 font-bold text-sumi">最低限書くこと</th></tr></thead><tbody><tr className="border-t border-warm-line"><th scope="row" className="p-4 font-bold text-sumi">入力情報</th><td className="p-4 text-sumi-muted">禁止する情報、加工が必要な情報、相談先</td></tr><tr className="border-t border-warm-line"><th scope="row" className="p-4 font-bold text-sumi">利用目的</th><td className="p-4 text-sumi-muted">許可する業務と、人が確認する場面</td></tr><tr className="border-t border-warm-line"><th scope="row" className="p-4 font-bold text-sumi">権限管理</th><td className="p-4 text-sumi-muted">承認済みの環境、利用申請、退職時の停止</td></tr><tr className="border-t border-warm-line"><th scope="row" className="p-4 font-bold text-sumi">記録・見直し</th><td className="p-4 text-sumi-muted">残す記録、確認できる人、見直し担当者</td></tr></tbody></table></div>
    <p className="text-sumi-muted leading-[2] mb-4">ルールの所有者は役職や部署で明記すると、担当者が変わっても引き継げます。経営者が利用方針を承認し、総務が申請や周知を取りまとめ、各部署の責任者が業務での使い方を確認する、といった分担が考えられます。小規模な会社で兼任する場合も、誰が最終判断するかは省略しないようにしましょう。</p>
    <p className="text-sumi-muted leading-[2] mb-4">一枚の利用ガイドには、許可する使い方を短い例文で載せます。例えば「公開済みの商品説明を基に、案内文の候補を作る」「架空の条件で電話対応の練習文を作る」などです。禁止事項だけを並べると、何に使えばよいかが伝わりません。実際の業務に近い許可例があれば、社員は相談の出発点を見つけやすくなります。</p>

    <h2 className="font-head text-2xl md:text-[28px] font-bold text-svc-ai [word-break:auto-phrase] mt-12 mb-4">入力禁止情報を具体例と比較表で共有する</h2>
    <p className="text-sumi-muted leading-[2] mb-4">導入初期は顧客情報、契約情報、未公開の業績情報などを入力禁止にする保守的な運用から始めると、判断をそろえやすくなります。これは社内の運用方針としての提案です。業務で機密情報を扱う必要がある場合は、契約条件と社内の許可範囲を確認した別の手順を設け、現場の自己判断で例外を作らないようにします。</p>
    <div className="overflow-x-auto my-6 rounded-[28px] border border-warm-line"><table className="w-full min-w-[560px] text-left text-sm leading-[1.9]"><caption className="px-5 py-3 text-left font-bold text-sumi">入力禁止情報を具体例と比較表で共有する：確認表</caption><thead className="bg-cream"><tr><th scope="col" className="p-4 font-bold text-sumi">情報の例</th><th scope="col" className="p-4 font-bold text-sumi">初期運用の判断例</th><th scope="col" className="p-4 font-bold text-sumi">代わりに行うこと</th></tr></thead><tbody><tr className="border-t border-warm-line"><th scope="row" className="p-4 font-bold text-sumi">顧客名・連絡先・相談内容</th><td className="p-4 text-sumi-muted">入力しない</td><td className="p-4 text-sumi-muted">架空の顧客と状況で文案を作る</td></tr><tr className="border-t border-warm-line"><th scope="row" className="p-4 font-bold text-sumi">契約書・見積書・未公開売上</th><td className="p-4 text-sumi-muted">承認なしに入力しない</td><td className="p-4 text-sumi-muted">一般的な構成や確認項目だけを相談する</td></tr><tr className="border-t border-warm-line"><th scope="row" className="p-4 font-bold text-sumi">パスワード・APIキー</th><td className="p-4 text-sumi-muted">入力しない</td><td className="p-4 text-sumi-muted">認証情報を含めず操作の疑問を説明する</td></tr><tr className="border-t border-warm-line"><th scope="row" className="p-4 font-bold text-sumi">公開済みの商品紹介</th><td className="p-4 text-sumi-muted">権利と利用目的を確認する</td><td className="p-4 text-sumi-muted">公開情報の範囲で文案を作り直す</td></tr></tbody></table></div>
    <p className="text-sumi-muted leading-[2] mb-4">匿名化したつもりでも、社名、金額、日付、案件の特徴が組み合わさると取引先を推測できる場合があります。名前を伏せただけで入力可能とはしないでください。添付ファイルや画像には、本文以外のシート、コメント、画面の通知、ファイル名に情報が残っていることもあるため、送信前の確認が必要です。</p>
    <p className="text-sumi-muted leading-[2] mb-4">例えば顧客へのお詫び文を作るなら、実際のメールを貼る代わりに「納期の遅延を伝え、代替案を案内する文章」と指示できます。実名、金額、日付は人が後から補います。どの情報をAIに渡す必要があるかを減らして考えると、業務の目的を保ちながら入力リスクを下げられます。</p>
    <p className="text-sumi-muted leading-[2] mb-4">試行段階では、使った業務と困った点を短く共有する場を設けます。文章の修正に時間がかかったなら、指示の出し方だけでなく、そもそもその仕事に使う価値があるかを見直します。利用回数を増やすことより、確認を含めた負担が減ることを目指してください。効果が分かる業務から少しずつ広げる方法が無理なく続けられます。</p>

    <h2 className="font-head text-2xl md:text-[28px] font-bold text-svc-ai [word-break:auto-phrase] mt-12 mb-4">利用目的と生成結果を確認する手順を決める</h2>
    <p className="text-sumi-muted leading-[2] mb-4">導入の最初は、公開情報を基にした文案作成、社内向けのお知らせの下書き、一般的な作業手順のアイデア出しなど、入力を管理しやすい業務から選びます。要約でも元資料が機密なら同じ扱いにはできません。「文章作成は許可」と大きく括るのではなく、対象の情報と出力先を合わせて決めることが重要です。</p>
    <p className="text-sumi-muted leading-[2] mb-4">生成AIは自然な文章でも誤った内容を返すことがあります。ハルシネーションとは、事実に反する情報をもっともらしく出力することです。日付、金額、製品仕様、引用元、社内手順などを原本と照合し、実際には存在しない制度や約束を追加していないかを見ます。出典らしいURLがあっても、開いて内容を確認してください。</p>
    <ul className="list-disc pl-6 text-sumi-muted leading-[2] space-y-2 mb-4"><li>担当者が下書きを作り、実在する名称・数字・条件を原本と照合します。</li><li>社外へ出す文章は、通常の社内承認手順に沿って責任者が確認します。</li><li>使用した根拠と修正点を必要な範囲で残し、正式な文書として保存します。</li><li>判断できない内容はそのまま使わず、担当部署や専門家に確認します。</li></ul>
    <p className="text-sumi-muted leading-[2] mb-4">失敗しやすいのは「AIが調べたから正しい」と扱うことと、確認する人が決まっていないことです。最終責任は人が持つ前提をルールに書きます。文章が読みやすくても、会社が約束できない納期や実施していないサービスを含めていないか確認しましょう。自動送信まで進める場合は、下書き利用とは別の承認が必要です。</p>
    <p className="text-sumi-muted leading-[2] mb-4">ルールを変更した際は、変更点だけを短く知らせ、必要なら利用者に再確認を求めます。新しい機能が使えるようになっても、自動的に社内で許可されたとはしない方針を共有してください。利用できる環境と業務を一覧で示し、旧版の資料を見て判断しないよう、最新版への案内をそろえます。</p>
    <div className={`mt-14 mb-10 p-6 md:p-8 rounded-[28px] border ${service.border} ${service.tint}`}>
    <p className="font-head text-sumi font-bold mb-2">社内だけで整理が難しいときは</p><p className="text-sumi-muted leading-[2] mb-4">ルールづくりと現場への周知を一緒に進めたい場合は、Arcleの生成AI活用支援をご覧ください。セキュリティポリシー策定、利用ガイドライン作成、AI基礎研修、業務別プロンプトテンプレート提供などを支援しています。</p><a href={service.href} className={`inline-flex items-center gap-2 font-bold underline underline-offset-4 ${service.text}`}>{service.name}の支援内容を見る<ArrowRight className="w-4 h-4" aria-hidden="true"/></a></div>
    <h2 className="font-head text-2xl md:text-[28px] font-bold text-svc-ai [word-break:auto-phrase] mt-12 mb-4">承認する利用環境とアカウント権限を整える</h2>
    <p className="text-sumi-muted leading-[2] mb-4">個人用のアカウントを社員がそれぞれ使う状態では、利用停止や設定の確認を会社で取りまとめにくくなります。利用できるサービスと契約プラン、会社が管理するアカウントの範囲を決めます。無料か有料かだけで安全性を判断せず、入力データの扱い、保存、共有、管理機能を契約と設定に照らして確認してください。</p>
    <p className="text-sumi-muted leading-[2] mb-4">OpenAIの公式ドキュメントでは、ChatGPT Enterpriseについて、業務データを既定で学習に使わないことや、アクセス制御などを案内しています。ただし、学習に使われないことだけで、社内のすべての資料を自由に入力してよいとはいえません。保存や外部連携の条件と、会社の承認は別に確認する必要があります。</p>
    <p className="text-sumi-muted leading-[2] mb-4">利用申請には、所属、利用目的、扱う情報、確認責任者を記入します。管理者権限は設定や利用者を変更できる権限なので、必要な人に限定してください。認証情報を複数人で共有する運用は避け、利用者ごとの管理を基本にします。入社・異動・退職に合わせた権限変更を、既存の社内手続きへ組み込むと漏れを減らせます。</p>
    <p className="text-sumi-muted leading-[2] mb-4">追加のツール連携やファイル共有も確認対象です。外部連携とは、別のサービスや社内データへ接続する機能です。便利だからと社員が独自に有効化すると、当初のルールで想定していない情報が扱われる可能性があります。機能を追加するときは、接続先、対象データ、利用者を確認してから許可する流れを作りましょう。</p>
    <p className="text-sm text-sumi-muted mb-4">参考：<a href="https://learn.chatgpt.com/docs/enterprise/work-admin-faq" className="underline underline-offset-4">OpenAI公式ドキュメント：ChatGPTの管理とプライバシー</a></p>

    <h2 className="font-head text-2xl md:text-[28px] font-bold text-svc-ai [word-break:auto-phrase] mt-12 mb-4">記録・誤入力時の対応と研修を運用に組み込む</h2>
    <p className="text-sumi-muted leading-[2] mb-4">ログは利用や操作の記録です。記録を確認する目的は、社員を監視することではなく、ルール違反や改善が必要な場面を見つけることだと説明します。契約や設定で確認できる範囲は異なるため、全会話を必ず取得できるとは想定しません。利用日、業務、確認者、困った点を簡単に報告する方法もあります。</p>
    <p className="text-sumi-muted leading-[2] mb-4">記録そのものに機密情報が集まる点にも注意します。保存場所、閲覧できる人、保存期間、削除の担当を社内で決め、問い合わせのために会話全文を広く転送する運用は避けます。何を入力したかを報告する際も、顧客情報を別の共有先へそのままコピーするのではなく、必要な情報だけを指定された窓口に伝えます。</p>
    <ul className="list-disc pl-6 text-sumi-muted leading-[2] space-y-2 mb-4"><li>誤入力に気付いたら追加の入力や共有を止め、社内の責任者へ速やかに報告します。</li><li>利用環境、発生時刻、情報の種類、共有の有無を、必要な範囲で記録します。</li><li>責任者が設定や契約を確認し、必要に応じて提供元への問い合わせなどを判断します。</li><li>影響を確認し、ルールと研修を見直して再発を防ぎます。</li></ul>
    <p className="text-sumi-muted leading-[2] mb-4">会話を削除しただけで、すべての影響がなくなったと決めつけないことも大切です。削除や停止は社内責任者の指示と提供元の案内に従います。パスワードなどの認証情報を入力した場合は、関係する管理者へ連絡し、変更や無効化の要否を判断します。責められる不安で報告が遅れないよう、早期報告を促す方針も伝えましょう。</p>
    <p className="text-sumi-muted leading-[2] mb-4">研修では操作説明だけでなく、入力してよい例と禁止する例を使います。例えば、実際の顧客メールと架空の条件を使った指示を比べ、どこに問題があるかを話し合います。ルールの読了だけで終わらせず、自分の業務で使う場合の判断を練習すると、現場の質問を集めやすくなります。</p>
    <p className="text-sumi-muted leading-[2] mb-4">月に一度など、無理なく続けられる間隔で利用状況を振り返ります。よくある誤用や判断に迷った例を社内FAQに追加し、利用できる業務を調整します。作業時間が減ったかだけでなく、確認や修正の負担が増えていないかも見ます。更新日と版を付け、社員がいつでも最新版を確認できる場所に置いてください。</p>

    <h2 className="font-head text-2xl md:text-[28px] font-bold text-svc-ai [word-break:auto-phrase] mt-12 mb-4">まとめ：一枚のルールと相談先を用意する</h2>
    <p className="text-sumi-muted leading-[2] mb-4">ChatGPT導入前の社内ルールは、入力禁止情報、利用目的、権限管理、記録と見直しの四項目から始められます。顧客情報や契約情報を安易に入力せず、生成された文章は人が確認することを基本にします。安全な運用は契約だけで完成するものではなく、現場が迷ったときの判断と相談の流れが必要です。</p>
    <p className="text-sumi-muted leading-[2] mb-4">まずは禁止する情報を自社の業務に置き換えて列挙し、利用する環境と責任者を決めてください。次に限られた業務で試し、研修と振り返りを通じて内容を更新します。一度作って終わりにせず、サービスの条件や使う業務が変わったときに見直すことで、無理のない活用を続けやすくなります。</p>
    <section className="mt-14"><h2 className={headingClass}>よくある質問</h2>
    <div className="space-y-5 text-sumi-muted leading-[2] [&>div]:rounded-[28px] [&>div]:bg-cream [&>div]:p-6 [&_h3]:mb-2">
    {faqs.map((faq) => <div key={faq.question}><h3 className="font-head font-bold text-sumi [word-break:auto-phrase]">{faq.question}</h3><p>{faq.answer}</p></div>)}
    </div></section>
    <section className="mt-14 border-t border-warm-line pt-10"><h2 className={headingClass}>関連記事</h2><div className="space-y-3"><a href="/articles/ichinomiya-josys-outsourcing-guide" className={`block ${service.text} hover:underline underline-offset-4 py-1`}>中小企業向け 情シス代行の選び方</a>
    <a href="/articles/sme-bi-tableau-powerbi" className={`block ${service.text} hover:underline underline-offset-4 py-1`}>TableauとPower BIはどちらを選ぶべき？</a>
    <a href="/articles" className="block text-sumi-muted hover:text-sumi underline">記事一覧を見る</a></div></section>
    <section className={`mt-14 rounded-[28px] p-6 md:p-8 ${service.tint}`}><h2 className="font-head text-2xl font-bold [word-break:auto-phrase]">関連サービス</h2>
    <a href={service.href} className="mt-5 inline-flex items-center gap-2 rounded-full bg-sumi text-white px-6 py-3 font-bold hover:opacity-90">{service.name}を詳しく見る<ArrowRight className="w-4 h-4" aria-hidden="true"/></a></section>
    <p className="mt-10 text-sm text-sumi-muted">この記事を書いた人：<a href="/company/message" className="underline underline-offset-4">栗原 勇太（Arcle代表）</a></p>
        </div>
      </article>
      <ContactCta />
    </div>);
};
export default ArticleChatGPTPolicy;
