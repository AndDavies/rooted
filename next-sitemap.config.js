/** @type {import('next-sitemap').IConfig} */
const { createClient } = require("@supabase/supabase-js");

// Supabase client setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Error: Missing Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY) for next-sitemap."
  );
  // Potentially throw an error or return a default config if Supabase is critical for sitemap generation
}

// Initialize Supabase client only if URL and Key are present
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

module.exports = {
  siteUrl: "https://www.rootedexecutiveretreats.com",
  generateRobotsTxt: true,
  sitemapSize: 7000, // Default is 50000, can be adjusted
  exclude: ["/admin/*", "/dashboard/*"], // Example exclusions, adjust as needed

  // Fetch dynamic blog post routes from Supabase
  additionalPaths: async (config) => {
    if (!supabase) {
      console.warn("Supabase client not initialized. Skipping dynamic path generation for sitemap.");
      return [];
    }

    try {
      const { data: posts, error: postsError } = await supabase
        .from("posts") // Assuming your blog posts table is named 'posts'
        .select("slug, updated_at"); // Select slug and updated_at for lastmod

      if (postsError) {
        console.error("Error fetching blog posts for sitemap:", postsError.message);
        return []; // Return empty or default paths on error
      }

      if (!posts) {
        console.log("No blog posts found for sitemap.");
        return [];
      }

      console.log(`Fetched ${posts.length} blog posts for sitemap.`);

      const blogPaths = posts.map((post) => ({
        loc: `/blog/${post.slug}`,
        lastmod: post.updated_at ? new Date(post.updated_at).toISOString() : new Date().toISOString(),
        changefreq: "weekly",
        priority: 0.7, // Adjust priority as needed
      }));

      // Add other static paths if necessary, ensure they are not duplicated by Next.js's default sitemap generation
      const staticPaths = [
        // { loc: "/", lastmod: new Date().toISOString(), changefreq: "daily", priority: 1.0 },
        // { loc: "/blog", lastmod: new Date().toISOString(), changefreq: "weekly", priority: 0.8 },
        // Add other important static pages here if not automatically covered
      ];
      // Note: Next.js 13+ with app router automatically generates sitemaps for static routes if you have an app/sitemap.xml.js or app/sitemap.ts
      // `next-sitemap` might be primarily for adding dynamic paths or if you prefer its configuration.
      // If you have static routes defined in `app/`, they might be covered automatically.
      // The paths returned here are *additional* to what Next.js might generate.

      return [...staticPaths, ...blogPaths];
    } catch (error) {
      console.error("Error in additionalPaths for sitemap:", error);
      return []; // Return empty or default paths on error
    }
  },

  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      // Add specific disallow rules if needed
      // { userAgent: "*", disallow: ["/admin/*", "/dashboard/*"] },
    ],
    // additionalSitemaps: [
    //   'https://www.rootedexecutiveretreats.com/server-sitemap.xml', // if you have a server-side sitemap
    // ],
  },
}; 