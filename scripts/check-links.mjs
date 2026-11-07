// Walks the built site and checks every internal link, asset and #anchor, as it will be served
// under /26locks/. External links are the audit's business (`npm run audit:links`).
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';

const root = new URL('../dist/26locks/', import.meta.url).pathname;
const prefix = '/26locks/';
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]));
const files = walk(root);
const pages = files.filter((f) => f.endsWith('.html'));

const ids = new Map();
const idsOf = (f) => {
  if (!ids.has(f)) ids.set(f, new Set([...readFileSync(f, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return ids.get(f);
};
const target = (path) => {
  const p = join(root, decodeURI(path.slice(prefix.length)));
  if (existsSync(p) && statSync(p).isFile()) return p;
  const index = join(p, 'index.html');
  return existsSync(index) ? index : null;
};

const bad = new Set();
let checked = 0;
const check = (from, raw) => {
  const href = raw.replace(/&amp;/g, '&');
  if (/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/.test(href) || !href || href.includes('${')) return;
  checked++;
  const [pathAndQuery, hash] = href.split('#');
  const path = pathAndQuery.split('?')[0];
  if (path === '') {
    if (hash && !idsOf(from).has(hash)) bad.add(`${from.slice(root.length)}: no anchor ${href}`);
    return;
  }
  const abs = path.startsWith('/') ? path : '/' + new URL(path, `http://x${prefix}${dirname(from.slice(root.length))}/`).pathname.slice(1);
  if (!abs.startsWith(prefix)) return void bad.add(`${from.slice(root.length)}: outside ${prefix}: ${href}`);
  const t = target(abs);
  if (!t) return void bad.add(`${from.slice(root.length)}: missing ${href}`);
  if (/^lock-\d+$/.test(hash) && abs === `${prefix}atlas/`) return; // the atlas opens these itself
  if (hash && t.endsWith('.html') && !idsOf(t).has(hash)) bad.add(`${from.slice(root.length)}: no anchor ${href}`);
  if (hash && t.endsWith('.svg') && !idsOf(t).has(hash)) bad.add(`${from.slice(root.length)}: no anchor ${href}`);
};

for (const f of pages) {
  const s = readFileSync(f, 'utf8');
  for (const m of s.matchAll(/\s(?:href|src|xlink:href)="([^"]*)"/g)) check(f, m[1]);
}
for (const f of files.filter((x) => x.endsWith('.css'))) {
  for (const m of readFileSync(f, 'utf8').matchAll(/url\(["']?([^)"']+)["']?\)/g)) if (!/^(#|%23)/.test(m[1])) check(f, m[1]);
}
// Paths built in the browser: a root-relative string in a script has lost the base.
for (const f of files.filter((x) => x.endsWith('.js'))) {
  for (const m of readFileSync(f, 'utf8').matchAll(/["'`]\/(atlas|sel|flows|depths|fingers|clock|history|glossary|sources|about|figure)\//g)) bad.add(`${f.slice(root.length)}: no base on ${m[0]}`);
}

console.log(`links: ${checked} checked across ${pages.length} pages, ${bad.size} broken`);
for (const b of [...bad].slice(0, 40)) console.log(`  ${b}`);
if (bad.size) process.exit(1);
