'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocale } from 'next-intl';
import type { Event } from '@/lib/supabase';
import {
  CalendarDaysIcon,
  UserIcon,
  UserGroupIcon,
  EnvelopeIcon,
  PhoneIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const kidSchema = z.object({
  name: z.string().min(2, 'Nome obbligatorio'),
  birthDate: z.string().min(1, 'Data di nascita obbligatoria'),
  age: z.number().min(0).max(18),
});

const bookingSchema = z.object({
  selected_time: z.string().optional(),
  parent_name: z.string().min(2, 'Nome obbligatorio'),
  number_kids: z.number().min(1).max(3),
  kids: z.array(kidSchema).min(1).max(3),
  number_adults: z.number().min(1),
  email: z.string().email('Email non valida'),
  phone: z.string().min(8, 'Telefono non valido'),
  how_did_you_hear: z.string().optional(),
  website: z.string().optional(), // honeypot
  payment_method: z.enum(['contanti', 'bonifico']),
  cognome: z.string().min(2, 'Cognome obbligatorio'),
  nome: z.string().min(2, 'Nome obbligatorio'),
  codice_fiscale: z.string().length(16, 'Il codice fiscale deve essere di 16 caratteri'),
  luogo_nascita: z.string().min(2, 'Luogo di nascita obbligatorio'),
  data_nascita: z.string().min(1, 'Data di nascita obbligatoria'),
  indirizzo_residenza: z.string().min(5, 'Indirizzo obbligatorio'),
  cap: z.string().min(5, 'CAP obbligatorio'),
  citta: z.string().min(2, 'Città obbligatoria'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface Props {
  event: Event;
  disabled?: boolean;
}

export default function SupabaseBookingForm({ event, disabled = false }: Props) {
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      number_kids: 1,
      number_adults: 2,
      kids: [{ name: '', birthDate: '', age: 0 }],
      payment_method: 'contanti',
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'kids' });
  const numberOfKids = watch('number_kids');

  React.useEffect(() => {
    const current = fields.length;
    if (numberOfKids > current) {
      for (let i = current; i < numberOfKids; i++) append({ name: '', birthDate: '', age: 0 });
    } else if (numberOfKids < current) {
      for (let i = current - 1; i >= numberOfKids; i--) remove(i);
    }
  }, [numberOfKids, fields.length, append, remove]);

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
    return Math.max(0, age);
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const kidNames = data.kids.map(k => k.name).join(', ');

    const payload = {
      event_id: event.id,
      selected_time: data.selected_time || null,
      parent_name: data.parent_name,
      email: data.email,
      phone: data.phone,
      number_kids: data.number_kids,
      number_adults: data.number_adults,
      kid_names: kidNames,
      payment_method: data.payment_method,
      needs_receipt: true,
      cognome: data.cognome,
      nome: data.nome,
      codice_fiscale: data.codice_fiscale,
      luogo_nascita: data.luogo_nascita,
      data_nascita: data.data_nascita,
      indirizzo_residenza: data.indirizzo_residenza,
      cap: data.cap,
      citta: data.citta,
      how_did_you_hear: data.how_did_you_hear || null,
      website: data.website || null,
      status: 'pending',
      is_waitlist: false,
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Booking failed');
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-8 text-center">
        <CheckCircleIcon className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Prenotazione Confermata!</h2>
        <p className="text-gray-600 mb-2">La tua prenotazione è stata inviata con successo.</p>
        <p className="text-gray-500 text-sm">Riceverai una email di conferma all'indirizzo fornito.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100">
      <div className="p-8">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center bg-emerald-50 text-emerald-700 rounded-full px-4 py-2 mb-3">
            <CalendarDaysIcon className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Modulo di prenotazione</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
          {event.description && (
            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">{event.description}</p>
          )}
        </div>

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-800">Si è verificato un errore. Riprova o contattaci.</span>
          </div>
        )}

        {disabled && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
            <CalendarDaysIcon className="h-6 w-6 text-amber-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-amber-800">Evento scaduto</p>
              <p className="text-sm text-amber-700">Le prenotazioni per questo evento sono chiuse.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <fieldset disabled={disabled} className={disabled ? 'opacity-50 pointer-events-none' : ''}>
          {/* Time selection */}
          {event.times && event.times.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ClockIcon className="w-4 h-4 inline mr-1" />
                Orario *
              </label>
              <select
                {...register('selected_time')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition ${errors.selected_time ? 'border-red-300' : 'border-gray-300'}`}
              >
                <option value="">Seleziona un orario</option>
                {event.times.map((t, i) => (
                  <option key={i} value={t}>{t}</option>
                ))}
              </select>
            </div>
          )}

          {/* Parent name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <UserIcon className="w-4 h-4 inline mr-1" />
              Nome genitore *
            </label>
            <input
              {...register('parent_name')}
              placeholder="Mario Rossi"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition ${errors.parent_name ? 'border-red-300' : 'border-gray-300'}`}
            />
            {errors.parent_name && <p className="mt-1 text-sm text-red-600">{errors.parent_name.message}</p>}
          </div>

          {/* Kids / adults count */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <UserGroupIcon className="w-4 h-4 inline mr-1" />
                N. bambini *
              </label>
              <select
                {...register('number_kids', { valueAsNumber: true })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <UserGroupIcon className="w-4 h-4 inline mr-1" />
                N. adulti *
              </label>
              <input
                type="number" min={1} max={10}
                {...register('number_adults', { valueAsNumber: true })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
              />
            </div>
          </div>

          {/* Kids details */}
          <div className="bg-gray-50 rounded-xl p-5 space-y-4">
            <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-emerald-600" />
              Dati bambini
            </h3>
            {fields.map((field, index) => (
              <div key={field.id} className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm font-medium text-gray-600 mb-3">Bambino {index + 1}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Nome</label>
                    <input
                      {...register(`kids.${index}.name`)}
                      placeholder="Nome"
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition ${errors.kids?.[index]?.name ? 'border-red-300' : 'border-gray-300'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Data di nascita</label>
                    <input
                      type="date"
                      max={new Date().toISOString().split('T')[0]}
                      {...register(`kids.${index}.birthDate`, {
                        onChange: (e) => setValue(`kids.${index}.age`, calculateAge(e.target.value)),
                      })}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition ${errors.kids?.[index]?.birthDate ? 'border-red-300' : 'border-gray-300'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Età</label>
                    <input
                      type="number"
                      {...register(`kids.${index}.age`, { valueAsNumber: true })}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <EnvelopeIcon className="w-4 h-4 inline mr-1" />
                Email *
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="mario@esempio.it"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <PhoneIcon className="w-4 h-4 inline mr-1" />
                Telefono *
              </label>
              <input
                type="tel"
                {...register('phone')}
                placeholder="+39 333 000 0000"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition ${errors.phone ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Receipt / fiscal data */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 space-y-4">
            <p className="text-sm font-semibold text-amber-800">Dati per la ricevuta (relativi all'adulto di riferimento)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'cognome' as const, label: 'Cognome *', placeholder: 'Rossi' },
                { name: 'nome' as const, label: 'Nome *', placeholder: 'Mario' },
                { name: 'codice_fiscale' as const, label: 'Codice Fiscale *', placeholder: 'RSSMRA80A01H501U', maxLen: 16 },
                { name: 'luogo_nascita' as const, label: 'Luogo di Nascita *', placeholder: 'Roma' },
                { name: 'indirizzo_residenza' as const, label: 'Indirizzo *', placeholder: 'Via Roma 1' },
                { name: 'citta' as const, label: 'Città *', placeholder: 'Roma' },
                { name: 'cap' as const, label: 'CAP *', placeholder: '00100', maxLen: 5 },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{f.label}</label>
                  <input
                    {...register(f.name)}
                    maxLength={f.maxLen}
                    placeholder={f.placeholder}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition ${errors[f.name] ? 'border-red-300' : 'border-gray-300'}`}
                  />
                  {errors[f.name] && <p className="mt-1 text-xs text-red-600">{errors[f.name]?.message}</p>}
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Data di Nascita *</label>
                <input
                  type="date"
                  {...register('data_nascita')}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition ${errors.data_nascita ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors.data_nascita && <p className="mt-1 text-xs text-red-600">{errors.data_nascita.message}</p>}
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">💳 Metodo di pagamento</p>
            {(['contanti', 'bonifico'] as const).map(method => (
              <label key={method} className="flex items-center cursor-pointer bg-white rounded-lg p-4 border-2 border-gray-200 hover:border-emerald-400 transition">
                <input
                  type="radio"
                  {...register('payment_method')}
                  value={method}
                  className="mr-3 h-5 w-5 text-emerald-600"
                />
                <span className="font-semibold text-gray-800 capitalize">
                  {method === 'contanti' ? 'Contanti (al momento dell\'evento)' : 'Bonifico bancario'}
                </span>
              </label>
            ))}
            {watch('payment_method') === 'bonifico' && (
              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                <p className="text-sm font-bold text-yellow-800">
                  ⚠️ Nella causale del bonifico scrivi: "Concerto con Mamma e Papà - {watch('kids')?.[0]?.name || 'bambino'}"
                </p>
              </div>
            )}
          </div>

          {/* How did you hear */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <InformationCircleIcon className="w-4 h-4 inline mr-1" />
              Come ci hai conosciuto?
            </label>
            <select
              {...register('how_did_you_hear')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
            >
              <option value="">Seleziona...</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="amici">Amici/parenti</option>
              <option value="scuola">Scuola/asilo</option>
              <option value="volantino">Volantino</option>
              <option value="sito-web">Sito web</option>
              <option value="coupon-regalo">Coupon regalo</option>
              <option value="altro">Altro</option>
            </select>
          </div>

          {/* Honeypot */}
          <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
            <input {...register('website')} type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {/* GDPR */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-500 text-center">
            Inviando il modulo acconsenti al trattamento dei dati personali ai sensi del GDPR.{' '}
            <a href={`/${locale}/privacy-policy`} className="text-emerald-600 underline">Privacy Policy</a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl transition"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Invio in corso...
              </span>
            ) : 'Conferma prenotazione'}
          </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
