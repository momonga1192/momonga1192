import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, ArrowRight, Wallet, Server, RefreshCw, Headphones, Smartphone, Mail, Globe, ShieldCheck, BarChart3, MessageSquare, Newspaper, ChevronDown, MapPin } from 'lucide-react';
import { PageHeader, SectionHead, ContactCta, IconTile, Mark, PlanCard, Sparkle, Sticker, Ticker, card, press } from '../parts';
import { illust, services } from '../theme';

const plans = [
  {
    name: 'Light',
    sub: 'ライト',
    desc: 'まずは名刺代わりのホームページを',
    price: 4800,
    pages: 'TOP＋4ページ',
    design: 'テンプレートデザイン',
    term: '約2週間',
    features: ['TOP＋4ページ', 'テンプレートデザイン', 'お知らせ更新機能', 'お問い合わせフォーム']
  },
  {
    name: 'Standard',
    sub: 'スタンダード',
    desc: '会社の魅力をしっかり伝えたい',
    price: 7500,
    pages: 'TOP＋6ページ（追加可）',
    design: 'セミオーダーデザイン',
    term: '約1ヶ月',
    features: ['TOP＋6ページ（追加可）', 'テンプレートを御社向けにカスタマイズ', 'お知らせ更新機能', 'お問い合わせフォーム', '5年経過後は月額4,800円'],
    recommended: true
  },
  {
    name: 'Order Made',
    sub: 'オーダーメイド',
    desc: 'ブランドに合わせた完全オリジナルで',
    price: 9800,
    pages: 'TOP＋6ページ（追加可）',
    design: '完全オリジナルデザイン',
    term: '約1.5〜2ヶ月',
    features: ['TOP＋6ページ（追加可）', '完全オリジナルデザイン', 'お知らせ更新機能', 'お問い合わせフォーム', '5年経過後は月額4,800円']
  }
];

const withTax = (price: number) => Math.round(price * 1.1).toLocaleString();

const included = [
  { icon: Server, title: 'サーバー・ドメイン', desc: 'ドメイン1つの取得・更新・管理までお任せ' },
  { icon: Mail, title: '独自ドメインのメール', desc: 'info@御社ドメイン などを作成' },
  { icon: Smartphone, title: 'スマホ・タブレット対応', desc: 'どの画面でも見やすく表示' },
  { icon: ShieldCheck, title: 'SSL・セキュリティ', desc: '常時SSL化と定期的な更新・バックアップ' },
  { icon: Newspaper, title: 'お知らせ更新機能', desc: '新着情報はご自身でも更新できます' },
  { icon: MessageSquare, title: 'お問い合わせフォーム', desc: '迷惑メール対策つきで設置' },
  { icon: BarChart3, title: 'アクセス解析の設定', desc: 'Googleアナリティクス・Search Console' },
  { icon: Globe, title: 'Googleマップ・SNS連携', desc: '地図の埋め込みやSNSへのリンク' }
];

const comparison = [
  { label: '初期費用', arcle: '0円', general: '30万〜100万円程度', cheap: '0〜10万円程度' },
  { label: '月額費用', arcle: '4,800円〜（税抜）', general: '保守費 1万〜3万円程度', cheap: '3,000円〜' },
  { label: 'デザイン', arcle: 'テンプレート〜完全オリジナル', general: '完全オリジナル', cheap: 'テンプレートのみ' },
  { label: '打ち合わせ', arcle: 'オンライン・訪問どちらも', general: '訪問が中心', cheap: 'メール・フォームのみの場合も' },
  { label: '公開後の更新', arcle: '軽微な修正は無料', general: '都度見積もり', cheap: 'ご自身で更新' },
  { label: 'サーバー・ドメイン・メール', arcle: '込み', general: '別契約の場合が多い', cheap: '込み／別契約' },
  { label: 'PC・メールなどIT全般の相談', arcle: 'まとめて相談できる', general: '対象外', cheap: '対象外' }
];

