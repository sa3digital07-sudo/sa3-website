export interface RouteMeta {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: string;
  keywords?: string[];
}

export const SITE_CONFIG = {
  name: 'SA³',
  fullName: 'SA³ — Precision in Motion',
  tagline: 'From Ideas to Reality',
  eyebrow: 'SA³ / DIGITAL PRODUCT & SOFTWARE STUDIO',
  heroH1: 'Ideas deserve to become real.',
  heroCopy: 'SA³ designs and builds purposeful websites, custom software, and digital experiences around the way people actually work.',
  primaryCTA: 'Discuss a project',
  secondaryCTA: 'Explore what we build',
  contactHeading: 'Tell us what you want to build.',
  contactCopy: 'Share the idea, the problem you want to solve, or the website you need. You do not need a complete specification—we can start with a conversation.',
  // Launch configuration notes (to be configured on deployment)
  domainPlaceholder: 'https://sa3.digital', // Base placeholder for canonical URLs & sitemap
  emailPlaceholder: 'hello@sa3.digital'
};

export const ROUTES_METADATA: Record<string, RouteMeta> = {
  '/': {
    title: 'SA³ — From Ideas to Reality | Digital Product & Software Studio',
    description: 'SA³ designs and builds purposeful websites, custom software, and responsive digital experiences engineered for clarity, speed, and real-world utility.',
    canonicalPath: '/',
    keywords: ['SA3', 'digital product studio', 'website development', 'custom software', 'application development', 'responsive design']
  },
  '/services/': {
    title: 'Services & Capabilities | SA³ Studio',
    description: 'Explore SA³ services: bespoke website design & development, workflow-tailored custom software, and user-centric application development.',
    canonicalPath: '/services/',
    keywords: ['software services', 'web design services', 'bespoke engineering', 'digital product development']
  },
  '/website-development/': {
    title: 'Website Design & Development | SA³ Studio',
    description: 'Plan, design, and build fast, responsive websites that communicate clearly, build institutional trust, and generate qualified enquiries.',
    canonicalPath: '/website-development/',
    keywords: ['website design', 'web development', 'responsive websites', 'accessible web development', 'SEO ready websites']
  },
  '/custom-software/': {
    title: 'Custom Software Development | SA³ Studio',
    description: 'Convert manual or fragmented workflows into reliable, purpose-built internal tools, portals, and operational software systems.',
    canonicalPath: '/custom-software/',
    keywords: ['custom software', 'internal tools', 'workflow automation', 'business software development']
  },
  '/application-development/': {
    title: 'Application Development | SA³ Studio',
    description: 'Build web and cross-platform applications centered around verified user needs, predictable state, and intuitive interface design.',
    canonicalPath: '/application-development/',
    keywords: ['application development', 'web apps', 'product development', 'React applications']
  },
  '/about/': {
    title: 'About SA³ | Purposeful Engineering & Design Principles',
    description: 'Learn about SA³: an independent studio focused on purposeful websites, custom software, and modern digital engineering without unnecessary complexity.',
    canonicalPath: '/about/',
    keywords: ['about SA3', 'software engineering studio', 'product design philosophy']
  },
  '/contact/': {
    title: 'Discuss Your Project | Contact SA³',
    description: 'Reach out to SA³ to discuss a website, custom software system, or application project. Direct conversations with engineering leads.',
    canonicalPath: '/contact/',
    keywords: ['contact SA3', 'hire software developer', 'request web development quote', 'project discovery']
  },
  '/404.html': {
    title: 'Page Not Found | SA³',
    description: 'The requested page could not be found. Return to SA³ homepage or explore our core services.',
    canonicalPath: '/404.html'
  }
};

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  problem: string;
  deliverables: string[];
  ctaText: string;
  badge: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'website-development',
    slug: '/website-development/',
    name: 'Website Design & Development',
    badge: '01 / Digital Presence',
    shortDesc: 'Plan and build responsive websites that help organizations communicate clearly, establish trust, and generate relevant enquiries.',
    problem: 'Many websites fail because they rely on bloated templates, unreadable layouts, or slow loading times that frustrate visitors and hide core services.',
    deliverables: [
      'Content structure & wireframing',
      'Editorial UX/UI design system',
      'Modern responsive implementation',
      'Accessible semantic HTML & ARIA landmarks',
      'Search engine crawlability & metadata foundations',
      'Performance optimization & Core Web Vitals checks',
      'Handover testing & launch preparation'
    ],
    ctaText: 'Plan a Website'
  },
  {
    id: 'custom-software',
    slug: '/custom-software/',
    name: 'Custom Software',
    badge: '02 / Operational Tools',
    shortDesc: 'Convert manual, paper-based, or disconnected spreadsheets and tools into a reliable, purpose-built digital workflow.',
    problem: 'Off-the-shelf software often forces teams to contort their operations to fit rigid software constraints, leaving data fragmented across spreadsheets and chats.',
    deliverables: [
      'Workflow mapping & requirements discovery',
      'Role-based permissions & architecture schema',
      'Clean, focused operator interfaces',
      'Database modeling & secure data handling',
      'Agreed third-party API integrations',
      'Automated validation & operational reporting',
      'Documentation & maintenance roadmap'
    ],
    ctaText: 'Scope Custom Software'
  },
  {
    id: 'application-development',
    slug: '/application-development/',
    name: 'Application Development',
    badge: '03 / User Applications',
    shortDesc: 'Build modern applications around a defined user need, with clear customer flows, practical features, and predictable behavior.',
    problem: 'Products often get weighed down by premature feature creep, leading to slow launch cycles, high maintenance costs, and confused end-users.',
    deliverables: [
      'User journey mapping & interface specifications',
      'Component-driven frontend architecture',
      'Predictable client-state management',
      'Touch-first responsive layouts for all viewports',
      'Error boundaries & graceful network fallbacks',
      'End-to-end user flow testing',
      'Deployment pipeline & release readiness'
    ],
    ctaText: 'Build an Application'
  }
];

