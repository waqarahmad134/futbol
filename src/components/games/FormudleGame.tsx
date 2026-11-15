import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDailyDriver, findDriver, F1_DRIVERS, F1Driver } from "@/data/formudle-drivers";
import { useToast } from "@/hooks/use-toast";
import { useLocalizedStrings, fmt } from "@/i18n/DictionaryContext";
import { recordDailyResult } from "@/lib/daily-score";
import { SITE_URL } from "@/lib/site";
import ShareResultButton from "@/components/ShareResultButton";
import { Check, X, Trophy, ArrowUp, ArrowDown, RotateCcw } from "lucide-react";

const MAX_GUESSES = 8;

// A numeric cell: exact value is green, otherwise gray with an arrow
// showing whether the answer is higher (later / more) or lower.
const NumericCell = ({ guessed, target, label, noWinYet }: { guessed: number | null; target: number | null; label: string; noWinYet: string }) => {
  const exact = guessed === target;
  const arrow =
    guessed === null || target === null ? null : target > guessed ? <ArrowUp className="w-3 h-3" /> : target < guessed ? <ArrowDown className="w-3 h-3" /> : null;
  return (
    <div
      className={`flex-1 min-w-0 rounded-lg border px-2 py-2 text-center ${
        exact ? "border-success/50 bg-success/10 text-success" : "border-border bg-muted/30 text-foreground"
      }`}
    >
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="flex items-center justify-center gap-1 font-display text-sm">
        {guessed === null ? noWinYet : guessed}
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

const FormudleGame = () => {
  const { toast } = useToast();
  const t = useLocalizedStrings("game.formudle", {
    intro:
      "Guess the Formula 1 driver. Green means an exact match. Arrows show whether the answer is higher or lower on debut year, titles and first win.",
    noWinYet: "No win yet",
    nation: "Nation",
    team: "Team",
    debut: "Debut",
    titles: "Titles",
    firstWin: "First win",
    notInListTitle: "Not in the list",
    notInListDesc: "Pick a driver from the suggestions",
    alreadyTitle: "Already guessed",
    alreadyDesc: "Try a different driver",
    correctTitle: "🎉 Correct!",
    correctDesc: "You identified {name}!",
    gameOverTitle: "Game Over",
    gameOverDesc: "It was {name}",
    wrongTitle: "❌ Not that driver",
    wrongDesc: "Check the green cells and arrows for clues",
    placeholder: "Type a driver name...",
    guess: "GUESS",
    winTitle: "You got it!",
    guessedIn: "Guessed in {n}/{max} tries - {team}, {titles} {titleWord}",
    titleSingular: "title",
    titlePlural: "titles",
    newTomorrow: "New driver tomorrow!",
    shareSolved: "✅ Solved",
    shareNotSolved: "❌ Not solved",
    shareIn: "in {n}/{max} guesses",
    remaining: "{n} guesses remaining - {total} drivers in the pool",
  });
  const [driver] = useState<F1Driver>(() => getDailyDriver());
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<F1Driver[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem("f11-formudle-state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.date === new Date().toDateString() && Array.isArray(parsed.guesses)) {
          const restored = parsed.guesses
            .map((name: string) => findDriver(name))
            .filter((d: F1Driver | undefined): d is F1Driver => Boolean(d));
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
      localStorage.setItem("f11-formudle-state", JSON.stringify({
        date: new Date().toDateString(),
        guesses: guesses.map((g) => g.name),
        gameOver,
        won,
      }));
    }
  }, [guesses, gameOver, won]);

  // Record the daily result once (guarded per game per day in the helper)
  useEffect(() => {
    if (gameOver) recordDailyResult("formudle", won);
  }, [gameOver, won]);

  const submitGuess = useCallback(() => {
    const picked = findDriver(guess);
    if (!picked) {
      toast({ title: t.notInListTitle, description: t.notInListDesc, variant: "destructive" });
      return;
    }
    if (guesses.some((g) => g.name === picked.name)) {
      toast({ title: t.alreadyTitle, description: t.alreadyDesc, variant: "destructive" });
      return;
    }

    const newGuesses = [...guesses, picked];
    setGuesses(newGuesses);
    setGuess("");

    if (picked.name === driver.name) {
      setGameOver(true);
      setWon(true);
      toast({ title: t.correctTitle, description: fmt(t.correctDesc, { name: driver.name }) });
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameOver(true);
      toast({ title: t.gameOverTitle, description: fmt(t.gameOverDesc, { name: driver.name }) });
    } else {
      toast({ title: t.wrongTitle, description: t.wrongDesc, variant: "destructive" });
    }
  }, [guess, guesses, driver, toast, t]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !gameOver) submitGuess();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-center text-sm text-muted-foreground max-w-md">
        {t.intro}
      </p>

      {/* Previous guesses */}
      {guesses.length > 0 && (
        <div className="w-full max-w-xl space-y-2">
          {guesses.map((g, i) => {
            const isCorrect = g.name === driver.name;
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
                  <TextCell value={g.nationality} match={g.nationality === driver.nationality} label={t.nation} />
                  <TextCell value={g.team} match={g.team === driver.team} label={t.team} />
                  <NumericCell guessed={g.debut} target={driver.debut} label={t.debut} noWinYet={t.noWinYet} />
                  <NumericCell guessed={g.titles} target={driver.titles} label={t.titles} noWinYet={t.noWinYet} />
                  <NumericCell guessed={g.firstWin} target={driver.firstWin} label={t.firstWin} noWinYet={t.noWinYet} />
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
            placeholder={t.placeholder}
            list="formudle-drivers"
            className="flex-1 rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
            autoFocus
          />
          <datalist id="formudle-drivers">
            {F1_DRIVERS.map((d) => (
              <option key={d.name} value={d.name} />
            ))}
          </datalist>
          <button
            onClick={submitGuess}
            disabled={!guess.trim()}
            className="px-5 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {t.guess}
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
                  <span className="font-display text-lg">{t.winTitle}</span>
                </div>
                <p className="text-foreground font-display text-xl">{driver.name}</p>
                <p className="text-muted-foreground text-sm">
                  {fmt(t.guessedIn, { n: guesses.length, max: MAX_GUESSES, team: driver.team, titles: driver.titles, titleWord: driver.titles === 1 ? t.titleSingular : t.titlePlural })}
                </p>
              </>
            ) : (
              <>
                <p className="text-destructive font-display text-lg">{t.gameOverTitle}</p>
                <p className="text-foreground font-display text-xl">{driver.name}</p>
                <p className="text-muted-foreground text-sm">{driver.funFact}</p>
              </>
            )}
            <p className="text-muted-foreground text-xs flex items-center justify-center gap-1">
              <RotateCcw className="w-3 h-3" /> {t.newTomorrow}
            </p>
            <ShareResultButton
              text={`Formudle\n${won ? t.shareSolved : t.shareNotSolved} ${fmt(t.shareIn, { n: guesses.length, max: MAX_GUESSES })}\nPlay: ${SITE_URL}/game/formudle`}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Remaining guesses */}
      {!gameOver && (
        <p className="text-xs text-muted-foreground">
          {fmt(t.remaining, { n: MAX_GUESSES - guesses.length, total: F1_DRIVERS.length })}
        </p>
      )}
    </div>
  );
};

export default FormudleGame;
