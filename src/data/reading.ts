// The books a newcomer should read, Mary Burmeister's first. Goodreads links were
// checked by hand on 2026-10-25 (each page found by search and opened); never add
// one that has not been opened. `keys` point into the bibliography on the same page.

export interface Book {
  title: string;
  /** Short title for the heading when the full one is long. */
  short?: string;
  author: string;
  year: string;
  note: string;
  keys: string[];
  /** Goodreads pages: [label, url]. */
  goodreads?: [string, string][];
}

export const STORE = 'https://www.jsjinc.net/prods.php?sid=8';

// Mary Burmeister wrote in English (she was born in Seattle); the German, Portuguese
// and other editions are translations.
export const mary: Book[] = [
  {
    title: 'Introducing Jin Shin Jyutsu Is, Book I: Getting to Know (Help) Myself',
    short: 'Self-Help Book 1',
    author: 'Mary Burmeister',
    year: '1980',
    note: 'Her introductory book. A short guide to helping yourself: the Main Central, the five attitudes held in the fingers, and the three daily flows, each step described by where the hands go.',
    keys: ['C16'],
    goodreads: [['Goodreads', 'https://www.goodreads.com/book/show/20650271']],
  },
  {
    title: 'Introducing Jin Shin Jyutsu Is, Book II: Mankind’s Safety Energy Locks and Keys',
    short: 'Self-Help Book 2',
    author: 'Mary Burmeister',
    year: '1981',
    note: 'The 26 Safety Energy Locks: where each one lies, how to hold it, and what it means, with a short “quickie” hold for each. Teachers cite it page by page for the locks.',
    keys: ['A44', 'H6'],
    goodreads: [['Goodreads', 'https://www.goodreads.com/book/show/20650270']],
  },
  {
    title: 'Introducing Jin Shin Jyutsu Is, Book III: Fun with Fingers and Toes',
    short: 'Self-Help Book 3',
    author: 'Mary Burmeister',
    year: '1985',
    note: 'The fingers and toes, how they pair across the body, and Murai’s eight finger poses, numbered I to VIII.',
    keys: ['C19', 'H6'],
    goodreads: [['Goodreads', 'https://www.goodreads.com/book/show/45467187']],
  },
  {
    title: 'Fun with Happy Hands',
    author: 'Mary Burmeister',
    year: '1988',
    note: 'A book for children: simple ways to help themselves, shown in colour drawings of children using their hands.',
    keys: ['H6'],
    goodreads: [['Goodreads', 'https://www.goodreads.com/book/show/169378364']],
  },
  {
    title: 'Text 1 and Text 2',
    author: 'Mary Burmeister',
    year: '',
    note: 'Her seminar textbooks, which Jin Shin Jyutsu, Inc. calls the core materials for learning the art. Text 1 covers the universal level: the locks, the three great flows, and the depths. Text 2 covers the twelve organ functions. They are sold only to students who have taken the 5-Day seminar.',
    keys: ['H6', 'C02'],
    goodreads: [['Text 1 on Goodreads', 'https://www.goodreads.com/book/show/148930469'], ['Text 2 on Goodreads', 'https://www.goodreads.com/book/show/149522284']],
  },
];

export const after: Book[] = [
  {
    title: 'The Touch of Healing: Energizing Body, Mind, and Spirit with the Art of Jin Shin Jyutsu',
    short: 'The Touch of Healing',
    author: 'Alice Burmeister with Tom Monte',
    year: '1997',
    note: 'The easiest to find, in bookshops and libraries. Written by Mary’s daughter-in-law, with Mary’s foreword. It walks through the depths, all 26 locks, the twelve organ flows, and the daily flows.',
    keys: ['C17', 'H24'],
    goodreads: [['Goodreads', 'https://www.goodreads.com/book/show/354723']],
  },
  {
    title: 'Health Is in Your Hands: Jin Shin Jyutsu, Practicing the Art of Self-Healing',
    short: 'Health Is in Your Hands',
    author: 'Waltraud Riegger-Krause',
    year: '2014',
    note: 'By an instructor who studied with Mary from 1985 to 1990. A self-help book with flash cards for the holds.',
    keys: ['C05'],
    goodreads: [['Goodreads', 'https://www.goodreads.com/book/show/19850811']],
  },
];
