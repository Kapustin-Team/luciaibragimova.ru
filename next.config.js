/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'luciastrapi.kpstn.ru' },
      { protocol: 'https', hostname: 'cdn.kpstn.ru' },
      { protocol: 'https', hostname: 's3.kpstn.ru' },
    ],
  },
}

module.exports = nextConfig
