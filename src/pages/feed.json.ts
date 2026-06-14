import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

interface FeedItem {
  id: string;
  url: string;
  title: string;
  summary: string;
  content_html?: string;
  date_published: string;
  image?: string;
  author: { name: string; url: string };
  tags?: string[];
  external?: boolean;
}

function decodeEntities(str: string) {
  return str
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

async function fetchOctaItems(): Promise<FeedItem[]> {
  try {
    const res = await fetch('https://octa.page/rss.xml');
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].flatMap(([, item]) => {
      const rawTitle   = item.match(/<title><!\[CDATA\[(.*?)\]\]>|<title>(.*?)<\/title>/);
      const title      = (rawTitle?.[1] ?? rawTitle?.[2] ?? '').trim();
      const link       = item.match(/<link>(.*?)<\/link>/)?.[1] ?? '';
      const rawPubDate = item.match(/<pubDate>(.*?)<\/pubDate>|<pubdate>(.*?)<\/pubdate>/i);
      const pubDate    = rawPubDate?.[1] ?? rawPubDate?.[2] ?? '';
      const rawDesc    = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]>|<description>([\s\S]*?)<\/description>/);
      const desc       = decodeEntities((rawDesc?.[1] ?? rawDesc?.[2] ?? '').trim());
      const rawContent = item.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/);
      const content_html = rawContent ? decodeEntities(rawContent[1]) : undefined;
      const tags       = [...item.matchAll(/<category>(.*?)<\/category>/g)].map(m => m[1]);
      if (!title || !link) return [];
      return [{
        id: link,
        url: link,
        title,
        summary: desc.slice(0, 280),
        content_html,
        date_published: new Date(pubDate || Date.now()).toISOString(),
        author: { name: 'Christian Elías Cruz González', url: 'https://christianecg.com' },
        tags: tags.length ? tags : undefined,
        external: true,
      }];
    });
  } catch {
    return [];
  }
}

export async function GET(_context: APIContext) {
  const localPosts = await getCollection('blog');

  const localItems: FeedItem[] = localPosts
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .map((post) => ({
      id: `https://christianecg.com/es/blog/${post.id}`,
      url: `https://christianecg.com/es/blog/${post.id}`,
      title: post.data.title,
      summary: post.data.excerpt,
      date_published: new Date(post.data.date).toISOString(),
      image: `https://christianecg.com/og/${post.id}.png`,
      author: { name: 'Christian Elías Cruz González', url: 'https://christianecg.com' },
    }));

  const octaItems = await fetchOctaItems();

  const allItems = [...localItems, ...octaItems].sort(
    (a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime()
  );

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Christian Elías — Blog',
    home_page_url: 'https://christianecg.com',
    feed_url: 'https://christianecg.com/feed.json',
    description: 'Artículos sobre frontend, tecnología y el oficio de construir software.',
    author: {
      name: 'Christian Elías Cruz González',
      url: 'https://christianecg.com',
    },
    items: allItems,
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: { 'Content-Type': 'application/feed+json; charset=utf-8' },
  });
}
