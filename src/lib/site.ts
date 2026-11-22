// Central site configuration used for SEO, canonical URLs, sitemap and contact.
export const SITE_URL = "https://futbol11.live";
export const SITE_NAME = "Futbol11";
export const SITE_TAGLINE = "Daily Football Trivia Games, Puzzles & Wordle";
export const CONTACT_EMAIL = "contact@futbol11.live";
// Shared Open Graph image (public/og-image.webp, 1200x630).
// Child pages must include it in their own openGraph/twitter blocks:
// Next.js does not inherit the parent's OG image once a child defines openGraph.
export const OG_IMAGE = {
  url: "/og-image.webp",
  width: 1200,
  height: 630,
  alt: "Futbol11 - daily football trivia games and puzzles",
};
