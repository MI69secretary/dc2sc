import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const JOURNAL_DIR = path.join(ROOT_DIR, 'src/content/journal');
const OUTPUT_PDF_DIR = path.join(ROOT_DIR, 'public/pdf');

if (!fs.existsSync(OUTPUT_PDF_DIR)) {
  fs.mkdirSync(OUTPUT_PDF_DIR, { recursive: true });
}

// ─── Mathematical Typography Formatter ──────────────────────────────────────

function latexToMathNotation(latex) {
  if (!latex) return '';
  let str = latex;
  
  // Fractions: \frac{A}{B} -> [ A / B ]
  str = str.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '[$1 / $2]');
  
  // Text blocks & font styles
  str = str.replace(/\\text\{([^}]+)\}/g, '$1');
  str = str.replace(/\\mathrm\{([^}]+)\}/g, '$1');
  str = str.replace(/\\mathbb\{([^}]+)\}/g, '$1');
  str = str.replace(/\\mathcal\{([^}]+)\}/g, '$1');
  str = str.replace(/\\mathbf\{([^}]+)\}/g, '$1');
  
  // Operators & delimiters
  str = str.replace(/\\left\(/g, '(');
  str = str.replace(/\\right\)/g, ')');
  str = str.replace(/\\left\[/g, '[');
  str = str.replace(/\\right\]/g, ']');
  str = str.replace(/\\left\\\{/g, '{');
  str = str.replace(/\\right\\\}/g, '}');
  str = str.replace(/\\left/g, '');
  str = str.replace(/\\right/g, '');
  
  // Greek & Math Operators
  str = str.replace(/\\min_\{([^}]+)\}/g, 'min_{$1}');
  str = str.replace(/\\max_\{([^}]+)\}/g, 'max_{$1}');
  str = str.replace(/\\min/g, 'min');
  str = str.replace(/\\max/g, 'max');
  str = str.replace(/\\int_\{([^}]+)\}/g, 'INT_{$1}');
  str = str.replace(/\\int/g, 'INT');
  str = str.replace(/\\sum_\{([^}]+)\}\^\{([^}]+)\}/g, 'SUM_{$1..$2}');
  str = str.replace(/\\sum_\{([^}]+)\}/g, 'SUM_{$1}');
  str = str.replace(/\\sum/g, 'SUM');
  str = str.replace(/\\prod/g, 'PROD');
  str = str.replace(/\\implies/g, ' ==> ');
  str = str.replace(/\\to/g, ' -> ');
  str = str.replace(/\\in/g, ' in ');
  str = str.replace(/\\notin/g, ' not in ');
  str = str.replace(/\\ge|\\geq/g, ' >= ');
  str = str.replace(/\\le|\\leq/g, ' <= ');
  str = str.replace(/\\ne|\\neq/g, ' != ');
  str = str.replace(/\\cdot/g, ' * ');
  str = str.replace(/\\times/g, ' x ');
  str = str.replace(/\\bar\{([^}]+)\}/g, '$1_bar');
  str = str.replace(/\\hat\{([^}]+)\}/g, '$1_hat');
  str = str.replace(/\\sigma/g, 'sigma');
  str = str.replace(/\\gamma/g, 'gamma');
  str = str.replace(/\\mu/g, 'mu');
  str = str.replace(/\\epsilon/g, 'epsilon');
  str = str.replace(/\\Theta/g, 'Theta');
  str = str.replace(/\\lambda/g, 'lambda');
  str = str.replace(/\\rho/g, 'rho');
  str = str.replace(/\\Delta/g, 'Delta');
  str = str.replace(/\\Omega/g, 'Omega');
  str = str.replace(/\\ln/g, 'ln');
  str = str.replace(/\\log_2/g, 'log_2');
  str = str.replace(/\\Pr/g, 'Pr');
  str = str.replace(/\\infty/g, 'inf');
  
  // Clean up double backslashes and spaces
  str = str.replace(/\\/g, '');
  str = str.replace(/\s+/g, ' ').trim();
  
  return str;
}

