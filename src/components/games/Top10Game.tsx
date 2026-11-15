import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Eye, RotateCcw, Trophy, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { recordDailyResult } from "@/lib/daily-score";
import { SITE_URL } from "@/lib/site";
import ShareResultButton from "@/components/ShareResultButton";
import { getDailyTop10 } from "@/data/top10-lists";
import { normaliseName } from "@/data/lineups";
import { useLocalizedStrings, fmt } from "@/i18n/DictionaryContext";

const STORAGE_KEY = "f11-top10-state";
const TIME_LIMIT = 120; // seconds

interface SavedState {
  listId: string;
  found: boolean[];
  timeLeft: number;
  finished: boolean;
}

const Top10Game = () => {
  const { toast } = useToast();
  const t = useLocalizedStrings("game.top10", {
    subtitle: "Name as many as you can in {n}s",
    notOnListTitle: "❌ Not on the list",
    notOnListDesc: "\"{value}\" isn't a top-10 name (or already found)",
    gotOneTitle: "✅ Got one!",
    fullListTitle: "🎉 Full list!",
    fullListDesc: "Solved with {n}s left",
    placeholder: "Type a name...",
    addButton: "ADD",
    giveUp: "Give up & reveal",
    newTomorrow: "New list tomorrow!",
    finalScore: "Final: {n}/{m}",
    shareFull: "✅ Full list",
    sharePartial: "❌ {n}/{m} found",
  });
  const list = useMemo(() => getDailyTop10(), []);
  const [found, setFound] = useState<boolean[]>(() => Array(list.items.length).fill(false));
  const [guess, setGuess] = useState("");
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [finished, setFinished] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed: SavedState = JSON.parse(raw);
      if (parsed.listId === list.id) {
        setFound(parsed.found);
        setTimeLeft(parsed.timeLeft);
        setFinished(parsed.finished);
      }
    } catch {
      // ignore
    }
  }, [list.id]);

  useEffect(() => {
    const state: SavedState = {
      listId: list.id,
      found,
      timeLeft,
      finished,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [list.id, found, timeLeft, finished]);

  // Record the daily result once (guarded per game per day in the helper).
  // Only naming all 10 is a win; time-out and give-up are losses.
  useEffect(() => {
    if (finished) recordDailyResult("futbol-top10", found.every(Boolean));
  }, [finished, found]);

  useEffect(() => {
    if (finished || revealed) return;
    if (timeLeft <= 0) {
      setFinished(true);
      return;
    }
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, finished, revealed]);

  const submit = useCallback(() => {
    const value = guess.trim();
    if (!value || finished) return;
    setGuess("");
    const norm = normaliseName(value);
    const idx = list.items.findIndex((it, i) => {
      if (found[i]) return false;
      if (normaliseName(it.name) === norm) return true;
      const last = normaliseName(it.name).split(" ").slice(-1)[0];
      if (last && last === norm) return true;
      return (it.aliases || []).some((a) => normaliseName(a) === norm);
    });
    if (idx === -1) {
      toast({ title: t.notOnListTitle, description: fmt(t.notOnListDesc, { value }), variant: "destructive" });
      return;
    }
    const next = [...found];
    next[idx] = true;
    setFound(next);
    toast({ title: t.gotOneTitle, description: list.items[idx].name });
    if (next.every(Boolean)) {
      setFinished(true);
      toast({ title: t.fullListTitle, description: fmt(t.fullListDesc, { n: timeLeft }) });
    }
  }, [guess, finished, list, found, toast, timeLeft, t]);

  const reveal = () => {
    setRevealed(true);
    setFinished(true);
  };

  const foundCount = found.filter(Boolean).length;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="text-center">
        <h2 className="font-display text-foreground">{list.title}</h2>
        <p className="text-xs text-muted-foreground">{fmt(t.subtitle, { n: TIME_LIMIT })}</p>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span className="inline-flex items-center gap-1 text-foreground">
          <Trophy className="w-4 h-4 text-primary" /> {foundCount}/{list.items.length}
        </span>
        <span
          className={`inline-flex items-center gap-1 font-mono ${
            timeLeft <= 15 ? "text-destructive" : "text-foreground"
          }`}
        >
          <Timer className="w-4 h-4" /> {String(mins).padStart(1, "0")}:{String(secs).padStart(2, "0")}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
        {list.items.map((item, i) => {
          const open = found[i] || revealed;
          return (
            <div
              key={i}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                found[i]
                  ? "border-success/40 bg-success/10 text-foreground"
                  : revealed
                  ? "border-destructive/30 bg-destructive/5 text-muted-foreground"
                  : "border-border bg-muted/20 text-muted-foreground"
              }`}
            >
              <span className="text-xs font-display text-muted-foreground w-5">#{i + 1}</span>
              <span className="flex-1">{open ? item.name : "??? ???"}</span>
              {found[i] && <Check className="w-4 h-4 text-success" />}
            </div>
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
            placeholder={t.placeholder}
            className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            autoFocus
          />
          <button
            onClick={submit}
            disabled={!guess.trim()}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {t.addButton}
          </button>
        </div>
      )}

      {!finished && (
        <button
          onClick={reveal}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-xs hover:bg-muted/50"
        >
          <Eye className="w-3.5 h-3.5" /> {t.giveUp}
        </button>
      )}

      <AnimatePresence>
        {finished && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> {t.newTomorrow} {fmt(t.finalScore, { n: foundCount, m: list.items.length })}
            </p>
            <ShareResultButton
              text={`Futbol11 Top 10, ${list.title}\n${found.every(Boolean) ? t.shareFull : fmt(t.sharePartial, { n: foundCount, m: list.items.length })}\nPlay: ${SITE_URL}/game/futbol-top10`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Top10Game;
