"use client";

import Link from "next/link";
import { useSectionNav } from "@/hooks/use-section-nav";
import { useLocalizedStrings, useLocale } from "@/i18n/DictionaryContext";
import { localizePath } from "@/i18n/locales";

const Footer = () => {
  const goToSection = useSectionNav();
  const locale = useLocale();
  const t = useLocalizedStrings("footer", {
    tagline:
      "The ultimate daily football trivia and puzzle platform. 23 unique games covering every league, competition, and era of the beautiful game. New challenges every day at midnight.",
    popularGames: "Popular Games",
    quickLinks: "Quick Links",
    allGames: "All Games",
    howToPlay: "How to Play",
    about: "About Futbol11",
    faq: "FAQ",
    aboutLink: "About",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact",
    blog: "Blog",
    rss: "RSS Feed",
    rights: "Futbol11. Daily football trivia games for fans worldwide.",
    leagues: "Premier League • La Liga • Serie A • Bundesliga • Champions League • World Cup",
  });

  const POPULAR_GAMES = [
    { slug: "futbol-grid", label: "Futbol11 Grid" },
    { slug: "futbol11-wordle", label: "Futbol11 Wordle" },
    { slug: "futbol11-connections", label: "Futbol11 Connections" },
    { slug: "futbol11-bingo", label: "Futbol11 Bingo" },
    { slug: "guess-the-footballer", label: "Guess the Footballer" },
    { slug: "futbol11-worldcup", label: "Futbol11 World Cup" },
  ];

  const QUICK_LINKS = [
    { id: "games", label: t.allGames },
    { id: "how-to-play", label: t.howToPlay },
    { id: "about", label: t.about },
    { id: "faq", label: t.faq },
  ];

  return (
    <footer className="border-t border-border py-12 bg-card/50">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <Link href={localizePath("/", locale)} className="font-display text-lg">
              <span className="text-foreground">FUTBOL</span>
              <span className="text-primary">11</span>
            </Link>
            <p className="text-muted-foreground mt-3 leading-relaxed text-xs">{t.tagline}</p>
          </div>
          <div>
            <h4 className="font-body font-semibold text-foreground mb-3">{t.popularGames}</h4>
            <ul className="space-y-1.5 text-muted-foreground text-xs">
              {POPULAR_GAMES.map((game) => (
                <li key={game.slug}>
                  <Link href={localizePath(`/game/${game.slug}`, locale)} className="hover:text-foreground transition-colors">
                    {game.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-body font-semibold text-foreground mb-3">{t.quickLinks}</h4>
            <ul className="space-y-1.5 text-muted-foreground text-xs">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`/#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      goToSection(link.id);
                    }}
                    className="hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
            <Link href={localizePath("/about", locale)} className="hover:text-foreground transition-colors">{t.aboutLink}</Link>
            <Link href={localizePath("/privacy-policy", locale)} className="hover:text-foreground transition-colors">{t.privacy}</Link>
            <Link href={localizePath("/terms", locale)} className="hover:text-foreground transition-colors">{t.terms}</Link>
            <Link href={localizePath("/contact", locale)} className="hover:text-foreground transition-colors">{t.contact}</Link>
            <Link href={localizePath("/blog", locale)} className="hover:text-foreground transition-colors">{t.blog}</Link>
            <a href="/feed.xml" className="hover:text-foreground transition-colors">{t.rss}</a>
          </nav>
          <p>© {new Date().getFullYear()} {t.rights}</p>
          <p className="mt-1">{t.leagues}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
