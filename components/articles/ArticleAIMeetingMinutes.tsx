import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ContactCta, PageHeader } from '../next/parts';
import { services } from '../next/theme';

const title = '愛知・東海の中小企業向け｜生成AIで議事録を作る手順';
// 画面の見出しには地域名を出さない（地域名はtitleとmetaだけ）
const pageTitle = '生成AIで議事録を作る手順と注意点';
const description = '愛知・東海の中小企業向けに、生成AIで議事録を作る手順を解説します。録音と文字起こしの準備、要約を頼むときの指示文の例、情報漏えいを防ぐ注意点、AIが間違えやすい箇所の確認方法、社内に定着させるコツまで、今日から試せる形でまとめました。';
const canonical = 'https://www.arcle.net/articles/ai-meeting-minutes-guide';
const published = '2026-10-28';
const faqs = [
  { q: '会議を録音するときは、参加者に断る必要がありますか？', a: '会議の冒頭で、録音して議事録づくりに使うことを伝え、了承を得てから始めましょう。社外の方が参加する会議では、事前の案内に書いておくと安心です。録音を断られた場合は、メモを取って後から生成AIで整える方法に切り替えます。' },
  { q: '無料版の生成AIに会議の内容を入力してもよいですか？', a: '社内で利用を認めたツールとアカウントだけを使うのが原則です。無料版や個人のアカウントでは、入力した内容の扱いを会社として管理できない場合があります。どのツールを使ってよいか、入力してはいけない情報は何かを先に社内ルールで決めておきましょう。' },
  { q: '文字起こしの精度が低いときはどうすればよいですか？', a: 'マイクを参加者の近くに置く、発言の前に名前を名乗る、同時に話さないといった録音側の工夫で改善することが多いです。社名や製品名などの固有名詞は、会議の前に一覧を用意しておき、要約を頼むときに一緒に渡すと誤変換を減らせます。' },
  { q: '録音データや文字起こしは、いつまで残しておくべきですか？', a: '保存期間と保存場所を社内で決めておきましょう。たとえば、確定した議事録は共有フォルダに残し、録音データと文字起こしは議事録の確認が済んだら削除する、といった運用です。契約や取引に関わる会議は、通常の文書の保存ルールに合わせます。' }
];
const heading = 'font-head text-2xl md:text-[28px] font-bold text-svc-ai [word-break:auto-phrase] mt-12 mb-4';
const paragraph = 'text-sumi-muted leading-[2] mb-4';
const subheading = 'font-head text-xl font-bold text-sumi [word-break:auto-phrase] mt-8 mb-3';
const prompt = `次の会議の文字起こしから、議事録を作ってください。

# 会議の情報
・会議名：営業定例
・日時：2026年10月28日 10:00〜11:00
・参加者：山田（営業部長）、佐藤、鈴木
・固有名詞：〇〇工業、△△システム

# 出力の形式
1. 議題ごとの要点（3行以内）
2. 決定事項
3. 宿題（担当者・期限）
4. 次回までに確認が必要なこと

# 守ってほしいこと
・文字起こしにない内容は書かない
・数字、日付、担当者は文字起こしのとおりに書く
・聞き取れない箇所や判断できない箇所は【要確認】と書く

# 文字起こし
（ここに貼り付け）`;

