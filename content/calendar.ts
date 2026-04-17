import type { CalendarEvent } from './types';

// Phase 0 audit v2 (2026-04-14) — updated after Mia's second pass.
//
// KEPT as real (Mia's own rhythm):
//   Daily:
//     • Cat morning + evening meds (9a/9p, safety-critical, double-alarm, hard-day minimum)
//     • AM + PM cat playtime, cat midday snack
//   Weekly:
//     • Cat brushing MWF 7pm, cat full groom Sunday 10am
//     • Deep Focus: Project Session Wednesday 10–11:30am
//     • Outside Time Thursday 2–5pm
//     • Applied Buddhism & Meditation Saturday 9–11am (optional, Fo Guang Shan Hsi Fang Temple)
//     • Deep Focus: Creative Session Saturday 10–11:30am
//     • Laundry Saturday 2–3pm
//     • Sunday ritual block: self-care 11am, plant watering, call Mom 4pm,
//       sister check-in 5pm, Instacart 6:30pm, notes → notecards 6:45pm,
//       weekly setup 7pm
//   Biweekly:
//     • Creative Adventure (startDate 2026-04-18)
//   Monthly:
//     • Cat supply check, reorder cat meds, rotate cat toys, replace scratchers, vet food check
//     • Pay credit card (day 2), pay Mom (day 15), pay partner rent (last day)
//   One-time:
//     • All confirmed April events (taxes, family meeting, therapists, psychiatry,
//       Maisie insurance, birthday, safari park, Glen Ivy, USPS, SDG&E, Gap,
//       contract check-in, animal comm session, Dar/Mother's day planning)
//     • Apr 18 Temecula Mix + Mingle Pool Party
//     • May 16 Dar's birthday
//     • ~May 22 Google contract end ⚠️
//     • Tao of Clay sculpture class, 6 sessions Tuesdays May 19–June 23, 6–8pm
//
// STRUCK as invented (Mia confirmed cliche/aspirational/Claude-authored):
//   • Morning routine, morning skincare, breakfast, eaten-today, dinner,
//     evening routine, bedtime meds, night skincare, lights out
//   • Every-two-days shower check-in
//   • Annie biweekly check-in, Trader Joe's biweekly check
//   • Room reset Tue/Sat
//   • Monthly reset + budget hour (separate from the real payments)
//   • monthlyBudgetSteps
//
// TAXES EMPHASIZED: apr10-taxes and apr15-tax-day are both safety-critical,
// non-negotiable, double-alarm. They should sort to the top of any
// criticality-aware list.
//
// Exports for invented content kept as empty arrays / stubs. The pages that
// referenced them are gone (collapsed under app/[legacy]/page.tsx in Step 5c);
// the empty exports are retained because removing them is a separate audit.

// ─── Daily ──────────────────────────────────────────────────────────────────

export const dailyEvents: CalendarEvent[] = [
  {
    id: 'cat-morning-meds',
    time: '9:00am',
    title: 'Cat Morning Meds',
    emoji: '🐱',
    category: 'tomato',
    isNonNegotiable: true,
    doubleAlarm: true,
    recurrence: 'daily',
    criticality: 'safety-critical',
    hardDayMinimum: true,
    timeSensitivity: 'fixed',
  },
  {
    id: 'am-cat-playtime',
    time: '9:30am',
    title: 'AM Cat Playtime',
    emoji: '🐱',
    category: 'tomato',
    recurrence: 'daily',
  },
  {
    id: 'cat-midday-snack',
    time: '12:30pm',
    title: 'Cat Midday Snack + Play',
    emoji: '🐱',
    category: 'tomato',
    recurrence: 'daily',
  },
  {
    id: 'pm-cat-playtime',
    time: '7:30pm',
    title: 'PM Cat Playtime',
    emoji: '🐱',
    category: 'tomato',
    recurrence: 'daily',
  },
  {
    id: 'cat-evening-meds',
    time: '9:00pm',
    title: 'Cat Evening Meds + Dinner + Litter',
    emoji: '🐱',
    category: 'tomato',
    isNonNegotiable: true,
    doubleAlarm: true,
    recurrence: 'daily',
    criticality: 'safety-critical',
    hardDayMinimum: true,
    timeSensitivity: 'fixed',
  },
];

