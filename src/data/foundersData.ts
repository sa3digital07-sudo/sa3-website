/**
 * SA³ Verified Founders Configuration
 * 
 * IMPORTANT:
 * - Real verified facts only. No fabricated accounts or invented handles.
 * - Missing personal handles are left as empty strings ("") to prevent
 *   rendering nonfunctional buttons publicly.
 * - Update the empty strings below once the founders provide their individual
 *   personal LinkedIn and Instagram URLs.
 */

export interface FounderContact {
  // E.164 phone string (e.g., '+917972270075') for tel: links
  phone: string;
  // International digits only (no '+', no spaces, no dashes) for wa.me/ links
  whatsappDigits: string;
  // Optional pre-filled introductory message
  whatsappPrefill?: string;
  // Verified email address for mailto: links
  email: string;
  // Verified personal LinkedIn URL (leave empty string "" if not yet provided)
  linkedin: string;
  // Verified personal Instagram URL (leave empty string "" if not yet provided)
  instagram: string;
}

export interface Founder {
  id: string;
  name: string;
  role: string;
  badge: string;
  initials: string;
  introduction: string;
  availability: string;
  contact: FounderContact;
}

export const FOUNDERS: Founder[] = [
  {
    id: 'aaryan-mahajan',
    name: 'Aaryan Mahajan',
    role: 'Founding Director & Lead Architect',
    badge: 'Lead Web Architect',
    initials: 'AM',
    introduction: 'Directs frontend architecture, editorial design systems, and responsive web performance at SA³. Specializes in React, TypeScript, accessible semantic markup, and Google crawlability.',
    availability: 'Available for technical project scoping',
    contact: {
      phone: '+917972270075',
      whatsappDigits: '917972270075',
      whatsappPrefill: 'Hi Aaryan, I would like to discuss a project with SA³.',
      email: 'mahajanaaryan069@gmail.com',
      // Missing verified personal profile URLs - left empty per strict non-fabrication rule
      linkedin: '',
      instagram: ''
    }
  },
  {
    id: 'sarthak-mahajan',
    name: 'Sarthak Mahajan',
    role: 'Founding Director & Systems Lead',
    badge: 'Systems & Data Lead',
    initials: 'SM',
    introduction: 'Directs custom operational software, database schemas, and API integrations at SA³. Specializes in converting manual spreadsheets and disjointed workflows into reliable internal tools.',
    availability: 'Available for architecture & systems scoping',
    contact: {
      phone: '+917020712701',
      whatsappDigits: '917020712701',
      whatsappPrefill: 'Hi Sarthak, I would like to discuss an operational software project with SA³.',
      email: 'sarthakmahajantp@gmail.com',
      // Missing verified personal profile URLs - left empty per strict non-fabrication rule
      linkedin: '',
      instagram: ''
    }
  }
];

// Helper to determine if a specific channel is configured and functional
export const isChannelConfigured = (urlOrValue: string | undefined): boolean => {
  return typeof urlOrValue === 'string' && urlOrValue.trim().length > 0;
};
