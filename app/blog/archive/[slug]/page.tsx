import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { Calendar, Clock, Mail, ArrowLeft } from "lucide-react"
import * as cheerio from "cheerio"
import { createClient } from "@/lib/supabase-server"

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface Author {
  id: string;
  name: string;
}

interface ArchivePost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  published_at: string | null;
  author_id?: string | null;
  tags?: string[] | null;
  featured_image?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
}

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

// Generate dynamic metadata for the newsletter post
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const supabase = await createClient();
  if (!supabase) {
    console.error("Supabase client failed to initialize for metadata.");
    return { title: "Newsletter Not Found | The ROOTED Way", description: "The requested newsletter could not be found." };
  }

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("title, excerpt, meta_description, meta_keywords, tags, featured_image")
    .eq("slug", slug)
    .contains("tags", ["archive"]) // Ensure it's an archive post
    .single<ArchivePost>();

  if (error || !post) {
    return {
      title: "Newsletter Not Found | The ROOTED Way",
      description: "The requested newsletter could not be found.",
    };
  }

  const description = post.meta_description || post.excerpt || "Read the latest newsletter insights from The ROOTED Way.";

  let finalKeywords: string[] = [];
  const defaultKeywords = ["newsletter", "The ROOTED Way", "leadership", "wellbeing", "archive"];

  if (post.meta_keywords && typeof post.meta_keywords === 'string' && post.meta_keywords.trim() !== '') {
    finalKeywords = post.meta_keywords.split(',').map((k: string) => k.trim()).filter((k: string) => k !== '');
  } else if (post.tags && post.tags.length > 0) {
    finalKeywords = [...post.tags];
  } else {
    finalKeywords = defaultKeywords;
  }

  // Ensure base keywords are always present
  if (!finalKeywords.includes("The ROOTED Way")) {
    finalKeywords.push("The ROOTED Way");
  }
  if (!finalKeywords.includes("newsletter")) {
    finalKeywords.push("newsletter");
  }

  return {
    title: `${post.title} | Newsletter Archive | The ROOTED Way`,
    description: description,
    keywords: finalKeywords,
    alternates: {
      canonical: `https://www.therootedway.co/blog/archive/${slug}`,
    },
    openGraph: {
      title: `${post.title} | Newsletter Archive | The ROOTED Way`,
      description: description,
      url: `https://www.therootedway.co/blog/archive/${slug}`,
      siteName: "The ROOTED Way",
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Newsletter Archive | The ROOTED Way`,
      description: description,
      creator: "@RootedSurvey", // Replace with actual Twitter handle
    },
  };
}

interface TocItem {
  id: string;
  title: string;
  level: number;
}

export default async function ArchivePostPage({ params }: PageProps) {
  const { slug } = await params;

  const supabase = await createClient();
  if (!supabase) {
    console.error("Supabase client failed to initialize for page content.");
    return <div className="container mx-auto py-12 text-center text-[#CC4824]">Error loading newsletter content. Supabase client not available.</div>;
  }

  // Fetch the archive post
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, content, excerpt, published_at, author_id, tags, featured_image")
    .eq("slug", slug)
    .contains("tags", ["archive"]) // Ensure it's an archive post
    .single<ArchivePost>();

  if (error || !post) {
    notFound();
  }

  let author: Author | null = null;
  if (post.author_id) {
    const { data: authorData, error: authorError } = await supabase
      .from("authors")
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
  let processedContent = post.content;

  if (post.content) {
    const $ = cheerio.load(post.content);
    $('h2, h3').each((i: number, el: any) => {
      const element = $(el);
      const title = element.text();
      let id = element.attr('id');
      if (!id) {
        id = slugify(title);
        element.attr('id', id);
      }
      tocItems.push({
        id: id || `section-${i}`,
        title,
        level: parseInt(el.tagName.substring(1), 10),
      });
    });
    processedContent = $.html();
  }

  // Reading Time Calculation
  let readingTimeMinutes = 0;
  if (post.content && processedContent) { 
    const $ = cheerio.load(processedContent);
    const textContent = $.text();
    const words = textContent.trim().split(/\s+/).length;
    const wordsPerMinute = 225;
    readingTimeMinutes = Math.ceil(words / wordsPerMinute);
  }

  return (
    <div className="min-h-screen bg-[#FFF8EB]">
      {/* Header Section */}
      <header className="relative min-h-screen flex flex-col md:flex-row bg-[#4A4A4A]">
        {/* Text Content - Left Column */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-6 sm:p-8 md:p-12 lg:p-16 order-2 md:order-1">
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm">
              <ol className="flex items-center space-x-2 text-[#FFF8EB]/70">
                <li><Link href="/" className="hover:text-[#F1BE49]">Home</Link></li>
                <li>/</li>
                <li><Link href="/blog" className="hover:text-[#F1BE49]">Blog</Link></li>
                <li>/</li>
                <li><Link href="/blog/archive" className="hover:text-[#F1BE49]">Newsletter Archive</Link></li>
                <li>/</li>
                <li className="text-[#F1BE49]">Newsletter</li>
              </ol>
            </nav>

            {/* Newsletter Badge */}
            <div className="inline-flex items-center gap-2 bg-[#F1BE49]/20 text-[#F1BE49] px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Mail className="h-4 w-4" />
              Newsletter Archive
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#FFF8EB] mb-4">
              {post.title}
            </h1>
            
            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-lg sm:text-xl text-[#FFF8EB]/90 font-body mb-6">
                {post.excerpt}
              </p>
            )}
            
            {/* Meta Information */}
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

            {/* Back to Archive Button */}
            <div className="mt-8">
              <Link 
                href="/blog/archive"
                className="inline-flex items-center gap-2 text-[#F1BE49] hover:text-[#FFF8EB] transition-colors font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Newsletter Archive
              </Link>
            </div>
          </div>
        </div>

        {/* Image - Right Column */}
        {post.featured_image && (
          <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-auto order-1 md:order-2 relative">
            <Image
              src={post.featured_image}
              alt={post.title || "Newsletter featured image"}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="lg:flex lg:gap-12">
          {/* Table of Contents (Desktop Sidebar) */}
          {tocItems.length > 0 && (
            <aside className="lg:w-2/5 mb-8 lg:mb-0 lg:sticky lg:top-28 self-start hidden lg:block">
              <h3 className="text-lg text-[#317039] mb-4">Newsletter Contents</h3>
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

          {/* Newsletter Content */}
          <article className={`prose prose-lg max-w-none lg:w-${tocItems.length > 0 ? '3/5' : 'full'} text-[#4A4A4A] font-body prose-headings:text-[#317039] prose-h2:border-b-2 prose-h2:border-[#F1BE49] prose-h2:pb-2 prose-h2:mb-6 prose-strong:text-[#CC4824] prose-a:text-[#CC4824] hover:prose-a:text-[#317039]`}
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </div>

        {/* Newsletter Footer */}
        <footer className="mt-12 pt-8 border-t border-[#4A4A4A]/20">
          <div className="bg-[#F1BE49]/10 rounded-lg p-6 text-center">
            <Mail className="h-8 w-8 text-[#CC4824] mx-auto mb-3" />
            <h3 className="text-lg font-medium text-[#4A4A4A] mb-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-[#4A4A4A]/80 mb-4">
              Get weekly insights on leadership, wellbeing, and personal growth delivered to your inbox.
            </p>
            <Link 
              href="/#newsletter-signup" 
              className="inline-flex items-center gap-2 bg-[#CC4824] text-white px-6 py-3 rounded-lg hover:bg-[#e05c3a] transition-colors font-medium"
            >
              Subscribe Now
            </Link>
          </div>
          
          <div className="mt-6 text-center text-sm text-[#4A4A4A]/60">
            <p>Published on: {post.published_at ? format(new Date(post.published_at), "MMMM d, yyyy") : "N/A"}</p>
            <p className="mt-1">© {new Date().getFullYear()} The ROOTED Way. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    const supabase = await createClient();
    
    const { data: posts } = await supabase
      .from("blog_posts")
      .select("slug")
      .contains("tags", ["archive"]);

    if (!posts) return [];

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for archive:", error);
    return [];
  }
} 