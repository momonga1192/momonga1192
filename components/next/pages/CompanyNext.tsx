import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { services } from '../theme';
import { ContactCta, Mark, PageHeader, SectionHead, Sparkle, Sticker, card, press } from '../parts';

const profile: [string, React.ReactNode][] = [
  ['屋号', 'Arcle（アークル）'],
  ['代表', '栗原 勇太'],
  ['所在地', '〒491-0835 愛知県一宮市あずら2丁目8'],
  [
    '事業内容',
    <ul key="business" className="space-y-1">
      {services.map((s) => (
        <li key={s.key} className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full border-2 border-sumi ${s.bg}`} />
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
      className="absolute inset-0 w-full h-full transition-[transform,opacity] duration-[1100ms,300ms] ease-[cubic-bezier(0.55,0,0.75,0.4),ease] group-hover:rotate-[1080deg] group-hover:opacity-0 group-hover:delay-[0ms,950ms] delay-[0ms,0ms] motion-reduce:group-hover:rotate-0 motion-reduce:transition-opacity"
    >
      {arcColors.map((color, i) => (
        <path
          key={color}
          d="M 100 8 A 92 92 0 0 1 192 100"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          transform={`rotate(${i * 90 + 6} 100 100)`}
          pathLength={100}
          className="[stroke-dasharray:86_100] group-hover:[stroke-dasharray:100_100] transition-[stroke-dasharray] duration-500 group-hover:delay-500"
        />
      ))}
    </svg>
    {/* 4色をつないだ円。弧の太さと位置（半径92・太さ5）に合わせて、円錐グラデーションを輪の形に切り抜く */}
    <div
      className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:duration-500 group-hover:delay-[850ms] animate-[spin_4s_linear_infinite] motion-reduce:animate-none"
      style={{
        background: `conic-gradient(${[...arcColors, arcColors[0]].join(', ')})`,
        mask: 'radial-gradient(closest-side, transparent 89.4%, #000 89.6%, #000 94.4%, transparent 94.6%)',
        WebkitMask: 'radial-gradient(closest-side, transparent 89.4%, #000 89.6%, #000 94.4%, transparent 94.6%)'
      }}
    />
  </div>
);

const CompanyNext: React.FC = () => (
  <div className="bg-cream text-sumi">
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
    />

    {/* 屋号に込めた想い */}
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-[1fr_1.15fr] gap-14 items-center">
        <div className="group pop-reveal relative mx-auto w-full max-w-[400px] aspect-square">
          <ArcsMerge />
          <Sparkle className="absolute right-[6%] top-[4%] w-9 h-9 text-mustard" />
          <Sparkle className="absolute left-[4%] bottom-[10%] w-6 h-6 text-svc-web" />
          <div className={`pop-float absolute inset-[18%] rounded-full bg-cream grid place-items-center text-center ${card}`}>
            <p>
              <span className="block font-en text-4xl md:text-5xl font-black italic">Arcle</span>
              <span className="block mt-2 text-sm text-sumi-muted">Arc（弧） ＋ Circle（円）</span>
            </p>
          </div>
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
          <div className="-mt-6 space-y-5 leading-[2] text-sumi-muted">
            <p>Arcle（アークル）という屋号には、2つの意味を込めています。</p>
            <p>
              ひとつは<strong className="text-sumi">Arc（弧）</strong>。光る個性や専門性を持った、一人ひとりの技術者を表しています。
            </p>
            <p>
              もうひとつは<strong className="text-sumi">Circle（円）</strong>。個々の弧が重なり合い、つながり合うことで、ひとつの円環──「縁」が生まれます。
            </p>
            <p>ITを通じて、ばらばらになったシステムや組織をなめらかにつなぎ、終わりのない価値の循環を地域に生み出すこと。それが私たちの使命です。</p>
          </div>
        </div>
      </div>
    </section>

    {/* 代表あいさつ（抜粋） */}
    <section className="py-20 md:py-28 bg-cream bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px] border-y-[2.5px] border-sumi">
      <div className="max-w-6xl mx-auto px-5">
        <div className={`pop-reveal grid md:grid-cols-[320px_1fr] gap-10 md:gap-14 items-center rounded-[40px] bg-white p-8 md:p-14 ${card}`}>
          <div className="group relative mx-auto w-56 h-56 md:w-72 md:h-72">
            <div className="absolute inset-0 rounded-full bg-mustard border-[2.5px] border-sumi translate-x-3 translate-y-3" />
            <img
              src="/images/Gemini_Generated_Image_guortkguortkguor.png"
              alt="Arcle代表 栗原勇太"
              className="pop-tilt-r relative w-full h-full rounded-full object-cover border-[2.5px] border-sumi"
              loading="lazy"
            />
          </div>
          <div>
            <Sticker className="pop-float font-en text-sm font-black italic tracking-[0.12em] uppercase">Message</Sticker>
            <h2 className="font-head text-[26px] md:text-[38px] font-black leading-[1.4] mt-4 [word-break:auto-phrase]">データとITの力で、企業の<Mark>ポテンシャルを解放</Mark>する。</h2>
            <p className="mt-5 leading-[2] text-sumi-muted">
              これまで企業のITやデータ活用に携わる中で、「IT担当者がいれば…」「蓄積されたデータをうまく使えれば…」という場面を数多く見てきました。中小企業こそ、テクノロジーを味方につけることで大きく成長できると確信しています。
            </p>
            <p className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <span>
                <span className="text-sm text-sumi-muted mr-3">代表</span>
                <span className="font-head text-2xl font-black">栗原 勇太</span>
              </span>
              <a href="/company/message" className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white font-bold border-[2.5px] border-sumi shadow-[4px_4px_0_#1F2430] ${press}`}>
                代表あいさつ・経歴を読む
                <ArrowRight className="w-4 h-4" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* 事業者情報 */}
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-[1fr_1fr] gap-12">
        <div>
          <SectionHead en="Profile" title="事業者情報" />
          <dl className={`pop-reveal -mt-4 rounded-[28px] bg-white divide-y-2 divide-dashed divide-warm-line ${card}`}>
            {profile.map(([label, value]) => (
              <div key={label} className="grid sm:grid-cols-[120px_1fr] gap-1 sm:gap-6 px-6 py-5">
                <dt className="font-bold text-sm text-sumi-muted">{label}</dt>
                <dd className="leading-[1.9]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <SectionHead en="Access" title="アクセス" />
          <div className={`pop-reveal -mt-4 aspect-[4/3] rounded-[28px] overflow-hidden bg-white ${card}`} style={{ animationDelay: '120ms' }}>
            <iframe
              title="Arcle 所在地"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.267!2d136.824421!3d35.285032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDE3JzA2LjEiTiAxMzbCsDQ5JzI3LjkiRQ!5e0!3m2!1sja!2sjp!4v1735565000000!5m2!1sja!2sjp&t=k&z=15"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-4 text-sm text-sumi-muted">〒491-0835 愛知県一宮市あずら2丁目8</p>
        </div>
      </div>
    </section>

    <ContactCta />
  </div>
);

export default CompanyNext;
