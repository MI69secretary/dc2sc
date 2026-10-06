import { validateSourceDocument, validateExternalEdition, validateAuthorRecord, validateAllEditorialPlaneEntities } from './src/lib/validate-editorial-plane.ts';

console.log('--- Running Editorial Plane Validator Tests ---');

// Test 1: Valid Source
const validSource = {
  sourceId: 'SRC-0001',
  title: 'Entry and Competition Effects in First-Price Auctions',
  sourceType: 'working_paper',
  documentFormat: 'pdf',
  authors: [{ authorId: 'AUTH-EXT-001', displayName: 'Tong Li', role: 'author' }],
  rights: {
    access: 'public_link',
    storagePermission: 'pending',
    websiteDisplayPermission: 'metadata_only',
    citationPermission: 'yes',
    excerptPermission: 'verify',
  },
  verificationStatus: 'metadata_verified',
  evidenceLevel: 'E1',
  sourceStatus: 'screened',
  topicTags: ['auctions'],
  limitations: ['procurement only'],
  relatedResearch: [],
  relatedMedia: [],
  publicVisibility: 'reference_only',
  indexable: false,
};

validateSourceDocument(validSource);
console.log('✓ Valid source passed');

// Test 2: Invalid PDF Hosting without Verified Storage
const invalidPdfSource = {
  ...validSource,
  sourceId: 'SRC-0002',
  rights: {
    ...validSource.rights,
    storagePermission: 'pending',
    websiteDisplayPermission: 'host_public_pdf',
  },
  localDocument: { file: '/documents/test.pdf' },
};

let caughtPdfError = false;
try {
  validateSourceDocument(invalidPdfSource);
} catch (e) {
  caughtPdfError = true;
  console.log('✓ Caught invalid PDF hosting without verified storage:', e.message);
}
if (!caughtPdfError) throw new Error('Failed to block unverified PDF hosting');

// Test 3: Valid Author
const validAuthor = {
  authorId: 'AUTH-0001',
  displayName: 'DC2SC Research',
  slug: 'dc2sc-research',
  roles: ['research_program'],
  visibility: 'public',
  verificationStatus: 'self_managed',
  relatedArtifacts: [],
};
validateAuthorRecord(validAuthor);
console.log('✓ Valid author passed');

// Test 4: Invalid Published External Edition without URL
const invalidEdition = {
  editionId: 'ED-001',
  artifactId: 'module-01',
  platform: 'medium',
  status: 'published',
  url: '',
};

let caughtEditionError = false;
try {
  validateExternalEdition(invalidEdition);
} catch (e) {
  caughtEditionError = true;
  console.log('✓ Caught published edition without URL:', e.message);
}
if (!caughtEditionError) throw new Error('Failed to catch published edition without URL');

// Test 5: Global Entity ID Uniqueness
validateAllEditorialPlaneEntities({
  sources: [validSource],
  authors: [validAuthor],
  externalEditions: [{ editionId: 'ED-001', artifactId: 'module-01', platform: 'medium', status: 'not_linked' }],
});
console.log('✓ Global uniqueness and entity lists passed');

console.log('--- ALL EDITORIAL PLANE TESTS PASSED ---');
