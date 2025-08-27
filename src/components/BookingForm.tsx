'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { bookingSchema, type BookingFormData } from '@/lib/validations/booking';
import { mockEvents } from '@/data/mockEvents';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  UserGroupIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

interface BookingFormProps {
  preselectedEventId?: string;
  className?: string;
}

export default function BookingForm({ preselectedEventId, className = '' }: BookingFormProps) {
  const t = useTranslations('Booking');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      eventId: preselectedEventId || '',
      childrenCount: 1,
    }
  });

  const watchedEventId = watch('eventId');
  const selectedEvent = mockEvents.find(event => event.id === watchedEventId);

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Booking submitted:', data);
      setSubmitSuccess(true);
      reset();
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableEvents = mockEvents.filter(event => event.availableSeats > 0);

  if (submitSuccess) {
    return (
      <div className={`card bg-base-100 shadow-xl ${className}`}>
        <div className="card-body text-center">
          <div className="text-success text-6xl mb-4">✓</div>
          <h3 className="text-2xl font-bold text-success mb-2">Prenotazione Inviata!</h3>
          <p className="text-neutral/70">
            La tua prenotazione è stata ricevuta con successo. Riceverai una conferma via email entro 24 ore.
          </p>
          <div className="card-actions justify-center mt-4">
            <button 
              className="btn btn-primary" 
              onClick={() => setSubmitSuccess(false)}
            >
              Nuova Prenotazione
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card bg-base-100 shadow-xl ${className}`}>
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold text-center mb-6">
          {t('title')}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Parent Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center">
                <UserIcon className="h-4 w-4 mr-2" />
                {t('form.parentName')}
              </span>
            </label>
            <input
              type="text"
              placeholder={t('form.parentNamePlaceholder')}
              className={`input input-bordered ${errors.parentName ? 'input-error' : ''}`}
              {...register('parentName')}
            />
            {errors.parentName && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.parentName.message}</span>
              </label>
            )}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center">
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                {t('form.email')}
              </span>
            </label>
            <input
              type="email"
              placeholder={t('form.emailPlaceholder')}
              className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
              {...register('email')}
            />
            {errors.email && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.email.message}</span>
              </label>
            )}
          </div>

          {/* Phone */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center">
                <PhoneIcon className="h-4 w-4 mr-2" />
                {t('form.phone')}
              </span>
            </label>
            <input
              type="tel"
              placeholder={t('form.phonePlaceholder')}
              className={`input input-bordered ${errors.phone ? 'input-error' : ''}`}
              {...register('phone')}
            />
            {errors.phone && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.phone.message}</span>
              </label>
            )}
          </div>

          {/* Event Selection */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center">
                <CalendarDaysIcon className="h-4 w-4 mr-2" />
                {t('form.eventId')}
              </span>
            </label>
            <select
              className={`select select-bordered ${errors.eventId ? 'select-error' : ''}`}
              {...register('eventId')}
            >
              <option value="">{t('form.eventPlaceholder')}</option>
              {availableEvents.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title} - {new Date(event.date).toLocaleDateString('it-IT')} alle {event.time}
                  {event.isFree ? ' (Gratuito)' : ` (€${event.price})`}
                </option>
              ))}
            </select>
            {errors.eventId && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.eventId.message}</span>
              </label>
            )}
            {selectedEvent && (
              <label className="label">
                <span className="label-text-alt text-info">
                  Posti disponibili: {selectedEvent.availableSeats}
                </span>
              </label>
            )}
          </div>

          {/* Children Count */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center">
                <UserGroupIcon className="h-4 w-4 mr-2" />
                {t('form.childrenCount')}
              </span>
            </label>
            <select
              className={`select select-bordered ${errors.childrenCount ? 'select-error' : ''}`}
              {...register('childrenCount', { valueAsNumber: true })}
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'bambino' : 'bambini'}
                </option>
              ))}
            </select>
            {errors.childrenCount && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.childrenCount.message}</span>
              </label>
            )}
          </div>

          {/* Children Ages */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">{t('form.childrenAges')}</span>
            </label>
            <input
              type="text"
              placeholder={t('form.childrenAgesPlaceholder')}
              className={`input input-bordered ${errors.childrenAges ? 'input-error' : ''}`}
              {...register('childrenAges')}
            />
            {errors.childrenAges && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.childrenAges.message}</span>
              </label>
            )}
            <label className="label">
              <span className="label-text-alt">
                Inserisci le età separate da virgole (es. 2, 4, 6)
              </span>
            </label>
          </div>

          {/* Special Needs */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center">
                <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                {t('form.specialNeeds')} <span className="text-neutral/60 ml-1">(opzionale)</span>
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder={t('form.specialNeedsPlaceholder')}
              {...register('specialNeeds')}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-8">
            <button 
              type="submit" 
              className={`btn btn-primary btn-lg ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? t('form.submitting') : t('form.submit')}
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="alert alert-info mt-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div className="text-sm">
            <p className="font-medium">Informazioni importanti:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>La prenotazione sarà confermata entro 24 ore via email</li>
              <li>I bambini devono essere sempre accompagnati da un adulto</li>
              <li>Per eventi gratuiti la prenotazione è comunque obbligatoria</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}