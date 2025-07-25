// app/blog/[slug]/page.tsx
import { createClient } from "@/lib/supabase-server";
import Image from "next/image"; // Ensured Image is imported
import Link from "next/link";
import Script from 'next/script'; // Added import for next/script
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ChevronLeft, Calendar, Clock } from "lucide-react"; 
// Card components might not be needed for the main article, but maybe for CTA or related posts
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Avatar not directly in this new design, but author data is still fetched
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// Badge might be used for tags if we reintroduce them, or within content
// import { Badge } from "@/components/ui/badge";
// ShareButtons & Breadcrumbs are not in the new design description for the main content flow
// import ShareButtons from "@/components/ShareButtons";
// import Breadcrumbs from "@/components/Breadcrumbs";
import * as cheerio from 'cheerio'; // Import cheerio

// -- Types -------------------------------------------------------------------
interface PageProps {
  params: Promise<{ slug: string }>;
}

// Interface for Author data if you fetch it separately
interface Author {
  id: string;
  name: string;
  // avatar_url?: string | null; // Not used in new design
  // bio?: string | null;        // Not used in new design
}

// Keeping BlogPost interface consistent, though not all fields are used in this new design
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string; // Main HTML content
  excerpt?: string | null;
  published_at: string | null;
  author_id?: string | null;
  tags?: string[] | null;
  featured_image?: string | null; // For metadata
  meta_description?: string | null; // For metadata
  // card_icon?: string | null; // Not used on slug page
}

// Helper function to generate slugs for IDs (simple version)
const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-');    // Replace multiple - with single -
};

