import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { WebsiteDevPage } from './pages/WebsiteDevPage';
import { CustomSoftwarePage } from './pages/CustomSoftwarePage';
import { AppDevPage } from './pages/AppDevPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './styles/theme.css';

interface AppProps {
  currentPath?: string;
}

export const App: React.FC<AppProps> = ({ currentPath: initialPath }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (initialPath) return initialPath;
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Handle popstate for browser back/forward buttons
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Normalize path
  const normalizedPath = currentPath.endsWith('/') || currentPath.includes('.') 
    ? currentPath 
    : `${currentPath}/`;

  const renderPage = () => {
    switch (normalizedPath) {
      case '/':
      case '/index.html':
        return <HomePage />;
      case '/services/':
      case '/services/index.html':
        return <ServicesPage />;
      case '/website-development/':
      case '/website-development/index.html':
        return <WebsiteDevPage />;
      case '/custom-software/':
      case '/custom-software/index.html':
        return <CustomSoftwarePage />;
      case '/application-development/':
      case '/application-development/index.html':
        return <AppDevPage />;
      case '/about/':
      case '/about/index.html':
        return <AboutPage />;
      case '/contact/':
      case '/contact/index.html':
        return <ContactPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <>
      <ScrollProgress />
      <div className="bg-grid-pattern" aria-hidden="true" />
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Navbar currentPath={normalizedPath} />
      <main id="main-content" className="site-content">
        {renderPage()}
      </main>
      <Footer />
    </>
  );
};
