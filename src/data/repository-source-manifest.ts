export type RepositorySourceClass =
  | 'canonical_reference'
  | 'canonical_module'
  | 'research_spec'
  | 'goliaf_artifact'
  | 'legacy_source_corpus'
  | 'derived_editorial'
  | 'internal_operational';

export type ImportApproval =
  | 'approved_for_public_reference'
  | 'approved_for_web_adaptation'
  | 'not_approved'
  | 'internal_only';

export interface RepositorySourceManifestItem {
  sourceArtifactId: string;
  sourceArtifactTitle: string;
  sourceVersion: string;
  sourcePath: string;
  sourceClass: RepositorySourceClass;

  sourceCanonicalState:
    | 'none'
    | 'provisional'
    | 'working'
    | 'frozen'
    | 'superseded';

  sourceClaimState:
    | 'active'
    | 'superseded'
    | 'rejected';

  sourceResearchRole:
    | 'concept'
    | 'hypothesis'
    | 'analytical_framework'
    | 'stress_test_protocol'
    | 'empirical_result'
    | 'none';

  sourceEvidenceLevel:
    | 'E0'
    | 'E1'
    | 'E2'
    | 'E3'
    | 'E4'
    | 'E5';

  sourceLifecycleStatus: string;
  sourceVisibility: 'public' | 'unlisted' | 'internal';

  importApproval: ImportApproval;
  webDestination?: string;
  provenanceType?:
    | 'canonical_import'
    | 'adapted_repository_import'
    | 'reference_summary';

  substantiveAdaptationAllowed: boolean;
  sourceReviewStatus:
    | 'verified'
    | 'partial'
    | 'not_verified';

  sourceReviewNote: string;
  webAdaptationNote?: string;
}

