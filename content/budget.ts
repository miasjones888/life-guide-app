import type { BudgetLine, BudgetGoal, BudgetState } from './types';

export const defaultBudgetLines: BudgetLine[] = [
  // ── Income ──────────────────────────────────────────────────────────────
  {
    id: 'income-freelance',
    label: 'Freelance / gig income',
    category: 'income',
    amount: 1800,
    isFixed: false,
    isSubscription: false,
    note: 'Variable. Update at the start of each month.',
  },
  {
    id: 'income-other',
    label: 'Other income',
    category: 'income',
    amount: 0,
    isFixed: false,
    isSubscription: false,
    note: 'Selling, side projects, etc.',
  },

  // ── Housing ─────────────────────────────────────────────────────────────
  {
    id: 'housing-rent',
    label: 'Rent',
    category: 'housing',
    amount: 1200,
    isFixed: true,
    isSubscription: false,
  },
  {
    id: 'housing-electric',
    label: 'Electric (SDG&E)',
    category: 'housing',
    amount: 90,
    isFixed: false,
    isSubscription: false,
    note: 'Varies summer vs. winter.',
  },
  {
    id: 'housing-internet',
    label: 'Internet',
    category: 'housing',
    amount: 55,
    isFixed: true,
    isSubscription: false,
  },

  // ── Food ────────────────────────────────────────────────────────────────
  {
    id: 'food-groceries',
    label: 'Groceries (Instacart)',
    category: 'food',
    amount: 250,
    isFixed: false,
    isSubscription: false,
  },
  {
    id: 'food-takeout',
    label: 'Takeout / coffee shops',
    category: 'food',
    amount: 120,
    isFixed: false,
    isSubscription: false,
    note: 'Work sessions included.',
  },

  // ── Pets ────────────────────────────────────────────────────────────────
  {
    id: 'pets-food',
    label: 'Cat food + litter',
    category: 'pets',
    amount: 80,
    isFixed: false,
    isSubscription: false,
  },
  {
    id: 'pets-meds',
    label: 'Cat medications',
    category: 'pets',
    amount: 40,
    isFixed: true,
    isSubscription: false,
    note: 'Maisie (Prozac) + Meeko.',
  },
  {
    id: 'pets-vet',
    label: 'Vet / emergency accrual',
    category: 'pets',
    amount: 30,
    isFixed: false,
    isSubscription: false,
    note: 'Building toward next visit. Maisie services due.',
  },

  // ── Health ──────────────────────────────────────────────────────────────
  {
    id: 'health-meds',
    label: 'Prescriptions',
    category: 'health',
    amount: 30,
    isFixed: true,
    isSubscription: false,
  },
  {
    id: 'health-insurance',
    label: 'Health insurance',
    category: 'health',
    amount: 0,
    isFixed: true,
    isSubscription: false,
    note: 'Update when enrolled.',
  },
  {
    id: 'health-copays',
    label: 'Therapy / psychiatry copays',
    category: 'health',
    amount: 60,
    isFixed: false,
    isSubscription: false,
    note: 'Estimate. Varies by session count.',
  },

  // ── Subscriptions ────────────────────────────────────────────────────────
  {
    id: 'sub-anthropic',
    label: 'Claude Pro (Anthropic)',
    category: 'subscriptions',
    amount: 20,
    isFixed: true,
    isSubscription: true,
  },
  {
    id: 'sub-spotify',
    label: 'Spotify',
    category: 'subscriptions',
    amount: 11,
    isFixed: true,
    isSubscription: true,
  },
  {
    id: 'sub-notion',
    label: 'Notion',
    category: 'subscriptions',
    amount: 10,
    isFixed: true,
    isSubscription: true,
  },
  {
    id: 'sub-icloud',
    label: 'iCloud Storage',
    category: 'subscriptions',
    amount: 3,
    isFixed: true,
    isSubscription: true,
  },
  {
    id: 'sub-other',
    label: 'Other subscriptions (unaudited)',
    category: 'subscriptions',
    amount: 0,
    isFixed: true,
    isSubscription: true,
    note: 'Complete subscription audit to fill this in.',
  },

  // ── Transport ────────────────────────────────────────────────────────────
  {
    id: 'transport-gas',
    label: 'Gas / rideshare',
    category: 'transport',
    amount: 60,
    isFixed: false,
    isSubscription: false,
  },

  // ── Misc ─────────────────────────────────────────────────────────────────
  {
    id: 'misc-buffer',
    label: 'Buffer / random',
    category: 'misc',
    amount: 50,
    isFixed: false,
    isSubscription: false,
    note: 'For the thing you forgot.',
  },
];

export const defaultBudgetGoals: BudgetGoal[] = [
  {
    id: 'goal-sub-audit',
    label: 'Complete subscription audit',
    note: 'Target: this Sunday. Cancel anything unused.',
  },
  {
    id: 'goal-emergency',
    label: 'Build $1,000 emergency fund',
    targetAmount: 1000,
    note: 'Any month with positive net goes here first.',
  },
  {
    id: 'goal-petal',
    label: 'Resolve Petal card',
    note: 'Fix payment method, then pay down balance.',
  },
  {
    id: 'goal-pet-insurance',
    label: 'Add pet insurance for Maisie',
    note: 'Research plans. ~$25–40/mo estimate.',
  },
];

export const defaultBudgetState: BudgetState = {
  lines: defaultBudgetLines,
  overrides: [],
  goals: defaultBudgetGoals,
};
