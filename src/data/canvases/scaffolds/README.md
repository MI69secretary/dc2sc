# DC2SC Research Canvas Scaffolds

This directory houses internal and planned research canvas manifests for future modules (Modules 02–07).

## Constitutional Scaffolding Rules

1. **Constitutional Invariant on Authority:**
   All canvas manifests represent derived compositions and visual models. They **MUST** declare `authority: 'derived_noncanonical'`. They cannot override or redefine frozen canonical specifications.

2. **Default Isolation Gate:**
   Every new scaffold **MUST** default to:
   ```typescript
   canvasStatus: 'planned', // or 'scaffolded'
   visibility: 'internal',
   indexable: false,
   includeInSitemap: false,
   includeInRss: false,
   ```

3. **Public Promotion Invariant:**
   A canvas manifest can only be promoted to public rendering if:
   - `canvasStatus === 'approved'`
   - `visibility === 'public'`
   - `indexable === true`
   - All referenced `MediaPassport` objects pass full 5-axis validation and accessibility contracts.

4. **Proposition Tracing:**
   Every canvas proposition of kind `canon_restatement` must trace directly to at least one frozen canonical specification in `canonicalRefs`.
