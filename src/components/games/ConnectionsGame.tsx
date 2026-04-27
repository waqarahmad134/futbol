import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RotateCcw, Trophy, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  getDailyConnections,
  shuffleItemsForPuzzle,
  ConnectionsGroup,
} from "@/data/connections-puzzles";

const STORAGE_KEY = "f11-connections-state";
const MAX_MISTAKES = 4;

interface SavedState {
  puzzleId: string;
  solved: ConnectionsGroup[];
  mistakes: number;
  finished: boolean;
  remaining: string[];
}

const difficultyClasses: Record<number, string> = {
  1: "bg-success/15 border-success/40 text-success",
  2: "bg-primary/15 border-primary/40 text-primary",
  3: "bg-accent/20 border-accent/40 text-accent",
  4: "bg-destructive/15 border-destructive/40 text-destructive",
};

const ConnectionsGame = () => {
  const { toast } = useToast();
  const puzzle = useMemo(() => getDailyConnections(), []);
  const [remaining, setRemaining] = useState<string[]>(() => shuffleItemsForPuzzle(puzzle));
  const [selected, setSelected] = useState<string[]>([]);
  const [solved, setSolved] = useState<ConnectionsGroup[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed: SavedState = JSON.parse(raw);
      if (parsed.puzzleId === puzzle.id) {
        setSolved(parsed.solved);
        setMistakes(parsed.mistakes);
        setFinished(parsed.finished);
        setRemaining(parsed.remaining);
      }
    } catch {
      // ignore
    }
  }, [puzzle.id]);

  useEffect(() => {
    const state: SavedState = {
      puzzleId: puzzle.id,
      solved,
      mistakes,
      finished,
      remaining,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [puzzle.id, solved, mistakes, finished, remaining]);

  const toggle = (item: string) => {
    if (finished) return;
    if (selected.includes(item)) {
      setSelected(selected.filter((s) => s !== item));
    } else if (selected.length < 4) {
      setSelected([...selected, item]);
    }
  };

  const submit = () => {
    if (selected.length !== 4 || finished) return;
    const matchingGroup = puzzle.groups.find((g) =>
      selected.every((s) => g.items.includes(s)) && g.items.every((i) => selected.includes(i))
    );
    if (matchingGroup) {
      const newSolved = [...solved, matchingGroup];
      const newRemaining = remaining.filter((r) => !selected.includes(r));
      setSolved(newSolved);
      setRemaining(newRemaining);
      setSelected([]);
      toast({ title: "🎉 Group found!", description: matchingGroup.category });
      if (newSolved.length === 4) {
        setFinished(true);
      }
      return;
    }
    // Check if 3 of 4 are from the same group ("one away")
    const counts = puzzle.groups.map((g) => selected.filter((s) => g.items.includes(s)).length);
    const oneAway = counts.includes(3);
    const newMistakes = mistakes + 1;
    setMistakes(newMistakes);
    toast({
      title: oneAway ? "❌ One away" : "❌ Not a group",
      description: oneAway ? "Three of those share a connection" : "Try a different combination",
      variant: "destructive",
    });
    setSelected([]);
    if (newMistakes >= MAX_MISTAKES) {
      setFinished(true);
    }
  };

  const shuffle = () => {
    const arr = [...remaining];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setRemaining(arr);
  };

  const lostUnsolved = puzzle.groups.filter((g) => !solved.some((s) => s.category === g.category));
  const mistakeDots = Array.from({ length: MAX_MISTAKES }).map((_, i) => i < mistakes);

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-center text-sm text-muted-foreground max-w-md">
        Group the 16 football items into 4 categories of 4. You have {MAX_MISTAKES - mistakes} mistake{MAX_MISTAKES - mistakes === 1 ? "" : "s"} left.
      </p>

      {/* Solved groups */}
      <AnimatePresence>
        <div className="w-full max-w-md flex flex-col gap-2">
          {solved.map((g) => (
            <motion.div
              key={g.category}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-lg border px-3 py-2 ${difficultyClasses[g.difficulty]}`}
            >
              <p className="text-xs font-display uppercase tracking-wider">{g.category}</p>
              <p className="text-sm text-foreground">{g.items.join(" • ")}</p>
            </motion.div>
          ))}
          {finished &&
            solved.length < 4 &&
            lostUnsolved.map((g) => (
              <div
                key={g.category}
                className={`rounded-lg border px-3 py-2 opacity-60 ${difficultyClasses[g.difficulty]}`}
              >
                <p className="text-xs font-display uppercase tracking-wider">{g.category}</p>
                <p className="text-sm text-foreground">{g.items.join(" • ")}</p>
              </div>
            ))}
        </div>
      </AnimatePresence>

      {/* Remaining items */}
      {!finished && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-md">
          {remaining.map((item) => {
            const isSelected = selected.includes(item);
            return (
              <button
                key={item}
                onClick={() => toggle(item)}
                className={`rounded-md border px-2 py-3 text-xs sm:text-sm font-medium text-foreground transition-all ${
                  isSelected
                    ? "border-primary bg-primary/15"
                    : "border-border bg-card hover:bg-muted/40"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      )}

      {/* Controls */}
      {!finished && (
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Mistakes:</span>
            <div className="flex gap-1">
              {mistakeDots.map((m, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${m ? "bg-destructive" : "bg-muted"}`}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={shuffle}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-xs hover:bg-muted/50"
            >
              <Shuffle className="w-3.5 h-3.5" /> Shuffle
            </button>
            <button
              onClick={() => setSelected([])}
              disabled={!selected.length}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-xs hover:bg-muted/50 disabled:opacity-50"
            >
              Deselect all
            </button>
            <button
              onClick={submit}
              disabled={selected.length !== 4}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-4 py-1.5 text-xs font-display hover:bg-primary/90 disabled:opacity-40"
            >
              Submit ({selected.length}/4)
            </button>
          </div>
        </div>
      )}

      {finished && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-1">
          {solved.length === 4 ? (
            <div className="flex items-center justify-center gap-2 text-success">
              <Trophy className="w-5 h-5" />
              <span className="font-display">All 4 groups solved!</span>
            </div>
          ) : (
            <p className="text-destructive font-display">Out of mistakes</p>
          )}
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <RotateCcw className="w-3 h-3" /> New connections tomorrow!
          </p>
        </motion.div>
      )}

      {!finished && solved.length === 0 && (
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Check className="w-3 h-3" /> Tap 4 items, then Submit
        </p>
      )}
    </div>
  );
};

export default ConnectionsGame;
