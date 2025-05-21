// app/blog/[slug]/page.tsx
import { createClient } from "@/lib/supabase-server";
// Image import might not be needed if no featured_image is displayed directly
// import Image from "next/image"; 
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react"; 
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

type BlogParams = Promise<{ slug: string }>;

interface PageProps {
  params: BlogParams;
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
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const supabase = await createClient();
  if (!supabase) {
    console.error("Supabase client failed to initialize for metadata.");
    return { title: "Error", description: "Could not load blog post metadata." };
  }
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("title, excerpt, tags, featured_image, meta_description") // Changed 'description' to 'excerpt' for consistency
    .eq("slug", slug)
    .single();

  if (error || !post) {
    return {
      title: "Blog Post Not Found | Rooted Survey",
      description: "The blog post you are looking for does not exist.",
    };
  }

  const description = post.meta_description || post.excerpt || "Read the latest insights from Rooted Survey.";

  return {
    title: `${post.title} | Rooted Survey`,
    description: description,
    keywords: post.tags ? [...post.tags, "wellbeing", "Rooted Survey"] : ["wellbeing", "Rooted Survey"],
    openGraph: {
      title: `${post.title} | Rooted Survey`,
      description: description,
      url: `https://www.rootedsurvey.com/blog/${slug}`,
      siteName: "Rooted Survey",
      images: [
        {
          url: post.featured_image || "/images/og-image.jpg", // Default OG image
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Rooted Survey`,
      description: description,
      images: [post.featured_image || "/images/og-image.jpg"], // Corrected stray backslash
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
  const resolvedParams = await params;
  const { slug } = resolvedParams;

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
  if (post.content) {
    const $ = cheerio.load(post.content);
    $('h2, h3').each((i, el) => {
      const element = $(el);
      const title = element.text();
      let id = element.attr('id');
      if (!id) {
        id = slugify(title);
        // Optionally, you could modify the actual HTML content here to add the id
        // element.attr('id', id); 
        // For now, we just use it for the ToC link
      }
      tocItems.push({
        id: id || `section-${i}`, // Fallback id
        title,
        level: parseInt(el.tagName.substring(1), 10), // h2 -> 2, h3 -> 3
      });
    });
  }

  // Reading Time Calculation
  let readingTimeMinutes = 0;
  if (post.content) {
    const $ = cheerio.load(post.content);
    const textContent = $.text(); // Get text content, strips HTML tags
    const words = textContent.trim().split(/\s+/).length;
    const wordsPerMinute = 225; // Average reading speed
    readingTimeMinutes = Math.ceil(words / wordsPerMinute);
  }

  return (
    <div className="min-h-screen bg-[#FFF8EB]">
      {/* Top-of-Page Title Block */}
      <header className="bg-[#FFF1D4] py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-[#4A4A4A] mb-4">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg md:text-xl text-[#4A4A4A]/80 font-body mb-6">
              {post.excerpt}
            </p>
          )}
          <div className="flex justify-center items-center gap-x-6 gap-y-2 flex-wrap text-sm font-body text-[#4A4A4A]/70 uppercase tracking-wider">
            {post.published_at && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                <span>{format(new Date(post.published_at), "MMMM d, yyyy")}</span>
              </div>
            )}
            {author && (
              <span>By {author.name}</span>
            )}
            {readingTimeMinutes > 0 && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5" />
                <span>{readingTimeMinutes} min read</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area with Optional ToC */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="lg:flex lg:gap-12">
          {/* Floating Table of Contents (Desktop Sidebar / Mobile Collapsible) */}
          {tocItems.length > 0 && (
            <aside className="lg:w-1/4 mb-8 lg:mb-0 lg:sticky lg:top-28 self-start hidden lg:block">
              <h3 className="text-lg font-semibold font-heading text-[#317039] mb-4">Contents</h3>
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
          <article className={`prose prose-lg max-w-none lg:w-${tocItems.length > 0 ? '3/4' : 'full'} text-[#4A4A4A] font-body prose-headings:font-heading prose-headings:text-[#317039] prose-h2:border-b-2 prose-h2:border-[#F1BE49] prose-h2:pb-2 prose-h2:mb-6 prose-strong:text-[#CC4824] prose-a:text-[#CC4824] hover:prose-a:text-[#317039]`}
            dangerouslySetInnerHTML={{ __html: post.content }}
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
      
      {/* End-of-Post Call-to-Action */}
      <section className="bg-[#CC4824] py-12 md:py-16 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="text-lg text-white/90 font-body mb-8">
            Download our comprehensive report, subscribe for more insights, or explore our executive retreat programs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" className="bg-white text-[#CC4824] hover:bg-[#FFF1D4]">
              Download PDF
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#CC4824]">
              Explore Retreats
            </Button>
          </div>
        </div>
      </section>

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
          <p className="mt-1">© {new Date().getFullYear()} Rooted Survey. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}