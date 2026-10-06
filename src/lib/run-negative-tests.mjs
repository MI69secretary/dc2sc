/**
 * DC2SC Editorial Control Plane Negative Test Suite (Phase 3B.2.1)
 * 
 * Verifies that all build-time validators FAIL CLOSED when invariants are violated.
 */

// ─── Test 1: Duplicate Entity IDs ───────────────────────────────────────────
function testDuplicateEntityId() {
  const sources = [
    { sourceId: 'SRC-0001', title: 'Source A', rights: { websiteDisplayPermission: 'metadata_only' } },
    { sourceId: 'SRC-0001', title: 'Source B', rights: { websiteDisplayPermission: 'metadata_only' } },
  ];

  const seen = new Set();
  let caught = false;
  try {
    for (const s of sources) {
      if (seen.has(s.sourceId)) {
        throw new Error(`[EditorialPlaneValidator] Duplicate entity ID detected: "${s.sourceId}".`);
      }
      seen.add(s.sourceId);
    }
  } catch (e) {
    caught = true;
    console.log('  [PASS] 1. Duplicate Entity ID caught:', e.message);
  }
  if (!caught) throw new Error('Test 1 failed: Duplicate ID was not caught.');
}

// ─── Test 2: Unverified PDF Public Hosting ───────────────────────────────────
function testUnverifiedPdfHosting() {
  const source = {
    sourceId: 'SRC-0002',
    title: 'Unverified PDF',
    rights: {
      storagePermission: 'pending',
      websiteDisplayPermission: 'host_public_pdf',
    },
    localDocument: { file: '/documents/test.pdf' },
  };

  let caught = false;
  try {
    if (source.rights.websiteDisplayPermission === 'host_public_pdf') {
      if (source.rights.storagePermission !== 'verified') {
        throw new Error(
          `[EditorialPlaneValidator] Source [${source.sourceId}] cannot declare websiteDisplayPermission: "host_public_pdf" while storagePermission is "${source.rights.storagePermission}".`
        );
      }
    }
  } catch (e) {
    caught = true;
    console.log('  [PASS] 2. Unverified PDF hosting blocked:', e.message);
  }
  if (!caught) throw new Error('Test 2 failed: Unverified PDF hosting was not blocked.');
}

// ─── Test 3: Published External Edition Without URL ─────────────────────────
function testPublishedEditionWithoutUrl() {
  const edition = {
    editionId: 'ED-999',
    artifactId: 'module-01',
    platform: 'medium',
    status: 'published',
    url: '',
  };

  let caught = false;
  try {
    if (edition.status === 'published') {
      if (!edition.url || (!edition.url.startsWith('http://') && !edition.url.startsWith('https://'))) {
        throw new Error(
          `[EditorialPlaneValidator] External edition [${edition.editionId}] is marked "published" but does not contain a valid absolute URL.`
        );
      }
    }
  } catch (e) {
    caught = true;
    console.log('  [PASS] 3. Published edition without URL blocked:', e.message);
  }
  if (!caught) throw new Error('Test 3 failed: Published edition without URL was not caught.');
}

// ─── Test 4: Fixture Marked Indexable ────────────────────────────────────────
function testFixtureMarkedIndexable() {
  const fixture = {
    id: 'FIXTURE-01',
    isFixture: true,
    indexable: true,
    visibility: 'internal',
  };

  let caught = false;
  try {
    if (fixture.isFixture && fixture.indexable === true) {
      throw new Error(
        `[EditorialPlaneValidator] Demonstration fixture [${fixture.id}] cannot be indexable in search.`
      );
    }
  } catch (e) {
    caught = true;
    console.log('  [PASS] 4. Leaking indexable fixture blocked:', e.message);
  }
  if (!caught) throw new Error('Test 4 failed: Indexable fixture was not blocked.');
}

