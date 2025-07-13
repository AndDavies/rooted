

import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const glacialRegular = fetch(
    new URL('../../../public/fonts/GlacialIndifference-Regular.otf', import.meta.url)
  ).then(res => res.arrayBuffer());

  const glacialBold = fetch(
    new URL('../../../public/fonts/GlacialIndifference-Bold.otf', import.meta.url)
  ).then(res => res.arrayBuffer());

  const [fontRegular, fontBold] = await Promise.all([glacialRegular, glacialBold]);

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#317039',
          color: '#FFF8EB',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px',
          justifyContent: 'center',
        }}
      >
        <div style={{ fontSize: 32, color: '#D4AF37', marginBottom: 16 }}>The ROOTED Way</div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            fontFamily: 'GlacialBold',
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          RESET 2025
        </div>
        <div
          style={{
            fontSize: 36,
            fontFamily: 'GlacialRegular',
            color: '#FFF1D4',
            marginBottom: 30,
          }}
        >
          Gouveia, Portugal · October 2025
        </div>
        <div
          style={{
            fontSize: 28,
            fontFamily: 'GlacialRegular',
            color: '#ffffffcc',
            fontStyle: 'italic',
          }}
        >
          Restore your nervous system. Reclaim your clarity.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'GlacialRegular',
          data: fontRegular,
          style: 'normal',
        },
        {
          name: 'GlacialBold',
          data: fontBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}