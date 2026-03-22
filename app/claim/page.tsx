'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProfileData {
  nonce: string;
  name: string;
  tagline: string;
  skills: { name: string; level: string; evidence: string }[];
  thinking: { style: string; description: string };
  projects: { name: string; description: string; tech: string[]; status: string }[];
  domains: string[];
  learning: { velocity: string; pattern: string };
  meta: { generated_by: string; conversation_depth: string; confidence: number };
}

const levelColors: Record<string, string> = {
  expert: '#E5C07B',
  advanced: '#4285F4',
  intermediate: '#10A37F',
  learning: '#71717A',
};

const statusColors: Record<string, string> = {
  shipped: '#10A37F',
  building: '#E5C07B',
  exploring: '#4285F4',
};

export default function ClaimPage() {
  const router = useRouter();
  const [jsonInput, setJsonInput] = useState('');
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const handleParse = () => {
    setError(null);
    try {
      const parsed = JSON.parse(jsonInput);
      const required = ['nonce', 'name', 'tagline', 'skills', 'thinking', 'projects', 'domains', 'learning', 'meta'];
      const missing = required.filter((k) => !parsed[k]);
      if (missing.length > 0) {
        setError(`Missing fields: ${missing.join(', ')}`);
        return;
      }
      setProfile(parsed);
    } catch {
      setError('Invalid JSON. Make sure you copied the entire output from your AI.');
    }
  };

  const handlePublish = async () => {
    if (!profile) return;
    setPublishing(true);
    setError(null);
    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to publish profile');
        return;
      }
      router.push(`/p/${data.slug}`);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setPublishing(false);
    }
  };

  return (
    <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-heading text-4xl font-bold mb-2">Claim Your Profile</h1>
      <p className="text-[#71717A] mb-8">
        Paste the JSON output from your AI assistant below.
      </p>

      {!profile ? (
        <>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='Paste your JSON here...'
            className="w-full h-64 bg-[#141416] border border-[#27272A] rounded-lg p-4 font-mono text-sm text-[#F5F5F5] resize-none focus:outline-none focus:border-[#E5C07B] transition-colors"
          />
          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}
          <button
            onClick={handleParse}
            disabled={!jsonInput.trim() || submitting}
            className="mt-4 w-full py-3 rounded-lg font-heading font-semibold bg-[#E5C07B] text-[#0A0A0B] hover:opacity-90 transition-all duration-200 disabled:opacity-50"
          >
            Preview Profile
          </button>
          <div className="mt-6 text-center">
            <Link href="/generate" className="text-[#71717A] hover:text-[#F5F5F5] text-sm transition-colors">
              &larr; Need to generate first?
            </Link>
          </div>
        </>
      ) : (
        <>
          {/* Profile Preview */}
          <div className="bg-[#141416] border border-[#27272A] rounded-xl p-6 mb-6">
            <h2 className="font-heading text-3xl font-bold mb-1">{profile.name}</h2>
            <p className="text-[#71717A] italic mb-4">{profile.tagline}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs px-2 py-1 rounded bg-[#27272A] text-[#71717A]">
                {profile.meta.generated_by}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-[#27272A] text-[#71717A]">
                {profile.meta.conversation_depth} depth
              </span>
              <span className="text-xs px-2 py-1 rounded bg-[#27272A] text-[#71717A]">
                {Math.round(profile.meta.confidence * 100)}% confidence
              </span>
            </div>

            {/* Skills */}
            <h3 className="font-heading text-lg font-semibold mb-3">Skills</h3>
            <div className="space-y-3 mb-6">
              {profile.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm font-medium min-w-[120px]">{skill.name}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{ backgroundColor: levelColors[skill.level] || '#71717A', color: '#0A0A0B' }}
                  >
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>

            {/* Thinking */}
            <h3 className="font-heading text-lg font-semibold mb-2">Thinking Style</h3>
            <div className="border-l-4 border-[#E5C07B] pl-4 mb-6">
              <div className="font-semibold mb-1">{profile.thinking.style}</div>
              <p className="text-[#71717A] text-sm">{profile.thinking.description}</p>
            </div>

            {/* Projects */}
            <h3 className="font-heading text-lg font-semibold mb-3">Projects</h3>
            <div className="space-y-3 mb-6">
              {profile.projects.map((project, i) => (
                <div key={i} className="bg-[#0A0A0B] rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{project.name}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{ backgroundColor: statusColors[project.status] || '#71717A', color: '#0A0A0B' }}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#71717A]">{project.description}</p>
                </div>
              ))}
            </div>

            {/* Domains */}
            <h3 className="font-heading text-lg font-semibold mb-2">Domains</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {profile.domains.map((domain, i) => (
                <span key={i} className="text-sm px-3 py-1 rounded-full bg-[#27272A] text-[#F5F5F5]">
                  {domain}
                </span>
              ))}
            </div>
          </div>

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          <div className="flex gap-4">
            <button
              onClick={() => setProfile(null)}
              className="flex-1 py-3 rounded-lg font-heading font-semibold border border-[#27272A] text-[#71717A] hover:text-[#F5F5F5] transition-all duration-200"
            >
              Go Back
            </button>
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="flex-1 py-3 rounded-lg font-heading font-semibold bg-[#E5C07B] text-[#0A0A0B] hover:opacity-90 transition-all duration-200 disabled:opacity-50"
            >
              {publishing ? 'Publishing...' : 'Looks good, publish my profile'}
            </button>
          </div>
        </>
      )}
    </main>
  );
}
