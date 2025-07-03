import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase-server'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published_at: string | null
  featured_image?: string | null
  tags?: string[] | null
  is_featured?: boolean | null
}

export async function FeaturedBlog() {
  try {
    const supabase = createClient()

    const { data: featuredPosts, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, featured_image, tags')
      .eq('is_featured', true)
      .not('tags', 'cs', '{"archive"}') // Exclude posts with "archive" tag
      .order('published_at', { ascending: false })
      .limit(4)

    if (error) {
      console.error('Error fetching featured blog posts:', error)
      return null
    }

    if (!featuredPosts || featuredPosts.length === 0) {
      return null
    }

    return (
      <section id="featured-blog" className="bg-[#FFF8EB] py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <BookOpen className="h-6 w-6 text-[#CC4824]" />
            <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4A4A]">Featured Insights</h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredPosts.map(post => (
              <article key={post.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col group">
                {post.featured_image && (
                  <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
                    <div className="relative w-full aspect-[4/5]">
                      <Image
                        src={post.featured_image}
                        alt={post.title || 'Blog post image'}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                )}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-[#4A4A4A] mb-2 line-clamp-2 group-hover:text-[#CC4824] transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  {post.excerpt && (
                    <p className="text-base text-gray-700 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-[#fff0d4] text-[#CC4824] text-sm font-medium rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <Button
                    asChild
                    variant="link"
                    className="text-[#CC4824] p-0 h-auto self-start hover:text-[#317039]"
                  >
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center">
                      Read article
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild className="bg-[#CC4824] hover:bg-[#e05c3a] text-white">
              <Link href="/blog" className="flex items-center">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.error('Unexpected error in FeaturedBlog:', error)
    return null
  }
}
