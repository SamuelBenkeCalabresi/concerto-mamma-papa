import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import Hero from '@/components/Hero';
import VoucherSection from '@/components/VoucherSection';
import VoucherPopupManager from '@/components/VoucherPopupManager';
import CalendarioSection from '@/components/CalendarioSection';
import NewsSection from '@/components/NewsSection';
import ChiSiamoSection from '@/components/ChiSiamoSection';
import ModernGallerySection from '@/components/ModernGallerySection';
import ContattiSection from '@/components/ContattiSection';
import AmiciSection from '@/components/AmiciSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-base-100">
      <Header />
      
      {/* Hero Slider */}
      <HeroSlider />
      
      {/* Home Section */}
      <section id="home">
        <Hero />
      </section>
      
      {/* Voucher Section */}
      <VoucherSection />
      
      {/* Calendario Section */}
      <section id="calendario" className="py-16 bg-base-100">
        <CalendarioSection />
      </section>
      
      {/* News Section */}
      <section id="news">
        <NewsSection />
      </section>
      
      {/* Chi Siamo Section */}
      <section id="chi-siamo" className="py-16 bg-base-200">
        <ChiSiamoSection />
      </section>
      
      {/* Galleria Section */}
      <section id="galleria">
        <ModernGallerySection />
      </section>
      
      {/* Contatti Section */}
      <section id="contatti" className="py-16 bg-base-200">
        <ContattiSection />
      </section>
      
      {/* Amici Section */}
      <section id="amici" className="py-16 bg-base-100">
        <AmiciSection />
      </section>
      
      <Footer />
      
      {/* Voucher Popup Manager */}
      <VoucherPopupManager />
    </main>
  );
}