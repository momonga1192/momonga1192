import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { services } from './theme';

const nav = [
  { label: 'サービス', href: '/services', children: services.map((s) => ({ label: s.name, href: s.href })) },
  { label: '支援事例', href: '/works' },
  { label: '事業者概要', href: '/company' },
  { label: 'ご相談の流れ', href: '/flow' },
  { label: 'お役立ち記事', href: '/articles' }
];

// PCのメニューの文字。マウスを乗せると、からし色の札が敷かれる
const navLink = 'px-3 py-1.5 font-manga text-[14px] text-[#111] border-[3px] border-transparent transition-all hover:bg-mustard hover:border-[#111] hover:-rotate-2 hover:shadow-[3px_3px_0_#111]';
// スマホのメニューの札は、1枚ずつ少しずつ傾ける
const navTilt = ['-rotate-1', 'rotate-1', '-rotate-[0.5deg]', 'rotate-[0.5deg]', '-rotate-1'];

const NextHeader: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF3E0] border-b-[4px] border-[#111]">
      {/* 網点の地（文字の後ろは薄く） */}
      <div className="absolute inset-0 comic-dots opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-5 h-[72px] flex items-center justify-between gap-6">
        {/* ロゴ：コミックの題字のように、からし色の文字に黒ぶちと影 */}
        <a href='/' className="group flex items-center gap-2 shrink-0">
          <span className="font-comic text-[34px] leading-none tracking-[0.04em] text-mustard [paint-order:stroke_fill] [-webkit-text-stroke:6px_#111] [text-shadow:3px_3px_0_#111] -rotate-3 transition-transform group-hover:-rotate-6 group-hover:scale-105">Arcle</span>
          <span className="font-manga text-[10px] text-[#111] tracking-[0.2em] bg-white border-2 border-[#111] px-1.5 py-0.5 -rotate-2">アークル</span>
        </a>

        <nav className="hidden lg:flex items-center gap-1" aria-label="メインメニュー">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                <a href={item.href} className={`flex items-center gap-1 ${navLink}`}>
                  {item.label}
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </a>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all">
                  <ul className="w-60 -rotate-1 bg-white border-[3px] border-[#111] shadow-[6px_6px_0_#111] p-2">
                    {services.map((s) => (
                      <li key={s.key}>
                        <a href={s.href} className="flex items-center gap-3 px-3 py-2.5 font-manga text-[15px] text-[#111] hover:bg-mustard">
                          <span className={`w-3.5 h-3.5 rotate-12 border-2 border-[#111] ${s.bg}`} />
                          {s.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <a key={item.label} href={item.href} className={navLink}>
                {item.label}
              </a>
            )
          )}
        </nav>

        <a
          href="/contact"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 -rotate-2 bg-coral text-white font-manga text-[14px] border-[3px] border-[#111] shadow-[4px_4px_0_#111] transition-all hover:rotate-0 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#111]"
        >
          無料で相談する
          <ArrowRight className="w-4 h-4" strokeWidth={3} />
        </a>

        <button
          type="button"
          className={`lg:hidden grid place-items-center w-11 h-11 border-[3px] border-[#111] shadow-[3px_3px_0_#111] transition-colors ${open ? 'bg-[#111] text-mustard' : 'bg-mustard text-[#111]'}`}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="メニュー"
        >
          {open ? <X className="w-6 h-6" strokeWidth={3} /> : <Menu className="w-6 h-6" strokeWidth={3} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden relative border-t-[4px] border-[#111] bg-mustard comic-dots max-h-[calc(100dvh-76px)] overflow-y-auto">
          <ul className="max-w-6xl mx-auto px-4 sm:px-5 py-5 space-y-3">
            {nav.map((item) => (
              <li key={item.label} className={`bg-white border-[3px] border-[#111] shadow-[4px_4px_0_#111] px-4 py-3 ${navTilt[nav.indexOf(item) % navTilt.length]}`}>
                <a href={item.href} className="flex items-center justify-between font-manga text-[16px] text-[#111]">
                  {item.label}
                  <ArrowRight className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
                </a>
                {item.children && (
                  <ul className="mt-3 grid grid-cols-2 gap-2">
                    {services.map((s) => (
                      <li key={s.key}>
                        <a href={s.href} className={`flex items-center gap-2 px-2.5 py-2 text-[13px] font-manga text-white border-2 border-[#111] ${s.bg}`}>
                          {s.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="pt-2">
              <a href="/contact" className="flex justify-center items-center gap-2 py-4 bg-coral text-white font-manga text-[17px] border-[3px] border-[#111] shadow-[5px_5px_0_#111]">
                無料で相談する
                <ArrowRight className="w-5 h-5" strokeWidth={3} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default NextHeader;
