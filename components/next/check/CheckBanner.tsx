import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, Gift, X } from 'lucide-react';

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
        className={`no-print fixed right-4 bottom-4 z-40 w-16 h-16 comic-rays [--ray-a:#3B6FE0] [--ray-b:#4A7DEA] border-[3px] border-[#111] shadow-[4px_4px_0_#111] -rotate-3 hover:rotate-3 ${motion}`}
      >
        {/* たたんだときは、ヒーローの顔だけをのぞかせる */}
        <span className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <img src="/images/illust-comic/contact-check-banner.webp" alt="" className="absolute inset-0 w-full h-full object-cover object-[50%_4%] scale-[1.35] origin-top" />
        </span>
        <span className="absolute -top-3 -left-4 -rotate-12 bg-coral px-1.5 py-0.5 text-[10px] font-manga text-white border-2 border-[#111] shadow-[2px_2px_0_#111]">無料診断</span>
      </button>
    );
  }

  // バナー：1つのコマ。上（PC）／左（スマホ）は青い集中線に、聴診器とクリップボードのヒーローが枠から飛び出す。
  // 下／右は白い地に、診断の名前とプレゼントの案内。英字の吹き出しは飾り
  return (
    <div className={`no-print fixed z-40 inset-x-3 bottom-3 md:inset-x-auto md:right-5 md:bottom-5 md:w-[200px] ${motion}`}>
      <a
        href="/it-check"
        onClick={click}
        className="group relative flex md:flex-col items-stretch bg-white text-[#111] border-[3px] border-[#111] shadow-[5px_5px_0_#F07A5A,7px_7px_0_#111] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#F07A5A,4px_4px_0_#111]"
      >
        {/* 絵のコマ：左右と下は枠で切り、上だけはみ出させる */}
        <span className="it-check-banner-art relative shrink-0 w-[76px] md:w-auto md:h-[72px] comic-rays [--ray-a:#3B6FE0] [--ray-b:#4A7DEA] border-r-[3px] md:border-r-0 md:border-b-[3px] border-[#111] [clip-path:inset(-100%_0_0_0)]">
          <img
            src="/images/illust-comic/contact-check-banner.webp"
            alt=""
            className="pop-tilt absolute bottom-0 left-1/2 -translate-x-1/2 w-[88px] md:w-[128px] max-w-none"
          />
          <span
            className="hidden md:block comic-pop absolute -left-3 top-2 bg-white border-[3px] border-[#111] rounded-[50%] px-2.5 py-1 font-comic text-[17px] leading-none tracking-[0.04em] shadow-[2px_2px_0_#111]"
            style={{ '--r': '-10deg' } as React.CSSProperties}
            aria-hidden="true"
          >
            CHECK UP!
          </span>
        </span>
        <span className="flex-1 min-w-0 flex md:block items-center gap-2 pl-2.5 pr-9 py-2 md:px-2.5 md:pt-2.5 md:pb-2.5 comic-dots">
          <span className="block min-w-0">
            <span className="block text-[10px] md:text-[11px] font-bold">
              <span className="inline-block -rotate-3 mr-1.5 bg-mustard px-1.5 text-[10px] font-manga text-[#111] border-2 border-[#111]">無料</span>
              3分でわかる
            </span>
            <span className="block font-manga text-[16px] md:text-[16px] leading-tight mt-1 text-white [paint-order:stroke_fill] [-webkit-text-stroke:5px_#111] [text-shadow:2px_2px_0_#111]">会社のIT健康診断</span>
            {/* 診断の続きを入力すると、資料PDFがもらえる */}
            <span className="mt-1 md:mt-1.5 inline-flex items-center gap-1 bg-white border-2 border-[#111] px-1.5 py-px text-[10px] md:text-[9px] font-black text-svc-josys">
              <Gift className="w-3 h-3 md:w-3 md:h-3 shrink-0" strokeWidth={2.6} />
              はじめてのDX読本プレゼント
            </span>
          </span>
          <span className="hidden md:flex mt-2.5 w-full justify-center items-center gap-1 -rotate-1 bg-coral text-white px-3 py-1.5 text-[13px] font-manga border-[3px] border-[#111] shadow-[3px_3px_0_#111]">
            診断してみる
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={3} />
          </span>
          <span className="md:hidden ml-auto grid place-items-center w-8 h-8 shrink-0 bg-coral text-white border-[3px] border-[#111] shadow-[2px_2px_0_#111] -rotate-3">
            <ArrowRight className="w-4 h-4" strokeWidth={3} />
          </span>
        </span>
      </a>
      <button
        type="button"
        onClick={() => fold(true)}
        aria-label="バナーをたたむ"
        className="absolute -top-3 -right-2 md:-top-3.5 md:-right-3 z-10 grid place-items-center w-8 h-8 bg-white text-[#111] border-[3px] border-[#111] shadow-[2px_2px_0_#111] rotate-6 hover:bg-mustard"
      >
        <X className="w-4 h-4" strokeWidth={3.5} />
      </button>
    </div>
  );
};

export default CheckBanner;
