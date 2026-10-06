import { repositorySourceManifest } from '../data/repository-source-manifest';

export interface ValidatableItem {
  id: string;
  collection: 'research' | 'goliaf' | 'journal';
  data: {
    title: string;
    contentKind: string;
    canonicalState: string;
    lifecycleStatus: string;
    visibility: string;
    claimState: string;
    researchRole: string;
    evidenceLevel: string;
    indexable: boolean;
    includeInRss: boolean;
    sourceArtifactId?: string;
    webAdaptationNotes?: string;
    goliafBoundary?: string;
  };
}

export function validateProvenance(items: ValidatableItem[]): void {
  for (const item of items) {
    const isPublic = item.data.visibility === 'public';
    const isPaused = item.data.lifecycleStatus === 'paused';

    if (item.collection === 'journal' && isPublic && isPaused) {
      throw new Error(`[Provenance Validator Error] Public journal item "${item.id}" cannot be in paused status.`);
    }

    if (item.data.includeInRss && (item.data.contentKind === 'canonical_module' || item.data.contentKind === 'canonical_reference' || item.data.contentKind === 'research_spec' || item.data.contentKind === 'goliaf_artifact')) {
      throw new Error(`[Provenance Validator Error] Canonical/Spec item "${item.id}" must NOT have includeInRss: true.`);
    }

    if (isPublic && (item.collection === 'research' || item.collection === 'goliaf')) {
      const manifestEntry = repositorySourceManifest[item.id];
      if (!manifestEntry) {
        throw new Error(`[Provenance Validator Error] Public item "${item.id}" in collection "${item.collection}" missing from repositorySourceManifest.`);
      }

      if (
        manifestEntry.importApproval !== 'approved_for_public_reference' &&
        manifestEntry.importApproval !== 'approved_for_web_adaptation'
      ) {
        throw new Error(`[Provenance Validator Error] Item "${item.id}" has unauthorized importApproval: "${manifestEntry.importApproval}".`);
      }

      if (!manifestEntry.sourceEvidenceLevel) {
        throw new Error(`[Provenance Validator Error] Item "${item.id}" missing sourceEvidenceLevel in manifest.`);
      }

      if (!manifestEntry.webAdaptationNote && !item.data.webAdaptationNotes) {
        throw new Error(`[Provenance Validator Error] Item "${item.id}" missing webAdaptationNote.`);
      }

      if (
        manifestEntry.sourceClass === 'legacy_source_corpus' ||
        manifestEntry.sourceClass === 'derived_editorial' ||
        manifestEntry.sourceClass === 'internal_operational'
      ) {
        throw new Error(`[Provenance Validator Error] Item "${item.id}" has excluded sourceClass: "${manifestEntry.sourceClass}".`);
      }
    }
  }
}