const flow = [
  { title: 'お問い合わせ', desc: 'フォームからお気軽にご連絡ください。「まだ検討中」の段階でも大丈夫です。' },
  { title: 'ヒアリング・ご提案', desc: 'オンラインまたは訪問で、目的やイメージをお聞きし、プランとお見積りをご提案します。' },
  { title: 'ご契約', desc: '内容と金額にご納得いただいてからのご契約です。それまで費用は一切かかりません。' },
  { title: '取材・素材のご準備', desc: '会社案内やパンフレット、写真などをお預かりし、構成・カラー・掲載内容を決めます。' },
  { title: 'デザイン・制作', desc: 'デザイン案をご確認いただいたうえで制作します。ライトで約2週間、スタンダードで約1ヶ月が目安です。' },
  { title: '確認・公開', desc: '公開前に一緒に最終確認し、修正を反映して公開します。更新方法もご説明します。' },
  { title: '運用サポート', desc: '公開後も文章・写真の差し替えやお知らせの掲載をお手伝いします。' }
];

const areas = ['愛知県', '岐阜県', '三重県'];

// 作例（public/samples）。画像は各作例のファーストビュー
const samples = [
  { slug: 'hazuki-kensetsu', name: '葉月建設株式会社', type: '建設業', plan: 'スタンダード' },
  { slug: 'redline-gym', name: 'RED LINE', type: 'キックボクシングジム', plan: 'オーダーメイド' },
  { slug: 'komorebi-day', name: 'デイサービス こもれび', type: '介護', plan: 'ライト' },
  { slug: 'hair-lien', name: 'hair salon Lien', type: '美容室', plan: 'スタンダード' },
  { slug: 'niji-atelier', name: 'こどもアトリエ にじいろ', type: '幼児・小学生向け教室', plan: 'ライト' },
  { slug: 'hiiragi-tax', name: 'ひいらぎ税理士事務所', type: '税理士事務所', plan: 'スタンダード' },
  { slug: 'kappo-yururi', name: '割烹 ゆるり', type: '飲食店', plan: 'ライト' },
  { slug: 'aoba-dental', name: 'あおば通り歯科クリニック', type: '歯科医院', plan: 'スタンダード' },
  { slug: 'manabiya-ippo', name: '個別指導塾 まなびや一歩', type: '学習塾', plan: 'ライト' },
  { slug: 'inaho-setsubi', name: '稲穂設備工業株式会社', type: '設備工事業', plan: 'ライト' },
  { slug: 'salon-nagi', name: 'リラクゼーションサロン 凪', type: 'リラクゼーション', plan: 'オーダーメイド' },
  { slug: 'sakurazaka-sr', name: 'さくら坂社会保険労務士事務所', type: '社会保険労務士', plan: 'スタンダード' }
];

const SampleCard: React.FC<{ sample: (typeof samples)[number]; hidden?: boolean }> = ({ sample, hidden }) => (
  <li className="w-[280px] md:w-[360px] shrink-0" aria-hidden={hidden || undefined}>
    <a href={`/samples/${sample.slug}`} target="_blank" rel="noopener" tabIndex={hidden ? -1 : undefined} className={`group block rounded-[28px] bg-white p-3 ${card} ${press}`}>
      <div className="pop-tilt rounded-[18px] overflow-hidden border-2 border-sumi bg-cream">
        <div className="flex gap-1.5 px-3 py-2 border-b-2 border-sumi bg-white" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-sumi bg-coral" />
          <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-sumi bg-mustard" />
          <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-sumi bg-svc-web" />
        </div>
        <img src={`/images/samples/${sample.slug}.webp`} alt={hidden ? '' : `${sample.name}の作例サイトのトップページ`} width={800} height={500} className="block w-full aspect-[8/5] object-cover object-top" loading="lazy" />
      </div>
      <div className="px-2 pt-4 pb-2">
        <p className="flex items-center gap-2 text-xs">
          <span className={`pop-wiggle -rotate-3 rounded-md px-2.5 py-0.5 font-bold text-white ${service.bg}`}>{sample.plan}</span>
          <span className="text-sumi-muted">{sample.type}</span>
        </p>
        <p className="font-head font-black mt-2 flex items-center justify-between gap-2">
          {sample.name}
          <ArrowRight className={`w-4 h-4 shrink-0 ${service.text} group-hover:translate-x-1 transition-transform`} />
        </p>
      </div>
    </a>
  </li>
);

