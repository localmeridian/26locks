// Glossary terms. The single source of truth is research/notes/glossary.json
// (system research pass, C keys); this module only sorts and indexes it so the
// page never drifts from the notes.
import raw from './glossary.json';

export interface Term {
  term: string;
  japanese?: string;
  definition: string;
  sources: string[];
  slug: string;
  letter: string;
  /** Lock numbers the term names, for cross-links to /lock/N/. */
  sels: number[];
  /** Kanji supplied from general Japanese usage rather than a JSJ source. */
  generalKanji: boolean;
  /** Practitioner usage supplied by the site owner; carries no public source key. */
  practitioner?: boolean;
  /** Slugs of related terms. */
  see?: string[];
  /** The page on this site that shows the idea, for a reader who wants to see it rather than read it. */
  page?: { href: string; label: string };
}

// Where a term can be seen at work: the five first words and the ideas the main pages are built on.
const pages: Record<string, { href: string; label: string }> = {
  Lock: { href: '/atlas/', label: 'Find them on the body' },
  Depth: { href: '/depths/', label: 'See the five depths' },
  Attitude: { href: '/fingers/', label: 'Each finger and its attitude' },
  Mudra: { href: '/fingers/#mudras', label: 'See the eight poses' },
  Flow: { href: '/flows/', label: 'Watch the flows' },
  'Trinity (3-nity) flows': { href: '/flows/', label: 'Watch the Trinity flows' },
  Supervisor: { href: '/flows/#supervisor', label: 'Watch its path' },
  'Organ flows (12)': { href: '/clock/', label: 'See the organ clock' },
};

// The notes keep research shorthand; the page restates those entries in plain words,
// keyed by the notes' term. Sources and kanji flags still come from the notes.
const plain: Record<string, string> = {
  'Physio-Philosophy': 'A name Mary Burmeister gave the art so that more people could understand it: physio meaning nature, philosophy the effortless reality. She pairs it with Physio-Psychology and Physio-Physiology: awareness, understanding and application. Also the theory taught alongside the hands-on work in the 5-Day Basic seminar.',
  'Physio-Psychology': 'Burmeister’s word for understanding oneself: stop, look within and listen. The second of her three.',
  'Physio-Physiology': 'Burmeister’s word for practical application: the hands-on method. The third of her three.',
  'Oval (Lock 0)': 'Burmeister lists the O ahead of Lock 1 and writes of locks “0–26”, though she counts twenty-six: the oval is the Main Central itself, limitless light and the breath. Hold it with one hand on the top of the head and the other on the pubic bone or tailbone, or by holding the centre of each palm in turn.',
  FUN: 'Burmeister’s acronym: Fulfilling, Understanding, No-thing.',
  FEAR: 'Burmeister’s acronym: False Evidence Appearing Real.',
  Lock: 'A **Safety Energy Lock** (**SEL**) is a place on the body where resting a hand helps energy move again. There are 26, each found on both sides of the body. Burmeister gives every number its own meaning; twenty-six means complete. Burmeister likens them to brakes that come on when the body is overtaxed; holding a lock releases it. On each side, 23 lie along one current of energy, the Supervisor, and 3 on the Mediator. Burmeister does not say which three.',
  'High / Low (e.g. Hi19, Lo8)': 'The upper or lower part of a lock that covers a larger area.',
  Depth: 'A layer of being and energy, from the most manifest (1st) to the least (9th). The 26 locks sit in the first five; the deeper ones have no locks of their own.',
  Attitude: 'One of five emotional habits bound up with disharmony in the body’s currents of energy (its flows): worry, fear, anger, grief, and pretence (trying-to). Burmeister speaks of them both as results of disharmony and as its roots, and calls fear the core of them all. Each attitude has its own finger and depth, and holding that finger helps to ease it.',
  'Trying-to / Pretense': 'The little finger’s attitude, of the 5th Depth. Also called trying too hard, or judgement.',
  Flow: 'A current of energy on a set path through the body, and the series of holds that helps it along. The word means both, and the sentence shows which: the Spleen flow runs up the front of the body (the current), and you do the Spleen flow with your hands (the holds). In the holds, usually one hand rests while the other moves, place by place, along the current’s path.',
  'Jumper cables': 'The image of two hands linking two points so energy can move between them.',
  'Self-help': 'Holds and flows you give yourself, taught from Burmeister’s three Self-Help Books.',
  Quickie: 'A short hold that stands in for a flow’s full series of holds when time is short. The word is Burmeister’s own. Book 2 gives one for the oval and for every lock: its finger, or a pair of places. An attitude’s quickie is simply holding its finger; each organ’s current has a two-place quickie; and any step of a flow that feels especially good can become your own quickie.',
  'Trinity (3-nity) flows': 'The three universal harmonising energies of Text 1: Main Central Vertical, Supervisor, and Mediator.',
  'Main Central Vertical (MCV)': 'The first flow, and the only one without a pair. It descends the front and ascends the back. Called the Source of Life.',
  Supervisor: 'A universal harmonising energy: a current, one on each side of the body, that carries 23 of the 26 locks and supervises its side. It arises at Lock 1.',
  'Mediator (Diagonal Mediator)': 'Paired energy that arises at Lock 3 and crosses the body, mediating between the sides and with the Main Central. Attitudes affect it first.',
  'Izanagi / Izanami': 'Names Murai reportedly gave the left and right Mediators, after the creator gods of Japanese myth.',
  'Universal Harmonizing Energy': 'Text 1’s term for the flows at their universal, unmanifest level: Main Central, Supervisor, Mediator.',
  'Function Energy': 'Text 2’s term for the individual energies of the 12 organ functions.',
  'Organ flows (12)': 'The currents of the twelve organ functions, Lung through Liver. Each is strongest for two hours, and each passes into the next, so the twelve make one cycle a day.',
  'Diaphragm Function Energy': 'A 6th Depth organ function (in Chinese medicine, Pericardium or Circulation-Sex). The father archetype: an ascending flow that governs the descending ones.',
  'Umbilicus Function Energy': 'A 6th Depth organ function (in Chinese medicine, Triple Warmer). The mother archetype.',
  'Special Body Function (SBF)': 'Text 2 holds for particular body functions, numbered 1 to 5, with related holds.',
  'Methods of Correction (1st, 2nd, 3rd)': 'Three short sequences that set the Mediator right with itself, with the Supervisor, and with the Main Central.',
  'Ascending / Descending': 'The direction of energy. In the Main Central, descending runs down the front on the out-breath and ascending runs up the back on the in-breath. Two organ flows run the other way: Bladder down the back, Spleen up the front.',
  'Bust line / Waist line / Hip line': 'Three horizontal bands of the body, linked to pairs of locks and, in turn, to the Mediator, Main Central, and Supervisor.',
  'Pulse listening': 'Reading the depths at both wrists, three fingers each, to choose the flows, before and during a session.',
  'Project / projection': 'A body part or sense through which a depth shows itself: the ears, for the 4th Depth. In Burmeister’s first book, a Project is also a numbered set of daily self-help, I to IV.',
  Mudra: 'A hand pose used as self-help. The third Self-Help Book gives eight, I to VIII, as Murai’s own, and calls them finger poses; mudra is the usual word elsewhere.',
  'Now Know Myself (NKM)': 'An advanced seminar of Jin Shin Jyutsu, Inc., named from Burmeister’s phrase about getting to know (help) myself.',
  'Know Myself / Help Myself': 'Burmeister’s framing of the art as getting to know (help) oneself.',
  Gassho: 'A palms-together greeting some practitioners use to close.',
  'Ama no Minaka Nushi no Kami': 'A Japanese deity named in an article on the Main Central, glossed as the divine presence at the centre of the universe.',
  'Authorized Practitioner': 'The status earned after three 5-Day seminars (105 hours) with Jin Shin Jyutsu, Inc.',
};
for (const k of Object.keys(plain))
  if (!(raw as { term: string }[]).some((t) => t.term === k)) throw new Error(`glossary: plain words for unknown term ${k}`);

