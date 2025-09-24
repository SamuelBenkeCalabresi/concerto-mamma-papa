"use client";

import { useState, useEffect, use } from "react";
import { createRegistration } from "@/lib/strapi";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslations } from 'next-intl';

interface EventProps {
  params: Promise<{ id: string }>;
}

export default function BookingForm({ params }: EventProps) {
  const { id } = use(params);
  const t = useTranslations('Booking');
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      try {
        const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
        const res = await fetch(`${STRAPI_URL}/api/events/${id}?populate=*`);
        if (!res.ok) throw new Error('Failed to fetch event');
        const data = await res.json();
        const event = data.data;
        
        // Extract description text from rich text format
        const getDescriptionText = (description: any) => {
          if (Array.isArray(description)) {
            return description.map(block => 
              block.children?.map((child: any) => child.text).join('') || ''
            ).join(' ');
          }
          return description || '';
        };
        
        setEventTitle(event.Title || 'Untitled Event');
        setEventDescription(getDescriptionText(event.Description));
        setEventDate(event.createdAt); // Using createdAt as date since no specific date field
        setEventLocation(''); // No location field in current structure
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to load event details');
      }
    }
    fetchEvent();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      await createRegistration(id, name, email);
      setSuccess(true);
      setName("");
      setEmail("");
    } catch (err) {
      console.error('Registration error:', err);
      setError('Error submitting registration. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (error && !eventTitle) {
    return (
      <main className="min-h-screen bg-base-100">
        <Header />
        <section className="py-16 bg-base-100">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600">{error}</p>
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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {t('registerFor') || 'Register for:'} {eventTitle}
              </h1>
              
              {eventDescription && (
                <p className="text-gray-600 mb-4">{eventDescription}</p>
              )}
              
              <div className="space-y-2 text-sm text-gray-500">
                {eventDate && (
                  <p><strong>Date:</strong> {new Date(eventDate).toLocaleDateString()}</p>
                )}
                {eventLocation && (
                  <p><strong>Location:</strong> {eventLocation}</p>
                )}
              </div>
            </div>

            {success ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-green-600 mb-2">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  {t('success') || 'Registration successful!'}
                </h3>
                <p className="text-green-700">
                  {t('confirmationEmail') || 'Check your email for confirmation.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700">{error}</p>
                  </div>
                )}
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.parentName') || 'Your Name'} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.email') || 'Your Email'} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('form.submitting') || 'Submitting...'}
                    </>
                  ) : (
                    t('form.register') || 'Register'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}