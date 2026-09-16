import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

import { Providers } from "@/components/providers";
import { FAQS, SEO_KEYWORDS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/const";

import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: Array.from(SEO_KEYWORDS),
  authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.creator,
  publisher: SITE_CONFIG.publisher,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_CONFIG.canonicalUrl,
    languages: {
      en: "https://relaxend.com",
      es: "https://relaxend.com/es",
      pt: "https://relaxend.com/pt",
      it: "https://relaxend.com/it",
      de: "https://relaxend.com/de",
      fr: "https://relaxend.com/fr",
      hi: "https://relaxend.com/hi",
      id: "https://relaxend.com/id",
      pl: "https://relaxend.com/pl",
      ja: "https://relaxend.com/ja",
      nl: "https://relaxend.com/nl",
      "x-default": "https://relaxend.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.canonicalUrl,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_CONFIG.twitterHandle,
    creator: SITE_CONFIG.twitterHandle,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    inLanguage: "en",
    description: SITE_CONFIG.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    sameAs: SOCIAL_LINKS.map((s) => s.url),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "RelaxEnd Noise Generator",
    url: SITE_CONFIG.canonicalUrl,
    inLanguage: "en",
    description: SITE_CONFIG.description,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All (iOS, Android, macOS, Windows, Linux, Web Browsers)",
    browserRequirements: "Requires Web Audio API support (Modern Chrome, Safari, Firefox, Edge)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "Real-time procedural Web Audio synthesis (No loops)",
      "7 Acoustic Noise Colors: White, Pink, Brown, Green, Grey, Blue, Violet",
      "Studio 10-band graphic equalizer (31 Hz to 16 kHz)",
      "Circadian sleep timer with exponential fade-out & chimes",
      "Offline playback support & zero audio advertisements",
      "Open-source Web Audio noise engine on GitHub",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
