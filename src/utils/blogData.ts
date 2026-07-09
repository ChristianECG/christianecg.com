import { getCollection } from 'astro:content';

export const ITEMS_PER_PAGE = 12;

// Single gate for local posts: drafts stay in git but out of every build output
// (pages, RSS, JSON feed, API, OG images).
export async function getBlogEntries() {
  return (await getCollection('blog')).filter((entry) => !entry.data.draft);
}

export type Article = {
  id: string; title: string; date: string; excerpt: string;
  tags: string[]; source: string; url: string; external: boolean; idx: number;
  content?: string;   // full HTML body (octa articles, from content:encoded)
  canonical?: string; // original URL on octa.page
};

function decodeEntities(str: string) {
  return str
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

export async function getAllArticles(): Promise<Article[]> {
  const allEntries = await getBlogEntries();
  const localArticles: Article[] = allEntries.map((entry) => ({
    id: entry.id,
    title: entry.data.title,
    date: entry.data.date,
    excerpt: entry.data.excerpt,
    tags: [],
    source: entry.data.source,
    url: `/es/blog/${entry.id}`,
    external: false,
    idx: 0,
  }));

  let octaArticles: Article[] = [];
  try {
    const res = await fetch('https://octa.page/rss.xml');
    const xml = await res.text();
    octaArticles = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].flatMap(([, item]) => {
      const title   = decodeEntities(item.match(/<title>(.*?)<\/title>/)?.[1]?.trim() ?? '');
      const link    = item.match(/<link>(.*?)<\/link>/)?.[1]?.trim() ?? '';
      const pub     = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1]?.trim() ?? '';
      const rawDesc = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]>|<description>([\s\S]*?)<\/description>/);
      const excerpt = decodeEntities((rawDesc?.[1] ?? rawDesc?.[2] ?? '').trim());
      const rawBody = item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>|<content:encoded>([\s\S]*?)<\/content:encoded>/);
      const content = decodeEntities((rawBody?.[1] ?? rawBody?.[2] ?? '').trim());
      const tags    = [...item.matchAll(/<category>(.*?)<\/category>/g)].map(m => m[1]);
      const date    = pub ? new Date(pub).toISOString().split('T')[0] : '';
      const slug    = link.match(/\/([^/]+)\/?$/)?.[1] ?? '';
      if (!title || !date) return [];
      const base = { title, date, excerpt, tags, source: 'Octa', idx: 0, canonical: link };
      // Mirrored locally with rel=canonical pointing back to octa.page;
      // items without full content fall back to an external link.
      return slug && content
        ? [{ ...base, id: slug, url: `/es/blog/${slug}`, external: false, content }]
        : [{ ...base, id: `octa-${link}`, url: link, external: true }];
    });
  } catch { /* RSS fetch failed — show only local articles */ }

  return [...localArticles, ...octaArticles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((a, idx) => ({ ...a, idx }));
}

export function paginateArticles(articles: Article[], page: number) {
  const featured = articles[0] ?? null;
  const rest = articles.slice(1);
  const totalPages = Math.ceil(rest.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageArticles = rest.slice(start, start + ITEMS_PER_PAGE);
  return { featured: page === 1 ? featured : null, pageArticles, totalPages, total: articles.length };
}
