/**
 * mia.ts — the grounding file. Authored with Mia, April 14, 2026.
 *
 * Everything else in this repo is scaffolding. This file is the one that
 * grounds the app in her real life: her real specimens, her real hard-day
 * minimum, her real words. Nothing in here was invented by Claude — every
 * project, every description, every bucket came from Mia's own brain dump.
 *
 * Phase 0 audit: April 14, 2026.
 */

// ─── Types (inlined; stay here through Phase 2 Step 1 per HANDOFF) ──────────

/** The 17 archetypes from the Field Guide. */
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
  | 'driftwood'
  | 'bramble';

/** Where on the 5100px terrain this specimen lives. */
export type Terrain =
  | 'forest-edge'
  | 'upper-field'
  | 'lower-field'
  | 'underground';

/**
 * Growth stages.
 *
 *   seed        → waiting. Can have history — prototypes, research,
 *                 even full builds — but not actively tended right now.
 *                 Unlimited. No slot pressure. Can be activated at a
 *                 Sunday weekly review if a slot is open.
 *   sprout      → activated. Counts against active slot cap.
 *   growing     → tended regularly. Active.
 *   flourishing → meaningful progress. Active.
 *   blooming    → at its peak. Active.
 *   dormant     → paused mid-cycle with an active cadence behind it.
 *                 Use this for things that had a real rhythm and
 *                 need to keep their rhythm visible. Rare.
 *   harvested   → a cycle completed. Shipped / delivered. Can re-awaken
 *                 for the next cycle (e.g. portfolio audits every 3–6mo).
 */
export type GrowthStage =
  | 'seed'
  | 'sprout'
  | 'growing'
  | 'flourishing'
  | 'blooming'
  | 'dormant'
  | 'harvested';

export interface Specimen {
  /** Short kebab-case id. Used in URLs like /garden/gesture-voice-art. */
  id: string;
  /** Mia's name for this thing. */
  name: string;
  /** One archetype. Picks the rules + aesthetic. */
  archetype: Archetype;
  /** Where it lives on the terrain. */
  terrain: Terrain;
  /** Current growth stage. */
  stage: GrowthStage;
  /** True if this is a life task (job search, moving, unpacking, curriculum). */
  lifeTask: boolean;
  /** One-sentence description. */
  description?: string;
  /** Longer freeform notes — stack, next moves, history, references. */
  notes?: string;
  /** ISO date this was planted / started (optional). */
  plantedAt?: string;
}

export interface HardDayMinimumItem {
  label: string;
  /** Optional link to a calendar event id for dim/undim logic. */
  linkedEventId?: string;
}

// ─── Hard-day minimum ───────────────────────────────────────────────────────
//
// On a genuinely hard day — dissociating, barely functional, stuck on the
// couch — these still happen. Everything else dims. No shame attached to
// only hitting these four.

export const hardDayMinimum: HardDayMinimumItem[] = [
  {
    label: 'Cat morning meds + feed + play',
    linkedEventId: 'cat-morning-meds',
  },
  {
    label: 'Cat evening meds + feed + litter + play',
    linkedEventId: 'cat-evening-meds',
  },
  {
    label: 'Eat something',
  },
  {
    label: 'Read one chapter — anti-doomscroll anchor',
  },
];

// ─── Active creative specimens (max 3) ──────────────────────────────────────
//
// Slot usage: 2 / 3. Slot 3 is intentionally open. The job search is going to
// eat the life-task slot and bleed into creative attention for the next 5
// weeks — adding a third active creative is setting up failure. Slot 3 stays
// empty until something genuinely wants to activate at a Sunday weekly review.

// ─── Active life-task specimens (max 1) ─────────────────────────────────────
//
// Slot usage: 1 / 1. Job search. Highest urgency thing in the entire system.

// ─── Dormant specimens (rare — for things with an active rhythm behind them) ──

// ─── Harvested specimens (visible, part of garden history) ──────────────────
//
// Shipped. Done a cycle. Still visible in the garden — harvest is a moment
// to mark, not a reason to hide a thing. Can re-awaken for the next cycle
// (e.g. portfolio audits).

// ─── Seeds (unlimited, no slot pressure) ────────────────────────────────────
//
// Projects that are waiting. Can have real history — prototypes, research
// corpus, full builds — but are not being actively tended right now. Live
// in the garden as visible reminders that they exist. Can be activated at
// a Sunday weekly review if a slot is open.

