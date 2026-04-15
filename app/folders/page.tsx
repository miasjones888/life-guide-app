import { redirect } from 'next/navigation';

/**
 * Phase 0 legacy — redirected to /notes in Phase 1 Step 4. The folder
 * UI (components/folders/*) is on the salvage list and gets re-skinned
 * into the real /notes surface in Phase 2.
 */
export default function LegacyFoldersPage() {
  redirect('/notes');
}