// Stub — empty since the Phase 0 audit. Spread into allEvents below; left in
// place to keep the aggregator stable until a real biweekly cadence shows up.
export const everyTwoDaysEvents: CalendarEvent[] = [];

// ─── Weekly ─────────────────────────────────────────────────────────────────

export const weeklyEvents: CalendarEvent[] = [
  // ── Cat care rhythm ──
  {
    id: 'cat-brushing-mwf',
    time: '7:00pm',
    title: 'Cat Brushing',
    emoji: '🐱',
    category: 'tomato',
    recurrence: 'weekly',
    days: ['monday', 'wednesday', 'friday'],
  },
  {
    id: 'cat-full-groom',
    time: '10:00am',
    title: 'Cat Full Groom',
    emoji: '🐱',
    category: 'tomato',
    recurrence: 'weekly',
    days: ['sunday'],
  },

  // ── Creative + focus rhythm ──
  {
    id: 'deep-focus-wednesday',
    time: '10:00am',
    title: 'Deep Focus: Project Session',
    emoji: '🔵',
    category: 'blueberry',
    recurrence: 'weekly',
    days: ['wednesday'],
    note: 'Protected. 10–11:30am. No calls, no notifications.',
  },
  {
    id: 'outside-time-thursday',
    time: '2:00pm',
    title: 'Outside Time',
    emoji: '🌿',
    category: 'basil',
    recurrence: 'weekly',
    days: ['thursday'],
    note: '2–5pm. Body + spirituality + feedstock in one block. Just go outside.',
  },
  {
    id: 'applied-buddhism',
    time: '9:00am',
    title: 'Applied Buddhism & Meditation',
    emoji: '🛕',
    category: 'peacock',
    recurrence: 'weekly',
    days: ['saturday'],
    isOptional: true,
    note: '9–11am, Fo Guang Shan Hsi Fang Temple.',
  },
  {
    id: 'deep-focus-saturday',
    time: '10:00am',
    title: 'Deep Focus: Creative Session',
    emoji: '🔵',
    category: 'blueberry',
    recurrence: 'weekly',
    days: ['saturday'],
    note: 'Protected. 10–11:30am. No calls, no notifications.',
  },
  {
    id: 'laundry-saturday',
    time: '2:00pm',
    title: 'Laundry',
    emoji: '🧺',
    category: 'graphite',
    recurrence: 'weekly',
    days: ['saturday'],
    note: '2–3pm.',
  },

  // ── Sunday ritual block ──
  {
    id: 'sunday-self-care',
    time: '11:00am',
    title: 'Sunday Self-Care Block',
    emoji: '🌸',
    category: 'flamingo',
    recurrence: 'weekly',
    days: ['sunday'],
    note: '11am–noon.',
  },
  {
    id: 'plant-watering',
    time: '12:00pm',
    title: 'Plant Watering',
    emoji: '🪴',
    category: 'basil',
    recurrence: 'weekly',
    days: ['sunday'],
  },
  {
    id: 'call-mom',
    time: '4:00pm',
    title: 'Call Mom',
    emoji: '📞',
    category: 'flamingo',
    recurrence: 'weekly',
    days: ['sunday'],
    note: '4–4:30pm.',
  },
  {
    id: 'checkin-sister',
    time: '5:00pm',
    title: 'Check in with Sister',
    emoji: '📱',
    category: 'flamingo',
    recurrence: 'weekly',
    days: ['sunday'],
    note: '5–5:30pm.',
  },
  {
    id: 'instacart',
    time: '6:30pm',
    title: 'Instacart Order',
    emoji: '🛒',
    category: 'banana',
    recurrence: 'weekly',
    days: ['sunday'],
  },
  {
    id: 'transfer-notes',
    time: '6:45pm',
    title: 'Transfer Notes → Notecards',
    emoji: '📇',
    category: 'graphite',
    recurrence: 'weekly',
    days: ['sunday'],
  },
  {
    id: 'weekly-setup',
    time: '7:00pm',
    title: 'Weekly Setup',
    emoji: '🟣',
    category: 'grape',
    recurrence: 'weekly',
    days: ['sunday'],
    note: '7–7:20pm.',
  },
];

