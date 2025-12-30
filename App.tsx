import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header, Footer, OpeningOverlay, ScrollAnimationCanvas } from './components';
import Home from './components/Home';
import Josys from './components/Josys';
import DataConsulting from './components/DataConsulting';
import GenAI from './components/GenAI';
import WebProduction from './components/WebProduction';
import ContactForm from './components/ContactForm';

// --- Main App Component ---

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="relative min-h-screen bg-white selection:bg-gray-200 selection:text-black overflow-hidden">
      {isHomePage && <OpeningOverlay onComplete={() => setIsLoading(false)} />}
      <ScrollAnimationCanvas startAnimation={!isLoading || !isHomePage} />
      <Header />
      <main className="relative z-10">
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
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
