// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://christianecg.com',
  integrations: [sitemap()],
  redirects: {
    '/about':      '/#about',
    '/experience': '/#experience',
    '/education':  '/#education',
    '/skills':     '/#skills',
    '/projects':   '/#projects',
    '/talks':      '/#talks',
    '/contact':    '/#contact',
  },
});
