// One quiet citation mark per claim. The keys stay in the data, and the mark opens a
// small list of the sources behind the claim (see the cite script in Base).
import { sourceMap } from '../data/sources';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function citeHtml(keys: string[], where = 'cite'): string {
  const uniq = [...new Set(keys)];
  if (!uniq.length) return '';
  const items = uniq.map((k) => {
    const s = sourceMap.get(k);
    if (!s) throw new Error(`${where}: unknown source key ${k}`);
    const by = s.author ? `<span class="cp-by">${esc(String(s.author))}</span>` : '';
    return `<a href="${base}/sources/#${k}"><span class="cp-k">${k}</span><span class="cp-t">${esc(s.title)}</span>${by}</a>`;
  }).join('');
  const n = uniq.length === 1 ? '1 source' : `${uniq.length} sources`;
  return `<span class="cites"><button type="button" class="cite-mark" aria-label="${n}: ${uniq.join(', ')}" aria-expanded="false"></button>` +
    `<span class="cite-pop" role="group" aria-label="Sources"><span class="cp-h">${n}</span>${items}</span></span>`;
}
