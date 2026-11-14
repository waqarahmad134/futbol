import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDailyWrestler, findWrestler, WRESTLERS, Wrestler } from "@/data/wrestleplay-wrestlers";
import { useToast } from "@/hooks/use-toast";
import { recordDailyResult } from "@/lib/daily-score";
import { SITE_URL } from "@/lib/site";
import ShareResultButton from "@/components/ShareResultButton";
import { Check, X, Trophy, ArrowUp, ArrowDown, RotateCcw } from "lucide-react";

const MAX_GUESSES = 8;

// A numeric cell: exact value is green, otherwise gray with an arrow
// showing whether the answer is higher (later / taller / more) or lower.
const NumericCell = ({ guessed, target, label, suffix = "" }: { guessed: number; target: number; label: string; suffix?: string }) => {
  const exact = guessed === target;
  const arrow =
    target > guessed ? <ArrowUp className="w-3 h-3" /> : target < guessed ? <ArrowDown className="w-3 h-3" /> : null;
  return (
    <div
      className={`flex-1 min-w-0 rounded-lg border px-2 py-2 text-center ${
        exact ? "border-success/50 bg-success/10 text-success" : "border-border bg-muted/30 text-foreground"
      }`}
    >
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="flex items-center justify-center gap-1 font-display text-sm">
        {guessed}
        {suffix}
        {arrow}
      </div>
    </div>
  );
};

const TextCell = ({ value, match, label }: { value: string; match: boolean; label: string }) => (
  <div
    className={`flex-1 min-w-0 rounded-lg border px-2 py-2 text-center ${
      match ? "border-success/50 bg-success/10 text-success" : "border-border bg-muted/30 text-foreground"
    }`}
  >
    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    <div className="font-display text-sm truncate">{value}</div>
  </div>
);

const WrestlePlayGame = () => {
  const { toast } = useToast();
  const [wrestler] = useState<Wrestler>(() => getDailyWrestler());
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<Wrestler[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem("f11-wrestleplay-state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.date === new Date().toDateString() && Array.isArray(parsed.guesses)) {
          const restored = parsed.guesses
            .map((name: string) => findWrestler(name))
            .filter((w: Wrestler | undefined): w is Wrestler => Boolean(w));
          setGuesses(restored);
          setGameOver(parsed.gameOver);
          setWon(parsed.won);
        }
      } catch {
        // Corrupt save; start fresh.
      }
    }
  }, []);

  // Save state
  useEffect(() => {
    if (guesses.length > 0 || gameOver) {
      localStorage.setItem("f11-wrestleplay-state", JSON.stringify({
        date: new Date().toDateString(),
        guesses: guesses.map((g) => g.name),
        gameOver,
        won,
      }));
    }
  }, [guesses, gameOver, won]);

  // Record the daily result once (guarded per game per day in the helper)
  useEffect(() => {
    if (gameOver) recordDailyResult("wrestleplay", won);
  }, [gameOver, won]);

  const submitGuess = useCallback(() => {
    const picked = findWrestler(guess);
    if (!picked) {
      toast({ title: "Not in the list", description: "Pick a wrestler from the suggestions", variant: "destructive" });
      return;
    }
    if (guesses.some((g) => g.name === picked.name)) {
      toast({ title: "Already guessed", description: "Try a different wrestler", variant: "destructive" });
      return;
    }

    const newGuesses = [...guesses, picked];
    setGuesses(newGuesses);
    setGuess("");

    if (picked.name === wrestler.name) {
      setGameOver(true);
      setWon(true);
      toast({ title: "🎉 Correct!", description: `You identified ${wrestler.name}!` });
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameOver(true);
      toast({ title: "Game Over", description: `It was ${wrestler.name}` });
    } else {
      toast({ title: "❌ Not that wrestler", description: "Check the green cells and arrows for clues", variant: "destructive" });
    }
  }, [guess, guesses, wrestler, toast]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !gameOver) submitGuess();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-center text-sm text-muted-foreground max-w-md">
        Guess the wrestler. Green means an exact match. Arrows show whether the answer is
        higher or lower on debut year, height and world titles.
      </p>

      {/* Previous guesses */}
      {guesses.length > 0 && (
        <div className="w-full max-w-xl space-y-2">
          {guesses.map((g, i) => {
            const isCorrect = g.name === wrestler.name;
            return (
              <motion.div
                key={g.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-1"
              >
                <div className={`flex items-center gap-2 text-sm font-display ${isCorrect ? "text-success" : "text-foreground"}`}>
                  {isCorrect ? <Check className="w-4 h-4 text-success" /> : <X className="w-4 h-4 text-destructive" />}
                  <span>{g.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">#{i + 1}</span>
                </div>
                <div className="flex gap-1.5">
                  <TextCell value={g.nationality} match={g.nationality === wrestler.nationality} label="Nation" />
                  <TextCell value={g.promotion} match={g.promotion === wrestler.promotion} label="Promotion" />
                  <NumericCell guessed={g.debut} target={wrestler.debut} label="Debut" />
                  <NumericCell guessed={g.heightCm} target={wrestler.heightCm} label="Height" suffix="cm" />
                  <NumericCell guessed={g.worldTitles} target={wrestler.worldTitles} label="World titles" />
                </div>
              </motion.div>
            );
          })}
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
            placeholder="Type a wrestler name..."
            list="wrestleplay-wrestlers"
            className="flex-1 rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
            autoFocus
          />
          <datalist id="wrestleplay-wrestlers">
            {WRESTLERS.map((w) => (
              <option key={w.name} value={w.name} />
            ))}
          </datalist>
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
                <p className="text-foreground font-display text-xl">{wrestler.name}</p>
                <p className="text-muted-foreground text-sm">
                  Guessed in {guesses.length}/{MAX_GUESSES} tries - finisher: {wrestler.finisher}, {wrestler.worldTitles}{" "}
                  {wrestler.worldTitles === 1 ? "world title" : "world titles"}
                </p>
              </>
            ) : (
              <>
                <p className="text-destructive font-display text-lg">Game Over</p>
                <p className="text-foreground font-display text-xl">{wrestler.name}</p>
                <p className="text-muted-foreground text-sm">{wrestler.funFact}</p>
              </>
            )}
            <p className="text-muted-foreground text-xs flex items-center justify-center gap-1">
              <RotateCcw className="w-3 h-3" /> New wrestler tomorrow!
            </p>
            <ShareResultButton
              text={`WrestlePlay\n${won ? "✅ Solved" : "❌ Not solved"} in ${guesses.length}/${MAX_GUESSES} guesses\nPlay: ${SITE_URL}/game/wrestleplay`}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Remaining guesses */}
      {!gameOver && (
        <p className="text-xs text-muted-foreground">
          {MAX_GUESSES - guesses.length} guesses remaining - {WRESTLERS.length} wrestlers in the pool
        </p>
      )}
    </div>
  );
};

export default WrestlePlayGame;
