# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Read these first, every session, in this order

1. **`COVENANT.md`** — the highest-precedence document in the repo. 11 sections, all authored by Mia, all load-bearing. Every PR is measured against it. If a covenant section is ambiguous, ask Mia — do not infer. §10 ("Core Vocabulary") contains a list of words that must never appear in source files.
2. **`HANDOFF.md`** — current phase status, decisions already made, Phase 1 scope broken into four sequenced steps, hard don'ts, critical files to read first. Start here for orientation on what's done and what's next.
3. **`content/mia.ts`** — the grounding file. Real specimens, hard-day minimum, archetype system, terrain zones. Authored by Mia; Claude scaffolded types only. Do not add entries.

After those three, consult `HANDOFF.md`'s "Critical files to read first" section for the priority reading list.

## Hard rules for every session

- Do not edit `COVENANT.md`. It is the one document Claude does not author.
- Do not generate entries in `content/mia.ts`. Mia authors, Claude scaffolds types.
- Do not restore anything from `_archive/`. It is not Mia's voice and the assistant/API infrastructure stays out of Phase 1.
- Do not use any word from `COVENANT.md` §10's "Never use" list in source files.
- Do not merge PRs without Mia's explicit approval.
- Current working branch: `claude/merge-guide-systems-UxLng`. Phase 1 work branches from here.

## Commands

```bash
npm run dev          # next dev
npm run build        # next build
npm run lint         # next lint
npm run test         # vitest run
npx vitest run path/to/file.test.ts   # single test file
```

TypeScript strict, `@/*` → repo root, `_archive/` excluded from the build and from type-checking.
