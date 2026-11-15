import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDailyWrestler, findWrestler, WRESTLERS, Wrestler } from "@/data/wrestleplay-wrestlers";
import { useToast } from "@/hooks/use-toast";
import { useLocalizedStrings, fmt } from "@/i18n/DictionaryContext";
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
  const t = useLocalizedStrings("game.wrestleplay", {
    intro:
      "Guess the wrestler. Green means an exact match. Arrows show whether the answer is higher or lower on debut year, height and world titles.",
    nation: "Nation",
    promotion: "Promotion",
    debut: "Debut",
    height: "Height",
    worldTitles: "World titles",
    notInListTitle: "Not in the list",
    notInListDesc: "Pick a wrestler from the suggestions",
    alreadyTitle: "Already guessed",
    alreadyDesc: "Try a different wrestler",
    correctTitle: "🎉 Correct!",
    correctDesc: "You identified {name}!",
    gameOverTitle: "Game Over",
    gameOverDesc: "It was {name}",
    wrongTitle: "❌ Not that wrestler",
    wrongDesc: "Check the green cells and arrows for clues",
    placeholder: "Type a wrestler name...",
    guess: "GUESS",
    winTitle: "You got it!",
    guessedIn: "Guessed in {n}/{max} tries - finisher: {finisher}, {titles} {titleWord}",
    titleSingular: "world title",
    titlePlural: "world titles",
    newTomorrow: "New wrestler tomorrow!",
    shareSolved: "✅ Solved",
    shareNotSolved: "❌ Not solved",
    shareIn: "in {n}/{max} guesses",
    remaining: "{n} guesses remaining - {total} wrestlers in the pool",
  });
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

    if (picked.name === wrestler.name) {
      setGameOver(true);
      setWon(true);
      toast({ title: t.correctTitle, description: fmt(t.correctDesc, { name: wrestler.name }) });
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameOver(true);
      toast({ title: t.gameOverTitle, description: fmt(t.gameOverDesc, { name: wrestler.name }) });
    } else {
      toast({ title: t.wrongTitle, description: t.wrongDesc, variant: "destructive" });
    }
  }, [guess, guesses, wrestler, toast, t]);

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
                  <TextCell value={g.nationality} match={g.nationality === wrestler.nationality} label={t.nation} />
                  <TextCell value={g.promotion} match={g.promotion === wrestler.promotion} label={t.promotion} />
                  <NumericCell guessed={g.debut} target={wrestler.debut} label={t.debut} />
                  <NumericCell guessed={g.heightCm} target={wrestler.heightCm} label={t.height} suffix="cm" />
                  <NumericCell guessed={g.worldTitles} target={wrestler.worldTitles} label={t.worldTitles} />
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
                <p className="text-foreground font-display text-xl">{wrestler.name}</p>
                <p className="text-muted-foreground text-sm">
                  {fmt(t.guessedIn, { n: guesses.length, max: MAX_GUESSES, finisher: wrestler.finisher, titles: wrestler.worldTitles, titleWord: wrestler.worldTitles === 1 ? t.titleSingular : t.titlePlural })}
                </p>
              </>
            ) : (
              <>
                <p className="text-destructive font-display text-lg">{t.gameOverTitle}</p>
                <p className="text-foreground font-display text-xl">{wrestler.name}</p>
                <p className="text-muted-foreground text-sm">{wrestler.funFact}</p>
              </>
            )}
            <p className="text-muted-foreground text-xs flex items-center justify-center gap-1">
              <RotateCcw className="w-3 h-3" /> {t.newTomorrow}
            </p>
            <ShareResultButton
              text={`WrestlePlay\n${won ? t.shareSolved : t.shareNotSolved} ${fmt(t.shareIn, { n: guesses.length, max: MAX_GUESSES })}\nPlay: ${SITE_URL}/game/wrestleplay`}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Remaining guesses */}
      {!gameOver && (
        <p className="text-xs text-muted-foreground">
          {fmt(t.remaining, { n: MAX_GUESSES - guesses.length, total: WRESTLERS.length })}
        </p>
      )}
    </div>
  );
};

export default WrestlePlayGame;
