# Product Brief: Field Guide to Yourself

**Document Version:** 1.0
**Status:** In Development (Phase 1)
**Date:** March 2026
**Author:** Product Strategy Team

---

## Product Name & Tagline

**Field Guide to Yourself**

*A mobile-first personal life guide. It lives like a journal. It reads like a guidebook.*

---

## What It Is

Field Guide to Yourself is a mobile-first progressive web app (PWA) that renders Mia's personal life system as an interactive, editorial field guide. The app contains ten interconnected guide sections covering daily routines, weekly rhythm, creative focus, care practices, nutrition, home maintenance, finance, outdoor time, health management, and system reflection. It functions as both a living reference document and a friction-reducing tool for task initiation, designed specifically for someone with depression, anxiety, CPTSD, and ADHD. The app prioritizes accessible structure over productivity gamification, with a visual register that brings nature and organic content into a simple OS window chrome interface.

---

## Who It's For

**Mia.** A writer, copywriter, and creative director with complex mental health needs (depression, anxiety, CPTSD, ADHD). She has significant task initiation difficulty and needs a life system that reduces friction rather than demanding compliance. She lives with her partner Dar and three cats (Maisie, Meeko, and a third). She works across multiple creative projects and needs clear structure to distinguish deep work time from care time. She benefits from written routines, explicit permission to do the minimum, and a system that acknowledges good days and hard days equally. She owns her own schedule and needs a digital artifact that feels as thoughtful and intentional as her analog life practices.

---

## The Problem It Solves

Mia has built a comprehensive life system across notebooks, calendar entries, and Notion databases—but no single tool brings it together as a coherent, accessible reference. Productivity apps force competitive gamification and streak tracking. Task managers demand frequent input and create pressure. Calendar apps separate time blocks from the *why* behind them. The current system is scattered, making it hard to:

- Quickly access her morning routine on a hard day
- Understand her weekly rhythm at a glance
- Remember which cats need which medications when
- Reduce decision fatigue around meals, skincare, and rest
- Feel the intentionality of her life structure reflected in the tool she uses

A dedicated field guide app consolidates her system into one place, reduces friction, and treats her life structure as a designed artifact worthy of care—not a productivity metric.

---

## The Opportunity

The market treats personal life systems as either productivity dashboards (quantified, competitive, exhausting) or journaling apps (reflective but disconnected from action). There is no app that treats a life system as an editorial, referential document—a genuine field guide for living. This app serves as a proof of concept that life software can be humane, beautiful, and specific enough to be personally indispensable without being commercially extractive. For Mia specifically, it unlocks the ability to keep her entire life system in one place, accessible offline, that she can trust not to change without her consent.

---

## Key Experience Principles

- **Reduce friction, not demand compliance.** The app should make the path of least resistance the right path. No reminders, no notifications, no shame for doing the minimum.
- **Treat content as sacred.** Every word in this guide is intentional. The app preserves verbatim copy and respects the editorial voice of Mia's life system.
- **Mobile-first, offline-first.** Design for the phone, the moment of need, and the reality that broadband is not always available. PWA enables full functionality without installation friction.
- **Editorial, not metric.** This is a field guide, not a dashboard. Reading it should feel like consulting a trusted reference, not checking a score.
- **Accessible design for neurodivergence.** Clear structure, minimal cognitive overhead, explicit permission for smaller/hard versions of tasks, no visual noise.
- **Nature inside the machine.** OS window chrome and functional typography create a border between Mia and her system. Organic color palette and natural language keep the content grounded.
- **Everything is written down.** The app documents the system so completely that Mia can trust it, reference it, and not carry the whole thing in her head.

---

## What It Is NOT

- **Not a productivity dashboard.** No daily metrics, no progress bars, no gamification, no streaks.
- **Not a task manager.** No due dates, no drag-and-drop, no backlog refinement, no project prioritization interface.
- **Not a Notion clone.** No database views, no relational data, no template library, no granular permissions.
- **Not a social app.** No sharing, no community, no following, no sync across devices.
- **Not a habit tracker.** No check-boxes to tick off, no "you're on fire" notifications, no accountability mechanics.
- **Not a calendar replacement.** No write-back to external calendars, no invite management, no meeting coordination.
- **Not a meal-planning app, a meditation app, a fitness app, or a financial tool.** It *references* these areas of life but does not attempt to be comprehensive in any single domain.

---

## Success Looks Like

- **Speed of access:** Morning routine is visible and complete within 2 seconds of opening the app.
- **Navigability:** Any of the ten guide sections is reachable within 3 taps from the home view.
- **Accuracy of care routines:** All cat medications, timings, and special dietary needs are documented correctly and easy to reference.
- **Clarity of rhythm:** The current day of the week and weekly focus area are always visible and contextual.
- **Emotional register:** Using the app feels like consulting a thoughtful field guide written by someone who knows Mia's life, not interacting with an automated system.
- **Offline sufficiency:** The app is fully functional offline; Mia never waits for a network request to view her routines.

---

## Build Approach

The app is being built in phases:

**Phase 1: Foundation & Today View**
Scaffold the Next.js application, establish visual system and navigation, deliver the Today view (current time block + upcoming time blocks), implement Morning and Evening routines, set up PWA installation capability. Phase 1 is proof-of-concept that the core idea works on mobile within the constraints.

**Phase 2: Complete Content Coverage**
Add all ten guide sections with full content from Mia's life calendar. Implement section navigation, subsection organization, and the editorial flow for each area (Routines, Rhythm, Focus, Care, Body, Home, Finance, Field, Health, System).

**Phase 3: Polish & Reflection**
Refine typography and spacing, add Framer Motion micro-animations for state transitions, implement journaling and reflection capture within the System section, validate mobile readability and accessibility.

**Phase 4: Dynamic Content & Living System**
Parse calendar structure to generate dynamic time blocks, implement weekly rhythm progression, add calculated content (e.g., "today is Wednesday; your focus is Portfolio work"), enable future expansion without app rebuild.

---

## Current Status

**Phase 1 in development.** Foundation established. Designing Today view and routine sections.

---

## Deliverables

- Mobile-first PWA built in Next.js 14 / TypeScript 5
- Installable on iOS 16+ (Safari) and Android 10+
- Offline-capable with service worker
- Minimum viable iPhone 12 (375px–430px viewport)
- Deployable to Vercel
- Zero external dependencies for core content (local data, no API calls for reading)
