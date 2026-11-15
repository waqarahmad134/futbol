// Server-safe dictionary lookup (no "use client"): plain functions over
// the locale dictionaries. Server components (locale pages, SEO content)
// import from here; client components use the hook in
// DictionaryContext.tsx, which wraps these same functions.
import type { Locale } from "./locales";
import { pt } from "./dictionaries/pt";
import { es } from "./dictionaries/es";
import { fr } from "./dictionaries/fr";
import { games, type Game } from "@/data/games";
import { faqs, type Faq } from "@/data/faqs";

export type { Game };

// A dictionary is a flat map of sections, each a map of keys to the
// translated string. Sections are named by area, e.g. "common",
// "header", "home", "game.wordle", "games".
export type LocaleStrings = Record<string, Record<string, string>>;

const DICTIONARIES: Record<Exclude<Locale, "en">, LocaleStrings> = {
  pt,
  es,
  fr,
};

// English is the empty dictionary: every lookup falls back to the
// English default passed by the caller.
export function getDictionary(locale: Locale): LocaleStrings {
  return locale === "en" ? {} : DICTIONARIES[locale];
}

// Merge locale overrides over English defaults. Any key missing from
// the locale dictionary falls back to the English string, so a missing
// translation can never render a blank label.
export function localizeStrings<T extends Record<string, string>>(
  locale: Locale,
  section: string,
  defaults: T
): T {
  const overrides = getDictionary(locale)[section];
  if (!overrides) return defaults;
  const out = { ...defaults };
  for (const key of Object.keys(defaults)) {
    if (overrides[key] !== undefined) {
      (out as Record<string, string>)[key] = overrides[key];
    }
  }
  return out;
}

// Replace {placeholder} tokens in a translated string, e.g.
// fmt(t.win, { n: "3" }). Missing values leave the token in place.
export function fmt(template: string, vars: Record<string, string | number>): string {
  let out = template;
  for (const [key, value] of Object.entries(vars)) {
    out = out.split(`{${key}}`).join(String(value));
  }
  return out;
}

// Localised game record: title, description, long description and
// how-to-play steps come from the "games" section, keyed by slug
// ("<slug>.title", "<slug>.description", "<slug>.long",
// "<slug>.how.0" ...). Missing keys fall back to the English data.
export function localizeGame(locale: Locale, game: Game): Game {
  if (locale === "en") return game;
  const dict = getDictionary(locale)["games"];
  if (!dict) return game;
  const out: Game = { ...game };
  const title = dict[`${game.slug}.title`];
  if (title) out.title = title;
  const description = dict[`${game.slug}.description`];
  if (description) out.description = description;
  const long = dict[`${game.slug}.long`];
  if (long) out.longDescription = long;
  const how: string[] = [];
  for (let i = 0; i < game.howToPlay.length; i++) {
    how.push(dict[`${game.slug}.how.${i}`] ?? game.howToPlay[i]);
  }
  out.howToPlay = how;
  return out;
}

// All games with localised strings applied.
export function localizedGames(locale: Locale): Game[] {
  return games.map((g) => localizeGame(locale, g));
}

// Localised FAQ list. The "faq" section holds q1..qN / a1..aN plus the
// section heading and intro; missing keys fall back to English.
export function getLocalizedFaqs(locale: Locale): Faq[] {
  if (locale === "en") return faqs;
  const dict = getDictionary(locale)["faq"];
  if (!dict) return faqs;
  return faqs.map((faq, i) => ({
    q: dict[`q${i + 1}`] ?? faq.q,
    a: dict[`a${i + 1}`] ?? faq.a,
  }));
}

// Localised difficulty and category labels shown on game cards and pages.
export function localizeDifficulty(locale: Locale, difficulty: Game["difficulty"]): string {
  const key = `difficulty${difficulty}` as const;
  return localizeStrings(locale, "common", {
    difficultyEasy: "Easy",
    difficultyMedium: "Medium",
    difficultyHard: "Hard",
  })[key];
}

export function localizeCategory(locale: Locale, category: Game["category"]): string {
  const key = `category${category}` as const;
  return localizeStrings(locale, "common", {
    categoryTrivia: "Trivia",
    categoryPuzzle: "Puzzle",
    categoryWord: "Word",
    categoryStrategy: "Strategy",
  })[key];
}
