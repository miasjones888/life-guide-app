import { redirect } from 'next/navigation';

/**
 * Phase 0 legacy — redirected to /today in Phase 1 Step 4. No Phase 1
 * surface owns the old cultural discovery idea; it drops back to /today
 * until a Phase 2 surface re-adopts it, if one ever does.
 */
export default function LegacyCulturePage() {
  redirect('/today');
}
