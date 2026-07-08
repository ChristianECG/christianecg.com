Apply a change to the CV described in `$ARGUMENTS` (new job, updated bullet, new project, skill change, etc.).

## Process

1. Read `src/data/cv.ts` and locate the section(s) the change affects.
2. **Apply the change in all three locales** (`es`, `en`, `lat`). The Latin version follows the site's established style: Roman numerals for dates and quantities, and the existing technical vocabulary (e.g. "Faber Programmatus", "suggestus", "fabricator") — check neighboring entries for precedent before coining new terms.
3. Verify consistency across locales: numbers, dates, percentages, and company names must match exactly in all three versions.
4. If the change is a career milestone (new job, promotion, launch), also add it to `src/data/timeline.ts` — and check whether `projects.json` or `talks.ts` need the same update.
5. Regenerate the PDFs: `pnpm cv:pdf`.
6. Report a summary of what changed in each locale and confirm the PDFs were regenerated.

## Rules

- Never change facts beyond what `$ARGUMENTS` requests — no embellishing metrics or rewording untouched bullets.
- Keep the CV's voice: first person implied, verb-first bullets, measurable outcomes with concrete numbers.
- If the change contradicts existing data (e.g. overlapping dates), stop and ask instead of guessing.
