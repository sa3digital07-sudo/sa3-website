import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, Linkedin, Instagram, ArrowUpRight, Copy, Check, MessageCircle, ShieldCheck } from 'lucide-react';
import { FOUNDERS, isChannelConfigured } from '../data/foundersData';
import './FounderProfileCards.css';

// WhatsApp SVG Icon
const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z"/>
  </svg>
);

export const FounderProfileCards: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="founders-contact-container">
      
      {/* Section Header */}
      <div className="founders-header-block">
        <span className="mono-tag">
          <ShieldCheck size={14} /> DIRECT FOUNDER ACCESS
        </span>
        <h2 className="founders-section-title">Speak Directly with SA³ Technical Leads</h2>
        <p className="founders-section-desc">
          No intermediaries, account managers, or sales gatekeepers. Reach out directly to our
          founding directors via phone, instant WhatsApp, or verified email for immediate technical scoping.
        </p>
      </div>

      {/* Founder Profile Cards Grid */}
      <div className="founders-grid">
        {FOUNDERS.map((founder, index) => {
          const waUrl = `https://wa.me/${founder.contact.whatsappDigits}${
            founder.contact.whatsappPrefill
              ? `?text=${encodeURIComponent(founder.contact.whatsappPrefill)}`
              : ''
          }`;

          return (
            <motion.article
              key={founder.id}
              className="founder-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              
              {/* Card Top: Avatar Initials & Status Badge */}
              <div className="founder-card-top">
                <div className="founder-avatar-wrapper">
                  <div className="founder-avatar-initials" aria-hidden="true">
                    {founder.initials}
                  </div>
                  <div className="founder-online-pulse" title="Active on direct channels">
                    <span className="pulse-dot" />
                    <span className="pulse-ping" />
                  </div>
                </div>

                <div className="founder-badge-wrapper">
                  <span className="founder-badge-pill">{founder.badge}</span>
                </div>
              </div>

              {/* Founder Identity */}
              <div className="founder-info-block">
                <h3 className="founder-name">{founder.name}</h3>
                <div className="founder-role">{founder.role}</div>
                <p className="founder-intro">{founder.introduction}</p>
              </div>

              {/* Verified Contact Details Quick-Copy Block */}
              <div className="founder-meta-box">
                
                {/* Email Row */}
                <div className="meta-contact-row">
                  <Mail size={15} className="meta-icon" />
                  <a
                    href={`mailto:${founder.contact.email}`}
                    className="meta-link"
                    title={`Email ${founder.name}`}
                  >
                    {founder.contact.email}
                  </a>
                  <button
                    type="button"
                    className="meta-copy-btn"
                    onClick={() => handleCopy(founder.contact.email, `${founder.id}-email`)}
                    aria-label={`Copy email for ${founder.name}`}
                  >
                    {copiedId === `${founder.id}-email` ? (
                      <span className="copied-text"><Check size={12} /> Copied</span>
                    ) : (
                      <span><Copy size={12} /> Copy</span>
                    )}
                  </button>
                </div>

                {/* Phone Row */}
                <div className="meta-contact-row">
                  <Phone size={15} className="meta-icon" />
                  <a
                    href={`tel:${founder.contact.phone}`}
                    className="meta-link"
                    title={`Call ${founder.name}`}
                  >
                    {founder.contact.phone}
                  </a>
                  <button
                    type="button"
                    className="meta-copy-btn"
                    onClick={() => handleCopy(founder.contact.phone, `${founder.id}-phone`)}
                    aria-label={`Copy phone number for ${founder.name}`}
                  >
                    {copiedId === `${founder.id}-phone` ? (
                      <span className="copied-text"><Check size={12} /> Copied</span>
                    ) : (
                      <span><Copy size={12} /> Copy</span>
                    )}
                  </button>
                </div>

              </div>

              {/* 5 Functional Action Buttons (Only verified channels rendered) */}
              <div className="founder-actions-list">
                
                {/* Action 1: Call Directly */}
                <motion.a
                  href={`tel:${founder.contact.phone}`}
                  className="founder-action-btn btn-call"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Call ${founder.name} directly at ${founder.contact.phone}`}
                >
                  <Phone size={16} />
                  <span>Call Directly</span>
                </motion.a>

                {/* Action 2: WhatsApp */}
                <motion.a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="founder-action-btn btn-whatsapp"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Chat with ${founder.name} on WhatsApp`}
                >
                  <WhatsAppIcon size={17} />
                  <span>WhatsApp Direct</span>
                  <ArrowUpRight size={14} className="action-arrow" />
                </motion.a>

                {/* Action 3: Email */}
                <motion.a
                  href={`mailto:${founder.contact.email}`}
                  className="founder-action-btn btn-email"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Send direct email to ${founder.name}`}
                >
                  <Mail size={16} />
                  <span>Send Direct Email</span>
                </motion.a>

                {/* Action 4: LinkedIn (Conditionally Rendered if verified profile is configured) */}
                {isChannelConfigured(founder.contact.linkedin) && (
                  <motion.a
                    href={founder.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="founder-action-btn btn-linkedin"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`Visit ${founder.name}'s verified LinkedIn profile`}
                  >
                    <Linkedin size={16} />
                    <span>LinkedIn Profile</span>
                    <ArrowUpRight size={14} className="action-arrow" />
                  </motion.a>
                )}

                {/* Action 5: Instagram (Conditionally Rendered if verified profile is configured) */}
                {isChannelConfigured(founder.contact.instagram) && (
                  <motion.a
                    href={founder.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="founder-action-btn btn-instagram"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`Visit ${founder.name}'s verified Instagram profile`}
                  >
                    <Instagram size={16} />
                    <span>Instagram Profile</span>
                    <ArrowUpRight size={14} className="action-arrow" />
                  </motion.a>
                )}

              </div>

            </motion.article>
          );
        })}
      </div>

      {/* Honest Channel Transparency Footnote */}
      <div className="founders-trust-footer glass-panel">
        <MessageCircle size={18} className="trust-icon" />
        <p className="trust-note">
          <strong>Direct Founder Commitment:</strong> Sarthak and Aaryan personally review every project inquiry. WhatsApp messages and phone calls are answered directly by our founding engineers during active business hours.
        </p>
      </div>

    </div>
  );
};
