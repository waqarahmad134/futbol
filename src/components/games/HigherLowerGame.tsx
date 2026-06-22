import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Flame, Trophy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  getDailySequence,
  getDayIndex,
  isCorrectGuess,
  STAT_LABEL,
  Guess,
} from "@/data/higher-lower";

const STORAGE_KEY = "f11-higherlower-state";
const BEST_KEY = "f11-higherlower-best";

interface SavedState {
  day: number;
  index: number;
  streak: number;
  status: "playing" | "over";
}

const HigherLowerGame = () => {
  const { toast } = useToast();
  const seq = useMemo(() => getDailySequence(), []);
  const day = useMemo(() => getDayIndex(), []);

  const [index, setIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [status, setStatus] = useState<"playing" | "over">("playing");
  const [revealed, setRevealed] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

  const current = seq[index];
  const next = seq[index + 1];
  const hasNext = index + 1 < seq.length;

  // Restore today's run + all-time best streak.
  useEffect(() => {
    const rawBest = localStorage.getItem(BEST_KEY);
    if (rawBest) setBest(parseInt(rawBest, 10) || 0);

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed: SavedState = JSON.parse(raw);
      if (parsed.day === day) {
        setIndex(parsed.index);
        setStreak(parsed.streak);
        setStatus(parsed.status);
        if (parsed.status === "over") setRevealed(true);
      }
    } catch {
      // ignore
    }
  }, [day]);

  // Persist today's run.
  useEffect(() => {
    const state: SavedState = { day, index, streak, status };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [day, index, streak, status]);

  const recordBest = useCallback(
    (value: number) => {
      if (value > best) {
        setBest(value);
        localStorage.setItem(BEST_KEY, String(value));
      }
    },
    [best],
  );

  const handleGuess = useCallback(
    (guess: Guess) => {
      if (status !== "playing" || revealed || !hasNext) return;

      const correct = isCorrectGuess(current, next, guess);
      setRevealed(true);
      setLastCorrect(correct);

      window.setTimeout(() => {
        if (correct) {
          const newStreak = streak + 1;
          setStreak(newStreak);
          recordBest(newStreak);

          if (index + 2 < seq.length) {
            // Advance: the revealed "next" becomes the new "current".
            setIndex((i) => i + 1);
            setRevealed(false);
            setLastCorrect(null);
          } else {
            // Cleared the whole deck.
            setStatus("over");
            toast({ title: "🏆 Perfect run!", description: `You cleared all ${seq.length} players!` });
          }
        } else {
          setStatus("over");
          toast({
            title: "❌ Wrong!",
            description: `${next.name} had ${next.goals} ${STAT_LABEL.toLowerCase()}.`,
            variant: "destructive",
          });
        }
      }, 1200);
    },
    [status, revealed, hasNext, current, next, streak, index, seq.length, recordBest, toast],
  );

  const PlayerCard = ({
    name,
    country,
    goals,
    showGoals,
  }: {
    name: string;
    country: string;
    goals: number;
    showGoals: boolean;
  }) => (
    <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border border-border bg-muted/20 px-3 py-6 text-center">
      <span className="font-display text-base text-foreground leading-tight">{name}</span>
      <span className="text-xs text-muted-foreground">{country}</span>
      <span className="mt-2 text-[11px] uppercase tracking-wide text-muted-foreground">{STAT_LABEL}</span>
      {showGoals ? (
        <motion.span
          key={goals}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl text-primary"
        >
          {goals}
        </motion.span>
      ) : (
        <span className="font-display text-3xl text-muted-foreground">?</span>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="text-center">
        <h2 className="font-display text-foreground">Higher or Lower</h2>
        <p className="text-xs text-muted-foreground">
          Does the next player have more or fewer {STAT_LABEL.toLowerCase()}?
        </p>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span className="inline-flex items-center gap-1 text-foreground">
          <Flame className="w-4 h-4 text-primary" /> Streak {streak}
        </span>
        <span className="inline-flex items-center gap-1 text-muted-foreground">
          <Trophy className="w-4 h-4 text-primary" /> Best {best}
        </span>
      </div>

      <div className="flex w-full max-w-md items-stretch gap-3">
        <PlayerCard name={current.name} country={current.country} goals={current.goals} showGoals />
        <div className="flex items-center">
          <span className="font-display text-sm text-muted-foreground">vs</span>
        </div>
        {next ? (
          <PlayerCard
            name={next.name}
            country={next.country}
            goals={next.goals}
            showGoals={revealed}
          />
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-border bg-muted/20 px-3 py-6 text-center text-xs text-muted-foreground">
            End of the line!
          </div>
        )}
      </div>

      {status === "playing" && hasNext && (
        <div className="flex w-full max-w-md gap-3">
          <button
            onClick={() => handleGuess("higher")}
            disabled={revealed}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-success px-4 py-3 font-display text-sm text-primary-foreground transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
          >
            <ChevronUp className="w-4 h-4" /> Higher
          </button>
          <button
            onClick={() => handleGuess("lower")}
            disabled={revealed}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-destructive px-4 py-3 font-display text-sm text-destructive-foreground transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
          >
            <ChevronDown className="w-4 h-4" /> Lower
          </button>
        </div>
      )}

      <AnimatePresence>
        {lastCorrect !== null && status === "playing" && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`font-display text-sm ${lastCorrect ? "text-success" : "text-destructive"}`}
          >
            {lastCorrect ? "✅ Correct!" : "❌ Not quite"}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === "over" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="font-display text-lg text-foreground">
              Final streak: <span className="text-primary">{streak}</span>
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <RotateCcw className="w-3 h-3" /> New players tomorrow! Best streak: {best}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HigherLowerGame;