// Generate dynamic metadata for the blog post (remains largely the same)
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const supabase = await createClient();
  if (!supabase) {
    console.error("Supabase client failed to initialize for metadata.");
    return { title: "Error", description: "Could not load blog post metadata." };
  }
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("title, excerpt, tags, featured_image, meta_description, meta_keywords") // Changed 'description' to 'excerpt' for consistency
    .eq("slug", slug)
    .not('tags', 'cs', '{"archive"}') // Exclude posts with "archive" tag
    .single();

  if (error || !post) {
    return {
      title: "Blog Post Not Found | The ROOTED Way",
      description: "The blog post you are looking for does not exist.",
    };
  }

  const description = post.meta_description || post.excerpt || "Read the latest insights from The ROOTED Way.";

  let finalKeywords: string[] = [];
  const defaultKeywords = ["wellbeing", "The ROOTED Way", "blog", "article"];

  if (post.meta_keywords && typeof post.meta_keywords === 'string' && post.meta_keywords.trim() !== '') {
    finalKeywords = post.meta_keywords.split(',').map(k => k.trim()).filter(k => k !== '');
  } else if (post.tags && post.tags.length > 0) {
    finalKeywords = [...post.tags]; // Assuming tags is already an array of strings
    // Optionally, add default keywords if tags are present but you still want them
    // finalKeywords.push(...defaultKeywords.filter(dk => !finalKeywords.includes(dk))); 
  } else {
    finalKeywords = defaultKeywords;
  }
  // Ensure some base keywords are always present if not already included
  if (!finalKeywords.includes("The ROOTED Way")) {
    finalKeywords.push("The ROOTED Way");
  }
  if (!finalKeywords.includes("blog")) {
    finalKeywords.push("blog");
  }

  return {
    title: `${post.title} | The ROOTED Way`,
    description: description,
    keywords: finalKeywords,
    alternates: {
      canonical: `https://www.therootedway.co/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | The ROOTED Way`,
      description: description,
      url: `https://www.therootedway.co/blog/${slug}`,
      siteName: "The ROOTED Way",
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | The ROOTED Way`,
      description: description,
      creator: "@RootedSurvey", // Replace with actual Twitter handle
    },
  };
}

// Define an interface for ToC items
interface TocItem {
  id: string;
  title: string;
  level: number; // e.g., 2 for h2, 3 for h3
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const supabase = await createClient();
  if (!supabase) {
    console.error("Supabase client failed to initialize for page content.");
    // Or handle this more gracefully, e.g., redirect or show a user-friendly error
    return <div className="container mx-auto py-12 text-center text-[#CC4824]">Error loading page content. Supabase client not available.</div>;
  }

  // Fetch all necessary fields for the new design
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, content, excerpt, published_at, author_id, tags, featured_image")
    .eq("slug", slug)
    .not('tags', 'cs', '{"archive"}') // Exclude posts with "archive" tag
    .single<BlogPost>();

  if (error || !post) {
    notFound();
  }

  let author: Author | null = null;
  if (post.author_id) {
    const { data: authorData, error: authorError } = await supabase
      .from("authors") // Assuming you have an 'authors' table
      .select("id, name")
      .eq("id", post.author_id)
      .single<Author>();
    if (authorError) {
      console.error("Error fetching author:", authorError.message);
    } else {
      author = authorData;
    }
  }
  
  // Table of Contents Generation
  const tocItems: TocItem[] = [];
  let processedContent = post.content; // Initialize with original content

  if (post.content) {
    const $ = cheerio.load(post.content); // Load content once for processing
    $('h2, h3').each((i, el) => {
      const element = $(el);
      const title = element.text();
      let id = element.attr('id');
      if (!id) {
        id = slugify(title);
        element.attr('id', id); // Add id to the element in the parsed HTML
      }
      tocItems.push({
        id: id || `section-${i}`, // Fallback id if slugify returned empty
        title,
        level: parseInt(el.tagName.substring(1), 10), // h2 -> 2, h3 -> 3
      });
    });
    processedContent = $.html(); // Get the modified HTML content with new IDs
  }

  // Reading Time Calculation
  let readingTimeMinutes = 0;
  // Use processedContent for reading time calculation, only if post.content was originally present
  if (post.content && processedContent) { 
    const $ = cheerio.load(processedContent);
    const textContent = $.text(); // Get text content, strips HTML tags
    const words = textContent.trim().split(/\s+/).length;
    const wordsPerMinute = 225; // Average reading speed
    readingTimeMinutes = Math.ceil(words / wordsPerMinute);
  }

  return (
    <div className="min-h-screen bg-[#FFF8EB]">
      {/* Top-of-Page Title Block - Updated Structure */}
      <header className="relative min-h-screen flex flex-col md:flex-row bg-[#4A4A4A]">
        {/* Text Content - Left Column (Order 2 on mobile, Order 1 on md screens) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-6 sm:p-8 md:p-12 lg:p-16 order-2 md:order-1">
          <div className="max-w-2xl">
            {/* Removed font-heading, global style will apply */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#FFF8EB] mb-4">
            {post.title}
          </h1>
          {post.excerpt && (
              <p className="text-lg sm:text-xl text-[#FFF8EB]/90 font-body mb-6">
              {post.excerpt}
            </p>
          )}
            <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-3 text-sm font-body text-[#FFF8EB]/80 uppercase tracking-wider">
            {post.published_at && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                <span>{format(new Date(post.published_at), "MMMM d, yyyy")}</span>
              </div>
            )}
            {author && (
                <span className="mt-2 sm:mt-0">By {author.name}</span>
            )}
            {readingTimeMinutes > 0 && (
                <div className="flex items-center mt-2 sm:mt-0">
                <Clock className="h-4 w-4 mr-1.5" />
                <span>{readingTimeMinutes} min read</span>
              </div>
            )}
          </div>
        </div>
        </div>

        {/* Image - Right Column (Order 1 on mobile, Order 2 on md screens) */}
        {post.featured_image && (
          <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-auto order-1 md:order-2 relative">
            <Image
              src={post.featured_image}
              alt={post.title || "Blog post featured image"}
              fill
              style={{ objectFit: "cover" }}
              priority // Good to add for LCP images
            />
            {/* Optional: Add a subtle overlay if needed, e.g., for text contrast if text was over image */}
            {/* <div className="absolute inset-0 bg-black/10"></div> */}
          </div>
        )}
      </header>

      {/* Main Content Area with Optional ToC */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="lg:flex lg:gap-12">
          {/* Floating Table of Contents (Desktop Sidebar / Mobile Collapsible) */}
          {tocItems.length > 0 && (
            <aside className="lg:w-2/5 mb-8 lg:mb-0 lg:sticky lg:top-28 self-start hidden lg:block ">
              {/* Removed font-heading, global style will apply */}
              <h3 className="text-lg text-[#317039] mb-4">Contents</h3>
              <nav>
                <ul>
                  {tocItems.map((item) => (
                    <li key={item.id} className={`py-1.5 border-l-2 border-transparent hover:border-[#F1BE49] pl-3 ${item.level === 3 ? 'ml-4 text-sm' : ''}`}>
                      <a href={`#${item.id}`} className="text-[#4A4A4A]/80 hover:text-[#CC4824] font-body transition-colors">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}

          {/* Article Content */}
          <article className={`prose prose-lg max-w-none lg:w-${tocItems.length > 0 ? '3/5' : 'full'} text-[#4A4A4A] font-body prose-headings:text-[#317039] prose-h2:border-b-2 prose-h2:border-[#F1BE49] prose-h2:pb-2 prose-h2:mb-6 prose-strong:text-[#CC4824] prose-a:text-[#CC4824] hover:prose-a:text-[#317039]`}
            dangerouslySetInnerHTML={{ __html: processedContent }}
          >
            {/* 
              To implement sectioned content with callouts, stat tiles, inline data visuals:
              Your post.content HTML would need to include specific classes or structures
              that you can target with Tailwind, or global CSS in globals.css.

              Example for an H2 with accent (handled by prose-h2 classes above):
              <h2 id="section-1">Section Title</h2>
              
              Example for a key stat hook sentence (handled by prose-strong):
              <p><strong>82% of executives report feeling overwhelmed.</strong> Rest of paragraph...</p>

              Example for a callout box:
              <div class="my-callout-box bg-[#FFF1D4] p-6 rounded-lg border-l-4 border-[#F1BE49] my-8">
                <p class="text-lg font-semibold text-[#317039]">"This is a pivotal quote."</p>
                <p class="text-sm text-[#4A4A4A]/80">- Source</p>
              </div>

              Example for stat tiles (structure to be added between sections in content):
              <div class="grid grid-cols-2 md:grid-cols-3 gap-6 my-12">
                <div class="bg-[#FFF1D4] p-6 rounded-xl shadow-md text-center">
                  <p class="text-4xl font-bold text-[#CC4824]">75%</p>
                  <p class="text-sm text-[#4A4A4A]/70 mt-1">Statistic Label</p>
                </div>
                // ... more tiles
              </div>
              
              Inline data visuals (SVG/icon pairs) would also be part of post.content HTML:
              <p>... a micro-bar <svg class="inline h-4 w-8"><rect width="60%" height="100%" fill="#F1BE49"></rect><rect x="60%" width="40%" height="100%" fill="#E0E0E0"></rect></svg> next to "82%..."</p>
            */}
          </article>
        </div>
      </div>
      
      {/* Footer (can remain similar or be standardized by a global layout) */}
      <footer className="bg-[#FFF1D4] py-8">
        <div className="container mx-auto px-4 text-center text-sm text-[#4A4A4A]">
          <div className="flex justify-center items-center gap-x-6 gap-y-2 flex-wrap mb-4">
             <Link href="/blog" className="hover:text-[#CC4824] transition-colors">
                <ChevronLeft className="inline h-4 w-4 mr-1" />
                Back to Blog
              </Link>
              {/* Placeholder for Next/Prev article links if implemented */}
              {/* <Link href="#" className="hover:text-[#CC4824] transition-colors">
                Next Article
                <ChevronRight className="inline h-4 w-4 ml-1" />
              </Link> */}
          </div>
          <p>Published on: {post.published_at ? format(new Date(post.published_at), "MMMM d, yyyy") : "N/A"}</p>
          <p className="mt-1">© {new Date().getFullYear()} The ROOTED Way. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// -- Static Generation -------------------------------------------------------

// Revalidate each blog post page every 30 minutes so that new updates are picked
// up relatively quickly without sacrificing the benefits of full static pages.
export const revalidate = 1800;

// Pre-render every blog post at build time so that each article has a fully
// static HTML version available the first time Googlebot (or any visitor)
// requests it. This removes the risk of the runtime Supabase call failing on
// first request and guarantees that the <head> metadata (including canonical
// tags) is available without JavaScript execution.
export async function generateStaticParams() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug")
      .not('tags', 'cs', '{"archive"}'); // Exclude posts with "archive" tag

    if (error) {
      console.error("generateStaticParams – Supabase error:", error.message);
      return [];
    }

    return (data || []).map(({ slug }: { slug: string }) => ({ slug }));
  } catch (err) {
    console.error("generateStaticParams – Unexpected error:", err);
    return [];
  }
}