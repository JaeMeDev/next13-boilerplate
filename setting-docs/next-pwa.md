# ✅ 7. Next.js PWA Setting

-install(`next-pwa` 공식 라이브러리가 `appDir` 지원안함. `@ducanh2912`라는 사람이 되게끔 수정해놓음.)

```shell
yarn add -D @ducanh2912/next-pwa
```

- `next.config.js` setting

```javascript
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/_buildManifest\.js$/],
});

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = withPWA({
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
});

module.exports = nextConfig
```

- `manifast.json` 만들기(테스트 아이콘으로 만들어준다.)

```json
{
  "name": "My App",
  "short_name": "My App",
  "description": "app description",
  "start_url": "/",
  "scope": "/",
  "background_color": "#000000",
  "orientation": "portrait",
  "display": "standalone",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icons/icon_192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon_512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/icons/maskable_icon_192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icons/maskable_icon_512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

- layout 적용

```tsx
import { ReactNode } from "react";
import { Metadata } from "next";
import Provider from "@/components/provider";

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  applicationName: 'My App',
  title: 'My App',
  description: 'My App Description',
  manifest: '/manifest.json',
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    title: 'My App',
    statusBarStyle: 'default',
  },
  icons: {
    shortcut: '/favicon.ico',
    apple: '/icons/maskable_icon_512.png',
  },
  openGraph: {
    title: 'My App',
    description: 'My App Description',
    url: 'http://localhost:3000',
    siteName: 'My App',
    images: '/images/thumbnail.png',
    type: 'website',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
```

- gitignore 설정

```gitignore
# pwa
public/*.js
public/*.map
```
