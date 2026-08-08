import type { APIContext } from 'astro';
import { cvData } from '../../data/cv';
import { cvToManPage } from '../../utils/cvMan';
import { LOCALES, dataLang } from '../../i18n';
import type { Locale } from '../../i18n';

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

export function GET({ params }: APIContext) {
  const locale = params.locale as Locale;
  const data = cvData[dataLang(locale)] ?? cvData.es;
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return new Response(cvToManPage(data, date, locale), {
    headers: { 'Content-Type': 'text/troff; charset=utf-8' },
  });
}
