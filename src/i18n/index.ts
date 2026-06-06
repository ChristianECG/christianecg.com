import es from './es.json';
import en from './en.json';
import lat from './lat.json';

export type Locale = 'es' | 'en' | 'lat';

const translations: Record<Locale, Record<string, string>> = { es, en, lat };

export function useTranslations(locale: Locale) {
  return (key: string): string =>
    translations[locale]?.[key] ?? translations.es[key] ?? key;
}

/** Maps 'lat' → 'es' for _es/_en keyed data objects. */
export function dataLang(locale: Locale): 'es' | 'en' {
  return locale === 'lat' ? 'es' : locale;
}

export const LOCALES: Locale[] = ['es', 'en', 'lat'];

export function getLocaleFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  if (first === 'en' || first === 'lat') return first;
  return 'es';
}
