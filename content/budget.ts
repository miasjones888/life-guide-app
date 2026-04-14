import type { BudgetLine, BudgetGoal, BudgetState } from './types';

// Phase 0 audit: all amounts zeroed. Mia fills these in during Phase 3
// when she sits down with her actual accounts. Structure preserved so the
// shape stays stable; labels are placeholders and can be renamed freely.

export const defaultBudgetLines: BudgetLine[] = [
  // ── Income ──────────────────────────────────────────────────────────────
  {
    id: 'income-freelance',
    label: 'Freelance / gig income',
    category: 'income',
    amount: 0,
    isFixed: false,
    isSubscription: false,
  },
  {
    id: 'income-other',
    label: 'Other income',
    category: 'income',
    amount: 0,
    isFixed: false,
    isSubscription: false,
  },

  // ── Housing ─────────────────────────────────────────────────────────────
  {
    id: 'housing-rent',
    label: 'Rent',
    category: 'housing',
    amount: 0,
    isFixed: true,
    isSubscription: false,
  },
  {
    id: 'housing-electric',
    label: 'Electric (SDG&E)',
    category: 'housing',
    amount: 0,
    isFixed: false,
    isSubscription: false,
  },
  {
    id: 'housing-internet',
    label: 'Internet',
    category: 'housing',
    amount: 0,
    isFixed: true,
    isSubscription: false,
  },

  // ── Food ────────────────────────────────────────────────────────────────
  {
    id: 'food-groceries',
    label: 'Groceries',
    category: 'food',
    amount: 0,
    isFixed: false,
    isSubscription: false,
  },
  {
    id: 'food-takeout',
    label: 'Takeout / coffee shops',
    category: 'food',
    amount: 0,
    isFixed: false,
    isSubscription: false,
  },

  // ── Pets ────────────────────────────────────────────────────────────────
  {
    id: 'pets-food',
    label: 'Cat food + litter',
    category: 'pets',
    amount: 0,
    isFixed: false,
    isSubscription: false,
  },
  {
    id: 'pets-meds',
    label: 'Cat medications',
    category: 'pets',
    amount: 0,
    isFixed: true,
    isSubscription: false,
    note: 'Maisie (Prozac) + Meeko.',
  },
  {
    id: 'pets-vet',
    label: 'Vet / emergency accrual',
    category: 'pets',
    amount: 0,
    isFixed: false,
    isSubscription: false,
  },

  // ── Health ──────────────────────────────────────────────────────────────
  {
    id: 'health-meds',
    label: 'Prescriptions',
    category: 'health',
    amount: 0,
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
  },
  {
    id: 'health-copays',
    label: 'Therapy / psychiatry copays',
    category: 'health',
    amount: 0,
    isFixed: false,
    isSubscription: false,
  },

  // ── Subscriptions ────────────────────────────────────────────────────────
  {
    id: 'sub-other',
    label: 'Subscriptions (unaudited)',
    category: 'subscriptions',
    amount: 0,
    isFixed: true,
    isSubscription: true,
    note: 'Run a subscription audit and add real entries here.',
  },

  // ── Transport ────────────────────────────────────────────────────────────
  {
    id: 'transport-gas',
    label: 'Gas / rideshare',
    category: 'transport',
    amount: 0,
    isFixed: false,
    isSubscription: false,
  },

  // ── Misc ─────────────────────────────────────────────────────────────────
  {
    id: 'misc-buffer',
    label: 'Buffer / random',
    category: 'misc',
    amount: 0,
    isFixed: false,
    isSubscription: false,
  },
];

export const defaultBudgetGoals: BudgetGoal[] = [];

export const defaultBudgetState: BudgetState = {
  lines: defaultBudgetLines,
  overrides: [],
  goals: defaultBudgetGoals,
};
