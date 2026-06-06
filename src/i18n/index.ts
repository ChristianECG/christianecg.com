import es from './es.json';
import en from './en.json';
import lat from './lat.json';

export type Locale = 'es' | 'en' | 'lat';

const translations: Record<Locale, Record<string, string>> = { es, en, lat };

export function useTranslations(locale: Locale) {
  return (key: string): string =>
    translations[locale]?.[key] ?? translations.es[key] ?? key;
}

/** Returns the locale for keyed data lookups. Components should fall back to _es when _lat is absent. */
export function dataLang(locale: Locale): 'es' | 'en' | 'lat' {
  return locale;
}

/** Pick a locale-keyed field from a data object, falling back to Spanish. */
export function pick<T>(obj: Record<string, T>, key: string, lang: 'es' | 'en' | 'lat'): T {
  return (obj[`${key}_${lang}`] ?? obj[`${key}_es`]) as T;
}

export const LOCALES: Locale[] = ['es', 'en', 'lat'];

export function getLocaleFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  if (first === 'en' || first === 'lat') return first;
  return 'es';
}
