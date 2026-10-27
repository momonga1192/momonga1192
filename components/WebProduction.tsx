import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Check,
  ArrowRight,
  Minus,
  Wallet,
  Server,
  RefreshCw,
  Headphones,
  Smartphone,
  Mail,
  Globe,
  FileText,
  ShieldCheck,
  BarChart3,
  MessageSquare,
  Newspaper,
  HelpCircle,
  ChevronDown,
  MapPin
} from 'lucide-react';

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

const areas = ['一宮市', '稲沢市', '江南市', '岩倉市', '北名古屋市', '清須市', '小牧市', '犬山市', '名古屋市', '岐阜市', '羽島市', '各務原市'];

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
    a: '制作費のお支払いが済んでいれば、ホームページのデータをお渡しします。ご自身で用意したサーバー・ドメインへ移して、御社のホームページとしてそのまま使い続けることができます。なお、デザインやプログラムの著作権は当社に帰属します。'
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

const WebProduction: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            entry.target.classList.remove('reveal-hidden');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal-hidden').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="pt-24 pb-20 bg-white">
      <Helmet>
        <title>月額制ホームページ制作 | 初期費用0円・月額4,800円〜 - Arcle</title>
        <meta name="description" content="愛知県一宮市のArcleの月額制ホームページ制作。初期費用0円、月額4,800円（税抜）から。サーバー・ドメイン・独自ドメインのメール・スマホ対応・公開後の更新まで込み。一宮市・稲沢市・江南市など尾張エリアは訪問打ち合わせにも対応します。" />
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
          "provider": { "@type": "Organization", "name": "Arcle" },
          "description": "初期費用0円・月額4,800円から。サーバー・ドメイン・メール・スマホ対応・公開後の更新まで込みのホームページ制作",
          "areaServed": areas.map((name) => ({ "@type": "City", "name": name })),
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

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-teal-50/50 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-green-50/80 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-7/12 text-left reveal-hidden transition-all duration-1000 ease-out">
              <span className="inline-block py-1 px-3 rounded-full bg-teal-50 text-teal-600 text-xs font-en font-semibold tracking-widest uppercase mb-6 border border-teal-100">
                Web Production
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.2] tracking-tight">
                ホームページは、
                <span className="block mt-2">
                  <span className="text-teal-600">月額制</span>でつくる時代へ。
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed">
                初期費用0円、月額4,800円から。<br className="hidden md:block" />
                制作からサーバー・ドメイン・メール、公開後の更新まで、<br className="hidden md:block" />
                ホームページのことはまるごとArcleにお任せください。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/contact" className="group inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-teal-600 transition-all duration-300 shadow-lg hover:shadow-teal-500/30">
                  <span className="mr-2">無料で相談・見積もり</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#plans" className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-all duration-300">
                  料金プランを見る
                </a>
              </div>
            </div>
            <div className="w-full lg:w-5/12 reveal-hidden transition-all duration-1000 delay-300 ease-out">
              <div className="relative">
                <div className="absolute inset-0 bg-teal-400 rounded-3xl blur-2xl opacity-10" />
                <div className="relative rounded-3xl bg-white border border-gray-100 shadow-2xl p-8 md:p-10">
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="rounded-2xl bg-teal-50 p-5 text-center">
                      <p className="text-xs font-bold text-teal-700 mb-2">初期費用</p>
                      <p className="text-4xl font-bold text-gray-900">0<span className="text-lg ml-1">円</span></p>
                    </div>
                    <div className="rounded-2xl bg-teal-50 p-5 text-center">
                      <p className="text-xs font-bold text-teal-700 mb-2">月額</p>
                      <p className="text-4xl font-bold text-gray-900">4,800<span className="text-lg ml-1">円〜</span></p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {['サーバー・ドメイン・メール込み', 'スマホ・タブレット対応', '公開後の軽微な修正は無料', '最短約2週間で公開'].map((item) => (
                      <li key={item} className="flex items-center text-gray-700">
                        <Check className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-400 mt-6">※月額は税抜です（税込5,280円〜）。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Points Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 reveal-hidden">
            <span className="text-teal-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Point</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">選ばれる4つの理由</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Wallet, title: '初期費用0円', desc: '数十万円の制作費をまとめて払う必要はありません。月々の定額で、無理なくホームページを持てます。' },
              { icon: Server, title: '必要なものは全部込み', desc: 'サーバー、ドメイン、独自ドメインのメール、スマホ対応、セキュリティ対策まで月額に含まれます。' },
              { icon: RefreshCw, title: '公開後の更新もお任せ', desc: '文章や写真の差し替え、お知らせの掲載などの軽微な修正は、追加費用なしで対応します。' },
              { icon: Headphones, title: 'IT全般の相談窓口に', desc: '情シス代行も手がけるArcleなら、メールやPC、Microsoft 365のお困りごともまとめてご相談いただけます。' }
            ].map((item, index) => (
              <div key={item.title} className="bg-white rounded-3xl p-8 border border-gray-100 reveal-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <span className="text-sm font-en font-bold text-gray-300">0{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Included Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal-hidden">
            <span className="text-teal-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">All Included</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">月額料金に含まれるもの</h2>
            <p className="text-gray-500">どのプランでも、ホームページの運営に必要なものがそろっています。</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {included.map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-100 p-5 md:p-6 reveal-hidden">
                <item.icon className="w-7 h-7 text-teal-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="plans" className="py-32 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-teal-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">料金プラン</h2>
            <p className="text-gray-500">すべてのプランで初期費用0円です。</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative p-8 rounded-3xl reveal-hidden transition-all duration-500 flex flex-col ${plan.recommended ? 'bg-gray-900 text-white shadow-2xl md:scale-105 z-10' : 'bg-white border border-gray-100 text-gray-900 hover:border-gray-300'}`}>
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                    おすすめ
                  </div>
                )}
                <div className="mb-8 text-center">
                  <h3 className={`text-3xl font-en font-bold mb-2 ${plan.recommended ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                  <p className={`text-sm font-bold ${plan.recommended ? 'text-gray-400' : 'text-gray-500'}`}>{plan.sub}</p>
                  <p className={`text-xs mt-2 ${plan.recommended ? 'text-gray-500' : 'text-gray-400'}`}>{plan.desc}</p>
                  <p className={`text-xs mt-6 ${plan.recommended ? 'text-gray-400' : 'text-gray-500'}`}>初期費用 0円</p>
                  <p className={`mt-1 ${plan.recommended ? 'text-white' : 'text-gray-900'}`}>
                    <span className="text-sm mr-1">月額</span>
                    <span className="text-4xl font-bold">{plan.price.toLocaleString()}</span>
                    <span className="text-sm ml-1">円</span>
                  </p>
                  <p className={`text-xs mt-1 ${plan.recommended ? 'text-gray-500' : 'text-gray-400'}`}>（税込 {withTax(plan.price)}円）</p>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${plan.recommended ? 'text-teal-400' : 'text-teal-600'}`} />
                      <span className={`text-sm font-medium ${plan.recommended ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className={`text-xs text-center mb-4 ${plan.recommended ? 'text-gray-400' : 'text-gray-500'}`}>公開までの目安：{plan.term}</p>
                <a href="/contact" className={`inline-block w-full text-center py-4 rounded-xl font-bold text-sm transition-all duration-300 ${plan.recommended ? 'bg-teal-600 text-white hover:bg-teal-500' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}>
                  このプランで相談する
                </a>
              </div>
            ))}
          </div>

          <div className="max-w-6xl mx-auto mt-12 rounded-3xl bg-white border border-gray-100 p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 reveal-hidden">
            <div className="flex-1">
              <p className="text-xs font-bold text-teal-600 mb-2">今あるホームページはそのままで</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">運用おまかせプラン</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                他社で制作したホームページの更新・管理を引き継ぎます。サーバーやドメインの管理、文章・写真の差し替えまでまとめてお任せいただけます。
              </p>
            </div>
            <div className="md:text-right shrink-0">
              <p className="text-gray-900">
                <span className="text-sm mr-1">月額</span>
                <span className="text-3xl font-bold">4,800</span>
                <span className="text-sm ml-1">円</span>
              </p>
              <p className="text-xs text-gray-400">（税込 5,280円）</p>
            </div>
          </div>

          <div className="text-center mt-12 reveal-hidden space-y-2">
            <p className="text-gray-400 text-xs">※最低契約期間は1年です。契約期間は1〜5年からお選びいただけます。</p>
            <p className="text-gray-400 text-xs">※LP単体の制作や、予約・会員機能などのシステム連携は個別にお見積りします。</p>
          </div>
        </div>
      </section>

      {/* Samples Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="rounded-3xl bg-gray-900 text-white px-8 py-12 md:px-14 md:py-14 flex flex-col md:flex-row md:items-center gap-8 reveal-hidden">
            <div className="flex-1">
              <span className="text-teal-400 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Samples</span>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">業種別の作例をご覧ください</h2>
              <p className="text-gray-400 leading-relaxed">
                建設・介護・保育・教室・美容・飲食・士業など、11件の作例をご用意しています。
                <br className="hidden md:block" />
                気に入ったデザインをもとに、御社の情報と写真でお作りします。
              </p>
              <p className="text-xs text-gray-500 mt-4">※作例の会社名・人物・連絡先はすべて架空のものです。</p>
            </div>
            <a
              href="/samples"
              className="group shrink-0 inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-teal-50 transition-colors"
            >
              作例を見る
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal-hidden">
            <span className="text-teal-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Comparison</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">他の制作方法との比較</h2>
          </div>
          <div className="max-w-5xl mx-auto overflow-x-auto reveal-hidden">
            <table className="w-full min-w-[640px] text-sm border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="w-1/4" />
                  <th className="w-1/4 bg-teal-600 text-white font-bold py-4 px-4 rounded-t-2xl">Arcle</th>
                  <th className="w-1/4 text-gray-500 font-bold py-4 px-4">一般的な制作会社</th>
                  <th className="w-1/4 text-gray-500 font-bold py-4 px-4">格安の制作サービス</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, index) => {
                  const last = index === comparison.length - 1;
                  return (
                    <tr key={row.label}>
                      <th className="text-left font-bold text-gray-900 py-4 px-4 border-t border-gray-100">{row.label}</th>
                      <td className={`text-center font-bold text-teal-700 bg-teal-50 py-4 px-4 border-t border-teal-100 ${last ? 'rounded-b-2xl' : ''}`}>{row.arcle}</td>
                      <td className="text-center text-gray-600 py-4 px-4 border-t border-gray-100">{row.general}</td>
                      <td className="text-center text-gray-600 py-4 px-4 border-t border-gray-100">
                        {row.cheap === '対象外' ? <Minus className="w-4 h-4 text-gray-300 mx-auto" aria-label="対象外" /> : row.cheap}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-400 text-xs mt-8 reveal-hidden">※他社の金額・内容は一般的な目安です。</p>
        </div>
      </section>

      {/* Flow Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal-hidden">
            <span className="text-teal-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Flow</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">公開までの流れ</h2>
            <p className="text-gray-500">ご契約までは費用はかかりません。</p>
          </div>
          <ol className="max-w-3xl mx-auto space-y-4">
            {flow.map((step, index) => (
              <li key={step.title} className="flex gap-5 bg-white rounded-2xl border border-gray-100 p-6 reveal-hidden">
                <span className="shrink-0 w-10 h-10 rounded-full bg-teal-600 text-white font-en font-bold flex items-center justify-center">{index + 1}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Area Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center reveal-hidden">
          <span className="text-teal-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">Area</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">対応エリア</h2>
          <p className="text-gray-500 mb-10 leading-relaxed">
            一宮市を拠点に、尾張エリアと岐阜県南部は訪問での打ち合わせにも対応します。<br className="hidden md:block" />
            オンライン打ち合わせなら全国どこからでもご依頼いただけます。
          </p>
          <ul className="flex flex-wrap justify-center gap-3">
            {areas.map((area) => (
              <li key={area} className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-sm text-gray-700">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                {area}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 reveal-hidden">
            <span className="text-teal-600 font-en tracking-widest text-xs font-bold uppercase mb-3 block">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">よくある質問</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((item, index) => (
              <div key={item.q} className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:border-teal-200">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center">
                    <HelpCircle className="w-5 h-5 text-teal-600 mr-3 flex-shrink-0" />
                    <span className="font-bold text-gray-900">{item.q}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 pl-14">
                    <p className="text-gray-600 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10 reveal-hidden">
          <FileText className="w-10 h-10 text-teal-600 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            まずは、お見積りから<br />
            お気軽にどうぞ。
          </h2>
          <p className="text-gray-500 mb-12 max-w-xl mx-auto">
            新規制作もリニューアルも、ご相談・お見積りは無料です。<br />
            「どのプランが合うか分からない」という段階でも大丈夫です。
          </p>
          <a href="/contact" className="group inline-flex items-center px-10 py-5 bg-teal-600 text-white rounded-full font-bold text-lg hover:bg-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
            無料で相談する
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default WebProduction;
