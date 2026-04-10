import type { Priority, WorkLocation, Pet, VetInfo, FinanceItem } from './types';

export const priorities: Priority[] = [
  {
    rank: 1,
    title: 'Therapy',
    status: 'Infrastructure',
    nextAction: 'Contact one therapist today',
    isUrgent: true,
  },
  {
    rank: 2,
    title: 'Psychiatry',
    status: 'No appointment',
    nextAction: 'Schedule this week',
    isUrgent: true,
  },
  {
    rank: 3,
    title: 'Unpacking',
    status: 'In progress',
    nextAction: '20-min room reset',
  },
  {
    rank: 4,
    title: 'Portfolio',
    status: 'Active build',
    nextAction: 'Open the folder',
  },
  {
    rank: 5,
    title: 'Field Guide',
    status: 'Active build',
    nextAction: 'Open the folder',
  },
  {
    rank: 6,
    title: 'Curriculum Tracker',
    status: 'Active build',
    nextAction: 'Open the folder',
  },
  {
    rank: 7,
    title: 'Move Decision',
    status: 'Not yet actionable',
    nextAction: 'Hold',
  },
  {
    rank: 8,
    title: 'Budget',
    status: 'Urgent',
    nextAction: 'Subscription audit this Sunday',
    isUrgent: true,
  },
  {
    rank: 9,
    title: 'Job Applications',
    status: 'Locked',
    nextAction: 'Unlocks when Portfolio done',
    isLocked: true,
  },
  {
    rank: 10,
    title: 'Creative Tech Skills',
    status: 'Locked',
    nextAction: 'Unlocks when Curriculum done',
    isLocked: true,
  },
  {
    rank: 11,
    title: 'Grounding',
    status: 'Ongoing',
    nextAction: 'Outside time Thursday',
    isOngoing: true,
  },
];

export const workLocations: WorkLocation[] = [
  {
    name: 'Living Room Coffeehouse',
    address: '5900 El Cajon Blvd',
    hours: 'Open until 11pm',
  },
  {
    name: 'Scrimshaw Coffee',
    address: '5542 El Cajon Blvd',
    hours: 'Closes 6pm',
  },
  {
    name: 'Holsem Coffee',
    address: '2911 University Ave, North Park',
  },
  {
    name: 'Communal Coffee',
    address: '2335 University Ave',
  },
  {
    name: 'Muri Coffee & Dessert',
    address: '2528 University Ave',
    rating: '4.8★',
  },
  {
    name: 'Good Omen Coffee Co',
    address: '4590 Park Blvd, University Heights',
    rating: '4.7★',
    hours: 'Open 6:30am',
  },
  {
    name: 'Provecho Coffee',
    address: '1955 Julian Ave, Barrio Logan',
    rating: '4.9★',
    note: 'Inside Bread & Salt',
  },
  {
    name: 'Lovesong Coffee + Market',
    address: '3022 N Park Way',
    note: 'Plants, outlets, best matcha',
  },
  {
    name: "Lestat's on Park",
    address: '4496 Park Blvd',
    hours: '24 hours',
  },
  {
    name: 'The Book Catapult',
    address: '3010 Juniper St, South Park',
    rating: '4.9★',
    note: 'Research/feedstock',
  },
];

export const pets: Pet[] = [
  {
    name: 'Maisie',
    medications: ['Prozac'],
    urgentItems: ['Vet services due', 'Needs pet insurance (add ASAP)'],
  },
  {
    name: 'Meeko',
    medications: ['Daily medications'],
    notes: ['Check with vet on schedule'],
  },
  {
    name: 'Jinshi',
    gender: 'male',
    notes: ['No current medications'],
  },
];

export const vetInfo: VetInfo = {
  name: 'Mission Valley Pet Clinic',
  phone: '(619) 281-2934',
  address: '4329 Twain Ave',
};

export const financeUrgentItems: FinanceItem[] = [
  {
    title: 'Petal Card Payment Failed',
    note: 'Resolve now',
    isUrgent: true,
    action: 'Log in and update payment method',
    criticality: 'safety-critical',
  },
  {
    title: 'Shop Pay — Tao of Clay',
    amount: '$112.50',
    note: 'Pay with different card NOW',
    isUrgent: true,
    action: 'Use alternative card immediately',
    criticality: 'safety-critical',
  },
  {
    title: 'Taxes',
    note: 'April 15 deadline — file by April 10',
    isUrgent: true,
    action: 'FILE TAXES',
    criticality: 'safety-critical',
    hardDate: '2026-04-15',
  },
  {
    title: 'Capital One Double Charge',
    note: '$10 from ANTHROPIC x2 on Venture X 6457 — verify and dispute if needed',
    isUrgent: true,
    action: 'Log in to Capital One and check Apr 1–2',
    criticality: 'high',
  },
];

export const systemVersionNote = 'Life Guide v1 — locked April 2026. Next review: May 1.';

