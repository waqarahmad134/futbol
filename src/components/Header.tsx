import { Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useSectionNav } from "@/hooks/use-section-nav";

const NAV_ITEMS = [
  { id: "games", label: "Games" },
  { id: "how-to-play", label: "How to Play" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
];

const Header = () => {
  const goToSection = useSectionNav();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-wider">
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
        </nav>
        <div className="flex items-center gap-3">
          <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
