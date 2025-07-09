import { NextRequest } from 'next/server';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'The ROOTED Way - Live with alignment. Lead with clarity.';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/jpeg';

// Image generation
export default async function Image(req: NextRequest) {
  // Fetch the static image from the public folder
  const imageRes = await fetch('https://therootedway.co/ROOTED_opengraph.jpg');
  const imageBuffer = await imageRes.arrayBuffer();

  return new Response(imageBuffer, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Content-Disposition': 'inline',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
} 