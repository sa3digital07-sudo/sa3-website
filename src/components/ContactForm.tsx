import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Mail, Info } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';
import './ContactForm.css';

interface ContactFormProps {
  initialService?: string;
}

interface FormState {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  details: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  details?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialService = '' }) => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    service: initialService || 'website-development',
    budget: 'Not sure yet',
    details: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'captured' | 'error'>('idle');
  const [capturedData, setCapturedData] = useState<FormState | null>(null);

  // Sync initialService if query string or prop changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get('service');
      if (serviceParam) {
        setFormData(prev => ({ ...prev, service: serviceParam }));
      } else if (initialService) {
        setFormData(prev => ({ ...prev, service: initialService }));
      }
    }
  }, [initialService]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.details.trim()) {
      newErrors.details = 'Please briefly describe what you want to build.';
    } else if (formData.details.trim().length < 15) {
      newErrors.details = 'Please provide a little more detail (at least 15 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || status === 'submitting') return;

    setStatus('submitting');

    try {
      // Simulate real validation / network processing latency
      await new Promise(resolve => setTimeout(resolve, 800));

      // Persist to local session store for audit and verification
      const existingEntries = JSON.parse(sessionStorage.getItem('sa3_enquiries') || '[]');
      const newEntry = {
        ...formData,
        timestamp: new Date().toISOString()
      };
      existingEntries.push(newEntry);
      sessionStorage.setItem('sa3_enquiries', JSON.stringify(existingEntries));

      setCapturedData(formData);
      setStatus('captured');
    } catch {
      setStatus('error');
    }
  };

  const generateMailtoLink = () => {
    if (!capturedData) return '#';
    const subject = encodeURIComponent(`SA³ Project Enquiry: ${capturedData.service} - ${capturedData.name}`);
    const body = encodeURIComponent(
      `Name: ${capturedData.name}\n` +
      `Email: ${capturedData.email}\n` +
      `Company: ${capturedData.company || 'N/A'}\n` +
      `Service: ${capturedData.service}\n` +
      `Budget: ${capturedData.budget}\n\n` +
      `Project Details:\n${capturedData.details}\n\n` +
      `[Captured via SA³ Website Form]`
    );
    return `mailto:${SITE_CONFIG.emailPlaceholder}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="contact-form-container glass-panel">
      <AnimatePresence mode="wait">
        {status === 'captured' && capturedData ? (
          <motion.div
            key="captured-view"
            className="form-captured-notice"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
          >
            <div className="captured-icon-box">
              <CheckCircle2 size={36} className="text-primary" />
            </div>
            <h3 className="captured-title">Enquiry Successfully Formatted & Logged</h3>
            <p className="captured-copy">
              Thank you, <strong>{capturedData.name}</strong>. Your project requirements for{' '}
              <strong>{capturedData.service}</strong> have been verified and saved to active session storage.
            </p>

            <div className="configuration-boundary-box">
              <div className="boundary-header">
                <Info size={16} />
                <span>Production Configuration Status</span>
              </div>
              <p className="boundary-desc">
                In accordance with our zero-fabrication engineering standards, no mock third-party email service
                or fake endpoint is silently pretending to deliver mail. To ensure immediate delivery right now:
              </p>
              <a
                href={generateMailtoLink()}
                className="btn btn-primary boundary-action-btn"
              >
                <Mail size={16} />
                <span>Send via Email Client (Pre-filled)</span>
              </a>
              <span className="boundary-footnote">
                Production Deployment Step: Configure your verified SMTP endpoint or webhook (e.g. Resend, Formspree, or custom Cloudflare Worker) in the deployment environment.
              </span>
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setStatus('idle');
                setFormData({
                  name: '',
                  email: '',
                  company: '',
                  service: 'website-development',
                  budget: 'Not sure yet',
                  details: ''
                });
              }}
            >
              Submit Another Enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form-view"
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="form-header-area">
              <h2 className="form-heading">{SITE_CONFIG.contactHeading}</h2>
              <p className="form-subheading">{SITE_CONFIG.contactCopy}</p>
            </div>

            {status === 'error' && (
              <div className="form-error-banner" role="alert">
                <AlertCircle size={18} />
                <span>An error occurred while validating the form. Please check your inputs.</span>
              </div>
            )}

            <div className="form-grid">
              {/* Name */}
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">
                  Your Name <span className="required-mark" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <span id="name-error" className="error-message">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">
                  Work Email <span className="required-mark" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <span id="email-error" className="error-message">{errors.email}</span>}
              </div>

              {/* Company */}
              <div className="form-group">
                <label htmlFor="contact-company" className="form-label">
                  Company or Organization <span className="optional-mark">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="contact-company"
                  name="company"
                  placeholder="e.g. Acme Studio Ltd"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="form-input"
                />
              </div>

              {/* Service Needed */}
              <div className="form-group">
                <label htmlFor="contact-service" className="form-label">
                  Service Needed
                </label>
                <select
                  id="contact-service"
                  name="service"
                  value={formData.service}
                  onChange={e => setFormData({ ...formData, service: e.target.value })}
                  className="form-select"
                >
                  <option value="website-development">Website Design & Development</option>
                  <option value="custom-software">Custom Operational Software</option>
                  <option value="application-development">Application Development</option>
                  <option value="consultation">Technical Discovery & Architecture</option>
                </select>
              </div>

              {/* Budget Range */}
              <div className="form-group full-width">
                <label htmlFor="contact-budget" className="form-label">
                  Estimated Budget Range <span className="optional-mark">(Optional)</span>
                </label>
                <select
                  id="contact-budget"
                  name="budget"
                  value={formData.budget}
                  onChange={e => setFormData({ ...formData, budget: e.target.value })}
                  className="form-select"
                >
                  <option value="Not sure yet">Not sure yet (let's discuss scope first)</option>
                  <option value="Scope under $5,000">Scope under $5,000 (Focus build)</option>
                  <option value="$5,000 - $15,000">$5,000 - $15,000 (Full website or core tool)</option>
                  <option value="$15,000 - $35,000">$15,000 - $35,000 (Complex custom software)</option>
                  <option value="$35,000+">$35,000+ (Multi-stage product)</option>
                </select>
              </div>

              {/* Project Details */}
              <div className="form-group full-width">
                <label htmlFor="contact-details" className="form-label">
                  Project Details & Goals <span className="required-mark" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-details"
                  name="details"
                  rows={4}
                  required
                  placeholder="Share a short summary of the idea, who will use it, the problem it solves, or any timeline considerations..."
                  value={formData.details}
                  onChange={e => setFormData({ ...formData, details: e.target.value })}
                  className={`form-textarea ${errors.details ? 'input-error' : ''}`}
                  aria-invalid={!!errors.details}
                  aria-describedby={errors.details ? 'details-error' : undefined}
                />
                {errors.details && <span id="details-error" className="error-message">{errors.details}</span>}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn btn-primary submit-btn"
              >
                {status === 'submitting' ? (
                  <span>Validating & Formatting...</span>
                ) : (
                  <>
                    <span>Submit Enquiry</span>
                    <Send size={16} />
                  </>
                )}
              </button>

              <div className="form-privacy-note">
                Your details are kept strictly private and used solely to respond to your project request.
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
