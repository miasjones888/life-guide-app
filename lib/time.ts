/**
 * Parse a time string like "9:00am" or "11:30pm" into minutes since midnight.
 * Returns 0 if the string doesn't match the expected format.
 */
export function parseEventTime(time: string): number {
  const match = time.match(/^(\d+):(\d+)(am|pm)$/i);
  if (!match) return 0;
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const meridiem = match[3].toLowerCase();
  if (meridiem === 'pm' && hours !== 12) hours += 12;
  if (meridiem === 'am' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}
