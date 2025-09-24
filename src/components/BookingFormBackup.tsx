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
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface BookingFormProps {
  preSelectedEvent?: any;
}

export default function BookingFormBackup({ preSelectedEvent }: BookingFormProps = {}) {
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
    howDidYouHear: z.string().optional()
  }).refine((data) => data.kids.length === data.numberOfKids, {
    message: t('validation.kidsCountMismatch'),
    path: ["numberOfKids"]
  });

  type BookingFormData = z.infer<typeof bookingSchema>;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [events, setEvents] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

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
      if (preSelectedEvent.attributes?.date) {
        setValue('date', preSelectedEvent.attributes.date);
      }
      setLoadingEvents(false);
      return;
    }

    const loadEvents = async () => {
      try {
        const { strapiEventAPI } = await import('@/lib/strapi');
        // For now, let's get all events with bookingEnabled=true
        // and filter dates on the frontend
        const response = await strapiEventAPI.getEvents({
          filters: {
            bookingEnabled: true
          },
          sort: 'date:asc'
        });
        
        // Filter out past events on the frontend
        const today = new Date().toISOString().split('T')[0];
        const futureEvents = (response.data || []).filter((event: any) => {
          return event.attributes && event.attributes.date && event.attributes.date >= today;
        });
        
        setEvents(futureEvents);
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
        status: 'pending'
      };
      
      console.log('=== SENDING TO STRAPI ===');
      console.log('Booking data:', JSON.stringify(bookingData, null, 2));
      
      // Create booking via Strapi API
      const response = await strapiBookingAPI.createBooking(bookingData);
      
      console.log('=== STRAPI RESPONSE ===');
      console.log('Response:', response);
      
      setSubmitStatus('success');
      reset();
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
                    {event.attributes?.Title || event.Title} - {event.attributes?.date ? new Date(event.attributes.date).toLocaleDateString() : ''} {event.attributes?.time && `at ${event.attributes.time}`}
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
    </div>
  );
}