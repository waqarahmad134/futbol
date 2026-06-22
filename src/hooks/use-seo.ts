import { useEffect } from "react";
import { SITE_URL } from "@/lib/site";

type JsonLd = Record<string, unknown>;

interface SeoOptions {
  title: string;
  description: string;
  /** Path used for canonical + og:url, e.g. "/game/futbol11-wordle". Defaults to current pathname. */
  path?: string;
  /** Structured data injected as a single application/ld+json block. */
  jsonLd?: JsonLd | JsonLd[];
  /** When true, mark the page noindex (e.g. 404). */
  noIndex?: boolean;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const JSONLD_ID = "route-jsonld";

// Keeps document head metadata in sync with the active route. This matters for
// a client-rendered SPA: search engines and crawlers read per-route titles,
// descriptions, canonicals and structured data rather than only index.html.
export function useSeo({ title, description, path, jsonLd, noIndex }: SeoOptions) {
  const ld = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    const url = `${SITE_URL}${path ?? window.location.pathname}`;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertCanonical(url);

    if (noIndex) {
      upsertMeta("name", "robots", "noindex, follow");
    } else {
      document.head.querySelector('meta[name="robots"]')?.remove();
    }

    const existing = document.getElementById(JSONLD_ID);
    if (ld) {
      const script = (existing as HTMLScriptElement) ?? document.createElement("script");
      script.id = JSONLD_ID;
      script.type = "application/ld+json";
      script.textContent = ld;
      if (!existing) document.head.appendChild(script);
    } else if (existing) {
      existing.remove();
    }
  }, [title, description, path, ld, noIndex]);
}
