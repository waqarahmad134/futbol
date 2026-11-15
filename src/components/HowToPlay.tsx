import { Gamepad2, Clock, Trophy, Users } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import { localizeStrings } from "@/i18n/dictionary";

// Server component: the locale comes from the page as a prop.
const HowToPlay = ({ locale = "en" }: { locale?: Locale }) => {
  const t = localizeStrings(locale, "howTo", {
    title: "How to Play Futbol11",
    intro:
      "Getting started is easy. No account required, just pick a game and play. Every game resets daily with fresh challenges.",
    step: "STEP",
    step1Title: "Pick a Game",
    step1Desc:
      "Choose from 23 unique football games, trivia, puzzles, word games, and strategy challenges.",
    step2Title: "Play Daily",
    step2Desc:
      "New challenges drop every day at midnight. Build your streak and track your daily score across all games.",
    step3Title: "Test Your Knowledge",
    step3Desc:
      "From Premier League to World Cup, from 1930 to today. Every era, league, and competition is covered.",
    step4Title: "Share & Compete",
    step4Desc: "Compare scores with friends and the global community. Who really knows football best?",
  });
  const steps = [
    { icon: Gamepad2, title: t.step1Title, desc: t.step1Desc },
    { icon: Clock, title: t.step2Title, desc: t.step2Desc },
    { icon: Trophy, title: t.step3Title, desc: t.step3Desc },
    { icon: Users, title: t.step4Title, desc: t.step4Desc },
  ];

  return (
    <section id="how-to-play" className="py-16 border-t border-border">
      <div className="container max-w-4xl">
        <h2 className="font-display text-xl text-center text-foreground mb-2">{t.title}</h2>
        <p className="text-center text-muted-foreground text-sm mb-10 max-w-xl mx-auto">{t.intro}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="font-display text-xs text-muted-foreground">{t.step} {i + 1}</div>
              <h3 className="font-body font-semibold text-foreground text-sm">{step.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToPlay;