export const specimens: Specimen[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // ACTIVE — CREATIVE (2 / 3 slots used, 1 open)
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'gesture-voice-art',
    name: 'Gesture + Voice Generative Art Tool',
    archetype: 'crystal',
    terrain: 'underground',
    stage: 'growing',
    lifeTask: false,
    description:
      'Browser-based generative art tool using body and voice as input. Web-art installation and portfolio piece.',
    notes: `Stack: MediaPipe Hands + Web Speech API + Gemini 2.0 Flash Live API → p5.js canvas.
Build environment: Replit.
Five-phase action plan exists.
Known stall risk after Phase 2.
Next move: Phase 1 — basic webcam hand tracking prototype in Replit.`,
  },

  {
    id: 'life-guide-app',
    name: 'life-guide-app',
    archetype: 'tree',
    terrain: 'upper-field',
    stage: 'growing',
    lifeTask: false,
    description:
      'The hub for everything. Mobile-first PWA, her whole system. GitHub: miasjones888/life-guide-app.',
    notes: `This is the tree. Everything else absorbs into it as branches / modules.

Currently merging in:
  • Field Guide — the full ChatGPT-built version (field-guide-mobile.html, ~3,800 lines) as a module, not a stripped version. 4 ecological zones, 16 specimen types, ecological contracts, live geo influence, seasonal moss coloring, global field notebook, per-project scratch pads, offline prompts, field report surfacing, tempo filter bar, max-5-perennials rule, Win95 popup chrome, Hono + Turso/LibSQL + Vercel backend, version snapshots v20–v29.

Already absorbed (decisions made):
  • Research Module — the old Research & Design Web Tool is the spec; do not finish it standalone.
  • Digital Garden — net-art aesthetic and project tracking logic.
  • Animal Crossing Life Rhythm — seasonal pacing logic.

In-flight: PR #19 "Add guide sections, event management, and desktop navigation" — ChatGPT Codex reviewing.

Current branch: claude/merge-guide-systems-UxLng (this one).`,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ACTIVE — LIFE TASK (1 / 1 slot used)
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'job-search',
    name: 'Job Search',
    archetype: 'vine',
    terrain: 'upper-field',
    stage: 'sprout',
    lifeTask: true,
    description:
      'Contract ends ~May 22. Five weeks. Zero applications out. Most time-sensitive thread in the entire system.',
    notes: `Three tracks, all need to move before May 22:

1. RESUME — not updated. Update in Canva to capture:
   • Vibe coding / AI-assisted development (Replit, Cursor, Claude, ChatGPT)
   • Generative AI as directorial tool (framed precisely, not generically)
   • Projects as portfolio artifacts
   • Google contract creative technology work

2. NETWORKING — not started. Direct pitching to places.

3. APPLICATIONS — none out. Active applications running in parallel.

Through-line the resume needs to hold:
  creative direction with technical execution fluency
  — not "AI enthusiast"
  — not just "copywriter"
  — the intersection of both.`,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // HARVESTED — visible in garden as history, can re-awaken
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'portfolio',
    name: 'Portfolio',
    archetype: 'fern',
    terrain: 'upper-field',
    stage: 'harvested',
    lifeTask: false,
    description: 'Shipped April 2026. Live.',
    notes: `Not done-done — will need to re-activate every 3–6 months for audit + update cycles. Stays visible in the garden so the update rhythm doesn't get forgotten. Next audit cycle due ~July–October 2026.`,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // DORMANT — rare; only for things with an active rhythm behind them
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'writing-projects',
    name: 'Not All Ghosts Are Memorable',
    archetype: 'wildflower',
    terrain: 'upper-field',
    stage: 'dormant',
    lifeTask: false,
    description:
      'Zero-draft collection. Multiple fragments across prose poem, flash fiction, lyric essay. Not yet organized into a completable unit.',
    notes: `Definition of "done" for any piece:
  • It ends
  • It has a last sentence
  • It has been read once and had one pass
  • It exists as a file.`,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SEEDS — waiting. Real history allowed. No slot pressure.
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'dream-app',
    name: 'Dream App / Dream Visualizer',
    archetype: 'mushroom',
    terrain: 'underground',
    stage: 'seed',
    lifeTask: false,
    description:
      'Ambient durational browser installation. User speaks a dream on waking, receives an email 6 hours later, returns to find a developed visual/audio piece. The delay is structural — forgetting is built into the work.',
    notes: `6 HTML prototypes exist.

Substantial research corpus in Google Drive:
  • Non-Western dream traditions
  • Visual aesthetic analysis
  • Generative prompt templates
  • Ethical design commitments: Max Dashú, Aboriginal Dreamtime, Lacandon Maya, Viveiros de Castro, Kimmerer, Haraway

Visual reference: Emma Beatrez's "Clutch" — deep cobalt, dissolving white forms, light that bleeds. ASCII layer sharp, image behind soft.

Full-build stack (when it moves to Cursor):
  Replicate + Anthropic API + p5.js + Vercel + Resend + Supabase.

v1 definition of done: user speaks a dream, six hours later an email arrives, they return to find one developed visual/audio piece at a URL.`,
  },

  {
    id: 'cat-archive',
    name: 'Cat Archive',
    archetype: 'shell',
    terrain: 'lower-field',
    stage: 'seed',
    lifeTask: false,
    description:
      'Research OS for collecting cat objects across history and culture. Single HTML file, Supabase integrated, ready to deploy.',
    notes: `Built:
  • PLAN / COLLECTION / SOURCES / THESIS / NOTES modes
  • Supabase integrated
  • PRD and setup guide written
  • Ready to deploy to Vercel

Taxonomy: Deity / Votive / Companion / Uncanny Other / Subject / Contemporary Icon.
12 objects total, 2 per type, ~1/month collection pace.

Aesthetic: forest green + monospace + light mode + OS chrome.

Next step when slot opens: deploy to Vercel, begin image collection phase.`,
  },

  {
    id: 'chthonic-curriculum',
    name: 'Chthonic Archive Curriculum',
    archetype: 'lichen',
    terrain: 'underground',
    stage: 'seed',
    lifeTask: false,
    description:
      'Year-long curriculum structured across Layers 0–V plus Physical Build Unit. Tracker app (chthonic-v2.html) built. Research report phase delivered. Curriculum construction phase is the blocker.',
    notes: `Constraints:
  • 1–3 hours/week
  • All output in-world as Archive communications
  • No AI music generation
  • Attribution required
  • Single complete file output per session

Paired state with Wildlife / Ecology Curriculum — both structured enough to see the shape, not finished enough to start. Same blocker: needs to be finalized before it can begin.`,
  },

  {
    id: 'wildlife-curriculum',
    name: 'Wildlife / Ecology Curriculum',
    archetype: 'sedge',
    terrain: 'forest-edge',
    stage: 'seed',
    lifeTask: false,
    description:
      'Structured curriculum for wildlife and field ecology. Lives in ChatGPT — needs to be surfaced and documented before it can be finalized.',
    notes: `Comparable architecture to the Chthonic Archive curriculum — layered, structured.

Exact scope TBD — needs to be pulled from ChatGPT.

Paired dormancy with Chthonic Archive: both need to be finalized before either can begin.`,
  },

  {
    id: 'thesis-app',
    name: 'Thesis Development App',
    archetype: 'coral',
    terrain: 'underground',
    stage: 'seed',
    lifeTask: false,
    description:
      'Research support tool for interdisciplinary thesis (neuroscience, cosmology, linguistics, trauma theory, Indigenous knowledge systems). Designed, not built.',
    notes: `Aesthetic: post-internet corrupted archive, cool ash grey + clinical red, monospace.

Features:
  • Brain dump
  • Theory mapping
  • Thesis assembly
  • Multi-format output adaptation

⚠️ ABSORPTION RISK — overlaps in intent with the Research Module going into
life-guide-app. May end up fully absorbed rather than shipped standalone.
Paired with research-web-tool — both need an explicit decision at activation:
stay standalone, or fold into life-guide-app's Research Module.`,
  },

  {
    id: 'research-web-tool',
    name: 'Research & Design Web Tool',
    archetype: 'crystal',
    terrain: 'underground',
    stage: 'seed',
    lifeTask: false,
    description:
      'Original standalone research tool. Existing build is currently serving as the spec for the Research Module inside life-guide-app.',
    notes: `⚠️ ABSORPTION RISK — decision already leaning "do not finish as standalone,
use as spec for the Research Module inside life-guide-app." Kept visible as
a seed so the decision can be re-examined at a weekly review rather than
quietly forgotten. Paired with thesis-app.`,
  },

  {
    id: 'interspecies-communication',
    name: 'Interspecies Communication',
    archetype: 'spore',
    terrain: 'forest-edge',
    stage: 'seed',
    lifeTask: false,
    plantedAt: '2026-04-10',
    description:
      'New ChatGPT project, April 10 2026. No content documented yet. Might become its own specimen, might be feedstock for other work.',
    notes: `Likely feedstock for:
  • Cat Archive
  • Dream App research (Viveiros de Castro's Amerindian perspectivism)
  • Kimmerer's grammar of animacy
  • Thesis
  • TheyCanTalk citizen science

Parking lot or feedstock — not yet decided.`,
  },
];

