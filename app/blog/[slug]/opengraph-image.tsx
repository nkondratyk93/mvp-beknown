import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'BeKnown Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const articles: Record<string, string> = {
  'how-to-create-ai-verified-professional-profile':
    'How to Create an AI-Verified Professional Profile in 60 Seconds',
  'ai-conversation-history-career-tool':
    "Your AI Chat History Is Your Best Career Tool (Here's How to Use It)",
  'beknown-vs-linkedin-vs-readcv':
    'BeKnown vs LinkedIn vs Read.cv: Which Actually Shows Who You Are?',
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = articles[slug] || 'BeKnown Blog';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#0A0A0B',
          color: '#F5F5F5',
          fontFamily: 'sans-serif',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: '#E5C07B',
            marginBottom: 24,
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        >
          BeKnown Blog
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 'bold',
            lineHeight: 1.2,
            maxWidth: '90%',
            marginBottom: 40,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 20,
            color: '#71717A',
          }}
        >
          beknown.no-humans.app
        </div>
      </div>
    ),
    { ...size }
  );
}
