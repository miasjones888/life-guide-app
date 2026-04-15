import { redirect } from 'next/navigation';

/**
 * Phase 0 legacy — redirected to /notes in Phase 1 Step 4. Freeform
 * writing lives in the journal drawer now; the /notes surface will
 * absorb any remaining structured reflection in Phase 2.
 */
export default function LegacyReflectionPage() {
  redirect('/notes');
}
