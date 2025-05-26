// app/blog/[slug]/page.tsx
import { createClient } from "@/lib/supabase-server";
import Image from "next/image"; // Ensured Image is imported
import Link from "next/link";
import Script from 'next/script'; // Added import for next/script
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
      title: "Blog Post Not Found | Rooted Executive Retreats",
      description: "The blog post you are looking for does not exist.",
    };
  }

  const description = post.meta_description || post.excerpt || "Read the latest insights from Rooted Executive Retreats.";

  return {
    title: `${post.title} | Rooted Executive Retreats`,
    description: description,
    keywords: post.tags ? [...post.tags, "wellbeing", "Rooted Executive Retreats", "blog"] : ["wellbeing", "Rooted Executive Retreats", "blog", "article"],
    openGraph: {
      title: `${post.title} | Rooted Executive Retreats`,
      description: description,
      url: `/blog/${slug}`,
      siteName: "Rooted Executive Retreats",
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Rooted Executive Retreats`,
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
          <article className={`prose prose-lg max-w-none lg:w-${tocItems.length > 0 ? '3/5' : 'full'} text-[#4A4A4A] font-body prose-headings:font-heading prose-headings:text-[#317039] prose-h2:border-b-2 prose-h2:border-[#F1BE49] prose-h2:pb-2 prose-h2:mb-6 prose-strong:text-[#CC4824] prose-a:text-[#CC4824] hover:prose-a:text-[#317039]`}
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
      
      {/* MailerLite Universal Embed */}
      <section className=" bg-[#FFF8EB]"> {/* Added a section wrapper for consistent spacing */}
        <div className="container mx-auto"> {/* Removed flex justify-center */}
          <Script id="mailerlite-universal-script" strategy="afterInteractive">
            {`
              (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
              .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
              n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
              (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
              ml('account', '1529443');
            `}
          </Script>

          {/* New MailerLite Embed Code */}
          <div className="ml-embedded" data-form="rNp9Dl" />

          <div dangerouslySetInnerHTML={{ __html: `
            <style type="text/css">@import url("https://assets.mlcdn.com/fonts.css?version=1747910");</style>
            <style type="text/css">

              .ml-mobileButton-horizontal { display: none; }

              #mlb2-26320157 .ml-mobileButton-horizontal button {

                background-color: #000000 !important;
                border-color: #000000 !important;
                border-style: solid !important;
                border-width: 1px !important;
                border-radius: 25px !important;
                box-shadow: none !important;
                color: #fff8ea !important;
                cursor: pointer;
                font-family: 'Open Sans', Arial, Helvetica, sans-serif !important;
                font-size: 14px !important;
                font-weight: 700 !important;
                line-height: 20px !important;
                padding: 10px !important;
                width: 100% !important;

              }

              @media only screen and (max-width: 400px) {
                #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent.horozintalForm {
                  padding: 0 0 10px 0 !important;
                }
                .ml-hide-horizontal { display: none !important; }
                .ml-form-formContent.horozintalForm .ml-button-horizontal { display: none!important; }
                .ml-mobileButton-horizontal { display: inline-block !important; margin-bottom: 20px;width:100%; }
                .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal > div { padding-bottom: 0px !important; }
              }

            </style>
            <style type="text/css">
              @media only screen and (max-width: 400px) {
                .ml-form-formContent.horozintalForm .ml-form-horizontalRow .horizontal-fields {
                  margin-bottom: 10px !important;
                  width: 100% !important;
                }
              }
            </style>
            <style type="text/css">
              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions { text-align: left; float: left; width: 100%; }
              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsContent {
                margin: 0 0 15px 0;
                text-align: left;
              }
              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsContent.horizontal {
                margin: 0 0 15px 0;
              }
              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsContent h4 {
                color: #000000;
                font-family: 'Open Sans', Arial, Helvetica, sans-serif;
                font-size: 12px;
                font-weight: 700;
                line-height: 18px;
                margin: 0 0 10px 0;
                word-break: break-word;
              }
              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsContent p {
                color: #000000;
                font-family: 'Open Sans', Arial, Helvetica, sans-serif;
                font-size: 12px;
                line-height: 18px;
                margin: 0 0 10px 0;
              }

              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsContent.privacy-policy p {
                color: #000000;
                font-family: 'Open Sans', Arial, Helvetica, sans-serif;
                font-size: 12px;
                line-height: 22px;
                margin: 0 0 10px 0;
              }

              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsContent.privacy-policy p a {
                color: #000000;
              }

              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsContent.privacy-policy p:last-child {
                margin: 0;
              }

              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsContent p a {
                color: #000000;
                text-decoration: underline;
              }
              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsContent p:last-child { margin: 0 0 15px 0; }
              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptions {
                margin: 0;
                padding: 0;
              }
              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox {
                margin: 0 0 10px 0;
              }
              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox:last-child {
                margin: 0;
              }
              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox label {
                font-weight: normal;
                margin: 0;
                padding: 0;
                position: relative;
                display: block;
                min-height: 24px;
                padding-left: 24px;
              }
              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox .label-description {
                color: #000000;
                font-family: 'Open Sans', Arial, Helvetica, sans-serif;
                font-size: 12px;
                line-height: 18px;
                text-align: left;
                margin-bottom: 0;
                position: relative;
                vertical-align: top;
                font-style: normal;
                font-weight: 700;
              }
              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox .description {
                color: #000000;
                font-family: 'Open Sans', Arial, Helvetica, sans-serif;
                font-size: 12px;
                font-style: italic;
                font-weight: 400;
                line-height: 18px;
                margin: 5px 0 0 0;
              }
              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox input[type="checkbox"] {
                box-sizing: border-box;
                padding: 0;
                position: absolute;
                z-index: -1;
                opacity: 0;
                margin-top: 5px;
                margin-left: -1.5rem;
                overflow: visible;
              }
              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedMailerLite-GDPR {
                padding-bottom: 20px;
              }
              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedMailerLite-GDPR p {
                color: #000000;
                font-family: 'Open Sans', Arial, Helvetica, sans-serif;
                font-size: 10px;
                line-height: 14px;
                margin: 0;
                padding: 0;
              }
              #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedMailerLite-GDPR p a {
                color: #000000;
                text-decoration: underline;

              }
              @media (max-width: 768px) {
                #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsContent p {
                  font-size: 12px !important;
                  line-height: 18px !important;
                }
                #mlb2-26320157.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedMailerLite-GDPR p {
                  font-size: 10px !important;
                  line-height: 14px !important;
                }
              }
            </style>
          `}} />

          <Script id="ml-webform-success-26320157" strategy="afterInteractive">
            {`
              function ml_webform_success_26320157() {
                var $ = (typeof ml_jQuery !== 'undefined' ? ml_jQuery : (typeof jQuery !== 'undefined' ? jQuery : null));
                if ($) {
                  $('.ml-subscribe-form-26320157 .row-success').show();
                  $('.ml-subscribe-form-26320157 .row-form').hide();
                }
              }
            `}
          </Script>
          <Script 
            id="ml-webforms-js"
            src="https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024" 
            strategy="afterInteractive" 
          />
          <Script id="ml-fetch-takel-26320157" strategy="afterInteractive">
            {`
              fetch("https://assets.mailerlite.com/jsonp/1529443/forms/155139218442552547/takel")
                .catch(error => console.error('MailerLite fetch takel error:', error));
            `}
          </Script>
          
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
          <p className="mt-1">© {new Date().getFullYear()} Rooted Executive Retreats. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}