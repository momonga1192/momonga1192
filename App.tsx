import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ContactForm from './components/ContactForm';
import JosysRescue from './components/lp/JosysRescue';
import Mieruka from './components/lp/Mieruka';
import HajimeteAI from './components/lp/HajimeteAI';
import WebMadoguchi from './components/lp/WebMadoguchi';
import ArticlesIndex from './components/articles/ArticlesIndex';
import ArticleJosysGuide from './components/articles/ArticleJosysGuide';
import ArticleBIToolChoice from './components/articles/ArticleBIToolChoice';
import ArticleChatGPTPolicy from './components/articles/ArticleChatGPTPolicy';
import ArticleM365Migration from './components/articles/ArticleM365Migration';
import ArticleExcelToPowerBI from './components/articles/ArticleExcelToPowerBI';
import ArticleWebMonthlyVsOneTime from './components/articles/ArticleWebMonthlyVsOneTime';
import ArticleWebCompanyGuide from './components/articles/ArticleWebCompanyGuide';
import ArticleAIMeetingMinutes from './components/articles/ArticleAIMeetingMinutes';
import WorksIndex from './components/works/WorksIndex';
import WorkDetail from './components/works/WorkDetail';
import HomePop from './components/next/HomePop';
import ServicesNext from './components/next/pages/ServicesNext';
import CompanyNext from './components/next/pages/CompanyNext';
import MessageNext from './components/next/pages/MessageNext';
import FlowNext from './components/next/pages/FlowNext';
import JosysNext from './components/next/pages/JosysNext';
import DataNext from './components/next/pages/DataNext';
import GenAINext from './components/next/pages/GenAINext';
import WebNext from './components/next/pages/WebNext';
import NextHeader from './components/next/NextHeader';
import PopMotion from './components/next/PopMotion';
import NextFooter from './components/next/NextFooter';
import ItCheck from './components/next/check/ItCheck';
import CheckBanner from './components/next/check/CheckBanner';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// --- Scroll to top on route change ---
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- SPA pageview tracking (GA4) ---
const TrackPageView: React.FC = () => {
  const location = useLocation();
  const measurementId = (import.meta as any).env?.VITE_GA_MEASUREMENT_ID as string | undefined;

  useEffect(() => {
    if (!measurementId || typeof window === 'undefined' || typeof window.gtag !== 'function') {
      return;
    }

    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${location.pathname}${location.search}`,
      send_to: measurementId
    });
  }, [location.pathname, location.search, measurementId]);

  return null;
};

// --- Main App Component ---

export const AppContent: React.FC = () => (
  <div className="relative min-h-screen bg-cream print:bg-white text-sumi">
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:top-4 focus:left-4 focus:bg-white focus:text-gray-900 focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:text-sm focus:font-medium">
      メインコンテンツへスキップ
    </a>
    <ScrollToTop />
    <TrackPageView />
    <PopMotion />
    <NextHeader />
    <main id="main-content">
      <Routes>
        <Route path="/" element={<HomePop />} />
        <Route path="/services" element={<ServicesNext />} />
        <Route path="/josys" element={<JosysNext />} />
        <Route path="/data-consulting" element={<DataNext />} />
        <Route path="/gen-ai" element={<GenAINext />} />
        <Route path="/web-production" element={<WebNext />} />
        <Route path="/company" element={<CompanyNext />} />
        <Route path="/company/message" element={<MessageNext />} />
        <Route path="/flow" element={<FlowNext />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/it-check" element={<ItCheck />} />
        <Route path="/articles" element={<ArticlesIndex />} />
        <Route path="/articles/ichinomiya-josys-outsourcing-guide" element={<ArticleJosysGuide />} />
        <Route path="/articles/sme-bi-tableau-powerbi" element={<ArticleBIToolChoice />} />
        <Route path="/articles/chatgpt-security-policy-sme" element={<ArticleChatGPTPolicy />} />
        <Route path="/articles/microsoft-365-migration-sme" element={<ArticleM365Migration />} />
        <Route path="/articles/excel-report-automation-power-bi" element={<ArticleExcelToPowerBI />} />
        <Route path="/articles/monthly-vs-one-time-website" element={<ArticleWebMonthlyVsOneTime />} />
        <Route path="/articles/website-company-guide-aichi-tokai" element={<ArticleWebCompanyGuide />} />
        <Route path="/articles/ai-meeting-minutes-guide" element={<ArticleAIMeetingMinutes />} />
        <Route path="/works" element={<WorksIndex />} />
        <Route path="/works/:slug" element={<WorkDetail />} />
        <Route path="/lp/josys-rescue" element={<JosysRescue />} />
        <Route path="/lp/mieruka" element={<Mieruka />} />
        <Route path="/lp/hajimete-ai" element={<HajimeteAI />} />
        <Route path="/lp/web-madoguchi" element={<WebMadoguchi />} />
      </Routes>
    </main>
    <NextFooter />
    <CheckBanner />
  </div>
);

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
};

export default App;
