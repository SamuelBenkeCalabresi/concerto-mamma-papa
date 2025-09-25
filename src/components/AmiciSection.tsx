'use client';

import Image from 'next/image';

interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string;
  website?: string;
  category: 'institution' | 'music' | 'education' | 'culture';
}

export default function AmiciSection() {
  const partners: Partner[] = [
    {
      id: 'conservatorio-monopoli',
      name: 'Conservatorio Nino Rota',
      description: 'Istituzione di alta formazione musicale con sede a Monopoli, partner nell\'educazione musicale avanzata.',
      logo: '/images/partners/conservatorio.jpg',
      website: 'https://www.conservatoriomonopoli.it',
      category: 'institution'
    },
    {
      id: 'teatro-comunale',
      name: 'Teatro Comunale di Bari',
      description: 'Importante realtà culturale della città, ospita regolarmente i nostri concerti per famiglie.',
      logo: '/images/partners/teatro.jpg',
      website: 'https://www.teatrocomunalebari.it',
      category: 'culture'
    },
    {
      id: 'scuola-musica',
      name: 'Scuola di Musica Armonia',
      description: 'Centro specializzato nell\'educazione musicale per bambini e supporto alle famiglie.',
      logo: '/images/partners/scuola-musica.jpg',
      category: 'education'
    },
    {
      id: 'orchestra-giovanile',
      name: 'Orchestra Giovanile Pugliese',
      description: 'Ensemble musicale che sostiene la formazione dei giovani musicisti del territorio.',
      logo: '/images/partners/orchestra.jpg',
      category: 'music'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'institution': return 'from-blue-500/20 to-blue-600/20';
      case 'music': return 'from-purple-500/20 to-purple-600/20';
      case 'education': return 'from-green-500/20 to-green-600/20';
      case 'culture': return 'from-orange-500/20 to-orange-600/20';
      default: return 'from-primary/20 to-primary/20';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'institution': return 'Istituzioni';
      case 'music': return 'Musica';
      case 'education': return 'Educazione';
      case 'culture': return 'Cultura';
      default: return 'Partner';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-neutral mb-4">
          I Nostri Amici
        </h2>
        <p className="text-lg text-neutral/70 max-w-3xl mx-auto">
          Collaboriamo con istituzioni, scuole e realtà culturali del territorio per offrire 
          esperienze musicali sempre più ricche e coinvolgenti per le famiglie.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <div className="bg-gradient-to-br from-white to-primary/5 rounded-2xl shadow-lg hover:shadow-xl border border-primary/10 hover:border-primary/30 overflow-hidden transition-all duration-300">
              {/* Logo Section */}
              <div className="relative h-40 overflow-hidden">
                <div className={`w-full h-full bg-gradient-to-br ${getCategoryColor(partner.category)} flex items-center justify-center`}>
                  <div className="text-center text-primary">
                    <div className="w-20 h-20 mx-auto mb-4 bg-white/30 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-neutral group-hover:text-primary transition-colors duration-300">
                    {partner.name}
                  </h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(partner.category)} text-primary`}>
                    {getCategoryLabel(partner.category)}
                  </span>
                </div>

                <p className="text-neutral/70 text-sm leading-relaxed mb-4">
                  {partner.description}
                </p>

                {partner.website && (
                  <div className="flex items-center text-primary text-sm font-medium group-hover:text-primary/80 transition-colors duration-300">
                    Visita il sito
                    <svg 
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Partnership CTA */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-neutral mb-4">
            Vuoi Diventare Nostro Partner?
          </h3>
          <p className="text-neutral/70 mb-6 max-w-2xl mx-auto">
            Se rappresenti un'istituzione, scuola o realtà culturale interessata a collaborare 
            con noi per promuovere l'educazione musicale per l'infanzia, contattaci!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:info@concertoconmammaepapa.it" className="btn btn-primary bg-primary hover:bg-primary/80 border-primary">
              Proponi una Collaborazione
            </a>
            <a href="/prenota" className="btn btn-outline btn-primary">
              Scopri i Nostri Progetti
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}