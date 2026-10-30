// トップのローディング演出を流すときは、Reactが動くまで黒い幕で隠す（components/next/HeroIntro.tsx 参照）
// 本番は同じタブで1回だけ。確認用のサーバーや手元では毎回流す
try {
  var always = location.hostname !== 'www.arcle.net';
  if (location.pathname === '/' && (always || !sessionStorage.getItem('arcle-hero-intro')) && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.dataset.intro = '1';
  }
} catch (e) {}
