import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ContactCta, PageHeader, SectionHead } from '../parts';

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

    <section className="py-20 md:py-28 bg-white rounded-t-[48px] md:rounded-t-[80px]">
      <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-[360px_1fr] gap-12 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28 text-center lg:text-left">
          <div className="relative mx-auto lg:mx-0 w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full bg-mustard/30 -translate-x-3 translate-y-3" />
            <img
              src="/images/Gemini_Generated_Image_guortkguortkguor.png"
              alt="Arcle代表 栗原勇太のプロフィール写真"
              className="relative w-full h-full rounded-full object-cover border-4 border-white"
            />
          </div>
          <p className="mt-8 inline-block px-4 py-1 rounded-full bg-svc-josys text-white text-xs font-bold tracking-widest uppercase">Data &amp; IT Consultant</p>
          <p className="mt-4 font-head text-3xl font-bold">栗原 勇太</p>
          <p className="font-en text-sumi-muted tracking-widest">Yuta Kurihara</p>
          <ul className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2">
            {specialties.map((tag) => (
              <li key={tag} className="text-xs px-3 py-1 rounded-full bg-cream border border-warm-line">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-en text-sm font-semibold tracking-[0.2em] uppercase text-svc-josys">Message</p>
          <h2 className="font-head text-[28px] md:text-[40px] font-bold leading-snug mt-2 [word-break:auto-phrase]">
            データとITの力で、
            <br />
            <span className="bg-[linear-gradient(transparent_62%,rgb(242_181_68/0.55)_62%)]">企業のポテンシャルを解放する。</span>
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
            <ol className="-mt-4 relative border-l-2 border-warm-line ml-3 space-y-8">
              {career.map((item) => (
                <li key={item.title} className="relative pl-8">
                  <span className={`absolute -left-[9px] top-2 w-4 h-4 rounded-full border-4 border-white ${item.color}`} />
                  <p className="font-head text-lg font-bold">{item.title}</p>
                  <p className="text-sm text-sumi-muted font-en">{item.role}</p>
                  <p className="mt-2 leading-[1.9] text-sumi-muted">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-14 rounded-[28px] bg-cream border border-warm-line p-6 md:p-8">
            <p className="font-head font-bold">保有資格</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {certifications.map((c) => (
                <li key={c} className="px-4 py-2 rounded-full bg-white border border-warm-line text-sm font-medium">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <a href='/company' className="mt-10 inline-flex items-center gap-2 font-bold text-svc-josys">
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
