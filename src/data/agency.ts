export type BuildCategory = 'Web Apps' | 'Mobile Apps' | 'Operations';

export interface FeaturedBuild {
  slug: string;
  title: string;
  clientType: string;
  category: BuildCategory;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  stack: string[];
  metricsLabel: string;
  image: string;
  imageAlt: string;
  isTemplate: boolean;
  liveUrlPlaceholder: string;
}

export interface ServicePillar {
  id: string;
  title: string;
  shortTag: string;
  summary: string;
  idealFor: string;
  deliverables: string[];
  timelineHint: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  outcome: string;
}

export interface TeamMember {
  id: string;
  initials: string;
  name: string;
  role: string;
  focus: string;
  bio: string;
}

export interface DirectChannel {
  id: 'whatsapp' | 'instagram' | 'email';
  label: string;
  handle: string;
  description: string;
  href: string;
  ctaLabel: string;
}

/**
 * Centralized SideQuest configuration.
 * Replace placeholder links, handles, and form endpoint before production launch.
 */
export const AGENCY_CONFIG = {
  name: 'SideQuest',
  location: 'Kerala, India',
  timezone: 'IST (UTC+5:30)',
  teamSize: 5,
  // Plug your Web3Forms / Formspree endpoint URL here once ready:
  inquiryEndpoint: import.meta.env.VITE_FORM_ENDPOINT || '',
  contactEmail: 'hello@sidequest.agency',
  whatsappHref: 'https://wa.me/910000000000?text=Hi%20SideQuest%2C%20we%27d%20like%20to%20discuss%20a%20project.',
  instagramHref: 'https://instagram.com/sidequest.agency',
} as const;

export const DIRECT_CHANNELS: DirectChannel[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    handle: '+91 00000 00000 (Placeholder)',
    description: 'Fastest way to start a conversation, share voice notes, or ask quick questions.',
    href: AGENCY_CONFIG.whatsappHref,
    ctaLabel: 'Message on WhatsApp',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@sidequest.agency (Placeholder)',
    description: 'Follow behind-the-scenes builds or send a DM directly to our team.',
    href: AGENCY_CONFIG.instagramHref,
    ctaLabel: 'Open Instagram',
  },
  {
    id: 'email',
    label: 'Direct Email',
    handle: AGENCY_CONFIG.contactEmail,
    description: 'Ideal for sharing briefs, documents, or existing product links directly.',
    href: `mailto:${AGENCY_CONFIG.contactEmail}?subject=Project%20Inquiry%20for%20SideQuest`,
    ctaLabel: 'Send an Email',
  },
];

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'web-apps',
    title: 'Web Applications & Websites',
    shortTag: 'Storefronts, Portals & SaaS',
    summary:
      'Fast, responsive web applications and high-converting business websites built to international usability standards—without bloated templates.',
    idealFor: 'Retailers, service companies, local brands, and early startups moving online.',
    deliverables: [
      'Custom React / modern frontend architecture',
      'Product catalogs, customer portals, and booking flows',
      'Speed optimization and clean search fundamentals',
      'Handover documentation & post-launch support',
    ],
    timelineHint: 'Typical build: 3–6 weeks',
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Applications',
    shortTag: 'iOS & Android Experiences',
    summary:
      'Intuitive mobile apps designed for everyday customers and field teams who expect smooth performance on any phone.',
    idealFor: 'Clinics, delivery services, hospitality, and community-driven businesses.',
    deliverables: [
      'Cross-platform iOS & Android app development',
      'Push notifications, bookings, and offline-friendly flows',
      'Clean onboarding designed for non-technical users',
      'App Store & Play Store release readiness',
    ],
    timelineHint: 'Typical build: 5–8 weeks',
  },
  {
    id: 'automation-tools',
    title: 'Business Automation & Internal Tools',
    shortTag: 'Dashboards, Inventory & Billing',
    summary:
      'Replace messy spreadsheets and WhatsApp order chaos with calm, purpose-built dashboards tailored around how your staff actually works.',
    idealFor: 'Wholesalers, clinics, logistics teams, and multi-branch small firms.',
    deliverables: [
      'Custom inventory, dispatch, and billing consoles',
      'Role-based staff views and automated alerts',
      'WhatsApp / email notification integrations',
      'Clean data export and reporting workflows',
    ],
    timelineHint: 'Typical build: 3–5 weeks',
  },
  {
    id: 'ui-ux-launch',
    title: 'UI/UX & Digital Launch',
    shortTag: 'Product Design & Modernization',
    summary:
      'Turn an offline business or rough idea into a clear, trustworthy digital presence—from user flows and visual design to launch.',
    idealFor: 'Non-technical founders and traditional businesses going digital for the first time.',
    deliverables: [
      'Clickable product prototypes before code begins',
      'Clear visual systems tailored to your business',
      'Copy structure that explains what you sell clearly',
      'Practical launch roadmap without unnecessary scope',
    ],
    timelineHint: 'Typical build: 1–3 weeks',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: 'Discover',
    description:
      'We listen to how your business actually operates—over a call, WhatsApp, or in person—and map out the simplest software that solves the real bottleneck.',
    outcome: 'Clear scope, realistic timeline, and a custom quote.',
  },
  {
    step: 2,
    title: 'Build',
    description:
      'Our team of five designs and engineers in tight weekly sprints. You see working builds early and often, never disappearing into months of silence.',
    outcome: 'Testable weekly previews and clean, maintainable code.',
  },
  {
    step: 3,
    title: 'Launch',
    description:
      'We deploy, test across desktop and mobile, train your team if needed, and stay available so your software keeps running smoothly as you grow.',
    outcome: 'Live product in customers’ hands with direct support.',
  },
];

