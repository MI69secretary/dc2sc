import type { MediaPassport, ArgumentTableData, ScenarioStep } from '../../types/media-passport';
import type { ModuleCanvasManifest } from '../../types/canvas-manifest';

export interface CanvasData {
  manifest: ModuleCanvasManifest;
  hero: {
    headline: string;
    subheadline: string;
    passport: MediaPassport;
  };
  distinction: {
    choiceLabel: string;
    choiceText: string;
    voiceLabel: string;
    voiceText: string;
    scopeNote: string;
    passport: MediaPassport;
  };
  argumentTable: {
    data: {
      title: string;
      leftColumn: { header: string; items: string[] };
      rightColumn: { header: string; items: string[] };
      notes: string;
    };
    passport: MediaPassport;
  };
  journey: {
    title: string;
    label: string;
    boundaryNotice: string;
    steps: { step: string; label: string; detail: string }[];
    passport: MediaPassport;
  };
  overlapField: {
    title: string;
    tags: string[];
    caption1: string;
    caption2: string;
    passport: MediaPassport;
  };
  boundaryDisclosure: {
    title: string;
    text: string;
    passport: MediaPassport;
  };
  handoff: {
    question: string;
    targetModule: string;
    targetUrl: string;
    targetModuleNumber: string;
    passport: MediaPassport;
  };
}

