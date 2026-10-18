import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Hero3DCenterpiece } from '../components/Hero3DCenterpiece';
import { ProcessSection } from '../components/ProcessSection';
import { ConceptShowcase } from '../components/ConceptShowcase';
import { FAQAccordion } from '../components/FAQAccordion';
import { SERVICES, PRINCIPLES, SITE_CONFIG } from '../data/siteData';
import { ArrowRight, ArrowUpRight, Check, Sparkles, Code, Cpu, Layout } from 'lucide-react';
import './HomePage.css';

const serviceIcons = [Layout, Cpu, Code];

export const HomePage: React.FC = () => {
  const { scrollY } = useScroll();
  const heroParallaxY = useTransform(scrollY, [0, 500], [0, 60]);

  return (
    <div className="home-page-view">
      
      {/* Hero Section */}
      <section className="hero-section" aria-label="Introduction">
        <div className="container hero-container">
          
          <div className="hero-text-col">
            
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="hero-eyebrow-wrapper"
            >
              <span className="mono-tag">
                <Sparkles size={13} /> {SITE_CONFIG.eyebrow}
              </span>
            </motion.div>

            {/* H1 Headline Reveal */}
            <motion.h1
              className="hero-h1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Ideas deserve to become real.
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              className="hero-copy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              {SITE_CONFIG.heroCopy}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="hero-cta-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <a href="/contact/" className="btn btn-primary hero-btn-main">
                <span>{SITE_CONFIG.primaryCTA}</span>
                <ArrowUpRight size={18} />
              </a>
              <a href="#services" className="btn btn-secondary hero-btn-secondary">
                <span>{SITE_CONFIG.secondaryCTA}</span>
                <ArrowRight size={16} />
              </a>
            </motion.div>

            {/* Quick Trust Highlights */}
            <motion.div
              className="hero-trust-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <span className="trust-item">
                <Check size={14} className="trust-check" /> Clean Semantic Markup
              </span>
              <span className="trust-item">
                <Check size={14} className="trust-check" /> 100% Crawlable HTML
              </span>
              <span className="trust-item">
                <Check size={14} className="trust-check" /> Direct Engineering Lead
              </span>
            </motion.div>

          </div>

          {/* 3D Hero Centerpiece with Scroll Parallax */}
          <motion.div
            className="hero-visual-col"
            style={{ y: heroParallaxY }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Hero3DCenterpiece />
          </motion.div>

        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <div className="container">
          
          <div className="section-header-split">
            <div>
              <span className="mono-tag">CORE CAPABILITIES</span>
              <h2 className="section-title">What we design & engineer</h2>
            </div>
            <p className="section-header-desc">
              Every engagement starts from the underlying problem rather than prepackaged templates.
              Explore our three core service specializations.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((service, idx) => {
              const Icon = serviceIcons[idx] || Layout;

              return (
                <motion.article
                  key={service.id}
                  className="service-card glass-panel"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="service-card-header">
                    <div className="service-icon-box">
                      <Icon size={24} />
                    </div>
                    <span className="service-badge-pill">{service.badge}</span>
                  </div>

                  <h3 className="service-title">{service.name}</h3>
                  <p className="service-short-desc">{service.shortDesc}</p>

                  <div className="service-problem-callout">
                    <h4 className="problem-label">Problem Solved</h4>
                    <p className="problem-text">{service.problem}</p>
                  </div>

                  <div className="service-deliverables-block">
                    <h4 className="deliverables-heading">Deliverables Include</h4>
                    <ul className="service-deliverables-list">
                      {service.deliverables.slice(0, 4).map((d, dIdx) => (
                        <li key={dIdx} className="deliverable-item">
                          <Check size={14} className="check-icon" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="service-card-actions">
                    <a href={service.slug} className="btn btn-secondary w-full">
                      <span>View Full Service Scope</span>
                      <ArrowRight size={15} />
                    </a>
                    <a
                      href={`/contact/?service=${service.id}`}
                      className="service-direct-cta"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>

        </div>
      </section>

      {/* Why SA³: Practical Principles */}
      <section className="principles-section" id="principles">
        <div className="container">
          
          <div className="section-header-center">
            <span className="mono-tag">THE SA³ PHILOSOPHY</span>
            <h2 className="section-title">Built on practical principles, not buzzwords</h2>
            <p className="section-subtitle">
              We reject bloated agency overhead and inflated claims. Here is how we build software and websites.
            </p>
          </div>

          <div className="principles-grid">
            {PRINCIPLES.map((principle, idx) => (
              <motion.div
                key={idx}
                className="principle-card glass-panel"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <span className="principle-number">0{idx + 1}</span>
                <h3 className="principle-title">{principle.title}</h3>
                <p className="principle-desc">{principle.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Concept Showcase (3 Original Illustrative Concepts) */}
      <ConceptShowcase />

      {/* Process Section (4-Step Pipeline) */}
      <ProcessSection />

      {/* FAQ Section */}
      <section className="faq-section" id="faq">
        <div className="container">
          
          <div className="section-header-center">
            <span className="mono-tag">TRANSPARENCY FIRST</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Honest answers about scopes, workflows, pricing approaches, and post-launch support.
            </p>
          </div>

          <FAQAccordion />

        </div>
      </section>

      {/* Conversion Banner Section */}
      <section className="conversion-banner-section">
        <div className="container">
          <div className="conversion-card glass-panel">
            <div className="conversion-content">
              <span className="mono-tag">READY TO START?</span>
              <h2 className="conversion-title">Let's talk through what you want to build.</h2>
              <p className="conversion-desc">
                Whether you have complete wireframes or simply a rough idea on a napkin,
                we can discuss requirements, constraints, and architecture in plain terms.
              </p>
              <div className="conversion-cta-row">
                <a href="/contact/" className="btn btn-primary btn-lg">
                  <span>Start Project Conversation</span>
                  <ArrowUpRight size={18} />
                </a>
                <a href="/services/" className="btn btn-secondary">
                  <span>Review Services First</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
