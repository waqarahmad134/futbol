"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";

const DailyScore = () => {
  const [score, setScore] = useState({ correct: 0, wrong: 0 });

  useEffect(() => {
    const saved = localStorage.getItem("futbol11-daily-score");
    if (saved) {
      const parsed = JSON.parse(saved);
      const today = new Date().toDateString();
      if (parsed.date === today) {
        setScore({ correct: parsed.correct, wrong: parsed.wrong });
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5">
      <span className="text-sm font-body text-muted-foreground tracking-wide uppercase">Daily Score</span>
      <div className="flex items-center gap-3 text-2xl font-display">
        <CheckCircle className="w-6 h-6 text-success" />
        <span className="text-foreground">{score.correct}</span>
        <span className="text-muted-foreground">–</span>
        <span className="text-foreground">{score.wrong}</span>
        <XCircle className="w-6 h-6 text-danger" />
      </div>
    </div>
  );
};

export default DailyScore;
