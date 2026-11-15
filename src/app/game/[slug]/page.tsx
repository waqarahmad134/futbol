import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { games } from "@/data/games";
import { SITE_NAME, SITE_URL, OG_IMAGE, SITE_PUBLISHED, SITE_MODIFIED } from "@/lib/site";
import GameView from "@/components/GameView";

export const dynamicParams = false;

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) return { title: "Game Not Found" };
  return {
    title: { absolute: `${game.title} - Play Free Daily | Futbol11` },
    description: game.description,
    alternates: { canonical: `/game/${game.slug}/` },
    openGraph: {
      title: `${game.title} - Play Free Daily | Futbol11`,
      description: game.description,
      url: `${SITE_URL}/game/${game.slug}/`,
      images: [OG_IMAGE],
    },
    twitter: {
      title: `${game.title} - Play Free Daily | Futbol11`,
      description: game.description,
      images: ["/og-image.webp"],
    },
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Game",
      name: game.title,
      description: game.longDescription,
      url: `${SITE_URL}/game/${game.slug}/`,
      datePublished: game.published ?? SITE_PUBLISHED,
      dateModified: SITE_MODIFIED,
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
        { "@type": "ListItem", position: 3, name: game.title, item: `${SITE_URL}/game/${game.slug}/` },
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
