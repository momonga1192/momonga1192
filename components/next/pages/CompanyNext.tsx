import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { services } from '../theme';
import { Arcs, ContactCta, PageHeader, SectionHead } from '../parts';

const profile: [string, React.ReactNode][] = [
  ['名称', 'Arcle（アークル）'],
  ['代表', '栗原 勇太'],
  ['所在地', '〒491-0835 愛知県一宮市あずら2丁目8'],
  [
    '事業内容',
    <ul key="business" className="space-y-1">
      {services.map((s) => (
        <li key={s.key} className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${s.bg}`} />
          {s.name}
        </li>
      ))}
    </ul>
  ],
  ['対応エリア', '一宮市近郊の企業さまを中心に承っています（訪問は一宮市近郊無料）。リモートで対応できる業務は、エリアを問わずご相談ください。'],
  ['お問い合わせ', 'お問い合わせフォームより承っています。通常2営業日以内にご連絡します。']
];

const CompanyNext: React.FC = () => (
  <div className="bg-cream text-sumi">
    <Helmet>
      <title>会社案内 | Arcle（アークル）</title>
      <meta name="description" content="Arcle（アークル）の会社案内。社名に込めた想い、代表あいさつ、会社概要とアクセスをご紹介します。愛知県一宮市。" />
      <link rel="canonical" href="https://www.arcle.net/company" />
    </Helmet>

    <PageHeader
      en="Company"
      title="会社案内"
      lead="Arcleは、愛知県一宮市を拠点に、IT担当者がいない中小企業の「IT部門」として支援している会社です。"
      crumbs={[{ label: '会社案内' }]}
    />

    {/* 社名に込めた想い */}
    <section className="py-20 md:py-28 bg-white rounded-t-[48px] md:rounded-t-[80px]">
      <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-[1fr_1.15fr] gap-14 items-center">
        <div className="relative mx-auto w-full max-w-[400px] aspect-square">
          <Arcs className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-[18%] rounded-full bg-cream grid place-items-center text-center">
            <p>
              <span className="block font-en text-4xl md:text-5xl font-bold">Arcle</span>
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
                「縁」という円を描く。
              </>
            }
          />
          <div className="-mt-6 space-y-5 leading-[2] text-sumi-muted">
            <p>Arcle（アークル）という社名には、2つの意味を込めています。</p>
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
    <section className="py-20 md:py-28 bg-cream-dark">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-[320px_1fr] gap-10 md:gap-14 items-center rounded-[40px] bg-white p-8 md:p-14">
          <div className="relative mx-auto w-56 h-56 md:w-72 md:h-72">
            <div className="absolute inset-0 rounded-full bg-svc-josys/10 translate-x-3 translate-y-3" />
            <img
              src="/images/Gemini_Generated_Image_guortkguortkguor.png"
              alt="Arcle代表 栗原勇太"
              className="relative w-full h-full rounded-full object-cover border-4 border-white"
              loading="lazy"
            />
          </div>
          <div>
            <p className="font-en text-sm font-semibold tracking-[0.2em] uppercase text-svc-josys">Message</p>
            <h2 className="font-head text-[24px] md:text-[32px] font-bold leading-snug mt-2 [word-break:auto-phrase]">データとITの力で、企業のポテンシャルを解放する。</h2>
            <p className="mt-5 leading-[2] text-sumi-muted">
              これまで企業のITやデータ活用に携わる中で、「IT担当者がいれば…」「蓄積されたデータをうまく使えれば…」という場面を数多く見てきました。中小企業こそ、テクノロジーを味方につけることで大きく成長できると確信しています。
            </p>
            <p className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <span>
                <span className="text-sm text-sumi-muted mr-3">代表</span>
                <span className="font-head text-xl font-bold">栗原 勇太</span>
              </span>
              <a href='/company/message' className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-sumi font-bold hover:bg-cream">
                代表あいさつ・経歴を読む
                <ArrowRight className="w-4 h-4" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* 会社概要 */}
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-[1fr_1fr] gap-12">
        <div>
          <SectionHead en="Profile" title="会社概要" />
          <dl className="-mt-4 rounded-[28px] bg-white border border-warm-line divide-y divide-warm-line">
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
          <div className="-mt-4 aspect-[4/3] rounded-[28px] overflow-hidden border border-warm-line bg-white">
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
