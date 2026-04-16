import { Instagram, Twitter } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="font-display text-2xl tracking-wider">
          <span className="text-foreground">FUTBOL</span>
          <span className="text-primary">11</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 font-body text-sm text-muted-foreground">
          <a href="#games" className="hover:text-foreground transition-colors">Games</a>
          <a href="#how-to-play" className="hover:text-foreground transition-colors">How to Play</a>
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
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