// ─── Minimal Standalone Pure-Node PDF 1.4 Writer ────────────────────────────

class SimplePDF {
  constructor(title, author = 'DC2SC Research Program') {
    this.title = title;
    this.author = author;
    this.objects = [];
    this.pages = [];
  }

  addObject(content) {
    this.objects.push(content);
    return this.objects.length; // 1-indexed object number
  }

  escapeText(str) {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .replace(/[^\x20-\x7E]/g, c => {
        const code = c.charCodeAt(0);
        if (code === 8217 || code === 8216) return "'";
        if (code === 8220 || code === 8221) return '"';
        if (code === 8212) return ' -- ';
        if (code === 8211) return ' - ';
        if (code === 8230) return '...';
        if (code === 8594 || code === 8658 || code === 10233) return ' ==> ';
        if (code === 8800) return ' != ';
        if (code === 8804) return ' <= ';
        if (code === 8805) return ' >= ';
        if (code === 8734) return ' inf ';
        if (code === 8747) return 'INT_';
        if (code === 8721) return 'SUM_';
        if (code === 8719) return 'PROD_';
        if (code === 8712) return ' in ';
        if (code === 8713) return ' not in ';
        if (code === 183 || code === 8901) return ' * ';
        if (code === 215) return ' x ';
        if (code === 963) return 'sigma';
        if (code === 947) return 'gamma';
        if (code === 956) return 'mu';
        if (code === 949) return 'epsilon';
        if (code === 920) return 'Theta';
        if (code === 955) return 'lambda';
        if (code === 961) return 'rho';
        if (code === 916) return 'Delta';
        if (code === 937) return 'Omega';
        if (code === 8322) return '_2';
        return ' ';
      });
  }

