import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { SITE_NAME, SITE_URL, OG_IMAGE, SITE_PUBLISHED, SITE_MODIFIED } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Futbol11 - Daily Football Games & Puzzles",
  description:
    "Learn about Futbol11, the home of 23 free daily football trivia games, puzzles and word challenges covering every league, competition and era.",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "About Futbol11 - Daily Football Games & Puzzles",
    description:
      "Learn about Futbol11, the home of 23 free daily football trivia games, puzzles and word challenges covering every league, competition and era.",
    url: `${SITE_URL}/about/`,
    images: [OG_IMAGE],
  },
  twitter: {
    title: "About Futbol11 - Daily Football Games & Puzzles",
    description:
      "Learn about Futbol11, the home of 23 free daily football trivia games, puzzles and word challenges covering every league, competition and era.",
    images: ["/og-image.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Futbol11",
  url: `${SITE_URL}/about/`,
  datePublished: SITE_PUBLISHED,
  dateModified: SITE_MODIFIED,
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageShell
        title="About Futbol11"
        intro="Futbol11 is a free daily football games platform built by football fans, for football fans."
      >
        <h2>What is Futbol11?</h2>
        <p>
          Futbol11 is a collection of 23 unique daily football games covering trivia, puzzles, word
          games and strategy challenges. From guessing historic starting lineups to solving football
          Wordle, filling the Football Grid, or finding the impostor in a group of players, there is a
          new challenge waiting every day at midnight. Our games span the full history of the sport,
          from the 1930 World Cup to the latest Premier League, La Liga and Champions League action.
        </p>

        <h2>What you can play</h2>
        <p>
          The collection has 18 trivia games, 3 puzzle games, 2 word games and 1 strategy game.
          Trivia fans can guess lineups from every World Cup since 1930, name all-time great XIs,
          or test their memory of Euro 2024 and Copa America. Puzzle fans get the Football Grid,
          Connections and Impostor. Word game fans get Futbol11 Wordle and Octadle, our
          eight-words-at-once challenge.
        </p>
        <p>
          Three games are brand new. Octadle, Formudle and WrestlePlay joined the site in November
          2026. Formudle is a daily Formula 1 driver guessing game, and WrestlePlay is the same idea
          for wrestlers. All three play the same way as the football games: one new puzzle every day,
          free to play, with no account needed.
        </p>

        <h2>Our mission</h2>
        <p>
          We believe football knowledge should be fun to test and rewarding to grow. Every game on
          Futbol11 is designed to be both entertaining and educational: even a wrong guess teaches you
          something new about a player, club, tournament or moment in football history. There are no
          accounts to create and nothing to download, just open the site and play.
        </p>

        <h2>How it works</h2>
        <p>
          Each game refreshes daily so everyone around the world faces the same challenge at the same
          time. Your daily score and progress are stored locally in your own browser, so you can pick
          up where you left off without ever handing over personal information. Finished games also
          count toward your streak and the leaderboard, using only a random device ID, never your
          name or email. Read our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link> for the full details.
        </p>
        <p>
          New to a game? The <Link href="/blog">blog</Link> has step-by-step guides that explain
          the rules and share tips, starting with Futbol11 Wordle and the Football Grid. More guides
          are added regularly.
        </p>

        <h2>Start playing</h2>
        <p>
          Jump into popular games like the <Link href="/game/futbol-grid">Football Grid</Link>,{" "}
          <Link href="/game/futbol11-wordle">Futbol11 Wordle</Link>,{" "}
          <Link href="/game/futbol11-connections">Connections</Link>, or{" "}
          <Link href="/game/futbol11-higher-lower">Higher or Lower</Link>, or browse the full lineup
          on the <Link href="/">home page</Link>.
        </p>

        <p>
          Questions, feedback or game ideas? We would love to hear from you, head to our{" "}
          <Link href="/contact">Contact page</Link>.
        </p>

        <p className="text-sm">Page last updated: November 9, 2026.</p>
      </PageShell>
    </>
  );
}
