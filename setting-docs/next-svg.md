# ✅ 6. Next.js SVG Setting

- `svg`파일을 import 하기 위해서는 설정이 필요하다.

```shell
yarn add @svgr/webpack
```

- `next.config.js` setting

```javascript
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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig
```