for (const k of Object.keys(pages))
  if (!(raw as { term: string }[]).some((t) => t.term === k)) throw new Error(`glossary: page link for unknown term ${k}`);

const brit = (s: string) => s.replace(/(p)retense/gi, '$1retence');

const slugify = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const selRefs = (s: string) =>
  [...s.matchAll(/\b(?:Lock\s*|Hi|Lo)(\d{1,2})\b/g)]
    .map((m) => +m[1])
    .filter((n, i, a) => n >= 1 && n <= 26 && a.indexOf(n) === i);

export const glossary: Term[] = (raw as Omit<Term, 'slug' | 'letter' | 'sels' | 'generalKanji'>[])
  .map((t) => ({
    ...t,
    // The notes keep their sources' spelling; the site spells it the British way. Slugs stay as they were.
    term: brit(t.term),
    // The kanji caveat shows as a flag, so the sentence drops it.
    definition: brit(plain[t.term] ?? t.definition).replace(/\s*\(kanji from general Japanese usage[^)]*\)/i, ''),
    slug: 'term-' + slugify(t.term),
    letter: t.term[0].toUpperCase(),
    sels: selRefs(`${t.term} ${t.definition}`),
    generalKanji: /kanji from general Japanese usage/i.test(t.definition),
    page: pages[t.term],
  }))
  .sort((a, b) => a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }));

// Make every "see" link two-way.
for (const t of glossary)
  for (const s of t.see ?? []) {
    const other = glossary.find((g) => g.slug === s);
    if (!other) throw new Error(`glossary: unknown see-also ${s}`);
    if (!other.see?.includes(t.slug)) other.see = [...(other.see ?? []), t.slug];
  }

export const glossaryLetters = [...new Set(glossary.map((t) => t.letter))];
