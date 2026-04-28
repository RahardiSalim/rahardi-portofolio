/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  experimental: {
    outputFileTracingIncludes: {
      '/api/media/**': ['./content/**/*'],
    },
    outputFileTracingExcludes: {
      '*': [
        '.git/**',
        '.next/cache/**',
        'node_modules/@swc/**',
        'node_modules/webpack/**',
      ],
    },
  },
}

module.exports = nextConfig
