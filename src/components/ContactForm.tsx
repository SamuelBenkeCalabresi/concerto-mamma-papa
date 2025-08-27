'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { 
  UserIcon, 
  EnvelopeIcon, 
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Il nome deve contenere almeno 2 caratteri')
    .max(50, 'Il nome non può superare i 50 caratteri'),
    
  email: z
    .string()
    .email('Inserisci un indirizzo email valido')
    .min(5, 'L\'email è troppo corta')
    .max(100, 'L\'email è troppo lunga'),
    
  subject: z
    .string()
    .min(5, 'L\'oggetto deve contenere almeno 5 caratteri')
    .max(100, 'L\'oggetto non può superare i 100 caratteri'),
    
  message: z
    .string()
    .min(10, 'Il messaggio deve contenere almeno 10 caratteri')
    .max(1000, 'Il messaggio non può superare i 1000 caratteri'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const t = useTranslations('Contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Contact form submitted:', data);
      setSubmitSuccess(true);
      reset();
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body text-center">
          <div className="text-success text-6xl mb-4">✓</div>
          <h3 className="text-2xl font-bold text-success mb-2">Messaggio Inviato!</h3>
          <p className="text-neutral/70">
            Il tuo messaggio è stato inviato con successo. Ti risponderemo entro 24 ore.
          </p>
          <div className="card-actions justify-center mt-4">
            <button 
              className="btn btn-primary" 
              onClick={() => setSubmitSuccess(false)}
            >
              Invia Altro Messaggio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title text-xl mb-6">Inviaci un Messaggio</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center">
                <UserIcon className="h-4 w-4 mr-2" />
                {t('form.name')}
              </span>
            </label>
            <input
              type="text"
              placeholder={t('form.namePlaceholder')}
              className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
              {...register('name')}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.name.message}</span>
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

          {/* Subject */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center">
                <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                {t('form.subject')}
              </span>
            </label>
            <input
              type="text"
              placeholder={t('form.subjectPlaceholder')}
              className={`input input-bordered ${errors.subject ? 'input-error' : ''}`}
              {...register('subject')}
            />
            {errors.subject && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.subject.message}</span>
              </label>
            )}
          </div>

          {/* Message */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">{t('form.message')}</span>
            </label>
            <textarea
              className={`textarea textarea-bordered h-32 ${errors.message ? 'textarea-error' : ''}`}
              placeholder={t('form.messagePlaceholder')}
              {...register('message')}
            ></textarea>
            {errors.message && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.message.message}</span>
              </label>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-control">
            <button 
              type="submit" 
              className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {!isSubmitting && <PaperAirplaneIcon className="h-4 w-4 mr-2" />}
              {isSubmitting ? 'Invio in corso...' : t('form.send')}
            </button>
          </div>
        </form>

        {/* Contact Info */}
        <div className="divider">oppure</div>
        
        <div className="text-center text-sm text-neutral/70">
          <p>Contattaci direttamente:</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-2">
            <a 
              href="mailto:info@concertoconmammaepapa.it" 
              className="link link-primary"
            >
              info@concertoconmammaepapa.it
            </a>
            <a 
              href="tel:+390612345678" 
              className="link link-primary"
            >
              +39 06 123 4567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}