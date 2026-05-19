import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import * as XLSX from 'xlsx';

async function getSession() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll() {},
      },
    }
  );
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get('event_id');

  const db = createServiceClient();
  let query = db.from('bookings').select('*').order('created_at', { ascending: false });
  if (eventId && eventId !== 'all') {
    query = query.eq('event_id', eventId);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = (data ?? []).map((b) => ({
    'ID': b.id,
    'Data prenotazione': new Date(b.created_at).toLocaleString('it-IT'),
    'Evento': b.event_title ?? '',
    'Orario scelto': b.selected_time ?? '',
    'Genitore': b.parent_name,
    'Email': b.email,
    'Telefono': b.phone,
    'N. bambini': b.number_kids,
    'N. adulti': b.number_adults,
    'Nomi bambini': b.kid_names ?? '',
    'Metodo pagamento': b.payment_method,
    'Cognome': b.cognome ?? '',
    'Nome': b.nome ?? '',
    'Codice Fiscale': b.codice_fiscale ?? '',
    'Luogo nascita': b.luogo_nascita ?? '',
    'Data nascita': b.data_nascita ?? '',
    'Indirizzo': b.indirizzo_residenza ?? '',
    'CAP': b.cap ?? '',
    'Città': b.citta ?? '',
    'Come ci ha conosciuto': b.how_did_you_hear ?? '',
    'Stato': b.status,
    'Lista attesa': b.is_waitlist ? 'Sì' : 'No',
    'Note': b.notes ?? '',
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Prenotazioni');

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

  return new NextResponse(buf, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="prenotazioni-${eventId ?? 'all'}-${Date.now()}.xlsx"`,
    },
  });
}
