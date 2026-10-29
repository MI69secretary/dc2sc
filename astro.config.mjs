import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: process.env.GITHUB_PAGES ? 'https://mi69secretary.github.io' : undefined,
  base: process.env.GITHUB_PAGES ? '/dc2sc' : '/',
  redirects: { '/en': '/', '/en/about': '/about/' },
  integrations: [
    starlight({
      title: 'dc2sc',
      social: [
        { icon: 'github', label: 'GitHub', link: 'https://github.com/MI69secretary/dc2sc' },
        { icon: 'external', label: 'UCOMM', link: 'https://ucomm.space' },
        { icon: 'external', label: 'GOLIAF', link: 'https://goliaf.tours' }
      ],
      customCss: ['./src/styles/voicebox.css'],
      components: { ThemeSelect: './src/components/VoiceBoxTheme.astro' },
      head: [
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' } },
        { tag: 'link', attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Work+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap' } },
      ],
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        uk: { label: 'Українська', lang: 'uk' },
        de: { label: 'Deutsch', lang: 'de' },
      },
    }),
    markdoc(),
    react(),
    ...(process.env.NODE_ENV !== 'production' ? [keystatic()] : []),
  ],
  vite: {
    server: { watch: { usePolling: true, interval: 500 } },
    plugins: [
      {
        name: 'dc2sc-admin-api',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/update-all' && (req.method === 'POST' || req.method === 'GET')) {
              try {
                const { execSync } = await import('node:child_process');
                const pdfOut = execSync('node src/lib/generate-article-pdfs.mjs', { encoding: 'utf-8' });
                const transOut = execSync('node src/lib/sync-translations.mjs', { encoding: 'utf-8' });
                const driveOut = execSync('node src/lib/generate-drive-manifest.mjs', { encoding: 'utf-8' });
                
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  ok: true,
                  timestamp: new Date().toISOString(),
                  message: 'Всі PDF артефакти, переклади та Google Drive маніфест успішно оновлено!',
                  pdfOutput: pdfOut.trim(),
                  translationOutput: transOut.trim(),
                  driveOutput: driveOut.trim()
                }));
              } catch (err) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 500;
                res.end(JSON.stringify({ ok: false, error: err.message }));
              }
              return;
            }

            if (req.url === '/api/generate-pdfs' && (req.method === 'POST' || req.method === 'GET')) {
              try {
                const { execSync } = await import('node:child_process');
                const pdfOut = execSync('node src/lib/generate-article-pdfs.mjs', { encoding: 'utf-8' });
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ ok: true, message: 'PDF успішно згенеровано!', output: pdfOut.trim() }));
              } catch (err) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 500;
                res.end(JSON.stringify({ ok: false, error: err.message }));
              }
              return;
            }

            if (req.url === '/api/ingest-signal') {
              if (req.method === 'POST') {
                let bodyStr = '';
                req.on('data', chunk => { bodyStr += chunk; });
                req.on('end', async () => {
                  try {
                    const fs = await import('node:fs');
                    const path = await import('node:path');
                    const payload = JSON.parse(bodyStr);
                    const slug = payload.slug || ('signal-' + Date.now());
                    const signalsDir = path.join(process.cwd(), 'src/content/signals');
                    if (!fs.existsSync(signalsDir)) fs.mkdirSync(signalsDir, { recursive: true });

                    // Algorithmic Canonical Module Relevance Classifier
                    const textCorpus = ((payload.title || '') + ' ' + (payload.summary || '') + ' ' + (payload.keyQuote || '')).toLowerCase();
                    const moduleKeywords = [
                      { mod: 1, label: 'Market Isolation', words: ['isolation', 'choice', 'voice', 'session', 'atomized', 'fragmentation'] },
                      { mod: 2, label: 'Collective Agency', words: ['crowd', 'attention', 'agency', 'passive', 'position', 'authority'] },
                      { mod: 3, label: 'Buyer Scale & Power', words: ['buyer', 'scale', 'power', 'deal', 'volume', 'bargaining', 'monopoly'] },
                      { mod: 4, label: 'Commitment & Escrow', words: ['commitment', 'cost', 'escrow', 'adverse', 'dissolution', 'lock-in', 'deposit'] },
                      { mod: 5, label: 'Coordination Rights', words: ['rights', 'coordination', 'floor', 'exit', 'contestability', 'governance'] },
                      { mod: 6, label: 'Travel Stress Test', words: ['travel', 'goliaf', 'stress', 'heterogeneous', 'constraint', 'booking', 'hotel'] },
                      { mod: 7, label: 'Success & Null Result', words: ['success', 'null', 'pareto', 'aggregate', 'alternative', 'welfare', 'metric'] }
                    ];

                    let bestMod = payload.relatedModule || 1;
                    let highestScore = 0;
                    const detectedTags = new Set(payload.curatorTags || ['Ingestion']);

                    for (const m of moduleKeywords) {
                      let matchCount = 0;
                      for (const w of m.words) {
                        if (textCorpus.includes(w)) {
                          matchCount++;
                          detectedTags.add(w.charAt(0).toUpperCase() + w.slice(1));
                        }
                      }
                      if (matchCount > highestScore) {
                        highestScore = matchCount;
                        bestMod = m.mod;
                      }
                    }

                    const confidenceScore = Math.min(1.0, 0.4 + (highestScore * 0.15));

                    const signalRecord = {
                      title: payload.title || 'Discovered Publication',
                      author: payload.author || 'Anonymous',
                      sourcePlatform: payload.sourcePlatform || 'substack',
                      originalUrl: payload.originalUrl || '',
                      publishedDate: payload.publishedDate || new Date().toLocaleDateString('uk-UA'),
                      summary: payload.summary || '',
                      keyQuote: payload.keyQuote || '',
                      relatedModule: bestMod,
                      relevanceScore: parseFloat(confidenceScore.toFixed(2)),
                      curatorTags: Array.from(detectedTags),
                      republicationStatus: payload.republicationStatus || 'inbox',
                      featuredOnHomepage: payload.featuredOnHomepage !== false,
                      aiDiscoveredBy: payload.aiDiscoveredBy || 'Perplexity Ingestion Webhook'
                    };

                    fs.writeFileSync(path.join(signalsDir, `${slug}.json`), JSON.stringify(signalRecord, null, 2), 'utf-8');
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ 
                      ok: true, 
                      slug, 
                      relatedModule: bestMod,
                      relevanceScore: signalRecord.relevanceScore,
                      message: `Сигнал успішно класифіковано до Модуля 0${bestMod} (Score: ${signalRecord.relevanceScore}) та додано в чергу Keystatic!` 
                    }));
                  } catch (err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = 500;
                    res.end(JSON.stringify({ ok: false, error: err.message }));
                  }
                });
                return;
              }
            }

            if (req.url === '/api/signals' && req.method === 'GET') {
              try {
                const fs = await import('node:fs');
                const path = await import('node:path');
                const signalsDir = path.join(process.cwd(), 'src/content/signals');
                const list = [];
                if (fs.existsSync(signalsDir)) {
                  const files = fs.readdirSync(signalsDir).filter(f => f.endsWith('.json'));
                  for (const f of files) {
                    const data = JSON.parse(fs.readFileSync(path.join(signalsDir, f), 'utf-8'));
                    list.push({ slug: f.replace('.json', ''), ...data });
                  }
                }
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ count: list.length, signals: list }));
              } catch (err) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 500;
                res.end(JSON.stringify({ ok: false, error: err.message }));
              }
              return;
            }

            if (req.url === '/api/generate-diagram' && req.method === 'POST') {
              let bodyStr = '';
              req.on('data', chunk => { bodyStr += chunk; });
              req.on('end', async () => {
                try {
                  const { callGeminiApi } = await import('./src/lib/gemini-diagram-engine.mjs');
                  const payload = JSON.parse(bodyStr || '{}');
                  const result = await callGeminiApi({
                    prompt: payload.prompt || '',
                    apiKey: payload.apiKey || process.env.GEMINI_API_KEY,
                    moduleNumber: payload.moduleNumber || 1,
                    diagramType: payload.diagramType || 'rights-gates'
                  });

                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ ok: true, diagram: result }));
                } catch (err) {
                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = 500;
                  res.end(JSON.stringify({ ok: false, error: err.message }));
                }
              });
              return;
            }

            if (req.url === '/api/save-diagram' && req.method === 'POST') {
              let bodyStr = '';
              req.on('data', chunk => { bodyStr += chunk; });
              req.on('end', async () => {
                try {
                  const { saveDiagramToRepository } = await import('./src/lib/gemini-diagram-engine.mjs');
                  const payload = JSON.parse(bodyStr || '{}');
                  if (!payload.diagram) throw new Error('No diagram object provided in body');

                  const saved = saveDiagramToRepository(payload.diagram);
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ ok: true, message: `Діаграму ${payload.diagram.mediaId} успішно збережено в репозиторій!`, paths: saved }));
                } catch (err) {
                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = 500;
                  res.end(JSON.stringify({ ok: false, error: err.message }));
                }
              });
              return;
            }

            next();
          });
        }
      }
    ]
  },
});

