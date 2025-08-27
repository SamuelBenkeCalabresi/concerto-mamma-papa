import { z } from 'zod';

export const bookingSchema = z.object({
  parentName: z
    .string()
    .min(2, 'Il nome deve contenere almeno 2 caratteri')
    .max(50, 'Il nome non può superare i 50 caratteri'),
    
  email: z
    .string()
    .email('Inserisci un indirizzo email valido')
    .min(5, 'L\'email è troppo corta')
    .max(100, 'L\'email è troppo lunga'),
    
  phone: z
    .string()
    .regex(
      /^(\+39)?[\s-]?([0-9]{2,4})[\s-]?([0-9]{6,8})$/,
      'Inserisci un numero di telefono valido (es. +39 06 1234567)'
    ),
    
  childrenCount: z
    .number()
    .min(1, 'È richiesto almeno un bambino')
    .max(6, 'Massimo 6 bambini per prenotazione'),
    
  childrenAges: z
    .string()
    .min(1, 'Inserisci l\'età dei bambini')
    .refine(
      (ages) => {
        const ageArray = ages.split(',').map(age => age.trim());
        return ageArray.every(age => {
          const num = parseInt(age);
          return !isNaN(num) && num >= 0 && num <= 6;
        });
      },
      'Le età devono essere numeri tra 0 e 6, separati da virgole (es. 2, 4, 6)'
    ),
    
  eventId: z
    .string()
    .min(1, 'Seleziona un concerto'),
    
  specialNeeds: z
    .string()
    .optional()
});

export type BookingFormData = z.infer<typeof bookingSchema>;