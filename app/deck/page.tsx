import { redirect } from 'next/navigation';

/**
 * Phase 0 legacy — redirected to /notes in Phase 1 Step 4. The deck
 * surface is the closest Phase 1 relative to the future /notes surface.
 */
export default function LegacyDeckPage() {
  redirect('/notes');
}
