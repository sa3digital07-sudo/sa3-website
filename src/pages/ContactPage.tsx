import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ContactConnectCard } from '../components/ContactConnectCard';
import { Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import './ContactPage.css';

export const ContactPage: React.FC = () => {
  return (
    <div className="contact-page-view">
      <PageHeader
        badge="DIRECT FOUNDER ACCESS"
        title="Discuss Your Project"
        description="Connect directly with SA³ founding engineers. No intermediaries, no junior offloading—just straightforward technical discovery and scoping."
        breadcrumb={[{ label: 'Contact' }]}
      />

      <div className="container">
        
        {/* Main Section: Large Premium Glassmorphism Contact & Connect Card */}
        <section className="contact-main-connect-section" aria-label="Contact and Connect">
          <ContactConnectCard />
        </section>

        {/* Expectation Standards */}
        <section className="contact-expectations-section">
          <div className="expectations-grid">
            <div className="expectation-card glass-panel">
              <div className="expectation-icon-box">
                <Clock size={18} />
              </div>
              <div className="expectation-content">
                <h4>Direct Technical Scoping</h4>
                <p>Every inquiry is handled directly by Aryan or Sarthak. We evaluate technical feasibility, constraints, and architecture upfront.</p>
              </div>
            </div>

            <div className="expectation-card glass-panel">
              <div className="expectation-icon-box">
                <MessageSquare size={18} />
              </div>
              <div className="expectation-content">
                <h4>Instant 1-Click WhatsApp</h4>
                <p>Use WhatsApp for quick inquiries, question triage, and scheduling a 20-minute introductory architectural review.</p>
              </div>
            </div>

            <div className="expectation-card glass-panel">
              <div className="expectation-icon-box">
                <ShieldCheck size={18} />
              </div>
              <div className="expectation-content">
                <h4>Transparent Scope & Terms</h4>
                <p>Milestone-based delivery agreements with clearly defined deliverables, predictable timelines, and zero hidden markups.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
