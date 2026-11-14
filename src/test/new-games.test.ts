import { describe, it, expect } from "vitest";
import {
  OCTADLE_WORDS,
  OCTADLE_WORD_COUNT,
  getDailyWords,
  getDayIndex,
} from "@/data/octadle-words";
import { F1_DRIVERS, getDailyDriver, findDriver } from "@/data/formudle-drivers";
import { WRESTLERS, getDailyWrestler, findWrestler } from "@/data/wrestleplay-wrestlers";
import { games } from "@/data/games";

describe("octadle", () => {
  it("has a pool of at least 30 unique 5-letter words", () => {
    expect(OCTADLE_WORDS.length).toBeGreaterThanOrEqual(30);
    expect(new Set(OCTADLE_WORDS).size).toBe(OCTADLE_WORDS.length);
    for (const w of OCTADLE_WORDS) expect(w).toMatch(/^[A-Z]{5}$/);
  });

  it("picks 8 distinct daily words, deterministic per date", () => {
    const date = new Date(2026, 10, 9);
    const a = getDailyWords(date);
    const b = getDailyWords(date);
    expect(a).toEqual(b);
    expect(a.length).toBe(OCTADLE_WORD_COUNT);
    expect(new Set(a).size).toBe(OCTADLE_WORD_COUNT);
  });

  it("picks different words on consecutive days", () => {
    expect(getDailyWords(new Date(2026, 10, 9))).not.toEqual(getDailyWords(new Date(2026, 10, 10)));
  });

  it("advances the day index by one per calendar day", () => {
    expect(getDayIndex(new Date(2026, 10, 10)) - getDayIndex(new Date(2026, 10, 9))).toBe(1);
  });
});

describe("formudle", () => {
  it("has a pool of at least 30 unique drivers", () => {
    expect(F1_DRIVERS.length).toBeGreaterThanOrEqual(30);
    expect(new Set(F1_DRIVERS.map((d) => d.name)).size).toBe(F1_DRIVERS.length);
  });

  it("has sane stats for every driver", () => {
    for (const d of F1_DRIVERS) {
      expect(d.debut).toBeGreaterThanOrEqual(1950);
      expect(d.debut).toBeLessThanOrEqual(2026);
      expect(d.titles).toBeGreaterThanOrEqual(0);
      expect(d.titles).toBeLessThanOrEqual(7);
      if (d.firstWin !== null) expect(d.firstWin).toBeGreaterThanOrEqual(d.debut);
      expect(d.funFact.length).toBeGreaterThan(10);
    }
  });

  it("picks a deterministic daily driver and finds drivers by name", () => {
    const date = new Date(2026, 10, 9);
    expect(getDailyDriver(date)).toEqual(getDailyDriver(date));
    expect(findDriver("Lewis Hamilton")?.titles).toBe(7);
    expect(findDriver("lewis hamilton")?.team).toBe("Ferrari");
    expect(findDriver("Nobody Here")).toBeUndefined();
  });
});

describe("wrestleplay", () => {
  it("has a pool of at least 30 unique wrestlers", () => {
    expect(WRESTLERS.length).toBeGreaterThanOrEqual(30);
    expect(new Set(WRESTLERS.map((w) => w.name)).size).toBe(WRESTLERS.length);
  });

  it("has sane stats for every wrestler", () => {
    for (const w of WRESTLERS) {
      expect(w.debut).toBeGreaterThanOrEqual(1972);
      expect(w.debut).toBeLessThanOrEqual(2026);
      expect(w.heightCm).toBeGreaterThanOrEqual(160);
      expect(w.heightCm).toBeLessThanOrEqual(215);
      expect(w.worldTitles).toBeGreaterThanOrEqual(0);
      expect(w.finisher.length).toBeGreaterThan(2);
      expect(w.funFact.length).toBeGreaterThan(10);
    }
  });

  it("picks a deterministic daily wrestler and finds wrestlers by name", () => {
    const date = new Date(2026, 10, 9);
    expect(getDailyWrestler(date)).toEqual(getDailyWrestler(date));
    expect(findWrestler("John Cena")?.worldTitles).toBe(17);
    expect(findWrestler("john cena")?.finisher).toBe("Attitude Adjustment");
    expect(findWrestler("Nobody Here")).toBeUndefined();
  });
});

describe("games registry", () => {
  it("lists all three new games with the right slugs, categories and order of fields", () => {
    for (const slug of ["octadle", "formudle", "wrestleplay"]) {
      const g = games.find((x) => x.slug === slug);
      expect(g).toBeDefined();
      expect(g!.title).toBeTruthy();
      expect(g!.description).toBeTruthy();
      expect(g!.longDescription).toBeTruthy();
      expect(g!.howToPlay.length).toBeGreaterThanOrEqual(4);
    }
    expect(games.find((x) => x.slug === "octadle")!.category).toBe("Word");
    expect(games.find((x) => x.slug === "formudle")!.category).toBe("Trivia");
    expect(games.find((x) => x.slug === "wrestleplay")!.category).toBe("Trivia");
    expect(games.length).toBe(23);
  });

  it("has no em-dash in any new game copy", () => {
    for (const g of games.filter((x) => ["octadle", "formudle", "wrestleplay"].includes(x.slug))) {
      for (const text of [g.title, g.description, g.longDescription, ...g.howToPlay]) {
        expect(text).not.toContain("—");
      }
    }
  });
});
