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
  },
  {
    title: 'Shop Pay — Tao of Clay',
    amount: '$112.50',
    note: 'Pay with different card NOW',
    isUrgent: true,
    action: 'Use alternative card immediately',
  },
  {
    title: 'Taxes',
    note: 'April 15 deadline — file by April 10',
    isUrgent: true,
    action: 'FILE TAXES',
  },
  {
    title: 'Capital One Double Charge',
    note: '$10 from ANTHROPIC x2 on Venture X 6457 — verify and dispute if needed',
    isUrgent: true,
    action: 'Log in to Capital One and check Apr 1–2',
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
