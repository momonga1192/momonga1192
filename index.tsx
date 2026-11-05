import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { gaMeasurementId } from './ga';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// 自分のアクセスを数えない。?internal=1 で開いたブラウザと、開発サーバー（UM350）から移ってきたブラウザに印を付ける（?internal=0 で外す）
const INTERNAL_KEY = 'arcle_internal';
const isInternalVisit = () => {
  try {
    const flag = new URLSearchParams(window.location.search).get('internal');
    if (flag === '0') localStorage.removeItem(INTERNAL_KEY);
    let fromDev = false;
    try {
      fromDev = /^(um350|100\.75\.216\.83|localhost|127\.0\.0\.1|192\.168\.)/.test(new URL(document.referrer).hostname);
    } catch {
      // リファラーなし
    }
    if (flag === '1' || fromDev) localStorage.setItem(INTERNAL_KEY, '1');
    return localStorage.getItem(INTERNAL_KEY) === '1';
  } catch {
    return false;
  }
};

const initGoogleAnalytics = () => {
  const measurementId = gaMeasurementId;
  // 本番のドメインだけ計測する（手元の確認やVercelのプレビューを数えない）
  if (!measurementId || typeof window === 'undefined' || window.location.hostname !== 'www.arcle.net') {
    return;
  }
  if (isInternalVisit()) {
    return;
  }

  const existing = document.querySelector(`script[data-ga4="${measurementId}"]`);
  if (existing) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // gtag.js は arguments オブジェクトだけを命令として読む（配列で積むと送信されない）
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.dataset.ga4 = measurementId;
  document.head.appendChild(script);
};

initGoogleAnalytics();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 本番は書き出したHTML（scripts/prerender.mjs）をそのまま引き継ぐ。開発サーバーでは中身が空なので最初から描く
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
