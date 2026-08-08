import type { APIContext } from 'astro';
import { cvData } from '../../data/cv';
import { cvToJsonResume } from '../../utils/cvJson';
import { LOCALES, dataLang } from '../../i18n';
import type { Locale } from '../../i18n';

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

export function GET({ params }: APIContext) {
  const locale = params.locale as Locale;
  const lang = dataLang(locale);
  const data = cvData[lang] ?? cvData.es;
  const body = JSON.stringify(cvToJsonResume(data, lang, locale), null, 2);
  return new Response(body, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
