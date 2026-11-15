import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { games } from "@/data/games";
import { SITE_NAME, SITE_URL, OG_IMAGE, SITE_PUBLISHED, SITE_MODIFIED } from "@/lib/site";
import GameView from "@/components/GameView";
import type { Locale } from "@/i18n/locales";
import { hreflangAlternates, localizedUrl, LOCALE_HTML_LANG } from "@/i18n/locales";
import { localizeStrings, localizeGame, fmt } from "@/i18n/dictionary";
import { DictionaryProvider } from "@/i18n/DictionaryContext";

export function gameStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export function gameMetadata(locale: Locale, slug: string): Metadata {
  const t = localizeStrings(locale, "meta", {
    gameTitle: "{title} - Play Free Daily | Futbol11",
    gameNotFoundTitle: "Game Not Found",
  });
  const game = games.find((g) => g.slug === slug);
  if (!game) return { title: t.gameNotFoundTitle };
  const localized = localizeGame(locale, game);
  const title = fmt(t.gameTitle, { title: localized.title });
  return {
    title: { absolute: title },
    description: localized.description,
    alternates: { canonical: localizedUrl(`/game/${game.slug}`, locale), languages: hreflangAlternates(`/game/${game.slug}`) },
    openGraph: {
      title,
      description: localized.description,
      url: localizedUrl(`/game/${game.slug}`, locale),
      images: [OG_IMAGE],
    },
    twitter: {
      title,
      description: localized.description,
      images: ["/og-image.webp"],
    },
  };
}

export default function GamePage({ locale, slug }: { locale: Locale; slug: string }) {
  const gameEn = games.find((g) => g.slug === slug);
  if (!gameEn) notFound();
  const game = localizeGame(locale, gameEn);
  const t = localizeStrings(locale, "common", { home: "Home", games: "Games" });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Game",
      name: game.title,
      description: game.longDescription,
      url: localizedUrl(`/game/${game.slug}`, locale),
      datePublished: game.published ?? SITE_PUBLISHED,
      dateModified: SITE_MODIFIED,
      genre: game.category,
      gamePlatform: "Web browser",
      inLanguage: LOCALE_HTML_LANG[locale],
      isAccessibleForFree: true,
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.home, item: localizedUrl("/", locale) },
        { "@type": "ListItem", position: 2, name: t.games, item: `${localizedUrl("/", locale)}#games` },
        { "@type": "ListItem", position: 3, name: game.title, item: localizedUrl(`/game/${game.slug}`, locale) },
      ],
    },
  ];

  return (
    <DictionaryProvider locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GameView slug={game.slug} />
    </DictionaryProvider>
  );
}
