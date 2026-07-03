import { getCollection } from 'astro:content';
import { apiResponse, abs } from './_json';

export async function GET() {
  const papers = (await getCollection('papers')).sort((a, b) => a.data.order - b.data.order);
  return apiResponse(
    '/api/papers.json',
    papers.map((p) => ({
      id: p.id,
      title: p.data.title,
      title_es: p.data.titleEs ?? null,
      source: p.data.source,
      issn: p.data.issn ?? null,
      year: p.data.year,
      url: p.data.externalUrl,
      pdf: abs(p.data.pdf),
      description: {
        es: p.data.descriptionEs,
        en: p.data.descriptionEn,
        lat: p.data.descriptionLat ?? p.data.descriptionEs,
      },
    }))
  );
}
