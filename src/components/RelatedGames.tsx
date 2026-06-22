import { Link } from "react-router-dom";
import { games, Game } from "@/data/games";

interface RelatedGamesProps {
  currentSlug: string;
  category: Game["category"];
  limit?: number;
}

// Internal-linking block shown on each game page. Surfaces same-category games
// first (most relevant), then fills with others so every game page links out to
// several siblings — strengthening crawlability and topical relevance.
const RelatedGames = ({ currentSlug, category, limit = 6 }: RelatedGamesProps) => {
  const others = games.filter((g) => g.slug !== currentSlug);
  const sameCategory = others.filter((g) => g.category === category);
  const rest = others.filter((g) => g.category !== category);
  const related = [...sameCategory, ...rest].slice(0, limit);

  return (
    <section aria-labelledby="related-games-heading">
      <h2 id="related-games-heading" className="font-display text-xl text-foreground mb-3">
        More Football Games
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {related.map((g) => (
          <Link
            key={g.id}
            to={`/game/${g.slug}`}
            className="group flex items-center gap-3 rounded-lg border border-border bg-muted/20 p-3 transition-colors hover:border-game-card-border hover:bg-game-card-hover"
          >
            <span className="text-2xl" aria-hidden="true">{g.emoji}</span>
            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {g.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedGames;
