import type { APIContext } from 'astro';
import { cvData } from '../../data/cv';
import { cvToRfc } from '../../utils/cvText';
import { LOCALES, dataLang } from '../../i18n';
import type { Locale } from '../../i18n';

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

export function GET({ params }: APIContext) {
  const locale = params.locale as Locale;
  const data = cvData[dataLang(locale)] ?? cvData.es;
  const date = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const body = cvToRfc(data, {
    canonicalUrl: `https://christianecg.com/${locale}/cv`,
    mdUrl: `https://christianecg.com/${locale}/cv.md`,
    date,
  });
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
