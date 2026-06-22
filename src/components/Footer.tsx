import { Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 bg-card/50">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <span className="font-display text-lg">
              <span className="text-foreground">FUTBOL</span>
              <span className="text-primary">11</span>
            </span>
            <p className="text-muted-foreground mt-3 leading-relaxed text-xs">
              The ultimate daily football trivia and puzzle platform. 20 unique games covering every league, competition, and era of the beautiful game. New challenges every day at midnight.
            </p>
          </div>
          <div>
            <h4 className="font-body font-semibold text-foreground mb-3">Popular Games</h4>
            <ul className="space-y-1.5 text-muted-foreground text-xs">
              <li><a href="#" className="hover:text-foreground transition-colors">Futbol11 Grid</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Futbol11 Wordle</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Futbol11 Connections</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Futbol11 Bingo</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Guess the Footballer</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Futbol11 World Cup</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-body font-semibold text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-1.5 text-muted-foreground text-xs">
              <li><a href="#games" className="hover:text-foreground transition-colors">All Games</a></li>
              <li><a href="#how-to-play" className="hover:text-foreground transition-colors">How to Play</a></li>
              <li><a href="#about" className="hover:text-foreground transition-colors">About Futbol11</a></li>
              <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
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
          <p>© {new Date().getFullYear()} Futbol11. Daily football trivia games for fans worldwide.</p>
          <p className="mt-1">Premier League • La Liga • Serie A • Bundesliga • Champions League • World Cup</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
