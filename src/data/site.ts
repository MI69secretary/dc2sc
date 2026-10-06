// DC2SC Site Configuration — Static data
// Phase 1: no live services, no external APIs

export const siteConfig = {
  name: 'DC2SC',
  descriptor: 'Research on buyer-side market formation',
  corePremise: {
    part1: 'More choice.',
    part2: 'Less voice.',
  },
  signatureDistinction: {
    crowd: 'A crowd is attention.',
    position: 'A market position is agency.',
  },
  description:
    'DC2SC is an independent research program studying how independent people may form voluntary, intelligible and participant-contestable collective market positions—without assuming that aggregation, competition, lower prices or transactions are automatically beneficial.',
  goliafDescriptor: 'A bounded travel stress-test environment',
  phase: 1,
  isProduction: false,
} as const;

export const navLinks = [
  { href: '/research', label: 'Research' },
  { href: '/journal', label: 'Journal' },
  { href: '/goliaf', label: 'GOLIAF' },
  { href: '/community', label: 'Community' },
  { href: '/about', label: 'About' },
] as const;

export const footerNav = {
  explore: [
    { href: '/research', label: 'Research' },
    { href: '/journal', label: 'Journal' },
    { href: '/goliaf', label: 'GOLIAF' },
    { href: '/community', label: 'Community' },
  ],
  project: [
    { href: '/about', label: 'About' },
    { href: '/support', label: 'Support' },
    { href: '/about#contact', label: 'Contact' },
  ],
  standards: [
    { href: '/research#status', label: 'Research status' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/about#accessibility', label: 'Accessibility' },
    { href: '/terms', label: 'Terms' },
  ],
} as const;

export const socialLinks = [
  { label: 'X', url: null },
  { label: 'Bluesky', url: null },
  { label: 'Medium', url: null },
  { label: 'Substack', url: null },
  { label: 'GitHub', url: null },
] as const;
