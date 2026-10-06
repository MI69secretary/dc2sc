import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const JOURNAL_DIR = path.join(ROOT_DIR, 'src/content/journal');
const OUTPUT_PDF_DIR = path.join(ROOT_DIR, 'public/pdf');

if (!fs.existsSync(OUTPUT_PDF_DIR)) {
  fs.mkdirSync(OUTPUT_PDF_DIR, { recursive: true });
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
        // Simple transliteration/ASCII mapping for high compatibility
        const code = c.charCodeAt(0);
        if (code === 8217 || code === 8216) return "'";
        if (code === 8220 || code === 8221) return '"';
        if (code === 8212) return ' -- ';
        if (code === 8211) return ' - ';
        if (code === 8230) return '...';
        if (code === 8594) return ' -> ';
        if (code === 8800) return ' != ';
        if (code === 8804) return ' <= ';
        if (code === 8805) return ' >= ';
        if (code === 8734) return ' inf ';
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
      if (y < 160) startNewPage();
      y -= 10;
      const boxHeight = 110;
      const boxY = y - boxHeight;

      currentStream.push(`0.97 0.97 0.99 rg 50 ${boxY} 495 ${boxHeight} re f`);
      currentStream.push(`0.12 0.23 0.54 RG 1 w 50 ${boxY} 495 ${boxHeight} re s`);
      currentStream.push(`0.12 0.23 0.54 rg 50 ${boxY + boxHeight - 20} 495 20 re f`);

      // Formula Title
      currentStream.push('BT /F2 8.5 Tf 1 1 1 rg');
      currentStream.push(`60 ${boxY + boxHeight - 14} Td (${this.escapeText(`${formula.title}   ${formula.equationNumber}`)}) Tj ET`);

      // LaTeX equation text
      currentStream.push('BT /F3 9.5 Tf 0.05 0.05 0.15 rg');
      const eqLines = this.wrapText(formula.latex, 68);
      let eqY = boxY + boxHeight - 38;
      for (const eqLine of eqLines) {
        currentStream.push(`65 ${eqY} Td (${this.escapeText(eqLine)}) Tj ET`);
        eqY -= 13;
      }

      // Description & Variables
      currentStream.push('BT /F1 7.5 Tf 0.3 0.3 0.3 rg');
      const descLines = this.wrapText(formula.description, 90);
      let descY = boxY + 25;
      for (const dline of descLines.slice(0, 2)) {
        currentStream.push(`65 ${descY} Td (${this.escapeText(dline)}) Tj ET`);
        descY -= 10;
      }

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

    // 1: Catalog
    // 2: Pages
    // 3: Font F1 (Helvetica)
    // 4: Font F2 (Helvetica-Bold)
    // 5: Font F3 (Courier)
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
