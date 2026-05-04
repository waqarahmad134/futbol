import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw, Trophy, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getDailyClub, ClubEntry } from "@/data/clubs";
import { normaliseName } from "@/data/lineups";

const STORAGE_KEY = "f11-clubs-state";
const MAX_GUESSES = 5;

interface SavedState {
  name: string;
  guesses: string[];
  cluesShown: number;
  finished: boolean;
  won: boolean;
}

const ClubBadge = ({ club, blur }: { club: ClubEntry; blur: number }) => {
  const renderShape = () => {
    if (club.shape === "stripes") {
      return (
        <div className="absolute inset-0 flex">
          <div className="flex-1" style={{ background: club.primaryColor }} />
          <div className="flex-1" style={{ background: club.secondaryColor }} />
          <div className="flex-1" style={{ background: club.primaryColor }} />
          <div className="flex-1" style={{ background: club.secondaryColor }} />
          <div className="flex-1" style={{ background: club.primaryColor }} />
        </div>
      );
    }
    if (club.shape === "halves") {
      return (
        <div className="absolute inset-0 flex">
          <div className="flex-1" style={{ background: club.primaryColor }} />
          <div className="flex-1" style={{ background: club.secondaryColor }} />
        </div>
      );
    }
    if (club.shape === "hoops") {
      return (
        <div className="absolute inset-0 flex flex-col">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex-1"
              style={{ background: i % 2 === 0 ? club.primaryColor : club.secondaryColor }}
            />
          ))}
        </div>
      );
    }
    if (club.shape === "diagonal") {
      return (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${club.primaryColor} 0%, ${club.primaryColor} 50%, ${club.secondaryColor} 50%, ${club.secondaryColor} 100%)`,
          }}
        />
      );
    }
    // solid
    return (
      <div className="absolute inset-0" style={{ background: club.primaryColor }}>
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6"
          style={{ background: club.secondaryColor }}
        />
      </div>
    );
  };

  return (
    <motion.div
      animate={{ filter: `blur(${blur}px)` }}
      transition={{ duration: 0.5 }}
      className="relative w-44 h-44 rounded-full border-4 border-border overflow-hidden shadow-xl"
    >
      {renderShape()}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-display text-3xl"
          style={{ color: club.secondaryColor === "hsl(0 0% 100%)" ? "hsl(0 0% 10%)" : "hsl(0 0% 100%)" }}
        >
          {club.initials}
        </span>
      </div>
    </motion.div>
  );
};

const ClubsGame = () => {
  const { toast } = useToast();
  const club = useMemo(() => getDailyClub(), []);
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
      if (parsed.name === club.name) {
        setGuesses(parsed.guesses);
        setCluesShown(parsed.cluesShown);
        setFinished(parsed.finished);
        setWon(parsed.won);
      }
    } catch {
      // ignore
    }
  }, [club.name]);

  useEffect(() => {
    const state: SavedState = { name: club.name, guesses, cluesShown, finished, won };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [club.name, guesses, cluesShown, finished, won]);

  const remaining = MAX_GUESSES - guesses.length;
  const blur = won || finished ? 0 : Math.max(0, 16 - cluesShown * 4);

  const submit = useCallback(() => {
    const value = guess.trim();
    if (!value || finished) return;
    setGuess("");
    const norm = normaliseName(value);
    const ok = club.acceptedAnswers.some((a) => normaliseName(a) === norm);
    const next = [...guesses, value];
    setGuesses(next);
    if (ok) {
      setFinished(true);
      setWon(true);
      toast({ title: "🛡️ Correct!", description: club.name });
      return;
    }
    if (next.length >= MAX_GUESSES) {
      setFinished(true);
      toast({ title: "Game over", description: `It was ${club.name}`, variant: "destructive" });
      return;
    }
    setCluesShown((c) => Math.min(c + 1, club.clues.length));
    toast({ title: "❌ Wrong club", description: "More of the badge is now visible", variant: "destructive" });
  }, [guess, finished, club, guesses, toast]);

  return (
    <div className="flex flex-col items-center gap-5">
      <ClubBadge club={club} blur={blur} />

      <div className="w-full max-w-md space-y-2">
        {club.clues.map((c, i) => {
          const open = i < cluesShown || finished;
          return (
            <div
              key={i}
              className={`rounded-lg border px-3 py-2 text-sm ${
                open ? "border-border bg-muted/20 text-foreground" : "border-border/30 bg-muted/5 text-muted-foreground italic"
              }`}
            >
              {open ? c : `Clue ${i + 1} — guess wrong to reveal`}
            </div>
          );
        })}
      </div>

      {guesses.length > 0 && (
        <div className="w-full max-w-md space-y-1">
          {guesses.map((g, i) => {
            const ok = club.acceptedAnswers.some((a) => normaliseName(a) === normaliseName(g));
            return (
              <div
                key={i}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                  ok
                    ? "border-success/40 bg-success/10 text-success"
                    : "border-destructive/30 bg-destructive/5 text-muted-foreground"
                }`}
              >
                {ok ? <Check className="w-4 h-4 text-success" /> : <X className="w-4 h-4 text-destructive" />}
                <span>{g}</span>
              </div>
            );
          })}
        </div>
      )}

      {!finished ? (
        <div className="w-full max-w-md flex gap-2">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Name the club..."
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
      ) : (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-1">
            {won ? (
              <div className="flex items-center justify-center gap-2 text-success">
                <Trophy className="w-5 h-5" />
                <span className="font-display">{club.name}</span>
              </div>
            ) : (
              <>
                <p className="text-destructive font-display flex items-center justify-center gap-1">
                  <Eye className="w-4 h-4" /> Revealed
                </p>
                <p className="font-display text-foreground">{club.name}</p>
              </>
            )}
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <RotateCcw className="w-3 h-3" /> New club tomorrow!
            </p>
          </motion.div>
        </AnimatePresence>
      )}

      {!finished && (
        <p className="text-xs text-muted-foreground">{remaining} guess{remaining === 1 ? "" : "es"} remaining</p>
      )}
    </div>
  );
};

export default ClubsGame;
