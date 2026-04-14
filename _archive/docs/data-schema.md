# Data / Content Schema — Field Guide to Yourself

**Project:** Field Guide to Yourself (Personal Life Guide PWA)
**User:** Mia (single user, mobile-first)
**Document Version:** 1.0
**Last Updated:** 2026-03-31

---

## Schema Philosophy

Field Guide to Yourself uses **TypeScript interfaces as the content layer**. All content is defined as typed TypeScript objects exported from `content/` directory files. This approach provides:

1. **Type Safety:** TypeScript compiler ensures all content conforms to interfaces (caught at build time)
2. **Self-Documentation:** JSDoc comments on interfaces serve as content author guidelines
3. **Component Integration:** Content is imported directly into React components; no runtime schema validation needed
4. **Immutability:** Content is frozen at build time; no runtime API calls or database queries
5. **Maintainability:** Adding new content types requires only defining an interface and exporting data

**Maintenance workflow:**
1. Define interface in `content/types.ts` with JSDoc comments
2. Export typed data from `content/[section]/[file].ts`
3. Import data in component: `import { routineSteps } from '@/content/daily/morning-routine'`
4. Pass as props: `<RoutineChecklist items={routineSteps} />`
5. TypeScript compiler validates: if data doesn't match interface, build fails

---

## Complete TypeScript Interface Definitions

All interfaces are defined in `content/types.ts`. Below are the full definitions with JSDoc comments.

### RoutineStep

```typescript
/**
 * Represents a single step in a daily routine (morning, evening).
 * Used for displaying and tracking routine progress via checklist.
 */
export interface RoutineStep {
  /**
   * Unique identifier for this step.
   * @example "morning-make-bed"
   */
  id: string

  /**
   * Unicode emoji for visual recognition.
   * @example "🛏️"
   */
  emoji: string

  /**
   * Short label for the step.
   * @example "Make bed"
   */
  label: string

  /**
   * Longer description or context.
   * @example "Creates a sense of accomplishment and prepares the space"
   */
  description: string

  /**
   * If true, this step is part of the "minimum routine" (fast version).
   * If false or omitted, only appears in the "full routine" (complete version).
   * @default false
   */
  minimumVersion?: boolean

  /**
   * Time estimate for completing this step.
   * @example "5 min", "15 min"
   * @optional
   */
  timeEstimate?: string
}
```

### RoutineMode

```typescript
/**
 * Defines which routine version to display: full (all steps) or minimum (fast version).
 * Used by RoutineChecklist component to filter visible steps.
 */
export type RoutineMode = 'full' | 'minimum'
```

### ScheduleBlock

```typescript
/**
 * Represents a time block in the daily schedule (e.g., "Deep Work 09:00-12:00").
 * Used for displaying current/next activity and organizing the day.
 */
export interface ScheduleBlock {
  /**
   * Unique identifier for this block.
   * @example "deep-work-1"
   */
  id: string

  /**
   * Unicode emoji for the block type.
   * @example "💼"
   */
  emoji: string

  /**
   * Title of the activity block.
   * @example "Deep Work"
   */
  title: string

  /**
   * Start time in 24-hour HH:MM format.
   * @example "09:00"
   */
  startTime: string

  /**
   * End time in 24-hour HH:MM format.
   * If omitted, block is open-ended (lasts until next block).
   * @example "12:00"
   * @optional
   */
  endTime?: string

  /**
   * Description of the block's purpose or focus.
   * @example "Focused time for projects or creative work without interruptions"
   */
  description: string

  /**
   * If true, block has flexible timing (e.g., "go outside whenever possible").
   * If false or omitted, block has fixed start/end time.
   * @default false
   */
  isFlexible?: boolean

  /**
   * How often this block occurs.
   * @example "daily" | "weekly" | "monthly" | "occasional"
   */
  frequency: 'daily' | 'weekly' | 'monthly' | 'occasional'

  /**
   * Days of week when this block occurs (for weekly events).
   * 0 = Sunday, 1 = Monday, ..., 6 = Saturday.
   * Omitted for daily or one-off events.
   * @example [1, 3, 5] // Monday, Wednesday, Friday
   * @optional
   */
  dayOfWeek?: number[]
}
```