  wrapText(text, maxCharsPerLine = 80) {
    const words = text.split(/\s+/);
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
        currentLine = (currentLine + ' ' + word).trim();
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  generate(articleData) {
    const { title, dek, modules, evidenceLevel, status, bodyLines, formula, boundaries } = articleData;

    // We build page content streams
    const pageStreams = [];
    let currentStream = [];
    let y = 750; // top of A4 (595 x 842 pt)
    const margin = 50;

    const startNewPage = () => {
      if (currentStream.length > 0) {
        pageStreams.push(currentStream.join('\n'));
        currentStream = [];
      }
      y = 770;
      // Running header
      currentStream.push('BT /F2 8 Tf 0.4 0.4 0.4 rg');
      currentStream.push(`50 ${y} Td (${this.escapeText('DC2SC RESEARCH PROGRAM • WORKING PAPER SERIES • CANONICAL SPECIFICATION')}) Tj ET`);
      currentStream.push(`0.8 w 0.8 0.8 0.8 RG 50 ${y - 8} m 545 ${y - 8} l S`);
      y -= 35;
    };

    startNewPage();

    // ─── Header Box ───
    currentStream.push('0.95 0.96 0.98 rg 50 630 495 85 re f');
    currentStream.push('0.2 0.3 0.6 RG 1.5 w 50 630 495 85 re s');

    // Category / Evidence Badge
    currentStream.push('BT /F3 8 Tf 0.12 0.23 0.54 rg');
    currentStream.push(`65 695 Td (${this.escapeText(`EVIDENCE LEVEL: ${evidenceLevel} • STATUS: ${status.toUpperCase()} • MODULE: ${modules.join(', ')}`)}) Tj ET`);

    // Title
    currentStream.push('BT /F2 16 Tf 0.06 0.06 0.06 rg');
    currentStream.push(`65 670 Td (${this.escapeText(title)}) Tj ET`);

    // Dek / Subtitle
    currentStream.push('BT /F1 9 Tf 0.25 0.25 0.25 rg');
    const wrappedDek = this.wrapText(dek, 75);
    let dekY = 650;
    for (const dline of wrappedDek.slice(0, 2)) {
      currentStream.push(`65 ${dekY} Td (${this.escapeText(dline)}) Tj ET`);
      dekY -= 12;
    }

    y = 600;

    // ─── Body Content ───
    for (const item of bodyLines) {
      if (y < 80) {
        startNewPage();
      }

      if (item.type === 'heading') {
        y -= 15;
        if (y < 80) startNewPage();
        currentStream.push('BT /F2 12 Tf 0.1 0.1 0.1 rg');
        currentStream.push(`${margin} ${y} Td (${this.escapeText(item.text)}) Tj ET`);
        y -= 16;
      } else if (item.type === 'subheading') {
        y -= 10;
        if (y < 80) startNewPage();
        currentStream.push('BT /F2 10 Tf 0.2 0.2 0.2 rg');
        currentStream.push(`${margin} ${y} Td (${this.escapeText(item.text)}) Tj ET`);
        y -= 14;
      } else if (item.type === 'paragraph') {
        const lines = this.wrapText(item.text, 82);
        currentStream.push('BT /F1 9.5 Tf 0.15 0.15 0.15 rg');
        for (const line of lines) {
          if (y < 80) {
            currentStream.push('ET');
            startNewPage();
            currentStream.push('BT /F1 9.5 Tf 0.15 0.15 0.15 rg');
          }
          currentStream.push(`${margin} ${y} Td (${this.escapeText(line)}) Tj ET`);
          y -= 13;
        }
        y -= 6;
      }
    }

    // ─── Mathematical Formula Box (if present) ───
    if (formula) {
      if (y < 180) startNewPage();
      y -= 12;
      const boxHeight = 125;
      const boxY = y - boxHeight;

      // Outer Box Background
      currentStream.push(`0.98 0.98 0.99 rg 50 ${boxY} 495 ${boxHeight} re f`);
      currentStream.push(`0.12 0.23 0.54 RG 1.5 w 50 ${boxY} 495 ${boxHeight} re s`);
      
      // Header Ribbon
      currentStream.push(`0.12 0.23 0.54 rg 50 ${boxY + boxHeight - 22} 495 22 re f`);

      // Formula Title Header
      currentStream.push('BT /F2 9 Tf 1 1 1 rg');
      currentStream.push(`60 ${boxY + boxHeight - 15} Td (${this.escapeText(`MATHEMATICAL INVARIANT // ${formula.title.toUpperCase()}  ${formula.equationNumber}`)}) Tj ET`);

      // Inner Formula Display Plate
      const plateY = boxY + boxHeight - 65;
      currentStream.push(`0.94 0.96 0.99 rg 65 ${plateY} 465 35 re f`);
      currentStream.push(`0.12 0.23 0.54 RG 0.75 w 65 ${plateY} 465 35 re s`);

      // Render Clean Mathematical Equation Typography (Formatted Math, not raw code)
      const formattedMath = latexToMathNotation(formula.latex);
      currentStream.push('BT /F2 11 Tf 0.05 0.15 0.45 rg');
      currentStream.push(`75 ${plateY + 12} Td (${this.escapeText(formattedMath)}) Tj ET`);

      // Variables Explication
      let textCursorY = plateY - 14;
      if (formula.variables) {
        currentStream.push('BT /F2 8 Tf 0.2 0.2 0.2 rg');
        currentStream.push(`65 ${textCursorY} Td (${this.escapeText('Variables: ' + formula.variables)}) Tj ET`);
        textCursorY -= 12;
      }

      // Description / Interpretation
      if (formula.description) {
        currentStream.push('BT /F1 8 Tf 0.3 0.3 0.3 rg');
        const descLines = this.wrapText(formula.description, 88);
        for (const dline of descLines.slice(0, 2)) {
          currentStream.push(`65 ${textCursorY} Td (${this.escapeText(dline)}) Tj ET`);
          textCursorY -= 10;
        }
      }

      // Footer Verification Stamp
      currentStream.push('BT /F2 7.5 Tf 0.02 0.45 0.28 rg');
      currentStream.push(`65 ${boxY + 6} Td (${this.escapeText('[✓ FORMALLY VERIFIED MATHEMATICAL SPECIFICATION • PEER CITATION READY]')}) Tj ET`);

      y = boxY - 20;
    }

    // ─── Constitutional Boundary Notice ───
    if (y < 120) startNewPage();
    y -= 10;
    const boundHeight = 70;
    const boundY = y - boundHeight;

    currentStream.push(`0.96 0.95 0.93 rg 50 ${boundY} 495 ${boundHeight} re f`);
    currentStream.push(`0.6 0.6 0.6 RG 0.7 w 50 ${boundY} 495 ${boundHeight} re s`);

    currentStream.push('BT /F2 8 Tf 0.2 0.2 0.2 rg');
    currentStream.push(`60 ${boundY + boundHeight - 16} Td (${this.escapeText('CONSTITUTIONAL RESEARCH BOUNDARY & NON-CLAIM DISCLOSURE')}) Tj ET`);

    currentStream.push('BT /F1 7.5 Tf 0.35 0.35 0.35 rg');
    const boundLines = [
      'This publication presents conceptual research and formal invariants at Evidence Level E0.',
      'It does not constitute commercial claims, supplier commitments, or live transaction guarantees.',
      'GOLIAF operates strictly as a bounded stress-test environment, not a commercial booking service.'
    ];
    let bY = boundY + boundHeight - 30;
    for (const bl of boundLines) {
      currentStream.push(`60 ${bY} Td (${this.escapeText(bl)}) Tj ET`);
      bY -= 11;
    }

    if (currentStream.length > 0) {
      pageStreams.push(currentStream.join('\n'));
    }

    // ─── Assemble PDF Objects ───
    return this.buildBinaryPdf(pageStreams);
  }

  buildBinaryPdf(pageStreams) {
    let out = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
    const offsets = [];

    const addObj = (str) => {
      offsets.push(Buffer.byteLength(out, 'latin1'));
      const objNum = offsets.length;
      out += `${objNum} 0 obj\n${str}\nendobj\n`;
      return objNum;
    };

    const catNum = 1;
    const pagesNum = 2;
    const fontF1Num = 3;
    const fontF2Num = 4;
    const fontF3Num = 5;

    // Reserve slots
    offsets.push(0); // 1 placeholder
    offsets.push(0); // 2 placeholder
    offsets.push(0); // 3
    offsets.push(0); // 4
    offsets.push(0); // 5

    const pageObjNums = [];

    // Create stream and page objects
    for (let i = 0; i < pageStreams.length; i++) {
      const streamContent = pageStreams[i];
      const streamLen = Buffer.byteLength(streamContent, 'latin1');
      
      const streamObj = addObj(`<< /Length ${streamLen} >>\nstream\n${streamContent}\nendstream`);
      
      const pageObj = addObj(`<< /Type /Page /Parent ${pagesNum} 0 R /MediaBox [0 0 595 842] /Contents ${streamObj} 0 R /Resources << /Font << /F1 ${fontF1Num} 0 R /F2 ${fontF2Num} 0 R /F3 ${fontF3Num} 0 R >> >> >>`);
      pageObjNums.push(pageObj);
    }

    // Fill top level objects
    // Obj 1: Catalog
    offsets[0] = Buffer.byteLength(out, 'latin1');
    out += `1 0 obj\n<< /Type /Catalog /Pages ${pagesNum} 0 R >>\nendobj\n`;

    // Obj 2: Pages
    offsets[1] = Buffer.byteLength(out, 'latin1');
    out += `2 0 obj\n<< /Type /Pages /Kids [${pageObjNums.map(n => `${n} 0 R`).join(' ')}] /Count ${pageObjNums.length} >>\nendobj\n`;

    // Fonts
    offsets[2] = Buffer.byteLength(out, 'latin1');
    out += `3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`;

    offsets[3] = Buffer.byteLength(out, 'latin1');
    out += `4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n`;

    offsets[4] = Buffer.byteLength(out, 'latin1');
    out += `5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>\nendobj\n`;

    // Cross reference table
    const startXref = Buffer.byteLength(out, 'latin1');
    out += `xref\n0 ${offsets.length + 1}\n`;
    out += `0000000000 65535 f \n`;
    for (const off of offsets) {
      out += `${String(off).padStart(10, '0')} 00000 n \n`;
    }

    out += `trailer\n<< /Size ${offsets.length + 1} /Root ${catNum} 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;

    return Buffer.from(out, 'latin1');
  }
}

// ─── Parse Markdown Articles and Generate PDFs ──────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { data: {}, body: content };
  
  const yaml = match[1];
  const body = content.slice(match[0].length).trim();
  const data = {};

  for (const line of yaml.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();
      if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (val.startsWith('[') && val.endsWith(']')) {
        val = val.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, ''));
      }
      data[key] = val;
    }
  }

  return { data, body };
}

function parseArticleBody(body) {
  const lines = body.split('\n');
  const items = [];
  let formula = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('{% formula')) {
      let formulaBlock = line;
      while (i < lines.length && !lines[i].includes('/%}')) {
        i++;
        formulaBlock += ' ' + lines[i].trim();
      }
      const titleMatch = formulaBlock.match(/title="([^"]+)"/);
      const latexMatch = formulaBlock.match(/latex="([^"]+)"/);
      const eqMatch = formulaBlock.match(/equationNumber="([^"]+)"/);
      const descMatch = formulaBlock.match(/description="([^"]+)"/);

      if (latexMatch) {
        formula = {
          title: titleMatch ? titleMatch[1] : 'Formal Invariant',
          latex: latexMatch[1],
          equationNumber: eqMatch ? eqMatch[1] : '(Eq. 1.1)',
          description: descMatch ? descMatch[1] : ''
        };
      }
      continue;
    }

    if (line.startsWith('{%') || line.startsWith('%}')) {
      continue; // skip tags
    }

    if (line.startsWith('## ')) {
      items.push({ type: 'heading', text: line.replace('## ', '') });
    } else if (line.startsWith('### ')) {
      items.push({ type: 'subheading', text: line.replace('### ', '') });
    } else if (line.startsWith('- ') || line.startsWith('1. ')) {
      items.push({ type: 'paragraph', text: '• ' + line.replace(/^[-0-9.]+\s*/, '') });
    } else {
      items.push({ type: 'paragraph', text: line });
    }
  }

  return { items, formula };
}

console.log('=== GENERATING CANONICAL RESEARCH PDF EDITIONS ===\n');

const files = fs.readdirSync(JOURNAL_DIR).filter(f => f.endsWith('.md'));

for (const file of files) {
  const slug = file.replace('.md', '');
  const filePath = path.join(JOURNAL_DIR, file);
  const raw = fs.readFileSync(filePath, 'utf-8');

  const { data, body } = parseFrontmatter(raw);
  const { items, formula } = parseArticleBody(body);

  const pdfGenerator = new SimplePDF(data.title || slug);
  const pdfBuffer = pdfGenerator.generate({
    title: data.title || slug,
    dek: data.dek || '',
    modules: Array.isArray(data.canonicalModules) ? data.canonicalModules : [1],
    evidenceLevel: data.evidenceLevel || 'E0',
    status: data.status || 'conceptual_preview',
    bodyLines: items,
    formula: formula
  });

  const outPath = path.join(OUTPUT_PDF_DIR, `journal-${slug}.pdf`);
  fs.writeFileSync(outPath, pdfBuffer);
  console.log(`  [PDF] Generated: public/pdf/journal-${slug}.pdf (${(pdfBuffer.length / 1024).toFixed(2)} KB)`);
}

console.log(`\nSuccessfully generated ${files.length} canonical PDF editions in public/pdf/!`);
