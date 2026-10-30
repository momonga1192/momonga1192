import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check } from 'lucide-react';
import { prices, services, type ServiceKey } from '../theme';
import { ContactCta, Mark, PageHeader, SectionHead, Ticker, comicBtn, comicIllust } from '../parts';
import { Bubble, Burst, Caption, SfxText, panel } from '../comic';

// サービス一覧（アメコミ版）。お困りごと＝登場人物のせりふ → 4つのサービス＝ヒーローの活躍する号 → まとめて頼む＝夜のコマ、の順に読む

// 事業色の集中線（濃い色・少し明るい色）
const rays: Record<ServiceKey, [string, string]> = {
  josys: ['#3B6FE0', '#4A7DEA'],
  data: ['#5B5BD6', '#6A6AE0'],
  ai: ['#8E5BD0', '#9A69DA'],
  web: ['#C8509F', '#D25EAA']
};
const raysStyle = (key: ServiceKey) => ({ '--ray-a': rays[key][0], '--ray-b': rays[key][1] }) as React.CSSProperties;

// サービスの絵に重ねる、文字だけの効果音（トップと同じ組み合わせ）
const sfx: Record<ServiceKey, { text: string; color: string }> = {
  josys: { text: 'POW!', color: '#F2B544' },
  data: { text: 'ZAP!', color: '#F2B544' },
  ai: { text: 'WHOOSH!', color: '#F2B544' },
  web: { text: 'BOOM!', color: '#F2B544' }
};

const worryImg = (key: ServiceKey) => (key === 'josys' ? 'worry-pc' : `worry-${key}`);

const merits = [
  { title: '会社全体を見て、順番から考える', body: 'PC・データ・AI・Webのどこから手をつけるべきか、効果と費用のバランスで優先順位を一緒に決めます。' },
  { title: '仕組みがつながる', body: 'Microsoft 365の管理とデータの集計、ホームページの問い合わせ管理など、別々に作るとつながらない仕組みを最初から連携させます。' },
  { title: '相談先がひとつで済む', body: '「これは誰に聞けばいいのか」と迷うことがなくなります。小さな疑問も気軽にご相談ください。' }
];

