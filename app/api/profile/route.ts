import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// PATCH - Update profile
export async function PATCH(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { slug, editToken, updates } = body;

  if (!slug || !editToken) {
    return Response.json({ error: 'Missing slug or editToken' }, { status: 400 });
  }

  // Verify edit token
  const { data: profile, error: fetchError } = await supabase
    .from('mvp_beknown_profiles')
    .select('edit_token')
    .eq('slug', slug)
    .single();

  if (fetchError || !profile || profile.edit_token !== editToken) {
    return Response.json({ error: 'Unauthorized' }, { status: 403 });
  }

  // Only allow updating safe fields
  const allowedFields = ['name', 'tagline', 'skills', 'thinking', 'projects', 'domains', 'learning'];
  const safeUpdates: Record<string, unknown> = {};
  for (const key of allowedFields) {
    if (updates[key] !== undefined) {
      safeUpdates[key] = updates[key];
    }
  }

  if (Object.keys(safeUpdates).length === 0) {
    return Response.json({ error: 'No valid fields to update' }, { status: 400 });
  }

  safeUpdates.updated_at = new Date().toISOString();

  const { error: updateError } = await supabase
    .from('mvp_beknown_profiles')
    .update(safeUpdates)
    .eq('slug', slug);

  if (updateError) {
    return Response.json({ error: 'Failed to update profile' }, { status: 500 });
  }

  return Response.json({ success: true, slug });
}

// DELETE - Remove profile
export async function DELETE(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { slug, editToken } = body;

  if (!slug || !editToken) {
    return Response.json({ error: 'Missing slug or editToken' }, { status: 400 });
  }

  // Verify edit token
  const { data: profile, error: fetchError } = await supabase
    .from('mvp_beknown_profiles')
    .select('edit_token')
    .eq('slug', slug)
    .single();

  if (fetchError || !profile || profile.edit_token !== editToken) {
    return Response.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { error: deleteError } = await supabase
    .from('mvp_beknown_profiles')
    .delete()
    .eq('slug', slug);

  if (deleteError) {
    return Response.json({ error: 'Failed to delete profile' }, { status: 500 });
  }

  return Response.json({ success: true, deleted: slug });
}
