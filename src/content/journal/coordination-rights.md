---
title: 'Coordination Rights'
dek: 'Framing the constitutional conditions under which collective market action is a right rather than a privilege, and why rights floors cannot be traded for price concessions.'
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
canonicalModules: [5]
topics: ['Coordination rights', 'Collective agency', 'Market isolation']
featured: false
whatThisDoesNotClaim:
  - 'Does not claim that coordination rights are currently recognized in statutory law.'
  - 'Does not provide formal legal counsel or antitrust compliance opinions.'
  - 'Does not assert buyer coordination unilaterally overrides supplier contract rights.'
researchQuestions:
  - 'What institutional mechanisms are required to enforce non-compensable rights floors in decentralized buyer coordination?'
  - 'How can mechanism designers guarantee that choosing not to aggregate is treated as a first-class, protected market outcome?'
---

{% callout type="boundary" title="Editorial Scope & Derivation Brief" %}
This derived research essay is authored under **Editorial Derivation Brief BRIEF-M05** and traces directly to frozen **Canonical Module 05 (Coordination Rights)**. It operates at **Evidence Level E0 (Conceptual Horizon)**. All diagrams and matrices carry derived non-canonical authority and do not alter the frozen canonical specification.
{% /callout %}

## 1. Beyond Passive Consumer Protection

Traditional regulatory and economic models evaluate consumer welfare almost exclusively through the lens of individual protection: preventing deceptive advertising, enforcing baseline safety standards, and policing price collusion among suppliers.

While essential, this framing treats the buyer as an atomized, passive recipient of market conditions.

DC2SC Module 05 establishes that meaningful agency requires a shift from passive consumer protection to active **Coordination Rights**—the structural guarantees necessary for independent participants to voluntarily form, contest, and execute collective market positions without fear of intermediary coercion.

{% diagram mediaId="M05-FIG-01" caption="Figure 1: The Five Non-Compensable Rights Floors Supporting Voluntary Coordination" authority="derived_noncanonical" epistemicBasis="conceptual" /%}

## 2. Non-Compensable Rights Floors

The core thesis of DC2SC governance is that **rights floors are non-compensable**. 

A market intermediary cannot ask participants to forfeit baseline rights in exchange for marginal financial incentives, discounts, or algorithmic convenience. When basic rights are traded away, coordination collapses into platform dependency.

{% tableMatrix tableId="M05-TAB-01" /%}

## 3. The Right Not to Aggregate

A central tenet of the DC2SC framework is that **"Do not aggregate" is a legitimate, complete research outcome**.

Coordination is not an obligation. If an individual participant finds that their independent outside option provides superior utility, autonomy, or temporal flexibility compared to the proposed collective position, they retain an absolute right to decline participation.

A coordination mechanism that penalizes participants for opting out—whether through platform lockout, reputational degradation, or exit fees—is coercive by definition.

{% formula 
   formulaId="INV-M05-NONCOMPENSABLE-FLOOR"
   title="Axiom 5.1: Non-Compensable Rights Floor Invariant"
   latex="\forall i \in \mathcal{P}, \; \mathbf{R}_i \cap \mathcal{F}_{\text{floor}} = \emptyset \implies U_i(\mathbf{x}, \mathbf{R}_i) \equiv -\infty"
   equationNumber="(Eq. 5.1)"
   theoremType="axiom"
   status="CONSTITUTIONAL AXIOM"
   variables="\mathbf{R}_i — rights profile retained by participant i; \mathcal{F}_{\text{floor}} — non-compensable rights boundary (privacy, exit, contestability); U_i — subjective welfare valuation."
   description="Fundamental constitutional rule stating that trading away non-compensable rights floors in exchange for price discounts yields non-admissible negative infinite welfare." /%}

## 4. Failure Modes Tracked

Under the **DC2SC Failure-First Framework**, Module 05 tracks three key failure conditions:

- **Rights Degradation (FAIL-05):** Compromising privacy or exit rights to satisfy supplier minimum volume thresholds.
- **Contestability Blockade (FAIL-06):** Representatives or algorithms ignoring participant dissents during position finalization.
- **Outside Option Erosion (FAIL-12):** Suppliers penalizing individual buyers who withdraw from collective pools.

## 5. Research Handoff to Module 06

With constitutional coordination rights defined, the theoretical framework must be subjected to extreme real-world stress testing. This leads directly to Module 06: Travel Is a Stress Test (the GOLIAF research environment).

{% researchHandoff targetModule="Module 06" targetUrl="/research/module-06-travel-is-a-stress-test" handoffQuestion="How do constitutional rights floors hold up when tested against high-friction, perishability-constrained domains like international travel?" /%}
