import { describe, it, expect } from "vitest";
import { computeStreaks } from "./streak";

const today = new Date().toISOString().slice(0, 10);
const shift = (day: string, delta: number): string => {
  const d = new Date(`${day}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
};

describe("computeStreaks", () => {
  it("returns zeros with no play dates", () => {
    expect(computeStreaks([])).toEqual({ current: 0, best: 0, totalDays: 0 });
  });

  it("counts a single day played today", () => {
    expect(computeStreaks([today])).toEqual({ current: 1, best: 1, totalDays: 1 });
  });

  it("counts consecutive days ending today", () => {
    const days = [shift(today, -2), shift(today, -1), today];
    expect(computeStreaks(days)).toEqual({ current: 3, best: 3, totalDays: 3 });
  });

  it("keeps the current streak when today is not played yet but yesterday was", () => {
    const days = [shift(today, -2), shift(today, -1)];
    expect(computeStreaks(days)).toEqual({ current: 2, best: 2, totalDays: 2 });
  });

  it("drops the current streak to zero after a missed day", () => {
    const days = [shift(today, -5), shift(today, -4), shift(today, -3)];
    expect(computeStreaks(days)).toEqual({ current: 0, best: 3, totalDays: 3 });
  });

  it("keeps the best streak separate from the current one", () => {
    const days = [
      shift(today, -9),
      shift(today, -8),
      shift(today, -7),
      shift(today, -6),
      shift(today, -5),
      shift(today, -1),
      today,
    ];
    expect(computeStreaks(days)).toEqual({ current: 2, best: 5, totalDays: 7 });
  });

  it("counts duplicate plays on one day only once", () => {
    const days = [today, today, today, shift(today, -1), shift(today, -1)];
    expect(computeStreaks(days)).toEqual({ current: 2, best: 2, totalDays: 2 });
  });
});
