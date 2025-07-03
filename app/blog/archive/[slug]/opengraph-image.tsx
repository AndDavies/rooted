import { ImageResponse } from 'next/og';
import { createClient } from "@/lib/supabase-server";

// Route segment config
export const runtime = 'edge';

export const alt = 'Newsletter | The ROOTED Way';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Image generation
export default async function Image({ params }: PageProps) {
  const { slug } = await params;
  
  // Font
  const glacialRegular = fetch(
    new URL('../../../../public/fonts/GlacialIndifference-Regular.otf', import.meta.url)
  ).then((res) => res.arrayBuffer());
  const glacialBold = fetch(
    new URL('../../../../public/fonts/GlacialIndifference-Bold.otf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  // Fetch the newsletter title
  let newsletterTitle = 'Newsletter';
  try {
    const supabase = await createClient();
    if (supabase) {
      const { data: post } = await supabase
        .from("blog_posts")
        .select("title")
        .eq("slug", slug)
        .contains("tags", ["archive"])
        .single();
      
      if (post?.title) {
        newsletterTitle = post.title;
      }
    }
  } catch (error) {
    console.error("Error fetching newsletter title for OG image:", error);
  }

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
        {/* Header Section */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '30px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '15px 25px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}>
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F1BE49"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ 
              marginRight: '20px',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
            }}
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span style={{ fontSize: 36, fontWeight: 700, color: '#F1BE49' }}>
            THE ROOTED WAY
          </span>
        </div>

        {/* Newsletter Title */}
        <div style={{
          textAlign: 'center',
          marginBottom: '30px',
          maxWidth: '900px',
        }}>
          <h1 style={{
            fontSize: newsletterTitle.length > 50 ? 36 : 44,
            fontWeight: 700,
            color: '#FFF8EB',
            lineHeight: 1.2,
            margin: 0,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          }}>
            {newsletterTitle}
          </h1>
        </div>

        {/* Newsletter Badge */}
        <div style={{
          backgroundColor: 'rgba(241, 190, 73, 0.2)',
          border: '2px solid #F1BE49',
          borderRadius: '25px',
          padding: '8px 20px',
          fontSize: 18,
          fontWeight: 600,
          color: '#F1BE49',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          Newsletter Archive
        </div>

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
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          width: '3px',
          height: '60px',
          background: 'rgba(241, 190, 73, 0.3)',
          borderRadius: '2px',
        }} />
        <div style={{
          position: 'absolute',
          top: '40%',
          right: '10px',
          width: '3px',
          height: '80px',
          background: 'rgba(255, 248, 235, 0.2)',
          borderRadius: '2px',
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