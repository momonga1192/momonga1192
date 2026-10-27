import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ContactCta, Mark, PageHeader, SectionHead, Sparkle, Sticker, card } from '../parts';

const career = [
  {
    title: '外資系自動車メーカー日本法人 / 食品製造業',
    role: 'Data Engineer / DX Promoter',
    body: '大規模なデータ基盤の構築や、全社的なDX推進プロジェクトをリード。現場の業務フロー改善からデータ分析環境の整備まで幅広く従事。',
    color: 'bg-svc-josys'
  },
  {
    title: 'IT・DX Consultant (Freelance)',
    role: 'Representative Director',
    body: '数多くの中堅・中小企業のDX推進を支援。',
    color: 'bg-svc-data'
  }
];

const specialties = ['DX Strategy', 'Data Engineering', 'AWS Cloud', 'Tableau', 'Generative AI'];
const certifications = ['AWS All Certificate', 'Tableau Certified Data Analyst', 'DATA Saber'];

const MessageNext: React.FC = () => (
  <div className="bg-cream text-sumi">
    <Helmet>
      <title>代表あいさつ・経歴 | 会社案内 - Arcle</title>
      <meta name="description" content="Arcle代表 栗原勇太のあいさつと経歴。データエンジニア・DX推進の経験をもとに、中小企業のIT・データ活用を支援しています。" />
      <link rel="canonical" href="https://www.arcle.net/company/message" />
    </Helmet>

    <PageHeader en="Message" title="代表あいさつ" crumbs={[{ label: '会社案内', href: '/company' }, { label: '代表あいさつ' }]} />

    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-[360px_1fr] gap-12 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28 text-center lg:text-left">
          <div className="group relative mx-auto lg:mx-0 w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full bg-mustard border-[2.5px] border-sumi -translate-x-3 translate-y-3" />
            <Sparkle className="absolute -right-2 top-2 w-9 h-9 text-svc-josys" />
            <img
              src="/images/Gemini_Generated_Image_guortkguortkguor.png"
              alt="Arcle代表 栗原勇太のプロフィール写真"
              className="pop-tilt-r relative w-full h-full rounded-full object-cover border-[2.5px] border-sumi"
            />
          </div>
          <p className="pop-float mt-8 inline-block -rotate-3 px-4 py-1 rounded-lg bg-svc-josys text-white text-xs font-black tracking-widest uppercase border-2 border-sumi shadow-[3px_3px_0_#1F2430]">Data &amp; IT Consultant</p>
          <p className="mt-5 font-head text-4xl font-black">栗原 勇太</p>
          <p className="font-en text-sumi-muted tracking-widest">Yuta Kurihara</p>
          <ul className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2">
            {specialties.map((tag) => (
              <li key={tag} className="text-xs font-bold px-3 py-1 rounded-full bg-cream border-2 border-sumi">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Sticker className="font-en text-sm font-black italic tracking-[0.12em] uppercase">Message</Sticker>
          <h2 className="font-head text-[30px] md:text-[48px] font-black leading-[1.35] mt-5 [word-break:auto-phrase]">
            データとITの力で、
            <br />
            企業の<Mark>ポテンシャルを解放</Mark>する。
          </h2>
          <div className="mt-8 space-y-5 text-[16px] leading-[2.1] text-sumi-muted">
            <p>はじめまして。Arcle代表の栗原です。</p>
            <p>これまで企業のITやデータ活用に携わる中で、「IT担当者がいれば…」「蓄積されたデータをうまく使えれば…」という場面を数多く見てきました。</p>
            <p>
              中小企業や個人事業主の方こそ、最新のテクノロジーを味方につけることで、その独自性を武器に大きく成長できると確信しています。私の経験が、日々挑戦を続ける皆様の課題解決の一助となれば幸いです。
            </p>
          </div>

          <div className="mt-16">
            <SectionHead en="Biography" title="経歴" />
            <ol className="-mt-4 relative border-l-[2.5px] border-dashed border-sumi ml-3 space-y-8">
              {career.map((item, i) => (
                <li key={item.title} className="pop-reveal relative pl-8" style={{ animationDelay: `${i * 90}ms` }}>
                  <span className={`absolute -left-[12px] top-1.5 w-5 h-5 rounded-full border-[2.5px] border-sumi ${item.color}`} />
                  <p className="font-head text-xl md:text-2xl font-black leading-snug">{item.title}</p>
                  <p className="text-sm text-sumi-muted font-en">{item.role}</p>
                  <p className="mt-2 leading-[1.9] text-sumi-muted">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className={`pop-reveal mt-14 rounded-[28px] bg-cream p-6 md:p-8 ${card}`}>
            <p className="font-head text-xl md:text-2xl font-black">保有資格</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {certifications.map((c) => (
                <li key={c} className="pop-wiggle px-4 py-2 rounded-full bg-white border-2 border-sumi text-sm font-bold">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <a href="/company" className="mt-10 inline-flex items-center gap-2 font-bold text-svc-josys hover:underline">
            会社案内に戻る
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>

    <ContactCta />
  </div>
);

export default MessageNext;
