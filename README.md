# life-guide-app

A private, mobile-first field guide built for one person. It is not a dashboard, not an assistant, not a system of record, not a tracker of any kind. It is a quiet reference surface that holds a life in paper-like shapes.

## Where to start

Every session reads these three files, in order, before touching anything else:

1. **[`COVENANT.md`](./COVENANT.md)** — the highest-precedence document in the repo. 11 sections, all authored by Mia, all load-bearing. Every change is measured against it. If a section is ambiguous, ask — do not infer. §10 contains a list of words that must never appear in source files.
2. **[`HANDOFF.md`](./HANDOFF.md)** — current phase status, decisions already made, and the scoped work for the next step. Read this for orientation on what's done and what's next.
3. **[`CLAUDE.md`](./CLAUDE.md)** — hard rules and read-order for every Claude Code session.

After those three, consult the "Priority reading list" section in `HANDOFF.md`.

## Status

- **Phase 0** — audit, archive, covenant, grounding content: complete.
- **Phase 1 Step 1** — visual baseline tokens + mechanical covenant-vocabulary test: complete.
- **Phase 1 Step 2** — guardrails file + Today (Anchor) surface: next.

See `HANDOFF.md` for the full phase plan and exit criteria.

## Stack

Next.js 14 App Router, Tailwind, Vitest, next-pwa. TypeScript strict. `@/*` maps to the repo root. `_archive/` is excluded from the build and from type-checking.

## Commands

```bash
npm run dev          # next dev
npm run build        # next build
npm run lint         # next lint
npm run test         # vitest run
npx vitest run path/to/file.test.ts   # single test file
```

## Hard rules (also in CLAUDE.md)

- Do not edit `COVENANT.md`. It is the one document Claude does not author.
- Do not generate entries in `content/mia.ts`. Mia authors, Claude scaffolds types.
- Do not restore anything from `_archive/`. The archived assistant, API routes, and Claude-authored design docs stay archived.
- Do not use any word from `COVENANT.md` §10's "Never use" list in source files. A vitest grep enforces this mechanically.
- Do not merge pull requests without Mia's explicit approval.

## What lives where

```
life-guide-app/
├── COVENANT.md              ← Mia-authored. The source of truth. Do not edit.
├── HANDOFF.md               ← Phase status, decisions, next step.
├── CLAUDE.md                ← Read-order and hard rules for every session.
├── README.md                ← This file.
│
├── app/                     ← Next.js App Router routes.
├── components/              ← React components (folders/, ui/, layout/, calendar/, culture/).
├── content/                 ← Grounding data. mia.ts is Mia-authored; others are typed structure.
├── context/                 ← React context providers (HardDayContext).
├── hooks/                   ← Versioned-localStorage hooks (useBudget, useFolderSystem, useHardDayMode).
├── lib/                     ← Small utilities (time, storage-keys).
├── tests/                   ← Vitest suites, including the covenant-vocabulary ratchet.
│
└── _archive/                ← Phase 0 audit residue. Do not promote back.
```
