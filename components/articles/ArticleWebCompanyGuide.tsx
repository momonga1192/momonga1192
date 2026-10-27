import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ContactCta, PageHeader } from '../next/parts';
import { services } from '../next/theme';

const title = '愛知・東海の中小企業向けホームページ制作会社の選び方';
// 画面の見出しには地域名を出さない（地域名はtitleとmetaだけ）
const pageTitle = '中小企業向け ホームページ制作会社の選び方';
const description = '愛知・東海でホームページ制作を検討する中小企業向けに、制作会社の選び方を解説します。依頼前の準備、見積りの比較、更新のしやすさ、スマホ対応、公開後のサポート、ドメイン名義、SEOの範囲や契約条件まで、実務で使える確認項目をまとめました。';
const canonical = 'https://www.arcle.net/articles/website-company-guide-aichi-tokai';
const published = '2026-10-27';
const faqs = [
  { q: '依頼前に掲載する文章をすべて用意する必要がありますか？', a: '完成した原稿がなくても、会社案内、商品資料、写真と、誰に何を伝えたいかを整理すれば相談できます。取材や文章作成をどこまで依頼できるか、見積りに含まれる範囲を確認しましょう。' },
  { q: 'ホームページは自社で更新できたほうがよいですか？', a: '更新頻度と担当者の時間で判断します。頻繁なお知らせは自社更新、文章や写真の変更は制作会社への依頼という分担もできます。操作の実演を見て、引き継ぎや操作説明の有無も確認してください。' },
  { q: '地元の制作会社なら必ず訪問してもらえますか？', a: '所在地だけでは判断できません。訪問可能な地域、回数、交通費、オンラインとの使い分けを相談時に確認してください。現場を見てもらう必要がある場合は、その目的を先に伝えると進めやすくなります。' },
  { q: 'SEO対策を頼めば検索順位は保証されますか？', a: '検索順位は保証を前提にせず、具体的な作業範囲で判断しましょう。ページのタイトル設定、検索状況の確認、記事作成、公開後の改善など、何をいつ行い、どこから追加費用になるかを確認します。' }
];
const heading = 'font-head text-2xl md:text-[28px] font-bold text-svc-web [word-break:auto-phrase] mt-12 mb-4';
const paragraph = 'text-sumi-muted leading-[2] mb-4';
const subheading = 'font-head text-xl font-bold text-sumi [word-break:auto-phrase] mt-8 mb-3';

