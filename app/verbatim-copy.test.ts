/**
 * Verbatim copy regression tests.
 *
 * These 7 phrases must appear EXACTLY as written, somewhere in the app.
 * If any test here fails, a protected passage has drifted — restore it before shipping.
 *
 * Source of truth: content/guide.ts → verbatimCopy
 */

import { describe, it, expect } from 'vitest';
import { verbatimCopy } from '@/content/guide';

describe('verbatimCopy — exact string assertions', () => {
  it('protectedTime matches exactly', () => {
    expect(verbatimCopy.protectedTime).toBe(
      'Protected time. No calls, no notifications, no obligations.'
    );
  });

  it('hardDay matches exactly', () => {
    expect(verbatimCopy.hardDay).toBe('On a hard day: just those two. Done.');
  });

  it('eatSomething matches exactly', () => {
    expect(verbatimCopy.eatSomething).toBe(
      "You don't have to cook. You just have to eat something."
    );
  });

  it('outsideTime matches exactly', () => {
    expect(verbatimCopy.outsideTime).toBe(
      "body + spirituality + feedstock in one block. Don't plan it to death. Just go outside."
    );
  });

  it('nonNegotiable matches exactly', () => {
    expect(verbatimCopy.nonNegotiable).toBe('Non-negotiable on whether, flexible on which.');
  });

  it('wholeTask matches exactly', () => {
    expect(verbatimCopy.wholeTask).toBe('That is the whole task. Nothing else is required.');
  });

  it('writtenDown matches exactly', () => {
    expect(verbatimCopy.writtenDown).toBe('Everything for today is written down.');
  });
});

describe('verbatimCopy — all 7 phrases present', () => {
  const required = [
    'Protected time. No calls, no notifications, no obligations.',
    'On a hard day: just those two. Done.',
    "You don't have to cook. You just have to eat something.",
    "body + spirituality + feedstock in one block. Don't plan it to death. Just go outside.",
    'Non-negotiable on whether, flexible on which.',
    'That is the whole task. Nothing else is required.',
    'Everything for today is written down.',
  ];

  it('has all 7 required phrases', () => {
    const values = Object.values(verbatimCopy);
    for (const phrase of required) {
      expect(values).toContain(phrase);
    }
  });

  it('has exactly 7 phrases (no accidental additions or removals)', () => {
    expect(Object.keys(verbatimCopy)).toHaveLength(7);
  });
});

describe('modularNote — exact string assertion', () => {
  it('appears with correct phrasing', async () => {
    const { modularNote } = await import('@/content/guide');
    expect(modularNote).toBe(
      'Tasks are modular. Everything except cat meds, your meds, and financial deadlines can be rescheduled.'
    );
  });
});
