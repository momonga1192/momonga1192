import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header, Footer, OpeningOverlay, ScrollAnimationCanvas } from './components';
import Home from './components/Home';
import Josys from './components/Josys';
import DataConsulting from './components/DataConsulting';
import GenAI from './components/GenAI';
import WebProduction from './components/WebProduction';
import ContactForm from './components/ContactForm';

// --- Scroll to top on route change ---
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Main App Component ---

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="relative min-h-screen bg-white selection:bg-gray-200 selection:text-black overflow-hidden">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:top-4 focus:left-4 focus:bg-white focus:text-gray-900 focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:text-sm focus:font-medium">
        メインコンテンツへスキップ
      </a>
      {isHomePage && <OpeningOverlay onComplete={() => setIsLoading(false)} />}
      <ScrollAnimationCanvas startAnimation={!isLoading || !isHomePage} />
      <ScrollToTop />
      <Header />
      <main id="main-content" className="relative z-10">
        <Routes>
          <Route path="/" element={<Home isLoaded={!isLoading} />} />
          <Route path="/josys" element={<Josys />} />
          <Route path="/data-consulting" element={<DataConsulting />} />
          <Route path="/gen-ai" element={<GenAI />} />
          <Route path="/web-production" element={<WebProduction />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

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
