'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const variants = {
  A: {
    headline: "Your Resume Is a Lie. Your AI Knows the Truth.",
    subtitle: "Stop writing about yourself. Let the AI that worked with you for months generate the most honest profile you've ever had.",
    cta: "Get Witnessed"
  },
  B: {
    headline: "The Professional Profile You Never Had to Write",
    subtitle: "One prompt. One click. A verified profile built from what your AI actually observed — your skills, your thinking, your projects.",
    cta: "Generate Your Profile"
  }
};

function useABVariant() {
  const [variant, setVariant] = useState<'A' | 'B'>('A');
  useEffect(() => {
    const stored = document.cookie.match(/ab_variant=([AB])/);
    if (stored) {
      setVariant(stored[1] as 'A' | 'B');
      return;
    }
    const v = Math.random() < 0.5 ? 'A' : 'B';
    document.cookie = `ab_variant=${v};path=/;max-age=${60 * 60 * 24 * 30}`;
    if (typeof window !== 'undefined' && window.gtag) window.gtag('event', 'ab_impression', { variant: v });
    setVariant(v);
  }, []);
  return variant;
}

const features = [
  {
    title: "60-Second Setup",
    description: "Copy a prompt, paste in your AI, click a link. No forms, no uploads, no account."
  },
  {
    title: "Skills With Receipts",
    description: "Every skill comes with evidence from your actual conversations. Not endorsements — proof."
  },
  {
    title: "Full-Spectrum Identity",
    description: "Developer by day, drone pilot by weekend, triathlete by morning. Show everything you are."
  },
  {
    title: "Anti-Fake Verification",
    description: "One-time codes prove real-time generation. You can't pre-fabricate a BeKnown profile."
  }
];

export default function HomePage() {
  const variant = useABVariant();
  const v = variants[variant];

  const handleCtaClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_cta_click', { variant });
    }
  };

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center dot-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0B]/80 to-[#0A0A0B]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            {v.headline}
          </h1>
          <p className="text-lg md:text-xl text-[#71717A] max-w-2xl mb-12">
            {v.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4" onClick={handleCtaClick}>
            <Link
              href="/generate?provider=chatgpt"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ backgroundColor: '#10A37F' }}
            >
              Generate with ChatGPT
            </Link>
            <Link
              href="/generate?provider=claude"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ backgroundColor: '#D97757' }}
            >
              Generate with Claude
            </Link>
            <Link
              href="/generate?provider=gemini"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ backgroundColor: '#4285F4' }}
            >
              Generate with Gemini
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-[#141416] border border-[#27272A] transition-all duration-200 hover:border-[#E5C07B]"
            >
              <h3 className="font-heading text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-[#71717A]">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <blockquote className="border-l-4 border-[#E5C07B] pl-6 py-2">
          <p className="text-lg italic text-[#F5F5F5]/80">
            &ldquo;I connected my Claude account. 30 seconds later, it showed me a profile I didn&apos;t write but couldn&apos;t argue with.&rdquo;
          </p>
        </blockquote>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#27272A] mt-auto">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#71717A]">
          <span>Built by no-humans.app</span>
          <div className="flex gap-6">
            <Link href="/blog" className="hover:text-[#F5F5F5] transition-colors">Blog</Link>
            <Link href="/privacy" className="hover:text-[#F5F5F5] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#F5F5F5] transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