const faqs = [
  {
    q: '本当に初期費用は0円ですか？',
    a: 'はい、0円です。制作費は月額料金に含まれているため、契約時にまとまったお支払いは発生しません。プランに含まれない機能（予約システムやページの大幅な追加など）を希望される場合のみ、オプション料金を事前にお見積りします。'
  },
  {
    q: '契約期間はどれくらいですか？',
    a: '最低契約期間は1年で、1〜5年の間でお選びいただけます。制作費を月々に分けてお支払いいただく仕組みのため、5年契約がもっとも月額を抑えられます。'
  },
  {
    q: '途中で解約できますか？',
    a: '可能です。ただし契約期間の途中で解約される場合は、制作費のうちまだお支払いいただいていない分を解約金としてご請求します。金額の計算方法はご契約前に必ずご説明します。'
  },
  {
    q: '解約したらホームページはどうなりますか？',
    a: '制作費のお支払いが済んでいれば、ホームページのデータをお渡しします。ご自身で用意したサーバー・ドメインへ移して、御社のホームページとしてそのまま使い続けることができます。なお、デザインやプログラムの著作権はArcleに帰属します。'
  },
  {
    q: '支払い方法を教えてください。',
    a: '毎月、請求書をお送りしますので、銀行振込でお支払いください。初期費用はかからず、お支払いはホームページの公開月の翌月から始まります。'
  },
  {
    q: '今のドメインやメールアドレスはそのまま使えますか？',
    a: '基本的にはそのまま引き継げます。現在のサーバー・ドメインの契約状況を確認したうえで、切り替えの手順もこちらで進めます。'
  },
  {
    q: 'ドメイン代は月額料金に含まれますか？',
    a: '.com・.jp・.net などのドメイン1つ分は月額料金に含まれます。.co.jp などの属性型JPドメインをご希望の場合は、通常のドメインとの差額（実費）を年に一度ご請求します。'
  },
  {
    q: '公開後の更新はどこまで無料ですか？',
    a: '文章や写真の差し替え、お知らせの掲載といった軽微な修正は月額料金の範囲で対応します。ページの新規追加やデザインの変更など、作業量が大きいものは事前にお見積りします。'
  },
  {
    q: 'ホームページのことがよく分からないのですが大丈夫ですか？',
    a: '大丈夫です。専門用語はできるだけ使わずにご説明し、掲載内容も取材をしながら一緒に考えます。初めてホームページを作る会社さまのご相談も多くいただいています。'
  },
  {
    q: '何を準備すればいいですか？',
    a: '会社案内やパンフレット、商品カタログ、写真、今のホームページなど、お手元にあるものをお預かりできればスムーズです。写真撮影や文章作成が必要な場合もご相談ください。'
  },
  {
    q: '今あるホームページの更新だけをお願いできますか？',
    a: 'はい。他社で作ったホームページでも、月額4,800円（税抜）の運用おまかせプランで更新・管理を引き継げます。サイトの状態を確認してからご案内します。'
  }
];

const service = services.find((s) => s.key === 'web')!;
const button = 'inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-sumi text-white font-bold border-[2.5px] border-sumi shadow-[5px_5px_0_#F2B544] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_#F2B544]';

