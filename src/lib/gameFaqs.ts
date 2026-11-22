import type { Game } from "@/data/games";
import { BLOG_POSTS } from "@/data/blog";
import type { Faq } from "@/data/faqs";

// Per-game "how to play" FAQs for the game pages, built only from content
// that already exists on the site: each game's own howToPlay steps, the
// site-wide facts from src/data/faqs.ts, and the blog's how-to-play FAQs
// for the games that have a matching blog guide. No new rules text is
// invented here. Game data strings stay English on purpose: answer
// matching in the games is string-based, so game content is not translated.

// Waqar's rule: no em-dash anywhere. Some existing game strings contain
// em-dashes, so derived answers are sanitised instead of editing game data.
export function noEmDash(text: string): string {
  return text
    .replace(/\s*—\s*/g, ", ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function sentences(steps: string[]): string {
  return steps
    .map((step) => {
      const clean = noEmDash(step);
      return clean.endsWith(".") ? clean : `${clean}.`;
    })
    .join(" ");
}

export function buildQuickAnswer(game: Game): string {
  const description = noEmDash(game.description);
  const text = `${game.title} is a free daily ${game.category.toLowerCase()} game. ${description} A new puzzle appears every day at midnight UTC, and you play free with no account.`;
  return noEmDash(text);
}

export function buildGameFaqs(game: Game): Faq[] {
  const howToPlayFaq: Faq = {
    q: `How do you play ${game.title}?`,
    a: sentences(game.howToPlay),
  };

  // Games with a matching blog guide reuse that guide's FAQs verbatim,
  // which already cover guess limits, the daily reset, and accounts.
  const guide = BLOG_POSTS.find(
    (post) => post.ctaHref.replace(/\/$/, "") === `/game/${game.slug}`,
  );
  if (guide) {
    return [howToPlayFaq, ...guide.faqs];
  }

  return [
    howToPlayFaq,
    {
      q: `Is ${game.title} free to play?`,
      a: `Yes. ${game.title} is free to play on Futbol11, with no account and nothing to download. Your daily score is stored in your browser.`,
    },
    {
      q: `When does the daily ${game.title} puzzle reset?`,
      a: `A new ${game.title} puzzle appears every day at midnight UTC. Everyone plays the same puzzle that day, so you can compare your result with friends.`,
    },
  ];
}
