import type { ModuleCanvasManifest } from '../types/canvas-manifest';
import { validateAllMediaPassports } from './validate-media-passport';

export class CanvasManifestValidationError extends Error {
  constructor(message: string) {
    super(`[CanvasManifestValidator] ${message}`);
    this.name = 'CanvasManifestValidationError';
  }
}

export function validateCanvasManifest(manifest: ModuleCanvasManifest): boolean {
  if (!manifest.moduleId || typeof manifest.moduleId !== 'string') {
    throw new CanvasManifestValidationError('Canvas manifest missing moduleId.');
  }

  // 1. Canonical-Authority Prohibition Invariant
  if (manifest.authority !== 'derived_noncanonical') {
    throw new CanvasManifestValidationError(
      `Canvas manifest [${manifest.moduleId}] declared authority: "${manifest.authority}". ` +
      `Canvas manifests are derived compositions and must strictly declare authority: "derived_noncanonical".`
    );
  }

  // 2. Canonical References
  if (!manifest.canonicalRefs || manifest.canonicalRefs.length === 0) {
    throw new CanvasManifestValidationError(
      `Canvas manifest [${manifest.moduleId}] must trace to at least one canonical reference in canonicalRefs.`
    );
  }

  // 3. Status & Visibility Alignment
  if (manifest.visibility === 'public') {
    if (manifest.canvasStatus !== 'approved') {
      throw new CanvasManifestValidationError(
        `Canvas manifest [${manifest.moduleId}] cannot be public while canvasStatus is "${manifest.canvasStatus}". ` +
        `Only explicitly "approved" canvases are eligible for public visibility.`
      );
    }
    if (!manifest.indexable) {
      throw new CanvasManifestValidationError(
        `Public canvas manifest [${manifest.moduleId}] should have indexable: true for search alignment.`
      );
    }
  } else {
    // Internal scaffold or in-review canvas
    if (manifest.indexable || manifest.includeInSitemap || manifest.includeInRss) {
      throw new CanvasManifestValidationError(
        `Internal canvas manifest [${manifest.moduleId}] must have indexable: false, includeInSitemap: false, and includeInRss: false.`
      );
    }
  }

  // 4. Proposition Validation
  if (!manifest.propositions || manifest.propositions.length === 0) {
    throw new CanvasManifestValidationError(`Canvas manifest [${manifest.moduleId}] has no propositions defined.`);
  }

  for (const prop of manifest.propositions) {
    if (!prop.id || !prop.statement) {
      throw new CanvasManifestValidationError(`Canvas proposition in [${manifest.moduleId}] is missing id or statement.`);
    }
    if (prop.kind === 'canon_restatement') {
      if (!prop.canonicalRefs || prop.canonicalRefs.length === 0) {
        throw new CanvasManifestValidationError(
          `Canon restatement proposition [${prop.id}] in [${manifest.moduleId}] must specify canonicalRefs.`
        );
      }
    }
  }

  // 5. Media Passports Validation & Completeness
  const passportList = Object.values(manifest.passports || {});
  if (passportList.length === 0) {
    throw new CanvasManifestValidationError(`Canvas manifest [${manifest.moduleId}] has no media passports defined.`);
  }

  validateAllMediaPassports(passportList);

  // Check section references
  for (const sec of manifest.sections || []) {
    for (const pId of sec.mediaPassportIds || []) {
      if (!manifest.passports[pId] && !passportList.some(p => p.id === pId)) {
        throw new CanvasManifestValidationError(
          `Section [${sec.id}] references unknown media passport ID: "${pId}".`
        );
      }
    }
  }

  return true;
}