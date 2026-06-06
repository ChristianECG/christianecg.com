import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

interface FeedItem {
  title: string;
  pubDate: Date;
  description: string;
  link: string;
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
      if (!title || !link) return [];
      return [{ title: title.trim(), pubDate: new Date(pubDate || Date.now()), description: desc.trim(), link }];
    });
  } catch {
    return [];
  }
}

export async function GET(context: APIContext) {
  const localPosts = await getCollection('blog');
  const octaItems = await fetchOctaItems();

  const localItems: FeedItem[] = localPosts
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt,
      link: `/es/blog/${post.id}/`,
    }));

  const allItems = [...localItems, ...octaItems].sort(
    (a, b) => b.pubDate.getTime() - a.pubDate.getTime()
  );

  return rss({
    title: 'Christian Elías — Blog',
    description: 'Artículos sobre frontend, tecnología y el oficio de construir software.',
    site: context.site!,
    items: allItems,
    customData: `<language>es</language>`,
  });
}
