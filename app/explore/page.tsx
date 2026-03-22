import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Profiles — BeKnown',
  description: 'Browse AI-witnessed professional profiles on BeKnown. See how AI sees the people who use it.',
};

export const revalidate = 60; // Revalidate every minute

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ProfileSummary {
  slug: string;
  name: string;
  tagline: string;
  domains: string[];
  meta: { generated_by: string; confidence: number };
  created_at: string;
}

const providerColors: Record<string, string> = {
  claude: '#D97757',
  chatgpt: '#10A37F',
  gemini: '#4285F4',
};

export default async function ExplorePage() {
  const { data: profiles } = await supabase
    .from('mvp_beknown_profiles')
    .select('slug, name, tagline, domains, meta, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <main className="flex-1 max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md border-b border-[#27272A]/50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-heading text-lg font-bold text-[#F5F5F5] flex items-center gap-2">
            <span className="text-xl">👁️</span> BeKnown
          </Link>
          <Link
            href="/generate"
            className="text-sm font-medium text-[#E5C07B] hover:text-[#F5F5F5] transition-colors"
          >
            Get Yours →
          </Link>
        </div>
      </header>

      <div className="pt-14">
        <h1 className="font-heading text-4xl font-bold mb-2">Explore Profiles</h1>
        <p className="text-[#71717A] mb-10">
          Real professionals, witnessed by their AI. Browse to see what BeKnown profiles look like.
        </p>

        {(!profiles || profiles.length === 0) ? (
          <div className="text-center py-20">
            <p className="text-2xl mb-4">👁️</p>
            <p className="text-[#71717A] text-lg mb-6">No profiles yet. Be the first!</p>
            <Link
              href="/generate"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-heading font-semibold bg-[#E5C07B] text-[#0A0A0B] hover:opacity-90 transition-all duration-200"
            >
              Generate Your Profile
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(profiles as ProfileSummary[]).map((profile) => (
              <Link
                key={profile.slug}
                href={`/p/${profile.slug}`}
                className="group bg-[#141416] border border-[#27272A] rounded-xl p-6 transition-all duration-300 hover:border-[#E5C07B]/50 hover:scale-[1.01]"
              >
                <div className="flex items-start justify-between mb-2">
                  <h2 className="font-heading text-xl font-bold group-hover:text-[#E5C07B] transition-colors">
                    {profile.name}
                  </h2>
                  <span
                    className="text-xs px-2 py-0.5 rounded font-mono shrink-0 ml-2"
                    style={{
                      backgroundColor: `${providerColors[profile.meta.generated_by] || '#71717A'}20`,
                      color: providerColors[profile.meta.generated_by] || '#71717A'
                    }}
                  >
                    {profile.meta.generated_by}
                  </span>
                </div>
                <p className="text-[#71717A] text-sm italic mb-4">{profile.tagline}</p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.domains.slice(0, 4).map((domain, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-[#1E1E21] text-[#71717A]">
                      {domain}
                    </span>
                  ))}
                  {profile.domains.length > 4 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#1E1E21] text-[#71717A]">
                      +{profile.domains.length - 4}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
