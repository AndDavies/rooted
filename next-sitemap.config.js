/** @type {import('next-sitemap').IConfig} */
const path = require('path');

module.exports = {
  siteUrl: 'https://www.rootedexecutiveretreats.com',
  generateRobotsTxt: true, // Option to generate a robots.txt file
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      // Add any disallow rules if needed, e.g.:
      // { userAgent: '*', disallow: '/admin' },
    ],
    // You can add a sitemap URL to robots.txt, it will be automatically added if generateRobotsTxt is true
    // additionalSitemaps: [
    //   'https://www.rootedexecutiveretreats.com/my-custom-sitemap.xml',
    // ],
  },
  // Default configurations for paths
  // exclude: ['/server-sitemap.xml'], // We will generate all in one go for now
  // Default priority and changefreq can be set here if needed
  // priority: 0.7,
  // changefreq: 'daily',

  // Function to generate dynamic paths, e.g., for blog posts
  transform: async (config, path) => {
    // Default transform for static paths
    const entry = {
      loc: path,
      changefreq: config.changefreq, // Use default changefreq
      priority: config.priority,   // Use default priority
      lastmod: new Date().toISOString(), // Default lastmod
      alternateRefs: config.alternateRefs ?? [],
    };

    // You can add custom logic for specific paths here if needed
    // For example, different priority or changefreq for /blog
    if (path === '/') {
      entry.priority = 1.0;
      entry.changefreq = 'monthly';
    }
    if (path === '/blog') {
      entry.priority = 0.8;
      entry.changefreq = 'weekly';
    }

    return entry;
  },

  // This function is used to fetch additional paths from remote sources (like your Supabase DB)
  // It's more robust for App Router as it doesn't rely on crawling generated pages
  additionalPaths: async (config) => {
    let createClientSupabase;
    try {
      // Require from the explicitly compiled location
      // The path will be lib_compiled/lib/supabase-server.js relative to project root
      createClientSupabase = require(path.join(process.cwd(), 'lib_compiled', 'lib', 'supabase-server.js')).createClient;
      console.log('[next-sitemap] Successfully required supabase client from ./lib_compiled/lib/supabase-server.js');
    } catch (e) {
      console.error('[next-sitemap] Failed to require supabase client from ./lib_compiled/lib/supabase-server.js:', e);
      return []; // Return empty if client cannot be loaded
    }

    const supabase = createClientSupabase(); 
    let results = [];

    if (supabase) {
      try {
        console.log('[next-sitemap] Attempting to fetch blog posts from Supabase...');
        const { data: posts, error } = await supabase
          .from('blog_posts')
          .select('slug, updated_at, published_at')
          .order('published_at', { ascending: false });

        if (error) {
          console.error('[next-sitemap] Error fetching blog posts from Supabase:', error.message);
          // Log the underlying error object if it exists and has more details
          if (error.details) console.error('[next-sitemap] Supabase error details:', error.details);
          if (error.hint) console.error('[next-sitemap] Supabase error hint:', error.hint);
          throw error; 
        }

        if (posts) {
          console.log(`[next-sitemap] Successfully fetched ${posts.length} blog posts.`);
          results = posts.map(post => ({
            loc: `/blog/${post.slug}`,
            lastmod: post.updated_at ? new Date(post.updated_at).toISOString() : (post.published_at ? new Date(post.published_at).toISOString() : new Date().toISOString()),
            changefreq: 'weekly',
            priority: 0.7,
          }));
        }
      } catch (e) {
        console.error('[next-sitemap] Exception during Supabase query for blog posts:', e);
      }
    } else {
      console.error('[next-sitemap] Supabase client was not available for fetching posts.');
    }
    return results;
  },
}; 