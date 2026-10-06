# DC2SC Public Documents & Source Repository Container

This directory stores approved, verified public document assets (e.g. PDFs, research reports) that have explicit permission for public hosting.

## Constitutional Invariants

1. **Default Rule: `metadata_only`**
   All bibliographic source records in `src/content/sources/` default to `websiteDisplayPermission: 'metadata_only'`.

2. **Public Hosting Gate:**
   A document file may be placed in `public/documents/<source-id>/<filename>.pdf` and linked publicly **ONLY** if:
   - `rights.websiteDisplayPermission === 'host_public_pdf'`
   - `rights.storagePermission === 'verified'`
   - Documented license and rights metadata exist in the corresponding source record.

3. **No Bulk Auto-Import:**
   No documents are scraped, fetched, or copied in bulk. Every document requires individual editorial provenance review.
