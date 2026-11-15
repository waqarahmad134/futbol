"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./locales";
import { localizeStrings, localizeGame, getLocalizedFaqs, type Game } from "./dictionary";
import type { Faq } from "@/data/faqs";

// Re-exported so client components can keep importing the lookup
// helpers from this module. Server components must import from
// "./dictionary" instead: calling a function exported by a client
// module from a server component fails at build time.
export { getDictionary, localizeStrings, fmt } from "./dictionary";
export type { LocaleStrings } from "./dictionary";

const DictionaryContext = createContext<{ locale: Locale }>({
  locale: "en",
});

// Wrap locale page content so client components (header, footer,
// game cards, game views, game components) render translated strings.
// English pages render without a provider and keep their current strings.
export function DictionaryProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <DictionaryContext.Provider value={{ locale }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(DictionaryContext).locale;
}

// Client-component version of localizeStrings: reads the locale from
// context and merges the section overrides over the English defaults
// passed inline by the component.
export function useLocalizedStrings<T extends Record<string, string>>(
  section: string,
  defaults: T
): T {
  const { locale } = useContext(DictionaryContext);
  return localizeStrings(locale, section, defaults);
}

// Client-component version of localizeGame: returns the game record
// with translated title, description, long description and how-to-play
// steps for the current locale.
export function useLocalizedGame(game: Game): Game {
  const { locale } = useContext(DictionaryContext);
  return localizeGame(locale, game);
}

// Client-component version of getLocalizedFaqs: the FAQ list with
// translated questions and answers for the current locale.
export function useLocalizedFaqs(): Faq[] {
  const { locale } = useContext(DictionaryContext);
  return getLocalizedFaqs(locale);
}
