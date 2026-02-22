'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  MusicalNoteIcon,
  NewspaperIcon,
  PlayIcon,
  ArrowTopRightOnSquareIcon,
  HeartIcon,
  AcademicCapIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const convegniImages = [
  '/images/future-convegni-seminari/IMG_1895.JPG',
  '/images/future-convegni-seminari/IMG_1896.JPG',
];

export default function NewsSection() {
  const t = useTranslations('NewsSection');
  const [convegniSlide, setConvegniSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const prevSlide = () => setConvegniSlide((i) => (i - 1 + convegniImages.length) % convegniImages.length);
  const nextSlide = () => setConvegniSlide((i) => (i + 1) % convegniImages.length);

  return (
    <section className="relative overflow-hidden">
      {/* Hero-style Background */}
      <div className="relative min-h-[70vh] bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50"></div>
        
        {/* Decorative Musical Elements */}
        <div className="absolute inset-0 overflow-hidden px-4">
          <div className="absolute top-16 left-10 w-24 h-24 opacity-10">
            <NewspaperIcon className="w-full h-full text-white animate-pulse" />
          </div>
          <div className="absolute top-32 right-20 w-20 h-20 opacity-20">
            <PlayIcon className="w-full h-full text-white animate-bounce" style={{animationDuration: '3s'}} />
          </div>
          <div className="absolute bottom-32 left-16 w-28 h-28 opacity-15">
            <MusicalNoteIcon className="w-full h-full text-white" />
          </div>
          {/* Musical notes scattered */}
          <div className="absolute top-40 left-1/4 ml-8 text-white/20 text-3xl animate-float">📰</div>
          <div className="absolute top-20 right-1/4 mr-8 text-white/20 text-4xl animate-float-delayed">🎭</div>
          <div className="absolute bottom-40 right-1/3 mr-4 text-white/20 text-2xl animate-float">🎪</div>
        </div>

        {/* Top Wave */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-20 rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-base-100"></path>
          </svg>
        </div>

        {/* News Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Section Title */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-2 mb-6">
              <NewspaperIcon className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">{t('tag')}</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              <span className="block">{t('title')}</span>
              <span className="block text-emerald-300">{t('titleHighlight')}</span>
            </h2>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {t('description')}
            </p>
          </div>

          {/* News Items Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* L'isola di Tiritinlallà */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-600/80 backdrop-blur-sm p-3 rounded-xl">
                    <PlayIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t('tiritinlalla.title')}</h3>
                </div>
                
                <p className="text-white/80 leading-relaxed mb-6">
                  {t('tiritinlalla.description')}
                </p>
              </div>

              {/* YouTube Video Embed */}
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-blue-400/20 to-purple-400/20">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/FcjYU5y47mQ?si=nWbAL1tyfGepdqlS" 
                  title="L'isola di Tiritinlallà - YouTube video player"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="rounded-2xl"
                ></iframe>
                
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 text-white/30 text-2xl pointer-events-none animate-pulse">🎭</div>
                <div className="absolute bottom-4 right-4 text-white/30 text-xl pointer-events-none animate-pulse" style={{animationDelay: '1s'}}>🎪</div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-emerald-200 font-medium">
                  <HeartIcon className="h-4 w-4" />
                  <span className="text-sm">{t('tiritinlalla.tagline')}</span>
                </div>
              </div>
            </div>

            {/* Educare con la musica nello Zerosei */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600/80 backdrop-blur-sm p-3 rounded-xl">
                    <AcademicCapIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t('convegni.title')}</h3>
                </div>
                <p className="text-white/80 leading-relaxed mb-6">
                  {t('convegni.description')}
                </p>
              </div>

              {/* Image Carousel */}
              <div className="relative mb-6 rounded-2xl overflow-hidden">
                <div className="relative w-full h-44">
                  <Image
                    src={convegniImages[convegniSlide]}
                    alt={`Educare con la musica nello Zerosei - immagine ${convegniSlide + 1}`}
                    fill
                    className="object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl" />
                </div>
                {/* Prev / Next */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-all"
                  aria-label="Immagine precedente"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-all"
                  aria-label="Immagine successiva"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
                {/* Dot indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {convegniImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setConvegniSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${idx === convegniSlide ? 'bg-white' : 'bg-white/40'}`}
                      aria-label={`Vai all'immagine ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center mt-auto">
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-blue-600/70 hover:bg-blue-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <AcademicCapIcon className="h-5 w-5" />
                  <span className="font-medium">{t('convegni.cta')}</span>
                </button>
              </div>
            </div>

            {/* La musica all'asilo nido */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <NewspaperIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t('article.title')}</h3>
                </div>
                
                <p className="text-white/80 leading-relaxed mb-6">
                  {t('article.description')}
                </p>
              </div>

              {/* Article Image */}
              <div className="relative mb-6">
                <div className="relative w-[20.4rem] h-[15.3rem] rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-400/20 to-pink-400/20">
                  <Image
                    src="/images/articolo.webp"
                    alt="Articolo sulla musica all'asilo nido"
                    fill
                    className="object-cover object-center rounded-xl scale-90" // scale down the image slightly
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 text-white/30 text-2xl pointer-events-none animate-pulse">📖</div>
                <div className="absolute bottom-4 left-4 text-white/30 text-xl pointer-events-none animate-pulse" style={{animationDelay: '1s'}}>🧠</div>
              </div>

              {/* Read Article Button */}
              <div className="text-center">
                <a 
                  href="https://www.repubblica.it/scienze/2019/03/15/news/musica_asilo_nido_sviluppa_il_linguaggio_e_previene_la_dislessia-221640885/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                  <span className="font-medium">{t('article.readArticle')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-base-200"></path>
          </svg>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -top-6 -left-6 w-40 h-40 bg-teal-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 -right-8 w-24 h-24 bg-blue-400/30 rounded-full blur-lg animate-bounce" style={{animationDuration: '4s'}}></div>
      </div>

      {/* Convegni Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />
          {/* Sheet on mobile, card on desktop */}
          <div className="relative w-full sm:max-w-2xl sm:mx-4 bg-gray-900 rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col max-h-[92dvh] sm:max-h-[85vh]">
            {/* Close */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
              aria-label="Chiudi"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            {/* Drag handle (mobile only) */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 bg-white/30 rounded-full" />
            </div>

            {/* Large carousel */}
            <div className="relative w-full h-64 sm:h-80 flex-shrink-0">
              <Image
                src={convegniImages[convegniSlide]}
                alt={`Educare con la musica nello Zerosei - immagine ${convegniSlide + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Prev / Next */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
                aria-label="Immagine precedente"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
                aria-label="Immagine successiva"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
              {/* Counter */}
              <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                {convegniSlide + 1} / {convegniImages.length}
              </div>
              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {convegniImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setConvegniSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${idx === convegniSlide ? 'bg-white scale-110' : 'bg-white/40'}`}
                    aria-label={`Vai all'immagine ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Text content */}
            <div className="p-6 overflow-y-auto">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-600/80 p-2 rounded-xl">
                  <AcademicCapIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{t('convegni.title')}</h3>
              </div>
              <p className="text-white/70 leading-relaxed">{t('convegni.description')}</p>
            </div>
          </div>
        </div>
      )}

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