const ArticleAIMeetingMinutes: React.FC = () => {
  const service = services.find((item) => item.key === 'ai')!;

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
      <PageHeader en="Articles" title={pageTitle} service="ai" crumbs={[{ label: 'お役立ち記事', href: '/articles' }, { label: pageTitle }]} />
      <article className="bg-white rounded-t-[48px] md:rounded-t-[80px] py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-5 text-[16px] leading-[2]">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className={`rounded-full px-4 py-1 text-sm font-bold ${service.tint} ${service.text}`}>生成AI</span>
            <time dateTime={published} className="font-en text-sm text-sumi-muted">{published}</time>
          </div>
          <p className="text-sumi-muted leading-[2] mb-8">会議のあとに録音を聞き直し、発言をまとめて議事録に仕上げる作業は、思った以上に時間がかかります。生成AIを使えば、文字起こしから要点の整理までの下書きを短い時間で作れます。ただし、録音のしかたや指示の出し方、情報の扱いを決めずに始めると、使えない下書きができたり、社外に出してはいけない情報を入力してしまったりします。この記事では、生成AIで議事録を作るための準備から確認、社内での定着までを順に整理します。</p>

          <h2 className={heading}>1. 生成AIに任せられること、人が担うこと</h2>
          <p className={paragraph}>議事録づくりは、大きく「記録する」「まとめる」「確認して共有する」の三つに分かれます。生成AIが得意なのは、長い文字起こしから議題ごとの要点、決定事項、宿題を抜き出して、決まった形に整える部分です。話し言葉の言い直しや脱線を取り除き、読みやすい文章にするのも任せられます。</p>
          <p className={paragraph}>一方で、何が決まったのかを最終的に判断するのは人です。会議では「その方向で」「いったん持ち帰り」のようなあいまいな言い方がよく出ます。生成AIは、こうした発言を決定事項として書いてしまうことがあります。数字や日付、担当者の名前も、録音の聞き取りに誤りがあればそのまま残ります。生成AIは下書きを作る道具と考え、確認と共有は人が担う前提で進めましょう。</p>

          <h2 className={heading}>2. 議事録を作る三つの方法を比べる</h2>
          <p className={paragraph}>生成AIで議事録を作る方法は、会議の形によって選びます。オンライン会議と対面の会議、社内だけの会議と社外の方が入る会議では、使える道具や気をつける点が変わります。</p>
          <div className="overflow-x-auto rounded-[28px] border border-warm-line my-6" role="region" aria-label="議事録を作る方法の比較（横にスクロールできます）" tabIndex={0}>
            <table className="w-full min-w-[640px] text-sm border-collapse text-sumi-muted">
              <caption className="p-4 text-left font-bold text-sumi bg-cream">生成AIで議事録を作る方法</caption>
              <thead className={service.tint}><tr><th scope="col" className="p-4 text-left">方法</th><th scope="col" className="p-4 text-left">向いている会議</th><th scope="col" className="p-4 text-left">準備するもの</th><th scope="col" className="p-4 text-left">気をつける点</th></tr></thead>
              <tbody>
                {[
                  ['Web会議ツールの文字起こしと要約を使う', 'オンライン会議、社内の定例', '会議ツールの文字起こし機能（契約プランで使えるか確認）', '参加者への事前の案内、保存先と閲覧できる人の範囲'],
                  ['録音を文字起こしし、生成AIで要約する', '対面の会議、打ち合わせ', '録音機器、文字起こしの仕組み、会社で認めた生成AI', 'マイクの位置、録音データの保存と削除のルール'],
                  ['手書きのメモを生成AIで整える', '録音できない会議、短い打ち合わせ', '要点のメモ、会社で認めた生成AI', 'メモにない内容をAIが補ってしまわないか']
                ].map(([way, fit, need, care]) => <tr key={way}><th scope="row" className="p-4 border-t border-warm-line text-left font-bold text-sumi">{way}</th><td className="p-4 border-t border-warm-line">{fit}</td><td className="p-4 border-t border-warm-line">{need}</td><td className="p-4 border-t border-warm-line">{care}</td></tr>)}
              </tbody>
            </table>
          </div>
          <p className={paragraph}>すでにWeb会議ツールを使っている会社なら、まずはそのツールの文字起こし機能を確かめるのが近道です。使える機能は契約しているプランによって違うため、最新の対応状況は各サービスの公式サイトで確認してください。新しいツールを入れる前に、今ある道具で一度試してみると、自社に必要なものが見えてきます。</p>

          <h2 className={heading}>3. 生成AIで議事録を作る手順</h2>
          <h3 className={subheading}>手順1：会議の前に、録音と議事録づくりを伝える</h3>
          <p className={paragraph}>会議の案内や冒頭で、録音して議事録づくりに使うことを伝え、参加者の了承を得ます。社外の方が参加する会議では、事前に案内しておくと当日の確認がスムーズです。あわせて、会議名、日時、参加者、議題を一枚にまとめておきます。社名や製品名、専門用語の一覧も用意しておくと、あとで要約を頼むときに役立ちます。</p>
          <h3 className={subheading}>手順2：聞き取りやすく録音する</h3>
          <p className={paragraph}>文字起こしの精度は、録音の質で大きく変わります。対面の会議では、録音機器を机の中央に置き、空調や換気扇から離します。発言するときに名前を名乗る、同時に話さない、資料を指して「これ」と言わずに項目名を読み上げる、といった小さな工夫で、あとの確認がずっと楽になります。オンライン会議では、マイク付きのイヤホンを使ってもらうと雑音を減らせます。</p>
          <h3 className={subheading}>手順3：文字起こしを用意する</h3>
          <p className={paragraph}>Web会議ツールの文字起こし機能か、会社で利用を認めた文字起こしの仕組みを使って、録音をテキストにします。この段階では誤変換が残っていてもかまいません。ただし、明らかに聞き取れていない区間がある場合は、その時間帯をメモしておきます。あとで生成AIの下書きを確認するときに、録音を聞き直す場所を絞れます。</p>
          <h3 className={subheading}>手順4：形式を決めて要約を頼む</h3>
          <p className={paragraph}>生成AIへの指示は、毎回考えずに使い回せる形にしておきます。会議の情報、出力してほしい形式、守ってほしいことの三つを書き、最後に文字起こしを貼り付けます。「文字起こしにない内容は書かない」「分からない箇所は【要確認】と書く」と明記すると、生成AIがもっともらしい内容で穴を埋めるのを防ぎやすくなります。</p>
          <figure className="my-6">
            <pre className="[font-family:inherit] whitespace-pre-wrap rounded-[28px] bg-cream p-6 text-sm leading-[1.9] text-sumi overflow-x-auto">{prompt}</pre>
            <figcaption className="mt-2 text-sm text-sumi-muted">要約を頼むときの指示文の例。会議名や参加者は会議に合わせて書き換えます。</figcaption>
          </figure>
          <p className={paragraph}>長い会議では、文字起こしを議題ごとに分けて渡すと、要点の抜け漏れが減ります。出てきた下書きに足りない項目があれば、「〇〇の件について、決定事項と宿題を追加で抜き出してください」のように、項目を指定して聞き直しましょう。</p>
          <h3 className={subheading}>手順5：人が確認して共有する</h3>
          <p className={paragraph}>下書きができたら、会議の進行役か記録係が内容を確認します。特に決定事項と宿題は、参加者の認識と合っているかが大切です。確認が終わったら、決めた保存場所に置き、参加者に共有します。共有の期限は「会議の翌営業日まで」など社内で決めておくと、記憶が新しいうちに認識のずれを直せます。</p>

          <div className={`mt-10 p-6 md:p-8 rounded-[28px] border ${service.border} ${service.tint}`}>
            <p className="font-head text-sumi font-bold mb-2">生成AIを安全に業務で使う準備から相談したい方へ</p>
            <p className={paragraph}>Arcleの生成AI活用支援では、社内で生成AIを使うためのルールづくりや、議事録・メール・資料作成などの業務での使い方研修を行っています。どの業務から試すかの整理から一緒に進められます。</p>
            <a href={service.href} className="inline-flex items-center gap-2 text-svc-ai font-bold hover:underline underline-offset-4">生成AI活用の支援内容を確認する<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </div>

          <h2 className={heading}>4. 情報漏えいを防ぐために決めておくこと</h2>
          <p className={paragraph}>会議の内容には、取引条件、人事の話、まだ公表していない計画など、社外に出せない情報が含まれます。議事録づくりに生成AIを使う前に、次の点を社内で決めておきましょう。</p>
          <ul className="list-disc pl-6 text-sumi-muted leading-[2] space-y-2">
            <li>使ってよいツールとアカウント：会社で契約したものに限り、個人のアカウントや無料版は使わない、といった線引きをします。</li>
            <li>入力した内容の扱い：サービスの利用規約や設定で、入力した内容がAIの学習に使われるかどうか、どこに保存されるかを確認します。</li>
            <li>入力してはいけない会議：人事評価や個人の健康に関する話など、生成AIに入力しない会議の種類を決めます。</li>
            <li>録音データの保存と削除：保存場所、閲覧できる人、議事録が確定したあとの削除のタイミングを決めます。</li>
            <li>社外の方が参加する会議：相手方の了承を得ること、相手方の情報をどう扱うかを確認します。</li>
          </ul>
          <p className={`${paragraph} mt-4`}>生成AIの社内ルール全体の作り方は、<a href="/articles/chatgpt-security-policy-sme" className="text-svc-ai hover:underline underline-offset-4">ChatGPT導入前に作るべき社内ルール</a>で詳しく紹介しています。議事録づくりは、こうしたルールを試す最初の業務としても取り組みやすいテーマです。</p>

          <h2 className={heading}>5. AIの議事録で間違えやすい箇所を確認する</h2>
          <p className={paragraph}>生成AIが作る議事録は、文章が整っているぶん、誤りに気づきにくいことがあります。確認する人が毎回同じ観点で見られるよう、チェックリストにしておきましょう。</p>
          <div className="rounded-[28px] bg-cream p-6 md:p-8 my-6">
            <p className="font-head font-bold text-sumi mb-3">議事録の確認チェックリスト</p>
            <ul className="space-y-2 text-sumi-muted leading-[2]">
              {[
                '数字、金額、日付、期限が、録音や資料と合っているか',
                '社名、人名、製品名の誤変換がないか',
                '「検討する」「持ち帰る」と話した内容が、決定事項として書かれていないか',
                '発言者の取り違えがないか（特に意見が分かれた場面）',
                '会議で話していない内容が補われていないか',
                '宿題に担当者と期限が入っているか',
                '【要確認】の箇所が残っていないか'
              ].map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="mt-[0.55em] h-3 w-3 shrink-0 rounded-[4px] border-2 border-svc-ai" />{item}</li>)}
            </ul>
          </div>
          <p className={paragraph}>確認で見つかった誤りは、次回の指示文に反映します。たとえば、毎回同じ製品名を誤変換するなら固有名詞の一覧に加え、決定事項と検討中の区別があいまいなら「決定事項には、会議で合意したと明言された内容だけを書く」と指示を足します。指示文を少しずつ育てることで、確認の手間が減っていきます。</p>

          <h2 className={heading}>6. 社内で定着させるコツ</h2>
          <p className={paragraph}>議事録づくりを生成AIに置き換えるときは、全部の会議で一度に始めないことが大切です。毎週の定例会議のように、参加者も議題の形も決まっている会議から試すと、指示文や確認の手順を整えやすくなります。</p>
          <ol className="list-decimal pl-6 text-sumi-muted leading-[2] space-y-3">
            <li><strong className="text-sumi">議事録の形式をそろえる：</strong>議題ごとの要点、決定事項、宿題、次回の確認事項など、社内で使う形式を一つ決めます。指示文もこの形式に合わせます。</li>
            <li><strong className="text-sumi">担当と期限を決める：</strong>録音する人、生成AIで下書きを作る人、確認する人、共有の期限を決めます。担当があいまいだと、下書きのまま放置されがちです。</li>
            <li><strong className="text-sumi">保存場所を一つにする：</strong>確定した議事録の置き場所と、ファイル名の付け方を決めます。あとから探せることが、議事録を残す意味につながります。</li>
            <li><strong className="text-sumi">一か月後に振り返る：</strong>作業時間がどう変わったか、確認で見つかった誤りは何かを振り返り、指示文と手順を見直します。うまくいけば、対象の会議を広げます。</li>
          </ol>
          <p className={`${paragraph} mt-4`}>使い方を社内に広げる段階では、担当者が一人で抱えないようにしましょう。指示文と確認の手順を共有フォルダに置き、誰でも同じ手順で議事録を作れる状態にしておくと、担当者が休んだときや異動したときも困りません。</p>

          <h2 className={heading}>まとめ：下書きはAI、判断と確認は人</h2>
          <p className={paragraph}>生成AIを使うと、議事録づくりのうち、文字起こしの整理と要点の抜き出しにかかる時間を減らせます。効果を出すには、聞き取りやすい録音、使い回せる指示文、決まった観点での確認の三つをそろえることが大切です。あわせて、使ってよいツールや入力してはいけない情報を先に決めておきましょう。まずは社内の定例会議を一つ選び、今ある道具で試すところから始めてみてください。</p>

          <section className="mt-14">
            <h2 className={heading}>よくある質問</h2>
            <div className="space-y-5 text-sumi-muted leading-[2] [&>div]:rounded-[28px] [&>div]:bg-cream [&>div]:p-6 [&_h3]:mb-2">
              {faqs.map((faq) => <div key={faq.q}><h3 className="font-head font-bold text-sumi [word-break:auto-phrase]">{faq.q}</h3><p>{faq.a}</p></div>)}
            </div>
          </section>
          <section className="mt-14 border-t border-warm-line pt-10">
            <h2 className="font-head text-2xl md:text-[28px] font-bold text-svc-ai [word-break:auto-phrase] mb-4">関連記事</h2>
            <div className="space-y-3">
              <a href="/articles/chatgpt-security-policy-sme" className="block text-svc-ai hover:underline underline-offset-4 py-1">ChatGPT導入前に作るべき社内ルール</a>
              <a href="/articles" className="block text-sumi-muted hover:text-sumi underline">記事一覧を見る</a>
            </div>
          </section>
          <section className={`mt-14 rounded-[28px] p-6 md:p-8 ${service.tint}`}>
            <h2 className="font-head text-2xl font-bold [word-break:auto-phrase]">関連サービス</h2>
            <a href={service.href} className="mt-5 inline-flex items-center gap-2 rounded-full bg-sumi text-white px-6 py-3 font-bold hover:opacity-90">{service.name}を詳しく見る<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </section>
          <p className="mt-10 text-sm text-sumi-muted">この記事を書いた人：栗原 勇太（Arcle代表）<br /><a href="/company/message" className="text-svc-ai hover:underline underline-offset-4">代表メッセージを見る</a></p>
        </div>
      </article>
      <ContactCta />
    </div>
  );
};

export default ArticleAIMeetingMinutes;
