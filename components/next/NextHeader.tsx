import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { services } from './theme';

const nav = [
  { label: 'サービス', href: '/services', children: services.map((s) => ({ label: s.name, href: s.href })) },
  { label: '支援モデルケース', href: '/works' },
  { label: '事業者概要', href: '/company' },
  { label: 'ご相談の流れ', href: '/flow' },
  { label: 'お役立ち記事', href: '/articles' }
];

const NextHeader: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b-[2.5px] border-sumi">
      <div className="max-w-6xl mx-auto px-5 h-[72px] flex items-center justify-between gap-6">
        <a href='/' className="flex items-baseline gap-2 shrink-0">
          <span className="font-en text-[28px] font-black italic tracking-tight text-sumi">Arcle</span>
          <span className="text-[11px] text-sumi-muted tracking-[0.2em]">アークル</span>
        </a>

        <nav className="hidden lg:flex items-center gap-7" aria-label="メインメニュー">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                <a href={item.href} className="flex items-center gap-1 text-[15px] font-medium text-sumi hover:text-svc-josys">
                  {item.label}
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </a>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <ul className="w-56 rounded-2xl bg-white border-[2.5px] border-sumi shadow-[5px_5px_0_#1F2430] p-2">
                    {services.map((s) => (
                      <li key={s.key}>
                        <a href={s.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-cream text-[15px]">
                          <span className={`w-3 h-3 rounded-full border-2 border-sumi ${s.bg}`} />
                          {s.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <a key={item.label} href={item.href} className="text-[15px] font-medium text-sumi hover:text-svc-josys">
                {item.label}
              </a>
            )
          )}
        </nav>

        <a
          href="/contact"
          className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-sumi text-white text-sm font-bold border-2 border-sumi shadow-[4px_4px_0_#F2B544] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#F2B544]"
        >
          無料で相談する
          <ArrowRight className="w-4 h-4" />
        </a>

        <button type="button" className="lg:hidden p-2 -mr-2 text-sumi" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="メニュー">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t-2 border-sumi bg-cream">
          <ul className="max-w-6xl mx-auto px-5 py-4 divide-y divide-warm-line">
            {nav.map((item) => (
              <li key={item.label} className="py-3">
                <a href={item.href} className="font-bold text-sumi">
                  {item.label}
                </a>
                {item.children && (
                  <ul className="mt-3 grid grid-cols-2 gap-2">
                    {services.map((s) => (
                      <li key={s.key}>
                        <a href={s.href} className="flex items-center gap-2 text-sm text-sumi-muted">
                          <span className={`w-2 h-2 rounded-full ${s.bg}`} />
                          {s.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="pt-4">
              <a href="/contact" className="flex justify-center items-center gap-2 py-3 rounded-full bg-sumi text-white font-bold border-2 border-sumi shadow-[4px_4px_0_#F2B544]">
                無料で相談する
                <ArrowRight className="w-4 h-4" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default NextHeader;
