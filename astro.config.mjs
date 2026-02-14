// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { remarkAlert } from 'remark-github-blockquote-alert';

// https://astro.build/config
export default defineConfig({
  site: 'https://info.qchizu.jp',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkAlert],
  },
});
