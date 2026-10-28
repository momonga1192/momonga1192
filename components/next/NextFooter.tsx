import React from 'react';
import { services } from './theme';

const groups = [
  { title: 'サービス', links: [...services.map((s) => ({ label: s.name, href: s.href })), { label: 'ホームページ作例集', href: '/samples' }] },
  {
    title: 'Arcleについて',
    links: [
      { label: '会社案内', href: '/company' },
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

const NextFooter: React.FC = () => (
  <footer className="bg-sumi text-white/80 border-t-[2.5px] border-sumi">
    <div className="max-w-6xl mx-auto px-5 pt-16 pb-10 grid gap-12 md:grid-cols-[1.2fr_2fr]">
      <div>
        <p className="font-en text-4xl font-black italic text-white">Arcle</p>
        <p className="mt-4 text-sm leading-relaxed">
          中小企業のIT部門として
          <br />
          情シス・データ・生成AI・Webをまとめて支援しています。
        </p>
        <div className="mt-6 flex gap-2" aria-hidden="true">
          {services.map((s) => (
            <span key={s.key} className={`w-4 h-4 rounded-full border-2 border-white/80 ${s.bg}`} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="mb-4"><span className="inline-block -rotate-2 rounded-md bg-mustard px-2 py-0.5 text-xs font-black tracking-widest text-sumi">{group.title}</span></p>
            <ul className="space-y-3 text-sm">
              {group.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-mustard transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    <p className="max-w-6xl mx-auto px-5 py-6 border-t border-white/10 text-xs text-white/50">© Arcle</p>
  </footer>
);

export default NextFooter;
