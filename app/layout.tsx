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
  title: "HanBerry Beauty",
  description: "Be your own kind of beauty",
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
  ]
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
