import localFont from "next/font/local";

// 1. BRANDING FONT
export const salvager = localFont({
  src: "../public/fonts/SALVAGER.ttf",
  variable: "--font-salvager",
  display: "swap",
});

// 2. ENGLISH HEADING FONT
export const cormorant = localFont({
  src: "../public/fonts/CormorantGaramond-Regular.ttf",
  variable: "--font-cormorant",
  weight: "400",
  display: "swap",
});

// 3. ENGLISH BODY FONT
export const worksans = localFont({
  src: "../public/fonts/WorkSans-Regular.ttf",
  variable: "--font-worksans",
  weight: "400",
  display: "swap",
});

// 4. AMHARIC HEADING FONT
export const notoSerif = localFont({
  src: "../public/fonts/NotoSerifEthiopic-Regular.ttf",
  variable: "--font-noto-serif",
  weight: "400",
  display: "swap",
});

// 5. AMHARIC BODY FONT
export const notoSans = localFont({
  src: "../public/fonts/NotoSansEthiopic-Regular.ttf",
  variable: "--font-noto-sans",
  weight: "400",
  display: "swap",
});