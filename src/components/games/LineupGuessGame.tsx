import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RotateCcw, Trophy, Lightbulb, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getDailyLineup, lineupSets, nameMatches } from "@/data/lineups";

type LineupSetKey = keyof typeof lineupSets;

interface LineupGuessGameProps {
  setKey: LineupSetKey;
  storageKey: string;
}

interface SavedState {
  lineupId: string;
  found: boolean[];
  hintsUsed: number;
  guessCount: number;
  finished: boolean;
}

const MAX_HINTS = 3;

const LineupGuessGame = ({ setKey, storageKey }: LineupGuessGameProps) => {
  const { toast } = useToast();
  const lineup = useMemo(() => getDailyLineup(setKey), [setKey]);
  const [found, setFound] = useState<boolean[]>(() => Array(11).fill(false));
  const [hintsUsed, setHintsUsed] = useState(0);
  const [guessCount, setGuessCount] = useState(0);
  const [guess, setGuess] = useState("");
  const [finished, setFinished] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return;
    try {
      const parsed: SavedState = JSON.parse(saved);
      if (parsed.lineupId === lineup.id) {
        setFound(parsed.found);
        setHintsUsed(parsed.hintsUsed);
        setGuessCount(parsed.guessCount);
        setFinished(parsed.finished);
      }
    } catch {
      // ignore
    }
  }, [storageKey, lineup.id]);

  useEffect(() => {
    const state: SavedState = { lineupId: lineup.id, found, hintsUsed, guessCount, finished };
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [storageKey, lineup.id, found, hintsUsed, guessCount, finished]);

  const allFound = found.every(Boolean);

  useEffect(() => {
    if (allFound && !finished) {
      setFinished(true);
      toast({ title: "🎉 Lineup complete!", description: `${lineup.title} solved in ${guessCount} guesses.` });
    }
  }, [allFound, finished, guessCount, lineup.title, toast]);

  const submit = useCallback(() => {
    const value = guess.trim();
    if (!value || finished) return;
    setGuess("");
    setGuessCount((g) => g + 1);

    const matchIdx = lineup.players.findIndex(
      (p, i) => !found[i] && nameMatches(value, p.name)
    );
    if (matchIdx === -1) {
      toast({ title: "❌ Not in this XI", description: `"${value}" doesn't match an unplaced starter`, variant: "destructive" });
      return;
    }
    const next = [...found];
    next[matchIdx] = true;
    setFound(next);
    toast({ title: "✅ Correct!", description: `${lineup.players[matchIdx].name} (${lineup.players[matchIdx].position})` });
  }, [guess, finished, lineup, found, toast]);

  const useHint = () => {
    if (hintsUsed >= MAX_HINTS || finished) return;
    const remaining = lineup.players
      .map((p, i) => ({ p, i }))
      .filter(({ i }) => !found[i]);
    if (remaining.length === 0) return;
    const pick = remaining[Math.floor(Math.random() * remaining.length)];
    const next = [...found];
    next[pick.i] = true;
    setFound(next);
    setHintsUsed((h) => h + 1);
    toast({ title: "💡 Hint used", description: `Revealed ${pick.p.name}` });
  };

  const giveUp = () => {
    if (finished) return;
    setRevealed(true);
    setFinished(true);
    toast({ title: "Lineup revealed", description: `${lineup.title}` });
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="text-center">
        <h2 className="font-display text-lg text-foreground">{lineup.title}</h2>
        <p className="text-sm text-muted-foreground">{lineup.subtitle}</p>
        <p className="text-xs text-muted-foreground mt-1">Formation: {lineup.formation}</p>
      </div>

      <div className="w-full max-w-md grid grid-cols-1 gap-2">
        {lineup.players.map((player, i) => {
          const isFound = found[i];
          const showName = isFound || revealed;
          return (
            <motion.div
              key={i}
              initial={false}
              animate={isFound ? { scale: [1, 1.04, 1] } : {}}
              transition={{ duration: 0.4 }}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${
                isFound
                  ? "border-success/40 bg-success/5"
                  : revealed
                  ? "border-destructive/30 bg-destructive/5"
                  : "border-border bg-muted/20"
              }`}
            >
              <span className="w-12 text-xs font-display text-primary">{player.position}</span>
              <span
                className={`flex-1 text-sm ${
                  showName ? "text-foreground font-medium" : "text-muted-foreground italic"
                }`}
              >
                {showName ? player.name : "??? ???"}
              </span>
              {isFound && <Check className="w-4 h-4 text-success flex-shrink-0" />}
              {!isFound && revealed && <Eye className="w-4 h-4 text-destructive flex-shrink-0" />}
            </motion.div>
          );
        })}
      </div>

      {!finished && (
        <div className="w-full max-w-md flex gap-2">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Type a player's name..."
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

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>Found {found.filter(Boolean).length}/11</span>
        <span>•</span>
        <span>Guesses: {guessCount}</span>
        <span>•</span>
        <span>Hints: {hintsUsed}/{MAX_HINTS}</span>
      </div>

      {!finished && (
        <div className="flex gap-2">
          <button
            onClick={useHint}
            disabled={hintsUsed >= MAX_HINTS}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-xs hover:bg-muted/50 disabled:opacity-50"
          >
            <Lightbulb className="w-3.5 h-3.5 text-primary" /> Hint
          </button>
          <button
            onClick={giveUp}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-xs hover:bg-muted/50"
          >
            <Eye className="w-3.5 h-3.5 text-destructive" /> Give up
          </button>
        </div>
      )}

      <AnimatePresence>
        {finished && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2 max-w-md"
          >
            {allFound ? (
              <div className="flex items-center justify-center gap-2 text-success">
                <Trophy className="w-5 h-5" />
                <span className="font-display">All 11 named!</span>
              </div>
            ) : (
              <p className="text-destructive font-display">Better luck tomorrow.</p>
            )}
            <p className="text-xs text-muted-foreground">{lineup.context}</p>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <RotateCcw className="w-3 h-3" /> New lineup tomorrow!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LineupGuessGame;
