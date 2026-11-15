import type { MetadataRoute } from "next";
import { games } from "@/data/games";
import { BLOG_POSTS } from "@/data/blog";
import { SITE_URL } from "@/lib/site";
import { hreflangAlternates, localizedUrl, type Locale } from "@/i18n/locales";

// Dynamic sitemap: every translated page in all four locales, with
// hreflang alternates on each entry. Blog article bodies stay English,
// so articles appear only in the English set. The English lastmod keeps
// the previous sitemap date (2026-11-09); locale pages are new.
const EN_LASTMOD = new Date("2026-11-09");
const LOCALE_LASTMOD = new Date("2026-11-15");

const CORE_PATHS = ["/", "/about/", "/privacy-policy/", "/terms/", "/contact/", "/blog/"];

function entry(enPath: string, locale: Locale, lastmod: Date): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};
  for (const [lang, url] of Object.entries(hreflangAlternates(enPath.replace(/\/$/, "") || "/"))) {
    languages[lang] = url;
  }
  return {
    url: localizedUrl(enPath.replace(/\/$/, "") || "/", locale),
    lastModified: lastmod,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];

  // Core pages + blog listing, all locales.
  for (const path of CORE_PATHS) {
    const clean = path === "/" ? "/" : path.replace(/\/$/, "");
    out.push(entry(clean, "en", EN_LASTMOD));
    for (const locale of ["pt", "es", "fr"] as const) {
      out.push(entry(clean, locale, LOCALE_LASTMOD));
    }
  }

  // Game pages, all locales (slugs stay English under the locale prefix).
  for (const game of games) {
    const path = `/game/${game.slug}`;
    out.push(entry(path, "en", EN_LASTMOD));
    for (const locale of ["pt", "es", "fr"] as const) {
      out.push(entry(path, locale, LOCALE_LASTMOD));
    }
  }

  // Blog articles, English only.
  for (const post of BLOG_POSTS) {
    out.push({
      url: `${SITE_URL}/blog/${post.slug}/`,
      lastModified: new Date(post.date),
    });
  }

  return out;
}

// Keep the sitemap fresh without a rebuild on every visit.
export const revalidate = 86400;