### WeekDay

```typescript
/**
 * Represents a single day in the weekly rhythm view.
 */
export interface WeekDay {
  /**
   * Day number: 0 (Sunday) to 6 (Saturday).
   */
  dayIndex: number

  /**
   * Day name.
   * @example "Monday"
   */
  dayName: string

  /**
   * Theme or focus for this day.
   * @example "Focus Day" | "Admin Day" | "Outside Day"
   */
  theme: string

  /**
   * Color accent for visual distinction (Tailwind color).
   * @example "bg-blue-50"
   */
  backgroundColor: string

  /**
   * List of events or activities for this day.
   */
  events: { emoji: string; label: string }[]
}
```

### WeeklyRhythm

```typescript
/**
 * Defines the structure and themes of the weekly cycle.
 * Maps days of the week to focus areas and recurring activities.
 */
export interface WeeklyRhythm {
  /**
   * Unique identifier.
   * @example "current-rhythm"
   */
  id: string

  /**
   * Name of this rhythm pattern.
   * @example "Balanced Week"
   */
  name: string

  /**
   * Description of the overall rhythm philosophy.
   */
  description: string

  /**
   * Array of 7 WeekDay objects, indexed Sunday (0) through Saturday (6).
   */
  days: WeekDay[]
}
```

### RecurringEvent

```typescript
/**
 * Represents a recurring event that happens on specific days each week.
 * Used for calendar display and weekly planning.
 */
export interface RecurringEvent {
  /**
   * Unique identifier.
   * @example "team-standup"
   */
  id: string

  /**
   * Emoji for visual recognition.
   */
  emoji: string

  /**
   * Event name.
   * @example "Team Standup"
   */
  title: string

  /**
   * Time in HH:MM format (24-hour).
   */
  time: string

  /**
   * Days this event occurs: 0-6 (0=Sunday, 6=Saturday).
   * @example [1, 3, 5] // Monday, Wednesday, Friday
   */
  daysOfWeek: number[]

  /**
   * Longer description of the event.
   */
  description: string

  /**
   * Duration in minutes.
   * @example 30
   */
  duration: number
}
```

### Cat

```typescript
/**
 * Represents information about a pet cat, including name, sex, medications, and care notes.
 */
export interface Cat {
  /**
   * Unique identifier.
   * @example "cat-luna"
   */
  id: string

  /**
   * Cat's name.
   * @example "Luna"
   */
  name: string

  /**
   * Biological sex.
   * @example "female" | "male"
   */
  sex: 'female' | 'male'

  /**
   * List of medications and their schedules.
   */
  medications: CatMedication[]

  /**
   * Additional notes about health, personality, or care.
   * @example "Prefers morning pets, sensitive stomach"
   */
  notes: string

  /**
   * If true, pet insurance is pending (not yet confirmed).
   * @default false
   */
  insurancePending?: boolean
}
```

### CatMedication

```typescript
/**
 * Represents a medication schedule for a cat.
 */
export interface CatMedication {
  /**
   * Name of the medication.
   * @example "Gabapentin"
   */
  name: string

  /**
   * Times of day when medication is administered (24-hour HH:MM format).
   * @example ["09:00", "21:00"]
   */
  doseTimes: string[]

  /**
   * Additional dosing notes.
   * @example "With food" | "At least 2 hours before other meds"
   * @optional
   */
  notes?: string

  /**
   * If true, this medication needs monthly reordering.
   * @example true
   */
  monthlyReorder: boolean
}
```

### CatCareSchedule

```typescript
/**
 * Aggregates all cat care tasks and schedules for the week.
 */
export interface CatCareSchedule {
  /**
   * Array of cats with all their care info.
   */
  cats: Cat[]

  /**
   * General cat care check-in time.
   * @example "09:00" | "18:00"
   */
  checkInTime: string

  /**
   * Weekly tasks (e.g., water fountain cleaning).
   */
  weeklyTasks: { emoji: string; label: string; day: number }[]
}
```

### Project

