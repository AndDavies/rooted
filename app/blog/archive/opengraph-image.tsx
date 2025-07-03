import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Newsletter Archive | The ROOTED Way';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function Image() {
  // Font
  const glacialRegular = fetch(
    new URL('../../../public/fonts/GlacialIndifference-Regular.otf', import.meta.url)
  ).then((res) => res.arrayBuffer());
  const glacialBold = fetch(
    new URL('../../../public/fonts/GlacialIndifference-Bold.otf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4A4A4A 0%, #317039 50%, #4A4A4A 100%)',
          fontFamily: '"GlacialIndifference"',
          padding: '60px',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
        }}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '20px 30px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}>
          {/* Mail/Newsletter Icon */}
          <svg
            width="90"
            height="90"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F1BE49"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ 
              marginRight: '24px',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
            }}
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span style={{ fontSize: 56, fontWeight: 700, color: '#FFF8EB' }}>
            Newsletter Archive
          </span>
        </div>
        
        <p
          style={{
            fontSize: 28,
            color: '#F1BE49',
            textAlign: 'center',
            lineHeight: '1.4',
            fontWeight: 600,
            marginBottom: '20px',
          }}
        >
          Weekly Insights on Leadership & Wellbeing
        </p>
        
        <p
          style={{
            fontSize: 20,
            color: '#FFF8EB',
            textAlign: 'center',
            lineHeight: '1.3',
            fontWeight: 400,
            maxWidth: '800px',
            opacity: 0.9,
          }}
        >
          Explore our complete collection of newsletters featuring actionable insights for high-achieving leaders.
        </p>

        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgba(241, 190, 73, 0.2)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(255, 248, 235, 0.1)',
        }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'GlacialIndifference',
          data: await glacialRegular,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'GlacialIndifference',
          data: await glacialBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
} 