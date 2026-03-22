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
    description: "Copy a prompt, paste in your AI, click a link. No forms, no uploads, no account.",
    icon: "⚡"
  },
  {
    title: "Skills With Receipts",
    description: "Every skill comes with evidence from your actual conversations. Not endorsements — proof.",
    icon: "📋"
  },
  {
    title: "Full-Spectrum Identity",
    description: "Developer by day, drone pilot by weekend, triathlete by morning. Show everything you are.",
    icon: "🌐"
  },
  {
    title: "Anti-Fake Verification",
    description: "One-time codes prove real-time generation. You can't pre-fabricate a BeKnown profile.",
    icon: "🔐"
  }
];

const exampleProfile = {
  name: "Alex Chen",
  tagline: "Systems architect who builds in public",
  skills: [
    { name: "TypeScript", level: "expert", width: "95%" },
    { name: "System Design", level: "advanced", width: "82%" },
    { name: "React / Next.js", level: "expert", width: "90%" },
    { name: "DevOps", level: "intermediate", width: "60%" }
  ],
  thinking: {
    style: "Architecture-first builder",
    description: "Starts with data flow and system boundaries before writing a line of code. Asks 'what breaks at scale?' in the first conversation."
  },
  domains: ["backend systems", "open source", "technical writing", "rock climbing", "mechanical keyboards"],
  meta: { generated_by: "claude", confidence: 0.91, depth: "extensive" }
};

export default function HomePage() {
  const variant = useABVariant();
  const v = variants[variant];

  const handleCtaClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_cta_click', { variant });
    }
  };

  return (
    <>
      {/* Sticky Header */}
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

      <main className="flex-1 pt-14">
        {/* Hero */}
        <section className="relative dot-grid">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0B]/80 to-[#0A0A0B]" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              {v.headline}
            </h1>
            <p className="text-lg md:text-xl text-[#71717A] max-w-2xl mb-10">
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

        {/* Profile Preview */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-sm font-medium text-[#E5C07B] uppercase tracking-wider mb-6 text-center">
            What your AI generates for you
          </p>
          <div className="relative max-w-2xl mx-auto">
            {/* Glow effect */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#E5C07B]/20 via-[#E5C07B]/10 to-[#E5C07B]/20 blur-sm" />
            <div className="relative bg-[#141416] rounded-2xl border border-[#E5C07B]/30 p-8 space-y-6">
              {/* Profile header */}
              <div>
                <h3 className="font-heading text-2xl font-bold">{exampleProfile.name}</h3>
                <p className="text-[#71717A] italic mt-1">{exampleProfile.tagline}</p>
                <div className="flex gap-2 mt-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#D97757]/20 text-[#D97757] font-mono">
                    witnessed by {exampleProfile.meta.generated_by}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#E5C07B]/20 text-[#E5C07B] font-mono">
                    {Math.round(exampleProfile.meta.confidence * 100)}% confidence
                  </span>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-sm font-medium text-[#71717A] uppercase tracking-wider mb-3">Verified Skills</h4>
                <div className="space-y-3">
                  {exampleProfile.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-[#71717A] text-xs">{skill.level}</span>
                      </div>
                      <div className="h-2 bg-[#27272A] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: skill.width,
                            backgroundColor: skill.level === 'expert' ? '#E5C07B' : skill.level === 'advanced' ? '#4285F4' : '#71717A'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thinking */}
              <div className="border-l-3 border-[#E5C07B] pl-4">
                <h4 className="text-sm font-medium text-[#71717A] uppercase tracking-wider mb-1">Thinking Style</h4>
                <p className="font-heading font-semibold text-lg">{exampleProfile.thinking.style}</p>
                <p className="text-sm text-[#71717A] mt-1">{exampleProfile.thinking.description}</p>
              </div>

              {/* Domains */}
              <div>
                <h4 className="text-sm font-medium text-[#71717A] uppercase tracking-wider mb-3">Domains</h4>
                <div className="flex flex-wrap gap-2">
                  {exampleProfile.domains.map((domain) => (
                    <span key={domain} className="text-xs px-3 py-1 rounded-full bg-[#1E1E21] border border-[#27272A] text-[#F5F5F5]/80">
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-xl bg-[#141416] border border-[#27272A] transition-all duration-300 hover:border-[#E5C07B]/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#E5C07B]/5"
              >
                <div className="text-2xl mb-3">{feature.icon}</div>
                <h3 className="font-heading text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-[#71717A]">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="font-heading text-3xl font-bold text-center mb-12">Three Steps. One Minute.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Copy the prompt", desc: "Click your AI provider. We generate a unique verification code and a carefully engineered prompt." },
              { step: "2", title: "Paste in your AI", desc: "Your AI — which already knows you from months of conversations — generates your profile as JSON." },
              { step: "3", title: "Claim your profile", desc: "Paste the output back. Review it, tweak if needed, publish. Your BeKnown profile is live." }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#E5C07B] text-[#0A0A0B] font-heading font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[#71717A]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Social Proof */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <blockquote className="border-l-4 border-[#E5C07B] pl-6 py-2">
            <p className="text-lg italic text-[#F5F5F5]/80">
              &ldquo;I connected my Claude account. 30 seconds later, it showed me a profile I didn&apos;t write but couldn&apos;t argue with. It knew me better than my LinkedIn.&rdquo;
            </p>
            <footer className="mt-3 text-sm text-[#71717A]">— Early beta tester</footer>
          </blockquote>
        </section>

        {/* Final CTA */}
        <section className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to get witnessed?</h2>
          <p className="text-[#71717A] mb-8 max-w-lg mx-auto">Takes 60 seconds. No signup. No data leaves your AI session until you choose to publish.</p>
          <Link
            href="/generate"
            className="inline-flex items-center justify-center px-10 py-4 rounded-lg font-heading font-semibold text-[#0A0A0B] bg-[#E5C07B] hover:bg-[#E5C07B]/90 transition-all duration-200 hover:scale-[1.03] text-lg"
          >
            Generate Your Profile
          </Link>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#27272A] mt-auto">
          <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#71717A]">
            <span>Built by <Link href="https://no-humans.app" className="hover:text-[#F5F5F5] transition-colors underline">no-humans.app</Link></span>
            <div className="flex gap-6">
              <Link href="/blog" className="hover:text-[#F5F5F5] transition-colors">Blog</Link>
              <Link href="/privacy" className="hover:text-[#F5F5F5] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[#F5F5F5] transition-colors">Terms</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
