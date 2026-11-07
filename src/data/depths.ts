// The five depths, curated from research/notes/system.json (pass C).
// Element names differ between sources; see research/curation-log.md §Depths.
import type { DepthInfo } from './types';

export const DATASET_REVIEWED = '2026-10-31';

export const depths: DepthInfo[] = [
  {
    n: 1, name: '1st Depth', sels: [1, 2, 3, 4],
    organs: ['Stomach', 'Spleen'], attitude: 'Worry', finger: 'Thumb', season: 'Late summer', layer: 'Surface skin',
    element: 'Earth', elementConfidence: 'high',
    meaning: 'Getting set to manifest. Its gifts: a peaceful mind, good boundaries.',
    confidence: 'high', sources: ['C17', 'C01', 'C02', 'C05'], reviewed: DATASET_REVIEWED,
  },
  {
    n: 2, name: '2nd Depth', sels: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    organs: ['Lung', 'Large Intestine'], attitude: 'Grief, sadness', finger: 'Ring', season: 'Autumn', layer: 'Deep skin',
    element: 'Air (Metal in Chinese medicine)', elementConfidence: 'high',
    meaning: 'Spirit, mind and body, expressed in harmony. Its gift: common sense.',
    confidence: 'high', sources: ['C17', 'C01', 'C02', 'C05'], reviewed: DATASET_REVIEWED,
  },
  {
    n: 3, name: '3rd Depth', sels: [16, 17, 18, 19, 20, 21, 22],
    organs: ['Gallbladder', 'Liver'], attitude: 'Anger', finger: 'Middle', season: 'Spring', layer: 'Blood',
    element: '“Key” (Wood)', elementConfidence: 'medium',
    meaning: 'The principle of activity. Its gift: vision.',
    confidence: 'high', sources: ['C17', 'C01', 'C02', 'C05'], reviewed: DATASET_REVIEWED,
  },
  {
    n: 4, name: '4th Depth', sels: [23],
    organs: ['Bladder', 'Kidney'], attitude: 'Fear', finger: 'Index', season: 'Winter', layer: 'Muscles',
    element: 'Water', elementConfidence: 'high',
    meaning: 'The bridge between the material body and the energetic one.',
    confidence: 'high', sources: ['C17', 'C01', 'C02', 'C04', 'C05'], reviewed: DATASET_REVIEWED,
  },
  {
    n: 5, name: '5th Depth', sels: [24, 25, 26],
    organs: ['Heart', 'Small Intestine'], attitude: 'Pretence, trying too hard', finger: 'Little', season: 'Summer', layer: 'Bones',
    element: 'Fire', elementConfidence: 'high',
    meaning: 'Arising into one’s spiritual inheritance, centred on the heart.',
    confidence: 'high', sources: ['C17', 'C01', 'C02', 'C05'], reviewed: DATASET_REVIEWED,
  },
];

/** Beyond the five: the 6th Depth holds the blueprint (Diaphragm & Umbilicus) and has no locks of its own. */
export const sixthDepth = {
  organs: ['Diaphragm', 'Umbilicus'],
  meaning:
    'The personal blueprint that holds the five depths, and home of the Main Central flow. No lock is its own: Touch of Healing lists all of them, 0 to 26. Its hand position is the centre of the palm, and it belongs to every season. Out of balance, its attitude is total discouragement or despair (the Spanish and German translations differ).',
  confidence: 'medium' as const,
  sources: ['C17', 'C18', 'C02', 'C05', 'C13', 'C14', 'C15'],
};
