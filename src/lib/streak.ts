// Pure streak math, shared by the API routes and unit-tested in
// src/lib/streak.test.ts. A streak is counted in UTC calendar days:
// one or more games on a day counts as one played day.
// playDates are "YYYY-MM-DD" strings (the UTC date part of playedAt).
export interface Streaks {
  current: number;
  best: number;
  totalDays: number;
}

function toDayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function shiftDay(dayKey: string, delta: number): string {
  const d = new Date(`${dayKey}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return toDayKey(d);
}

export function computeStreaks(playDates: string[], now = new Date()): Streaks {
  const days = new Set(playDates.filter(Boolean));
  if (days.size === 0) return { current: 0, best: 0, totalDays: 0 };

  // Best streak: longest run of consecutive days anywhere in the set.
  const sorted = [...days].sort();
  let best = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (shiftDay(sorted[i - 1], 1) === sorted[i]) {
      run += 1;
      if (run > best) best = run;
    } else {
      run = 1;
    }
  }

  // Current streak: consecutive days ending today, or ending yesterday
  // if the player has not played yet today. Zero if neither day played.
  let current = 0;
  let cursor = toDayKey(now);
  if (!days.has(cursor)) cursor = shiftDay(cursor, -1);
  while (days.has(cursor)) {
    current += 1;
    cursor = shiftDay(cursor, -1);
  }

  return { current, best, totalDays: days.size };
}
