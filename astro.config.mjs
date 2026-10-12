// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ayush.jeearchive.in',
  // Flat .html files; Cloudflare serves /work from work.html => canonical URLs like /work (no trailing slash).
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
  // Hide Astro's floating dev toolbar in local development (it never ships to production).
  devToolbar: { enabled: false },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
