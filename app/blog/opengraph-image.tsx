import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Blog | Rooted Survey';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function Image() {
  // Font
  const glacialRegular = fetch(
    new URL('../../public/fonts/GlacialIndifference-Regular.otf', import.meta.url) // Adjusted path
  ).then((res) => res.arrayBuffer());
  const glacialBold = fetch(
    new URL('../../public/fonts/GlacialIndifference-Bold.otf', import.meta.url) // Adjusted path
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
          backgroundColor: '#4A4A4A', // Dark Gray background for blog section
          fontFamily: '"GlacialIndifference"',
          padding: '40px',
          color: '#FFF8EB', // Antique White text
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
           {/* You can use a different or simplified logo/icon here if desired */}
          <svg 
            width="70" 
            height="70" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#F1BE49" // Maximum Yellow accent
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            style={{ marginRight: '20px'}}
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <span style={{ fontSize: 72, fontWeight: 700 }}>
            Blog
          </span>
        </div>
        <p
          style={{
            fontSize: 36,
            textAlign: 'center',
            lineHeight: '1.4',
            fontWeight: 400,
            color: '#FFF1D4', // Lighter cream for subtitle
          }}
        >
          Insights on Wellbeing, Mindfulness & Personal Growth
        </p>
        <p
          style={{
            fontSize: 24,
            textAlign: 'center',
            marginTop: '30px',
            fontWeight: 400,
            color: '#F1BE49', // Maximum Yellow for call to action/site name
          }}
        >
          rootedsurvey.com
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