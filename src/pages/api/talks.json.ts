import { talks } from '../../data/talks';
import { apiResponse, abs } from './_json';

export function GET() {
  return apiResponse(
    '/api/talks.json',
    talks.map((t) => ({
      slug: t.slug ?? null,
      date: { es: t.date_es, en: t.date_en, lat: t.date_lat ?? t.date_es },
      type: t.type,
      format: t.format,
      title: { es: t.title_es, en: t.title_en, lat: t.title_lat ?? t.title_es },
      event: { es: t.event_es, en: t.event_en, lat: t.event_lat ?? t.event_es },
      url: t.url,
      slides: abs(t.slides),
      paper: abs(t.paper),
    }))
  );
}
