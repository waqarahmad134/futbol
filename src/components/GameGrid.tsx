import GameCard from "./GameCard";
import { games } from "@/data/games";

const GameGrid = () => {
  return (
    <section id="games" className="py-12">
      <div className="container">
        <h2 className="font-display text-xl text-center text-foreground mb-2">Select a Football Game</h2>
        <p className="text-center text-muted-foreground font-body text-sm mb-8 max-w-2xl mx-auto">
          Choose from 20 unique daily football challenges. New puzzles every day at midnight — test your knowledge of clubs, players, tactics, and football history.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {games.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameGrid;
