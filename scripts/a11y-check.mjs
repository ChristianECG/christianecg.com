// Builds the site, serves it, and runs axe-core over key pages.
// Exits 1 if any accessibility violation is found. Used by the pre-commit hook.
import { build, preview } from 'astro';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const PAGES = ['/', '/blog/', '/cv/', '/timeline/', '/now/', '/manifiesto/', '/colophon/', '/press/', '/talks/', '/404', '/en/', '/api/'];

await build({ logLevel: 'error' });
const server = await preview({ logLevel: 'error' });
const base = `http://localhost:${server.port}`;

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