const WebNext: React.FC = () => (
  <div className="bg-cream text-sumi overflow-x-clip">
      <Helmet>
        <title>月額制ホームページ制作 | 愛知・東海 初期費用0円・月額4,800円〜 - Arcle</title>
        <meta name="description" content="愛知・東海の中小企業向け、月額制のホームページ制作。初期費用0円、月額4,800円（税抜）から。サーバー・ドメイン・独自ドメインのメール・スマホ対応・公開後の更新まで込み。東海エリアは訪問打ち合わせにも対応します。" />
        <link rel="canonical" href="https://www.arcle.net/web-production" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://www.arcle.net/" },
            { "@type": "ListItem", "position": 2, "name": "Web制作", "item": "https://www.arcle.net/web-production" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "月額制ホームページ制作",
          "provider": { "@id": "https://www.arcle.net/#organization" },
          "description": "初期費用0円・月額4,800円から。サーバー・ドメイン・メール・スマホ対応・公開後の更新まで込みのホームページ制作",
          "areaServed": areas.map((name) => ({ "@type": "State", "name": name })),
          "offers": plans.map((plan) => ({
            "@type": "Offer",
            "name": plan.sub,
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": plan.price,
              "priceCurrency": "JPY",
              "unitCode": "MON",
              "valueAddedTaxIncluded": false
            }
          }))
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((item) => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a }
          }))
        })}</script>
      </Helmet>
    <PageHeader
      en="Web Production"
      title={<>ホームページは、<br /><Mark><span className={service.text}>月額制</span></Mark>でつくる時代へ。</>}
      lead={<>初期費用0円、月額4,800円から。<br />制作からサーバー・ドメイン・メール、公開後の更新まで、ホームページのことはまるごとArcleにお任せください。</>}
      crumbs={[{ label: 'サービス', href: '/services' }, { label: 'Web制作' }]}
      service="web"
      image={illust('svc-web')}
    />

    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-5">
        <div className={`relative rounded-[40px] bg-white p-7 md:p-10 grid lg:grid-cols-[1fr_1.1fr] gap-8 items-center ${card}`}>
          <Sparkle className="absolute -top-5 -right-3 w-10 h-10 text-mustard" />
          <div>
            <div className="grid grid-cols-2 gap-4">
              {[{ label: '初期費用', amount: '0', unit: '円' }, { label: '月額', amount: '4,800', unit: '円〜' }].map((price) => (
                <div key={price.label} className={`group rounded-[28px] p-5 border-2 border-sumi ${service.tint}`}>
                  <p><Sticker className="pop-wiggle text-sm font-bold">{price.label}</Sticker></p>
                  <p className={`mt-3 font-en font-black italic text-[28px] sm:text-4xl md:text-5xl whitespace-nowrap ${service.text}`}>{price.amount}<span className="text-base ml-1">{price.unit}</span></p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-sumi-muted">※月額は税抜です（税込5,280円〜）。</p>
          </div>
          <div>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm">
              {['サーバー・ドメイン・メール込み', 'スマホ・タブレット対応', '公開後の軽微な修正は無料', '最短約2週間で公開'].map((text) => (
                <li key={text} className="flex items-start gap-2 font-bold"><span className={`shrink-0 w-5 h-5 rounded-full grid place-items-center border-2 border-sumi text-white ${service.bg}`}><Check className="w-3 h-3" strokeWidth={4} /></span>{text}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4 mt-7">
              <a href='/contact' className={button}>無料で相談・見積もり<ArrowRight className="w-4 h-4" /></a>
              <a href="#plans" className={`inline-flex items-center justify-center px-7 py-4 rounded-full bg-white font-bold ${card} shadow-[5px_5px_0_#1F2430] ${press}`}>料金プランを見る</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Ticker items={['初期費用0円', '月額4,800円〜', 'サーバー・ドメイン・メール込み', 'スマホ・タブレット対応', '公開後の更新もお任せ', '最短約2週間で公開']} tone="bg-svc-web text-white" className="-mb-4" />

    <section className="py-20 md:py-28 bg-white border-y-[2.5px] border-sumi">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="Why Arcle" title={<>選ばれる<Mark>4つの理由</Mark></>} enClass={service.text} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
              { icon: Wallet, title: '初期費用0円', desc: '数十万円の制作費をまとめて払う必要はありません。月々の定額で、無理なくホームページを持てます。' },
              { icon: Server, title: '必要なものは全部込み', desc: 'サーバー、ドメイン、独自ドメインのメール、スマホ対応、セキュリティ対策まで月額に含まれます。' },
              { icon: RefreshCw, title: '公開後の更新もお任せ', desc: '文章や写真の差し替え、お知らせの掲載などの軽微な修正は、追加費用なしで対応します。' },
              { icon: Headphones, title: 'IT全般の相談窓口に', desc: '情シス代行も手がけるArcleなら、メールやPC、Microsoft 365のお困りごともまとめてご相談いただけます。' }
          ].map((item, index) => (
            <article key={item.title} className={`group pop-reveal rounded-[28px] bg-cream p-7 ${card}`} style={{ animationDelay: `${index * 90}ms` }}>
              <IconTile icon={<item.icon className="w-7 h-7" />} num={index + 1} bg={service.bg} className="pop-wiggle" />
              <h3 className="mt-6 font-head font-black text-xl md:text-2xl leading-snug [word-break:auto-phrase]">{item.title}</h3>
              <p className="mt-3 text-sm text-sumi-muted leading-[1.9]">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-cream bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px]">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="All Included" title={<>月額料金に<Mark>含まれるもの</Mark></>} lead="どのプランでも、ホームページの運営に必要なものがそろっています。" enClass={service.text} center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {included.map((item, index) => (
            <article key={item.title} className="group pop-reveal rounded-[24px] bg-white p-6 border-2 border-sumi shadow-[4px_4px_0_#1F2430]" style={{ animationDelay: `${(index % 4) * 80}ms` }}>
              <span className={`pop-wiggle w-12 h-12 rounded-2xl grid place-items-center text-white border-2 border-sumi shadow-[3px_3px_0_#1F2430] -rotate-6 ${service.bg}`}><item.icon className="w-6 h-6" /></span>
              <h3 className="mt-5 font-head font-black text-xl leading-snug [word-break:auto-phrase]">{item.title}</h3>
              <p className="mt-2 text-sm text-sumi-muted leading-[1.9]">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="plans" className="py-20 md:py-28 scroll-mt-20 bg-white border-y-[2.5px] border-sumi">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="Pricing" title="料金プラン" lead="すべてのプランで初期費用0円です。" enClass={service.text} center />
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-6 items-stretch pt-4">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.name}
              index={index}
              service="web"
              cta="このプランで相談する"
              plan={{ ...plan, chip: '初期費用 0円', prefix: '月額', amount: plan.price.toLocaleString(), unit: '円', priceNote: `（税込 ${withTax(plan.price)}円）`, note: `公開までの目安：${plan.term}` }}
            />
          ))}
        </div>
        <div className={`group pop-reveal mt-14 rounded-[28px] bg-cream p-7 md:p-10 flex flex-col md:flex-row md:items-center gap-6 ${card}`}>
          <div className="flex-1">
            <p><Sticker className="text-sm font-bold">今あるホームページはそのままで</Sticker></p>
            <h3 className="font-head text-2xl md:text-3xl font-black mt-4 [word-break:auto-phrase]">運用おまかせプラン</h3>
            <p className="mt-3 text-sm text-sumi-muted leading-[1.9]">他社で制作したホームページの更新・管理を引き継ぎます。サーバーやドメインの管理、文章・写真の差し替えまでまとめてお任せいただけます。</p>
          </div>
          {/* 上のプランと同じ値札 */}
          <div className="pop-wiggle shrink-0 self-start md:self-center rotate-2 rounded-2xl bg-white border-[2.5px] border-sumi px-6 py-4 shadow-[4px_4px_0_#1F2430]">
            <p className="flex items-baseline whitespace-nowrap"><span className="font-bold mr-1.5">月額</span><span className={`font-en text-[52px] leading-none font-black italic tracking-tight ${service.text}`}>4,800</span><span className="font-head font-black text-lg ml-1">円</span></p>
            <p className="text-xs text-sumi-muted mt-1">（税込 5,280円）</p>
          </div>
        </div>
        <div className="mt-6 space-y-2 text-xs text-sumi-muted leading-relaxed">
          <p>※最低契約期間は1年です。契約期間は1〜5年からお選びいただけます。</p>
          <p>※LP単体の制作や、予約・会員機能などのシステム連携は個別にお見積りします。</p>
        </div>
      </div>
    </section>

    <section className={`py-20 md:py-28 ${service.tint} bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px]`}>
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="Samples" title="業種別の作例をご覧ください" lead="建設・介護・保育・教室・美容・飲食・士業など、さまざまな業種の作例をご用意しています。気に入ったデザインをもとに、御社の情報と写真でお作りします。" enClass={service.text} center />
      </div>
      <div className="marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <ul className="marquee-track flex w-max gap-6 md:gap-8 pr-6 md:pr-8 pt-4 pb-6">
          {samples.map((s) => <SampleCard key={s.slug} sample={s} />)}
          {samples.map((s) => <SampleCard key={`${s.slug}-copy`} sample={s} hidden />)}
        </ul>
      </div>
      <div className="max-w-6xl mx-auto px-5 mt-10 text-center">
        <a href="/samples" target="_blank" rel="noopener" className={button}>作例をすべて見る<ArrowRight className="w-4 h-4" /></a>
        <p className="text-xs text-sumi-muted mt-5">※作例の会社名・人物・連絡先はすべて架空のものです。</p>
      </div>
    </section>

    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="Comparison" title="他の制作方法との比較" enClass={service.text} center />
        <div className={`pop-reveal overflow-x-auto rounded-[28px] bg-white ${card}`} role="region" aria-label="制作方法の比較表（横にスクロールできます）" tabIndex={0}>
          <table className="w-full min-w-[720px] text-sm border-collapse">
            <thead><tr>
              <th scope="col" className="p-5 text-left w-1/4">比較項目</th>
              <th scope="col" className={`p-5 w-1/4 text-white font-en font-black italic text-lg ${service.bg}`}>Arcle</th>
              <th scope="col" className="p-5 w-1/4 text-sumi-muted">一般的な制作会社</th>
              <th scope="col" className="p-5 w-1/4 text-sumi-muted">格安の制作サービス</th>
            </tr></thead>
            <tbody>{comparison.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="p-5 border-t border-warm-line text-left font-bold">{row.label}</th>
                <td className={`p-5 border-t border-warm-line text-center font-bold ${service.tint} ${service.text}`}>{row.arcle}</td>
                <td className="p-5 border-t border-warm-line text-center text-sumi-muted">{row.general}</td>
                <td className="p-5 border-t border-warm-line text-center text-sumi-muted">{row.cheap}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <p className="mt-6 text-xs text-sumi-muted text-center">※他社の金額・内容は一般的な目安です。</p>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-cream bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px] border-y-[2.5px] border-sumi">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="Flow" title="公開までの流れ" lead="ご契約までは費用はかかりません。" enClass={service.text} />
        <div className="grid lg:grid-cols-[0.65fr_1.35fr] gap-10 items-start">
          <img src={illust('flow-hearing')} alt="" className="pop-tilt w-full max-w-xs mx-auto lg:sticky lg:top-28" loading="lazy" />
          <ol className="space-y-4">{flow.map((step, index) => (
            <li key={step.title} className="group pop-reveal rounded-[24px] bg-white p-6 flex gap-4 border-2 border-sumi shadow-[4px_4px_0_#1F2430]" style={{ animationDelay: `${index * 70}ms` }}>
              <span className={`pop-wiggle shrink-0 -rotate-12 w-10 h-10 rounded-full grid place-items-center font-en font-black italic text-white border-2 border-sumi shadow-[2px_2px_0_#1F2430] ${index % 2 ? 'bg-coral' : service.bg}`}>{index + 1}</span>
              <div><h3 className="font-head font-black text-xl [word-break:auto-phrase]">{step.title}</h3><p className="mt-2 text-sm text-sumi-muted leading-[1.9]">{step.desc}</p></div>
            </li>
          ))}</ol>
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="Area" title="対応エリア" lead="東海エリア（愛知・岐阜・三重）は訪問での打ち合わせにも対応します。オンライン打ち合わせなら全国どこからでもご依頼いただけます。" enClass={service.text} center />
        <ul className="max-w-3xl mx-auto flex flex-wrap justify-center gap-3">{areas.map((area) => (
          <li key={area} className="pop-wiggle rounded-full border-2 border-sumi bg-cream px-5 py-2 font-bold inline-flex items-center gap-2 shadow-[3px_3px_0_#1F2430]"><MapPin className={`w-4 h-4 ${service.text}`} strokeWidth={2.5} />{area}</li>
        ))}</ul>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-cream bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px] border-t-[2.5px] border-sumi">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="FAQ" title="よくある質問" enClass={service.text} center />
        <div className="max-w-3xl mx-auto space-y-4">{faqs.map((item, index) => (
          <details key={item.q} open={index === 0} className="group pop-reveal rounded-[24px] bg-white border-2 border-sumi shadow-[4px_4px_0_#1F2430]" style={{ animationDelay: `${Math.min(index, 4) * 60}ms` }}>
            <summary className="flex items-center gap-4 p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <span className={`pop-wiggle shrink-0 -rotate-6 w-9 h-9 rounded-xl grid place-items-center font-en text-lg font-black italic text-white border-2 border-sumi ${service.bg}`}>Q</span>
              <h3 className="flex-1 font-head font-black text-[17px] md:text-lg [word-break:auto-phrase]">{item.q}</h3>
              <ChevronDown className={`w-5 h-5 shrink-0 transition-transform group-open:rotate-180 ${service.text}`} />
            </summary>
            <p className="mx-6 mb-6 pt-4 border-t-2 border-dashed border-warm-line text-sm text-sumi-muted leading-[2]">{item.a}</p>
          </details>
        ))}</div>
      </div>
    </section>

    <ContactCta title={<>まずは、お見積りから<br />お気軽にどうぞ。</>} body="新規制作もリニューアルも、ご相談・お見積りは無料です。「どのプランが合うか分からない」という段階でも大丈夫です。" />
  </div>
);

export default WebNext;
