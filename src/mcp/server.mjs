#!/usr/bin/env node

/**
 * DC2SC Model Context Protocol (MCP) Server
 * 
 * Provides an MCP tool interface for LLM agents (Claude, ChatGPT, Cursor, Windsurf, Claude Code)
 * to read, comment on, validate, and publish research articles directly to the DC2SC platform.
 * 
 * Protocol: JSON-RPC 2.0 over Stdio (MCP Specification)
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../../');

const JOURNAL_DIR = path.join(ROOT_DIR, 'src/content/journal');
const RESEARCH_DIR = path.join(ROOT_DIR, 'src/content/research');
const DISCUSSIONS_DIR = path.join(ROOT_DIR, 'src/content/discussions');
const GOLIAF_DIR = path.join(ROOT_DIR, 'src/content/goliaf');

// ─── Utility Helpers ────────────────────────────────────────────────────────

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { data: {}, body: raw };
  const yaml = match[1];
  const body = raw.slice(match[0].length).trim();
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

function stringifyFrontmatter(data, body) {
  let yaml = '---\n';
  for (const [key, val] of Object.entries(data)) {
    if (Array.isArray(val)) {
      yaml += `${key}:\n`;
      for (const item of val) {
        yaml += `  - '${item.replace(/'/g, "\\'")}'\n`;
      }
    } else if (typeof val === 'boolean' || typeof val === 'number') {
      yaml += `${key}: ${val}\n`;
    } else {
      yaml += `${key}: '${String(val).replace(/'/g, "\\'")}'\n`;
    }
  }
  yaml += '---\n\n';
  return yaml + body.trim() + '\n';
}

// ─── Tool Definitions ───────────────────────────────────────────────────────

const TOOLS = [
  {
    name: 'list_articles',
    description: 'Lists all published and draft research articles in the DC2SC journal and research modules with their metadata (slug, title, evidence level, canonical modules).',
    inputSchema: {
      type: 'object',
      properties: {
        collection: {
          type: 'string',
          enum: ['journal', 'research', 'goliaf', 'all'],
          description: 'Content collection to list (default: all)',
        },
      },
    },
  },
  {
    name: 'read_article',
    description: 'Reads the full content, frontmatter metadata, and mathematical formula blocks of a specific research essay or canonical specification.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: { type: 'string', description: 'Slug of the article (e.g., more-choice-less-voice)' },
        collection: {
          type: 'string',
          enum: ['journal', 'research', 'goliaf'],
          description: 'Content collection (default: journal)',
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'publish_article',
    description: 'Creates or updates a research article in the DC2SC journal with constitutional discipline (checks non-claims, evidence level, and triggers automatic PDF generation).',
    inputSchema: {
      type: 'object',
      properties: {
        slug: { type: 'string', description: 'Unique URL slug for the article' },
        title: { type: 'string', description: 'Full academic title' },
        dek: { type: 'string', description: 'One-sentence analytical deck / summary' },
        canonicalModules: {
          type: 'array',
          items: { type: 'number' },
          description: 'Related canonical module numbers (e.g. [1, 2])',
        },
        topics: {
          type: 'array',
          items: { type: 'string' },
          description: 'Topic tags (e.g. ["Collective agency", "Market isolation"])',
        },
        whatThisDoesNotClaim: {
          type: 'array',
          items: { type: 'string' },
          description: 'Mandatory fail-closed boundary non-claims (minimum 2 items required)',
        },
        researchQuestions: {
          type: 'array',
          items: { type: 'string' },
          description: 'Leading unresolved research questions',
        },
        body: { type: 'string', description: 'Article body in Markdoc/Markdown with optional {% formula %} tags' },
      },
      required: ['slug', 'title', 'dek', 'body', 'whatThisDoesNotClaim'],
    },
  },
  {
    name: 'add_discussion_or_comment',
    description: 'Submits a peer review comment, research question, counterexample, or methodological objection to the curated discussion layer.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Unique identifier for discussion (e.g., objection-scale-drift)' },
        type: {
          type: 'string',
          enum: ['research_question', 'counterexample', 'methodological_objection'],
          description: 'Classification of discussion entry',
        },
        topic: { type: 'string', description: 'Relevant topic domain (e.g., Exit, Representation, Commitment)' },
        body: { type: 'string', description: 'The analytical text of the question or objection' },
        author: { type: 'string', description: 'Attribution name or role (e.g. External Reviewer)' },
      },
      required: ['id', 'type', 'topic', 'body'],
    },
  },
  {
    name: 'list_mathematical_invariants',
    description: 'Retrieves all formal LaTeX mathematical invariants, definitions, lemmas, and theorems across Modules 01–07.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'sync_and_rebuild_artifacts',
    description: 'Executes repository maintenance: regenerates all article PDF papers, synchronizes translations (uk/en/de), and updates the Google Drive manifest.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'verify_system_integrity',
    description: 'Runs the full Keystatic reader suite (24 collections) and fail-closed negative security tests.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ingest_external_signal',
    description: 'Pushes a discovered publication, Substack post, X/Twitter thread, or arXiv pre-print directly into the Keystatic republication queue for editorial review.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: { type: 'string', description: 'Unique slug for the signal' },
        title: { type: 'string', description: 'Title or header of the post' },
        author: { type: 'string', description: 'Author name or handle (e.g. @vitalikbuterin)' },
        sourcePlatform: {
          type: 'string',
          enum: ['substack', 'twitter', 'arxiv', 'medium', 'blog'],
          description: 'Original platform',
        },
        originalUrl: { type: 'string', description: 'URL to original post' },
        publishedDate: { type: 'string', description: 'Date of post (e.g. 05 ЖОВТНЯ 2026)' },
        summary: { type: 'string', description: 'Concise summary of findings' },
        keyQuote: { type: 'string', description: 'Key resonant quote or excerpt' },
        relatedModule: { type: 'number', description: 'Related canonical module number (1-7)' },
        curatorTags: {
          type: 'array',
          items: { type: 'string' },
          description: 'Relevant concept tags',
        },
        republicationStatus: {
          type: 'string',
          enum: ['inbox', 'editorial_review', 'approved', 'rejected'],
          description: 'Initial queue status (default: inbox)',
        },
      },
      required: ['title', 'author', 'sourcePlatform', 'originalUrl', 'summary', 'keyQuote'],
    },
  },
  {
    name: 'list_curated_signals',
    description: 'Lists all discovered external signals, tweets, and articles currently in the Keystatic republication inbox.',
    inputSchema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['all', 'inbox', 'approved', 'editorial_review'],
          description: 'Filter signals by status (default: all)',
        },
      },
    },
  },
  {
    name: 'generate_vector_diagram',
    description: 'Generates a publication-grade SVG vector diagram, Markdoc embedding snippet, and Media Passport record for DC2SC research essays using Gemini AI or academic synthesis.',
    inputSchema: {
      type: 'object',
      properties: {
        moduleNumber: { type: 'number', description: 'Canonical module number (1-7)' },
        diagramType: {
          type: 'string',
          enum: ['rights-gates', 'payoff-tree', 'pareto-curve', 'market-isolation', 'constraint-matrix'],
          description: 'Type of diagram archetype to generate',
        },
        prompt: { type: 'string', description: 'Description or specific conceptual scenario for the diagram' },
        title: { type: 'string', description: 'Title of the figure' },
        saveToRepository: { type: 'boolean', description: 'Whether to save the diagram to src/data/media/ and public/diagrams/ (default: true)' },
      },
      required: ['moduleNumber'],
    },
  },
];

// ─── Tool Handlers ──────────────────────────────────────────────────────────

async function handleToolCall(name, args) {
  switch (name) {
    case 'list_articles': {
      const col = args?.collection || 'all';
      const results = [];

      const scanDir = (dir, collectionName) => {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') || f.endsWith('.mdoc'));
        for (const file of files) {
          const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
          const { data } = parseFrontmatter(raw);
          results.push({
            collection: collectionName,
            slug: file.replace(/\.(md|mdoc)$/, ''),
            title: data.title || file,
            dek: data.dek || '',
            evidenceLevel: data.evidenceLevel || 'E0',
            status: data.status || data.lifecycleStatus || 'published',
            canonicalModules: data.canonicalModules || [],
          });
        }
      };

      if (col === 'journal' || col === 'all') scanDir(JOURNAL_DIR, 'journal');
      if (col === 'research' || col === 'all') scanDir(RESEARCH_DIR, 'research');
      if (col === 'goliaf' || col === 'all') scanDir(GOLIAF_DIR, 'goliaf');

      return { count: results.length, articles: results };
    }

    case 'read_article': {
      const col = args.collection || 'journal';
      let dir = JOURNAL_DIR;
      if (col === 'research') dir = RESEARCH_DIR;
      if (col === 'goliaf') dir = GOLIAF_DIR;

      const candidates = [`${args.slug}.md`, `${args.slug}.mdoc`];
      let filePath = null;
      for (const c of candidates) {
        const p = path.join(dir, c);
        if (fs.existsSync(p)) {
          filePath = p;
          break;
        }
      }

      if (!filePath) {
        throw new Error(`Article not found with slug "${args.slug}" in collection "${col}"`);
      }

      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, body } = parseFrontmatter(raw);
      return { slug: args.slug, collection: col, frontmatter: data, body };
    }

    case 'publish_article': {
      if (!args.whatThisDoesNotClaim || args.whatThisDoesNotClaim.length < 2) {
        throw new Error('Fail-closed validation: Articles must define at least 2 explicit whatThisDoesNotClaim boundaries.');
      }

      const frontmatter = {
        title: args.title,
        dek: args.dek,
        contentKind: 'editorial_article',
        canonicalState: 'none',
        visibility: 'public',
        lifecycleStatus: 'published',
        claimState: 'active',
        researchRole: 'analytical_framework',
        indexable: true,
        includeInSitemap: true,
        includeInRss: true,
        claimLevel: 'CONCEPT',
        evidenceLevel: 'E0',
        canonicalModules: args.canonicalModules || [1],
        topics: args.topics || ['Collective agency'],
        featured: false,
        whatThisDoesNotClaim: args.whatThisDoesNotClaim,
        researchQuestions: args.researchQuestions || [],
      };

      const fullContent = stringifyFrontmatter(frontmatter, args.body);
      const targetFile = path.join(JOURNAL_DIR, `${args.slug}.md`);
      fs.writeFileSync(targetFile, fullContent, 'utf-8');

      // Automatically generate updated PDFs & manifest
      try {
        execSync('node src/lib/generate-article-pdfs.mjs', { cwd: ROOT_DIR });
        execSync('node src/lib/generate-drive-manifest.mjs', { cwd: ROOT_DIR });
      } catch (e) {
        // non-blocking
      }

      return {
        success: true,
        message: `Article "${args.title}" published successfully to src/content/journal/${args.slug}.md`,
        pdfUrl: `/pdf/journal-${args.slug}.pdf`,
      };
    }

    case 'add_discussion_or_comment': {
      const discussionEntry = {
        status: 'demo',
        isDemo: true,
        type: args.type,
        topic: args.topic,
        body: args.body,
        author: args.author || 'Reviewer',
        source: 'mcp-agent',
        consentStatus: 'demo',
        featured: true,
      };

      if (!fs.existsSync(DISCUSSIONS_DIR)) {
        fs.mkdirSync(DISCUSSIONS_DIR, { recursive: true });
      }

      const targetFile = path.join(DISCUSSIONS_DIR, `${args.id}.json`);
      fs.writeFileSync(targetFile, JSON.stringify(discussionEntry, null, 2), 'utf-8');

      return {
        success: true,
        message: `Discussion entry "${args.id}" saved to src/content/discussions/${args.id}.json`,
      };
    }

    case 'list_mathematical_invariants': {
      const invariants = [];
      const files = fs.readdirSync(JOURNAL_DIR).filter(f => f.endsWith('.md'));

      for (const file of files) {
        const raw = fs.readFileSync(path.join(JOURNAL_DIR, file), 'utf-8');
        const match = raw.match(/\{%\s*formula([\s\S]*?)\/%\}/);
        if (match) {
          const block = match[1];
          const fId = block.match(/formulaId="([^"]+)"/)?.[1] || '';
          const title = block.match(/title="([^"]+)"/)?.[1] || '';
          const latex = block.match(/latex="([^"]+)"/)?.[1] || '';
          const eqNum = block.match(/equationNumber="([^"]+)"/)?.[1] || '';
          const thType = block.match(/theoremType="([^"]+)"/)?.[1] || '';
          const vars = block.match(/variables="([^"]+)"/)?.[1] || '';
          const desc = block.match(/description="([^"]+)"/)?.[1] || '';

          invariants.push({
            articleSlug: file.replace('.md', ''),
            formulaId: fId,
            title,
            latex,
            equationNumber: eqNum,
            theoremType: thType,
            variables: vars,
            description: desc,
          });
        }
      }
      return { total: invariants.length, invariants };
    }

    case 'sync_and_rebuild_artifacts': {
      const pdfOut = execSync('node src/lib/generate-article-pdfs.mjs', { cwd: ROOT_DIR, encoding: 'utf-8' });
      const transOut = execSync('node src/lib/sync-translations.mjs', { cwd: ROOT_DIR, encoding: 'utf-8' });
      const driveOut = execSync('node src/lib/generate-drive-manifest.mjs', { cwd: ROOT_DIR, encoding: 'utf-8' });

      return {
        success: true,
        pdfOutput: pdfOut.trim(),
        translationOutput: transOut.trim(),
        driveOutput: driveOut.trim(),
      };
    }

    case 'verify_system_integrity': {
      const readerOut = execSync('node src/lib/verify-keystatic-reader.mjs', { cwd: ROOT_DIR, encoding: 'utf-8' });
      const testsOut = execSync('node src/lib/run-negative-tests.mjs', { cwd: ROOT_DIR, encoding: 'utf-8' });

      return {
        success: true,
        readerSummary: readerOut.trim(),
        negativeTestsSummary: testsOut.trim(),
      };
    }

    case 'ingest_external_signal': {
      const signalsDir = path.join(ROOT_DIR, 'src/content/signals');
      if (!fs.existsSync(signalsDir)) fs.mkdirSync(signalsDir, { recursive: true });

      const slug = args.slug || `signal-${Date.now()}`;
      const record = {
        title: args.title,
        author: args.author,
        sourcePlatform: args.sourcePlatform,
        originalUrl: args.originalUrl,
        publishedDate: args.publishedDate || new Date().toLocaleDateString('uk-UA'),
        summary: args.summary,
        keyQuote: args.keyQuote,
        relatedModule: args.relatedModule || 1,
        curatorTags: args.curatorTags || ['AI Ingestion'],
        republicationStatus: args.republicationStatus || 'inbox',
        featuredOnHomepage: true,
        aiDiscoveredBy: 'Perplexity / MCP AI Agent',
      };

      fs.writeFileSync(path.join(signalsDir, `${slug}.json`), JSON.stringify(record, null, 2), 'utf-8');

      return {
        success: true,
        message: `Signal "${args.title}" successfully ingested into Keystatic queue (src/content/signals/${slug}.json)`,
        slug,
      };
    }

    case 'list_curated_signals': {
      const signalsDir = path.join(ROOT_DIR, 'src/content/signals');
      const list = [];
      if (fs.existsSync(signalsDir)) {
        const files = fs.readdirSync(signalsDir).filter(f => f.endsWith('.json'));
        for (const f of files) {
          const data = JSON.parse(fs.readFileSync(path.join(signalsDir, f), 'utf-8'));
          if (!args.status || args.status === 'all' || data.republicationStatus === args.status) {
            list.push({ slug: f.replace('.json', ''), ...data });
          }
        }
      }
      return { total: list.length, signals: list };
    }

    case 'generate_vector_diagram': {
      const { generateSynthesisDiagram, callGeminiApi, saveDiagramToRepository } = await import('../lib/gemini-diagram-engine.mjs');
      const diagram = await callGeminiApi({
        moduleNumber: args.moduleNumber || 1,
        diagramType: args.diagramType || 'rights-gates',
        prompt: args.prompt || '',
        title: args.title || '',
      });

      let savedPaths = null;
      if (args.saveToRepository !== false) {
        savedPaths = saveDiagramToRepository(diagram);
      }

      return {
        success: true,
        mediaId: diagram.mediaId,
        title: diagram.title,
        caption: diagram.caption,
        markdocSnippet: diagram.markdoc,
        passport: diagram.passport,
        savedPaths,
        svgPreviewLength: diagram.svg.length,
      };
    }

    default:
      throw new Error(`Unknown MCP tool: ${name}`);
  }
}

// ─── JSON-RPC Protocol Processor (Stdio) ────────────────────────────────────

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on('line', async (line) => {
  if (!line.trim()) return;

  let request;
  try {
    request = JSON.parse(line);
  } catch (err) {
    sendResponse({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } });
    return;
  }

  const { id, method, params } = request;

  try {
    if (method === 'initialize') {
      sendResponse({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {},
            resources: {},
          },
          serverInfo: {
            name: 'dc2sc-research-mcp',
            version: '1.0.0',
          },
        },
      });
      return;
    }

    if (method === 'notifications/initialized') {
      // No response needed for notification
      return;
    }

    if (method === 'tools/list') {
      sendResponse({
        jsonrpc: '2.0',
        id,
        result: { tools: TOOLS },
      });
      return;
    }

    if (method === 'tools/call') {
      const { name, arguments: args } = params;
      const result = await handleToolCall(name, args);
      sendResponse({
        jsonrpc: '2.0',
        id,
        result: {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        },
      });
      return;
    }

    sendResponse({
      jsonrpc: '2.0',
      id,
      error: { code: -32601, message: `Method not found: ${method}` },
    });
  } catch (err) {
    sendResponse({
      jsonrpc: '2.0',
      id,
      error: { code: -32000, message: err.message },
    });
  }
});

function sendResponse(msg) {
  process.stdout.write(JSON.stringify(msg) + '\n');
}
