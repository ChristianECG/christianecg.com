import { milestones } from '../../data/timeline';
import { apiResponse, abs } from './_json';

export function GET() {
  return apiResponse(
    '/api/timeline.json',
    milestones.map((m) => ({
      year: m.year,
      date: { es: m.date_es, en: m.date_en, lat: m.date_lat ?? m.date_es },
      type: m.type,
      title: { es: m.title_es, en: m.title_en, lat: m.title_lat ?? m.title_es },
      detail: { es: m.detail_es, en: m.detail_en, lat: m.detail_lat ?? m.detail_es },
      url: m.external ? m.href ?? null : m.href ? abs(`/es${m.href}`) : null,
      featured: m.featured ?? false,
    }))
  );
}
