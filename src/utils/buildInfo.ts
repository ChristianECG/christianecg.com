import { execSync } from 'node:child_process';

// Module-level so it runs once per build, not once per page (Astro's static
// build re-evaluates each page's frontmatter, but ESM modules are cached).
function resolveSha(): string {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA.slice(0, 7);
  try {
    return execSync('git rev-parse HEAD').toString().trim().slice(0, 7);
  } catch {
    return 'unknown';
  }
}

export const buildSha = resolveSha();
export const buildTime = new Date().toISOString();
