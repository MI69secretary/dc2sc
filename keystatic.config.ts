import { config, fields, collection, singleton, component } from '@keystatic/core';

// ─── Shared Enum Field Options (Strict Ontology Discipline) ────────────────

const epistemicBasisOptions = [
  { label: 'Conceptual', value: 'conceptual' },
  { label: 'Analytical', value: 'analytical' },
  { label: 'Empirical', value: 'empirical' },
  { label: 'Methodological', value: 'methodological' },
  { label: 'Editorial Context', value: 'editorial_context' },
];

const representationRoleOptions = [
  { label: 'Structural Model', value: 'structural_model' },
  { label: 'Distinction Matrix', value: 'distinction_matrix' },
  { label: 'Argument Contrast', value: 'argument_contrast' },
  { label: 'Workflow Scenario', value: 'workflow_scenario' },
  { label: 'Empirical Metric', value: 'empirical_metric' },
  { label: 'Literature Adaptation', value: 'literature_adaptation' },
  { label: 'Red Team Challenge', value: 'red_team_challenge' },
  { label: 'Failure Analysis', value: 'failure_analysis' },
  { label: 'Constitutional Boundary', value: 'constitutional_boundary' },
  { label: 'Reader Prompt', value: 'reader_prompt' },
  { label: 'Research Handoff', value: 'research_handoff' },
];

const provenanceModeOptions = [
  { label: 'Canonical Direct', value: 'canonical_direct' },
  { label: 'Canonical Derived', value: 'canonical_derived' },
  { label: 'Literature Adapted', value: 'literature_adapted' },
  { label: 'Data Derived', value: 'data_derived' },
  { label: 'Editorial Original', value: 'editorial_original' },
];

const artifactRoleOptions = [
  { label: 'Diagram', value: 'diagram' },
  { label: 'Table', value: 'table' },
  { label: 'Matrix', value: 'matrix' },
  { label: 'Timeline', value: 'timeline' },
  { label: 'Chart', value: 'chart' },
  { label: 'Callout', value: 'callout' },
  { label: 'Prompt', value: 'prompt' },
  { label: 'Image', value: 'image' },
];

const authorityOptions = [
  { label: 'Derived Non-Canonical (Standard Explanatory Visual)', value: 'derived_noncanonical' },
  { label: 'Canonical (Direct Literal Rendering of Frozen Spec)', value: 'canonical' },
  { label: 'Historical Contrast (Superseded/Rejected Claim)', value: 'historical_contrast' },
];

const evidenceLevelOptions = [
  { label: 'E0 — Conceptual Horizon', value: 'E0' },
  { label: 'E1 — Theoretical / Analytical Support', value: 'E1' },
  { label: 'E2 — Internal Observation', value: 'E2' },
  { label: 'E3 — External Empirical Evidence', value: 'E3' },
  { label: 'E4 — Preregistered Field Evidence', value: 'E4' },
  { label: 'E5 — Replicated Multi-Site Evidence', value: 'E5' },
];

const canonicalStateOptions = [
  { label: 'None', value: 'none' },
  { label: 'Provisional', value: 'provisional' },
  { label: 'Working', value: 'working' },
  { label: 'Frozen (Protected Canon)', value: 'frozen' },
  { label: 'Superseded', value: 'superseded' },
];

const claimStateOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Provisional', value: 'provisional' },
  { label: 'Superseded', value: 'superseded' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Quarantined', value: 'quarantined' },
];

const visibilityOptions = [
  { label: 'Internal (Non-Routable)', value: 'internal' },
  { label: 'Unlisted', value: 'unlisted' },
  { label: 'Public Preview', value: 'public_preview' },
  { label: 'Public', value: 'public' },
];

const lifecycleStatusOptions = [
  { label: 'Concept', value: 'concept' },
  { label: 'Conceptual Preview', value: 'conceptual_preview' },
  { label: 'Draft', value: 'draft' },
  { label: 'In Review', value: 'in_review' },
  { label: 'Approved for Dev', value: 'approved_for_dev' },
  { label: 'Published', value: 'published' },
  { label: 'Paused (Quarantined)', value: 'paused' },
  { label: 'Archived', value: 'archived' },
];

const contentKindOptions = [
  { label: 'Canonical Reference', value: 'canonical_reference' },
  { label: 'Canonical Module', value: 'canonical_module' },
  { label: 'Research Specification', value: 'research_spec' },
  { label: 'Editorial Preview', value: 'editorial_preview' },
  { label: 'Editorial Article', value: 'editorial_article' },
  { label: 'GOLIAF Artifact', value: 'goliaf_artifact' },
  { label: 'Announcement', value: 'announcement' },
  { label: 'Demo Discussion', value: 'demo_discussion' },
];

const publicationAuthorityOptions = [
  { label: 'None (Default / Safe)', value: 'none' },
  { label: 'Internal Review', value: 'internal_review' },
  { label: 'Release Approved', value: 'release_approved' },
  { label: 'Canonical Seal', value: 'canonical_seal' },
];

const researchRoleOptions = [
  { label: 'Analytical Framework', value: 'analytical_framework' },
  { label: 'Stress Test Protocol', value: 'stress_test_protocol' },
  { label: 'Concept', value: 'concept' },
  { label: 'Hypothesis', value: 'hypothesis' },
  { label: 'Empirical Result', value: 'empirical_result' },
  { label: 'None', value: 'none' },
];

// ─── Markdoc Typed Media Block Components ───────────────────────────────────

const markdocComponents = {
  callout: component({
    kind: 'block',
    label: 'Boundary / Callout Notice',
    schema: {
      title: fields.text({ label: 'Title' }),
      type: fields.select({
        label: 'Type',
        options: [
          { label: 'Boundary Notice', value: 'boundary' },
          { label: 'Warning', value: 'warning' },
          { label: 'Default', value: 'default' },
        ],
        defaultValue: 'boundary',
      }),
    },
  }),
  diagram: component({
    kind: 'block',
    label: 'Diagram / Media Passport Container',
    schema: {
      mediaId: fields.text({ label: 'Media ID (e.g. M01-FIG-01)' }),
      caption: fields.text({ label: 'Caption' }),
      altText: fields.text({ label: 'Accessible Description / Alt Text', multiline: true }),
      authority: fields.select({
        label: 'Authority',
        options: authorityOptions,
        defaultValue: 'derived_noncanonical',
      }),
      epistemicBasis: fields.select({
        label: 'Epistemic Basis',
        options: epistemicBasisOptions,
        defaultValue: 'conceptual',
      }),
    },
  }),
  tableMatrix: component({
    kind: 'block',
    label: 'Structured Table / Matrix Container',
    schema: {
      tableId: fields.text({ label: 'Table ID (e.g. M01-TAB-01)' }),
      title: fields.text({ label: 'Table Title' }),
      kind: fields.select({
        label: 'Kind',
        options: [
          { label: 'Argument Table', value: 'argument_table' },
          { label: 'Tension Matrix', value: 'tension_matrix' },
          { label: 'Comparison Matrix', value: 'comparison_matrix' },
          { label: 'Data Table', value: 'data_table' },
        ],
        defaultValue: 'argument_table',
      }),
      caption: fields.text({ label: 'Caption' }),
    },
  }),
  chartContainer: component({
    kind: 'block',
    label: 'Data Chart Container',
    schema: {
      chartId: fields.text({ label: 'Chart ID (e.g. CHART-0001)' }),
      title: fields.text({ label: 'Chart Title' }),
      dataSource: fields.text({ label: 'Data Source Description' }),
      evidenceLevel: fields.select({
        label: 'Evidence Level',
        options: evidenceLevelOptions,
        defaultValue: 'E0',
      }),
    },
  }),
  researchHandoff: component({
    kind: 'block',
    label: 'Research Handoff Block',
    schema: {
      targetModule: fields.text({ label: 'Target Module (e.g. Module 02)' }),
      targetUrl: fields.text({ label: 'Target URL' }),
      handoffQuestion: fields.text({ label: 'Leading Research Question', multiline: true }),
    },
  }),
};

// ─── Research Schema Factory (Single Canonical Truth) ──────────────────────

