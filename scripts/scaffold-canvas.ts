/**
 * DC2SC Canvas Scaffold Generator (Phase 3B.1)
 * 
 * Generates an isolated, non-routable canvas scaffold for a given module.
 * Defaults strictly to internal visibility, non-indexable, derived_noncanonical authority.
 */

import type { ModuleCanvasManifest } from '../src/types/canvas-manifest';

export function createDefaultScaffold(
  moduleNumber: string,
  moduleId: string,
  title: string,
  subtitle: string
): ModuleCanvasManifest {
  return {
    moduleId,
    moduleNumber,
    title,
    subtitle,
    authority: 'derived_noncanonical',
    canvasStatus: 'scaffolded',
    visibility: 'internal',
    indexable: false,
    includeInSitemap: false,
    includeInRss: false,
    canonicalRefs: [moduleId],
    evidenceLevel: 'E0',
    limitations: [
      'Scaffolded internal canvas outline — not reviewed for public editorial release.'
    ],
    whatThisDoesNotEstablish: [
      'Does not constitute empirical validation or field evidence.'
    ],
    propositions: [
      {
        id: `M${parseInt(moduleNumber, 10)}-P01`,
        statement: `Initial scaffolded proposition for ${title}.`,
        canonicalRefs: [moduleId],
        kind: 'canon_restatement',
      },
    ],
    sections: [
      {
        id: 'sec-overview',
        title: 'Module Overview',
        sectionRole: 'structural_model',
        propositionIds: [`M${parseInt(moduleNumber, 10)}-P01`],
        mediaPassportIds: [`M${moduleNumber}-FIG-01`],
      },
    ],
    passports: {
      overview: {
        id: `M${moduleNumber}-FIG-01`,
        title: `${title} Conceptual Overview`,
        epistemicBasis: 'conceptual',
        representationRole: 'structural_model',
        provenanceMode: 'canonical_derived',
        artifactRole: 'diagram',
        authority: 'derived_noncanonical',
        evidenceLevel: 'E0',
        claimState: 'provisional',
        reviewStatus: 'draft',
        canonicalRefs: [moduleId],
        altText: `Scaffolded diagram outline for ${title} awaiting structural review.`,
        accessibleEquiv: {
          summary: `Conceptual outline diagram for ${title}.`,
        },
        scopeLimit: 'Internal scaffold. Does not establish market mechanism validity.',
        sourceReference: `DC2SC Module ${moduleNumber}`,
        sourceVersion: '0.1-scaffold',
      },
    },
  };
}
