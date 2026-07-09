import rss from '@astrojs/rss';
import { getBlogEntries } from '../utils/blogData';
import type { APIContext } from 'astro';

interface FeedItem {
  title: string;
  pubDate: Date;
  description: string;
  content?: string;
  link: string;
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
      const content    = rawContent ? decodeEntities(rawContent[1]) : undefined;
      if (!title || !link) return [];
      return [{ title, pubDate: new Date(pubDate || Date.now()), description: desc, content, link }];
    });
  } catch {
    return [];
  }
}

export async function GET(context: APIContext) {
  const localPosts = await getBlogEntries();
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
