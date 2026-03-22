import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST() {
  const nonce = 'BK-' + Math.random().toString(16).slice(2, 10).toUpperCase();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

  const { error } = await supabase
    .from('mvp_beknown_nonces')
    .insert({ code: nonce, expires_at: expiresAt, used: false });

  if (error) {
    console.error('Nonce insert error:', error);
    return Response.json({ error: 'Failed to create nonce' }, { status: 500 });
  }

  return Response.json({ nonce, expires_at: expiresAt });
}
