'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileActions({ slug, name }: { slug: string; name: string }) {
  const router = useRouter();
  const [showManage, setShowManage] = useState(false);
  const [editToken, setEditToken] = useState('');
  const [savedToken, setSavedToken] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleted, setDeleted] = useState(false);

  const profileUrl = `https://beknown.no-humans.app/p/${slug}`;

  useEffect(() => {
    try {
      const token = localStorage.getItem(`beknown_edit_token_${slug}`);
      if (token) setSavedToken(token);
    } catch {
      // localStorage may be unavailable
    }
  }, [slug]);

  const shareOnTwitter = () => {
    const text = `Check out my AI-witnessed professional profile on BeKnown`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(profileUrl)}`,
      '_blank'
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`,
      '_blank'
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
    } catch {
      // Fallback
    }
  };

  const performDelete = async (token: string) => {
    if (!confirm(`Are you sure you want to delete ${name}'s profile? This cannot be undone.`)) return;

    setDeleting(true);
    setError(null);
    try {
      const res = await fetch('/api/profile', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, editToken: token }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error === 'Unauthorized' ? 'Invalid edit token. Check that you copied it correctly.' : data.error);
        return;
      }
      try {
        localStorage.removeItem(`beknown_edit_token_${slug}`);
      } catch {
        // localStorage may be unavailable
      }
      setDeleted(true);
      setTimeout(() => router.push('/'), 3000);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const handleDelete = async () => {
    if (!editToken.trim()) {
      setError('Please enter your edit token');
      return;
    }
    await performDelete(editToken.trim());
  };

  const handleDeleteWithSavedToken = async () => {
    if (savedToken) {
      await performDelete(savedToken);
    }
  };

  if (deleted) {
    return (
      <div className="text-center mt-16 bg-[#141416] border border-[#27272A] rounded-xl p-8">
        <p className="text-lg text-[#F5F5F5] mb-2">Profile deleted.</p>
        <p className="text-sm text-[#71717A]">Redirecting to homepage...</p>
      </div>
    );
  }

  return (
    <div className="mt-16 space-y-8">
      {/* Share Buttons */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-[#71717A]">Share this profile</p>
        <div className="flex gap-3">
          <button
            onClick={shareOnTwitter}
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#141416] border border-[#27272A] text-[#F5F5F5] hover:border-[#1DA1F2] transition-all duration-200"
          >
            𝕏 Post
          </button>
          <button
            onClick={shareOnLinkedIn}
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#141416] border border-[#27272A] text-[#F5F5F5] hover:border-[#0A66C2] transition-all duration-200"
          >
            LinkedIn
          </button>
          <button
            onClick={copyLink}
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#141416] border border-[#27272A] text-[#F5F5F5] hover:border-[#E5C07B] transition-all duration-200"
          >
            📋 Copy Link
          </button>
        </div>
      </div>

      {/* Delete with saved token */}
      {savedToken && (
        <div className="text-center">
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            onClick={handleDeleteWithSavedToken}
            disabled={deleting}
            className="px-6 py-2.5 rounded-lg text-sm font-medium border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all duration-200 disabled:opacity-50"
          >
            {deleting ? 'Deleting...' : 'Delete My Profile'}
          </button>
        </div>
      )}

      {/* Manage Profile (fallback for no saved token) */}
      {!savedToken && (
        <>
          <div className="text-center">
            <button
              onClick={() => setShowManage(!showManage)}
              className="text-xs text-[#71717A] hover:text-[#F5F5F5] transition-colors"
            >
              {showManage ? 'Hide management' : 'Manage this profile'}
            </button>
          </div>

          {showManage && (
            <div className="bg-[#141416] border border-[#27272A] rounded-xl p-6">
              <h3 className="font-heading font-semibold mb-4 text-sm">Profile Management</h3>
              <div className="mb-4">
                <label className="text-xs text-[#71717A] block mb-2">Enter your edit token:</label>
                <input
                  type="text"
                  value={editToken}
                  onChange={(e) => setEditToken(e.target.value)}
                  placeholder="BK-EDIT-..."
                  className="w-full bg-[#0A0A0B] border border-[#27272A] rounded-lg px-4 py-2 font-mono text-sm text-[#F5F5F5] focus:outline-none focus:border-[#E5C07B] transition-colors"
                />
              </div>
              {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="w-full py-2 rounded-lg text-sm font-medium border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all duration-200 disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete Profile'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
