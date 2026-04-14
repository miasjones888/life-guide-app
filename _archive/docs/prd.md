# Product Requirements Document: Field Guide to Yourself

**Document Version:** 1.0
**Status:** In Development (Phase 1)
**Author:** Product Strategy Team
**Date:** March 2026
**Last Updated:** March 31, 2026

---

## Executive Summary

Field Guide to Yourself is a mobile-first progressive web app (PWA) that consolidates Mia's personal life system into a single, offline-capable, editorial field guide. The app serves as a living reference for her routines, weekly rhythm, creative work, care practices, nutrition, home maintenance, finances, outdoor engagement, health management, and system reflection. It is designed specifically for someone with depression, anxiety, CPTSD, and ADHD who needs structure that reduces friction and decision fatigue rather than demanding compliance or gamifying productivity.

The app is not a task manager, calendar replacement, or Notion clone. It is a read-first, reference-first tool that treats Mia's life system as a designed artifact worthy of care. All content is local, offline-capable, and can be updated without breaking the app's visual or functional integrity. The app is built with Next.js 14, TypeScript 5, Tailwind CSS 3, and Framer Motion 11, targeting iOS 16+ Safari as primary platform, with responsive support for Android 10+.

---

## Background and Context

### Current State

Mia has built a comprehensive personal life system across multiple tools:
- **Analog:** Handwritten notebooks, journal entries, habit documentation
- **Digital:** Calendar entries with time blocks, Notion databases with routines and reflections, scattered notes on care practices
- **Content gaps:** The system is complete in substance but fragmented in presentation. No single tool presents the system as a coherent whole.

### Pain Points

1. **Accessibility:** Her life system is spread across multiple tools, making it hard to access a complete routine on a hard day when cognitive load is high.
2. **Context loss:** Each tool presents information differently (calendar as blocks, Notion as properties, notebooks as prose), creating cognitive friction.
3. **Lack of intentionality in tooling:** Existing apps optimize for metrics, competition, and engagement—not for humane, friction-reducing structure.
4. **Mobile friction:** Most of her system information is not optimized for phone access, yet the phone is often where she needs it (morning, at meal time, before bedtime).
5. **Decision fatigue:** Without a clear, accessible reference, she must remember the details of her own system instead of trusting the tool to hold them.

### Why Now

Phase 1 is ready because:
- Mia's life system is complete and stable (daily routines, weekly rhythm, all care practices are documented)
- Her content is written and can be treated as immutable source material
- Mobile as primary platform is now non-negotiable for personal tools
- PWA technology is mature enough to guarantee offline access and iPhone installation
- The design pattern (OS window chrome + organic content) is proven and ready to implement

---

## Product Goals

### User Experience Goals

1. **Reduce cognitive load in the moment of need.** When Mia wakes up on a hard day, the morning routine is complete and visible within 2 seconds. When it's time to feed the cats, the care guide is clear and accurate. When she's planning her week, the rhythm section is contextual and easy to understand.

2. **Enable trust in the system.** By making the entire system visible and reference-able in one place, Mia can trust the app to hold the details instead of carrying them in her head. This reduces mental overhead and anxiety.

3. **Support variability without shame.** The app explicitly documents good-day and hard-day versions of routines. It never asks "did you do this?" and never gamifies completion. It is as useful on a day when she does the minimum as on a day when she does the full version.

4. **Make navigation intuitive and fast.** Every piece of content should be reachable within 3 taps from the home view. No search, no filters, no configuration.

### Emotional Goals

1. **Create a sense of intention and care.** The app should feel thoughtful, like it was designed by someone who understands Mia's life, not a generic productivity tool.

2. **Normalize difficulty and variability.** Hard days and small versions of routines should feel as valid as full versions. The app should never imply that doing less is failure.

3. **Bring nature and humanity into the digital tool.** OS window chrome, organic color palette, natural language, and the absence of metrics create a border between Mia and an automated system.

### Visual Goals

1. **Establish clear visual hierarchy.** Window panels, title bars, and content areas create structure without visual noise. JetBrains Mono for headings and UI, Inter for body text.

