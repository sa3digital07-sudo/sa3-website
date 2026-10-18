import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { SERVICES } from '../data/siteData';
import { ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Layers } from 'lucide-react';
import './ServicesPage.css';

export const ServicesPage: React.FC = () => {
  return (
    <div className="services-page-view">
      <PageHeader
        badge="STUDIO CAPABILITIES"
        title="Purpose-Built Digital Services"
        description="We plan, design, and engineer modern websites, operational software, and digital products tailored to your team's real workflows and business goals."
        breadcrumb={[{ label: 'Services' }]}
      />

      <div className="container">
        
        {/* Capability Overview Matrix */}
        <section className="services-list-section">
          {SERVICES.map((service) => (
            <div key={service.id} className="service-detail-row glass-panel" id={service.id}>
              <div className="service-detail-grid">
                
                <div className="service-info-col">
                  <span className="mono-tag">{service.badge}</span>
                  <h2 className="service-detail-title">{service.name}</h2>
                  <p className="service-detail-desc">{service.shortDesc}</p>

                  <div className="detail-problem-box">
                    <h4 className="detail-subhead">The Challenge We Solve</h4>
                    <p className="detail-body">{service.problem}</p>
                  </div>

                  <div className="detail-cta-row">
                    <a href={service.slug} className="btn btn-secondary">
                      <span>Explore In-Depth Guide</span>
                      <ArrowRight size={16} />
                    </a>
                    <a href={`/contact/?service=${service.id}`} className="btn btn-primary">
                      <span>{service.ctaText}</span>
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>

                <div className="service-deliverables-col">
                  <h3 className="deliverables-box-title">Agreed Deliverables</h3>
                  <p className="deliverables-box-subtitle">
                    Every project engagement includes verified checkpoints and tangible outputs:
                  </p>
                  <ul className="full-deliverables-list">
                    {service.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="full-deliverable-item">
                        <CheckCircle2 size={16} className="item-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </section>

        {/* Comparison & Fit Matrix */}
        <section className="fit-matrix-section">
          <div className="section-header-center">
            <span className="mono-tag">FINDING THE RIGHT FIT</span>
            <h2 className="section-title">Which engagement model fits your need?</h2>
            <p className="section-subtitle">
              We help you choose the simplest architecture that accomplishes your goal without unnecessary cost or complexity.
            </p>
          </div>

          <div className="matrix-table-card glass-panel">
            <div className="table-responsive">
              <table className="fit-table">
                <thead>
                  <tr>
                    <th>Service Area</th>
                    <th>Ideal Scenario</th>
                    <th>Primary Deliverables</th>
                    <th>Starting Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Website Design & Dev</strong>
                    </td>
                    <td>Organizations needing an indexable, trustworthy, fast digital presence to generate enquiries.</td>
                    <td>Responsive UX/UI, semantic HTML, Google SEO foundation, Core Web Vitals checks.</td>
                    <td>
                      <a href="/website-development/" className="table-link">Learn More &rarr;</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Custom Software</strong>
                    </td>
                    <td>Teams struggling with disconnected spreadsheets, manual handoffs, or rigid off-the-shelf tools.</td>
                    <td>Requirements mapping, internal operator dashboard, role permissions, API integrations.</td>
                    <td>
                      <a href="/custom-software/" className="table-link">Learn More &rarr;</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Application Development</strong>
                    </td>
                    <td>Businesses launching a focused web or mobile client centered on specific user tasks.</td>
                    <td>Component architecture, reactive client store, touch gestures, end-to-end testing.</td>
                    <td>
                      <a href="/application-development/" className="table-link">Learn More &rarr;</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Standard Engineering Safeguards */}
        <section className="safeguards-section">
          <div className="safeguards-grid">
            <div className="safeguard-card glass-panel">
              <ShieldCheck size={28} className="safeguard-icon" />
              <h3>Semantic HTML & Crawlability</h3>
              <p>Every public page is statically rendered so search engines and assistive devices can read all text immediately.</p>
            </div>
            <div className="safeguard-card glass-panel">
              <Zap size={28} className="safeguard-icon" />
              <h3>High-Performance Baseline</h3>
              <p>Optimized asset budgets, lazy loading, and modern bundlers ensure sub-second loads and responsive interactions.</p>
            </div>
            <div className="safeguard-card glass-panel">
              <Layers size={28} className="safeguard-icon" />
              <h3>Direct Senior Engineering</h3>
              <p>You speak directly with the architects writing the code, avoiding the lost nuance of sales intermediaries.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
