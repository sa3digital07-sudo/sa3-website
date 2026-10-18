import React from 'react';
import { ArrowUpRight, ShieldCheck, Cpu, Code2, Globe } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-container">
        
        {/* Top Tier: Value Proposition & Brand */}
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <a href="/" className="footer-brand" aria-label="SA³ Home">
              <img src="/images/logo.png" alt="SA³ Logo" className="footer-logo-img" width="36" height="36" />
              <div className="brand-text">
                <span className="brand-name">SA³</span>
                <span className="brand-tagline">From Ideas to Reality</span>
              </div>
            </a>
            <p className="footer-bio">
              Independent digital product and software studio. We engineer purposeful websites,
              custom operational software, and scalable applications built around real user workflows.
            </p>
            <div className="footer-pill-row">
              <span className="footer-badge">
                <ShieldCheck size={14} /> Zero Bloat Policy
              </span>
              <span className="footer-badge">
                <Cpu size={14} /> Modern React & TypeScript
              </span>
              <span className="footer-badge">
                <Globe size={14} /> Google SEO Foundations
              </span>
            </div>
          </div>

          {/* Links Column 1: Services */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Capabilities</h4>
            <ul className="footer-links-list">
              <li>
                <a href="/services/">Services Overview</a>
              </li>
              <li>
                <a href="/website-development/">Website Design & Development</a>
              </li>
              <li>
                <a href="/custom-software/">Custom Software Development</a>
              </li>
              <li>
                <a href="/application-development/">Application Development</a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Studio & Principles */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Studio</h4>
            <ul className="footer-links-list">
              <li>
                <a href="/about/">About SA³</a>
              </li>
              <li>
                <a href="/about/#principles">Core Principles</a>
              </li>
              <li>
                <a href="/about/#process">4-Step Delivery Process</a>
              </li>
              <li>
                <a href="/about/#faq">Frequently Asked Questions</a>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Contact & Engagement */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Enquiries</h4>
            <ul className="footer-links-list">
              <li>
                <a href="/contact/" className="footer-highlight-link">
                  <span>Start a Conversation</span>
                  <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <a href="/contact/?service=website-development">Request Website Scoping</a>
              </li>
              <li>
                <a href="/contact/?service=custom-software">Scope Custom Software</a>
              </li>
              <li>
                <a href="/contact/?service=application-development">Discuss App Development</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Engineering Disclosures */}
        <div className="footer-bottom-bar">
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} SA³ Studio. All rights reserved. Precision in Motion.
          </div>
          <div className="footer-meta">
            <span className="mono-note">
              <Code2 size={12} /> Statically Prerendered &bull; Indexable HTML &bull; Accessible Semantic UI
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
