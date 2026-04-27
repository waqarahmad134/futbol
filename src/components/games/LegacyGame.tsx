import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Trophy, RotateCcw, ScrollText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getDailyLegend } from "@/data/legacy-legends";
import { nameMatches } from "@/data/lineups";

const STORAGE_KEY = "f11-legacy-state";
const MAX_GUESSES = 5;

interface SavedState {
  name: string;
  guesses: string[];
  cluesShown: number;
  finished: boolean;
  won: boolean;
}

const LegacyGame = () => {
  const { toast } = useToast();
  const legend = useMemo(() => getDailyLegend(), []);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [cluesShown, setCluesShown] = useState(1);
  const [finished, setFinished] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed: SavedState = JSON.parse(raw);
      if (parsed.name === legend.name) {
        setGuesses(parsed.guesses);
        setCluesShown(parsed.cluesShown);
        setFinished(parsed.finished);
        setWon(parsed.won);
      }
    } catch {
      // ignore
    }
  }, [legend.name]);

  useEffect(() => {
    const state: SavedState = { name: legend.name, guesses, cluesShown, finished, won };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [legend.name, guesses, cluesShown, finished, won]);

  const submit = useCallback(() => {
    const value = guess.trim();
    if (!value || finished) return;
    setGuess("");
    const correct = nameMatches(value, legend.name);
    const next = [...guesses, value];
    setGuesses(next);

    if (correct) {
      setFinished(true);
      setWon(true);
      toast({ title: "🎉 Got it!", description: `${legend.name} — ${next.length} guess${next.length > 1 ? "es" : ""}` });
      return;
    }

    if (next.length >= MAX_GUESSES) {
      setFinished(true);
      toast({ title: "Out of guesses", description: `It was ${legend.name}`, variant: "destructive" });
      return;
    }

    setCluesShown((c) => Math.min(c + 1, legend.clues.length));
    toast({ title: "❌ Wrong", description: "Another clue revealed", variant: "destructive" });
  }, [guess, finished, legend, guesses, toast]);

  const remaining = MAX_GUESSES - guesses.length;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-center gap-2 text-foreground">
        <ScrollText className="w-5 h-5 text-primary" />
        <h3 className="font-display text-lg">Career Clues</h3>
      </div>

      <div className="w-full max-w-md space-y-2">
        {legend.clues.map((clue, i) => {
          const open = i < cluesShown || finished;
          return (
            <motion.div
              key={i}
              initial={false}
              animate={{ opacity: open ? 1 : 0.35, y: 0 }}
              className={`rounded-lg border px-3 py-2 text-sm flex gap-3 items-start ${
                open ? "border-border bg-muted/20 text-foreground" : "border-border/30 bg-muted/10 text-muted-foreground"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center font-display flex-shrink-0">
                {i + 1}
              </span>
              <span>{open ? clue : `Clue ${i + 1} — guess wrong to reveal`}</span>
            </motion.div>
          );
        })}
      </div>

      {guesses.length > 0 && (
        <div className="w-full max-w-md space-y-1.5">
          {guesses.map((g, i) => {
            const correct = nameMatches(g, legend.name);
            return (
              <div
                key={i}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                  correct
                    ? "border-success/40 bg-success/10 text-success"
                    : "border-destructive/30 bg-destructive/5 text-muted-foreground"
                }`}
              >
                {correct ? <Check className="w-4 h-4 text-success" /> : <X className="w-4 h-4 text-destructive" />}
                <span>{g}</span>
              </div>
            );
          })}
        </div>
      )}

      {!finished && (
        <div className="w-full max-w-md flex gap-2">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Name the legend..."
            className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            autoFocus
          />
          <button
            onClick={submit}
            disabled={!guess.trim()}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            GUESS
          </button>
        </div>
      )}

      {!finished && (
        <p className="text-xs text-muted-foreground">{remaining} guess{remaining === 1 ? "" : "es"} remaining</p>
      )}

      <AnimatePresence>
        {finished && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2"
          >
            {won ? (
              <div className="flex items-center justify-center gap-2 text-success">
                <Trophy className="w-5 h-5" />
                <span className="font-display">Solved!</span>
              </div>
            ) : (
              <p className="text-destructive font-display">Out of guesses</p>
            )}
            <p className="font-display text-foreground">{legend.name}</p>
            <p className="text-xs text-muted-foreground max-w-sm">{legend.funFact}</p>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <RotateCcw className="w-3 h-3" /> New legend tomorrow!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LegacyGame;
