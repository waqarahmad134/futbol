import { useParams, Link } from "react-router-dom";
import { games } from "@/data/games";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, BarChart3, Tag } from "lucide-react";
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
import RelatedGames from "@/components/RelatedGames";
import { useSeo } from "@/hooks/use-seo";
import { useSectionNav } from "@/hooks/use-section-nav";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const renderGame = (slug: string | undefined) => {
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
    default:
      return (
        <div className="text-center py-16">
          <span className="text-4xl block mb-4">🎮</span>
          <h3 className="font-display text-lg text-foreground mb-2">Coming Soon</h3>
          <p className="text-muted-foreground text-sm">This challenge is being built.</p>
        </div>
      );
  }
};

const GameDetail = () => {
  const { slug } = useParams();
  const game = games.find((g) => g.slug === slug);
  const goToSection = useSectionNav();

  useSeo({
    title: game
      ? `${game.title} — Play Free Daily | Futbol11`
      : "Game Not Found — Futbol11",
    description:
      game?.description ?? "The football game you are looking for could not be found.",
    path: game ? `/game/${game.slug}` : "/",
    noIndex: !game,
    jsonLd: game
      ? [
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
              {
                "@type": "ListItem",
                position: 3,
                name: game.title,
                item: `${SITE_URL}/game/${game.slug}`,
              },
            ],
          },
        ]
      : undefined,
  });

  if (!game) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl text-foreground mb-4">Game Not Found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to all games</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <main className="container py-10 max-w-3xl">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <span aria-hidden="true">/</span>
          <a
            href="/#games"
            onClick={(e) => {
              e.preventDefault();
              goToSection("games");
            }}
            className="hover:text-foreground transition-colors"
          >
            Games
          </a>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">{game.title}</span>
        </nav>

        <div className="text-center mb-8">
          <span className="text-6xl block mb-4">{game.emoji}</span>
          <h1 className="font-display text-3xl text-foreground mb-2">{game.title}</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">{game.description}</p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <Badge variant="outline" className="border-border text-muted-foreground gap-1">
              <BarChart3 className="w-3 h-3" /> {game.difficulty}
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground gap-1">
              <Tag className="w-3 h-3" /> {game.category}
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground gap-1">
              <Clock className="w-3 h-3" /> Daily
            </Badge>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 mb-8">
          {renderGame(game.slug)}
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="font-display text-xl text-foreground mb-3">About {game.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{game.longDescription}</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground mb-3">How to Play</h2>
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
            <h2 className="font-display text-xl text-foreground mb-3">Tips & Strategy</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h4 className="text-foreground font-semibold text-sm mb-1">🧠 Start Broad</h4>
                <p className="text-muted-foreground text-xs">Begin with well-known players and obvious answers. Save risky guesses for later when you have more context.</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h4 className="text-foreground font-semibold text-sm mb-1">📅 Play Daily</h4>
                <p className="text-muted-foreground text-xs">Consistency is key. Daily play builds your football knowledge base and helps you recognize patterns across games.</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h4 className="text-foreground font-semibold text-sm mb-1">🌍 Think Global</h4>
                <p className="text-muted-foreground text-xs">Don't just focus on the top 5 leagues. South American, African, and Asian football often feature in our challenges.</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h4 className="text-foreground font-semibold text-sm mb-1">📖 Learn From Mistakes</h4>
                <p className="text-muted-foreground text-xs">Every wrong answer teaches you something new. Review the correct answers after each game to expand your knowledge.</p>
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

export default GameDetail;
