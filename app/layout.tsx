import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BeKnown",
  description:
    "BeKnown turns your AI conversation history into a verified professional profile. Your ChatGPT, Claude, or Gemini becomes your witness. Free, instant, honest.",
  metadataBase: new URL("https://beknown.no-humans.app"),
  alternates: {
    canonical: "https://beknown.no-humans.app",
    languages: {
      en: "https://beknown.no-humans.app",
      es: "https://beknown.no-humans.app/es",
      de: "https://beknown.no-humans.app/de",
      fr: "https://beknown.no-humans.app/fr",
      pt: "https://beknown.no-humans.app/pt",
      ja: "https://beknown.no-humans.app/ja",
    },
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: "BeKnown",
    description:
      "BeKnown turns your AI conversation history into a verified professional profile. Your ChatGPT, Claude, or Gemini becomes your witness. Free, instant, honest.",
    url: "https://beknown.no-humans.app",
    siteName: "BeKnown",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BeKnown",
    description:
      "BeKnown turns your AI conversation history into a verified professional profile. Your ChatGPT, Claude, or Gemini becomes your witness. Free, instant, honest.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "BeKnown",
    url: "https://beknown.no-humans.app",
    description:
      "BeKnown turns your AI conversation history into a verified professional profile. Your ChatGPT, Claude, or Gemini becomes your witness.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="BeKnown Blog"
          href="/feed.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0A0A0B] text-[#F5F5F5]">
        {children}
        <GoogleAnalytics gaId="G-XHZ6T0YRK0" />
      </body>
    </html>
  );
}
