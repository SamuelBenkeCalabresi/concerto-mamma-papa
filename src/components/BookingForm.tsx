'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  CalendarDaysIcon,
  UserIcon,
  UserGroupIcon,
  EnvelopeIcon,
  PhoneIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  ClockIcon,
  MapPinIcon,
  TicketIcon
} from '@heroicons/react/24/outline';

interface BookingFormProps {
  preSelectedEvent?: any;
}

export default function BookingForm({ preSelectedEvent }: BookingFormProps = {}) {
  const t = useTranslations('Booking');
  
  // Zod validation schema with translations
  const kidSchema = z.object({
    name: z.string().min(2, t('validation.nameMin')),
    birthDate: z.string().min(1, t('validation.birthDateRequired')),
    age: z.number().min(0, t('validation.agePositive')).max(18, t('validation.ageMax'))
  });

  const bookingSchema = z.object({
    event: z.string().min(1, t('validation.eventRequired')),
    date: z.string().min(1, t('validation.dateRequired')),
    name: z.string().min(2, t('validation.nameRequired')),
    numberOfKids: z.number().min(1, t('validation.kidsMin')).max(3, t('validation.kidsMax')),
    kids: z.array(kidSchema).min(1, t('validation.kidsDataRequired')).max(3, t('validation.kidsMax')),
    numberOfAdults: z.number().min(1, t('validation.adultsMin')),
    email: z.string().email(t('validation.emailInvalid')),
    phone: z.string().min(10, t('validation.phoneInvalid')),
    howDidYouHear: z.string().optional(),
    website: z.string().optional() // Honeypot field - should be empty
  }).refine((data) => data.kids.length === data.numberOfKids, {
    message: t('validation.kidsCountMismatch'),
    path: ["numberOfKids"]
  });

  type BookingFormData = z.infer<typeof bookingSchema>;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [events, setEvents] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [selectedEventDetails, setSelectedEventDetails] = useState<any>(null);

  const { 
    register, 
    control, 
    handleSubmit, 
    watch, 
    formState: { errors },
    reset,
    setValue
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      event: '',
      numberOfKids: 1,
      numberOfAdults: 2,
      kids: [{ name: '', birthDate: '', age: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'kids'
  });

  const numberOfKids = watch('numberOfKids');

  // Load available events or use pre-selected event
  React.useEffect(() => {
    if (preSelectedEvent) {
      // If we have a pre-selected event, use it and set the form values
      setEvents([preSelectedEvent]);
      setValue('event', preSelectedEvent.id.toString());
      // Use createdAt as date since these events don't have a specific date field
      setValue('date', new Date().toISOString().split('T')[0]); // Default to today's date
      setLoadingEvents(false);
      return;
    }

    const loadEvents = async () => {
      try {
        const { getOpenEvents } = await import('@/lib/strapi');
        const response = await getOpenEvents();
        
        setEvents(response.data || []);
      } catch (error) {
        console.error('Error loading events:', error);
        setEvents([]);
      } finally {
        setLoadingEvents(false);
      }
    };

    loadEvents();
  }, [preSelectedEvent, setValue]);

  // Adjust kids array when numberOfKids changes
  React.useEffect(() => {
    const currentKidsCount = fields.length;
    if (numberOfKids > currentKidsCount) {
      for (let i = currentKidsCount; i < numberOfKids; i++) {
        append({ name: '', birthDate: '', age: 0 });
      }
    } else if (numberOfKids < currentKidsCount) {
      for (let i = currentKidsCount - 1; i >= numberOfKids; i--) {
        remove(i);
      }
    }
  }, [numberOfKids, fields.length, append, remove]);

  const onSubmit = async (data: BookingFormData) => {
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Form data received:', JSON.stringify(data, null, 2));
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Import strapi API functions dynamically to avoid SSR issues
      const { strapiBookingAPI } = await import('@/lib/strapi');
      
      // Prepare booking data for Strapi
      const bookingData = {
        event: parseInt(data.event),
        date: data.date,
        parentName: data.name,
        numberOfKids: data.numberOfKids,
        kids: data.kids,
        numberOfAdults: data.numberOfAdults,
        email: data.email,
        phone: data.phone,
        howDidYouHear: data.howDidYouHear || null,
        website: data.website || null, // Honeypot field
        status: 'pending'
      };
      
      console.log('=== SENDING TO STRAPI ===');
      console.log('Booking data:', JSON.stringify(bookingData, null, 2));
      
      // Create booking via Strapi API
      const response = await strapiBookingAPI.createBooking(bookingData);
      
      console.log('=== STRAPI RESPONSE ===');
      console.log('Response:', response);

      // Find the selected event details
      const selectedEvent = events.find(event => event.id === parseInt(data.event));

      // Store submitted data and event details for modal
      setSubmittedData(data);
      setSelectedEventDetails(selectedEvent);
      setSubmitStatus('success');
      setShowModal(true);
    } catch (error) {
      console.error('Booking error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return Math.max(0, age);
  };

  const handleBirthDateChange = (index: number, birthDate: string) => {
    const age = calculateAge(birthDate);
    setValue(`kids.${index}.age`, age);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSubmittedData(null);
    setSelectedEventDetails(null);
    reset();
    // Re-enable body scroll
    document.body.style.overflow = 'unset';
  };

  // Disable/enable body scroll when modal opens/closes
  React.useEffect(() => {
    if (showModal) {
      // Disable body scroll
      document.body.style.overflow = 'hidden';
      // Trigger confetti after a short delay
      setTimeout(() => {
        triggerConfetti();
      }, 300);
    }
    return () => {
      // Re-enable body scroll when component unmounts
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const triggerConfetti = () => {
    // Simple confetti effect using CSS animations
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'fixed inset-0 pointer-events-none z-[60]';
    document.body.appendChild(confettiContainer);

    // Create multiple confetti pieces
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'absolute w-2 h-2 opacity-80';
      confetti.style.backgroundColor = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.animation = 'confetti-fall 3s linear forwards';
      confettiContainer.appendChild(confetti);
    }

    // Remove confetti after animation
    setTimeout(() => {
      document.body.removeChild(confettiContainer);
    }, 3000);
  };

  const getDescriptionText = (description: any) => {
    if (Array.isArray(description)) {
      return description.map(block =>
        block.children?.map((child: any) => child.text).join('') || ''
      ).join(' ');
    }
    return description || 'Nessuna descrizione disponibile';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="p-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center bg-primary/10 text-primary rounded-full px-4 py-2 mb-4">
            <CalendarDaysIcon className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">{t('form.bookingForm')}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t('subtitle')}
          </h2>
          <p className="text-gray-600">
            {t('description')}
          </p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800">{t('messages.success')}</span>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-800">{t('messages.error')}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Event Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <CalendarDaysIcon className="w-4 h-4 inline mr-1" />
              {t('form.selectEvent')}
            </label>
            {loadingEvents ? (
              <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mr-2"></div>
                  Loading events...
                </div>
              </div>
            ) : (
              <select
                {...register('event')}
                disabled={!!preSelectedEvent}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                  errors.event ? 'border-red-300' : 'border-gray-300'
                } ${preSelectedEvent ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              >
                <option value="">{t('form.selectEventPlaceholder')}</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.Title || 'Untitled Event'} - {new Date(event.createdAt).toLocaleDateString()}
                  </option>
                ))}
              </select>
            )}
            {errors.event && (
              <p className="mt-1 text-sm text-red-600">{errors.event.message}</p>
            )}
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CalendarDaysIcon className="w-4 h-4 inline mr-1" />
                {t('form.date')}
              </label>
              <input
                type="date"
                {...register('date')}
                disabled={!!preSelectedEvent}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                  errors.date ? 'border-red-300' : 'border-gray-300'
                } ${preSelectedEvent ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <UserIcon className="w-4 h-4 inline mr-1" />
                {t('form.parentName')}
              </label>
              <input
                type="text"
                {...register('name')}
                placeholder={t('form.parentNamePlaceholder')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
          </div>

          {/* Number of Kids and Adults */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <UserGroupIcon className="w-4 h-4 inline mr-1" />
                {t('form.numberOfKids')}
              </label>
              <select
                {...register('numberOfKids', { valueAsNumber: true })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                  errors.numberOfKids ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value={1}>1 bambino</option>
                <option value={2}>2 bambini</option>
                <option value={3}>3 bambini</option>
              </select>
              {errors.numberOfKids && (
                <p className="mt-1 text-sm text-red-600">{errors.numberOfKids.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <UserGroupIcon className="w-4 h-4 inline mr-1" />
                {t('form.numberOfAdults')}
              </label>
              <input
                type="number"
                min="1"
                max="10"
                {...register('numberOfAdults', { valueAsNumber: true })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                  errors.numberOfAdults ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.numberOfAdults && (
                <p className="mt-1 text-sm text-red-600">{errors.numberOfAdults.message}</p>
              )}
            </div>
          </div>

          {/* Kids Details */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800 flex items-center">
                <UserIcon className="w-5 h-5 mr-2 text-primary" />
                {t('form.kidsData')}
              </h3>
              <div className="text-sm text-gray-500">
                {t('form.kidsCount', { count: fields.length, total: numberOfKids })}
              </div>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-700">{t('form.childNumber', { number: index + 1 })}</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        {t('form.childName')}
                      </label>
                      <input
                        type="text"
                        {...register(`kids.${index}.name`)}
                        placeholder={t('form.childNamePlaceholder')}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                          errors.kids?.[index]?.name ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.kids?.[index]?.name && (
                        <p className="mt-1 text-xs text-red-600">{errors.kids[index]?.name?.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        {t('form.birthDate')}
                      </label>
                      <input
                        type="date"
                        {...register(`kids.${index}.birthDate`, {
                          onChange: (e) => handleBirthDateChange(index, e.target.value)
                        })}
                        max={new Date().toISOString().split('T')[0]}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                          errors.kids?.[index]?.birthDate ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.kids?.[index]?.birthDate && (
                        <p className="mt-1 text-xs text-red-600">{errors.kids[index]?.birthDate?.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        {t('form.age')}
                      </label>
                      <input
                        type="number"
                        {...register(`kids.${index}.age`, { valueAsNumber: true })}
                        min="0"
                        max="18"
                        placeholder="0"
                        className={`w-full px-3 py-2 border rounded-lg bg-gray-50 ${
                          errors.kids?.[index]?.age ? 'border-red-300' : 'border-gray-300'
                        }`}
                        readOnly
                      />
                      {errors.kids?.[index]?.age && (
                        <p className="mt-1 text-xs text-red-600">{errors.kids[index]?.age?.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <EnvelopeIcon className="w-4 h-4 inline mr-1" />
                {t('form.email')}
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder={t('form.emailPlaceholder')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <PhoneIcon className="w-4 h-4 inline mr-1" />
                {t('form.phone')}
              </label>
              <input
                type="tel"
                {...register('phone')}
                placeholder={t('form.phonePlaceholder')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* How did you hear */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <InformationCircleIcon className="w-4 h-4 inline mr-1" />
              {t('form.howDidYouHear')}
            </label>
            <select
              {...register('howDidYouHear')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            >
              <option value="">{t('form.howDidYouHearOptions.select')}</option>
              <option value="facebook">{t('form.howDidYouHearOptions.facebook')}</option>
              <option value="instagram">{t('form.howDidYouHearOptions.instagram')}</option>
              <option value="amici">{t('form.howDidYouHearOptions.friends')}</option>
              <option value="scuola">{t('form.howDidYouHearOptions.school')}</option>
              <option value="sito-web">{t('form.howDidYouHearOptions.website')}</option>
              <option value="volantino">{t('form.howDidYouHearOptions.flyer')}</option>
              <option value="altro">{t('form.howDidYouHearOptions.other')}</option>
            </select>
          </div>

          {/* Honeypot field - hidden from users but visible to bots */}
          <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
            <label htmlFor="website">Website (do not fill this field)</label>
            <input
              {...register('website')}
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-lg font-medium transition-all duration-200 shadow-lg ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 hover:transform hover:scale-[1.02] active:scale-[0.98]'
              } text-white focus:ring-4 focus:ring-blue-600/20`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  {t('form.submitting')}
                </div>
              ) : (
                t('form.submit')
              )}
            </button>
          </div>

          <div className="text-center text-sm text-gray-500 pt-4">
            {t('form.confirmation')}
          </div>
        </form>
      </div>

      {/* Booking Confirmation Modal */}
      {showModal && submittedData && selectedEventDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-0 md:p-4">
          <div className="bg-white w-full h-full md:w-auto md:h-auto md:rounded-2xl shadow-2xl md:max-w-4xl md:max-h-[95vh] overflow-y-auto flex flex-col modal-enter">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white p-6 md:rounded-t-2xl flex-shrink-0">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <div className="flex items-center mb-2">
                    <CheckCircleIcon className="w-8 h-8 mr-3 flex-shrink-0" />
                    <h2 className="text-xl md:text-2xl font-bold">Prenotazione Confermata!</h2>
                  </div>
                  <p className="text-emerald-100 text-sm md:text-base">
                    La tua prenotazione è stata inviata con successo. Riceverai una conferma via email.
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-white hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-white/10 flex-shrink-0"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 md:p-6 flex-1 overflow-y-auto">
              {/* Event Details */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CalendarDaysIcon className="w-6 h-6 mr-2 text-emerald-600" />
                  Dettagli dell'Evento
                </h3>

                <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-200">
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">
                    {selectedEventDetails.Title || 'Evento Senza Titolo'}
                  </h4>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-700">
                      <CalendarDaysIcon className="w-5 h-5 mr-3 text-emerald-600" />
                      <span className="font-medium">Data:</span>
                      <span className="ml-2">{submittedData.date ? new Date(submittedData.date).toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Data da definire'}</span>
                    </div>

                    {selectedEventDetails.time && (
                      <div className="flex items-center text-gray-700">
                        <ClockIcon className="w-5 h-5 mr-3 text-emerald-600" />
                        <span className="font-medium">Orario:</span>
                        <span className="ml-2">{selectedEventDetails.time}</span>
                      </div>
                    )}

                    {selectedEventDetails.location && (
                      <div className="flex items-center text-gray-700">
                        <MapPinIcon className="w-5 h-5 mr-3 text-emerald-600" />
                        <span className="font-medium">Luogo:</span>
                        <span className="ml-2">{selectedEventDetails.location}</span>
                      </div>
                    )}

                    {selectedEventDetails.duration && (
                      <div className="flex items-center text-gray-700">
                        <ClockIcon className="w-5 h-5 mr-3 text-emerald-600" />
                        <span className="font-medium">Durata:</span>
                        <span className="ml-2">{selectedEventDetails.duration} minuti</span>
                      </div>
                    )}

                    {(selectedEventDetails.ageMin !== undefined && selectedEventDetails.ageMax !== undefined) && (
                      <div className="flex items-center text-gray-700">
                        <UserIcon className="w-5 h-5 mr-3 text-emerald-600" />
                        <span className="font-medium">Età consigliata:</span>
                        <span className="ml-2">{selectedEventDetails.ageMin}-{selectedEventDetails.ageMax} anni</span>
                      </div>
                    )}

                    {/* Price preview temporarily disabled */}

                    {selectedEventDetails.availableSeats && (
                      <div className="flex items-center text-gray-700">
                        <TicketIcon className="w-5 h-5 mr-3 text-emerald-600" />
                        <span className="font-medium">Posti disponibili:</span>
                        <span className="ml-2">{selectedEventDetails.availableSeats}</span>
                      </div>
                    )}
                  </div>

                  {selectedEventDetails.Description && (
                    <div className="mt-4">
                      <h5 className="font-semibold text-gray-900 mb-2">Descrizione:</h5>
                      <p className="text-gray-700 leading-relaxed">
                        {getDescriptionText(selectedEventDetails.Description)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Booking Summary */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <UserGroupIcon className="w-6 h-6 mr-2 text-emerald-600" />
                  Riepilogo Prenotazione
                </h3>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Genitore:</span>
                      <p className="text-gray-900 font-semibold">{submittedData.name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Email:</span>
                      <p className="text-gray-900">{submittedData.email}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Telefono:</span>
                      <p className="text-gray-900">{submittedData.phone}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Adulti:</span>
                      <p className="text-gray-900">{submittedData.numberOfAdults}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-600">Bambini ({submittedData.numberOfKids}):</span>
                    <div className="mt-2 space-y-2">
                      {submittedData.kids.map((kid: any, index: number) => (
                        <div key={index} className="bg-white rounded-lg p-3 border">
                          <p className="font-medium text-gray-900">{kid.name}</p>
                          <p className="text-sm text-gray-600">
                            {kid.age} anni - Nato il {new Date(kid.birthDate).toLocaleDateString('it-IT')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {submittedData.howDidYouHear && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Come ci hai conosciuto:</span>
                      <p className="text-gray-900">{submittedData.howDidYouHear}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Important Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 mr-2" />
                  Informazioni Importanti
                </h4>
                <ul className="text-blue-800 space-y-2 text-sm">
                  <li>• Riceverai una email di conferma all'indirizzo fornito</li>
                  <li>• Ti contatteremo per confermare i dettagli dell'evento</li>
                  <li>• In caso di domande, puoi contattarci al numero fornito nella conferma</li>
                  <li>• Ti consigliamo di arrivare 15 minuti prima dell'inizio</li>
                  <li>• Porta con te un documento di identità per il check-in</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-4 md:px-6 py-4 md:rounded-b-2xl flex-shrink-0">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-600 text-center md:text-left">
                  Grazie per aver scelto i nostri concerti per famiglie!
                </p>
                <button
                  onClick={handleCloseModal}
                  className="bg-emerald-600 text-white px-6 py-3 md:py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium w-full md:w-auto"
                >
                  Chiudi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confetti Animation Styles */}
      <style jsx global>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes modal-fade-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .modal-enter {
          animation: modal-fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}