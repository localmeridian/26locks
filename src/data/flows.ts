// Flows drawn step by step on the Flows page. Hold descriptions and sources come from
// research/notes/system.json (see system-architecture.md §5); this file only adds
// where each hand goes on the drawings. A hand on a named lock is drawn at that lock's
// position on the side named (L/R are the person's own left and right). Body landmarks
// are placed on the figure in research/curation-log.md ("Flows and Clock"). A hand
// on a place the drawings don't show (toes, fingers) is listed but not drawn.
// High 1 and Low 8 are drawn from Burmeister's landmarks (SH1 p.47). High 19 is drawn on the upper arm, which she calls Lock 19 (SH2 pp.54, 56). Each drawn flow restates its research purpose in plain words.
import { positions, type Plate } from './positions';
import { flows as rawFlows, supervisorOrder, supervisorCrossAfter } from './system';

export type Side = 'L' | 'R';
export interface Spot { plate: Plate; x: number; y: number }
export interface Target { label: string; at?: Spot; sel?: number }
export interface Step { right?: Target; left?: Target; note?: string }
export interface DrawnFlow {
  id: string;
  name: string;
  short: string;
  group: string;
  purpose: string;
  steps: Step[];
  variants?: string;
  sources: string[];
  confidence: string;
}

/** Where a lock sits on one side of the body. Front view: the person's left is on the viewer's right. */
export function selSpot(n: number, side: Side): Spot | undefined {
  const p = positions[n]?.[0];
  if (!p) return undefined;
  if (!p.mirror) return { plate: p.plate, x: p.x, y: p.y };
  const viewerRight = p.plate === 'front' ? side === 'L' : side === 'R';
  return { plate: p.plate, x: viewerRight ? p.x : 400 - p.x, y: p.y };
}

const sideWord = { L: 'left', R: 'right' } as const;
const sel = (side: Side, n: number): Target => ({ label: `${sideWord[side]} ${n}`, at: selSpot(n, side), sel: n });
const mark = (label: string, plate: Plate, x: number, y: number): Target => ({ label, at: { plate, x, y } });
const text = (label: string): Target => ({ label });

// Midline landmarks on the 400×1000 figure.
const crown = mark('top of the head', 'front', 200, 36);
const brows = mark('between the eyebrows', 'front', 200, 81);
const nose = mark('tip of the nose', 'front', 200, 107);
const sternum = mark('middle of the breastbone', 'front', 200, 263);
const sternumBase = mark('base of the breastbone', 'front', 200, 303);
const pubic = mark('top of the pubic bone', 'front', 200, 481);
const coccyx = mark('tailbone (coccyx)', 'back', 200, 445);
// "High 19" is teachers' wording, not hers; the exact spot on the upper arm is ours.
const high19 = mark('left High 19', 'front', 318, 292);

const raw = (prefix: string) => {
  const f = rawFlows.find((x) => x.name.startsWith(prefix));
  if (!f) throw new Error(`flow not found: ${prefix}`);
  return f;
};
const from = (prefix: string) => {
  const f = raw(prefix);
  return { group: f.group, purpose: f.purpose, variants: f.variants, sources: f.sources, confidence: f.confidence ?? 'medium' };
};

