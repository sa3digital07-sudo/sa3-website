import React from 'react';
import { motion } from 'motion/react';
import { CONCEPTS } from '../data/siteData';
import { Layers, Terminal, Smartphone, ArrowRight, ShieldAlert } from 'lucide-react';
import './ConceptShowcase.css';

const conceptIcons = {
  'concept-web': Layers,
  'concept-ops': Terminal,
  'concept-app': Smartphone
};

export const ConceptShowcase: React.FC = () => {
  return (
    <section className="concepts-section" id="showcase">
      <div className="container">
        
        <div className="section-header-split">
          <div>
            <span className="mono-tag">ORIGINAL ARCHITECTURAL EXPLORATIONS</span>
            <h2 className="section-title">Concept & Prototype Showcase</h2>
          </div>
          <p className="section-header-desc">
            To demonstrate our engineering depth and interface craft, these three explorations
            illustrate how we approach commercial websites, internal operations software, and mobile-ready applications.
          </p>
        </div>

        {/* Honest Disclosure Notice */}
        <div className="concept-notice-banner glass-panel">
          <ShieldAlert size={18} className="notice-icon" />
          <p className="notice-text">
            <strong>Honest Engineering Disclosure:</strong> The projects below are original illustrative concepts and technical prototypes designed by SA³ to showcase interface patterns, data modeling, and performance architecture. They are not claimed as past client case studies or third-party endorsements.
          </p>
        </div>

        <div className="concepts-grid">
          {CONCEPTS.map((concept, idx) => {
            const Icon = conceptIcons[concept.id as keyof typeof conceptIcons] || Layers;

            return (
              <motion.article
                key={concept.id}
                className="concept-card glass-panel"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.12 }}
                whileHover={{ y: -4 }}
              >
                <div className="concept-card-top">
                  <div className="concept-icon-box">
                    <Icon size={22} />
                  </div>
                  <span className="concept-badge-status">{concept.status}</span>
                </div>

                <div className="concept-category">{concept.category}</div>
                <h3 className="concept-title">{concept.title}</h3>
                <p className="concept-description">{concept.description}</p>

                <div className="concept-meta-block">
                  <h4 className="meta-label">Architecture Highlights</h4>
                  <ul className="concept-scope-list">
                    {concept.scope.map((item, sIdx) => (
                      <li key={sIdx} className="scope-item">
                        <span className="scope-bullet" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="concept-card-footer">
                  <div className="concept-tech-spec">
                    <span className="tech-label">Stack Blueprint:</span>
                    <span className="tech-value">{concept.architecture}</span>
                  </div>
                  <a href="/contact/" className="concept-inquire-link">
                    <span>Discuss similar build</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
