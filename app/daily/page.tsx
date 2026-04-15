import { redirect } from 'next/navigation';

/**
 * Phase 0 legacy — redirected to /today in Phase 1 Step 4. The daily
 * surface is gone; whatever it did is already held by /today's anchor,
 * hard-day minimum, and now/next/later strip.
 */
export default function LegacyDailyPage() {
  redirect('/today');
}
