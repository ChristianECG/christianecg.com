import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';

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

  // Easter egg: Playwright can't set PDF metadata itself, so patch it in
  // after the fact — visible only via document properties / pdfinfo.
  const pdfDoc = await PDFDocument.load(readFileSync(output));
  pdfDoc.setTitle(`Christian Elías Cruz González — CV (${lang})`);
  pdfDoc.setAuthor('Christian Elías Cruz González');
  pdfDoc.setSubject('If you read PDF metadata, hi. dig TXT cv.christianecg.com');
  pdfDoc.setKeywords(['cv', 'resume', 'curriculum vitae', 'IPoAC', 'RFC 1149']);
  pdfDoc.setProducer('Astro + Playwright (IPoAC-compliant rendering pipeline)');
  writeFileSync(output, await pdfDoc.save({ updateMetadata: false }));

  console.log(`  → ${output}`);
}

await browser.close();
console.log('Done.');
