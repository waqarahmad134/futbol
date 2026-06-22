// Higher or Lower — compare two footballers by career goals.
// Players carry approximate senior career goal totals (club + international).
// Values only need to preserve a sensible relative order, so they are kept as
// a fixed snapshot and are intentionally distinct to avoid ambiguous ties.

export interface HLPlayer {
  name: string;
  country: string;
  goals: number;
}

export const STAT_LABEL = "Career goals";

export const HL_PLAYERS: HLPlayer[] = [
  { name: "Cristiano Ronaldo", country: "Portugal", goals: 921 },
  { name: "Lionel Messi", country: "Argentina", goals: 850 },
  { name: "Josef Bican", country: "Austria", goals: 805 },
  { name: "Romário", country: "Brazil", goals: 772 },
  { name: "Pelé", country: "Brazil", goals: 765 },
  { name: "Gerd Müller", country: "Germany", goals: 735 },
  { name: "Ferenc Puskás", country: "Hungary", goals: 709 },
  { name: "Robert Lewandowski", country: "Poland", goals: 668 },
  { name: "Zlatan Ibrahimović", country: "Sweden", goals: 573 },
  { name: "Neymar", country: "Brazil", goals: 482 },
  { name: "Edinson Cavani", country: "Uruguay", goals: 441 },
  { name: "Karim Benzema", country: "France", goals: 435 },
  { name: "Sergio Agüero", country: "Argentina", goals: 427 },
  { name: "Ronaldo Nazário", country: "Brazil", goals: 414 },
  { name: "Thierry Henry", country: "France", goals: 411 },
  { name: "Harry Kane", country: "England", goals: 405 },
  { name: "Raúl", country: "Spain", goals: 398 },
  { name: "David Villa", country: "Spain", goals: 392 },
  { name: "Wayne Rooney", country: "England", goals: 366 },
  { name: "Samuel Eto'o", country: "Cameroon", goals: 358 },
  { name: "Andriy Shevchenko", country: "Ukraine", goals: 352 },
  { name: "Mohamed Salah", country: "Egypt", goals: 345 },
  { name: "Kylian Mbappé", country: "France", goals: 333 },
  { name: "Alexis Sánchez", country: "Chile", goals: 318 },
  { name: "Frank Lampard", country: "England", goals: 301 },
  { name: "Erling Haaland", country: "Norway", goals: 291 },
  { name: "Steven Gerrard", country: "England", goals: 207 },
  { name: "Ryan Giggs", country: "Wales", goals: 168 },
];

export type Guess = "higher" | "lower";

// Day index since the shared epoch — matches the daily rotation used elsewhere.
export function getDayIndex(date: Date = new Date()): number {
  const epoch = new Date(2024, 0, 1).getTime();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  return Math.floor((today - epoch) / 86400000);
}

// Small deterministic PRNG so the daily order is the same for everyone.
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Seeded Fisher–Yates shuffle producing the day's comparison order.
export function getDailySequence(date: Date = new Date()): HLPlayer[] {
  const rng = mulberry32(getDayIndex(date) + 1);
  const arr = [...HL_PLAYERS];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Is the player's guess correct given the current and next players?
// Equal totals count as correct (benefit of the doubt); the dataset avoids ties.
export function isCorrectGuess(current: HLPlayer, next: HLPlayer, guess: Guess): boolean {
  if (next.goals === current.goals) return true;
  return guess === "higher" ? next.goals > current.goals : next.goals < current.goals;
}
