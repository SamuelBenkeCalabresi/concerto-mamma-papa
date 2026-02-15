import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalendarioSection from '@/components/CalendarioSection';

export default function CalendarioPage() {
  return (
    <main className="min-h-screen bg-base-100">
      <Header />

      <div className="py-16">
        <CalendarioSection />
      </div>

      <Footer />
    </main>
  );
}
