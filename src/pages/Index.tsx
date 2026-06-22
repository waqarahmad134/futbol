import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import DailyScore from "@/components/DailyScore";
import GameGrid from "@/components/GameGrid";
import OtherSites from "@/components/OtherSites";
import HowToPlay from "@/components/HowToPlay";
import SEOContent from "@/components/SEOContent";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { games } from "@/data/games";
import { faqs } from "@/data/faqs";
import { useSeo } from "@/hooks/use-seo";
import { SITE_TAGLINE, SITE_URL } from "@/lib/site";

const Index = () => {
  const location = useLocation();

  useSeo({
    title: `Futbol11 - ${SITE_TAGLINE}`,
    description:
      "Play 20 free daily football trivia games. Guess lineups, solve football puzzles, play Wordle, Grid, Connections & more. New challenges every day.",
    path: "/",
    jsonLd: [
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
    ],
  });

  // Scroll to a section when arriving with a hash (e.g. from a game page).
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
    return () => window.clearTimeout(t);
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background font-body">
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
};

export default Index;
