// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://christianecg.com',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/bio/') &&
        !page.includes('/lat/'),
    }),
  ],
  redirects: {
    '/':             '/es/',
    '/cv':           '/es/cv',
    '/now':          '/es/now',
    '/blog':         '/es/blog',
    '/manifiesto':   '/es/manifiesto',
    '/search':       '/es/search',
    // /blog/[slug] → handled by src/pages/blog/[slug].astro redirect page
  },
  server: {
    port: 4323,
  },
  vite: {
    server: {
      allowedHosts: ['christianecg.test'],
    },
  },
});
