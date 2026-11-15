import type { Locale } from "@/i18n/locales";
import { localizeStrings } from "@/i18n/dictionary";

// Server component: the locale comes from the page as a prop.
const SEOContent = ({ locale = "en" }: { locale?: Locale }) => {
  const t = localizeStrings(locale, "seo", {
    heading: "The Ultimate Football Trivia & Puzzle Platform",
    whyTitle: "Why Play Futbol11?",
    whyP1:
      "Futbol11 is the home of free daily football games. Every day at midnight, 23 football trivia games and puzzles refresh with new challenges, so you play the same puzzle as fans around the world. Whether you are a lifelong supporter who remembers every World Cup lineup since 1966, or a newer fan eager to learn about football history, our daily football games offer something for everyone.",
    whyP2:
      "Our games cover the full range of football knowledge, from current Premier League, La Liga, and Serie A squads to historic international lineups, from transfer trivia to tactical puzzles. Each game is carefully crafted to be both entertaining and educational, and every puzzle takes only a few minutes to play.",
    whyP3:
      "Unlike generic sports trivia apps, Futbol11 is built by football fans, for football fans. We focus only on the beautiful game, which means deeper questions, more nuanced challenges, and puzzles that reward real football knowledge. Our daily format keeps you coming back, and your streak grows with every day you play.",
    erasTitle: "Football Knowledge Across Eras",
    erasP1:
      "Our games span the entire history of professional football. The World Cup edition covers matches from Uruguay 1930 to Qatar 2022. The Legends games feature players from every era, from the graceful dribbling of Sir Stanley Matthews to the tiki-taka mastery of Xavi Hernández.",
    erasP2:
      "We cover all major leagues and competitions: the English Premier League, Spanish La Liga, Italian Serie A, German Bundesliga, French Ligue 1, the UEFA Champions League, Copa Libertadores, and every major international tournament. Our databases include over 10,000 players, 500 clubs, and thousands of historic lineups.",
    erasP3:
      "The daily rotation ensures variety, you might face a 1970 Brazil lineup one day and a 2023 Champions League match the next. This breadth of content means there is always something new to learn, making Futbol11 not just a game, but an education in football history.",
    howTitle: "How to Play Daily Football Games",
    howStep1Title: "Pick a game",
    howStep1Desc:
      "Choose any of the 23 games on the home page. Start with Wordle or Higher or Lower if you are new, or jump straight into the Football Grid.",
    howStep2Title: "Play today's puzzle",
    howStep2Desc:
      "Every game has one puzzle per day. Read the clues, make your guesses, and use hints when you are stuck. No account is needed.",
    howStep3Title: "Check your score",
    howStep3Desc:
      "Your daily score tracks wins and losses across all games. Your streak counts every consecutive day you play.",
    howStep4Title: "Come back tomorrow",
    howStep4Desc:
      "New puzzles arrive at midnight. Compare your result with friends, climb the leaderboard, and keep your streak alive.",
    everyFanTitle: "Football Games for Every Kind of Fan",
    everyFanP1:
      "Word game fans can play Futbol11 Wordle, where you name a mystery footballer in 6 guesses, or Octadle, where you solve eight five-letter football words at once. Puzzle fans can fill the Football Grid, sort 16 items in Connections, or spot the odd one out in Impostor.",
    everyFanP2:
      "Trivia fans get the widest choice. Guess historic starting lineups in the flagship Futbol11 game, name all-time great XIs in Legends, or test your memory of Euro 2024, Copa America, and every World Cup from 1930 to 2022. Higher or Lower turns career goal totals into a fast streak game, and Guess the Footballer hides a player behind text clues and a flag.",
    everyFanP3:
      "We also cover other sports in the same daily format. Formudle asks you to name a Formula 1 driver from nationality, team, debut, titles, and first win. WrestlePlay does the same for wrestlers, comparing promotion, debut, height, and world titles.",
    leaguesTitle: "Leagues, Tournaments and Eras Covered",
    leaguesP1:
      "Every major league is in play: the Premier League, La Liga, Serie A, the Bundesliga, Ligue 1, MLS, and Liga MX. European nights are covered through the Champions League and Europa League, and South American football through the Copa Libertadores and Copa America.",
    leaguesP2:
      "International football runs through the whole site. The World Cup games cover every tournament from Uruguay 1930 to Qatar 2022, and the Euro 2024 edition covers every match of the tournament in Germany. The America edition follows Copa America, CONCACAF matches, and Libertadores classics.",
    leaguesP3:
      "That range matters for play. A question can come from any era, league, or competition, so the fan who follows more than one league has an edge. The blog adds step-by-step guides for the most popular games, starting with Wordle and the Football Grid, so new players can learn the rules fast and win sooner.",
    categoriesTitle: "Game Categories Explained",
    cat1Title: "Trivia Games",
    cat1Desc:
      "Test your football facts knowledge. From player stats to club histories, these games reward the encyclopedic football mind.",
    cat2Title: "Puzzle Games",
    cat2Desc:
      "Logic meets football. Grid, Connections, and Impostor require deductive reasoning alongside football expertise.",
    cat3Title: "Word Games",
    cat3Desc:
      "Wordle-style gameplay with a football twist. Guess player names letter by letter with color-coded feedback.",
    cat4Title: "Strategy Games",
    cat4Desc:
      "Link and chain-building games that challenge you to think several steps ahead using football career knowledge.",
    stadiumTitle: "🏟️ Stadium of Knowledge",
    stadiumText:
      "Did you know that over 200 countries are FIFA members, making football the most globally played sport? Our games reflect this diversity, featuring players and teams from every continent. From the packed stadiums of South America to the tactical sophistication of European football, Futbol11 celebrates the worldwide reach of the beautiful game.",
    trackTitle: "📊 Track Your Progress",
    trackText:
      "Your daily score tracks correct and incorrect answers across all games. Your streak counts each consecutive day you play, and the leaderboard ranks the top players by wins and best streak, using anonymous player labels, never names or emails. The daily reset keeps things fair, everyone gets the same challenges at the same time.",
    learnTitle: "🎓 Learn While Playing",
    learnText:
      "Every wrong answer is a learning opportunity. When you miss a player in a lineup, you discover someone new. When you can't complete a connection, you learn an unexpected fact. Futbol11 has helped thousands of fans deepen their understanding of football history, tactics, and the rich tapestry of the sport's evolution.",
    updated: "Content last updated: November 9, 2026. New games and guides are added regularly.",
  });

  const howSteps = [
    { step: "1", title: t.howStep1Title, desc: t.howStep1Desc },
    { step: "2", title: t.howStep2Title, desc: t.howStep2Desc },
    { step: "3", title: t.howStep3Title, desc: t.howStep3Desc },
    { step: "4", title: t.howStep4Title, desc: t.howStep4Desc },
  ];
  const categories = [
    { title: t.cat1Title, icon: "🧠", desc: t.cat1Desc },
    { title: t.cat2Title, icon: "🧩", desc: t.cat2Desc },
    { title: t.cat3Title, icon: "📝", desc: t.cat3Desc },
    { title: t.cat4Title, icon: "♟️", desc: t.cat4Desc },
  ];

  return (
    <section id="about" className="py-16 border-t border-border">
      <div className="container max-w-4xl">
        <article className="prose prose-invert max-w-none font-body">
          <h2 className="font-display text-2xl text-foreground mb-6 text-center">{t.heading}</h2>

          <div className="grid md:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-foreground font-semibold text-base">{t.whyTitle}</h3>
              <p>{t.whyP1}</p>
              <p>{t.whyP2}</p>
              <p>{t.whyP3}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-foreground font-semibold text-base">{t.erasTitle}</h3>
              <p>{t.erasP1}</p>
              <p>{t.erasP2}</p>
              <p>{t.erasP3}</p>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <h3 className="font-display text-xl text-foreground text-center">{t.howTitle}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {howSteps.map((item) => (
                <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                  <span className="flex w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold items-center justify-center mb-2">{item.step}</span>
                  <h4 className="text-foreground font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-foreground font-semibold text-base">{t.everyFanTitle}</h3>
              <p>{t.everyFanP1}</p>
              <p>{t.everyFanP2}</p>
              <p>{t.everyFanP3}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-foreground font-semibold text-base">{t.leaguesTitle}</h3>
              <p>{t.leaguesP1}</p>
              <p>{t.leaguesP2}</p>
              <p>{t.leaguesP3}</p>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <h3 className="font-display text-xl text-foreground text-center">{t.categoriesTitle}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <div key={cat.title} className="rounded-lg border border-border bg-card p-4">
                  <span className="text-2xl block mb-2">{cat.icon}</span>
                  <h4 className="text-foreground font-semibold text-sm mb-1">{cat.title}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-3">
              <h3 className="text-foreground font-semibold text-base">{t.stadiumTitle}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.stadiumText}</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-foreground font-semibold text-base">{t.trackTitle}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.trackText}</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-foreground font-semibold text-base">{t.learnTitle}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.learnText}</p>
            </div>
          </div>

          <p className="mt-12 text-center text-xs text-muted-foreground">{t.updated}</p>
        </article>
      </div>
    </section>
  );
};

export default SEOContent;
