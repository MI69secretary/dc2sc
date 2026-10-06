/**
 * Automated Translation Synchronizer for DC2SC
 * Synchronizes docs, journal, research, and UI dictionaries across en, uk, and de locales.
 */

import fs from 'fs';
import path from 'path';
import { translateMarkdownDoc, translateTextRemote } from './translation-engine.mjs';

const ROOT_DIR = process.cwd();
const DOCS_DIR = path.join(ROOT_DIR, 'src/content/docs');
const I18N_DIR = path.join(ROOT_DIR, 'src/content/i18n');

/**
 * Synchronize documentation pages (Starlight docs)
 */
export async function syncDocs(sourceFile = null) {
  console.log('=== SYNCHRONIZING STARLIGHT DOCS ===');
  const ukDir = path.join(DOCS_DIR, 'uk');
  const deDir = path.join(DOCS_DIR, 'de');
  
  if (!fs.existsSync(ukDir)) fs.mkdirSync(ukDir, { recursive: true });
  if (!fs.existsSync(deDir)) fs.mkdirSync(deDir, { recursive: true });

  // Get root (en) doc files
  const rootFiles = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.mdoc') || f.endsWith('.md'));

  for (const file of rootFiles) {
    if (sourceFile && !sourceFile.endsWith(file)) continue;

    const enPath = path.join(DOCS_DIR, file);
    const ukPath = path.join(ukDir, file);
    const dePath = path.join(deDir, file);

    const enContent = fs.readFileSync(enPath, 'utf8');

    // 1. Sync to Ukrainian if missing or modified
    console.log(`Translating ${file} [en -> uk]...`);
    const ukContent = await translateMarkdownDoc(enContent, 'en', 'uk');
    fs.writeFileSync(ukPath, ukContent, 'utf8');

    // 2. Sync to German if missing or modified
    console.log(`Translating ${file} [en -> de]...`);
    const deContent = await translateMarkdownDoc(enContent, 'en', 'de');
    fs.writeFileSync(dePath, deContent, 'utf8');
  }

  console.log('Docs synchronization complete!');
}

/**
 * Synchronize i18n JSON translation dictionaries
 */
export async function syncI18n() {
  console.log('=== SYNCHRONIZING I18N DICTIONARIES ===');
  const enFile = path.join(I18N_DIR, 'en.json');
  const ukFile = path.join(I18N_DIR, 'uk.json');
  const deFile = path.join(I18N_DIR, 'de.json');

  if (!fs.existsSync(I18N_DIR)) fs.mkdirSync(I18N_DIR, { recursive: true });

  const enData = fs.existsSync(enFile) ? JSON.parse(fs.readFileSync(enFile, 'utf8')) : {};
  const ukData = fs.existsSync(ukFile) ? JSON.parse(fs.readFileSync(ukFile, 'utf8')) : {};
  const deData = fs.existsSync(deFile) ? JSON.parse(fs.readFileSync(deFile, 'utf8')) : {};

  // Standard UI keys
  const standardKeys = {
    'nav.research': 'Research',
    'nav.journal': 'Journal',
    'nav.goliaf': 'Goliaf Engine',
    'nav.support': 'Support',
    'nav.search': 'Search',
    'footer.oais': 'ISO 14721 (OAIS) Compliant Repository',
    'status.consensus': 'Consensus Validated',
    'status.open': 'Open for Consensus'
  };

  Object.assign(enData, standardKeys);

  for (const [key, text] of Object.entries(enData)) {
    if (!ukData[key]) {
      ukData[key] = await translateTextRemote(text, 'en', 'uk');
    }
    if (!deData[key]) {
      deData[key] = await translateTextRemote(text, 'en', 'de');
    }
  }

  fs.writeFileSync(enFile, JSON.stringify(enData, null, 2), 'utf8');
  fs.writeFileSync(ukFile, JSON.stringify(ukData, null, 2), 'utf8');
  fs.writeFileSync(deFile, JSON.stringify(deData, null, 2), 'utf8');

  console.log('i18n dictionaries synchronized!');
}

/**
 * Synchronize a specific file upon Keystatic edit
 */
export async function syncSingleFile(filePath) {
  const norm = filePath.replace(/\\/g, '/');
  console.log(`Syncing translations for modified file: ${norm}`);

  if (norm.includes('/src/content/docs/')) {
    // If a root doc was modified, sync to uk and de
    if (!norm.includes('/uk/') && !norm.includes('/de/')) {
      await syncDocs(norm);
    }
  } else if (norm.includes('/src/content/i18n/')) {
    await syncI18n();
  }
}

// Run CLI directly if called
if (process.argv[1] && process.argv[1].endsWith('sync-translations.mjs')) {
  (async () => {
    await syncDocs();
    await syncI18n();
    console.log('All translations successfully synchronized!');
  })().catch(err => {
    console.error('Translation error:', err);
    process.exit(1);
  });
}
