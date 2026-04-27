import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RotateCcw, Check, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BINGO_SETS, getDailyPlayers, BingoPlayer } from "@/data/bingo-data";

type SetKey = keyof typeof BINGO_SETS;

interface BingoGameProps {
  setKey: SetKey;
  storageKey: string;
}

interface SavedState {
  setKey: SetKey;
  date: string;
  marked: boolean[]; // length 9
  revealedIdx: number;
  picks: number[]; // for each revealed player, which cells the user marked
  finished: boolean;
  win: boolean;
}

const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const BingoGame = ({ setKey, storageKey }: BingoGameProps) => {
  const { toast } = useToast();
  const set = BINGO_SETS[setKey];
  const players = useMemo<BingoPlayer[]>(() => getDailyPlayers(set, 8), [set]);

  const [marked, setMarked] = useState<boolean[]>(() => Array(9).fill(false));
  const [revealedIdx, setRevealedIdx] = useState(0);
  const [picksThisPlayer, setPicksThisPlayer] = useState<Set<number>>(new Set());
  const [finished, setFinished] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return;
    try {
      const parsed: SavedState = JSON.parse(raw);
      if (parsed.setKey === setKey && parsed.date === new Date().toDateString()) {
        setMarked(parsed.marked);
        setRevealedIdx(parsed.revealedIdx);
        setFinished(parsed.finished);
        setWin(parsed.win);
      }
    } catch {
      // ignore
    }
  }, [setKey, storageKey]);

  const persist = useCallback(
    (m: boolean[], idx: number, done: boolean, w: boolean) => {
      const s: SavedState = {
        setKey,
        date: new Date().toDateString(),
        marked: m,
        revealedIdx: idx,
        picks: [],
        finished: done,
        win: w,
      };
      localStorage.setItem(storageKey, JSON.stringify(s));
    },
    [setKey, storageKey]
  );

  const player = players[revealedIdx];

  const checkWin = (m: boolean[]) => WIN_LINES.some((line) => line.every((i) => m[i]));

  const toggleCell = (i: number) => {
    if (finished) return;
    if (picksThisPlayer.has(i)) return;
    if (marked[i]) return;
    if (!player) return;
    const matches = set.card[i].match(player);
    const newMarked = [...marked];
    if (matches) {
      newMarked[i] = true;
      setMarked(newMarked);
      setPicksThisPlayer((s) => new Set(s).add(i));
      toast({ title: "✅ Marked", description: `${player.name} matches: ${set.card[i].label}` });
      if (checkWin(newMarked)) {
        setFinished(true);
        setWin(true);
        persist(newMarked, revealedIdx, true, true);
        return;
      }
    } else {
      setPicksThisPlayer((s) => new Set(s).add(i));
      toast({
        title: "❌ Doesn't match",
        description: `${player.name} doesn't fit "${set.card[i].label}"`,
        variant: "destructive",
      });
    }
  };

  const nextPlayer = () => {
    if (finished) return;
    const nextIdx = revealedIdx + 1;
    if (nextIdx >= players.length) {
      setFinished(true);
      const w = checkWin(marked);
      setWin(w);
      persist(marked, nextIdx, true, w);
      return;
    }
    setRevealedIdx(nextIdx);
    setPicksThisPlayer(new Set());
    persist(marked, nextIdx, false, false);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="grid grid-cols-3 gap-2 w-full max-w-md">
        {set.card.map((c, i) => {
          const isMarked = marked[i];
          const wasPicked = picksThisPlayer.has(i);
          return (
            <button
              key={c.id}
              onClick={() => toggleCell(i)}
              disabled={finished || isMarked || wasPicked}
              className={`aspect-square rounded-lg border text-xs sm:text-sm flex items-center justify-center text-center px-2 transition-colors ${
                isMarked
                  ? "border-success/60 bg-success/15 text-success"
                  : wasPicked
                  ? "border-destructive/40 bg-destructive/10 text-muted-foreground"
                  : "border-border bg-card text-foreground hover:bg-muted/40 hover:border-primary/40"
              }`}
            >
              {isMarked ? <Check className="w-5 h-5" /> : c.label}
            </button>
          );
        })}
      </div>

      <div className="w-full max-w-md rounded-xl border border-border bg-muted/20 p-4 text-center">
        {finished ? (
          win ? (
            <div className="flex flex-col items-center gap-2 text-success">
              <Trophy className="w-6 h-6" />
              <span className="font-display text-lg">BINGO!</span>
              <p className="text-xs text-muted-foreground">
                Won in {revealedIdx + 1} reveal{revealedIdx === 0 ? "" : "s"}
              </p>
            </div>
          ) : (
            <p className="text-destructive font-display">No bingo this time</p>
          )
        ) : (
          <>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Reveal {revealedIdx + 1}/{players.length}
            </p>
            <p className="font-display text-foreground text-lg">{player?.name}</p>
            <p className="text-xs text-muted-foreground">
              {player?.nation} • {player?.position} • {player?.era}s
            </p>
          </>
        )}
      </div>

      {!finished && (
        <button
          onClick={nextPlayer}
          className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-display hover:bg-primary/90"
        >
          Next player <ArrowRight className="w-4 h-4" />
        </button>
      )}

      <AnimatePresence>
        {finished && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> New bingo card tomorrow!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BingoGame;
