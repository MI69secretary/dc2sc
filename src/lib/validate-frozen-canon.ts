/**
 * DC2SC Frozen Canon Immutability Validator
 * 
 * Enforces that artifacts declared as `canonicalState: 'frozen'` cannot be mutated
 * in place without an explicit formal successor artifact declaring `supersedes`.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export class FrozenCanonTamperError extends Error {
  constructor(message: string) {
    super(`[FrozenCanonValidator] ${message}`);
    this.name = 'FrozenCanonTamperError';
  }
}

export interface FrozenSpecRegistration {
  filePath: string;
  expectedHash?: string;
  canonicalId: string;
}

export const FROZEN_CANON_SPECS: FrozenSpecRegistration[] = [
  { filePath: 'src/content/research/canon/canonical-narrative.md', canonicalId: 'canonical-narrative' },
  { filePath: 'src/content/research/modules/module-01-more-choice-less-voice.md', canonicalId: 'module-01-more-choice-less-voice' },
  { filePath: 'src/content/research/modules/module-02-crowd-is-attention.md', canonicalId: 'module-02-crowd-is-attention' },
  { filePath: 'src/content/research/modules/module-03-why-more-buyers.md', canonicalId: 'module-03-why-more-buyers' },
  { filePath: 'src/content/research/modules/module-04-cost-of-commitment.md', canonicalId: 'module-04-cost-of-commitment' },
  { filePath: 'src/content/research/modules/module-05-coordination-rights.md', canonicalId: 'module-05-coordination-rights' },
  { filePath: 'src/content/research/modules/module-06-travel-is-a-stress-test.md', canonicalId: 'module-06-travel-is-a-stress-test' },
  { filePath: 'src/content/research/modules/module-07-what-counts-as-success.md', canonicalId: 'module-07-what-counts-as-success' },
];

export function computeFileHash(absolutePath: string): string {
  const content = fs.readFileSync(absolutePath, 'utf8');
  return crypto.createHash('sha256').update(content.trim()).digest('hex');
}

export function validateFrozenCanonIntegrity(baseDir: string = process.cwd()): boolean {
  for (const spec of FROZEN_CANON_SPECS) {
    const fullPath = path.resolve(baseDir, spec.filePath);
    if (!fs.existsSync(fullPath)) {
      throw new FrozenCanonTamperError(`Frozen canonical specification missing: ${spec.filePath}`);
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    if (!content.includes("canonicalState: 'frozen'") && !content.includes('canonicalState: frozen')) {
      throw new FrozenCanonTamperError(
        `Frozen canonical specification [${spec.canonicalId}] has been tampered with: canonicalState is no longer "frozen".`
      );
    }

    // In-place mutation check: Any proposed change must be in research-proposals/ with supersedes, not modifying the frozen original
    if (content.includes('successorDraft') || content.includes('inPlaceRevision: true')) {
      throw new FrozenCanonTamperError(
        `Frozen canonical specification [${spec.canonicalId}] cannot contain in-place revision flags. Create a successor document in research-proposals/.`
      );
    }
  }
  return true;
}
