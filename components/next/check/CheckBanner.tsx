import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, ClipboardCheck, X } from 'lucide-react';
import { illust } from '../theme';

// スクロールすると出てくる「会社のIT健康診断」への誘導バナー
// 診断・問い合わせのページでは出さず、相談の案内（data-hide-banner）やフッターが見えている間は引っ込める
// ×は消さずに小さな丸ボタンにたたむ（同じタブの間は、たたんだまま）
const HIDE_ON = ['/it-check', '/contact'];
const MINI = 'check-banner-mini';

const CheckBanner: React.FC = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [covered, setCovered] = useState(false);
  const [mini, setMini] = useState(false);

  useEffect(() => {
    try {
      setMini(sessionStorage.getItem(MINI) === '1');
    } catch {
      /* 保存できない環境では、毎回ひらいた状態で出す */
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setCovered(seen.size > 0);
    });
    const watch = () => document.querySelectorAll('[data-hide-banner], footer').forEach((el) => io.observe(el));
    watch();
    // ページを移動して入れ替わった要素も拾う
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  const fold = (value: boolean) => {
    setMini(value);
    try {
      sessionStorage.setItem(MINI, value ? '1' : '0');
    } catch {
      /* 同上 */
    }
  };

  const visible = !HIDE_ON.includes(pathname) && scrolled && !covered;
  const motion = `transition-all duration-500 ease-[cubic-bezier(0.3,1.4,0.5,1)] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0 pointer-events-none'}`;
  const click = () => window.gtag?.('event', 'it_check_banner_click', { page: pathname });

  if (mini) {
    return (
      <button
        type="button"
        onClick={() => fold(false)}
        aria-label="会社のIT健康診断のバナーをひらく"
        className={`no-print fixed right-4 bottom-4 z-40 grid place-items-center w-16 h-16 rounded-full bg-mustard text-sumi border-[2.5px] border-sumi shadow-[4px_4px_0_#1F2430] hover:-rotate-6 ${motion}`}
      >
        <ClipboardCheck className="w-7 h-7" strokeWidth={2.4} />
        <span className="absolute -top-2 -left-3 -rotate-12 rounded-md bg-coral px-1.5 py-0.5 text-[10px] font-black text-white border-2 border-sumi">無料診断</span>
      </button>
    );
  }

  return (
    <div className={`no-print fixed z-40 inset-x-3 bottom-3 md:inset-x-auto md:right-5 md:bottom-5 md:w-[300px] ${motion}`}>
      <a
        href="/it-check"
        onClick={click}
        className="group relative flex md:block items-center gap-3 rounded-[22px] md:rounded-[26px] bg-sumi text-white border-[2.5px] border-sumi shadow-[5px_5px_0_#F2B544] pl-[122px] pr-10 py-3.5 md:p-5 md:pt-[118px] bg-[radial-gradient(circle_at_0%_100%,rgb(30_156_140/0.55),transparent_55%)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_#F2B544]"
      >
        <img
          src={illust('check-banner')}
          alt=""
          className="pop-tilt absolute left-1 -top-9 w-[118px] md:left-1/2 md:-translate-x-1/2 md:-top-16 md:w-[250px] max-w-none [mask-image:linear-gradient(to_bottom,black_78%,transparent)]"
        />
        <span className="hidden md:inline-block -rotate-3 rounded-lg bg-mustard px-2.5 py-0.5 text-xs font-black text-sumi shadow-[2px_2px_0_#1E9C8C]">無料・登録なしで結果がわかる</span>
        <span className="block">
          <span className="block text-[11px] md:text-sm font-bold text-white/80 md:mt-2">
            <span className="md:hidden inline-block -rotate-3 mr-1.5 rounded bg-mustard px-1.5 text-[10px] font-black text-sumi">無料</span>
            3分でわかる
          </span>
          <span className="block font-head font-black text-[17px] md:text-[24px] leading-tight">会社のIT健康診断</span>
        </span>
        <span className="hidden md:inline-flex mt-3 items-center gap-1.5 rounded-full bg-mustard text-sumi px-4 py-2 text-sm font-black border-2 border-sumi">
          診断してみる
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </span>
        <ArrowRight className="md:hidden ml-auto w-5 h-5 shrink-0 text-mustard" />
      </a>
      <button
        type="button"
        onClick={() => fold(true)}
        aria-label="バナーをたたむ"
        className="absolute -top-2.5 -right-2 md:-top-3 md:-right-3 grid place-items-center w-8 h-8 rounded-full bg-white text-sumi border-2 border-sumi shadow-[2px_2px_0_#1F2430] hover:bg-mustard"
      >
        <X className="w-4 h-4" strokeWidth={3} />
      </button>
    </div>
  );
};

export default CheckBanner;
