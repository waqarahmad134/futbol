"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, BarChart3, Tag } from "lucide-react";
import { games } from "@/data/games";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import WordleGame from "@/components/games/WordleGame";
import GuessPlayerGame from "@/components/games/GuessPlayerGame";
import TriviaQuizGame from "@/components/games/TriviaQuizGame";
import LineupGuessGame from "@/components/games/LineupGuessGame";
import LegacyGame from "@/components/games/LegacyGame";
import ImpostorGame from "@/components/games/ImpostorGame";
import GridGame from "@/components/games/GridGame";
import ConnectionsGame from "@/components/games/ConnectionsGame";
import ClubsGame from "@/components/games/ClubsGame";
import LinkGame from "@/components/games/LinkGame";
import BingoGame from "@/components/games/BingoGame";
import Top10Game from "@/components/games/Top10Game";
import HigherLowerGame from "@/components/games/HigherLowerGame";
import OctadleGame from "@/components/games/OctadleGame";
import FormudleGame from "@/components/games/FormudleGame";
import WrestlePlayGame from "@/components/games/WrestlePlayGame";
import RelatedGames from "@/components/RelatedGames";
import { useSectionNav } from "@/hooks/use-section-nav";
import { useLocalizedStrings, useLocalizedGame, useLocale } from "@/i18n/DictionaryContext";
import { localizeDifficulty, localizeCategory, fmt } from "@/i18n/dictionary";
import { localizePath } from "@/i18n/locales";

const DATE_LOCALE: Record<string, string> = {
  en: "en-US",
  pt: "pt-BR",
  es: "es-ES",
  fr: "fr-FR",
};

const renderGame = (slug: string) => {
  switch (slug) {
    case "futbol11-wordle":
      return <WordleGame />;
    case "guess-the-footballer":
      return <GuessPlayerGame />;
    case "futbol11-pyramid":
      return <TriviaQuizGame />;
    case "futbol11-goltexto":
      return <LineupGuessGame setKey="goltexto" storageKey="f11-goltexto-state" />;
    case "futbol11":
      return <LineupGuessGame setKey="countries" storageKey="f11-countries-state" />;
    case "futbol11-legends":
      return <LineupGuessGame setKey="legends" storageKey="f11-legends-state" />;
    case "futbol11-america":
      return <LineupGuessGame setKey="america" storageKey="f11-america-state" />;
    case "futbol11-euro2024":
      return <LineupGuessGame setKey="euro2024" storageKey="f11-euro2024-state" />;
    case "futbol11-copaamerica":
      return <LineupGuessGame setKey="copaamerica" storageKey="f11-copa-state" />;
    case "futbol11-worldcup":
      return <LineupGuessGame setKey="worldcup" storageKey="f11-worldcup-state" />;
    case "futbol11-legacy":
      return <LegacyGame />;
    case "futbol11-impostor":
      return <ImpostorGame />;
    case "futbol-grid":
      return <GridGame />;
    case "futbol11-connections":
      return <ConnectionsGame />;
    case "futbol11-clubs":
      return <ClubsGame />;
    case "futbol11-link":
      return <LinkGame />;
    case "futbol11-bingo":
      return <BingoGame setKey="modern" storageKey="f11-bingo-modern-state" />;
    case "futbol11-bingo-legends":
      return <BingoGame setKey="retro" storageKey="f11-bingo-retro-state" />;
    case "futbol-top10":
      return <Top10Game />;
    case "futbol11-higher-lower":
      return <HigherLowerGame />;
    case "octadle":
      return <OctadleGame />;
    case "formudle":
      return <FormudleGame />;
    case "wrestleplay":
      return <WrestlePlayGame />;
    default:
      return <ComingSoon />;
  }
};

const ComingSoon = () => {
  const t = useLocalizedStrings("gameView", {
    comingSoon: "Coming Soon",
    comingSoonDesc: "This challenge is being built.",
  });
  return (
    <div className="text-center py-16">
      <span className="text-4xl block mb-4" aria-hidden="true">🎮</span>
      <h3 className="font-display text-lg text-foreground mb-2">{t.comingSoon}</h3>
      <p className="text-muted-foreground text-sm">{t.comingSoonDesc}</p>
    </div>
  );
};

