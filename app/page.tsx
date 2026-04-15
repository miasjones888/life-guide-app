import { redirect } from 'next/navigation';

/**
 * The root route is a redirect to /today. The Anchor surface lives at
 * /today; the bare "/" exists only so links to the app root land in the
 * right place. Nav cleanup (BottomNav, SideNav) is a Step 4 concern.
 */
export default function RootPage() {
  redirect('/today');
}
