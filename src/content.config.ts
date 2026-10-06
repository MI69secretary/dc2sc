import { defineCollection, z } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';

// ─── Shared Enum Schemas (Phase 2.1 Explicit Separation) ───────────────────

export const contentKindSchema = z.enum([
  'canonical_reference',
  'canonical_module',
  'research_spec',
  'editorial_preview',
  'editorial_article',
  'goliaf_artifact',
  'announcement',
  'demo_discussion',
]);

export const lifecycleStatusSchema = z.enum([
  'concept',
  'conceptual_preview',
  'draft',
  'in_review',
  'approved_for_dev',
  'published',
  'paused',
  'archived',
]);

export const canonicalStateSchema = z.enum([
  'none',
  'provisional',
  'working',
  'frozen',
  'superseded',
]);

export const visibilitySchema = z.enum([
  'internal',
  'unlisted',
  'public_preview',
  'public',
]);

export const claimStateSchema = z.enum([
  'active',
  'superseded',
  'rejected',
]);

export const researchRoleSchema = z.enum([
  'concept',
  'hypothesis',
  'analytical_framework',
  'stress_test_protocol',
  'empirical_result',
  'none',
]);

const evidenceLevelSchema = z.enum(['E0', 'E1', 'E2', 'E3', 'E4', 'E5']);

const claimLevelSchema = z.enum([
  'CONCEPT',
  'HYPOTHESIS',
  'THEORETICAL_SUPPORT',
  'INTERNAL_OBSERVATION',
  'EXTERNAL_EMPIRICAL_EVIDENCE',
  'PREREGISTERED_FIELD_EVIDENCE',
  'REPLICATED_EVIDENCE',
]);

// ─── Collection: journal ───────────────────────────────────────────────────

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    contentKind: contentKindSchema.default('editorial_preview'),
    lifecycleStatus: lifecycleStatusSchema.default('paused'),
    canonicalState: canonicalStateSchema.default('none'),
    visibility: visibilitySchema.default('internal'),
    claimState: claimStateSchema.default('active'),
    researchRole: researchRoleSchema.default('concept'),
    indexable: z.boolean().default(false),
    includeInSitemap: z.boolean().default(false),
    includeInRss: z.boolean().default(false),
    status: lifecycleStatusSchema.optional(),
    isDemo: z.boolean().default(true),
    claimLevel: claimLevelSchema.default('CONCEPT'),
    evidenceLevel: evidenceLevelSchema.default('E0'),
    canonicalModules: z.array(z.number()).optional(),
    topics: z.array(z.string()).default([]),
    researchQuestions: z.array(z.string()).optional(),
    hypotheses: z.array(z.string()).optional(),
    failureConditions: z.array(z.string()).optional(),
    rightsDependencies: z.array(z.string()).optional(),
    outsideOptionDependency: z.boolean().optional(),
    representationDependency: z.boolean().optional(),
    goliafBoundary: z.string().optional(),
    whatThisDoesNotClaim: z.array(z.string()).default([]),
    featured: z.boolean().optional(),
    heroVariant: z.enum(['signal', 'diagram', 'editorial', 'map']).optional(),
    externalPublications: z
      .object({
        medium: z.object({ status: z.enum(['not_linked', 'draft', 'published']), url: z.string().optional() }).optional(),
        substack: z.object({ status: z.enum(['not_linked', 'draft', 'published']), url: z.string().optional() }).optional(),
      })
      .optional(),
  }),
});

