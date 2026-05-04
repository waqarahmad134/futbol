import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Trophy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getDailyGrid } from "@/data/grid-puzzles";
import { normaliseName } from "@/data/lineups";

const STORAGE_KEY = "f11-grid-state";
const MAX_GUESSES = 9;

interface SavedState {
  puzzleId: string;
  cells: (string | null)[][];
  guessesUsed: number;
  finished: boolean;
}

const GridGame = () => {
  const { toast } = useToast();
  const puzzle = useMemo(() => getDailyGrid(), []);
  const [cells, setCells] = useState<(string | null)[][]>(() =>
    Array.from({ length: 3 }, () => Array(3).fill(null))
  );
  const [guessesUsed, setGuessesUsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const [active, setActive] = useState<{ r: number; c: number } | null>(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed: SavedState = JSON.parse(raw);
      if (parsed.puzzleId === puzzle.id) {
        setCells(parsed.cells);
        setGuessesUsed(parsed.guessesUsed);
        setFinished(parsed.finished);
      }
    } catch {
      // ignore
    }
  }, [puzzle.id]);

  useEffect(() => {
    const state: SavedState = {
      puzzleId: puzzle.id,
      cells,
      guessesUsed,
      finished,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [puzzle.id, cells, guessesUsed, finished]);

  const filledCount = cells.flat().filter(Boolean).length;
  const remainingGuesses = MAX_GUESSES - guessesUsed;

  const submit = useCallback(() => {
    if (!active || finished) return;
    const value = draft.trim();
    if (!value) return;
    const accepted = puzzle.cells[active.r][active.c];
    const norm = normaliseName(value);
    const ok = accepted.some((a) => normaliseName(a) === norm);

    setGuessesUsed((g) => g + 1);

    if (ok) {
      const next = cells.map((row) => [...row]);
      next[active.r][active.c] = value;
      setCells(next);
      toast({ title: "✅ Goal!", description: `${value} fits ${puzzle.rows[active.r]} × ${puzzle.cols[active.c]}` });
    } else {
      toast({ title: "❌ Off target", description: `${value} doesn't satisfy that pairing`, variant: "destructive" });
    }

    setActive(null);
    setDraft("");

    const totalUsed = guessesUsed + 1;
    const allFilled = cells.flat().filter(Boolean).length + (ok ? 1 : 0) === 9;
    if (allFilled || totalUsed >= MAX_GUESSES) setFinished(true);
  }, [active, draft, finished, puzzle, cells, guessesUsed, toast]);

  if (finished) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-foreground">
          {filledCount === 9 ? (
            <>
              <Trophy className="w-5 h-5 text-success" />
              <span className="font-display">Grid complete!</span>
            </>
          ) : (
            <span className="font-display text-destructive">Out of guesses</span>
          )}
        </div>
        <p className="text-foreground font-display text-3xl">{filledCount}/9</p>
        <GridDisplay puzzle={puzzle} cells={cells} disabled />
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <RotateCcw className="w-3 h-3" /> New grid tomorrow!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="text-center">
        <h3 className="font-display text-foreground">Pick a player who satisfies both row and column.</h3>
        <p className="text-xs text-muted-foreground">Guesses left: {remainingGuesses} • Filled: {filledCount}/9</p>
      </div>

      <GridDisplay puzzle={puzzle} cells={cells} onPick={(r, c) => setActive({ r, c })} active={active} />

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md flex flex-col gap-2"
          >
            <p className="text-center text-sm text-muted-foreground">
              <span className="text-foreground">{puzzle.rows[active.r]}</span> × <span className="text-foreground">{puzzle.cols[active.c]}</span>
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Player name..."
                autoFocus
                className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                onClick={submit}
                disabled={!draft.trim()}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                GUESS
              </button>
              <button
                onClick={() => {
                  setActive(null);
                  setDraft("");
                }}
                className="px-3 py-2 rounded-lg border border-border bg-muted/30 text-foreground text-sm hover:bg-muted/50"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface GridDisplayProps {
  puzzle: ReturnType<typeof getDailyGrid>;
  cells: (string | null)[][];
  onPick?: (r: number, c: number) => void;
  active?: { r: number; c: number } | null;
  disabled?: boolean;
}

const GridDisplay = ({ puzzle, cells, onPick, active, disabled }: GridDisplayProps) => {
  return (
    <div className="grid grid-cols-[80px_repeat(3,1fr)] gap-1 w-full max-w-md">
      <div />
      {puzzle.cols.map((c, i) => (
        <div key={`col-${i}`} className="rounded-md bg-muted/30 px-2 py-2 text-center text-xs font-display text-foreground">
          {c}
        </div>
      ))}
      {puzzle.rows.flatMap((r, ri) => [
        <div
          key={`row-${ri}`}
          className="rounded-md bg-muted/30 px-2 py-2 text-xs font-display text-foreground flex items-center justify-center"
        >
          {r}
        </div>,
        ...Array.from({ length: 3 }).map((_, ci) => {
          const filled = cells[ri][ci];
          const isActive = active?.r === ri && active?.c === ci;
          return (
            <button
              key={`cell-${ri}-${ci}`}
              disabled={disabled || !!filled}
              onClick={() => onPick?.(ri, ci)}
              className={`aspect-square rounded-md border text-[11px] sm:text-xs flex items-center justify-center text-center px-1 transition-colors ${
                filled
                  ? "border-success/50 bg-success/10 text-success"
                  : isActive
                  ? "border-primary bg-primary/15 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-muted/40"
              }`}
            >
              {filled ? (
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" /> {filled}
                </span>
              ) : disabled ? (
                <X className="w-4 h-4 text-destructive/60" />
              ) : (
                "+"
              )}
            </button>
          );
        }),
      ])}
    </div>
  );
};

export default GridGame;
