import type { CalendarEvent } from './types';

// Phase 0 audit (2026-04-14):
// Kept only events Mia confirmed as real:
//   - Cat morning/evening meds (9am / 9pm), both safety-critical, double-alarm, hard-day minimum
//   - AM / PM cat playtime, midday cat snack, cat brushing MWF, weekly full groom
//   - All monthly cat supply / meds / toys / scratchers / vet food entries
//   - April one-time events (taxes, vet, family, birthday block, etc.)
// Struck (Claude-invented, not Mia's):
//   - All daily human routines (morning routine, skincare, breakfast, dinner, bedtime meds, lights out, etc.)
//   - Every-two-days shower check-in
//   - All non-cat weekly events (room reset, deep focus, outside time, applied buddhism, laundry,
//     sunday self-care, call mom, check in with sister, instacart, transfer notes, weekly setup)
//   - All biweekly events (check in with Annie, creative adventure, trader joe's check)
//   - Monthly financial recurrences (monthly reset, pay credit card, pay mom, pay partner rent)
//   - monthlyBudgetSteps
// Exports that previously held invented content are preserved as empty arrays so
// app/daily, app/weekly, app/monthly, app/api/assistant still compile until Phase 1
// replaces those routes.

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

export const everyTwoDaysEvents: CalendarEvent[] = [];

export const weeklyEvents: CalendarEvent[] = [
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
];

export const biweeklyEvents: CalendarEvent[] = [];

export const monthlyEvents: CalendarEvent[] = [
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

export const aprilOneTimeEvents: CalendarEvent[] = [
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
  },
  {
    id: 'apr10-taxes',
    date: '2026-04-10',
    title: 'FILE TAXES (deadline Apr 15)',
    category: 'tangerine',
    recurrence: 'one-time',
    isUrgent: true,
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
    category: 'tangerine',
    recurrence: 'one-time',
    isUrgent: true,
  },
  {
    id: 'apr15-pay-mom',
    date: '2026-04-15',
    title: 'Pay Mom',
    category: 'banana',
    recurrence: 'one-time',
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
    title: '4 Weeks to Contract End Check-In',
    category: 'blueberry',
    recurrence: 'one-time',
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
    id: 'apr26-dar-birthday',
    date: '2026-04-26',
    title: "Plan Dar's Birthday (May 16)",
    category: 'flamingo',
    recurrence: 'one-time',
  },
  {
    id: 'apr26-mothers-day',
    date: '2026-04-26',
    title: "Plan Mother's Day (May 10)",
    category: 'flamingo',
    recurrence: 'one-time',
  },
];

export const allEvents = [
  ...dailyEvents,
  ...everyTwoDaysEvents,
  ...weeklyEvents,
  ...biweeklyEvents,
  ...monthlyEvents,
  ...aprilOneTimeEvents,
];

export const monthlyBudgetSteps: { order: number; title: string; description: string }[] = [];
