import type { MediaPassport } from '../types/media-passport';

export class MediaPassportValidationError extends Error {
  constructor(message: string) {
    super(`[MediaPassportValidator] ${message}`);
    this.name = 'MediaPassportValidationError';
  }
}

const VALID_EPISTEMIC_BASES = [
  'conceptual',
  'analytical',
  'empirical',
  'methodological',
  'editorial_context'
];

const VALID_REPRESENTATION_ROLES = [
  'structural_model',
  'distinction_matrix',
  'argument_contrast',
  'workflow_scenario',
  'empirical_metric',
  'literature_adaptation',
  'red_team_challenge',
  'failure_analysis',
  'constitutional_boundary',
  'reader_prompt',
  'research_handoff'
];

const VALID_PROVENANCE_MODES = [
  'canonical_direct',
  'canonical_derived',
  'literature_adapted',
  'data_derived',
  'editorial_original'
];

const VALID_ARTIFACT_ROLES = [
  'diagram',
  'table',
  'matrix',
  'timeline',
  'chart',
  'callout',
  'prompt',
  'image'
];

const VALID_AUTHORITIES = [
  'canonical',
  'derived_noncanonical',
  'historical_contrast'
];

const FORBIDDEN_COMMERCIAL_TERMS = [
  'booking',
  'supplier-registration',
  'supplier registration',
  'waitlist',
  'membership',
  'live-pool',
  'live pool',
  'buy now',
  'order now',
  'checkout',
  'pricing tier',
  'sales inquiry',
  'early access'
];

export function validateMediaPassport(passport: MediaPassport): boolean {
  if (!passport.id || typeof passport.id !== 'string' || passport.id.trim() === '') {
    throw new MediaPassportValidationError('Media block is missing a valid id.');
  }

  // 1. 5-Axis Ontology Validation
  if (!passport.epistemicBasis || !VALID_EPISTEMIC_BASES.includes(passport.epistemicBasis)) {
    throw new MediaPassportValidationError(`Media block [${passport.id}] has invalid epistemicBasis: "${passport.epistemicBasis}".`);
  }

  if (!passport.representationRole || !VALID_REPRESENTATION_ROLES.includes(passport.representationRole)) {
    throw new MediaPassportValidationError(`Media block [${passport.id}] has invalid representationRole: "${passport.representationRole}".`);
  }

  if (!passport.provenanceMode || !VALID_PROVENANCE_MODES.includes(passport.provenanceMode)) {
    throw new MediaPassportValidationError(`Media block [${passport.id}] has invalid provenanceMode: "${passport.provenanceMode}".`);
  }

  if (!passport.artifactRole || !VALID_ARTIFACT_ROLES.includes(passport.artifactRole)) {
    throw new MediaPassportValidationError(`Media block [${passport.id}] has invalid artifactRole: "${passport.artifactRole}".`);
  }

  if (!passport.authority || !VALID_AUTHORITIES.includes(passport.authority)) {
    throw new MediaPassportValidationError(`Media block [${passport.id}] has invalid authority: "${passport.authority}".`);
  }

  // 2. Canonical Authority Invariant
  if (passport.authority === 'canonical') {
    if (!passport.canonicalRefs || passport.canonicalRefs.length === 0) {
      throw new MediaPassportValidationError(`Canonical media block [${passport.id}] must reference at least one frozen canonical specification (canonicalRefs is empty).`);
    }
    if (passport.provenanceMode !== 'canonical_direct') {
      throw new MediaPassportValidationError(`Canonical media block [${passport.id}] cannot have derived provenanceMode ("${passport.provenanceMode}"). Derived visual interpretations must declare authority: "derived_noncanonical".`);
    }
  }

  if (passport.authority === 'derived_noncanonical') {
    if (!passport.canonicalRefs || passport.canonicalRefs.length === 0) {
      throw new MediaPassportValidationError(`Derived media block [${passport.id}] must trace to at least one canonical reference (canonicalRefs is empty).`);
    }
  }

  // 3. Historical / Superseded Claim State Invariant
  if (passport.claimState === 'superseded' || passport.claimState === 'rejected') {
    if (passport.authority !== 'historical_contrast' || !passport.historicalContext) {
      throw new MediaPassportValidationError(`Media block [${passport.id}] with claimState "${passport.claimState}" must declare authority: "historical_contrast" and provide historicalContext.`);
    }
  }

  // 4. Empirical Data Review Invariant
  if (passport.epistemicBasis === 'empirical') {
    if (!passport.dataMethod || passport.dataMethod.trim() === '') {
      throw new MediaPassportValidationError(`EMPIRICAL media block [${passport.id}] must specify dataMethod.`);
    }
    const validEmpiricalLevels = ['E3', 'E4', 'E5'];
    if (!validEmpiricalLevels.includes(passport.evidenceLevel)) {
      throw new MediaPassportValidationError(`EMPIRICAL media block [${passport.id}] cannot declare Level ${passport.evidenceLevel}. Empirical metrics require Level E3, E4, or E5.`);
    }
    if (passport.reviewStatus !== 'reviewed' && passport.reviewStatus !== 'frozen') {
      throw new MediaPassportValidationError(`EMPIRICAL media block [${passport.id}] must have reviewStatus === "reviewed" or "frozen".`);
    }
  }

  // 5. Accessibility Contract
  if (!passport.altText || passport.altText.trim().length < 15) {
    throw new MediaPassportValidationError(`Media block [${passport.id}] altText is too short or missing (minimum 15 descriptive characters required).`);
  }

  const complexArtifacts = ['diagram', 'matrix', 'timeline', 'chart'];
  if (complexArtifacts.includes(passport.artifactRole) && !passport.accessibleEquiv) {
    throw new MediaPassportValidationError(`Complex visual block [${passport.id}] (${passport.artifactRole}) requires an accessibleEquiv structure (text equivalent or summary table).`);
  }

  // 6. Scope Limit
  if (!passport.scopeLimit || passport.scopeLimit.trim() === '') {
    throw new MediaPassportValidationError(`Media block [${passport.id}] is missing required scopeLimit.`);
  }

  // 7. Commercial Language Blocker
  const serialized = `${passport.id} ${passport.title || ''} ${passport.altText} ${passport.caption || ''} ${passport.scopeLimit || ''} ${passport.methodNote || ''} ${passport.sourceReference || ''}`.toLowerCase();
  for (const term of FORBIDDEN_COMMERCIAL_TERMS) {
    if (serialized.includes(term)) {
      throw new MediaPassportValidationError(`Media block [${passport.id}] contains forbidden commercial or lead-generation term: "${term}".`);
    }
  }

  return true;
}

export function validateAllMediaPassports(passports: MediaPassport[]): boolean {
  const seenIds = new Set<string>();

  for (const p of passports) {
    if (seenIds.has(p.id)) {
      throw new MediaPassportValidationError(`Duplicate media passport ID detected: "${p.id}". Global ID uniqueness is strictly required.`);
    }
    seenIds.add(p.id);
    validateMediaPassport(p);
  }
  return true;
}