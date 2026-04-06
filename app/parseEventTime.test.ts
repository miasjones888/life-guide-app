import { describe, it, expect } from 'vitest';

// Copied from app/page.tsx — tests the pure function in isolation
function parseEventTime(time: string): number {
  const match = time.match(/^(\d+):(\d+)(am|pm)$/i);
  if (!match) return 0;
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const meridiem = match[3].toLowerCase();
  if (meridiem === 'pm' && hours !== 12) hours += 12;
  if (meridiem === 'am' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

describe('parseEventTime', () => {
  it('12:00am → 0 (midnight)', () => {
    expect(parseEventTime('12:00am')).toBe(0);
  });

  it('12:30am → 30', () => {
    expect(parseEventTime('12:30am')).toBe(30);
  });

  it('12:00pm → 720 (noon)', () => {
    expect(parseEventTime('12:00pm')).toBe(720);
  });

  it('12:30pm → 750', () => {
    expect(parseEventTime('12:30pm')).toBe(750);
  });

  it('1:00am → 60', () => {
    expect(parseEventTime('1:00am')).toBe(60);
  });

  it('1:00pm → 780', () => {
    expect(parseEventTime('1:00pm')).toBe(780);
  });

  it('11:59pm → 1439', () => {
    expect(parseEventTime('11:59pm')).toBe(1439);
  });

  it('9:30am → 570', () => {
    expect(parseEventTime('9:30am')).toBe(570);
  });

  it('6:00pm → 1080', () => {
    expect(parseEventTime('6:00pm')).toBe(1080);
  });

  it('returns 0 for invalid input', () => {
    expect(parseEventTime('not-a-time')).toBe(0);
    expect(parseEventTime('')).toBe(0);
  });

  it('is case-insensitive (AM/PM)', () => {
    expect(parseEventTime('9:00AM')).toBe(parseEventTime('9:00am'));
    expect(parseEventTime('3:00PM')).toBe(parseEventTime('3:00pm'));
  });
});
