'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface SliderImage {
  id: number;
  src: string;
  alt: string;
}

export default function HeroSlider() {
  const t = useTranslations('Hero');
  const [currentSlide, setCurrentSlide] = useState(0);

  // 3 images slider (same image for now)
  const slides: SliderImage[] = [
    {
      id: 1,
      src: '/images/hero-slider-1.jpg',
      alt: 'Concerto con Mamma e Papà'
    },
    {
      id: 2,
      src: '/images/slide_ensemble_2.jpg',
      alt: 'Concerto con Mamma e Papà 2'
    },
    {
      id: 3,
      src: '/images/galleria/7752b171-ff34-474b-942e-cd3c3f758b35.jpg',
      alt: 'Concerto con Mamma e Papà 3'
    }
  ];

  // Auto-advance slider every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const scrollToHero = () => {
    const heroSection = document.getElementById('home');
    if (heroSection) {
      const rect = heroSection.getBoundingClientRect();
      const targetPosition = window.pageYOffset + rect.top - 50; // 50px higher than the section start
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Slider Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pt-16">
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="block">di Concerto</span>
            <span className="block text-green-300">con Mamma</span>
            <span className="block text-blue-300">e Papà ®</span>
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light opacity-90 mb-8">
            {t('subtitle')}
          </h2>

          {/* Scroll Down Arrow Button */}
          <button
            onClick={scrollToHero}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 animate-bounce"
            aria-label="Scroll to content"
          >
            <ChevronDownIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}