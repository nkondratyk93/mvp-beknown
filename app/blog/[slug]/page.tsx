import type { Metadata } from 'next';
import Link from 'next/link';

const BASE_URL = 'https://beknown.no-humans.app';

interface ArticleData {
  title: string;
  description: string;
  keyword: string;
  date: string;
  content: string;
  faq?: { question: string; answer: string }[];
}

const articles: Record<string, ArticleData> = {
  'how-to-create-ai-verified-professional-profile': {
    title: 'How to Create an AI-Verified Professional Profile in 60 Seconds',
    description: 'Learn how to turn your AI conversation history into a verified professional profile with BeKnown. No signup, no forms — just proof of what you actually know.',
    keyword: 'AI professional profile generator',
    date: '2026-03-15',
    content: `Resumes have been broken for a long time, and most people know it. You sit down, open a blank document, and start performing. You pick the right verbs. You inflate your job titles. You describe projects in the most favorable light possible. Then someone on the other end reads it and has no idea what's real.

That's been the deal for decades: you write about yourself, and everyone agrees to pretend it's objective.

But something changed. If you've been using ChatGPT, Claude, or Gemini for the past year, your AI has been quietly building a record of what you actually do. Every question you ask, every problem you work through, every project you debug at 2 AM — it's all there. Not in a resume format, not polished for a recruiter, but real.

## Why Resumes Fail in 2026

Resumes are self-reported. That's the core problem. You decide what to include, how to frame it, and what to leave out. There's no verification, no cross-reference, no way for a reader to know if "Led a team of 12 engineers" means you managed a department or just got CC'd on emails.

They're also performative. Nobody writes a resume in their natural voice. You switch into a weird third-person corporate dialect that doesn't sound like any actual human. "Spearheaded cross-functional initiatives to drive stakeholder alignment." What does that even mean?

And they're static. You write a resume, and it sits there. It doesn't update when you learn a new framework over a weekend. It doesn't capture the hobby project you're obsessed with. It shows a frozen version of someone you used to be.

## Your AI Conversation History Is the New Proof

Here's what's different now: you have a witness. Your AI assistant has watched you work. It knows what languages you code in because you asked it to debug your code. It knows your thinking style because it watched you reason through architecture decisions. It knows your side projects because you spent three weekends asking it about drone firmware.

This isn't self-reported. It's observed. There's a massive difference between "I'm skilled in Python" on a resume and an AI that can say "This person asked me 47 questions about Python async patterns while building a real-time data pipeline."

## How to Create Your BeKnown Profile

The whole process takes about 60 seconds. Here's exactly what happens:

**Step 1:** Visit [beknown.no-humans.app](https://beknown.no-humans.app) and pick your AI provider — ChatGPT, Claude, or Gemini.

**Step 2:** Click "Generate" and you'll get a unique verification code along with a ready-made prompt. The verification code expires in 10 minutes, which prevents anyone from pre-fabricating a profile.

**Step 3:** Copy the prompt and paste it into your AI. This is important: paste it into the AI you've actually been using. The one with your conversation history. If you paste it into a fresh session with no history, you'll get a generic profile that doesn't say much.

**Step 4:** Your AI generates a JSON profile based on what it actually observed. Skills with evidence. Your thinking style. Projects you built. Domains you operate in. All pulled from real conversations.

**Step 5:** Copy that JSON and paste it into the [claim page](/claim). Your profile goes live with a shareable link.

## What Your Profile Includes

A BeKnown profile isn't a resume. It's structured differently because it captures different things:

- **Skills with evidence** — Not just "React" but "Built three production React apps, asked detailed questions about server components and state management patterns." The AI provides receipts.
- **Thinking style** — How you actually approach problems. Are you a first-principles thinker? Do you prototype fast and iterate? Do you research deeply before starting? Your AI has watched you do this hundreds of times.
- **Projects** — Things you actually built, with the tech stack and current status. Shipped, building, or exploring.
- **Domains** — Everything you do, not just your job title. Developer by day, music producer by night, marathon runner on weekends. The full picture.
- **Learning patterns** — How fast you pick things up, and how you learn. Some people read docs. Some people learn by breaking things. Your AI knows which one you are.

## No Signup Required

BeKnown doesn't have accounts. There's no email collection, no password, no onboarding flow. You generate a profile and get a link. That's it. If you want to update it later, you generate a new one.

The goal is simple: give people a way to show who they actually are, verified by something other than their own word.

[Try BeKnown free — no signup required](https://beknown.no-humans.app)`,
  },
  'ai-conversation-history-career-tool': {
    title: "Your AI Chat History Is Your Best Career Tool (Here's How to Use It)",
    description: 'Your ChatGPT and Claude conversation history contains months of proof about your real skills. Learn how to turn AI chat history into professional credentials.',
    keyword: 'AI chat history professional use',
    date: '2026-03-18',
    content: `You've probably been using an AI assistant for months now. Maybe over a year. You ask it questions while you work. You paste in error messages. You brainstorm architecture decisions. You ask it to review your code, help you write copy, plan your projects, or explain concepts you're learning.

All of that is sitting in your conversation history right now. And it's worth more than your resume.

## The Data Goldmine You're Sitting On

Think about what your ChatGPT or Claude history actually contains. It's not random — it's a detailed record of your professional life. Every question you asked reveals something you were working on. Every follow-up shows how deep you went. Every "that didn't work, let me try this" shows your problem-solving process in real time.

If someone could read your entire AI conversation history, they'd know more about your actual capabilities than any resume could tell them. They'd know what tools you use, what problems you solve, what you're learning, and how you think.

That's not hypothetical. Your AI already has that context. It's been building a model of you — not intentionally, not creepily, just as a natural result of having hundreds of conversations. It knows your skill level in different areas because it's helped you at different levels. It knows your interests because you keep coming back to certain topics.

## What Your AI Actually Knows About You

Let's get specific. After months of conversations, your AI can tell:

**Your real skills, not your claimed skills.** If you say you know Kubernetes on your resume but you've never once asked your AI about it, that gap is visible. Conversely, if you've spent weeks going deep on database optimization, the evidence is right there in your conversations.

**Your thinking patterns.** Some people jump straight to solutions. Others ask a series of diagnostic questions first. Some people want to understand the theory before implementation. Others want working code they can modify. Your AI has watched you do this hundreds of times.

**Your actual projects.** Not the sanitized descriptions you'd put on a resume, but the real ones. The weekend project that started as a joke and turned into something real. The work project where you solved a hard problem nobody else could figure out. The thing you're building just because you're curious.

**Your learning velocity.** Your AI can see how quickly you go from "what is this?" to "here's my production implementation." It can see whether you're speeding up or going deeper over time. That trajectory matters more than any snapshot of your current skills.

## Why This Is Better Than a Resume

A resume is a marketing document. You write it to get hired, so you make it sound as good as possible. Everyone does this, and everyone knows everyone does this, which means resumes are basically discounted before they're even read.

Your AI conversation history is different because:

**It's observed, not claimed.** You didn't sit down and decide to make yourself look good to your AI. You just worked. The record of that work is genuine.

**It's continuous, not static.** Your resume is a snapshot you update every few years. Your AI history is a live feed. It captures what you're doing right now, not what you did three jobs ago.

**It's multi-dimensional.** Resumes are one-track — they show your career path. Your AI history shows everything. The coding, the writing, the random 3 AM question about astrophysics, the side project, the hobby that turned into a skill. You're a whole person in your AI history. You're a bullet-point list on your resume.

**It captures how you think, not just what you've done.** This is the big one. Employers and collaborators care about your reasoning process. Can you break down a complex problem? Do you consider edge cases? Do you ask the right questions? Your resume can't show any of that. Your AI conversations show all of it.

## Turning Conversations Into Credentials

This is exactly what BeKnown does. It takes the context your AI already has about you and structures it into a shareable professional profile. You're not writing anything. You're not filling out forms. You're asking your AI to be your witness — to report what it actually observed.

The process is simple:

1. Visit [beknown.no-humans.app](https://beknown.no-humans.app) and pick your AI provider.
2. Copy the generated prompt (it includes a one-time verification code).
3. Paste the prompt into your AI — the one with your real history.
4. Your AI outputs a structured profile with skills, evidence, thinking patterns, and projects.
5. Paste the result into BeKnown and get a shareable link.

The verification code expires in 10 minutes. This prevents someone from carefully crafting a fake profile over time. The profile has to be generated in real time, from a real conversation history.

## What This Means for You

If you've been using AI regularly, you've been accidentally building the most honest professional profile possible. You just didn't have a way to share it until now.

Your next interview, your next freelance pitch, your next collaboration — you can point someone to a profile that wasn't written by you. It was written by the AI that watched you work. That carries a different kind of weight.

[Try BeKnown free — no signup required](https://beknown.no-humans.app)`,
  },
  'beknown-vs-linkedin-vs-readcv': {
    title: 'BeKnown vs LinkedIn vs Read.cv: Which Actually Shows Who You Are?',
    description: 'A direct comparison of BeKnown, LinkedIn, Read.cv, and GitHub Profile. See which professional profile platform actually shows real, verified skills.',
    keyword: 'BeKnown vs LinkedIn comparison',
    date: '2026-03-20',
    content: `Every professional profile platform promises to "show the real you." Most of them let you write whatever you want and call it a profile. Let's look at what actually happens when you set up a profile on LinkedIn, Read.cv, GitHub, and BeKnown — and which one does the best job of showing who you really are.

## The Comparison

| Feature | BeKnown | LinkedIn | Read.cv | GitHub Profile |
|---|---|---|---|---|
| **Content source** | AI-verified (from conversations) | Self-reported | Self-reported | Activity-based (code only) |
| **Setup time** | ~60 seconds | 30-60 minutes | 15-30 minutes | Ongoing |
| **Multi-dimension identity** | Yes (work + hobbies + learning) | Limited (career-focused) | Partial (creative + career) | No (code only) |
| **Trust signal** | Verification codes, AI witness | Endorsements from connections | None | Commit history |
| **Can you lie?** | Difficult — AI reports what it saw | Easily | Easily | Partially (commit history is real, descriptions aren't) |
| **Cost** | Free | Free (premium features paid) | Free | Free |

## LinkedIn: The Platform Everyone Uses and Nobody Trusts

LinkedIn has 900+ million users, and virtually everyone on it has inflated something. Job titles get upgraded. Responsibilities get expanded. Skills get listed without any basis. And the endorsement system — where your college roommate endorses you for "Machine Learning" because you asked them to — adds no real credibility.

The bigger problem is that LinkedIn is a performance platform. People post "thought leadership" content to build personal brands. They write humble-brag career updates. The entire environment incentivizes presentation over accuracy. When someone looks at your LinkedIn, they're not seeing you. They're seeing the version of you that plays best in a professional social network.

LinkedIn also locks you into a career-only identity. There's no good place to show that you're also a competitive cyclist or that you build synthesizers as a hobby. Your profile is your job history, your education, and a list of skills that anyone can add to.

Setup takes 30 to 60 minutes if you do it properly, and then you spend the next three years ignoring recruiters in your DMs.

## Read.cv: Beautiful but Still Self-Written

Read.cv is a reaction to LinkedIn, and in many ways it's a good one. The design is clean. The format is more flexible. You can show projects, writing, and creative work alongside your career history. It attracts a more design-conscious crowd, which means the profiles tend to look better.

But the fundamental problem remains: everything on Read.cv is self-reported. You write your own bio. You describe your own projects. You choose what to highlight and what to hide. There's no verification of any kind — no endorsements, no activity data, nothing.

Read.cv is a better-looking lie detector, but it's still not a lie detector.

It takes 15 to 30 minutes to set up a decent profile. You'll spend more time on it if you care about aesthetics, which most Read.cv users do.

## GitHub Profile: Real Data, Narrow View

GitHub is interesting because it actually shows real activity. Your contribution graph, your repositories, your commit history — that's genuine data about what you've built. You can't fake a commit history (well, you can, but it's unusual).

The problem is that GitHub only shows one dimension: code. If you're a developer, it shows what you've committed. But it doesn't show how you think, what you're learning outside of code, your design skills, your writing, or your hobbies. It's a keyhole view of one part of your professional life.

GitHub also has a description problem. While the activity data is real, the project descriptions and profile bio are self-written. Someone could have a repository full of tutorial code and describe it as an "enterprise-grade distributed system."

Setup is ongoing — your profile is your activity. But the README-based profile section is another self-authored marketing document.

## BeKnown: You Don't Write Anything

This is the fundamental difference. On every other platform, you write your own profile. On BeKnown, your AI writes it for you, based on what it actually observed in your conversations.

You can't inflate your skills because you're not the one listing them. Your AI decides what to include based on what it saw you do. If you asked beginner Python questions, it'll say you're a beginner. If you architected complex systems, it'll show that too.

The profile covers your full identity — work skills, side projects, hobbies, learning patterns, thinking style. It's not locked into a career-only format.

Setup takes about 60 seconds. You copy a prompt, paste it into your AI, and paste the result back. No forms, no typing, no agonizing over how to describe yourself.

The one-time verification codes prove the profile was generated in real time, not carefully crafted over days. This is the closest thing to a trust signal that exists in professional profiles right now.

The honest limitation: BeKnown only works well if you've been actively using an AI assistant. If you started using ChatGPT yesterday, your profile will be thin. But if you've been using it for months — which most professionals have by now — the data is rich.

## The Bottom Line

If you want to network and play the professional social media game, LinkedIn is still the biggest platform.

If you want a beautiful self-curated portfolio, Read.cv is well-designed for that.

If you want to show your code contributions, GitHub does that automatically.

If you want a profile that's actually verified — where someone other than you describes your skills, and there's evidence behind every claim — BeKnown is the only option right now. It's the only platform where you don't write anything. Your AI does the work.

[Try BeKnown free — no signup required](https://beknown.no-humans.app)`,
    faq: [
      {
        question: 'Is BeKnown better than LinkedIn?',
        answer: 'BeKnown and LinkedIn serve different purposes. LinkedIn is a social networking platform where you write your own profile and connect with others. BeKnown is focused on verified professional identity — your AI generates your profile based on observed skills, not self-reported claims. BeKnown is better for trust and accuracy; LinkedIn is better for networking and job searching.',
      },
      {
        question: 'Can I use BeKnown and LinkedIn at the same time?',
        answer: 'Yes. Many people use BeKnown as a verified supplement to their LinkedIn profile. You can link to your BeKnown profile from your LinkedIn bio to add a layer of AI-verified credibility to your self-reported profile.',
      },
      {
        question: 'How does BeKnown verify my skills?',
        answer: 'BeKnown uses your AI conversation history as the source of truth. When you generate a profile, your AI (ChatGPT, Claude, or Gemini) reviews your past conversations and reports what skills it actually observed, with evidence from real interactions. One-time verification codes ensure the profile is generated in real time.',
      },
      {
        question: 'Is Read.cv free?',
        answer: 'Yes, Read.cv is free to use. However, like LinkedIn, all content on Read.cv is self-reported. You write your own bio, describe your own projects, and there is no independent verification of your claims.',
      },
      {
        question: 'Does BeKnown replace my resume?',
        answer: 'BeKnown is not a resume replacement for traditional job applications that require one. It is a supplement — a verified profile that adds credibility to your self-reported resume by showing what an independent AI observer documented about your skills and work patterns.',
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) {
    return { title: 'Article Not Found — BeKnown' };
  }

  return {
    title: `${article.title} — BeKnown`,
    description: article.description,
    keywords: [article.keyword, 'BeKnown', 'AI profile', 'professional profile'],
    alternates: {
      canonical: `${BASE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${BASE_URL}/blog/${slug}`,
      siteName: 'BeKnown',
      type: 'article',
      publishedTime: article.date,
      authors: ['BeKnown'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  };
}

function MoreFreeTools() {
  return (
    <section className="mt-16 pt-8 border-t border-[#27272A]">
      <h2 className="font-heading text-xl font-semibold mb-4">More free tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="https://photosizer.no-humans.app"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 rounded-lg bg-[#141416] border border-[#27272A] hover:border-[#E5C07B] transition-colors"
        >
          <h3 className="font-heading font-semibold mb-1">PhotoSizer</h3>
          <p className="text-sm text-[#71717A]">Resize and compress images instantly. No upload limits, no accounts.</p>
        </a>
        <a
          href="https://punchclock.no-humans.app"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 rounded-lg bg-[#141416] border border-[#27272A] hover:border-[#E5C07B] transition-colors"
        >
          <h3 className="font-heading font-semibold mb-1">PunchClock</h3>
          <p className="text-sm text-[#71717A]">Simple time tracking that stays out of your way. Free, no signup.</p>
        </a>
      </div>
    </section>
  );
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    return (
      <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-heading text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-[#71717A] mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/blog" className="text-[#E5C07B] hover:underline">
          &larr; Back to blog
        </Link>
      </main>
    );
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      '@type': 'Organization',
      name: 'BeKnown',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'BeKnown',
      url: BASE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${slug}`,
    },
  };

  const faqJsonLd = article.faq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

  // Convert markdown-like content to JSX
  const paragraphs = article.content.split('\n\n');

  return (
    <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Link href="/blog" className="text-[#71717A] text-sm hover:text-[#F5F5F5] transition-colors mb-8 inline-block">
        &larr; Back to blog
      </Link>

      <article>
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
        <time className="text-sm text-[#71717A] mb-8 block" dateTime={article.date}>
          {new Date(article.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>

        <div className="prose-beknown space-y-5">
          {paragraphs.map((block, i) => {
            if (block.startsWith('## ')) {
              return (
                <h2 key={i} className="font-heading text-2xl font-semibold mt-10 mb-4">
                  {block.replace('## ', '')}
                </h2>
              );
            }

            if (block.startsWith('| ')) {
              const rows = block.split('\n').filter((r) => !r.match(/^\|\s*-/));
              const headers = rows[0]
                ?.split('|')
                .filter(Boolean)
                .map((h) => h.trim());
              const dataRows = rows.slice(1).map((r) =>
                r
                  .split('|')
                  .filter(Boolean)
                  .map((c) => c.trim())
              );
              return (
                <div key={i} className="overflow-x-auto my-8">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr>
                        {headers?.map((h, j) => (
                          <th
                            key={j}
                            className="text-left p-3 border-b border-[#27272A] text-[#E5C07B] font-semibold"
                          >
                            {h.replace(/\*\*/g, '')}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dataRows.map((row, ri) => (
                        <tr key={ri}>
                          {row.map((cell, ci) => (
                            <td key={ci} className="p-3 border-b border-[#27272A]/50 text-[#71717A]">
                              {cell.replace(/\*\*/g, '')}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }

            if (block.startsWith('- **') || block.startsWith('- ')) {
              const items = block.split('\n').filter(Boolean);
              return (
                <ul key={i} className="space-y-3 my-4">
                  {items.map((item, j) => {
                    const text = item.replace(/^- /, '');
                    const boldMatch = text.match(/^\*\*(.+?)\*\*(.*)$/);
                    if (boldMatch) {
                      return (
                        <li key={j} className="text-[#A1A1AA] pl-4 border-l-2 border-[#27272A]">
                          <strong className="text-[#F5F5F5]">{boldMatch[1]}</strong>
                          {boldMatch[2]}
                        </li>
                      );
                    }
                    return (
                      <li key={j} className="text-[#A1A1AA] pl-4 border-l-2 border-[#27272A]">
                        {text}
                      </li>
                    );
                  })}
                </ul>
              );
            }

            if (block.match(/^\d+\./)) {
              const items = block.split('\n').filter(Boolean);
              return (
                <ol key={i} className="space-y-2 my-4 list-decimal list-inside">
                  {items.map((item, j) => {
                    const text = item.replace(/^\d+\.\s*/, '');
                    return (
                      <li key={j} className="text-[#A1A1AA]">
                        {renderInlineMarkdown(text)}
                      </li>
                    );
                  })}
                </ol>
              );
            }

            if (block.startsWith('**Step ')) {
              const steps = block.split('\n').filter(Boolean);
              return (
                <div key={i} className="space-y-4 my-4">
                  {steps.map((step, j) => {
                    const stepMatch = step.match(/^\*\*(.+?)\*\*\s*(.*)$/);
                    if (stepMatch) {
                      return (
                        <div key={j} className="pl-4 border-l-2 border-[#E5C07B]">
                          <strong className="text-[#E5C07B]">{stepMatch[1]}</strong>{' '}
                          <span className="text-[#A1A1AA]">{renderInlineMarkdown(stepMatch[2])}</span>
                        </div>
                      );
                    }
                    return (
                      <p key={j} className="text-[#A1A1AA]">
                        {renderInlineMarkdown(step)}
                      </p>
                    );
                  })}
                </div>
              );
            }

            return (
              <p key={i} className="text-[#A1A1AA] leading-relaxed">
                {renderInlineMarkdown(block)}
              </p>
            );
          })}
        </div>

        {article.faq && (
          <section className="mt-12 pt-8 border-t border-[#27272A]">
            <h2 className="font-heading text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {article.faq.map((item, i) => (
                <div key={i}>
                  <h3 className="font-heading text-lg font-semibold mb-2">{item.question}</h3>
                  <p className="text-[#A1A1AA] leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>

      <MoreFreeTools />

      <div className="mt-12 text-center">
        <Link href="/blog" className="text-[#71717A] text-sm hover:text-[#F5F5F5] transition-colors">
          &larr; Back to all articles
        </Link>
      </div>
    </main>
  );
}

function renderInlineMarkdown(text: string): React.ReactNode {
  // Handle links, bold, and inline code
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Check for links [text](url)
    const linkMatch = remaining.match(/^([\s\S]*?)\[([^\]]+)\]\(([^)]+)\)([\s\S]*)/);
    // Check for bold **text**
    const boldMatch = remaining.match(/^([\s\S]*?)\*\*([^*]+)\*\*([\s\S]*)/);

    if (linkMatch && (!boldMatch || linkMatch.index! <= boldMatch.index!)) {
      if (linkMatch[1]) parts.push(<span key={key++}>{linkMatch[1]}</span>);
      const href = linkMatch[3];
      const isExternal = href.startsWith('http');
      if (isExternal) {
        parts.push(
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="text-[#E5C07B] hover:underline">
            {linkMatch[2]}
          </a>
        );
      } else {
        parts.push(
          <Link key={key++} href={href} className="text-[#E5C07B] hover:underline">
            {linkMatch[2]}
          </Link>
        );
      }
      remaining = linkMatch[4];
      continue;
    }

    if (boldMatch) {
      if (boldMatch[1]) parts.push(<span key={key++}>{boldMatch[1]}</span>);
      parts.push(<strong key={key++} className="text-[#F5F5F5]">{boldMatch[2]}</strong>);
      remaining = boldMatch[3];
      continue;
    }

    parts.push(<span key={key++}>{remaining}</span>);
    break;
  }

  return <>{parts}</>;
}
