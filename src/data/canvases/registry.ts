import type { ModuleCanvasManifest } from '../../types/canvas-manifest';
import { module01CanvasManifest } from './module-01';
import { validateCanvasManifest } from '../../lib/validate-canvas-manifest';

export const registeredCanvases: Record<string, ModuleCanvasManifest> = {
  'module-01-more-choice-less-voice': module01CanvasManifest,
};

export function getCanvasManifest(moduleId: string): ModuleCanvasManifest | undefined {
  return registeredCanvases[moduleId];
}

export function isCanvasPubliclyEligible(moduleId: string): boolean {
  const manifest = registeredCanvases[moduleId];
  if (!manifest) return false;
  return manifest.visibility === 'public' && manifest.canvasStatus === 'approved';
}

export function validateAllCanvasManifests(): boolean {
  for (const manifest of Object.values(registeredCanvases)) {
    validateCanvasManifest(manifest);
  }
  return true;
}