// ─── Collection: research ─────────────────────────────────────────────────

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    contentKind: contentKindSchema.default('canonical_module'),
    lifecycleStatus: lifecycleStatusSchema.default('approved_for_dev'),
    canonicalState: canonicalStateSchema.default('none'),
    visibility: visibilitySchema.default('public'),
    claimState: claimStateSchema.default('active'),
    researchRole: researchRoleSchema.default('analytical_framework'),
    indexable: z.boolean().default(true),
    includeInSitemap: z.boolean().default(true),
    includeInRss: z.boolean().default(false),
    status: lifecycleStatusSchema.optional(),
    isDemo: z.boolean().default(false),
    moduleNumber: z.number().optional(),
    evidenceLevel: evidenceLevelSchema.default('E0'),
    claimStatus: z.string().default('CONCEPT — canonical architecture'),
    scope: z.string(),
    limitations: z.array(z.string()).default([]),
    researchQuestions: z.array(z.string()).optional(),
    hypotheses: z.array(z.string()).optional(),
    failureRecords: z.array(z.string()).optional(),
    relatedArtifacts: z.array(z.string()).optional(),
    upstreamDependencies: z.array(z.string()).optional(),
    dependencies: z.array(z.string()).optional(),
    downstreamHandoff: z.string().optional(),
    supersedes: z.array(z.string()).optional(),
    supersededBy: z.array(z.string()).optional(),
    whatThisDoesNotEstablish: z.array(z.string()).optional(),
    // Phase 3A Provenance fields
    sourceOfTruth: z.string().default('DC2SC research repository'),
    sourceArtifactId: z.string().optional(),
    sourceArtifactTitle: z.string().optional(),
    sourceVersion: z.string().optional(),
    sourceCanonicalState: canonicalStateSchema.optional(),
    sourceEvidenceLevel: evidenceLevelSchema.optional(),
    sourceStatus: z.string().optional(),
    sourcePath: z.string().optional(),
    provenanceType: z.enum(['canonical_import', 'adapted_repository_import', 'reference_summary']).optional(),
    importScope: z.string().optional(),
    webAdaptationNotes: z.string().optional(),
    lastSourceReview: z.string().optional(),
  }),
});

// ─── Collection: goliaf ───────────────────────────────────────────────────

const goliaf = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/goliaf' }),
  schema: z.object({
    title: z.string(),
    contentKind: contentKindSchema.default('goliaf_artifact'),
    lifecycleStatus: lifecycleStatusSchema.default('approved_for_dev'),
    canonicalState: canonicalStateSchema.default('working'),
    visibility: visibilitySchema.default('public'),
    claimState: claimStateSchema.default('active'),
    researchRole: researchRoleSchema.default('stress_test_protocol'),
    indexable: z.boolean().default(true),
    includeInSitemap: z.boolean().default(true),
    includeInRss: z.boolean().default(false),
    status: lifecycleStatusSchema.optional(),
    isDemo: z.boolean().default(false),
    artifactType: z.enum(['research_note', 'decision_map', 'constraint_matrix', 'method_note', 'failure_case', 'conceptual_model']),
    evidenceLevel: evidenceLevelSchema.default('E0'),
    scope: z.string(),
    limitations: z.array(z.string()).default([]),
    relatedModules: z.array(z.number()).default([]),
    relatedArtifacts: z.array(z.string()).optional(),
    goliafBoundary: z.string().optional(),
    // Phase 3A Provenance fields
    sourceOfTruth: z.string().default('DC2SC research repository'),
    sourceArtifactId: z.string().optional(),
    sourceArtifactTitle: z.string().optional(),
    sourceVersion: z.string().optional(),
    sourceCanonicalState: canonicalStateSchema.optional(),
    sourceEvidenceLevel: evidenceLevelSchema.optional(),
    sourceStatus: z.string().optional(),
    sourcePath: z.string().optional(),
    provenanceType: z.enum(['canonical_import', 'adapted_repository_import', 'reference_summary']).optional(),
    importScope: z.string().optional(),
    webAdaptationNotes: z.string().optional(),
    lastSourceReview: z.string().optional(),
  }),
});

// ─── Collection: announcements ────────────────────────────────────────────

const announcements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/announcements' }),
  schema: z.object({
    title: z.string(),
    contentKind: contentKindSchema.default('announcement'),
    lifecycleStatus: lifecycleStatusSchema.default('conceptual_preview'),
    canonicalState: canonicalStateSchema.default('none'),
    visibility: visibilitySchema.default('public_preview'),
    claimState: claimStateSchema.default('active'),
    researchRole: researchRoleSchema.default('concept'),
    indexable: z.boolean().default(false),
    includeInSitemap: z.boolean().default(false),
    includeInRss: z.boolean().default(false),
    type: z.enum(['research_note', 'method_update', 'open_question', 'fieldwork_status', 'publication']),
    status: lifecycleStatusSchema.optional(),
    isDemo: z.boolean().default(true),
    summary: z.string(),
    relatedContent: z.array(z.string()).optional(),
  }),
});

// ─── Collection: discussions (JSON files) ─────────────────────────────────

