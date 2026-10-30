import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, ArrowRight, Wallet, Server, RefreshCw, Headphones, Smartphone, Mail, Globe, ShieldCheck, BarChart3, MessageSquare, Newspaper, ChevronDown, MapPin } from 'lucide-react';
import { PageHeader, SectionHead, ContactCta, IconTile, Mark, PlanCard, Sticker, Ticker, card, press, comicBtn, comicBtnShape, comicIllust } from '../parts';
import { Bubble, Burst, Caption, SfxText, SlantPanel, panel } from '../comic';
import { services } from '../theme';

// Web制作のページ（アメコミ版）。トップ（HomeComic.tsx）と同じコミックの1冊として、
// 「古いホームページ → 新しいホームページ」の2コマから始め、料金・中身・作例・流れ・質問をコマに収める

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

// 作例のカード：1つのコマに、ブラウザの窓に入れたファーストビューを貼る
const SampleCard: React.FC<{ sample: (typeof samples)[number]; hidden?: boolean }> = ({ sample, hidden }) => (
  <li className="w-[280px] md:w-[360px] shrink-0" aria-hidden={hidden || undefined}>
    <a href={`/samples/${sample.slug}`} target="_blank" rel="noopener" tabIndex={hidden ? -1 : undefined} className={`group block bg-white p-3 ${card} ${press}`}>
      <div className="pop-tilt overflow-hidden border-[3px] border-[#111] bg-[#FAF3E0]">
        <div className="flex gap-1.5 px-3 py-2 border-b-[3px] border-[#111] bg-white" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-[#111] bg-coral" />
          <span className="w-2.5 h-2.5 rounded-full border-2 border-[#111] bg-mustard" />
          <span className="w-2.5 h-2.5 rounded-full border-2 border-[#111] bg-svc-web" />
        </div>
        <img src={`/images/samples/${sample.slug}.webp`} alt={hidden ? '' : `${sample.name}の作例サイトのトップページ`} width={800} height={500} className="block w-full aspect-[8/5] object-cover object-top" loading="lazy" />
      </div>
      <div className="px-1 pt-4 pb-1">
        <p className="flex items-center gap-2 text-xs">
          <span className={`pop-wiggle -rotate-3 border-2 border-[#111] px-2.5 py-0.5 font-manga text-white ${service.bg}`}>{sample.plan}</span>
          <span className="font-bold text-sumi-muted">{sample.type}</span>
        </p>
        <p className="font-manga mt-2.5 flex items-center justify-between gap-2 leading-snug">
          {sample.name}
          <ArrowRight className={`w-4 h-4 shrink-0 ${service.text} group-hover:translate-x-1 transition-transform`} strokeWidth={3} />
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
// 濃い地のボタン（からし色の影）と、白いボタン
const button = `${comicBtnShape} bg-[#111] text-white shadow-[5px_5px_0_#F2B544] hover:shadow-[2px_2px_0_#F2B544]`;
const subButton = `${comicBtn} bg-white text-[#111]`;
// Web制作の色の集中線
const webRays = { '--ray-a': '#C8509F', '--ray-b': '#D25EAA' } as React.CSSProperties;
// 太い黒ぶちの数字（値札など）
const bigNum = 'font-comic leading-none tracking-[0.02em] text-svc-web [paint-order:stroke_fill] [-webkit-text-stroke:5px_#111] [text-shadow:3px_3px_0_#111]';

const reasons = [
  { icon: Wallet, title: '初期費用0円', desc: '数十万円の制作費をまとめて払う必要はありません。月々の定額で、無理なくホームページを持てます。' },
  { icon: Server, title: '必要なものは全部込み', desc: 'サーバー、ドメイン、独自ドメインのメール、スマホ対応、セキュリティ対策まで月額に含まれます。' },
  { icon: RefreshCw, title: '公開後の更新もお任せ', desc: '文章や写真の差し替え、お知らせの掲載などの軽微な修正は、追加費用なしで対応します。' },
  { icon: Headphones, title: 'IT全般の相談窓口に', desc: '情シス代行も手がけるArcleなら、メールやPC、Microsoft 365のお困りごともまとめてご相談いただけます。' }
];

// 冒頭の2コマ（BEFORE：古いホームページで困っている／AFTER：新しいホームページで問い合わせが来た）。
// points は段の箱に対する%の頂点。スマホは1コマずつ縦に並べ、上下の辺を斜めにする。
// BEFORE のコマは小さく色も少しくすませ、AFTER のコマを大きくして「よくなった」ことを見せる
const story = [
  {
    key: 'before',
    img: 'worry-web',
    label: 'BEFORE',
    labelTone: 'bg-white text-[#111]',
    sfx: (
      <>
        <Bubble talk className="w-max right-[3%] md:right-auto md:left-[8%] top-[7%] md:top-[9%] text-[12px] md:text-[clamp(14px,1.5vw,19px)]" tailAt={24} lean={-0.7} rotate={-3} delay={0.2}>
          ホームページが古くて、<br />会社の魅力が伝わらない…
        </Bubble>
        <SfxText text="SIGH..." color="#9FC3FF" mood="droop" className="right-[7%] top-[50%] md:top-[34%] text-[clamp(28px,7vw,44px)] md:text-[clamp(26px,3.2vw,44px)]" rotate={-4} delay={0.3} />
      </>
    ),
    points: [[0, 0], [39, 0], [33, 100], [0, 100]] as [number, number][],
    sp: [[0, 0], [100, 4], [100, 96], [0, 100]] as [number, number][]
  },
  {
    key: 'after',
    img: 'web-after',
    label: 'AFTER!',
    labelTone: 'bg-mustard text-[#111]',
    sfx: (
      <>
        {/* 何が変わったかを、女性のせりふで伝える。電話の音は、鳴っている電話の近く（モニターの上）に置く */}
        <Bubble talk className="w-max right-[3%] top-[9%] md:top-[6%] text-[13px] md:text-[clamp(16px,1.75vw,23px)]" tailAt={22} lean={-0.8} rotate={3} delay={0.3}>
          見やすいサイトになって、<br />問い合わせが増えた！<br />
          <span className="inline-block mt-[0.3em] px-[0.3em] bg-mustard/70">更新もおまかせだから、</span>
          <br />
          <span className="inline-block px-[0.3em] bg-mustard/70">本業に集中できる！</span>
        </Bubble>
        <SfxText text="RING! RING!" color="#F2B544" className="right-[4%] top-[44%] md:top-[46%] text-[clamp(22px,5.6vw,34px)] md:text-[clamp(20px,2.4vw,34px)]" rotate={-6} delay={0.8} />
      </>
    ),
    points: [[41, 0], [100, 0], [100, 100], [35, 100]] as [number, number][],
    sp: [[0, 4], [100, 0], [100, 100], [0, 96]] as [number, number][]
  }
];

// BEFORE／AFTER の札。コマの枠からはみ出すように、コマ（切り抜き）の外に置く。AFTER のほうを大きくする
const StoryLabel: React.FC<{ s: (typeof story)[number]; className?: string }> = ({ s, className = '' }) => (
  <span
    className={`comic-pop absolute z-20 border-[4px] border-[#111] px-4 pt-1.5 pb-1 font-comic leading-none tracking-[0.08em] shadow-[5px_5px_0_#111] ${
      s.key === 'after' ? 'text-[34px] md:text-[48px] [--r:-4deg]' : 'text-[26px] md:text-[34px] [--r:-3deg]'
    } ${s.labelTone} ${className}`}
  >
    {s.label}
  </span>
);

const storyContent = (s: (typeof story)[number]) => (
  <>
    <img src={comicIllust(s.img)} alt="" className={`absolute inset-0 w-full h-full object-cover ${s.key === 'before' ? 'object-[35%_12%] md:object-[35%_40%] saturate-[0.6] brightness-[0.95]' : ''}`} loading="lazy" />
    <span className="pop-reveal absolute inset-0 block">{s.sfx}</span>
  </>
);

const WebNext: React.FC = () => (
  <div className="bg-[#FAF3E0] text-sumi overflow-x-clip">
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
      title={<>ホームページは、<br /><Mark className="bg-white"><span className={service.text}>月額制</span></Mark>でつくる時代へ。</>}
      lead={<span className="block lg:max-w-[440px]">初期費用0円、月額4,800円から。<br />制作からサーバー・ドメイン・メール、公開後の更新まで、ホームページのことはまるごとArcleにお任せください。</span>}
      crumbs={[{ label: 'サービス', href: '/services' }, { label: 'Web制作' }]}
      service="web"
      image={comicIllust('svc-web')}
    />

    {/* 冒頭：BEFORE／AFTER の2コマに、料金のコマを重ねる */}
    <section className="relative py-14 md:py-20 comic-dots overflow-hidden">
      <div className="absolute inset-0 comic-speed [--speed:rgb(200_80_159/0.2)]" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-5">
        <div className="flex flex-col gap-3 drop-shadow-[6px_6px_0_#111]" aria-hidden="true">
          {story.map((s) => (
            <div key={s.key} className={`md:hidden relative ${s.key === 'after' ? 'aspect-[1/1]' : 'aspect-[16/9]'}`}>
              <SlantPanel points={s.sp}>{storyContent(s)}</SlantPanel>
              <span className="pop-reveal absolute inset-0 block pointer-events-none">
                <StoryLabel s={s} className={s.key === 'after' ? '-top-6 left-2' : '-top-4 -left-1'} />
              </span>
            </div>
          ))}
          <div className="hidden md:block relative aspect-[21/9]">
            {story.map((s) => (
              <SlantPanel key={s.key} points={s.points}>
                {storyContent(s)}
              </SlantPanel>
            ))}
            <span className="pop-reveal absolute inset-0 block pointer-events-none">
              <StoryLabel s={story[0]} className="-top-6 -left-4" />
              <StoryLabel s={story[1]} className="-top-9 left-[43%]" />
            </span>
          </div>
        </div>

        {/* 料金のコマ */}
        <div className={`pop-reveal relative z-10 -mt-4 md:-mt-12 mx-1 md:mx-8 lg:mx-14 bg-white ${panel} shadow-[10px_10px_0_#111] p-5 pt-9 sm:p-8 sm:pt-10 md:p-10 grid lg:grid-cols-[0.9fr_1.2fr] gap-8 items-center`}>
          <Caption className="absolute -top-4 left-4 md:left-6 -rotate-2 font-comic! tracking-[0.08em] text-[20px] md:text-[22px]">THE NEW WAY!</Caption>
          <div>
            <div className="grid grid-cols-[0.8fr_1fr] gap-3 sm:gap-4">
              {[{ label: '初期費用', amount: '0', unit: '円' }, { label: '月額', amount: '4,800', unit: '円〜' }].map((price, i) => (
                <div key={price.label} className={`group relative overflow-hidden px-3 py-4 sm:px-4 sm:py-5 border-[3px] border-[#111] shadow-[5px_5px_0_#111] ${service.tint} ${i ? 'rotate-1' : '-rotate-1'}`}>
                  <span className="absolute inset-0 comic-dots opacity-50" aria-hidden="true" />
                  <p className="relative"><Sticker className="pop-wiggle text-[13px] sm:text-sm font-manga">{price.label}</Sticker></p>
                  <p className="relative mt-3 whitespace-nowrap"><span className={`${bigNum} text-[40px] sm:text-[56px] lg:text-[48px] xl:text-[54px]`}>{price.amount}</span><span className="font-manga text-[15px] sm:text-lg ml-1">{price.unit}</span></p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs font-bold text-sumi-muted">※月額は税抜です（税込5,280円〜）。</p>
          </div>
          <div>
            <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {['サーバー・ドメイン・メール込み', 'スマホ・タブレット対応', '公開後の軽微な修正は無料', '最短約2週間で公開'].map((text) => (
                <li key={text} className="flex items-start gap-2 font-bold"><span className={`shrink-0 w-5 h-5 grid place-items-center border-2 border-[#111] text-white ${service.bg}`}><Check className="w-3 h-3" strokeWidth={4} /></span>{text}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4 mt-7">
              <a href='/contact' className={button}>無料で相談・見積もり<ArrowRight className="w-4 h-4" strokeWidth={3} /></a>
              <a href="#plans" className={subButton}>料金プランを見る</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Ticker items={['初期費用0円', '月額4,800円〜', 'サーバー・ドメイン・メール込み', 'スマホ・タブレット対応', '公開後の更新もお任せ', '最短約2週間で公開']} tone="bg-svc-web text-white" className="-mb-4" />

    {/* 選ばれる理由：Web制作の色の地に、4つのコマ */}
    <section className="relative py-20 md:py-28 bg-svc-web comic-dots-light border-y-[4px] border-[#111] overflow-hidden">
      <div className="absolute inset-0 comic-speed [--speed:rgb(255_255_255/0.12)]" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="Why Arcle" enTone="bg-mustard text-[#111]" title={<>選ばれる<Mark>4つの理由</Mark></>} dark />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-5">
          {reasons.map((item, index) => (
            <article key={item.title} className={`group pop-reveal relative flex flex-col bg-[#FAF3E0] ${panel} ${index % 2 ? 'lg:rotate-[1deg]' : 'lg:-rotate-[1deg]'}`} style={{ animationDelay: `${index * 90}ms` }}>
              <div className="relative h-24 border-b-[4px] border-[#111] bg-white overflow-hidden">
                <span className="absolute inset-0 comic-rays opacity-90" style={index % 2 ? { '--ray-a': '#F2B544', '--ray-b': '#F6C35F' } as React.CSSProperties : webRays} aria-hidden="true" />
                <span className="absolute left-6 top-1/2 -translate-y-1/2">
                  <IconTile icon={<item.icon className="w-7 h-7" />} num={index + 1} bg={index % 2 ? service.bg : 'bg-[#111]'} className="pop-wiggle" />
                </span>
                <span className="absolute right-3 bottom-2 font-comic text-[34px] leading-none text-white [paint-order:stroke_fill] [-webkit-text-stroke:5px_#111] [text-shadow:3px_3px_0_#111]" aria-hidden="true">#{index + 1}</span>
              </div>
              <div className="p-6">
                <h3 className="font-manga text-[21px] md:text-[22px] leading-snug [word-break:auto-phrase]">{item.title}</h3>
                <p className="mt-3 text-sm text-sumi leading-[1.9]">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* 月額料金に含まれるもの：荷物をまとめて抱えたヒーローのコマ＋8つの小さなコマ */}
    <section className="py-20 md:py-28 comic-dots">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="All Included" title={<>月額料金に<Mark>含まれるもの</Mark></>} lead="どのプランでも、ホームページの運営に必要なものがそろっています。" enClass={service.text} center />
        <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-14 lg:gap-12 items-start">
          <div className="pop-reveal group relative w-full max-w-[400px] mx-auto mt-20 sm:mt-16 lg:mt-14 lg:sticky lg:top-32">
            <div className={`aspect-[5/4] -rotate-2 comic-rays ${panel}`} style={webRays} />
            <span className="absolute inset-0 -rotate-2 comic-focus opacity-50" aria-hidden="true" />
            <img src={comicIllust('web-bundle')} alt="" className="pop-tilt absolute left-1/2 bottom-[3%] h-[128%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom" loading="lazy" />
            <Burst text="ALL IN!" className="w-[96px] md:w-[112px] -bottom-8 -right-3" fill="#F2B544" core="#F07A5A" textClass="text-white text-[24px] md:text-[28px]" rotate={-10} delay={0.3} />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {included.map((item, index) => (
              <article key={item.title} className="group pop-reveal relative bg-white p-3.5 sm:p-6 border-[3px] border-[#111] shadow-[5px_5px_0_#111]" style={{ animationDelay: `${(index % 4) * 80}ms` }}>
                <span className={`pop-wiggle w-11 h-11 sm:w-12 sm:h-12 grid place-items-center text-white border-[3px] border-[#111] shadow-[3px_3px_0_#111] ${index % 2 ? 'rotate-6' : '-rotate-6'} ${index % 3 === 1 ? 'bg-[#111]' : service.bg}`}><item.icon className="w-5 h-5 sm:w-6 sm:h-6" /></span>
                <h3 className="mt-4 sm:mt-5 font-manga text-[14px] sm:text-[19px] leading-snug [word-break:auto-phrase]">{item.title.replace('お問い合わせ', 'お問い合わせ\u200b')}</h3>
                <p className="mt-2 text-[13px] sm:text-sm text-sumi leading-[1.8] sm:leading-[1.9]">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section id="plans" className="py-20 md:py-28 scroll-mt-20 bg-white border-y-[4px] border-[#111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="Pricing" title="料金プラン" lead="すべてのプランで初期費用0円です。" enClass={service.text} center />
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-6 items-stretch pt-4">
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
        {/* 運用おまかせプラン：上のプランと同じ値札を、横長のコマに */}
        <div className={`group pop-reveal relative mt-16 bg-[#FAF3E0] p-6 pt-10 md:p-10 md:pt-12 flex flex-col md:flex-row md:items-center gap-6 ${panel}`}>
          <span className="absolute inset-0 comic-dots opacity-40" aria-hidden="true" />
          <Caption className="absolute z-10 -top-4 left-4 md:left-6 -rotate-2">今あるホームページはそのままで</Caption>
          <div className="relative flex-1">
            <h3 className="font-manga text-[24px] md:text-[30px] leading-snug [word-break:auto-phrase]">運用おまかせプラン</h3>
            <p className="mt-3 text-sm text-sumi leading-[1.9]">他社で制作したホームページの更新・管理を引き継ぎます。サーバーやドメインの管理、文章・写真の差し替えまでまとめてお任せいただけます。</p>
          </div>
          <div className="pop-wiggle relative shrink-0 self-start md:self-center rotate-2 bg-white border-[3px] border-[#111] px-5 py-3 shadow-[5px_5px_0_#111]">
            <p className="flex items-baseline whitespace-nowrap"><span className="font-manga text-[15px] mr-1.5">月額</span><span className={`${bigNum} text-[56px]`}>4,800</span><span className="font-manga text-lg ml-1">円</span></p>
            <p className="text-xs font-bold text-sumi-muted mt-1">（税込 5,280円）</p>
          </div>
        </div>
        <div className="mt-7 space-y-2 text-xs font-bold text-sumi-muted leading-relaxed">
          <p>※最低契約期間は1年です。契約期間は1〜5年からお選びいただけます。</p>
          <p>※LP単体の制作や、予約・会員機能などのシステム連携は個別にお見積りします。</p>
        </div>
      </div>
    </section>

    {/* 作例：流れるコマの帯 */}
    <section className="relative py-20 md:py-28 bg-svc-web/10 comic-dots overflow-hidden">
      <div className="absolute inset-0 comic-speed [--speed:rgb(200_80_159/0.18)]" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="Samples" title="業種別の作例をご覧ください" lead="建設・介護・保育・教室・美容・飲食・士業など、さまざまな業種の作例をご用意しています。気に入ったデザインをもとに、御社の情報と写真でお作りします。" enClass={service.text} center />
      </div>
      <div className="relative -mx-[3vw] -rotate-1 bg-[#111] border-y-[4px] border-[#111]">
        <div className="marquee overflow-hidden bg-svc-web comic-dots-light">
          <ul className="marquee-track flex w-max gap-6 md:gap-8 pr-6 md:pr-8 py-7 md:py-9">
            {samples.map((s) => <SampleCard key={s.slug} sample={s} />)}
            {samples.map((s) => <SampleCard key={`${s.slug}-copy`} sample={s} hidden />)}
          </ul>
        </div>
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-5 mt-12 text-center">
        <a href="/samples" target="_blank" rel="noopener" className={button}>作例をすべて見る<ArrowRight className="w-4 h-4" strokeWidth={3} /></a>
        <p className="text-xs font-bold text-sumi-muted mt-6">※作例の会社名・人物・連絡先はすべて架空のものです。</p>
      </div>
    </section>

    {/* 比較：1つのコマの表。Arcle の列を太い枠で囲む */}
    <section className="py-20 md:py-28 bg-white comic-dots border-y-[4px] border-[#111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="Comparison" title="他の制作方法との比較" enClass={service.text} center />
        <div className="pop-reveal relative">
          <Burst text="VS!" className="w-[64px] md:w-[96px] -top-14 md:-top-10 right-1 md:-right-5" fill="#F07A5A" core="#F2B544" textClass="text-white text-[28px] md:text-[36px]" rotate={12} delay={0.3} />
          <div className={`overflow-x-auto bg-white ${panel}`} role="region" aria-label="制作方法の比較表（横にスクロールできます）" tabIndex={0}>
            <table className="w-full min-w-[720px] text-sm border-collapse">
              <thead><tr className="border-b-[4px] border-[#111]">
                <th scope="col" className="p-5 text-left w-1/4 font-manga bg-mustard">比較項目</th>
                <th scope="col" className={`p-5 w-1/4 border-x-[4px] border-[#111] font-comic font-normal text-[30px] leading-none tracking-[0.05em] text-white [paint-order:stroke_fill] [-webkit-text-stroke:5px_#111] [text-shadow:3px_3px_0_#111] ${service.bg}`}>Arcle</th>
                <th scope="col" className="p-5 w-1/4 font-manga text-sumi-muted bg-[#FAF3E0]">一般的な制作会社</th>
                <th scope="col" className="p-5 w-1/4 font-manga text-sumi-muted bg-[#FAF3E0] border-l-[3px] border-[#111]/15">格安の制作サービス</th>
              </tr></thead>
              <tbody>{comparison.map((row) => (
                <tr key={row.label} className="border-t-[3px] border-[#111]/15 first:border-t-0">
                  <th scope="row" className="p-5 text-left font-manga text-[14px] leading-snug bg-mustard/25">{row.label}</th>
                  <td className={`p-5 text-center font-bold border-x-[4px] border-[#111] ${service.tint} ${service.text}`}>{row.arcle}</td>
                  <td className="p-5 text-center text-sumi-muted">{row.general}</td>
                  <td className="p-5 text-center text-sumi-muted border-l-[3px] border-[#111]/15">{row.cheap}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
        <p className="mt-7 text-xs font-bold text-sumi-muted text-center">※他社の金額・内容は一般的な目安です。</p>
      </div>
    </section>

    {/* 公開までの流れ：打ち合わせのコマ＋番号付きの7つのコマ */}
    <section className="py-20 md:py-28 comic-dots">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="Flow" title="公開までの流れ" lead="ご契約までは費用はかかりません。" enClass={service.text} />
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-10 items-start">
          <div className="pop-reveal relative w-full max-w-md mx-auto lg:sticky lg:top-28">
            <div className={`relative aspect-[5/4] overflow-hidden -rotate-1 bg-white ${panel}`}>
              <img src={comicIllust('web-meeting')} alt="" className="absolute inset-0 w-full h-full object-cover object-bottom" loading="lazy" />
            </div>
            <Caption className="absolute -bottom-4 right-4 rotate-2 font-comic! tracking-[0.08em] text-[20px] md:text-[22px]">STEP BY STEP!</Caption>
          </div>
          <ol className="space-y-5">{flow.map((step, index) => (
            <li key={step.title} className={`group pop-reveal relative bg-white p-5 md:p-6 flex gap-4 md:gap-5 border-[3px] border-[#111] shadow-[5px_5px_0_#111] ${index % 2 ? 'md:ml-6' : 'md:mr-6'}`} style={{ animationDelay: `${index * 70}ms` }}>
              <span className={`pop-wiggle shrink-0 ${index % 2 ? 'rotate-6' : '-rotate-6'} w-14 h-14 flex flex-col items-center justify-center border-[3px] border-[#111] shadow-[3px_3px_0_#111] font-comic leading-none text-white ${index % 2 ? 'bg-coral' : service.bg}`}>
                <span className="text-[11px] tracking-[0.15em]">STEP</span>
                <span className="text-[28px] [paint-order:stroke_fill] [-webkit-text-stroke:4px_#111]">{index + 1}</span>
              </span>
              <div><h3 className="font-manga text-[19px] md:text-xl leading-snug [word-break:auto-phrase]">{step.title}</h3><p className="mt-2 text-sm text-sumi leading-[1.9]">{step.desc}</p></div>
            </li>
          ))}</ol>
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-white comic-dots border-y-[4px] border-[#111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="Area" title="対応エリア" lead="東海エリア（愛知・岐阜・三重）は訪問での打ち合わせにも対応します。オンライン打ち合わせなら全国どこからでもご依頼いただけます。" enClass={service.text} center />
        <ul className="max-w-3xl mx-auto flex flex-wrap justify-center gap-4">{areas.map((area, i) => (
          <li key={area} className={`pop-wiggle border-[3px] border-[#111] bg-[#FAF3E0] px-5 py-2.5 font-manga text-[17px] inline-flex items-center gap-2 shadow-[4px_4px_0_#111] ${i % 2 ? 'rotate-2' : '-rotate-2'}`}><MapPin className={`w-4 h-4 ${service.text}`} strokeWidth={3} />{area}</li>
        ))}</ul>
      </div>
    </section>

    {/* よくある質問：質問会のコマ＋質問のコマ */}
    <section className="py-20 md:py-28 comic-dots">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="FAQ" title="よくある質問" enClass={service.text} center />
        <div className={`pop-reveal relative max-w-4xl mx-auto mb-14 aspect-[3/2] md:aspect-[2/1] overflow-hidden bg-white ${panel}`} aria-hidden="true">
          <img src={comicIllust('web-faq')} alt="" className="absolute inset-0 w-full h-full object-cover object-[70%_12%]" loading="lazy" />
          <Bubble className="left-[4%] top-[7%] text-[22px] sm:text-[30px] md:text-[40px] tracking-[0.04em]" tailAt={78} lean={0.9} rotate={-4} delay={0.25}>
            ANY QUESTIONS?
          </Bubble>
        </div>
        <div className="max-w-3xl mx-auto space-y-5">{faqs.map((item, index) => (
          <details key={item.q} open={index === 0} className="group pop-reveal bg-white border-[3px] border-[#111] shadow-[5px_5px_0_#111] open:shadow-[5px_5px_0_#C8509F,8px_8px_0_#111]" style={{ animationDelay: `${Math.min(index, 4) * 60}ms` }}>
            <summary className="flex items-center gap-4 p-5 md:p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <span className={`pop-wiggle shrink-0 -rotate-6 w-10 h-10 grid place-items-center font-comic text-[26px] leading-none text-white border-[3px] border-[#111] shadow-[2px_2px_0_#111] [paint-order:stroke_fill] [-webkit-text-stroke:4px_#111] ${service.bg}`}>Q</span>
              <h3 className="flex-1 font-manga text-[16px] md:text-lg leading-snug [word-break:auto-phrase]">{item.q}</h3>
              <span className="shrink-0 w-8 h-8 grid place-items-center border-[3px] border-[#111] bg-mustard"><ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" strokeWidth={3} /></span>
            </summary>
            <div className="mx-5 md:mx-6 mb-6 pt-4 border-t-[3px] border-dashed border-[#111]/25 flex gap-4">
              <span className="shrink-0 rotate-6 w-10 h-10 grid place-items-center font-comic text-[26px] leading-none bg-mustard text-[#111] border-[3px] border-[#111]" aria-hidden="true">A</span>
              <p className="text-sm text-sumi leading-[2]">{item.a}</p>
            </div>
          </details>
        ))}</div>
      </div>
    </section>

    <ContactCta title={<>まずは、お見積りから<br />お気軽にどうぞ。</>} body="新規制作もリニューアルも、ご相談・お見積りは無料です。「どのプランが合うか分からない」という段階でも大丈夫です。" />
  </div>
);

export default WebNext;
