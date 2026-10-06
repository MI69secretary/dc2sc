# DC2SC Canonical Successor Proposals

This directory houses proposed successor revisions to frozen canonical specifications.

## Constitutional Workflow

1. **Frozen Invariant:**
   Frozen canonical specifications in `src/content/research/` cannot be modified in place.

2. **Successor Creation:**
   Any proposed revision or amendment to a frozen canonical specification must be drafted here as a discrete proposal artifact declaring:
   ```yaml
   canonicalState: working # or provisional
   supersedes:
     - "module-01-more-choice-less-voice"
   ```

3. **Formal Promotion:**
   A proposal only supersedes a frozen specification upon formal peer audit, review record creation, and manual Git-level promotion.
