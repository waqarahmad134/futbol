import Link from "next/link";
import { games, Game } from "@/data/games";
import type { Locale } from "@/i18n/locales";
import { localizeStrings, localizeGame } from "@/i18n/dictionary";
import { localizePath } from "@/i18n/locales";

interface RelatedGamesProps {
  currentSlug: string;
  category: Game["category"];
  limit?: number;
  locale?: Locale;
}

// Internal-linking block shown on each game page. Surfaces same-category games
// first (most relevant), then fills with others so every game page links out to
// several siblings, strengthening crawlability and topical relevance.
const RelatedGames = ({ currentSlug, category, limit = 6, locale = "en" }: RelatedGamesProps) => {
  const t = localizeStrings(locale, "related", {
    title: "More Football Games",
  });
  const others = games.filter((g) => g.slug !== currentSlug);
  const sameCategory = others.filter((g) => g.category === category);
  const rest = others.filter((g) => g.category !== category);
  const related = [...sameCategory, ...rest].slice(0, limit);

  return (
    <section aria-labelledby="related-games-heading">
      <h2 id="related-games-heading" className="font-display text-xl text-foreground mb-3">
        {t.title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {related.map((g) => {
          const localized = localizeGame(locale, g);
          return (
            <Link
              key={g.id}
              href={localizePath(`/game/${g.slug}`, locale)}
              className="group flex items-center gap-3 rounded-lg border border-border bg-muted/20 p-3 transition-colors hover:border-game-card-border hover:bg-game-card-hover"
            >
              <span className="text-2xl" aria-hidden="true">{g.emoji}</span>
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {localized.title}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedGames;
