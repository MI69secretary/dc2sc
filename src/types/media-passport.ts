/**
 * DC2SC Media Passport Types — Constitutional Epistemic & Authority System
 * 
 * Separates 5 orthogonal axes:
 * 1. Epistemic Basis: What kind of knowledge supports this visual?
 * 2. Representation Role: What role does this visual play in the argument?
 * 3. Provenance Mode: Where did this visual originate from?
 * 4. Artifact Role: What specific media component/primitive is used?
 * 5. Authority: Does this visual define canonical truth or explain/contrast it?
 */

export type EpistemicBasis =
  | 'conceptual'
  | 'analytical'
  | 'empirical'
  | 'methodological'
  | 'editorial_context';

export type RepresentationRole =
  | 'structural_model'
  | 'distinction_matrix'
  | 'argument_contrast'
  | 'workflow_scenario'
  | 'empirical_metric'
  | 'literature_adaptation'
  | 'red_team_challenge'
  | 'failure_analysis'
  | 'constitutional_boundary'
  | 'reader_prompt'
  | 'research_handoff';

export type ProvenanceMode =
  | 'canonical_direct'
  | 'canonical_derived'
  | 'literature_adapted'
  | 'data_derived'
  | 'editorial_original';

export type ArtifactRole =
  | 'diagram'
  | 'table'
  | 'matrix'
  | 'timeline'
  | 'chart'
  | 'callout'
  | 'prompt'
  | 'image';

export type MediaAuthority =
  | 'canonical'
  | 'derived_noncanonical'
  | 'historical_contrast';

export type EvidenceLevel =
  | 'E0'
  | 'E1'
  | 'E2'
  | 'E3'
  | 'E4'
  | 'E5';

export type ClaimState =
  | 'active'
  | 'provisional'
  | 'superseded'
  | 'rejected'
  | 'quarantined';

export type PassportReviewStatus =
  | 'draft'
  | 'in_review'
  | 'reviewed'
  | 'frozen'
  | 'deprecated';

export interface AccessibleEquiv {
  summary: string;
  textSequence?: string[];
  fallbackTable?: { headers: string[]; rows: string[][] };
}

export interface MediaPassport {
  id: string;
  title: string;
  
  // 5 Orthogonal Axes
  epistemicBasis: EpistemicBasis;
  representationRole: RepresentationRole;
  provenanceMode: ProvenanceMode;
  artifactRole: ArtifactRole;
  authority: MediaAuthority;

  // Inherited DC2SC Evidence & Claim System
  evidenceLevel: EvidenceLevel;
  claimState: ClaimState;
  reviewStatus: PassportReviewStatus;

  // Canonical Tracing
  canonicalRefs: string[]; // required for canonical & derived_noncanonical

  // Accessibility Contract
  altText: string;
  accessibleEquiv?: AccessibleEquiv;

  // Scope & Boundary Disclosures
  scopeLimit: string;
  caption?: string;
  methodNote?: string;

  // Provenance & Empirical Detail (Conditional)
  sourceReference?: string;
  sourceVersion?: string;
  license?: string;
  dataMethod?: string;
  sampleScope?: string;
  datasetUrl?: string;
  historicalContext?: string; // required if claimState is superseded/rejected
}

export interface TensionMatrixItem {
  dimension: string;
  leftValue: string;
  rightValue: string;
}

export interface ArgumentTableColumn {
  header: string;
  key: string;
}

export interface ArgumentTableData {
  title?: string;
  columns: ArgumentTableColumn[];
  rows: Record<string, string>[];
  note?: string;
}

export interface ScenarioStep {
  step: string;
  title: string;
  description: string;
}