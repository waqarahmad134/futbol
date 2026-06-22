import { motion } from "framer-motion";
import { Game } from "@/data/games";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface GameCardProps {
  game: Game;
  index: number;
}

const GameCard = ({ game, index }: GameCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link
        to={`/game/${game.slug}`}
        className="group block rounded-xl border border-border bg-game-card hover:bg-game-card-hover hover:border-game-card-border transition-all duration-300 overflow-hidden"
      >
        <div className="flex items-center justify-center h-36 text-6xl bg-muted/30" aria-hidden="true">
          {game.emoji}
        </div>
        <div className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            {game.isNew && (
              <Badge className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0">NEW</Badge>
            )}
          </div>
          <span className="font-display text-sm tracking-wide text-primary group-hover:text-foreground transition-colors block">
            PLAY
          </span>
          <h3 className="font-body text-sm font-semibold text-foreground mt-1">{game.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{game.description}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default GameCard;
