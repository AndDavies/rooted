import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'RESET 2025 | A High-Performer Retreat';
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
          backgroundColor: '#317039', // Green background matching the location section
          fontFamily: '"GlacialIndifference"',
          padding: '40px',
          color: '#FFF8EB', // Antique White text
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <svg 
            width="70" 
            height="70" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#D4AF37" // Gold accent matching the site
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            style={{ marginRight: '20px'}}
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span style={{ fontSize: 72, fontWeight: 700 }}>
            The ROOTED Way RESET 2025
          </span>
        </div>
        <p
          style={{
            fontSize: 36,
            textAlign: 'center',
            lineHeight: '1.4',
            fontWeight: 400,
            color: '#FFF1D4', // Lighter cream for subtitle
            marginBottom: '20px',
          }}
        >
          Gouveia, Portugal · October 2025
        </p>
        <p
          style={{
            fontSize: 28,
            textAlign: 'center',
            lineHeight: '1.4',
            fontWeight: 400,
            color: '#D4AF37', // Gold accent for supporting line
            marginBottom: '30px',
          }}
        >
          Restore your nervous system. Reclaim your clarity.
        </p>
        <p
          style={{
            fontSize: 24,
            textAlign: 'center',
            fontWeight: 400,
            color: '#FFF1D4', // Lighter cream for URL
          }}
        >
          https://www.therootedway.co/experiences/reset
        </p>
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