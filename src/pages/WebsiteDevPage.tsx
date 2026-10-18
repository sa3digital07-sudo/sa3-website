import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { SERVICES } from '../data/siteData';
import { ArrowUpRight, Search, ShieldCheck, Gauge, Smartphone, Code2 } from 'lucide-react';
import './ServiceDetailPage.css';

export const WebsiteDevPage: React.FC = () => {
  const service = SERVICES.find(s => s.id === 'website-development')!;

  const websiteFaqs = [
    {
      q: 'Will our website be indexable by Google Search?',
      a: 'Yes. Every public page is rendered as accessible static HTML with unique titles, meta descriptions, canonical URLs, structured JSON-LD data, and a clean sitemap.xml. We follow Google Search Essentials and JavaScript SEO best practices.'
    },
    {
      q: 'How do you ensure fast load times and Core Web Vitals compliance?',
      a: 'We avoid bloated page-builders and redundant third-party scripts. We optimize images, reserve image dimensions to eliminate layout shifts (CLS), optimize font delivery, and keep JavaScript bundles strictly scoped.'
    },
    {
      q: 'Is the website responsive across mobile devices?',
      a: 'Yes. We test across screen widths from 360px up to 1440px+ to ensure fluid typography, readable line lengths, touch-friendly tap targets, and clean navigation on any device.'
    }
  ];

  return (
    <div className="service-detail-view">
      <PageHeader
        badge="SERVICE DEEP DIVE"
        title="Website Design & Development"
        description="We plan, design, and engineer high-performance websites that communicate value with clarity, establish organizational authority, and convert prospective clients into qualified conversations."
        breadcrumb={[
          { label: 'Services', href: '/services/' },
          { label: 'Website Development' }
        ]}
      />

      <div className="container">
        
        {/* Core Overview Grid */}
        <section className="detail-hero-grid">
          <div className="detail-main-text">
            <h2>Websites engineered for clarity, discoverability, and conversion.</h2>
            <p>
              A company website is frequently the primary touchpoint through which partners, clients, and talent evaluate your technical maturity. When a website is slow, confusing, or cluttered with boilerplate templates, credibility is lost before a conversation ever begins.
            </p>
            <p>
              SA³ approaches web design as an integrated discipline of editorial hierarchy, precise typography, robust semantic code, and technical Google discoverability.
            </p>

            <div className="feature-badges-row">
              <span className="feature-pill"><Search size={14} /> Crawlable HTML Text</span>
              <span className="feature-pill"><Gauge size={14} /> High Core Web Vitals</span>
              <span className="feature-pill"><Smartphone size={14} /> Responsive 360px–1440px</span>
              <span className="feature-pill"><Code2 size={14} /> Type-Safe Modern Stack</span>
            </div>
          </div>

          <div className="detail-sidebar-card glass-panel">
            <span className="sidebar-eyebrow">READY TO BUILD?</span>
            <h3>Plan Your Website</h3>
            <p>Tell us about your organization, key audience, and what you need the new site to accomplish.</p>
            <a href="/contact/?service=website-development" className="btn btn-primary w-full">
              <span>Start Website Discussion</span>
              <ArrowUpRight size={16} />
            </a>
            <span className="sidebar-note">Direct engineering conversation. No sales pressure.</span>
          </div>
        </section>

        {/* Deliverables Deep Dive */}
        <section className="deliverables-breakdown-section">
          <div className="section-header-center">
            <span className="mono-tag">WHAT YOU RECEIVE</span>
            <h2 className="section-title">Comprehensive Deliverables Checklist</h2>
            <p className="section-subtitle">
              Every website engagement adheres to structured, transparent milestones with verifiable checkpoints.
            </p>
          </div>

          <div className="deliverables-grid-two">
            {service.deliverables.map((item, idx) => (
              <div key={idx} className="deliverable-card glass-panel">
                <div className="deliverable-index">0{idx + 1}</div>
                <div className="deliverable-content">
                  <h4>{item}</h4>
                  <p>
                    Executed directly in collaboration with your team, verified against industry accessibility standards, and tested across modern browsers.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Architecture & SEO */}
        <section className="tech-seo-callout-section glass-panel">
          <div className="callout-inner">
            <ShieldCheck size={36} className="callout-icon" />
            <div>
              <h3>Built for Real Google Discoverability</h3>
              <p>
                Unlike generic SPAs that hide important text behind client-side rendering bundles, our static prerendering architecture generates pure HTML for every route. Googlebot, Bingbot, and social crawlers can immediately read headings, copy, OpenGraph cards, and schema metadata upon initial request.
              </p>
            </div>
          </div>
        </section>

        {/* Website Specific FAQs */}
        <section className="service-faq-section">
          <h2 className="section-title text-center">Frequently Asked Questions</h2>
          <div className="faq-cards-stack">
            {websiteFaqs.map((faq, idx) => (
              <div key={idx} className="faq-card glass-panel">
                <h3 className="faq-q-text">{faq.q}</h3>
                <p className="faq-a-text">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="service-bottom-cta text-center">
          <h2>Ready to transform your web presence?</h2>
          <p>Let's map out your content architecture and scope your build.</p>
          <a href="/contact/?service=website-development" className="btn btn-primary btn-lg">
            <span>Discuss Website Project</span>
            <ArrowUpRight size={18} />
          </a>
        </div>

      </div>
    </div>
  );
};
