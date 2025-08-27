import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  UserGroupIcon, 
  HeartIcon, 
  GiftIcon, 
  CalendarDaysIcon,
  TicketIcon,
  StarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default async function AmiciPage() {
  const t = await getTranslations();

  const benefits = [
    {
      icon: <TicketIcon className="h-8 w-8" />,
      title: "Sconto del 15% sui Biglietti",
      description: "Tutti i concerti a prezzo ridotto per te e la tua famiglia"
    },
    {
      icon: <CalendarDaysIcon className="h-8 w-8" />,
      title: "Prenotazione Prioritaria",
      description: "Accesso anticipato alla prenotazione dei posti migliori"
    },
    {
      icon: <GiftIcon className="h-8 w-8" />,
      title: "Eventi Esclusivi",
      description: "Inviti speciali a prove aperte e eventi riservati agli Amici"
    },
    {
      icon: <HeartIcon className="h-8 w-8" />,
      title: "Newsletter Personale",
      description: "Contenuti esclusivi e anteprime sui prossimi spettacoli"
    }
  ];

  const testimonials = [
    {
      name: "Maria e Luca",
      text: "Essere Amici di Concerti con Mamma e Papà ci permette di vivere la musica in modo ancora più speciale con i nostri bambini.",
      location: "Milano"
    },
    {
      name: "Francesca",
      text: "Gli eventi esclusivi sono magici! Mia figlia ha potuto conoscere i musicisti da vicino.",
      location: "Roma"
    },
    {
      name: "Andrea e Sofia",
      text: "Lo sconto sui biglietti ci permette di partecipare a più concerti durante l'anno. Ne vale davvero la pena!",
      location: "Firenze"
    }
  ];

  const plans = [
    {
      name: "Amico",
      price: "25€",
      period: "all'anno",
      features: [
        "Sconto 10% sui biglietti",
        "Newsletter mensile",
        "Accesso prioritario prenotazioni"
      ],
      popular: false
    },
    {
      name: "Amico Speciale",
      price: "45€",
      period: "all'anno",
      features: [
        "Sconto 15% sui biglietti",
        "Newsletter settimanale",
        "Accesso prioritario prenotazioni",
        "Inviti agli eventi esclusivi",
        "Meet & greet con i musicisti"
      ],
      popular: true
    },
    {
      name: "Famiglia Amica",
      price: "65€",
      period: "all'anno",
      features: [
        "Sconto 20% sui biglietti",
        "Newsletter personalizzata",
        "Accesso VIP prenotazioni",
        "Tutti gli eventi esclusivi",
        "Laboratori musicali gratuiti",
        "Biglietto omaggio compleanno"
      ],
      popular: false
    }
  ];

  return (
    <main className="min-h-screen bg-base-100">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/8 to-base-200/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 rounded-full p-4">
                <UserGroupIcon className="h-16 w-16 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral mb-6">
              Diventa un Amico
            </h1>
            <p className="text-xl text-neutral/70 max-w-3xl mx-auto">
              Unisciti alla nostra comunità di famiglie che amano la musica e goditi vantaggi esclusivi
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral mb-4">Vantaggi Esclusivi</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              Scopri tutti i benefici riservati agli Amici di Concerti con Mamma e Papà
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="card-body">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    {benefit.icon}
                  </div>
                  <h3 className="card-title justify-center text-lg mb-2">{benefit.title}</h3>
                  <p className="text-neutral/70 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral mb-4">Scegli il Tuo Piano</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              Trova il piano perfetto per la tua famiglia e inizia a godere dei vantaggi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`card shadow-xl ${plan.popular ? 'border-2 border-primary bg-primary/5' : 'bg-base-100'} relative`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="badge badge-primary gap-1">
                      <StarIcon className="h-3 w-3" />
                      Più Popolare
                    </div>
                  </div>
                )}
                
                <div className="card-body text-center">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-neutral/70">/{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircleIcon className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="card-actions justify-center">
                    <button className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} btn-wide`}>
                      Scegli {plan.name}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral mb-4">Cosa Dicono i Nostri Amici</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              Le testimonianze delle famiglie che hanno scelto di diventare nostre Amiche
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <div className="flex items-center mb-4">
                    <div className="avatar placeholder">
                      <div className="bg-primary/10 text-primary rounded-full w-12">
                        <span className="text-xl">👨‍👩‍👧‍👦</span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-neutral/70">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-neutral/80 italic">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="flex text-primary mt-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto a Diventare un Amico?</h2>
          <p className="text-xl mb-8 opacity-90">
            Unisciti alla nostra comunità musicale e inizia a godere di tutti i vantaggi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-secondary btn-lg">
              Diventa Amico Ora
            </button>
            <Link href="/it/contatti" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
              Hai Domande?
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}