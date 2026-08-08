import type { APIContext } from 'astro';
import { cvData } from '../../data/cv';
import { cvToDiff } from '../../utils/cvDiff';
import { LOCALES, dataLang } from '../../i18n';
import type { Locale } from '../../i18n';

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

export function GET({ params }: APIContext) {
  const locale = params.locale as Locale;
  const lang = dataLang(locale);
  const data = cvData[lang] ?? cvData.es;
  return new Response(cvToDiff(data, lang), {
    headers: { 'Content-Type': 'text/x-diff; charset=utf-8' },
  });
}