export const module01CanvasManifest: ModuleCanvasManifest = {
  moduleId: 'module-01-more-choice-less-voice',
  moduleNumber: '01',
  title: 'More Choice, Less Voice',
  subtitle: 'Individual access to offers expands while the structural capacity to influence terms contracts.',
  authority: 'derived_noncanonical',
  canvasStatus: 'approved',
  visibility: 'public',
  indexable: true,
  includeInSitemap: true,
  includeInRss: false,
  canonicalRefs: ['module-01-more-choice-less-voice'],
  evidenceLevel: 'E0',
  limitations: [
    'Applies to buyer-side digital search environments; not an empirical description of all consumer transactions.',
    'Assumes no pre-existing collective bargaining institution on the demand side.'
  ],
  whatThisDoesNotEstablish: [
    'Does not establish that collective coordination is always preferable to individual market search.',
    'Does not demonstrate empirical supplier responses to aggregated demand positions.'
  ],
  propositions: [
    {
      id: 'M1-P01',
      statement: 'Choice is search among existing offers; voice is influence over the terms and structures of offers.',
      canonicalRefs: ['module-01-more-choice-less-voice'],
      kind: 'canon_restatement',
    },
    {
      id: 'M1-P02',
      statement: 'Individual decision journeys in search-driven markets isolate participants into unilateral price-taking paths.',
      canonicalRefs: ['module-01-more-choice-less-voice'],
      kind: 'canon_restatement',
    },
    {
      id: 'M1-P03',
      statement: 'Marketplace observation sees narrow transaction signals while participants carry complex household constraints.',
      canonicalRefs: ['module-01-more-choice-less-voice'],
      kind: 'canon_restatement',
    },
    {
      id: 'M1-P04',
      statement: 'Overlapping circumstances can exist without creating shared authority, representation or collective action.',
      canonicalRefs: ['module-01-more-choice-less-voice'],
      kind: 'canon_restatement',
    },
    {
      id: 'M1-P05',
      statement: 'Similarity of consumer constraints does not constitute authority to represent or aggregate.',
      canonicalRefs: ['module-01-more-choice-less-voice'],
      kind: 'canon_restatement',
    },
    {
      id: 'M1-P06',
      statement: 'Market isolation is identified as a research problem, not an empirical proof of collective superiority.',
      canonicalRefs: ['module-01-more-choice-less-voice'],
      kind: 'canon_restatement',
    },
    {
      id: 'M1-HANDOFF',
      statement: 'Distinguishing between uncoordinated attention and collective agency forms the bridge to Module 2.',
      canonicalRefs: ['module-01-more-choice-less-voice'],
      kind: 'interface_orientation',
    },
  ],
  sections: [
    {
      id: 'sec-hero',
      title: 'Signals and Isolation',
      sectionRole: 'hero_model',
      propositionIds: ['M1-P04'],
      mediaPassportIds: ['M01-FIG-01'],
    },
    {
      id: 'sec-distinction',
      title: 'Choice vs Voice',
      sectionRole: 'core_distinction',
      propositionIds: ['M1-P01'],
      mediaPassportIds: ['M01-DIST-01'],
    },
    {
      id: 'sec-contrast',
      title: 'Market vs Person',
      sectionRole: 'signal_contrast',
      propositionIds: ['M1-P03'],
      mediaPassportIds: ['M01-TAB-01'],
    },
    {
      id: 'sec-journey',
      title: 'Decision Journey',
      sectionRole: 'participant_journey',
      propositionIds: ['M1-P02'],
      mediaPassportIds: ['M01-SCEN-01'],
    },
    {
      id: 'sec-overlap',
      title: 'Similarity without Authority',
      sectionRole: 'principle_illustration',
      propositionIds: ['M1-P05'],
      mediaPassportIds: ['M01-FIG-02'],
    },
    {
      id: 'sec-boundary',
      title: 'Methodological Boundary',
      sectionRole: 'boundary_disclosure',
      propositionIds: ['M1-P06'],
      mediaPassportIds: ['M01-NOTE-01'],
    },
    {
      id: 'sec-handoff',
      title: 'Research Handoff',
      sectionRole: 'downstream_handoff',
      propositionIds: ['M1-HANDOFF'],
      mediaPassportIds: ['M01-HANDOFF-01'],
    },
  ],
  passports: {
    hero: {
      id: 'M01-FIG-01',
      title: 'Many signals, no shared voice',
      epistemicBasis: 'conceptual',
      representationRole: 'structural_model',
      provenanceMode: 'canonical_derived',
      artifactRole: 'diagram',
      authority: 'derived_noncanonical',
      evidenceLevel: 'E0',
      claimState: 'active',
      reviewStatus: 'reviewed',
      canonicalRefs: ['module-01-more-choice-less-voice'],
      altText: 'Abstract individual points follow different paths toward separate offer surfaces. Some points have overlapping markers, but they are not merged into a group.',
      accessibleEquiv: {
        summary: 'Diagram illustrating that independent participant searches route to siloed supplier offer surfaces without forming shared positions or demand-side representation.',
        textSequence: [
          'Independent participants formulate uncoordinated search queries across distinct sessions.',
          'Queries are routed directly to siloed, supplier-defined offer surfaces.',
          'Contextual overlap across participant constraints remains unrepresented and unaggregated.',
          'No collective agency or demand-side counter-proposal is formed.',
        ],
      },
      dataMethod: 'No empirical data. Conceptual illustration.',
      scopeLimit: 'This diagram does not claim that all markets work the same way or that people should coordinate.',
      caption: 'Overlapping circumstances can exist without creating shared authority, representation or collective action.',
      sourceReference: 'DC2SC Module 1 — More Choice, Less Voice',
      sourceVersion: '1.0',
      license: 'Original DC2SC visual',
    },
    distinction: {
      id: 'M01-DIST-01',
      title: 'Choice versus Voice Distinction',
      epistemicBasis: 'conceptual',
      representationRole: 'distinction_matrix',
      provenanceMode: 'canonical_derived',
      artifactRole: 'matrix',
      authority: 'derived_noncanonical',
      evidenceLevel: 'E0',
      claimState: 'active',
      reviewStatus: 'reviewed',
      canonicalRefs: ['module-01-more-choice-less-voice'],
      altText: 'A conceptual comparison contrasting Choice (search among existing fixed offers) with Voice (influence over how terms are formed).',
      accessibleEquiv: {
        summary: 'Conceptual distinction matrix contrasting Choice (unilateral price-taking selection among predetermined offers) with Voice (structural influence over offer formation, terms, and counter-proposals).',
        fallbackTable: {
          headers: ['Dimension', 'Choice', 'Voice'],
          rows: [
            ['Definition', 'Search among existing offers.', 'Influence over terms and structures of offers.'],
            ['Participant Role', 'Price-taker selecting among unilateral terms.', 'Originator or ratifier of collective term proposals.'],
            ['Market Impact', 'Signals aggregate into demand elasticity and price yield curves.', 'Position forms bounded commitments conditioning supplier response.'],
          ],
        },
      },
      dataMethod: 'No empirical data. Conceptual distinction.',
      scopeLimit: 'This distinction identifies a research problem. It does not imply that collective coordination is always preferable.',
      caption: 'Structural distinction between individual offer selection and participant influence over terms.',
      sourceReference: 'DC2SC Module 1 — More Choice, Less Voice',
      sourceVersion: '1.0',
      license: 'Original DC2SC visual',
    },
    argumentTable: {
      id: 'M01-TAB-01',
      title: 'What the market sees versus what the person carries',
      epistemicBasis: 'analytical',
      representationRole: 'argument_contrast',
      provenanceMode: 'canonical_derived',
      artifactRole: 'table',
      authority: 'derived_noncanonical',
      evidenceLevel: 'E0',
      claimState: 'active',
      reviewStatus: 'reviewed',
      canonicalRefs: ['module-01-more-choice-less-voice'],
      altText: 'Two columns contrasting marketplace observation (query, filter, click, basket, price, transaction) with human circumstances (time constraints, budget uncertainty, household coordination, risk tolerance, cancellation needs, comparison work).',
      accessibleEquiv: {
        summary: 'Contrast table comparing observable marketplace telemetry with unobserved participant constraints.',
        fallbackTable: {
          headers: ['What the market may see', 'What a person may carry'],
          rows: [
            ['query', 'time constraints'],
            ['filter', 'budget uncertainty'],
            ['click', 'household coordination'],
            ['basket', 'risk tolerance'],
            ['price', 'cancellation needs'],
            ['transaction', 'comparison work'],
          ],
        },
      },
      dataMethod: 'No empirical data. Qualitative conceptual analysis.',
      scopeLimit: 'The table does not claim that all markets see only these signals, or that an individual path is inadequate.',
      caption: 'A conceptual contrast between transaction-level signals and the wider conditions that can shape an individual decision.',
      sourceReference: 'DC2SC Module 1 — More Choice, Less Voice',
      sourceVersion: '1.0',
      license: 'Original DC2SC visual',
    },
    journey: {
      id: 'M01-SCEN-01',
      title: 'Individual Decision Map',
      epistemicBasis: 'analytical',
      representationRole: 'workflow_scenario',
      provenanceMode: 'canonical_derived',
      artifactRole: 'timeline',
      authority: 'derived_noncanonical',
      evidenceLevel: 'E0',
      claimState: 'active',
      reviewStatus: 'reviewed',
      canonicalRefs: ['module-01-more-choice-less-voice'],
      altText: 'Seven-stage linear timeline: Aspiration to Scenario to Constraints to Search to Comparison to Decision to Transaction.',
      accessibleEquiv: {
        summary: 'Seven-stage linear sequence representing the uncoordinated individual decision path in standard digital search environments.',
        textSequence: [
          '01 Aspiration: Initial intent prior to formal marketplace engagement',
          '02 Scenario: Contextual framing of desired outcomes',
          '03 Constraints: Time, budget, risk and non-compensable boundaries',
          '04 Search: Individual query generation across siloed platforms',
          '05 Comparison: Unassisted mental synthesis and trade-off evaluation',
          '06 Decision: Selection among pre-packaged options',
          '07 Transaction: Isolated bilateral execution with standard supplier terms',
        ],
      },
      dataMethod: 'Abstract structural workflow modeling. No empirical user metrics.',
      scopeLimit: 'Illustrative scenario. Not a real case or observed participant result. Participant journey is not a DC2SC constitutional mechanism.',
      caption: 'Illustrative decision map representing the uncoordinated participant path prior to collective formation.',
      sourceReference: 'DC2SC Research Model — Phase 1 Baseline',
      sourceVersion: '1.0',
      license: 'Original DC2SC visual',
    },
    overlapField: {
      id: 'M01-FIG-02',
      title: 'Overlap without authority field',
      epistemicBasis: 'conceptual',
      representationRole: 'structural_model',
      provenanceMode: 'canonical_derived',
      artifactRole: 'diagram',
      authority: 'derived_noncanonical',
      evidenceLevel: 'E0',
      claimState: 'active',
      reviewStatus: 'reviewed',
      canonicalRefs: ['module-01-more-choice-less-voice'],
      altText: 'Abstract field showing separate discrete participant units with shared constraint tags that remain unaggregated.',
      accessibleEquiv: {
        summary: 'Conceptual illustration demonstrating that multiple participants sharing constraint tags (timing, budget, risk, location) remain unaggregated without an explicit constitutional coordination mechanism.',
      },
      dataMethod: 'No empirical data. Conceptual illustration.',
      scopeLimit: 'Conceptual diagram. Does not imply an algorithm for automated aggregation.',
      caption: 'Overlapping conditions may be visible, but similarity does not constitute authority or collective mandate.',
      sourceReference: 'DC2SC Principle 1 — Similarity is not authority',
      sourceVersion: '1.0',
      license: 'Original DC2SC visual',
    },
    boundaryDisclosure: {
      id: 'M01-NOTE-01',
      title: 'Epistemic Scope and Non-Implication Boundary',
      epistemicBasis: 'methodological',
      representationRole: 'constitutional_boundary',
      provenanceMode: 'editorial_original',
      artifactRole: 'callout',
      authority: 'derived_noncanonical',
      evidenceLevel: 'E0',
      claimState: 'active',
      reviewStatus: 'reviewed',
      canonicalRefs: ['module-01-more-choice-less-voice'],
      altText: 'Methodological notice clarifying that market isolation is identified as a research problem, not an empirical proof of collective superiority.',
      dataMethod: 'Methodological specification.',
      scopeLimit: 'Applies to DC2SC conceptual architecture at Level E0.',
      caption: 'Explicit statement of what Module 1 claims and what it strictly refrains from establishing.',
      sourceReference: 'DC2SC Methodological Boundary Framework',
      sourceVersion: '1.0',
      license: 'Original DC2SC visual',
    },
    handoff: {
      id: 'M01-HANDOFF-01',
      title: 'Downstream Research Handoff',
      epistemicBasis: 'editorial_context',
      representationRole: 'research_handoff',
      provenanceMode: 'editorial_original',
      artifactRole: 'prompt',
      authority: 'derived_noncanonical',
      evidenceLevel: 'E0',
      claimState: 'active',
      reviewStatus: 'reviewed',
      canonicalRefs: ['module-01-more-choice-less-voice'],
      altText: 'Handoff question: If multiple people appear to share circumstances, what distinguishes mere attention from collective agency?',
      dataMethod: 'Research agenda bridge.',
      scopeLimit: 'Presents an open inquiry, not a conclusive finding.',
      caption: 'Foundational epistemic bridge connecting Module 1 isolation to Module 2 agency.',
      sourceReference: 'DC2SC Seven-Module Spine',
      sourceVersion: '1.0',
      license: 'Original DC2SC visual',
    },
  },
  downstreamHandoff: {
    question: 'If multiple people appear to share circumstances, what distinguishes mere attention from collective agency?',
    targetModuleId: 'module-02-crowd-is-attention',
    targetModuleTitle: 'Module 2 — A Crowd Is Attention. A Market Position Is Agency.',
    passportId: 'M01-HANDOFF-01',
  },
};