```typescript
/**
 * Represents a creative or work project being tracked.
 * Used for Focus & Goals section, status dashboard, and project list.
 */
export interface Project {
  /**
   * Unique identifier.
   * @example "project-website"
   */
  id: string

  /**
   * Project name.
   * @example "Personal Website Redesign"
   */
  name: string

  /**
   * Longer description of what the project entails.
   */
  description: string

  /**
   * Current status of the project.
   * @example "active" | "upcoming" | "paused"
   */
  status: 'active' | 'upcoming' | 'paused'

  /**
   * ISO 8601 date when project started or will start.
   * @example "2026-03-15"
   * @optional
   */
  startDate?: string

  /**
   * Priority level: primary (key focus) or secondary (background work).
   * @example "primary" | "secondary"
   */
  priority: 'primary' | 'secondary'

  /**
   * Estimated completion date.
   * @example "2026-06-30"
   * @optional
   */
  targetDate?: string
}
```

### CreativeSession

```typescript
/**
 * Template for a structured creative work session (e.g., writing, design, coding).
 */
export interface CreativeSession {
  /**
   * Unique identifier.
   * @example "session-writing"
   */
  id: string

  /**
   * Type of creative work.
   * @example "Writing" | "Design" | "Coding" | "Music"
   */
  type: string

  /**
   * Recommended duration in minutes.
   * @example 90
   */
  duration: number

  /**
   * Setup checklist before starting.
   * @example ["Close email", "Silence phone", "Open project files"]
   */
  setup: string[]

  /**
   * Reflection prompts at session end.
   * @example ["What did I accomplish?", "What's blocking me?"]
   */
  reflection: string[]
}
```

### ChecklistItem

```typescript
/**
 * Represents a single item in a checklist (e.g., admin tasks, finance checks).
 * Can be one-time or recurring; has status and urgency.
 */
export interface ChecklistItem {
  /**
   * Unique identifier.
   * @example "finance-check-1"
   */
  id: string

  /**
   * Short label for the item.
   * @example "Pay rent"
   */
  label: string

  /**
   * Longer description or context.
   * @example "Due by the 1st of each month"
   * @optional
   */
  description?: string

  /**
   * Current status.
   * @example "active" | "resolved"
   */
  status: 'active' | 'resolved'

  /**
   * If true, item is marked as high-priority.
   * @default false
   */
  urgent?: boolean

  /**
   * How often this item recurs.
   * @example "monthly" | "ongoing" | "one-time"
   */
  frequency: 'monthly' | 'ongoing' | 'one-time'
}
```

### FinanceItem

```typescript
/**
 * Represents a financial obligation, bill, or budget category.
 * Used for monthly finance tracking.
 */
export interface FinanceItem {
  /**
   * Unique identifier.
   * @example "bill-rent"
   */
  id: string

  /**
   * Category of expense.
   * @example "Housing" | "Utilities" | "Food" | "Transport"
   */
  category: string

  /**
   * Description of the expense.
   * @example "Monthly apartment rent"
   */
  description: string

  /**
   * Amount in USD.
   * @example 1500.00
   */
  amount: number

  /**
   * Day of month when payment is due (1-31).
   * @example 1 | 15
   */
  dueDate: number

  /**
   * If true, bill is automatically paid.
   * @default false
   */
  autopay?: boolean

  /**
   * Account or payment method for this bill.
   * @example "Bank Account" | "Credit Card"
   * @optional
   */
  paymentMethod?: string
}
```

### CommunityEvent

```typescript
/**
 * Represents a community gathering, social event, or collaborative activity.
 */
export interface CommunityEvent {
  /**
   * Unique identifier.
   * @example "event-monthly-meetup"
   */
  id: string

  /**
   * Name of the event or gathering.
   * @example "Community Book Club"
   */
  name: string

  /**
   * Description and context.
   */
  description: string

  /**
   * Emoji representing the event type.
   */
  emoji: string

  /**
   * When the event typically occurs.
   * @example "Third Saturday of the month at 10:00"
   */
  schedule: string

  /**
   * Location or format (address, Zoom link, etc.).
   */
  location: string
}
```

### OutsideActivity

