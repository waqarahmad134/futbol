"use client";

import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import { getLeaderboard, type LeaderboardEntry } from "@/lib/backend";

type Status = "loading" | "ready" | "empty" | "unavailable";

const Leaderboard = () => {
  const [status, setStatus] = useState<Status>("loading");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    let cancelled = false;
    getLeaderboard().then((rows) => {
      if (cancelled) return;
      if (rows === null) {
        setStatus("unavailable");
      } else if (rows.length === 0) {
        setStatus("empty");
      } else {
        setEntries(rows.slice(0, 10));
        setStatus("ready");
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-6">
      <div className="container max-w-2xl">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Trophy className="w-5 h-5 text-foreground" />
            <h2 className="font-display text-xl text-foreground">Top Players</h2>
          </div>
          <p className="text-center text-muted-foreground font-body text-sm mb-4">
            Most wins across all Futbol11 games. Anonymous, no accounts, just play.
          </p>
          {status === "loading" && (
            <p className="text-center text-muted-foreground font-body text-sm">Loading leaderboard...</p>
          )}
          {status === "unavailable" && (
            <p className="text-center text-muted-foreground font-body text-sm">
              Leaderboard unavailable offline. Your results are still saved on this device.
            </p>
          )}
          {status === "empty" && (
            <p className="text-center text-muted-foreground font-body text-sm">
              No wins on the board yet. Finish a game to take the top spot.
            </p>
          )}
          {status === "ready" && (
            <ol className="divide-y divide-border">
              {entries.map((entry) => (
                <li key={entry.rank} className="flex items-center gap-3 py-2 font-body text-sm">
                  <span className="w-6 text-center font-display text-foreground">{entry.rank}</span>
                  <span className="flex-1 text-muted-foreground">Player {entry.player}</span>
                  <span className="text-foreground">{entry.wins} wins</span>
                  <span className="text-muted-foreground">Best streak {entry.bestStreak}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
