'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
}

export default function ModernGallerySection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Images from the galleria folder
  const galleryImages: GalleryImage[] = [
    { id: '1', src: '/images/galleria/4f3a3a35-48af-41fb-a55f-54924b432e73.jpg', alt: 'Concerto famiglie', title: 'Concerto delle Famiglie' },
    { id: '2', src: '/images/galleria/69b6c92f-180f-4e7b-8483-58e2cb32fc41.jpg', alt: 'Bambini musicisti', title: 'I Piccoli Musicisti' },
    { id: '3', src: '/images/galleria/7752b171-ff34-474b-942e-cd3c3f758b35.jpg', alt: 'Evento musicale', title: 'Evento Speciale' },
    { id: '4', src: '/images/galleria/Annamaria_3.jpg', alt: 'Annamaria in concerto', title: 'Annamaria in Concerto' },
    { id: '5', src: '/images/galleria/FullSizeRender.jpg', alt: 'Performance dal vivo', title: 'Performance dal Vivo' },
    { id: '6', src: '/images/galleria/IMG-20231029-WA0015.jpg', alt: 'Workshop musicale', title: 'Workshop Musicale' },
    { id: '7', src: '/images/galleria/IMG-20231029-WA0016.jpg', alt: 'Attività interattive', title: 'Attività Interattive' },
    { id: '8', src: '/images/galleria/IMG_1148.jpg', alt: 'Momenti speciali', title: 'Momenti Speciali' },
    { id: '9', src: '/images/galleria/IMG_1321-2.jpg', alt: 'Bambini che cantano', title: 'Bambini che Cantano' },
    { id: '10', src: '/images/galleria/IMG_1821-1.jpg', alt: 'Concerto interattivo', title: 'Concerto Interattivo' },
    { id: '11', src: '/images/galleria/IMG_2036-copia.jpg', alt: 'Famiglia musicale', title: 'Famiglia Musicale' },
    { id: '12', src: '/images/galleria/IMG_3607-e1740930694699.jpg', alt: 'Esibizione piano', title: 'Esibizione al Piano' },
    { id: '13', src: '/images/galleria/IMG_3609-e1740930670458.jpg', alt: 'Ascolto attento', title: 'Ascolto Attento' },
    { id: '14', src: '/images/galleria/IMG_3611-e1740930650466.jpg', alt: 'Gioia musicale', title: 'Gioia Musicale' },
    { id: '15', src: '/images/galleria/IMG_3854-copia.jpg', alt: 'Gruppo famiglia', title: 'Gruppo Famiglia' },
    { id: '16', src: '/images/galleria/IMG_4077.jpg', alt: 'Concentrazione', title: 'Concentrazione' },
    { id: '17', src: '/images/galleria/IMG_4809-e1740930618168.jpg', alt: 'Sorrisi bambini', title: 'Sorrisi dei Bambini' },
    { id: '18', src: '/images/galleria/IMG_4813-e1740930586144.jpg', alt: 'Momento magico', title: 'Momento Magico' },
    { id: '19', src: '/images/galleria/IMG_7650-e1740930514258.jpg', alt: 'Ensemble famiglie', title: 'Ensemble delle Famiglie' },
    { id: '20', src: '/images/galleria/IMG_7651-e1740930366684.jpg', alt: 'Partecipazione attiva', title: 'Partecipazione Attiva' },
    { id: '21', src: '/images/galleria/francesca_piano_bambina.jpg', alt: 'Francesca e bambina', title: 'Francesca e Bambina' },
    { id: '22', src: '/images/galleria/noi_3.jpg', alt: 'Il nostro trio', title: 'Il Nostro Trio' },
  ];

  const imagesPerPage = 9;
  const totalPages = Math.ceil(galleryImages.length / imagesPerPage);
  const currentImages = galleryImages.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (viewMode === 'carousel') {
        setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [viewMode, galleryImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Hero-style background with gradient */}
      <div className="relative min-h-[100vh] bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        {/* Background overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-black/30"></div>
        
        {/* Decorative Musical Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 left-8 w-20 h-20 opacity-10">
            <svg className="w-full h-full text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="absolute top-32 right-16 w-16 h-16 opacity-20">
            <svg className="w-full h-full text-white animate-bounce" fill="currentColor" viewBox="0 0 20 20" style={{animationDuration: '3s'}}>
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="absolute bottom-20 left-12 w-24 h-24 opacity-15">
            <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          {/* Musical notes scattered */}
          <div className="absolute top-40 left-1/4 text-white/20 text-3xl animate-float">♪</div>
          <div className="absolute top-20 right-1/4 text-white/20 text-4xl animate-float-delayed">♫</div>
          <div className="absolute bottom-32 right-1/3 text-white/20 text-2xl animate-float">♪</div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-2 mb-6">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">I Nostri Momenti</span>
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                <span className="block">Galleria</span>
                <span className="block text-blue-300">dei Ricordi</span>
              </h2>
              
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Scopri i momenti più belli dei nostri concerti. Ogni immagine racconta la gioia della musica condivisa.
              </p>

              {/* View Mode Toggle */}
              <div className="flex justify-center mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
                  <button
                    onClick={() => setViewMode('carousel')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      viewMode === 'carousel'
                        ? 'bg-white text-blue-800 shadow-lg'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    Carousel
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-white text-blue-800 shadow-lg'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    Griglia
                  </button>
                </div>
              </div>
            </div>

            {/* Carousel View */}
            {viewMode === 'carousel' && (
              <div className="relative max-w-5xl mx-auto">
                <div ref={carouselRef} className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/20">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {galleryImages.map((image, index) => (
                      <div key={image.id} className="flex-shrink-0 w-full">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            priority={index <= 2}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-8">
                            <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
                            <p className="text-white/80">{image.alt}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Dots Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="max-w-6xl mx-auto">
                {/* Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {currentImages.map((image) => (
                    <div key={image.id} className="group cursor-pointer">
                      <div className="relative aspect-square overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h4 className="text-white font-semibold text-sm">{image.title}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center space-x-4">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className="bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentPage ? 'bg-white w-8' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages - 1}
                    className="bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Page info */}
                <div className="text-center mt-4">
                  <span className="text-white/70 text-sm">
                    Pagina {currentPage + 1} di {totalPages} • {galleryImages.length} foto totali
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-base-100"></path>
          </svg>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }
      `}</style>
    </section>
  );
}