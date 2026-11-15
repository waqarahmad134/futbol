import Link from "next/link";
import { otherSites } from "@/data/games";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import { localizeStrings } from "@/i18n/dictionary";
import { localizePath } from "@/i18n/locales";

// Server component: the locale comes from the page as a prop.
const OtherSites = ({ locale = "en" }: { locale?: Locale }) => {
  const t = localizeStrings(locale, "otherSites", {
    title: "Other Sports Games",
    octadle: "Multi-word puzzle game",
    formudle: "Formula 1 daily puzzle",
    wrestleplay: "Wrestling trivia games",
    basketball5: "Basketball daily games",
    new: "NEW",
  });
  const descriptions: Record<string, string> = {
    OCTADLE: t.octadle,
    FORMUDLE: t.formudle,
    WRESTLEPLAY: t.wrestleplay,
    BASKETBALL5: t.basketball5,
  };
  return (
    <section className="py-12 border-t border-border">
      <div className="container">
        <h2 className="font-display text-lg text-center text-foreground mb-6">{t.title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {otherSites.map((site) => {
            const isInternal = site.url.startsWith("/");
            const href = isInternal ? localizePath(site.url, locale) : site.url;
            const inner = (
              <>
                {site.isNew && <Badge className="bg-accent text-accent-foreground text-[10px]">{t.new}</Badge>}
                <span className="text-3xl">{site.emoji}</span>
                <span className="font-display text-sm text-foreground">{site.title}</span>
                <span className="text-xs text-muted-foreground text-center">{descriptions[site.title] ?? site.description}</span>
                {!isInternal && (
                  <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </>
            );
            const className =
              "group flex flex-col items-center gap-2 rounded-xl border border-border bg-game-card hover:bg-game-card-hover p-5 transition-all";
            if (isInternal) {
              return (
                <Link key={site.title} href={href} className={className}>
                  {inner}
                </Link>
              );
            }
            return (
              <a
                key={site.title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {inner}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OtherSites;
