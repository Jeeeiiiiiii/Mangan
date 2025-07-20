/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // Ensure CSS is properly processed
  webpack: (config) => {
    return config;
  },
}

module.exports = nextConfig