import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { SERVICES } from '../data/siteData';
import { ArrowUpRight, Smartphone, Zap, Sliders, Shield, Layers } from 'lucide-react';
import './ServiceDetailPage.css';

export const AppDevPage: React.FC = () => {
  const service = SERVICES.find(s => s.id === 'application-development')!;

  const appFaqs = [
    {
      q: 'Do you build native mobile apps, web apps, or cross-platform applications?',
      a: 'We evaluate the project requirements first. For most client requirements, modern Progressive Web Apps (PWAs) or cross-platform React architectures provide exceptional speed, easy deployment, and zero app-store friction. When native hardware APIs are essential, we discuss agreed native mobile options.'
    },
    {
      q: 'How do you handle offline access and intermittent connections?',
      a: 'We design client-side state architectures with optimistic UI updates and local data caching, ensuring the application remains functional even when the user experiences spotty network connectivity.'
    },
    {
      q: 'How is user feedback incorporated into the development cycle?',
      a: 'We deliver incremental, testable prototypes at every milestone, giving your team and stakeholders hands-on access to test flows and UI interactions before final release.'
    }
  ];

  return (
    <div className="service-detail-view">
      <PageHeader
        badge="SERVICE DEEP DIVE"
        title="Application Development"
        description="We build responsive web and cross-platform applications centered around verified user needs, intuitive customer journeys, and reliable state management."
        breadcrumb={[
          { label: 'Services', href: '/services/' },
          { label: 'Application Development' }
        ]}
      />

      <div className="container">
        
        {/* Core Overview Grid */}
        <section className="detail-hero-grid">
          <div className="detail-main-text">
            <h2>Applications built around real user tasks and predictable behavior.</h2>
            <p>
              Digital products frequently fail not from a lack of features, but from excessive complexity that obscures the core utility. When navigation is cluttered or interactions feel sluggish, users abandon the product.
            </p>
            <p>
              SA³ engineers applications that are responsive, accessible, and fast. We focus on clear information hierarchy, smooth animations that aid comprehension, and resilient architecture that handles edge cases gracefully.
            </p>

            <div className="feature-badges-row">
              <span className="feature-pill"><Smartphone size={14} /> Touch-First Viewports</span>
              <span className="feature-pill"><Zap size={14} /> Optimistic State Updates</span>
              <span className="feature-pill"><Sliders size={14} /> Predictable State Stores</span>
              <span className="feature-pill"><Shield size={14} /> Resilient Error Boundaries</span>
            </div>
          </div>

          <div className="detail-sidebar-card glass-panel">
            <span className="sidebar-eyebrow">READY TO BUILD?</span>
            <h3>Build Your Application</h3>
            <p>Share your product concept, key user flows, and platform targets with our engineering leads.</p>
            <a href="/contact/?service=application-development" className="btn btn-primary w-full">
              <span>Start Application Discussion</span>
              <ArrowUpRight size={16} />
            </a>
            <span className="sidebar-note">Direct technical review of user flows and feasibility.</span>
          </div>
        </section>

        {/* Deliverables Breakdown */}
        <section className="deliverables-breakdown-section">
          <div className="section-header-center">
            <span className="mono-tag">PRODUCT MILESTONES</span>
            <h2 className="section-title">Application Development Deliverables</h2>
            <p className="section-subtitle">
              Every phase moves from agreed user journeys to thoroughly tested code handover.
            </p>
          </div>

          <div className="deliverables-grid-two">
            {service.deliverables.map((item, idx) => (
              <div key={idx} className="deliverable-card glass-panel">
                <div className="deliverable-index">0{idx + 1}</div>
                <div className="deliverable-content">
                  <h4>{item}</h4>
                  <p>
                    Developed with clean component hierarchies, documented props, and automated validation tests across target viewports.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resilience Architecture Callout */}
        <section className="tech-seo-callout-section glass-panel">
          <div className="callout-inner">
            <Layers size={36} className="callout-icon" />
            <div>
              <h3>Engineered for Network Resilience & Delightful Micro-Interactions</h3>
              <p>
                We leverage Motion for React to create purposeful, fluid state transitions that guide user attention rather than distract. Every component includes clear loading, error, and empty states so users never stare at blank screens or mysterious spinners.
              </p>
            </div>
          </div>
        </section>

        {/* App Specific FAQs */}
        <section className="service-faq-section">
          <h2 className="section-title text-center">Frequently Asked Questions</h2>
          <div className="faq-cards-stack">
            {appFaqs.map((faq, idx) => (
              <div key={idx} className="faq-card glass-panel">
                <h3 className="faq-q-text">{faq.q}</h3>
                <p className="faq-a-text">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="service-bottom-cta text-center">
          <h2>Ready to bring your digital product to life?</h2>
          <p>Let's discuss user requirements, milestones, and technical architecture.</p>
          <a href="/contact/?service=application-development" className="btn btn-primary btn-lg">
            <span>Build an Application</span>
            <ArrowUpRight size={18} />
          </a>
        </div>

      </div>
    </div>
  );
};
