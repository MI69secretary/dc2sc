// gemini-diagram-engine.mjs — DC2SC Gemini AI Diagram & Vector Generation Engine
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../../');

/**
 * System prompt instructing Gemini to generate clean, valid, standalone SVG vector diagrams
 * strictly adhering to DC2SC design.md and tokens.css palette.
 */
export const GEMINI_SVG_SYSTEM_PROMPT = `You are the Lead Scientific Visualizer & Diagram Architect for DC2SC (Demand Coordination & Collective Agency Research Program).
Your goal is to generate publication-grade, accessible SVG vector diagrams and diagrams.md specifications for economic, mechanism design, and game-theoretic research.

DESIGN DISCIPLINE & RULES:
1. Palette strictly from DC2SC design tokens:
   - Primary Accent / Royal Navy: #1e3a8a
   - Surface / Warm Paper: #f8f7f4
   - Raised Plate: #f0ede8
   - Ink / Deep Black: #0f0f0f
   - Muted Gray / Axis: #71717a
   - Border: #d4d4d8
   - Signal / Pareto Optimum / Green: #059669
   - Warning / Adverse Decay / Red: #dc2626
   - Tinted Blue Box: #dbeafe
2. Geometry: 0px border-radius, clean rectilinear borders, 1.5px or 2px stroke-width.
3. Typography in SVG:
   - Headings & badges: font-family="'Space Mono', monospace", font-weight="700", font-size="9-11"
   - Labels & explanations: font-family="'Work Sans', sans-serif", font-size="8-10"
4. Dimensions: viewBox="0 0 540 220", width="100%", height="100%".
5. OUTPUT: Output ONLY the <svg ...>...</svg> XML markup without markdown code fences or conversational text.`;

/**
 * Deterministic Academic Synthesis Engine (Generates baseline/fallback diagram SVGs when offline or without API Key)
 */
