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

const initGoogleAnalytics = () => {
  const measurementId = gaMeasurementId;
  // 本番のドメインだけ計測する（手元の確認やVercelのプレビューを数えない）
  if (!measurementId || typeof window === 'undefined' || window.location.hostname !== 'www.arcle.net') {
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

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
