import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, MapPin } from 'lucide-react';
import { illust, serviceByName, services } from './theme';
import { Mark, SectionHead, Sparkle, Sticker, Ticker, card, press } from './parts';
import { publishedWorks } from '../works/worksData';
import { articles } from '../articles/ArticlesIndex';

// トップページのポップ版（太い輪郭線・ずらした影・ステッカー風のラベル・枠からはみ出すイラスト）
const ticker = ['情シス代行', 'データ活用', '生成AI活用', 'Web制作', 'ご相談・お見積り無料', '東海エリアは訪問対応'];

const HomePop: React.FC = () => {
  const cases = publishedWorks.slice(0, 3);

  return (
    <div className="bg-cream text-sumi overflow-x-clip">
      <Helmet>
        <title>Arcle（アークル）| 愛知・東海の中小企業のIT支援 - 情シス代行・データ活用・生成AI・Web制作</title>
        <meta
          name="description"
          content="Arcle（アークル）は、愛知・東海エリアの中小企業の「IT部門」として、情シス代行、データ活用（Power BI・Tableau）、生成AI活用、月額制のホームページ制作をまとめて支援します。ご相談・お見積りは無料です。"
        />
        <link rel="canonical" href="https://www.arcle.net/" />
      </Helmet>

      {/* ヒーロー */}
      <section className="relative bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px]">
        <div className="relative max-w-6xl mx-auto px-5 pt-12 pb-24 md:pt-16 md:pb-32 grid lg:grid-cols-[1fr_1.1fr] gap-20 lg:gap-6 items-center">
          <div className="relative z-10">
            {/* 画像がかぶっても読めるよう、見出しの文字に白いふちを付ける */}
            <h1 className="font-head font-black [paint-order:stroke_fill] [-webkit-text-stroke:7px_#FAF8F4] text-[25px] leading-[1.6] sm:text-[38px] lg:text-[34px] xl:text-[38px] lg:leading-[1.5] tracking-[0.02em] [word-break:auto-phrase]">
              <span className="inline-block">会社のITの「困った」を、</span>
              <br />
              <span className="inline-block">
                <span className="relative inline-block -rotate-2 mx-1 px-2 rounded-xl bg-svc-web text-white [-webkit-text-stroke:0] border-[2.5px] border-sumi shadow-[4px_4px_0_#F2B544]">まるごと</span>
                相談できる場所。
              </span>
            </h1>
            <p className="mt-7 max-w-xl rounded-2xl bg-white px-5 py-4 text-[15px] md:text-[16px] leading-[1.95] text-sumi border-2 border-sumi shadow-[4px_4px_0_#1F2430]">
              PCやネットワークの管理から、データの見える化、生成AIの活用、ホームページまで。IT担当者がいない中小企業の「IT部門」として、まとめてお手伝いします。
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="/contact" className={`relative inline-flex items-center gap-2 px-7 py-4 rounded-full bg-sumi text-white font-bold border-[2.5px] border-sumi shadow-[5px_5px_0_#F2B544] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_#F2B544]`}>
                無料で相談する
                <ArrowRight className="w-4 h-4" />
                <span className="pop-float absolute -top-7 -right-6 grid place-items-center w-14 h-14 rounded-full bg-coral text-white font-head font-black text-[12px] leading-tight text-center border-[2.5px] border-sumi shadow-[3px_3px_0_#1F2430] [--r:12deg] rotate-[12deg]" aria-hidden="true">
                  相談
                  <br />
                  無料!
                </span>
              </a>
              <a href="#services" className={`inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white font-bold ${card} shadow-[5px_5px_0_#1F2430] ${press}`}>
                サービスを見る
              </a>
            </div>
          </div>

          {/* 濃紺のカードから、イラストを上にはみ出させる */}
          <div className="group relative mt-16 lg:mt-36 lg:mb-10">
            <div className={`relative rounded-[36px] aspect-[16/11] bg-[radial-gradient(circle_at_15%_100%,rgb(30_156_140/0.6),transparent_55%),radial-gradient(circle_at_100%_0%,rgb(242_181_68/0.35),transparent_50%)] bg-sumi ${card}`} />
            <img
              src={illust('hero')}
              alt="Arcleのスタッフと中小企業の社員が、PC・データ・AI・Webでつながっているイラスト"
              className="pop-tilt absolute left-1/2 -bottom-[8%] lg:-bottom-[12%] w-[124%] lg:w-[128%] xl:w-[150%] max-w-none -translate-x-1/2 lg:-translate-x-[58%] xl:-translate-x-[57%] drop-shadow-[0_12px_18px_rgb(0_0_0/0.25)]"
            />
            <span className="pop-float absolute -right-2 bottom-[-18px] rounded-2xl bg-white px-4 py-2 font-head font-bold text-sm border-[2.5px] border-sumi shadow-[4px_4px_0_#1F2430] rotate-[4deg] [animation-delay:-2s]">
              <MapPin className="inline w-4 h-4 -mt-0.5 mr-1 text-coral" strokeWidth={2.5} />
              東海エリアは訪問対応
            </span>
            <Sparkle className="absolute -top-8 right-[12%] w-9 h-9 text-mustard" />
            <Sparkle className="absolute top-[18%] -right-5 w-6 h-6 text-svc-web" />
          </div>
        </div>
      </section>

      {/* 流れるテープ */}
      <Ticker items={ticker} className="-my-4" />

      {/* お悩みから選ぶ */}
      <section className="pt-28 pb-20 md:pt-36 md:pb-28 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <SectionHead en="Your Concerns" title={<>こんな<Mark>お困りごと</Mark>はありませんか？</>} lead="当てはまるものから、ぴったりのサービスをご覧いただけます。" center />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((s, i) => (
              <a key={s.key} href={s.href} style={{ animationDelay: `${i * 90}ms` }} className={`pop-reveal group flex flex-col rounded-[24px] bg-cream p-3 sm:p-5 ${card} ${press} ${i % 2 ? 'lg:rotate-[1deg]' : 'lg:-rotate-[1deg]'}`}>
                <div className={`relative aspect-square rounded-[18px] border-2 border-sumi ${s.tint} overflow-hidden`}>
                  <img src={illust(s.key === 'josys' ? 'worry-pc' : `worry-${s.key}`)} alt="" className="absolute inset-0 w-full h-full object-contain p-2 pop-tilt" loading="lazy" />
                </div>
                {/* 吹き出し */}
                <p className="relative mt-5 flex-1 rounded-2xl bg-white border-2 border-sumi p-3 sm:p-4 font-head font-bold text-[13px] sm:text-[15px] leading-relaxed [word-break:auto-phrase] before:absolute before:-top-[9px] before:left-6 before:w-4 before:h-4 before:rotate-45 before:bg-white before:border-l-2 before:border-t-2 before:border-sumi">
                  {s.worry.replace('\n', '')}
                </p>
                <p className={`mt-4 flex items-center justify-between rounded-full px-3 sm:px-4 py-2 font-bold text-xs sm:text-sm text-white ${s.bg}`}>
                  <span>
                    {s.name}
                    <span className="hidden sm:inline">で解決</span>
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* サービス */}
      <section id="services" className="py-20 md:py-28 bg-cream scroll-mt-16 bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px]">
        <div className="max-w-6xl mx-auto px-5">
          <SectionHead
            en="Services"
            title={
              <>
                4つのサービスで、
                <br className="sm:hidden" />
                会社のITをまるごと支える
              </>
            }
            lead="ひとつだけのご依頼も、まとめてのご依頼も歓迎です。窓口がひとつなので、「どこに頼めばいいか」で迷いません。"
          />
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-20 md:gap-y-24 pt-12">
            {services.map((s, i) => (
              <article key={s.key} style={{ animationDelay: `${(i % 2) * 120}ms` }} className={`pop-reveal group relative flex flex-col rounded-[32px] bg-white ${card} ${press}`}>
                <div className={`relative h-44 md:h-52 rounded-t-[29px] border-b-[2.5px] border-sumi ${s.bg}`}>
                  <span className="pop-wiggle absolute left-6 top-5 -rotate-6 rounded-xl bg-white px-3 py-0.5 font-en text-2xl font-black italic border-[2.5px] border-sumi shadow-[3px_3px_0_#1F2430]">0{i + 1}</span>
                  <img
                    src={illust(`svc-${s.key}`)}
                    alt=""
                    className="absolute right-2 bottom-0 w-[78%] max-h-[150%] object-contain object-bottom pop-tilt"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col flex-1 p-7 md:p-8">
                  <p className={`font-en text-xs font-bold tracking-[0.2em] uppercase ${s.text}`}>{s.en}</p>
                  <h3 className="font-head text-[28px] md:text-[32px] font-black leading-tight mt-1">{s.name}</h3>
                  <p className="mt-4 text-[15px] leading-[1.9] text-sumi-muted">{s.lead}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.points.map((p) => (
                      <li key={p} className={`text-[13px] font-bold px-3 py-1 rounded-full border-2 ${s.border} ${s.tint} ${s.text}`}>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a href={s.href} className={`mt-auto pt-7 inline-flex items-center gap-2 font-bold ${s.text} after:absolute after:inset-0 after:content-['']`}>
                    {s.name}について詳しく
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 選ばれる理由（バナーと同じ濃紺の面） */}
      <section className="relative py-20 md:py-28 bg-sumi bg-[radial-gradient(circle_at_0%_100%,rgb(30_156_140/0.45),transparent_45%),radial-gradient(circle_at_100%_0%,rgb(242_181_68/0.25),transparent_40%)] border-y-[2.5px] border-sumi">
        <Sparkle className="absolute left-[8%] top-16 w-8 h-8 text-mustard" />
        <Sparkle className="absolute right-[10%] bottom-20 w-6 h-6 text-svc-web" />
        <div className="max-w-6xl mx-auto px-5">
          <SectionHead en="Why Arcle" title={<>Arcleが選ばれる<Mark className="bg-svc-josys">3つの理由</Mark></>} center dark />
          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {[
              { img: 'reason-local', title: '東海エリアなら、駆けつけます', body: '東海エリアのお客さまには訪問で対応します。顔の見える距離だから、ちょっとしたことも気軽に相談できます。' },
              { img: 'reason-onestop', title: 'ITのことを、ひとつの窓口で', body: 'PC・データ・AI・Webを別々の会社に頼む必要はありません。会社全体を見渡したうえで、優先順位から一緒に考えます。' },
              { img: 'reason-small', title: '小さく始めて、一緒に育てる', body: '最初から大きな投資は必要ありません。まずは困りごとをひとつ解決するところから始め、成果を見ながら広げていきます。' }
            ].map((r, i) => (
              <div key={r.title} style={{ animationDelay: `${i * 120}ms` }} className="pop-reveal group relative rounded-[28px] bg-cream p-7 pt-6 border-[2.5px] border-sumi shadow-[6px_6px_0_#F2B544]">
                <span className="pop-wiggle absolute -top-5 -left-3 -rotate-12 grid place-items-center w-14 h-14 rounded-full bg-coral text-white font-en font-black italic text-2xl border-[2.5px] border-sumi shadow-[3px_3px_0_#1F2430]">{i + 1}</span>
                <img src={illust(r.img)} alt="" className={`mx-auto w-48 h-48 object-contain ${i % 2 ? 'pop-tilt-r' : 'pop-tilt'}`} loading="lazy" />
                <h3 className="font-head text-[22px] font-black leading-snug mt-4 text-center [word-break:auto-phrase]">{r.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.9] text-sumi-muted">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 支援モデルケース */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <SectionHead en="Model Cases" title="支援モデルケース" lead="中小企業によくあるご相談をもとに、Arcleならどう支援するかをまとめました。" />
            <a href="/works" className={`md:mb-16 self-start md:self-auto shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-bold border-2 border-sumi shadow-[3px_3px_0_#1F2430] ${press} hover:shadow-[0_0_0_#1F2430]`}>
              すべて見る
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {cases.map((w, i) => {
              const s = serviceByName(w.service) ?? services[0];
              const metric = w.metrics[0];
              return (
                <a key={w.slug} href={`/works/${w.slug}`} style={{ animationDelay: `${i * 100}ms` }} className={`pop-reveal group flex flex-col rounded-[28px] bg-cream p-7 ${card} ${press}`}>
                  <span className={`pop-wiggle self-start -rotate-3 text-xs font-bold px-3 py-1 rounded-lg text-white border-2 border-sumi ${s.bg}`}>{w.service}</span>
                  <h3 className="font-head text-xl font-black leading-snug mt-4 flex-1 [word-break:auto-phrase]">{w.title}</h3>
                  {metric && (
                    <p className="mt-5 rounded-2xl bg-white px-4 py-3 text-sm border-2 border-sumi">
                      <span className="block text-xs text-sumi-muted">{metric.label}（想定）</span>
                      <span className="text-sumi-muted">{metric.before}</span>
                      <span className="mx-2">→</span>
                      <span className={`font-head font-black text-2xl ${s.text}`}>{metric.after}</span>
                    </p>
                  )}
                  <p className="mt-4 text-xs text-sumi-muted">
                    {w.industry}｜{w.region}
                  </p>
                </a>
              );
            })}
          </div>
          <p className="mt-6 text-xs text-sumi-muted">※掲載しているのは、よくあるご相談をもとにした架空のモデルケースです。</p>
        </div>
      </section>

      {/* お問い合わせとお役立ち記事 */}
      <section className="py-20 md:py-28 bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px]">
        <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-[1.4fr_1fr] gap-8">
          <div className={`relative overflow-hidden rounded-[40px] bg-sumi text-white p-10 md:p-14 bg-[radial-gradient(circle_at_10%_100%,rgb(30_156_140/0.55),transparent_50%),radial-gradient(circle_at_100%_0%,rgb(242_181_68/0.3),transparent_45%)] ${card}`}>
            <Sparkle className="absolute right-10 top-10 w-10 h-10 text-mustard" />
            <Sparkle className="absolute right-24 top-24 w-5 h-5 text-svc-web" />
            <span className="pop-float absolute right-8 bottom-8 hidden md:grid place-items-center w-24 h-24 rounded-full bg-coral text-white font-head font-black text-[17px] leading-tight text-center border-[2.5px] border-sumi shadow-[4px_4px_0_#F2B544] rotate-[10deg]" aria-hidden="true">
              相談
              <br />
              無料!
            </span>
            <Sticker className="font-en text-sm font-black italic tracking-[0.12em] uppercase">Contact</Sticker>
            <h2 className="font-head text-[26px] md:text-[34px] font-black leading-snug mt-5 [word-break:auto-phrase]">
              「何から相談すればいいか
              <br className="hidden md:block" />
              わからない」でも大丈夫です。
            </h2>
            <p className="mt-5 text-white/75 leading-[1.9] max-w-lg">
              いまの困りごとをお聞きして、やるべきことの順番から一緒に整理します。ご相談・お見積りは無料です。
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4 relative">
              <a href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-mustard text-sumi font-black border-[2.5px] border-sumi shadow-[5px_5px_0_#1E9C8C] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_#1E9C8C]">
                無料で相談する
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/flow" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-white/50 font-bold hover:border-white hover:bg-white/10 transition-colors">
                ご相談の流れを見る
              </a>
            </div>
          </div>
          <div className={`rounded-[40px] bg-white p-8 md:p-10 ${card}`}>
            <div className="flex items-center justify-between">
              <p className="font-head text-xl font-black">お役立ち記事</p>
              <a href="/articles" className="text-sm font-bold text-svc-josys hover:underline">
                一覧へ
              </a>
            </div>
            <ul className="mt-4 divide-y-2 divide-dashed divide-warm-line">
              {articles.slice(0, 3).map((a) => {
                const s = serviceByName(a.tag);
                return (
                  <li key={a.href}>
                    <a href={a.href} className="group block py-5">
                      <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white ${s?.bg ?? 'bg-sumi-muted'}`}>{a.tag}</span>
                      <span className="block font-bold leading-relaxed mt-2 group-hover:underline">{a.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePop;