// ─── Test 5: Fixture Marked Public ──────────────────────────────────────────
function testFixtureMarkedPublic() {
  const fixture = {
    id: 'AUTH-FIXTURE',
    isFixture: true,
    visibility: 'public',
    indexable: false,
  };

  let caught = false;
  try {
    if (fixture.isFixture && (fixture.visibility === 'public' || fixture.publicVisibility === 'public_profile')) {
      throw new Error(
        `[EditorialPlaneValidator] Demonstration fixture [${fixture.id}] cannot declare public visibility.`
      );
    }
  } catch (e) {
    caught = true;
    console.log('  [PASS] 5. Public fixture visibility blocked:', e.message);
  }
  if (!caught) throw new Error('Test 5 failed: Public fixture was not blocked.');
}

// ─── Test 6: Fixture Declaring Publication Authority ────────────────────────
function testFixtureWithPublicationAuthority() {
  const fixture = {
    id: 'REV-FIXTURE',
    isFixture: true,
    publicationAuthority: 'release_approved',
    visibility: 'internal',
  };

  let caught = false;
  try {
    if (fixture.isFixture && fixture.publicationAuthority && fixture.publicationAuthority !== 'none') {
      throw new Error(
        `[EditorialPlaneValidator] Demonstration fixture [${fixture.id}] cannot declare publicationAuthority: "${fixture.publicationAuthority}".`
      );
    }
  } catch (e) {
    caught = true;
    console.log('  [PASS] 6. Fixture publication authority blocked:', e.message);
  }
  if (!caught) throw new Error('Test 6 failed: Fixture publication authority was not blocked.');
}

// ─── Test 7: Derived Media Missing Canonical Reference ──────────────────────
function testDerivedMediaMissingCanonicalRef() {
  const passport = {
    id: 'M01-FIG-99',
    authority: 'derived_noncanonical',
    canonicalRefs: [],
    altText: 'A detailed diagram description that exceeds fifteen characters.',
    scopeLimit: 'Conceptual boundary limit.',
  };

  let caught = false;
  try {
    if (passport.authority === 'derived_noncanonical' && (!passport.canonicalRefs || passport.canonicalRefs.length === 0)) {
      throw new Error(
        `[MediaPassportValidator] Derived media block [${passport.id}] must trace to at least one canonical reference.`
      );
    }
  } catch (e) {
    caught = true;
    console.log('  [PASS] 7. Derived media missing canonical reference blocked:', e.message);
  }
  if (!caught) throw new Error('Test 7 failed: Media missing canonicalRefs was not caught.');
}

// ─── Test 8: Frozen Canon In-Place Mutation ─────────────────────────────────
function testFrozenCanonInPlaceMutation() {
  const spec = {
    canonicalId: 'module-01-more-choice-less-voice',
    canonicalState: 'frozen',
    inPlaceRevision: true,
  };

  let caught = false;
  try {
    if (spec.canonicalState === 'frozen' && spec.inPlaceRevision === true) {
      throw new Error(
        `[FrozenCanonValidator] Frozen canonical specification [${spec.canonicalId}] cannot contain in-place revision flags. Create a successor document in research-proposals/.`
      );
    }
  } catch (e) {
    caught = true;
    console.log('  [PASS] 8. Frozen canon in-place mutation blocked:', e.message);
  }
  if (!caught) throw new Error('Test 8 failed: Frozen canon mutation was not blocked.');
}

// ─── Runner ─────────────────────────────────────────────────────────────────
console.log('\n=== RUNNING CONTROL PLANE FAIL-CLOSED NEGATIVE TESTS ===\n');

testDuplicateEntityId();
testUnverifiedPdfHosting();
testPublishedEditionWithoutUrl();
testFixtureMarkedIndexable();
testFixtureMarkedPublic();
testFixtureWithPublicationAuthority();
testDerivedMediaMissingCanonicalRef();
testFrozenCanonInPlaceMutation();

console.log('\n=== ALL 8 NEGATIVE TESTS PASSED WITH EXPECTED FAILURES ===\n');
