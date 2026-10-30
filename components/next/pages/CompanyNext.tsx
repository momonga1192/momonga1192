import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { services } from '../theme';
import { ContactCta, Mark, PageHeader, SectionHead, Sparkle, comicBtn, comicIllust } from '../parts';
import { Caption, panel } from '../comic';

const profile: [string, React.ReactNode][] = [
  ['屋号', 'Arcle（アークル）'],
  ['代表', '栗原 勇太'],
  ['所在地', '〒491-0835 愛知県一宮市あずら2丁目8'],
  [
    '事業内容',
    <ul key="business" className="flex flex-wrap gap-2">
      {services.map((s) => (
        <li key={s.key} className={`inline-flex items-center px-3 py-0.5 font-bold text-[14px] text-white border-[3px] border-[#111] shadow-[2px_2px_0_#111] ${s.bg}`}>
          {s.name}
        </li>
      ))}
    </ul>
  ],
  ['対応エリア', '東海エリアは訪問にも対応しています。リモートで対応できる業務は、エリアを問わずご相談ください。'],
  ['お問い合わせ', 'お問い合わせフォームより承っています。通常2営業日以内にご連絡します。']
];

const arcColors = ['#3B6FE0', '#5B5BD6', '#8E5BD0', '#C8509F'];

// 屋号の「Arc（弧）＋Circle（円）」を動きで見せる。マウスを乗せると4つの弧が高速で回りながら隙間を閉じ、
// 4色が混ざり合った1つの円に変わる。外すと逆の順で弧に戻る
const ArcsMerge: React.FC = () => (
  <div className="absolute inset-0" aria-hidden="true">
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className="absolute inset-0 w-full h-full overflow-visible transition-[transform,opacity] duration-[1100ms,300ms] ease-[cubic-bezier(0.55,0,0.75,0.4),ease] group-hover:rotate-[1080deg] group-hover:opacity-0 group-hover:delay-[0ms,950ms] delay-[0ms,0ms] motion-reduce:group-hover:rotate-0 motion-reduce:transition-opacity"
    >
      {arcColors.map((color, i) => (
        <g key={color} transform={`rotate(${i * 90 + 6} 100 100)`}>
          {/* 黒いふち（コミックの線）を下に敷いてから、事業の色の弧を重ねる */}
          <path d="M 100 8 A 92 92 0 0 1 192 100" stroke="#111" strokeWidth="11" strokeLinecap="round" pathLength={100} className="[stroke-dasharray:86_100] group-hover:[stroke-dasharray:100_100] transition-[stroke-dasharray] duration-500 group-hover:delay-500" />
          <path d="M 100 8 A 92 92 0 0 1 192 100" stroke={color} strokeWidth="6" strokeLinecap="round" pathLength={100} className="[stroke-dasharray:86_100] group-hover:[stroke-dasharray:100_100] transition-[stroke-dasharray] duration-500 group-hover:delay-500" />
        </g>
      ))}
    </svg>
    {/* 4色をつないだ円。弧の太さと位置（半径92・太さ6）に合わせて、円錐グラデーションを輪の形に切り抜く */}
    <div
      className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:duration-500 group-hover:delay-[850ms] animate-[spin_4s_linear_infinite] motion-reduce:animate-none"
      style={{
        background: `conic-gradient(${[...arcColors, arcColors[0]].join(', ')})`,
        mask: 'radial-gradient(closest-side, transparent 88.6%, #000 88.8%, #000 95.2%, transparent 95.4%)',
        WebkitMask: 'radial-gradient(closest-side, transparent 88.6%, #000 88.8%, #000 95.2%, transparent 95.4%)'
      }}
    />
  </div>
);

// 吹き出しの尾（白い三角＋黒い線）。スマホは上の写真へ、PCは左の写真へ向ける
const BubbleTail: React.FC<{ className: string }> = ({ className }) => (
  <svg viewBox="0 0 40 30" className={`absolute w-10 h-8 ${className}`} aria-hidden="true">
    <path d="M8 0 L14 28 L26 0" fill="#fff" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
    <rect x="6" y="-6" width="22" height="7" fill="#fff" />
  </svg>
);

