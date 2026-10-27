import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, MapPin, MessageCircle, Layers } from 'lucide-react';
import { illust, serviceByName, services } from './theme';
import { Arcs, SectionHead } from './parts';
import { publishedWorks } from '../works/worksData';
import { articles } from '../articles/ArticlesIndex';

const HomeNext: React.FC = () => {
  const cases = publishedWorks.slice(0, 3);

  return (
    <div className="bg-cream text-sumi">
      <Helmet>
        <title>Arcle | 愛知県一宮市のITコンサルティング - DX推進・情シス代行・データ活用・生成AI</title>
        <meta
          name="description"
          content="Arcle（アークル）は愛知県一宮市のITコンサルティング企業です。中小企業向けに情シス代行、データ活用支援（Tableau・PowerBI）、生成AI導入支援、Web制作を提供。DX推進のパートナーとして経営課題を解決します。"
        />
        <link rel="canonical" href="https://www.arcle.net/" />
      </Helmet>

      {/* ヒーロー */}
      <section className="relative overflow-hidden">
        <div className="absolute -right-40 -top-40 w-[640px] h-[640px] rounded-full bg-svc-josys/8" />
        <div className="absolute -left-24 bottom-[-140px] w-[320px] h-[320px] rounded-full bg-mustard/25" />
        <div className="relative max-w-6xl mx-auto px-5 pt-12 pb-20 md:pt-16 md:pb-28 grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-6 items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white border border-warm-line px-4 py-1.5 text-sm text-sumi-muted">
              <MapPin className="w-4 h-4 text-coral" />
              愛知県一宮市のIT支援
            </p>
            <h1 className="font-head font-black text-[27px] leading-[1.5] sm:text-[36px] lg:text-[44px] lg:leading-[1.45] mt-6 tracking-[0.02em] [word-break:auto-phrase]">
              <span className="inline-block">会社のITの「困った」を、</span>
              <br />
              <span className="inline-block">
                <span className="bg-[linear-gradient(transparent_62%,rgb(242_181_68/0.55)_62%)]">まるごと</span>相談できる場所。
              </span>
            </h1>
            <p className="mt-6 text-[15px] md:text-[17px] leading-[2] text-sumi-muted max-w-xl">
              PCやネットワークの管理から、データの見える化、生成AIの活用、ホームページまで。IT担当者がいない中小企業の「IT部門」として、まとめてお手伝いします。
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-sumi text-white font-bold hover:bg-svc-josys transition-colors">
                無料で相談する
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-sumi font-bold hover:bg-white transition-colors">
                サービスを見る
              </a>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-sumi-muted">
              {['ご相談・お見積り無料', '一宮市近郊は訪問対応', 'ITのことをまとめて相談'].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-svc-web" strokeWidth={3} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <Arcs className="absolute inset-[-6%] w-[112%] h-[112%] opacity-60" />
            <div className="relative aspect-square rounded-full bg-white shadow-[0_30px_80px_rgb(31_36_48/0.08)] overflow-hidden grid place-items-center">
              <img src={illust('hero')} alt="Arcleのスタッフと中小企業の社員が、PC・データ・AI・Webでつながっているイラスト" className="w-[94%]" />
            </div>
          </div>
        </div>
      </section>

      {/* お悩みから選ぶ */}
      <section className="py-20 md:py-28 bg-white rounded-t-[48px] md:rounded-t-[80px]">
        <div className="max-w-6xl mx-auto px-5">
          <SectionHead en="Your Concerns" title="こんなお困りごとはありませんか？" lead="当てはまるものから、ぴったりのサービスをご覧いただけます。" center />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {services.map((s) => (
              <a key={s.key} href={s.href} className="group flex flex-col rounded-[24px] sm:rounded-[28px] border border-warm-line bg-cream p-4 sm:p-6 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgb(31_36_48/0.08)] transition-all">
                <div className={`relative aspect-square rounded-full ${s.dot} mb-5`}>
                  <img src={illust(s.key === 'josys' ? 'worry-pc' : `worry-${s.key}`)} alt="" className="absolute inset-0 w-full h-full object-contain mix-blend-multiply" loading="lazy" />
                </div>
                <p className="font-head font-bold text-[14px] sm:text-[17px] leading-relaxed sm:whitespace-pre-line flex-1">{s.worry}</p>
                <p className={`mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-warm-line flex items-center justify-between font-bold text-xs sm:text-sm ${s.text}`}>
                  {s.name}で解決
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* サービス */}
      <section id="services" className="py-20 md:py-28 bg-cream-dark scroll-mt-16">
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
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <article key={s.key} className="group relative flex flex-col rounded-[32px] bg-white overflow-hidden">
                <div className={`relative ${s.tint} px-8 pt-8`}>
                  <span className="absolute right-7 top-6 font-en text-[56px] font-bold leading-none text-white/80">0{i + 1}</span>
                  <img src={illust(`svc-${s.key}`)} alt="" className="relative w-full aspect-[4/3] object-contain mix-blend-multiply" loading="lazy" />
                </div>
                <div className="flex flex-col flex-1 p-8">
                  <p className={`font-en text-xs font-semibold tracking-[0.2em] uppercase ${s.text}`}>{s.en}</p>
                  <h3 className="font-head text-2xl font-bold mt-1">{s.name}</h3>
                  <p className="mt-4 text-[15px] leading-[1.9] text-sumi-muted">{s.lead}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.points.map((p) => (
                      <li key={p} className={`text-[13px] font-medium px-3 py-1 rounded-full ${s.tint} ${s.text}`}>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a href={s.href} className={`mt-auto pt-7 inline-flex items-center gap-2 font-bold ${s.text}`}>
                    {s.name}について詳しく
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                <span className={`absolute left-0 right-0 bottom-0 h-1.5 ${s.bg} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 選ばれる理由 */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-5">
          <SectionHead en="Why Arcle" title="Arcleが選ばれる3つの理由" center />
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { img: 'reason-local', icon: MapPin, title: '一宮市から、すぐに駆けつける', body: '一宮市近郊のお客様には訪問無料で対応します。顔の見える距離だから、ちょっとしたことも気軽に相談できます。' },
              { img: 'reason-onestop', icon: Layers, title: 'ITのことを、ひとつの窓口で', body: 'PC・データ・AI・Webを別々の会社に頼む必要はありません。会社全体を見渡したうえで、優先順位から一緒に考えます。' },
              { img: 'reason-small', icon: MessageCircle, title: '小さく始めて、一緒に育てる', body: '最初から大きな投資は必要ありません。まずは困りごとをひとつ解決するところから始め、成果を見ながら広げていきます。' }
            ].map((r, i) => (
              <div key={r.title} className="text-center">
                <div className="relative mx-auto w-56 h-56 rounded-full bg-white grid place-items-center">
                  <img src={illust(r.img)} alt="" className="w-[88%] h-[88%] object-contain mix-blend-multiply" loading="lazy" />
                  <span className="absolute -top-1 -left-1 w-12 h-12 rounded-full bg-mustard grid place-items-center font-en font-bold text-lg">{i + 1}</span>
                </div>
                <h3 className="font-head text-xl font-bold mt-7">{r.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.9] text-sumi-muted text-left md:text-center">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 支援モデルケース */}
      <section className="py-20 md:py-28 bg-white rounded-[48px] md:rounded-[80px] mx-2 md:mx-5">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <SectionHead en="Model Cases" title="支援モデルケース" lead="中小企業によくあるご相談をもとに、Arcleならどう支援するかをまとめました。" />
            <a href="/works" className="md:mb-16 shrink-0 inline-flex items-center gap-2 font-bold text-svc-josys">
              すべて見る
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {cases.map((w) => {
              const s = serviceByName(w.service) ?? services[0];
              const metric = w.metrics[0];
              return (
                <a key={w.slug} href={`/works/${w.slug}`} className="group flex flex-col rounded-[28px] border border-warm-line bg-cream p-7 hover:shadow-[0_16px_40px_rgb(31_36_48/0.08)] transition-shadow">
                  <span className={`self-start text-xs font-bold px-3 py-1 rounded-full text-white ${s.bg}`}>{w.service}</span>
                  <h3 className="font-head text-lg font-bold leading-relaxed mt-4 flex-1">{w.title}</h3>
                  {metric && (
                    <p className="mt-5 rounded-2xl bg-white px-4 py-3 text-sm">
                      <span className="block text-xs text-sumi-muted">{metric.label}（想定）</span>
                      <span className="text-sumi-muted">{metric.before}</span>
                      <span className="mx-2">→</span>
                      <span className={`font-bold text-lg ${s.text}`}>{metric.after}</span>
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
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <div className="relative overflow-hidden rounded-[40px] bg-sumi text-white p-10 md:p-14">
            <Arcs className="absolute -right-24 -bottom-24 w-80 h-80 opacity-70" />
            <p className="font-en text-sm font-semibold tracking-[0.2em] uppercase text-mustard">Contact</p>
            <h2 className="font-head text-[28px] md:text-[38px] font-bold leading-snug mt-3">
              「何から相談すればいいか
              <br className="hidden md:block" />
              わからない」でも大丈夫です。
            </h2>
            <p className="mt-5 text-white/75 leading-[1.9] max-w-lg">
              いまの困りごとをお聞きして、やるべきことの順番から一緒に整理します。ご相談・お見積りは無料です。
            </p>
            <div className="mt-8 flex flex-wrap gap-3 relative">
              <a href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-mustard text-sumi font-bold hover:bg-white transition-colors">
                無料で相談する
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href='/flow' className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-white/40 font-bold hover:border-white transition-colors">
                ご相談の流れを見る
              </a>
            </div>
          </div>
          <div className="rounded-[40px] bg-white p-8 md:p-10">
            <div className="flex items-center justify-between">
              <p className="font-head text-xl font-bold">お役立ち記事</p>
              <a href="/articles" className="text-sm font-bold text-svc-josys">
                一覧へ
              </a>
            </div>
            <ul className="mt-4 divide-y divide-warm-line">
              {articles.slice(0, 3).map((a) => {
                const s = serviceByName(a.tag);
                return (
                  <li key={a.href}>
                    <a href={a.href} className="group block py-5">
                      <span className={`text-xs font-bold ${s?.text ?? 'text-sumi-muted'}`}>{a.tag}</span>
                      <span className="block font-bold leading-relaxed mt-1 group-hover:underline">{a.title}</span>
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

export default HomeNext;
