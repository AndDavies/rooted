import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'The ROOTED Way - Live with alignment. Lead with clarity.';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function Image() {
  // Font
  const glacialRegular = fetch(
    new URL('../public/fonts/GlacialIndifference-Regular.otf', import.meta.url)
  ).then((res) => res.arrayBuffer());
  const glacialBold = fetch(
    new URL('../public/fonts/GlacialIndifference-Bold.otf', import.meta.url)
  ).then((res) => res.arrayBuffer());
  const playfair = fetch(
    new URL('../public/fonts/PlayfairDisplay-VariableFont_wght.ttf', import.meta.url)
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
          background: 'linear-gradient(135deg, #FFF8EB 0%, #FFF1D4 50%, #FFF8EB 100%)', // Subtle gradient
          fontFamily: '"GlacialIndifference"',
          padding: '60px',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
        }}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          padding: '20px 30px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        }}>
          {/* Placeholder for a logo - e.g., a simple SVG or Unicode character */}

          <span style={{ fontSize: 60, fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>
            The ROOTED Way
          </span>
        </div>
        <p
          style={{
            fontSize: 32,
            color: '#CC4824', // Dark Pastel Red
            textAlign: 'center',
            lineHeight: '1.4',
            fontWeight: 600,
            marginBottom: '20px',
          }}
        >
          Live with alignment. Lead with clarity.
        </p>
        <p
          style={{
            fontSize: 22,
            color: '#4A4A4A',
            textAlign: 'center',
            lineHeight: '1.3',
            fontWeight: 400,
            maxWidth: '900px',
          }}
        >
          ROOTED helps high-achieving leaders recalibrate before burnout strikes, using science-backed methods and community support.
        </p>
      </div>
    ),
    // ImageResponse options
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
        {
          name: 'Playfair Display',
          data: await playfair,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
} 