export const verbatimCopy = {
  protectedTime: 'Protected time. No calls, no notifications, no obligations.',
  hardDay: 'On a hard day: just those two. Done.',
  eatSomething: "You don't have to cook. You just have to eat something.",
  outsideTime: "body + spirituality + feedstock in one block. Don't plan it to death. Just go outside.",
  nonNegotiable: 'Non-negotiable on whether, flexible on which.',
  wholeTask: 'That is the whole task. Nothing else is required.',
  writtenDown: 'Everything for today is written down.',
};

export const modularNote = 'Tasks are modular. Everything except cat meds, your meds, and financial deadlines can be rescheduled.';

// ─── §05 Body ─────────────────────────────────────────────────────────────────

export const bodySection = {
  morningSkincare: {
    steps: ['Cleanser', 'Moisturiser', 'SPF'],
    fallback: 'On a hard day: just those two. Done.',
    timing: 'Do before looking at phone if possible.',
  },
  nightSkincare: {
    steps: ['Cleanser', 'Moisturiser / night cream'],
    fullRoutine: 'On a good day: full routine.',
    fallback: 'Two steps minimum: 1. Cleanser | 2. Moisturiser / night cream. On a good day: full routine. On a hard day: even just washing your face and applying moisturiser counts.',
  },
  shower: {
    frequency: 'Every 2 days minimum',
    minimumViable: 'Minimum viable shower. Get in. Warm water. Body wash. Get out. That is the whole task. Nothing else is required. On a better day it can be more. Today it just needs to happen.',
  },
  movement: {
    framing: 'Protected outdoor block. Non-negotiable on whether, flexible on which. Choose one: hiking / paddleboarding / birdwatching / long walk. Merlin app for birdwatching. This is body + spirituality + feedstock in one block. Don\'t plan it to death. Just go outside.',
    options: ['Hiking', 'Paddleboarding', 'Birdwatching (Merlin app)', 'Long walk'],
  },
  sleep: {
    target: '7–8 hours',
    lightsOut: '11pm',
    note: 'Put the phone down. No TikTok or Instagram. You are aiming for 7–8 hours of sleep. Reading is fine. Screens are done.',
  },
  meals: {
    breakfast: 'No appetite is okay — grab something small from the shelf.',
    midday: 'Check in with yourself — have you eaten anything today? If no: go to the always-available shelf. Grab something. Anything. You do not need to cook. You do not need to make a good choice. You just need to eat something.',
    dinner: 'Have you eaten dinner? No cooking required. Options: Delivery from a saved favourite order | Something from the fridge that needs no prep | Trader Joe\'s frozen meal | Shelf snacks if that\'s all you can manage. You just need to eat something.',
    shelfItems: ['Yogurt', 'Fruit', 'Nut butter + crackers', 'Hard-boiled egg', 'Anything shelf-available'],
  },
  grounding: {
    technique: '5-4-3-2-1 Sensory Reset',
    steps: ['5 things you see', '4 things you hear', '3 things you touch', '2 things you smell', '1 thing you taste'],
    alternative: '5-minute sit/meditation (morning)',
  },
};

// ─── §06 Home ─────────────────────────────────────────────────────────────────

export const homeSection = {
  roomReset: {
    frequency: 'Daily',
    duration: '20 minutes maximum',
    instruction: 'One small cleaning or unpacking task. 20 minutes maximum. Timer on.',
    phases: [
      {
        label: 'Phase 1 — Surfaces + Floor',
        note: 'Do first, repeat until clear.',
        steps: [
          'One bag: trash and anything obviously disposable',
          'One bag: things that live somewhere else',
          'Stop when timer goes off. Not the task.',
        ],
      },
      {
        label: 'Phase 2 — Boxes',
        note: 'After surfaces are clear.',
        steps: [
          'Open one box',
          'Sort: keep, donate, trash, relocate',
          'Close the box if time runs out',
        ],
      },
      {
        label: 'Phase 3 — Specific Zones',
        note: 'Rotate through these.',
        steps: ['Bathroom', 'Kitchen', 'Desk/work area', 'Wardrobe corner'],
      },
    ],
  },
  laundry: {
    frequency: 'Weekly',
    minimumViable: 'Minimum viable action: gather → put in machine → start it. Priority: underwear + basics first, towels second, everything else third. You do not have to sort perfectly. You do not have to fold immediately. You just have to start a load.',
  },
};

// ─── §07 Health ───────────────────────────────────────────────────────────────

export const healthSection = {
  medications: {
    bedtimeMeds: {
      timing: '9:30pm nightly',
      note: 'Take bedtime medication.',
    },
    prnAnxiety: {
      storage: 'Keep somewhere physically accessible.',
      guidance: 'PRN anxiety meds: keep them somewhere physically accessible. Take when anxiety is interfering with function, not just present.',
    },
  },
  therapy: {
    frequency: 'Standing Sunday task',
    minimumViable: 'Minimum viable action: pick the first name on the list, send one email or make one call.',
    framing: 'Outreach-based, not emergency-based.',
  },
  psychiatry: {
    status: 'No appointment — flagged for review',
    action: 'Schedule at regular intervals.',
  },
  framingNote: 'No judgment on hard days. PRN meds described in terms of function, not as emergency or failure indicators. Therapy framed as outreach, not as emergency or sign of crisis.',
};

