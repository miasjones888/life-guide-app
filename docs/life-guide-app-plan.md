# Life Guide Web App — Planning Document

| Field | Value |
|-------|-------|
| **Document title** | Life Guide Web App — Phase 1 Planning (PRN + Architecture) |
| **Status** | ✅ Draft Complete — Ready for Build |
| **Version** | 1.1 |
| **Author** | Claude (Cowork) |
| **Date created** | 2026-03-31 |
| **Last updated** | 2026-03-31 |
| **Reviewed by** | Mia — pending sign-off before Phase 1 build begins |
| **Next action** | Author review → approve → begin Phase 1 scaffold |

**Document scope:** This document covers pre-build planning only. It does not contain implementation code. Phases are defined here; build begins in a separate session after this document is approved.

---

# 1. Source Review + Reference Analysis

## Source Material Reviewed

**Primary sources:**
- `life guide` Notion page (created 2026-03-31 — currently empty, likely just initialized)
- `Creative Life Dashboard` (Notion) — weekly rhythm, morning/evening routines
- `The Life OS` (Notion) — full system architecture, feature list, development workflow
- Google Calendar — full daily/weekly recurring event structure, event descriptions, life system
- Memory files — user profile, domain knowledge, working preferences

**Reference images:** 11 images were provided. 9 are design references analyzed below. 2 were personal screenshots included accidentally (Tao of Clay order confirmation, iMessage thread with mom) and are excluded from design analysis.

---

## Reference Image Analysis

**Eleven images were provided. Nine are design references; two were personal screenshots included accidentally (a Tao of Clay order confirmation and an iMessage thread with mom). The design references break into four categories:**

### Category 1: Web1.0 / Net Art / Old Desktop (images 1, 2, 4, 5, 6)

These are the most important references and the most surprising. They establish the primary visual register:

**"DREAMS" (early web / geocities):** A 3D-beveled frame containing a photo of a Balinese temple floating in a hazy cloud background. Below it: the word DREAMS in ornate floral letterforms — each letter containing a different flower/botanical motif. Pure geocities / early web dream-space. The beveled frame is the key UI primitive: a frame as portal, nature-inside-a-container, the digital window as magic.

**AmigaOS 3.9 desktop:** Layered windows floating over a Yosemite Valley wallpaper — a media player, a CD player with green EQ bars, a grid of small pixel icons. The Amiga was a machine that felt like a world. Multiple windows overlapping, coexisting. Nature photography as background, system chrome as foreground. The frame-within-frame layering is the key structural idea.

**VDOLive Video Player (Japanese):** A Japanese-language OS window (ファイル/編集/表示/ヘルプ — File/Edit/View/Help) containing a low-resolution, deeply green, misty forest waterfall scene. Status bar reads "5 個のオブジェクト" (5 objects). This is the most direct reference: **nature photography contained inside system chrome, with Japanese UI text.** The window is a portal into an environment. The image quality is low-res, pixelated, intimate — not HD poster photography.

**Japanese Mac dialog — "plants are the only things that like you":** Classic Mac OS rounded dialog, gray. Japanese text: 植物はあなたを好きで唯一のものです。 / "plants are the only things that like you." Below: a 3×4 grid of individual potted plants, each slightly different. Buttons: オーケー (OK) / どんな (Whatever). This is **taxonomic net art** — the dialog box as philosophical statement, nature categorized and collected within a system frame. The grid of like objects is a direct UI pattern reference.

**Notepad + jungle wallpaper:** Windows Explorer window (月夜のあいこん♪ — Moonlight Icons) showing 12 items. Two Notepad windows open: one typing "a e s t h e t i c" spaced and repeated, another showing a 3D floating staircase render. Desktop wallpaper: lush tropical jungle with waterfall. The mundane (Notepad, Explorer) made poetic by the content inside it. "aesthetic" as the word typed into Notepad. The staircase: structure within nature. **The journaling section of the app should look like this: a Notepad window.**

**The unifying visual logic of Category 1:** System chrome (flat gray, beveled borders, title bars, menus) contains and frames organic/natural imagery and poetic content. The interface IS the art. The window is a portal. This is the dominant structural metaphor for the app.

### Category 2: RR1 Mood Boards (images 7 and 8 — Pinterest board screenshots)

Two dense Pinterest board screenshots from a board called "RR1." Key elements spotted:

- **Wearable tech editorial spreads** (early 2000s magazine — smartwatches, wearables): technological enthusiasm in print, objects as specimens
- **X-ray bird with circuit boards**: organic/mechanical hybrid — technology inside nature inside technology
- **"Spontaneous Arrangement"** — handwritten text overlaid on a nature photograph
- **Sundial/clock with numbers and writing** — time as a handwritten, imprecise, poetic thing
- **Raoul De Keyser archive spread** — bilingual (Dutch/French), dense text columns, archival catalog design. Extremely editorial.
- **Japanese character grid** (青/清/静/精 etc.) — kanji as visual pattern, characters as design elements
- **"Archive No. 001 — The Doors of Perception"** — minimal white catalog: title, white space, small taxonomy lines. Almost nothing on the page.
- **Keyboard keys with moss/plants growing in them** — technology being overtaken by nature
- **Takashi Homma filmography as text design** — just a list of film titles in small type, repeated in dense columns. List as texture.
- **Dutch Design Week "(In No Particular Order)"** — large bracketed typographic arrangement, Eindhoven
- **Net art home pages** — "hello, take a look around," personal sites with collaged elements
- **"Nature is there to be Loved"** — green forest photography with geometric triangle overlay, text overlay
- **Brain-as-browser image**: "I feel like my brain is a browser with 88 open tabs. Most of those tabs contain some green in them and very few of them bring value to my life."
- **Behance editorial designs**: one black-and-white abstract collage spread, one design portfolio
- **Old iMac G3 screenshots**, nature desktop photography

**The RR1 board reads as:** archival, systematic, nature-inside-technology, editorial density, poetic text treatment, the personal web, objects as specimens, typography as image. Everything here points to the same territory as Category 1.

### Category 3: Handwritten Interest Maps (images 9 and 10 — TikTok @daryas.journal)

Two slides of a hand-drawn mind map on cream/off-white paper: "Figuring Myself Out (Interest Map)." The map branches from the center to: Interests, Values, Personality, Strength, Inspirations, Joy, Strengths, Dreams. Handwritten in black ink with red annotations. Arrows, brackets, circled nodes.

