import {
  DIRECT_CHANNELS,
  FEATURED_BUILDS,
  SERVICE_PILLARS,
} from './agency';

export type SearchResultKind = 'Service' | 'Build' | 'Page' | 'Channel';

export interface SearchEntry {
  id: string;
  title: string;
  subtitle: string;
  kind: SearchResultKind;
  to: string;
  external?: boolean;
  keywords: string[];
}

export const QUICK_SEARCH_TAGS = [
  'Web Apps',
  'Mobile',
  'Inventory',
  'Booking',
  'Quote',
  'WhatsApp',
] as const;

const PAGE_ENTRIES: SearchEntry[] = [
  {
    id: 'page-home',
    title: 'Home',
    subtitle: 'Overview, curved showcase & capabilities',
    kind: 'Page',
    to: '/',
    keywords: ['home', 'overview', 'betterconnect', 'agency', 'kerala', 'showcase'],
  },
  {
    id: 'page-services',
    title: 'Services & Process',
    subtitle: '4 Service Pillars, Discover → Build → Launch & custom quotes',
    kind: 'Page',
    to: '/services',
    keywords: ['services', 'pricing', 'quote', 'cost', 'process', 'discover', 'launch', 'capabilities'],
  },
  {
    id: 'page-work',
    title: 'Featured Builds',
    subtitle: 'Portfolio templates across retail, booking & ops',
    kind: 'Page',
    to: '/work',
    keywords: ['work', 'portfolio', 'projects', 'builds', 'examples', 'demos'],
  },
  {
    id: 'page-about',
    title: 'About & Team of Five',
    subtitle: 'Kerala roots, studio principles & 5 builders',
    kind: 'Page',
    to: '/about',
    keywords: ['about', 'team', 'five', 'kerala', 'founders', 'builders', 'story'],
  },
  {
    id: 'page-contact',
    title: 'Send an Inquiry',
    subtitle: 'Project contact form & Direct Channels',
    kind: 'Page',
    to: '/contact',
    keywords: ['contact', 'inquiry', 'email', 'hire', 'start', 'quote', 'message', 'call'],
  },
];

const SERVICE_ENTRIES: SearchEntry[] = SERVICE_PILLARS.map((pillar) => ({
  id: `service-${pillar.id}`,
  title: pillar.title,
  subtitle: `${pillar.shortTag} · ${pillar.timelineHint}`,
  kind: 'Service',
  to: '/services',
  keywords: [
    pillar.title.toLowerCase(),
    pillar.shortTag.toLowerCase(),
    pillar.summary.toLowerCase(),
    pillar.idealFor.toLowerCase(),
    ...pillar.deliverables.map((d) => d.toLowerCase()),
    'service',
    'quote',
  ],
}));

const BUILD_ENTRIES: SearchEntry[] = FEATURED_BUILDS.map((build) => ({
  id: `build-${build.slug}`,
  title: build.title,
  subtitle: `${build.category} · ${build.clientType}`,
  kind: 'Build',
  to: `/work/${build.slug}`,
  keywords: [
    build.title.toLowerCase(),
    build.category.toLowerCase(),
    build.summary.toLowerCase(),
    build.clientType.toLowerCase(),
    ...build.stack.map((s) => s.toLowerCase()),
    ...build.deliverables.map((d) => d.toLowerCase()),
    'grocery',
    'clinic',
    'dashboard',
    'excel',
  ],
}));

const CHANNEL_ENTRIES: SearchEntry[] = DIRECT_CHANNELS.map((channel) => ({
  id: `channel-${channel.id}`,
  title: channel.label,
  subtitle: channel.handle,
  kind: 'Channel',
  to: channel.href,
  external: channel.id !== 'email',
  keywords: [
    channel.label.toLowerCase(),
    channel.description.toLowerCase(),
    'contact',
    'chat',
    'dm',
    'message',
  ],
}));

export const ALL_SEARCH_ENTRIES: SearchEntry[] = [
  ...SERVICE_ENTRIES,
  ...BUILD_ENTRIES,
  ...PAGE_ENTRIES,
  ...CHANNEL_ENTRIES,
];

export function filterSearchEntries(rawQuery: string): SearchEntry[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) {
    return [...SERVICE_ENTRIES.slice(0, 3), ...BUILD_ENTRIES.slice(0, 2)];
  }

  const terms = query.split(/\s+/).filter(Boolean);
  return ALL_SEARCH_ENTRIES.filter((entry) => {
    const haystack = [entry.title, entry.subtitle, entry.kind, ...entry.keywords]
      .join(' ')
      .toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}
