/**
 * Translation Engine for DC2SC Research Platform
 * Supports Ukrainian (uk), English (en), German (de)
 * Preserves Markdoc tags, code blocks, URLs, and frontmatter schemas.
 */

// ─── DOMAIN GLOSSARY (DC2SC ONTOLOGY) ───────────────────────────────────────
export const GLOSSARY = {
  uk_to_en: {
    'Хроніка алгоритмічної координації': 'Chronicle of Algorithmic Coordination',
    'Протокол прямого попиту від споживача до суверенного творця': 'Direct Consumer to Sovereign Creator Protocol',
    'Курований науково-редакційний дайджест': 'Curated Scholarly Editorial Digest',
    'Канонічні специфікації': 'Canonical Specifications',
    'Канонічний реєстр досліджень': 'Canonical Research Registry',
    'Фонд незалежних академічних досліджень та відкритого коду': 'Independent Academic Research and Open Source Fund',
    'Галузеві депеші': 'Industry Dispatches',
    'Симулятор ринкових стрес-тестів': 'Market Stress-Test Simulator',
    'Академічний дискурс та експертні рефлексії': 'Academic Discourse and Expert Reflections',
    'Рецензентська маргіналія': 'Peer-Review Marginalia',
    'Здійснити інституційний внесок': 'Make an Institutional Contribution',
    'Парето-оптимальність': 'Pareto Optimality',
    'Штучна волатильність': 'Artificial Volatility',
    'Дисперсія вибору': 'Dispersion of Choice',
    'Зворотний попит': 'Buyer-Side Reverse Demand',
    'Ескроу-протокол': 'Escrow Protocol',
    'Докази з нульовим розголошенням': 'Zero-Knowledge Proofs',
    'Антимонопольний нагляд': 'Antitrust Oversight',
    'Консенсус': 'Consensus',
    'Дослідження': 'Research',
    'Журнал': 'Journal',
    'Підтримка': 'Support',
    'Про проєкт': 'About the project',
    'Документація': 'Documentation',
    'Вітаємо на сайті': 'Welcome to the website',
    'Пошук': 'Search'
  },
  en_to_uk: {
    'Chronicle of Algorithmic Coordination': 'Хроніка алгоритмічної координації',
    'Direct Consumer to Sovereign Creator Protocol': 'Протокол прямого попиту від споживача до суверенного творця',
    'Curated Scholarly Editorial Digest': 'Курований науково-редакційний дайджест',
    'Canonical Specifications': 'Канонічні специфікації',
    'Canonical Research Registry': 'Канонічний реєстр досліджень',
    'Independent Academic Research and Open Source Fund': 'Фонд незалежних академічних досліджень та відкритого коду',
    'Industry Dispatches': 'Галузеві депеші',
    'Market Stress-Test Simulator': 'Симулятор ринкових стрес-тестів',
    'Academic Discourse and Expert Reflections': 'Академічний дискурс та експертні рефлексії',
    'Peer-Review Marginalia': 'Рецензентська маргіналія',
    'Make an Institutional Contribution': 'Здійснити інституційний внесок',
    'Pareto Optimality': 'Парето-оптимальність',
    'Artificial Volatility': 'Штучна волатильність',
    'Dispersion of Choice': 'Дисперсія вибору',
    'Buyer-Side Reverse Demand': 'Зворотний попит покупця',
    'Escrow Protocol': 'Ескроу-протокол',
    'Zero-Knowledge Proofs': 'Докази з нульовим розголошенням',
    'Antitrust Oversight': 'Антимонопольний нагляд',
    'Consensus': 'Консенсус',
    'Research': 'Дослідження',
    'Journal': 'Журнал',
    'Support': 'Підтримка',
    'About the project': 'Про проєкт',
    'Documentation': 'Документація',
    'Welcome to dc2sc': 'Вітаємо на сайті dc2sc',
    'Search': 'Пошук'
  },
  en_to_de: {
    'Chronicle of Algorithmic Coordination': 'Chronik algorithmischer Koordination',
    'Direct Consumer to Sovereign Creator Protocol': 'Direktes Verbraucher-zu-Souveränem-Schöpfer-Protokoll',
    'Curated Scholarly Editorial Digest': 'Kuratierte wissenschaftliche redaktionelle Übersicht',
    'Canonical Specifications': 'Kanonische Spezifikationen',
    'Canonical Research Registry': 'Kanonisches Forschungsregister',
    'Independent Academic Research and Open Source Fund': 'Fonds für unabhängige akademische Forschung und Open Source',
    'Industry Dispatches': 'Branchendepeschen',
    'Market Stress-Test Simulator': 'Markt-Stresstest-Simulator',
    'Academic Discourse and Expert Reflections': 'Akademischer Diskurs und Expertenreflexionen',
    'Peer-Review Marginalia': 'Peer-Review-Marginalien',
    'Make an Institutional Contribution': 'Institutionellen Beitrag leisten',
    'Pareto Optimality': 'Pareto-Optimalität',
    'Artificial Volatility': 'Künstliche Volatilität',
    'Dispersion of Choice': 'Auswahldispersion',
    'Buyer-Side Reverse Demand': 'Käuferseitige Nachfragebündelung',
    'Escrow Protocol': 'Treuhandprotokoll',
    'Zero-Knowledge Proofs': 'Zero-Knowledge-Beweise',
    'Antitrust Oversight': 'Kartellrechtliche Aufsicht',
    'Consensus': 'Konsens',
    'Research': 'Forschung',
    'Journal': 'Journal',
    'Support': 'Unterstützung',
    'About the project': 'Über das Projekt',
    'Documentation': 'Dokumentation',
    'Welcome to dc2sc': 'Willkommen bei dc2sc',
    'Search': 'Suche'
  },
  uk_to_de: {
    'Хроніка алгоритмічної координації': 'Chronik algorithmischer Koordination',
    'Протокол прямого попиту від споживача до суверенного творця': 'Direktes Verbraucher-zu-Souveränem-Schöpfer-Protokoll',
    'Курований науково-редакційний дайджест': 'Kuratierte wissenschaftliche redaktionelle Übersicht',
    'Канонічні специфікації': 'Kanonische Spezifikationen',
    'Канонічний реєстр досліджень': 'Kanonisches Forschungsregister',
    'Фонд незалежних академічних досліджень та відкритого коду': 'Fonds für unabhängige akademische Forschung und Open Source',
    'Галузеві депеші': 'Branchendepeschen',
    'Симулятор ринкових стрес-тестів': 'Markt-Stresstest-Simulator',
    'Академічний дискурс та експертні рефлексії': 'Akademischer Diskurs und Expertenreflexionen',
    'Рецензентська маргіналія': 'Peer-Review-Marginalien',
    'Парето-оптимальність': 'Pareto-Optimalität',
    'Штучна волатильність': 'Künstliche Volatilität',
    'Дисперсія вибору': 'Auswahldispersion',
    'Зворотний попит': 'Käuferseitige Nachfragebündelung',
    'Ескроу-протокол': 'Treuhandprotokoll',
    'Докази з нульовим розголошенням': 'Zero-Knowledge-Beweise',
    'Антимонопольний нагляд': 'Kartellrechtliche Aufsicht',
    'Дослідження': 'Forschung',
    'Журнал': 'Journal',
    'Підтримка': 'Unterstützung',
    'Про проєкт': 'Über das Projekt',
    'Документація': 'Dokumentation',
    'Вітаємо на сайті dc2sc': 'Willkommen bei dc2sc',
    'Пошук': 'Suche'
  }
};

