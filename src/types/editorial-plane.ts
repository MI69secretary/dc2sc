/**
 * DC2SC Editorial Plane & Research Asset Registry Types (Phase 3B.2)
 */

import type { EpistemicBasis, RepresentationRole, ProvenanceMode, ArtifactRole, MediaAuthority, EvidenceLevel, ClaimState } from './media-passport';

export type WebsiteDisplayPermission =
  | 'metadata_only'
  | 'link_to_official_source'
  | 'host_public_pdf'
  | 'internal_only';

export type StoragePermission = 'verified' | 'pending' | 'not_permitted';
export type AccessPermission = 'public_link' | 'licensed' | 'internal_reference' | 'unknown';
export type PermissionFlag = 'yes' | 'no' | 'verify';
export type SourceVerificationStatus = 'unreviewed' | 'metadata_verified' | 'source_verified' | 'restricted';

export interface SourceAuthorRef {
  authorId: string;
  displayName: string;
  role: 'author' | 'editor' | 'translator' | 'contributor';
}

export interface SourceDocumentRecord {
  sourceId: string;
  title: string;
  shortTitle?: string;
  sourceType: 'journal_article' | 'working_paper' | 'book_chapter' | 'monograph' | 'institutional_report' | 'legal_statute' | 'dataset_documentation';
  documentFormat: 'pdf' | 'html' | 'print' | 'dataset' | 'other';
  authors: SourceAuthorRef[];
  publishedYear?: number;
  publisher?: string;
  journalOrSeries?: string;
  doi?: string;
  officialUrl?: string;
  localDocument?: {
    storageMode: 'none' | 'link_only' | 'internal_file' | 'public_file';
    file?: string;
    originalFilename?: string;
    fileHash?: string;
    importDate?: string;
  };
  rights: {
    access: AccessPermission;
    storagePermission: StoragePermission;
    websiteDisplayPermission: WebsiteDisplayPermission;
    citationPermission: PermissionFlag;
    excerptPermission: PermissionFlag;
    rightsNote?: string;
  };
  verificationStatus: SourceVerificationStatus;
  evidenceLevel: EvidenceLevel;
  sourceStatus: string;
  topicTags: string[];
  geography?: string[];
  period?: { start?: string; end?: string };
  method?: { type: string; summary: string };
  findings?: { findingId: string; statement: string; evidenceScope: string; transferability: string }[];
  limitations: string[];
  relatedResearch: string[];
  relatedMedia: string[];
  citation?: { apa?: string; bibtex?: string };
  publicVisibility: 'reference_only' | 'public_profile' | 'internal';
  indexable: boolean;
}

export interface AuthorRecord {
  authorId: string;
  displayName: string;
  slug: string;
  roles: ('research_program' | 'principal_investigator' | 'researcher' | 'editorial_contributor' | 'external_scholar')[];
  bio?: string;
  avatar?: string;
  website?: string;
  social?: {
    x?: string;
    bluesky?: string;
    linkedin?: string;
    github?: string;
  };
  visibility: 'public' | 'reference_only' | 'internal';
  verificationStatus: 'self_managed' | 'verified_contributor' | 'external_reference';
  relatedArtifacts: string[];
}

export interface ExternalEditionRecord {
  editionId: string;
  artifactId: string;
  platform: 'medium' | 'substack' | 'x' | 'bluesky' | 'linkedin' | 'website';
  status: 'not_linked' | 'draft' | 'published' | 'archived';
  url?: string;
  canonicalUrl?: string;
  titleAtPublication?: string;
  publishedAt?: string;
  authorId?: string;
  notes?: string;
}

export interface EditorialBriefRecord {
  briefId: string;
  targetArtifactId: string;
  targetModule: string;
  status: 'planned' | 'drafting' | 'review' | 'approved' | 'rejected' | 'archived';
  primaryReader: string;
  readerProblem: string;
  canonicalDependencies: string[];
  sourceCorpus: string[];
  propositionLedger: string[];
  mediaPlan: string[];
  rightsDependencies: string[];
  representationDependencies: string[];
  outsideOptionDependencies: string[];
  prohibitedInterpretations: string[];
  claimBoundary: string;
  handoff: string;
  visibility: 'internal';
}

export interface EditorialReviewRecord {
  reviewId: string;
  artifactId: string;
  reviewType: 'canonical_audit' | 'media_constitution_review' | 'rights_check' | 'accessibility_audit' | 'editorial_release';
  reviewer: string;
  reviewDate: string;
  result: 'pass' | 'revise' | 'hold' | 'reject';
  findings: string;
  requiredChanges?: string[];
  evidenceReview?: string;
  rightsReview?: string;
  provenanceReview?: string;
  accessibilityReview?: string;
  publicationAuthority: 'none';
  visibility: 'internal';
}

export interface TableMatrixRecord {
  tableId: string;
  title: string;
  kind: 'argument_table' | 'tension_matrix' | 'comparison_matrix' | 'data_table';
  columns: { key: string; label: string; description?: string }[];
  rows: { rowId: string; cells: Record<string, string> }[];
  caption?: string;
  scopeLimits: string[];
  limitations: string[];
  canonicalRefs: string[];
  sourceRefs: string[];
  accessibility: {
    textEquivalent: string;
    dataTableFallback: boolean;
  };
}

export interface ChartConfigurationRecord {
  chartId: string;
  title: string;
  chartType: 'bar' | 'line' | 'scatter' | 'matrix_grid' | 'flow';
  datasetRefs: string[];
  dataSource?: string;
  derivation?: string;
  empiricalContext?: string;
  methodology?: string;
  dataTableFallback?: {
    headers: string[];
    rows: string[][];
  };
  scopeLimits: string[];
  limitations: string[];
  epistemicBasis: EpistemicBasis;
  evidenceLevel: EvidenceLevel;
}
