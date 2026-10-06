export interface ActivityCategory {
  id: string;
  label: string;
  description: string;
  statusChip: string;
  status: 'conceptual_preview';
  isDemo: true;
}

export const activityCategories: ActivityCategory[] = [
  {
    id: 'research-notes',
    label: 'Research notes',
    description: 'Updates to conceptual frameworks and analytical positions.',
    statusChip: 'Conceptual preview',
    status: 'conceptual_preview',
    isDemo: true,
  },
  {
    id: 'method-updates',
    label: 'Method updates',
    description: 'Changes to research methodology, scope and evidence standards.',
    statusChip: 'Architecture in progress',
    status: 'conceptual_preview',
    isDemo: true,
  },
  {
    id: 'open-questions',
    label: 'Open questions',
    description: 'Active research questions that remain unresolved.',
    statusChip: 'Conceptual preview',
    status: 'conceptual_preview',
    isDemo: true,
  },
  {
    id: 'fieldwork-status',
    label: 'Fieldwork status',
    description: 'Status of the GOLIAF stress-test research environment.',
    statusChip: 'No live field claims',
    status: 'conceptual_preview',
    isDemo: true,
  },
  {
    id: 'publication-archive',
    label: 'Publication archive',
    description: 'Archive of released research notes and essays.',
    statusChip: 'Conceptual preview',
    status: 'conceptual_preview',
    isDemo: true,
  },
];