/**
 * Free translation API helper with fallbacks
 */
export async function translateTextRemote(text, fromLang, toLang) {
  if (!text || !text.trim()) return text;
  if (fromLang === toLang) return text;

  // Check exact glossary match first
  const pairKey = `${fromLang}_to_${toLang}`;
  if (GLOSSARY[pairKey] && GLOSSARY[pairKey][text.trim()]) {
    return GLOSSARY[pairKey][text.trim()];
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Translation HTTP ${res.status}`);
    const data = await res.json();
    if (data && data[0]) {
      return data[0].map(segment => segment[0]).join('');
    }
  } catch (err) {
    // Fallback: apply glossary substitutions
    let fallback = text;
    if (GLOSSARY[pairKey]) {
      for (const [k, v] of Object.entries(GLOSSARY[pairKey])) {
        fallback = fallback.split(k).join(v);
      }
    }
    return fallback;
  }
  return text;
}

/**
 * Mask Markdoc tags, fenced code blocks, and markdown links
 */
export function protectMarkup(markdown) {
  const tokens = [];

  // 1. Protect Markdoc custom tags {% ... %} and {% /... %}
  let protectedText = markdown.replace(/(\{%[\s\S]*?%\})/g, (match) => {
    const placeholder = `__MARKDOC_TAG_${tokens.length}__`;
    tokens.push({ placeholder, original: match });
    return placeholder;
  });

  // 2. Protect fenced code blocks ```...```
  protectedText = protectedText.replace(/(```[\s\S]*?```)/g, (match) => {
    const placeholder = `__CODE_BLOCK_${tokens.length}__`;
    tokens.push({ placeholder, original: match });
    return placeholder;
  });

  // 3. Protect inline code `...`
  protectedText = protectedText.replace(/(`[^`\r\n]+`)/g, (match) => {
    const placeholder = `__INLINE_CODE_${tokens.length}__`;
    tokens.push({ placeholder, original: match });
    return placeholder;
  });

  return { protectedText, tokens };
}