const ServicesNext: React.FC = () => (
  <div className="bg-[#FAF3E0] text-sumi overflow-x-clip">
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
      image={comicIllust('services-flow-header')}
      imageMode="panel"
    />

    {/* お悩みから選ぶ：困っている人のコマと、そのせりふの吹き出し。押すとそのサービスの号へ飛ぶ */}
    <section className="py-20 md:py-28 bg-white comic-dots">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead en="WHO NEEDS HELP?" title="お困りごとから選ぶ" center />
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-10 md:gap-y-12">
          {services.map((s, i) => (
            <a
              key={s.key}
              href={`#${s.key}`}
              className="group pop-reveal relative flex items-center gap-4 sm:gap-6"
              style={{ animationDelay: `${(i % 2) * 110}ms` }}
            >
              {/* 困っている人のコマ */}
              <span className={`relative shrink-0 w-[38%] max-w-[200px] aspect-square overflow-hidden bg-white ${panel} ${i % 2 ? 'rotate-2' : '-rotate-2'} transition-transform group-hover:rotate-0`}>
                <img src={comicIllust(worryImg(s.key))} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
              </span>
              {/* せりふの吹き出し。尾は左のコマ（話している人）へ向ける */}
              <span className="relative flex-1 min-w-0">
                <span className="relative block rounded-[44%] bg-white border-[3px] border-[#111] shadow-[4px_4px_0_#111] px-5 py-5 sm:px-7 sm:py-6 text-center">
                  <span className="block font-manga text-[15px] sm:text-[18px] md:text-[19px] leading-[1.55] text-[#111] [word-break:auto-phrase]">{s.worry.replace('\n', '')}</span>
                  <svg viewBox="0 0 30 40" className="absolute top-1/2 -left-[25px] w-8 h-9 -translate-y-1/2" aria-hidden="true">
                    <path d="M30 6 L2 30 L30 26" fill="#fff" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
                    <rect x="27" y="2" width="8" height="30" fill="#fff" />
                  </svg>
                </span>
                <span className={`relative mt-4 ml-2 inline-flex items-center gap-1 -rotate-2 border-[3px] border-[#111] px-3 py-1 font-manga text-[13px] sm:text-[14px] text-white shadow-[3px_3px_0_#111] ${s.bg}`}>
                  {s.name}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>

    <Ticker items={[...services.map((s) => s.name), 'ご相談・お見積り無料']} className="-my-4" tone="bg-[#111] text-mustard" />

    {/* 4つのサービス：コミックの号のように1つずつ大きなコマで見せる */}
    <section className="py-20 md:py-28 comic-dots">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 space-y-16 md:space-y-20">
        {services.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <article key={s.key} id={s.key} className={`group pop-reveal relative scroll-mt-24 grid lg:grid-cols-[1.05fr_1fr] bg-white ${panel} ${flip ? 'lg:rotate-[0.6deg]' : 'lg:-rotate-[0.6deg]'}`}>
              {/* 号数のナレーションの箱（コマの上の辺にまたがせる） */}
              <Caption tone={`${s.bg} text-white`} className={`absolute z-20 -top-5 ${flip ? 'left-5 lg:left-auto lg:right-6' : 'left-5'} -rotate-2`}>
                <span className="font-comic font-normal text-[18px] md:text-[20px] tracking-[0.08em] leading-none">ISSUE No.{i + 1} ・ {s.en}</span>
              </Caption>

              {/* 絵のコマ：事業色の集中線の地に、傾けた絵のコマを置く */}
              <div
                className={`relative flex flex-col justify-center comic-rays px-5 pt-12 pb-12 sm:px-8 md:px-10 md:pt-14 md:pb-16 border-b-[4px] lg:border-b-0 border-[#111] ${flip ? 'lg:order-2 lg:border-l-[4px]' : 'lg:border-r-[4px]'}`}
                style={raysStyle(s.key)}
              >
                <div className={`relative aspect-[3/2] overflow-hidden bg-white border-[4px] border-[#111] shadow-[8px_8px_0_#111] ${flip ? 'rotate-[1.5deg]' : '-rotate-[1.5deg]'}`}>
                  <img src={comicIllust(`svc-${s.key}`)} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                </div>
                <span className="pop-reveal absolute inset-0 block pointer-events-none">
                  <SfxText
                    text={sfx[s.key].text}
                    color={sfx[s.key].color}
                    className={`bottom-2 md:bottom-3 ${flip ? 'left-6 md:left-9' : 'right-6 md:right-9'} text-[clamp(30px,8vw,52px)] md:text-[clamp(32px,4vw,54px)]`}
                    rotate={flip ? -10 : 8}
                    delay={0.3}
                  />
                </span>
              </div>

              {/* 説明のコマ */}
              <div className="relative p-7 sm:p-9 md:p-11 flex flex-col">
                <h2 className="font-manga text-[34px] md:text-[46px] leading-tight text-[#111] comic-outline-white">{s.name}</h2>
                <p className="mt-5 leading-[1.95] font-bold text-sumi">{s.lead}</p>
                <ul className="mt-6 space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 font-bold leading-relaxed">
                      <span className={`shrink-0 mt-0.5 w-6 h-6 grid place-items-center border-[2.5px] border-[#111] text-white shadow-[2px_2px_0_#111] ${s.bg}`}>
                        <Check className="w-3.5 h-3.5" strokeWidth={4} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-9 flex flex-wrap items-end justify-between gap-5">
                  {/* 値札 */}
                  <p className={`inline-block bg-[#FAF3E0] border-[3px] border-[#111] px-4 py-2.5 shadow-[4px_4px_0_#111] ${flip ? 'rotate-2' : '-rotate-2'}`}>
                    <span className="block text-xs font-bold text-sumi-muted">料金の目安</span>
                    <span className={`font-manga text-[26px] md:text-[30px] leading-tight ${s.text}`}>{prices[s.key]}</span>
                  </p>
                  <a href={s.href} className={`${comicBtn} ${s.bg} text-white px-6 py-3.5 text-[15px]`}>
                    {s.name}を詳しく見る
                    <ArrowRight className="w-4 h-4" strokeWidth={3} />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>

    {/* まとめて頼む：夜空の濃紺に、4つを抱えたヒーローのコマと、3つのコマ */}
    <section className="relative py-20 md:py-28 bg-sumi comic-dots-light border-y-[4px] border-[#111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHead
          en="ALL IN ONE!"
          enTone="bg-mustard text-[#111]"
          dark
          title={
            <>
              まとめて頼むと、ここが<Mark className="bg-coral">楽になります</Mark>
            </>
          }
          lead="Arcleは、ITのことをひとつの窓口でお引き受けします。サービスをまたいだご相談でも、担当が変わったり、説明をくり返したりする必要はありません。"
        />
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-12 items-center">
          {/* 4つを抱えたヒーローのコマ */}
          <div className="pop-reveal relative w-full max-w-[460px] justify-self-center">
            <div className={`relative aspect-square overflow-hidden bg-white ${panel} shadow-[8px_8px_0_#F2B544] -rotate-2`}>
              <img src={comicIllust('reason-onestop')} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
            <Bubble className="left-0 -top-6 sm:-left-4 text-[22px] sm:text-[26px]" tailAt={80} lean={0.7} rotate={-6} delay={0.3}>
              LEAVE IT TO ME!
            </Bubble>
            <Burst
              text={<>ONE<br />STOP!</>}
              className="w-[104px] sm:w-[124px] -bottom-9 -right-3 sm:-right-6"
              fill="#F2B544"
              core="#F07A5A"
              textClass="text-center text-white text-[26px] sm:text-[32px]"
              rotate={10}
              delay={0.5}
            />
          </div>
          {/* 3つの「楽になる」コマ */}
          <ol className="space-y-7">
            {merits.map((item, i) => (
              <li
                key={item.title}
                className={`group pop-reveal relative flex gap-4 sm:gap-5 bg-[#FAF3E0] p-5 sm:p-6 ${panel} ${i % 2 ? 'lg:rotate-[0.8deg]' : 'lg:-rotate-[0.8deg]'}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="pop-wiggle shrink-0 -rotate-6 grid place-items-center w-12 h-12 bg-coral text-white border-[3px] border-[#111] shadow-[3px_3px_0_#111] font-comic text-[30px] leading-none [paint-order:stroke_fill] [-webkit-text-stroke:4px_#111]">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block font-manga text-[19px] md:text-[22px] leading-snug text-[#111] [word-break:auto-phrase]">{item.title}</span>
                  <span className="block mt-2 text-[15px] leading-[1.9] font-bold text-sumi">{item.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>

    <ContactCta />
  </div>
);

export default ServicesNext;
