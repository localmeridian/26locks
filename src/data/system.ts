// System-level data (fingers, organ clock, flows, pulses) is read straight from the
// research notes so the site and the audit trail can't drift apart. Curation
// decisions about it are logged in research/curation-log.md.
import raw from './system.json';

export type Finger = 'thumb' | 'index' | 'middle' | 'ring' | 'little' | 'palm';
export const fingerOrder: Finger[] = ['thumb', 'index', 'middle', 'ring', 'little', 'palm'];

export interface FingerInfo {
  key: Finger;
  label: string;
  organs: string[];
  attitude: string | null;
  depth: number;
  /** Locks this finger harmonises in the finger key (Supervisor rounds). */
  sels: number[];
  notes: string;
  sources: string[];
}
export const fingers: FingerInfo[] = raw.fingers.map((f) => ({
  key: (f.finger === 'Palm centre' ? 'palm' : f.finger.toLowerCase()) as Finger,
  label: f.finger,
  organs: f.organs,
  // The notes keep their sources' spelling; the site spells it the British way, as elsewhere.
  attitude: f.attitude?.replace(/(p)retense/gi, '$1retence') ?? null,
  depth: f.depth,
  sels: [...f.sels].sort((a, b) => a - b),
  notes: f.notes,
  sources: f.sources,
}));
export const fingerHold = raw.fingerHoldGuidance;

export interface ClockHour {
  organ: string;
  start: string;
  end: string;
  tcmStart: string;
  tcmEnd: string;
  quickie: string;
  sources: string[];
}
export const organClock: ClockHour[] = raw.organClock.map((o) => ({
  organ: o.organ, start: o.start, end: o.end, tcmStart: o.tcmStart, tcmEnd: o.tcmEnd, quickie: o.quickie, sources: o.sources,
}));
export const organClockNotes: string = raw.organClockNotes;

export type FlowStep = { right?: string; left?: string; description?: string };
export interface Flow {
  name: string;
  group: string;
  purpose: string;
  steps: FlowStep[];
  pathway?: string;
  variants?: string;
  sources: string[];
  confidence?: string;
}
export const flows = raw.flows as Flow[];
export const ascDesc = raw.ascendingDescending;
export const pulse = raw.pulseListening;
export const session = raw.session;
export const training = raw.training;
export const selSystem = raw.sels;

/** Left Supervisor order (C01). After Lock 4 it crosses at the back of the head; 20–15 are on the opposite side. */
export const supervisorOrder = [1, 5, 6, 7, 24, 16, 8, 25, 2, 23, 9, 10, 3, 17, 18, 19, 11, 12, 4, 20, 21, 22, 13, 14, 15];
export const supervisorCrossAfter = 4;
