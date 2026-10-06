export interface Discussion {
  id: string;
  type: 'Research question' | 'Counterexample' | 'Methodological objection';
  topic: string;
  body: string;
  status: 'conceptual_preview';
  isDemo: true;
}

export const discussions: Discussion[] = [
  {
    id: 'd-1',
    type: 'Research question',
    topic: 'Representation',
    body: 'If participants share a constraint but not a preference, what authority does the collective position have over individual decisions?',
    status: 'conceptual_preview',
    isDemo: true,
  },
  {
    id: 'd-2',
    type: 'Counterexample',
    topic: 'Exit',
    body: 'A participant may find that the individual alternative is strictly better after the collective position forms. The research must account for this without treating it as a failure.',
    status: 'conceptual_preview',
    isDemo: true,
  },
  {
    id: 'd-3',
    type: 'Methodological objection',
    topic: 'Commitment',
    body: 'Conditional commitment may be indistinguishable from expressed preference unless the conditions are independently verifiable and the commitment is time-bound.',
    status: 'conceptual_preview',
    isDemo: true,
  },
];
