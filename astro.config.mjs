import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.escala24x7.com',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'pt'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [sitemap()],
});