// ─── §08 System ───────────────────────────────────────────────────────────────

export const systemSection = {
  sundayReset: {
    label: 'Sunday Reset',
    steps: [
      { title: 'Taxes + Finances', note: 'Financial review — see budget section.' },
      { title: 'Scheduling', note: 'Review upcoming week. Set focus themes.' },
      { title: 'Moving Research', note: 'Ongoing relocation planning.' },
      { title: 'Therapy Outreach', note: 'Minimum viable action: one email or call.' },
      { title: 'Self-Care Block', note: '45–60 minutes — hair, nails, face mask, personal care deferred during the week.' },
      { title: 'Cat Full Groom', note: 'Nails, teeth, ears, full brush-out for all three cats.' },
      { title: 'Anchor for the Week', note: 'Identify one overarching theme or priority.' },
    ],
  },
  monthlyReview: {
    questions: [
      'Financial review complete?',
      'Cat supplies ordered?',
      'Psychiatry scheduled?',
      'Subscriptions to cancel?',
      'System update needed?',
    ],
  },
  fourWeekRule: {
    rule: 'Try the current version for 4 weeks before changing.',
    lockNote: 'No system changes until May 1st one-month review.',
    updateProtocol: [
      'Wait 4 weeks',
      'Open new Claude conversation',
      'Share current guide + prompt describing the change',
      'Workshop the change together',
      'Update calendar and guide',
      'Run new version for 4 weeks',
    ],
    warning: 'One change at a time.',
  },
};

// ─── §09 Routines ─────────────────────────────────────────────────────────────

export const routinesSection = {
  morning: {
    full: {
      label: 'Full Morning (Version B)',
      steps: [
        'Small notebook — morning pages, 20 min',
        '5-minute sit / meditation',
        'Reading before screens (even 10 min)',
        'Morning skincare (cleanser + SPF)',
        'Cat morning meds',
        'Eat something',
      ],
      descriptor: 'Protected time. No calls, no notifications, no obligations.',
      guard: 'No scrolling Instagram or TikTok in morning.',
    },
    hardDay: {
      label: 'Hard Day (Version A)',
      steps: ['Coffee', 'Journal', 'Read (before screens)', 'Plan the day', 'Ground yourself'],
      note: 'On a hard day: just those two. Done.',
    },
  },
  evening: {
    full: {
      label: 'Full Evening Routine',
      steps: [
        'Cat evening meds + dinner + litter (9pm)',
        'Your bedtime meds (9:30pm)',
        'Night skincare (cleanser + moisturiser)',
        'Write tomorrow\'s anchor task in main notebook',
        'Reading before sleep',
        'No scrolling TikTok or Instagram after this point',
        'Lights out by 11pm',
      ],
    },
    creative: {
      label: 'Creative Life Dashboard (Alternative)',
      steps: [
        'Brain offload: one thing progressed, one step for tomorrow, anything looping',
        'Grounding exercise: 5-4-3-2-1 sensory reset',
        'Gentle creative input: reading, film scene, reflection',
        'Closing thought: everything for today is written down',
      ],
    },
  },
};

// ─── Emergency grounding + changelog (from main) ──────────────────────────────

export const groundingPhrases: string[] = [
  'Right now, you are safe.',
  'This is temporary.',
  'One thing at a time. One step at a time.',
  'You have what you need to get through this moment.',
  verbatimCopy.nonNegotiable,
  verbatimCopy.writtenDown,
];

export const groundingBreathing = {
  label: 'Box breathing',
  steps: ['Breathe in — 4 counts', 'Hold — 4 counts', 'Breathe out — 4 counts', 'Hold — 4 counts'],
  note: 'Repeat 3–4 times. You do not have to do all four. Even one cycle counts.',
};

export interface ChangeLogEntry {
  date: string;
  version: string;
  summary: string;
}

export const changeLog: ChangeLogEntry[] = [
  {
    date: '2026-04-07',
    version: 'v1.1',
    summary: 'Added §05–10 guide sections (Body, Home, Health, System, Routines, Rhythm). Added Hard Day Mode, Now/Next/Later strip, Emergency Grounding Card, safety-critical visual layer, collapsible AI panel, Quick Capture widget, calendar event form, change log, If/Then rescue prompts, desktop sidebar nav, data export/import for all stores.',
  },
  {
    date: '2026-04-01',
    version: 'v1.0',
    summary: 'Initial build: Today view, §01–04 (Priorities, Finance, Care, Field), weekly/daily/monthly rhythm views, budget planner, folder system, flashcard deck, reflection journaling, AI assistant (multi-provider).',
  },
];
