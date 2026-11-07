// @ts-check
import { defineConfig } from 'astro/config';
import { writeFileSync } from 'node:fs';

const site = 'https://localmeridian.net';
const base = '/26locks';

// Every page but the 404, for search engines. Written by hand so the site carries no extra dependency.
const sitemap = () => ({
  name: '26locks-sitemap',
  hooks: {
    /** @param {{ pages: { pathname: string }[], dir: URL }} o */
    'astro:build:done': ({ pages, dir }) => {
      const urls = pages.map((p) => p.pathname).filter((p) => !p.startsWith('404')).sort();
      const xml = urls.map((p) => `  <url><loc>${site}${base}/${p}</loc></url>`).join('\n');
      writeFileSync(new URL('sitemap.xml', dir), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xml}\n</urlset>\n`);
    },
  },
});


// Built into dist/26locks/ so the Worker serves it at /26locks/, as sidereal and sigil do; see DEPLOY.md.
export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  outDir: 'dist/26locks',
  integrations: [sitemap()],
});
