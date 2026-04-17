import { notFound, redirect } from 'next/navigation';

/**
 * Phase 0 legacy redirect catch-all. Phase 1 trimmed the surface to six
 * primary routes plus /settings; the dead routes that used to live under
 * their own folders collapse here. Anything outside the known map 404s
 * normally — typo'd URLs should not silently land on /today.
 */

const LEGACY_REDIRECTS: Record<string, string> = {
  daily: '/today',
  weekly: '/today',
  monthly: '/today',
  growth: '/today',
  culture: '/today',
  reflection: '/notes',
  deck: '/notes',
  folders: '/notes',
  backup: '/settings',
};

export function generateStaticParams() {
  return Object.keys(LEGACY_REDIRECTS).map((legacy) => ({ legacy }));
}

export const dynamicParams = false;

export default function LegacyRedirect({ params }: { params: { legacy: string } }) {
  const target = LEGACY_REDIRECTS[params.legacy];
  if (!target) notFound();
  redirect(target);
}
