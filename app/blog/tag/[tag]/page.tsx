// app/blog/tag/[tag]/page.tsx
import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Mail } from "lucide-react";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';

// BlogPost interface (matches schema)
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  published_at: string | null;
  featured_image?: string | null;
  tags?: string[] | null;
  is_featured?: boolean | null;
}

// Type for the objects returned by the allTags query
interface TagPost {
  tags: string[] | null;
}

interface TagPageProps {
  params: Promise<{ tag: string }>; // Next.js 15 async params
}

// Generate dynamic metadata for tag pages
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  
  const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
  
  return {
    title: `${capitalizedTag} Articles | Blog | The ROOTED Way`,
    description: `Explore articles about ${tag} on wellbeing, mindfulness, and personal growth from The ROOTED Way.`,
    alternates: {
      canonical: `/blog/tag/${tag}`,
    },
    openGraph: {
      title: `${capitalizedTag} Articles | Blog | The ROOTED Way`,
      description: `Explore articles about ${tag} on wellbeing, mindfulness, and personal growth from The ROOTED Way.`,
      url: `/blog/tag/${tag}`,
      siteName: "The ROOTED Way",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${capitalizedTag} Articles | Blog | The ROOTED Way`,
      description: `Explore articles about ${tag} on wellbeing, mindfulness, and personal growth from The ROOTED Way.`,
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params; // Await dynamic param
  const supabase = await createClient();

  // Fetch posts with the specified tag
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, published_at, featured_image, tags, is_featured")
    .contains("tags", [tag]) // Filter posts where tags array contains the tag
    .order("published_at", { ascending: false });

  // Fetch all unique tags for the hero section
  const { data: allTags, error: tagsError } = await supabase.from("blog_posts").select("tags").returns<TagPost[]>();

  if (error || tagsError) {
    console.error("Error fetching posts for tag:", { tagError: error?.message, tagsError: tagsError?.message });
    return <div>Error loading posts for tag: {tag}. Check server logs.</div>;
  }

  if (!posts || posts.length === 0) {
    notFound(); // Return 404 if no posts found for the tag
  }

  const uniqueTags: string[] = Array.from(
    new Set(allTags?.filter((post: TagPost) => post.tags && post.tags.length > 0).flatMap((post: TagPost) => post.tags || []) || [])
  ).slice(0, 8) as string[];

  return (
    <div className="min-h-screen bg-[#FFF8EB]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#317039]/10 to-[#CC4824]/10 py-16 md:py-24 pt-12 md:pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-[#317039] mb-6">
              Posts Tagged: #{tag}
            </h1>
            <p className="text-lg text-[#4A4A4A] mb-8 max-w-2xl mx-auto">
              Explore all articles related to {tag} for your wellbeing journey.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {uniqueTags.map((t) => (
                <Link
                  key={t as string}
                  href={`/blog/tag/${t}`}
                  className={`bg-white hover:bg-[#F1BE49]/20 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    t === tag ? "text-[#CC4824] font-bold ring-2 ring-[#CC4824]" : "text-[#317039]"
                  }`}
                >
                  #{t as string}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 md:py-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="h-1 w-6 bg-[#317039] rounded-full"></div>
              <h2 className="text-xl font-semibold text-[#317039]">Articles</h2>
            </div>
            <Link
              href="/blog"
              className="text-[#317039] hover:text-[#CC4824] text-sm font-medium flex items-center gap-1"
            >
              Back to Blog
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: BlogPost) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border-none h-full flex flex-col bg-[#FFF1D4]"
              >
                {post.featured_image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.featured_image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {post.tags && post.tags.length > 0 && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/80 backdrop-blur-sm text-[#317039]">{post.tags[0]}</Badge>
                      </div>
                    )}
                  </div>
                )}
                <CardContent className="p-6 flex-grow">
                  <div className="flex items-center gap-4 text-xs text-[#4A4A4A]/70 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{post.published_at ? format(new Date(post.published_at), "MMM d, yyyy") : "N/A"}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-[#4A4A4A] line-clamp-2">{post.title}</h3>
                  <p className="text-[#4A4A4A]/80 text-sm line-clamp-3 mb-4">{post.excerpt || "No excerpt available"}</p>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  <Button
                    asChild
                    variant="outline"
                    className="text-[#317039] border-[#317039] hover:bg-[#CC4824]/10 hover:text-[#CC4824] w-full"
                  >
                    <Link href={`/blog/${post.slug}`}>Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}