export const repositorySourceManifest: Record<string, RepositorySourceManifestItem> = {
  // ─── 1. Canonical Reference Body ──────────────────────────────────────────
  'canonical-narrative': {
    sourceArtifactId: 'DC2SC-CANON-000',
    sourceArtifactTitle: 'The Canonical Narrative Body v1.0',
    sourceVersion: '1.0',
    sourcePath: 'Not specified in source artifact',
    sourceClass: 'canonical_reference',
    sourceCanonicalState: 'frozen',
    sourceClaimState: 'active',
    sourceResearchRole: 'analytical_framework',
    sourceEvidenceLevel: 'E0',
    sourceLifecycleStatus: 'approved_for_public_reference',
    sourceVisibility: 'public',
    importApproval: 'approved_for_public_reference',
    webDestination: '/research/canonical-narrative',
    provenanceType: 'canonical_import',
    substantiveAdaptationAllowed: false,
    sourceReviewStatus: 'verified',
    sourceReviewNote: 'Frozen canonical reference body of the DC2SC research program.',
    webAdaptationNote: 'Structured for web reading. Evidence level, scope boundary and substantive claims have not been altered or strengthened.',
  },
  'seven-module-spine': {
    sourceArtifactId: 'DC2SC-CANON-SPINE',
    sourceArtifactTitle: 'Seven-Module Research Spine v1.0',
    sourceVersion: '1.0',
    sourcePath: 'Not specified in source artifact',
    sourceClass: 'canonical_reference',
    sourceCanonicalState: 'frozen',
    sourceClaimState: 'active',
    sourceResearchRole: 'analytical_framework',
    sourceEvidenceLevel: 'E0',
    sourceLifecycleStatus: 'approved_for_public_reference',
    sourceVisibility: 'public',
    importApproval: 'approved_for_public_reference',
    webDestination: '/research/seven-module-spine',
    provenanceType: 'canonical_import',
    substantiveAdaptationAllowed: false,
    sourceReviewStatus: 'verified',
    sourceReviewNote: 'Frozen structural overview of seven sequential narrative modules.',
    webAdaptationNote: 'Structured for web reading. Evidence level, scope boundary and substantive claims have not been altered or strengthened.',
  },

  // ─── 2. Seven Canonical Modules ───────────────────────────────────────────
  'module-01-more-choice-less-voice': {
    sourceArtifactId: 'DC2SC-MOD-01',
    sourceArtifactTitle: 'Module 01: More Choice, Less Voice',
    sourceVersion: '1.0',
    sourcePath: 'Not specified in source artifact',
    sourceClass: 'canonical_module',
    sourceCanonicalState: 'frozen',
    sourceClaimState: 'active',
    sourceResearchRole: 'analytical_framework',
    sourceEvidenceLevel: 'E0',
    sourceLifecycleStatus: 'approved_for_public_reference',
    sourceVisibility: 'public',
    importApproval: 'approved_for_public_reference',
    webDestination: '/research/module-01-more-choice-less-voice',
    provenanceType: 'canonical_import',
    substantiveAdaptationAllowed: false,
    sourceReviewStatus: 'verified',
    sourceReviewNote: 'Frozen canonical specification for Module 01.',
    webAdaptationNote: 'Structured as a concise canonical specification. No editorial essay or empirical claim added.',
  },
  'module-02-crowd-is-attention': {
    sourceArtifactId: 'DC2SC-MOD-02',
    sourceArtifactTitle: 'Module 02: A Crowd Is Attention. A Market Position Is Agency.',
    sourceVersion: '1.0',
    sourcePath: 'Not specified in source artifact',
    sourceClass: 'canonical_module',
    sourceCanonicalState: 'frozen',
    sourceClaimState: 'active',
    sourceResearchRole: 'analytical_framework',
    sourceEvidenceLevel: 'E0',
    sourceLifecycleStatus: 'approved_for_public_reference',
    sourceVisibility: 'public',
    importApproval: 'approved_for_public_reference',
    webDestination: '/research/module-02-crowd-is-attention',
    provenanceType: 'canonical_import',
    substantiveAdaptationAllowed: false,
    sourceReviewStatus: 'verified',
    sourceReviewNote: 'Frozen canonical specification for Module 02.',
    webAdaptationNote: 'Structured as a concise canonical specification. No editorial essay or empirical claim added.',
  },
  'module-03-why-more-buyers': {
    sourceArtifactId: 'DC2SC-MOD-03',
    sourceArtifactTitle: 'Module 03: Why More Buyers Do Not Automatically Mean a Better Deal',
    sourceVersion: '1.0',
    sourcePath: 'Not specified in source artifact',
    sourceClass: 'canonical_module',
    sourceCanonicalState: 'frozen',
    sourceClaimState: 'active',
    sourceResearchRole: 'analytical_framework',
    sourceEvidenceLevel: 'E0',
    sourceLifecycleStatus: 'approved_for_public_reference',
    sourceVisibility: 'public',
    importApproval: 'approved_for_public_reference',
    webDestination: '/research/module-03-why-more-buyers',
    provenanceType: 'canonical_import',
    substantiveAdaptationAllowed: false,
    sourceReviewStatus: 'verified',
    sourceReviewNote: 'Frozen canonical specification for Module 03.',
    webAdaptationNote: 'Structured as a concise canonical specification. No editorial essay or empirical claim added.',
  },
  'module-04-cost-of-commitment': {
    sourceArtifactId: 'DC2SC-MOD-04',
    sourceArtifactTitle: 'Module 04: The Cost of Commitment',
    sourceVersion: '1.0',
    sourcePath: 'Not specified in source artifact',
    sourceClass: 'canonical_module',
    sourceCanonicalState: 'frozen',
    sourceClaimState: 'active',
    sourceResearchRole: 'analytical_framework',
    sourceEvidenceLevel: 'E0',
    sourceLifecycleStatus: 'approved_for_public_reference',
    sourceVisibility: 'public',
    importApproval: 'approved_for_public_reference',
    webDestination: '/research/module-04-cost-of-commitment',
    provenanceType: 'canonical_import',
    substantiveAdaptationAllowed: false,
    sourceReviewStatus: 'verified',
    sourceReviewNote: 'Frozen canonical specification for Module 04.',
    webAdaptationNote: 'Structured as a concise canonical specification. No editorial essay or empirical claim added.',
  },
  'module-05-coordination-rights': {
    sourceArtifactId: 'DC2SC-MOD-05',
    sourceArtifactTitle: 'Module 05: Coordination Rights',
    sourceVersion: '1.0',
    sourcePath: 'Not specified in source artifact',
    sourceClass: 'canonical_module',
    sourceCanonicalState: 'frozen',
    sourceClaimState: 'active',
    sourceResearchRole: 'analytical_framework',
    sourceEvidenceLevel: 'E0',
    sourceLifecycleStatus: 'approved_for_public_reference',
    sourceVisibility: 'public',
    importApproval: 'approved_for_public_reference',
    webDestination: '/research/module-05-coordination-rights',
    provenanceType: 'canonical_import',
    substantiveAdaptationAllowed: false,
    sourceReviewStatus: 'verified',
    sourceReviewNote: 'Frozen canonical specification for Module 05.',
    webAdaptationNote: 'Structured as a concise canonical specification. No editorial essay or empirical claim added.',
  },
  'module-06-travel-is-a-stress-test': {
    sourceArtifactId: 'DC2SC-MOD-06',
    sourceArtifactTitle: 'Module 06: Travel Is a Stress Test',
    sourceVersion: '1.0',
    sourcePath: 'Not specified in source artifact',
    sourceClass: 'canonical_module',
    sourceCanonicalState: 'frozen',
    sourceClaimState: 'active',
    sourceResearchRole: 'analytical_framework',
    sourceEvidenceLevel: 'E0',
    sourceLifecycleStatus: 'approved_for_public_reference',
    sourceVisibility: 'public',
    importApproval: 'approved_for_public_reference',
    webDestination: '/research/module-06-travel-is-a-stress-test',
    provenanceType: 'canonical_import',
    substantiveAdaptationAllowed: false,
    sourceReviewStatus: 'verified',
    sourceReviewNote: 'Frozen canonical specification for Module 06.',
    webAdaptationNote: 'Structured as a concise canonical specification. No editorial essay or empirical claim added.',
  },
  'module-07-what-counts-as-success': {
    sourceArtifactId: 'DC2SC-MOD-07',
    sourceArtifactTitle: 'Module 07: What Counts as Success?',
    sourceVersion: '1.0',
    sourcePath: 'Not specified in source artifact',
    sourceClass: 'canonical_module',
    sourceCanonicalState: 'frozen',
    sourceClaimState: 'active',
    sourceResearchRole: 'analytical_framework',
    sourceEvidenceLevel: 'E0',
    sourceLifecycleStatus: 'approved_for_public_reference',
    sourceVisibility: 'public',
    importApproval: 'approved_for_public_reference',
    webDestination: '/research/module-07-what-counts-as-success',
    provenanceType: 'canonical_import',
    substantiveAdaptationAllowed: false,
    sourceReviewStatus: 'verified',
    sourceReviewNote: 'Frozen canonical specification for Module 07.',
    webAdaptationNote: 'Structured as a concise canonical specification. No editorial essay or empirical claim added.',
  },

  // ─── 3. Working Research Specifications ────────────────────────────────────
  'continuous-rights-gates': {
    sourceArtifactId: 'DC2SC-SPEC-CRG',
    sourceArtifactTitle: 'Continuous Rights Gates Specification v1.0',
    sourceVersion: '1.0',
    sourcePath: 'Not specified in source artifact',
    sourceClass: 'research_spec',
    sourceCanonicalState: 'working',
    sourceClaimState: 'active',
    sourceResearchRole: 'analytical_framework',
    sourceEvidenceLevel: 'E0',
    sourceLifecycleStatus: 'approved_for_web_adaptation',
    sourceVisibility: 'public',
    importApproval: 'approved_for_web_adaptation',
    webDestination: '/research/continuous-rights-gates',
    provenanceType: 'adapted_repository_import',
    substantiveAdaptationAllowed: false,
    sourceReviewStatus: 'verified',
    sourceReviewNote: 'Working governance specification for 16-step validation sequence.',
    webAdaptationNote: 'Adapted for web presentation as a research governance model. Not a product workflow.',
  },
  'failure-first-framework': {
    sourceArtifactId: 'DC2SC-SPEC-FFF',
    sourceArtifactTitle: 'Failure-First Research Framework Specification v1.0',
    sourceVersion: '1.0',
    sourcePath: 'Not specified in source artifact',
    sourceClass: 'research_spec',
    sourceCanonicalState: 'working',
    sourceClaimState: 'active',
    sourceResearchRole: 'analytical_framework',
    sourceEvidenceLevel: 'E0',
    sourceLifecycleStatus: 'approved_for_web_adaptation',
    sourceVisibility: 'public',
    importApproval: 'approved_for_web_adaptation',
    webDestination: '/research/failure-first-framework',
    provenanceType: 'adapted_repository_import',
    substantiveAdaptationAllowed: false,
    sourceReviewStatus: 'verified',
    sourceReviewNote: 'Working specification for pre-registered failure categories and validation thresholds.',
    webAdaptationNote: 'Adapted for public reference at category level. Internal operational IDs omitted.',
  },
  'evidence-and-claim-discipline': {
    sourceArtifactId: 'DC2SC-SPEC-ECD',
    sourceArtifactTitle: 'Evidence and Claim Discipline Specification v1.0',
    sourceVersion: '1.0',
    sourcePath: 'Not specified in source artifact',
    sourceClass: 'research_spec',
    sourceCanonicalState: 'working',
    sourceClaimState: 'active',
    sourceResearchRole: 'analytical_framework',
    sourceEvidenceLevel: 'E0',
    sourceLifecycleStatus: 'approved_for_web_adaptation',
    sourceVisibility: 'public',
    importApproval: 'approved_for_web_adaptation',
    webDestination: '/research/evidence-and-claim-discipline',
    provenanceType: 'adapted_repository_import',
    substantiveAdaptationAllowed: false,
    sourceReviewStatus: 'verified',
    sourceReviewNote: 'Working specification for E0–E5 evidence standards and claim boundaries.',
    webAdaptationNote: 'Structured for web reading. Prohibits unsupported field assertions.',
  },

  // ─── 4. GOLIAF Stress-Test Artifacts ──────────────────────────────────────
  'travel-decision-map': {
    sourceArtifactId: 'GOLIAF-ART-TDM',
    sourceArtifactTitle: 'GOLIAF Travel Decision Map v1.0',
    sourceVersion: '1.0',
    sourcePath: 'Not specified in source artifact',
    sourceClass: 'goliaf_artifact',
    sourceCanonicalState: 'working',
    sourceClaimState: 'active',
    sourceResearchRole: 'stress_test_protocol',
    sourceEvidenceLevel: 'E0',
    sourceLifecycleStatus: 'approved_for_web_adaptation',
    sourceVisibility: 'public',
    importApproval: 'approved_for_web_adaptation',
    webDestination: '/goliaf/travel-decision-map',
    provenanceType: 'adapted_repository_import',
    substantiveAdaptationAllowed: false,
    sourceReviewStatus: 'verified',
    sourceReviewNote: 'Observation model of participant travel-decision journey. Distinct from constitutional mechanisms.',
    webAdaptationNote: 'Structured for web reading with mandatory non-product boundary panel.',
  },
  'travel-as-a-stress-test': {
    sourceArtifactId: 'GOLIAF-ART-TST',
    sourceArtifactTitle: 'Travel as a Stress Test Rationale v1.0',
    sourceVersion: '1.0',
    sourcePath: 'Not specified in source artifact',
    sourceClass: 'goliaf_artifact',
    sourceCanonicalState: 'working',
    sourceClaimState: 'active',
    sourceResearchRole: 'stress_test_protocol',
    sourceEvidenceLevel: 'E0',
    sourceLifecycleStatus: 'approved_for_web_adaptation',
    sourceVisibility: 'public',
    importApproval: 'approved_for_web_adaptation',
    webDestination: '/goliaf/travel-as-a-stress-test',
    provenanceType: 'adapted_repository_import',
    substantiveAdaptationAllowed: false,
    sourceReviewStatus: 'verified',
    sourceReviewNote: 'Domain rationale for using high-heterogeneity travel as a stress-test environment.',
    webAdaptationNote: 'Structured for web reading with mandatory non-product boundary panel.',
  },
  'constraints-are-not-noise': {
    sourceArtifactId: 'GOLIAF-ART-CNN',
    sourceArtifactTitle: 'Constraints Are Not Noise v1.0',
    sourceVersion: '1.0',
    sourcePath: 'Not specified in source artifact',
    sourceClass: 'goliaf_artifact',
    sourceCanonicalState: 'working',
    sourceClaimState: 'active',
    sourceResearchRole: 'stress_test_protocol',
    sourceEvidenceLevel: 'E0',
    sourceLifecycleStatus: 'approved_for_web_adaptation',
    sourceVisibility: 'public',
    importApproval: 'approved_for_web_adaptation',
    webDestination: '/goliaf/constraints-are-not-noise',
    provenanceType: 'adapted_repository_import',
    substantiveAdaptationAllowed: false,
    sourceReviewStatus: 'verified',
    sourceReviewNote: 'Methodological artifact establishing participant constraints as first-class research inputs.',
    webAdaptationNote: 'Structured for web reading with mandatory non-product boundary panel.',
  },
  'what-may-be-shared': {
    sourceArtifactId: 'GOLIAF-ART-WMS',
    sourceArtifactTitle: 'What May Be Shared, What Remains Individual v1.0',
    sourceVersion: '1.0',
    sourcePath: 'Not specified in source artifact',
    sourceClass: 'goliaf_artifact',
    sourceCanonicalState: 'working',
    sourceClaimState: 'active',
    sourceResearchRole: 'stress_test_protocol',
    sourceEvidenceLevel: 'E0',
    sourceLifecycleStatus: 'approved_for_web_adaptation',
    sourceVisibility: 'public',
    importApproval: 'approved_for_web_adaptation',
    webDestination: '/goliaf/what-may-be-shared',
    provenanceType: 'adapted_repository_import',
    substantiveAdaptationAllowed: false,
    sourceReviewStatus: 'verified',
    sourceReviewNote: 'Taxonomy of shareable coordination parameters versus non-compensable individual constraints.',
    webAdaptationNote: 'Structured for web reading with mandatory non-product boundary panel.',
  },

  // ─── 5. Legacy Excluded Material (Tracked for Governance Integrity) ────────
  'legacy-week1-journal-corpus': {
    sourceArtifactId: 'DC2SC-LEGACY-W1',
    sourceArtifactTitle: 'Legacy Week 1 Journal Previews Corpus',
    sourceVersion: '0.1-prefreeze',
    sourcePath: 'Not specified in source artifact',
    sourceClass: 'legacy_source_corpus',
    sourceCanonicalState: 'superseded',
    sourceClaimState: 'superseded',
    sourceResearchRole: 'concept',
    sourceEvidenceLevel: 'E0',
    sourceLifecycleStatus: 'paused',
    sourceVisibility: 'internal',
    importApproval: 'internal_only',
    substantiveAdaptationAllowed: false,
    sourceReviewStatus: 'verified',
    sourceReviewNote: 'Pre-freeze derived preview essays quarantined under Week 2 canonical separation. Excluded from public import.',
    webAdaptationNote: 'Not displayed publicly.',
  },
};