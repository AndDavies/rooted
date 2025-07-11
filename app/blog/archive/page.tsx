import Image from "next/image"
import Link from "next/link"
import type { Metadata } from 'next'
import { format } from "date-fns"
import { ArrowRight, Calendar, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase-server"
import { NewsletterSignupBanner } from "@/components/NewsletterSignupBanner"

interface ArchivePost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published_at: string | null
  featured_image?: string | null
  tags?: string[] | null
}

// Metadata for the archive index page
export const metadata: Metadata = {
  title: "Newsletter Archive | The ROOTED Way",
  description: "Explore our complete archive of newsletters featuring insights on leadership, wellbeing, and personal growth from The ROOTED Way.",
  alternates: {
    canonical: 'https://www.therootedway.co/blog/archive',
  },
  openGraph: {
    title: "Newsletter Archive | The ROOTED Way",
    description: "Explore our complete archive of newsletters featuring insights on leadership, wellbeing, and personal growth from The ROOTED Way.",
    url: 'https://www.therootedway.co/blog/archive',
    siteName: "The ROOTED Way",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Newsletter Archive | The ROOTED Way",
    description: "Explore our complete archive of newsletters featuring insights on leadership, wellbeing, and personal growth from The ROOTED Way.",
  },
};

export default async function ArchiveIndexPage() {
  try {
    const supabase = await createClient()

    // Fetch all posts with "archive" tag, ordered by published date (newest first)
    const { data: archivePosts, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, published_at, featured_image, tags")
      .contains("tags", ["archive"]) // Filter for posts with "archive" tag
      .order("published_at", { ascending: false })

    if (error) {
      console.error("Error fetching archive posts:", error)
      return <div>Error loading newsletter archive. Check server logs for details.</div>
    }

    const posts: ArchivePost[] = archivePosts || []

    return (
      <div className="min-h-screen bg-[#fff0d4]">
        {/* Header Section */}
        <header className="bg-[#4A4A4A] py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Mail className="h-8 w-8 text-[#F1BE49]" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#FFF8EB]">
                Newsletter Archive
              </h1>
            </div>
            <p className="text-lg md:text-xl text-[#FFF8EB]/90 font-body max-w-2xl mx-auto">
              Explore our complete collection of newsletters featuring weekly insights on leadership, wellbeing, and personal growth.
            </p>
          </div>
        </header>



        {/* Archive Content */}
        <div className="container mx-auto px-4 pt-10 pb-12 md:pb-16 lg:pb-20">
          {/* Breadcrumb */}
          <nav className="mb-8 text-base">
            <ol className="flex items-center space-x-2 text-[#4A4A4A]/70">
              <li><Link href="/" className="hover:text-[#CC4824]">Home</Link></li>
              <li>/</li>
              <li><Link href="/blog" className="hover:text-[#CC4824]">Blog</Link></li>
              <li>/</li>
              <li className="text-[#CC4824]">Newsletter Archive</li>
            </ol>
          </nav>

          {posts.length > 0 ? (
            <section>
              <div className="flex items-center gap-3 mb-8 md:mb-10">
                <Mail className="h-5 w-5 text-[#CC4824]" />
                <h2 className="text-2xl md:text-3xl text-[#4A4A4A]">
                  All Newsletters ({posts.length})
                </h2>
              </div>

              {/* Archive Grid */}
              <div className="grid gap-6 md:gap-8">
                {posts.map((post) => (
                  <article 
                    key={post.id} 
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="md:flex">
                      {/* Featured Image */}
                      {post.featured_image && (
                        <div className="md:w-1/3 h-48 md:h-auto relative">
                          <Link href={`/blog/archive/${post.slug}`} className="block w-full h-full">
                            <Image
                              src={post.featured_image}
                              alt={post.title || "Newsletter image"}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </Link>
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className={`p-6 md:p-8 flex flex-col justify-between ${post.featured_image ? 'md:w-2/3' : 'w-full'}`}>
                        <div>
                          {/* Date */}
                          {post.published_at && (
                            <div className="flex items-center text-base text-[#4A4A4A]/60 mb-3">
                              <Calendar className="h-4 w-4 mr-2" />
                              <time dateTime={post.published_at}>
                                {format(new Date(post.published_at), "MMMM d, yyyy")}
                              </time>
                            </div>
                          )}
                          
                          {/* Title */}
                          <h3 className="text-xl md:text-2xl mb-3 text-[#4A4A4A] hover:text-[#CC4824] transition-colors">
                            <Link href={`/blog/archive/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h3>
                          
                          {/* Excerpt */}
                          {post.excerpt && (
                            <p className="text-[#4A4A4A]/80 text-base line-clamp-3 mb-4">
                              {post.excerpt}
                            </p>
                          )}
                        </div>
                        
                        {/* Read More Button */}
                        <div className="mt-auto">
                          <Button
                            asChild
                            variant="link"
                            className="text-[#CC4824] hover:text-[#e05c3a] p-0 h-auto font-medium group"
                          >
                            <Link href={`/blog/archive/${post.slug}`} className="flex items-center">
                              Read Newsletter
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : (
            <div className="text-center py-12">
              <Mail className="h-16 w-16 text-[#4A4A4A]/40 mx-auto mb-4" />
              <h2 className="text-2xl text-[#4A4A4A] mb-4">No newsletters yet!</h2>
              <p className="text-[#4A4A4A]/80">Check back soon for our latest newsletter content.</p>
            </div>
          )}
        </div>
        
        {/* Newsletter Signup Banner */}
        <div className="container mx-auto px-4 pt-6 md:pt-8">
          <NewsletterSignupBanner />
        </div>

      </div>
    )
  } catch (error) {
    console.error("Unexpected error in ArchiveIndexPage:", error)
    return <div>Unexpected error loading newsletter archive. Check server logs.</div>
  }
}
