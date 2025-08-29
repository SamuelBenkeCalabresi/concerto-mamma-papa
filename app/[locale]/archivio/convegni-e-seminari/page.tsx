'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  CalendarDaysIcon,
  MapPinIcon,
  AcademicCapIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

interface EventImage {
  src: string;
  alt: string;
}

interface Seminario {
  id: number;
  title: string;
  subtitle?: string;
  location: string;
  year: string;
  description: string;
  images: EventImage[];
}

export default function ConvegniSeminariPage() {
  const t = useTranslations('ConferencesPage');
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: number]: number }>({});

  // Get translated seminars data
  const seminari: Seminario[] = [
    {
      id: 1,
      title: t('seminars.0.title'),
      location: t('seminars.0.location'),
      year: t('seminars.0.year'),
      description: t('seminars.0.description'),
      images: [
        { src: "/images/convegni-seminari/1/conservatorio-latina-22-23.png", alt: "Conservatorio di Latina 2022-2023" }
      ]
    },
    {
      id: 2,
      title: t('seminars.1.title'),
      subtitle: t('seminars.1.subtitle'),
      location: t('seminars.1.location'),
      year: t('seminars.1.year'),
      description: t('seminars.1.description'),
      images: [
        { src: "/images/convegni-seminari/2/91431963956medicina-nellarte-2023.jpg", alt: "Medicina nell'Arte 2023" }
      ]
    },
    {
      id: 3,
      title: t('seminars.2.title'),
      location: t('seminars.2.location'),
      year: t('seminars.2.year'),
      description: t('seminars.2.description'),
      images: [
        { src: "/images/convegni-seminari/3/PHOTO-2022-05-20-16-27-51.jpg", alt: "Seminario Latina 2021-2022 - Foto 1" },
        { src: "/images/convegni-seminari/3/PHOTO-2022-05-21-10-52-03.jpg", alt: "Seminario Latina 2021-2022 - Foto 2" },
        { src: "/images/convegni-seminari/3/calendario-incontri-latina.png", alt: "Calendario incontri Latina" }
      ]
    },
    {
      id: 4,
      title: t('seminars.3.title'),
      subtitle: t('seminars.3.subtitle'),
      location: t('seminars.3.location'),
      year: t('seminars.3.year'),
      description: t('seminars.3.description'),
      images: [
        { src: "/images/convegni-seminari/4/IMG_1149.jpg", alt: "Conference Meryc 2019 - Foto 1" },
        { src: "/images/convegni-seminari/4/IMG_1150-400x284.jpg", alt: "Conference Meryc 2019 - Foto 2" }
      ]
    },
    {
      id: 5,
      title: t('seminars.4.title'),
      subtitle: t('seminars.4.subtitle'),
      location: t('seminars.4.location'),
      year: t('seminars.4.year'),
      description: t('seminars.4.description'),
      images: [
        { src: "/images/convegni-seminari/5/IMG_1116.jpg", alt: "Convegno Bologna 2018 - Foto 1" },
        { src: "/images/convegni-seminari/5/IMG_9383.jpg", alt: "Convegno Bologna 2018 - Foto 2" },
        { src: "/images/convegni-seminari/5/IMG_9452.jpg", alt: "Convegno Bologna 2018 - Foto 3" },
        { src: "/images/convegni-seminari/5/IMG_9453.jpg", alt: "Convegno Bologna 2018 - Foto 4" }
      ]
    }
  ];

  const nextImage = (seminarioId: number, totalImages: number) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [seminarioId]: (prev[seminarioId] || 0 + 1) % totalImages
    }));
  };

  const prevImage = (seminarioId: number, totalImages: number) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [seminarioId]: (prev[seminarioId] || 0 - 1 + totalImages) % totalImages
    }));
  };

  const getCurrentImageIndex = (seminarioId: number) => {
    return currentImageIndexes[seminarioId] || 0;
  };

  return (
    <main className="min-h-screen bg-base-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[60vh] bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40"></div>
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-16 left-8 w-20 h-20 opacity-10">
              <AcademicCapIcon className="w-full h-full text-white animate-pulse" />
            </div>
            <div className="absolute top-32 right-16 w-16 h-16 opacity-20">
              <GlobeAltIcon className="w-full h-full text-white animate-bounce" />
            </div>
            <div className="absolute bottom-20 left-12 w-24 h-24 opacity-15">
              <CalendarDaysIcon className="w-full h-full text-white" />
            </div>
            <div className="absolute top-40 left-1/4 text-white/20 text-3xl animate-bounce">📚</div>
            <div className="absolute top-20 right-1/4 text-white/20 text-4xl animate-pulse">🎓</div>
            <div className="absolute bottom-32 right-1/3 text-white/20 text-2xl animate-bounce">📖</div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-2 mb-6">
                <AcademicCapIcon className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">{t('tag')}</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                <span className="block">{t('title')}</span>
                <span className="block text-blue-300">{t('titleHighlight')}</span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                {t('description')}
              </p>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-base-100"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Seminari Section */}
      <section className="py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {seminari.map((seminario, index) => (
              <div key={seminario.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-cols-2' : ''}`}>
                
                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {seminario.year}
                      </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      {seminario.title}
                    </h2>
                    
                    {seminario.subtitle && (
                      <h3 className="text-xl text-blue-600 font-medium mb-4">
                        {seminario.subtitle}
                      </h3>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <MapPinIcon className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{seminario.location}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <CalendarDaysIcon className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{seminario.year}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {seminario.description}
                  </p>
                </div>

                {/* Image Gallery */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  {seminario.images.length > 0 && (
                    <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-xl p-6 border border-blue-200/50">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                        <Image
                          src={seminario.images[getCurrentImageIndex(seminario.id)].src}
                          alt={seminario.images[getCurrentImageIndex(seminario.id)].alt}
                          fill
                          className="object-cover"
                        />
                        
                        {/* Navigation Arrows - Only show if more than 1 image */}
                        {seminario.images.length > 1 && (
                          <>
                            <button
                              onClick={() => prevImage(seminario.id, seminario.images.length)}
                              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300"
                            >
                              <ChevronLeftIcon className="w-6 h-6" />
                            </button>
                            <button
                              onClick={() => nextImage(seminario.id, seminario.images.length)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300"
                            >
                              <ChevronRightIcon className="w-6 h-6" />
                            </button>

                            {/* Dots Indicator */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                              {seminario.images.map((_, imageIndex) => (
                                <button
                                  key={imageIndex}
                                  onClick={() => setCurrentImageIndexes(prev => ({
                                    ...prev,
                                    [seminario.id]: imageIndex
                                  }))}
                                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    imageIndex === getCurrentImageIndex(seminario.id) ? 'bg-white w-8' : 'bg-white/50'
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      
                      {/* Image counter */}
                      {seminario.images.length > 1 && (
                        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-white text-sm">
                            {getCurrentImageIndex(seminario.id) + 1} / {seminario.images.length}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}