// ─── Biweekly ───────────────────────────────────────────────────────────────

export const biweeklyEvents: CalendarEvent[] = [
  {
    id: 'creative-adventure',
    title: 'Creative Adventure',
    category: 'grape',
    recurrence: 'biweekly',
    startDate: '2026-04-18',
    note: 'Go somewhere. Do something. No deliverable.',
  },
];

// ─── Monthly ────────────────────────────────────────────────────────────────

export const monthlyEvents: CalendarEvent[] = [
  // ── Real recurring payments ──
  {
    id: 'pay-credit-card',
    title: 'Pay Credit Card Bill',
    emoji: '💳',
    category: 'banana',
    recurrence: 'monthly',
    monthlyRule: { type: 'day-of-month', day: 2 },
    criticality: 'high',
  },
  {
    id: 'pay-mom-monthly',
    title: 'Pay Mom',
    emoji: '💛',
    category: 'banana',
    recurrence: 'monthly',
    monthlyRule: { type: 'day-of-month', day: 15 },
    criticality: 'high',
  },
  {
    id: 'pay-partner-rent',
    title: 'Pay Partner Rent',
    emoji: '🏠',
    category: 'banana',
    recurrence: 'monthly',
    monthlyRule: { type: 'last-day' },
    criticality: 'high',
  },

  // ── Cat care cadence ──
  {
    id: 'cat-supply-check',
    time: '1:00pm',
    title: 'Cat Supply Check',
    emoji: '🐱',
    category: 'tomato',
    recurrence: 'monthly',
    monthlyRule: { type: 'nth-weekday', weekday: 'sunday', nth: 1 },
  },
  {
    id: 'reorder-cat-meds',
    title: 'Reorder Cat Medication',
    emoji: '🐱',
    category: 'tomato',
    recurrence: 'monthly',
  },
  {
    id: 'vet-food-check',
    title: 'Vet Food Check',
    emoji: '🐱',
    category: 'tomato',
    recurrence: 'interval',
    intervalDays: 11,
  },
  {
    id: 'rotate-cat-toys',
    title: 'Rotate Cat Toys',
    emoji: '🐱',
    category: 'tomato',
    recurrence: 'monthly',
    monthlyRule: { type: 'nth-weekday', weekday: 'friday', nth: 1 },
  },
  {
    id: 'replace-scratchers',
    title: 'Check + Replace Scratchers',
    emoji: '🐱',
    category: 'tomato',
    recurrence: 'interval',
    intervalDays: 60,
  },
];

// ─── One-time events (April → June 2026) ────────────────────────────────────
// NB: named `aprilOneTimeEvents` for backward-compat with existing importers.
// Actually contains April, May, and June one-time events.

