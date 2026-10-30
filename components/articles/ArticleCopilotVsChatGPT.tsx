import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ContactCta, PageHeader, comicIllust } from '../next/parts';
import { services } from '../next/theme';
import { ac, promoHeroSrc } from './articleComic';

const title = '愛知・東海の中小企業向け｜CopilotとChatGPTの違いと選び方';
// 画面の見出しには地域名を出さない（地域名はtitleとmetaだけ）
const pageTitle = 'Microsoft 365 CopilotとChatGPTの違いと選び方';
const description = '愛知・東海の中小企業向けに、Microsoft 365 CopilotとChatGPTの違いと選び方を解説します。無料のCopilot Chatと有料版の違い、ChatGPTの法人向けプラン、社内データの扱い、自社に合う方の判断基準、試し方まで比較表とチェックリストで整理しました。';
const canonical = 'https://www.arcle.net/articles/copilot-vs-chatgpt-sme';
const published = '2026-10-31';
const faqs = [
  { q: 'Microsoft 365を使っていれば、Copilotは追加費用なしで使えますか？', a: '対象のMicrosoft 365のプランを使い、会社のアカウントでサインインしていれば、Copilot Chatは追加料金なしで使えます。WordやOutlookなどのアプリの中で、社内のメールやファイルを踏まえて使うには、有料のMicrosoft 365 Copilotのライセンスが別に必要です。対象のプランや料金は、Microsoftの公式サイトで確認してください。' },
  { q: 'CopilotとChatGPTを両方契約する必要はありますか？', a: '最初から両方を契約する必要はありません。まず無料で使えるCopilot Chatや少人数での試用で、自社の業務にどちらが合うかを確かめましょう。部署によって使い方が大きく違う場合は、全社の標準を一つ決めたうえで、必要な部署だけもう一方を追加する方法もあります。' },
  { q: '社員が個人のChatGPTアカウントを仕事に使ってもよいですか？', a: '会社として管理できないため、業務での利用は会社で契約したアカウントに限るのが基本です。個人向けプランでは、設定によって入力した内容がモデルの改善に使われる場合があります。どのツールとアカウントを使ってよいかを、社内ルールで先に決めておきましょう。' },
  { q: '導入すれば、すぐに業務時間が減りますか？', a: '効果は、使う業務を絞り、使い方をそろえられるかで変わります。導入しただけでは使われないこともよくあります。メールの下書きや会議の要約など、繰り返し発生する業務を一つ選び、使い方の例を共有してから広げると、効果を確かめやすくなります。' }
];
const heading = ac.h2.ai;
const paragraph = ac.p;
const subheading = ac.h3;

