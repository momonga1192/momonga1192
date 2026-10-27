import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check } from 'lucide-react';
import { illust, services } from '../theme';
import { ContactCta, PageHeader, SectionHead } from '../parts';

// 事業ごとの料金の目安（既存の各事業ページの料金表より）
const prices: Record<string, string> = {
  josys: '月額5万円〜',
  data: '内容に合わせてお見積り',
  ai: '月額5万円〜',
  web: '月額4,800円〜'
};

const ServicesNext: React.FC = () => (
  <div className="bg-cream text-sumi">
    <Helmet>
      <title>サービス一覧 | 情シス代行・データ活用・生成AI・Web制作 - Arcle</title>
      <meta
        name="description"
        content="Arcleのサービス一覧。情シス代行・データ活用・生成AI活用・Web制作の4つのサービスで、IT担当者がいない中小企業のITをまとめて支援します。愛知県一宮市。"
      />
      <link rel="canonical" href="https://www.arcle.net/services" />
    </Helmet>

    <PageHeader
      en="Services"
      title={
        <>
          会社のITを、
          <br />
          4つのサービスでまるごと支える
        </>
      }
      lead="ひとつだけのご依頼も、まとめてのご依頼も歓迎です。どのサービスが合うかわからないときは、お困りごとから選ぶか、そのままご相談ください。"
      crumbs={[{ label: 'サービス' }]}
      image={illust('reason-onestop')}
    />

    {/* お悩みから選ぶ */}
    <section className="py-20 md:py-28 bg-white rounded-t-[48px] md:rounded-t-[80px]">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="Find Your Service" title="お困りごとから選ぶ" center />
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((s) => (
            <a key={s.key} href={`#${s.key}`} className="group flex items-center gap-5 rounded-[28px] border border-warm-line bg-cream p-4 pr-6 hover:shadow-[0_16px_40px_rgb(31_36_48/0.08)] transition-shadow">
              <span className={`shrink-0 w-24 h-24 rounded-full ${s.dot} overflow-hidden`}>
                <img src={illust(s.key === 'josys' ? 'worry-pc' : `worry-${s.key}`)} alt="" className="w-full h-full object-contain" loading="lazy" />
              </span>
              <span className="flex-1">
                <span className="block font-head font-bold leading-relaxed">{s.worry.replace('\n', '')}</span>
                <span className={`mt-2 inline-flex items-center gap-1 text-sm font-bold ${s.text}`}>
                  {s.name}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* 4つのサービス */}
    <section className="py-20 md:py-28 bg-cream-dark">
      <div className="max-w-6xl mx-auto px-5 space-y-8">
        {services.map((s, i) => (
          <article key={s.key} id={s.key} className="scroll-mt-24 grid lg:grid-cols-2 rounded-[40px] bg-white overflow-hidden">
            <div className={`relative ${s.tint} p-8 md:p-12 grid place-items-center ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <span className="absolute left-8 top-6 font-en text-[64px] font-bold leading-none text-white/80">0{i + 1}</span>
              <img src={illust(`svc-${s.key}`)} alt="" className="relative w-full max-w-[480px]" loading="lazy" />
            </div>
            <div className="p-8 md:p-12 flex flex-col">
              <p className={`font-en text-xs font-semibold tracking-[0.2em] uppercase ${s.text}`}>{s.en}</p>
              <h2 className="font-head text-[28px] md:text-[34px] font-bold mt-1">{s.name}</h2>
              <p className="mt-5 leading-[1.95] text-sumi-muted">{s.lead}</p>
              <ul className="mt-6 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full grid place-items-center ${s.tint}`}>
                      <Check className={`w-3.5 h-3.5 ${s.text}`} strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-warm-line flex flex-wrap items-center justify-between gap-4">
                <p>
                  <span className="text-xs text-sumi-muted block">料金の目安</span>
                  <span className="font-bold text-lg">{prices[s.key]}</span>
                </p>
                <a href={s.href} className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold ${s.bg} hover:opacity-90`}>
                  {s.name}を詳しく見る
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>

    {/* まとめて頼む */}
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
        <img src={illust('reason-small')} alt="" className="w-full max-w-[420px] justify-self-center" loading="lazy" />
        <div>
          <SectionHead
            en="One Stop"
            title="まとめて頼むと、ここが楽になります"
            lead="Arcleは、ITのことをひとつの窓口でお引き受けします。サービスをまたいだご相談でも、担当が変わったり、説明をくり返したりする必要はありません。"
          />
          <ul className="space-y-4 -mt-4">
            {[
              { title: '会社全体を見て、順番から考える', body: 'PC・データ・AI・Webのどこから手をつけるべきか、効果と費用のバランスで優先順位を一緒に決めます。' },
              { title: '仕組みがつながる', body: 'Microsoft 365の管理とデータの集計、ホームページの問い合わせ管理など、別々に作るとつながらない仕組みを最初から連携させます。' },
              { title: '相談先がひとつで済む', body: '「これは誰に聞けばいいのか」と迷うことがなくなります。小さな疑問も気軽にご相談ください。' }
            ].map((item, i) => (
              <li key={item.title} className="flex gap-4 rounded-[24px] bg-white border border-warm-line p-5">
                <span className="shrink-0 w-9 h-9 rounded-full bg-mustard grid place-items-center font-en font-bold">{i + 1}</span>
                <span>
                  <span className="block font-head font-bold text-lg">{item.title}</span>
                  <span className="block mt-1 text-[15px] leading-[1.9] text-sumi-muted">{item.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <ContactCta />
  </div>
);

export default ServicesNext;
