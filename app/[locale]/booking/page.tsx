import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';

interface BookingPageProps {
  searchParams: Promise<{ eventId?: string }>;
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const t = await getTranslations();
  const params = await searchParams;
  
  return (
    <main className="min-h-screen bg-base-200">
      <Header />
      
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-neutral mb-4">
              {t('Booking.title')}
            </h1>
            <p className="text-lg text-neutral/70">
              Compila il modulo sottostante per prenotare i tuoi posti al concerto
            </p>
          </div>

          <BookingForm preselectedEventId={params.eventId} />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}