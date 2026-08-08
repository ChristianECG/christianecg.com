// Builds the site, serves it, and runs axe-core over key pages.
// Exits 1 if any accessibility violation is found. Used by the pre-commit hook.
import { build, preview } from 'astro';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { execFile } from 'child_process';
import { promisify } from 'util';

const PAGES = ['/', '/blog/', '/cv/', '/timeline/', '/now/', '/manifiesto/', '/colophon/', '/press/', '/talks/', '/404', '/en/', '/api/'];

await build({ logLevel: 'error' });
const server = await preview({ logLevel: 'error' });
const base = `http://localhost:${server.port}`;
// CV page embeds the generated PDFs; without them the iframe shows a 404 error
// page whose own landmarks trip the axe check. execFileSync would block this
// process's event loop, which is also serving the preview server the child
// needs to reach — must run non-blocking.
await promisify(execFile)('node', ['scripts/generate-cv-pdf.mjs'], { env: { ...process.env, CV_PDF_BASE_URL: base } });

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

let failed = false;
for (const path of PAGES) {
  await page.goto(base + path, { waitUntil: 'networkidle' });
  const { violations } = await new AxeBuilder({ page }).analyze();
  if (violations.length === 0) continue;
  failed = true;
  for (const v of violations) {
    console.error(`✗ ${path} [${v.impact}] ${v.id}: ${v.help}`);
    for (const n of v.nodes.slice(0, 3)) console.error(`    ${n.target.join(' ')}`);
  }
}

await browser.close();
await server.stop();

if (failed) process.exit(1);
console.log(`✓ a11y: ${PAGES.length} pages clean`);
