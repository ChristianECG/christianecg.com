import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '../public');

const configs = [
  {
    url: 'http://localhost:4323/cv-print/es',
    output: resolve(publicDir, 'Christian_Elias_Cruz_Gonzalez_esp.pdf'),
    lang: 'es',
  },
  {
    url: 'http://localhost:4323/cv-print/en',
    output: resolve(publicDir, 'Christian_Elias_Cruz_Gonzalez_eng.pdf'),
    lang: 'en',
  },
  {
    url: 'http://localhost:4323/cv-print/lat',
    output: resolve(publicDir, 'Christian_Elias_Cruz_Gonzalez_lat.pdf'),
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
