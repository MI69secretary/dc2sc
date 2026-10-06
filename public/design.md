# DC2SC Data Visualization & Chart Design System (design.md)

This document establishes the canonical design system for all charts, data visualizations, coordinate axes, and diagrammatic figures published in the DC2SC research program and working papers.

---

## 1. Philosophical Foundation & Visual Discipline

- **Editorial Flatness:** 0px border-radius (except pill badges at 9999px). Zero decorative gradients, zero dropshadow skeuomorphism.
- **Light-Mode Canonical Baseline:** High-contrast warm paper background (`#f8f7f4`) with carbon ink (`#0f0f0f`) and deep cobalt blue accents (`#1e3a8a`).
- **Academic Rigor:** Every figure must declare its **Epistemic Basis** (Conceptual, Analytical, Empirical), **Evidence Level** (E0–E5), and **Derived Authority** (`derived_noncanonical` vs `canonical`).
- **SVG-First Vector Architecture:** All standalone diagrams and plots must be responsive, scalable vector graphics with `viewBox="0 0 W H"` and accessible `aria-label` or `aria-hidden="true"`.

---

## 2. Color Palette & Semantic Tokens

| Semantic Role | Token Name | Hex Value | Usage in Charts & Diagrams |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `--dc-surface` | `#f8f7f4` | Background of chart frames, canvas plots. |
| **Raised Container** | `--dc-raised` | `#f0ede8` | Legend panels, callout boxes, matrix headers. |
| **Primary Ink** | `--dc-ink` | `#0f0f0f` | Axes lines, primary labels, title text, data boundaries. |
| **Secondary Ink** | `--dc-ink-2` | `#27272a` | Sub-labels, grid lines, trend lines, body copy. |
| **Primary Accent** | `--dc-navy` / `--dc-accent` | `#1e3a8a` | Primary data series, coalition positions, focus nodes. |
| **Accent Tint** | `--dc-accent-low` | `#dbeafe` | Shaded confidence intervals, highlighted gate regions. |
| **Signal / Success** | `--dc-signal` | `#059669` | Validated equilibrium, Nash optimal points, approved exit. |
| **Boundary / Warning** | `--dc-warning` | `#dc2626` | Failure zones, captive rent capture, adverse selection. |
| **Muted Axis / Grid** | `--dc-border` | `#d4d4d8` | Coordinate tick marks, background reference grids. |

---

## 3. Typography Hierarchy in Visualizations

1. **Figure Title / Header:** `Archivo Black`, `14px–18px`, letter-spacing `-0.02em`, uppercase/titlecase.
2. **Axis Labels & Data Callouts:** `Work Sans`, `500/600`, `11px–13px`.
3. **Tick Numbers, Invariant IDs & Equations:** `Space Mono`, `400/700`, `10px–12px`.
4. **Epistemic Passport Badges:** `Space Mono`, `9px–10px`, all-caps, `padding: 2px 6px`, `border: 1px solid`.

---

## 4. Grid, Axes & Coordinate Specifications

- **Coordinate Axes:** `stroke="#0f0f0f"`, `stroke-width="1.5"`, `stroke-linecap="square"`.
- **Grid Lines:** `stroke="#d4d4d8"`, `stroke-width="0.75"`, `stroke-dasharray="3,3"`.
- **Curve Plots:**
  - *Main Coalition Invariant:* `stroke="#1e3a8a"`, `stroke-width="2.5"`.
  - *Counterfactual Search Baseline:* `stroke="#71717a"`, `stroke-width="1.5"`, `stroke-dasharray="4,4"`.
  - *Adverse Platform Capture Zone:* `fill="rgba(220, 38, 38, 0.08)"`, `stroke="#dc2626"`, `stroke-width="1"`.
- **Data Nodes / Equilibrium Points:** `circle r="4"`, `fill="#1e3a8a"`, `stroke="#f8f7f4"`, `stroke-width="1.5"`.

---

## 5. Markdoc Integration Standard

In research essays and working papers, all figures must be authored using the standard Markdoc tag:

```markdown
{% diagram 
   mediaId="M01-FIG-01" 
   caption="Figure 1: Isolated Search Trajectory vs. Collective Market Position" 
   authority="derived_noncanonical" 
   epistemicBasis="conceptual" /%}
```
