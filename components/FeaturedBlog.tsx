import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase-server'
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion'
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

    // Query for featured blog posts
    const { data: featuredPosts, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, published_at, featured_image, tags')
      .eq('is_featured', true)
      .order('published_at', { ascending: false })
      .limit(4) // Limit to 4 featured articles

    if (error) {
      console.error('Error fetching featured blog posts:', error)
      return null
    }

    if (!featuredPosts || featuredPosts.length === 0) {
      return null
    }

    return (
      <section id="featured-blog" className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <BookOpen className="h-6 w-6 text-[#CC4824]" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#4A4A4A]">
              Featured Insights
            </h2>
          </div>

          <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
            {featuredPosts.map((post, index) => (
              <AccordionItem 
                key={post.id} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <div className="flex items-start gap-4 w-full text-left">
                    {post.featured_image && (
                      <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={post.featured_image}
                          alt={post.title || "Blog post image"}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 64px, 80px"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-semibold text-[#4A4A4A] group-hover:text-[#CC4824] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {post.excerpt || "Read this featured article"}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-6 pb-6">
                  <div className="pt-4 border-t border-gray-100">
                    <div className="grid md:grid-cols-2 gap-6 items-start">
                      {post.featured_image && (
                        <div className="relative w-full h-48 md:h-56 rounded-lg overflow-hidden">
                          <Image
                            src={post.featured_image}
                            alt={post.title || "Blog post image"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      )}
                      
                      <div className={`space-y-4 ${!post.featured_image ? 'md:col-span-2' : ''}`}>
                        {post.excerpt && (
                          <p className="text-gray-700 leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                              <span 
                                key={tagIndex}
                                className="px-3 py-1 bg-[#fff0d4] text-[#CC4824] text-xs font-medium rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="pt-2">
                          <Button
                            asChild
                            className="bg-[#CC4824] hover:bg-[#e05c3a] text-white"
                          >
                            <Link href={`/blog/${post.slug}`} className="flex items-center">
                              Read Full Article
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="border-[#CC4824] text-[#CC4824] hover:bg-[#CC4824] hover:text-white"
            >
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
