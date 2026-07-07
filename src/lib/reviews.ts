import type { CategorySlug } from './products';

export type RatingScore = 1 | 2 | 3 | 4 | 5;

export type ReviewRating = {
  axis: string;
  score: RatingScore;
};

export type Review = {
  id: string;
  category: CategorySlug;
  handle: string;      // pseudonym — no real name ever stored
  verifiedBuyer: boolean;
  date: string;        // ISO date string
  ratings: ReviewRating[];
  body: string;        // structural descriptor text only
};

// Rating axes keyed by category — structural/functional language throughout
export const RATING_AXES: Record<CategorySlug, string[]> = {
  'slings-anchors': ['Load Tolerance', 'Hardware Integrity', 'Adjustability Range', 'Build Quality'],
  'technical-toys': ['Material Purity', 'Surface Finish', 'Sizing Accuracy', 'Build Quality'],
  'lubes':          ['Viscosity Consistency', 'Session Longevity', 'Texture Profile', 'Tissue Tolerance'],
  'metabolic':      ['Effectiveness', 'Palatability', 'Predictability', 'Formulation Quality'],
};

// Mock community reviews — structural language, no personal identifiers
export const MOCK_REVIEWS: Review[] = [
  // ── slings-anchors ──────────────────────────────────────────────────────
  {
    id: 'r-a-01',
    category: 'slings-anchors',
    handle: 'TacticalPilot_847',
    verifiedBuyer: true,
    date: '2026-05-12',
    ratings: [
      { axis: 'Load Tolerance', score: 5 },
      { axis: 'Hardware Integrity', score: 5 },
      { axis: 'Adjustability Range', score: 4 },
      { axis: 'Build Quality', score: 5 },
    ],
    body: 'Hardware arrived with zero flex at full load. Double-stitched seams held under sustained lateral pressure without any sign of delamination. Carabiner rating is not theoretical — you can feel the integrity in the hand. Adjustability range covers roughly 18" of vertical — adequate for most configurations. Ceiling hardware install was straightforward with the included anchor bolts.',
  },
  {
    id: 'r-a-02',
    category: 'slings-anchors',
    handle: 'GroundedFrame_291',
    verifiedBuyer: true,
    date: '2026-04-30',
    ratings: [
      { axis: 'Load Tolerance', score: 4 },
      { axis: 'Hardware Integrity', score: 5 },
      { axis: 'Adjustability Range', score: 5 },
      { axis: 'Build Quality', score: 4 },
    ],
    body: 'The stitching on the main body panel is heavy — noticeably heavier than comparable items I\'ve used. Pelvic alignment is correct with no compensatory tension required. Adjustability is the standout: three distinct anchor points let you dial in the height without tools. The leather vest has a break-in period of approximately 3–4 sessions before the grain softens to body contour.',
  },

  // ── technical-toys ──────────────────────────────────────────────────────
  {
    id: 'r-b-01',
    category: 'technical-toys',
    handle: 'SteelOperator_562',
    verifiedBuyer: true,
    date: '2026-05-20',
    ratings: [
      { axis: 'Material Purity', score: 5 },
      { axis: 'Surface Finish', score: 5 },
      { axis: 'Sizing Accuracy', score: 5 },
      { axis: 'Build Quality', score: 5 },
    ],
    body: 'The surgical steel is mirror-finished with no detectable micro-texture under both tactile and visual inspection. Thermal conductivity is excellent — retains temperature for approximately 12–15 minutes in warm water, slightly longer in ice. Sizing is accurate to stated diameter within less than 1mm. The weight distribution is centered — no end-heavy bias. Zero phthalates confirmed by third-party cert included in packaging.',
  },
  {
    id: 'r-b-02',
    category: 'technical-toys',
    handle: 'CalibratedLoad_114',
    verifiedBuyer: true,
    date: '2026-05-03',
    ratings: [
      { axis: 'Material Purity', score: 5 },
      { axis: 'Surface Finish', score: 4 },
      { axis: 'Sizing Accuracy', score: 4 },
      { axis: 'Build Quality', score: 5 },
    ],
    body: 'Silicone set: each piece passes the flame test (no drip, chars rather than melts). The glass-smooth finish is accurate from piece 1 through piece 5 — pieces 6 and 7 show a slightly more matte finish, still within body-safe spec but worth noting. Progressive sizing increments are well-calibrated — no disproportionate jumps between steps. The cuffs have correct tensile hold with no hardware slippage under sustained pull.',
  },

  // ── lubes ───────────────────────────────────────────────────────────────
  {
    id: 'r-c-01',
    category: 'lubes',
    handle: 'AnchoredVector_738',
    verifiedBuyer: true,
    date: '2026-05-25',
    ratings: [
      { axis: 'Viscosity Consistency', score: 5 },
      { axis: 'Session Longevity', score: 5 },
      { axis: 'Texture Profile', score: 5 },
      { axis: 'Tissue Tolerance', score: 5 },
    ],
    body: 'Mixed at 1 tbsp per 500ml, the X-Lube produces a consistently gel-like slurry with zero grit — far superior to commercially pre-mixed alternatives. Viscosity holds for the duration of extended sessions with no thinning or breaking down. No tissue irritation after 4+ hours of contact. The powder has no noticeable odor and dissolves without clumping when added to water first. A 250g pouch at this concentration gives approximately 25 full sessions.',
  },
  {
    id: 'r-c-02',
    category: 'lubes',
    handle: 'PrecisionBase_405',
    verifiedBuyer: true,
    date: '2026-04-18',
    ratings: [
      { axis: 'Viscosity Consistency', score: 4 },
      { axis: 'Session Longevity', score: 5 },
      { axis: 'Texture Profile', score: 4 },
      { axis: 'Tissue Tolerance', score: 5 },
    ],
    body: 'The silicone hybrid stays in place under sustained mechanical load — no migration or breakdown over a 3-hour session. Viscosity at room temperature is thick but pump-dispensable. Note: needs slight warming for optimal flow — 30 seconds of hand warmth is sufficient. Fully compatible with non-silicone toys confirmed through direct contact testing. No inflammatory response after repeated use.',
  },

  // ── metabolic ───────────────────────────────────────────────────────────
  {
    id: 'r-d-01',
    category: 'metabolic',
    handle: 'SomaticUnit_663',
    verifiedBuyer: true,
    date: '2026-05-18',
    ratings: [
      { axis: 'Effectiveness', score: 5 },
      { axis: 'Palatability', score: 4 },
      { axis: 'Predictability', score: 5 },
      { axis: 'Formulation Quality', score: 5 },
    ],
    body: 'BOTTOM capsules produce a consistent, predictable output window at 4 caps daily. After 7 days of consistent use the timing is reliable within a 2-hour window — a significant improvement over bulk powder protocols. No cramping, no grit, no measuring. The capsule shell dissolves cleanly. Palatability of the recovery gummies is functional — not designed to be candy, does the job. Electrolyte tab dissolves in 3 minutes, taste is clean.',
  },
  {
    id: 'r-d-02',
    category: 'metabolic',
    handle: 'DurableCore_289',
    verifiedBuyer: true,
    date: '2026-04-08',
    ratings: [
      { axis: 'Effectiveness', score: 4 },
      { axis: 'Palatability', score: 5 },
      { axis: 'Predictability', score: 4 },
      { axis: 'Formulation Quality', score: 5 },
    ],
    body: 'Post-play crash management is noticeably improved with the recovery pack — the glucose-electrolyte combination addressed the low-energy window that typically extends 2–4 hours after a high-intensity session. The gummies have a mild flavor, not overwhelming. Predictability of the fiber capsules improves significantly after week 2 — the first week showed some variation which is consistent with the adaptation period noted in the instructions.',
  },
];

// Pseudonym generator — adjective + noun + 3-digit number
const HANDLES_ADJ = [
  'Tactical', 'Sovereign', 'Grounded', 'Calibrated', 'Industrial',
  'Ballistic', 'Tensile', 'Anchored', 'Precise', 'Durable',
  'Structural', 'Loaded', 'Tempered', 'Forged', 'Latent',
];
const HANDLES_NOUN = [
  'Pilot', 'Anchor', 'Frame', 'Load', 'Gear',
  'Unit', 'Core', 'Base', 'Vector', 'Operator',
  'Circuit', 'Vault', 'Axis', 'Rig', 'Depot',
];

export function generateHandle(): string {
  const adj = HANDLES_ADJ[Math.floor(Math.random() * HANDLES_ADJ.length)];
  const noun = HANDLES_NOUN[Math.floor(Math.random() * HANDLES_NOUN.length)];
  const num = Math.floor(Math.random() * 900) + 100;
  return `${adj}${noun}_${num}`;
}

export function averageRating(ratings: ReviewRating[]): number {
  if (ratings.length === 0) return 0;
  return ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length;
}

export function formatReviewDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
