import { otherSites } from "@/data/games";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const OtherSites = () => {
  return (
    <section className="py-12 border-t border-border">
      <div className="container">
        <h2 className="font-display text-lg text-center text-foreground mb-6">Other Sports Games</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {otherSites.map((site) => (
            <a
              key={site.title}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-game-card hover:bg-game-card-hover p-5 transition-all"
            >
              {site.isNew && <Badge className="bg-accent text-accent-foreground text-[10px]">NEW</Badge>}
              <span className="text-3xl">{site.emoji}</span>
              <span className="font-display text-sm text-foreground">{site.title}</span>
              <span className="text-xs text-muted-foreground text-center">{site.description}</span>
              <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherSites;