export interface ConceptItem {
  id: string;
  title: string;
  category: string;
  description: string;
  scope: string[];
  architecture: string;
  status: 'Concept exploration' | 'Illustrative concept';
}

export const CONCEPTS: ConceptItem[] = [
  {
    id: 'concept-web',
    title: 'Clarity Studio Platform',
    category: 'Commercial Website Architecture',
    description: 'An editorial-first digital presence for specialized consultancies, combining high-contrast typography, interactive service matrices, and accessible enquiry funnels.',
    scope: ['Editorial layout', 'Multi-layer glassmorphism', 'Indexable service routes', 'Direct lead qualification'],
    architecture: 'Statically rendered HTML + Motion transitions',
    status: 'Illustrative concept'
  },
  {
    id: 'concept-ops',
    title: 'Logix Workflow Hub',
    category: 'Custom Operations Interface',
    description: 'A purpose-built operational dashboard for tracking distributed service requests, real-time ticket triage, and automated team task assignment.',
    scope: ['Live status feeds', 'Keyboard-first navigation', 'Filterable data grids', 'Granular audit logging'],
    architecture: 'Role-gated portal + RESTful state synchronizer',
    status: 'Concept exploration'
  },
  {
    id: 'concept-app',
    title: 'MetricFlow Mobile & Web App',
    category: 'Interactive Application Experience',
    description: 'A touch-optimized telemetry tracking client that allows field technicians to log metrics offline and synchronize records upon reconnection.',
    scope: ['Offline-tolerant cache', 'Touch gestures', 'Adaptive density viewports', 'Bi-directional sync'],
    architecture: 'Client-side reactive store + progressive caching',
    status: 'Illustrative concept'
  }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    name: 'Understand',
    focus: 'Goals, Users & Constraints',
    description: 'We listen to understand the real problem before recommending technical solutions. We examine your current tools, constraints, team workflows, and the measurable outcome you need.'
  },
  {
    step: '02',
    name: 'Define',
    focus: 'Scope, Priorities & Plan',
    description: 'We establish an unambiguous scope, agreed milestone priorities, content requirements, and technical architecture so there are no surprises or hidden assumptions.'
  },
  {
    step: '03',
    name: 'Design & Build',
    focus: 'Implementation & Reviews',
    description: 'Design and engineering occur collaboratively. We build with modern, standards-compliant tools, providing regular review checkpoints so you can test real working software early.'
  },
  {
    step: '04',
    name: 'Test & Deliver',
    focus: 'Validation & Handover',
    description: 'We rigorously test across viewports, verify accessibility and performance standards, validate error handling, and prepare structured documentation for handover and launch.'
  }
];

export const PRINCIPLES = [
  {
    title: 'Understand Before Choosing Tools',
    description: 'We never force a trendy technology onto a project that simply requires a fast, clean website or a straightforward database.'
  },
  {
    title: 'Clear, Unambiguous Scope',
    description: 'We communicate deliverables, boundaries, and technical decisions in plain English so everyone shares the exact same expectations.'
  },
  {
    title: 'Design & Engineering as One Discipline',
    description: 'Interfaces are designed with real data constraints in mind, and code is written with obsessive attention to user-facing polish.'
  },
  {
    title: 'Avoid Unnecessary Complexity',
    description: 'Fewer dependencies, cleaner code, and standard web technologies mean lower maintenance costs and longer software lifespan.'
  },
  {
    title: 'Engineered for Real Users and Devices',
    description: 'Tested across actual mobile viewports, low-bandwidth connections, and keyboard navigation, not just high-end desktop monitors.'
  }
];

export const FAQS = [
  {
    q: 'What kinds of projects can SA³ build?',
    a: 'We specialize in three areas: modern, high-performance websites for businesses; custom operational software to replace inefficient manual workflows; and focused web/mobile application experiences built around clear user requirements.'
  },
  {
    q: 'How does a project begin?',
    a: 'We start with an introductory conversation to understand what you want to achieve, your timeline, and any existing materials you have. We then provide a structured proposal outlining the recommended approach, agreed scope, and milestone steps.'
  },
  {
    q: 'Can you work from an existing idea or design?',
    a: 'Yes. Whether you only have rough notes on a notepad, existing Figma files, or a legacy system that needs complete modernization, we can step in at any stage.'
  },
  {
    q: 'How are cost and scope determined?',
    a: 'Cost is based entirely on project scope, functional complexity, and technical requirements. Once we define milestones together during discovery, we deliver clear, transparent pricing before development begins.'
  },
  {
    q: 'Will the website work on mobile devices?',
    a: 'Every website and application we build is designed and tested responsively across screen widths (including 360px, 390px, 768px, 1024px, and 1440px) to guarantee flawless usability on phones, tablets, and desktops.'
  },
  {
    q: 'Can you help after launch?',
    a: 'Yes. We offer maintenance arrangements, hosting guidance, and ongoing feature iterations based on agreed post-launch support scopes.'
  },
  {
    q: 'What should I prepare before contacting SA³?',
    a: 'You do not need a comprehensive specification document. A simple summary of your business, the core challenge you want to address, any reference websites or tools you like, and your estimated timeline are plenty to get started.'
  }
];
