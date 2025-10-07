import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Redirect old /web URLs to new structure
  async redirects() {
    return [
      {
        source: '/web/:path*',
        destination: '/it/:path*',
        permanent: true,
      },
      // Redirect old URLs without /web to new structure with locale
      {
        source: '/:path((?!it|en|_next|api|images|json).*)',
        destination: '/it/:path*',
        permanent: false,
      },
    ];
  },
  // Keep your webpack config
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpack: (config: any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
};

module.exports = withNextIntl(nextConfig);