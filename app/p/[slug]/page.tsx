import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import ProfileSkills from './profile-skills';
import ProfileActions from './profile-actions';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Profile {
  slug: string;
  name: string;
  tagline: string;
  skills: { name: string; level: string; evidence: string }[];
  thinking: { style: string; description: string };
  projects: { name: string; description: string; tech: string[]; status: string }[];
  domains: string[];
  learning: { velocity: string; pattern: string };
  meta: { generated_by: string; conversation_depth: string; confidence: number };
  created_at: string;
}

async function getProfile(slug: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('mvp_beknown_profiles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data as Profile;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getProfile(slug);
  if (!profile) return { title: 'Profile Not Found' };

  return {
    title: `${profile.name} — BeKnown`,
    description: profile.tagline,
    openGraph: {
      title: `${profile.name} — BeKnown`,
      description: profile.tagline,
      url: `https://beknown.no-humans.app/p/${slug}`,
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.name} — BeKnown`,
      description: profile.tagline,
    },
  };
}

const levelColors: Record<string, string> = {
  expert: '#E5C07B',
  advanced: '#4285F4',
  intermediate: '#10A37F',
  learning: '#71717A',
};

const levelWidths: Record<string, number> = {
  expert: 100,
  advanced: 75,
  intermediate: 50,
  learning: 25,
};

const statusColors: Record<string, string> = {
  shipped: '#10A37F',
  building: '#E5C07B',
  exploring: '#4285F4',
};

const velocityLabels: Record<string, string> = {
  fast: 'Rapid Learner',
  moderate: 'Steady Learner',
  steady: 'Deliberate Learner',
};

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await getProfile(slug);
  if (!profile) notFound();

  const generationDate = new Date(profile.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-10">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2">{profile.name}</h1>
        <p className="text-xl text-[#71717A] italic mb-4">{profile.tagline}</p>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs px-2 py-1 rounded bg-[#27272A] text-[#71717A]">
            Witnessed by {profile.meta.generated_by}
          </span>
          <span className="text-xs px-2 py-1 rounded bg-[#27272A] text-[#71717A]">
            {profile.meta.conversation_depth} depth
          </span>
          <span className="text-xs px-2 py-1 rounded bg-[#27272A] text-[#71717A]">
            {Math.round(profile.meta.confidence * 100)}% confidence
          </span>
          <span className="text-xs px-2 py-1 rounded bg-[#27272A] text-[#71717A]">
            {generationDate}
          </span>
        </div>
      </header>

      {/* Skills */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-semibold mb-4">Skills</h2>
        <ProfileSkills skills={profile.skills} levelColors={levelColors} levelWidths={levelWidths} />
      </section>

      {/* Thinking Style */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-semibold mb-4">Thinking Style</h2>
        <div className="border-l-4 border-[#E5C07B] pl-6 py-2">
          <div className="font-heading text-lg font-semibold mb-1">{profile.thinking.style}</div>
          <p className="text-[#71717A]">{profile.thinking.description}</p>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-semibold mb-4">Projects</h2>
        <div className="space-y-4">
          {profile.projects.map((project, i) => (
            <div key={i} className="bg-[#141416] border border-[#27272A] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-heading font-semibold text-lg">{project.name}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded font-medium"
                  style={{ backgroundColor: statusColors[project.status] || '#71717A', color: '#0A0A0B' }}
                >
                  {project.status}
                </span>
              </div>
              <p className="text-[#71717A] mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, j) => (
                  <span key={j} className="font-mono text-xs px-2 py-1 rounded bg-[#27272A] text-[#F5F5F5]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Domains */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-semibold mb-4">Domains</h2>
        <div className="flex flex-wrap gap-2">
          {profile.domains.map((domain, i) => (
            <span key={i} className="text-sm px-4 py-2 rounded-full bg-[#141416] border border-[#27272A] text-[#F5F5F5]">
              {domain}
            </span>
          ))}
        </div>
      </section>

      {/* Learning */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-semibold mb-4">Learning</h2>
        <div className="bg-[#141416] border border-[#27272A] rounded-xl p-5">
          <span className="text-xs px-2 py-1 rounded bg-[#E5C07B] text-[#0A0A0B] font-medium">
            {velocityLabels[profile.learning.velocity] || profile.learning.velocity}
          </span>
          <p className="text-[#71717A] mt-3">{profile.learning.pattern}</p>
        </div>
      </section>

      {/* Share & Manage */}
      <ProfileActions slug={slug} name={profile.name} />

      {/* CTA */}
      <div className="text-center mt-12">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-heading font-semibold text-lg bg-[#E5C07B] text-[#0A0A0B] hover:opacity-90 transition-all duration-200 hover:scale-[1.02]"
        >
          Get Your BeKnown Profile
        </Link>
      </div>
    </main>
  );
}
