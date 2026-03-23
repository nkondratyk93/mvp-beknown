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
  const [published, setPublished] = useState<{ slug: string; editToken: string } | null>(null);
  const [editTokenCopied, setEditTokenCopied] = useState(false);

  const handleParse = () => {
    setError(null);
    try {
      // Strip markdown code blocks if the AI wrapped it
      let cleaned = jsonInput.trim();
      if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
      }
      const parsed = JSON.parse(cleaned);
      const required = ['nonce', 'name', 'tagline', 'skills', 'thinking', 'projects', 'domains', 'learning', 'meta'];
      const missing = required.filter((k) => !parsed[k]);
      if (missing.length > 0) {
        setError(`Missing fields: ${missing.join(', ')}. Make sure you copied the complete JSON output.`);
        return;
      }
      if (!parsed.nonce || !parsed.nonce.startsWith('BK-')) {
        setError('Invalid verification code. The JSON must contain the nonce from the generate page (starts with BK-).');
        return;
      }
      setProfile(parsed);
    } catch (e) {
      if (jsonInput.trim().length === 0) {
        setError('Please paste the JSON output from your AI assistant.');
      } else if (jsonInput.trim().startsWith('{')) {
        setError('Invalid JSON — looks like it\'s cut off. Make sure you copied the ENTIRE output.');
      } else {
        setError('That doesn\'t look like JSON. Copy the raw JSON output from your AI (starts with { and ends with }).');
      }
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
        if (data.error === 'Nonce expired. Please generate a new prompt.') {
          setError('Your verification code expired. Go back to the generate page and get a fresh one.');
        } else if (data.error === 'Nonce already used') {
          setError('This verification code was already used. Generate a new prompt to create another profile.');
        } else {
          setError(data.error || 'Failed to publish profile');
        }
        return;
      }
      setPublished({ slug: data.slug, editToken: data.editToken });
      try {
        localStorage.setItem(`beknown_edit_token_${data.slug}`, data.editToken);
      } catch {
        // localStorage may be unavailable in some browsers
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setPublishing(false);
    }
  };

  const handleCopyEditToken = async () => {
    if (!published) return;
    try {
      await navigator.clipboard.writeText(published.editToken);
      setEditTokenCopied(true);
      setTimeout(() => setEditTokenCopied(false), 3000);
    } catch {
      // Fallback for mobile
    }
  };

  return (
    <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-heading text-4xl font-bold mb-2">Claim Your Profile</h1>
      <p className="text-[#71717A] mb-8">
        Paste the JSON output from your AI assistant below.
      </p>

      {published ? (
        <>
          <div className="bg-[#141416] border border-[#10A37F]/30 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🎉</span>
              <h2 className="font-heading text-2xl font-bold text-[#10A37F]">Profile Published!</h2>
            </div>
            <p className="text-[#71717A] mb-4">
              Your BeKnown profile is now live at:
            </p>
            <Link
              href={`/p/${published.slug}`}
              className="text-[#E5C07B] hover:underline font-mono text-lg block mb-6"
            >
              beknown.no-humans.app/p/{published.slug}
            </Link>

            <div className="bg-[#0A0A0B] border border-[#27272A] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-semibold text-sm text-[#F5F5F5]">🔑 Your Edit Token</h3>
                <button
                  onClick={handleCopyEditToken}
                  className="text-xs text-[#E5C07B] hover:underline"
                >
                  {editTokenCopied ? '✅ Copied!' : 'Copy'}
                </button>
              </div>
              <code className="font-mono text-xs text-[#71717A] break-all block mb-3">
                {published.editToken}
              </code>
              <p className="text-xs text-red-400">
                ⚠️ Your edit token is saved in this browser. You can delete your profile anytime from your profile page. If you want to manage it from another device, save this token:
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href={`/p/${published.slug}`}
              className="flex-1 py-3 rounded-lg font-heading font-semibold bg-[#E5C07B] text-[#0A0A0B] hover:opacity-90 transition-all duration-200 text-center"
            >
              View My Profile
            </Link>
            <button
              onClick={() => {
                const url = `https://beknown.no-humans.app/p/${published.slug}`;
                const text = `Check out my AI-witnessed professional profile on BeKnown`;
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
              }}
              className="flex-1 py-3 rounded-lg font-heading font-semibold border border-[#27272A] text-[#71717A] hover:text-[#F5F5F5] transition-all duration-200"
            >
              Share on X
            </button>
          </div>
        </>
      ) : !profile ? (
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
          {/* Edit Notice */}
          <div className="bg-[#E5C07B]/10 border border-[#E5C07B]/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-[#E5C07B]">
              ✏️ <strong>Review before publishing.</strong> Click the <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold mx-0.5">✕</span> button to remove any confidential skills, projects, or domains. Click any text to edit it directly.
            </p>
          </div>

          {/* Profile Preview */}
          <div className="bg-[#141416] border border-[#27272A] rounded-xl p-6 mb-6">
            {/* Name - editable */}
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="font-heading text-3xl font-bold mb-1 bg-transparent border-b border-transparent hover:border-[#27272A] focus:border-[#E5C07B] focus:outline-none w-full transition-colors"
            />
            {/* Tagline - editable */}
            <input
              type="text"
              value={profile.tagline}
              onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
              className="text-[#71717A] italic mb-4 bg-transparent border-b border-transparent hover:border-[#27272A] focus:border-[#E5C07B] focus:outline-none w-full transition-colors text-sm"
            />

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

            {/* Skills - removable */}
            <h3 className="font-heading text-lg font-semibold mb-3">Skills</h3>
            <div className="space-y-3 mb-6">
              {profile.skills.map((skill, i) => (
                <div key={i} className="group flex items-center gap-3 relative">
                  <button
                    onClick={() => setProfile({
                      ...profile,
                      skills: profile.skills.filter((_, idx) => idx !== i)
                    })}
                    className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex items-center justify-center opacity-40 hover:opacity-100 hover:bg-red-500/40 transition-all shrink-0"
                    title="Remove this skill"
                  >
                    ✕
                  </button>
                  <span className="text-sm font-medium min-w-[120px]">{skill.name}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{ backgroundColor: levelColors[skill.level] || '#71717A', color: '#0A0A0B' }}
                  >
                    {skill.level}
                  </span>
                  <span className="text-xs text-[#71717A] truncate hidden sm:inline">{skill.evidence}</span>
                </div>
              ))}
              {profile.skills.length === 0 && (
                <p className="text-sm text-[#71717A] italic">No skills — at least one is recommended</p>
              )}
            </div>

            {/* Thinking - editable */}
            <h3 className="font-heading text-lg font-semibold mb-2">Thinking Style</h3>
            <div className="border-l-4 border-[#E5C07B] pl-4 mb-6">
              <input
                type="text"
                value={profile.thinking.style}
                onChange={(e) => setProfile({
                  ...profile,
                  thinking: { ...profile.thinking, style: e.target.value }
                })}
                className="font-semibold mb-1 bg-transparent border-b border-transparent hover:border-[#27272A] focus:border-[#E5C07B] focus:outline-none w-full transition-colors"
              />
              <textarea
                value={profile.thinking.description}
                onChange={(e) => setProfile({
                  ...profile,
                  thinking: { ...profile.thinking, description: e.target.value }
                })}
                rows={2}
                className="text-[#71717A] text-sm bg-transparent border border-transparent hover:border-[#27272A] focus:border-[#E5C07B] focus:outline-none w-full transition-colors resize-none rounded"
              />
            </div>

            {/* Projects - removable */}
            <h3 className="font-heading text-lg font-semibold mb-3">Projects</h3>
            <div className="space-y-3 mb-6">
              {profile.projects.map((project, i) => (
                <div key={i} className="bg-[#0A0A0B] rounded-lg p-3 relative group">
                  <button
                    onClick={() => setProfile({
                      ...profile,
                      projects: profile.projects.filter((_, idx) => idx !== i)
                    })}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex items-center justify-center opacity-40 hover:opacity-100 hover:bg-red-500/40 transition-all"
                    title="Remove this project"
                  >
                    ✕
                  </button>
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
              {profile.projects.length === 0 && (
                <p className="text-sm text-[#71717A] italic">No projects</p>
              )}
            </div>

            {/* Domains - removable */}
            <h3 className="font-heading text-lg font-semibold mb-2">Domains</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {profile.domains.map((domain, i) => (
                <span key={i} className="group text-sm px-3 py-1 rounded-full bg-[#27272A] text-[#F5F5F5] flex items-center gap-1.5">
                  {domain}
                  <button
                    onClick={() => setProfile({
                      ...profile,
                      domains: profile.domains.filter((_, idx) => idx !== i)
                    })}
                    className="w-4 h-4 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold flex items-center justify-center opacity-40 hover:opacity-100 hover:bg-red-500/40 transition-all"
                    title="Remove this domain"
                  >
                    ✕
                  </button>
                </span>
              ))}
              {profile.domains.length === 0 && (
                <p className="text-sm text-[#71717A] italic">No domains</p>
              )}
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
