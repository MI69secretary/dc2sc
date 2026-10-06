import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321';

export const GET: APIRoute = async () => {
  const articles = await getCollection('journal', ({ data }) =>
    data.includeInRss === true &&
    data.visibility !== 'internal' &&
    data.lifecycleStatus === 'published'
  );

  const items = articles.map((article) => {
    const url = `${SITE_URL}/journal/${article.id}`;
    return `
    <item>
      <title><![CDATA[${article.data.title}]]></title>
      <description><![CDATA[${article.data.dek}]]></description>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <category><![CDATA[Research]]></category>
    </item>`;
  }).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DC2SC Journal</title>
    <description>Research on buyer-side market formation. All content is conceptual preview.</description>
    <link>${SITE_URL}/journal</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en</language>
    <copyright>DC2SC Research Program</copyright>${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
