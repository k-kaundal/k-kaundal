/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kaundal.vip',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'https://kaundal.vip/graphql',
      },
    ];
  },
};

module.exports = nextConfig;