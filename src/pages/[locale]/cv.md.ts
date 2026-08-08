import type { APIContext } from 'astro';
import { cvData } from '../../data/cv';
import { cvToMarkdown } from '../../utils/cvText';
import { LOCALES, dataLang } from '../../i18n';
import type { Locale } from '../../i18n';

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

export function GET({ params }: APIContext) {
  const locale = params.locale as Locale;
  const data = cvData[dataLang(locale)] ?? cvData.es;
  return new Response(cvToMarkdown(data), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
