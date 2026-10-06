/**
 * Real-time Keystatic Content Translation Watcher
 * Watches src/content/ for edits made in Keystatic and triggers automated translation.
 */

import fs from 'fs';
import path from 'path';
import { syncSingleFile, syncI18n, syncDocs } from '../src/lib/sync-translations.mjs';

const CONTENT_DIR = path.resolve(process.cwd(), 'src/content');
console.log(`[Keystatic Translation Watcher] Watching ${CONTENT_DIR} for edits...`);

let debounceTimer = null;
const changedFiles = new Set();

fs.watch(CONTENT_DIR, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  const norm = filename.replace(/\\/g, '/');

  // Ignore generated target translation paths to prevent recursion loops
  if (norm.startsWith('docs/uk/') || norm.startsWith('docs/de/')) {
    return;
  }

  changedFiles.add(norm);

  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    const filesToSync = Array.from(changedFiles);
    changedFiles.clear();

    console.log(`[Keystatic Translation Watcher] Detected ${filesToSync.length} modified content files:`, filesToSync);

    for (const f of filesToSync) {
      const fullPath = path.join(CONTENT_DIR, f);
      if (fs.existsSync(fullPath)) {
        try {
          await syncSingleFile(fullPath);
        } catch (err) {
          console.error(`[Keystatic Translation Watcher] Error syncing ${f}:`, err);
        }
      }
    }

    console.log('[Keystatic Translation Watcher] Auto-translation sync cycle complete.');
  }, 1000);
});
