'use client';

interface SitoAmico {
  id: string;
  name: string;
  url: string;
}

export default function AmiciSection() {
  const sitiAmici: SitoAmico[] = [
    {
      id: 'roma03',
      name: 'Roma 03',
      url: 'https://www.roma03.net/'
    },
    {
      id: 'bioparco',
      name: 'Bioparco',
      url: 'https://www.bioparco.it/'
    },
    {
      id: 'stanza-musica',
      name: 'La Stanza della Musica',
      url: 'https://www.lastanzadellamusica.com/'
    },
    {
      id: 'eschilo',
      name: 'Associazione Musicale Eschilo',
      url: 'https://www.associazionemusicaleeschilo.org/'
    },
    {
      id: 'bdibisogni',
      name: 'B di Bisogni',
      url: 'https://www.facebook.com/people/BdiBisogni/61588945180410/'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-neutral mb-4">
          Siti Amici
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {sitiAmici.map((sito) => (
          <a
            key={sito.id}
            href={sito.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl border border-gray-200 hover:border-primary/50 p-6 transition-all duration-300 transform hover:scale-105">
              <h3 className="text-lg font-semibold text-neutral group-hover:text-primary transition-colors duration-300 text-center">
                {sito.name}
              </h3>
              <div className="flex items-center justify-center text-primary text-sm font-medium mt-4 group-hover:text-primary/80 transition-colors duration-300">
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
            </div>
          </a>
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