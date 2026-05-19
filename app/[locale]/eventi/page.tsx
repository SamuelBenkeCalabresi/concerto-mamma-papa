import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventsList from './EventsList';

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-base-200">
      <Header />

      <section className="bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900 py-16 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Prossimi eventi</h1>
        <p className="text-white/70 text-lg">Concerti interattivi per famiglie</p>
      </section>

      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <EventsList />
      </section>

      <Footer />
    </main>
  );
}
