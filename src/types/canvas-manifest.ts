import type { MediaPassport, EvidenceLevel, MediaAuthority } from './media-passport';

export type CanvasStatus =
  | 'planned'
  | 'scaffolded'
  | 'in_review'
  | 'approved'
  | 'deprecated';

export type CanvasVisibility = 'internal' | 'public';

export interface CanvasProposition {
  id: string;
  statement: string;
  canonicalRefs: string[];
  kind: 'canon_restatement' | 'interface_orientation';
  notes?: string;
}

export interface CanvasSection {
  id: string;
  title: string;
  sectionRole: string;
  propositionIds: string[];
  mediaPassportIds: string[];
}

export interface ModuleCanvasManifest {
  moduleId: string;
  moduleNumber: string;
  title: string;
  subtitle: string;
  authority: MediaAuthority;
  canvasStatus: CanvasStatus;
  visibility: CanvasVisibility;
  indexable: boolean;
  includeInSitemap: boolean;
  includeInRss: boolean;
  canonicalRefs: string[];
  evidenceLevel: EvidenceLevel;
  propositions: CanvasProposition[];
  sections: CanvasSection[];
  passports: Record<string, MediaPassport>;
  limitations: string[];
  whatThisDoesNotEstablish: string[];
  downstreamHandoff?: {
    question: string;
    targetModuleId: string;
    targetModuleTitle: string;
    passportId?: string;
  };
}