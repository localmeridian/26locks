import { selData } from './sels';
import { depths, DATASET_REVIEWED } from './depths';

export const sels = [...selData]
  .map((s) => ({ ...s, reviewed: s.reviewed ?? DATASET_REVIEWED }))
  .sort((a, b) => a.n - b.n);
export { depths, sixthDepth, DATASET_REVIEWED } from './depths';
export const depthOf = (n: number) => depths.find((d) => d.sels.includes(n))!;