```typescript
/**
 * Represents outdoor or nature-based activities to pursue.
 */
export interface OutsideActivity {
  /**
   * Unique identifier.
   * @example "activity-hiking"
   */
  id: string

  /**
   * Type of activity.
   * @example "Hiking" | "Picnic" | "Park Walk" | "Gardening"
   */
  type: string

  /**
   * Description and motivation.
   */
  description: string

  /**
   * Best times or seasons for this activity.
   * @example "Mornings in summer" | "Year-round"
   */
  seasonalTiming: string

  /**
   * Recommended duration in minutes.
   * @example 60
   */
  duration: number
}
```

### MentalHealthItem

```typescript
/**
 * Represents a mental health practice, check-in, or self-care activity.
 */
export interface MentalHealthItem {
  /**
   * Unique identifier.
   * @example "mindfulness-meditation"
   */
  id: string

  /**
   * Name of the practice.
   * @example "Daily Meditation"
   */
  name: string

  /**
   * How often this practice is recommended.
   * @example "daily" | "weekly" | "as needed"
   */
  frequency: 'daily' | 'weekly' | 'as needed'

  /**
   * Description and benefits.
   */
  description: string

  /**
   * Emoji for visual recognition.
   */
  emoji: string

  /**
   * Duration in minutes (if applicable).
   * @optional
   */
  duration?: number

  /**
   * Reflection prompts after the practice.
   * @example ["How did you feel?", "What came up?"]
   */
  reflection?: string[]
}
```

### HomeTask

```typescript
/**
 * Represents a home maintenance, cleaning, or organization task.
 */
export interface HomeTask {
  /**
   * Unique identifier.
   * @example "task-room-reset"
   */
  id: string

  /**
   * Name of the task.
   * @example "Room Reset"
   */
  name: string

  /**
   * Area of the home affected.
   * @example "Bedroom" | "Kitchen" | "Living Room"
   */
  area: string

  /**
   * Checklist of sub-tasks to complete.
   * @example ["Make bed", "Clear desk", "Sweep floor"]
   */
  subtasks: string[]

  /**
   * How often this task should be completed.
   * @example "daily" | "weekly" | "monthly"
   */
  frequency: 'daily' | 'weekly' | 'monthly'

  /**
   * Time estimate in minutes.
   * @example 30
   */
  estimatedTime: number
}
```

### ContentSection

```typescript
/**
 * Represents one of the 10 main guide sections in the app.
 * Used for displaying the guide index and navigating between sections.
 */
export interface ContentSection {
  /**
   * Unique identifier (must match route).
   * @example "routines" | "focus" | "care"
   */
  id: string

  /**
   * Display number for the section.
   * @example "01" | "02" | "10"
   */
  number: string

  /**
   * Section name.
   * @example "Routines & Rhythms"
   */
  name: string

  /**
   * Longer description of section content.
   */
  description: string

  /**
   * Large emoji for visual identity.
   * @example "📅"
   */
  emoji: string

  /**
   * Depth of content: glanceable (quick tips), semi-deep (moderate detail), or deep (comprehensive).
   * @example "glanceable" | "semi-deep" | "deep"
   */
  depth: 'glanceable' | 'semi-deep' | 'deep'
}
```

### SectionIndex

```typescript
/**
 * Aggregates all 10 content sections for the guide index.
 */
export interface SectionIndex {
  /**
   * Array of 10 sections in order.
   */
  sections: ContentSection[]
}
```

### AppContent

```typescript
/**
 * Root type aggregating all content for the entire app.
 * Provides a single source of truth for content structure.
 */
export interface AppContent {
  /**
   * Today view content (routines, schedule, check-ins).
   */
  daily: {
    morningRoutine: RoutineStep[]
    eveningRoutine: RoutineStep[]
    schedule: ScheduleBlock[]
  }

  /**
   * Weekly view content (rhythm, recurring events).
   */
  weekly: {
    rhythm: WeeklyRhythm
    recurringEvents: RecurringEvent[]
  }

  /**
   * Monthly view content (finance, admin).
   */
  monthly: {
    finance: FinanceItem[]
    admin: ChecklistItem[]
  }

  /**
   * Care section (cats, self-care).
   */
  care: {
    cats: CatCareSchedule
  }

  /**
   * Focus section (projects, creative sessions).
   */
  focus: {
    projects: Project[]
    creativeSessions: CreativeSession[]
  }

  /**
   * Field section (outside time, community).
   */
  field: {
    outsideActivities: OutsideActivity[]
    communityEvents: CommunityEvent[]
  }

  /**
   * Home section (room resets, laundry).
   */
  home: {
    roomReset: HomeTask
    laundry: HomeTask
  }

  /**
   * Health section (mental health practices).
   */
  health: {
    mentalHealthItems: MentalHealthItem[]
  }

  /**
   * System section (weekly reset, monthly review).
   */
  system: {
    weeklyReset: HomeTask
    monthlyReview: HomeTask
  }

  /**
   * All 10 guide sections (for navigation).
   */
  sectionIndex: SectionIndex
}
```

