import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Honeypot check
  if (body.website) {
    return NextResponse.json({ success: true }); // silently drop bot submissions
  }

  const db = createServiceClient();

  // Fetch event title for denormalization
  let eventTitle: string | null = null;
  if (body.event_id) {
    const { data: evt } = await db
      .from('events')
      .select('title')
      .eq('id', body.event_id)
      .single();
    eventTitle = evt?.title ?? null;
  }

  // Strip honeypot + any unknown fields before inserting
  const { website: _honeypot, ...bookingFields } = body;

  const { data, error } = await db
    .from('bookings')
    .insert([{ ...bookingFields, event_title: eventTitle }])
    .select()
    .single();

  if (error) {
    console.error('Booking insert error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Send confirmation email via Brevo
  try {
    await sendConfirmationEmail(data);
  } catch (emailError) {
    console.error('Email send error (non-fatal):', emailError);
  }

  return NextResponse.json({ data }, { status: 201 });
}

async function sendConfirmationEmail(booking: Record<string, unknown>) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return;

  const fromEmail = process.env.DEFAULT_FROM_EMAIL ?? 'info@concertoconmammaepapa.it';

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #059669, #2563eb); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Prenotazione Confermata!</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">di Concerto con Mamma e Papà ®</p>
      </div>
      <div style="background: #f9fafb; padding: 32px; border-radius: 0 0 12px 12px;">
        <p style="color: #374151;">Ciao <strong>${booking.parent_name}</strong>,</p>
        <p style="color: #374151;">La tua prenotazione è stata ricevuta con successo!</p>

        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #059669; margin-top: 0;">Dettagli prenotazione</h3>
          <p><strong>Evento:</strong> ${booking.event_title ?? 'N/A'}</p>
          ${booking.selected_time ? `<p><strong>Orario:</strong> ${booking.selected_time}</p>` : ''}
          <p><strong>Bambini:</strong> ${booking.number_kids}</p>
          <p><strong>Adulti:</strong> ${booking.number_adults}</p>
          <p><strong>Metodo di pagamento:</strong> ${booking.payment_method === 'bonifico' ? 'Bonifico bancario' : 'Contanti'}</p>
        </div>

        ${booking.payment_method === 'bonifico' ? `
        <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <strong style="color: #92400e;">⚠️ Importante per il bonifico:</strong>
          <p style="color: #92400e; margin: 8px 0 0;">Inserisci nella causale: "<strong>Concerto con Mamma e Papà - ${(booking.kid_names as string)?.split(',')[0] ?? 'bambino'}</strong>"</p>
        </div>
        ` : ''}

        <p style="color: #6b7280; font-size: 14px;">Ti consigliamo di arrivare 15 minuti prima dell'inizio. Porta con te un documento di identità per il check-in.</p>
        <p style="color: #6b7280; font-size: 14px;">Per informazioni: <a href="mailto:${fromEmail}">${fromEmail}</a></p>
      </div>
    </div>
  `;

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Concerto con Mamma e Papà', email: fromEmail },
      to: [{ email: booking.email, name: booking.parent_name as string }],
      subject: `Prenotazione confermata — ${booking.event_title ?? 'Evento'}`,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Brevo API ${res.status}: ${errorBody}`);
  }

  console.log('Brevo email sent to', booking.email);
}
