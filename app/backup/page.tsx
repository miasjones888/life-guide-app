import { redirect } from 'next/navigation';

/**
 * Phase 0 legacy — redirected to /settings in Phase 1 Step 4. The
 * export/import escape hatch lives at /settings now. The old surface
 * read localStorage directly and used Phase 0 vocabulary; /settings is
 * its covenant-compliant replacement.
 */
export default function LegacyBackupPage() {
  redirect('/settings');
}
