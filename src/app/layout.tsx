import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Providers from "./providers";
import { SITE_NAME, SITE_TAGLINE, SITE_URL, CONTACT_EMAIL, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Play 23 free daily football trivia games, guess lineups, solve puzzles, play Wordle, Grid & Connections. Premier League, La Liga & World Cup, new daily.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  keywords: [
    "football trivia",
    "football games",
    "soccer quiz",
    "daily football puzzle",
    "football wordle",
    "football grid",
    "guess the footballer",
    "World Cup trivia",
    "Premier League quiz",
    "football connections",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: `${SITE_URL}/`,
    title: `${SITE_NAME} - Daily Football Trivia Games & Puzzles`,
    description:
      "23 free daily football games. Guess lineups, solve puzzles, play Wordle & more. New challenges every day at midnight.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Daily Football Trivia Games`,
    description: "23 free daily football games. Guess lineups, solve puzzles, play Wordle & more.",
    images: ["/og-image.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
  verification: { google: "suOg_EZE-3IE9H0Exjy19Iv3DfeCgqOb6y05czA6I-A" },
  other: { "google-adsense-account": "ca-pub-6293286506315578" },
};

export const viewport: Viewport = {
  themeColor: "#15803d",
};

const siteJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: "en",
    description:
      "Daily football trivia games and puzzles. 23 unique games covering World Cup, Premier League, La Liga, Champions League and more.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    description: "Daily football trivia games, puzzles and word challenges.",
    email: CONTACT_EMAIL,
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* RSS feed with all games and pages. */}
        <link rel="alternate" type="application/rss+xml" title="Futbol11 Feed" href="/feed.xml" />
        {/* Google Fonts (moved here from a CSS @import so it does not block rendering). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Russo+One&family=Inter:wght@400;500;600;700&display=swap"
        />
        {/* Google Consent Mode v2: deny ad/analytics storage until the user accepts (see CookieConsent). */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});`}
        </Script>
        {/* Google AdSense */}
        <Script
          id="adsense"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9266386915530434"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className="font-body">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
