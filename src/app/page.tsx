import type { Metadata } from "next";
import Header from "@/components/Header";
import DailyScore from "@/components/DailyScore";
import GameGrid from "@/components/GameGrid";
import OtherSites from "@/components/OtherSites";
import HowToPlay from "@/components/HowToPlay";
import SEOContent from "@/components/SEOContent";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import HashScroll from "@/components/HashScroll";
import { games } from "@/data/games";
import { faqs } from "@/data/faqs";
import { SITE_TAGLINE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Futbol11 - ${SITE_TAGLINE}` },
  description:
    "Play 20 free daily football trivia games. Guess lineups, solve football puzzles, play Wordle, Grid, Connections & more. New challenges every day.",
  alternates: { canonical: "/" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Futbol11 daily football games",
    numberOfItems: games.length,
    itemListElement: games.map((game, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: game.title,
      url: `${SITE_URL}/game/${game.slug}`,
    })),
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HashScroll />
      <Header />
      <main>
        <section className="container pt-10 pb-2 text-center">
          <h1 className="font-display text-3xl sm:text-4xl text-foreground">
            Futbol11 — Daily Football Trivia Games &amp; Puzzles
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
            Futbol11 is a free daily football games site with 20 trivia, puzzle and word challenges —
            from lineup guessing and Wordle to the Football Grid — with new puzzles every day at midnight.
          </p>
        </section>
        <section className="py-6 flex justify-center">
          <DailyScore />
        </section>
        <GameGrid />
        <OtherSites />
        <HowToPlay />
        <SEOContent />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