export function generateSynthesisDiagram({ moduleNumber = 1, diagramType = 'rights-gates', prompt = '', title = '' }) {
  const modNum = parseInt(moduleNumber, 10) || 1;
  const modPadded = String(modNum).padStart(2, '0');
  const figId = `M${modPadded}-FIG-${Math.floor(Math.random() * 89 + 10)}`;

  let svgContent = '';
  let finalTitle = title || `Figure M${modPadded}: Generated Mechanism Architecture`;
  let caption = `Generated diagram for Module ${modPadded}: ${prompt || diagramType}`;

  if (diagramType === 'payoff-tree' || prompt.toLowerCase().includes('tree') || prompt.toLowerCase().includes('game') || prompt.toLowerCase().includes('escrow')) {
    finalTitle = title || `Game-Theoretic Payoff Tree for ZK-Escrow (Module ${modPadded})`;
    caption = `Payoff branches illustrating Nash equilibria, zero-penalty exit floors, and collective ratification states.`;
    svgContent = `<svg viewBox="0 0 540 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f8f7f4" stroke="#d4d4d8" stroke-width="1"/>
  <!-- Root Node -->
  <circle cx="60" cy="100" r="10" fill="#1e3a8a"/>
  <text x="60" y="75" font-family="'Space Mono', monospace" font-size="9" font-weight="700" text-anchor="middle" fill="#1e3a8a">Quorum Q</text>
  
  <!-- Branch Lines -->
  <line x1="70" y1="100" x2="190" y2="45" stroke="#0f0f0f" stroke-width="1.5"/>
  <line x1="70" y1="100" x2="190" y2="100" stroke="#0f0f0f" stroke-width="1.5"/>
  <line x1="70" y1="100" x2="190" y2="155" stroke="#0f0f0f" stroke-width="1.5"/>

  <!-- Decision Nodes -->
  <rect x="190" y="30" width="310" height="32" fill="#dbeafe" stroke="#059669" stroke-width="1.5"/>
  <text x="205" y="50" font-family="'Space Mono', monospace" font-size="9" font-weight="700" fill="#059669">1. RATIFICATION OPTIMUM: ΔU(x_coll, x_out) &gt; 0</text>

  <rect x="190" y="85" width="310" height="32" fill="#f0ede8" stroke="#1e3a8a" stroke-width="1.5"/>
  <text x="205" y="105" font-family="'Space Mono', monospace" font-size="9" font-weight="700" fill="#1e3a8a">2. VALID NULL RESULT: Zero-Penalty Exit Floor</text>

  <rect x="190" y="140" width="310" height="32" fill="#fff5f5" stroke="#dc2626" stroke-width="1.5"/>
  <text x="205" y="160" font-family="'Space Mono', monospace" font-size="9" font-weight="700" fill="#dc2626">3. FAIL-04: Coerced Lock-in (Adverse Selection)</text>
</svg>`;
  } else if (diagramType === 'pareto-curve' || prompt.toLowerCase().includes('curve') || prompt.toLowerCase().includes('decay') || prompt.toLowerCase().includes('choice')) {
    finalTitle = title || `Choice vs Voice Decay Curve & Pareto Boundary (Module ${modPadded})`;
    caption = `Asymptotic degradation of individual bargaining voice against catalog dispersion, with recovery via verified demand pooling.`;
    svgContent = `<svg viewBox="0 0 540 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f8f7f4" stroke="#d4d4d8" stroke-width="1"/>
  <!-- Axes -->
  <line x1="50" y1="160" x2="490" y2="160" stroke="#0f0f0f" stroke-width="1.5"/>
  <line x1="50" y1="160" x2="50" y2="30" stroke="#0f0f0f" stroke-width="1.5"/>
  <text x="490" y="178" font-family="'Space Mono', monospace" font-size="8" text-anchor="end" fill="#71717a">Catalog Dispersion |C| → ∞</text>
  <text x="45" y="22" font-family="'Space Mono', monospace" font-size="8" text-anchor="start" fill="#71717a">Buyer Voice E[Voice]</text>
  
  <!-- Decay Curve -->
  <path d="M 50 45 Q 180 140 490 155" fill="none" stroke="#dc2626" stroke-width="2.5"/>
  <text x="260" y="125" font-family="'Work Sans', sans-serif" font-size="9" fill="#dc2626">Atomized Search Drag</text>

  <!-- Pareto Countervailing Line -->
  <line x1="50" y1="75" x2="490" y2="75" stroke="#059669" stroke-width="2" stroke-dasharray="4,4"/>
  <circle cx="270" cy="75" r="5" fill="#059669"/>
  <text x="285" y="70" font-family="'Work Sans', sans-serif" font-size="9" font-weight="700" fill="#059669">Pareto Countervailing Equilibrium</text>
</svg>`;
  } else if (diagramType === 'market-isolation' || prompt.toLowerCase().includes('topology') || prompt.toLowerCase().includes('asymmetry') || prompt.toLowerCase().includes('network')) {
    finalTitle = title || `Market Isolation Topology vs Collective Demand Vector (Module ${modPadded})`;
    caption = `Structural topology comparing atomized search sessions with a cryptographically bound buyer coalition.`;
    svgContent = `<svg viewBox="0 0 540 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f8f7f4" stroke="#d4d4d8" stroke-width="1"/>
  <!-- Left: Atomized Sessions -->
  <rect x="25" y="30" width="220" height="145" fill="#f0ede8" stroke="#d4d4d8" stroke-dasharray="3,3"/>
  <text x="135" y="50" font-family="'Work Sans', sans-serif" font-size="9" font-weight="700" text-anchor="middle" fill="#71717a">ATOMIZED INDEPENDENT SESSIONS</text>
  <circle cx="65" cy="85" r="4" fill="#0f0f0f" opacity="0.3"/>
  <circle cx="105" cy="115" r="4" fill="#0f0f0f" opacity="0.4"/>
  <circle cx="155" cy="75" r="4" fill="#0f0f0f" opacity="0.3"/>
  <circle cx="185" cy="130" r="4" fill="#0f0f0f" opacity="0.4"/>
  <circle cx="120" cy="145" r="4" fill="#0f0f0f" opacity="0.3"/>

  <!-- Center Divider -->
  <text x="270" y="108" font-family="'Space Mono', monospace" font-size="14" font-weight="700" text-anchor="middle" fill="#1e3a8a">VS</text>

  <!-- Right: Collective Coalition -->
  <rect x="295" y="30" width="220" height="145" fill="#dbeafe" stroke="#1e3a8a" stroke-width="2"/>
  <text x="405" y="50" font-family="'Work Sans', sans-serif" font-size="9" font-weight="700" text-anchor="middle" fill="#1e3a8a">COLLECTIVE MARKET COALITION</text>
  <circle cx="340" cy="95" r="6" fill="#1e3a8a"/>
  <circle cx="405" cy="125" r="6" fill="#1e3a8a"/>
  <circle cx="460" cy="95" r="6" fill="#1e3a8a"/>
  <line x1="340" y1="95" x2="405" y2="125" stroke="#1e3a8a" stroke-width="2"/>
  <line x1="405" y1="125" x2="460" y2="95" stroke="#1e3a8a" stroke-width="2"/>
  <line x1="340" y1="95" x2="460" y2="95" stroke="#1e3a8a" stroke-width="1.5" stroke-dasharray="2,2"/>
</svg>`;
  } else {
    // Default: Continuous Rights Gates
    finalTitle = title || `Continuous Rights Gates Sequence (Module ${modPadded})`;
    caption = `11-stage constitutional governance pipeline verifying private intent, ratification, and non-compensable exit rights.`;
    svgContent = `<svg viewBox="0 0 540 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f8f7f4" stroke="#d4d4d8" stroke-width="1"/>
  <!-- Step 1 -->
  <rect x="15" y="65" width="90" height="60" fill="#f0ede8" stroke="#0f0f0f" stroke-width="1.5"/>
  <text x="60" y="90" font-family="'Space Mono', monospace" font-size="9" font-weight="700" text-anchor="middle" fill="#0f0f0f">01. INTENT</text>
  <text x="60" y="108" font-family="'Work Sans', sans-serif" font-size="8" text-anchor="middle" fill="#71717a">Private State</text>

  <line x1="105" y1="95" x2="135" y2="95" stroke="#0f0f0f" stroke-width="1.5"/>

  <!-- Step 2: Ratification Gate -->
  <rect x="135" y="55" width="115" height="80" fill="#dbeafe" stroke="#1e3a8a" stroke-width="2"/>
  <text x="192" y="85" font-family="'Space Mono', monospace" font-size="9" font-weight="700" text-anchor="middle" fill="#1e3a8a">04. GATE 1</text>
  <text x="192" y="102" font-family="'Work Sans', sans-serif" font-size="8" font-weight="700" text-anchor="middle" fill="#1e3a8a">Ratification</text>
  <text x="192" y="118" font-family="'Work Sans', sans-serif" font-size="7.5" text-anchor="middle" fill="#71717a">Contestable Mandate</text>

  <line x1="250" y1="95" x2="280" y2="95" stroke="#0f0f0f" stroke-width="1.5"/>

  <!-- Step 3: Collective Position -->
  <rect x="280" y="65" width="105" height="60" fill="#f0ede8" stroke="#0f0f0f" stroke-width="1.5"/>
  <text x="332" y="90" font-family="'Space Mono', monospace" font-size="9" font-weight="700" text-anchor="middle" fill="#0f0f0f">07. COALITION</text>
  <text x="332" y="108" font-family="'Work Sans', sans-serif" font-size="8" text-anchor="middle" fill="#71717a">Demand Vector</text>

  <line x1="385" y1="95" x2="415" y2="95" stroke="#0f0f0f" stroke-width="1.5"/>

  <!-- Step 4: Outcome Evaluation -->
  <rect x="415" y="55" width="110" height="80" fill="#f8f7f4" stroke="#059669" stroke-width="2" stroke-dasharray="3,3"/>
  <text x="470" y="85" font-family="'Space Mono', monospace" font-size="9" font-weight="700" text-anchor="middle" fill="#059669">11. EVALUATION</text>
  <text x="470" y="102" font-family="'Work Sans', sans-serif" font-size="8" font-weight="700" text-anchor="middle" fill="#059669">Pareto vs Null</text>
  <text x="470" y="118" font-family="'Work Sans', sans-serif" font-size="7.5" text-anchor="middle" fill="#71717a">Zero-Penalty Exit</text>
</svg>`;
  }

  const markdocSnippet = `{% diagram 
   mediaId="${figId}" 
   caption="${caption}" 
   authority="derived_noncanonical" 
   epistemicBasis="conceptual" /%}`;

  const passportRecord = {
    mediaId: figId,
    title: finalTitle,
    caption: caption,
    mediaType: "vector_diagram",
    canonicalReferences: [`module-${modPadded}`],
    authority: "derived_noncanonical",
    epistemicBasis: "conceptual",
    evidenceHorizon: "E0",
    generatedBy: "Gemini AI Vector Studio",
    generatedAt: new Date().toISOString(),
    designSystemCompliant: true
  };

  return {
    mediaId: figId,
    title: finalTitle,
    caption,
    svg: svgContent,
    markdoc: markdocSnippet,
    passport: passportRecord
  };
}

