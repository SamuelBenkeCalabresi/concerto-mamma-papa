'use client';

import Image from 'next/image';

export default function GalleriaSection() {
  const galleryImages = [
    {
      id: 1,
      src: '/images/gallery-1.jpg',
      alt: 'Concerto famiglie',
      title: 'Concerto delle Famiglie'
    },
    {
      id: 2,
      src: '/images/gallery-2.jpg',
      alt: 'Bambini che suonano',
      title: 'I Piccoli Musicisti'
    },
    {
      id: 3,
      src: '/images/gallery-3.jpg',
      alt: 'Evento musicale',
      title: 'Evento Speciale'
    },
    {
      id: 4,
      src: '/images/gallery-4.jpg',
      alt: 'Performance dal vivo',
      title: 'Performance dal Vivo'
    },
    {
      id: 5,
      src: '/images/gallery-5.jpg',
      alt: 'Workshop musicale',
      title: 'Workshop Musicale'
    },
    {
      id: 6,
      src: '/images/gallery-6.jpg',
      alt: 'Attività interattive',
      title: 'Attività Interattive'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-neutral mb-4">
          Galleria
        </h2>
        <p className="text-lg text-neutral/70 max-w-3xl mx-auto">
          Scopri i momenti più belli dei nostri concerti e attività. 
          Ogni immagine racconta la gioia e la meraviglia della musica condivisa tra genitori e bambini.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <div className="bg-gradient-to-br from-white to-primary/5 rounded-2xl shadow-lg hover:shadow-xl border border-primary/10 hover:border-primary/30 overflow-hidden transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="font-medium">{image.title}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-neutral mb-4">
            Condividi i Tuoi Ricordi
          </h3>
          <p className="text-neutral/70 mb-6 max-w-2xl mx-auto">
            Hai partecipato ai nostri eventi? Condividi le tue foto e diventa parte della nostra comunità musicale!
          </p>
          <button className="btn btn-primary bg-primary hover:bg-primary/80 border-primary">
            Carica le Tue Foto
          </button>
        </div>
      </div>
    </div>
  );
}