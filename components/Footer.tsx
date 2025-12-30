import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <span className="font-en text-2xl font-bold tracking-wider">Arcle</span>
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              Connecting Arcs, Creating Circles.<br />
              テクノロジーとデザインで、<br />
              ビジネスの新たな可能性をつなぎます。
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">About Us</h4>
            <div className="flex flex-col space-y-4">
              <a href="#philosophy" onClick={(e) => handleNavigation(e, '#philosophy')} className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">理念</a>
              <a href="#profile" onClick={(e) => handleNavigation(e, '#profile')} className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">プロフィール</a>
              <a href="/contact" onClick={(e) => handleNavigation(e, '/contact')} className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">お問い合わせ</a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">サービス</h4>
            <div className="flex flex-col space-y-4">
              <a href="/josys" onClick={(e) => handleNavigation(e, '/josys')} className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">情シス代行</a>
              <a href="/data-consulting" onClick={(e) => handleNavigation(e, '/data-consulting')} className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">データコンサルティング</a>
              <a href="/gen-ai" onClick={(e) => handleNavigation(e, '/gen-ai')} className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">生成AI活用支援</a>
              <a href="/web-production" onClick={(e) => handleNavigation(e, '/web-production')} className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Web制作</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} Arcle Inc. 無断転載を禁じます。</p>
          <div className="mt-4 md:mt-0 space-x-4">
             <div className="w-5 h-5 bg-gray-700 rounded-full inline-block hover:bg-gray-500 cursor-pointer transition-colors"></div>
             <div className="w-5 h-5 bg-gray-700 rounded-full inline-block hover:bg-gray-500 cursor-pointer transition-colors"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};