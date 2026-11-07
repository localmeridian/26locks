// Lenses: the same body seen through different teaching systems. Jin Shin Jyutsu®
// is the default and the only lens backed by the public research in research/notes/.
// Other lenses show where their teaching names or places things differently.
export type LensId = 'jsj';
export const LENS_DEFAULT: LensId = 'jsj';

export interface Lens {
  id: LensId;
  label: string;
  short: string;
  /** Neutral name shown in the lens menu, so ordinary pages need not name the systems. */
  name: string;
  /** Neutral one-line hint under the name. */
  hint: string;
  /** Service-mark notice printed wherever this lens's system is named. */
  notice?: string;
  /** What this system calls the 26 locations. */
  term: string;
  terms: string;
  blurb: string;
  /** Common ground with the Locks map, and what changes; inline source keys. */
  same?: string;
  differs?: string;
}

const allLenses: Lens[] = [
  {
    id: 'jsj', label: 'Jin Shin Jyutsu®', short: 'JSJ', name: 'Locks', hint: 'The 26 Safety Energy Locks', term: 'Safety Energy Lock', terms: 'Safety Energy Locks',
    blurb: 'The 26 Safety Energy Locks of Jin Shin Jyutsu®, as Mary Burmeister taught them. This is the default view, and the one the site’s research covers.',
  },
];
/** The lenses this build publishes. */
export const lenses = allLenses;
export const lensIds = lenses.map((l) => l.id);
export const lensMap = Object.fromEntries(allLenses.map((l) => [l.id, l])) as Record<LensId, Lens>;
