import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, Trophy, Eye, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { recordDailyResult } from "@/lib/daily-score";
import { SITE_URL } from "@/lib/site";
import ShareResultButton from "@/components/ShareResultButton";
import { getDailyLink, LinkPuzzle } from "@/data/link-puzzles";
import { normaliseName } from "@/data/lineups";
import { useLocalizedStrings, fmt } from "@/i18n/DictionaryContext";

const STORAGE_KEY = "f11-link-state";
const MAX_LINKS = 4;

interface SavedState {
  puzzleId: string;
  chain: string[];
  failedTries: number;
  finished: boolean;
  revealed: boolean;
  won: boolean;
}

interface ChainStep {
  name: string;
  bridgedClub: string;
}

const LinkGame = () => {
  const { toast } = useToast();
  const t = useLocalizedStrings("game.link", {
    unknownTitle: "❌ Unknown player",
    unknownDesc: "Try a different connection",
    noOverlapTitle: "❌ No club overlap",
    noOverlapDesc: "{player} didn't play with {other}",
    chainCompleteTitle: "🎉 Chain complete!",
    chainCompleteDesc: "{player} → {end} via {club}",
    outOfLinksTitle: "Out of links",
    outOfLinksDesc: "Couldn't reach {end} in {n} steps",
    linkedTitle: "🔗 Linked via {club}",
    linkedDesc: "Now connect {player} → {end}",
    viaClub: "via {club}",
    placeholder: "Name a teammate of {name}...",
    linkButton: "LINK",
    linksUsed: "Links used: {n}/{m}",
    wrongTries: "Wrong tries: {n}",
    revealChain: "Reveal example chain",
    chainSolved: "Chain solved!",
    exampleChain: "Example chain:",
    newTomorrow: "New link tomorrow!",
    shareSolved: "✅ Chain complete",
    shareFailed: "❌ Out of links",
    shareInOne: "in {n} link",
    shareInOther: "in {n} links",
  });
  const puzzle = useMemo(() => getDailyLink(), []);
  const [draft, setDraft] = useState("");
  const [chain, setChain] = useState<ChainStep[]>([]);
  const [failedTries, setFailedTries] = useState(0);
  const [finished, setFinished] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [won, setWon] = useState(false);

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
        setWon(Boolean(parsed.won));
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
      won,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [puzzle.id, chain, failedTries, finished, revealed, won]);

  // Record the daily result once (guarded per game per day in the helper).
  // Only reaching the end player is a win; out of links and give-up are losses.
  useEffect(() => {
    if (finished) recordDailyResult("futbol11-link", won);
  }, [finished, won]);

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
      toast({ title: t.unknownTitle, description: t.unknownDesc, variant: "destructive" });
      return;
    }

    const sharedClub = intermediate.clubs.find((c) => previousClubs.includes(c));
    if (!sharedClub) {
      setFailedTries((f) => f + 1);
      setDraft("");
      toast({ title: t.noOverlapTitle, description: fmt(t.noOverlapDesc, { player: value, other: chain.length === 0 ? puzzle.start : chain[chain.length - 1].name }), variant: "destructive" });
      return;
    }

    const newStep: ChainStep = { name: intermediate.name, bridgedClub: sharedClub };
    const newChain = [...chain, newStep];

    // Did this player also play with end?
    const finalShared = intermediate.clubs.find((c) => puzzle.endClubs.includes(c));
    setChain(newChain);
    setDraft("");

    if (finalShared) {
      setWon(true);
      setFinished(true);
      toast({ title: t.chainCompleteTitle, description: fmt(t.chainCompleteDesc, { player: intermediate.name, end: puzzle.end, club: finalShared }) });
      return;
    }

    if (newChain.length >= MAX_LINKS) {
      setFinished(true);
      toast({ title: t.outOfLinksTitle, description: fmt(t.outOfLinksDesc, { end: puzzle.end, n: MAX_LINKS }), variant: "destructive" });
      return;
    }

    toast({ title: fmt(t.linkedTitle, { club: sharedClub }), description: fmt(t.linkedDesc, { player: intermediate.name, end: puzzle.end }) });
  }, [draft, finished, puzzle, chain, previousClubs, toast, t]);

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
            <span className="text-xs text-muted-foreground ml-auto">{fmt(t.viaClub, { club: step.bridgedClub })}</span>
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
            placeholder={fmt(t.placeholder, { name: chain.length === 0 ? puzzle.start : chain[chain.length - 1].name })}
            className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            autoFocus
          />
          <button
            onClick={submit}
            disabled={!draft.trim()}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {t.linkButton}
          </button>
        </div>
      )}

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>{fmt(t.linksUsed, { n: chain.length, m: MAX_LINKS })}</span>
        <span>•</span>
        <span>{fmt(t.wrongTries, { n: failedTries })}</span>
      </div>

      {!finished && (
        <button
          onClick={giveUp}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-xs hover:bg-muted/50"
        >
          <Eye className="w-3.5 h-3.5" /> {t.revealChain}
        </button>
      )}

      <AnimatePresence>
        {finished && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2 max-w-md"
          >
            {won ? (
              <div className="flex items-center justify-center gap-2 text-success">
                <Trophy className="w-5 h-5" />
                <span className="font-display">{t.chainSolved}</span>
              </div>
            ) : (
              <p className="text-foreground font-display">{t.exampleChain}</p>
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
              <RotateCcw className="w-3 h-3" /> {t.newTomorrow}
            </p>
            <div className="mt-2 flex justify-center">
              <ShareResultButton
                text={`Futbol11 Link, ${puzzle.start} to ${puzzle.end}\n${won ? t.shareSolved : t.shareFailed} ${fmt(chain.length === 1 ? t.shareInOne : t.shareInOther, { n: chain.length })}\nPlay: ${SITE_URL}/game/futbol11-link`}
              />
            </div>
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
