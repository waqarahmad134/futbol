import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { games } from "@/data/games";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import GameView from "@/components/GameView";

export const dynamicParams = false;

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const game = games.find((g) => g.slug === params.slug);
  if (!game) return { title: "Game Not Found" };
  return {
    title: { absolute: `${game.title} — Play Free Daily | Futbol11` },
    description: game.description,
    alternates: { canonical: `/game/${game.slug}` },
    openGraph: {
      title: `${game.title} — Play Free Daily | Futbol11`,
      description: game.description,
      url: `${SITE_URL}/game/${game.slug}`,
    },
  };
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = games.find((g) => g.slug === params.slug);
  if (!game) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Game",
      name: game.title,
      description: game.longDescription,
      url: `${SITE_URL}/game/${game.slug}`,
      genre: game.category,
      gamePlatform: "Web browser",
      inLanguage: "en",
      isAccessibleForFree: true,
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Games", item: `${SITE_URL}/#games` },
        { "@type": "ListItem", position: 3, name: game.title, item: `${SITE_URL}/game/${game.slug}` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GameView slug={game.slug} />
    </>
  );
}
