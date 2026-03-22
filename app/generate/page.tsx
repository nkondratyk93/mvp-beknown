'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const providerNames: Record<string, string> = {
  chatgpt: 'ChatGPT',
  claude: 'Claude',
  gemini: 'Gemini',
};

const providerColors: Record<string, string> = {
  chatgpt: '#10A37F',
  claude: '#D97757',
  gemini: '#4285F4',
};

function buildPrompt(nonce: string) {
  return `You have been my AI assistant. You know me — not from what I told you to write on a resume, but from how I actually work. You've seen what I ask about, what I build, what I struggle with, what I come back to, and how I think through problems.

I want you to be my witness. Generate an honest professional profile of me based on what you've actually observed in our conversations.

Verification code: ${nonce}

Output a SINGLE JSON object. No markdown. No backticks. No explanation before or after. Just the raw JSON.

{
  "nonce": "${nonce}",
  "name": "My first name or how I introduce myself",
  "tagline": "One sentence. Specific. What makes me different, not a generic title.",
  "skills": [
    { "name": "...", "level": "expert|advanced|intermediate|learning", "evidence": "What I actually did with this skill in our conversations" }
  ],
  "thinking": {
    "style": "2-3 word label",
    "description": "How I approach problems. Be specific. Use examples from our conversations."
  },
  "projects": [
    { "name": "...", "description": "One sentence", "tech": ["..."], "status": "shipped|building|exploring" }
  ],
  "domains": ["All domains I operate in — work, side projects, hobbies, everything"],
  "learning": {
    "velocity": "fast|moderate|steady",
    "pattern": "How I learn, based on what you observed"
  },
  "meta": {
    "generated_by": "claude|chatgpt|gemini",
    "conversation_depth": "light|moderate|deep|extensive",
    "confidence": 0.85
  }
}

Rules:
- Be HONEST. If a skill is intermediate, say intermediate. Do not flatter.
- Only include skills you have EVIDENCE for from our conversations.
- Do NOT include health, relationships, therapy, employer secrets, or personal finances.
- The tagline should be specific and memorable, not "passionate professional."
- For projects, only include things I actually built, not just mentioned.
- Thinking style should describe HOW I think, not WHAT I think about.
- Include ALL domains I operate in — work, side projects, hobbies. Show the full person.`;
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center text-[#71717A]">Loading...</div>}>
      <GenerateContent />
    </Suspense>
  );
}

function GenerateContent() {
  const searchParams = useSearchParams();
  const provider = searchParams.get('provider') || 'chatgpt';
  const providerName = providerNames[provider] || 'ChatGPT';
  const providerColor = providerColors[provider] || '#10A37F';

  const [nonce, setNonce] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNonce = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/nonce', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to fetch nonce');
      const data = await res.json();
      setNonce(data.nonce);
      setExpiresAt(data.expires_at);
    } catch {
      setError('Could not generate a verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNonce();
  }, [fetchNonce]);

  useEffect(() => {
    if (!expiresAt) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timerColor = timeLeft < 120 ? '#EF4444' : '#E5C07B';

  const handleCopy = async () => {
    if (!nonce) return;
    try {
      await navigator.clipboard.writeText(buildPrompt(nonce));
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setError('Failed to copy to clipboard');
    }
  };

  return (
    <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-heading text-4xl font-bold mb-2">
        Generate with{' '}
        <span style={{ color: providerColor }}>{providerName}</span>
      </h1>
      <p className="text-[#71717A] mb-8">
        Copy the prompt below and paste it into {providerName}. It will generate your profile.
      </p>

      {loading && (
        <div className="text-[#71717A] py-12 text-center">Generating verification code...</div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
          <p className="text-red-400 mb-2">{error}</p>
          <button
            onClick={fetchNonce}
            className="text-sm text-[#E5C07B] hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {nonce && !loading && (
        <>
          {/* Nonce + Timer */}
          <div className="flex items-center justify-between bg-[#141416] border border-[#27272A] rounded-lg p-4 mb-6">
            <div>
              <div className="text-xs text-[#71717A] mb-1">Verification Code</div>
              <div className="font-mono text-2xl font-bold tracking-wider">{nonce}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-[#71717A] mb-1">Expires in</div>
              <div className="font-mono text-2xl font-bold" style={{ color: timerColor }}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Prompt */}
          <div className="bg-[#141416] border border-[#27272A] rounded-lg p-4 mb-6 max-h-80 overflow-y-auto">
            <pre className="font-mono text-sm text-[#F5F5F5]/80 whitespace-pre-wrap break-words">
              {buildPrompt(nonce)}
            </pre>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="w-full py-4 rounded-lg font-heading font-semibold text-lg text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.01] mb-8"
            style={{ backgroundColor: providerColor }}
          >
            {copied ? 'Copied!' : 'Copy Prompt'}
          </button>

          {/* Next Steps */}
          {copied && (
            <div className="bg-[#141416] border border-[#E5C07B]/30 rounded-lg p-6 animate-fade-in-up">
              <h2 className="font-heading text-xl font-semibold mb-3">Next steps</h2>
              <ol className="list-decimal list-inside space-y-2 text-[#71717A]">
                <li>Paste this prompt into {providerName}</li>
                <li>Wait for the JSON response</li>
                <li>Copy the entire JSON output</li>
                <li>
                  Paste it on the{' '}
                  <Link href="/claim" className="text-[#E5C07B] hover:underline">
                    claim page
                  </Link>
                </li>
              </ol>
            </div>
          )}
        </>
      )}

      <div className="mt-12 text-center">
        <Link href="/claim" className="text-[#E5C07B] hover:underline text-sm">
          Already have your JSON? Go to claim page &rarr;
        </Link>
      </div>
    </main>
  );
}
