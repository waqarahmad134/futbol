import { useParams, Link } from "react-router-dom";
import { games } from "@/data/games";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, BarChart3, Tag } from "lucide-react";
import WordleGame from "@/components/games/WordleGame";
import GuessPlayerGame from "@/components/games/GuessPlayerGame";
import TriviaQuizGame from "@/components/games/TriviaQuizGame";

const GameDetail = () => {
  const { slug } = useParams();
  const game = games.find((g) => g.slug === slug);

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
        <Link to="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to all games
        </Link>

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
          {game.slug === "futbol11-wordle" ? (
            <WordleGame />
          ) : game.slug === "guess-the-footballer" ? (
            <GuessPlayerGame />
          ) : game.slug === "futbol11-pyramid" ? (
            <TriviaQuizGame />
          ) : (
            <div className="text-center py-16">
              <span className="text-4xl block mb-4">🎮</span>
              <h3 className="font-display text-lg text-foreground mb-2">Coming Soon</h3>
              <p className="text-muted-foreground text-sm">The daily {game.title} challenge is being built.</p>
              <p className="text-muted-foreground text-xs mt-2">Try <Link to="/game/futbol11-wordle" className="text-primary hover:underline">Futbol11 Wordle</Link> — it's fully playable!</p>
            </div>
          )}
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GameDetail;
