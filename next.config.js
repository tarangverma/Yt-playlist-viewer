/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
 },
  images: {
    domains: ['i.ytimg.com', 'lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig