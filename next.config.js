/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i3.ytimg.com'],
  },
}

module.exports = nextConfig
