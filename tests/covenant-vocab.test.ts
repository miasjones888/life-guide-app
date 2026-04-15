import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * COVENANT §10 — Core Vocabulary mechanical enforcement.
 *
 * Source files under app/, components/, hooks/, lib/, context/, content/
 * must not contain any word from the §10 "Never use" list. Mia's
 * vocabulary is load-bearing: every echo of the forbidden language
 * shapes how the app speaks back.
 *
 * If this test fires on a NEW file, the fix is not to allowlist it —
 * it is to choose different language. The allowlist below is a RATCHET:
 * every entry is a legacy file that will be rewritten or removed in a
 * later Phase 1 / Phase 2 step. As those steps land, entries disappear.
 * The end state is an empty allowlist plus the scan itself.
 *
 * Carve-outs come in three flavors, documented inline:
 *   1. Mia-authored grounding content. Her English; not surface copy.
 *   2. Legitimate external deadline per §10's parenthetical exception.
 *   3. Phase 0 legacy queued for rewrite in a later step.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const SCAN_DIRS = ['app', 'components', 'hooks', 'lib', 'context', 'content'] as const;
const EXTENSIONS = ['.ts', '.tsx'] as const;

const FORBIDDEN = [
  'overdue',
  'incomplete',
  'missed',
  'behind',
  'failed',
  'inactive',
  'abandoned',
  'todo',
  'task',
  'productivity',
  'streak',
  'score',
  'completion',
  'deadline',
] as const;

const ALLOWLIST = new Set<string>([
  // ── (1) Mia-authored grounding file ───────────────────────────────
  // CLAUDE.md: "Mia authors, Claude scaffolds types." Her own English.
  'content/mia.ts',

  // ── (2) External deadline context — §10 parenthetical exception ──
  // Real IRS / USPS deadlines live on the calendar and must say so.
  'content/calendar.ts',
]);

const FORBIDDEN_RE = new RegExp(`\\b(${FORBIDDEN.join('|')})\\b`, 'gi');

function walk(dir: string): string[] {
  const out: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry.startsWith('.') || entry === 'node_modules') continue;
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) {
      out.push(...walk(full));
    } else if (EXTENSIONS.some((ext) => entry.endsWith(ext))) {
      out.push(full);
    }
  }
  return out;
}

function toPosix(p: string): string {
  return p.split(sep).join('/');
}

interface Violation {
  readonly file: string;
  readonly word: string;
  readonly line: number;
  readonly text: string;
}

function collectViolations(): Violation[] {
  const found: Violation[] = [];
  for (const dir of SCAN_DIRS) {
    const files = walk(join(ROOT, dir));
    for (const file of files) {
      const rel = toPosix(relative(ROOT, file));
      if (ALLOWLIST.has(rel)) continue;
      const body = readFileSync(file, 'utf8');
      const lines = body.split('\n');
      for (let i = 0; i < lines.length; i += 1) {
        const text = lines[i];
        FORBIDDEN_RE.lastIndex = 0;
        const matches = text.matchAll(FORBIDDEN_RE);
        for (const m of matches) {
          found.push({ file: rel, word: m[0], line: i + 1, text: text.trim() });
        }
      }
    }
  }
  return found;
}

describe('COVENANT §10 — Core Vocabulary', () => {
  it('contains no forbidden words in source files', () => {
    const violations = collectViolations();
    if (violations.length > 0) {
      const preview = violations
        .slice(0, 25)
        .map((v) => `  ${v.file}:${v.line}  "${v.word}"  —  ${v.text.slice(0, 90)}`)
        .join('\n');
      const suffix =
        violations.length > 25 ? `\n  …and ${violations.length - 25} more.` : '';
      throw new Error(
        `COVENANT §10 violation: ${violations.length} match(es) in source files.\n` +
          `These words are not allowed in source. If the word belongs to a\n` +
          `legitimate external context (e.g. a real tax deadline), add the file\n` +
          `to the allowlist in this test with a comment explaining why.\n` +
          `Otherwise, choose different language.\n\n` +
          preview +
          suffix,
      );
    }
    expect(violations).toHaveLength(0);
  });

  it('allowlist contains no stale entries', () => {
    const stale: string[] = [];
    for (const rel of ALLOWLIST) {
      try {
        statSync(join(ROOT, rel));
      } catch {
        stale.push(rel);
      }
    }
    expect(stale, `Remove these entries from the allowlist — the files are gone:\n${stale.join('\n')}`).toHaveLength(0);
  });
});
