import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Phone,
  Linkedin,
  Instagram,
  Mail,
  ArrowUpRight,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import {
  CONTACT_CONFIG,
  hasValidDestination
} from '../data/contactConfig';
import './ContactConnectCard.css';

/**
 * WhatsApp SVG icon matching brand stroke and fill specifications
 */
const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 17,
  className = ''
}) => (
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

/**
 * Helper to render correct icon for each company channel
 */
const renderChannelIcon = (id: string) => {
  switch (id) {
    case 'channel-linkedin':
      return <Linkedin size={20} />;
    case 'channel-instagram':
      return <Instagram size={20} />;
    case 'channel-email':
      return <Mail size={20} />;
    default:
      return <MessageSquare size={20} />;
  }
};

export const ContactConnectCard: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="contact-connect-wrapper">
      <motion.section
        className="contact-connect-card glass-panel"
        aria-labelledby="contact-heading"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Ambient Top Light Beam Effect */}
        <div className="connect-card-glow" aria-hidden="true" />

        {/* 1. Header Section */}
        <header className="connect-card-header">
          <div className="connect-eyebrow-pill">
            <Sparkles size={13} className="eyebrow-icon" />
            <span>{CONTACT_CONFIG.header.eyebrow}</span>
          </div>
          <h2 id="contact-heading" className="connect-main-heading">
            {CONTACT_CONFIG.header.heading}
          </h2>
          <p className="connect-supporting-text">
            {CONTACT_CONFIG.header.supportingText}
          </p>
        </header>

        {/* 2. Founder Section: Aryan Phutane & Sarthak Mahajan */}
        <div className="connect-founders-section" aria-label="Founders Direct Contact">
          <div className="founders-header-row">
            <span className="founders-lead-title">Founding Directors & Technical Architects</span>
            <div className="founders-status-badge">
              <span className="pulse-dot" />
              <span>Direct Founder Lines</span>
            </div>
          </div>

          <div className="founders-inner-grid">
            {CONTACT_CONFIG.founders.map((founder, index) => {
              // Ensure we do not render fake or empty founder entries
              if (!hasValidDestination(founder.name)) return null;

              const hasCall = hasValidDestination(founder.telLink);
              const hasWa = hasValidDestination(founder.whatsappDigits);
              const waUrl = hasWa
                ? `https://wa.me/${founder.whatsappDigits}${
                    founder.whatsappPrefill
                      ? `?text=${encodeURIComponent(founder.whatsappPrefill)}`
                      : ''
                  }`
                : '';

              return (
                <motion.article
                  key={founder.id}
                  className="founder-inner-card glass-panel"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.12 }}
                >
                  {/* Founder Profile Info */}
                  <div className="founder-info-row">
                    <div className="founder-avatar-box">
                      <span className="founder-avatar-initials">{founder.initials}</span>
                      <span className="founder-presence-dot" title="Founder active on direct channels" />
                    </div>

                    <div className="founder-identity">
                      <h3 className="founder-fullname">{founder.name}</h3>
                      <span className="founder-role-tag">{founder.role}</span>
                    </div>
                  </div>

                  {/* Phone Row with Quick-Copy */}
                  {hasValidDestination(founder.phone) && (
                    <div className="founder-phone-strip">
                      <div className="phone-strip-left">
                        <Phone size={14} className="strip-phone-icon" />
                        <span className="founder-number-display">{founder.phone}</span>
                      </div>
                      <button
                        type="button"
                        className="founder-inline-copy"
                        onClick={() => handleCopy(founder.phone, `${founder.id}-phone`)}
                        aria-label={`Copy phone number for ${founder.name}`}
                      >
                        {copiedId === `${founder.id}-phone` ? (
                          <span className="copy-state-done">
                            <Check size={12} /> Copied
                          </span>
                        ) : (
                          <span className="copy-state-idle">
                            <Copy size={12} /> Copy
                          </span>
                        )}
                      </button>
                    </div>
                  )}

                  {/* 2 Functional Buttons: Call and WhatsApp */}
                  <div className="founder-action-buttons">
                    {hasCall && (
                      <motion.a
                        href={`tel:${founder.telLink}`}
                        className="founder-btn-action btn-call"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Call ${founder.name} directly at ${founder.phone}`}
                      >
                        <Phone size={15} />
                        <span>Call</span>
                      </motion.a>
                    )}

                    {hasWa && (
                      <motion.a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="founder-btn-action btn-whatsapp"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Message ${founder.name} on WhatsApp`}
                      >
                        <WhatsAppIcon size={16} />
                        <span>WhatsApp</span>
                        <ArrowUpRight size={14} className="btn-external-icon" />
                      </motion.a>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Clear Visual Divider Between Founders and Company Social Channels */}
        <div className="connect-card-divider" role="separator" aria-label="Divider between founders and company channels">
          <span className="divider-label-pill">OFFICIAL STUDIO CHANNELS</span>
        </div>

        {/* 3. Company Social / Contact Section */}
        <div className="connect-channels-section" aria-label="Official Company Channels">
          <div className="channels-section-header">
            <h4 className="channels-section-title">Connect with SA³ Studio</h4>
            <p className="channels-section-desc">
              Explore our verified digital presence, architectural updates, and product engineering work.
            </p>
          </div>

          <div className="channels-interactive-grid">
            {CONTACT_CONFIG.companyChannels.map((channel) => {
              const hasDest = hasValidDestination(channel.url);

              // Per requirement: "Leave URLs blank in configuration until provided.
              // Do not render links that have no valid destination.
              // Verify empty values do not produce broken buttons."
              if (!hasDest) {
                return null;
              }

              const href = channel.type === 'mailto' ? `mailto:${channel.url}` : channel.url;
              const isExternal = channel.type === 'external';

              return (
                <motion.a
                  key={channel.id}
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="channel-tile glass-panel"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.99 }}
                  aria-label={`Visit SA³ on ${channel.label}${isExternal ? ' (opens in a new tab)' : ''}`}
                >
                  <div className="channel-tile-icon-box">
                    {renderChannelIcon(channel.id)}
                  </div>
                  <div className="channel-tile-body">
                    <div className="channel-tile-top">
                      <span className="channel-tile-name">{channel.label}</span>
                      <ArrowUpRight size={16} className="channel-tile-arrow" />
                    </div>
                    <p className="channel-tile-description">{channel.description}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Reassuring Commitment Footer */}
        <footer className="connect-trust-footer">
          <ShieldCheck size={18} className="trust-icon" />
          <p className="trust-text">{CONTACT_CONFIG.directCommitmentText}</p>
        </footer>
      </motion.section>
    </div>
  );
};
