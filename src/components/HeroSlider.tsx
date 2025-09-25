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

  // For now, just one image as requested
  const slides: SliderImage[] = [
    {
      id: 1,
      src: '/images/hero-slider-1.jpg',
      alt: 'Concerto con Mamma e Papà'
    }
  ];

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
    <div className="relative w-full h-[90vh]">
      {/* Background Image */}
      <Image
        src="/images/hero-slider-1.jpg"
        alt="Concerto con Mamma e Papà"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Change to gradient colors if better */}
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pt-16">
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="block">di Concerto</span>
            <span className="block text-green-300">con Mamma</span>
            <span className="block text-blue-300">e Papà</span>
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