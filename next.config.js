const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  compiler: {
    reactRemoveProperties: isProd && {
      properties: ['^data-test'],
    },
    removeConsole: isProd && {
      exclude: ['error'],
    },
    styledComponents: true,
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
};

module.exports = nextConfig
