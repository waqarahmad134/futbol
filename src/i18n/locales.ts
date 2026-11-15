// Locale routing helpers for futbol11.live.
// English is the default locale and keeps its URLs exactly as they are
// (no /en prefix). Portuguese (Brazil), Spanish and French live under
// /pt/, /es/ and /fr/ with the same English-friendly slugs underneath.

export const LOCALES = ["en", "pt", "es", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  pt: "Português",
  es: "Español",
  fr: "Français",
};

// Short label used by the language switcher.
export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  pt: "PT",
  es: "ES",
  fr: "FR",
};

export const LOCALE_PREFIX: Record<Locale, string> = {
  en: "",
  pt: "/pt",
  es: "/es",
  fr: "/fr",
};

// hreflang value per locale. Portuguese targets Brazil (the biggest
// football audience for this site); Spanish and French use the generic code.
export const LOCALE_HREFLANG: Record<Locale, string> = {
  en: "en",
  pt: "pt-BR",
  es: "es",
  fr: "fr",
};

// <html lang> value per locale.
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  en: "en",
  pt: "pt-BR",
  es: "es",
  fr: "fr",
};

// Open Graph locale per locale.
export const LOCALE_OG: Record<Locale, string> = {
  en: "en_US",
  pt: "pt_BR",
  es: "es_ES",
  fr: "fr_FR",
};

export const BASE_URL = "https://futbol11.live";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

// Locale of a URL path, from its first segment. "/" and any path without
// a locale prefix are English.
export function getLocaleFromPath(pathname: string): Locale {
  const first = pathname.replace(/^\/+/, "").split("/")[0];
  return isLocale(first) ? (first as Locale) : "en";
}

// Remove a leading /pt, /es or /fr segment. "/pt/about" -> "/about".
export function stripLocalePrefix(pathname: string): string {
  const match = pathname.match(/^\/(pt|es|fr)(\/.*)?$/);
  if (!match) return pathname;
  return match[2] ? match[2] : "/";
}

// English path -> path in the given locale. The English-friendly slugs
// are kept unchanged under the locale prefix.
export function localizePath(pathname: string, locale: Locale): string {
  const enPath = stripLocalePrefix(pathname);
  if (locale === "en") return enPath;
  if (enPath === "/") return LOCALE_PREFIX[locale];
  return `${LOCALE_PREFIX[locale]}${enPath}`;
}

// Full URL of a path in a locale (for canonical + hreflang). Page URLs
// use a trailing slash, matching the site's canonical style.
export function localizedUrl(pathname: string, locale: Locale): string {
  const path = localizePath(pathname, locale);
  const withSlash = path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`;
  return `${BASE_URL}${withSlash}`;
}

// hreflang alternates for an English path: en, pt-BR, es, fr and
// x-default (English). Pass the English path, e.g. "/about" or
// "/game/futbol-grid".
export function hreflangAlternates(enPath: string): Record<string, string> {
  const out: Record<string, string> = {};
  out["en"] = localizedUrl(enPath, "en");
  out["x-default"] = localizedUrl(enPath, "en");
  for (const locale of ["pt", "es", "fr"] as const) {
    out[LOCALE_HREFLANG[locale]] = localizedUrl(enPath, locale);
  }
  return out;
}

// Paths that have a translated version. Blog article bodies stay English
// (only the blog listing page is translated); API routes stay English.
export function hasTranslation(pathname: string): boolean {
  const enPath = stripLocalePrefix(pathname);
  if (enPath === "/") return true;
  if (enPath === "/blog" || enPath === "/blog/") return true;
  if (enPath.startsWith("/blog/")) return false;
  if (enPath.startsWith("/api")) return false;
  return true;
}

// Where the language switcher should point for a given page + locale:
// the same page when it is translated, otherwise the locale homepage
// (or the locale blog listing for article pages).
export function switcherHref(pathname: string, locale: Locale): string {
  const enPath = stripLocalePrefix(pathname);
  if (locale === "en") return enPath;
  if (!hasTranslation(pathname)) {
    if (enPath.startsWith("/blog/")) return `${LOCALE_PREFIX[locale]}/blog`;
    return LOCALE_PREFIX[locale];
  }
  return localizePath(pathname, locale);
}