**What this adds:** The handwritten, analog, imperfect quality — the sense that a document is alive and personal. This is not a reference for literal style (don't reproduce handwritten UI), but it confirms the *emotional register*: the app should feel like something made by hand and used daily, not designed by a studio for scale. The content of the map (interests, values, personality, joy, dreams) maps directly to the Life Guide's own categories.

---

## What the References, Taken Together, Tell Us

The throughline is unmistakable: **nature inside the machine.** Every key reference shows lush organic content (forest, waterfall, plants, birds, botany) framed by rigid system chrome (OS windows, dialog boxes, title bars, status bars). The tension between the two IS the aesthetic. It's not decorative — it's structural.

The other throughline: **the personal web as archive.** These are all images from a world before social media — when personal websites were hand-coded portals into someone's mind. They feel collectible, specific, earnest. They have taxonomy. They have wonder. They don't perform.

The Japanese computing references add another layer: **bilingual system UI** — kanji + Latin text in the same interface space. Even in an English app, this cross-system sensibility suggests: let the meta-data (times, labels, section numbers) be in a different typographic register than the content — almost like they're speaking a different language.

**Direct UI patterns extracted:**

1. **The window frame as primary container** — panels should feel like OS windows (title bar + content area), not rounded cards. Interpreted, not literal.
2. **Nature photography as background texture** — used at low opacity or as section-specific mood, not as decoration.
3. **The grid of like objects** — the plant dialog's 3×4 grid is the reference for: cat care cards, project cards, section index. Objects as a collection.
4. **The Notepad window** — the journaling/reflection field should literally feel like a text editor, not a journal app.
5. **Status bar text** — small metadata at bottom of panels ("5 個のオブジェクト" / "5 objects") — section labels, item counts, timestamps at the bottom edge of panels in mono type.
6. **The floral letterform** — one ornamental moment per section header as an accent. Not pervasive.

**What to avoid:**
- Full-retro kitsch (the Amiga aesthetic taken too literally becomes costume)
- Aggressive pixel art typography (works as accent, not primary)
- The RR1 board's density applied literally (the board is inspiration, not layout)
- The TikTok handwriting aesthetic (too current, wrong platform energy)
- The personal screenshot references (Tao of Clay, iMessage — irrelevant to design)

---

## What the Calendar Reveals About the Life System

The calendar is the most content-rich source. It has been built with care — events are written in second person, instructional, self-compassionate. They're not reminders; they're scripts. Each one reads like a note from a trusted friend who knows exactly where the friction is.

**The daily architecture:**

| Time | Event | Character |
|------|-------|-----------|
| 7:30am | Morning Routine | Protected, grounding. Coffee, journal, read, plan, no phone. |
| 8:00am | Morning Skincare | 2-step minimum always stated. Compassion baked in. |
| 9:00am | Cat Morning Meds | Maisie + Meeko (both female cats). Wet food breakfast by 10am. |
| 9:15am | Breakfast | "No appetite is okay — grab something small." Low demand. |
| 9:30am | AM Cat Playtime | 10–15 min, wand/laser/ball. Also grounding for Mia. |
| 10:00am | Deep Focus: Project Session | 90–120 min. One project. Phone down. |
| 12:30pm | Cat Midday Snack + Play | Maintenance + connection. |
| 1:00pm | Eaten today? | Explicit check-in, extremely low bar. |
| 2:00pm (flex) | Outside Time | Hiking / paddleboarding / birdwatching / long walk. Merlin app. |
| 5:30pm | Room Reset — 20 min | Timer-based, rotating phase system for unpacking/cleaning. |
| 6:30pm | Dinner | Low effort always offered. Delivery. Frozen. Shelf. |
| 7:00pm | Cat Brushing | Weekly. |
| 7:30pm | PM Cat Playtime + Shower check-in | Parallel care moments. |
| 9:00pm | Evening Routine starts | Cat meds, own meds, skincare, anchor task written, reading. |
| 9:30pm | Bedtime Meds | PRN anxiety meds accessibility noted. |
| 9:45pm | Night Skincare | 2-step minimum again. On a hard day: still valid. |
| 11:00pm | Lights Out | No TikTok/Instagram. Reading fine. |

**The weekly rhythm (Creative Life Dashboard):**

| Day | Focus |
|-----|-------|
| Monday | Portfolio work |
| Tuesday | Notion R&D web app, Life admin |
| Wednesday | Notion R&D web app, Portfolio work |
| Thursday | (buffer / life admin) |
| Friday | Systems work: digital garden, task board, creative curriculum |
| Saturday | Creative exploration: sculpting, moodboards, galleries, writing, films |
| Sunday | Life planning reset: taxes, finances, scheduling, moving research, therapy outreach |

**Recurring life structure:**
- **Daily:** self-care, cat care, meals, focus block, movement
- **Weekly:** Laundry, Room Reset cycles, Applied Buddhism & Meditation (Saturday optional), Sunday Self-Care Block, Cat Full Groom
- **Monthly:** Financial Review / Budget Hour, Cat Supply Check, Psychiatry appointment
- **Seasonal/occasional:** LA River Dance Party, Gratitude Group, birthday planning, Chicago travel

**Life domains present in the system:**
1. Self-care (morning/night skincare, sleep, meals, shower, movement, meditation)
2. Mental health (psychiatry, therapy outreach, bedtime meds, PRN anxiety meds)
3. Pet care — three cats (Maisie: Prozac; Meeko: meds; third cat). Playtime, grooming, brushing, supply reorder.
4. Creative work (Portfolio, Field Guide, Curriculum Tracker, Research, writing, painting, sculpting)
5. Home (room reset phases, laundry, unpacking)
6. Finance (credit card, budget hour, subscriptions audit, Petal card, Shop Pay)
7. Community / spiritual (Gratitude Group, Applied Buddhism class, LA River dance)
8. Nature / body (hiking, paddleboarding, birdwatching, Merlin app — described as "body + spirituality + feedstock in one block")

---

## Editorial and Visual Analysis

### What the content wants to feel like

The Life Guide is already a voice. The calendar entries read like field notes — precise, soft, non-punishing, written from a position of care rather than command. "On a hard day: just those two." "You don't have to cook. You just have to eat something." This is the emotional register of the whole system: structural scaffolding that knows when to loosen.

The visual system needs to hold that tension — **ordered but not rigid, soft but not vague, editorial but not cold**.

### Japanese editorial design: what to take

- **Modular page units** — pages composed of discrete, bounded information blocks, sometimes with visible grid lines or thin rules as structure
- **Radical negative space** — generous margins, text that breathes, content that doesn't fill every pixel
- **Quiet asymmetry** — the grid is there but it's deliberately off-center; one column heavier than the other; image and text in dialogue rather than parallel
- **Text as visual element** — size hierarchy used architecturally, not just for readability; a large number or label can anchor a whole spread
- **Color restraint** — a warm off-white, a single dark (near-black or ink blue), one muted accent used sparingly (botanical, dusty)
- **Thin lines and hairlines** — used as dividers, not decorative; structural
- **Page numbers, section indicators, running heads** — the meta-apparatus of a book, treated as design elements

### Dutch editorial design: what to take

- **Typography as architecture** — a word or heading can be enormous, spanning the viewport; it's grid-as-statement
- **Unexpected column breaks** — text doesn't always flow where you'd expect; grid logic visible but defied at key moments
- **Bold contrast moments** — high whitespace punctuated by a sudden full-bleed block of color or a very large type element
- **Systematic rule-breaking** — the rules are extremely rigid internally, which is precisely what makes the deviations feel intentional rather than chaotic
- **Use of tabular/numerical systems** — time tables, grids of information, classification systems rendered with aesthetic care

### What to leave behind

- Overcrowded pages with too many visual elements competing
- Decorative illustration or ornament (would feel precious, not useful)
- Parallax gimmicks or scroll-triggered spectacle (this isn't a portfolio site)
- Complex page-turn 3D animations (beautiful in demos, slow and disorienting in daily use)
- Dark mode as default (the content is warm and life-positive; dark mode works against that)
- Gradient backgrounds, blurs, glassmorphism (too 2023 Figma)

### Reference frameworks to draw from

- **Ryuichi Sakamoto: Playing the Piano 12122020** — stripped-back but deeply intentional; intervals, silence, spacing, one element at a time
- **Bijutsu Techo** (Japanese art magazine) — modular editorial grids, image/text layering, information density in service of contemplation not consumption
- **Karel Martens printed matter** — typographic experiments grounded in systematic grid; every rule broken is a rule followed somewhere else
- **Exhibition catalogues from Stedelijk, Tate, MoMA** — the catalogue format: section covers, text spreads, image pages, appendices, annotations
- **Field guides (Peterson, Sibley, etc.)** — tabular clarity, section logic, entry formats, tactile reference book DNA
- **Hobonichi Techo** (planner) — daily pages, tiny system, every day feels complete and bounded; the unit of the day as a collectible object

### Interaction metaphor

The app is a **field guide you open every morning**. On mobile, opening it feels like picking up a small book from your bedside table. The home screen is today's page. Swiping navigates sections like turning pages. Each section has its own visual character but belongs to the same system — the same fonts, same grid logic, same palette, different *mood* per section.

### Content triage: what's glanceable vs. deep

| Content | Format |
|---------|--------|
| Today's date + anchor task | GLANCEABLE — top of Today view, always visible |
| Daily routine blocks (morning/evening) | GLANCEABLE — timeline cards, tap to expand |
| Cat care schedule | GLANCEABLE — small status cards with emoji |
| Meals check-in | GLANCEABLE — minimal one-tap confirm |
| Medications | GLANCEABLE — fixed time reminders |
| Weekly rhythm | GLANCEABLE — current day highlighted in week row |
| Deep Focus project session | SEMI-DEEP — card with project context + "start focus" action |
| Finance / Budget Hour | DEEP — monthly section with checklist |
| Room Reset phases | SEMI-DEEP — checklist drawer |
| Writing / creative process | DEEP — dedicated section with project cards |
| Outside Time | GLANCEABLE — daily block with activity options |
| Community events | CALENDAR-DERIVED — surfaced when relevant |
| Monthly admin | DEEP — checklist page, accessed when needed |
| Reflections / system notes | DEEP — journaling interface |

---

# 2. PRN (Project Requirements Note)

## Project Name
**Field Guide to Yourself**
*(Working title. Alternatively: `life.guide`, `The Field Guide`, `Daily Practice`, `The System`)*

## Concept Summary

A mobile-first web app that is the digital artifact of Mia's personal life system — her routines, rhythm, care practices, creative process, and calendar structure — rendered as an interactive editorial field guide. It lives like a journal. It reads like a guidebook. It feels like a personal archive you move through, not a productivity tool you manage.

The app is not a task manager. It is not a calendar replacement. It is not a Notion view. It is the **felt experience of a life system** — the condensed, beautiful, portable version of everything she has built, made into something you want to open.

## Source of Truth

- Exact content from the finalized Life Guide / Creative Life Dashboard / Life OS (Notion)
- Google Calendar recurring event structure and event descriptions
- No synthetic or generic content; all copy comes from or is derived directly from the actual system

## Problem / Opportunity

Mia has built a comprehensive, deeply personal life system — daily routines, weekly rhythms, pet care, creative focus blocks, mental health scaffolding, finance admin, outside time, community anchors. It lives in Google Calendar and Notion but is scattered, hard to move through, and doesn't feel like it belongs to her aesthetically.

The opportunity: package this system into a single, beautiful, mobile-first web app that she *wants* to open every morning. Something that feels like the system she's built, rendered with the visual and poetic intelligence she brings to her creative work.

## User Experience Goals

- Open the app and immediately know what today holds
- Navigate to any section of the guide within 2 taps
- Check off morning/evening routine steps without friction
- See the week's rhythm at a glance
- Access the cat care system quickly and without having to remember anything
- Review finance/admin sections without dreading them
- Return to reflections and creative process notes the way you'd return to a well-worn notebook

## Emotional Goals

- The app should feel like something Mia built, not something handed to her
- It should feel calm, not urgent
- It should feel beautiful enough that opening it is a small pleasure
- It should not make her feel judged for incomplete tasks
- It should communicate: "everything is written down. you don't have to hold it all."
- The care built into the calendar entries should carry forward into the interface — the same voice, the same gentleness, the same pragmatic grace

## Visual Goals

- Feels like an editorial artifact: deliberate, composed, intentional
- Quiet Japanese/Dutch editorial influence: whitespace, grid, typographic hierarchy, negative space
- Sans-serif only. Editorial without being cold.
- One warm neutral palette with a single muted accent — off-white paper, near-black ink, one botanical color
- Mobile-first: everything is designed for 375px first
- Pages feel like spreads. Sections feel like chapters.

## Mobile-First Goals

- Zero friction to open and start using in under 5 seconds
- Today's schedule visible without scrolling
- Bottom navigation — thumb-reachable, always present
- Touch-friendly tap targets (minimum 44x44px)
- Fast: static or near-static, minimal JavaScript overhead
- PWA-capable: installable on iPhone home screen, feels native
- Works offline for guide content (cached)
- Calendar-derived content loads quickly

## Content Preservation Goals

- Every routine from the calendar and Life Guide must be represented exactly
- Cat care content must be complete — medications, schedule, grooming, supply checks
- Finance / admin section must include all the monthly recurring items
- Weekly rhythm from Creative Life Dashboard must be present
- No section reduced to generic placeholder text
- Deep sections accessible even if not surfaced on the main screen

## Interaction Model

- **Today view**: the default. A page. Today's date in large type. Current / next event surfaced. Quick-tap routine checklist. Minimal.
- **Guide navigation**: bottom tabs on mobile (Today | Guide | Week | You)
- **Section depth**: each guide section is a "chapter." Top-level page is glanceable; entries can be tapped to expand into full content.
- **Page motion**: sections slide in as new pages (horizontal swipe gesture, feel of turning pages), not as dropdown menus or accordion collapses.
- **Routine tracking**: tap to check off. Visual state change. No persistence required (resets daily).
- **No account system**: this is a personal artifact, not a multi-user app. No login, no auth, no sync.

## Functional Requirements

**Must have:**
- Today view with current date, active routine block, next event
- Morning Routine section: sequential steps with tap-to-check
- Evening Routine section: same
- Cat Care section: morning/evening meds, playtime, brushing, food schedule — per cat
- Weekly rhythm: day-of-week view with current day highlighted
- Deep Focus project block: projects listed with brief context, launch anchor
- Self-care section: skincare (AM/PM), shower check-in, meals, movement
- Finance section: monthly checklist (credit card, budget hour, subscriptions)
- Outside Time block: activity options surfaced in daily view
- Section for each: home (room reset, laundry), community/field, mental health scaffolding
- PWA manifest + service worker for offline access

**Nice to have (Phase 2+):**
- Gentle daily animation on page open (e.g., date reveal, progress on the day)
- Reading time / outside time tracking (tap to log, no database)
- Linkable sections for sharing with Dar or household use
- Light/warm color theme toggle
- Journaling field on the Reflection page (local storage only)

## Aesthetic Rules

1. No serif fonts. Ever.
2. Off-white (#F7F4EF or similar) as default background. Not pure white.
3. Near-black (#1A1917 or similar) as text/line color. Not pure black.
4. One accent — muted sage green (#8FA98A or similar dusty botanical). Used for active states, progress, current moment.
5. Thin hairlines (0.5–1px) as structural dividers, not decoration.
6. Generous margins (20–24px mobile sides, never less).
7. Type size range: 11px (meta/labels) → 40px+ (date display / section headers).
8. Emoji used exactly as in the calendar — they're part of the voice.
9. No shadows unless extremely subtle (0 2px 8px rgba(0,0,0,0.04) maximum).
10. Spacing is the design. When in doubt, add whitespace.

## Technical Direction

- Static or near-static rendering: all guide content is hardcoded JSON/TypeScript, not fetched from a CMS
- Calendar integration is display-only, not write-back
- Mobile-first CSS, Tailwind utility classes
- Framer Motion for all page transitions and micro-animations
- PWA via next-pwa or manual service worker

## Constraints

- No user authentication or database required
- No server costs: deploy to Vercel free tier
- All content must be exact, not generated or placeholder
- Must work on iPhone (Safari) as primary target
- No serif fonts under any circumstances

## Risks

- Calendar content is large — selective display logic needed to avoid overwhelming the daily view
- Content fidelity vs. layout: some calendar descriptions are very long; need a "full entry" pattern
- Ongoing maintenance: if the life system evolves, content files need to be updated manually
- Animation performance on low-end phones: Framer Motion needs careful throttling

## Success Criteria

- App opens on iPhone home screen, today's anchor and morning routine visible within 2 seconds
- Every section of the Life Guide is navigable and readable within 3 taps
- Cat care schedule is complete and accurate for all three cats
- Weekly rhythm view shows current day correctly
- Finance / admin monthly checklist is complete
- App feels like a field guide, not a productivity dashboard
- Design could plausibly appear in a design publication as an editorial web artifact

## Phased Build Approach

**Phase 1 — Core scaffold + Today view**
Content files → Today view → Bottom navigation → Morning/Evening routine sections → PWA manifest

**Phase 2 — Full Guide sections**
Cat care → Self-care → Focus blocks → Weekly rhythm → Finance → Home → Field/community

**Phase 3 — Polish + depth**
Animations → Expanded content entries → Reflection journaling → Typography refinement

**Phase 4 — Living system**
Calendar-derived dynamic content → Update workflow for guide content → Print-formatted sections

---

## Out of Scope

The following are explicitly not part of this build at any phase unless a separate decision is made:

- **User accounts, authentication, or multi-user access.** This is a personal tool. No login.
- **Server-side database.** All state is either static content files or client-side localStorage.
- **Calendar write-back.** The app reads the life system; it does not write to Google Calendar.
- **Push notifications.** This is not a reminder app. The calendar handles reminders.
- **Dark mode.** Explicitly excluded. The palette and emotional register are warm/light by design.
- **Real-time calendar sync.** Calendar-derived content is hardcoded from the current system; it does not live-query Google Calendar.
- **App Store distribution.** PWA on iPhone home screen is sufficient. No native app build.
- **Multi-platform parity.** iPhone Safari is primary. Android is incidental. Desktop is secondary.
- **Content management system or admin interface.** Content is edited directly in TypeScript files.
- **Streak tracking, habit scoring, or gamification.** The app does not measure or judge.
- **Social or sharing features.** Linkable sections are a stretch goal for Phase 2 only.

---

## Dependencies

**Runtime dependencies:**
- Node.js ≥20 LTS
- pnpm ≥8

**Target environments:**
- iOS 16+ / Safari 16+ (primary)
- Chrome 110+ on Android (secondary)
- Chrome/Firefox/Safari on macOS and Windows (desktop, secondary)
- No Internet Explorer support. No legacy browser polyfills.

**External services:**
- Vercel (deployment) — free tier, no account charge required
- Google Fonts CDN (fallback if `next/font` self-hosting fails) — or self-hosted subset

**No external API dependencies in Phase 1.** The app is fully self-contained. No Google Calendar API key, no Notion API key, no authentication credentials required.

**Hardware targets:**
- iPhone 12 and newer (the minimum spec for iOS 16 PWA support)
- Viewport: designed for 375px (iPhone SE) as minimum; tested up to 430px (iPhone 15 Pro Max)

---

## Open Questions + Decision Log

Resolved decisions are logged here to prevent re-litigating them during build.

| # | Question | Decision | Rationale |
|---|----------|----------|-----------|
| 1 | Should checklist state persist across sessions? | **No — ephemeral only.** Resets on new calendar day. | Removing friction from "starting fresh." No database needed. |
| 2 | Should the reflection field sync anywhere? | **No — localStorage only.** No backup, no sync. | Personal artifact. Local is intentional. |
| 3 | Does the app need dark mode? | **No.** Warm/light palette is load-bearing for the emotional register. | Explicitly excluded from scope (see above). |
| 4 | What is the third cat's name? | **Unknown — flagged for content review.** Currently listed as "the third cat" or by household context. | Content file placeholder; Mia to confirm during Phase 2 content build. |
| 5 | Should the app link to real external services (Merlin, Eventbrite, etc.)? | **External links are display-only.** No deep integration. URLs surface in content but are not tracked. | Simplicity and no dependency on external APIs. |
| 6 | Primary typeface: Space Grotesk vs. JetBrains Mono? | **JetBrains Mono as primary.** Space Grotesk removed entirely. | Reference images are decisive: mono/system type is the correct register. See §Fonts. |
| 7 | Should finance data ever connect to real accounts? | **No.** Finance section is a checklist and reminder system only. | Out of scope. No financial data is stored or transmitted. |
| 8 | PWA caching: which routes get offline support? | **All guide sections cached.** Today view loads static content offline; time-computed content degrades gracefully. | See §PWA Manifest Spec. |
| 9 | Package manager? | **pnpm.** Faster installs, strict dependency resolution, disk efficient. | Industry standard for Next.js projects at this scale. |
| 10 | Testing: when and what? | **Phase 2. Unit tests for schedule/date logic; component test for CheckItem.** No visual regression in Phase 1. | Core time logic (getActiveBlock) is the highest-stakes function; test it first. |

**Open (unresolved):**
- What is the third cat's name? → needs confirmation from Mia before Phase 2 cat care content build
- Should the weekly rhythm update when Mia's focus shifts? If yes, a simple content edit workflow (see §Content Update Workflow) covers this without requiring a CMS
- Does "Dar" need access to any section of the app? If yes, linkable sections (Phase 2 stretch) become higher priority

---

# 3. Recommended Stack

## Decision: Next.js + TypeScript + Tailwind + Framer Motion on Vercel

### Framework: Next.js 14 (App Router)

Next.js is the right call. Reasons:

- **Static site generation (SSG)** for all guide content — zero server required, blazing fast
- **App Router file system** maps cleanly to the guide section hierarchy
- **PWA support** via `next-pwa` or manual service worker registration
- **Image optimization** built in
- **TypeScript first-class** — content files as typed data
- **Vercel deployment** is trivial and free

Alternative considered: **Vite + React** would also work but loses the routing, SSG, and image optimization primitives. For a multi-section app with distinct pages, Next.js wins.

Alternative considered: **Astro** would be excellent for pure static content but Framer Motion integration requires extra steps and the React island model introduces friction for interactive components.

### Language: TypeScript

All content data files typed with interfaces. All components typed. No negotiation here — the content structure is complex enough that TypeScript pays off immediately.

### Styling: Tailwind CSS

- Mobile-first utility classes as the primary pattern
- Custom design tokens registered in `tailwind.config.ts` (colors, fonts, spacing)
- No separate CSS files for components — co-located utility classes
- `@layer base` for global typographic defaults
- Responsive: `sm:`, `md:` breakpoints used sparingly (mobile is primary, desktop is enhanced)

### Animation: Framer Motion

For page transitions (the journal-page-turning metaphor), card reveals, and micro-interactions. Key animations:

- `AnimatePresence` + `motion.div` for section-to-section navigation (horizontal slide, slight scale)
- `useAnimation` for routine step completion states
- `motion.div` with `initial/animate/exit` for card expansions
- Nothing that runs constantly or costs battery; all interactions are triggered

### Fonts

The reference images shifted the font decision significantly. The dominant typographic register in every reference is **monospaced system type** — not a designed sans-serif, but the functional precision of OS fonts and terminal type. This is reinterpreted, not reproduced literally.

- **Primary / headings / display:** JetBrains Mono (Google Fonts, variable weight) — mono with personality; used for all structural elements, section headers, times, dates, window titles, labels
- **Body:** Inter (Google Fonts, variable) — readable, neutral, humanist; for long descriptions, event content, instruction text
- Space Grotesk removed — doesn't fit the reference aesthetic
- All loaded via `next/font` for performance, with `font-display: swap`

### Content: TypeScript data files

All Life Guide and calendar content lives in `content/` as TypeScript objects with typed interfaces. This gives:
- Autocomplete and type safety when adding/editing content
- No CMS cost or latency
- Content can be diffed in git
- Export to other formats later if needed

### Deployment: Vercel

Free tier. Automatic deploys from main branch. Built-in analytics. Zero config for Next.js. PWA-capable. Edge network for fast loads globally.

### PWA: next-pwa

The app needs to install on iPhone home screen and work offline for guide content. `next-pwa` wraps Workbox and handles caching strategy. Service worker caches all static assets and content pages.

### Toolchain: ESLint + Prettier

- **ESLint:** `eslint-config-next` as base. Additional rule: no `console.log` in production. TypeScript-aware rules enabled.
- **Prettier:** single quotes, 2-space indent, trailing commas (ES5), print width 100.
- **Husky + lint-staged:** pre-commit hook runs lint and format check on staged files. Prevents malformed commits.
- **`pnpm lint` / `pnpm format`** available as dev scripts.

### Testing Strategy

Testing is minimal in Phase 1 and grows in Phase 2.

**Phase 1 — zero tests required to ship.** The app has no server logic. The highest-risk code is the schedule time logic (`getActiveBlock`, `getNextBlock`).

**Phase 2 — unit tests:**
- `lib/schedule.test.ts` — tests getActiveBlock() at every time boundary (before 7:30am, during morning routine, during focus session, after 11pm, edge cases)
- `lib/date.test.ts` — tests getDayLabel(), isToday(), getMondayOfWeek()
- `components/CheckItem.test.tsx` — tests tap-to-check interaction, state reset on new day

**Testing framework:** Vitest (fast, native ESM, compatible with Next.js App Router). Not Jest — Vitest is simpler to configure with Next.js 14 App Router.

**No visual regression testing in any phase.** The design is too intentional to benefit from automated screenshot diffing at this scale.

### Performance Budget

Targets measured on iPhone 12 on a mid-tier mobile connection (simulated 4G, 10 Mbps).

| Metric | Target | Rationale |
|--------|--------|-----------|
| First Contentful Paint (FCP) | < 1.2s | App is the first thing opened each morning; must feel instant |
| Largest Contentful Paint (LCP) | < 1.5s | Today view must render before the user expects interaction |
| Time to Interactive (TTI) | < 2.0s | Checklist must be tappable within 2 seconds of opening |
| Total JS bundle (initial) | < 150kb gzipped | Framer Motion adds ~30kb; rest is lean |
| Total CSS | < 20kb | Tailwind purged aggressively |
| Offline load time (cached) | < 0.5s | Cached pages should feel native |

**Optimization strategy:**
- All guide section pages are statically generated at build time (SSG) — zero server round-trips
- `next/font` loads fonts during build, not at runtime — no font FOUT
- Framer Motion: import only what's used (`motion/react` tree-shaking)
- No third-party analytics scripts in the initial bundle
- Images: `next/image` with `priority` on Today view header only

### Environment Variables

No environment variables are required for Phase 1 through Phase 3.

`.env.example` is committed as an empty file with a comment block:

```
# Life Guide — Environment Variables
# No environment variables are required for the current build.
# This file is a placeholder for future integrations (e.g., Google Calendar API).
```

If Google Calendar API integration is added in Phase 4, the following would be added:
```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
```

### Analytics and Telemetry

**Vercel Analytics** (privacy-first, aggregated, no cookies) is enabled by default on Vercel deployments and will be left active. It provides: page views, LCP, CLS, FCP.

**No third-party analytics.** No Google Analytics. No tracking pixels. No behavioral data collected. This is a personal tool; privacy is non-negotiable.

---

## Full Stack Summary

```
Next.js 14 (App Router, SSG)
TypeScript 5.x
Tailwind CSS 3.x (custom design tokens)
Framer Motion 11.x (page transitions + micro-animation)
JetBrains Mono + Inter (via next/font — Space Grotesk dropped, see §Fonts)
next-pwa 5.x (PWA / service worker via Workbox)
Vercel (deployment, free tier)
Node.js ≥20 LTS
pnpm (package manager)
ESLint + Prettier (linting + formatting)
```

---

# 4. Repository Structure

```
life-guide/
│
├── app/                                    # Next.js App Router
│   ├── layout.tsx                          # Root layout: fonts, metadata, PWA meta tags
│   ├── page.tsx                            # Today view (route: /)
│   ├── guide/
│   │   ├── page.tsx                        # Guide index — section list (route: /guide)
│   │   ├── routines/
│   │   │   └── page.tsx                    # Morning + Evening routines (/guide/routines)
│   │   ├── rhythm/
│   │   │   └── page.tsx                    # Weekly rhythm + daily structure (/guide/rhythm)
│   │   ├── focus/
│   │   │   └── page.tsx                    # Deep Focus: projects + creative session (/guide/focus)
│   │   ├── care/
│   │   │   └── page.tsx                    # Cat care system (/guide/care)
│   │   ├── body/
│   │   │   └── page.tsx                    # Self-care: meals, skincare, sleep, movement (/guide/body)
│   │   ├── home/
│   │   │   └── page.tsx                    # Room reset, laundry (/guide/home)
│   │   ├── finance/
│   │   │   └── page.tsx                    # Budget hour, monthly admin (/guide/finance)
│   │   ├── field/
│   │   │   └── page.tsx                    # Outside time, community, spirituality (/guide/field)
│   │   ├── health/
│   │   │   └── page.tsx                    # Mental health: meds, therapy, psychiatry (/guide/health)
│   │   └── system/
│   │       └── page.tsx                    # Weekly reset, monthly review, reflections (/guide/system)
│   ├── week/
│   │   └── page.tsx                        # Weekly rhythm view (route: /week)
│   ├── error.tsx                           # Global error boundary
│   ├── not-found.tsx                       # 404 page
│   └── globals.css                         # Tailwind base + global CSS overrides
│
├── components/
│   ├── layout/
│   │   ├── PageShell.tsx                   # Wrapper: safe areas, bottom nav slot, page padding
│   │   ├── BottomNav.tsx                   # Mobile bottom navigation (4 tabs)
│   │   ├── SectionHeader.tsx               # Chapter header: number (mono) + title + rule
│   │   └── JournalSpread.tsx               # Two-column desktop layout (activated at md:)
│   │
│   ├── today/
│   │   ├── TodayHeader.tsx                 # Date display (Display type), day theme
│   │   ├── ActiveBlock.tsx                 # Current or next schedule block
│   │   ├── RoutineChecklist.tsx            # Quick-tap morning/evening checklist
│   │   ├── DaySummary.tsx                  # Today's events in order, collapsed timeline
│   │   └── AnchorTask.tsx                  # Tomorrow's anchor task — editable, localStorage
│   │
│   ├── guide/
│   │   ├── SectionCard.tsx                 # Section entry card in guide index
│   │   ├── ContentEntry.tsx                # Expandable Window Panel (calendar event style)
│   │   ├── CheckItem.tsx                   # Tap-to-check list item
│   │   ├── TimeBlock.tsx                   # Time label + content row (Today timeline)
│   │   ├── WeekRow.tsx                     # 7-day rhythm, current day highlighted
│   │   ├── ProjectCard.tsx                 # Focus project card (title, context, status)
│   │   ├── CatCard.tsx                     # Per-cat card (name, meds, daily schedule)
│   │   ├── MonthlyChecklist.tsx            # Finance/admin monthly checklist panel
│   │   └── NotepadPanel.tsx                # Reflection journaling — Notepad-style textarea
│   │
│   └── ui/
│       ├── Typography.tsx                  # Typed variants: Display, H1, H2, Body, Micro
│       ├── WindowPanel.tsx                 # OS-window container: title bar + content + status bar
│       ├── Rule.tsx                        # Hairline divider (1px, horizontal or vertical)
│       ├── Tag.tsx                         # Small mono label pill
│       ├── Expandable.tsx                  # Framer Motion expand/collapse wrapper
│       ├── StatusBar.tsx                   # Bottom-of-panel status strip (item count, time)
│       └── VisuallyHidden.tsx              # Accessibility helper for screen reader text
│
├── content/                                # All Life Guide content — typed TypeScript data
│   ├── types.ts                            # Shared interfaces: RoutineStep, ScheduleBlock,
│   │                                       # Project, Cat, ChecklistItem, ContentSection
│   ├── daily/
│   │   ├── morning-routine.ts              # Morning routine steps (exact from calendar)
│   │   ├── evening-routine.ts              # Evening routine steps (both versions)
│   │   ├── schedule.ts                     # Full day schedule blocks with times + descriptions
│   │   └── check-ins.ts                   # Meals, shower, meds check-in prompt definitions
│   ├── weekly/
│   │   ├── rhythm.ts                       # Day-by-day focus themes
│   │   └── recurring-events.ts            # Weekly blocks: laundry, cat groom, self-care, etc.
│   ├── monthly/
│   │   ├── finance.ts                      # Budget hour, credit card, subscriptions
│   │   └── admin.ts                        # Cat supply, psychiatry, system review
│   ├── care/
│   │   ├── cats.ts                         # Three cats: meds, schedule, notes, supply
│   │   └── self-care.ts                   # Skincare routines, shower, sleep guidelines
│   ├── focus/
│   │   ├── projects.ts                     # Portfolio, Field Guide, Curriculum Tracker, Research
│   │   └── creative-session.ts            # Creative session options + prioritization principle
│   ├── field/
│   │   ├── outside-time.ts                # Activity options, Merlin app, framing
│   │   └── community.ts                   # Gratitude Group, dance party, Buddhism class
│   ├── home/
│   │   ├── room-reset.ts                   # Phase rotation system for room reset
│   │   └── laundry.ts                      # Minimum viable laundry action
│   ├── health/
│   │   └── mental-health.ts               # Meds, therapy outreach, psychiatry, PRN framing
│   └── system/
│       ├── weekly-reset.ts                 # Sunday reset checklist
│       └── monthly-review.ts              # Monthly review items
│
├── styles/
│   └── tokens.css                          # CSS custom properties (full token set)
│
├── hooks/
│   ├── useCurrentTime.ts                   # Current time, ticks every 60s
│   ├── useActiveBlock.ts                   # Computes current + next schedule block from time
│   ├── useDayOfWeek.ts                     # Current day index (0–6), updates at midnight
│   ├── useCheckList.ts                     # Ephemeral checklist state, resets on new calendar day
│   └── useLocalStorage.ts                  # Typed localStorage hook (AnchorTask, reflection)
│
├── lib/
│   ├── utils.ts                            # cn(), formatTime(), clamp()
│   ├── date.ts                             # isToday(), getDayLabel(), getMondayOfWeek()
│   └── schedule.ts                         # getActiveBlock(), getNextBlock() — core time logic
│
├── animations/
│   ├── variants.ts                         # All Framer Motion variant exports
│   ├── pageTransitions.ts                  # Page enter/exit (horizontal slide + micro-scale)
│   └── cardReveal.ts                       # Content entry expand animation
│
├── __tests__/                              # Test suite (Phase 2+)
│   ├── lib/
│   │   ├── schedule.test.ts                # Unit tests for getActiveBlock(), getNextBlock()
│   │   └── date.test.ts                    # Unit tests for date helpers
│   └── components/
│       └── CheckItem.test.tsx              # Component test for checklist interaction
│
├── public/
│   ├── icons/                              # PWA icons: icon-192.png, icon-512.png, apple-touch-icon.png
│   ├── manifest.json                       # PWA web app manifest (see §PWA Manifest Spec)
│   └── og-image.png                        # Open Graph image (1200×630) for link sharing
│
├── docs/
│   ├── PRN.md                              # This document
│   └── CONTENT-UPDATE-GUIDE.md            # How to update Life Guide content (see §Content Update Workflow)
│
├── .env.example                            # Empty — no environment variables required
│                                           # (placeholder for future calendar API integration)
├── .eslintrc.json                          # ESLint config (Next.js defaults + custom rules)
├── .prettierrc                             # Prettier: single quotes, 2-space indent, trailing comma
├── .gitignore
├── tailwind.config.ts                      # Design tokens, font families, custom utilities
├── next.config.ts                          # PWA plugin, image config
├── tsconfig.json                           # Strict mode enabled
├── pnpm-lock.yaml
├── package.json
├── README.md                               # Setup, dev commands, content update instructions
└── CHANGELOG.md                            # Version history
```

---

# 5. Layout + Design System

## Navigation Model

**Mobile (primary):**
Bottom tab bar — always visible, 4 tabs. Thumb-zone first.

```
[ 🌿 Today ]  [ 📖 Guide ]  [ 🗓 Week ]  [ · · · More ]
```

- **Today**: the daily page — date, active block, morning/evening checklist
- **Guide**: section index — list of all guide chapters
- **Week**: weekly rhythm view — 7-day horizontal scroll, current day
- **More**: access to finance, health, system, settings, reflection

Tab bar sits at the bottom, 56px tall, safe area respected. Active state: accent color dot + label weight shift. No icons that need labels to be understood — use emoji+label pairs consistently.

**Desktop (secondary):**
Left sidebar navigation expands into the `JournalSpread` layout — two-column like a book. Left column: navigation + metadata. Right column: content. Max width: 1100px, centered. The editorial book spread metaphor works naturally at desktop.

## Page / Spread Logic

Every section is a **chapter**. The visual language:
- Section pages open with a **chapter header**: section number (01, 02...) in small mono + section title in Display size + thin rule below
- Content follows in the editorial grid
- The "last page" of each section suggests the next section (soft footer with next chapter name)

Mobile pages are **full-viewport, scrollable**. The scroll is reading a page, not browsing a feed.

## Journal Progression / Page Turn Logic

Navigation between sections uses Framer Motion `AnimatePresence` with a **horizontal slide + micro-scale** variant:

```typescript
// Going forward (deeper into guide)
exit: { x: -40, opacity: 0, scale: 0.97 }
enter: { x: 40, opacity: 0, scale: 0.97 } → { x: 0, opacity: 1, scale: 1 }

// Going back
exit: { x: 40, opacity: 0 }
enter: { x: -40, opacity: 0 } → { x: 0, opacity: 1 }
```

Duration: 240ms, ease: `[0.32, 0.72, 0, 1]` (ease-out, slightly custom). Fast enough to feel snappy; slow enough to feel intentional.

Touch swipe left/right on section pages triggers section navigation. `useSwipeable` or native pointer events.

## Card / Panel / Window Systems

The references (AmigaOS, VDOLive, plant dialog, Notepad) establish the primary container as an **OS window**, not a card. The app interprets this — not literally (no pixel-perfect Windows 95 chrome) but structurally: panels have a **title bar area** (a narrow strip at the top with a label and optional close/expand control) and a **content area** below it. The title bar is the key differentiator.

**Four panel types:**

1. **Window Panel** — the primary container. A flat rectangle with: a narrow title bar strip (background: `--color-chrome`, text in `--color-ink`, mono font, 11px), below it the content area on `--color-paper`. A subtle 1px border on all sides: `--color-chrome-dark` at low opacity. No border radius, or radius: 2px maximum (system chrome is not rounded). This is the direct OS window interpretation. Used for: section cards, cat care cards, project cards.

2. **Time Block** — a bounded row with time label (mono, left, 10 chars wide) and content (right). Hairline top border. No title bar. Used in Today view timeline.

3. **Content Entry** — a tappable Window Panel that expands. Collapsed: title bar visible with event name + emoji. Expanded: content area reveals full calendar event description text. Framer Motion height animation.

4. **Checklist Item** — horizontal row within a Window Panel content area. Circular tap target left (40x40px), text right. When checked: forest green fill on circle + text in `--color-ink-muted`. Ephemeral state.

5. **Notepad Panel** — the journaling/reflection interface. Looks like an open text document. White background, monospaced font, blinking cursor. Title bar reads "reflection.txt" or today's date. No frills.

6. **Grid Panel** — the collection view (like the plant dialog). A Window Panel containing a 2-col or 3-col grid of object cards. Used for: projects, cat overview, section index.

**Status bar:** Every major panel has a status bar at the bottom — a thin strip (14px) with small mono text: item count, last updated, current status. Like "3 items · today" or "morning · 7:30 AM". This directly references the VDOLive "5 個のオブジェクト" and Amiga disk/file status displays.

## Editorial Layout Logic

**The grid (mobile):**
- Container: 100vw, padding 20px sides
- Single column, max content width 335px at 375px viewport
- Vertical rhythm: 8px unit. All spacing is multiples of 8.
- Sections separated by 48px gap (6 units)
- Sub-sections within a page: 32px gap
- Elements within a sub-section: 12–16px gap

**Type scale — revised for the reference aesthetic:**

The references strongly suggest mono or system-UI type as the primary voice, not a geometric humanist sans. The VDOLive player, the plant dialog, the Notepad window — all use system fonts or monospaced type as their primary register. The Life Guide's content (times, sequences, instructions) naturally suits mono's precision.

Decision: **JetBrains Mono as the primary typeface.** Inter as the supporting body face for long descriptions. Space Grotesk dropped — too clean, too 2024, wrong era.

```
Display   40px / 44px leading  —  JetBrains Mono 400  —  dates, section numbers, window titles
Heading1  24px / 30px leading  —  JetBrains Mono 700  —  section headers
Heading2  16px / 22px leading  —  JetBrains Mono 400  —  sub-section headers, labels
Body      15px / 23px leading  —  Inter 400            —  body text, calendar descriptions
BodySmall 13px / 19px leading  —  Inter 400            —  expanded notes, secondary info
Micro     11px / 14px leading  —  JetBrains Mono 400  —  status bar text, counts, timestamps
```

The combination of mono headings and humanist body gives the exact Japanese-computing register from the references: the system "speaks" in mono (structure, titles, times), the content "speaks" in humanist (descriptions, care instructions, notes).

**Asymmetry rule:** At least one layout element per section page sits outside the baseline column — either a time label that bleeds to the left edge, a section number that floats in the margin, or a large Display size heading that breaks the line measure intentionally.

## Mobile-First Layout Rules

- Every interactive element: minimum 44px tall, 44px wide
- Scrollable content: no horizontal scroll except the week row (intentional)
- Bottom nav safe area: `padding-bottom: env(safe-area-inset-bottom)` always
- No content within 20px of screen edge (except full-bleed section headers)
- Font sizes never below 14px in body copy
- Loading states: skeleton shimmer on Today view only (the one thing that might be dynamic)

## Desktop Secondary Behavior

Desktop is a **reading experience**, not a dashboard:
- Left sidebar (240px): nav + section list
- Right content area (max 700px): full section content
- Total max width: 1100px, centered
- `JournalSpread` component activates at `md:` (768px+)
- No bottom nav on desktop — sidebar nav instead
- The two-column spread on desktop: left column narrower, right column wider (ratio 3:7)

## Widget-Like Entry Experience

On iPhone home screen (PWA), the app should feel like:
- Opens directly to Today view
- Date is visible immediately, no loading spinner
- Current or next routine block surfaced at the top
- Morning checklist accessible with one scroll

This means:
- All Today view content is **static + client-computed** (current time from JS, no network request required)
- Full Today view renders in <200ms on device
- No splash screen, no onboarding
- PWA display mode: `standalone`, orientation: `portrait`

## Color Tokens

The references shift the palette from "warm editorial paper" toward "old OS system gray + nature green." The dominant colors in every reference image are: flat cool gray (system chrome), deep forest green (the nature imagery), and occasionally a muted warm neutral (the cream paper of the handwritten maps).

```css
/* System layer — the chrome */
--color-chrome:      #D4D0C8;   /* classic OS window chrome gray */
--color-chrome-dark: #808080;   /* title bar, border, shadow simulation */
--color-chrome-light:#F0EDE8;   /* interior of window / page background — warm gray */

/* Content layer — the paper inside the window */
--color-paper:       #F4F1EC;   /* slightly warm paper-gray, not pure white */
--color-ink:         #1A1917;   /* near-black for primary text */
--color-ink-muted:   #6B6760;   /* secondary text, metadata */
--color-ink-ghost:   rgba(26, 25, 23, 0.07); /* panel borders, hairlines */

/* Nature layer — the green inside the machine */
--color-forest:      #3D5C3A;   /* deep forest green, used for emphasis and current states */
--color-moss:        #7A9B76;   /* mid sage green, secondary accent */
--color-lichen:      #C8D9C6;   /* very pale green, fills and backgrounds */

/* System UI nostalgia accents */
--color-status-bar:  #C0C0C0;   /* status bar / window trim */
--color-title-text:  #FFFFFF;   /* white text on title bar (when active) */
```

**Palette logic:** The app oscillates between two registers — the flat gray of the OS container, and the warm paper of the page inside it. The green appears when something is alive (current time block, checked item, active section). Use the chrome colors for the window frame elements. Use paper for reading areas. Use green sparingly for state and presence.

## Motion Language

| Interaction | Motion | Duration |
|-------------|--------|----------|
| Page navigation | Horizontal slide + micro-scale | 240ms ease-out |
| Card expand | Height + opacity reveal | 180ms ease-out |
| Checklist check | Circle fill + strike-through | 120ms |
| Section header enter | Fade up (y: 12px → 0) | 200ms |
| Today view load | Staggered fade in (50ms delay per block) | — |
| Bottom nav tab switch | Icon scale pulse | 100ms |

Nothing runs on loop. No infinite animations. Motion is triggered by interaction only.

## Image Handling

No decorative imagery in the initial build. The design does all the work — typography, whitespace, grid. If images are added later (Phase 3: moodboards, cover art for sections), they go in:
- Section header covers: full-bleed, black and white or duotoned to match palette
- Cat care section: photos of the actual cats (optional, local upload)
- Field/outside section: a botanical or landscape photograph (muted, editorial)

Image display rules: `object-fit: cover`, never unconstrained, always a defined aspect ratio.

## Interaction States

| State | Visual |
|-------|--------|
| Default | Paper background, ink text, ghost borders |
| Hover (desktop) | Surface background on interactive elements |
| Active / pressed | Scale: 0.97, immediate |
| Checked (checklist) | Accent circle, ink-muted text |
| Current section (nav) | Accent dot, medium weight label |
| Expanded (entry) | Border-left: 2px solid accent |
| Disabled | ink-ghost color, no pointer events |

## Content Readability Rules

- Line length: 55–65 characters for body text on mobile (enforced by container width)
- No ALL CAPS except for Label/mono elements
- Calendar entry descriptions are preserved verbatim — their voice is the voice of the app
- Long descriptions get a "Read more" expand, not truncation with ellipsis
- Emoji from calendar events are kept — they're part of the information, not decoration
- Time always formatted as: `7:30 AM` (not 07:30, not 7:30am — consistent and readable)

## Breakpoints

All breakpoints are defined as Tailwind custom values in `tailwind.config.ts`.

| Token | Value | Description |
|-------|-------|-------------|
| `xs` | 375px | iPhone SE — minimum design target |
| `sm` | 390px | iPhone 14 / 15 — primary design target |
| `md` | 768px | Tablet / small desktop — JournalSpread activates |
| `lg` | 1100px | Desktop max content width cap |

**Mobile-first rule:** All base styles target 375px. Breakpoint modifiers (`sm:`, `md:`, `lg:`) add desktop enhancements only. No styles are desktop-first then overridden for mobile.

## Full Spacing Token Map

All spacing is on an 8px base unit. Tokens registered in `tailwind.config.ts` as `spacing` extensions.

| Token | px | Use |
|-------|----|-----|
| `space-1` | 4px | Inline gaps, icon padding |
| `space-2` | 8px | Base unit. Tight component gaps. |
| `space-3` | 12px | List item gaps, checklist rows |
| `space-4` | 16px | Standard component padding |
| `space-5` | 20px | Page side padding (mobile) |
| `space-6` | 24px | Sub-section gaps |
| `space-8` | 32px | Section-level vertical gaps |
| `space-10` | 40px | Large vertical gaps between major blocks |
| `space-12` | 48px | Between guide sections on a page |
| `space-16` | 64px | Full-section vertical separation |

## Z-index System

Layered window panels require a defined z-index stack. Registered in `tailwind.config.ts`.

| Layer | z-index | Component |
|-------|---------|-----------|
| `z-base` | 0 | All static content |
| `z-panel` | 10 | Floating window panels (expanded entries) |
| `z-overlay` | 20 | Full-screen section overlays (desktop: modal sections) |
| `z-bottomnav` | 30 | Bottom navigation bar — always above content |
| `z-systembar` | 40 | Any system-level UI (rare) |

The window-on-window layering from the Amiga reference is approximated on mobile by `z-panel` entries that cast a thin shadow beneath them when expanded.

## Accessibility Specification

Target: **WCAG 2.1 AA minimum.** Not AAA — but AA on all mandatory criteria.

**Color contrast:**
- Body text (`--color-ink` on `--color-paper`): contrast ratio ≥ 7:1 (exceeds AA)
- Secondary text (`--color-ink-muted` on `--color-paper`): contrast ratio ≥ 4.5:1 (AA)
- Active/checked state (`--color-forest` on `--color-lichen`): verify ≥ 3:1 for non-text (AA large)
- Chrome title bar text (white on `--color-chrome-dark`): verify ≥ 4.5:1

**Focus states:**
- All interactive elements receive a visible focus ring: `outline: 2px solid var(--color-forest); outline-offset: 2px`
- No `outline: none` anywhere without an explicit replacement
- Focus order follows DOM order (no CSS `order` that breaks reading sequence)
- Bottom nav is keyboard-navigable

**Touch targets:**
- Minimum 44×44px for all tap targets (Apple HIG and WCAG 2.5.5)
- Checklist circles: 40px visual, 48px hit area (padding extends touch target)

**Screen reader support:**
- All emoji wrapped in `<VisuallyHidden>` with `aria-label` description (e.g., 🌿 → "Morning Routine")
- `aria-checked` on checklist items
- `aria-expanded` on expandable entries
- Section headers use semantic `<h1>`, `<h2>`, `<h3>` — not styled divs
- Page titles set per route via Next.js `metadata` export

**Semantic HTML:**
- Checklists use `<ul>` + `<li>` + `<button>` (not divs)
- Navigation uses `<nav>` with `aria-label="Main navigation"`
- Today view uses `<main>` landmark
- Time values use `<time>` element with `dateTime` attribute

## Reduced Motion

All Framer Motion animations respect `prefers-reduced-motion: reduce`.

Implementation pattern:
```typescript
const shouldReduceMotion = useReducedMotion() // Framer Motion hook

const pageVariants = shouldReduceMotion
  ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
  : { initial: { x: 40, opacity: 0, scale: 0.97 }, animate: { x: 0, opacity: 1, scale: 1 }, exit: { x: -40, opacity: 0 } }
```

When reduced motion is preferred: all slide/scale animations fall back to opacity fade only. Checklist check animation becomes an immediate state change with no transition. No user needs to toggle this manually.

## Error States

The app has no server calls in Phase 1, so error states are minimal.

| Situation | Behavior |
|-----------|----------|
| localStorage unavailable (private mode) | AnchorTask and reflection field degrade gracefully to non-persistent mode. No error shown; functionality works for session only. |
| Time computation failure | `getActiveBlock()` returns null → Today view shows "—" in Active Block slot, no crash |
| Missing content field | TypeScript's strict mode prevents null content reaching the UI at compile time |
| 404 (unknown route) | `not-found.tsx` renders a minimal panel: "This page doesn't exist." + nav back to Today |

## Empty States

All sections have content (no real empty state risk). However:

| Situation | Display |
|-----------|---------|
| No anchor task set | AnchorTask field shows placeholder: "write tomorrow's first step" (faded, tappable) |
| Monthly checklist — all checked | Show a quiet confirmation: "✓ done for this month" in Micro type |
| Reflection field empty | Notepad Panel shows blinking cursor only, no placeholder text |

---

# 6. Content Architecture

## Mapping Life Guide + Calendar to App

Every section below maps directly to content already established in the guide and calendar. No invented content. No generic copy.

---

### TODAY VIEW (dynamic, home screen)

**Content source:** Calendar recurring events + client-side time computation

**What it shows:**
- Today's date in Display type (e.g., "Tuesday 31")
- Day of week's focus theme from weekly rhythm (e.g., "Portfolio Work + Life Admin")
- Current or next routine block (Active Block component — auto-computed from time)
- Morning routine checklist OR evening routine checklist depending on time of day
- A single "anchor" field: tomorrow's anchor task (editable, local storage)
- Outside time block if it's in today's schedule
- Any one-off calendar events surfaced for today (deadline reminders, appointments)

**Glanceable:** Yes. Entire today view visible with minimal scroll.

---

### GUIDE INDEX (static)

A list of all sections, each with:
- Section number (01–10)
- Section name
- One-line description
- Section emoji (from its character)

Sections in order:

```
01 Routines         Your morning and evening sequences
02 Rhythm           Weekly structure and daily pacing
03 Focus            Deep work, projects, and creative sessions
04 Care             The three cats: Maisie, Meeko, and the third
05 Body             Meals, skincare, sleep, movement
06 Home             Room reset, laundry, space management
07 Finance          Budget hour, credit cards, monthly admin
08 Field            Outside time, community, spirituality
09 Health           Medications, therapy, psychiatry
10 System           Weekly reset, monthly review, reflections
```

---

### 01 ROUTINES

**Content source:** Morning Routine and Evening Routine calendar events

**Morning Routine (7:30–9am)**
Exact sequence:
1. Make coffee
2. Journal
3. Read (before screens)
4. Plan the day
5. Ground yourself

Extended version (from alternate calendar entry):
1. Small notebook — morning pages, 20 min
2. 5-minute sit / meditation
3. Reading before screens (even 10 min)
4. Morning skincare (cleanser + SPF)
5. Cat morning meds
6. Eat something

*Note: Two versions exist in the calendar. Present both — "minimum" and "full" — as two modes the user can choose.*

**Evening Routine (9pm–11pm)**
Exact sequence:
1. Cat evening meds + dinner + litter (9pm)
2. Your bedtime meds (9:30pm)
3. Night skincare (cleanser + moisturiser)
4. Write tomorrow's anchor task in main notebook
5. Reading before sleep
6. No scrolling TikTok or Instagram after this point
7. Lights out by 11pm

**Creative Life Dashboard evening routine (secondary version):**
1. Brain offload: one thing progressed, one step for tomorrow, anything looping
2. Grounding exercise: 5-4-3-2-1 sensory reset
3. Gentle creative input: reading, film scene, reflection
4. Closing thought: everything for today is written down

**UI:** Two expandable subsections (Morning / Evening). Checklist mode on Today view. Full content accessible in Guide section.

---

### 02 RHYTHM

**Content source:** Creative Life Dashboard, calendar recurring events

**Weekly rhythm:**

| Day | Primary Focus |
|-----|--------------|
| Monday | Portfolio work |
| Tuesday | Notion R&D web app · Life admin |
| Wednesday | Notion R&D web app · Portfolio work |
| Thursday | Buffer / life admin |
| Friday | Systems work: digital garden, task board, creative curriculum |
| Saturday | Creative exploration: sculpting, moodboards, galleries, writing, films |
| Sunday | Life planning reset: taxes, finances, scheduling, moving research, therapy outreach |

**Weekly recurring events:**
- Laundry (as needed, priority: underwear → towels → everything else)
- Room Reset 20 min (daily, rotating phases)
- Applied Buddhism & Meditation (Saturday, optional — Fo Guang Shan Hsi Fang Temple)
- Sunday Self-Care Block (45–60 min: hair, nails, face mask, hair dye as needed)
- Cat Full Groom (Sunday: nails, teeth, ears, full brush-out)
- Sunday life planning reset

**Daily rhythm display:**
Timeline from 7:30am → 11pm, showing all recurring blocks. Current time marker. "What's next" surfaced.

---

### 03 FOCUS

**Content source:** Calendar "Deep Focus" events, Creative Life Dashboard, Life OS

**Deep Focus: Project Session (10am–12pm)**
- 90–120 minutes
- Phone down. Project folder open. Full attention.
- No email, no browsing, no switching
- Choose from: Portfolio / Field Guide / Curriculum Tracker / Research
- Anything that comes up → capture elsewhere, return

**Projects:**
1. **Portfolio** — primary professional goal; two years overdue; the build-out of a copywriting/creative direction portfolio
2. **Field Guide** — creative writing project (specific form to be defined)
3. **Curriculum Tracker** — creative technology skill-building curriculum
4. **Research** — currently includes Life OS research, interspecies communication, LifeOS documentation

**Deep Focus: Creative Session (flex)**
- 90 minutes
- Decide at the start, not in advance
- Choose one: writing / painting / sculpting / deep reading
- This is the deeper creative well; morning pages are maintenance, this is the real work

**Creative prioritization principle (from calendar):**
"Whichever project has the most traction or urgency this week — decided during Sunday setup."

**UI:** Cards per project with brief context. "Start Focus" action. Timer integration (Phase 2).

---

### 04 CARE

**Content source:** All cat-related calendar events

**The three cats:**
- **Maisie** — on Prozac (ongoing). Needs pet insurance added. Pet insurance reminder flagged.
- **Meeko** — on medications (dose twice daily). Monthly supply check.
- **Third cat** (Dar's or household) — no named medications but included in all care routines.

**Daily schedule:**

| Time | Task |
|------|------|
| 9:00am | Morning meds (Maisie + Meeko) |
| By 10am | Wet food breakfast for all three |
| 9:30am | AM Playtime (10–15 min): wand, laser, crinkle ball |
| 12:30pm | Midday snack + play (even 10 minutes counts) |
| 7:00pm | Cat Brushing (weekly, all three) |
| 7:30pm | PM Playtime (10–15 min): wind-down, burns energy |
| 9:00pm | Evening meds (Maisie + Meeko, second dose) |
| 9:00pm | Dry + wet food dinner for all three |
| 9:00pm | Scoop all litter boxes |

**Weekly:**
- Sunday: Full Groom (nails, teeth, ears, full brush-out — all three)

**Monthly:**
- Cat Supply Check: Meeko meds reorder? Maisie Prozac reorder? Treats? Supplements? Amazon subscriptions?
- Pet insurance: Add Maisie if not yet done

**Emergency protocols:**
- Solo Cat Duty (when Dar is away): all three cats fully under Mia's care. All morning/evening sequences still apply.
- Water fountain: check during PM playtime

**UI:** Per-cat card view. Medication status per cat. Daily schedule checklist. Supply check monthly section.

---

### 05 BODY

**Content source:** Calendar self-care events

**Meals:**
- Breakfast (9:15am): "No appetite is okay — grab something small from the shelf." Options: yogurt, fruit, nut butter + crackers, hard-boiled egg, anything grab-and-go.
- Lunch check-in (1pm): explicit "have you eaten?" — options that require zero effort (shelf, nuts, crackers, noodles, toast).
- Dinner (6:30pm): delivery, something from fridge, Trader Joe's frozen, shelf snacks. "You just need to eat something."

**Skincare:**
- AM: Cleanser + Moisturiser + SPF. On a hard day: just those two. Before phone if possible.
- PM: Cleanser + Moisturiser/night cream. On a hard day: just washing face + moisturiser counts.
- Pairs with: AM before going out, PM with bedtime meds.

**Shower:**
- Check-in (7:30pm): "Have you showered in the last 2 days?" Minimum viable: warm water, body wash, done. "That is the whole task."

**Sleep:**
- Target: 7–8 hours
- Lights out by 11pm
- No TikTok/Instagram after Evening Routine begins
- Reading is fine

**Movement:**
- Outside Time (flex, afternoon): hiking / paddleboarding / birdwatching / long walk. Non-negotiable on whether, flexible on which.
- Merlin app for birdwatching.
- Described as: "body + spirituality + feedstock in one block"

**Grounding:**
- 5-4-3-2-1 sensory reset (from evening routine: 5 things seen, 4 heard, 3 touched, 2 smelled, 1 tasted)
- 5-minute sit / meditation (morning, as part of full morning routine)

**UI:** Compassionate check-in cards. Low-demand interface. Tap to confirm. No streak tracking.

---

### 06 HOME

**Content source:** Room Reset and Laundry calendar events

**Room Reset — 20 min:**
Timer-based, one rotation per session. Phase system:

**Phase 1 — Surfaces + floor (repeat until clear):**
- One bag: trash and anything obviously disposable
- One bag: things that live somewhere else
- Stop when timer goes off. Not the task.

**Phase 2 — Boxes (after surfaces are clear):**
- Open one box
- Sort: keep, donate, trash, relocate
- Close the box if time runs out

**Phase 3 — Specific zones (rotate):**
- Bathroom
- Kitchen
- Desk/work area
- Wardrobe corner

**Laundry:**
Minimum viable action: gather what's on the floor or in the pile → put in machine → start it.
Priority order when pile is large: underwear + basics first, towels second, everything else third.
"You do not have to sort perfectly. You do not have to fold immediately. You just have to start a load."

**UI:** Rotating phase display. Timer cue. Simple checklist. Affirming copy preserved exactly.

---

### 07 FINANCE

**Content source:** Calendar financial events

**Monthly: Financial Review / Budget Hour (Sunday)**
Priority tasks (from calendar — exact copy):

**URGENT — DO FIRST:**
1. PETAL CARD: Payment didn't process. Log in and resolve. Check balance, minimum due, late fee.
2. SHOP PAY — TAO OF... : review outstanding balance.

**Standard monthly:**
- Pay credit card bill. Log in. Make payment. Don't defer.
- While in account: check for unrecognized/unused subscriptions. Note anything to cancel.
- Review Gap gift cards (~$125–150 from credit card points). Use them.
- Check Capital One Venture X for double charges or anomalies.

**Recurring monthly checklist:**
- [ ] Credit card paid
- [ ] Subscriptions reviewed
- [ ] Budget reviewed
- [ ] Petal card resolved
- [ ] Cat supply order placed
- [ ] Pet insurance (Maisie) — still pending?

**Tax reminder (standing):** Taxes are due soon — don't wait. (Surfaced on Today view through end of April.)

**UI:** Monthly checklist with reset date. Urgent items surfaced at top. Standing reminder in Today view during tax season.

---

### 08 FIELD

**Content source:** Outside Time, community events from calendar

**Outside Time:**
- Non-negotiable on *whether*, flexible on *which*
- Options: hiking / paddleboarding / birdwatching / long walk
- Merlin app for birdwatching (eBird / Cornell Lab)
- Described as: "body + spirituality + feedstock in one block. Don't plan it to death. Just go outside."

**Community:**
- **Gratitude Group — Slow Mornings for Fast Times:** Coffee + donuts in the park, soundbath meditation, group guided journaling + community sharing. 60–100 people. Free/donation-based, no RSVP. After-party park hang 11:30am–12:30pm with WeExploreEarth: pizza, games, SKETCHxLA art workshop. Bring: blanket, journal, open heart.
- **LA River Dance Party:** Ecstatic dance at the LA River at sunset. Disco, Boogie, New Wave, Funk/Soul, Rare Grooves, Classic House, Neo-Soul. Dry event. Complimentary N/A cocktails + iced tea. Location pin Sunday early afternoon. RSVP on Eventbrite (free).

**Spirituality:**
- **Applied Buddhism & Meditation Class (Saturday, optional):** Fo Guang Shan Hsi Fang Temple, with Chaplain Angélica Barrera-Ng. Topic + suggested reading arrives by email weekly from angelica@ibps.org. Curriculum: linked doc.

**UI:** This section is the most open/atmospheric. Outside Time displayed as a simple card with options. Community events listed as upcoming cards when relevant. Buddhism class shown if Saturday.

---

### 09 HEALTH

**Content source:** Medication events, mental health reminders, therapy notes from calendar

**Medications:**
- **Bedtime meds:** 9:30pm nightly. Part of evening routine.
- **PRN anxiety meds:** "Keep them somewhere physically accessible. Take when anxiety is interfering with function, not just present."
- **Morning meds** (if applicable): part of morning routine.

**Mental health:**
- **Therapy outreach:** Standing to-do on Sunday life planning. "Contact therapists — minimum viable action: pick the first name on the list, send one email or make one call."
- **Psychiatry appointment:** Schedule at regular interval. No appointment = flag.

**Framing used in interface (preserved from calendar):**
- No judgment on hard days
- PRN meds described in terms of function, not crisis
- Therapy framed as outreach, not emergency

**UI:** Medication reminders are part of the Evening Routine checklist. Health section in Guide provides context, not alarms. Psychiatry and therapy items surface in monthly system review.

---

### 10 SYSTEM

**Content source:** Sunday life planning reset, Creative Life Dashboard, Life OS workflow

**Weekly reset (Sunday):**
- Taxes and finances (Budget Hour)
- Scheduling (review upcoming week, set focus themes)
- Moving research (ongoing — relocation planning)
- Therapy outreach
- Sunday Self-Care Block
- Cat Full Groom
- Life planning: what's the anchor for the week?

**Monthly review:**
- Financial review complete?
- Cat supplies ordered?
- Psychiatry appointment scheduled?
- Any subscriptions to cancel?
- System update needed? (anything in the guide that needs changing)

**Reflections / System Updates:**
A simple text field (local storage) for notes like:
- "this routine isn't working because..."
- "the room reset phases are better done in the evening"
- "the Wednesday focus is too scattered"
No database. No sync. A notebook page inside the app.

**UI:** Sunday as the natural "system" day. System section surfaces the reset checklist on Sunday. Reflection field is persistent via localStorage. Simple, journaling-style interface.

---

## Content Fidelity Guarantee

The following exact copy from the calendar must be preserved verbatim in the app's content files, not paraphrased:

- "Protected time. No calls, no notifications, no obligations."
- "On a hard day: just those two. Done."
- "You don't have to cook. You just have to eat something."
- "body + spirituality + feedstock in one block. Don't plan it to death. Just go outside."
- "Non-negotiable on whether, flexible on which."
- "That is the whole task. Nothing else is required."
- "You just need to start a load."
- "Everything for today is written down."

These lines carry the emotional weight of the system. They are the difference between a productivity dashboard and a field guide to yourself.

---

# 7. PWA Manifest Specification + Caching Strategy

## manifest.json

```json
{
  "name": "Field Guide to Yourself",
  "short_name": "Field Guide",
  "description": "A personal life guide. Your routines, rhythm, and care system — in one place.",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#F4F1EC",
  "theme_color": "#D4D0C8",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
  ],
  "categories": ["lifestyle", "productivity"],
  "lang": "en-US"
}
```

`theme_color` matches `--color-chrome` so the iPhone status bar blends with the app on install. `background_color` matches `--color-paper` so the splash screen is warm rather than white.

## Caching Strategy (Workbox via next-pwa)

| Route / Asset | Strategy | Rationale |
|---------------|----------|-----------|
| All static assets (JS, CSS, fonts) | **Cache First** (stale-while-revalidate) | Never changes between deploys; serve from cache instantly |
| Guide section pages (`/guide/*`) | **Cache First** | Content is static; offline support required |
| Today view (`/`) | **Network First** with offline fallback | Prefers fresh render if online; falls back to cached version |
| Week view (`/week`) | **Cache First** | Static content, no network dependency |
| Google Fonts (if not self-hosted) | **Cache First** (long TTL) | Font files never change by URL |

**Offline behavior:**
- All guide sections work completely offline — they contain no dynamic data
- Today view works offline with the last-cached build; time computation is client-side JS
- If a network request fails and no cache exists (first load, offline) → show a minimal offline shell: "You're offline. Connect to load the guide."
- Service worker is registered on first load; subsequent loads are fully cached

**Cache invalidation:** Vercel automatically busts the cache on each deploy. `next-pwa` generates a unique cache version per build.

---

# 8. Risk Register

Full probability × impact × mitigation assessment.

| # | Risk | Probability | Impact | Mitigation |
|---|------|-------------|--------|-----------|
| 1 | **Content drift** — life system evolves but content files aren't updated, causing the app to feel stale | Medium | Medium | Content Update Workflow (§9) and CONTENT-UPDATE-GUIDE.md. Annual or quarterly review prompt in System section. |
| 2 | **Safari PWA limitations** — iOS Safari PWA support is inconsistent; some gestures or storage APIs may behave unexpectedly | Medium | Medium | Test on real iPhone before Phase 1 sign-off. localStorage is the only browser API used; it is Safari-supported. Service worker behaves correctly on iOS 16+. |
| 3 | **Third cat's name missing** — content file placeholder will require manual update | Low | Low | Flagged in Open Questions (#4). Content file uses `"name": "the third cat"` as placeholder with a `// TODO: confirm name` comment. |
| 4 | **Framer Motion performance on older iPhones** — animations may drop frames on iPhone 11 or earlier | Low | Medium | All animations use `transform` and `opacity` only (GPU-composited). `useReducedMotion` fallback removes animation entirely if needed. Test on iPhone 12 (minimum target). |
| 5 | **Finance section becomes outdated** — urgent items (Petal card, double charge) are time-specific and will be wrong within weeks | High | Low | Finance section is separated into "standing monthly" (permanent) and "one-time urgent" (removed after resolution). One-time items are commented out once resolved; they are not shown in the app by default. |
| 6 | **Content length in calendar descriptions** — some event descriptions are very long (Room Reset phase system, Solo Cat Duty) and will overflow collapsed card view | Medium | Low | Content Entry component has a defined `maxCollapsedHeight` (120px); content beyond this threshold gets a "Read more" expand. All descriptions preserved in full in the expanded state. |
| 7 | **next-pwa deprecation** — `next-pwa` is community-maintained and may fall behind Next.js App Router updates | Low | Medium | Alternative: implement service worker manually using `next/dist/compiled/@next/server` or switch to `@ducanh2912/next-pwa` (maintained fork). Monitor at build time. |
| 8 | **Node.js version mismatch** — developer environment running Node < 20 | Low | Low | `package.json` includes `"engines": { "node": ">=20" }`. pnpm enforces this at install time. |

---

# 9. Content Update Workflow

How to update the Life Guide content when the life system evolves (routines change, new projects added, cats update, etc.). This is documented in `docs/CONTENT-UPDATE-GUIDE.md`.

## Principles

- All content lives in `content/` as TypeScript files with typed interfaces
- Content is edited directly — no CMS, no admin UI
- TypeScript's type checker prevents malformed content from compiling
- A content change requires: edit file → `pnpm build` (verify no type errors) → push to main → Vercel auto-deploys

## Common Update Operations

**Add a new project to Focus section:**
```typescript
// content/focus/projects.ts
export const projects: Project[] = [
  // ... existing projects
  {
    id: "clay-curriculum",
    name: "Clay Curriculum",
    description: "Coiled Sculptures: Organicity & Clay. Tuesdays 6–8pm, May–June 2026.",
    status: "upcoming",
    startDate: "2026-05-19",
  }
]
```

**Update a routine step:**
Open `content/daily/morning-routine.ts`, edit the relevant `RoutineStep` object. The TypeScript interface ensures `id`, `emoji`, `label`, and `description` are all present.

**Update weekly rhythm:**
Open `content/weekly/rhythm.ts`, edit the day's `focus` string. Change takes effect on next deploy.

**Mark a finance item as resolved:**
Open `content/monthly/finance.ts`, set `status: "resolved"` on the item. It will be hidden from the active checklist but preserved in the data file for reference.

**Add a third cat name:**
Open `content/care/cats.ts`, update `name: "the third cat"` to the correct name.

## Update Cadence

| Event | Trigger for content update |
|-------|---------------------------|
| New project starts | Add to `content/focus/projects.ts` |
| Routine changes | Update `content/daily/morning-routine.ts` or `evening-routine.ts` |
| Weekly focus shifts | Update `content/weekly/rhythm.ts` |
| Finance item resolved | Set `status: "resolved"` in `content/monthly/finance.ts` |
| Cat medication changes | Update `content/care/cats.ts` |
| New community event | Add to `content/field/community.ts` |
| Life system reflection | Add note to `content/system/monthly-review.ts` |

---

# 10. Definition of Done — Per Phase

Each phase is complete when ALL of the following criteria are met.

## Phase 1 Complete When:

- [ ] `pnpm dev` runs without errors on Node 20
- [ ] `pnpm build` completes with zero TypeScript errors
- [ ] Today view renders on iPhone 12 (Safari): date visible, morning/evening routine checklist tappable, active block computed correctly
- [ ] Bottom navigation routes to all 4 tabs without error
- [ ] Morning routine section renders all steps, tap-to-check works, state resets on page reload (ephemeral)
- [ ] Evening routine section same
- [ ] `manifest.json` present and valid; app installs on iPhone home screen as PWA
- [ ] Service worker registered; guide pages load offline after first visit
- [ ] No console errors in Safari on iPhone
- [ ] Lighthouse PWA score ≥ 90 on mobile
- [ ] Lighthouse Performance score ≥ 85 on mobile
- [ ] WCAG: all interactive elements have visible focus rings; all emoji have aria-labels; headings in correct order

## Phase 2 Complete When:

- [ ] All 10 guide sections render with correct content (no placeholder text)
- [ ] Cat care section: all three cats shown, meds schedule accurate per day
- [ ] Finance section: monthly checklist renders with all items; resolved items hidden
- [ ] Weekly rhythm: current day highlighted on `/week` view
- [ ] Focus section: all four projects visible with correct descriptions
- [ ] Content update workflow tested: edit one content file → build succeeds → change visible in browser
- [ ] Unit tests written and passing for `lib/schedule.ts` and `lib/date.ts`
- [ ] `CONTENT-UPDATE-GUIDE.md` written and reviewed by Mia

## Phase 3 Complete When:

- [ ] All Framer Motion page transitions working without jank on iPhone 12
- [ ] Reduced motion fallback verified (System Settings > Accessibility > Reduce Motion on iPhone)
- [ ] NotepadPanel reflection field persists between sessions (localStorage)
- [ ] Reflection field works in private/incognito mode (graceful degradation to session-only)
- [ ] Typography refinement: type scale verified visually on 375px, 390px, 768px, 1100px
- [ ] Desktop JournalSpread layout working at 768px+
- [ ] Color contrast audit passed (all body text ≥ 4.5:1; interactive elements ≥ 3:1)
- [ ] Open Graph image present; link sharing shows correct preview

## Phase 4 Complete When:

- [ ] (Defined in a future planning document once Phase 3 is shipped)

---

*End of Planning Document v1.1*
*Status: Draft Complete — Ready for author review and build sign-off*
*Next action: Mia reviews → approves → Phase 1 build session begins*
