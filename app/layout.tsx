import type { Metadata } from "next";

import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import {
  salvager,
  cormorant,
  worksans,
  notoSerif,
  notoSans
} from "../lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL('https://hanberry.minab.et'),
  title: {
    default: 'Hanberry Beauty',
    template: '%s | Hamneal Nebiyu Makeup',
  },
  description: "Professional makeup services for bridal, editorial, and special events in Addis Ababa, Ethiopia. View portfolio and book packages.",
  applicationName: 'Hanberry Beauty',
  keywords: [
    "makeup",
    "beauty",
    "Ethiopian makeup artist",
    "Ethiopian",
    "artist",
    "creative",
    "professional",
    "bridal makeup",
    "natural makeup",
    "glamorous makeup",
    "cultural makeup",
    "editorial makeup",
    "makeup styles",
    "makeup gallery",
    "makeup portfolio",
    "makeup services",
    "makeup looks",
    "makeup trends",
    "makeup inspiration",
    "makeup artistry",
    "makeup transformation",
    "addis ababa makeup",
    "ethiopia makeup",
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale:'en_US',
    url: '/',
    siteName: 'Hanberry Makeup',
    description: "Professional makeup services for bridal, editorial, and special events in Addis Ababa, Ethiopia. View portfolio and book packages.",
    images: [{
      url: '/images/HanBerry BEAUTY.png',
      width: 1200,
      height: 630,
      alt: 'Hanberry Makeup - Professional Makeup Artist in Addis Ababa, Ethiopia',
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hanberry Beauty | Hamneal Nebiyu',
    description: 'Professional makeup artistry in Addis Ababa, Ethiopia.',
    images: ['/images/HanBerry BEAUTY.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${salvager.variable} ${cormorant.variable} ${worksans.variable} ${notoSerif.variable} ${notoSans.variable}`}
    >
      <body
        className="antialiased bg-[#FAF6F0]"
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