export const aprilOneTimeEvents: CalendarEvent[] = [
  // ═══ April ═══
  {
    id: 'apr1-family-meeting',
    date: '2026-04-01',
    time: '6:00pm',
    title: 'Family Meeting 6–7pm',
    category: 'flamingo',
    recurrence: 'one-time',
    isUrgent: true,
  },
  {
    id: 'apr1-contact-therapists',
    date: '2026-04-01',
    title: 'Contact Therapists',
    category: 'flamingo',
    recurrence: 'one-time',
    isUrgent: true,
    note: 'URGENT — do today',
  },
  {
    id: 'apr2-capital-one',
    date: '2026-04-02',
    title: 'Capital One double charge check',
    category: 'banana',
    recurrence: 'one-time',
    isUrgent: true,
  },
  {
    id: 'apr2-schedule-psychiatry',
    date: '2026-04-02',
    title: 'Schedule Psychiatry',
    category: 'flamingo',
    recurrence: 'one-time',
    isUrgent: true,
  },
  {
    id: 'apr2-maisie-insurance',
    date: '2026-04-02',
    title: 'Add Maisie to pet insurance',
    category: 'tomato',
    recurrence: 'one-time',
    isUrgent: true,
  },
  {
    id: 'apr2-reply-mom',
    date: '2026-04-02',
    title: 'REPLY to mom Chicago flights (EOD)',
    category: 'flamingo',
    recurrence: 'one-time',
    isUrgent: true,
  },
  {
    id: 'apr3-birthday-email',
    date: '2026-04-03',
    title: "Send Birthday Email to Mom",
    category: 'flamingo',
    recurrence: 'one-time',
  },
  {
    id: 'apr4-hair-detangle',
    date: '2026-04-04',
    time: '11:00am',
    title: 'Hair Detangle Session 11am–1pm',
    category: 'flamingo',
    recurrence: 'one-time',
  },
  {
    id: 'apr5-financial-review',
    date: '2026-04-05',
    title: 'Financial Review',
    category: 'banana',
    recurrence: 'one-time',
  },
  {
    id: 'apr5-gap-gift-cards',
    date: '2026-04-05',
    title: 'Gap Gift Cards',
    category: 'banana',
    recurrence: 'one-time',
  },
  {
    id: 'apr8-usps',
    date: '2026-04-08',
    title: 'USPS Identity Verification Deadline',
    category: 'tangerine',
    recurrence: 'one-time',
    isUrgent: true,
    criticality: 'high',
  },

  // ⚠️ TAXES — highest-criticality April items
  {
    id: 'apr10-taxes',
    date: '2026-04-10',
    title: 'FILE TAXES (deadline Apr 15)',
    emoji: '⚠️',
    category: 'tangerine',
    recurrence: 'one-time',
    isUrgent: true,
    isNonNegotiable: true,
    doubleAlarm: true,
    criticality: 'safety-critical',
    note: 'Federal + state returns or extension request. Do not let this slip.',
  },
  {
    id: 'apr13-sdge',
    date: '2026-04-13',
    title: 'SDG&E Bill $127.09',
    category: 'banana',
    recurrence: 'one-time',
    isUrgent: true,
  },
  {
    id: 'apr15-tax-day',
    date: '2026-04-15',
    title: 'TAX DAY',
    emoji: '⚠️',
    category: 'tangerine',
    recurrence: 'one-time',
    isUrgent: true,
    isNonNegotiable: true,
    doubleAlarm: true,
    criticality: 'safety-critical',
    note: 'HARD DEADLINE. Federal + state.',
  },
  {
    id: 'apr15-pay-mom',
    date: '2026-04-15',
    title: 'Pay Mom',
    category: 'banana',
    recurrence: 'one-time',
  },
  {
    id: 'apr18-temecula-pool',
    date: '2026-04-18',
    title: 'Temecula Mix + Mingle Pool Party',
    category: 'flamingo',
    recurrence: 'one-time',
    note: 'Temecula Wine Country. Check Meetup for confirmed time/address. Bring potluck item.',
  },
  {
    id: 'apr19-glen-ivy',
    date: '2026-04-19',
    title: 'Glen Ivy with Mom (book now)',
    category: 'flamingo',
    recurrence: 'one-time',
    isUrgent: true,
  },
  {
    id: 'apr24-contract-checkin',
    date: '2026-04-24',
    title: '⚠️ 4 Weeks to Contract End check-in',
    category: 'blueberry',
    recurrence: 'one-time',
    isUrgent: true,
    criticality: 'high',
    note: 'Four areas: job applications, move decision (SD/Seattle/elsewhere), budget audit, portfolio status. One-paragraph honest assessment + one next move per area.',
  },
  {
    id: 'apr25-animal-photos',
    date: '2026-04-25',
    time: '8:00am',
    title: 'Send Animal Photos to Amber',
    category: 'flamingo',
    recurrence: 'one-time',
  },
  {
    id: 'apr25-animal-comm',
    date: '2026-04-25',
    time: '10:00am',
    title: 'Animal Communication Session 10am–11am',
    category: 'flamingo',
    recurrence: 'one-time',
  },
  {
    id: 'apr25-birthday',
    date: '2026-04-25',
    title: 'YOUR BIRTHDAY 🎂',
    category: 'flamingo',
    recurrence: 'one-time',
  },
  {
    id: 'apr25-safari-park',
    date: '2026-04-25',
    title: 'Safari Park + Dinner',
    category: 'flamingo',
    recurrence: 'one-time',
  },
  {
    id: 'apr26-dar-birthday-plan',
    date: '2026-04-26',
    title: "Plan Dar's Birthday (May 16)",
    category: 'flamingo',
    recurrence: 'one-time',
  },
  {
    id: 'apr26-mothers-day-plan',
    date: '2026-04-26',
    title: "Plan Mother's Day (May 10)",
    category: 'flamingo',
    recurrence: 'one-time',
  },

  // ═══ May ═══
  {
    id: 'may16-dar-birthday',
    date: '2026-05-16',
    title: "Dar's Birthday",
    emoji: '🎂',
    category: 'flamingo',
    recurrence: 'one-time',
  },
  {
    id: 'may19-tao-of-clay-1',
    date: '2026-05-19',
    time: '6:00pm',
    title: 'Tao of Clay — Session 1 of 6',
    emoji: '🏺',
    category: 'grape',
    recurrence: 'one-time',
    note: '6–8pm. Josh Herman. Sculpture class.',
  },
  {
    id: 'may22-contract-end',
    date: '2026-05-22',
    title: '⚠️ Google contract end (~approx)',
    category: 'blueberry',
    recurrence: 'one-time',
    isUrgent: true,
    criticality: 'safety-critical',
    note: 'Highest-urgency thread in the system. Confirm exact end date.',
  },
  {
    id: 'may26-tao-of-clay-2',
    date: '2026-05-26',
    time: '6:00pm',
    title: 'Tao of Clay — Session 2 of 6',
    emoji: '🏺',
    category: 'grape',
    recurrence: 'one-time',
    note: '6–8pm.',
  },

  // ═══ June ═══
  {
    id: 'jun2-tao-of-clay-3',
    date: '2026-06-02',
    time: '6:00pm',
    title: 'Tao of Clay — Session 3 of 6',
    emoji: '🏺',
    category: 'grape',
    recurrence: 'one-time',
    note: '6–8pm.',
  },
  {
    id: 'jun9-tao-of-clay-4',
    date: '2026-06-09',
    time: '6:00pm',
    title: 'Tao of Clay — Session 4 of 6',
    emoji: '🏺',
    category: 'grape',
    recurrence: 'one-time',
    note: '6–8pm.',
  },
  {
    id: 'jun16-tao-of-clay-5',
    date: '2026-06-16',
    time: '6:00pm',
    title: 'Tao of Clay — Session 5 of 6',
    emoji: '🏺',
    category: 'grape',
    recurrence: 'one-time',
    note: '6–8pm.',
  },
  {
    id: 'jun23-tao-of-clay-6',
    date: '2026-06-23',
    time: '6:00pm',
    title: 'Tao of Clay — Session 6 of 6 (final)',
    emoji: '🏺',
    category: 'grape',
    recurrence: 'one-time',
    note: '6–8pm.',
  },
];

// ─── Composite exports ─────────────────────────────────────────────────────

export const allEvents = [
  ...dailyEvents,
  ...everyTwoDaysEvents,
  ...weeklyEvents,
  ...biweeklyEvents,
  ...monthlyEvents,
  ...aprilOneTimeEvents,
];

// Stub — struck as invented in Phase 0. Real monthly budget structure lands
// in Phase 3 when Mia fills in real numbers.
export const monthlyBudgetSteps: { order: number; title: string; description: string }[] = [];
