# 🏛️ DC2SC Academic Research OS — General Design System (DESIGN.md)

This document establishes the universal design language, typographic hierarchy, component guidelines, color tokens, and visual standards across the **DC2SC Academic Research Platform**.

---

## 1. Core Design Philosophy

1. **Swiss & Brutalist Academic Discipline:**
   - **0px Border Radius:** Flat, rectilinear, authoritative. (The only exception is pill badges at `9999px`).
   - **No Skeuomorphic Shadows or Gradients:** Elevation and grouping are achieved through clean `1px` or `2px` borders and subtle background tone shifts (`--dc-surface` vs `--dc-raised`).
2. **Light-Mode Only Baseline:**
   - Emulates high-grade academic working papers and archival publications.
   - High-contrast typography on warm paper canvas (`#f8f7f4` / `#faf9f6`) ensuring maximum readability and print fidelity.
3. **Epistemic Discipline & Evidence Boundaries:**
   - All claims, models, and articles are visually scoped by **Evidence Level** badges (`E0` Conceptual through `E5` Replication).
   - Boundaries are reinforced with distinct callout borders (`.dc-callout--boundary`).
4. **Pure Vector SVG First:**
   - Diagrams and plots are scalable, accessible inline SVG elements or Markdoc tags (`{% diagram mediaId="..." %}`).

---

## 2. Color System & Semantic Tokens

Defined in [`src/styles/tokens.css`](file:///C:/Users/mytha/Documents/Codex/2026-09-17/new-chat/outputs/dc2sc/src/styles/tokens.css):

| Semantic Role | Token | Hex Value | Application |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `--dc-surface` | `#f8f7f4` | Main page background, warm paper aesthetic |
| **Raised Container** | `--dc-raised` | `#f0ede8` | Card backgrounds, sidebar panels, matrix headers |
| **White Card** | `--dc-white` | `#ffffff` | Primary article cards, formula plates, inputs |
| **Primary Ink** | `--dc-ink` | `#0f0f0f` | Headlines, primary text, dark borders |
| **Secondary Ink** | `--dc-ink-2` | `#27272a` | Prose paragraphs, descriptions, metadata |
| **Muted Text / Border** | `--dc-muted` / `--dc-border` | `#71717a` / `#d4d4d8` | Eyebrows, grid lines, dividers, subtle frames |
| **Primary Accent / Navy** | `--dc-navy` / `--dc-accent` | `#1e3a8a` | Primary CTA, focus states, active gates, formulas |
| **Accent Low / Tint** | `--dc-accent-low` | `#dbeafe` | Highlighting focus sections, badge backgrounds |
| **Signal / Success** | `--dc-signal` | `#059669` | Pareto optimum, verified proofs, approved signals |
| **Warning / Error** | `--dc-error` / `--dc-warning` | `#dc2626` | Failure modes, adverse selection, captive rent |

---

## 3. Typography Hierarchy

| Role | Font Family | Size / Leading | Usage |
| :--- | :--- | :--- | :--- |
| **Display XL** | `Archivo Black` / `Source Serif 4` | `clamp(2.5rem, 6vw, 4.5rem)` | Hero headlines, portal wordmark |
| **Display LG / H1** | `Archivo Black` | `clamp(1.75rem, 3.5vw, 2.5rem)` | Page titles, article headers |
| **Heading H2–H3** | `Archivo Black` | `1.375rem – 1.75rem` | Section headlines, module titles |
| **Body / Interface** | `Work Sans` / `Inter` | `1rem (16px)`, `line-height: 1.7` | Editorial essays, documentation |
| **Small Body** | `Work Sans` | `0.875rem (14px)` | Card summaries, author bios, captions |
| **Mono / Badges / Code** | `Space Mono` / `JetBrains Mono` | `0.8125rem (13px)` | LaTeX formulas, passports, status pills |
| **Eyebrows & Labels** | `Space Mono` (uppercase) | `0.75rem (12px)`, `tracking: 0.1em` | Category tags, section overlines |

---

## 4. Layout & Grid Architecture

```
+-------------------------------------------------------------------------+
| Top Live Telemetry Bar (arXiv ID, SHA-256, Lang Select: UK / EN / DE)   |
+-------------------------------------------------------------------------+
| Sticky Header (Wordmark, Nav: Research/Journal/GOLIAF/Admin, Support)   |
+-------------------------------------------------------------------------+
|                                                                         |
|  Container Wide (84rem) / Normal (72rem) / Prose Measure (68ch)         |
|                                                                         |
|  [ Main Content (2/3 width) ]         [ Aside Sidebar (1/3 width) ]    |
|  - Editorial Prose                     - Interactive Table of Contents  |
|  - LaTeX Formula Blocks                - Research Status Panel          |
|  - Markdoc Diagrams & Matrices         - Academic Citation Box (BibTeX) |
|  - Disclosure & Failure Boundaries     - Media Passports                |
|                                                                         |
+-------------------------------------------------------------------------+
| Footer (3-column Architecture: Explore, Project, Standards, Disclosures)|
+-------------------------------------------------------------------------+
```

---

## 5. Mathematical & Formula Block Standards

Formulas rendered through [`FormulaBlock.astro`](file:///C:/Users/mytha/Documents/Codex/2026-09-17/new-chat/outputs/dc2sc/src/components/research/FormulaBlock.astro) adhere to a 4-part academic plate:

1. **Navy Header Ribbon:** Theorem badge (`THEOREM` / `INVARIANT` / `LEMMA`) + Verification Status (`● FORMALLY VERIFIED`).
2. **Formula Title:** Descriptive name in `Archivo Black`.
3. **KaTeX Equation Plate:** Centered math rendered in high-contrast LaTeX notation with equation numbering `(Eq. X.X)`.
4. **Variable Explication & Boundary Footer:** Space Mono key explaining all mathematical symbols.

---

## 6. Vector Diagrams & Visualization Archetypes

All figures follow the 6 canonical archetypes defined in `public/diagrams.md`:

1. **Continuous Rights Gates Sequence (`M01-FIG-01`):** 11 constitutional gates from private intent to Pareto evaluation.
2. **Decision Journey Map (`M06-FIG-02`):** 8 stages of the GOLIAF travel stress test.
3. **Market Isolation Topology (`M01-FIG-03`):** Atomized search sessions vs. collective demand vector.
4. **Constraint Classification Matrix (`M04-FIG-01`):** Shared/negotiable vs. strictly individual constraint floors.
5. **Choice vs Voice Decay Curve (`M03-FIG-02`):** Asymptotic bargaining power decay against catalog dispersion.
6. **ZK-Escrow Payoff Tree (`M05-FIG-03`):** Game-theoretic branches for ratification, zero-penalty exit, and lock-in.

---

## 7. Guidelines for AI Agents & Contributors

- **Zero Arbitrary Styles:** Always use CSS tokens (`var(--dc-ink)`, `var(--dc-navy)`, `var(--dc-surface)`).
- **No Border Radius Drift:** Never add `border-radius: 8px` or `12px` to cards. Keep them strictly `0px` or `var(--dc-radius-none)`.
- **Preserve Evidence Discipline:** Never publish unproven market claims without setting `evidenceLevel: "E0"`.
- **Pure Node.js Dependency Policy:** Do not add external npm packages for UI, icons, or PDF generation.
