/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/samplerechacks',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/samplerechacks/',
}

module.exports = nextConfig