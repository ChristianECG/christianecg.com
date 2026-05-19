import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(_context: APIContext) {
  const posts = await getCollection('blog');

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
    items: posts
      .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
      .map((post) => ({
        id: `https://christianecg.com/blog/${post.id}`,
        url: `https://christianecg.com/blog/${post.id}`,
        title: post.data.title,
        summary: post.data.excerpt,
        date_published: new Date(post.data.date).toISOString(),
        image: `https://christianecg.com/og/${post.id}.png`,
        author: {
          name: 'Christian Elías Cruz González',
          url: 'https://christianecg.com',
        },
      })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: { 'Content-Type': 'application/feed+json; charset=utf-8' },
  });
}
