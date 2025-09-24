"use client";

import { getOpenEvents } from "@/lib/strapi";
import Link from "next/link";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function EventsPage() {
  const t = useTranslations('Events');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const data = await getOpenEvents();
        setEvents(data.data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError('Error loading events. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-base-100">
        <Header />
        <section className="py-16 bg-base-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Available Events
            </h1>
            <div className="flex justify-center">
              <svg className="animate-spin h-8 w-8 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-base-100">
        <Header />
        <section className="py-16 bg-base-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Available Events
            </h1>
            <p className="text-xl text-red-600">{error}</p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-100">
      <Header />
      
      <section className="py-16 bg-base-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('availableEvents') || 'Available Events'}
            </h1>
            <p className="text-lg text-gray-600">
              {t('selectEvent') || 'Select an event to register'}
            </p>
          </div>

          {events.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">
                {t('noEvents') || 'No open events at the moment.'}
              </p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event: any) => {
              // Extract description text from rich text format
              const getDescriptionText = (description: any) => {
                if (Array.isArray(description)) {
                  return description.map(block => 
                    block.children?.map((child: any) => child.text).join('') || ''
                  ).join(' ');
                }
                return description || 'No description available';
              };

              return (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {event.Title || 'Untitled Event'}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {getDescriptionText(event.Description)}
                    </p>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-500">
                        <strong>Created:</strong> {new Date(event.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Status:</strong> {event.publishedAt ? 'Published' : 'Draft'}
                      </p>
                    </div>
                    <Link 
                      href={`/eventi/${event.documentId}`}
                      className="inline-block w-full text-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                    >
                      {t('bookEvent') || 'Book this event'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}