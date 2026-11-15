import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getDailyWords,
  OCTADLE_MAX_GUESSES,
  OCTADLE_WORD_COUNT,
} from "@/data/octadle-words";
import { evaluateGuess, LetterResult, LetterStatus } from "@/data/wordle-players";
import { useToast } from "@/hooks/use-toast";
import { useLocalizedStrings, fmt } from "@/i18n/DictionaryContext";
import { recordDailyResult } from "@/lib/daily-score";
import { SITE_URL } from "@/lib/site";
import ShareResultButton from "@/components/ShareResultButton";
import { Check, Trophy } from "lucide-react";

const WORD_LENGTH = 5;

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

const statusColors: Record<LetterStatus, string> = {
  correct: "bg-success text-primary-foreground",
  present: "bg-primary text-primary-foreground",
  absent: "bg-muted text-muted-foreground",
  empty: "border border-border bg-transparent text-foreground",
};

const keyStatusColors: Record<LetterStatus, string> = {
  correct: "bg-success text-primary-foreground",
  present: "bg-primary text-primary-foreground",
  absent: "bg-muted/50 text-muted-foreground",
  empty: "bg-card text-foreground hover:bg-muted",
};

const OctadleGame = () => {
  const { toast } = useToast();
  const t = useLocalizedStrings("game.octadle", {
    notEnoughTitle: "Not enough letters",
    notEnoughDesc: "Enter a 5-letter word",
    alreadyTitle: "Already guessed",
    alreadyDesc: "Try a different word",
    winToastTitle: "🎉 Brilliant!",
    winToastDesc: "You solved all 8 words in {n} guesses!",
    loseToastTitle: "Game Over",
    loseToastDesc: "You solved {n} of 8 words",
    instructions:
      "One guess counts for all 8 boards. Green is right letter, right spot. Yellow is right letter, wrong spot.",
    solvedLine: "Solved {solved}/{total} - {left} guesses left",
    wordLabel: "Word {n}",
    winMessage: "You solved all 8 words in {n}/{max}!",
    loseMessage: "You solved {n} of 8 words. The answers are shown on the boards.",
    comeBack: "Come back tomorrow for 8 new words!",
    shareSolved: "solved {n}/8",
    shareUnsolved: "(unsolved)",
  });
  const [answers] = useState<string[]>(() => getDailyWords());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [shake, setShake] = useState(false);

  // Per-board evaluations, derived from the shared guess list.
  const evaluations: LetterResult[][][] = answers.map((answer) =>
    guesses.map((guess) => evaluateGuess(guess, answer))
  );
  const solved = answers.map((answer, i) =>
    evaluations[i].some((row) => row.every((l) => l.status === "correct"))
  );
  const solvedCount = solved.filter(Boolean).length;

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem("f11-octadle-state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.date === new Date().toDateString() && Array.isArray(parsed.guesses)) {
          setGuesses(parsed.guesses);
          setGameOver(parsed.gameOver);
          setWon(parsed.won);
        }
      } catch {
        // Corrupt save; start fresh.
      }
    }
  }, []);

  // Save state
  useEffect(() => {
    if (guesses.length > 0) {
      localStorage.setItem("f11-octadle-state", JSON.stringify({
        date: new Date().toDateString(),
        guesses,
        gameOver,
        won,
      }));
    }
  }, [guesses, gameOver, won]);

  // Record the daily result once (guarded per game per day in the helper)
  useEffect(() => {
    if (gameOver) recordDailyResult("octadle", won);
  }, [gameOver, won]);

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== WORD_LENGTH) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      toast({ title: t.notEnoughTitle, description: t.notEnoughDesc, variant: "destructive" });
      return;
    }
    if (guesses.includes(currentGuess)) {
      toast({ title: t.alreadyTitle, description: t.alreadyDesc, variant: "destructive" });
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess("");

    const allSolved = answers.every((answer) => currentGuess === answer || guesses.some((g) => g === answer));
    const finalSolved = answers.filter((answer) => currentGuess === answer || guesses.includes(answer)).length;
    if (allSolved) {
      setTimeout(() => {
        setGameOver(true);
        setWon(true);
        toast({ title: t.winToastTitle, description: fmt(t.winToastDesc, { n: newGuesses.length }) });
      }, 400);
    } else if (newGuesses.length >= OCTADLE_MAX_GUESSES) {
      setTimeout(() => {
        setGameOver(true);
        toast({ title: t.loseToastTitle, description: fmt(t.loseToastDesc, { n: finalSolved }) });
      }, 400);
    }
  }, [currentGuess, answers, guesses, toast, t]);

  const handleKey = useCallback((key: string) => {
    if (gameOver) return;
    if (key === "ENTER") {
      submitGuess();
    } else if (key === "⌫" || key === "BACKSPACE") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess((prev) => prev + key);
    }
  }, [gameOver, currentGuess, submitGuess]);

  // Physical keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      handleKey(e.key.toUpperCase());
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleKey]);

  // Keyboard status: best status for each letter across all boards.
  const kbStatus: Record<string, LetterStatus> = {};
  for (const board of evaluations) {
    for (const row of board) {
      for (const { letter, status } of row) {
        const current = kbStatus[letter];
        if (status === "correct") kbStatus[letter] = "correct";
        else if (status === "present" && current !== "correct") kbStatus[letter] = "present";
        else if (status === "absent" && !current) kbStatus[letter] = "absent";
      }
    }
  }

  const shareText = () => {
    const lines = answers.map((answer, i) => {
      const rows = evaluations[i];
      if (solved[i]) {
        const winRow = rows.find((row) => row.every((l) => l.status === "correct"));
        return `${answer}: ${winRow ? winRow.map((l) => (l.status === "correct" ? "🟩" : l.status === "present" ? "🟨" : "⬜")).join("") : ""}`;
      }
      const last = rows[rows.length - 1];
      return `${answer}: ${last ? last.map((l) => (l.status === "correct" ? "🟩" : l.status === "present" ? "🟨" : "⬜")).join("") : "⬜⬜⬜⬜⬜"} {t.shareUnsolved}`;
    });
    return `Octadle ${won ? `${guesses.length}/${OCTADLE_MAX_GUESSES}` : `X/${OCTADLE_MAX_GUESSES}`} - ${fmt(t.shareSolved, { n: solvedCount })}\n${lines.join("\n")}\nPlay: ${SITE_URL}/game/octadle`;
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-center text-sm text-muted-foreground">
        {t.instructions}
        <span className="block mt-1 font-semibold text-foreground">
          {fmt(t.solvedLine, { solved: solvedCount, total: OCTADLE_WORD_COUNT, left: OCTADLE_MAX_GUESSES - guesses.length })}
        </span>
      </p>

      {/* Boards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
        {answers.map((answer, boardIdx) => {
          const isSolved = solved[boardIdx];
          const rows = evaluations[boardIdx];
          const displayCount = isSolved ? rows.length : rows.length + (gameOver ? 0 : 1);
          return (
            <div
              key={boardIdx}
              className={`rounded-lg border p-2 flex flex-col items-center gap-1 ${
                isSolved ? "border-success/50 bg-success/5" : "border-border bg-card"
              }`}
            >
              <div className="flex items-center gap-1 text-[11px] font-display text-muted-foreground">
                <span>{fmt(t.wordLabel, { n: boardIdx + 1 })}</span>
                {isSolved && <Check className="w-3.5 h-3.5 text-success" />}
              </div>
              {gameOver && !isSolved && (
                <span className="text-[11px] font-display text-primary">{answer}</span>
              )}
              <div className="flex flex-col gap-1">
                {Array.from({ length: Math.max(displayCount, 1) }).map((_, rowIdx) => {
                  const row = rows[rowIdx];
                  const isCurrentRow = rowIdx === rows.length && !gameOver && !isSolved;
                  return (
                    <motion.div
                      key={rowIdx}
                      className="flex gap-1"
                      animate={isCurrentRow && shake ? { x: [-6, 6, -4, 4, 0] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      {Array.from({ length: WORD_LENGTH }).map((_, colIdx) => {
                        let letter = "";
                        let status: LetterStatus = "empty";
                        if (row) {
                          letter = row[colIdx].letter;
                          status = row[colIdx].status;
                        } else if (isCurrentRow && colIdx < currentGuess.length) {
                          letter = currentGuess[colIdx];
                        }
                        return (
                          <div
                            key={colIdx}
                            className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center font-display text-xs rounded transition-colors ${statusColors[status]}`}
                          >
                            {letter}
                          </div>
                        );
                      })}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Game Over Message */}
      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {won ? (
              <p className="text-success font-display text-lg flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5" /> {fmt(t.winMessage, { n: guesses.length, max: OCTADLE_MAX_GUESSES })}
              </p>
            ) : (
              <p className="text-danger font-display text-lg">
                {fmt(t.loseMessage, { n: solvedCount })}
              </p>
            )}
            <p className="text-muted-foreground text-xs mt-2">{t.comeBack}</p>
            <div className="mt-3 flex justify-center">
              <ShareResultButton text={shareText()} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard */}
      <div className="flex flex-col items-center gap-1.5 w-full max-w-lg">
        {KEYBOARD_ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-1 sm:gap-1.5 justify-center w-full">
            {row.map((key) => {
              const isWide = key === "ENTER" || key === "⌫";
              const letterStatus = kbStatus[key] || "empty";
              return (
                <button
                  key={key}
                  onClick={() => handleKey(key)}
                  disabled={gameOver}
                  className={`
                    ${isWide ? "px-3 sm:px-4 text-xs" : "w-8 sm:w-10 text-sm"}
                    h-12 sm:h-14 rounded-md font-body font-semibold
                    transition-all duration-150 active:scale-95
                    ${keyStatusColors[key.length === 1 ? letterStatus : "empty"]}
                    disabled:opacity-50
                  `}
                >
                  {key}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OctadleGame;
