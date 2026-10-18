import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { SERVICES } from '../data/siteData';
import { ArrowUpRight, Cpu, Database, Lock, Workflow, Terminal } from 'lucide-react';
import './ServiceDetailPage.css';

export const CustomSoftwarePage: React.FC = () => {
  const service = SERVICES.find(s => s.id === 'custom-software')!;

  const softwareFaqs = [
    {
      q: 'How do you determine whether we need custom software or an off-the-shelf tool?',
      a: 'During discovery, we analyze your exact workflow bottlenecks. If a standard commercial SaaS tool solves 90% of your problem without causing fragmentation, we will advise you to use it. When off-the-shelf software requires continuous manual workarounds or duplicate data entry, a tailored system provides substantial efficiency gains.'
    },
    {
      q: 'Can custom software integrate with our existing database or third-party APIs?',
      a: 'Yes. We design interfaces and backends that communicate cleanly with existing REST, GraphQL, or webhook APIs, payment processors, and legacy databases.'
    },
    {
      q: 'How is sensitive data protected?',
      a: 'We implement role-based access control (RBAC), secure session handling, data validation on both client and server boundaries, and sensible environment security practices.'
    }
  ];

  return (
    <div className="service-detail-view">
      <PageHeader
        badge="SERVICE DEEP DIVE"
        title="Custom Software Development"
        description="We convert disconnected spreadsheets, manual handoffs, and cumbersome workflows into purpose-built digital tools, internal portals, and automated systems."
        breadcrumb={[
          { label: 'Services', href: '/services/' },
          { label: 'Custom Software' }
        ]}
      />

      <div className="container">
        
        {/* Core Overview Grid */}
        <section className="detail-hero-grid">
          <div className="detail-main-text">
            <h2>Operational tools designed around how your team actually works.</h2>
            <p>
              Growing organizations often find themselves constrained by rigid software suites that demand endless manual workarounds. Data becomes scattered across disparate spreadsheets, messaging threads, and separate tools that don't speak to one another.
            </p>
            <p>
              SA³ creates focused software tools built specifically for your operators. We eliminate redundant administrative steps, enforce clear data validation, and give your leadership live operational visibility.
            </p>

            <div className="feature-badges-row">
              <span className="feature-pill"><Workflow size={14} /> Workflow Mapping</span>
              <span className="feature-pill"><Lock size={14} /> Role-Based Controls</span>
              <span className="feature-pill"><Database size={14} /> Clean Data Modeling</span>
              <span className="feature-pill"><Terminal size={14} /> Robust API Integrations</span>
            </div>
          </div>

          <div className="detail-sidebar-card glass-panel">
            <span className="sidebar-eyebrow">READY TO AUTOMATE?</span>
            <h3>Scope Custom Software</h3>
            <p>Describe the manual bottleneck or team workflow you are looking to streamline.</p>
            <a href="/contact/?service=custom-software" className="btn btn-primary w-full">
              <span>Start Software Discussion</span>
              <ArrowUpRight size={16} />
            </a>
            <span className="sidebar-note">Practical architecture review with zero vendor lock-in.</span>
          </div>
        </section>

        {/* Deliverables Breakdown */}
        <section className="deliverables-breakdown-section">
          <div className="section-header-center">
            <span className="mono-tag">ENGINEERING MILESTONES</span>
            <h2 className="section-title">End-to-End System Deliverables</h2>
            <p className="section-subtitle">
              From workflow discovery to automated testing, every deliverable is documented and verified.
            </p>
          </div>

          <div className="deliverables-grid-two">
            {service.deliverables.map((item, idx) => (
              <div key={idx} className="deliverable-card glass-panel">
                <div className="deliverable-index">0{idx + 1}</div>
                <div className="deliverable-content">
                  <h4>{item}</h4>
                  <p>
                    Built with modern, maintainable code architectures and clean separation of concerns, ensuring your team retains complete ownership of your software.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow Transformation Matrix */}
        <section className="tech-seo-callout-section glass-panel">
          <div className="callout-inner">
            <Cpu size={36} className="callout-icon" />
            <div>
              <h3>From Fragmented Spreadsheets to Predictable Systems</h3>
              <p>
                We do not add complexity where a simple script or clean relational schema suffices. By standardizing input validation, defining explicit user permissions, and providing clear audit trails, your team operates with speed and confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Software Specific FAQs */}
        <section className="service-faq-section">
          <h2 className="section-title text-center">Frequently Asked Questions</h2>
          <div className="faq-cards-stack">
            {softwareFaqs.map((faq, idx) => (
              <div key={idx} className="faq-card glass-panel">
                <h3 className="faq-q-text">{faq.q}</h3>
                <p className="faq-a-text">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="service-bottom-cta text-center">
          <h2>Have an operational bottleneck to solve?</h2>
          <p>Let's examine your current process and scope a purpose-built software solution.</p>
          <a href="/contact/?service=custom-software" className="btn btn-primary btn-lg">
            <span>Scope Custom Software</span>
            <ArrowUpRight size={18} />
          </a>
        </div>

      </div>
    </div>
  );
};
