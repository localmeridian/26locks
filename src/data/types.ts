export type Depth = 1 | 2 | 3 | 4 | 5;

export interface Hold {
  name: string;
  how: string;
  sources?: string[];
}

export interface Sel {
  n: number;
  /** Most common English name, e.g. "Prime Mover". */
  name: string;
  /** Other names found in the literature. */
  alt: string[];
  /** One-line essence for at-a-glance reading. */
  essence: string;
  depth: Depth;
  /** Burmeister-derived universal meaning. */
  meaning: string;
  /** Finger key — the finger that harmonizes this lock. */
  finger: 'thumb' | 'index' | 'middle' | 'ring' | 'little' | 'palm';
  /** Direction on the Supervisor circulation. */
  current: 'ascending' | 'descending';
  /** Short location for lists ("inside of the knee"). */
  where: string;
  /** Fuller location with landmarks. */
  whereDetail: string;
  bilateral: boolean;
  /** What it does — 1–3 sentences. */
  role: string;
  /** Body areas and functions traditionally associated. */
  body: string[];
  /** Emotional / attitudinal associations. */
  feelings: string[];
  related: { n: number; why: string }[];
  holds: Hold[];
  notes?: string;
  sources: string[];
  confidence: 'high' | 'medium' | 'low';
  /** Date a human last checked this entry against its sources (defaults to the dataset date). */
  reviewed?: string;
}

export interface DepthInfo {
  n: Depth;
  name: string;
  sels: number[];
  /** Organ-function pair, yin/yang order as Burmeister lists it. */
  organs: string[];
  attitude: string;
  /** Finger of the depth (the "attitude" scheme), not the per-lock finger key. */
  finger: string;
  season: string;
  /** Tissue layer the depth governs. */
  layer: string;
  /** Element — sources disagree; shown with its own confidence. */
  element: string;
  elementConfidence: 'high' | 'medium' | 'low';
  meaning: string;
  confidence: 'high' | 'medium' | 'low';
  sources: string[];
  /** Date a human last checked this entry against its sources. */
  reviewed: string;
}

export interface Source {
  key: string;
  title: string;
  author?: string;
  site?: string;
  url?: string;
  year?: string | number;
  accessed?: string;
  type: string;
  reliability?: string;
  /** Normalised from `reliability` by scripts/merge-sources.mjs. */
  grade: 'high' | 'medium' | 'low';
  notes?: string;
  /** Research pass that found it (history, sels-a, sels-b, system, user). */
  pass?: string;
}