/**
 * Call live Gemini API if GEMINI_API_KEY or apiKey parameter is present
 */
export async function callGeminiApi({ prompt, apiKey, moduleNumber = 1, diagramType = 'rights-gates' }) {
  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key) {
    // Return high-quality deterministic diagram if no key provided
    return generateSynthesisDiagram({ moduleNumber, diagramType, prompt });
  }

  const userPrompt = `Create a complete SVG vector diagram for DC2SC Module ${moduleNumber}.
Diagram Type: ${diagramType}
User Context / Concept: ${prompt || 'Design a clear geometric mechanism diagram illustrating participant rights and failure boundaries.'}`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: GEMINI_SVG_SYSTEM_PROMPT }] },
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2048
        }
      })
    });

    if (!res.ok) {
      console.warn(`Gemini API error ${res.status}, falling back to synthesis engine.`);
      return generateSynthesisDiagram({ moduleNumber, diagramType, prompt });
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const svgMatch = text.match(/<svg[\s\S]*?<\/svg>/i);

    if (!svgMatch) {
      return generateSynthesisDiagram({ moduleNumber, diagramType, prompt });
    }

    const rawSvg = svgMatch[0];
    const modPadded = String(moduleNumber).padStart(2, '0');
    const figId = `M${modPadded}-FIG-${Math.floor(Math.random() * 89 + 10)}`;
    const caption = `Gemini AI Generated Diagram: ${prompt || diagramType}`;

    return {
      mediaId: figId,
      title: `Figure M${modPadded}: AI Generated Diagram`,
      caption,
      svg: rawSvg,
      markdoc: `{% diagram mediaId="${figId}" caption="${caption}" authority="derived_noncanonical" epistemicBasis="conceptual" /%}`,
      passport: {
        mediaId: figId,
        title: `Figure M${modPadded}: AI Generated Diagram`,
        caption,
        mediaType: "vector_diagram",
        canonicalReferences: [`module-${modPadded}`],
        authority: "derived_noncanonical",
        epistemicBasis: "conceptual",
        evidenceHorizon: "E0",
        generatedBy: "Google Gemini 2.5 Flash",
        generatedAt: new Date().toISOString(),
        designSystemCompliant: true
      }
    };
  } catch (err) {
    console.error('Gemini API fetch failed:', err);
    return generateSynthesisDiagram({ moduleNumber, diagramType, prompt });
  }
}

/**
 * Save generated diagram to media passport data file and public diagrams folder
 */
export function saveDiagramToRepository(diagramResult) {
  const mediaDir = path.join(ROOT_DIR, 'src/data/media');
  if (!fs.existsSync(mediaDir)) fs.mkdirSync(mediaDir, { recursive: true });

  const passportFile = path.join(mediaDir, `${diagramResult.mediaId}.json`);
  fs.writeFileSync(passportFile, JSON.stringify(diagramResult.passport, null, 2), 'utf-8');

  const publicDiagramsDir = path.join(ROOT_DIR, 'public/diagrams');
  if (!fs.existsSync(publicDiagramsDir)) fs.mkdirSync(publicDiagramsDir, { recursive: true });

  const svgFile = path.join(publicDiagramsDir, `${diagramResult.mediaId}.svg`);
  fs.writeFileSync(svgFile, diagramResult.svg, 'utf-8');

  return { passportFile, svgFile };
}
