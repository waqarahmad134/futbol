export interface Game {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  howToPlay: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  category: "Trivia" | "Puzzle" | "Word" | "Strategy";
  isNew?: boolean;
  emoji: string;
}

export const games: Game[] = [
  {
    id: "goltexto",
    title: "Futbol11 Goltexto",
    slug: "futbol11-goltexto",
    description: "Guess the football lineup from text clues. Identify all 11 players from a historic match.",
    longDescription: "Goltexto challenges your memory of iconic football lineups. You're given a formation and must fill in the names of the starting XI from a famous match. From World Cup finals to Champions League classics, every day brings a new tactical puzzle. This game tests your knowledge of team formations, player positions, and football history spanning decades of the beautiful game.",
    howToPlay: ["You'll see a formation layout (e.g. 4-3-3)", "Fill in the player names for each position", "Use hints if you're stuck — each hint reveals one letter", "Complete the lineup before time runs out"],
    difficulty: "Hard",
    category: "Trivia",
    emoji: "📋"
  },
  {
    id: "legacy",
    title: "Futbol11 Legacy",
    slug: "futbol11-legacy",
    description: "Test your knowledge of legendary footballers and their career paths across top European clubs.",
    longDescription: "Legacy takes you on a journey through football history. Each challenge presents clues about a legendary player's career — the clubs they played for, the trophies they won, and the records they broke. From Pelé to Messi, from Maradona to Ronaldo, Legacy covers the greatest players to ever grace the pitch. Perfect for fans who live and breathe football history.",
    howToPlay: ["Read the career clues presented one by one", "Guess the legendary footballer", "Fewer clues used = higher score", "Daily challenges feature players from different eras"],
    difficulty: "Medium",
    category: "Trivia",
    emoji: "🏆"
  },
  {
    id: "impostor",
    title: "Futbol11 Impostor",
    slug: "futbol11-impostor",
    description: "Find the impostor! One player doesn't belong in the group — can you spot them?",
    longDescription: "Impostor is a football deduction game where you must identify which player doesn't belong in a group. Four players share a common trait — same nationality, same club history, same achievement — but one is the odd one out. Sharp football knowledge and lateral thinking are key. The game gets progressively harder with more obscure connections and lesser-known facts.",
    howToPlay: ["You'll see a group of football players", "Find the one who doesn't share the common trait", "The connection could be nationality, club, award, or stat", "Solve as many rounds as possible"],
    difficulty: "Medium",
    category: "Puzzle",
    emoji: "🕵️"
  },
  {
    id: "grid",
    title: "Futbol11 Grid",
    slug: "futbol-grid",
    description: "Fill the football grid! Match players to intersecting club and country criteria.",
    longDescription: "The Football Grid is one of the most addictive daily football puzzles. You're presented with a 3×3 grid where rows and columns represent different clubs or national teams. Your task is to name a player who fits both the row and column criteria. Think a player who played for both Barcelona and the Brazilian national team? Or someone who represented both Manchester United and France? The challenge lies in finding unique answers that other players might not think of.",
    howToPlay: ["Each cell has a row criterion and column criterion", "Name a player who satisfies both criteria", "You have 9 guesses to fill all 9 cells", "Rarity score rewards obscure correct answers"],
    difficulty: "Hard",
    category: "Puzzle",
    emoji: "🔲"
  },
  {
    id: "pyramid",
    title: "Futbol11 Pyramid",
    slug: "futbol11-pyramid",
    description: "Build the football knowledge pyramid from easy clues at the base to hard ones at the top.",
    longDescription: "Pyramid is a tiered trivia game that starts easy and gets progressively harder. The base of the pyramid features straightforward football questions, while the peak demands expert-level knowledge. Each correct answer builds your pyramid higher. Can you reach the summit? This game covers everything from current Premier League stats to historical World Cup facts, making it perfect for casual fans and football scholars alike.",
    howToPlay: ["Start from the base with easier questions", "Each tier gets progressively harder", "Answer correctly to climb higher", "Reach the peak to complete the pyramid"],
    difficulty: "Medium",
    category: "Trivia",
    emoji: "🔺"
  },
  {
    id: "connections",
    title: "Futbol11 Connections",
    slug: "futbol11-connections",
    description: "Group 16 football items into 4 categories. Find the hidden connections!",
    longDescription: "Inspired by the popular word game, Futbol11 Connections presents you with 16 football-related items — players, clubs, stadiums, or terms. Your mission is to sort them into four groups of four, each sharing a hidden connection. Connections could be subtle: players who scored hat-tricks in World Cup finals, stadiums with retractable roofs, or clubs whose names contain colors. This puzzle rewards both broad football knowledge and creative thinking.",
    howToPlay: ["You see 16 football-related items", "Group them into 4 categories of 4", "Each group shares a hidden connection", "You have 4 mistakes before game over"],
    difficulty: "Hard",
    category: "Puzzle",
    emoji: "🔗"
  },
  {
    id: "clubs",
    title: "Futbol11 Clubs",
    slug: "futbol11-clubs",
    description: "Identify football clubs from visual clues, badge fragments, and jersey colors.",
    longDescription: "Clubs tests your visual football knowledge. You might see a zoomed-in section of a club badge, a jersey color combination, or a stadium silhouette. From the iconic stripes of Juventus to the red of Liverpool, from the crest of Real Madrid to the cannon of Arsenal — how well do you really know the visual identity of football's greatest clubs? The game features clubs from leagues worldwide, not just the top 5 European leagues.",
    howToPlay: ["Visual clues about a football club appear", "Guess the club from the visual information", "Clues progressively reveal more details", "Score points for faster correct guesses"],
    difficulty: "Easy",
    category: "Trivia",
    emoji: "🛡️"
  },
  {
    id: "link",
    title: "Futbol11 Link",
    slug: "futbol11-link",
    description: "Connect footballers through shared clubs, forming a chain of linked careers.",
    longDescription: "Link is a football chain puzzle where you must connect two players through shared club histories. Player A played with Player B at Club X, and Player B played with Player C at Club Y — keep building the chain until you reach the target player. It's six degrees of separation, football style. This game rewards knowledge of transfer histories, squad compositions, and the interconnected web of professional football careers across multiple leagues and decades.",
    howToPlay: ["You're given a start player and end player", "Connect them through shared club teammates", "Each link must be a real teammate connection", "Complete the chain in as few links as possible"],
    difficulty: "Hard",
    category: "Strategy",
    emoji: "⛓️"
  },
  {
    id: "bingo",
    title: "Futbol11 Bingo",
    slug: "futbol11-bingo",
    description: "Football bingo! Match players to criteria on your bingo card to complete lines.",
    longDescription: "Futbol11 Bingo combines the classic game of bingo with football trivia. Your bingo card contains various football criteria — 'Scored 20+ league goals in a season', 'Played in Serie A and La Liga', 'Won the Ballon d'Or'. As players are revealed, mark off the matching criteria. Complete a line, column, or full card to win. It's a fresh take on football trivia that combines luck with deep knowledge of player statistics and career achievements.",
    howToPlay: ["You receive a bingo card with football criteria", "Players are revealed one by one", "Mark criteria that match the revealed player", "Complete a line or full card to win"],
    difficulty: "Medium",
    category: "Trivia",
    emoji: "🎯"
  },
  {
    id: "top10",
    title: "Futbol11 Top10",
    slug: "futbol-top10",
    description: "Can you name all players in the top 10 of famous football rankings and records?",
    longDescription: "Top10 challenges you to name the players in football's most famous lists and rankings. From the all-time top scorers in Champions League history to the most capped international players, from the highest transfer fees ever paid to the most Ballon d'Or nominations — can you recall all 10? The game covers a wide range of statistical categories across club and international football, updated with the latest records and achievements.",
    howToPlay: ["A football category/ranking is presented", "Name as many of the top 10 as you can", "Order doesn't matter", "Time limit adds pressure to recall"],
    difficulty: "Hard",
    category: "Trivia",
    emoji: "🔟"
  },
  {
    id: "wordle",
    title: "Futbol11 Wordle",
    slug: "futbol11-wordle",
    description: "The classic word game meets football. Guess the footballer's name in 6 tries!",
    longDescription: "Futbol11 Wordle brings the viral word-guessing phenomenon to the football world. Instead of guessing any word, you're guessing a footballer's surname. Green letters are correct and in the right position, yellow letters are in the name but wrong position, and gray letters aren't in the name at all. With thousands of professional footballers past and present, every day brings a new challenge. A perfect quick daily brain teaser for football fans.",
    howToPlay: ["Guess a footballer's surname", "Green = correct letter, correct position", "Yellow = correct letter, wrong position", "Gray = letter not in the name", "You have 6 attempts"],
    difficulty: "Easy",
    category: "Word",
    emoji: "🟩"
  },
  {
    id: "bingo-retro",
    title: "Futbol11 Bingo Retro",
    slug: "futbol11-bingo-legends",
    description: "Retro bingo featuring legendary footballers from the 70s, 80s, and 90s.",
    longDescription: "Bingo Retro is a nostalgic trip through football's golden eras. This special edition of Futbol11 Bingo focuses exclusively on legendary players from the 1970s through the 1990s. Remember Platini's free kicks? Beckenbauer's sweeper role? Romário's clinical finishing? This game celebrates the icons who shaped modern football, making it perfect for older fans and history enthusiasts who appreciate the legends of the game.",
    howToPlay: ["Same rules as regular Bingo", "All players are from the 70s, 80s, and 90s", "Criteria focus on retro achievements", "Test your knowledge of football legends"],
    difficulty: "Hard",
    category: "Trivia",
    emoji: "📼"
  },
  {
    id: "countries",
    title: "Futbol11",
    slug: "futbol11",
    description: "The original! Guess the international lineup of a national football team.",
    longDescription: "The flagship game that started it all. Futbol11 presents you with a national team's formation from a specific match — a World Cup qualifier, a continental championship, or a friendly. Your job is to name all 11 starters. From powerhouses like Brazil and Germany to underdogs who made deep tournament runs, this game celebrates international football in all its glory. Updated daily with matches spanning decades of international competition.",
    howToPlay: ["A national team formation is shown", "Identify all 11 starting players", "Use the match date and opponent as context clues", "Hints available if you're stuck"],
    difficulty: "Medium",
    category: "Trivia",
    emoji: "🌍"
  },
  {
    id: "guess",
    title: "Guess the Footballer",
    slug: "guess-the-footballer",
    description: "Blurred photos, silhouettes, and partial images — can you identify the footballer?",
    longDescription: "Guess the Footballer is a visual identification challenge. Each round shows you a progressively clearer image of a professional footballer. Starting from a heavily pixelated or silhouetted image, the picture gradually sharpens. The faster you guess correctly, the more points you earn. The game features players from all major leagues and includes current stars, rising talents, and retired legends. Perfect for fans who recognize players not just by name, but by sight.",
    howToPlay: ["A blurred/obscured footballer image appears", "The image gradually becomes clearer", "Guess the player as early as possible", "Earlier correct guesses earn more points"],
    difficulty: "Easy",
    category: "Trivia",
    emoji: "👤"
  },
  {
    id: "legends",
    title: "Futbol11 Legends",
    slug: "futbol11-legends",
    description: "Name the legendary XI! Identify all-time great lineups from football history.",
    longDescription: "Legends is the ultimate test of football history knowledge. Each challenge presents an all-time XI from a specific club, league, or era. Can you name the greatest ever Liverpool XI? How about the best South American players of the 21st century? Or the ultimate Champions League XI? This game celebrates the absolute best players in football history and challenges you to recall the legends who defined generations of the sport.",
    howToPlay: ["An all-time XI category is presented", "Name the players in the legendary lineup", "Positions and formation are shown", "Complete the full XI to win"],
    difficulty: "Hard",
    category: "Trivia",
    emoji: "⭐"
  },
  {
    id: "america",
    title: "Futbol11 America",
    slug: "futbol11-america",
    description: "South and North American football trivia — Copa América, MLS, Liga MX and more.",
    longDescription: "Futbol11 America celebrates the beautiful game across the Americas. From the passion of Argentine football to the growing quality of MLS, from the historic rivalries of Brazilian football to the fervor of Mexican Liga MX — this game covers it all. Daily challenges feature Copa América lineups, CONCACAF matches, Copa Libertadores classics, and iconic moments from American football history. A must-play for fans of football beyond Europe.",
    howToPlay: ["Challenges focus on American football", "Guess lineups from Copa América, Libertadores, etc.", "Covers North, Central, and South America", "Same mechanics as the main Futbol11 game"],
    difficulty: "Medium",
    category: "Trivia",
    emoji: "🌎"
  },
  {
    id: "euro2024",
    title: "Futbol11 Euro 2024",
    slug: "futbol11-euro2024",
    description: "Relive Euro 2024! Guess the starting lineups from every match of the tournament.",
    longDescription: "Relive the excitement of UEFA Euro 2024 held in Germany. This special edition covers every match of the tournament — from the group stages to the grand final. Remember the tactical setups, the surprise starters, and the formations that shaped the tournament. Whether it was the dominant performances of the favorites or the tactical masterclasses of the underdogs, this game lets you test your memory of European football's biggest event.",
    howToPlay: ["Select a Euro 2024 match", "Guess the starting XI for either team", "Historical accuracy is required", "Covers all tournament matches"],
    difficulty: "Medium",
    category: "Trivia",
    emoji: "🇪🇺"
  },
  {
    id: "copaamerica",
    title: "F11 Copa America",
    slug: "futbol11-copaamerica",
    description: "Copa América edition — guess lineups from the Americas' premier tournament.",
    longDescription: "The Copa América edition brings the oldest international football tournament to your screen. From the early editions won by Uruguay to Argentina's recent triumphs, from Brazil's dominance to Chile's golden generation — this game covers Copa América history in depth. Each daily challenge features a lineup from a Copa América match, testing your knowledge of South American football at its finest.",
    howToPlay: ["Copa América matches are featured daily", "Guess the full starting XI", "Covers multiple editions of the tournament", "Learn about South American football history"],
    difficulty: "Medium",
    category: "Trivia",
    emoji: "🏅"
  },
  {
    id: "worldcup",
    title: "Futbol11 World Cup",
    slug: "futbol11-worldcup",
    description: "World Cup lineups from 1930 to 2022 — the ultimate international football challenge.",
    longDescription: "The World Cup edition is the crown jewel of Futbol11. Covering every FIFA World Cup from Uruguay 1930 to Qatar 2022, this game challenges you to recall the starting XIs from the biggest matches in football history. Remember who started the 2006 final? The 1970 Brazil squad? The 1998 host nation lineup? With nearly a century of World Cup history, this is the ultimate test for any football aficionado who considers themselves a true student of the game.",
    howToPlay: ["Select a World Cup match from any year", "Name the starting XI", "Covers every World Cup from 1930-2022", "The ultimate football history challenge"],
    difficulty: "Hard",
    category: "Trivia",
    emoji: "🏆"
  },
];

export const otherSites = [
  { title: "OCTADLE", url: "https://octadle.com/", description: "Multi-word puzzle game", isNew: true, emoji: "🎮" },
  { title: "FORMUDLE", url: "https://formudle.com/", description: "Formula 1 daily puzzle", isNew: true, emoji: "🏎️" },
  { title: "WRESTLEPLAY", url: "https://wrestleplay.com/", description: "Wrestling trivia games", emoji: "🤼" },
  { title: "BASKETBALL5", url: "https://basketball-5.com/", description: "Basketball daily games", emoji: "🏀" },
];
