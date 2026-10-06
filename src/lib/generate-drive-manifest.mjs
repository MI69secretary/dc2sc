/**
 * DC2SC Google Drive Repository Manifest Generator
 * 
 * Scans all research documents, specifications, media passports, tables, charts,
 * and source PDFs to produce a verifiable cryptographic manifest for Google Drive sync.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const baseDir = process.cwd();

function computeSha256(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

function scanDirectory(dirPath, relativeBase = '') {
  const fullPath = path.resolve(baseDir, dirPath);
  if (!fs.existsSync(fullPath)) return [];

  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  let results = [];

  for (const entry of entries) {
    const relPath = path.join(dirPath, entry.name).replace(/\\/g, '/');
    if (entry.isDirectory()) {
      results = results.concat(scanDirectory(relPath));
    } else if (entry.isFile() && !entry.name.startsWith('.')) {
      results.push(relPath);
    }
  }

  return results;
}

export function generateRepositoryManifest() {
  console.log('=== GENERATING DC2SC GOOGLE DRIVE REPOSITORY MANIFEST ===\n');

  const scanTargets = [
    { dir: 'src/content/research', category: 'research_canon', drivePrefix: '01_Research_Canon' },
    { dir: 'src/content/goliaf', category: 'goliaf_stress_test', drivePrefix: '02_GOLIAF_Environment' },
    { dir: 'src/content/journal', category: 'journal_essays', drivePrefix: '03_Journal_Essays' },
    { dir: 'src/content/sources', category: 'source_documents', drivePrefix: '04_Library_Sources' },
    { dir: 'src/data/media', category: 'media_passports', drivePrefix: '05_Media_Passports' },
    { dir: 'src/data/tables', category: 'tables_matrices', drivePrefix: '06_Tables_Matrices' },
    { dir: 'src/data/charts', category: 'charts', drivePrefix: '07_Charts' },
    { dir: 'src/data/canvases', category: 'canvases', drivePrefix: '08_Canvas_Manifests' },
    { dir: 'src/data/calendar', category: 'calendar', drivePrefix: '09_Editorial_Calendar' },
    { dir: 'public/documents', category: 'public_documents_pdf', drivePrefix: '10_Documents_PDF' },
  ];

  const manifestEntries = [];
  let totalBytes = 0;

  for (const target of scanTargets) {
    const files = scanDirectory(target.dir);
    for (const relFile of files) {
      const fullPath = path.resolve(baseDir, relFile);
      const stat = fs.statSync(fullPath);
      const hash = computeSha256(fullPath);
      totalBytes += stat.size;

      const baseName = path.basename(relFile);
      const subDir = path.dirname(relFile).replace(target.dir, '').replace(/^\//, '');
      const remotePath = subDir
        ? `DC2SC_Vault/${target.drivePrefix}/${subDir}/${baseName}`
        : `DC2SC_Vault/${target.drivePrefix}/${baseName}`;

      manifestEntries.push({
        id: relFile.replace(/\//g, '_').replace(/\.[^/.]+$/, ''),
        localPath: relFile,
        remoteDrivePath: remotePath,
        category: target.category,
        sha256: hash,
        sizeBytes: stat.size,
        lastModified: stat.mtime.toISOString(),
        mimeType: relFile.endsWith('.md') ? 'text/markdown' : relFile.endsWith('.json') ? 'application/json' : relFile.endsWith('.pdf') ? 'application/pdf' : 'application/octet-stream',
        syncStatus: 'ready_for_sync',
      });
    }
  }

  const manifest = {
    manifestVersion: '1.0.0',
    repositoryName: 'DC2SC Narrative OS & Research Vault',
    generatedAt: new Date().toISOString(),
    totalFiles: manifestEntries.length,
    totalSizeBytes: totalBytes,
    totalSizeFormatted: `${(totalBytes / 1024).toFixed(2)} KB`,
    driveContainerName: 'DC2SC_GoogleDrive_Vault',
    files: manifestEntries,
  };

  const outputPath = path.resolve(baseDir, 'src/data/drive-repository-manifest.json');
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

  console.log(`Manifest generated successfully:`);
  console.log(`  - Total Files: ${manifest.totalFiles}`);
  console.log(`  - Total Size: ${manifest.totalSizeFormatted}`);
  console.log(`  - Output: ${outputPath}\n`);

  return manifest;
}

// Auto-run if executed directly
if (process.argv[1] && process.argv[1].endsWith('generate-drive-manifest.mjs')) {
  generateRepositoryManifest();
}
