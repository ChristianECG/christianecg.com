import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

interface FeedItem {
  id: string;
  url: string;
  title: string;
  summary: string;
  date_published: string;
  image?: string;
  author: { name: string; url: string };
  tags?: string[];
  external?: boolean;
}

async function fetchOctaItems(): Promise<FeedItem[]> {
  try {
    const res = await fetch('https://octa.page/rss.xml');
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].flatMap(([, item]) => {
      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]>|<title>(.*?)<\/title>/)?.[1] ?? item.match(/<title>(.*?)<\/title>/)?.[1] ?? '';
      const link = item.match(/<link>(.*?)<\/link>/)?.[1] ?? '';
      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>|<pubdate>(.*?)<\/pubdate>/i)?.[1] ?? '';
      const desc = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]>|<description>([\s\S]*?)<\/description>/)?.[1] ?? '';
      const tags = [...item.matchAll(/<category>(.*?)<\/category>/g)].map(m => m[1]);
      if (!title || !link) return [];
      return [{
        id: link,
        url: link,
        title: title.trim(),
        summary: desc.replace(/<[^>]*>/g, '').trim().slice(0, 280),
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
