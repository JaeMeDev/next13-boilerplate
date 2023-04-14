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
