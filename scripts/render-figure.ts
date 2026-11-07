// Rasterise the body figure for visual review: node scripts/render-figure.ts out.svg
import { writeFileSync } from 'node:fs';
import * as F from '../src/lib/figure.ts';

const g = (paths: string[], stroke: string, w: number) =>
  paths.map((d) => `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round"/>`).join('');
const fig = (details: string[], extra: string) =>
  `<path d="${F.silhouette}" fill="#fdf8ef" stroke="#3a312a" stroke-width="1.6"/>${g(details, '#8a7a6a', 0.9)}${extra}`;
const front = fig([...F.frontDetails, ...F.frontFace, ...F.frontCentre], '');
const back = fig([...F.backDetails, ...F.backCentre], F.spineDots.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4" fill="#8a7a6a"/>`).join(''));
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 1000" width="1640" height="2000"><rect width="820" height="1000" fill="#f3ebdd"/>${front}<g transform="translate(420 0)">${back}</g></svg>`;
writeFileSync(process.argv[2] ?? 'figure.svg', svg);