const discussions = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/discussions' }),
  schema: z.object({
    contentKind: contentKindSchema.default('demo_discussion'),
    lifecycleStatus: lifecycleStatusSchema.default('conceptual_preview'),
    canonicalState: canonicalStateSchema.default('none'),
    visibility: visibilitySchema.default('public_preview'),
    claimState: claimStateSchema.default('active'),
    researchRole: researchRoleSchema.default('concept'),
    indexable: z.boolean().default(false),
    includeInSitemap: z.boolean().default(false),
    includeInRss: z.boolean().default(false),
    status: z.enum(['demo', 'curated', 'archived']).default('demo'),
    isDemo: z.boolean().default(true),
    type: z.enum(['research_question', 'counterexample', 'methodological_objection', 'editorial_note']),
    topic: z.string(),
    body: z.string(),
    source: z.enum(['site', 'manual_editorial_import']),
    sourceUrl: z.string().optional(),
    consentStatus: z.enum(['demo', 'confirmed', 'not_applicable']),
    featured: z.boolean().default(false),
    relatedArtifact: z.string().optional(),
  }),
});

// ─── Collection: sources ───────────────────────────────────────────────────

const sources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sources' }),
  schema: z.object({
    sourceId: z.string(),
    title: z.string(),
    shortTitle: z.string().optional(),
    sourceType: z.enum(['journal_article', 'working_paper', 'book_chapter', 'monograph', 'institutional_report', 'legal_statute', 'dataset_documentation']),
    documentFormat: z.enum(['pdf', 'html', 'print', 'dataset', 'other']).default('pdf'),
    authors: z.array(z.object({
      authorId: z.string(),
      displayName: z.string(),
      role: z.enum(['author', 'editor', 'translator', 'contributor']).default('author'),
    })).default([]),
    publishedYear: z.number().optional(),
    publisher: z.string().optional(),
    journalOrSeries: z.string().optional(),
    doi: z.string().optional(),
    officialUrl: z.string().optional(),
    localDocument: z.object({
      storageMode: z.enum(['none', 'link_only', 'internal_file', 'public_file']).default('none'),
      file: z.string().optional(),
      originalFilename: z.string().optional(),
      fileHash: z.string().optional(),
      importDate: z.string().optional(),
    }).optional(),
    rights: z.object({
      access: z.enum(['public_link', 'licensed', 'internal_reference', 'unknown']).default('unknown'),
      storagePermission: z.enum(['verified', 'pending', 'not_permitted']).default('pending'),
      websiteDisplayPermission: z.enum(['metadata_only', 'link_to_official_source', 'host_public_pdf', 'internal_only']).default('metadata_only'),
      citationPermission: z.enum(['yes', 'no', 'verify']).default('yes'),
      excerptPermission: z.enum(['yes', 'no', 'verify']).default('verify'),
      rightsNote: z.string().optional(),
    }),
    verificationStatus: z.enum(['unreviewed', 'metadata_verified', 'source_verified', 'restricted']).default('unreviewed'),
    evidenceLevel: evidenceLevelSchema.default('E0'),
    sourceStatus: z.string().default('screened'),
    topicTags: z.array(z.string()).default([]),
    geography: z.array(z.string()).optional(),
    period: z.object({ start: z.string().optional(), end: z.string().optional() }).optional(),
    method: z.object({ type: z.string().optional(), summary: z.string().optional() }).optional(),
    findings: z.array(z.object({ findingId: z.string(), statement: z.string(), evidenceScope: z.string(), transferability: z.string() })).optional(),
    limitations: z.array(z.string()).default([]),
    relatedResearch: z.array(z.string()).default([]),
    relatedMedia: z.array(z.string()).default([]),
    citation: z.object({ apa: z.string().optional(), bibtex: z.string().optional() }).optional(),
    publicVisibility: z.enum(['reference_only', 'public_profile', 'internal']).default('reference_only'),
    indexable: z.boolean().default(false),
  }),
});

// ─── Collection: authors ───────────────────────────────────────────────────

const authors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/authors' }),
  schema: z.object({
    authorId: z.string(),
    displayName: z.string(),
    slug: z.string(),
    roles: z.array(z.enum(['research_program', 'principal_investigator', 'researcher', 'editorial_contributor', 'external_scholar'])).default(['editorial_contributor']),
    bio: z.string().optional(),
    avatar: z.string().optional(),
    website: z.string().optional(),
    social: z.object({
      x: z.string().optional(),
      bluesky: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
    }).optional(),
    visibility: z.enum(['public', 'reference_only', 'internal']).default('public'),
    verificationStatus: z.enum(['self_managed', 'verified_contributor', 'external_reference']).default('verified_contributor'),
    relatedArtifacts: z.array(z.string()).default([]),
  }),
});

// ─── Export all collections ───────────────────────────────────────────────

export const collections = {
  // Starlight (existing)
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),

  // Phase 2.1 & Phase 3 content
  journal,
  research,
  goliaf,
  announcements,
  discussions,
  sources,
  authors,
};


