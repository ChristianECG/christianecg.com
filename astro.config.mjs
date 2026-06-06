// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://christianecg.com',
  integrations: [sitemap({ filter: (page) => !page.includes('/bio/') })],
  server: {
    port: 4323,
  },
  vite: {
    server: {
      allowedHosts: ['christianecg.test'],
    },
  },
});
