// Post-build prerender: bake per-route <head> metadata + JSON-LD into static
// HTML for every known route. The SPA still hydrates normally; this only adds
// crawler/social-scraper-visible head tags so non-JS clients no longer see the
// generic home metadata on every URL.
//
// Run automatically after `vite build` (see package.json "build" script).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const SITE = "https://futbol11.live";
const PUBLISHER = { "@type": "Organization", name: "Futbol11", url: `${SITE}/` };

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// --- Parse data files (single source of truth) ------------------------------
const gamesSrc = readFileSync(join(ROOT, "src/data/games.ts"), "utf8");
const faqsSrc = readFileSync(join(ROOT, "src/data/faqs.ts"), "utf8");

const games = [];
const re = /title:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*description:\s*"([^"]+)"/g;
let m;
while ((m = re.exec(gamesSrc))) {
  const [, title, slug, description] = m;
  const longMatch = gamesSrc.match(
    new RegExp(`slug: "${slug.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}",[\\s\\S]*?longDescription: "([^"]+)"`),
  );
  const catMatch = gamesSrc.match(
    new RegExp(`slug: "${slug.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}",[\\s\\S]*?category: "([^"]+)"`),
  );
  games.push({
    title,
    slug,
    description,
    longDescription: longMatch ? longMatch[1] : description,
    category: catMatch ? catMatch[1] : "Trivia",
  });
}

const faqs = [];
const faqRe = /q:\s*"([^"]+)",\s*a:\s*"([^"]+)"/g;
while ((m = faqRe.exec(faqsSrc))) faqs.push({ q: m[1], a: m[2] });

// --- Head builders -----------------------------------------------------------
function ldScripts(blocks) {
  return blocks
    .map((b) => `    <script type="application/ld+json">\n${JSON.stringify(b, null, 2)}\n    </script>`)
    .join("\n");
}

// Replace head fields in a copy of the built template and inject JSON-LD.
function render(template, { title, description, path, jsonLd }) {
  const url = `${SITE}${path}`;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${esc(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${esc(title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${esc(description)}" />`);
  if (jsonLd && jsonLd.length) {
    html = html.replace("</head>", `${ldScripts(jsonLd)}\n  </head>`);
  }
  return html;
}

function write(routePath, html) {
  const file = routePath === "/" ? join(DIST, "index.html") : join(DIST, routePath, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

// --- Route definitions -------------------------------------------------------
// Content-page titles/descriptions mirror each page's useSeo() call.
const contentPages = [
  {
    path: "/about",
    title: "About Futbol11 — Daily Football Games & Puzzles",
    description:
      "Learn about Futbol11, the home of 20 free daily football trivia games, puzzles and word challenges covering every league, competition and era.",
    type: "AboutPage",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy — Futbol11",
    description:
      "How Futbol11 handles data, cookies and third-party advertising, including the use of Google AdSense cookies, and how you can opt out of personalized ads.",
    type: "WebPage",
  },
  {
    path: "/terms",
    title: "Terms of Service — Futbol11",
    description:
      "The terms and conditions for using Futbol11's free daily football games, including intellectual property, disclaimers and limitations of liability.",
    type: "WebPage",
  },
  {
    path: "/contact",
    title: "Contact Us — Futbol11",
    description:
      "Get in touch with the Futbol11 team. Send feedback, report an issue, or suggest a new daily football game.",
    type: "ContactPage",
  },
];

const template = readFileSync(join(DIST, "index.html"), "utf8");
let count = 0;

// Game pages
for (const g of games) {
  const path = `/game/${g.slug}`;
  write(
    path,
    render(template, {
      title: `${g.title} — Play Free Daily | Futbol11`,
      description: g.description,
      path,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Game",
          name: g.title,
          description: g.longDescription,
          url: `${SITE}${path}`,
          genre: g.category,
          gamePlatform: "Web browser",
          inLanguage: "en",
          isAccessibleForFree: true,
          publisher: PUBLISHER,
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: "Games", item: `${SITE}/#games` },
            { "@type": "ListItem", position: 3, name: g.title, item: `${SITE}${path}` },
          ],
        },
      ],
    }),
  );
  count++;
}

// Content pages
for (const p of contentPages) {
  write(
    p.path,
    render(template, {
      title: p.title,
      description: p.description,
      path: p.path,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": p.type,
          name: p.title.split(" — ")[0],
          url: `${SITE}${p.path}`,
          publisher: PUBLISHER,
        },
      ],
    }),
  );
  count++;
}

// Home: keep its head, just add FAQPage + ItemList structured data.
const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Futbol11 daily football games",
    numberOfItems: games.length,
    itemListElement: games.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: g.title,
      url: `${SITE}/game/${g.slug}`,
    })),
  },
];
write("/", template.replace("</head>", `${ldScripts(homeJsonLd)}\n  </head>`));
count++;

console.log(`prerendered ${count} routes (${games.length} games, ${contentPages.length} content pages, 1 home); FAQs: ${faqs.length}`);