function createResearchSchema(defaultKind: 'canonical_reference' | 'canonical_module' | 'research_spec', defaultCanonicalState: 'frozen' | 'working' | 'provisional') {
  return {
    slug: fields.slug({ name: { label: 'Slug' } }),
    title: fields.text({ label: 'Document Title' }),
    moduleNumber: fields.number({ label: 'Module Number (Optional)' }),
    contentKind: fields.select({
      label: 'Content Kind',
      options: contentKindOptions,
      defaultValue: defaultKind,
    }),
    canonicalState: fields.select({
      label: 'Canonical State (FROZEN CANON PROTECTION)',
      description: 'Frozen specifications require formal Git audit to modify.',
      options: canonicalStateOptions,
      defaultValue: defaultCanonicalState,
    }),
    claimState: fields.select({ label: 'Claim State', options: claimStateOptions, defaultValue: 'active' }),
    researchRole: fields.select({
      label: 'Research Role',
      options: researchRoleOptions,
      defaultValue: 'analytical_framework',
    }),
    evidenceLevel: fields.select({ label: 'Evidence Level', options: evidenceLevelOptions, defaultValue: 'E0' }),
    visibility: fields.select({ label: 'Visibility', options: visibilityOptions, defaultValue: 'public' }),
    lifecycleStatus: fields.select({ label: 'Lifecycle Status', options: lifecycleStatusOptions, defaultValue: 'approved_for_dev' }),
    claimStatus: fields.text({ label: 'Claim Status', defaultValue: 'CONCEPT — canonical architecture' }),
    scope: fields.text({ label: 'Epistemic Scope', multiline: true }),
    limitations: fields.array(fields.text({ label: 'Limitation' }), { label: 'Limitations', itemLabel: props => props.value }),
    whatThisDoesNotEstablish: fields.array(fields.text({ label: 'Boundary' }), { label: 'What This Does Not Establish', itemLabel: props => props.value }),
    dependencies: fields.array(fields.text({ label: 'Dependency' }), { label: 'Dependencies', itemLabel: props => props.value }),
    upstreamDependencies: fields.array(fields.text({ label: 'Upstream Dependency' }), { label: 'Upstream Dependencies' }),
    downstreamHandoff: fields.text({ label: 'Downstream Handoff' }),
    relatedArtifacts: fields.array(fields.text({ label: 'Related Artifact' }), { label: 'Related Artifacts' }),
    researchQuestions: fields.array(fields.text({ label: 'Research Question' }), { label: 'Research Questions' }),
    hypotheses: fields.array(fields.text({ label: 'Hypothesis' }), { label: 'Hypotheses' }),
    failureRecords: fields.array(fields.text({ label: 'Failure Record' }), { label: 'Failure Records' }),
    sourceOfTruth: fields.text({ label: 'Source of Truth Repository Reference', defaultValue: 'DC2SC research repository' }),
    sourceArtifactId: fields.text({ label: 'Source Artifact ID' }),
    sourceArtifactTitle: fields.text({ label: 'Source Artifact Title' }),
    sourceVersion: fields.text({ label: 'Source Version' }),
    sourceCanonicalState: fields.select({ label: 'Source Canonical State', options: canonicalStateOptions, defaultValue: 'none' }),
    sourceEvidenceLevel: fields.select({ label: 'Source Evidence Level', options: evidenceLevelOptions, defaultValue: 'E0' }),
    provenanceType: fields.select({
      label: 'Provenance Type',
      options: [
        { label: 'Canonical Import', value: 'canonical_import' },
        { label: 'Adapted Repository Import', value: 'adapted_repository_import' },
        { label: 'Reference Summary', value: 'reference_summary' },
      ],
      defaultValue: 'canonical_import',
    }),
    webAdaptationNotes: fields.text({ label: 'Web Adaptation Notes', multiline: true }),
    lastSourceReview: fields.text({ label: 'Last Source Review' }),
    importScope: fields.text({ label: 'Import Scope' }),
    sourceStatus: fields.text({ label: 'Source Status' }),
    sourcePath: fields.text({ label: 'Source Path' }),
    isDemo: fields.checkbox({ label: 'Is Demo', defaultValue: false }),
    indexable: fields.checkbox({ label: 'Indexable', defaultValue: true }),
    includeInSitemap: fields.checkbox({ label: 'Include In Sitemap', defaultValue: true }),
    includeInRss: fields.checkbox({ label: 'Include In RSS', defaultValue: false }),
    content: fields.markdoc({ label: 'Document Content', extension: 'md', components: markdocComponents }),
  };
}

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'DC2SC Editorial Control Plane' },
    navigation: {
      'Site & Principles': [
        'site-config',
        'core-principles',
        'formation-model',
      ],
      'Canon & Research': [
        'canonical-reference',
        'canonical-modules',
        'research-specifications',
        'research-proposals',
        'hypotheses',
        'failure-conditions',
        'evidence-methods',
      ],
      'GOLIAF (Travel Stress-Test)': [
        'goliaf-artifacts',
        'goliaf-protocols',
      ],
      'Editorial Lab': [
        'journal-essays',
        'announcements',
        'editorial-briefs',
        'editorial-reviews',
        'editorial-calendar',
      ],
      'Media Lab': [
        'media-objects',
        'canvas-manifests',
        'tables-matrices',
        'chart-configurations',
      ],
      'Library & Sources': [
        'source-documents',
        'authors',
        'datasets',
        'citations',
      ],
      'Distribution & Relations': [
        'external-editions',
        'curated-discussions',
        'curated-signals',
      ],
    },
  },
  singletons: {
    'site-config': singleton({
      label: 'Site Global Configuration',
      path: 'src/data/site-config',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Site Name' }),
        descriptor: fields.text({ label: 'Descriptor' }),
        premisePart1: fields.text({ label: 'Core Premise Part 1' }),
        premisePart2: fields.text({ label: 'Core Premise Part 2' }),
        description: fields.text({ label: 'Site Description', multiline: true }),
        goliafDescriptor: fields.text({ label: 'GOLIAF Descriptor' }),
        disclosure: fields.text({ label: 'Footer Constitutional Disclosure', multiline: true }),
        phase: fields.integer({ label: 'Phase Number' }),
        isProduction: fields.checkbox({ label: 'Is Production', defaultValue: false }),
      },
    }),
    'core-principles': singleton({
      label: 'Six Constitutional Principles',
      path: 'src/data/core-principles',
      format: { data: 'json' },
      schema: {
        principles: fields.array(
          fields.object({
            number: fields.number({ label: 'Principle Number' }),
            title: fields.text({ label: 'Title' }),
            explanation: fields.text({ label: 'Explanation', multiline: true }),
          }),
          { label: 'Principles', itemLabel: props => `${props.fields.number.value}: ${props.fields.title.value}` }
        ),
      },
    }),
    'formation-model': singleton({
      label: 'Formation Model (11 Steps)',
      path: 'src/data/formation-model',
      format: { data: 'json' },
      schema: {
        steps: fields.array(
          fields.object({
            index: fields.text({ label: 'Step Index (e.g. 01)' }),
            label: fields.text({ label: 'Step Label' }),
            accent: fields.checkbox({ label: 'Accent Highlight', defaultValue: false }),
            final: fields.checkbox({ label: 'Final Step', defaultValue: false }),
          }),
          { label: 'Model Steps', itemLabel: props => `${props.fields.index.value} — ${props.fields.label.value}` }
        ),
      },
    }),
  },
  collections: {
    // ─── Canon & Research (Physical Segregated Taxonomies) ──────────────────

    'canonical-reference': collection({
      label: 'Canonical Reference Body (2 items)',
      slugField: 'slug',
      path: 'src/content/research/canon/*',
      format: { contentField: 'content' },
      schema: createResearchSchema('canonical_reference', 'frozen'),
    }),

    'canonical-modules': collection({
      label: 'Canonical Modules 01–07 (7 items)',
      slugField: 'slug',
      path: 'src/content/research/modules/*',
      format: { contentField: 'content' },
      schema: createResearchSchema('canonical_module', 'frozen'),
    }),

    'research-specifications': collection({
      label: 'Research Specifications (3 items)',
      slugField: 'slug',
      path: 'src/content/research/specifications/*',
      format: { contentField: 'content' },
      schema: createResearchSchema('research_spec', 'working'),
    }),

    'research-proposals': collection({
      label: 'Successor Revision Proposals (Working/Provisional)',
      slugField: 'slug',
      path: 'src/content/research-proposals/*',
      format: { contentField: 'content' },
      schema: {
        slug: fields.slug({ name: { label: 'Slug' } }),
        title: fields.text({ label: 'Proposal Title' }),
        targetArtifactId: fields.text({ label: 'Target Canonical Artifact ID' }),
        supersedes: fields.array(fields.text({ label: 'Superseded Artifact ID' }), { label: 'Superseded Artifacts (Required)' }),
        canonicalState: fields.select({
          label: 'Canonical State (Working/Provisional)',
          options: [
            { label: 'Working', value: 'working' },
            { label: 'Provisional', value: 'provisional' },
          ],
          defaultValue: 'working',
        }),
        claimState: fields.select({ label: 'Claim State', options: claimStateOptions, defaultValue: 'provisional' }),
        evidenceLevel: fields.select({ label: 'Evidence Level', options: evidenceLevelOptions, defaultValue: 'E0' }),
        visibility: fields.select({
          label: 'Visibility',
          options: [{ label: 'Internal Only', value: 'internal' }],
          defaultValue: 'internal',
        }),
        rationale: fields.text({ label: 'Revision Rationale', multiline: true }),
        content: fields.markdoc({ label: 'Proposed Specification Body', extension: 'md', components: markdocComponents }),
      },
    }),

    hypotheses: collection({
      label: 'Hypotheses Registry',
      slugField: 'hypothesisId',
      path: 'src/data/hypotheses/*',
      format: { data: 'json' },
      schema: {
        hypothesisId: fields.slug({ name: { label: 'Hypothesis ID (e.g. HYP-001)' } }),
        title: fields.text({ label: 'Short Title' }),
        statement: fields.text({ label: 'Formal Statement', multiline: true }),
        status: fields.select({
          label: 'Status',
          options: [{ label: 'Active', value: 'active' }, { label: 'Tested', value: 'tested' }, { label: 'Rejected', value: 'rejected' }],
          defaultValue: 'active',
        }),
        evidenceLevel: fields.select({ label: 'Evidence Level', options: evidenceLevelOptions, defaultValue: 'E0' }),
        relatedModules: fields.array(fields.number({ label: 'Module Number' }), { label: 'Related Modules' }),
        relatedCanvas: fields.text({ label: 'Related Canvas' }),
        isFixture: fields.checkbox({ label: 'Is Fixture', defaultValue: false }),
        fixturePurpose: fields.text({ label: 'Fixture Purpose' }),
        visibility: fields.select({ label: 'Visibility', options: visibilityOptions, defaultValue: 'internal' }),
        indexable: fields.checkbox({ label: 'Indexable', defaultValue: false }),
        includeInSitemap: fields.checkbox({ label: 'Include in Sitemap', defaultValue: false }),
        includeInRss: fields.checkbox({ label: 'Include in RSS', defaultValue: false }),
        publicationAuthority: fields.select({ label: 'Publication Authority', options: publicationAuthorityOptions, defaultValue: 'none' }),
      },
    }),

    'failure-conditions': collection({
      label: 'Failure Conditions Registry',
      slugField: 'failureId',
      path: 'src/data/failure-conditions/*',
      format: { data: 'json' },
      schema: {
        failureId: fields.slug({ name: { label: 'Failure ID (e.g. FAIL-01)' } }),
        name: fields.text({ label: 'Failure Category Name' }),
        category: fields.text({ label: 'Category' }),
        description: fields.text({ label: 'Description', multiline: true }),
        status: fields.select({
          label: 'Tracking Status',
          options: [{ label: 'Monitored', value: 'monitored' }, { label: 'Observed', value: 'observed' }, { label: 'Theoretical', value: 'theoretical' }],
          defaultValue: 'monitored',
        }),
        relatedModules: fields.array(fields.number({ label: 'Module Number' }), { label: 'Related Modules' }),
        relatedCanvas: fields.text({ label: 'Related Canvas' }),
        isFixture: fields.checkbox({ label: 'Is Fixture', defaultValue: false }),
        fixturePurpose: fields.text({ label: 'Fixture Purpose' }),
        visibility: fields.select({ label: 'Visibility', options: visibilityOptions, defaultValue: 'internal' }),
        indexable: fields.checkbox({ label: 'Indexable', defaultValue: false }),
        includeInSitemap: fields.checkbox({ label: 'Include in Sitemap', defaultValue: false }),
        includeInRss: fields.checkbox({ label: 'Include in RSS', defaultValue: false }),
        publicationAuthority: fields.select({ label: 'Publication Authority', options: publicationAuthorityOptions, defaultValue: 'none' }),
      },
    }),

    'evidence-methods': collection({
      label: 'Evidence & Methods',
      slugField: 'methodId',
      path: 'src/data/evidence-methods/*',
      format: { data: 'json' },
      schema: {
        methodId: fields.slug({ name: { label: 'Method ID (e.g. METH-E0)' } }),
        name: fields.text({ label: 'Method Name' }),
        description: fields.text({ label: 'Description', multiline: true }),
        status: fields.select({
          label: 'Status',
          options: [{ label: 'Active', value: 'active' }, { label: 'Proposed', value: 'proposed' }],
          defaultValue: 'active',
        }),
        isFixture: fields.checkbox({ label: 'Is Fixture', defaultValue: false }),
        fixturePurpose: fields.text({ label: 'Fixture Purpose' }),
        visibility: fields.select({ label: 'Visibility', options: visibilityOptions, defaultValue: 'internal' }),
        indexable: fields.checkbox({ label: 'Indexable', defaultValue: false }),
        includeInSitemap: fields.checkbox({ label: 'Include in Sitemap', defaultValue: false }),
        includeInRss: fields.checkbox({ label: 'Include in RSS', defaultValue: false }),
        publicationAuthority: fields.select({ label: 'Publication Authority', options: publicationAuthorityOptions, defaultValue: 'none' }),
      },
    }),

    // ─── GOLIAF (Travel Stress-Test) ────────────────────────────────────────

    'goliaf-artifacts': collection({
      label: 'GOLIAF Research Artifacts',
      slugField: 'slug',
      path: 'src/content/goliaf/*',
      format: { contentField: 'content' },
      schema: {
        slug: fields.slug({ name: { label: 'Slug' } }),
        title: fields.text({ label: 'Artifact Title' }),
        contentKind: fields.select({
          label: 'Content Kind',
          options: contentKindOptions,
          defaultValue: 'goliaf_artifact',
        }),
        artifactType: fields.select({
          label: 'Artifact Type',
          options: [
            { label: 'Research Note', value: 'research_note' },
            { label: 'Decision Map', value: 'decision_map' },
            { label: 'Constraint Matrix', value: 'constraint_matrix' },
            { label: 'Method Note', value: 'method_note' },
            { label: 'Failure Case', value: 'failure_case' },
            { label: 'Conceptual Model', value: 'conceptual_model' },
          ],
          defaultValue: 'research_note',
        }),
        goliafBoundary: fields.text({
          label: 'GOLIAF Constitutional Boundary Notice',
          defaultValue: 'Bounded travel stress-test environment. Participant journey ≠ DC2SC constitutional mechanism.',
        }),
        evidenceLevel: fields.select({ label: 'Evidence Level', options: evidenceLevelOptions, defaultValue: 'E0' }),
        canonicalState: fields.select({ label: 'Canonical State', options: canonicalStateOptions, defaultValue: 'working' }),
        claimState: fields.select({ label: 'Claim State', options: claimStateOptions, defaultValue: 'active' }),
        researchRole: fields.select({ label: 'Research Role', options: researchRoleOptions, defaultValue: 'stress_test_protocol' }),
        visibility: fields.select({ label: 'Visibility', options: visibilityOptions, defaultValue: 'public' }),
        lifecycleStatus: fields.select({ label: 'Lifecycle Status', options: lifecycleStatusOptions, defaultValue: 'approved_for_dev' }),
        claimStatus: fields.text({ label: 'Claim Status', defaultValue: 'CONCEPT — GOLIAF stress-test' }),
        scope: fields.text({ label: 'Epistemic Scope', multiline: true }),
        limitations: fields.array(fields.text({ label: 'Limitation' }), { label: 'Limitations' }),
        relatedModules: fields.array(fields.number({ label: 'Related Module Number' }), { label: 'Related Modules' }),
        relatedArtifacts: fields.array(fields.text({ label: 'Related Artifact' }), { label: 'Related Artifacts' }),
        dependencies: fields.array(fields.text({ label: 'Dependency' })),
        upstreamDependencies: fields.array(fields.text({ label: 'Upstream Dependency' })),
        downstreamHandoff: fields.text({ label: 'Downstream Handoff' }),
        sourceOfTruth: fields.text({ label: 'Source of Truth', defaultValue: 'DC2SC research repository' }),
        sourceArtifactId: fields.text({ label: 'Source Artifact ID' }),
        sourceArtifactTitle: fields.text({ label: 'Source Artifact Title' }),
        sourceVersion: fields.text({ label: 'Source Version' }),
        sourceCanonicalState: fields.select({ label: 'Source Canonical State', options: canonicalStateOptions, defaultValue: 'none' }),
        sourceEvidenceLevel: fields.select({ label: 'Source Evidence Level', options: evidenceLevelOptions, defaultValue: 'E0' }),
        provenanceType: fields.select({
          label: 'Provenance Type',
          options: [
            { label: 'Canonical Import', value: 'canonical_import' },
            { label: 'Adapted Repository Import', value: 'adapted_repository_import' },
            { label: 'Reference Summary', value: 'reference_summary' },
          ],
          defaultValue: 'canonical_import',
        }),
        webAdaptationNotes: fields.text({ label: 'Web Adaptation Notes', multiline: true }),
        lastSourceReview: fields.text({ label: 'Last Source Review' }),
        importScope: fields.text({ label: 'Import Scope' }),
        sourceStatus: fields.text({ label: 'Source Status' }),
        sourcePath: fields.text({ label: 'Source Path' }),
        isDemo: fields.checkbox({ label: 'Is Demo', defaultValue: false }),
        indexable: fields.checkbox({ label: 'Indexable', defaultValue: true }),
        includeInSitemap: fields.checkbox({ label: 'Include In Sitemap', defaultValue: true }),
        includeInRss: fields.checkbox({ label: 'Include In RSS', defaultValue: false }),
        content: fields.markdoc({ label: 'Artifact Content', extension: 'md', components: markdocComponents }),
      },
    }),

    'goliaf-protocols': collection({
      label: 'GOLIAF Protocols',
      slugField: 'protocolId',
      path: 'src/data/goliaf-protocols/*',
      format: { data: 'json' },
      schema: {
        protocolId: fields.slug({ name: { label: 'Protocol ID (e.g. PROT-GOLIAF-01)' } }),
        name: fields.text({ label: 'Protocol Name' }),
        scope: fields.text({ label: 'Protocol Scope' }),
        status: fields.select({
          label: 'Status',
          options: [{ label: 'Draft', value: 'draft' }, { label: 'Reviewed', value: 'reviewed' }],
          defaultValue: 'draft',
        }),
        boundaryNotice: fields.text({ label: 'Boundary Notice' }),
        isFixture: fields.checkbox({ label: 'Is Fixture', defaultValue: false }),
        fixturePurpose: fields.text({ label: 'Fixture Purpose' }),
        visibility: fields.select({ label: 'Visibility', options: visibilityOptions, defaultValue: 'internal' }),
        indexable: fields.checkbox({ label: 'Indexable', defaultValue: false }),
        includeInSitemap: fields.checkbox({ label: 'Include in Sitemap', defaultValue: false }),
        includeInRss: fields.checkbox({ label: 'Include in RSS', defaultValue: false }),
        publicationAuthority: fields.select({ label: 'Publication Authority', options: publicationAuthorityOptions, defaultValue: 'none' }),
      },
    }),

    // ─── Editorial Lab ──────────────────────────────────────────────────────

    'journal-essays': collection({
      label: 'Journal Essays (Paused Quarantine)',
      slugField: 'slug',
      path: 'src/content/journal/*',
      format: { contentField: 'content' },
      schema: {
        slug: fields.slug({ name: { label: 'Slug' } }),
        title: fields.text({ label: 'Essay Title' }),
        dek: fields.text({ label: 'Subtitle / Dek' }),
        lifecycleStatus: fields.select({
          label: 'Lifecycle Status (Quarantine Guard)',
          options: lifecycleStatusOptions,
          defaultValue: 'paused',
        }),
        contentKind: fields.select({ label: 'Content Kind', options: contentKindOptions, defaultValue: 'editorial_preview' }),
        canonicalState: fields.select({ label: 'Canonical State', options: canonicalStateOptions, defaultValue: 'none' }),
        claimState: fields.select({ label: 'Claim State', options: claimStateOptions, defaultValue: 'active' }),
        researchRole: fields.select({ label: 'Research Role', options: researchRoleOptions, defaultValue: 'concept' }),
        visibility: fields.select({ label: 'Visibility', options: visibilityOptions, defaultValue: 'internal' }),
        indexable: fields.checkbox({ label: 'Indexable in Search', defaultValue: false }),
        includeInSitemap: fields.checkbox({ label: 'Include in Sitemap', defaultValue: false }),
        includeInRss: fields.checkbox({ label: 'Include in RSS', defaultValue: false }),
        claimLevel: fields.text({ label: 'Claim Level', defaultValue: 'CONCEPT' }),
        evidenceLevel: fields.select({ label: 'Evidence Level', options: evidenceLevelOptions, defaultValue: 'E0' }),
        canonicalModules: fields.array(fields.number({ label: 'Canonical Module' }), { label: 'Canonical Modules' }),
        topics: fields.array(fields.text({ label: 'Topic' }), { label: 'Topics' }),
        researchQuestions: fields.array(fields.text({ label: 'Research Question' }), { label: 'Research Questions' }),
        hypotheses: fields.array(fields.text({ label: 'Hypothesis' }), { label: 'Hypotheses' }),
        failureConditions: fields.array(fields.text({ label: 'Failure Condition' }), { label: 'Failure Conditions' }),
        rightsDependencies: fields.array(fields.text({ label: 'Rights Dependency' }), { label: 'Rights Dependencies' }),
        outsideOptionDependency: fields.checkbox({ label: 'Outside Option Dependency', defaultValue: false }),
        representationDependency: fields.checkbox({ label: 'Representation Dependency', defaultValue: false }),
        goliafBoundary: fields.text({ label: 'GOLIAF Boundary' }),
        whatThisDoesNotClaim: fields.array(fields.text({ label: 'Boundary' }), { label: 'What This Does Not Claim' }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        heroVariant: fields.select({
          label: 'Hero Variant',
          options: [
            { label: 'Signal', value: 'signal' },
            { label: 'Diagram', value: 'diagram' },
            { label: 'Editorial', value: 'editorial' },
            { label: 'Map', value: 'map' },
          ],
          defaultValue: 'signal',
        }),
        isDemo: fields.checkbox({ label: 'Is Demo', defaultValue: true }),
        content: fields.markdoc({ label: 'Essay Prose', extension: 'md', components: markdocComponents }),
      },
    }),

    announcements: collection({
      label: 'Announcements & Activity Notes',
      slugField: 'slug',
      path: 'src/content/announcements/*',
      format: { contentField: 'content' },
      schema: {
        slug: fields.slug({ name: { label: 'Slug' } }),
        title: fields.text({ label: 'Title' }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'Research Note', value: 'research_note' },
            { label: 'Method Update', value: 'method_update' },
            { label: 'Open Question', value: 'open_question' },
            { label: 'Fieldwork Status', value: 'fieldwork_status' },
            { label: 'Publication', value: 'publication' },
          ],
          defaultValue: 'research_note',
        }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        status: fields.select({ label: 'Status', options: lifecycleStatusOptions, defaultValue: 'conceptual_preview' }),
        isDemo: fields.checkbox({ label: 'Is Demo', defaultValue: true }),
        content: fields.markdoc({ label: 'Details', extension: 'md', components: markdocComponents }),
      },
    }),

    'editorial-briefs': collection({
      label: 'Editorial Derivation Briefs',
      slugField: 'briefId',
      path: 'src/data/briefs/*',
      format: { data: 'json' },
      schema: {
        briefId: fields.slug({ name: { label: 'Brief ID (e.g. BRIEF-M01)' } }),
        targetArtifactId: fields.text({ label: 'Target Artifact ID' }),
        targetModule: fields.text({ label: 'Target Module' }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Planned', value: 'planned' },
            { label: 'Drafting', value: 'drafting' },
            { label: 'Review', value: 'review' },
            { label: 'Approved', value: 'approved' },
            { label: 'Rejected', value: 'rejected' },
          ],
          defaultValue: 'planned',
        }),
        lifecycleStatus: fields.select({ label: 'Lifecycle Status', options: lifecycleStatusOptions, defaultValue: 'draft' }),
        primaryReader: fields.text({ label: 'Primary Reader' }),
        readerProblem: fields.text({ label: 'Reader Problem', multiline: true }),
        canonicalDependencies: fields.array(fields.text({ label: 'Canonical Ref' }), { label: 'Canonical Dependencies' }),
        sourceCorpus: fields.array(fields.text({ label: 'Source Ref' }), { label: 'Source Corpus' }),
        propositionLedger: fields.array(
          fields.object({
            id: fields.text({ label: 'Proposition ID' }),
            statement: fields.text({ label: 'Statement', multiline: true }),
            canonicalRef: fields.text({ label: 'Canonical Ref' }),
            kind: fields.text({ label: 'Kind' }),
          }),
          { label: 'Proposition Ledger', itemLabel: props => `${props.fields.id.value}: ${props.fields.statement.value}` }
        ),
        claimBoundary: fields.text({ label: 'Claim Boundary' }),
        evidenceBoundary: fields.text({ label: 'Evidence Boundary' }),
        handoff: fields.text({ label: 'Handoff Question' }),
        forbiddenInterpretations: fields.array(fields.text({ label: 'Forbidden Interpretation' }), { label: 'Forbidden Interpretations' }),
        prohibitedInterpretations: fields.array(fields.text({ label: 'Prohibited Interpretation' }), { label: 'Prohibited Interpretations' }),
        legacyFragmentsAllowedAsIllustrations: fields.array(fields.text({ label: 'Legacy Fragment' }), { label: 'Allowed Legacy Fragments' }),
        requiredMediaPassportObjects: fields.array(fields.text({ label: 'Media Passport' }), { label: 'Required Media Passports' }),
        mediaPlan: fields.array(fields.text({ label: 'Media Item' }), { label: 'Media Plan' }),
        counterargumentTracking: fields.array(fields.text({ label: 'Counterargument' }), { label: 'Counterarguments' }),
        failureConditionsTracked: fields.array(fields.text({ label: 'Failure Condition' }), { label: 'Failure Conditions Tracked' }),
        rightsDependencies: fields.array(fields.text({ label: 'Rights Dependency' })),
        representationDependencies: fields.array(fields.text({ label: 'Representation Dependency' })),
        outsideOptionDependencies: fields.array(fields.text({ label: 'Outside Option Dependency' })),
        outsideOptionDependency: fields.checkbox({ label: 'Outside Option Dependency', defaultValue: false }),
        representationDependency: fields.checkbox({ label: 'Representation Dependency', defaultValue: false }),
        visibility: fields.select({
          label: 'Visibility',
          options: [{ label: 'Internal Only', value: 'internal' }],
          defaultValue: 'internal',
        }),
        isFixture: fields.checkbox({ label: 'Is Fixture', defaultValue: false }),
        fixturePurpose: fields.text({ label: 'Fixture Purpose' }),
        indexable: fields.checkbox({ label: 'Indexable', defaultValue: false }),
        includeInSitemap: fields.checkbox({ label: 'Include in Sitemap', defaultValue: false }),
        includeInRss: fields.checkbox({ label: 'Include in RSS', defaultValue: false }),
        publicationAuthority: fields.select({ label: 'Publication Authority', options: publicationAuthorityOptions, defaultValue: 'none' }),
      },
    }),

    'editorial-reviews': collection({
      label: 'Editorial Reviews & Audits',
      slugField: 'reviewId',
      path: 'src/data/reviews/*',
      format: { data: 'json' },
      schema: {
        reviewId: fields.slug({ name: { label: 'Review ID (e.g. REV-M01-01)' } }),
        artifactId: fields.text({ label: 'Artifact ID' }),
        reviewType: fields.select({
          label: 'Review Type',
          options: [
            { label: 'Canonical Audit', value: 'canonical_audit' },
            { label: 'Media Constitution Review', value: 'media_constitution_review' },
            { label: 'Rights Check', value: 'rights_check' },
            { label: 'Accessibility Audit', value: 'accessibility_audit' },
            { label: 'Editorial Release', value: 'editorial_release' },
          ],
          defaultValue: 'media_constitution_review',
        }),
        reviewer: fields.text({ label: 'Reviewer' }),
        reviewDate: fields.text({ label: 'Review Date (YYYY-MM-DD)' }),
        result: fields.select({
          label: 'Result',
          options: [
            { label: 'Pass', value: 'pass' },
            { label: 'Revise', value: 'revise' },
            { label: 'Hold', value: 'hold' },
            { label: 'Reject', value: 'reject' },
          ],
          defaultValue: 'pass',
        }),
        findings: fields.text({ label: 'Findings', multiline: true }),
        evidenceReview: fields.text({ label: 'Evidence Review', multiline: true }),
        commercialAudit: fields.text({ label: 'Commercial Audit', multiline: true }),
        rightsReview: fields.text({ label: 'Rights Review', multiline: true }),
        provenanceReview: fields.text({ label: 'Provenance Review', multiline: true }),
        accessibilityReview: fields.text({ label: 'Accessibility Review', multiline: true }),
        accessibilityAudit: fields.text({ label: 'Accessibility Audit', multiline: true }),
        editorialRelease: fields.text({ label: 'Editorial Release', multiline: true }),
        publicationAuthority: fields.select({ label: 'Publication Authority', options: publicationAuthorityOptions, defaultValue: 'none' }),
        visibility: fields.select({
          label: 'Visibility',
          options: [{ label: 'Internal Only', value: 'internal' }],
          defaultValue: 'internal',
        }),
        isFixture: fields.checkbox({ label: 'Is Fixture', defaultValue: false }),
        fixturePurpose: fields.text({ label: 'Fixture Purpose' }),
        indexable: fields.checkbox({ label: 'Indexable', defaultValue: false }),
        includeInSitemap: fields.checkbox({ label: 'Include in Sitemap', defaultValue: false }),
        includeInRss: fields.checkbox({ label: 'Include in RSS', defaultValue: false }),
      },
    }),

    'editorial-calendar': collection({
      label: 'Editorial & Publication Calendar',
      slugField: 'eventId',
      path: 'src/data/calendar/*',
      format: { data: 'json' },
      schema: {
        eventId: fields.slug({ name: { label: 'Event ID (e.g. EVT-2026-001)' } }),
        title: fields.text({ label: 'Milestone / Event Title' }),
        eventType: fields.select({
          label: 'Event Type',
          options: [
            { label: 'Canonical Milestone (Freeze / Proposal)', value: 'canonical_milestone' },
            { label: 'Editorial Review / Audit', value: 'editorial_review' },
            { label: 'Website Publication', value: 'site_publication' },
            { label: 'External Media Republication', value: 'media_republication' },
            { label: 'File Revision & Audit Deadline', value: 'revision_audit' },
          ],
          defaultValue: 'site_publication',
        }),
        scheduledDate: fields.text({ label: 'Scheduled Date (YYYY-MM-DD)' }),
        targetArtifactId: fields.text({ label: 'Target Artifact / Module ID' }),
        channel: fields.select({
          label: 'Distribution Channel / Target',
          options: [
            { label: 'DC2SC Main Site', value: 'dc2sc_site' },
            { label: 'Medium', value: 'medium' },
            { label: 'Substack', value: 'substack' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'X (Twitter)', value: 'x' },
            { label: 'Internal Archive / Repo', value: 'internal_archive' },
          ],
          defaultValue: 'dc2sc_site',
        }),
        status: fields.select({
          label: 'Milestone Status',
          options: [
            { label: 'Scheduled', value: 'scheduled' },
            { label: 'In Progress', value: 'in_progress' },
            { label: 'Completed', value: 'completed' },
            { label: 'Postponed', value: 'postponed' },
            { label: 'Cancelled', value: 'cancelled' },
          ],
          defaultValue: 'scheduled',
        }),
        description: fields.text({ label: 'Description & Scope Notes', multiline: true }),
        isFixture: fields.checkbox({ label: 'Is Fixture', defaultValue: false }),
        visibility: fields.select({ label: 'Visibility', options: visibilityOptions, defaultValue: 'public' }),
        indexable: fields.checkbox({ label: 'Indexable', defaultValue: true }),
        publicationAuthority: fields.select({ label: 'Publication Authority', options: publicationAuthorityOptions, defaultValue: 'none' }),
      },
    }),

    // ─── Media Lab ──────────────────────────────────────────────────────────

    'media-objects': collection({
      label: 'Media Objects (Media Passport Registry)',
      slugField: 'mediaId',
      path: 'src/data/media/*',
      format: { data: 'json' },
      schema: {
        mediaId: fields.slug({ name: { label: 'Media ID (e.g. M01-FIG-01)' } }),
        title: fields.text({ label: 'Media Title' }),
        mediaKind: fields.text({ label: 'Media Kind' }),

        // 5 Orthogonal Axes
        epistemicBasis: fields.select({ label: '1. Epistemic Basis', options: epistemicBasisOptions, defaultValue: 'conceptual' }),
        representationRole: fields.select({ label: '2. Representation Role', options: representationRoleOptions, defaultValue: 'structural_model' }),
        provenanceMode: fields.select({ label: '3. Provenance Mode', options: provenanceModeOptions, defaultValue: 'canonical_derived' }),
        artifactRole: fields.select({ label: '4. Artifact Role', options: artifactRoleOptions, defaultValue: 'diagram' }),
        authority: fields.select({ label: '5. Authority (CONSTITUTIONAL INVARIANT)', options: authorityOptions, defaultValue: 'derived_noncanonical' }),

        evidenceLevel: fields.select({ label: 'Evidence Level', options: evidenceLevelOptions, defaultValue: 'E0' }),
        claimState: fields.select({ label: 'Claim State', options: claimStateOptions, defaultValue: 'active' }),
        reviewStatus: fields.select({
          label: 'Review Status',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'In Review', value: 'in_review' },
            { label: 'Reviewed', value: 'reviewed' },
            { label: 'Frozen', value: 'frozen' },
          ],
          defaultValue: 'reviewed',
        }),

        canonicalRefs: fields.array(fields.text({ label: 'Canonical Ref' }), { label: 'Canonical References (Required)' }),
        sourceRefs: fields.array(fields.text({ label: 'Source Ref' }), { label: 'Source References' }),
        relatedModules: fields.array(fields.number({ label: 'Module Number' }), { label: 'Related Modules' }),
        relatedCanvas: fields.text({ label: 'Related Canvas' }),

        scopeLimits: fields.array(fields.text({ label: 'Scope Limit' }), { label: 'Scope Limits' }),
        limitations: fields.array(fields.text({ label: 'Limitation' }), { label: 'Limitations' }),

        // Accessibility Contract
        accessibility: fields.object({
          decorative: fields.checkbox({ label: 'Decorative Only', defaultValue: false }),
          altText: fields.text({ label: 'Alt Text (Min 15 chars)', multiline: true }),
          textEquivalent: fields.text({ label: 'Accessible Text Equivalent', multiline: true }),
          colorIndependent: fields.checkbox({ label: 'Color Independent Design', defaultValue: true }),
        }, { label: 'Accessibility Contract' }),

        // Fail-Closed Commercial Checks
        commercialIntent: fields.select({
          label: 'Commercial Intent',
          options: [{ label: 'None', value: 'none' }],
          defaultValue: 'none',
        }),
        containsTransactionalCTA: fields.checkbox({ label: 'Contains Transactional CTA (Must be False)', defaultValue: false }),
        containsLeadCapture: fields.checkbox({ label: 'Contains Lead Capture (Must be False)', defaultValue: false }),
        containsBookingControl: fields.checkbox({ label: 'Contains Booking Control (Must be False)', defaultValue: false }),
        containsPricePromise: fields.checkbox({ label: 'Contains Price Promise (Must be False)', defaultValue: false }),
        containsUnsupportedBenefitClaim: fields.checkbox({ label: 'Contains Unsupported Benefit Claim (Must be False)', defaultValue: false }),

        asset: fields.object({
          type: fields.select({ options: [{ label: 'SVG', value: 'svg' }, { label: 'PNG', value: 'png' }, { label: 'PDF', value: 'pdf' }], defaultValue: 'svg' }),
          file: fields.text({ label: 'Asset File Path' }),
          license: fields.text({ label: 'License / Rights', defaultValue: 'Original DC2SC visual' }),
          rightsStatus: fields.text({ label: 'Rights Status', defaultValue: 'owned' }),
        }, { label: 'Asset Details' }),
        derivation: fields.object({
          method: fields.text({ label: 'Derivation Method' }),
          transformation: fields.text({ label: 'Transformation Description' }),
        }),
        methodology: fields.text({ label: 'Methodology' }),
        empiricalContext: fields.text({ label: 'Empirical Context' }),
        dataSource: fields.text({ label: 'Data Source' }),
        isFixture: fields.checkbox({ label: 'Is Fixture', defaultValue: false }),
        fixturePurpose: fields.text({ label: 'Fixture Purpose' }),
        visibility: fields.select({ label: 'Visibility', options: visibilityOptions, defaultValue: 'internal' }),
        indexable: fields.checkbox({ label: 'Indexable', defaultValue: false }),
        includeInSitemap: fields.checkbox({ label: 'Include in Sitemap', defaultValue: false }),
        includeInRss: fields.checkbox({ label: 'Include in RSS', defaultValue: false }),
        publicationAuthority: fields.select({ label: 'Publication Authority', options: publicationAuthorityOptions, defaultValue: 'none' }),
      },
    }),

    'canvas-manifests': collection({
      label: 'Canvas Manifests',
      slugField: 'moduleId',
      path: 'src/data/canvases/*',
      format: { data: 'json' },
      schema: {
        moduleId: fields.slug({ name: { label: 'Module ID (e.g. module-01-more-choice-less-voice)' } }),
        moduleNumber: fields.text({ label: 'Module Number (e.g. 01)' }),
        title: fields.text({ label: 'Canvas Title' }),
        subtitle: fields.text({ label: 'Canvas Subtitle' }),
        authority: fields.select({
          label: 'Authority (Strict Invariant)',
          options: authorityOptions,
          defaultValue: 'derived_noncanonical',
        }),
        canvasStatus: fields.select({
          label: 'Canvas Status',
          options: [
            { label: 'Planned (Internal Scaffold)', value: 'planned' },
            { label: 'Scaffolded (Internal)', value: 'scaffolded' },
            { label: 'In Review', value: 'in_review' },
            { label: 'Approved (Publicly Eligible)', value: 'approved' },
            { label: 'Deprecated', value: 'deprecated' },
          ],
          defaultValue: 'planned',
        }),
        visibility: fields.select({ label: 'Visibility', options: visibilityOptions, defaultValue: 'internal' }),
        indexable: fields.checkbox({ label: 'Indexable in Search', defaultValue: false }),
        canonicalRefs: fields.array(fields.text({ label: 'Canonical Ref' }), { label: 'Canonical References' }),
        sourceRefs: fields.array(fields.text({ label: 'Source Ref' }), { label: 'Source References' }),
        scopeLimits: fields.array(fields.text({ label: 'Scope Limit' }), { label: 'Scope Limits' }),
        limitations: fields.array(fields.text({ label: 'Limitation' }), { label: 'Limitations' }),
        claimState: fields.select({ label: 'Claim State', options: claimStateOptions, defaultValue: 'active' }),
        reviewStatus: fields.select({
          label: 'Review Status',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'In Review', value: 'in_review' },
            { label: 'Reviewed', value: 'reviewed' },
          ],
          defaultValue: 'draft',
        }),
        epistemicBasis: fields.select({ label: 'Epistemic Basis', options: epistemicBasisOptions, defaultValue: 'conceptual' }),
        evidenceLevel: fields.select({ label: 'Evidence Level', options: evidenceLevelOptions, defaultValue: 'E0' }),
        isFixture: fields.checkbox({ label: 'Is Fixture', defaultValue: false }),
        fixturePurpose: fields.text({ label: 'Fixture Purpose' }),
        publicationAuthority: fields.select({ label: 'Publication Authority', options: publicationAuthorityOptions, defaultValue: 'none' }),
      },
    }),

    'tables-matrices': collection({
      label: 'Structured Tables & Matrices',
      slugField: 'tableId',
      path: 'src/data/tables/*',
      format: { data: 'json' },
      schema: {
        tableId: fields.slug({ name: { label: 'Table ID (e.g. M01-TAB-01)' } }),
        title: fields.text({ label: 'Table Title' }),
        kind: fields.select({
          label: 'Table Kind',
          options: [
            { label: 'Argument Table', value: 'argument_table' },
            { label: 'Tension Matrix', value: 'tension_matrix' },
            { label: 'Comparison Matrix', value: 'comparison_matrix' },
            { label: 'Data Table', value: 'data_table' },
          ],
          defaultValue: 'argument_table',
        }),
        caption: fields.text({ label: 'Caption', multiline: true }),
        columns: fields.array(
          fields.object({
            key: fields.text({ label: 'Key' }),
            label: fields.text({ label: 'Label' }),
            description: fields.text({ label: 'Description' }),
          }),
          { label: 'Columns', itemLabel: props => props.fields.label.value }
        ),
        rows: fields.array(
          fields.object({
            rowId: fields.text({ label: 'Row ID' }),
            cells: fields.object({
              market: fields.text({ label: 'Market Column Text' }),
              person: fields.text({ label: 'Person Column Text' }),
            }),
          }),
          { label: 'Rows', itemLabel: props => props.fields.rowId.value }
        ),
        leftHeader: fields.text({ label: 'Left Header' }),
        rightHeader: fields.text({ label: 'Right Header' }),
        notes: fields.text({ label: 'Notes', multiline: true }),
        canonicalRefs: fields.array(fields.text({ label: 'Canonical Ref' }), { label: 'Canonical References' }),
        sourceRefs: fields.array(fields.text({ label: 'Source Ref' }), { label: 'Source References' }),
        scopeLimits: fields.array(fields.text({ label: 'Scope Limit' }), { label: 'Scope Limits' }),
        limitations: fields.array(fields.text({ label: 'Limitation' }), { label: 'Limitations' }),
        claimState: fields.select({ label: 'Claim State', options: claimStateOptions, defaultValue: 'active' }),
        reviewStatus: fields.select({
          label: 'Review Status',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'In Review', value: 'in_review' },
            { label: 'Reviewed', value: 'reviewed' },
          ],
          defaultValue: 'reviewed',
        }),
        authority: fields.select({ label: 'Authority', options: authorityOptions, defaultValue: 'derived_noncanonical' }),
        epistemicBasis: fields.select({ label: 'Epistemic Basis', options: epistemicBasisOptions, defaultValue: 'conceptual' }),
        evidenceLevel: fields.select({ label: 'Evidence Level', options: evidenceLevelOptions, defaultValue: 'E0' }),
        accessibility: fields.object({
          textEquivalent: fields.text({ label: 'Accessible Text Equivalent', multiline: true }),
          dataTableFallback: fields.checkbox({ label: 'Data Table Fallback', defaultValue: true }),
        }, { label: 'Accessibility' }),
        isFixture: fields.checkbox({ label: 'Is Fixture', defaultValue: false }),
        fixturePurpose: fields.text({ label: 'Fixture Purpose' }),
        visibility: fields.select({ label: 'Visibility', options: visibilityOptions, defaultValue: 'internal' }),
        indexable: fields.checkbox({ label: 'Indexable', defaultValue: false }),
        includeInSitemap: fields.checkbox({ label: 'Include in Sitemap', defaultValue: false }),
        includeInRss: fields.checkbox({ label: 'Include in RSS', defaultValue: false }),
        publicationAuthority: fields.select({ label: 'Publication Authority', options: publicationAuthorityOptions, defaultValue: 'none' }),
      },
    }),

    'chart-configurations': collection({
      label: 'Chart Configurations',
      slugField: 'chartId',
      path: 'src/data/charts/*',
      format: { data: 'json' },
      schema: {
        chartId: fields.slug({ name: { label: 'Chart ID (e.g. CHART-0001)' } }),
        title: fields.text({ label: 'Chart Title' }),
        chartType: fields.select({
          label: 'Chart Type',
          options: [
            { label: 'Matrix Grid', value: 'matrix_grid' },
            { label: 'Bar', value: 'bar' },
            { label: 'Line', value: 'line' },
            { label: 'Scatter', value: 'scatter' },
            { label: 'Flow', value: 'flow' },
          ],
          defaultValue: 'matrix_grid',
        }),
        dataSource: fields.text({ label: 'Data Source Description' }),
        derivation: fields.text({ label: 'Derivation Method' }),
        empiricalContext: fields.text({ label: 'Empirical Context' }),
        methodology: fields.text({ label: 'Methodology' }),
        epistemicBasis: fields.select({ label: 'Epistemic Basis', options: epistemicBasisOptions, defaultValue: 'analytical' }),
        evidenceLevel: fields.select({ label: 'Evidence Level', options: evidenceLevelOptions, defaultValue: 'E0' }),
        canonicalRefs: fields.array(fields.text({ label: 'Canonical Ref' }), { label: 'Canonical References' }),
        sourceRefs: fields.array(fields.text({ label: 'Source Ref' }), { label: 'Source References' }),
        scopeLimits: fields.array(fields.text({ label: 'Scope Limit' }), { label: 'Scope Limits' }),
        limitations: fields.array(fields.text({ label: 'Limitation' }), { label: 'Limitations' }),
        claimState: fields.select({ label: 'Claim State', options: claimStateOptions, defaultValue: 'active' }),
        reviewStatus: fields.select({
          label: 'Review Status',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'In Review', value: 'in_review' },
            { label: 'Reviewed', value: 'reviewed' },
          ],
          defaultValue: 'reviewed',
        }),
        authority: fields.select({ label: 'Authority', options: authorityOptions, defaultValue: 'derived_noncanonical' }),
        datasetRefs: fields.array(fields.text({ label: 'Dataset Ref' }), { label: 'Dataset References' }),
        dataTableFallback: fields.object({
          headers: fields.array(fields.text({ label: 'Header' })),
          rows: fields.array(fields.array(fields.text({ label: 'Cell' }))),
        }),
        notes: fields.text({ label: 'Notes', multiline: true }),
        isFixture: fields.checkbox({ label: 'Is Fixture', defaultValue: false }),
        fixturePurpose: fields.text({ label: 'Fixture Purpose' }),
        visibility: fields.select({ label: 'Visibility', options: visibilityOptions, defaultValue: 'internal' }),
        indexable: fields.checkbox({ label: 'Indexable', defaultValue: false }),
        includeInSitemap: fields.checkbox({ label: 'Include in Sitemap', defaultValue: false }),
        includeInRss: fields.checkbox({ label: 'Include in RSS', defaultValue: false }),
        publicationAuthority: fields.select({ label: 'Publication Authority', options: publicationAuthorityOptions, defaultValue: 'none' }),
      },
    }),

    // ─── Library & Sources ──────────────────────────────────────────────────

    'source-documents': collection({
      label: 'Source Document & PDF Registry',
      slugField: 'slug',
      path: 'src/content/sources/*',
      format: { contentField: 'content' },
      schema: {
        slug: fields.slug({ name: { label: 'Slug' } }),
        sourceId: fields.text({ label: 'Source ID (e.g. SRC-0001)' }),
        title: fields.text({ label: 'Full Title' }),
        shortTitle: fields.text({ label: 'Short Title' }),
        sourceType: fields.select({
          label: 'Source Type',
          options: [
            { label: 'Journal Article', value: 'journal_article' },
            { label: 'Working Paper', value: 'working_paper' },
            { label: 'Book Chapter', value: 'book_chapter' },
            { label: 'Monograph', value: 'monograph' },
            { label: 'Institutional Report', value: 'institutional_report' },
            { label: 'Legal Statute', value: 'legal_statute' },
            { label: 'Dataset Documentation', value: 'dataset_documentation' },
          ],
          defaultValue: 'working_paper',
        }),
        documentFormat: fields.text({ label: 'Document Format', defaultValue: 'pdf' }),
        authors: fields.array(
          fields.object({
            authorId: fields.text({ label: 'Author ID' }),
            displayName: fields.text({ label: 'Display Name' }),
            role: fields.text({ label: 'Role', defaultValue: 'author' }),
          }),
          { label: 'Authors', itemLabel: props => props.fields.displayName.value }
        ),
        publishedYear: fields.number({ label: 'Published Year' }),
        publisher: fields.text({ label: 'Publisher / Institution' }),
        journalOrSeries: fields.text({ label: 'Journal / Series' }),
        doi: fields.text({ label: 'DOI (e.g. 10.1920/...)' }),
        officialUrl: fields.text({ label: 'Official Publisher URL' }),

        // Rights and PDF Display Controls
        rights: fields.object({
          access: fields.select({
            label: 'Access Mode',
            options: [
              { label: 'Public Link', value: 'public_link' },
              { label: 'Licensed', value: 'licensed' },
              { label: 'Internal Reference', value: 'internal_reference' },
              { label: 'Unknown', value: 'unknown' },
            ],
            defaultValue: 'public_link',
          }),
          storagePermission: fields.select({
            label: 'Storage Permission',
            options: [
              { label: 'Verified', value: 'verified' },
              { label: 'Pending Verification', value: 'pending' },
              { label: 'Not Permitted', value: 'not_permitted' },
            ],
            defaultValue: 'pending',
          }),
          websiteDisplayPermission: fields.select({
            label: 'Website Display Permission (CONSTITUTIONAL GATE)',
            description: 'Defaults strictly to metadata_only. Cannot host PDF without verified rights.',
            options: [
              { label: 'Metadata Only (Default / Safe)', value: 'metadata_only' },
              { label: 'Link to Official Publisher Source', value: 'link_to_official_source' },
              { label: 'Host Public PDF (Requires Verified Storage Permission)', value: 'host_public_pdf' },
              { label: 'Internal Only', value: 'internal_only' },
            ],
            defaultValue: 'metadata_only',
          }),
          citationPermission: fields.select({
            label: 'Citation Permission',
            options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }, { label: 'Verify', value: 'verify' }],
            defaultValue: 'yes',
          }),
          excerptPermission: fields.select({
            label: 'Excerpt Permission',
            options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }, { label: 'Verify', value: 'verify' }],
            defaultValue: 'verify',
          }),
          rightsNote: fields.text({ label: 'Rights Notes / License Details', multiline: true }),
        }, { label: 'Rights & Display Controls' }),

        evidenceLevel: fields.select({ label: 'Evidence Level', options: evidenceLevelOptions, defaultValue: 'E1' }),
        verificationStatus: fields.select({
          label: 'Verification Status',
          options: [
            { label: 'Unreviewed', value: 'unreviewed' },
            { label: 'Metadata Verified', value: 'metadata_verified' },
            { label: 'Source Verified', value: 'source_verified' },
            { label: 'Restricted', value: 'restricted' },
          ],
          defaultValue: 'metadata_verified',
        }),
        sourceStatus: fields.text({ label: 'Source Status' }),
        topicTags: fields.array(fields.text({ label: 'Tag' }), { label: 'Topic Tags' }),
        limitations: fields.array(fields.text({ label: 'Limitation' }), { label: 'Limitations' }),
        relatedResearch: fields.array(fields.text({ label: 'Related Research' }), { label: 'Related Research' }),
        relatedMedia: fields.array(fields.text({ label: 'Related Media' }), { label: 'Related Media' }),
        publicVisibility: fields.select({
          label: 'Public Visibility',
          options: [
            { label: 'Reference Only (Default)', value: 'reference_only' },
            { label: 'Public Profile', value: 'public_profile' },
            { label: 'Internal Only', value: 'internal' },
          ],
          defaultValue: 'reference_only',
        }),
        indexable: fields.checkbox({ label: 'Indexable in Search', defaultValue: false }),
        isFixture: fields.checkbox({ label: 'Is Fixture', defaultValue: false }),
        fixturePurpose: fields.text({ label: 'Fixture Purpose' }),
        publicationAuthority: fields.select({ label: 'Publication Authority', options: publicationAuthorityOptions, defaultValue: 'none' }),
        content: fields.markdoc({ label: 'Source Abstract & Analytical Notes', extension: 'md', components: markdocComponents }),
      },
    }),

    authors: collection({
      label: 'Authors & Contributors Registry',
      slugField: 'slug',
      path: 'src/content/authors/*',
      format: { contentField: 'content' },
      schema: {
        slug: fields.slug({ name: { label: 'Slug' } }),
        authorId: fields.text({ label: 'Author ID (e.g. AUTH-0001)' }),
        displayName: fields.text({ label: 'Display Name' }),
        roles: fields.array(fields.text({ label: 'Role' }), { label: 'Roles' }),
        bio: fields.text({ label: 'Biography', multiline: true }),
        avatar: fields.text({ label: 'Avatar URL' }),
        website: fields.text({ label: 'Website URL' }),
        visibility: fields.select({
          label: 'Visibility',
          options: [
            { label: 'Public Profile', value: 'public' },
            { label: 'Reference Only (No Profile Page)', value: 'reference_only' },
            { label: 'Internal Only', value: 'internal' },
          ],
          defaultValue: 'public',
        }),
        verificationStatus: fields.select({
          label: 'Verification Status',
          options: [
            { label: 'Self Managed', value: 'self_managed' },
            { label: 'Verified Contributor', value: 'verified_contributor' },
            { label: 'External Reference', value: 'external_reference' },
          ],
          defaultValue: 'verified_contributor',
        }),
        relatedArtifacts: fields.array(fields.text({ label: 'Related Artifact' }), { label: 'Related Artifacts' }),
        dependencies: fields.array(fields.text({ label: 'Dependency' })),
        downstreamHandoff: fields.text({ label: 'Downstream Handoff' }),
        upstreamDependencies: fields.array(fields.text({ label: 'Upstream Dependency' })),
        isFixture: fields.checkbox({ label: 'Is Fixture', defaultValue: false }),
        fixturePurpose: fields.text({ label: 'Fixture Purpose' }),
        publicationAuthority: fields.select({ label: 'Publication Authority', options: publicationAuthorityOptions, defaultValue: 'none' }),
        content: fields.markdoc({ label: 'Extended Notes', extension: 'md', components: markdocComponents }),
      },
    }),

    datasets: collection({
      label: 'Datasets Registry',
      slugField: 'datasetId',
      path: 'src/data/datasets/*',
      format: { data: 'json' },
      schema: {
        datasetId: fields.slug({ name: { label: 'Dataset ID' } }),
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'Description', multiline: true }),
        status: fields.text({ label: 'Status' }),
        evidenceLevel: fields.select({ label: 'Evidence Level', options: evidenceLevelOptions, defaultValue: 'E0' }),
        license: fields.text({ label: 'License' }),
        sourceUrl: fields.text({ label: 'Source URL' }),
        relatedModules: fields.array(fields.number({ label: 'Module Number' }), { label: 'Related Modules' }),
        relatedCanvas: fields.text({ label: 'Related Canvas' }),
        topicTags: fields.array(fields.text({ label: 'Tag' }), { label: 'Topic Tags' }),
        limitations: fields.array(fields.text({ label: 'Limitation' }), { label: 'Limitations' }),
        isFixture: fields.checkbox({ label: 'Is Fixture', defaultValue: false }),
        fixturePurpose: fields.text({ label: 'Fixture Purpose' }),
        visibility: fields.select({ label: 'Visibility', options: visibilityOptions, defaultValue: 'internal' }),
        indexable: fields.checkbox({ label: 'Indexable', defaultValue: false }),
        includeInSitemap: fields.checkbox({ label: 'Include in Sitemap', defaultValue: false }),
        includeInRss: fields.checkbox({ label: 'Include in RSS', defaultValue: false }),
        publicationAuthority: fields.select({ label: 'Publication Authority', options: publicationAuthorityOptions, defaultValue: 'none' }),
      },
    }),

    citations: collection({
      label: 'Citations Registry',
      slugField: 'citationId',
      path: 'src/data/citations/*',
      format: { data: 'json' },
      schema: {
        citationId: fields.slug({ name: { label: 'Citation ID' } }),
        sourceId: fields.text({ label: 'Source ID' }),
        apa: fields.text({ label: 'APA Citation', multiline: true }),
        bibtex: fields.text({ label: 'BibTeX Citation', multiline: true }),
        isFixture: fields.checkbox({ label: 'Is Fixture', defaultValue: false }),
        fixturePurpose: fields.text({ label: 'Fixture Purpose' }),
        visibility: fields.select({ label: 'Visibility', options: visibilityOptions, defaultValue: 'internal' }),
        indexable: fields.checkbox({ label: 'Indexable', defaultValue: false }),
        includeInSitemap: fields.checkbox({ label: 'Include in Sitemap', defaultValue: false }),
        includeInRss: fields.checkbox({ label: 'Include in RSS', defaultValue: false }),
        publicationAuthority: fields.select({ label: 'Publication Authority', options: publicationAuthorityOptions, defaultValue: 'none' }),
      },
    }),

    // ─── Distribution & Relations ───────────────────────────────────────────

    'external-editions': collection({
      label: 'External Editions (URL Mappings Only)',
      slugField: 'editionId',
      path: 'src/data/external-editions/*',
      format: { data: 'json' },
      schema: {
        editionId: fields.slug({ name: { label: 'Edition ID (e.g. ED-M01-MEDIUM)' } }),
        artifactId: fields.text({ label: 'Artifact ID' }),
        authorId: fields.text({ label: 'Author ID' }),
        platform: fields.select({
          label: 'Platform',
          options: [
            { label: 'Medium', value: 'medium' },
            { label: 'Substack', value: 'substack' },
            { label: 'X', value: 'x' },
            { label: 'Bluesky', value: 'bluesky' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Website', value: 'website' },
          ],
          defaultValue: 'medium',
        }),
        status: fields.select({
          label: 'Link Status (No Automated Publishing)',
          options: [
            { label: 'Not Linked', value: 'not_linked' },
            { label: 'Draft', value: 'draft' },
            { label: 'Published (Requires Valid URL)', value: 'published' },
            { label: 'Archived', value: 'archived' },
          ],
          defaultValue: 'not_linked',
        }),
        url: fields.text({ label: 'External Publication URL' }),
        canonicalUrl: fields.text({ label: 'Canonical URL on DC2SC' }),
        titleAtPublication: fields.text({ label: 'Title at Publication' }),
        notes: fields.text({ label: 'Notes', multiline: true }),
        isFixture: fields.checkbox({ label: 'Is Fixture', defaultValue: false }),
        fixturePurpose: fields.text({ label: 'Fixture Purpose' }),
        visibility: fields.select({ label: 'Visibility', options: visibilityOptions, defaultValue: 'internal' }),
        indexable: fields.checkbox({ label: 'Indexable', defaultValue: false }),
        includeInSitemap: fields.checkbox({ label: 'Include in Sitemap', defaultValue: false }),
        includeInRss: fields.checkbox({ label: 'Include in RSS', defaultValue: false }),
        publicationAuthority: fields.select({ label: 'Publication Authority', options: publicationAuthorityOptions, defaultValue: 'none' }),
      },
    }),

    'curated-discussions': collection({
      label: 'Curated Discussions',
      slugField: 'id',
      path: 'src/content/discussions/*',
      format: { data: 'json' },
      schema: {
        id: fields.slug({ name: { label: 'Discussion ID / Slug' } }),
        topic: fields.text({ label: 'Topic' }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'Research Question', value: 'research_question' },
            { label: 'Counterexample', value: 'counterexample' },
            { label: 'Methodological Objection', value: 'methodological_objection' },
            { label: 'Editorial Note', value: 'editorial_note' },
          ],
          defaultValue: 'research_question',
        }),
        body: fields.text({ label: 'Discussion Body', multiline: true }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Demo', value: 'demo' },
            { label: 'Curated', value: 'curated' },
            { label: 'Archived', value: 'archived' },
          ],
          defaultValue: 'demo',
        }),
        isDemo: fields.checkbox({ label: 'Demo Label (Required)', defaultValue: true }),
        source: fields.text({ label: 'Source', defaultValue: 'site' }),
        sourceUrl: fields.text({ label: 'Source URL' }),
        relatedModules: fields.array(fields.number({ label: 'Module Number' }), { label: 'Related Modules' }),
        relatedCanvas: fields.text({ label: 'Related Canvas' }),
        topicTags: fields.array(fields.text({ label: 'Tag' }), { label: 'Topic Tags' }),
        limitations: fields.array(fields.text({ label: 'Limitation' }), { label: 'Limitations' }),
        consentStatus: fields.text({ label: 'Consent Status', defaultValue: 'demo' }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        relatedArtifact: fields.text({ label: 'Related Artifact' }),
      },
    }),

    'curated-signals': collection({
      label: '⚡ Curated Signals & Ingestion Inbox',
      slugField: 'slug',
      path: 'src/content/signals/*',
      format: { data: 'json' },
      schema: {
        slug: fields.slug({ name: { label: 'Signal ID / Slug' } }),
        title: fields.text({ label: 'Title / Post Header' }),
        author: fields.text({ label: 'Author / Handle (e.g. @vitalikbuterin, Matt Stoller)' }),
        sourcePlatform: fields.select({
          label: 'Source Platform',
          options: [
            { label: 'Substack', value: 'substack' },
            { label: 'X / Twitter', value: 'twitter' },
            { label: 'arXiv Pre-print', value: 'arxiv' },
            { label: 'Medium', value: 'medium' },
            { label: 'Academic Blog / Mirror', value: 'blog' },
          ],
          defaultValue: 'substack',
        }),
        originalUrl: fields.text({ label: 'Original Source URL' }),
        publishedDate: fields.text({ label: 'Published / Discovered Date' }),
        summary: fields.text({ label: 'Key Summary & Analytical Context', multiline: true }),
        keyQuote: fields.text({ label: 'Key Quote / Excerpt', multiline: true }),
        relatedModule: fields.number({ label: 'Related Canonical Module (1–7)' }),
        curatorTags: fields.array(fields.text({ label: 'Tag' }), { label: 'Concept Tags' }),
        republicationStatus: fields.select({
          label: 'Republication Status (QUEUE WORKFLOW)',
          options: [
            { label: '📥 Inbox (Discovered by Perplexity / AI)', value: 'inbox' },
            { label: '⏳ In Editorial Review', value: 'editorial_review' },
            { label: '✅ Approved for Republication / Featured', value: 'approved' },
            { label: '🚫 Rejected / Out of Scope', value: 'rejected' },
            { label: '📦 Archived', value: 'archived' },
          ],
          defaultValue: 'approved',
        }),
        featuredOnHomepage: fields.checkbox({ label: 'Feature in Homepage Stream', defaultValue: true }),
        aiDiscoveredBy: fields.text({ label: 'Discovery Agent / Engine', defaultValue: 'Perplexity AI Task' }),
      },
    }),
  },
  singletons: {
    'translation-settings': singleton({
      label: '⚡ Translation Automation & Locales',
      path: 'src/data/translation-settings',
      format: 'json',
      schema: {
        autoTranslateOnSave: fields.checkbox({
          label: 'Auto-Translate On Save',
          description: 'Automatically synchronize and translate content across Ukrainian, English, and German upon saving in Keystatic.',
          defaultValue: true,
        }),
        primaryLanguage: fields.select({
          label: 'Primary Source Language',
          options: [
            { label: 'Ukrainian (uk)', value: 'uk' },
            { label: 'English (en)', value: 'en' },
            { label: 'German (de)', value: 'de' },
          ],
          defaultValue: 'uk',
        }),
        targetLanguages: fields.array(fields.text({ label: 'Language Code' }), {
          label: 'Active Target Locales',
          itemLabel: props => props.value,
        }),
        lastSyncTimestamp: fields.text({
          label: 'Last Sync Timestamp',
          defaultValue: '2026-09-18T16:00:00Z',
        }),
      },
    }),
  },
});
