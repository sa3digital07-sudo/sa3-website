import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ProcessSection } from '../components/ProcessSection';
import { FAQAccordion } from '../components/FAQAccordion';
import { PRINCIPLES } from '../data/siteData';
import { ShieldCheck, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import './AboutPage.css';

export const AboutPage: React.FC = () => {
  return (
    <div className="about-page-view">
      <PageHeader
        badge="STUDIO PHILOSOPHY & CRAFT"
        title="About SA³"
        description="An independent digital product and software studio. We design and engineer purposeful websites, custom software, and responsive applications with strict technical rigor."
        breadcrumb={[{ label: 'About' }]}
      />

      <div className="container">
        
        {/* Core Identity & Focus */}
        <section className="about-intro-grid">
          <div className="about-intro-main">
            <span className="mono-tag">OUR PURPOSE</span>
            <h2>We believe ideas deserve to become reality through disciplined engineering.</h2>
            <p>
              SA³ was founded on a simple realization: too much modern software is built to impress tech conferences or follow fleeting design fads, rather than to solve real problems for the people who actually use it every day.
            </p>
            <p>
              We focus squarely on three disciplines:
            </p>
            <ul className="about-focus-list">
              <li>
                <strong>Websites that communicate:</strong> Fast, indexable, accessible web presences that convey organizational credibility and convert visitors into enquiries.
              </li>
              <li>
                <strong>Software that automates:</strong> Custom operational tools that eliminate manual bottlenecks, spreadsheets, and repetitive administrative work.
              </li>
              <li>
                <strong>Applications that perform:</strong> Modern responsive clients built around clean user flows, predictable state management, and reliable error recovery.
              </li>
            </ul>
          </div>

          <div className="about-sidebar-card glass-panel">
            <div className="sidebar-badge-row">
              <ShieldCheck size={20} className="text-primary" />
              <span className="sidebar-title">Engineering Commitment</span>
            </div>
            <ul className="commitment-list">
              <li><CheckCircle2 size={16} /> No bloated page-builders or templates</li>
              <li><CheckCircle2 size={16} /> No invented case studies or fake awards</li>
              <li><CheckCircle2 size={16} /> Transparent milestone-based delivery</li>
              <li><CheckCircle2 size={16} /> Clean, maintainable TypeScript code</li>
              <li><CheckCircle2 size={16} /> 100% crawlable semantic HTML</li>
            </ul>
            <a href="/contact/" className="btn btn-primary w-full mt-4">
              <span>Discuss a Project</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        {/* Studio Principles Section */}
        <section className="about-principles-section" id="principles">
          <div className="section-header-center">
            <span className="mono-tag">FOUNDATIONAL STANDARDS</span>
            <h2 className="section-title">How We Think and Work</h2>
            <p className="section-subtitle">
              Every technical decision is guided by five practical principles.
            </p>
          </div>

          <div className="about-principles-grid">
            {PRINCIPLES.map((principle, idx) => (
              <div key={idx} className="about-principle-card glass-panel">
                <span className="principle-idx">0{idx + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4-Step Process */}
        <ProcessSection />

        {/* Honest Disclosure Note */}
        <section className="about-disclosure-section glass-panel">
          <div className="disclosure-content">
            <h3>Fact-Based Professional Practice</h3>
            <p>
              In accordance with our studio ethics, we do not fabricate multi-decade company histories, exaggerated team headcounts, or artificial marketing accolades. We let our architecture, codebase quality, design precision, and client results represent our capability.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="about-faq-section" id="faq">
          <div className="section-header-center">
            <span className="mono-tag">COMMON QUESTIONS</span>
            <h2 className="section-title">Working with SA³</h2>
            <p className="section-subtitle">
              Straightforward answers about our engagement models, communication, and handovers.
            </p>
          </div>

          <FAQAccordion />
        </section>

      </div>
    </div>
  );
};
