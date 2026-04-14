/**
 * mia.ts — the only file in this repo that should be authored by Mia, not Claude.
 *
 * Everything else can be rebuilt. This file is the one that grounds the app in
 * her real life: her real specimens, her real hard-day minimum, her real words.
 *
 * Phase 0 status: TYPED STUB. Claude left the shape empty — you fill it in.
 *
 * How to use this file:
 *   1. Read through the types below so you know what fields exist.
 *   2. Fill in `hardDayMinimum` first (easiest, 3–5 items).
 *   3. Fill in `specimens` — one entry per real project / practice / relationship /
 *      life task that's actively in your life right now. Don't pad. Four or fewer
 *      is healthier than twelve (see the slot system in lib/guardrails.ts).
 *   4. Commit this file yourself with your name in the author field.
 *
 * Nothing in this file is required to build the app. Empty arrays are valid.
 * The app will show empty-state prompts until you fill things in.
 */

// ─── Types (inlined for now; will move to content/types.ts in Phase 2) ──────

/** The 17 archetypes from the Field Guide. Full catalog ships in Phase 2. */
export type Archetype =
  | 'fern'
  | 'moss'
  | 'succulent'
  | 'tree'
  | 'wildflower'
  | 'mushroom'
  | 'shell'
  | 'rock'
  | 'lichen'
  | 'cactus'
  | 'coral'
  | 'sedge'
  | 'vine'
  | 'crystal'
  | 'spore'
  | 'driftwood';

/** Where on the 5100px terrain this specimen lives. */
export type Terrain =
  | 'forest-edge'
  | 'upper-field'
  | 'lower-field'
  | 'underground';

/** Growth stages. */
export type GrowthStage =
  | 'seed'
  | 'sprout'
  | 'growing'
  | 'flourishing'
  | 'blooming'
  | 'dormant';

export interface Specimen {
  /** Short kebab-case id. Used in URLs like /garden/portfolio. */
  id: string;
  /** Your name for this thing. "Portfolio", "Sculpt practice", "Move decision". */
  name: string;
  /** One archetype from the list above. Picks the rules + aesthetic. */
  archetype: Archetype;
  /** Where it lives on the terrain. */
  terrain: Terrain;
  /** Current growth stage. New things start as 'seed'. */
  stage: GrowthStage;
  /** True if this is a life task (unpacking, moving, curriculum). False for creative. */
  lifeTask: boolean;
  /** Optional: one-sentence description. What is this, in your words? */
  description?: string;
  /** Optional: date you planted it. ISO 8601. */
  plantedAt?: string;
}

export interface HardDayMinimumItem {
  /** Short imperative. "Cat meds 9a/9p". "Eat something". */
  label: string;
  /** Optional: link to a calendar event id for the dim/undim logic. */
  linkedEventId?: string;
}

// ─── Mia's content goes below ───────────────────────────────────────────────

/**
 * The absolute minimum that needs to happen on a hard day. Everything else
 * dims when hard-day mode is on. Keep this short — 3 to 5 items. If you're
 * listing more than 5, it's not a hard-day minimum anymore.
 */
export const hardDayMinimum: HardDayMinimumItem[] = [
  // Example (delete and replace):
  // { label: 'Cat morning meds (9am)', linkedEventId: 'cat-morning-meds' },
  // { label: 'Cat evening meds (9pm)', linkedEventId: 'cat-evening-meds' },
  // { label: 'Eat something', linkedEventId: undefined },
];

/**
 * Your real specimens. Hard cap: 3 active creative + 1 active life task = 4 total.
 * See lib/guardrails.ts (coming in Phase 1) for enforcement.
 *
 * Dormant specimens don't count against the cap — you can have as many as you
 * want. Dormancy is frictionless. Mark things dormant any time — that's care,
 * not failure.
 */
export const specimens: Specimen[] = [
  // Example (delete and replace):
  // {
  //   id: 'portfolio',
  //   name: 'Portfolio',
  //   archetype: 'fern',
  //   terrain: 'forest-edge',
  //   stage: 'growing',
  //   lifeTask: false,
  //   description: 'The thing that unlocks job applications.',
  // },
];

/**
 * Optional: your own grounding phrases, in your own words. These show up in
 * various places across the app. Don't fill these in unless you have
 * something you actually want to say to yourself. Blank is fine.
 */
export const groundingPhrases: string[] = [];
