---
title: 'What Counts as Success?'
dek: 'Defining demand-side research criteria that reject gross transaction volume as proof of benefit, and establishing non-aggregation as a complete, valid scientific outcome.'
contentKind: 'editorial_article'
canonicalState: 'none'
visibility: 'public'
lifecycleStatus: 'published'
claimState: 'active'
researchRole: 'analytical_framework'
indexable: true
includeInSitemap: true
includeInRss: true
claimLevel: 'CONCEPT'
evidenceLevel: 'E0'
canonicalModules: [7]
topics: ['Success and failure', 'Market isolation', 'Coordination rights']
featured: false
outsideOptionDependency: true
whatThisDoesNotClaim:
  - 'Does not claim that any single success benchmark is universally optimal.'
  - 'Does not assert empirical proof of welfare gains across live digital platforms.'
  - 'Does not evaluate live commercial platforms or proprietary transactions.'
researchQuestions:
  - 'How can demand-side research establish welfare benchmarks that are participant-evaluated rather than intermediary-determined?'
  - 'Why is documenting and analyzing coordination failure more informative than optimizing for transaction clearance?'
---

{% callout type="boundary" title="Editorial Scope & Derivation Brief" %}
This derived research essay is authored under **Editorial Derivation Brief BRIEF-M07** and traces directly to frozen **Canonical Module 07 (What Counts as Success?)**. It operates at **Evidence Level E0 (Conceptual Horizon)**. All diagrams and matrices carry derived non-canonical authority and do not alter the frozen canonical specification.
{% /callout %}

## 1. Rejecting the Transactional Default

In commercial platform design, success is defined almost exclusively by transactional throughput: Gross Merchandise Value (GMV), conversion rate, user retention, and checkout volume.

If an aggregation platform clears millions in transactions, conventional metrics declare it a success—even if participants received worse terms than their individual search options, sacrificed their schedule flexibility, or forfeited their telemetry privacy.

DC2SC Module 07 explicitly dismantles this default: **Transaction is not success**.

A transaction constitutes genuine success only if the terms achieved represent a verifiable improvement over the participant's accessible outside options without eroding non-compensable rights floors.

{% diagram mediaId="M07-FIG-01" caption="Figure 1: Failure-First Evaluation Decision Tree and Outcome Taxonomy" authority="derived_noncanonical" epistemicBasis="conceptual" /%}

## 2. Four Demand-Side Evaluation Benchmarks

To replace naive commercial metrics, DC2SC establishes four rigorous demand-side criteria:

1. **Participant-Determined Constraint Satisfaction (Proposition M7-P01):** Terms must satisfy the explicitly ratified constraints of members rather than averaging preferences into lowest-common-denominator compromises.
2. **Outside-Option Superiority (Proposition M7-P02):** The collective offer must be demonstrably superior to the real-time individual alternatives accessible to participants at that moment.
3. **Zero-Penalty Dissolution Floor:** If a collective position fails or is rejected, participants must experience zero financial or reputational penalty upon fallback.
4. **Validation of Non-Aggregation (Proposition M7-P03):** Deciding *not* to aggregate is recognized as an equal, valid, and fully successful research outcome.

{% diagram mediaId="M01-FIG-01" caption="Figure 2: Continuous Rights Gates Evaluation Flow & Null-Result Gate" authority="derived_noncanonical" epistemicBasis="conceptual" /%}

{% tableMatrix tableId="M07-TAB-01" /%}

## 3. "Do Not Aggregate" as a Scientific Victory

When participants evaluate a proposed collective position against their individual outside options and choose to reject the offer or disband the cohort, the system has worked as designed.

It has successfully defended participant autonomy against bad deals and illuminated the precise boundary where collective coordination overhead exceeds participant value.

Documenting these failure boundaries in the **Failure Register** is the primary scientific mission of the DC2SC program.

{% formula 
   formulaId="INV-M07-NULL-RESULT-WELFARE"
   title="Definition 7.1: Valid Outside-Option Welfare & Null Result Criterion"
   latex="\mathcal{S}(\text{Outcome}) = \begin{cases} \Delta U(\mathbf{x}_{\text{coll}}, \mathbf{x}_{\text{out}}) & \text{if } \text{Ratified} \wedge (\mathbf{x}_{\text{coll}} \succ \mathbf{x}_{\text{out}}) \\ \mathbf{1}_{\{\text{exit}\}} \cdot 0 & \text{if Non-Aggregation (Valid Null)} \\ -\infty & \text{if Coerced Clearance } (\mathbf{x}_{\text{coll}} \prec \mathbf{x}_{\text{out}}) \end{cases}"
   equationNumber="(Eq. 7.1)"
   theoremType="definition"
   status="BENCHMARK CRITERION"
   variables="\mathbf{x}_{\text{coll}} — collective contract terms; \mathbf{x}_{\text{out}} — best available individual outside option; \Delta U — net welfare differential."
   description="Constitutional definition classifying 'Do Not Aggregate' as a strictly positive, non-penalized valid null outcome superior to coerced transactional clearance." /%}

## 4. Closing the Seven-Module Spine

Module 07 completes the foundational seven-module canonical narrative spine:

```text
[Module 01: More Choice, Less Voice] 
  → [Module 02: A Crowd Is Attention] 
  → [Module 03: Why More Buyers Do Not Mean Better Deals] 
  → [Module 04: The Cost of Commitment] 
  → [Module 05: Coordination Rights] 
  → [Module 06: Travel Is a Stress Test] 
  → [Module 07: What Counts as Success?]
```

The inquiry now transitions into the living **Continuous Rights Gates**, **Failure-First Framework**, and **Evidence & Claim Discipline** specifications that govern empirical metric development.

{% researchHandoff targetModule="Continuous Rights Gates" targetUrl="/research/continuous-rights-gates" handoffQuestion="How are the seven foundational principles operationalized into continuous, automated rights gates across every stage of market formation?" /%}