2. **Use color intentionally.** Chrome (#D4D0C8), paper (#F4F1EC), ink (#1A1917), and forest (#3D5C3A) are functional rather than decorative. Color should clarify structure, not add visual excitement.

3. **Respect readability on small screens.** 375px–430px viewport requires generous line height, clear typographic scale, and minimal columns.

### Technical Goals

1. **Guarantee offline access.** The app must function completely offline. Every routine, every guide section, every piece of content must be available without network connectivity.

2. **Ensure performance on mobile networks.** Initial load under 2 seconds on 4G. No janky scrolling on older devices. Service worker pre-caches all content.

3. **Support future expansion without rebuild.** Architecture should allow Phase 2 and Phase 4 to add content and dynamic behavior without breaking Phase 1's core functionality.

4. **Make content portable and version-controllable.** All content should be stored as structured data (JSON, Markdown, or TypeScript constants) that can be version-controlled, audited, and updated without touching the app's core logic.

### Content Preservation Goals

1. **Preserve verbatim copy.** The following passages must appear exactly as written, somewhere in the app:
   - "Protected time. No calls, no notifications, no obligations."
   - "On a hard day: just those two. Done."
   - "You don't have to cook. You just have to eat something."
   - "body + spirituality + feedstock in one block. Don't plan it to death. Just go outside."
   - "Non-negotiable on whether, flexible on which."
   - "That is the whole task. Nothing else is required."
   - "Everything for today is written down."

2. **Maintain editorial integrity.** All content should read naturally, preserve Mia's voice, and never be simplified for technical convenience.

---

## User Persona: Mia

### Demographics & Life Context

- **Age/Background:** Writer, copywriter, creative director. Experienced in design thinking, editing, and systems design.
- **Living situation:** Shares a home with partner Dar. Three cats (Maisie, Meeko, and a third).
- **Technical comfort:** High. Comfortable with code, APIs, design systems. Uses Notion, can read Git, understands PWA concepts.

### Mental Health & Neurodivergence

- **Diagnoses:** Depression, anxiety, CPTSD, ADHD
- **Key challenges:**
  - Task initiation difficulty (especially for routine/care tasks without external deadline)
  - Variable energy and motivation day-to-day
  - Cognitive fog and decision fatigue on hard days
  - Perfectionism that can lead to avoidance (if she can't do the full version, she avoids starting)
  - Hypervigilance and need for control over her environment and tools

### Behavioral Patterns

- **Self-knowledge:** Mia is highly self-aware and has built systems specifically to work *with* her neurodivergence, not against it.
- **Written-first:** She thinks and plans in writing. She has a strong writing practice (journaling, note-taking, curriculum building).
- **Routines as scaffolding:** She uses daily and weekly routines not as compliance mechanisms but as cognitive scaffolding that reduces friction and decision fatigue.
- **Permission-seeking:** She explicitly documents "hard day versions" and gives herself permission to do the minimum. She needs to see this permission in writing.
- **Ideation >> execution:** She generates ideas easily but struggles with sustained task initiation. She needs structure that makes the path of least resistance the right path.

### Needs from the App

1. **Accessibility in moments of low capacity.** When depression or fatigue is high, she needs to be able to access her entire morning routine without searching, clicking through multiple screens, or making decisions.

2. **Honesty about variability.** The app should document the version she *can* do on a hard day and treat that as equally valid.

3. **Reduction of mental load.** Instead of remembering when to give Maisie her Prozac or which skincare steps are non-negotiable, she should be able to trust the app.

4. **Environmental control.** She needs to know the app will not change without her consent. No dark mode pushed on her, no features added, no notifications sent. The tool should be fully under her control.

5. **Portable, personal knowledge.** She should be able to back it up, version it, understand it, and potentially share components of it with other people who design their lives intentionally.

### Success Indicators (How We Know We're Meeting Her Needs)

- She opens the app within 10 minutes of waking up on most mornings
- She references the app instead of looking things up in other tools
- She adds or updates content (e.g., cat medication changes, routine adjustments) without hesitation
- She uses the app on airplane mode or without broadband
- She describes the app as "mine" or "trustworthy"

---

## User Stories

### Routine Access (Core)

1. As someone with depression and low energy, I want to see my morning routine fully written out so that I don't have to decide what comes next and can move through it on autopilot.

2. As someone with ADHD, I want to see a hard-day version of my morning routine so that I can feel successful even when I can only do the minimum.

3. As someone with task initiation difficulty, I want each routine step to have a clear, concrete action and estimated time so that I know exactly what "done" looks like.

4. As Mia, I want my evening routine visible before bed so that I can make sure I've taken my medications, done my skincare, and set myself up for sleep.

5. As a cat parent, I want to see the exact medication schedule for each cat in one place so that I never miss or double-dose.

### Weekly Rhythm (Context)

6. As someone who works across multiple projects, I want to see my weekly rhythm so that I know what type of work today is and can mentally prepare.

7. As Mia, I want the current day of the week to be highlighted so that I always know where I am in my cycle.

8. As someone with ADHD, I want to understand the *why* behind each day's focus so that I can connect my daily work to the larger system.

### Navigation & Structure

9. As a user with high cognitive load, I want to navigate to any guide section within 3 taps so that I don't lose focus or get frustrated.

10. As Mia, I want a clear home view that shows me what I need to know right now so that I can decide whether I need to dive deeper into a section.

11. As someone who uses multiple devices, I want the same content accessible on my phone, tablet, and computer so that I can read the guide wherever I am.

### Offline & Reliability

12. As someone with unreliable broadband, I want the app to function completely offline so that I can access my routines even without internet.

13. As Mia, I want to know that the app is not sending data anywhere so that I can trust it with sensitive information about my health and routines.

### Content Preservation & Updates

14. As Mia, I want to be able to update content in the app when my system changes (e.g., new medication, new cat, schedule shift) so that I can keep the guide current without waiting for a developer.

15. As the owner of this system, I want to be able to back up my entire guide or export it so that I own this data and can use it outside the app.

### Visual & Emotional Experience

16. As someone who spends a lot of time in digital tools, I want the app to feel intentional and thoughtful rather than corporate so that using it feels like consulting a personal field guide rather than a productivity hack.

17. As Mia, I want the app to never ask me "did you do this?" or show me streaks/metrics so that I can use it without guilt or shame.

---

## Functional Requirements

### Must-Have (Phase 1)

- [ ] Home view displaying current time, current time block, and upcoming time blocks for the day
- [ ] Today view showing time-blocked daily schedule with clear delineation between routine time and flexible time
- [ ] Morning Routine section (full + hard-day version) with step-by-step instructions and estimated times
- [ ] Evening Routine section (full + hard-day version) with step-by-step instructions and estimated times
- [ ] Navigation menu accessible from every view (bottom tab bar or top navigation)
- [ ] PWA installation capability (service worker, manifest.json, icon set)
- [ ] Offline-first content delivery (service worker pre-caches all content)
- [ ] Responsive design for 375px–430px mobile viewports
- [ ] No external API calls for reading content (all data is local)
- [ ] No database requirement (data is in-memory from local files or constants)

### Must-Have (Phase 1 + 2)

These are must-have eventually but not required for Phase 1 launch:

- [ ] All ten guide sections implemented (Routines, Rhythm, Focus, Care, Body, Home, Finance, Field, Health, System)
- [ ] Full cat care information (all three cats, all medications, dietary needs, play schedules)
- [ ] Weekly rhythm section showing current day and weekly focus areas
- [ ] Finance section with budget structure and admin checklist
- [ ] Health section with medication tracker and therapy/psychiatry information
- [ ] Care section with all three cats' information organized and editable

### Nice-to-Have (Phase 2+)

- [ ] Framer Motion micro-animations for section transitions and state changes
- [ ] Journaling/reflection capture within the System section
- [ ] Calculated/dynamic content generation from parsed calendar data
- [ ] Search across all content (if content volume justifies it)
- [ ] Print-friendly view of any guide section
- [ ] Ability to customize text size or line height
- [ ] Dark mode (explicitly out of scope for Phase 1, re-evaluate later)
- [ ] Sync with external calendar systems (re-evaluate in Phase 4)

### Out of Scope (Explicitly)

- [ ] User authentication or accounts (Mia is a single user; this is her personal app)
- [ ] Cloud sync or multi-device synchronization
- [ ] Push notifications or reminder systems
- [ ] Streak tracking, gamification, or metrics
- [ ] Third-party integrations (calendar write-back, habit APIs, etc.)
- [ ] Collaborative features (sharing, multiplayer, comment threads)
- [ ] Real-time sync across devices
- [ ] CMS or content management interface (updates through code/JSON only)
- [ ] Dark mode (intentionally excluded; OS chrome is light)
- [ ] Mobile app distribution (web app only, no App Store)

---

## Non-Functional Requirements

### Performance

- **Initial load:** < 2 seconds on 4G, iPhone 12
- **Time to interactive:** < 3 seconds
- **First Contentful Paint:** < 1 second
- **Largest Contentful Paint:** < 1.5 seconds
- **Scroll performance:** Consistent 60fps on all sections
- **Navigation between sections:** Instant (no loading spinners)

### Accessibility

- **WCAG 2.1 Level AA compliance** at minimum:
  - Color contrast ratio 4.5:1 for all text
  - Touch targets minimum 44x44px (48x48px preferred)
  - Keyboard navigation fully supported
  - Screen reader support (semantic HTML, proper ARIA labels)
  - Readable text on small screens (minimum 16px body font)

- **Neurodivergence-friendly design:**
  - No flashing or strobing content
  - Clear, consistent navigation patterns
  - Explicit permission language (not "did you complete" but "here's the minimum")
  - Minimal animation/motion (Framer Motion for intentional state changes only)
  - High contrast text on paper background

### Offline Capability

- **Service Worker:** All assets and content pre-cached on first visit
- **Content availability:** Entire app functions without network connectivity
- **Data persistence:** All local data remains accessible after app close and reopen
- **Sync:** No automatic sync; manual updates only (updates happen when developer updates the JSON/code)

### Progressive Web App (PWA) Capability

- **Installability:** App can be installed to home screen on iOS 16+ and Android 10+
- **Home screen icon:** Provides visual indication of installation (custom icon)
- **Splash screen:** Shows branded loading screen while app initializes
- **Manifest:** Complete manifest.json with app name, icons, start URL, display mode
- **Service Worker:** v1 with cache-first strategy for assets, network-first for future API calls (Phase 4)

### Browser & Device Support

- **Primary:** iOS 16+ (Safari), iPhone 12+ (375px viewport minimum)
- **Secondary:** Android 10+ (Chrome/Samsung Internet), tablet responsive
- **Fallback support:** All browsers with ES2020+ support and CSS Grid
- **No version-specific features:** Avoid iOS 17+ exclusive APIs in Phase 1

### Mobile-First Design Constraints

- **Viewport:** 375px–430px primary, responsive up to 768px
- **Touch-friendly:** All interactive elements 44px+ with clear tap targets
- **Responsive typography:** Scale smoothly from 375px to 430px without horizontal scroll
- **Single-column layout:** No two-column designs for mobile
- **Scrollable content:** Vertical scroll preferred, no horizontal scroll

### Code Quality & Maintainability

- **TypeScript:** 100% coverage, strict mode enabled
- **Component structure:** Clear separation of layout, content, and presentational components
- **Content data:** Externalized from components (JSON, constants, or Markdown files)
- **Testing:** Minimum 80% coverage for critical paths (routines, navigation)
- **Documentation:** Clear JSDoc comments for all exported functions and components
- **Git history:** Atomic commits, clear commit messages

---

## Content Requirements

### Content Inventory (What Must Be Preserved)

All content from Mia's calendar and notes system must be represented in the app. This includes:

#### Routines (Complete)

**Morning Routine (7:30am start)**
- 7:30am: Coffee, journal, read, plan, ground. Protected time. No calls, no notifications, no obligations.
- 8:00am: Cleanser + SPF. (On a hard day: just those two. Done.)
- 9:00am: Cat morning meds (Maisie + Meeko). All three cats get wet food breakfast by 10am.
- 9:15am: Breakfast (No appetite is okay — grab something small.)
- 9:30am: Cat playtime (10–15 min)

**Evening Routine (9:00pm start)**
- 9:00pm: Cat meds, own meds, skincare, anchor task, reading
- 9:30pm: Bedtime meds (PRN anxiety meds; keep physically accessible)
- 11:00pm: Lights out (no TikTok/Instagram)

#### Weekly Rhythm (Complete)

- **Monday:** Portfolio work
- **Tuesday:** Notion R&D web app, life admin
- **Wednesday:** Notion R&D web app, portfolio work
- **Thursday:** Buffer/life admin
- **Friday:** Systems work (digital garden, task board, creative curriculum)
- **Saturday:** Creative exploration (sculpting, moodboards, galleries, writing, films) + optional Buddhism class
- **Sunday:** Life planning reset (taxes, finances, scheduling, moving research, therapy outreach)

#### Care (Complete)

**Maisie:** On Prozac. Specific medication schedule, wet food requirements, play preferences.
**Meeko:** On medication. Specific medication schedule, dietary needs.
**Third cat:** Care requirements documented.

All three cats require morning meds, afternoon/midday snack and play, evening meds and play.

#### Daily Time Blocks (Complete)

- 7:30am: Morning Routine (protected)
- 8:00am: Morning Skincare
- 9:00am: Cat Morning Meds
- 9:15am: Breakfast
- 9:30am: AM Cat Playtime
- 10:00am: Deep Focus Project Session (90–120 min)
- 12:30pm: Cat Midday Snack + Play
- 1:00pm: Eaten today? check-in
- 2:00pm: Outside Time (hiking, paddleboarding, birdwatching, long walk)
- 5:30pm: Room Reset (20 min, rotating phase system)
- 6:30pm: Dinner (delivery/frozen/shelf; "You just need to eat something")
- 7:30pm: PM Cat Playtime + Shower check-in
- 9:00pm: Evening Routine
- 9:30pm: Bedtime Meds (PRN)
- 11:00pm: Lights Out

#### Key Copy That Must Appear Verbatim (Somewhere in the App)

1. "Protected time. No calls, no notifications, no obligations."
2. "On a hard day: just those two. Done."
3. "You don't have to cook. You just have to eat something."
4. "body + spirituality + feedstock in one block. Don't plan it to death. Just go outside."
5. "Non-negotiable on whether, flexible on which."
6. "That is the whole task. Nothing else is required."
7. "Everything for today is written down."

### Content Organization (How It's Presented)

**Routine sections** should have:
- **Full version:** Complete steps with timing
- **Hard-day version:** Minimum viable steps that still accomplish the core outcome
- **Why:** Brief explanation of what each step does and why it matters

**Rhythm and time block sections** should have:
- **Today's focus:** What type of work/life is this time for
- **Protected vs. flexible:** Clear indication of what can be moved vs. what cannot
- **Why:** Connection to the larger life system

**Care sections** should have:
- **Medication schedule:** Exact timing, dosage if relevant, special notes
- **Dietary needs:** What each cat eats, when, special requirements
- **Behavioral notes:** Play preferences, health conditions, special handling
- **Easy-to-scan format:** Use tables or structured lists, not prose

---

## Interaction Model Summary

### Navigation Structure

```
Home (Today View)
├── Morning Routine
├── Evening Routine
├── Today's Time Blocks
└── [Menu/Hamburger to access other sections]

Guide Sections (All 10, accessed from menu)
├── 01 Routines
├── 02 Rhythm
├── 03 Focus
├── 04 Care
├── 05 Body
├── 06 Home
├── 07 Finance
├── 08 Field
├── 09 Health
└── 10 System
```

### Primary User Flows

**Flow 1: Morning Wake-Up**
1. Open app (installed on home screen)
2. See morning routine immediately (full or hard-day version)
3. Scroll through routine steps
4. Done

**Flow 2: Weekly Planning**
1. Open app
2. Tap "Rhythm" or equivalent
3. See current day highlighted
4. See weekly breakdown with each day's focus
5. Understand what today is meant for

**Flow 3: Cat Medication**
1. Open app
2. Tap "Care" section
3. See all three cats' schedules
4. Quickly reference what needs to happen now
5. Done

**Flow 4: Find a Time Block's Context**
1. Home view shows current time block
2. Tap time block to see full details
3. Understand purpose, duration, what it means
4. Back to home

### Information Hierarchy

1. **Homepage/Today view:** Most important, always visible, no interaction required
2. **Routine sections:** Second level, frequently accessed, minimal friction
3. **Reference sections (Rhythm, Care, Health):** Third level, accessed as needed
4. **Exploratory sections (Focus, Finance, Field, System):** Fourth level, for deeper engagement

---

## Technical Constraints

### Stack (Non-Negotiable)

- **Runtime:** Node.js ≥20
- **Framework:** Next.js 14 with SSG (Static Site Generation)
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 3
- **Animation:** Framer Motion 11 (for Phase 2+; Phase 1 can be CSS-only)
- **Fonts:** JetBrains Mono (headings, UI) + Inter (body)
- **PWA:** next-pwa for service worker integration
- **Package Manager:** pnpm
- **Deployment:** Vercel
- **Version Control:** Git

### Architectural Constraints

- **SSG only:** No SSR, no server-side computation. All content is static and pre-rendered at build time.
- **No database:** Data lives in code (TypeScript constants, JSON files, or Markdown). No external data layer.
- **No API calls in Phase 1:** All content is bundled with the app. Future phases may add API calls for dynamic content, but Phase 1 should work 100% offline.
- **Content as code:** All content updates require code changes and re-deployment. No CMS, no admin panel.
- **Single-user:** No authentication, no user accounts, no access control. App is built for one person.

### Deployment Constraints

- **Target:** Vercel (Next.js native platform)
- **Domain:** To be determined (could be `fieldguide.mia.local`, `guide.mia.dev`, or similar)
- **Build time:** Should be < 60 seconds
- **Bundle size:** Target < 2MB (including all content and assets)
- **Edge locations:** Global CDN via Vercel

---

## Dependencies

### Required Dependencies

- `next@14.x` — Web framework
- `typescript@5` — Type system
- `tailwindcss@3` — Utility-first CSS
- `framer-motion@11` — Animation library
- `next-pwa@5` — PWA service worker integration

### Dev Dependencies

- `@types/node` — Node.js types
- `@types/react` — React types
- `postcss` — CSS processing
- `autoprefixer` — CSS vendor prefixes
- `eslint` — Linting
- `prettier` — Code formatting

### Fonts (CDN or Local)

- **JetBrains Mono:** Google Fonts or local import
- **Inter:** Google Fonts or local import

### No External Dependencies Allowed For:

- Authentication (no NextAuth, no Firebase Auth)
- Database (no Prisma, Supabase, or similar)
- State management (Next.js App Router is sufficient)
- CMS (no Contentful, Strapi, or similar)
- Analytics (no Segment, Mixpanel, or GA)
- Error tracking (no Sentry)
- Third-party APIs (no Stripe, Auth0, SendGrid, etc.)

---

## Risks and Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|-----------|
| Scope creep in Phase 1 | Delays launch, dilutes core focus | Medium | Strict definition of Phase 1 deliverables; defer all nice-to-have features |
| Content accuracy errors (e.g., wrong medication timing) | User safety issue; undermines trust | Low | Pair content with Mia during Phase 1; add review checklist before launch |
| Performance on older iPhones (iPhone 12 is reference) | Inaccessibility for some users | Low | Performance budgets; testing on iPhone 12 hardware; optimize images and fonts |
| Offline caching issues (service worker bugs) | App appears to break offline | Medium | Thorough testing of service worker lifecycle; document cache invalidation strategy |
| Typography issues at 375px viewport | Text overlap, readability failure | Medium | Early responsive testing; use Tailwind breakpoints; test on real devices |
| Feature requests mid-Phase 1 | Scope creep; team distraction | Medium | Document Phase 2 clearly; establish what happens to requests (defer or decline) |
| Deployment issues to Vercel | App unreachable at launch | Low | Test deployment process multiple times before Phase 1 launch; document rollback |
| Browser compatibility (iOS 16 not supported, or specific Safari bugs) | App fails on target platform | Low | Test on real iOS 16 device early; use semantic HTML and standard CSS Grid |

---

## Success Criteria (Measurable)

### Phase 1 Success Criteria

1. **Availability:** App loads and is fully functional on iOS 16+ Safari (primary target).
2. **Performance:** First page load < 2 seconds on 4G, iPhone 12.
3. **Content completeness:** Morning and evening routines fully documented with full + hard-day versions.
4. **Navigation:** All content reachable within 3 taps from home view.
5. **Offline functionality:** App works 100% offline after initial install and cache population.
6. **Installation:** PWA is installable on iOS home screen and on Android (Android stretch goal).
7. **Type safety:** TypeScript strict mode enabled; no `any` types without explicit reason.
8. **Responsive design:** No horizontal scroll on 375px viewport; all text readable.
9. **Accessibility:** WCAG 2.1 AA compliance; color contrast ≥4.5:1; touch targets ≥44px.
10. **Documentation:** Code is commented; component purposes are clear; no tribal knowledge required to modify.

### Phase 1 Acceptance Checklist

- [ ] Home view displays current time block and upcoming blocks
- [ ] Morning Routine fully documented with full and hard-day versions
- [ ] Evening Routine fully documented with full and hard-day versions
- [ ] All seven key copy passages appear verbatim somewhere in app
- [ ] Navigation menu is accessible from every view
- [ ] PWA manifest.json is complete and valid
- [ ] Service worker pre-caches all assets and content
- [ ] App is fully functional offline
- [ ] No external API calls in Phase 1
- [ ] Responsive design tested on 375px, 390px, 430px viewports
- [ ] Color contrast passes automated audit
- [ ] Touch targets are all 44px+
- [ ] TypeScript strict mode enabled; no build warnings
- [ ] Deployment to Vercel is successful
- [ ] App is performant (Lighthouse score ≥90)

---

## Open Questions

1. **Mia's editing capability:** Should Mia be able to edit content in-app, or only by code changes?
   - *Answer (TBD):* Likely code-only for Phase 1; revisit in Phase 3 if need is clear.

2. **Notification for future phases:** Is there any scenario where alerts/reminders make sense in later phases?
   - *Answer (TBD):* Explicitly out of scope; re-evaluate if Mia requests it in Phase 2+.

3. **Third cat's name:** What is the third cat's name, and what are its specific care requirements?
   - *Answer (TBD):* Clarify with Mia before Phase 2 content work begins.

4. **"Field" section content:** What specifically belongs in the "Field" section (outside time, community, spirituality)?
   - *Answer (TBD):* Mia to provide content; likely includes hiking locations, bird watching notes, spirituality practices.

5. **Finance section scope:** Does the finance section include actual budget numbers, or just the structure and admin tasks?
   - *Answer (TBD):* Clarify whether to include sensitive financial data; if yes, ensure local-only and password-protected or plain-text only.

6. **Journaling in System section:** What format for journaling/reflection? Free text, prompts, or structured?
   - *Answer (TBD):* Defer to Phase 3; clarify with Mia on journaling preferences.

7. **Calendar source:** In Phase 4, what is the source of calendar data for dynamic content generation?
   - *Answer (TBD):* Likely iCal file or manual JSON; clarify integration points.

8. **Export/backup:** Should users be able to export their guide as JSON, Markdown, or PDF?
   - *Answer (TBD):* Defer to Phase 2; likely yes for portability, but format TBD.

---

## Appendix: Content Structure Example

```json
{
  "routines": {
    "morning": {
      "startTime": "07:30",
      "sections": [
        {
          "time": "07:30",
          "duration": 30,
          "title": "Grounding & Planning",
          "fullVersion": "Make coffee. Sit with journal. Read one passage. Plan today's three priorities. Ground into your body.",
          "hardDayVersion": "Make coffee. Sit. Breathe.",
          "why": "This is your protected time. No calls, no notifications, no obligations.",
          "tags": ["essential", "mental-health"]
        },
        {
          "time": "08:00",
          "duration": 5,
          "title": "Morning Skincare",
          "fullVersion": "Cleanser. Toner (if available). SPF 30+.",
          "hardDayVersion": "Cleanser + SPF. Done.",
          "why": "Protects skin and creates a small moment of care.",
          "tags": ["body-care"]
        }
      ]
    }
  }
}
```

---

## Appendix: Visual System Reference

| Token | Value | Use |
|-------|-------|-----|
| `--color-chrome` | #D4D0C8 | OS window background, inactive states |
| `--color-paper` | #F4F1EC | Content background, primary surface |
| `--color-ink` | #1A1917 | Text, primary foreground |
| `--color-forest` | #3D5C3A | Accents, highlights, focus states |
| `--font-heading` | JetBrains Mono | Section titles, UI labels, code |
| `--font-body` | Inter | Body text, paragraphs, descriptions |
| `--font-scale-h1` | 24px–28px | Page title |
| `--font-scale-h2` | 18px–20px | Section title |
| `--font-scale-body` | 16px | Standard body text |
| `--line-height-tight` | 1.3 | Headings |
| `--line-height-normal` | 1.6 | Body text |
| `--line-height-loose` | 1.8 | Accessible body text (hard mode) |