export const module01CanvasData: CanvasData = {
  manifest: module01CanvasManifest,
  hero: {
    headline: 'More choice. Less voice.',
    subheadline: 'Many individual signals, searches and paths move toward separate offer surfaces. Some conditions overlap, but no individual points are automatically joined into a group or represented to a supplier.',
    passport: module01CanvasManifest.passports.hero,
  },
  distinction: {
    choiceLabel: 'CHOICE',
    choiceText: 'Search among existing offers.',
    voiceLabel: 'VOICE',
    voiceText: 'Meaningful influence over the terms and structures through which offers are formed, compared and answered.',
    scopeNote: 'This distinction identifies a research problem. It does not imply that collective coordination is always preferable.',
    passport: module01CanvasManifest.passports.distinction,
  },
  argumentTable: {
    data: {
      title: 'What the market sees / what the person carries',
      leftColumn: {
        header: 'What the market may see',
        items: [
          'query',
          'filter',
          'click',
          'basket',
          'price',
          'transaction',
        ],
      },
      rightColumn: {
        header: 'What a person may carry',
        items: [
          'time constraints',
          'budget uncertainty',
          'household coordination',
          'risk tolerance',
          'cancellation needs',
          'comparison work',
        ],
      },
      notes: 'A conceptual contrast between transaction-level signals and the wider conditions that can shape an individual decision.',
    },
    passport: module01CanvasManifest.passports.argumentTable,
  },
  journey: {
    title: 'Individual Decision Journey',
    label: 'Illustrative decision map',
    boundaryNotice: 'Participant journey ≠ DC2SC constitutional mechanism.',
    steps: [
      { step: '01', label: 'Aspiration', detail: 'Initial intent or need prior to formal marketplace engagement' },
      { step: '02', label: 'Scenario', detail: 'Contextual framing of desired outcomes and constraints' },
      { step: '03', label: 'Constraints', detail: 'Time, budget, risk and non-compensable boundaries' },
      { step: '04', label: 'Search', detail: 'Individual query generation across siloed platforms' },
      { step: '05', label: 'Comparison', detail: 'Unassisted mental synthesis and trade-off evaluation' },
      { step: '06', label: 'Decision', detail: 'Selection among pre-packaged, non-negotiated options' },
      { step: '07', label: 'Transaction', detail: 'Isolated bilateral execution with standard supplier terms' },
    ],
    passport: module01CanvasManifest.passports.journey,
  },
  overlapField: {
    title: 'Overlap without authority field',
    tags: ['timing', 'budget range', 'risk', 'location', 'accessibility', 'flexibility'],
    caption1: 'Overlapping conditions may be visible. They do not create a shared position.',
    caption2: 'Similarity is not authority.',
    passport: module01CanvasManifest.passports.overlapField,
  },
  boundaryDisclosure: {
    title: 'Methodological Boundary and Epistemic Scope',
    text: 'This module identifies market isolation as a research problem. It does not establish that people should coordinate, that a collective position has formed, that supplier response will occur, or that any collective path is better than individual search.',
    passport: module01CanvasManifest.passports.boundaryDisclosure,
  },
  handoff: {
    question: 'If multiple people appear to share circumstances, what distinguishes mere attention from collective agency?',
    targetModule: 'Module 2 — A Crowd Is Attention. A Market Position Is Agency.',
    targetUrl: '/research/module-02-crowd-is-attention',
    targetModuleNumber: '02',
    passport: module01CanvasManifest.passports.handoff,
  },
};
