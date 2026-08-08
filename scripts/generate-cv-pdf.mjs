import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
// ponytail: PDFs are build output now (not committed), so they land in dist/, not public/
const outDir = resolve(__dirname, '../dist');
const baseUrl = process.env.CV_PDF_BASE_URL ?? 'http://localhost:4323';
mkdirSync(outDir, { recursive: true });

const configs = [
  {
    url: `${baseUrl}/cv-print/es`,
    output: resolve(outDir, 'Christian_Elias_Cruz_Gonzalez_esp.pdf'),
    lang: 'es',
  },
  {
    url: `${baseUrl}/cv-print/en`,
    output: resolve(outDir, 'Christian_Elias_Cruz_Gonzalez_eng.pdf'),
    lang: 'en',
  },
  {
    url: `${baseUrl}/cv-print/lat`,
    output: resolve(outDir, 'Christian_Elias_Cruz_Gonzalez_lat.pdf'),
    lang: 'lat',
  }
];

const browser = await chromium.launch();
const page = await browser.newPage();

for (const { url, output, lang } of configs) {
  console.log(`Generating CV (${lang})…`);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.pdf({
    path: output,
    format: 'A4',
    printBackground: false,
    margin: { top: '18mm', right: '18mm', bottom: '14mm', left: '18mm' },
  });
  console.log(`  → ${output}`);
}

await browser.close();
console.log('Done.');
