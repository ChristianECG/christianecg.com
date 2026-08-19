# christianecg.com

Personal portfolio and blog of Christian Elías Cruz González, Senior Software Engineer.

Built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Stack

- **Astro** — static site generator
- **Satori + resvg-js** — automatic OG image generation per blog post
- **Bricolage Grotesque** — typography via Fontsource

## Pages

| Route | Description |
| --- | --- |
| `/` | Portfolio (about, experience, projects, talks) |
| `/blog` | Article listing |
| `/blog/[slug]` | Individual article |
| `/cv` | Curriculum vitae |
| `/now` | What I'm currently working on |
| `/rss.xml` | RSS feed |
| `/feed.json` | JSON feed |

## Development

```sh
pnpm install
pnpm dev       # http://localhost:4323
pnpm build     # production build → dist/
pnpm preview   # preview the build locally
```

## Deployment

Pushes to `main` trigger the GitHub Actions workflow, which builds the site and deploys it to GitHub Pages automatically.
