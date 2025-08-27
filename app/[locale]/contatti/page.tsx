import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { 
  MapPinIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function ContactPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-base-100">
      <Header />
      
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-neutral mb-4">
              {t('Contact.title')}
            </h1>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              {t('Contact.getInTouch')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-xl mb-6">Informazioni di Contatto</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <MapPinIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral mb-1">Indirizzo</h4>
                        <p className="text-neutral/70 whitespace-pre-line">
                          {t('Footer.address')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <PhoneIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral mb-1">Telefono</h4>
                        <a 
                          href={`tel:${t('Footer.phone')}`} 
                          className="text-primary hover:underline"
                        >
                          {t('Footer.phone')}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <EnvelopeIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral mb-1">Email</h4>
                        <a 
                          href={`mailto:${t('Footer.email')}`} 
                          className="text-primary hover:underline"
                        >
                          {t('Footer.email')}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <ClockIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral mb-1">Orari di Ufficio</h4>
                        <div className="text-neutral/70 text-sm">
                          <p>Lunedì - Venerdì: 9:00 - 18:00</p>
                          <p>Sabato: 9:00 - 13:00</p>
                          <p>Domenica: Chiuso</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-xl mb-4">Come Raggiungerci</h3>
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPinIcon className="h-12 w-12 mx-auto mb-2" />
                      <p>Mappa interattiva</p>
                      <p className="text-sm">Via della Musica, 123 - Roma</p>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-neutral/70">
                    <h4 className="font-semibold mb-2">Trasporti Pubblici:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Metro Linea A: Fermata Flaminio</li>
                      <li>Autobus: Linee 2, 19, 490, 495</li>
                      <li>Tram: Linea 2</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center text-neutral mb-8">Domande Frequenti</h2>
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="collapse collapse-arrow bg-white shadow-md">
                <input type="radio" name="faq-accordion" /> 
                <div className="collapse-title text-lg font-medium">
                  A che età possono partecipare i bambini?
                </div>
                <div className="collapse-content"> 
                  <p>I nostri concerti sono pensati per bambini dai 0 ai 6 anni, sempre accompagnati da almeno un adulto. Ogni evento specifica l&apos;età consigliata per ottimizzare l&apos;esperienza.</p>
                </div>
              </div>

              <div className="collapse collapse-arrow bg-white shadow-md">
                <input type="radio" name="faq-accordion" /> 
                <div className="collapse-title text-lg font-medium">
                  È necessario prenotare anche per gli eventi gratuiti?
                </div>
                <div className="collapse-content"> 
                  <p>Sì, anche per gli eventi gratuiti è necessario prenotare per garantire la disponibilità dei posti e permetterci di organizzare al meglio l&apos;evento.</p>
                </div>
              </div>

              <div className="collapse collapse-arrow bg-white shadow-md">
                <input type="radio" name="faq-accordion" /> 
                <div className="collapse-title text-lg font-medium">
                  Quanto durano i concerti?
                </div>
                <div className="collapse-content"> 
                  <p>I concerti hanno una durata variabile dai 35 ai 55 minuti, con pause interattive per mantenere alta l&apos;attenzione dei bambini. La durata specifica è indicata per ogni evento.</p>
                </div>
              </div>

              <div className="collapse collapse-arrow bg-white shadow-md">
                <input type="radio" name="faq-accordion" /> 
                <div className="collapse-title text-lg font-medium">
                  Posso cancellare o modificare una prenotazione?
                </div>
                <div className="collapse-content"> 
                  <p>Sì, è possibile cancellare o modificare una prenotazione fino a 24 ore prima dell&apos;evento contattandoci via email o telefono.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}