---

## Sample Data for Each Content Type

### RoutineStep Examples

```typescript
// content/daily/morning-routine.ts
export const morningRoutineSteps: RoutineStep[] = [
  {
    id: 'morning-wake-water',
    emoji: '💧',
    label: 'Glass of water',
    description: 'Hydrate after sleep; supports digestion and mental clarity',
    minimumVersion: true,
    timeEstimate: '2 min'
  },
  {
    id: 'morning-make-bed',
    emoji: '🛏️',
    label: 'Make bed',
    description: 'Creates sense of accomplishment; prepares a fresh space to return to',
    minimumVersion: true,
    timeEstimate: '5 min'
  },
  {
    id: 'morning-stretch',
    emoji: '🧘',
    label: 'Gentle stretch',
    description: 'Wake up the body, improve circulation, set intentional tone',
    minimumVersion: false,
    timeEstimate: '10 min'
  }
]
```

### ScheduleBlock Examples

```typescript
// content/daily/schedule.ts
export const dailySchedule: ScheduleBlock[] = [
  {
    id: 'block-morning-routine',
    emoji: '🌅',
    title: 'Morning Routine',
    startTime: '07:30',
    endTime: '08:30',
    description: 'Set intention, move body, prepare for the day',
    isFlexible: false,
    frequency: 'daily'
  },
  {
    id: 'block-deep-work',
    emoji: '💼',
    title: 'Deep Work',
    startTime: '09:00',
    endTime: '12:00',
    description: 'Focused time for projects without interruptions',
    isFlexible: false,
    frequency: 'daily'
  },
  {
    id: 'block-lunch-break',
    emoji: '🍽️',
    title: 'Lunch & Break',
    startTime: '12:00',
    endTime: '13:00',
    description: 'Nourish, rest, step away from screens',
    isFlexible: false,
    frequency: 'daily'
  },
  {
    id: 'block-outside-time',
    emoji: '🌳',
    title: 'Outside Time',
    startTime: '15:00',
    description: 'Fresh air, natural light, movement (flexible duration)',
    isFlexible: true,
    frequency: 'daily'
  }
]
```

### Cat Examples

```typescript
// content/care/cats.ts
export const cats: Cat[] = [
  {
    id: 'cat-luna',
    name: 'Luna',
    sex: 'female',
    medications: [
      {
        name: 'Gabapentin',
        doseTimes: ['09:00', '21:00'],
        notes: 'With food; helps with pain management',
        monthlyReorder: true
      }
    ],
    notes: 'Prefers morning pets, sensitive stomach. Drinks lots of water.',
    insurancePending: false
  },
  {
    id: 'cat-ember',
    name: 'Ember',
    sex: 'male',
    medications: [],
    notes: 'High energy, loves toys. Plays fetch. Monitor for overweight.',
    insurancePending: true
  }
]
```

### Project Examples

```typescript
// content/focus/projects.ts
export const projects: Project[] = [
  {
    id: 'project-site-redesign',
    name: 'Personal Website Redesign',
    description: 'Rebuild home page with new design system, improve mobile layout',
    status: 'active',
    startDate: '2026-02-01',
    priority: 'primary',
    targetDate: '2026-05-31'
  },
  {
    id: 'project-book-writing',
    name: 'Field Guide Book',
    description: 'Write and illustrate a field guide to seasonal wildflowers',
    status: 'active',
    startDate: '2026-01-15',
    priority: 'primary',
    targetDate: '2026-12-31'
  },
  {
    id: 'project-community-garden',
    name: 'Community Garden Setup',
    description: 'Organize neighborhood garden project; recruit participants',
    status: 'upcoming',
    startDate: '2026-04-01',
    priority: 'secondary',
    targetDate: '2026-06-30'
  }
]
```

