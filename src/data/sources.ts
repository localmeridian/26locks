import raw from './sources.json';
import type { Source } from './types';
export const sources = raw as Source[];
export const sourceMap = new Map(sources.map((s) => [s.key, s]));
