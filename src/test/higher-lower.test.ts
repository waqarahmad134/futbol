import { describe, it, expect } from "vitest";
import {
  HL_PLAYERS,
  getDailySequence,
  getDayIndex,
  isCorrectGuess,
} from "@/data/higher-lower";

describe("higher-lower", () => {
  it("has a unique career-goal total for every player (no ambiguous ties)", () => {
    const totals = HL_PLAYERS.map((p) => p.goals);
    expect(new Set(totals).size).toBe(totals.length);
  });

  it("produces a deterministic daily sequence for a given date", () => {
    const date = new Date(2026, 5, 22);
    const a = getDailySequence(date);
    const b = getDailySequence(date);
    expect(a.map((p) => p.name)).toEqual(b.map((p) => p.name));
  });

  it("produces a different order on consecutive days", () => {
    const today = getDailySequence(new Date(2026, 5, 22));
    const tomorrow = getDailySequence(new Date(2026, 5, 23));
    expect(today.map((p) => p.name)).not.toEqual(tomorrow.map((p) => p.name));
  });

  it("includes every player exactly once in the daily sequence", () => {
    const seq = getDailySequence(new Date(2026, 5, 22));
    expect(seq.length).toBe(HL_PLAYERS.length);
    expect(new Set(seq.map((p) => p.name)).size).toBe(HL_PLAYERS.length);
  });

  it("advances the day index by one per calendar day", () => {
    const d1 = getDayIndex(new Date(2026, 5, 22));
    const d2 = getDayIndex(new Date(2026, 5, 23));
    expect(d2 - d1).toBe(1);
  });

  it("scores guesses by relative goal totals", () => {
    const more = { name: "A", country: "X", goals: 500 };
    const fewer = { name: "B", country: "Y", goals: 100 };
    expect(isCorrectGuess(more, fewer, "lower")).toBe(true);
    expect(isCorrectGuess(more, fewer, "higher")).toBe(false);
    expect(isCorrectGuess(fewer, more, "higher")).toBe(true);
    expect(isCorrectGuess(fewer, more, "lower")).toBe(false);
  });

  it("treats equal totals as correct either way", () => {
    const a = { name: "A", country: "X", goals: 300 };
    const b = { name: "B", country: "Y", goals: 300 };
    expect(isCorrectGuess(a, b, "higher")).toBe(true);
    expect(isCorrectGuess(a, b, "lower")).toBe(true);
  });
});