const ArticleCopilotVsChatGPT: React.FC = () => {
  const service = services.find((item) => item.key === 'ai')!;

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
      <PageHeader en="Articles" title={pageTitle} service="ai" compact image={comicIllust('svc-ai')} imageMode="panel" crumbs={[{ label: 'お役立ち記事', href: '/articles' }, { label: pageTitle }]} />
      <article className={ac.article}>
        <div className={ac.sheet}>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className={ac.tag.ai}>生成AI</span>
            <time dateTime={published} className={ac.date}>{published}</time>
          </div>
          <p className="text-[#30343F] leading-[2] mb-8">生成AIを業務に取り入れようとすると、多くの会社が「Microsoft 365 CopilotとChatGPTのどちらを選べばよいか」で迷います。どちらも文章の下書きや要約、アイデア出しに使えますが、得意な場面や社内データとのつながり方、管理のしかたが違います。しかもCopilotには無料で使えるものと有料のものがあり、名前だけでは区別がつきにくくなっています。この記事では、二つの違いを整理し、自社に合う方を判断する基準と、小さく試して決める手順をまとめます。</p>

          <h2 className={heading}>1. 違いをひとことで言うと「どこで使うか」</h2>
          <p className={paragraph}>Microsoft 365 Copilotは、Word、Excel、PowerPoint、Outlook、Teamsといった、ふだん使っているMicrosoftのアプリの中で働く生成AIです。有料のライセンスを付けると、自分が見る権限を持っているメールや予定、Teamsのチャット、社内のファイルを踏まえて答えを作れます。たとえば「先週の〇〇社とのやり取りをまとめて」と頼むと、関係するメールや会議の内容から下書きを作ります。</p>
          <p className={paragraph}>ChatGPTは、ブラウザやアプリの画面で対話しながら使う生成AIです。文章を考える、資料の構成を練る、長い文書を読み込んで要点を出すといった作業を、一つの画面の中で幅広くこなします。法人向けのプランでは、社内のファイル置き場などの外部サービスとつなぐ機能も用意されていますが、基本は「AIの画面に情報を持ち込んで相談する」使い方です。</p>
          <p className={paragraph}>つまり、Copilotは「いつもの仕事の道具にAIが入ってくる」形、ChatGPTは「AIの画面に仕事を持ち込む」形と考えると分かりやすくなります。どちらが優れているかではなく、自社の仕事がどこで行われているかで向き不向きが決まります。</p>

          <h2 className={heading}>2. Copilotには無料版と有料版がある</h2>
          <p className={paragraph}>「Copilot」という名前は、Microsoftのいくつかのサービスに使われています。法人で検討するときに押さえておきたいのは、次の二つです。</p>
          <h3 className={subheading}>Microsoft 365 Copilot Chat（追加料金なし）</h3>
          <p className={paragraph}>対象のMicrosoft 365のプランを契約していれば、会社のアカウント（Microsoft Entra ID、Microsoftの法人向けのアカウントの仕組み）でサインインした社員は、Copilot Chatを追加料金なしで使えます。Webの情報をもとに答えるチャット型のAIで、入力した内容と答えには、会社が結んでいるMicrosoftとの契約の条件が適用されます。Microsoftはこれを「エンタープライズ データ保護」と呼んでいます。ただし、Copilot Chatで作った「エージェント」（特定の作業を任せる設定済みのAI）を使う場合は、利用量に応じた料金がかかります。</p>
          <h3 className={subheading}>Microsoft 365 Copilot（有料ライセンス）</h3>
          <p className={paragraph}>有料のライセンスを追加すると、WordやTeamsなどのアプリの中でCopilotを使えるようになり、社内のメールやファイル、会議の内容を踏まえた答えが返ってくるようになります。300ユーザーまでの組織向けには「Microsoft 365 Copilot Business」というプランが用意されており、利用中のMicrosoft 365のビジネス向けプランに追加する形で契約します。料金やキャンペーンは時期によって変わるため、最新の情報はMicrosoftの公式サイトで確認してください。</p>
          <p className={paragraph}>Microsoftの公式文書では、有料版のCopilotが社内のデータを参照するときも、プロンプト（AIへの指示文）や答え、参照したデータは、土台となる大規模言語モデルのトレーニングには使われないと説明されています。まだCopilotを試していない会社は、まず追加料金なしのCopilot Chatから触ってみると、社内での反応をつかみやすくなります。</p>

          <h2 className={heading}>3. ChatGPTは個人向けと法人向けを分けて考える</h2>
          <p className={paragraph}>ChatGPTには、個人で契約するプランと、会社で契約する法人向けのプランがあります。法人向けには、少人数から契約できる「ChatGPT Business」（以前の名前はChatGPT Team）と、大規模な組織向けの「ChatGPT Enterprise」があります。OpenAIの案内では、Businessは2ユーザーから契約できます。料金はプランや支払い方法によって違うため、OpenAIの公式サイトで確認してください。</p>
          <p className={paragraph}>会社で使うときに大きな違いになるのが、入力した内容の扱いです。OpenAIのヘルプでは、BusinessやEnterpriseのワークスペース（会社でまとめて契約した利用環境）の内容は、初期設定ではモデルのトレーニングに使わないと説明されています。一方、個人向けのプランでは、設定の「データコントロール」にあるモデルの改善に関する項目がオンになっていると、会話の内容がモデルの改善に使われる場合があります。この項目は利用者がオフにできますが、会社として全員の設定を管理することはできません。</p>
          <p className={paragraph}>また、法人向けのプランには、管理者が利用者を追加・削除する機能や、会社のアカウントでまとめてログインさせるシングルサインオン（SSO）、外部サービスとの連携を管理する設定などがあります。社員が個人のアカウントで使っている状態から、会社の管理下に移すことが、法人向けプランを選ぶ一番の理由になります。</p>

          <h2 className={heading}>4. 比較表で違いを整理する</h2>
          <p className={paragraph}>ここまでの内容を、検討するときによく出る観点で並べました。機能や対象プランは更新が多いため、契約前には各社の公式サイトで最新の内容を確認してください。</p>
          <div className={`overflow-x-auto my-7 ${ac.tableWrap}`} role="region" aria-label="CopilotとChatGPTの比較（横にスクロールできます）" tabIndex={0}>
            <table className="w-full min-w-[680px] text-sm border-collapse text-[#30343F]">
              <caption className={ac.caption}>Microsoft 365 CopilotとChatGPTの比較</caption>
              <thead className={ac.thead}><tr><th scope="col" className="p-4 text-left">観点</th><th scope="col" className="p-4 text-left">Copilot Chat（追加料金なし）</th><th scope="col" className="p-4 text-left">Microsoft 365 Copilot（有料）</th><th scope="col" className="p-4 text-left">ChatGPT（法人向けプラン）</th></tr></thead>
              <tbody>
                {[
                  ['使う場所', 'Copilotのチャット画面（ブラウザなど）', 'Word、Excel、PowerPoint、Outlook、Teamsの中', 'ChatGPTの画面（ブラウザ、アプリ）'],
                  ['社内データとのつながり', 'Webの情報をもとに答える', '本人が見られるメール、予定、チャット、ファイルを踏まえて答える', '連携機能で外部サービスとつなげる。基本は情報を画面に持ち込む'],
                  ['入力した内容の扱い', '会社の契約条件が適用される', '土台のモデルのトレーニングには使われないと公式に説明', '初期設定ではトレーニングに使わないと公式に説明'],
                  ['前提になる契約', '対象のMicrosoft 365のプラン', 'Microsoft 365のプランに有料ライセンスを追加', 'Microsoft 365の契約は不要'],
                  ['向いている会社', 'まず無料で試したい会社', '社内の情報がMicrosoft 365に集まっている会社', 'Microsoft 365以外の道具が中心の会社、幅広い用途で使いたい会社']
                ].map(([point, chat, paid, gpt]) => <tr key={point}><th scope="row" className="p-4 border-t-2 border-[#111]/20 text-left font-bold text-sumi">{point}</th><td className="p-4 border-t-2 border-[#111]/20">{chat}</td><td className="p-4 border-t-2 border-[#111]/20">{paid}</td><td className="p-4 border-t-2 border-[#111]/20">{gpt}</td></tr>)}
              </tbody>
            </table>
          </div>
          <p className={paragraph}>表を見ると分かるとおり、判断の分かれ目は「社内の情報がどこにあるか」です。メールやファイル、会議がMicrosoft 365にまとまっているなら、有料のCopilotはその情報をそのまま生かせます。メールはGmail、ファイルは別のクラウドサービスといった会社では、Copilotの強みが出にくく、ChatGPTの方が使い勝手がよい場合があります。</p>

          <h2 className={heading}>5. 自社に合うのはどちらか判断する</h2>
          <p className={paragraph}>次のチェックリストで、当てはまる項目が多い方を候補にしてみてください。どちらにも同じくらい当てはまる場合は、次の章の手順で両方を少人数で試し、使われた方を選ぶと判断しやすくなります。</p>
          <div className={ac.box}>
            <p className={ac.boxTitle}>Microsoft 365 Copilotが向いている会社</p>
            <ul className="space-y-2 text-[#30343F] leading-[2]">
              {[
                'メールはOutlook、ファイルはOneDriveやSharePointに保存している',
                '社内の会議はTeamsで行うことが多い',
                'WordやExcel、PowerPointでの資料づくりに時間がかかっている',
                '「あのメールはどこだったか」「前回の会議で何を決めたか」を探す時間が長い',
                'ツールを増やさず、今の道具の中で使いたい'
              ].map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className={ac.check} />{item}</li>)}
            </ul>
          </div>
          <div className={ac.box}>
            <p className={ac.boxTitle}>ChatGPTが向いている会社</p>
            <ul className="space-y-2 text-[#30343F] leading-[2]">
              {[
                'Microsoft 365を使っていない、または一部の社員しか使っていない',
                '企画書の構成、広告文、メルマガなど、ゼロから考える作業が多い',
                '長い資料や規程を読み込ませて、要点や比較表を作りたい',
                '社員がすでに個人のアカウントで使っており、会社の管理下に移したい',
                'まず一部の部署だけで、幅広い用途を試したい'
              ].map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className={ac.check} />{item}</li>)}
            </ul>
          </div>
          <p className={paragraph}>なお、有料のCopilotを選ぶ場合は、社内のファイルの共有設定を先に見直すことをおすすめします。Copilotは、本人が見る権限を持っている情報をもとに答えます。たとえば、本来は役員だけが見るはずのファイルが「社内の全員」に共有されたままになっていると、Copilotに質問した社員の答えにその内容が出てくるおそれがあります。AIが情報を漏らすのではなく、もともとの共有設定の甘さが見えやすくなる、と考えてください。</p>

          <div className={ac.promo}>
            <img src={promoHeroSrc} alt="" className={ac.promoHero} loading="lazy" />
            <span aria-hidden="true" className={ac.promoLabel}>ARCLE TIP!</span>
            <p className={ac.promoTitle}>どの生成AIを選ぶかから相談したい方へ</p>
            <p className={paragraph}>Arcleの生成AI活用支援では、ビジネス向け生成AIツールの導入支援、セキュリティポリシーや利用ガイドラインの作成、AIの基礎研修を行っています。どの業務から試すかの整理から一緒に進められます。</p>
            <a href={service.href} className="inline-flex items-center gap-2 text-svc-ai font-bold hover:underline underline-offset-4">生成AI活用の支援内容を確認する<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </div>

          <h2 className={heading}>6. 導入前に決めておくこと</h2>
          <p className={paragraph}>どちらを選んでも、ツールを契約するだけでは安全に使える状態にはなりません。使い始める前に、次の点を社内で決めておきましょう。</p>
          <ul className="list-disc pl-6 text-[#30343F] leading-[2] space-y-2">
            <li>使ってよいツールとアカウント：会社で契約したものに限り、個人のアカウントや無料の個人向けサービスでの業務利用は認めない、といった線引きをします。</li>
            <li>入力してはいけない情報：顧客の個人情報、パスワード、未公表の業績など、どのツールにも入力しない情報を決めます。</li>
            <li>出力の確認：数字や固有名詞、社外に出す文章は、人が確認してから使うことを決めます。</li>
            <li>管理する人：アカウントの追加と削除、ライセンスの割り当て、設定の見直しを誰が担うかを決めます。退職者のアカウントを止める手順も含めます。</li>
            <li>相談窓口：使い方に迷ったときや、誤って入力してはいけない情報を入れたときに、誰に連絡するかを決めます。</li>
          </ul>
          <p className={`${paragraph} mt-4`}>社内ルールの作り方は、<a href="/articles/chatgpt-security-policy-sme" className="text-svc-ai hover:underline underline-offset-4">ChatGPT導入前に作るべき社内ルール</a>で詳しく紹介しています。ChatGPT向けに書いていますが、Copilotを使う場合も同じ考え方で作れます。Microsoft 365の契約やアカウントの整理から始める場合は、<a href="/articles/microsoft-365-migration-sme" className="text-svc-ai hover:underline underline-offset-4">中小企業のMicrosoft 365導入・移行手順</a>も参考にしてください。</p>

          <h2 className={heading}>7. 小さく試して決める手順</h2>
          <p className={paragraph}>比較表やチェックリストで候補を絞ったら、全社で契約する前に少人数で試します。生成AIは、使う人や業務によって効果が大きく変わるためです。</p>
          <ol className="list-decimal pl-6 text-[#30343F] leading-[2] space-y-3">
            <li><strong className="text-sumi">試す業務を二つか三つ選ぶ：</strong>メールの返信の下書き、会議の要約、提案書の構成づくりなど、毎週発生していて、うまくいったかを判断しやすい業務を選びます。</li>
            <li><strong className="text-sumi">試す人を決める：</strong>部署や年代の違う三人から五人ほどに声をかけます。ITが得意な人だけで試すと、全社に広げたときの使われ方が読めません。</li>
            <li><strong className="text-sumi">期間を区切って使う：</strong>二週間から一か月ほど、選んだ業務で実際に使ってもらいます。Copilot Chatのように追加料金なしで使えるものは、ここから始めると費用をかけずに比べられます。</li>
            <li><strong className="text-sumi">結果を同じ観点で振り返る：</strong>作業時間がどう変わったか、使いにくかった点、答えの誤りがあったかを、同じ質問で聞き取ります。「便利だった」という感想だけでなく、どの業務で役に立ったかを具体的に集めます。</li>
            <li><strong className="text-sumi">契約の範囲を決める：</strong>効果がはっきりした業務と人から契約を始めます。全員分を一度に契約せず、使われ方を見ながら増やす方が無駄が出にくくなります。</li>
          </ol>
          <p className={`${paragraph} mt-4`}>試用の段階で、うまくいった指示文や使い方の例を共有フォルダにまとめておくと、本格的に導入したときの研修資料になります。たとえば、会議の要約については<a href="/articles/ai-meeting-minutes-guide" className="text-svc-ai hover:underline underline-offset-4">生成AIで議事録を作る手順と注意点</a>で紹介している指示文の例が、どちらのツールでも使えます。</p>

          <h2 className={heading}>まとめ：仕事のある場所で選び、試してから決める</h2>
          <p className={paragraph}>Microsoft 365 Copilotは、Microsoft 365の中にある社内の情報を生かして、いつものアプリの中で働く生成AIです。ChatGPTは、AIの画面に情報を持ち込み、幅広い作業を相談しながら進める生成AIです。社内のメールやファイル、会議がMicrosoft 365にまとまっているならCopilot、そうでなければChatGPTが候補になります。どちらを選ぶ場合も、法人向けの契約で会社の管理下に置き、入力してよい情報のルールを先に決めることが大切です。まずは追加料金なしで使えるCopilot Chatや少人数での試用から始め、使われた方を選んでください。</p>

          <section className="mt-14">
            <h2 className={heading}>よくある質問</h2>
            <div className={ac.faq}>
              {faqs.map((faq) => <div key={faq.q}><h3 className={ac.faqQ}>{faq.q}</h3><p>{faq.a}</p></div>)}
            </div>
          </section>
          <section className={ac.related}>
            <h2 className={ac.h2Flat.ai}>関連記事</h2>
            <div className="space-y-3">
              <a href="/articles/chatgpt-security-policy-sme" className={ac.relatedLink}>ChatGPT導入前に作るべき社内ルール</a>
              <a href="/articles/ai-meeting-minutes-guide" className={ac.relatedLink}>生成AIで議事録を作る手順と注意点</a>
              <a href="/articles" className={ac.allLink}>記事一覧を見る</a>
            </div>
          </section>
          <section className={ac.svcBox.ai}>
            <h2 className={ac.svcTitle}>関連サービス</h2>
            <a href={service.href} className={ac.svcBtn}>{service.name}を詳しく見る<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </section>
          <p className={ac.author}>この記事を書いた人：栗原 勇太（Arcle代表）<br /><a href="/company/message" className="text-svc-ai hover:underline underline-offset-4">代表メッセージを見る</a></p>
        </div>
      </article>
      <ContactCta />
    </div>
  );
};

export default ArticleCopilotVsChatGPT;
