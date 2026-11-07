// The Atlas search, shared so a lock page can link a theme to every lock that matches it.
import type { Sel } from '../data/types';

export const selText = (s: Sel) =>
  [s.n, s.name, ...s.alt, s.essence, s.where, s.whereDetail, s.role, ...s.body, ...s.feelings].join(' ').toLowerCase();

/** A chip label as an Atlas query: lower case, without "&" or brackets. */
export const asQuery = (label: string) => label.toLowerCase().replace(/[&()]/g, ' ').replace(/\s+/g, ' ').trim();

export const matching = (sels: Sel[], q: string) => {
  const terms = q.split(' ');
  return sels.filter((s) => terms.every((t) => selText(s).includes(t)));
};
