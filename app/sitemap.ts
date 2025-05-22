import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase-server';

// IMPORTANT: Replace this with your actual, production domain
const SITE_URL = 'https://www.rootedexecutiveretreats.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  let blogPosts: { slug: string; updated_at?: string | null, published_at?: string | null }[] = [];

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('slug, updated_at, published_at') // Fetching both, will prioritize updated_at
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts for sitemap:', error.message);
      } else if (data) {
        blogPosts = data;
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error('Exception fetching blog posts for sitemap:', e.message);
      } else {
        console.error('Unknown exception fetching blog posts for sitemap:', e);
      }
    }
  }

  const postsUrls = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : (post.published_at ? new Date(post.published_at) : new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(), // Or a specific date for your homepage
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(), // Consider a more dynamic date if blog index changes often
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Add other static routes here if you have them, e.g.:
    // {
    //   url: `${SITE_URL}/about-us`,
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly',
    //   priority: 0.5,
    // },
  ];

  return [
    ...staticRoutes,
    ...postsUrls,
  ];
} 