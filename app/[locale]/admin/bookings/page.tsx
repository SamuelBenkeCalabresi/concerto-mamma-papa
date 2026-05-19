import { redirect } from 'next/navigation';

// Redirect old bookings page to new admin dashboard
export default function OldBookingsPage() {
  redirect('/admin');
}
