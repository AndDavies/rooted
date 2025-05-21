/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'txlrpvmrvmxniulfcqfu.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/images/**', // Be more specific if all your blog images are in a subfolder
      },
    ],
  },
}

export default nextConfig
