// Octadle - eight football words at once, Wordle rules.
// One guess is scored against all eight daily words at the same time.
// All words are real 5-letter football words.
export const OCTADLE_WORDS: string[] = [
  "GOALS", "SCORE", "PITCH", "MATCH", "COACH",
  "SHOTS", "CROSS", "FINAL", "EXTRA", "KICKS",
  "FOULS", "CARDS", "SAVES", "DRAWN", "LOSER",
  "THROW", "HEADS", "BOOTS", "STRIP", "WINGS",
  "DERBY", "RIVAL", "CHAMP", "TITLE", "MEDAL",
  "GLORY", "PRIDE", "HEART", "SKILL", "SPEED",
  "POWER", "TOUGH", "BRAVE", "CLASH", "FIGHT",
  "CROWD", "CHANT", "STARS", "DREAM", "MAGIC",
];

export const OCTADLE_WORD_COUNT = 8;
export const OCTADLE_MAX_GUESSES = 13;

// Day index since the shared epoch, matches the daily rotation used elsewhere.
export function getDayIndex(date: Date = new Date()): number {
  const epoch = new Date(2024, 0, 1).getTime();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  return Math.floor((today - epoch) / 86400000);
}

// Small deterministic PRNG so the daily words are the same for everyone.
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Seeded shuffle of the pool; the day's eight words are the first eight.
export function getDailyWords(date: Date = new Date()): string[] {
  const rng = mulberry32(getDayIndex(date) + 1);
  const arr = [...OCTADLE_WORDS];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, OCTADLE_WORD_COUNT);
}
