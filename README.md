# life-guide-app

This repository contains the canonical project documentation and assets for a mobile-first Life Guide web application. It will be used by Claude Code as the starting point for planning and development.

**Claude Code: read the files in the `docs/` directory first before generating the implementation plan.**

---

## What This Is

A personal life system built for one specific person (Mia Jones, San Diego) with ADHD, depression, anxiety, and CPTSD. It is a mobile-first reference app — a digital handbook, not a productivity dashboard. The user should be able to open it, find what they need in under 10 seconds, close it, and go do the thing.

The underlying system is paper-first. Google Calendar handles time-anchored reminders. This app handles everything else: the daily rhythm, weekly structure, monthly cadence, project tracking, financial reminders, pet care, and creative work guidance.

---

## Repository Structure

```
life-guide-app/
│
├── README.md                    ← This file
│
├── docs/                        ← All canonical project documentation
│   ├── life-guide-v1.md         ← The complete Life Guide (v1, locked April 2026)
│   ├── calendar.md              ← The complete calendar system and all events
│   ├── design-direction.md      ← Visual aesthetic, typography, component direction
│   └── content-map.md           ← Content-to-interface mapping for each section
│
├── assets/
│   └── reference-images/        ← Reference images provided during design conversation
│       ├── IMG_5702.png         ← Reference image 1
│       ├── IMG_5704.png         ← Text conversation screenshot (content context)
│       └── IMG_5705.png         ← Text conversation screenshot (content context)
│
└── app/                         ← Application code (empty — Claude Code builds here)
    ├── components/              ← React/UI components
    ├── styles/                  ← CSS / Tailwind / styling
    └── content/                 ← Processed content files (JSON, parsed markdown, etc.)
```

---

## Documentation Reading Order

Claude Code should read the docs in this order:

1. **docs/life-guide-v1.md** — the full content of the life system. This is the source of truth for all text, schedules, reminders, and system logic.

2. **docs/calendar.md** — the complete calendar system. All recurring events, one-time events, color coding, and scheduling logic.

3. **docs/design-direction.md** — visual aesthetic, typography, color system, component inventory, technology suggestions.

4. **docs/content-map.md** — how the content maps to the interface. What goes in each section, what is always visible vs. collapsed, implementation notes.

5. **assets/reference-images/** — visual reference images. Review before making design decisions.

---

## Application Brief

**Type:** Mobile-first web application
**Primary use case:** Personal reference system — quick lookup, scan, close, act
**User:** One person (Mia Jones), San Diego, 92115
**Content:** Static — all content lives in the repository. No backend or database required for v1.

**Key principles:**
- Design for scanning, not reading
- Calm over stimulating
- Retreat-and-act, not engage-and-stay
- Paper-first philosophy — the app supports the paper system, not replaces it
- Tasks are modular (except cat meds, personal meds, and financial deadlines)

**Non-negotiables:**
- Cat medication alarms must be visually prominent
- Financial deadlines with hard dates must be accurate
- The modular task note must appear in Daily, Weekly, and Today views
- Color system must match the Google Calendar color system exactly
- Version must be visible: "Life Guide v1 — locked April 2026. Next review: May 1."

---

## For Claude Code

Your task is to:

1. Generate a PRD based on the documentation in `docs/`
2. Design the application architecture
3. Implement the application in `app/`
4. Perform QA/QC and debugging
5. Produce a deployment plan

Do not summarize or simplify the content from the docs. The content is intentional and specific. Preserve all information, all reminders, and all system logic as documented.

Start with the docs. The source of truth is in the markdown files, not this README.
