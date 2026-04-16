import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDailyGuessPlayer, getClues, GuessPlayer } from "@/data/guess-players";
import { useToast } from "@/hooks/use-toast";
import { Eye, HelpCircle, Check, X, Trophy, RotateCcw } from "lucide-react";

const MAX_GUESSES = 6;

const GuessPlayerGame = () => {
  const { toast } = useToast();
  const [player] = useState<GuessPlayer>(() => getDailyGuessPlayer());
  const [clues] = useState<string[]>(() => getClues(getDailyGuessPlayer()));
  const [revealedClues, setRevealedClues] = useState(1);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  // Blur level decreases as more clues are revealed
  const blurLevel = Math.max(0, 20 - (revealedClues - 1) * 4);

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem("f11-guess-state");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === new Date().toDateString()) {
        setGuesses(parsed.guesses);
        setRevealedClues(parsed.revealedClues);
        setGameOver(parsed.gameOver);
        setWon(parsed.won);
      }
    }
  }, []);

  // Save state
  useEffect(() => {
    if (guesses.length > 0 || gameOver) {
      localStorage.setItem("f11-guess-state", JSON.stringify({
        date: new Date().toDateString(),
        guesses,
        revealedClues,
        gameOver,
        won,
      }));
    }
  }, [guesses, revealedClues, gameOver, won]);

  const submitGuess = useCallback(() => {
    const trimmed = guess.trim();
    if (!trimmed) return;

    const isCorrect = trimmed.toLowerCase() === player.name.toLowerCase();
    const newGuesses = [...guesses, trimmed];
    setGuesses(newGuesses);
    setGuess("");

    if (isCorrect) {
      setGameOver(true);
      setWon(true);
      toast({ title: "🎉 Correct!", description: `You identified ${player.name}!` });
    } else {
      // Reveal next clue on wrong guess
      if (revealedClues < clues.length) {
        setRevealedClues((prev) => prev + 1);
      }
      if (newGuesses.length >= MAX_GUESSES) {
        setGameOver(true);
        toast({ title: "Game Over", description: `It was ${player.name}` });
      } else {
        toast({ title: "❌ Wrong!", description: "A new clue has been revealed", variant: "destructive" });
      }
    }
  }, [guess, player, guesses, revealedClues, clues.length, toast]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !gameOver) submitGuess();
  };

  // Generate silhouette initials for the visual
  const initials = player.name.split(" ").map((w) => w[0]).join("");

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Mystery Player Visual */}
      <div className="relative">
        <motion.div
          className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 border-2 border-border flex items-center justify-center overflow-hidden"
          animate={{ filter: `blur(${blurLevel}px)` }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <span className="text-7xl sm:text-8xl font-display text-primary/60">{initials}</span>
            <div className="mt-2 flex justify-center gap-1">
              {player.nationality === "Argentina" && <span className="text-2xl">🇦🇷</span>}
              {player.nationality === "Portugal" && <span className="text-2xl">🇵🇹</span>}
              {player.nationality === "France" && <span className="text-2xl">🇫🇷</span>}
              {player.nationality === "Brazil" && <span className="text-2xl">🇧🇷</span>}
              {player.nationality === "Norway" && <span className="text-2xl">🇳🇴</span>}
              {player.nationality === "Belgium" && <span className="text-2xl">🇧🇪</span>}
              {player.nationality === "Egypt" && <span className="text-2xl">🇪🇬</span>}
              {player.nationality === "Croatia" && <span className="text-2xl">🇭🇷</span>}
              {player.nationality === "England" && <span className="text-2xl">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>}
              {player.nationality === "Spain" && <span className="text-2xl">🇪🇸</span>}
              {player.nationality === "Germany" && <span className="text-2xl">🇩🇪</span>}
              {player.nationality === "Netherlands" && <span className="text-2xl">🇳🇱</span>}
              {player.nationality === "Italy" && <span className="text-2xl">🇮🇹</span>}
              {player.nationality === "Poland" && <span className="text-2xl">🇵🇱</span>}
              {player.nationality === "South Korea" && <span className="text-2xl">🇰🇷</span>}
            </div>
          </div>
        </motion.div>
        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
          <Eye className="w-4 h-4" />
        </div>
      </div>

      {/* Blur indicator */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Clarity:</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`w-6 h-2 rounded-full transition-colors ${
                i < revealedClues ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <span>{Math.round(((revealedClues) / 6) * 100)}%</span>
      </div>

      {/* Clues */}
      <div className="w-full max-w-md space-y-2">
        <h3 className="text-sm font-display text-foreground flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-primary" /> Clues ({revealedClues}/{clues.length})
        </h3>
        <div className="space-y-1.5">
          {clues.map((clue, i) => (
            <motion.div
              key={i}
              initial={i >= revealedClues ? { opacity: 0 } : false}
              animate={i < revealedClues ? { opacity: 1, y: 0 } : { opacity: 0.3 }}
              transition={{ duration: 0.3 }}
              className={`rounded-lg border px-3 py-2 text-sm ${
                i < revealedClues
                  ? "border-border bg-muted/30 text-foreground"
                  : "border-border/30 bg-muted/10 text-muted-foreground"
              }`}
            >
              {i < revealedClues ? clue : `Clue ${i + 1} — guess wrong to reveal`}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Previous Guesses */}
      {guesses.length > 0 && (
        <div className="w-full max-w-md">
          <h3 className="text-sm font-display text-foreground mb-2">Your Guesses</h3>
          <div className="space-y-1.5">
            {guesses.map((g, i) => {
              const isCorrect = g.toLowerCase() === player.name.toLowerCase();
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                    isCorrect
                      ? "border-success/50 bg-success/10 text-success"
                      : "border-destructive/30 bg-destructive/5 text-muted-foreground"
                  }`}
                >
                  {isCorrect ? (
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-destructive flex-shrink-0" />
                  )}
                  <span>{g}</span>
                  <span className="ml-auto text-xs text-muted-foreground">#{i + 1}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Input */}
      {!gameOver ? (
        <div className="w-full max-w-md flex gap-2">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type footballer's full name..."
            className="flex-1 rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
            autoFocus
          />
          <button
            onClick={submitGuess}
            disabled={!guess.trim()}
            className="px-5 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            GUESS
          </button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-3"
          >
            {won ? (
              <>
                <div className="flex items-center justify-center gap-2 text-success">
                  <Trophy className="w-5 h-5" />
                  <span className="font-display text-lg">You got it!</span>
                </div>
                <p className="text-foreground font-display text-xl">{player.name}</p>
                <p className="text-muted-foreground text-sm">
                  Guessed in {guesses.length}/{MAX_GUESSES} tries with {revealedClues} clues
                </p>
              </>
            ) : (
              <>
                <p className="text-destructive font-display text-lg">Game Over</p>
                <p className="text-foreground font-display text-xl">{player.name}</p>
                <p className="text-muted-foreground text-sm">{player.funFact}</p>
              </>
            )}
            <p className="text-muted-foreground text-xs flex items-center justify-center gap-1">
              <RotateCcw className="w-3 h-3" /> New player tomorrow!
            </p>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Remaining guesses */}
      {!gameOver && (
        <p className="text-xs text-muted-foreground">
          {MAX_GUESSES - guesses.length} guesses remaining
        </p>
      )}
    </div>
  );
};

export default GuessPlayerGame;
