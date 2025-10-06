'use client';

import { useState } from 'react';
import { usePathname, Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations('Navigation');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentLocale = usePathname().startsWith('/en') ? 'en' : 'it';
  
  const navigation = [
    { name: t('home'), href: '#home', anchor: true },
    { name: t('calendar'), href: '#calendario', anchor: true },
    { name: t('news'), href: '#news', anchor: true },
    { name: t('about'), href: '#chi-siamo', anchor: true },
    { name: t('gallery'), href: '#galleria', anchor: true },
    { name: t('contact'), href: '#contatti', anchor: true },
    { name: t('friends'), href: '#amici', anchor: true },
    { name: t('booking'), href: '/prenota', anchor: false },
    { name: t('courses'), href: '/corsi', anchor: false },
    { 
      name: t('archive'), 
      href: '/archivio', 
      anchor: false,
      dropdown: [
        { name: t('conferences'), href: '/archivio/convegni-e-seminari' },
        { name: t('events'), href: '/archivio/eventi' }
      ]
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const isHomePage = pathname === `/${currentLocale}` || pathname === '/';
    
    if (!isHomePage) {
      // Navigate to home page first, then scroll to section
      window.location.href = `/${currentLocale}${sectionId}`;
      return;
    }
    
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
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="relative h-22 w-22 hidden sm:block">
                <Image
                  src="/images/logo_diconcerto.jpg"
                  alt="di Concerto con Mamma e Papà"
                  fill
                  className="object-contain rounded"
                />
              </div>
              <span className="text-2xl sm:text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-ms-madi), cursive" }}>
                di Concerto con Mamma e Papà ®
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center justify-center flex-1 mx-4">
            <div className="flex items-center">
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
                ) : item.dropdown ? (
                  <div key={item.name} className="relative group">
                    <button
                      className={`font-medium px-2 py-2 text-xs 2xl:text-sm rounded-lg transition-all duration-200 whitespace-nowrap flex items-center ${
                        pathname.startsWith(item.href) 
                          ? 'text-primary bg-primary/10 font-semibold' 
                          : 'text-neutral hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {item.name}
                      <ChevronDownIcon className="h-3 w-3 ml-1" />
                    </button>
                    <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-neutral hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-medium px-2 py-2 text-xs 2xl:text-sm rounded-lg transition-all duration-200 whitespace-nowrap ${
                      item.href === '/prenota'
                        ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white hover:from-emerald-700 hover:to-blue-700 shadow-md hover:shadow-lg'
                        : isActive(item.href, item.anchor)
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
          <div className="px-2 py-2 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.anchor ? (
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`block w-full py-2 px-3 text-sm rounded-lg font-medium transition-colors duration-200 text-left ${
                      isActive(item.href, item.anchor)
                        ? 'text-primary bg-primary/10 font-semibold'
                        : 'text-neutral hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {item.name}
                  </button>
                ) : item.dropdown ? (
                  <div>
                    <div className={`block py-2 px-3 text-sm rounded-lg font-medium ${
                      pathname.startsWith(item.href)
                        ? 'text-primary bg-primary/10 font-semibold'
                        : 'text-neutral'
                    }`}>
                      {item.name}
                    </div>
                    <div className="ml-4 space-y-1">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block py-1 px-3 text-sm text-neutral hover:text-primary hover:bg-primary/5 rounded-lg transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`block py-2 px-3 text-sm rounded-lg font-medium transition-colors duration-200 ${
                      item.href === '/prenota'
                        ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white hover:from-emerald-700 hover:to-blue-700 shadow-md'
                        : isActive(item.href, item.anchor)
                          ? 'text-primary bg-primary/10 font-semibold'
                          : 'text-neutral hover:text-primary hover:bg-primary/5'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}