export const FEATURED_BUILDS: FeaturedBuild[] = [
  {
    slug: 'malabar-fresh-commerce',
    title: 'Malabar Fresh Market',
    clientType: 'Template · Local Retail & Grocery',
    category: 'Web Apps',
    year: 'Template Build',
    summary:
      'A calm, mobile-friendly storefront and neighborhood order board built to help local produce and specialty retailers take direct orders without marketplace commissions.',
    challenge:
      'Small retail stores often lose 20–30% margin to third-party aggregator apps or juggle dozens of manual WhatsApp messages every morning.',
    solution:
      'We structured a fast visual catalog with a floating order summary, slot-based local pickup/delivery, and a clean one-screen order queue for store staff.',
    deliverables: [
      'Custom Storefront Web App',
      'Floating Glass Order Summary',
      'Merchant Daily Dispatch Queue',
      'WhatsApp Order Confirmation Link',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'REST API'],
    metricsLabel: 'Template Showcase · Ready for Live Link',
    image: '/images/build-retail.jpg',
    imageAlt: 'Malabar Fresh Market storefront web application preview',
    isTemplate: true,
    liveUrlPlaceholder: '#template-link-pending',
  },
  {
    slug: 'kairali-care-booking',
    title: 'Kairali Care Booking',
    clientType: 'Template · Clinic & Service Appointments',
    category: 'Mobile Apps',
    year: 'Template Build',
    summary:
      'A two-tap appointment and queue-status mobile experience designed for busy clinics, wellness studios, and local service providers.',
    challenge:
      'Patients and clients frequently abandon confusing booking portals or wait blindly in crowded lobbies because phone lines are busy.',
    solution:
      'Clean time-slot selection, instant confirmation cards, and automated reminders built with large, accessible tap targets for every age group.',
    deliverables: [
      'Patient / Client Mobile App UI',
      'Real-time Time Slot Picker',
      'Receptionist Schedule Board',
      'SMS / WhatsApp Visit Reminders',
    ],
    stack: ['React Native', 'TypeScript', 'Node API', 'Push Notifications'],
    metricsLabel: 'Template Showcase · Ready for Live Link',
    image: '/images/build-booking.jpg',
    imageAlt: 'Kairali Care Booking mobile appointment screens preview',
    isTemplate: true,
    liveUrlPlaceholder: '#template-link-pending',
  },
  {
    slug: 'coastline-ops-ledger',
    title: 'Coastline Ops Ledger',
    clientType: 'Template · Inventory & Dispatch Console',
    category: 'Operations',
    year: 'Template Build',
    summary:
      'A high-clarity operations dashboard replacing scattered spreadsheets with live stock levels, supplier tracking, and daily dispatch visibility.',
    challenge:
      'Growing distribution businesses outgrow manual Excel sheets quickly—leading to stockouts, missed invoices, and hours of end-of-day reconciliation.',
    solution:
      'A dark-framed glassmorphic command console with instant low-stock indicators, keyboard-first search, and printable daily dispatch summaries.',
    deliverables: [
      'Multi-Branch Inventory Dashboard',
      'Supplier & Invoice Ledger',
      'Low-Stock Alert Rules',
      'One-Click CSV / PDF Reports',
    ],
    stack: ['React', 'TypeScript', 'PostgreSQL', 'Charting'],
    metricsLabel: 'Template Showcase · Ready for Live Link',
    image: '/images/build-ops.jpg',
    imageAlt: 'Coastline Ops Ledger inventory and dispatch dashboard preview',
    isTemplate: true,
    liveUrlPlaceholder: '#template-link-pending',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'member-1',
    initials: 'M1',
    name: 'Team Member 01',
    role: 'Product & UI Design',
    focus: 'Interfaces, User Flows & Brand Systems',
    bio: 'Turns rough business workflows into clear, approachable screens anyone on your team or customer base can use immediately.',
  },
  {
    id: 'member-2',
    initials: 'M2',
    name: 'Team Member 02',
    role: 'Frontend Engineering',
    focus: 'React, TypeScript & Interactive Web',
    bio: 'Builds responsive, fast-loading web interfaces with crisp motion and dependable browser compatibility across desktop and mobile.',
  },
  {
    id: 'member-3',
    initials: 'M3',
    name: 'Team Member 03',
    role: 'Backend & Cloud Systems',
    focus: 'APIs, Databases & Integrations',
    bio: 'Architects reliable data models, secure authentication, payment gateways, and automated WhatsApp/email workflows.',
  },
  {
    id: 'member-4',
    initials: 'M4',
    name: 'Team Member 04',
    role: 'Mobile Engineering',
    focus: 'iOS, Android & Offline-First UX',
    bio: 'Crafts smooth cross-platform mobile apps tuned for real-world network conditions and everyday reliability.',
  },
  {
    id: 'member-5',
    initials: 'M5',
    name: 'Team Member 05',
    role: 'Delivery & Quality Lead',
    focus: 'Client Discovery, QA & Launch',
    bio: 'Keeps communication transparent, tests every edge case before launch, and ensures non-technical Clients feel supported.',
  },
];
