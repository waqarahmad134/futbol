"use client";

import { Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { useSectionNav } from "@/hooks/use-section-nav";

const POPULAR_GAMES = [
  { slug: "futbol-grid", label: "Futbol11 Grid" },
  { slug: "futbol11-wordle", label: "Futbol11 Wordle" },
  { slug: "futbol11-connections", label: "Futbol11 Connections" },
  { slug: "futbol11-bingo", label: "Futbol11 Bingo" },
  { slug: "guess-the-footballer", label: "Guess the Footballer" },
  { slug: "futbol11-worldcup", label: "Futbol11 World Cup" },
];

const QUICK_LINKS = [
  { id: "games", label: "All Games" },
  { id: "how-to-play", label: "How to Play" },
  { id: "about", label: "About Futbol11" },
  { id: "faq", label: "FAQ" },
];

const Footer = () => {
  const goToSection = useSectionNav();

  return (
    <footer className="border-t border-border py-12 bg-card/50">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <Link href="/" className="font-display text-lg">
              <span className="text-foreground">FUTBOL</span>
              <span className="text-primary">11</span>
            </Link>
            <p className="text-muted-foreground mt-3 leading-relaxed text-xs">
              The ultimate daily football trivia and puzzle platform. 20 unique games covering every league, competition, and era of the beautiful game. New challenges every day at midnight.
            </p>
          </div>
          <div>
            <h4 className="font-body font-semibold text-foreground mb-3">Popular Games</h4>
            <ul className="space-y-1.5 text-muted-foreground text-xs">
              {POPULAR_GAMES.map((game) => (
                <li key={game.slug}>
                  <Link href={`/game/${game.slug}`} className="hover:text-foreground transition-colors">
                    {game.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-body font-semibold text-foreground mb-3">Quick Links</h4>
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
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </nav>
          <p>© {new Date().getFullYear()} Futbol11. Daily football trivia games for fans worldwide.</p>
          <p className="mt-1">Premier League • La Liga • Serie A • Bundesliga • Champions League • World Cup</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
