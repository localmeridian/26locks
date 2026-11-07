# Deploying 26 Locks

Live at **https://localmeridian.net/26locks/** since 2026-11-06, first by Wrangler, then by Workers Builds on each
push to `main` (preview builds off). Kept out of search by `X-Robots-Tag: noindex` in `_headers`.


The site is set up the same way as `localmeridian/sidereal` and `localmeridian/sigil`: a static-assets-only Cloudflare
Worker on a route under the `localmeridian.net` zone, built by Cloudflare Workers Builds on each push. A route runs in
front of the `localmeridian-site` Worker on the bare domain, so `/26locks` reaches this Worker first.

## What is already in the repo

| File | What it does |
|---|---|
| `astro.config.mjs` | `site`, `base: '/26locks'`, output to `dist/26locks/`, writes `sitemap.xml` |
| `wrangler.jsonc` | Worker `26locks`, routes `localmeridian.net/26locks` and `/26locks/*`, serves `dist/` |
| `_headers` | Copied to `dist/` by the build: caching and two security headers |
| `.node-version` | Node 22.23.4; `package.json` requires at least this |
| `scripts/check-links.mjs` | Runs at the end of `npm run build`; a broken internal link or anchor fails the build |

The Worker serves `dist/`, and pages live in `dist/26locks/`, because a route passes the full path to the Worker.

## Build and check locally

Run from the top of the repository:

```bash
npm ci
```

```bash
npm run build
```

```bash
npm run preview -- --port 4322
```

The site is then at `http://localhost:4322/26locks/`. The root `http://localhost:4322/` returns 404 by design.

A healthy build ends with `audit: 0 errors` and `links: … 0 broken`. Audit warnings about print sources having no URL
are expected.

## First deploy

Done 2026-11-06; kept for reference.

1. In Workers & Pages, create a Worker from this public Git repository.
2. Set the production branch to `main`.
3. Leave the root directory empty: `package.json` is at the top of this repository.
4. Set the build command to `npm run build` and the deploy command to `npx wrangler deploy`.
5. Deploy, then check the list below.

To deploy by hand instead, run this once `wrangler` is logged in:

```bash
npm run build && npx wrangler deploy
```

## After the first deploy

- Check these on the live site:
  - `/26locks/` and `/26locks/atlas/#lock-15` open the right page, and `/26locks` redirects to it.
  - `/26locks/lock/15/` shows its figure, so fonts and `figure/` assets load.
  - `/26locks/nothing/` shows the site's own "Nothing rests here." page.
  - `/26locks/sitemap.xml` and `/26locks/og.jpg` load.
  - `/sidereal/`, `/sigil/`, `/star/` and the home page still work.
- Add the door. In `localmeridian/site`, Babel's page links each experiment with `<a class="door">`; `3` would be
  `/26locks/`. Update its README table and `CLAUDE.md` too. That repo keeps its pages hidden from search.
- Add `.github/workflows/cloudflare-build.yml`, copied from `localmeridian/sigil`, so a failed
  Cloudflare build sends an email. Don't add it before the Worker is connected: it fails every push until then.
- Share a link in a preview tool to check the image and title.

## Decisions for the owner

- **Search engines.** The Atlas pages are indexable; every page in `localmeridian/site` is `noindex`. To keep the Atlas
  out of search for now, make `noindex` default to `true` in `src/layouts/Base.astro` and leave the sitemap unsubmitted.
  If it stays indexable, submit `https://localmeridian.net/26locks/sitemap.xml` in Search Console: crawlers only read
  `robots.txt` at the domain root, so this site can't announce its sitemap there.
- **Owner's name.** The site doesn't name the owner, which matches the rule in `localmeridian/site`.

## Keeping it right

- The link preview is `public/og.jpg`. `scripts/og-card.astro` explains how to redraw it.
