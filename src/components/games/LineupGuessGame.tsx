import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RotateCcw, Trophy, Lightbulb, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocalizedStrings, fmt } from "@/i18n/DictionaryContext";
import { recordDailyResult } from "@/lib/daily-score";
import { SITE_URL } from "@/lib/site";
import ShareResultButton from "@/components/ShareResultButton";
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

// Game page slug per lineup set, used for the daily-score record and share text.
const SLUG_BY_SET: Record<LineupSetKey, string> = {
  goltexto: "futbol11-goltexto",
  countries: "futbol11",
  legends: "futbol11-legends",
  america: "futbol11-america",
  euro2024: "futbol11-euro2024",
  copaamerica: "futbol11-copaamerica",
  worldcup: "futbol11-worldcup",
};

const LineupGuessGame = ({ setKey, storageKey }: LineupGuessGameProps) => {
  const t = useLocalizedStrings("game.lineup", {
    complete: "🎉 Lineup complete!",
    completeDesc: "{title} solved in {n} guesses.",
    notInXI: "❌ Not in this XI",
    noMatch: "\"{value}\" doesn't match an unplaced starter",
    correct: "✅ Correct!",
    hintUsed: "💡 Hint used",
    hintRevealed: "Revealed {name}",
    revealedTitle: "Lineup revealed",
    formation: "Formation: {value}",
    placeholder: "Type a player's name...",
    guess: "GUESS",
    found: "Found {n}/11",
    guesses: "Guesses: {n}",
    hints: "Hints: {n}/{max}",
    hint: "Hint",
    giveUp: "Give up",
    allNamed: "All 11 named!",
    betterLuck: "Better luck tomorrow.",
    newLineupTomorrow: "New lineup tomorrow!",
    shareAllNamed: "✅ All 11 named",
    shareNamed: "❌ {n}/11 named",
    shareGuesses: "in {n} guesses",
    sharePlay: "Play:",
  });
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
      toast({ title: t.complete, description: fmt(t.completeDesc, { title: lineup.title, n: guessCount }) });
    }
  }, [allFound, finished, guessCount, lineup.title, toast, t]);

  // Record the daily result once (guarded per game per day in the helper).
  // Finished via give-up counts as a loss; only all 11 found is a win.
  useEffect(() => {
    if (finished) recordDailyResult(`lineup-${setKey}`, allFound);
  }, [finished, allFound, setKey]);

  const submit = useCallback(() => {
    const value = guess.trim();
    if (!value || finished) return;
    setGuess("");
    setGuessCount((g) => g + 1);

    const matchIdx = lineup.players.findIndex(
      (p, i) => !found[i] && nameMatches(value, p.name)
    );
    if (matchIdx === -1) {
      toast({ title: t.notInXI, description: fmt(t.noMatch, { value }), variant: "destructive" });
      return;
    }
    const next = [...found];
    next[matchIdx] = true;
    setFound(next);
    toast({ title: t.correct, description: `${lineup.players[matchIdx].name} (${lineup.players[matchIdx].position})` });
  }, [guess, finished, lineup, found, toast, t]);

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
    toast({ title: t.hintUsed, description: fmt(t.hintRevealed, { name: pick.p.name }) });
  };

  const giveUp = () => {
    if (finished) return;
    setRevealed(true);
    setFinished(true);
    toast({ title: t.revealedTitle, description: `${lineup.title}` });
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="text-center">
        <h2 className="font-display text-lg text-foreground">{lineup.title}</h2>
        <p className="text-sm text-muted-foreground">{lineup.subtitle}</p>
        <p className="text-xs text-muted-foreground mt-1">{fmt(t.formation, { value: lineup.formation })}</p>
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
            placeholder={t.placeholder}
            className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            autoFocus
          />
          <button
            onClick={submit}
            disabled={!guess.trim()}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {t.guess}
          </button>
        </div>
      )}

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>{fmt(t.found, { n: found.filter(Boolean).length })}</span>
        <span>•</span>
        <span>{fmt(t.guesses, { n: guessCount })}</span>
        <span>•</span>
        <span>{fmt(t.hints, { n: hintsUsed, max: MAX_HINTS })}</span>
      </div>

      {!finished && (
        <div className="flex gap-2">
          <button
            onClick={useHint}
            disabled={hintsUsed >= MAX_HINTS}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-xs hover:bg-muted/50 disabled:opacity-50"
          >
            <Lightbulb className="w-3.5 h-3.5 text-primary" /> {t.hint}
          </button>
          <button
            onClick={giveUp}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-xs hover:bg-muted/50"
          >
            <Eye className="w-3.5 h-3.5 text-destructive" /> {t.giveUp}
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
                <span className="font-display">{t.allNamed}</span>
              </div>
            ) : (
              <p className="text-destructive font-display">{t.betterLuck}</p>
            )}
            <p className="text-xs text-muted-foreground">{lineup.context}</p>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <RotateCcw className="w-3 h-3" /> {t.newLineupTomorrow}
            </p>
            <div className="mt-2 flex justify-center">
              <ShareResultButton
                text={`Futbol11 Lineup, ${lineup.title}\n${allFound ? t.shareAllNamed : fmt(t.shareNamed, { n: found.filter(Boolean).length })} ${fmt(t.shareGuesses, { n: guessCount })}\n${t.sharePlay} ${SITE_URL}/game/${SLUG_BY_SET[setKey]}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LineupGuessGame;
