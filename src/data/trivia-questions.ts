export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  category: "history" | "records" | "matches" | "players" | "worldcup";
  difficulty: "easy" | "medium" | "hard";
  explanation: string;
}

export const triviaQuestions: TriviaQuestion[] = [
  // EASY - History
  { id: 1, question: "Which country won the first ever FIFA World Cup in 1930?", options: ["Brazil", "Uruguay", "Argentina", "Italy"], correctIndex: 1, category: "worldcup", difficulty: "easy", explanation: "Uruguay hosted and won the inaugural FIFA World Cup in 1930, defeating Argentina 4-2 in the final." },
  { id: 2, question: "What is the maximum number of players a team can field on the pitch?", options: ["10", "11", "12", "9"], correctIndex: 1, category: "history", difficulty: "easy", explanation: "Each team plays with 11 players on the pitch, including the goalkeeper." },
  { id: 3, question: "Which club is known as 'The Red Devils'?", options: ["Liverpool", "AC Milan", "Manchester United", "Bayern Munich"], correctIndex: 2, category: "history", difficulty: "easy", explanation: "Manchester United are famously known as 'The Red Devils'." },
  { id: 4, question: "How long is a standard football match (excluding extra time)?", options: ["80 minutes", "90 minutes", "100 minutes", "120 minutes"], correctIndex: 1, category: "history", difficulty: "easy", explanation: "A standard football match consists of two 45-minute halves, totaling 90 minutes." },
  { id: 5, question: "Which country has won the most FIFA World Cups?", options: ["Germany", "Argentina", "Italy", "Brazil"], correctIndex: 3, category: "worldcup", difficulty: "easy", explanation: "Brazil has won the FIFA World Cup a record 5 times (1958, 1962, 1970, 1994, 2002)." },
  { id: 6, question: "What color card results in a player being sent off?", options: ["Yellow", "Red", "Blue", "Green"], correctIndex: 1, category: "history", difficulty: "easy", explanation: "A red card means the player is sent off and cannot be replaced." },
  { id: 7, question: "Which tournament is the most prestigious club competition in Europe?", options: ["Europa League", "Conference League", "Champions League", "Super Cup"], correctIndex: 2, category: "history", difficulty: "easy", explanation: "The UEFA Champions League is the most prestigious annual club football competition in Europe." },
  { id: 8, question: "In which city is Camp Nou located?", options: ["Madrid", "Barcelona", "Lisbon", "Milan"], correctIndex: 1, category: "history", difficulty: "easy", explanation: "Camp Nou is the home stadium of FC Barcelona, located in Barcelona, Spain." },

  // MEDIUM - Records & Players
  { id: 9, question: "Who holds the record for the most goals in a single calendar year?", options: ["Cristiano Ronaldo", "Pelé", "Lionel Messi", "Gerd Müller"], correctIndex: 2, category: "records", difficulty: "medium", explanation: "Lionel Messi scored 91 goals in 2012, breaking Gerd Müller's record of 85 set in 1972." },
  { id: 10, question: "Which goalkeeper has kept the most clean sheets in Premier League history?", options: ["Peter Schmeichel", "David Seaman", "Petr Čech", "Edwin van der Sar"], correctIndex: 2, category: "records", difficulty: "medium", explanation: "Petr Čech holds the Premier League record with 202 clean sheets." },
  { id: 11, question: "Which player scored the 'Hand of God' goal?", options: ["Pelé", "Diego Maradona", "Zinedine Zidane", "Ronaldinho"], correctIndex: 1, category: "matches", difficulty: "medium", explanation: "Diego Maradona scored the infamous 'Hand of God' goal against England in the 1986 World Cup quarter-final." },
  { id: 12, question: "Which club won the Champions League in 2005 after being 3-0 down at half-time?", options: ["AC Milan", "Barcelona", "Liverpool", "Real Madrid"], correctIndex: 2, category: "matches", difficulty: "medium", explanation: "Liverpool came back from 3-0 down against AC Milan in the 2005 Champions League final in Istanbul." },
  { id: 13, question: "Who is the all-time top scorer in UEFA Champions League history?", options: ["Lionel Messi", "Raúl", "Robert Lewandowski", "Cristiano Ronaldo"], correctIndex: 3, category: "records", difficulty: "medium", explanation: "Cristiano Ronaldo is the all-time top scorer in UEFA Champions League history with 140 goals." },
  { id: 14, question: "Which nation did Zinedine Zidane headbutt Marco Materazzi against in a World Cup final?", options: ["Brazil", "Germany", "Italy", "Spain"], correctIndex: 2, category: "matches", difficulty: "medium", explanation: "Zidane headbutted Materazzi in the 2006 World Cup final between France and Italy." },
  { id: 15, question: "How many Ballon d'Or awards has Lionel Messi won?", options: ["6", "7", "8", "5"], correctIndex: 2, category: "records", difficulty: "medium", explanation: "Lionel Messi has won a record 8 Ballon d'Or awards." },
  { id: 16, question: "Which English club completed an 'Invincible' unbeaten league season?", options: ["Manchester United", "Chelsea", "Arsenal", "Liverpool"], correctIndex: 2, category: "records", difficulty: "medium", explanation: "Arsenal went unbeaten through the entire 2003-04 Premier League season." },
  { id: 17, question: "Which country won Euro 2004 as the biggest underdog?", options: ["Czech Republic", "Greece", "Denmark", "Portugal"], correctIndex: 1, category: "matches", difficulty: "medium", explanation: "Greece shocked the football world by winning Euro 2004, beating hosts Portugal in the final." },
  { id: 18, question: "Who scored the fastest hat-trick in Premier League history?", options: ["Sadio Mané", "Robbie Fowler", "Alan Shearer", "Sergio Agüero"], correctIndex: 0, category: "records", difficulty: "medium", explanation: "Sadio Mané scored the fastest Premier League hat-trick in 2 minutes and 56 seconds for Southampton vs Aston Villa in 2015." },

  // HARD - Deep Knowledge
  { id: 19, question: "In which year was the offside rule first introduced in football?", options: ["1863", "1925", "1886", "1900"], correctIndex: 0, category: "history", difficulty: "hard", explanation: "The offside rule was part of the original Laws of the Game established in 1863, though it was significantly modified in 1925." },
  { id: 20, question: "Which player has made the most World Cup appearances?", options: ["Paolo Maldini", "Lothar Matthäus", "Miroslav Klose", "Cafu"], correctIndex: 1, category: "worldcup", difficulty: "hard", explanation: "Lothar Matthäus holds the record with 25 World Cup match appearances across 5 tournaments." },
  { id: 21, question: "What was the highest-scoring World Cup final in history?", options: ["1958 (Brazil 5-2 Sweden)", "1966 (England 4-2 Germany)", "1938 (Italy 4-2 Hungary)", "2022 (Argentina 3-3 France)"], correctIndex: 0, category: "worldcup", difficulty: "hard", explanation: "The 1958 World Cup final between Brazil and Sweden ended 5-2, with 7 total goals." },
  { id: 22, question: "Which club has won the most Copa Libertadores titles?", options: ["Boca Juniors", "River Plate", "Independiente", "Peñarol"], correctIndex: 2, category: "records", difficulty: "hard", explanation: "Independiente of Argentina has won the Copa Libertadores a record 7 times." },
  { id: 23, question: "Who scored the winning goal in the 2014 World Cup final?", options: ["Lionel Messi", "Mario Götze", "Thomas Müller", "Gonzalo Higuaín"], correctIndex: 1, category: "worldcup", difficulty: "hard", explanation: "Mario Götze scored the winning goal in extra time as Germany beat Argentina 1-0 in the 2014 World Cup final." },
  { id: 24, question: "Which player has scored the most goals in a single World Cup tournament?", options: ["Ronaldo", "Just Fontaine", "Miroslav Klose", "Gerd Müller"], correctIndex: 1, category: "worldcup", difficulty: "hard", explanation: "Just Fontaine of France scored 13 goals in the 1958 World Cup, a record that still stands." },
  { id: 25, question: "What year did the Premier League officially start?", options: ["1990", "1991", "1992", "1993"], correctIndex: 2, category: "history", difficulty: "hard", explanation: "The Premier League was founded in 1992, with the first season being 1992-93." },
  { id: 26, question: "Which player has received the most red cards in La Liga history?", options: ["Sergio Ramos", "Pablo Alfaro", "Pepe", "Diego Simeone"], correctIndex: 0, category: "records", difficulty: "hard", explanation: "Sergio Ramos holds the record for the most red cards in La Liga history." },
  { id: 27, question: "Which team scored the latest Champions League winning goal in a final?", options: ["Real Madrid (2014)", "Chelsea (2012)", "Manchester United (1999)", "Liverpool (2005)"], correctIndex: 2, category: "matches", difficulty: "hard", explanation: "Manchester United scored their winning goal in the 93rd minute of the 1999 Champions League final against Bayern Munich." },
  { id: 28, question: "Who is the youngest player to score in a World Cup final?", options: ["Pelé", "Kylian Mbappé", "Michael Owen", "Ronaldo"], correctIndex: 0, category: "worldcup", difficulty: "hard", explanation: "Pelé was 17 years old when he scored in the 1958 World Cup final against Sweden." },
  { id: 29, question: "Which African nation was the first to reach a World Cup quarter-final?", options: ["Nigeria", "Ghana", "Cameroon", "Senegal"], correctIndex: 2, category: "worldcup", difficulty: "hard", explanation: "Cameroon became the first African nation to reach the World Cup quarter-finals in 1990." },
  { id: 30, question: "What is the record for consecutive league titles in Europe's top 5 leagues?", options: ["8 (Juventus)", "10 (Juventus)", "11 (Bayern Munich)", "9 (Bayern Munich)"], correctIndex: 2, category: "records", difficulty: "hard", explanation: "Bayern Munich won 11 consecutive Bundesliga titles from 2012-13 to 2022-23." },
];

// Get 10 daily questions using date as seed
export function getDailyQuestions(): TriviaQuestion[] {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  
  // Shuffle with seed
  const shuffled = [...triviaQuestions];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Pick 3 easy, 4 medium, 3 hard
  const easy = shuffled.filter(q => q.difficulty === "easy").slice(0, 3);
  const medium = shuffled.filter(q => q.difficulty === "medium").slice(0, 4);
  const hard = shuffled.filter(q => q.difficulty === "hard").slice(0, 3);
  
  return [...easy, ...medium, ...hard];
}
