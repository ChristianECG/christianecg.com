import { pressKits, pressMentions } from '../../data/press';
import { apiResponse, abs } from './_json';

export function GET() {
  const kits = pressKits.map((k) => ({
    kind: 'kit',
    slug: k.slug,
    date: k.date,
    title: { es: k.title_es, en: k.title_en, lat: k.title_lat ?? k.title_es },
    event: { es: k.event_es, en: k.event_en, lat: k.event_lat ?? k.event_es },
    description: { es: k.description_es, en: k.description_en, lat: k.description_lat ?? k.description_es },
    documents: k.documents.map((d) => ({ label: { es: d.label_es, en: d.label_en }, url: abs(d.url) })),
    photos: k.photos.map((p) => ({ url: abs(p.url), alt: { es: p.alt_es, en: p.alt_en } })),
    links: k.links ?? [],
    kit_zip: abs(`/press/${k.slug}/kit.zip`),
  }));

  const mentions = pressMentions.map((m) => ({
    kind: 'mention',
    date: m.date,
    outlet: m.outlet,
    lang: m.lang,
    title: m.title,
    url: m.url,
  }));

  return apiResponse('/api/press.json', [...kits, ...mentions]);
}
