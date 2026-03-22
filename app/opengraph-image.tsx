import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'BeKnown — Your AI has worked with you for months. Let it speak for you.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#0A0A0B',
          color: '#F5F5F5',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 20 }}>👁️</div>
        <div style={{ fontSize: 48, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>
          BeKnown
        </div>
        <div style={{ fontSize: 24, color: '#71717A', textAlign: 'center', maxWidth: '80%' }}>
          Your AI has worked with you for months. Let it speak for you.
        </div>
        <div style={{ fontSize: 18, color: '#E5C07B', marginTop: 40 }}>
          beknown.no-humans.app
        </div>
      </div>
    ),
    { ...size }
  );
}
