import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check } from 'lucide-react';
import { illust, prices, services } from '../theme';
import { ContactCta, Mark, PageHeader, SectionHead, Ticker, card, press } from '../parts';

const ServicesNext: React.FC = () => (
  <div className="bg-cream text-sumi overflow-x-clip">
    <Helmet>
      <title>サービス一覧 | 愛知・東海の中小企業のIT支援 - Arcle</title>
      <meta
        name="description"
        content="Arcleのサービス一覧。情シス代行・データ活用・生成AI活用・Web制作の4つのサービスで、IT担当者がいない愛知・東海の中小企業のITをまとめて支援します。"
      />
      <link rel="canonical" href="https://www.arcle.net/services" />
    </Helmet>

    <PageHeader
      en="Services"
      title={
        <>
          会社のITを、
          <br />
          4つのサービスで<Mark>まるごと</Mark>支える
        </>
      }
      lead="ひとつだけのご依頼も、まとめてのご依頼も歓迎です。どのサービスが合うかわからないときは、お困りごとから選ぶか、そのままご相談ください。"
      crumbs={[{ label: 'サービス' }]}
      image={illust('reason-onestop')}
    />

    {/* お悩みから選ぶ */}
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead en="Find Your Service" title="お困りごとから選ぶ" center />
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <a key={s.key} href={`#${s.key}`} className={`group pop-reveal flex items-center gap-5 rounded-[28px] bg-cream p-4 pr-6 ${card} ${press}`} style={{ animationDelay: `${i * 90}ms` }}>
              <span className={`pop-wiggle shrink-0 w-24 h-24 rounded-[20px] border-2 border-sumi ${s.tint} overflow-hidden -rotate-3`}>
                <img src={illust(s.key === 'josys' ? 'worry-pc' : `worry-${s.key}`)} alt="" className="pop-tilt w-full h-full object-contain p-1" loading="lazy" />
              </span>
              <span className="flex-1">
                <span className="block font-head font-black text-lg md:text-xl leading-relaxed [word-break:auto-phrase]">{s.worry.replace('\n', '')}</span>
                <span className={`mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-white ${s.bg}`}>
                  {s.name}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>

    <Ticker items={[...services.map((s) => s.name), 'ご相談・お見積り無料']} className="-my-4" />

    {/* 4つのサービス */}
    <section className="py-20 md:py-28 bg-cream bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px]">
      <div className="max-w-6xl mx-auto px-5 space-y-12">
        {services.map((s, i) => (
          <article key={s.key} id={s.key} className={`group pop-reveal scroll-mt-24 grid lg:grid-cols-2 rounded-[40px] bg-white overflow-hidden ${card}`}>
            <div className={`relative ${s.bg} p-8 md:p-12 grid place-items-center border-b-[2.5px] lg:border-b-0 border-sumi ${i % 2 === 1 ? 'lg:order-2 lg:border-l-[2.5px]' : 'lg:border-r-[2.5px]'}`}>
              <span className="pop-wiggle absolute left-6 top-5 z-10 -rotate-6 rounded-xl bg-white px-3 py-0.5 font-en text-2xl font-black italic border-[2.5px] border-sumi shadow-[3px_3px_0_#1F2430]">0{i + 1}</span>
              <img src={illust(`svc-${s.key}`)} alt="" className={`${i % 2 ? 'pop-tilt-r' : 'pop-tilt'} relative w-full max-w-[480px] mt-6`} loading="lazy" />
            </div>
            <div className="p-8 md:p-12 flex flex-col">
              <p className={`font-en text-xs font-bold tracking-[0.2em] uppercase ${s.text}`}>{s.en}</p>
              <h2 className="font-head text-[32px] md:text-[42px] font-black leading-tight mt-1">{s.name}</h2>
              <p className="mt-5 leading-[1.95] text-sumi-muted">{s.lead}</p>
              <ul className="mt-6 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <span className={`shrink-0 w-6 h-6 rounded-full grid place-items-center border-2 border-sumi text-white ${s.bg}`}>
                      <Check className="w-3.5 h-3.5" strokeWidth={3.5} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t-2 border-dashed border-warm-line flex flex-wrap items-center justify-between gap-4">
                <p>
                  <span className="text-xs text-sumi-muted block">料金の目安</span>
                  <span className={`font-head font-black text-2xl md:text-[28px] ${s.text}`}>{prices[s.key]}</span>
                </p>
                <a href={s.href} className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold border-[2.5px] border-sumi shadow-[4px_4px_0_#1F2430] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1F2430] ${s.bg}`}>
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
        <img src={illust('reason-small')} alt="" className="pop-float pop-tilt w-full max-w-[420px] justify-self-center" loading="lazy" />
        <div>
          <SectionHead
            en="One Stop"
            title={<>まとめて頼むと、ここが<Mark>楽になります</Mark></>}
            lead="Arcleは、ITのことをひとつの窓口でお引き受けします。サービスをまたいだご相談でも、担当が変わったり、説明をくり返したりする必要はありません。"
          />
          <ul className="space-y-5 -mt-4">
            {[
              { title: '会社全体を見て、順番から考える', body: 'PC・データ・AI・Webのどこから手をつけるべきか、効果と費用のバランスで優先順位を一緒に決めます。' },
              { title: '仕組みがつながる', body: 'Microsoft 365の管理とデータの集計、ホームページの問い合わせ管理など、別々に作るとつながらない仕組みを最初から連携させます。' },
              { title: '相談先がひとつで済む', body: '「これは誰に聞けばいいのか」と迷うことがなくなります。小さな疑問も気軽にご相談ください。' }
            ].map((item, i) => (
              <li key={item.title} className={`group pop-reveal flex gap-4 rounded-[24px] bg-white p-5 ${card}`} style={{ animationDelay: `${i * 90}ms` }}>
                <span className="pop-wiggle shrink-0 -rotate-12 w-10 h-10 rounded-full bg-coral text-white grid place-items-center font-en font-black italic text-lg border-2 border-sumi shadow-[3px_3px_0_#1F2430]">{i + 1}</span>
                <span>
                  <span className="block font-head font-black text-xl md:text-2xl leading-snug">{item.title}</span>
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
