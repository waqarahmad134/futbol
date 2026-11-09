"use client";

import { CheckCircle, XCircle, Flame } from "lucide-react";
import { useState, useEffect } from "react";
import { getServerStreak } from "@/lib/backend";

const DailyScore = () => {
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [streak, setStreak] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("futbol11-daily-score");
    if (saved) {
      const parsed = JSON.parse(saved);
      const today = new Date().toDateString();
      if (parsed.date === today) {
        setScore({ correct: parsed.correct, wrong: parsed.wrong });
      }
    }
    // Server streak when the backend is up; otherwise the widget
    // simply shows the local daily score as it does today.
    getServerStreak().then((server) => {
      if (server && server.current > 0) setStreak(server.current);
    });
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
      {streak !== null && (
        <span className="flex items-center gap-1 text-sm font-body text-muted-foreground">
          <Flame className="w-4 h-4 text-foreground" />
          {streak} day streak
        </span>
      )}
    </div>
  );
};

export default DailyScore;
