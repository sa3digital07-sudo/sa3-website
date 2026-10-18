import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  currentPath?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath = '/' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '/services/' },
    { label: 'Websites', href: '/website-development/' },
    { label: 'Software', href: '/custom-software/' },
    { label: 'Apps', href: '/application-development/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && (currentPath === '/' || currentPath === '')) return true;
    if (href !== '/' && currentPath.startsWith(href)) return true;
    return false;
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand Logo & Name */}
        <a href="/" className="nav-brand" aria-label="SA³ — From Ideas to Reality">
          <div className="brand-mark-wrapper">
            <img src="/images/logo.png" alt="SA³ Logo" className="brand-logo-img" width="34" height="34" />
          </div>
          <div className="brand-text">
            <span className="brand-name">SA³</span>
            <span className="brand-tagline">From Ideas to Reality</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.div
                  layoutId="activeIndicator"
                  className="nav-active-pill"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="nav-actions">
          <a href="/contact/" className="btn btn-primary nav-cta">
            <span>Discuss a Project</span>
            <ArrowUpRight size={16} />
          </a>

          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="container mobile-drawer-content">
              <nav className="mobile-nav-list" aria-label="Mobile navigation">
                <a
                  href="/"
                  className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`mobile-nav-link ${isActive(link.href) ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="mobile-drawer-footer">
                <a
                  href="/contact/"
                  className="btn btn-primary w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Discuss a Project</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
