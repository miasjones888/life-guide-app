# Phase 1 Scope: Field Guide to Yourself

**Document Version:** 1.0
**Status:** In Development
**Author:** Product Strategy Team
**Date:** March 2026
**Phase Timeline:** Phase 1 (Foundation & Today View)

---

## Phase 1 Objective

Deliver a minimal, fully functional mobile-first PWA that proves the core concept: a personal life system rendered as an interactive field guide, accessible, offline-capable, and mobile-optimized. Phase 1 focuses on the "moment of need" use cases: waking up on a hard day and needing to access the morning routine; evening routine before bed. By end of Phase 1, Mia will have a working tool that consolidates her two most critical routines into a single, trusted, offline-accessible app.

**Success:** Phase 1 launches with Today view, Morning Routine, Evening Routine, and PWA capability—everything needed to replace the current scattered calendar and notebook system for these two critical times of day.

---

## What Ships in Phase 1

### Core Features

1. **Home/Today View**
   - Displays current time block (e.g., "8:00am – Morning Skincare")
   - Shows next 3–5 upcoming time blocks for context
   - Time blocks are read-only, no interaction required
   - Large, readable typography optimized for 375px mobile viewport
   - Tap on any time block to see details (full description, notes)
   - Clear indication of current time relative to time blocks (e.g., "In 5 minutes" or "Now")

2. **Morning Routine Section**
   - Full version: Complete 7:30am–10:00am routine with all steps documented
   - Hard-day version: Minimum viable steps that still accomplish the core outcome
   - Each step includes: time, duration, action, why it matters
   - Explicit permission language (e.g., "On a hard day: just those two. Done.")
   - Cat medication timing integrated into routine
   - Breakfast step with permission for minimal effort ("No appetite is okay — grab something small.")
   - Cat playtime integrated
   - Scrollable, readable, no horizontal scroll

3. **Evening Routine Section**
   - Full version: Complete 9:00pm–11:00pm routine with all steps documented
   - Hard-day version: Minimum viable steps (at minimum, meds and lights out)
   - Each step includes: time, duration, action, why it matters
   - Cat medication and playtime integrated
   - Skincare step with hard-day alternative
   - Bedtime meds step with note about accessibility ("keep physically accessible")
   - Sleep protection explicit (no TikTok/Instagram)
   - Scrollable, readable, no horizontal scroll

4. **Navigation**
   - Simple navigation menu (likely bottom tab bar or top hamburger)
   - Home view is always accessible with one tap
   - Morning Routine accessible from home within 1 tap
   - Evening Routine accessible from home within 1 tap
   - Menu should show other sections as "coming soon" or simply not visible (defer to Phase 2)

5. **Progressive Web App Installation**
   - Manifest.json with app name, description, icons, colors
   - Service worker with cache-first strategy for all assets and content
   - Installable to iPhone home screen (iOS 16+)
   - Custom splash screen with app icon
   - App can be launched from home screen without Safari UI
   - Works entirely offline after installation

