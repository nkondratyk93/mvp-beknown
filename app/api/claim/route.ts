import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { nonce, name, tagline, skills, thinking, projects, domains, learning, meta } = body;

  if (!nonce || !name || !tagline || !skills || !thinking || !projects || !domains || !learning || !meta) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Validate nonce - uses 'code' column in DB
  const { data: nonceData, error: nonceError } = await supabase
    .from('mvp_beknown_nonces')
    .select('*')
    .eq('code', nonce)
    .single();

  if (nonceError || !nonceData) {
    return Response.json({ error: 'Invalid nonce' }, { status: 400 });
  }

  if (nonceData.used) {
    return Response.json({ error: 'Nonce already used' }, { status: 400 });
  }

  if (new Date(nonceData.expires_at) < new Date()) {
    return Response.json({ error: 'Nonce expired. Please generate a new prompt.' }, { status: 400 });
  }

  // Mark nonce as used
  await supabase
    .from('mvp_beknown_nonces')
    .update({ used: true })
    .eq('code', nonce);

  // Generate slug from name
  let slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  // Check if slug exists
  const { data: existing } = await supabase
    .from('mvp_beknown_profiles')
    .select('slug')
    .eq('slug', slug)
    .single();

  if (existing) {
    const suffix = Math.random().toString(36).slice(2, 6);
    slug = `${slug}-${suffix}`;
  }

  // Insert profile - matches actual DB schema
  const { error: insertError } = await supabase
    .from('mvp_beknown_profiles')
    .insert({
      slug,
      name,
      tagline,
      skills,
      thinking,
      projects,
      domains,
      learning,
      meta,
      nonce,
      claimed: true,
      published: true,
      raw_json: body,
    });

  if (insertError) {
    console.error('Profile insert error:', insertError);
    return Response.json({ error: 'Failed to save profile' }, { status: 500 });
  }

  return Response.json({
    slug,
    url: `https://beknown.no-humans.app/p/${slug}`,
  });
}
