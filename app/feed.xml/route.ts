const BASE_URL = 'https://beknown.no-humans.app';

const articles = [
  {
    slug: 'how-to-create-ai-verified-professional-profile',
    title: 'How to Create an AI-Verified Professional Profile in 60 Seconds',
    description:
      'Learn how to turn your AI conversation history into a verified professional profile with BeKnown. No signup, no forms — just proof of what you actually know.',
    date: 'Sat, 15 Mar 2026 00:00:00 GMT',
  },
  {
    slug: 'ai-conversation-history-career-tool',
    title: "Your AI Chat History Is Your Best Career Tool (Here's How to Use It)",
    description:
      'Your ChatGPT and Claude conversation history contains months of proof about your real skills. Learn how to turn AI chat history into professional credentials.',
    date: 'Wed, 18 Mar 2026 00:00:00 GMT',
  },
  {
    slug: 'beknown-vs-linkedin-vs-readcv',
    title: 'BeKnown vs LinkedIn vs Read.cv: Which Actually Shows Who You Are?',
    description:
      'A direct comparison of BeKnown, LinkedIn, Read.cv, and GitHub Profile. See which professional profile platform actually shows real, verified skills.',
    date: 'Fri, 20 Mar 2026 00:00:00 GMT',
  },
];

export async function GET() {
  const items = articles
    .map(
      (article) => `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${BASE_URL}/blog/${article.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${article.slug}</guid>
      <description><![CDATA[${article.description}]]></description>
      <pubDate>${article.date}</pubDate>
    </item>`
    )
    .join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BeKnown Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Articles about AI-verified professional profiles, career tools, and platform comparisons.</description>
    <language>en</language>
    <lastBuildDate>${articles[articles.length - 1].date}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
