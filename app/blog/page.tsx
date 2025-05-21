import { createClient } from "@/lib/supabase-server"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, TrendingUp, Bookmark } from "lucide-react"
import { format } from "date-fns"
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
  card_icon?: string | null
  tags?: string[] | null
  is_featured?: boolean | null
}

// Type for the objects returned by the allTags query
interface TagPost {
  tags: string[] | null;
}

export default async function BlogIndexPage() {
  try {
    const supabase = await createClient()

    // Fetching only regular posts now, up to a reasonable limit for an index page
    const [{ data: postsData, error: postsError }, { data: allTagsData, error: tagsError }] = await Promise.all([
      supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, published_at, featured_image, card_icon, tags")
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
      <div className="min-h-screen bg-[#4A4A4A]">
        {/* Featured Article Hero Banner REMOVED */}

        <div className="container mx-auto px-4 py-12"> {/* Added py-12 for overall padding */}
          {/* Topics/Tags Filter Bar REMOVED */}

          {/* Simplified Posts Grid Section */}
          {posts.length > 0 ? (
            <section className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="h-5 w-5 text-[#CC4824]" />
                <h2 className="text-2xl font-bold text-[#FFF8EB]">All Articles</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-100 h-full flex flex-col bg-[#FFF1D4]"
                  >
                    {post.card_icon && (
                      <div className="relative h-32 w-full flex items-center justify-center p-4 bg-[#FFF8EB]">
                        <Image
                          src={post.card_icon}
                          alt={`${post.title} icon`}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                    )}
                    
                    <CardContent className="p-6 flex-grow">
                      <div className="flex items-center gap-4 text-xs text-[#4A4A4A]/70 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{post.published_at ? format(new Date(post.published_at), "MMM d, yyyy") : "N/A"}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-[#4A4A4A] line-clamp-2">{post.title}</h3>
                      <p className="text-[#4A4A4A]/80 text-sm line-clamp-3 mb-4">
                        {post.excerpt || "No excerpt available"}
                      </p>
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
            </section>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-[#FFF8EB] mb-4">No articles yet!</h2>
              <p className="text-[#FFF8EB]/80">Check back soon for updates.</p>
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

