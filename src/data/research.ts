export interface ResearchModule {
  id: string;
  number: string;
  title: string;
  status: 'conceptual_preview';
  isDemo: true;
}

export interface Principle {
  number: number;
  title: string;
  explanation: string;
  status: 'conceptual_preview';
  isDemo: true;
}

export interface FailureCategory {
  id: string;
  label: string;
  status: 'conceptual_preview';
  isDemo: true;
}

export const researchModules: ResearchModule[] = [
  { id: 'more-choice-less-voice', number: '01', title: 'More Choice, Less Voice', status: 'conceptual_preview', isDemo: true },
  { id: 'crowd-attention-agency', number: '02', title: 'A Crowd Is Attention. A Market Position Is Agency.', status: 'conceptual_preview', isDemo: true },
  { id: 'why-more-buyers', number: '03', title: 'Why More Buyers Do Not Automatically Mean a Better Deal', status: 'conceptual_preview', isDemo: true },
  { id: 'cost-of-commitment', number: '04', title: 'The Cost of Commitment', status: 'conceptual_preview', isDemo: true },
  { id: 'coordination-rights', number: '05', title: 'Coordination Rights', status: 'conceptual_preview', isDemo: true },
  { id: 'travel-stress-test', number: '06', title: 'Travel Is a Stress Test', status: 'conceptual_preview', isDemo: true },
  { id: 'what-counts-as-success', number: '07', title: 'What Counts as Success?', status: 'conceptual_preview', isDemo: true },
];

export const principles: Principle[] = [
  {
    number: 1,
    title: 'Similarity is not authority',
    explanation: 'Shared circumstances do not automatically confer the right to represent others or speak in their name.',
    status: 'conceptual_preview',
    isDemo: true,
  },
  {
    number: 2,
    title: 'Ratification is not commitment',
    explanation: 'Approving a collective position is not the same as binding oneself to it unconditionally.',
    status: 'conceptual_preview',
    isDemo: true,
  },
  {
    number: 3,
    title: 'Supplier response is not participant value',
    explanation: 'A supplier acknowledging a collective position does not mean participants benefit from it.',
    status: 'conceptual_preview',
    isDemo: true,
  },
  {
    number: 4,
    title: 'Transaction is not success',
    explanation: 'A completed transaction does not confirm that the collective process improved on individual alternatives.',
    status: 'conceptual_preview',
    isDemo: true,
  },
  {
    number: 5,
    title: 'Rights floors are non-compensable',
    explanation: 'Privacy, exit, and contestability rights cannot be traded away in exchange for better terms.',
    status: 'conceptual_preview',
    isDemo: true,
  },
  {
    number: 6,
    title: 'Do not aggregate is a valid result',
    explanation: 'A decision not to form a collective position is a legitimate and complete research outcome.',
    status: 'conceptual_preview',
    isDemo: true,
  },
];

export const researchModelSteps = [
  { index: '01', label: 'Private intent' },
  { index: '02', label: 'Expressed constraints' },
  { index: '03', label: 'Proposed collective position' },
  { index: '04', label: 'Inspect / contest / revise', accent: true },
  { index: '05', label: 'Ratification', accent: true },
  { index: '06', label: 'Conditional commitment' },
  { index: '07', label: 'Collective market position', accent: true },
  { index: '08', label: 'Supplier response, if any' },
  { index: '09', label: 'Informed decision' },
  { index: '10', label: 'Compare with individual alternative' },
  { index: '11', label: 'Continue / redesign / stop / do not aggregate', final: true },
] as const;

export const failureCategories: FailureCategory[] = [
  { id: 'demand-formation', label: 'Demand formation', status: 'conceptual_preview', isDemo: true },
  { id: 'representation', label: 'Representation', status: 'conceptual_preview', isDemo: true },
  { id: 'ratification', label: 'Ratification', status: 'conceptual_preview', isDemo: true },
  { id: 'commitment', label: 'Commitment', status: 'conceptual_preview', isDemo: true },
  { id: 'exit', label: 'Exit', status: 'conceptual_preview', isDemo: true },
  { id: 'privacy', label: 'Privacy', status: 'conceptual_preview', isDemo: true },
  { id: 'supplier-entry', label: 'Supplier entry', status: 'conceptual_preview', isDemo: true },
  { id: 'competition', label: 'Competition', status: 'conceptual_preview', isDemo: true },
  { id: 'quality', label: 'Quality', status: 'conceptual_preview', isDemo: true },
  { id: 'measurement', label: 'Measurement', status: 'conceptual_preview', isDemo: true },
  { id: 'welfare', label: 'Welfare', status: 'conceptual_preview', isDemo: true },
  { id: 'external-validity', label: 'External validity', status: 'conceptual_preview', isDemo: true },
];
