import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ContactCta, PageHeader, comicIllust } from '../next/parts';
import { services } from '../next/theme';
import { ac, promoHeroSrc } from './articleComic';
const title = "愛知・東海の中小企業向け｜情シス代行の選び方と料金";
// 画面の見出しには地域名を出さない（地域名はtitleとmetaだけ）
const pageTitle = "中小企業向け 情シス代行の選び方";
const description = "愛知・東海の中小企業向けに、情シス代行の選び方を解説。対応範囲や受付時間の比較、委託前の棚卸し、権限管理、導入手順とよくある失敗を整理します。Arcleの料金を参考に、専任IT担当者がいない会社の判断基準を紹介します。";
const canonical = "https://www.arcle.net/articles/ichinomiya-josys-outsourcing-guide";
const faqs = [{ "question": "情シス代行はどの規模の会社に向いていますか？", "answer": "専任のIT担当者がいない、または兼任担当者の負担が大きい中小企業に向いています。人数だけでなく、問い合わせ量や管理の抜け漏れから必要な支援を判断します。" }, { "question": "費用はどれくらい見込むべきですか？", "answer": "Arcleの情シス代行は、ライトプラン3万円〜、スタンダードプラン15万円〜、プレミアムプラン30万円〜です（税抜）。企業規模や対応範囲に応じて内容を調整できるため、正確な費用はお見積もりでご確認ください。" }, { "question": "導入前に何を準備すればよいですか？", "answer": "問い合わせ内容、IT作業時間、機器・契約・アカウントの一覧、社内の承認者を整理します。不明な項目は不明のまま記録し、調査が必要な作業として共有すると進めやすくなります。" }];
const headingClass = ac.h2.josys;
const ArticleJosysGuide: React.FC = () => {
    const service = services.find((item) => item.key === 'josys')!;
    return (<div className={ac.page}>
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
      <PageHeader en="Articles" title={pageTitle} service="josys" compact image={comicIllust('svc-josys')} imageMode="panel" crumbs={[{ label: 'お役立ち記事', href: '/articles' }, { label: pageTitle }]}/>
      <article className={ac.article}>
        <div className={ac.sheet}>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className={ac.tag.josys}>{service.name}</span>
            <time dateTime="2026-03-06" className={ac.dateJa}>公開日 2026-03-06</time>
            <time dateTime="2026-10-27" className={ac.dateJa}>更新日 2026-10-27</time>
          </div>
    <p className={ac.p}>中小企業が情シス代行を選ぶときは、月額料金だけでなく「誰の、どの仕事を、どこまで任せるか」を決めることが大切です。情シスとは、社内のパソコンやアカウント、ネットワークなどを管理する情報システム部門のことです。専任者がいない会社では、総務担当者や詳しい社員に対応が集中し、本来の仕事が止まってしまいます。外部への委託を検討する経営者・総務担当者に向けて、比較から引き継ぎまでの判断基準を整理します。</p>
    <h2 className={ac.h2.josys}>情シス代行が必要か、社内の負担を棚卸しする</h2>
    <p className={ac.p}>最初に確認するのは従業員数よりも、毎月発生している作業と放置されている課題です。例えば、入社日にパソコンが間に合わない、退職者のアカウントが残っている、メールが使えなくなるたびに総務が調べる、といった状態を記録します。担当者が努力して対応できていても、その人の不在時に止まる仕事は委託を検討する対象です。</p>
    <p className={ac.p}>棚卸し表には「作業名・発生頻度・実作業時間・影響する部署・現在の担当者」を書きます。問い合わせ件数だけでなく、調べたり業者に連絡したりする時間も含めます。記録の目的は社員の評価ではなく、支援が必要な場所を見つけることです。正確な集計が難しければ、直近のメールやカレンダーを見ながら分かる範囲から埋めてください。</p>
    <ul className="list-disc pl-6 text-[#30343F] leading-[2] space-y-2 mb-4"><li>入退社時のパソコン設定とアカウント発行・停止は、誰が管理していますか。</li><li>契約中のクラウドサービスと更新日、管理者を一覧にできますか。</li><li>バックアップから必要なファイルを戻す手順を確認していますか。</li><li>障害時の連絡先と、止めてはいけない業務を共有していますか。</li></ul>
    <p className={ac.p}>問い合わせが少なくても、管理者や契約の所在が分からなければ整備が必要です。反対に、課題が特定の機器の故障だけなら、個別の修理や保守契約で対応できる場合もあります。日常の相談と継続的な管理が必要なのか、一度きりの作業なのかを分けると、過剰な契約を避けられます。</p>
    <p className={ac.p}>棚卸しの際には、今できている作業も残してください。例えば入社時の設定がいつも間に合っているなら、その担当者が何を準備しているかを確認します。成功している手順を引き継がず、困りごとだけ伝えると、今まで問題なく回っていた業務まで変わる可能性があります。利用者の申請書や機器の貸出記録も、現状を知るための材料になります。</p>

    <h2 className={ac.h2.josys}>情シス代行の対応範囲を比較する</h2>
    <p className={ac.p}>「IT全般に対応」という説明だけでは、契約後の役割を判断できません。ヘルプデスクは社員からの問い合わせ窓口、キッティングはパソコンを業務で使える状態に初期設定する作業です。こうした言葉を実際の依頼に置き換えて、標準料金に含まれる作業と個別見積もりになる作業を確認しましょう。</p>
    <div className={`overflow-x-auto my-7 ${ac.tableWrap}`}><table className="w-full min-w-[560px] text-left text-sm leading-[1.9]"><caption className={ac.caption}>情シス代行の対応範囲を比較する：確認表</caption><thead className={ac.thead}><tr><th scope="col" className="p-4 font-bold text-sumi">比較項目</th><th scope="col" className="p-4 font-bold text-sumi">確認すること</th><th scope="col" className="p-4 font-bold text-sumi">曖昧な場合の困りごと</th></tr></thead><tbody><tr className={ac.row}><th scope="row" className="p-4 font-bold text-sumi">問い合わせ対応</th><td className="p-4 text-[#30343F]">受付方法・対象機器・利用者の範囲</td><td className="p-4 text-[#30343F]">社員が直接依頼できず総務に集中する</td></tr><tr className={ac.row}><th scope="row" className="p-4 font-bold text-sumi">入退社の対応</th><td className="p-4 text-[#30343F]">申請期限・設定項目・停止の確認方法</td><td className="p-4 text-[#30343F]">当日まで準備や停止が終わらない</td></tr><tr className={ac.row}><th scope="row" className="p-4 font-bold text-sumi">セキュリティ管理</th><td className="p-4 text-[#30343F]">更新・権限確認・バックアップの分担</td><td className="p-4 text-[#30343F]">対策済みと思っていた作業が残る</td></tr><tr className={ac.row}><th scope="row" className="p-4 font-bold text-sumi">訪問・導入支援</th><td className="p-4 text-[#30343F]">対象地域・交通費・追加作業の条件</td><td className="p-4 text-[#30343F]">必要な作業が追加費用になる</td></tr></tbody></table></div>
    <p className={ac.p}>実際の相談内容を同じ条件で候補先に渡すと比較しやすくなります。「来月の入社に合わせて端末とメールを用意したい」「共有フォルダーが開けない」といった依頼例に対し、誰が何を行い、社内に何が残るのか回答をもらいます。製品名の一覧よりも、自社の困りごとを最後まで解決できるかが重要です。</p>
    <p className={ac.p}>外部の販売会社や既存の保守業者との関係も確認します。原因調査は代行会社、回線修理は通信事業者など、複数の窓口が関わる場合があります。代行会社が連絡を取りまとめるのか、社内で手配するのかを決めておけば、担当範囲の境目で対応が止まることを防ぎやすくなります。</p>
    <p className={ac.p}>社内の連絡窓口を一人に集める場合は、代理担当を置きます。外部の支援があっても、購入や設定変更の承認が特定の人で止まれば作業は進みません。通常の相談は現場から直接、費用や権限が変わる依頼は総務の承認後など、依頼の種類で手順を分ける方法もあります。会社の規模に合う簡単な流れを優先しましょう。</p>

    <h2 className={ac.h2.josys}>受付時間・緊急時の連絡と担当体制を確認する</h2>
    <p className={ac.p}>対応の速さは「すぐ対応します」という表現ではなく、受付時間と連絡手順で確認します。受付から最初の返答までと、復旧までの時間は別です。SLAとはサービス品質についての合意で、例えば回答時間などの条件を定めるものです。必ず設定されるとは限らないため、約束される範囲を契約書や提案書で読み合わせます。</p>
    <p className={ac.p}>緊急度は、業務への影響で区分すると現場が迷いません。全員が受発注できない障害と、一人の印刷設定の相談では優先順位が異なります。「全社停止」「一部部署に影響」「通常相談」などの区分を作り、電話・チャット・メールのどれで連絡するかを決めます。営業時間外に発生した場合の社内判断者も必要です。</p>
    <p className={ac.p}>担当者固定かどうかだけでなく、不在時に別の担当者が対応できる記録があるかを確認してください。機器の構成、過去の障害、変更履歴が共有されていれば、毎回同じ説明をする負担を減らせます。打ち合わせでは、記録の更新方法と、社内側でも内容を確認できるかを質問すると具体的な運用が見えます。</p>
    <p className={ac.p}>訪問が必要な作業も洗い出します。配線の確認や機器の交換では、リモートだけで完結しないことがあります。拠点ごとの所在地と機器の保管場所を伝え、訪問の条件や日程調整を確認しましょう。遠隔対応の操作を社内で補助できる人を決めておくと、現地到着までに確認できる範囲も広がります。</p>
    <p className={ac.p}>見積もりの前提に変更があった場合の扱いも確認します。新拠点の開設、社員の増加、大きなシステムの切り替えがあると、必要な作業は変わります。何が通常の運用で、何が別プロジェクトになるかを事前に話し合います。予定が確定していない段階でも、考えている変更を伝えておくと、契約後の認識違いを減らせます。</p>
    <div className={ac.promo}>
            <img src={promoHeroSrc} alt="" className={ac.promoHero} loading="lazy" />
            <span aria-hidden="true" className={ac.promoLabel}>ARCLE TIP!</span>
    <p className={ac.promoTitle}>社内だけで整理が難しいときは</p><p className={ac.p}>相談先の整理から運用まで支援が必要なら、Arcleの情シス代行をご覧ください。ITヘルプデスク、セキュリティ・資産管理、クラウド・インフラ支援など、サービス内容を確認できます。</p><a href={service.href} className={`inline-flex items-center gap-2 font-bold underline underline-offset-4 ${service.text}`}>{service.name}の支援内容を見る<ArrowRight className="w-4 h-4" aria-hidden="true"/></a></div>
    <h2 className={ac.h2.josys}>情シス代行の料金は作業範囲と合わせて見る</h2>
    <p className={ac.p}>料金を比較するときは、月額費用、初期の整理作業、個別プロジェクト、機器代やソフトの利用料を分けて見ます。同じ月額でも、相談だけを含む契約と端末設定まで含む契約では役割が違います。見積もりには対象人数・拠点・端末・依頼内容をそろえて伝え、追加費用が発生する条件を明記してもらいましょう。</p>
    <div className={`overflow-x-auto my-7 ${ac.tableWrap}`}><table className="w-full min-w-[560px] text-left text-sm leading-[1.9]"><caption className={ac.caption}>情シス代行の料金は作業範囲と合わせて見る：確認表</caption><thead className={ac.thead}><tr><th scope="col" className="p-4 font-bold text-sumi">Arcleのプラン</th><th scope="col" className="p-4 font-bold text-sumi">掲載料金の参考</th><th scope="col" className="p-4 font-bold text-sumi">サービスページにある主な内容</th></tr></thead><tbody><tr className={ac.row}><th scope="row" className="p-4 font-bold text-sumi">ライト</th><td className="p-4 text-[#30343F]">3万円〜（税抜）</td><td className="p-4 text-[#30343F]">メール・チャット相談、簡易トラブル対応、リモート支援</td></tr><tr className={ac.row}><th scope="row" className="p-4 font-bold text-sumi">スタンダード</th><td className="p-4 text-[#30343F]">15万円〜（税抜）</td><td className="p-4 text-[#30343F]">ライトの内容、PC初期設定、アカウント管理、訪問、基本対策</td></tr><tr className={ac.row}><th scope="row" className="p-4 font-bold text-sumi">プレミアム</th><td className="p-4 text-[#30343F]">30万円〜（税抜）</td><td className="p-4 text-[#30343F]">スタンダードの内容、IT戦略、DX戦略、高度な対策、運用・保守</td></tr></tbody></table></div>
    <p className={ac.p}>上表はArcleの情シス代行の料金と内容です（税抜）。一般的な市場相場を示すものではありません。企業規模や対応範囲に応じて内容を調整できます。具体的な契約範囲や費用は、依頼したい作業を整理したうえで確認してください。</p>
    <p className={ac.p}>社内に残る負担も費用判断に含めます。依頼の取りまとめ、承認、現地作業の補助に時間がかかるなら、その分担を見直す必要があります。安いプランを選んだ結果、総務が業者間の連絡に追われては目的を達成できません。毎月減らしたい作業と、予防したい停止リスクを軸に検討しましょう。</p>
    <p className={ac.p}>契約前の確認表には、対象業務だけでなく対象外の業務を書く欄を設けます。例えば業務ソフトの操作説明を誰が担うか、機器故障時の修理手配をどこまで任せるかなどです。対象外であること自体が問題なのではなく、その作業が必要になったときの依頼先を決めておくことが大切です。分からない項目は質問として残しましょう。</p>

    <h2 className={ac.h2.josys}>導入手順と、丸投げで失敗しない権限管理</h2>
    <p className={ac.p}>契約直後にすべてを移すより、業務への影響が分かる順に引き継ぐと確認がしやすくなります。特に管理者権限は、設定を変更できる強い権限です。外部に渡す権限を必要な範囲に絞り、変更を承認する社内の責任者を決めます。パスワードを一覧にして通常のメールで送るような引き継ぎは避け、安全な共有方法を相談してください。</p>
    <ul className="list-disc pl-6 text-[#30343F] leading-[2] space-y-2 mb-4"><li>機器・契約・アカウントを一覧にし、所有者と管理者を確認します。</li><li>優先する業務を決め、問い合わせ窓口と社内の承認者を周知します。</li><li>必要な権限を付与し、作業内容・実施日・結果を記録します。</li><li>入退社やトラブル対応を試し、連絡と承認の流れを確認します。</li><li>定例の振り返りで残作業と改善点を確認し、委託範囲を調整します。</li></ul>
    <p className={ac.p}>よくある失敗は、外部担当者だけが設定を知っている状態に変わることです。社内の属人化を社外へ移すだけでは、不在や契約終了時の困りごとが残ります。資産台帳、構成図、作業記録の保管場所と所有者を決め、社内でも参照できる形にしましょう。契約終了時の権限削除や資料返却も、開始前に確認する項目です。</p>
    <p className={ac.p}>もう一つは、問い合わせを社員が個別に送り、対応状況が見えなくなる失敗です。受付窓口をまとめ、未対応・対応中・完了が分かる一覧を用意します。定例報告では件数だけでなく、同じ相談が繰り返される原因を見ます。手順書の整備や設定の標準化につなげると、トラブル対応中心の運用から改善へ進めます。</p>
    <p className={ac.p}>定例の振り返りでは、解決した相談のうち手順書にできるものを探します。同じ印刷トラブルが繰り返されるなら、操作案内だけでなく設定や機器の状態を確認する必要があります。外部の担当者から原因と改善案を受け取り、社内で実施の優先順位を決めると、毎月の支援が単なる応急対応で終わりにくくなります。</p>

    <h2 className={ac.h2.josys}>まとめ：まずは任せたい仕事を具体的にする</h2>
    <p className={ac.p}>中小企業の情シス代行選びでは、作業範囲、受付・緊急時の対応、情報を引き継げる体制を同じ条件で比べることが基本です。料金はその範囲と組み合わせて判断します。まずは直近の困りごとと毎月の作業を一覧にし、止めてはいけない業務から優先順位を付けてください。</p>
    <p className={ac.p}>契約後の確認も「問い合わせが減ったか」だけにせず、総務の作業時間、入社準備の抜け漏れ、未対応課題の残り方を見ます。社内の承認責任と外部の実作業を分け、誰が休んでも手順が分かる状態を目指すことが、無理なく継続できる委託につながります。</p>
    <section className="mt-14"><h2 className={headingClass}>よくある質問</h2>
    <div className={ac.faq}>
    {faqs.map((faq) => <div key={faq.question}><h3 className={ac.faqQ}>{faq.question}</h3><p>{faq.answer}</p></div>)}
    </div></section>
    <section className={ac.related}><h2 className={headingClass}>関連記事</h2><div className="space-y-3"><a href="/articles/microsoft-365-migration-sme" className={ac.relatedLink}>中小企業のMicrosoft 365移行ガイド</a>
    <a href="/articles/sme-bi-tableau-powerbi" className={ac.relatedLink}>TableauとPower BIはどちらを選ぶべき？</a>
    <a href="/articles/chatgpt-security-policy-sme" className={ac.relatedLink}>ChatGPT導入前に作るべき社内ルール</a>
    <a href="/articles" className={ac.allLink}>記事一覧を見る</a></div></section>
    <section className={ac.svcBox.josys}><h2 className={ac.svcTitle}>関連サービス</h2>
    <a href={service.href} className={ac.svcBtn}>{service.name}を詳しく見る<ArrowRight className="w-4 h-4" aria-hidden="true"/></a></section>
    <p className={ac.author}>この記事を書いた人：<a href="/company/message" className="underline underline-offset-4">栗原 勇太（Arcle代表）</a></p>
        </div>
      </article>
      <ContactCta />
    </div>);
};
export default ArticleJosysGuide;
