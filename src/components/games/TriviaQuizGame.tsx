import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDailyQuestions, TriviaQuestion } from "@/data/trivia-questions";
import { useToast } from "@/hooks/use-toast";
import { Trophy, RotateCcw, CheckCircle, XCircle, HelpCircle, Timer, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const TOTAL_QUESTIONS = 10;

interface SavedState {
  date: string;
  currentIndex: number;
  score: number;
  answers: (number | null)[];
  gameOver: boolean;
}

const difficultyColor: Record<string, string> = {
  easy: "text-success",
  medium: "text-warning",
  hard: "text-destructive",
};

const difficultyBg: Record<string, string> = {
  easy: "bg-success/10 border-success/30",
  medium: "bg-warning/10 border-warning/30",
  hard: "bg-destructive/10 border-destructive/30",
};

const categoryEmoji: Record<string, string> = {
  history: "📜",
  records: "📊",
  matches: "⚽",
  players: "🧑",
  worldcup: "🏆",
};

const TriviaQuizGame = () => {
  const { toast } = useToast();
  const [questions] = useState<TriviaQuestion[]>(() => getDailyQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(TOTAL_QUESTIONS).fill(null));
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem("f11-trivia-state");
    if (saved) {
      const parsed: SavedState = JSON.parse(saved);
      if (parsed.date === new Date().toDateString()) {
        setCurrentIndex(parsed.currentIndex);
        setScore(parsed.score);
        setAnswers(parsed.answers);
        setGameOver(parsed.gameOver);
      }
    }
  }, []);

  // Save state
  const saveState = useCallback((idx: number, sc: number, ans: (number | null)[], over: boolean) => {
    localStorage.setItem("f11-trivia-state", JSON.stringify({
      date: new Date().toDateString(),
      currentIndex: idx,
      score: sc,
      answers: ans,
      gameOver: over,
    }));
  }, []);

  const handleSelect = (optionIndex: number) => {
    if (revealed || gameOver) return;
    setSelectedOption(optionIndex);
    setRevealed(true);

    const q = questions[currentIndex];
    const isCorrect = optionIndex === q.correctIndex;
    const newScore = isCorrect ? score + 1 : score;
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;

    setScore(newScore);
    setAnswers(newAnswers);

    if (isCorrect) {
      toast({ title: "✅ Correct!", description: q.explanation });
    } else {
      toast({ title: "❌ Wrong!", description: q.explanation, variant: "destructive" });
    }

    // Auto-advance after delay
    setTimeout(() => {
      if (currentIndex + 1 >= TOTAL_QUESTIONS) {
        setGameOver(true);
        saveState(currentIndex + 1, newScore, newAnswers, true);
      } else {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
        setRevealed(false);
        saveState(currentIndex + 1, newScore, newAnswers, false);
      }
    }, 2000);
  };

  const currentQ = questions[currentIndex];
  const progress = gameOver ? 100 : (currentIndex / TOTAL_QUESTIONS) * 100;

  const getOptionClass = (idx: number) => {
    if (!revealed) {
      return "border-border bg-card hover:bg-muted/50 hover:border-primary/50 cursor-pointer";
    }
    if (idx === currentQ.correctIndex) {
      return "border-success/60 bg-success/10 text-success";
    }
    if (idx === selectedOption && idx !== currentQ.correctIndex) {
      return "border-destructive/60 bg-destructive/10 text-destructive";
    }
    return "border-border/30 bg-muted/10 opacity-50";
  };

  if (gameOver) {
    const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
    const grade = percentage >= 90 ? "🏆 Legend!" : percentage >= 70 ? "⭐ Great!" : percentage >= 50 ? "👍 Decent" : "📚 Keep Learning";

    return (
      <div className="flex flex-col items-center gap-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-4">
          <span className="text-6xl block">{percentage >= 70 ? "🎉" : "💪"}</span>
          <h3 className="font-display text-2xl text-foreground">{grade}</h3>
          <p className="text-foreground font-display text-4xl">{score}/{TOTAL_QUESTIONS}</p>
          <p className="text-muted-foreground text-sm">{percentage}% correct</p>

          <div className="w-full max-w-sm mx-auto">
            <Progress value={percentage} className="h-3" />
          </div>

          {/* Answer review */}
          <div className="w-full max-w-md space-y-2 mt-6">
            <h4 className="font-display text-sm text-muted-foreground">Review Your Answers</h4>
            {questions.map((q, i) => {
              const userAnswer = answers[i];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div key={q.id} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${isCorrect ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"}`}>
                  {isCorrect ? <CheckCircle className="w-3.5 h-3.5 text-success flex-shrink-0" /> : <XCircle className="w-3.5 h-3.5 text-destructive flex-shrink-0" />}
                  <span className="text-foreground truncate flex-1 text-left">{q.question}</span>
                  <span className={`${difficultyColor[q.difficulty]} font-semibold`}>{q.difficulty}</span>
                </div>
              );
            })}
          </div>

          <p className="text-muted-foreground text-xs flex items-center justify-center gap-1 mt-4">
            <RotateCcw className="w-3 h-3" /> New questions tomorrow!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Progress bar */}
      <div className="w-full max-w-md space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" /> Question {currentIndex + 1}/{TOTAL_QUESTIONS}</span>
          <span className="flex items-center gap-1"><Trophy className="w-3 h-3 text-primary" /> Score: {score}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          {/* Difficulty & category badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold capitalize ${difficultyBg[currentQ.difficulty]} ${difficultyColor[currentQ.difficulty]}`}>
              {currentQ.difficulty}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              {categoryEmoji[currentQ.category]} {currentQ.category}
            </span>
          </div>

          {/* Question */}
          <div className="rounded-xl border border-border bg-muted/20 p-5 mb-4">
            <h3 className="font-display text-base text-foreground leading-relaxed flex gap-2">
              <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, idx) => (
              <motion.button
                key={idx}
                whileHover={!revealed ? { scale: 1.01 } : {}}
                whileTap={!revealed ? { scale: 0.99 } : {}}
                onClick={() => handleSelect(idx)}
                disabled={revealed}
                className={`w-full flex items-center gap-3 rounded-lg border px-4 py-3 text-sm text-left transition-colors ${getOptionClass(idx)}`}
              >
                <span className="w-7 h-7 rounded-full border border-border bg-background flex items-center justify-center text-xs font-display text-muted-foreground flex-shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-foreground">{option}</span>
                {revealed && idx === currentQ.correctIndex && (
                  <CheckCircle className="w-4 h-4 text-success ml-auto flex-shrink-0" />
                )}
                {revealed && idx === selectedOption && idx !== currentQ.correctIndex && (
                  <XCircle className="w-4 h-4 text-destructive ml-auto flex-shrink-0" />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Timer-like dots showing remaining questions */}
      <div className="flex gap-1">
        {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i < currentIndex
                ? answers[i] === questions[i]?.correctIndex
                  ? "bg-success"
                  : "bg-destructive"
                : i === currentIndex
                ? "bg-primary"
                : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TriviaQuizGame;
