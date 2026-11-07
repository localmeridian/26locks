// Where each lock is drawn. Coordinates are in the plate's own viewBox
// (figure: 400×1000, foot profiles: 260×150, sole: 120×260). Positions are
// given for the viewer's right half; bilateral locks are mirrored. The lateral
// foot plate is drawn toes-left, so heel-side points have large x there.
// Placement follows the anatomical descriptions in research/notes/sels-*.md, read
// against the rendered figure (scripts/figure).

export type Plate = 'front' | 'back' | 'medial' | 'lateral' | 'sole';
export type Placement = { plate: Plate; x: number; y: number; mirror?: boolean };

export const positions: Record<number, Placement[]> = {
  1: [{ plate: 'front', x: 248, y: 706, mirror: true }],
  2: [{ plate: 'back', x: 250, y: 408, mirror: true }],
  3: [{ plate: 'back', x: 228, y: 198, mirror: true }],
  4: [{ plate: 'back', x: 214, y: 118, mirror: true }],
  5: [{ plate: 'medial', x: 62, y: 100 }],
  6: [{ plate: 'medial', x: 135, y: 126 }, { plate: 'sole', x: 34, y: 131 }],
  7: [{ plate: 'sole', x: 30, y: 45 }],
  8: [{ plate: 'back', x: 268, y: 724, mirror: true }],
  9: [{ plate: 'back', x: 226, y: 258, mirror: true }],
  10: [{ plate: 'back', x: 226, y: 228, mirror: true }],
  11: [{ plate: 'back', x: 234, y: 172, mirror: true }],
  12: [{ plate: 'back', x: 222, y: 145, mirror: true }],
  13: [{ plate: 'front', x: 236, y: 245, mirror: true }],
  14: [{ plate: 'front', x: 243, y: 330, mirror: true }],
  15: [{ plate: 'front', x: 248, y: 474, mirror: true }],
  16: [{ plate: 'lateral', x: 198, y: 102 }],
  17: [{ plate: 'back', x: 330, y: 497, mirror: true }],
  18: [{ plate: 'front', x: 360, y: 515, mirror: true }],
  19: [{ plate: 'front', x: 336, y: 356, mirror: true }],
  20: [{ plate: 'front', x: 218, y: 62, mirror: true }],
  21: [{ plate: 'front', x: 220, y: 104, mirror: true }],
  22: [{ plate: 'front', x: 250, y: 205, mirror: true }],
  23: [{ plate: 'back', x: 225, y: 355, mirror: true }],
  24: [{ plate: 'lateral', x: 98, y: 112 }],
  25: [{ plate: 'back', x: 240, y: 513, mirror: true }],
  26: [{ plate: 'back', x: 271, y: 268, mirror: true }],
};
