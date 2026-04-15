# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Read these first, every session, in this order

1. **`COVENANT.md`** — the highest-precedence document in the repo. 11 sections, all authored by Mia, all load-bearing. Every change is measured against it. If a covenant section is ambiguous, ask Mia — do not infer. §10 ("Core Vocabulary") contains a list of words that must never appear in source files.
2. **`HANDOFF.md`** — current phase status, decisions already made, scoped work for the next step, hard don'ts, priority reading list. Start here for orientation on what's done and what's next.
3. **`CLAUDE.md`** — this file. The hard rules and command reference below apply to every session.
4. **`content/mia.ts`** — the grounding file. Real specimens, hard-day minimum, archetype system, terrain zones. Authored by Mia; Claude scaffolded types only. Do not add entries.

After those four, consult `HANDOFF.md`'s "Priority reading list" section.

## Hard rules for every session

- Do not edit `COVENANT.md`. It is the one document Claude does not author.
- Do not generate entries in `content/mia.ts`. Mia authors, Claude scaffolds types.
- Do not restore anything from `_archive/`. It is not Mia's voice and the assistant/API infrastructure stays out of Phase 1.
- Do not use any word from `COVENANT.md` §10's "Never use" list in source files. `tests/covenant-vocab.test.ts` enforces this mechanically.
- Do not merge pull requests without Mia's explicit approval.
- Do not add OpenAI / Anthropic / Google / Gemini keys, routes, or SDKs to Phase 1. The archive exists; leave it archived.

## Current state

- Phase 0 (audit + grounding): complete.
- Phase 1 Step 1 (visual baseline + covenant vocab test): complete.
- ANCHOR rename: complete.
- Phase 1 Step 2 (guardrails + Today Anchor surface): complete (PR #27 + #28 hotfix merged).
- Phase 1 Step 3 (journal drawer): complete (PR #30 merged).
- Phase 1 Step 4 (nav cleanup + placeholders + `/settings` escape hatch): complete (PR #32 + #33 follow-up merged).
- **Phase 1 is complete. Phase 2 Step 1 (Garden surface — read-only render of `content/mia.ts` specimens with a deterministic forest scatter layout) is next.** See `HANDOFF.md` for the scoped plan. COVENANT §6 is the spec for this step.

`main` is the source of truth. Branch Phase 2 Step 1 work directly from `main`.

## Commands

```bash
npm run dev          # next dev
npm run build        # next build
npm run lint         # next lint
npm run test         # vitest run
npx vitest run path/to/file.test.ts   # single test file
```

TypeScript strict, `@/*` → repo root, `_archive/` excluded from the build and from type-checking.
