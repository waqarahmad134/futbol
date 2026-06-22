import { Gamepad2, Clock, Trophy, Users } from "lucide-react";

const steps = [
  { icon: Gamepad2, title: "Pick a Game", desc: "Choose from 20 unique football games — trivia, puzzles, word games, and strategy challenges." },
  { icon: Clock, title: "Play Daily", desc: "New challenges drop every day at midnight. Build your streak and track your daily score across all games." },
  { icon: Trophy, title: "Test Your Knowledge", desc: "From Premier League to World Cup, from 1930 to today. Every era, league, and competition is covered." },
  { icon: Users, title: "Share & Compete", desc: "Compare scores with friends and the global community. Who really knows football best?" },
];

const HowToPlay = () => {
  return (
    <section id="how-to-play" className="py-16 border-t border-border">
      <div className="container max-w-4xl">
        <h2 className="font-display text-xl text-center text-foreground mb-2">How to Play Futbol11</h2>
        <p className="text-center text-muted-foreground text-sm mb-10 max-w-xl mx-auto">
          Getting started is easy. No account required — just pick a game and play. Every game resets daily with fresh challenges.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="font-display text-xs text-muted-foreground">STEP {i + 1}</div>
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