### ChecklistItem Examples

```typescript
// content/monthly/admin.ts
export const monthlyAdminChecklist: ChecklistItem[] = [
  {
    id: 'admin-car-insurance',
    label: 'Review car insurance',
    description: 'Check coverage and renew if needed',
    status: 'active',
    urgent: false,
    frequency: 'monthly'
  },
  {
    id: 'admin-med-reorder',
    label: 'Reorder cat medications',
    description: 'Order Gabapentin and other meds from vet',
    status: 'active',
    urgent: true,
    frequency: 'monthly'
  },
  {
    id: 'admin-budget-review',
    label: 'Monthly budget review',
    description: 'Check spending, adjust categories as needed',
    status: 'active',
    urgent: false,
    frequency: 'monthly'
  }
]
```

### FinanceItem Examples

```typescript
// content/monthly/finance.ts
export const financeItems: FinanceItem[] = [
  {
    id: 'bill-rent',
    category: 'Housing',
    description: 'Monthly apartment rent',
    amount: 1500.00,
    dueDate: 1,
    autopay: true,
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'bill-internet',
    category: 'Utilities',
    description: 'Internet service provider',
    amount: 79.99,
    dueDate: 15,
    autopay: true,
    paymentMethod: 'Credit Card'
  },
  {
    id: 'bill-vet-insurance',
    category: 'Pet Care',
    description: 'Pet health insurance (cats)',
    amount: 45.00,
    dueDate: 20,
    autopay: false,
    paymentMethod: 'Credit Card'
  }
]
```

### MentalHealthItem Examples

```typescript
// content/health/mental-health.ts
export const mentalHealthItems: MentalHealthItem[] = [
  {
    id: 'practice-meditation',
    name: 'Morning Meditation',
    frequency: 'daily',
    description: 'Sit quietly, observe thoughts without judgment, set intention',
    emoji: '🧘',
    duration: 15,
    reflection: ['How calm do you feel?', 'Any insights?']
  },
  {
    id: 'practice-journaling',
    name: 'Evening Reflection',
    frequency: 'daily',
    description: 'Free-write about the day: wins, challenges, lessons',
    emoji: '📖',
    duration: 20,
    reflection: ['What surprised you today?', 'What are you grateful for?']
  },
  {
    id: 'check-in-therapy',
    name: 'Therapy Appointment',
    frequency: 'weekly',
    description: 'Weekly session with therapist (Thursdays 2pm)',
    emoji: '🤝',
    duration: 50
  }
]
```

### ContentSection Examples

```typescript
// Used to define all 10 guide sections
export const contentSections: ContentSection[] = [
  {
    id: 'routines',
    number: '01',
    name: 'Routines & Rhythms',
    description: 'Daily rhythms that anchor your day, morning and evening rituals',
    emoji: '📅',
    depth: 'semi-deep'
  },
  {
    id: 'focus',
    number: '02',
    name: 'Focus & Creative Work',
    description: 'Active projects, creative sessions, and deep work blocks',
    emoji: '💼',
    depth: 'semi-deep'
  },
  {
    id: 'care',
    number: '03',
    name: 'Care — Cats & Self',
    description: 'Pet care schedules, medications, self-care practices',
    emoji: '🐱',
    depth: 'glanceable'
  },
  // ... 7 more sections
]
```

---

## Content File Map

