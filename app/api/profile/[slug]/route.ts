import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from('mvp_beknown_profiles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return Response.json({ error: 'Profile not found' }, { status: 404 });
  }

  return Response.json(data);
}
