const SEOContent = () => {
  return (
    <section id="about" className="py-16 border-t border-border">
      <div className="container max-w-4xl">
        <article className="prose prose-invert max-w-none font-body">
          <h2 className="font-display text-2xl text-foreground mb-6 text-center">
            The Ultimate Football Trivia & Puzzle Platform
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-foreground font-semibold text-base">Why Play Futbol11?</h3>
              <p>
                Futbol11 is the home of free daily football games. Every day at midnight, 23 football
                trivia games and puzzles refresh with new challenges, so you play the same puzzle as
                fans around the world. Whether you are a lifelong supporter who remembers every World
                Cup lineup since 1966, or a newer fan eager to learn about football history, our daily
                football games offer something for everyone.
              </p>
              <p>
                Our games cover the full range of football knowledge, from current Premier League, La
                Liga, and Serie A squads to historic international lineups, from transfer trivia to
                tactical puzzles. Each game is carefully crafted to be both entertaining and
                educational, and every puzzle takes only a few minutes to play.
              </p>
              <p>
                Unlike generic sports trivia apps, Futbol11 is built by football fans, for football
                fans. We focus only on the beautiful game, which means deeper questions, more nuanced
                challenges, and puzzles that reward real football knowledge. Our daily format keeps
                you coming back, and your streak grows with every day you play.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-foreground font-semibold text-base">Football Knowledge Across Eras</h3>
              <p>
                Our games span the entire history of professional football. The World Cup edition
                covers matches from Uruguay 1930 to Qatar 2022. The Legends games feature players
                from every era, from the graceful dribbling of Sir Stanley Matthews to the tiki-taka
                mastery of Xavi Hernández.
              </p>
              <p>
                We cover all major leagues and competitions: the English Premier League, Spanish La
                Liga, Italian Serie A, German Bundesliga, French Ligue 1, the UEFA Champions League,
                Copa Libertadores, and every major international tournament. Our databases include
                over 10,000 players, 500 clubs, and thousands of historic lineups.
              </p>
              <p>
                The daily rotation ensures variety, you might face a 1970 Brazil lineup one day and
                a 2023 Champions League match the next. This breadth of content means there is always
                something new to learn, making Futbol11 not just a game, but an education in football
                history.
              </p>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <h3 className="font-display text-xl text-foreground text-center">How to Play Daily Football Games</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { step: "1", title: "Pick a game", desc: "Choose any of the 23 games on the home page. Start with Wordle or Higher or Lower if you are new, or jump straight into the Football Grid." },
                { step: "2", title: "Play today's puzzle", desc: "Every game has one puzzle per day. Read the clues, make your guesses, and use hints when you are stuck. No account is needed." },
                { step: "3", title: "Check your score", desc: "Your daily score tracks wins and losses across all games. Your streak counts every consecutive day you play." },
                { step: "4", title: "Come back tomorrow", desc: "New puzzles arrive at midnight. Compare your result with friends, climb the leaderboard, and keep your streak alive." },
              ].map((item) => (
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
              <h3 className="text-foreground font-semibold text-base">Football Games for Every Kind of Fan</h3>
              <p>
                Word game fans can play Futbol11 Wordle, where you name a mystery footballer in 6
                guesses, or Octadle, where you solve eight five-letter football words at once.
                Puzzle fans can fill the Football Grid, sort 16 items in Connections, or spot the
                odd one out in Impostor.
              </p>
              <p>
                Trivia fans get the widest choice. Guess historic starting lineups in the flagship
                Futbol11 game, name all-time great XIs in Legends, or test your memory of Euro 2024,
                Copa America, and every World Cup from 1930 to 2022. Higher or Lower turns career
                goal totals into a fast streak game, and Guess the Footballer hides a player behind
                text clues and a flag.
              </p>
              <p>
                We also cover other sports in the same daily format. Formudle asks you to name a
                Formula 1 driver from nationality, team, debut, titles, and first win. WrestlePlay
                does the same for wrestlers, comparing promotion, debut, height, and world titles.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-foreground font-semibold text-base">Leagues, Tournaments and Eras Covered</h3>
              <p>
                Every major league is in play: the Premier League, La Liga, Serie A, the Bundesliga,
                Ligue 1, MLS, and Liga MX. European nights are covered through the Champions League
                and Europa League, and South American football through the Copa Libertadores and Copa
                America.
              </p>
              <p>
                International football runs through the whole site. The World Cup games cover every
                tournament from Uruguay 1930 to Qatar 2022, and the Euro 2024 edition covers every
                match of the tournament in Germany. The America edition follows Copa America,
                CONCACAF matches, and Libertadores classics.
              </p>
              <p>
                That range matters for play. A question can come from any era, league, or
                competition, so the fan who follows more than one league has an edge. The blog adds
                step-by-step guides for the most popular games, starting with Wordle and the
                Football Grid, so new players can learn the rules fast and win sooner.
              </p>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <h3 className="font-display text-xl text-foreground text-center">Game Categories Explained</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Trivia Games", icon: "🧠", desc: "Test your football facts knowledge. From player stats to club histories, these games reward the encyclopedic football mind." },
                { title: "Puzzle Games", icon: "🧩", desc: "Logic meets football. Grid, Connections, and Impostor require deductive reasoning alongside football expertise." },
                { title: "Word Games", icon: "📝", desc: "Wordle-style gameplay with a football twist. Guess player names letter by letter with color-coded feedback." },
                { title: "Strategy Games", icon: "♟️", desc: "Link and chain-building games that challenge you to think several steps ahead using football career knowledge." },
              ].map((cat) => (
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
              <h3 className="text-foreground font-semibold text-base">🏟️ Stadium of Knowledge</h3>
              <p className="text-muted-foreground leading-relaxed">
                Did you know that over 200 countries are FIFA members, making football the most globally played sport? Our games reflect this diversity, featuring players and teams from every continent. From the packed stadiums of South America to the tactical sophistication of European football, Futbol11 celebrates the worldwide reach of the beautiful game.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-foreground font-semibold text-base">📊 Track Your Progress</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your daily score tracks correct and incorrect answers across all games. Your streak
                counts each consecutive day you play, and the leaderboard ranks the top players by
                wins and best streak, using anonymous player labels, never names or emails. The daily
                reset keeps things fair, everyone gets the same challenges at the same time.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-foreground font-semibold text-base">🎓 Learn While Playing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every wrong answer is a learning opportunity. When you miss a player in a lineup, you discover someone new. When you can&apos;t complete a connection, you learn an unexpected fact. Futbol11 has helped thousands of fans deepen their understanding of football history, tactics, and the rich tapestry of the sport&apos;s evolution.
              </p>
            </div>
          </div>

          <p className="mt-12 text-center text-xs text-muted-foreground">
            Content last updated: November 9, 2026. New games and guides are added regularly.
          </p>
        </article>
      </div>
    </section>
  );
};

export default SEOContent;
