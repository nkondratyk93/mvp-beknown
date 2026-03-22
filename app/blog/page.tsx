import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog — BeKnown',
  description: 'Articles about AI-verified professional profiles, career tools, and platform comparisons.',
};

const articles = [
  {
    slug: 'how-to-create-ai-verified-professional-profile',
    title: 'How to Create an AI-Verified Professional Profile in 60 Seconds',
    excerpt: 'Resumes are self-reported fiction. Your AI knows what you actually did. Here\'s how to turn that into a profile.',
  },
  {
    slug: 'ai-conversation-history-career-tool',
    title: 'Your AI Chat History Is Your Best Career Tool (Here\'s How to Use It)',
    excerpt: 'You\'ve been asking your AI questions for months. That history is a goldmine of proof about what you actually know.',
  },
  {
    slug: 'beknown-vs-linkedin-vs-readcv',
    title: 'BeKnown vs LinkedIn vs Read.cv: Which Actually Shows Who You Are?',
    excerpt: 'A head-to-head comparison of professional profile platforms — and why most of them let you lie.',
  },
];

export default function BlogPage() {
  return (
    <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-heading text-4xl font-bold mb-8">Blog</h1>
      <div className="space-y-8">
        {articles.map((article) => (
          <article key={article.slug} className="border-b border-[#27272A] pb-8">
            <Link href={`/blog/${article.slug}`}>
              <h2 className="font-heading text-2xl font-semibold mb-2 hover:text-[#E5C07B] transition-colors">
                {article.title}
              </h2>
            </Link>
            <p className="text-[#71717A] mb-3">{article.excerpt}</p>
            <Link href={`/blog/${article.slug}`} className="text-[#E5C07B] text-sm hover:underline">
              Read more &rarr;
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
