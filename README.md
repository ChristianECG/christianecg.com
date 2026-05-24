# christianecg.com

Personal portfolio and blog of Christian Elías Cruz González, Senior Software Engineer.

Built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Stack

- **Astro** — static site generator
- **Pagefind** — client-side search
- **Satori + resvg-js** — automatic OG image generation per blog post
- **Bricolage Grotesque** — typography via Fontsource

## Pages

| Route | Description |
| --- | --- |
| `/` | Portfolio (about, experience, projects, talks) |
| `/blog` | Article listing |
| `/blog/[slug]` | Individual article |
| `/search` | Full-text search |
| `/cv` | Curriculum vitae |
| `/now` | What I'm currently working on |
| `/rss.xml` | RSS feed |
| `/feed.json` | JSON feed |

## Development

```sh
yarn install
yarn dev       # http://localhost:4321
yarn build     # production build → dist/
yarn preview   # preview the build locally
```

## Deployment

Pushes to `main` trigger the GitHub Actions workflow, which builds the site and deploys it to GitHub Pages automatically.
