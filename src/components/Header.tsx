"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSectionNav } from "@/hooks/use-section-nav";

const NAV_ITEMS = [
  { id: "games", label: "Games" },
  { id: "how-to-play", label: "How to Play" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
];

const Header = () => {
  const goToSection = useSectionNav();
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (id: string) => {
    setMenuOpen(false);
    goToSection(id);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-wider">
          <span className="text-foreground">FUTBOL</span>
          <span className="text-primary">11</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 font-body text-sm text-muted-foreground">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                goToSection(item.id);
              }}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Link href="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
        </nav>
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors p-2"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <ul className="container py-2 font-body text-sm text-muted-foreground">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`/#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(item.id);
                  }}
                  className="block py-3 hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/blog"
                onClick={() => setMenuOpen(false)}
                className="block py-3 hover:text-foreground transition-colors"
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