| File | Exports | Type |
|------|---------|------|
| `content/daily/morning-routine.ts` | `morningRoutineSteps` | `RoutineStep[]` |
| `content/daily/evening-routine.ts` | `eveningRoutineSteps` | `RoutineStep[]` |
| `content/daily/schedule.ts` | `dailySchedule` | `ScheduleBlock[]` |
| `content/daily/check-ins.ts` | `dailyCheckIns` | `string[]` (prompts) |
| `content/weekly/rhythm.ts` | `weeklyRhythm` | `WeeklyRhythm` |
| `content/weekly/recurring-events.ts` | `recurringEvents` | `RecurringEvent[]` |
| `content/monthly/finance.ts` | `financeItems` | `FinanceItem[]` |
| `content/monthly/admin.ts` | `monthlyAdminChecklist` | `ChecklistItem[]` |
| `content/care/cats.ts` | `cats`, `catCareSchedule` | `Cat[]`, `CatCareSchedule` |
| `content/care/self-care.ts` | `selfCareRoutines` | `string[]` (routines) |
| `content/focus/projects.ts` | `projects` | `Project[]` |
| `content/focus/creative-session.ts` | `creativeSessions` | `CreativeSession[]` |
| `content/field/outside-time.ts` | `outsideActivities` | `OutsideActivity[]` |
| `content/field/community.ts` | `communityEvents` | `CommunityEvent[]` |
| `content/home/room-reset.ts` | `roomReset` | `HomeTask` |
| `content/home/laundry.ts` | `laundryTask` | `HomeTask` |
| `content/health/mental-health.ts` | `mentalHealthItems` | `MentalHealthItem[]` |
| `content/system/weekly-reset.ts` | `weeklyReset` | `HomeTask` |
| `content/system/monthly-review.ts` | `monthlyReview` | `HomeTask` |

---

## Content Update Guide

### How to Edit Content Files

1. **Locate the relevant file** from the Content File Map above.
2. **Edit the TypeScript object** to add, remove, or modify items.
3. **Maintain type safety:**
   - Ensure all required fields are present
   - Use the correct field types (string, number, boolean, enum)
   - Match JSDoc comments for guidance on expected values
4. **Build and test locally:**
   ```bash
   pnpm dev
   # Visit http://localhost:3000 and check your section
   ```
5. **Commit and push:**
   ```bash
   git add content/[section]/[file].ts
   git commit -m "Update [section] content: [description]"
   git push
   ```
   Vercel will rebuild automatically.

### Adding a New Schedule Block

**Example: Add a new time block to the daily schedule**

```typescript
// content/daily/schedule.ts
export const dailySchedule: ScheduleBlock[] = [
  // ... existing blocks ...
  {
    id: 'block-new-activity',    // Unique ID
    emoji: '🎯',                  // Unicode emoji
    title: 'New Activity',         // Title
    startTime: '14:00',           // HH:MM format
    endTime: '15:00',             // Optional; omit for open-ended
    description: 'Description of the activity',
    isFlexible: false,            // Fixed time if false
    frequency: 'daily',           // daily | weekly | monthly | occasional
    dayOfWeek: [1, 3, 5]          // Only if weekly; omit for daily
  }
]
```

### Adding a New Project

**Example: Add an active project**

```typescript
// content/focus/projects.ts
export const projects: Project[] = [
  // ... existing projects ...
  {
    id: 'project-unique-id',
    name: 'Project Name',
    description: 'What is this project about?',
    status: 'active',             // active | upcoming | paused
    startDate: '2026-03-31',      // ISO date (optional)
    priority: 'primary',          // primary | secondary
    targetDate: '2026-06-30'      // ISO date (optional)
  }
]
```

### Adding a New Cat Medication

**Example: Add a medication dose to an existing cat**

```typescript
// content/care/cats.ts
export const cats: Cat[] = [
  {
    id: 'cat-luna',
    name: 'Luna',
    sex: 'female',
    medications: [
      // ... existing medications ...
      {
        name: 'New Medication Name',
        doseTimes: ['09:00', '18:00'],  // Array of times
        notes: 'Any special instructions',
        monthlyReorder: true            // Does this need monthly ordering?
      }
    ],
    notes: 'Update existing notes if needed',
    insurancePending: false
  }
]
```

### What to Check After Editing

1. **TypeScript compile check:**
   ```bash
   pnpm typecheck
   ```
   Should show no errors. If there are type errors, check JSDoc comments for required fields.

2. **Visual verification:**
   - Run `pnpm dev`
   - Navigate to the affected page
   - Verify content displays correctly
   - Check responsive layout on mobile

3. **No hardcoded data elsewhere:**
   - Use the search function to ensure content isn't duplicated in component files
   - Content should live in `content/` only; components import it

---

## Data Validation Approach

### Build-Time Validation

**TypeScript strict mode** catches data errors at build time:

```bash
pnpm typecheck  # Runs tsc --noEmit
```

