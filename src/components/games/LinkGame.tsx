import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, Trophy, Eye, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getDailyLink, LinkPuzzle } from "@/data/link-puzzles";
import { normaliseName } from "@/data/lineups";

const STORAGE_KEY = "f11-link-state";
const MAX_LINKS = 4;

interface SavedState {
  puzzleId: string;
  chain: string[];
  failedTries: number;
  finished: boolean;
  revealed: boolean;
}

interface ChainStep {
  name: string;
  bridgedClub: string;
}

const LinkGame = () => {
  const { toast } = useToast();
  const puzzle = useMemo(() => getDailyLink(), []);
  const [draft, setDraft] = useState("");
  const [chain, setChain] = useState<ChainStep[]>([]);
  const [failedTries, setFailedTries] = useState(0);
  const [finished, setFinished] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed: SavedState = JSON.parse(raw);
      if (parsed.puzzleId === puzzle.id) {
        const restored = restoreChain(puzzle, parsed.chain);
        setChain(restored);
        setFailedTries(parsed.failedTries);
        setFinished(parsed.finished);
        setRevealed(parsed.revealed);
      }
    } catch {
      // ignore
    }
  }, [puzzle.id, puzzle]);

  useEffect(() => {
    const state: SavedState = {
      puzzleId: puzzle.id,
      chain: chain.map((s) => s.name),
      failedTries,
      finished,
      revealed,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [puzzle.id, chain, failedTries, finished, revealed]);

  const previousClubs: string[] = chain.length === 0 ? puzzle.startClubs : findClubsForName(puzzle, chain[chain.length - 1].name);

  const submit = useCallback(() => {
    const value = draft.trim();
    if (!value || finished) return;

    const intermediate = puzzle.validIntermediates.find(
      (p) => normaliseName(p.name) === normaliseName(value)
    );

    if (!intermediate) {
      setFailedTries((f) => f + 1);
      setDraft("");
      toast({ title: "❌ Unknown player", description: "Try a different connection", variant: "destructive" });
      return;
    }

    const sharedClub = intermediate.clubs.find((c) => previousClubs.includes(c));
    if (!sharedClub) {
      setFailedTries((f) => f + 1);
      setDraft("");
      toast({ title: "❌ No club overlap", description: `${value} didn't play with ${chain.length === 0 ? puzzle.start : chain[chain.length - 1].name}`, variant: "destructive" });
      return;
    }

    const newStep: ChainStep = { name: intermediate.name, bridgedClub: sharedClub };
    const newChain = [...chain, newStep];

    // Did this player also play with end?
    const finalShared = intermediate.clubs.find((c) => puzzle.endClubs.includes(c));
    setChain(newChain);
    setDraft("");

    if (finalShared) {
      setFinished(true);
      toast({ title: "🎉 Chain complete!", description: `${intermediate.name} → ${puzzle.end} via ${finalShared}` });
      return;
    }

    if (newChain.length >= MAX_LINKS) {
      setFinished(true);
      toast({ title: "Out of links", description: `Couldn't reach ${puzzle.end} in ${MAX_LINKS} steps`, variant: "destructive" });
      return;
    }

    toast({ title: `🔗 Linked via ${sharedClub}`, description: `Now connect ${intermediate.name} → ${puzzle.end}` });
  }, [draft, finished, puzzle, chain, previousClubs, toast]);

  const giveUp = () => {
    setRevealed(true);
    setFinished(true);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-2 text-foreground font-display">
        <span className="rounded-lg bg-primary/15 text-primary px-3 py-1.5 text-sm">{puzzle.start}</span>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <span className="text-muted-foreground text-sm">…</span>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <span className="rounded-lg bg-accent/20 text-accent px-3 py-1.5 text-sm">{puzzle.end}</span>
      </div>

      <div className="w-full max-w-md flex flex-col gap-2">
        {chain.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-sm flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4 text-success" />
            <span className="text-foreground font-medium">{step.name}</span>
            <span className="text-xs text-muted-foreground ml-auto">via {step.bridgedClub}</span>
          </motion.div>
        ))}
      </div>

      {!finished && (
        <div className="w-full max-w-md flex gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder={`Name a teammate of ${chain.length === 0 ? puzzle.start : chain[chain.length - 1].name}...`}
            className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            autoFocus
          />
          <button
            onClick={submit}
            disabled={!draft.trim()}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            LINK
          </button>
        </div>
      )}

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>Links used: {chain.length}/{MAX_LINKS}</span>
        <span>•</span>
        <span>Wrong tries: {failedTries}</span>
      </div>

      {!finished && (
        <button
          onClick={giveUp}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-xs hover:bg-muted/50"
        >
          <Eye className="w-3.5 h-3.5" /> Reveal example chain
        </button>
      )}

      <AnimatePresence>
        {finished && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2 max-w-md"
          >
            {chain.length > 0 && !revealed ? (
              <div className="flex items-center justify-center gap-2 text-success">
                <Trophy className="w-5 h-5" />
                <span className="font-display">Chain solved!</span>
              </div>
            ) : (
              <p className="text-foreground font-display">Example chain:</p>
            )}
            {revealed && (
              <div className="space-y-1">
                {puzzle.exampleChain.map((s, i) => (
                  <div key={i} className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs flex items-center gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-primary" />
                    <span className="text-foreground">{s.name}</span>
                    <span className="text-muted-foreground ml-auto">{s.via}</span>
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <RotateCcw className="w-3 h-3" /> New link tomorrow!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function findClubsForName(puzzle: LinkPuzzle, name: string): string[] {
  const intermediate = puzzle.validIntermediates.find((p) => p.name === name);
  return intermediate?.clubs || [];
}

function restoreChain(puzzle: LinkPuzzle, names: string[]): ChainStep[] {
  const out: ChainStep[] = [];
  let prevClubs = puzzle.startClubs;
  for (const name of names) {
    const player = puzzle.validIntermediates.find((p) => p.name === name);
    if (!player) continue;
    const shared = player.clubs.find((c) => prevClubs.includes(c));
    if (!shared) continue;
    out.push({ name: player.name, bridgedClub: shared });
    prevClubs = player.clubs;
  }
  return out;
}

export default LinkGame;