const ArticleWebCompanyGuide: React.FC = () => {
  const service = services.find((item) => item.key === 'web')!;

  return (
    <div className="bg-cream text-sumi">
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
      <PageHeader en="Articles" title={pageTitle} service="web" crumbs={[{ label: 'お役立ち記事', href: '/articles' }, { label: pageTitle }]} />
      <article className="bg-white rounded-t-[48px] md:rounded-t-[80px] py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-5 text-[16px] leading-[2]">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className={`rounded-full px-4 py-1 text-sm font-bold ${service.tint} ${service.text}`}>Web制作</span>
            <time dateTime={published} className="font-en text-sm text-sumi-muted">{published}</time>
          </div>
          <p className="text-sumi-muted leading-[2] mb-8">ホームページ制作を検討する中小企業にとって、制作会社の選び方は悩みやすいテーマです。見た目や金額だけでは、公開後に更新を続けられるか、困ったときに相談できるかまでは分かりません。IT担当者がいない会社でも比較できるよう、依頼前の準備から見積り、契約、公開までの確認ポイントを順に整理します。</p>

          <h2 className={heading}>1. ホームページ制作の依頼前に目的を決める</h2>
          <p className={paragraph}>最初に決めたいのは「誰に、何を知ってもらい、どう行動してほしいか」です。新規の取引先に事業内容を伝えるサイトと、求職者に職場の雰囲気を伝えるサイトでは、必要な情報が変わります。「会社の信頼を伝える」を目的にする場合も、設備、仕事の進め方、担当者の紹介など、何を根拠として載せるかまで考えましょう。</p>
          <p className={paragraph}>目的が複数あるときは優先順位を付けます。問い合わせを増やしたいなら、対象となる仕事、対応地域、相談方法を先に整理します。採用が中心なら、仕事内容や働く環境、応募方法が優先です。最初からすべてを盛り込まず、公開時に必要なものと後で追加するものを分けると、見積りも判断しやすくなります。</p>
          <ul className="list-disc pl-6 text-sumi-muted leading-[2] space-y-2">
            <li>目的と読者：取引先、一般のお客様、求職者のうち、誰を優先するか</li>
            <li>必要なページ：会社概要、事業紹介、採用情報、問い合わせなど</li>
            <li>素材：会社案内、ロゴ、商品資料、使用許可のある写真がそろうか</li>
            <li>予算と期日：初期費用と運用費の上限、公開を希望する理由</li>
            <li>社内体制：連絡窓口、原稿確認者、最終決定者を誰にするか</li>
          </ul>
          <p className={`${paragraph} mt-4`}>既存サイトがある場合は、残したいページ、古い情報、利用中のメールアドレスも一覧にします。管理会社や契約書が分からないときは、その状態も相談時に伝えてください。パスワードをいきなり送る必要はありません。まず契約先と管理担当者を確認し、必要な情報の受け渡し方法を決めます。</p>

          <h2 className={heading}>2. ホームページ制作会社の選び方は見積りの条件から</h2>
          <p className={paragraph}>見積りは、同じ依頼内容を渡したうえで比較しましょう。ページ数だけでなく、原稿作成、撮影、修正、公開後の更新まで条件をそろえることが大切です。「制作一式」とだけ書かれている場合は、何が含まれ、何が別料金かを一覧にしてもらいます。回答が具体的かどうかも、依頼先を判断する材料になります。</p>
          <div className="overflow-x-auto rounded-[28px] border border-warm-line my-6" role="region" aria-label="見積りの比較ポイント（横にスクロールできます）" tabIndex={0}>
            <table className="w-full min-w-[600px] text-sm border-collapse text-sumi-muted">
              <caption className="p-4 text-left font-bold text-sumi bg-cream">制作会社にそろえて確認する見積り項目</caption>
              <thead className={service.tint}><tr><th scope="col" className="p-4 text-left">項目</th><th scope="col" className="p-4 text-left">確認する内容</th><th scope="col" className="p-4 text-left">判断のポイント</th></tr></thead>
              <tbody>
                {[
                  ['制作内容', 'ページ構成、原稿、写真、フォーム', '自社で準備する作業が明確か'],
                  ['修正対応', '修正回数、確認期限、追加費用の条件', 'どの段階で合意するか決まっているか'],
                  ['運用費', 'サーバー、ドメイン、保守、更新', '含まれる作業と別料金が分かるか'],
                  ['契約条件', '契約期間、更新、途中解約、支払時期', '終了時の支払いと引き継ぎが明確か'],
                  ['追加機能', '予約、会員機能、外部サービス連携', '必要性と別契約の有無を説明できるか']
                ].map(([label, detail, point]) => <tr key={label}><th scope="row" className="p-4 border-t border-warm-line text-left font-bold text-sumi">{label}</th><td className="p-4 border-t border-warm-line">{detail}</td><td className="p-4 border-t border-warm-line">{point}</td></tr>)}
              </tbody>
            </table>
          </div>
          <p className={paragraph}>一括払いと月額制も、利用予定の期間をそろえて比べます。「初期費用＋その期間の月額費用＋想定する追加作業」で書き出し、税の扱いも合わせましょう。月額制では最低契約期間と途中解約時の精算、一括払いでは保守や更新を別途頼む場合の条件を確認します。外部サービスを使う提案では、最新の料金は公式サイトで確認し、誰が契約・支払いを担うかも決めます。</p>

          <p className={paragraph}>比較の結果は「含まれる・別料金・未確認」の三つで記録すると、社内でも説明しやすくなります。たとえば写真撮影が別料金でも、必要な写真と自社で用意できる写真が分かれば判断できます。反対に、料金に含まれるという回答でも、対象や回数が不明なら再確認が必要です。希望が予算を超えるときは、目的に直結するページを先に公開し、追加部分は別の計画に分けられるかを相談しましょう。</p>

          <h2 className={heading}>3. 更新・スマホ・サポート・権利・SEOを確認する</h2>
          <h3 className={subheading}>更新のしやすさは実際の操作で判断する</h3>
          <p className={paragraph}>CMSは、専門的なコードを書かずに情報を更新する仕組みです。ただし、導入するだけで担当者が使えるとは限りません。「お知らせを掲載する」「写真を差し替える」といった日常の操作を実演してもらい、自社で変更できる範囲を確認します。操作説明や手順書、担当者交代時の引き継ぎ方法も聞いておきましょう。更新時間を確保できないなら、制作会社に依頼する運用も選択肢です。</p>
          <h3 className={subheading}>スマホ対応は問い合わせまで試す</h3>
          <p className={paragraph}>スマホ対応は、画面幅に合わせて表示が変わることに加え、使いやすさまで確認します。文字が読みやすいか、ボタンを押せるか、電話や地図に進めるかを実機で見てください。問い合わせフォームは入力から送信、社内での受信まで試します。見栄えのよいトップページだけを見て決めず、事業紹介や採用ページも同じように確認しましょう。</p>
          <h3 className={subheading}>公開後のサポートは作業と窓口を分けて聞く</h3>
          <p className={paragraph}>保守とは、安全に動かし続けるための管理です。文章の更新とは別に、システムの更新、バックアップ、障害時の復旧がどこまで含まれるかを確認します。受付方法、対応する時間帯、急ぎの相談方法、回答や作業までの目安も聞きましょう。「更新無料」の場合は、軽微な修正の具体例と、ページ追加やデザイン変更との境界を見積書に残すと安心です。</p>
          <h3 className={subheading}>ドメインの名義と契約終了時の扱いを残す</h3>
          <p className={paragraph}>ドメインは、ホームページやメールに使うインターネット上の住所です。登録者名義、契約者、管理するアカウント、更新手続きの担当を確認します。制作会社が管理する場合も、他社へ移す際の手順と費用を明確にしてください。ドメイン、サイトのデータ、デザインやプログラムの著作権は別の確認事項です。「支払い後に何を受け取り、どう使い続けられるか」を項目ごとに聞きます。</p>
          <h3 className={subheading}>SEOの範囲を作業名で確認する</h3>
          <p className={paragraph}>SEOは、検索エンジンにページの内容を伝え、探している人に見つけてもらいやすくする取り組みです。「SEO込み」だけでは作業範囲が分かりません。各ページのタイトルや説明文の設定、検索状況を調べる仕組みの設定、原稿の提案、記事作成、公開後の改善を分けて確認しましょう。設定だけなのか、継続的な確認と改善も含むのかを明らかにし、検索順位や問い合わせ件数の保証を選定の前提にしないことが大切です。</p>
          <div className={`mt-10 p-6 md:p-8 rounded-[28px] border ${service.border} ${service.tint}`}>
            <p className="font-head text-sumi font-bold mb-2">更新を任せる運用も含めて相談したい方へ</p>
            <p className={paragraph}>Arcleの月額制ホームページ制作では、文章や写真の差し替え、お知らせの掲載などの軽微な修正を月額料金の範囲で対応します。ページの新規追加やデザイン変更など、作業量が大きいものは事前にお見積りします。自社で行う更新と依頼する更新を分けて検討できます。</p>
            <a href={service.href} className="inline-flex items-center gap-2 text-svc-web font-bold hover:underline underline-offset-4">Web制作の対応内容を確認する<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </div>

          <h2 className={heading}>4. 地元の制作会社に頼むメリットと判断基準</h2>
          <p className={paragraph}>地元の会社に依頼する利点は、必要に応じて対面で相談し、現場や商品を見ながら説明しやすいことです。設備の用途や接客の流れなど、言葉だけでは伝えにくい内容も共有しやすくなります。ただし、所在地が近いだけで訪問対応や業務理解が保証されるわけではありません。担当者が誰か、訪問の条件は何かを確かめましょう。</p>
          <p className={paragraph}>制作会社を探すときは、距離に加えて「専門用語をかみ砕いて説明するか」「こちらの目的を聞いて提案するか」「確認事項を文章で残すか」を見てください。Arcleは訪問での打ち合わせにも、オンラインでの相談にも対応しています。自社の都合に合わせ、素材確認は対面、進捗確認はオンラインなど、必要な場面から打ち合わせ方法を考えるとよいでしょう。</p>

          <h2 className={heading}>5. よくある失敗を契約前に防ぐ</h2>
          <p className={paragraph}>避けたいのは、安さだけで決めた後に必要な作業が追加になったり、確認者が増えて公開が遅れたりすることです。契約前に役割と判断基準を決めれば、相談時の認識のずれを減らせます。口頭の説明で気になる点があれば、その場で質問し、回答を見積書やメールに残しましょう。</p>
          <ul className="list-disc pl-6 text-sumi-muted leading-[2] space-y-2">
            <li>デザインだけで決める：作例を見ながら、読者が欲しい情報と問い合わせへの進みやすさも確認します。</li>
            <li>素材準備を後回しにする：原稿、写真、掲載許可の担当と提出日を決め、間に合わない場合の扱いも相談します。</li>
            <li>更新担当が決まっていない：お知らせの作成者と承認者を決め、外部へ依頼する作業も整理します。</li>
            <li>既存サイトを急いで解約する：ドメイン、メール、旧ページの移行を確認してから、解約や切り替えの順序を決めます。</li>
          </ul>
          <p className={`${paragraph} mt-4`}>また、写真や紹介文は、自社が掲載してよいものかを確認してください。作例はデザインの参考として見て、架空の会社を使ったサンプルと実際の顧客事例を区別します。「同じ見た目にしたい」に加え、どこが使いやすいと感じたかまで伝えると、希望を共有しやすくなります。</p>

          <h2 className={heading}>6. 相談から公開までの依頼の流れ</h2>
          <ol className="list-decimal pl-6 text-sumi-muted leading-[2] space-y-3">
            <li><strong className="text-sumi">相談・要件整理：</strong>目的、読者、予算、公開希望日を伝えます。必要なページと自社で準備する素材を整理し、不明点は宿題として残します。</li>
            <li><strong className="text-sumi">提案・見積り・契約：</strong>制作範囲、運用費、修正条件、解約や移行の条件を確認します。追加費用が生じる場合は、着手前に承認する手順を決めます。</li>
            <li><strong className="text-sumi">素材準備・制作：</strong>文章や写真を渡し、ページ構成とデザインを確認します。社内の意見は窓口担当者がまとめ、合意した内容を記録します。</li>
            <li><strong className="text-sumi">最終確認・公開：</strong>会社情報、連絡先、スマホ表示、フォームの受信を確認します。旧サイトからの切り替えやメールへの影響も確認して公開日を決めます。</li>
            <li><strong className="text-sumi">引き継ぎ・運用：</strong>更新手順と相談窓口を共有します。管理情報の保管先を決め、問い合わせ内容や掲載情報を振り返る機会を設けます。</li>
          </ol>
          <p className={`${paragraph} mt-4`}>公開希望日だけでなく、素材提出日と社内の確認日も予定に入れます。経営者の最終確認が必要なら、その時間を先に確保してください。公開後も営業時間や採用状況などの変更があれば更新し、情報が現状と合っているかを定期的に確かめましょう。</p>

          <h2 className={heading}>まとめ：同じ条件で比べ、運用まで決める</h2>
          <p className={paragraph}>ホームページ制作会社を選ぶときは、目的と必要なページを整理し、制作・更新・保守・契約終了時の条件を同じ表で比べることが出発点です。説明に納得できるか、社内で無理なく運用できるかも判断に含めましょう。まずは会社案内と既存サイトの困りごとを用意し、分からない項目を確認する相談から進めてください。</p>

          <section className="mt-14">
            <h2 className={heading}>よくある質問</h2>
            <div className="space-y-5 text-sumi-muted leading-[2] [&>div]:rounded-[28px] [&>div]:bg-cream [&>div]:p-6 [&_h3]:mb-2">
              {faqs.map((faq) => <div key={faq.q}><h3 className="font-head font-bold text-sumi [word-break:auto-phrase]">{faq.q}</h3><p>{faq.a}</p></div>)}
            </div>
          </section>
          <section className="mt-14 border-t border-warm-line pt-10">
            <h2 className="font-head text-2xl md:text-[28px] font-bold text-svc-web [word-break:auto-phrase] mb-4">関連記事</h2>
            <div className="space-y-3">
              <a href="/articles/monthly-vs-one-time-website" className="block text-svc-web hover:underline underline-offset-4 py-1">月額制と一括払いのホームページ制作を比較する</a>
              <a href="/samples" className="block text-svc-web hover:underline underline-offset-4 py-1">業種別のホームページ作例を見る</a>
              <a href="/articles" className="block text-sumi-muted hover:text-sumi underline">記事一覧を見る</a>
            </div>
          </section>
          <section className={`mt-14 rounded-[28px] p-6 md:p-8 ${service.tint}`}>
            <h2 className="font-head text-2xl font-bold [word-break:auto-phrase]">関連サービス</h2>
            <a href={service.href} className="mt-5 inline-flex items-center gap-2 rounded-full bg-sumi text-white px-6 py-3 font-bold hover:opacity-90">{service.name}を詳しく見る<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </section>
          <p className="mt-10 text-sm text-sumi-muted">この記事を書いた人：栗原 勇太（Arcle代表）<br /><a href="/company/message" className="text-svc-web hover:underline underline-offset-4">代表メッセージを見る</a></p>
        </div>
      </article>
      <ContactCta />
    </div>
  );
};

export default ArticleWebCompanyGuide;
