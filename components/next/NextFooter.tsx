import React from 'react';
import { services } from './theme';

const groups = [
  { title: 'サービス', links: [...services.map((s) => ({ label: s.name, href: s.href })), { label: 'ホームページ作例集', href: '/samples' }] },
  {
    title: 'Arcleについて',
    links: [
      { label: '事業者概要', href: '/company' },
      { label: '代表あいさつ', href: '/company/message' },
      { label: '支援モデルケース', href: '/works' },
      { label: 'お役立ち記事', href: '/articles' }
    ]
  },
  {
    title: 'ご相談',
    links: [
      { label: 'ご相談の流れ', href: '/flow' },
      { label: 'よくあるご質問', href: '/flow#faq' },
      { label: 'お問い合わせ', href: '/contact' },
      { label: 'プライバシーポリシー', href: '/privacy' }
    ]
  }
];

// フッター：コミックの最終ページ。濃紺の網点の地に「TO BE CONTINUED...」の箱と、飛んでいくヒーロー
const NextFooter: React.FC = () => (
  <footer className="relative overflow-hidden bg-sumi comic-dots-light text-white/85 border-t-[4px] border-[#111]">
    <div className="relative max-w-6xl mx-auto px-4 sm:px-5 pt-16 pb-10 grid gap-12 md:grid-cols-[1.2fr_2fr]">
      <div className="relative">
        <p className="inline-block -rotate-3 font-comic text-[52px] leading-none tracking-[0.04em] text-mustard [paint-order:stroke_fill] [-webkit-text-stroke:8px_#111] [text-shadow:4px_4px_0_#111]">Arcle</p>
        <p className="mt-5 inline-block bg-white text-[#111] border-[3px] border-[#111] shadow-[4px_4px_0_#F2B544] px-4 py-3 text-sm font-bold leading-relaxed">
          中小企業のIT部門として
          <br />
          情シス・データ・生成AI・Webをまとめて支援しています。
        </p>
        <div className="mt-6 flex gap-2" aria-hidden="true">
          {services.map((s, i) => (
            <span key={s.key} className={`w-5 h-5 border-[3px] border-[#111] shadow-[2px_2px_0_#F2B544] ${i % 2 ? 'rotate-6' : '-rotate-6'} ${s.bg}`} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-10 content-start sm:pb-28 md:pb-40">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="mb-5">
              <span className="inline-block -rotate-2 bg-mustard px-2.5 py-1 font-manga text-[13px] tracking-widest text-[#111] border-[3px] border-[#111] shadow-[3px_3px_0_#111]">{group.title}</span>
            </p>
            <ul className="space-y-3 text-sm font-bold">
              {group.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-mustard hover:underline underline-offset-4 decoration-2 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    {/* 右下の空いたところを、ヒーローが飛んでいく（スマホは3つ目の項目の右、PCはリンクの下） */}
    <img
      src="/images/illust-comic/parts/hero-fly.webp"
      alt=""
      className="pop-float absolute right-3 bottom-24 md:right-[max(1.5rem,calc((100vw-72rem)/2))] md:bottom-24 w-[150px] md:w-[230px] -rotate-6 pointer-events-none"
      loading="lazy"
    />
    <div className="relative max-w-6xl mx-auto px-4 sm:px-5 py-6 border-t-[3px] border-dashed border-white/20 flex flex-wrap items-center justify-between gap-4">
      <p className="text-xs text-white/60">© Arcle</p>
      <span className="inline-block rotate-1 bg-mustard text-[#111] border-[3px] border-[#111] shadow-[3px_3px_0_#111] px-3 py-1 font-comic text-[18px] tracking-[0.08em]" aria-hidden="true">
        TO BE CONTINUED...
      </span>
    </div>
  </footer>
);

export default NextFooter;
