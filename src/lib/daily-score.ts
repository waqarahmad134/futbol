// Shared Daily Score recorder.
// The homepage DailyScore widget reads the "futbol11-daily-score" key.
// Each game calls recordDailyResult once when its daily game finishes
// (win or loss) so the widget actually moves off 0-0.
// The per-game guard stops reloads (state is restored from localStorage)
// from counting the same result twice.
const KEY = "futbol11-daily-score";

interface DailyScoreRecord {
  date: string;
  correct: number;
  wrong: number;
  games: Record<string, "win" | "loss">;
}

export function recordDailyResult(gameId: string, won: boolean): void {
  try {
    const today = new Date().toDateString();
    let record: DailyScoreRecord = { date: today, correct: 0, wrong: 0, games: {} };
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.date === today) {
        record = {
          date: today,
          correct: typeof parsed.correct === "number" ? parsed.correct : 0,
          wrong: typeof parsed.wrong === "number" ? parsed.wrong : 0,
          games: parsed.games && typeof parsed.games === "object" ? parsed.games : {},
        };
      }
    }
    if (record.games[gameId]) return;
    record.games[gameId] = won ? "win" : "loss";
    if (won) record.correct += 1;
    else record.wrong += 1;
    localStorage.setItem(KEY, JSON.stringify(record));
  } catch {
    // localStorage unavailable or corrupted; the daily score just stays empty.
  }
}
