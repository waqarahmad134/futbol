import type { Metadata } from "next";
import Header from "@/components/Header";
import DailyScore from "@/components/DailyScore";
import GameGrid from "@/components/GameGrid";
import Leaderboard from "@/components/Leaderboard";
import OtherSites from "@/components/OtherSites";
import HowToPlay from "@/components/HowToPlay";
import QuickAnswer from "@/components/QuickAnswer";
import SEOContent from "@/components/SEOContent";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import HashScroll from "@/components/HashScroll";
import { games } from "@/data/games";
import {
  SITE_TAGLINE,
  SITE_URL,
  SITE_PUBLISHED,
  SITE_MODIFIED,
} from "@/lib/site";
import type { Locale } from "@/i18n/locales";
import {
  hreflangAlternates,
  localizedUrl,
  LOCALE_HTML_LANG,
} from "@/i18n/locales";
import {
  localizeStrings,
  getLocalizedFaqs,
  localizeGame,
} from "@/i18n/dictionary";
import { DictionaryProvider } from "@/i18n/DictionaryContext";

export function homeMetadata(locale: Locale): Metadata {
  const t = localizeStrings(locale, "home", {
    title: `Futbol11 - ${SITE_TAGLINE}`,
    intro:
      "Play 23 free daily football trivia games. Guess lineups, solve football puzzles, play Wordle, Grid, Connections & more. New challenges every day.",
  });
  return {
    title: { absolute: t.title },
    description: t.intro,
    alternates: {
      canonical: localizedUrl("/", locale),
      languages: hreflangAlternates("/"),
    },
    openGraph: {
      title: t.title,
      description: t.intro,
      url: localizedUrl("/", locale),
      locale:
        locale === "en"
          ? "en_US"
          : locale === "pt"
            ? "pt_BR"
            : locale === "es"
              ? "es_ES"
              : "fr_FR",
    },
    twitter: { title: t.title, description: t.intro },
  };
}

export default function HomePage({ locale }: { locale: Locale }) {
  const t = localizeStrings(locale, "home", {
    title: `Futbol11 - ${SITE_TAGLINE}`,
    intro:
      "Futbol11 is a free daily football games site with 23 trivia, puzzle and word challenges, from lineup guessing and Wordle to the Football Grid, with new puzzles every day at midnight.",
    gridTitle: "Select a Football Game",
    gridDesc:
      "Choose from 23 unique daily football challenges. New puzzles every day at midnight, test your knowledge of clubs, players, tactics, and football history.",
  });
  const faqs = getLocalizedFaqs(locale);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: t.title,
      url: localizedUrl("/", locale),
      datePublished: SITE_PUBLISHED,
      dateModified: SITE_MODIFIED,
      inLanguage: LOCALE_HTML_LANG[locale],
      publisher: { "@type": "Organization", name: "Futbol11", url: SITE_URL },
    },
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
      name: t.title,
      numberOfItems: games.length,
      itemListElement: games.map((game, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: localizeGame(locale, game).title,
        url: localizedUrl(`/game/${game.slug}`, locale),
      })),
    },
  ];

  return (
    <DictionaryProvider locale={locale}>
      <div className="min-h-screen bg-background font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <HashScroll />
        <Header />
        <main>
          <section className="container pt-10 pb-2 text-center">
            <h1 className="font-display text-3xl sm:text-4xl text-foreground">
              {t.title}
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
              {t.intro}
            </p>
          </section>
          <section className="py-6 flex justify-center">
            <DailyScore />
          </section>
          <GameGrid locale={locale} />
          <Leaderboard />
          <OtherSites locale={locale} />
          <QuickAnswer answer={t.intro} />
          <HowToPlay />
          <SEOContent />
          <FAQ />
        </main>
        <Footer />
      </div>
    </DictionaryProvider>
  );
}
