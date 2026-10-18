/**
 * SA³ Contact & Connect Configuration
 * 
 * Central configuration object for the unified "Contact & Connect" card.
 * 
 * EDITABLE FIELDS:
 * - header: Eyebrow, Heading, Supporting text
 * - founders: Name, Phone, telLink, whatsappDigits, whatsappPrefill
 * - companyChannels: Label, Description, Destination URL, Type
 * 
 * SAFE EMPTY VALUES:
 * If any phone, URL, or founder detail is left as an empty string (""),
 * the component will safely omit that button/entry to guarantee that
 * no nonfunctional buttons or invalid destination links are published.
 */

export interface FounderContactEntry {
  id: string;
  name: string;
  role: string;
  initials: string;
  phone: string;            // Display format: "+91 9834006980" (empty "" if unsupplied)
  telLink: string;          // Valid tel URL target: "+919834006980" (empty "" if unsupplied)
  whatsappDigits: string;   // International digits only: "919834006980" (empty "" if unsupplied)
  whatsappPrefill?: string; // Optional introductory message prefill
}

export interface CompanyChannelEntry {
  id: string;
  label: string;
  description: string;
  url: string;              // Full verified destination URL. Leave empty string "" if not verified
  type: 'external' | 'mailto';
}

export interface ContactConfig {
  header: {
    eyebrow: string;
    heading: string;
    supportingText: string;
  };
  founders: FounderContactEntry[];
  companyChannels: CompanyChannelEntry[];
  directCommitmentText: string;
}

export const CONTACT_CONFIG: ContactConfig = {
  header: {
    eyebrow: "LET'S CONNECT",
    heading: 'One team. Two founders. One vision.',
    supportingText: 'Have an idea? Reach the people behind SA³ directly.'
  },
  founders: [
    {
      id: 'founder-aryan',
      name: 'Aryan Phutane',
      role: 'Co-Founder & Technical Architect',
      initials: 'AP',
      phone: '+91 9834006980',
      telLink: '+919834006980',
      whatsappDigits: '919834006980',
      whatsappPrefill: 'Hi Aryan, I would like to discuss a project with SA³.'
    },
    {
      id: 'founder-sarthak',
      name: 'Sarthak Mahajan',
      role: 'Co-Founder & Systems Lead',
      initials: 'SM',
      phone: '+91 7020712701',
      telLink: '+917020712701',
      whatsappDigits: '917020712701',
      whatsappPrefill: 'Hi Sarthak, I would like to discuss a project with SA³.'
    }
  ],
  companyChannels: [
    {
      id: 'channel-linkedin',
      label: 'LinkedIn',
      description: 'Official studio updates, architectural insights, and company news.',
      url: 'https://www.linkedin.com/company/sa3-digital/',
      type: 'external'
    },
    {
      id: 'channel-instagram',
      label: 'Instagram',
      description: 'Design explorations, engineering showcases, and product updates.',
      url: 'https://www.instagram.com/sa3digital',
      type: 'external'
    },
    {
      id: 'channel-email',
      label: 'Studio Email',
      description: 'Direct studio inquiries for project scopes, milestones, and collaborations.',
      // AUDIT FINDING: "sa3digital07@gmail.com" was not found in existing project files
      // (prior repository files only contained personal addresses: sarthakmahajantp@gmail.com, mahajanaaryan069@gmail.com).
      // Per prompt instructions: "using a 'mailto:' link if this address is verified in the existing project.
      // Leave blank until provided and do not render links that have no valid destination."
      // Set to "sa3digital07@gmail.com" once explicitly verified by the user to activate this link.
      url: '', 
      type: 'mailto'
    }
  ],
  directCommitmentText:
    'Direct Founder Commitment: Sarthak and Aryan personally evaluate every project inquiry. WhatsApp messages and phone calls are answered directly by our founding engineers during active business hours.'
};

/**
 * Helper to check whether a string is non-empty and has a valid destination
 */
export const hasValidDestination = (val: string | undefined | null): boolean => {
  return typeof val === 'string' && val.trim().length > 0;
};