const GameView = ({ slug }: { slug: string }) => {
  const locale = useLocale();
  const gameEn = games.find((g) => g.slug === slug);
  // Hook must run unconditionally; fall back to the first game when the
  // slug is unknown, then discard it below in the not-found branch.
  const localized = useLocalizedGame(gameEn ?? games[0]);
  const game = gameEn ? localized : undefined;
  const goToSection = useSectionNav();
  const t = useLocalizedStrings("gameView", {
    home: "Home",
    games: "Games",
    todaysPuzzle: "Today's puzzle: {date}",
    daily: "Daily",
    about: "About {name}",
    howToPlay: "How to Play",
    tips: "Tips & Strategy",
    tip1Title: "🧠 Start Broad",
    tip1Text:
      "Begin with well-known players and obvious answers. Save risky guesses for later when you have more context.",
    tip2Title: "📅 Play Daily",
    tip2Text:
      "Consistency is key. Daily play builds your football knowledge base and helps you recognize patterns across games.",
    tip3Title: "🌍 Think Global",
    tip3Text:
      "Don't just focus on the top 5 leagues. South American, African, and Asian football often feature in our challenges.",
    tip4Title: "📖 Learn From Mistakes",
    tip4Text:
      "Every wrong answer teaches you something new. Review the correct answers after each game to expand your knowledge.",
    gameNotFound: "Game Not Found",
    backToAllGames: "Back to all games",
  });
  // Today's date, set after mount so server and client render match.
  // Every game on Futbol11 is a daily puzzle, so the header shows which
  // day's puzzle is live (matches "today" searches like "goltexto hoy").
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(
      new Date().toLocaleDateString(DATE_LOCALE[locale] ?? "en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );
  }, [locale]);

  if (!game) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl text-foreground mb-4">{t.gameNotFound}</h1>
          <Link href={localizePath("/", locale)} className="text-primary hover:underline">← {t.backToAllGames}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <main className="container py-10 max-w-3xl">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href={localizePath("/", locale)} className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t.home}
          </Link>
          <span aria-hidden="true">/</span>
          <a
            href={`${localizePath("/", locale)}#games`}
            onClick={(e) => {
              e.preventDefault();
              goToSection("games");
            }}
            className="hover:text-foreground transition-colors"
          >
            {t.games}
          </a>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">{game.title}</span>
        </nav>

        <div className="text-center mb-8">
          <span className="text-6xl block mb-4" aria-hidden="true">{game.emoji}</span>
          <h1 className="font-display text-3xl text-foreground mb-2">{game.title}</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">{game.description}</p>
          {today && (
            <p className="text-sm text-muted-foreground mt-2">{fmt(t.todaysPuzzle, { date: today })}</p>
          )}
          <div className="flex items-center justify-center gap-3 mt-4">
            <Badge variant="outline" className="border-border text-muted-foreground gap-1">
              <BarChart3 className="w-3 h-3" /> {localizeDifficulty(locale, game.difficulty)}
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground gap-1">
              <Tag className="w-3 h-3" /> {localizeCategory(locale, game.category)}
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground gap-1">
              <Clock className="w-3 h-3" /> {t.daily}
            </Badge>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 mb-8">
          {renderGame(game.slug)}
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="font-display text-xl text-foreground mb-3">{fmt(t.about, { name: game.title })}</h2>
            <p className="text-muted-foreground leading-relaxed">{game.longDescription}</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground mb-3">{t.howToPlay}</h2>
            <ol className="space-y-2">
              {game.howToPlay.map((step, i) => (
                <li key={i} className="flex gap-3 text-muted-foreground">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-semibold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground mb-3">{t.tips}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h3 className="text-foreground font-semibold text-sm mb-1">{t.tip1Title}</h3>
                <p className="text-muted-foreground text-xs">{t.tip1Text}</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h3 className="text-foreground font-semibold text-sm mb-1">{t.tip2Title}</h3>
                <p className="text-muted-foreground text-xs">{t.tip2Text}</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h3 className="text-foreground font-semibold text-sm mb-1">{t.tip3Title}</h3>
                <p className="text-muted-foreground text-xs">{t.tip3Text}</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h3 className="text-foreground font-semibold text-sm mb-1">{t.tip4Title}</h3>
                <p className="text-muted-foreground text-xs">{t.tip4Text}</p>
              </div>
            </div>
          </section>

          <section>
            <RelatedGames currentSlug={game.slug} category={game.category} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GameView;