const CompanyNext: React.FC = () => (
  <div className="bg-[#FAF3E0] text-sumi overflow-x-clip">
    <Helmet>
      <title>事業者概要 | Arcle（アークル）- 愛知・東海の中小企業のIT支援</title>
      <meta name="description" content="Arcle（アークル）の事業者概要。屋号に込めた想い、代表あいさつ、事業者情報とアクセスをご紹介します。" />
      <link rel="canonical" href="https://www.arcle.net/company" />
    </Helmet>

    <PageHeader
      en="Company"
      title="事業者概要"
      lead="Arcleは、IT担当者がいない中小企業の「IT部門」となって支援する個人事業です。"
      crumbs={[{ label: '事業者概要' }]}
      image={comicIllust('company-header')}
      imageMode="panel"
    />

    {/* 屋号に込めた想い：左に弧が円になるコマ、右に「弧」と「円」の2コマとナレーション */}
    <section className="py-20 md:py-28 bg-white comic-dots">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 grid lg:grid-cols-[0.95fr_1.1fr] gap-14 lg:gap-16 items-center">
        <div className="pop-reveal group relative mx-auto w-full max-w-[440px]">
          <div className={`relative aspect-square bg-[#FAF3E0] comic-dots -rotate-2 ${panel}`}>
            <div className="absolute inset-0 comic-speed [--speed:rgb(59_111_224/0.18)]" aria-hidden="true" />
            <div className="absolute inset-[9%]">
              <ArcsMerge />
              <div className="pop-float absolute inset-[18%] rounded-full bg-mustard border-[4px] border-[#111] shadow-[6px_6px_0_#111] grid place-items-center text-center">
                <p>
                  <span className="block font-comic text-[52px] md:text-[64px] leading-none tracking-[0.04em] text-white [paint-order:stroke_fill] [-webkit-text-stroke:7px_#111] [text-shadow:4px_4px_0_#111]">Arcle</span>
                  <span className="block mt-2 text-[12px] md:text-sm font-bold text-[#111]">Arc（弧） ＋ Circle（円）</span>
                </p>
              </div>
            </div>
            <Sparkle className="absolute right-[5%] top-[5%] w-9 h-9 text-mustard" />
            <Sparkle className="absolute left-[5%] bottom-[7%] w-6 h-6 text-svc-web" still />
          </div>
          <Caption className="absolute -top-4 left-3 -rotate-3 font-comic tracking-[0.08em] text-[17px] md:text-[19px]">WHAT&apos;S IN A NAME?</Caption>
        </div>

        <div>
          <SectionHead
            en="Our Philosophy"
            title={
              <>
                「個」の弧をつなぎ、
                <br />
                <Mark>「縁」という円</Mark>を描く。
              </>
            }
          />
          <div className="-mt-6 md:-mt-8">
            <p className="pop-reveal inline-block -rotate-1 bg-mustard border-[3px] border-[#111] shadow-[3px_3px_0_#111] px-4 py-2 font-bold leading-[1.8] text-[#111]">
              Arcle（アークル）という屋号には、2つの意味を込めています。
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-8 sm:gap-5">
              <div className={`pop-reveal relative bg-white p-5 pt-7 border-[3px] border-[#111] shadow-[6px_6px_0_#111] sm:-rotate-1`}>
                <span className="absolute -top-5 left-4 -rotate-3 bg-svc-josys border-[3px] border-[#111] px-3 pt-1 font-comic text-[24px] leading-none tracking-[0.06em] text-white shadow-[3px_3px_0_#111]">ARC</span>
                <p className="leading-[1.95] text-sumi">
                  ひとつは<strong className="font-manga text-svc-josys">Arc（弧）</strong>。光る個性や専門性を持った、一人ひとりの技術者を表しています。
                </p>
              </div>
              <div className={`pop-reveal relative bg-white p-5 pt-7 border-[3px] border-[#111] shadow-[6px_6px_0_#111] sm:rotate-1`} style={{ animationDelay: '120ms' }}>
                <span className="absolute -top-5 left-4 rotate-2 bg-svc-web border-[3px] border-[#111] px-3 pt-1 font-comic text-[24px] leading-none tracking-[0.06em] text-white shadow-[3px_3px_0_#111]">CIRCLE</span>
                <p className="leading-[1.95] text-sumi">
                  もうひとつは<strong className="font-manga text-svc-web">Circle（円）</strong>。個々の弧が重なり合い、つながり合うことで、ひとつの円環──「縁」が生まれます。
                </p>
              </div>
            </div>
            {/* 使命：夜空の濃紺のナレーションのコマ */}
            <div className={`pop-reveal relative mt-10 bg-sumi comic-dots-light text-white px-6 pt-9 pb-6 md:px-8 border-[4px] border-[#111] shadow-[8px_8px_0_#F2B544]`}>
              <Caption className="absolute -top-4 left-4 -rotate-2 font-comic tracking-[0.08em] text-[17px] md:text-[19px]">OUR MISSION</Caption>
              <p className="font-bold leading-[2] [word-break:auto-phrase]">ITを通じて、ばらばらになったシステムや組織をなめらかにつなぎ、終わりのない価値の循環を地域に生み出すこと。それが私たちの使命です。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 代表あいさつ（抜粋）：写真のコマから、吹き出しでひとこと */}
    <section className="relative py-20 md:py-28 bg-mustard comic-dots border-y-[4px] border-[#111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-14 md:gap-16 items-center">
        <div className="pop-reveal relative mx-auto w-full max-w-[300px] md:max-w-none">
          <div className={`group relative aspect-[4/5] overflow-hidden bg-white -rotate-2 ${panel}`}>
            <img
              src="/images/Gemini_Generated_Image_guortkguortkguor.png"
              alt="Arcle代表 栗原勇太"
              className="absolute inset-0 w-full h-full object-cover object-[50%_18%] transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <Caption tone="bg-white text-[#111]" className="absolute -bottom-5 right-2 rotate-2">
            <span className="text-[12px] mr-2">代表</span>
            <span className="text-[20px] md:text-[22px]">栗原 勇太</span>
          </Caption>
        </div>

        <div className="pop-reveal" style={{ animationDelay: '120ms' }}>
          <span className="inline-block -rotate-3 bg-coral border-[3px] border-[#111] px-4 pt-1.5 pb-1 font-comic text-xl md:text-2xl tracking-[0.06em] text-white shadow-[4px_4px_0_#111]">MESSAGE</span>
          <h2 className="mt-5 font-manga text-[25px] md:text-[38px] leading-[1.45] text-white [paint-order:stroke_fill] [-webkit-text-stroke:6px_#111] [text-shadow:4px_4px_0_#111] [word-break:auto-phrase]">
            データとITの力で、企業の<Mark className="bg-svc-josys">ポテンシャルを解放</Mark>する。
          </h2>
          <div className="relative mt-10 md:mt-8 bg-white border-[3px] border-[#111] shadow-[5px_5px_0_#111] rounded-[36px] md:rounded-[44%] px-6 py-6 md:px-14 md:py-9">
            <BubbleTail className="md:hidden -top-[25px] left-[22%] rotate-180" />
            <BubbleTail className="hidden md:block top-1/2 -left-[27px] -translate-y-1/2 rotate-90" />
            <p className="relative leading-[1.95] font-bold text-sumi">
              これまで企業のITやデータ活用に携わる中で、「IT担当者がいれば…」「蓄積されたデータをうまく使えれば…」という場面を数多く見てきました。中小企業こそ、テクノロジーを味方につけることで大きく成長できると確信しています。
            </p>
          </div>
          <a href="/company/message" className={`mt-9 ${comicBtn} bg-white text-[#111]`}>
            代表あいさつ・経歴を読む
            <ArrowRight className="w-5 h-5" strokeWidth={3} />
          </a>
        </div>
      </div>
    </section>

    {/* 事業者情報とアクセス */}
    <section className="py-20 md:py-28 comic-dots">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 grid lg:grid-cols-[1fr_1fr] gap-14 lg:gap-12">
        <div>
          <SectionHead en="Profile" title="事業者情報" enTone="bg-svc-josys text-white" />
          <dl className={`pop-reveal -mt-4 md:-mt-6 bg-white ${panel}`}>
            {profile.map(([label, value]) => (
              <div key={label} className="grid sm:grid-cols-[130px_1fr] border-b-[3px] border-[#111] last:border-b-0">
                <dt className="bg-mustard px-5 py-2 sm:py-5 font-manga text-[15px] text-[#111] border-b-[3px] sm:border-b-0 sm:border-r-[3px] border-[#111]">{label}</dt>
                <dd className="px-5 py-4 sm:py-5 font-bold leading-[1.9]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <SectionHead en="Access" title="アクセス" enTone="bg-svc-web text-white" />
          <div className={`pop-reveal relative -mt-4 md:-mt-6 aspect-[4/3] bg-white ${panel}`} style={{ animationDelay: '120ms' }}>
            <iframe
              title="Arcle 所在地"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.267!2d136.824421!3d35.285032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDE3JzA2LjEiTiAxMzbCsDQ5JzI3LjkiRQ!5e0!3m2!1sja!2sjp!4v1735565000000!5m2!1sja!2sjp&t=k&z=15"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-6 inline-block -rotate-1 bg-white border-[3px] border-[#111] shadow-[3px_3px_0_#111] px-4 py-2 text-sm font-bold">〒491-0835 愛知県一宮市あずら2丁目8</p>
        </div>
      </div>
    </section>

    <ContactCta />
  </div>
);

export default CompanyNext;
