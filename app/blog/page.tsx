import { createClient } from "@/lib/supabase-server"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from 'next'
// Card components are no longer used
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"
// import { format } from "date-fns" // Not used in the new card design
//import { BlogSubscribeForm } from "@/components/BlogSubscribeForm"

export const revalidate = 60; // Revalidate at most every 60 seconds
// export const dynamic = 'force-dynamic'; // You can try this if revalidate doesn't solve it

/**
 * Blog Index Page Component
 * 
 * Displays the main landing page for the blog with featured post,
 * latest articles, and popular tags.
 * 
 * @returns {JSX.Element} The rendered blog index page
 */
interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published_at: string | null
  featured_image?: string | null
  // card_icon?: string | null // Removed
  tags?: string[] | null // Kept for uniqueTags generation
  is_featured?: boolean | null
}

// Type for the objects returned by the allTags query
interface TagPost {
  tags: string[] | null;
}

// Added metadata for the blog index page
export const metadata: Metadata = {
  title: "Blog | Rooted Executive Retreats",
  description: "Explore insightful articles on wellbeing, mindfulness, personal growth, and the latest updates from Rooted Executive Retreats.",
  openGraph: {
    title: "Blog | Rooted Executive Retreats",
    description: "Explore insightful articles on wellbeing, mindfulness, personal growth, and the latest updates from Rooted Executive Retreats.",
    url: '/blog',
  },
  twitter: {
    title: "Blog | Rooted Executive Retreats",
    description: "Explore insightful articles on wellbeing, mindfulness, personal growth, and the latest updates from Rooted Executive Retreats.",
  },
};

export default async function BlogIndexPage() {
  try {
    const supabase = await createClient()

    // Fetching only regular posts now, up to a reasonable limit for an index page
    const [{ data: postsData, error: postsError }, { data: allTagsData, error: tagsError }] = await Promise.all([
      supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, published_at, featured_image, tags") // Removed card_icon
        .order("published_at", { ascending: false })
        .limit(12), // Fetch a few more for a fuller grid, e.g., 12
      supabase.from("blog_posts").select("tags").returns<TagPost[]>(),
    ])

    if (postsError || tagsError) {
      const errorDetails = {
        posts: postsError
          ? { message: postsError.message, details: postsError.details, hint: postsError.hint }
          : null,
        tags: tagsError ? { message: tagsError.message, details: tagsError.details, hint: tagsError.hint } : null,
      }
      console.error("Error fetching blog data:", errorDetails)
      return <div>Error loading blog posts. Check server logs for details.</div>
    }

    const posts: BlogPost[] = postsData || []
    
    const uniqueTags: string[] = Array.from(
      new Set(
        allTagsData
          ?.filter((post: TagPost) => post.tags && post.tags.length > 0)
          .flatMap((post: TagPost) => post.tags || [])
          || []
      )
    ).slice(0, 8) as string[]

    return (
      <div className="min-h-screen bg-[#fff0d4]"> {/* Updated page background color */}
        {/* Featured Article Hero Banner REMOVED */}

        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20"> {/* Added py-12 for overall padding */}
          {/* Topics/Tags Filter Bar REMOVED */}

          {/* Simplified Posts Grid Section */}
          {posts.length > 0 ? (
            <section className="mb-12 md:mb-20">
              <div className="flex items-center gap-3 mb-8 md:mb-10">
                <TrendingUp className="h-5 w-5 text-[#CC4824]" />
                {/* Updated heading text color */}
                <h2 className="text-2xl md:text-3xl text-[#4A4A4A]">All Articles</h2>
              </div>

              {/* Updated grid for 4 columns on lg screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 md:gap-x-7 md:gap-y-10">
                {posts.map((post) => (
                  <div key={post.id} className="flex flex-col group">
                    {post.featured_image && (
                      <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-80 xl:h-80 rounded-xl overflow-hidden shadow-lg mb-4">
                        <Link href={`/blog/${post.slug}`} className="block w-full h-full">
                          <Image
                            src={post.featured_image}
                            alt={post.title || "Blog post image"}
                            layout="fill"
                            objectFit="cover"
                            className="transform transition-transform duration-300 group-hover:scale-105"
                          />
                        </Link>
                      </div>
                    )}
                    
                    <div className="flex flex-col flex-grow p-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5">5 MIN READ</p>
                      <h3 className={`text-xl mb-2 text-neutral-800 transition-colors group-hover:text-[#CC4824]`}>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-neutral-700 text-sm line-clamp-3 mb-3 flex-grow">
                        {post.excerpt || "No excerpt available"}
                      </p>
                      <div className="mt-auto">
                        <Button
                          asChild
                          variant="link"
                          className="text-[#CC4824] hover:text-[#e05c3a] p-0 h-auto font-medium group/link"
                        >
                          <Link href={`/blog/${post.slug}`} className="flex items-center">
                            Read article
                            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl text-[#4A4A4A] mb-4">No articles yet!</h2>
              <p className="text-[#4A4A4A]/80">Check back soon for updates.</p>
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Unexpected error in BlogIndexPage:", error instanceof Error ? error.message : error)
    return <div>Unexpected error loading blog posts. Check server logs.</div>
  }
}

