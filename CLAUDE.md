# CLAUDE.md

Personal site of Christian Elías Cruz González (christianecg.com): portfolio, blog, CV, talks, press kits, and a public JSON API. Astro static site deployed to GitHub Pages.

## Commands

Package manager is **pnpm** (there is a `pnpm-lock.yaml`; do not use npm or yarn).

```sh
pnpm install
pnpm dev        # dev server → http://localhost:4323
pnpm build      # production build → dist/
pnpm preview
pnpm cv:pdf     # regenerate CV PDFs locally (scripts/generate-cv-pdf.mjs; needs `pnpm build && pnpm preview` running)
pnpm a11y       # axe accessibility audit (scripts/a11y-check.mjs, also runs pre-commit)
```

## Architecture

- **`src/data/` is the single source of truth for profile content.** All structured personal data lives here, not in page markup:
  - `cv.ts` — full CV (header, experience, projects, skills, education, languages, activity)
  - `projects.json` — portfolio projects
  - `talks.ts` — talks, keynotes, media appearances
  - `press.ts` — press kits and press mentions
  - `timeline.ts` — career milestones
  - `articles.json` — external articles
- `src/content/` — Astro content collections (blog, bio, papers, projects case studies), config in `src/content.config.ts`.
- `src/pages/` — root routes are the Spanish defaults; `src/pages/[locale]/` mirrors them per locale. `src/pages/api/` serves the public JSON API; `src/pages/og/` generates OG images (Satori + resvg).
- `src/i18n/` — UI strings per locale.
- **The blog is not just `src/content/blog/`.** `src/utils/blogData.ts` fetches `https://octa.page/rss.xml` at build time and merges those articles with the local ones (by date). Items with a full `content:encoded` body are mirrored locally at `/es/blog/{slug}` with `rel=canonical` back to octa.page; items without one show as an external link. Don't judge blog freshness/activity from the local `.md` file count alone.

## Conventions

- **Trilingual content: `es`, `en`, and `lat` (Latin).** Every data entry carries `_es` / `_en` / `_lat` fields (or per-locale objects in `cv.ts`). When adding or editing content, fill all three; Latin is a first-class locale here, not a joke to skip.
- **Timeline upkeep:** any new milestone (talk, paper, job, project launch, press) added to its own data file must also be added to `src/data/timeline.ts`.
- **Work experience lives in two places, not one.** `src/data/cv.ts` (condensed, CV/PDF/API) and `src/components/Experience.astro` (a separate hardcoded `jobs` array with longer narrative bullets for the homepage) are not synced automatically and don't even list the same jobs — `Experience.astro` includes the GDSC Lead role, which `cv.ts` doesn't. When a job changes (new role, new company, updated bullets), update both, deliberately rewriting the bullets for each one's tone rather than copy-pasting.
- CV PDFs are generated at deploy time (see `.github/workflows/deploy.yml`), not committed to `public/`.
- Accessibility is enforced: a pre-commit hook runs the axe audit; keep new pages passing.
- Deployment is automatic: push to `main` builds and publishes via GitHub Actions.