6. **Visual Design System**
   - Color tokens: chrome (#D4D0C8), paper (#F4F1EC), ink (#1A1917), forest (#3D5C3A)
   - Typography: JetBrains Mono for headings/UI, Inter for body
   - OS window chrome appearance (flat gray title bars, content areas, status bars)
   - No rounded cards, no serifs, minimal decoration
   - Responsive to 375px–430px mobile viewports
   - Touch-friendly hit targets (44px minimum)
   - Clear visual hierarchy

7. **Content Preservation**
   - All seven key copy passages appear verbatim in the app (somewhere, in context)
   - Cat names and basic care info are documented (Maisie on Prozac, Meeko on meds, third cat noted)
   - Medication timings are accurate
   - Voice and tone of Mia's original content is preserved

### Technical Implementation

1. **Next.js 14 Scaffold**
   - Static site generation (SSG) enabled
   - TypeScript 5, strict mode
   - Tailwind CSS 3 for styling
   - Entry point: `/pages/index.tsx` (home/today view)
   - Clear folder structure: `/pages`, `/components`, `/data`, `/styles`
   - ESLint + Prettier configured

2. **Data Structure**
   - All routine content stored as TypeScript constants or JSON files (not database)
   - No external API calls in Phase 1
   - Data structure must support:
     - Multiple versions of routines (full vs. hard-day)
     - Time blocks with descriptions and context
     - Cat care information
     - Why/context for each step
   - Easy to update content without touching code (optional for Phase 1; implement if possible)

3. **Service Worker & Offline**
   - `next-pwa` integrated for service worker generation
   - All routes and assets pre-cached on first load
   - App works 100% offline after initial visit
   - No network requests required for content reading
   - Cache busting strategy documented (re-evaluate for Phase 2)

4. **Responsive Design**
   - Mobile-first approach
   - Tested on 375px, 390px, 430px viewports
   - No horizontal scroll on any viewport
   - Typography scales smoothly (no jarring jumps)
   - Touch targets all 44px or larger
   - Readable line height (1.6+ for body text)

5. **Performance Targets**
   - Initial load: < 2 seconds on 4G
   - First Contentful Paint: < 1 second
   - Lighthouse score: ≥90
   - Bundle size: < 2MB total (code + assets + content)
   - No janky scrolling on iPhone 12 or older

6. **Accessibility**
   - WCAG 2.1 AA compliance
   - Color contrast ≥4.5:1 on all text
   - Semantic HTML (proper heading structure, button elements for interactive areas)
   - Keyboard navigation fully supported (focus visible, logical tab order)
   - Screen reader tested (basic support; enhance in Phase 2 if needed)
   - No motion that flashes or strobes
   - Readable on 375px viewport without zoom

### Build & Deployment

1. **Build Process**
   - `pnpm install` → `pnpm build` → `pnpm start`
   - Build time < 60 seconds
   - No errors or warnings (strict TypeScript, ESLint)
   - Output is static HTML/CSS/JS ready for CDN

2. **Deployment**
   - Deployed to Vercel
   - Automatic deployments on Git push to main branch
   - Environment variables managed (none needed for Phase 1)
   - Domain: TBD (e.g., `fieldguide.mia.dev` or similar)

3. **Documentation**
   - README.md with setup instructions (pnpm install, pnpm dev, pnpm build)
   - Architecture overview (file structure, data sources, component hierarchy)
   - Content updates guide (how to modify routines or time blocks)
   - Deployment guide (how to redeploy to Vercel)
   - Known limitations and Phase 2 preview

---

## What Does NOT Ship in Phase 1

### Explicitly Out of Scope

- **Other guide sections:** Care (full), Body, Home, Finance, Field, Health, System sections are NOT included in Phase 1. Navigation may reference them as "coming soon," but content is not implemented.
- **Complete cat care:** Only Maisie and Meeko are referenced in routines (medication timing in morning and evening). Full Care section comes in Phase 2.
- **Weekly rhythm:** Daily time blocks are listed, but the weekly structure (Monday = Portfolio, Tuesday = Admin, etc.) is not emphasized in Phase 1.
- **Dynamic content:** All content is static. There is no calendar parsing, no calculated "today is Wednesday," no automatic rhythm display.
- **Framer Motion animations:** No animated transitions in Phase 1. All state changes are instant or CSS-based. Framer Motion is deferred to Phase 3.
- **Journaling/reflection:** No journaling capture, no prompts, no reflection interface. System section is deferred to Phase 3.
- **Text editing in app:** No ability to modify routines within the app. Updates require code changes and redeploy.
- **Export/backup:** No ability to export guide as JSON, PDF, or Markdown. Data is only accessible within the app.
- **Dark mode:** Explicitly excluded. OS chrome is light; all text is dark. No dark mode toggle.
- **Sync across devices:** App is local-only. If Mia opens it on iPhone and iPad, they have independent offline caches. Cloud sync is out of scope forever (by design).
- **Database or backend:** No Supabase, Firebase, or any cloud service. All data is bundled with the app.
- **Authentication:** No login, no user accounts, no permissions. Single-user app.
- **Third-party integrations:** No calendar API, no Notion integration, no Slack, no external services.
- **Push notifications or reminders:** Explicitly out of scope; intentionally absent.
- **Streak tracking or gamification:** No metrics, no achievements, no social features.
- **Search functionality:** Content volume is small enough that search is not needed in Phase 1.

### Deferred to Phase 2+

- All ten guide sections (only Morning/Evening included in Phase 1)
- Cat Care section in full
- Body section (meals, skincare details, movement, sleep)
- Home section (room reset, laundry)
- Finance section (budget structure, admin checklist)
- Field section (outside time, community, spirituality)
- Health section (medications, therapy, psychiatry)
- System section (weekly reset, monthly review, reflections)
- Weekly rhythm display and progression
- Calculated/dynamic content based on calendar
- Advanced animations and transitions
- Journaling and reflection capture
- Typography refinement and polish

---

## Definition of Done (Phase 1 Acceptance Checklist)

### Feature Delivery

- [ ] Home/Today view is implemented and displays current time block + upcoming 3–5 blocks
- [ ] Morning Routine section is complete with full version and hard-day version
- [ ] Evening Routine section is complete with full version and hard-day version
- [ ] Each routine step includes: time, duration, title, description, hard-day alternative
- [ ] All seven key copy passages appear verbatim in the app:
  - [ ] "Protected time. No calls, no notifications, no obligations."
  - [ ] "On a hard day: just those two. Done."
  - [ ] "You don't have to cook. You just have to eat something."
  - [ ] "body + spirituality + feedstock in one block. Don't plan it to death. Just go outside."
  - [ ] "Non-negotiable on whether, flexible on which."
  - [ ] "That is the whole task. Nothing else is required."
  - [ ] "Everything for today is written down."
- [ ] Navigation menu is functional and accessible from every view
- [ ] Tap on a time block shows its full details (description, context, estimated duration)

### Technical Implementation

- [ ] Next.js 14 project scaffold with TypeScript 5 strict mode
- [ ] Tailwind CSS 3 configured and used for all styling
- [ ] All data stored as constants or JSON (not database)
- [ ] No external API calls for content reading
- [ ] Service worker configured via `next-pwa`
- [ ] Service worker pre-caches all assets and content
- [ ] App functions 100% offline after first visit and cache population
- [ ] Manifest.json is complete and valid
- [ ] App is installable on iOS 16+ home screen
- [ ] No TypeScript errors or warnings (strict mode enabled)
- [ ] No ESLint errors or warnings
- [ ] No console errors in browser DevTools

### Responsive Design & Accessibility

- [ ] Responsive design tested on 375px, 390px, and 430px viewports
- [ ] No horizontal scroll on any viewport
- [ ] All text is readable at smallest viewport (font size ≥16px minimum)
- [ ] Line height is ≥1.6 for body text (for readability)
- [ ] Color contrast ≥4.5:1 on all text (automated audit passes)
- [ ] All interactive elements (buttons, links) are 44px or larger
- [ ] Semantic HTML used throughout (proper heading structure, button elements)
- [ ] Keyboard navigation is fully functional (tab order is logical, focus is visible)
- [ ] No flashing or strobing content
- [ ] No animation that distracts from content

### Performance

- [ ] Initial load time < 2 seconds on 4G, iPhone 12
- [ ] First Contentful Paint < 1 second
- [ ] Lighthouse performance score ≥90
- [ ] Bundle size < 2MB (code + assets + content)
- [ ] Scroll performance is smooth (60fps, no jank)
- [ ] No layout shifts (Cumulative Layout Shift < 0.1)

### Content & Voice

- [ ] All routine content is accurate (timing, steps, cat meds)
- [ ] Cat names and basic medication info are correct
- [ ] Mia's original voice and tone are preserved (not simplified for tech)
- [ ] Hard-day versions are genuinely minimal and permission-based
- [ ] "Why" explanations are clear and supportive (not shame-based)

### Documentation & Maintainability

- [ ] README.md is complete with setup, build, and deployment instructions
- [ ] Architecture overview is documented (file structure, data sources)
- [ ] Component purposes are clear (JSDoc comments or file structure)
- [ ] Content update guide is provided (how to change routines)
- [ ] Deployment guide is provided (how to push to Vercel)
- [ ] Known limitations are documented
- [ ] Phase 2 preview is included (what comes next)

### Deployment & Operations

- [ ] Git repository is set up with meaningful commit history
- [ ] Main branch is protected (only merge from feature branches)
- [ ] Vercel deployment is configured with automatic builds on push
- [ ] Domain is live and app is accessible
- [ ] App can be installed to home screen on target device
- [ ] Offline functionality is tested (disable network, app still works)
- [ ] Service worker cache is cleared and refreshed on new deployment

### Testing & QA

- [ ] Manual testing on iPhone 12 (primary target) is complete
- [ ] Manual testing on iOS 16+ Safari is complete (at minimum iOS 16, 17)
- [ ] Manual testing on Android 10+ Chrome is complete (stretch goal)
- [ ] Offline functionality is tested on all target platforms
- [ ] Installation to home screen is tested on iOS and Android
- [ ] All interactive elements are tested on touch devices
- [ ] All content is proofread for accuracy and voice
- [ ] Accessibility audit passes (no automated failures)

### Sign-Off

- [ ] Product owner (or proxy) reviews and approves Phase 1
- [ ] Mia confirms that the app accurately represents her system
- [ ] Mia can install and use the app offline on her primary device
- [ ] No known critical issues or blockers remain

---

## Acceptance Criteria Summary

**Phase 1 is accepted when:**

1. The app launches and displays the Home/Today view on iOS 16+ Safari
2. Morning Routine and Evening Routine are fully documented with full + hard-day versions
3. All content is accurate (timing, cat meds, tone)
4. The app is installable on iPhone home screen as a PWA
5. The app works 100% offline after installation
6. Navigation is intuitive and reaches any section within 3 taps
7. Design is responsive to 375px viewport with no horizontal scroll
8. Performance is under 2 seconds initial load on 4G
9. Accessibility meets WCAG 2.1 AA standards
10. Code is clean, typed, and maintainable
11. Documentation is complete and clear
12. App is deployed to Vercel and accessible at the target domain

---

## Known Constraints and Blockers

### Technical Constraints

1. **Static content only:** All content is baked into the app at build time. Real-time sync or dynamic content generation is not possible in Phase 1.
2. **iOS-first, Android-secondary:** Primary testing target is iOS 16+ Safari. Android support is best-effort; iOS is the reference platform.
3. **No backend required:** This is intentional. Phase 1 proves the concept works as a pure PWA with zero server-side logic.
4. **No database:** Content updates require code changes and redeployment. This is acceptable for Phase 1; revisit in Phase 3 if friction is high.

### Content Constraints

1. **Cat information incomplete:** The third cat's name and specific care needs are not yet documented. This is noted; Phase 1 should include placeholder or defer full cat section to Phase 2.
2. **"Field" section undefined:** Content for the "Field" section (outside time, community, spirituality) is not yet written. Phase 2 will include this section.
3. **Finance and health sections undefined:** Specific content for Finance and Health sections is not yet detailed. Phase 2 will include these.

### Timeline & Resource Constraints

1. **Single implementer assumed:** These docs assume a single engineer building Phase 1. If team size changes, adjust timeline and collaboration structure.
2. **Design is prescriptive but not pixel-perfect:** The design brief is detailed, but Phase 1 can ship with functional (not refined) visual design. Typography and spacing polish are Phase 3 goals.

---

## Assumptions Made

1. **Mia will provide all content directly.** No user research interviews or iterative discovery needed; Mia's calendar and notes are the source of truth.

2. **iOS 16+ support is sufficient for Phase 1.** Android support is nice-to-have but not required for launch.

3. **No real-time sync is needed.** Mia owns one device (or multiple devices, but not sharing calendar sync across them). Manual updates are acceptable.

4. **Performance targets are achievable.** With next.js SSG and careful bundling, < 2 second load on 4G is feasible.

5. **No authentication needed.** This is Mia's personal app. Single-user, no accounts, no login required.

6. **The design system (colors, fonts, layout) is final.** We're not iterating on brand or visual direction; the system is documented and ready to implement.

7. **Mia will test on her own device.** No formal QA team; Mia will verify accuracy and usability on her iPhone.

8. **Vercel is the right hosting choice.** Next.js native platform; deploying there is straightforward and cost-effective.

---

## Phase 2 Preview

What comes immediately after Phase 1:

### Phase 2 Focus: Complete Content Coverage

- [ ] Implement all ten guide sections (full content for each)
- [ ] Care section with full cat information (all three cats, all meds, dietary needs)
- [ ] Body section (meals, skincare details, movement, sleep)
- [ ] Home section (room reset phases, laundry)
- [ ] Finance section (budget structure, credit card tracking, monthly admin)
- [ ] Field section (outside time activities, spirituality practices, community)
- [ ] Health section (medications, therapy schedule, psychiatry notes)
- [ ] System section (weekly reset structure, monthly review prompts)
- [ ] Weekly rhythm display (current day highlighted, each day's focus visible)
- [ ] Time blocks expanded with more context and flexibility notes

### Phase 2 Quality & Polish

- [ ] Typography refinement (sizing, weight, spacing for readability)
- [ ] Framer Motion micro-animations for section transitions and state changes
- [ ] Journaling/reflection capture interface (optional; depends on Mia's needs)
- [ ] Accessibility audit and fixes (screen reader testing, keyboard nav polish)
- [ ] Performance optimization (code splitting, image optimization)

### Phase 2 Estimated Work

- Content writing and organization: 40 hours
- Component implementation: 30 hours
- Testing and refinement: 20 hours
- **Total: ~90 hours**

### Timeline Estimate

- Phase 2 target: 4–6 weeks after Phase 1 launch
- Assumes part-time or flexible schedule (as per Mia's capacity)
- No fixed deadline; driven by Mia's availability and feedback

---

## Related Documents

- **product-brief.md** — Executive summary and vision
- **prd.md** — Full product requirements (goals, user stories, functional/non-functional requirements)
- **v1-scope.md** — This document. Phase 1 detailed scope and acceptance criteria.

---

## Approval Sign-Off (To Be Completed Before Phase 1 Start)

- [ ] Product owner approves scope
- [ ] Mia confirms all content is accurate
- [ ] Design system is locked in
- [ ] Technical architecture is approved
- [ ] Deployment infrastructure (Vercel) is ready

---

## Revision History

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0 | 2026-03-31 | Product Strategy Team | Initial draft |

---

## Appendix: Phase 1 Feature Wireframe (Text Description)

```
┌─────────────────────────────────────────┐
│ Field Guide to Yourself    ⚙️ Menu     │ ← Header with title and menu
├─────────────────────────────────────────┤
│                                         │
│  NOW: 8:00am – Morning Skincare        │ ← Current time block, prominent
│                                         │
│  Next:                                  │
│  • 9:00am – Cat Morning Meds           │ ← Upcoming blocks
│  • 9:15am – Breakfast                  │
│  • 9:30am – Cat Playtime               │
│  • 10:00am – Deep Focus                │
│                                         │
│  [Tap to see full routine]             │ ← CTA
│                                         │
├─────────────────────────────────────────┤
│ 🏠 Today  📖 Routines  ⚙️  Menu        │ ← Navigation (bottom tab bar or similar)
└─────────────────────────────────────────┘

─────────────────────────────────────────

[Routines Section]

┌─────────────────────────────────────────┐
│ Routines              < Back            │
├─────────────────────────────────────────┤
│                                         │
│ Morning Routine                         │ ← Section title
│ 7:30am – 10:00am                        │ ← Time range
│                                         │
│ [Full Version]  [Hard Day Version]     │ ← Toggle or tabs
│                                         │
│ 7:30am (30 min) — Grounding & Plan    │ ← Step with time and duration
│ Make coffee. Sit with journal. Read     │
│ one passage. Plan today's priorities.   │
│ Ground into your body.                  │
│                                         │
│ Why: Protected time. No calls, no      │
│ notifications, no obligations.          │
│                                         │
│ ─────────────────────────────────────  │ ← Divider
│                                         │
│ 8:00am (5 min) — Morning Skincare     │
│ Cleanser. SPF 30+.                     │
│                                         │
│ Hard Day: Just cleanser + SPF. Done.  │ ← Hard-day alternative
│                                         │
│ ─────────────────────────────────────  │
│ [More steps...]                         │
│                                         │
└─────────────────────────────────────────┘
```

---

End of Phase 1 Scope Document.
