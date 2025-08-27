'use client';

import { useState } from 'react';
import { usePathname } from '@/i18n/routing';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentLocale = usePathname().startsWith('/en') ? 'en' : 'it';
  
  const navigation = [
    { name: 'HOME', href: '#home', anchor: true },
    { name: 'CALENDARIO', href: '#calendario', anchor: true },
    { name: 'CHI SIAMO', href: '#chi-siamo', anchor: true },
    { name: 'GALLERIA', href: '#galleria', anchor: true },
    { name: 'CONTATTI', href: '#contatti', anchor: true },
    { name: 'AMICI', href: '#amici', anchor: true },
    { name: 'CORSI', href: `/${currentLocale}/corsi`, anchor: false },
    { name: 'CONVEGNI E SEMINARI', href: `/${currentLocale}/convegni`, anchor: false },
    { name: 'ARCHIVIO EVENTI', href: `/${currentLocale}/archivio`, anchor: false },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      const headerHeight = 80; // Account for sticky header
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const isActive = (href: string, anchor: boolean) => {
    if (anchor && href.includes('#')) {
      // For anchor links, check if we're on the home page
      const isHomePage = pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`;
      if (!isHomePage) return false;
      
      // Simple active state based on scroll position could be added here
      // For now, we'll just highlight HOME when on home page
      return href === '#home';
    }
    
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="w-full px-2 sm:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 min-w-0">
            <Link href={`/${currentLocale}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="relative h-28 w-28 hidden sm:block">
                <Image
                  src="/images/logo_diconcerto.jpg"
                  alt="Di Concerto con Mamma e Papà"
                  fill
                  className="object-contain rounded"
                />
              </div>
              <span className="text-4xl sm:text-4xl font-bold text-primary" style={{ fontFamily: "var(--font-ms-madi), cursive" }}>
                Di Concerto con Mamma e Papà
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center justify-center flex-1 mx-4">
            <div className="flex items-center space-x-1 2xl:space-x-2">
              {navigation.map((item) => (
                item.anchor ? (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`font-medium px-2 py-2 text-xs 2xl:text-sm rounded-lg transition-all duration-200 whitespace-nowrap ${
                      isActive(item.href, item.anchor) 
                        ? 'text-primary bg-primary/10 font-semibold' 
                        : 'text-neutral hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link 
                    key={item.name}
                    href={item.href} 
                    className={`font-medium px-2 py-2 text-xs 2xl:text-sm rounded-lg transition-all duration-200 whitespace-nowrap ${
                      isActive(item.href, item.anchor) 
                        ? 'text-primary bg-primary/10 font-semibold' 
                        : 'text-neutral hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden xl:flex items-center flex-shrink-0">
            <LanguageToggle />
          </div>
          
          {/* Mobile menu button and Language Toggle */}
          <div className="xl:hidden flex items-center space-x-2">
            <div className="xl:hidden">
              <LanguageToggle />
            </div>
            <button
              className="btn btn-ghost btn-circle btn-sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-200 max-h-96 overflow-y-auto">
          <div className="px-2 py-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
            {navigation.map((item) => (
              item.anchor ? (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block py-2 px-3 text-sm rounded-lg font-medium transition-colors duration-200 text-left ${
                    isActive(item.href, item.anchor)
                      ? 'text-primary bg-primary/10 font-semibold'
                      : 'text-neutral hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block py-2 px-3 text-sm rounded-lg font-medium transition-colors duration-200 ${
                    isActive(item.href, item.anchor)
                      ? 'text-primary bg-primary/10 font-semibold'
                      : 'text-neutral hover:text-primary hover:bg-primary/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  );
}