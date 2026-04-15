import { redirect } from 'next/navigation';

/**
 * Phase 0 legacy — redirected to /today in Phase 1 Step 4.
 */
export default function LegacyMonthlyPage() {
  redirect('/today');
}
