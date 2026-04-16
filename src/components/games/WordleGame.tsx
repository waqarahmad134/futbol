import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDailyWord, evaluateGuess, LetterResult, LetterStatus } from "@/data/wordle-players";
import { useToast } from "@/hooks/use-toast";

const MAX_GUESSES = 6;
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
  empty: "border-2 border-border bg-transparent text-foreground",
};

const keyStatusColors: Record<LetterStatus, string> = {
  correct: "bg-success text-primary-foreground",
  present: "bg-primary text-primary-foreground",
  absent: "bg-muted/50 text-muted-foreground",
  empty: "bg-card text-foreground hover:bg-muted",
};

const WordleGame = () => {
  const { toast } = useToast();
  const [answer] = useState(() => getDailyWord());
  const [guesses, setGuesses] = useState<LetterResult[][]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [shake, setShake] = useState(false);
  const [revealingRow, setRevealingRow] = useState<number | null>(null);

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem("f11-wordle-state");
    if (saved) {
      const parsed = JSON.parse(saved);
      const today = new Date().toDateString();
      if (parsed.date === today) {
        setGuesses(parsed.guesses);
        setGameOver(parsed.gameOver);
        setWon(parsed.won);
      }
    }
  }, []);

  // Save state
  useEffect(() => {
    if (guesses.length > 0) {
      localStorage.setItem("f11-wordle-state", JSON.stringify({
        date: new Date().toDateString(),
        guesses,
        gameOver,
        won,
      }));
    }
  }, [guesses, gameOver, won]);

  // Keyboard status map
  const keyboardStatus = useCallback((): Record<string, LetterStatus> => {
    const map: Record<string, LetterStatus> = {};
    for (const guess of guesses) {
      for (const { letter, status } of guess) {
        const current = map[letter];
        if (status === "correct") map[letter] = "correct";
        else if (status === "present" && current !== "correct") map[letter] = "present";
        else if (status === "absent" && !current) map[letter] = "absent";
      }
    }
    return map;
  }, [guesses]);

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== WORD_LENGTH) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      toast({ title: "Not enough letters", description: "Enter a 5-letter surname", variant: "destructive" });
      return;
    }

    const result = evaluateGuess(currentGuess, answer);
    const newGuesses = [...guesses, result];
    
    setRevealingRow(guesses.length);
    setTimeout(() => setRevealingRow(null), WORD_LENGTH * 200 + 300);

    setGuesses(newGuesses);
    setCurrentGuess("");

    const isCorrect = currentGuess === answer;
    if (isCorrect) {
      setTimeout(() => {
        setGameOver(true);
        setWon(true);
        toast({ title: "🎉 Brilliant!", description: `You got it in ${newGuesses.length} ${newGuesses.length === 1 ? "try" : "tries"}!` });
      }, WORD_LENGTH * 200 + 400);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setTimeout(() => {
        setGameOver(true);
        toast({ title: "Game Over", description: `The answer was ${answer}` });
      }, WORD_LENGTH * 200 + 400);
    }
  }, [currentGuess, answer, guesses, toast]);

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

  const kbStatus = keyboardStatus();

  // Build display grid
  const displayRows: (LetterResult[] | null)[] = [];
  for (let i = 0; i < MAX_GUESSES; i++) {
    if (i < guesses.length) {
      displayRows.push(guesses[i]);
    } else if (i === guesses.length && !gameOver) {
      // Current input row
      displayRows.push(null);
    } else {
      displayRows.push(null);
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Grid */}
      <div className="flex flex-col gap-1.5">
        {displayRows.map((row, rowIdx) => {
          const isCurrentRow = rowIdx === guesses.length && !gameOver;
          const isRevealing = revealingRow === rowIdx;

          return (
            <motion.div
              key={rowIdx}
              className="flex gap-1.5"
              animate={isCurrentRow && shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {Array.from({ length: WORD_LENGTH }).map((_, colIdx) => {
                let letter = "";
                let status: LetterStatus = "empty";

                if (row && rowIdx < guesses.length) {
                  letter = row[colIdx].letter;
                  status = row[colIdx].status;
                } else if (isCurrentRow && colIdx < currentGuess.length) {
                  letter = currentGuess[colIdx];
                }

                return (
                  <motion.div
                    key={colIdx}
                    className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center font-display text-xl sm:text-2xl rounded-lg transition-colors ${statusColors[status]}`}
                    initial={isRevealing ? { rotateX: 0 } : false}
                    animate={isRevealing ? {
                      rotateX: [0, 90, 0],
                      transition: { delay: colIdx * 0.2, duration: 0.4 }
                    } : {}}
                    style={{ perspective: 500 }}
                  >
                    {letter}
                  </motion.div>
                );
              })}
            </motion.div>
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
              <p className="text-success font-display text-lg">
                🎉 You guessed it in {guesses.length}/{MAX_GUESSES}!
              </p>
            ) : (
              <p className="text-danger font-display text-lg">
                The answer was <span className="text-primary">{answer}</span>
              </p>
            )}
            <p className="text-muted-foreground text-xs mt-2">Come back tomorrow for a new challenge!</p>
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

export default WordleGame;
