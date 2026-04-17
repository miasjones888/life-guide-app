import { describe, it, expect } from 'vitest';

// Pure-function date formatter copied here from a Phase 0 surface that
// has since been retired. Kept as a regression check on locale-formatting.
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

describe('formatDate', () => {
  it('formats a known ISO date correctly', () => {
    // 2024-01-15T00:00:00.000Z → "Jan 15, 2024" (UTC, may shift by locale)
    const result = formatDate('2024-01-15T12:00:00.000Z');
    expect(result).toMatch(/Jan/);
    expect(result).toMatch(/2024/);
  });

  it('includes the day number', () => {
    const result = formatDate('2025-07-04T12:00:00.000Z');
    expect(result).toMatch(/4/);
    expect(result).toMatch(/Jul/);
    expect(result).toMatch(/2025/);
  });

  it('formats Dec correctly', () => {
    const result = formatDate('2023-12-25T12:00:00.000Z');
    expect(result).toMatch(/Dec/);
    expect(result).toMatch(/25/);
    expect(result).toMatch(/2023/);
  });

  it('returns a non-empty string for any valid ISO string', () => {
    const result = formatDate(new Date().toISOString());
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
