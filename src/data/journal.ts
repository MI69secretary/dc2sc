export interface JournalArticle {
  id: string;
  title: string;
  dek: string;
  topic: string;
  evidenceBadge: string;
  type: string;
  status: 'conceptual_preview';
  isDemo: true;
  isFeatured?: boolean;
}

export const journalArticles: JournalArticle[] = [
  {
    id: 'more-choice-less-voice',
    title: 'More Choice, Less Voice',
    dek: 'Individual access to offers expands while the structural capacity to influence terms contracts.',
    topic: 'Market isolation',
    evidenceBadge: 'E0',
    type: 'Research essay',
    status: 'conceptual_preview',
    isDemo: true,
    isFeatured: true,
  },
  {
    id: 'crowd-is-attention',
    title: 'A Crowd Is Attention. A Market Position Is Agency.',
    dek: 'Distinguishing between aggregated attention and collective authority over market terms.',
    topic: 'Collective agency',
    evidenceBadge: 'E0',
    type: 'Research essay',
    status: 'conceptual_preview',
    isDemo: true,
  },
  {
    id: 'why-more-buyers',
    title: 'Why More Buyers Do Not Automatically Mean a Better Deal',
    dek: 'Volume without ratification, representation or exit rights does not constitute market power.',
    topic: 'Coordination rights',
    evidenceBadge: 'E0',
    type: 'Research essay',
    status: 'conceptual_preview',
    isDemo: true,
  },
  {
    id: 'cost-of-commitment',
    title: 'The Cost of Commitment',
    dek: 'What does it mean to commit to a collective position, and who bears the cost when it dissolves?',
    topic: 'Commitment',
    evidenceBadge: 'E0',
    type: 'Research note',
    status: 'conceptual_preview',
    isDemo: true,
  },
  {
    id: 'coordination-rights',
    title: 'Coordination Rights',
    dek: 'Framing the conditions under which collective market action is a right rather than a privilege.',
    topic: 'Coordination rights',
    evidenceBadge: 'E0',
    type: 'Research essay',
    status: 'conceptual_preview',
    isDemo: true,
  },
  {
    id: 'what-counts-as-success',
    title: 'What Counts as Success?',
    dek: 'Defining success criteria that include null results, negative outcomes and decisions not to aggregate.',
    topic: 'Research methods',
    evidenceBadge: 'E0',
    type: 'Research essay',
    status: 'conceptual_preview',
    isDemo: true,
  },
];

export const journalTopics = [
  'All',
  'Market isolation',
  'Collective agency',
  'Commitment',
  'Coordination rights',
  'Travel stress test',
  'Research methods',
  'Failure conditions',
] as const;
