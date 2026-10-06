/**
 * DC2SC Editorial Plane & Asset Registry Validator (Phase 3B.2)
 * 
 * Constitutional Guardrails:
 * "Build-time validators enforce declared structural, provenance, accessibility and
 * visibility requirements. They do not independently establish that a source is true,
 * a legal permission is sufficient, or an empirical interpretation is correct."
 */

import type { SourceDocumentRecord, AuthorRecord, ExternalEditionRecord } from '../types/editorial-plane';

export class EditorialPlaneValidationError extends Error {
  constructor(message: string) {
    super(`[EditorialPlaneValidator] ${message}`);
    this.name = 'EditorialPlaneValidationError';
  }
}

export function validateSourceDocument(source: SourceDocumentRecord): boolean {
  if (!source.sourceId || typeof source.sourceId !== 'string' || source.sourceId.trim() === '') {
    throw new EditorialPlaneValidationError('Source document record missing valid sourceId.');
  }

  if (!source.title || source.title.trim() === '') {
    throw new EditorialPlaneValidationError(`Source [${source.sourceId}] missing required title.`);
  }

  // PDF Public Display Gate
  if (source.rights?.websiteDisplayPermission === 'host_public_pdf') {
    if (source.rights.storagePermission !== 'verified') {
      throw new EditorialPlaneValidationError(
        `Source [${source.sourceId}] cannot declare websiteDisplayPermission: "host_public_pdf" while storagePermission is "${source.rights.storagePermission}". Explicit verified storage permission is strictly required to host PDFs.`
      );
    }
    if (!source.localDocument?.file || source.localDocument.file.trim() === '') {
      throw new EditorialPlaneValidationError(
        `Source [${source.sourceId}] declared websiteDisplayPermission: "host_public_pdf" but no localDocument.file is specified.`
      );
    }
  }

  // Official Link Requirement
  if (source.rights?.websiteDisplayPermission === 'link_to_official_source') {
    if (!source.officialUrl && !source.doi) {
      throw new EditorialPlaneValidationError(
        `Source [${source.sourceId}] declared websiteDisplayPermission: "link_to_official_source" but neither officialUrl nor doi is provided.`
      );
    }
  }

  return true;
}

export function validateAuthorRecord(author: AuthorRecord): boolean {
  if (!author.authorId || typeof author.authorId !== 'string' || author.authorId.trim() === '') {
    throw new EditorialPlaneValidationError('Author record missing valid authorId.');
  }

  if (!author.displayName || author.displayName.trim() === '') {
    throw new EditorialPlaneValidationError(`Author [${author.authorId}] missing displayName.`);
  }

  if (!author.slug || author.slug.trim() === '') {
    throw new EditorialPlaneValidationError(`Author [${author.authorId}] missing slug.`);
  }

  return true;
}

export function validateExternalEdition(edition: ExternalEditionRecord): boolean {
  if (!edition.editionId || typeof edition.editionId !== 'string') {
    throw new EditorialPlaneValidationError('External edition missing editionId.');
  }

  if (edition.status === 'published') {
    if (!edition.url || (!edition.url.startsWith('http://') && !edition.url.startsWith('https://'))) {
      throw new EditorialPlaneValidationError(
        `External edition [${edition.editionId}] is marked "published" but does not contain a valid absolute URL.`
      );
    }
  }

  return true;
}

export interface FixtureIsolationCheck {
  id?: string;
  isFixture?: boolean;
  indexable?: boolean;
  visibility?: string;
  publicVisibility?: string;
  publicationAuthority?: string;
}

export function validateFixtureIsolation(entity: FixtureIsolationCheck): boolean {
  if (entity.isFixture) {
    if (entity.indexable === true) {
      throw new EditorialPlaneValidationError(
        `Demonstration fixture [${entity.id || 'unknown'}] cannot be indexable in search (must have indexable: false).`
      );
    }
    if (entity.visibility === 'public' || entity.publicVisibility === 'public_profile') {
      throw new EditorialPlaneValidationError(
        `Demonstration fixture [${entity.id || 'unknown'}] cannot declare public visibility (must be "internal" or "reference_only").`
      );
    }
    if (entity.publicationAuthority && entity.publicationAuthority !== 'none') {
      throw new EditorialPlaneValidationError(
        `Demonstration fixture [${entity.id || 'unknown'}] cannot declare publicationAuthority: "${entity.publicationAuthority}" (must be "none").`
      );
    }
  }
  return true;
}

export function validateAllEditorialPlaneEntities(params: {
  sources?: (SourceDocumentRecord & FixtureIsolationCheck)[];
  authors?: (AuthorRecord & FixtureIsolationCheck)[];
  externalEditions?: (ExternalEditionRecord & FixtureIsolationCheck)[];
  fixtures?: FixtureIsolationCheck[];
}): boolean {
  const seenIds = new Set<string>();

  for (const src of params.sources || []) {
    if (seenIds.has(src.sourceId)) {
      throw new EditorialPlaneValidationError(`Duplicate entity ID detected in sources: "${src.sourceId}".`);
    }
    seenIds.add(src.sourceId);
    validateSourceDocument(src);
    validateFixtureIsolation({ ...src, id: src.sourceId });
  }

  for (const auth of params.authors || []) {
    if (seenIds.has(auth.authorId)) {
      throw new EditorialPlaneValidationError(`Duplicate entity ID detected in authors: "${auth.authorId}".`);
    }
    seenIds.add(auth.authorId);
    validateAuthorRecord(auth);
    validateFixtureIsolation({ ...auth, id: auth.authorId });
  }

  for (const ed of params.externalEditions || []) {
    if (seenIds.has(ed.editionId)) {
      throw new EditorialPlaneValidationError(`Duplicate entity ID detected in external editions: "${ed.editionId}".`);
    }
    seenIds.add(ed.editionId);
    validateExternalEdition(ed);
    validateFixtureIsolation({ ...ed, id: ed.editionId });
  }

  for (const fix of params.fixtures || []) {
    validateFixtureIsolation(fix);
  }

  return true;
}
