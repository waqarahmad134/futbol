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
                Futbol11 is the internet's premier destination for daily football trivia games and puzzles. Whether you're a lifelong supporter who remembers every World Cup lineup since 1966, or a newer fan eager to learn about football history, our collection of 19 unique games offers something for everyone.
              </p>
              <p>
                Every day at midnight, fresh challenges await. Our games cover the full spectrum of football knowledge — from current Premier League, La Liga, and Serie A squads to historic international lineups, from transfer trivia to tactical puzzles. Each game is carefully crafted to be both entertaining and educational.
              </p>
              <p>
                Unlike generic sports trivia apps, Futbol11 is built by football fans, for football fans. We focus exclusively on the beautiful game, which means deeper questions, more nuanced challenges, and a community that truly understands the sport. Our daily format keeps you coming back, building a streak that proves your dedication to football knowledge.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-foreground font-semibold text-base">Football Knowledge Across Eras</h3>
              <p>
                Our games span the entire history of professional football. The World Cup edition covers matches from Uruguay 1930 to Qatar 2022. The Legends games feature players from every era — from the graceful dribbling of Sir Stanley Matthews to the tiki-taka mastery of Xavi Hernández.
              </p>
              <p>
                We cover all major leagues and competitions: the English Premier League, Spanish La Liga, Italian Serie A, German Bundesliga, French Ligue 1, the UEFA Champions League, Copa Libertadores, and every major international tournament. Our databases include over 10,000 players, 500 clubs, and thousands of historic lineups.
              </p>
              <p>
                The daily rotation ensures variety — you might face a 1970 Brazil lineup one day and a 2023 Champions League match the next. This breadth of content means there's always something new to learn, making Futbol11 not just a game, but an education in football history.
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
                Your daily score tracks correct and incorrect answers across all games. Challenge yourself to improve each day. Share your results with friends and compete to see who truly knows more about football. The daily reset keeps things fair — everyone gets the same challenges at the same time.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-foreground font-semibold text-base">🎓 Learn While Playing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every wrong answer is a learning opportunity. When you miss a player in a lineup, you discover someone new. When you can't complete a connection, you learn an unexpected fact. Futbol11 has helped thousands of fans deepen their understanding of football history, tactics, and the rich tapestry of the sport's evolution.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default SEOContent;
