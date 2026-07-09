import { getAllArticles } from '../../utils/blogData';
import { apiResponse, abs } from './_json';

export async function GET() {
  const articles = await getAllArticles();
  return apiResponse(
    '/api/articles.json',
    articles.map((a) => ({
      title: a.title,
      date: a.date,
      excerpt: a.excerpt,
      tags: a.tags,
      source: a.source,
      url: abs(a.url),
      external: a.external,
      canonical: a.canonical,
    }))
  );
}
