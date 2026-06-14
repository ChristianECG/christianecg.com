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
        !page.includes('/lat/') &&
        !page.includes('/cv-print/') &&
        !page.includes('/press/ipoac-dns/') &&
        !page.includes('/press/coniiti-2021/'),
    }),
  ],
  server: {
    port: 4323,
  },
  vite: {
    server: {
      allowedHosts: ['christianecg.test'],
    },
  },
});
