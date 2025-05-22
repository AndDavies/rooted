import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'ROOTED | A Playground of Wellbeing';
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
          backgroundColor: '#FFF8EB', // Antique White
          fontFamily: '"GlacialIndifference"',
          padding: '40px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          {/* Placeholder for a logo - e.g., a simple SVG or Unicode character */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: '20px'}}
          >
            <path
              d="M50 2.5C23.77 2.5 2.5 23.77 2.5 50S23.77 97.5 50 97.5 97.5 76.23 97.5 50 76.23 2.5 50 2.5zm0 15C69.33 17.5 85 33.17 85 52.5H15C15 33.17 30.67 17.5 50 17.5zM35 67.5c0 8.28 6.72 15 15 15s15-6.72 15-15H35z"
              fill="#317039" // Emerald Green
            />
          </svg>
          <span style={{ fontSize: 72, fontWeight: 700, color: '#4A4A4A' }}>
            ROOTED
          </span>
        </div>
        <p
          style={{
            fontSize: 36,
            color: '#CC4824', // Dark Pastel Red
            textAlign: 'center',
            lineHeight: '1.4',
            fontWeight: 400,
          }}
        >
          A New Way of Life That Brings You Back to Your Roots.
        </p>
        <p
          style={{
            fontSize: 24,
            color: '#4A4A4A',
            textAlign: 'center',
            marginTop: '20px',
            fontWeight: 400,
          }}
        >
          Explore wellbeing, mindfulness, and personal growth.
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
      ],
    }
  );
} 