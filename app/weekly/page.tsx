import { redirect } from 'next/navigation';

/**
 * Phase 0 legacy — redirected to /today in Phase 1 Step 4. The weekly
 * review ritual sprouts back as part of /garden in Phase 2.
 */
export default function LegacyWeeklyPage() {
  redirect('/today');
}
