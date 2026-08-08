import type { APIContext } from 'astro';
import { cvData } from '../../data/cv';
import { cvToLog } from '../../utils/cvLog';
import { LOCALES, dataLang } from '../../i18n';
import type { Locale } from '../../i18n';

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

export function GET({ params }: APIContext) {
  const locale = params.locale as Locale;
  const lang = dataLang(locale);
  const data = cvData[lang] ?? cvData.es;
  return new Response(cvToLog(data, lang), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
