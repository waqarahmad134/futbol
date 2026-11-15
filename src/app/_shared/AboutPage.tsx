import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { games } from "@/data/games";
import { SITE_NAME, SITE_URL, OG_IMAGE, SITE_PUBLISHED, SITE_MODIFIED } from "@/lib/site";
import type { Locale } from "@/i18n/locales";
import { hreflangAlternates, localizedUrl, localizePath } from "@/i18n/locales";
import { localizeStrings, localizeGame } from "@/i18n/dictionary";
import { DictionaryProvider } from "@/i18n/DictionaryContext";
import { rich } from "./rich";

export function aboutMetadata(locale: Locale): Metadata {
  const t = localizeStrings(locale, "about", {
    metaTitle: "About Futbol11 - Daily Football Games & Puzzles",
    metaDesc:
      "Learn about Futbol11, the home of 23 free daily football trivia games, puzzles and word challenges covering every league, competition and era.",
  });
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: { canonical: localizedUrl("/about", locale), languages: hreflangAlternates("/about") },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      url: localizedUrl("/about", locale),
      images: [OG_IMAGE],
    },
    twitter: { title: t.metaTitle, description: t.metaDesc, images: ["/og-image.webp"] },
  };
}

export default function AboutPage({ locale }: { locale: Locale }) {
  const t = localizeStrings(locale, "about", {
    title: "About Futbol11",
    intro: "Futbol11 is a free daily football games platform built by football fans, for football fans.",
    h1: "What is Futbol11?",
    p1: "Futbol11 is a collection of 23 unique daily football games covering trivia, puzzles, word games and strategy challenges. From guessing historic starting lineups to solving football Wordle, filling the Football Grid, or finding the impostor in a group of players, there is a new challenge waiting every day at midnight. Our games span the full history of the sport, from the 1930 World Cup to the latest Premier League, La Liga and Champions League action.",
    h2: "What you can play",
    p2: "The collection has 18 trivia games, 3 puzzle games, 2 word games and 1 strategy game. Trivia fans can guess lineups from every World Cup since 1930, name all-time great XIs, or test their memory of Euro 2024 and Copa America. Puzzle fans get the Football Grid, Connections and Impostor. Word game fans get Futbol11 Wordle and Octadle, our eight-words-at-once challenge.",
    p3: "Three games are brand new. Octadle, Formudle and WrestlePlay joined the site in November 2026. Formudle is a daily Formula 1 driver guessing game, and WrestlePlay is the same idea for wrestlers. All three play the same way as the football games: one new puzzle every day, free to play, with no account needed.",
    h3: "Our mission",
    p4: "We believe football knowledge should be fun to test and rewarding to grow. Every game on Futbol11 is designed to be both entertaining and educational: even a wrong guess teaches you something new about a player, club, tournament or moment in football history. There are no accounts to create and nothing to download, just open the site and play.",
    h4: "How it works",
    p5: "Each game refreshes daily so everyone around the world faces the same challenge at the same time. Your daily score and progress are stored locally in your own browser, so you can pick up where you left off without ever handing over personal information. Finished games also count toward your streak and the leaderboard, using only a random device ID, never your name or email. Read our {privacy} for the full details.",
    p6: "New to a game? The {blog} has step-by-step guides that explain the rules and share tips, starting with Futbol11 Wordle and the Football Grid. More guides are added regularly.",
    h5: "Start playing",
    p7: "Jump into popular games like the {grid}, {wordle}, {connections}, or {higherLower}, or browse the full lineup on the {home}.",
    p8: "Questions, feedback or game ideas? We would love to hear from you, head to our {contact}.",
    homePage: "home page",
    contactPage: "Contact page",
    updated: "Page last updated: November 9, 2026.",
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t.title,
    url: localizedUrl("/about", locale),
    datePublished: SITE_PUBLISHED,
    dateModified: SITE_MODIFIED,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
  const privacyLabel = localizeStrings(locale, "common", { privacy: "Privacy Policy" }).privacy;
  const gameTitle = (slug: string) => {
    const g = games.find((x) => x.slug === slug);
    return g ? localizeGame(locale, g).title : slug;
  };

  return (
    <DictionaryProvider locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageShell title={t.title} intro={t.intro} locale={locale}>
        <h2>{t.h1}</h2>
        <p>{t.p1}</p>

        <h2>{t.h2}</h2>
        <p>{t.p2}</p>
        <p>{t.p3}</p>

        <h2>{t.h3}</h2>
        <p>{t.p4}</p>

        <h2>{t.h4}</h2>
        <p>{rich(t.p5, { privacy: <Link href={localizePath("/privacy-policy", locale)}>{privacyLabel}</Link> })}</p>
        <p>{rich(t.p6, { blog: <Link href={localizePath("/blog", locale)}>blog</Link> })}</p>

        <h2>{t.h5}</h2>
        <p>
          {rich(t.p7, {
            grid: <Link href={localizePath("/game/futbol-grid", locale)}>{gameTitle("futbol-grid")}</Link>,
            wordle: <Link href={localizePath("/game/futbol11-wordle", locale)}>{gameTitle("futbol11-wordle")}</Link>,
            connections: <Link href={localizePath("/game/futbol11-connections", locale)}>{gameTitle("futbol11-connections")}</Link>,
            higherLower: <Link href={localizePath("/game/futbol11-higher-lower", locale)}>{gameTitle("futbol11-higher-lower")}</Link>,
            home: <Link href={localizePath("/", locale)}>{t.homePage}</Link>,
          })}
        </p>

        <p>
          {rich(t.p8, {
            contact: <Link href={localizePath("/contact", locale)}>{t.contactPage}</Link>,
          })}
        </p>

        <p className="text-sm">{t.updated}</p>
      </PageShell>
    </DictionaryProvider>
  );
}