This validates:
- All required fields are present on all objects
- Field types match interface definitions
- Enum values are only valid options
- No misspelled property names

**Example: Missing required field**
```typescript
// WRONG: Missing 'description' field (required)
{
  id: 'block-test',
  emoji: '📅',
  title: 'Test'
  // Missing: startTime, description
}

// tsc error: Property 'startTime' is missing
```

### Runtime Validation

Not needed. TypeScript strict mode ensures all content is valid before the build completes.

### Content Linting

Add a pre-commit hook (Phase 2) to validate:
- No duplicate IDs across all content files
- All referenced enums are valid
- No orphaned or unused content exports

---

## localStorage Data Schema

### AnchorTask (Weekly Focus Item)

**Key:** `mia:anchor-task`
**Type:** `AnchorTask` (custom interface)
**Default:** Empty object or null
**Reset Behavior:** Never (persists indefinitely until user changes it)

```typescript
interface AnchorTask {
  id: string
  label: string
  createdAt: string          // ISO 8601 timestamp
  completedAt?: string       // ISO 8601 timestamp (if marked done)
}

// Example in localStorage:
{
  "mia:anchor-task": {
    "id": "anchor-2026-03-31",
    "label": "Finish Field Guide book outline",
    "createdAt": "2026-03-31T09:00:00Z",
    "completedAt": null
  }
}
```

**Used by:** AnchorTask component (Today view)

---

### ChecklistState (Ephemeral, Per-Day Reset)

**Key:** `mia:checklist:YYYY-MM-DD` (date-keyed)
**Type:** `Record<string, boolean>`
**Default:** Empty object (all items unchecked)
**Reset Behavior:** Automatic when calendar date changes; old keys can be cleared manually

```typescript
// Example in localStorage:
{
  "mia:checklist:2026-03-31": {
    "morning-water": true,        // Item ID → checked status
    "morning-bed": true,
    "morning-stretch": false,
    "finance-review": true
  }
}

// Next day (2026-04-01), new key is created:
{
  "mia:checklist:2026-04-01": {
    // Fresh start; all items unchecked
  }
}
```

**Lifetime:** One day (persists through page reloads, cleared automatically at midnight)
**Used by:** useCheckList hook, RoutineChecklist component, any checklist component

---

### ReflectionNote (Persistent Journal Entry)

**Key:** `mia:reflection-note`
**Type:** `string` (free-form text)
**Default:** Empty string
**Reset Behavior:** Never (user can clear manually)

```typescript
// Example in localStorage:
{
  "mia:reflection-note": "Today I completed the morning routine consistently. Luna seemed more comfortable after her morning medication. Worked on the website redesign for 3 hours, good progress."
}
```

**Used by:** NotepadPanel component (persistent note area)

---

### localStorage Usage Summary

| Key | Type | Size | Lifetime | Component |
|-----|------|------|----------|-----------|
| `mia:anchor-task` | AnchorTask object | ~200 bytes | Indefinite | AnchorTask |
| `mia:checklist:YYYY-MM-DD` | Record<id, boolean> | ~500 bytes | 1 day | useCheckList |
| `mia:reflection-note` | string | ~2KB | Indefinite | NotepadPanel |
| **Total estimated** | | ~3KB | Mixed | |

**Browser quota:** 5–10MB per origin; current usage is <1% of quota.

---

## Schema Extension Points

### If Adding New Content Types (Phase 2+)

1. Define interface in `content/types.ts`
2. Add JSDoc comments for each field
3. Export sample data from relevant content file
4. Update `AppContent` interface to include new type
5. Update Content File Map in this document
6. Run `pnpm typecheck` to validate

### If Adding localStorage State

1. Define interface in `content/types.ts` or hooks file
2. Create hook in `hooks/useLocalStorage.ts` with type
3. Document key, type, default, and reset behavior in this document
4. Test localStorage behavior across page reloads and date changes

### If Integrating External API (Phase 4+)

1. Create interfaces for API response objects
2. Create hook (`useGoogleCalendarEvents`) to fetch and cache
3. Extend `AppContent` to include API-sourced data
4. Document API contract, caching strategy, and offline fallback

---

**End of Document**
