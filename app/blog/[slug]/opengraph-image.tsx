import { ImageResponse } from 'next/og';
import { createClient } from '@/lib/supabase-server'; // To fetch post title

export const runtime = 'edge';

export const alt = 'The ROOTED Weekly'; // Default alt, can be improved if title is accessible here easily
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

interface ImageProps {
  params: { slug: string };
}

// Helper function to truncate text
function truncateText(text: string | null | undefined, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export default async function Image({ params }: ImageProps) {
  const { slug } = params;
  let postTitle = 'Discover Rooted Insights'; // Default title
  let postExcerpt = 'In-depth articles on wellbeing, mindfulness, and personal growth.'; // Default excerpt

  try {
    const supabase = await createClient();
    if (supabase) {
      const { data: post, error } = await supabase
        .from('blog_posts')
        .select('title, excerpt')
        .eq('slug', slug)
        .single();

      if (post && !error) {
        postTitle = post.title || postTitle;
        postExcerpt = post.excerpt || postExcerpt;
      }
    }
  } catch (e) {
    console.error('Error fetching post title for OG image:', e);
    // Keep default title if fetch fails
  }
  
  const glacialRegular = fetch(
    new URL('../../../public/fonts/GlacialIndifference-Regular.otf', import.meta.url) // Adjusted path
  ).then((res) => res.arrayBuffer());
  const glacialBold = fetch(
    new URL('../../../public/fonts/GlacialIndifference-Bold.otf', import.meta.url) // Adjusted path
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
          backgroundColor: '#FFF1D4', // Papaya Whip background
          fontFamily: '"GlacialIndifference"',
          padding: '50px',
          color: '#4A4A4A', // Dark Gray text
          textAlign: 'center',
        }}
      >
        <div 
          style={{
            fontSize: 28,
            fontWeight: 400, 
            color: '#317039', /* Emerald Green */
            marginBottom: '20px'
          }}
        >
          THE ROOTED WAY BLOG
        </div>
        <div
          style={{
            fontSize: 60, // Larger title
            fontWeight: 700,
            lineHeight: '1.2',
            marginBottom: '25px',
            maxWidth: '90%',
          }}
        >
          {truncateText(postTitle, 80)} 
        </div>
        <div 
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: '#CC4824', /* Dark Pastel Red */
            maxWidth: '85%',
            lineHeight: '1.5'
          }}
        >
          {truncateText(postExcerpt, 150)}
        </div>
        <div 
            style={{
                position: 'absolute',
                bottom: '40px',
                fontSize: '20px',
                color: '#4A4A4A'
            }}
        >
            https://www.therootedway.co/blog/{slug}
        </div>
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
      // You can also set a custom alt tag here if needed, potentially using postTitle
      // alt: postTitle ? `Blog Post: ${postTitle}` : alt, 
    }
  );
} 