export const drawnFlows: DrawnFlow[] = [
  {
    id: 'mcv', name: 'Main Central Vertical', short: 'Main Central', ...from('Main Central Vertical'),
    group: 'The Trinity',
    purpose: 'The first current, and the only one without a pair. It falls down the front on the out-breath, rises up the back on the in-breath, and harmonises the midline.',
    variants: 'The 5-Day seminar adds the throat after the nose; other versions add the space between nose and upper lip, or a point above the navel. Quick versions: head with brows; head with pubic bone or tailbone, Burmeister’s hold for the oval, the 0 of her locks 0–26; both palm centres; each finger in turn.',
    steps: [
      { right: crown, left: brows, note: 'For deep circulation and memory.' },
      { right: crown, left: nose, note: 'For surface circulation and the reproductive functions.' },
      { right: crown, left: sternum, note: 'For the breath and the hips.' },
      { right: crown, left: sternumBase, note: 'For the source itself, rising and falling.' },
      { right: crown, left: pubic, note: 'For the falling current, and a stronger spine.' },
      { right: coccyx, left: pubic, note: 'The right hand moves from the head to the tailbone. For the rising current, and circulation in the legs and feet.' },
    ],
  },
  {
    id: 'supervisor', name: 'Supervisor (left side)', short: 'Supervisor', ...from('Supervisor'),
    group: 'The Trinity',
    purpose: 'One for each side of the body. It carries 23 of the 26 locks, starting at 1 on the inner knee and passing through the five depths.',
    variants: 'Burmeister’s first book gives one three-step sequence for Supervisor and Mediator together: see the Mediator. The two steps drawn here aren’t in the Self-Help Books as a flow, though 11 with 25 is her Lock 11 quickie.',
    steps: [
      { right: sel('L', 11), left: sel('L', 25) },
      { right: sel('L', 11), left: sel('L', 15), note: 'For the right side, mirror both hands.' },
    ],
  },
  {
    id: 'mediator', name: 'Mediator (left side)', short: 'Mediator', ...from('Diagonal Mediator'),
    group: 'The Trinity',
    purpose: 'Runs diagonally, mediating between left and right and keeping both in tune with the Main Central. Burmeister calls this energy the cause of disharmony. This simple daily sequence serves the Supervisor and the Mediator together.',
    variants: undefined,
    steps: [
      { left: text('left thumb over the left ring fingernail, making a circle'), note: 'For clearing the chest.' },
      { left: text('left thumb over the left ring fingernail, making a circle'), right: { label: 'over the left shoulder, like a coat hanger', at: selSpot(3, 'L') }, note: 'For the rising energy.' },
      { left: text('left thumb stays on the left ring fingernail'), right: { label: 'stays over the left shoulder', at: selSpot(3, 'L') }, note: 'Hands stay as they are, as her figures show. Let the inner knees touch, feet wherever is comfortable. For the falling energy. For the right side, mirror the hands.' },
    ],
  },
  {
    id: 'spleen', name: 'Spleen flow', short: 'Spleen', ...from('Spleen Function'),
    group: 'Daily flow',
    purpose: 'Rises up the front. The first daily flow: general energy, a “refuelling”.',
    variants: 'If the ankle is hard to reach, Burmeister offers the inner knee (1) or the pubic bone. The European office adds alternatives for different levels: the little fingers (Main Central), 22 (the locks), 14 (organ function) or 19 (special body function).',
    steps: [
      { right: sel('R', 5), left: coccyx },
      { right: sel('L', 14), left: coccyx },
      { right: sel('L', 14), left: sel('R', 13) },
      { right: sel('L', 14), left: sel('L', 22), note: 'This is the right-side version. For the left side, mirror both hands.' },
    ],
  },
  {
    id: 'stomach', name: 'Stomach flow', short: 'Stomach', ...from('Stomach Function'),
    group: 'Daily flow',
    purpose: 'Falls down the front. The second daily flow releases the day’s tension in the front of the body. Traditionally held for the head, breathing, digestion, bloating and weight.',
    steps: [
      { right: sel('L', 21), left: sel('L', 22) },
      { right: sel('L', 21), left: sel('R', 14) },
      { right: sel('L', 21), left: sel('R', 23) },
      { right: sel('L', 21), left: sel('L', 14) },
      { right: sel('L', 21), left: mark('right High 1', 'front', 166, 655), note: 'Burmeister: the inner thigh, about three inches above the knee. This pair alone is her short form for the abdomen, bloating and weight.' },
      { right: sel('L', 21), left: mark('right Low 8', 'front', 116, 813), note: 'Burmeister: the outer calf, halfway between knee and ankle, just off the shin bone.' },
      { right: sel('L', 21), left: text('right middle toe'), note: 'This is the left-side version. For the right side, mirror both hands.' },
    ],
  },
  {
    id: 'bladder', name: 'Bladder flow', short: 'Bladder', ...from('Bladder Function'),
    group: 'Daily flow',
    purpose: 'Falls down the back, the only flow along the spine. The third daily flow releases the day’s tension in the back of the body. Traditionally held for the head, back, elimination and legs.',
    steps: [
      { right: sel('L', 12), left: coccyx },
      { right: sel('L', 12), left: mark('back of the left knee', 'back', 132, 717) },
      { right: sel('L', 12), left: sel('L', 16) },
      { right: sel('L', 12), left: text('left little toe'), note: 'This is the left-side version. For the right side, mirror both hands.' },
    ],
  },
  {
    id: 'mc1', name: '1st Method of Correction', short: '1st Correction', ...from('1st Method'),
    group: 'Correction',
    purpose: 'Sets the Mediator, the diagonal current, right with itself. It works at the bust line.',
    steps: [
      { left: sel('L', 11), right: sel('L', 22) },
      { left: sel('L', 11), right: sel('R', 2) },
      { left: sel('L', 11), right: sel('L', 8) },
      { left: sel('L', 11), right: high19, note: 'High 19 is teachers’ wording. Burmeister calls the upper arm Lock 19 in two quickies.' },
    ],
  },
  {
    id: 'mc2', name: '2nd Method of Correction', short: '2nd Correction', ...from('2nd Method'),
    group: 'Correction',
    purpose: 'Sets the Mediator right with the Supervisor. It works at the hip line, and is nicknamed “the chiropractor”.',
    steps: [
      { left: sel('L', 15), right: sel('L', 2) },
      { left: sel('L', 15), right: sel('L', 1) },
      { left: sel('L', 15), right: high19 },
      { left: sel('L', 15), right: sel('L', 4) },
    ],
  },
  {
    id: 'mc3', name: '3rd Method of Correction', short: '3rd Correction', ...from('3rd Method'),
    group: 'Correction',
    purpose: 'Sets the Mediator right with the Main Central. It works at the waist line, and is traditionally called the emergency flow. In a real emergency, call for medical help first.',
    steps: [{ right: crown, left: coccyx }],
  },
];

/** Flows the research names but could not transcribe in full; listed, not drawn. */
export const otherFlows = rawFlows.filter((f) =>
  ['Fatigue Flow', 'The 12 organ', 'Special Body', 'Numbered lock', 'Finger-toe'].some((p) => f.name.startsWith(p)),
);

/** The left Supervisor's path through the locks, in order, with where each one sits. */
export const supervisorPath = supervisorOrder.map((n, i) => {
  const side: Side = i > supervisorOrder.indexOf(supervisorCrossAfter) ? 'R' : 'L';
  return { n, side, at: selSpot(n, side)! };
});
