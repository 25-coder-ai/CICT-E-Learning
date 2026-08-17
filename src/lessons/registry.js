

// ─── U1 (முல்லை — all 10 lessons as React components) ───────────────────────
import M1L1App   from './m1l1/App';
import M1L2App   from './m1l2/App';
import M1L3App   from './m1l3/App';
import M1L4App   from './m1l4/App';
import M1L5App   from './m1l5/App';
import M1L6App   from './m1l6/App';
import M1L7App   from './m1l7/App';
import M1L8App   from './m1l8/App';
import M1L9App   from './m1l9/App';
import M1L10App  from './m1l10/App';

// ─── U2 (குறிஞ்சி — 14 lessons) ──────────────────────────────────────────────
import M1U2L1App   from './m1u2l1/App';
import M1U2L2App   from './m1u2l2/App';
import M1U2L3App   from './m1u2l3/App';
import M1U2L4App   from './m1u2l4/App';
import M1U2L5App   from './m1u2l5/App';
import M1U2L6App   from './m1u2l6/App';
import M1U2L7App   from './m1u2l7/App';
import M1U2L8App   from './m1u2l8/App';
import M1U2L9App   from './m1u2l9/App';
import M1U2L10App  from './m1u2l10/App';
import M1U2L11App  from './m1u2l11/App';
import M1U2L12App  from './m1u2l12/App';
import M1U2L13App  from './m1u2l13/App';
import M1U2L14App  from './m1u2l14/App';

// ─── U3 (மருதம் — 12 lessons) ─────────────────────────────────────────────────
import M1U3L1App   from './m1u3l1/App';
import M1U3L2App   from './m1u3l2/App';
import M1U3L3App   from './m1u3l3/App';
import M1U3L4App   from './m1u3l4/App';
import M1U3L5App   from './m1u3l5/App';
import M1U3L6App   from './m1u3l6/App';
import M1U3L7App   from './m1u3l7/App';
import M1U3L8App   from './m1u3l8/App';
import M1U3L9App   from './m1u3l9/App';
import M1U3L10App  from './m1u3l10/App';
import M1U3L11App  from './m1u3l11/App';
import M1U3L12App  from './m1u3l12/App';

// ─── U4 (நெய்தல் — 11 lessons) ────────────────────────────────────────────────
import M1U4L1App   from './m1u4l1/App';
import M1U4L2App   from './m1u4l2/App';
import M1U4L3App   from './m1u4l3/App';
import M1U4L4App   from './m1u4l4/App';
import M1U4L5App   from './m1u4l5/App';
import M1U4L6App   from './m1u4l6/App';
import M1U4L7App   from './m1u4l7/App';
import M1U4L8App   from './m1u4l8/App';
import M1U4L9App   from './m1u4l9/App';
import M1U4L10App  from './m1u4l10/App';
import M1U4L11App  from './m1u4l11/App';

// ─── U5 (பாலை — 11 lessons) ───────────────────────────────────────────────────
import M1U5L1App   from './m1u5l1/App';
import M1U5L2App   from './m1u5l2/App';
import M1U5L3App   from './m1u5l3/App';
import M1U5L4App   from './m1u5l4/App';
import M1U5L5App   from './m1u5l5/App';
import M1U5L6App   from './m1u5l6/App';
import M1U5L7App   from './m1u5l7/App';
import M1U5L8App   from './m1u5l8/App';
import M1U5L9App   from './m1u5l9/App';
import M1U5L10App  from './m1u5l10/App';
import M1U5L11App  from './m1u5l11/App';

// ─── U6 (கைக்கிளை — 4 lessons) ───────────────────────────────────────────────
import M1U6L1App   from './m1u6l1/App';
import M1U6L2App   from './m1u6l2/App';
import M1U6L3App   from './m1u6l3/App';
import M1U6L4App   from './m1u6l4/App';

// ─── U7 (பெருந்திணை — 1 lesson) ──────────────────────────────────────────────
import M1U7L1App   from './m1u7l1/App';

// ─── Lesson key → component ───────────────────────────────────────────────────
// U1 keys are numbers; U2–U7 keys are strings like 'u2-3'.
export const LESSON_APP_MAP = {
  // U1
  1:  M1L1App,
  2:  M1L2App,
  3:  M1L3App,
  4:  M1L4App,
  5:  M1L5App,
  6:  M1L6App,
  7:  M1L7App,
  8:  M1L8App,
  9:  M1L9App,
  10: M1L10App,
  // U2
  'u2-1':  M1U2L1App,  'u2-2':  M1U2L2App,  'u2-3':  M1U2L3App,
  'u2-4':  M1U2L4App,  'u2-5':  M1U2L5App,  'u2-6':  M1U2L6App,
  'u2-7':  M1U2L7App,  'u2-8':  M1U2L8App,  'u2-9':  M1U2L9App,
  'u2-10': M1U2L10App, 'u2-11': M1U2L11App, 'u2-12': M1U2L12App,
  'u2-13': M1U2L13App, 'u2-14': M1U2L14App,
  // U3
  'u3-1':  M1U3L1App,  'u3-2':  M1U3L2App,  'u3-3':  M1U3L3App,
  'u3-4':  M1U3L4App,  'u3-5':  M1U3L5App,  'u3-6':  M1U3L6App,
  'u3-7':  M1U3L7App,  'u3-8':  M1U3L8App,  'u3-9':  M1U3L9App,
  'u3-10': M1U3L10App, 'u3-11': M1U3L11App, 'u3-12': M1U3L12App,
  // U4
  'u4-1':  M1U4L1App,  'u4-2':  M1U4L2App,  'u4-3':  M1U4L3App,
  'u4-4':  M1U4L4App,  'u4-5':  M1U4L5App,  'u4-6':  M1U4L6App,
  'u4-7':  M1U4L7App,  'u4-8':  M1U4L8App,  'u4-9':  M1U4L9App,
  'u4-10': M1U4L10App, 'u4-11': M1U4L11App,
  // U5
  'u5-1':  M1U5L1App,  'u5-2':  M1U5L2App,  'u5-3':  M1U5L3App,
  'u5-4':  M1U5L4App,  'u5-5':  M1U5L5App,  'u5-6':  M1U5L6App,
  'u5-7':  M1U5L7App,  'u5-8':  M1U5L8App,  'u5-9':  M1U5L9App,
  'u5-10': M1U5L10App, 'u5-11': M1U5L11App,
  // U6
  'u6-1':  M1U6L1App,  'u6-2':  M1U6L2App,
  'u6-3':  M1U6L3App,  'u6-4':  M1U6L4App,
  // U7
  'u7-1':  M1U7L1App,
};

// ─── Unit metadata for buildBtns (U2–U7 only; U1 is special-cased) ───────────
// To add U8: { prefix: 'u8', count: N } + imports + LESSON_APP_MAP entries.
export const UNIT_LESSON_COUNTS = {
  'அலகு 2 : குறிஞ்சி':    { prefix: 'u2', count: 14 },
  'அலகு 3 : மருதம்':       { prefix: 'u3', count: 12 },
  'அலகு 4 : நெய்தல்':     { prefix: 'u4', count: 11 },
  'அலகு 5 : பாலை':         { prefix: 'u5', count: 11 },
  'அலகு 6 : கைக்கிளை':   { prefix: 'u6', count:  4 },
  'அலகு 7 : பெருந்திணை':  { prefix: 'u7', count:  1 },
};