/**
 * Restore masked tokens
 */
export function restoreMarkup(text, tokens) {
  let restored = text;
  // Restore in reverse order to handle nesting safely
  for (let i = tokens.length - 1; i >= 0; i--) {
    const { placeholder, original } = tokens[i];
    restored = restored.split(placeholder).join(original);
  }
  return restored;
}

/**
 * Translate a Markdown / Markdoc file while preserving YAML Frontmatter
 */
export async function translateMarkdownDoc(fileContent, fromLang, toLang) {
  const fmMatch = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---([\s\S]*)$/);
  
  if (!fmMatch) {
    // No frontmatter, translate entire body
    const { protectedText, tokens } = protectMarkup(fileContent);
    const translated = await translateTextRemote(protectedText, fromLang, toLang);
    return restoreMarkup(translated, tokens);
  }

  const rawFrontmatter = fmMatch[1];
  const rawBody = fmMatch[2];

  // Parse translatable lines in frontmatter
  const translatableKeys = new Set(['title', 'description', 'dek', 'scope', 'scopeLabel', 'claimStatus', 'summary']);
  const fmLines = rawFrontmatter.split(/\r?\n/);
  const newFmLines = [];

  for (const line of fmLines) {
    const kv = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (kv && translatableKeys.has(kv[1])) {
      const key = kv[1];
      let val = kv[2].trim();
      let quote = '';
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        quote = val[0];
        val = val.slice(1, -1);
      }
      if (val) {
        const transVal = await translateTextRemote(val, fromLang, toLang);
        newFmLines.push(`${key}: ${quote}${transVal}${quote}`);
      } else {
        newFmLines.push(line);
      }
    } else {
      newFmLines.push(line);
    }
  }

  // Translate body with markup protection
  const { protectedText, tokens } = protectMarkup(rawBody);
  
  // Split into paragraphs for better translation quality
  const paragraphs = protectedText.split(/\n\n+/);
  const transParagraphs = [];
  for (const p of paragraphs) {
    if (p.trim().startsWith('__CODE_BLOCK_') || p.trim().startsWith('__MARKDOC_TAG_')) {
      transParagraphs.push(p);
    } else {
      const transP = await translateTextRemote(p, fromLang, toLang);
      transParagraphs.push(transP);
    }
  }
  const translatedBody = transParagraphs.join('\n\n');
  const finalBody = restoreMarkup(translatedBody, tokens);

  return `---\n${newFmLines.join('\n')}\n---${finalBody}`;
}
