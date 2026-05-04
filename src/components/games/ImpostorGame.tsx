import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, RotateCcw, Trophy, UserSearch } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getDailyRounds, ROUNDS_PER_DAY, ImpostorRound } from "@/data/impostor-rounds";
import { Progress } from "@/components/ui/progress";

const STORAGE_KEY = "f11-impostor-state";

interface SavedState {
  date: string;
  index: number;
  score: number;
  picks: (number | null)[];
  finished: boolean;
}

const ImpostorGame = () => {
  const { toast } = useToast();
  const rounds = useMemo<ImpostorRound[]>(() => getDailyRounds(), []);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState<(number | null)[]>(() => Array(ROUNDS_PER_DAY).fill(null));
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed: SavedState = JSON.parse(raw);
      if (parsed.date === new Date().toDateString()) {
        setIndex(parsed.index);
        setScore(parsed.score);
        setPicks(parsed.picks);
        setFinished(parsed.finished);
      }
    } catch {
      // ignore
    }
  }, []);

  const persist = useCallback((idx: number, sc: number, pks: (number | null)[], done: boolean) => {
    const state: SavedState = {
      date: new Date().toDateString(),
      index: idx,
      score: sc,
      picks: pks,
      finished: done,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, []);

  const round = rounds[index];

  const onPick = (i: number) => {
    if (revealed || finished) return;
    setRevealed(true);
    const correct = i === round.impostorIndex;
    const newPicks = [...picks];
    newPicks[index] = i;
    const newScore = correct ? score + 1 : score;
    setPicks(newPicks);
    setScore(newScore);

    toast({
      title: correct ? "✅ Spotted!" : "❌ Wrong",
      description: round.explanation,
      variant: correct ? "default" : "destructive",
    });

    setTimeout(() => {
      const nextIndex = index + 1;
      if (nextIndex >= ROUNDS_PER_DAY) {
        setFinished(true);
        persist(nextIndex, newScore, newPicks, true);
      } else {
        setIndex(nextIndex);
        setRevealed(false);
        persist(nextIndex, newScore, newPicks, false);
      }
    }, 1800);
  };

  if (finished) {
    const pct = Math.round((score / ROUNDS_PER_DAY) * 100);
    const grade = pct >= 80 ? "🕵️ Detective" : pct >= 60 ? "👀 Sharp eye" : pct >= 40 ? "🤔 Decent" : "📚 Study up";
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <span className="text-5xl">{pct >= 60 ? "🎉" : "💪"}</span>
        <h3 className="font-display text-2xl text-foreground">{grade}</h3>
        <p className="font-display text-3xl text-foreground">{score}/{ROUNDS_PER_DAY}</p>
        <div className="w-full max-w-sm">
          <Progress value={pct} className="h-3" />
        </div>
        <div className="w-full max-w-md space-y-2 mt-2">
          {rounds.map((r, i) => {
            const correct = picks[i] === r.impostorIndex;
            return (
              <div
                key={r.id}
                className={`rounded-lg border px-3 py-2 text-xs ${
                  correct
                    ? "border-success/30 bg-success/5"
                    : "border-destructive/30 bg-destructive/5"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {correct ? (
                    <CheckCircle className="w-3.5 h-3.5 text-success" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-destructive" />
                  )}
                  <span className="text-foreground">{r.trait}</span>
                </div>
                <span className="text-muted-foreground">Impostor: {r.players[r.impostorIndex]}</span>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <RotateCcw className="w-3 h-3" /> New rounds tomorrow!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="w-full max-w-md space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><UserSearch className="w-3 h-3" /> Round {index + 1}/{ROUNDS_PER_DAY}</span>
          <span className="flex items-center gap-1"><Trophy className="w-3 h-3 text-primary" /> Score: {score}</span>
        </div>
        <Progress value={(index / ROUNDS_PER_DAY) * 100} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={round.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="w-full max-w-md"
        >
          <div className="rounded-xl border border-border bg-muted/20 p-4 mb-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Three share this trait — one is the impostor</p>
            <p className="font-display text-foreground">{round.trait}</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {round.players.map((p, i) => {
              let cls = "border-border bg-card hover:bg-muted/40 hover:border-primary/40";
              if (revealed) {
                if (i === round.impostorIndex) cls = "border-success/60 bg-success/10 text-success";
                else if (i === picks[index] && i !== round.impostorIndex)
                  cls = "border-destructive/60 bg-destructive/10 text-destructive";
                else cls = "border-border/30 bg-muted/10 opacity-60";
              }
              return (
                <button
                  key={i}
                  onClick={() => onPick(i)}
                  disabled={revealed}
                  className={`rounded-lg border px-3 py-3 text-sm font-medium text-foreground transition-colors text-left ${cls}`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ImpostorGame;
