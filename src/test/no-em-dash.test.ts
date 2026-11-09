import { describe, it, expect } from "vitest";
import { games } from "@/data/games";
import { faqs } from "@/data/faqs";
import { BLOG_POSTS } from "@/data/blog";
import { lineupSets } from "@/data/lineups";
import { CLUBS } from "@/data/clubs";

// Waqar's rule: no em-dash (U+2014) in any user-visible copy. This test
// guards every string the site renders from data files, so a future edit
// that reintroduces one fails the build instead of reaching the AdSense review.
const EM_DASH = "\u2014";

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === "object") {
    Object.values(value as Record<string, unknown>).forEach((v) => collectStrings(v, out));
  }
  return out;
}

describe("no em-dash in user-visible copy", () => {
  it("has no em-dash in any game copy", () => {
    for (const g of games) {
      for (const text of [g.title, g.description, g.longDescription, ...g.howToPlay]) {
        expect(text, `game ${g.slug}`).not.toContain(EM_DASH);
      }
    }
  });

  it("has no em-dash in FAQs", () => {
    for (const faq of faqs) {
      expect(faq.q, "faq question").not.toContain(EM_DASH);
      expect(faq.a, "faq answer").not.toContain(EM_DASH);
    }
  });

  it("has no em-dash in blog posts", () => {
    for (const post of BLOG_POSTS) {
      for (const text of collectStrings(post)) {
        expect(text, `blog ${post.slug}`).not.toContain(EM_DASH);
      }
    }
  });

  it("has no em-dash in lineup titles or club clues", () => {
    for (const set of Object.values(lineupSets)) {
      for (const lineup of set) {
        for (const text of collectStrings(lineup)) {
          expect(text, `lineup ${lineup.id}`).not.toContain(EM_DASH);
        }
      }
    }
    for (const club of CLUBS) {
      for (const text of collectStrings(club)) {
        expect(text, `club ${club.name}`).not.toContain(EM_DASH);
      }
    }
  });
});
