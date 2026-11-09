// Impostor: 4 players share a trait, one doesn't. Players get 5 rounds per day.
export interface ImpostorRound {
  id: number;
  trait: string;
  players: string[]; // 4 players
  impostorIndex: number;
  explanation: string;
}

export const IMPOSTOR_ROUNDS: ImpostorRound[] = [
  {
    id: 1,
    trait: "Won the Ballon d'Or while playing for Real Madrid",
    players: ["Cristiano Ronaldo", "Luka Modrić", "Karim Benzema", "Zinedine Zidane"],
    impostorIndex: 3,
    explanation: "Zidane won his Ballon d'Or in 1998 while at Juventus. The other three won theirs at Real Madrid.",
  },
  {
    id: 2,
    trait: "Played for Manchester United and Real Madrid",
    players: ["David Beckham", "Cristiano Ronaldo", "Roy Keane", "Ángel Di María"],
    impostorIndex: 2,
    explanation: "Roy Keane never played for Real Madrid. The other three did.",
  },
  {
    id: 3,
    trait: "Has won the FIFA World Cup",
    players: ["Lionel Messi", "Andrés Iniesta", "Cristiano Ronaldo", "Kylian Mbappé"],
    impostorIndex: 2,
    explanation: "Cristiano Ronaldo has never won the World Cup with Portugal.",
  },
  {
    id: 4,
    trait: "Brazilian forward",
    players: ["Romário", "Ronaldinho", "Diego Forlán", "Rivaldo"],
    impostorIndex: 2,
    explanation: "Diego Forlán is Uruguayan; the other three are Brazilian forwards.",
  },
  {
    id: 5,
    trait: "Premier League Golden Boot winner",
    players: ["Mohamed Salah", "Harry Kane", "Heung-Min Son", "Bukayo Saka"],
    impostorIndex: 3,
    explanation: "Bukayo Saka has yet to win the Premier League Golden Boot.",
  },
  {
    id: 6,
    trait: "Goalkeeper",
    players: ["Manuel Neuer", "Iker Casillas", "Sergio Busquets", "Gianluigi Buffon"],
    impostorIndex: 2,
    explanation: "Sergio Busquets is a defensive midfielder. The other three are world-class goalkeepers.",
  },
  {
    id: 7,
    trait: "Won the Champions League with Barcelona",
    players: ["Lionel Messi", "Andrés Iniesta", "Sergio Ramos", "Xavi"],
    impostorIndex: 2,
    explanation: "Sergio Ramos won the Champions League with Real Madrid, not Barcelona.",
  },
  {
    id: 8,
    trait: "Played at Bayern Munich",
    players: ["Robert Lewandowski", "Arjen Robben", "Mario Götze", "Mesut Özil"],
    impostorIndex: 3,
    explanation: "Mesut Özil never played at Bayern. He went from Werder Bremen to Real Madrid to Arsenal.",
  },
  {
    id: 9,
    trait: "African footballer",
    players: ["Mohamed Salah", "Sadio Mané", "Riyad Mahrez", "Karim Benzema"],
    impostorIndex: 3,
    explanation: "Karim Benzema represents France, while the other three are African internationals.",
  },
  {
    id: 10,
    trait: "South American World Cup winner",
    players: ["Pelé", "Diego Maradona", "Lionel Messi", "Diego Forlán"],
    impostorIndex: 3,
    explanation: "Uruguay's Diego Forlán never won a World Cup. The other three have all lifted the trophy.",
  },
  {
    id: 11,
    trait: "Won the FIFA World Cup with Germany",
    players: ["Miroslav Klose", "Thomas Müller", "Philipp Lahm", "Neymar"],
    impostorIndex: 3,
    explanation: "Neymar has never won the World Cup with Brazil. The other three won it with Germany in 2014.",
  },
  {
    id: 12,
    trait: "Played for Barcelona and Real Madrid",
    players: ["Luís Figo", "Ronaldo Nazário", "Samuel Eto'o", "Xavi"],
    impostorIndex: 3,
    explanation: "Xavi spent his whole European club career at Barcelona and never played for Real Madrid. The other three played for both clubs.",
  },
  {
    id: 13,
    trait: "Scored 100+ international goals",
    players: ["Cristiano Ronaldo", "Lionel Messi", "Ali Daei", "Neymar"],
    impostorIndex: 3,
    explanation: "Neymar has scored fewer than 100 goals for Brazil. The other three have all passed 100 international goals.",
  },
  {
    id: 14,
    trait: "Won the Champions League with more than one club",
    players: ["Cristiano Ronaldo", "Toni Kroos", "Xabi Alonso", "Luka Modrić"],
    impostorIndex: 3,
    explanation: "Modrić has won the Champions League only with Real Madrid. The other three won it with two different clubs.",
  },
  {
    id: 15,
    trait: "Played in a World Cup final",
    players: ["Mario Götze", "Antoine Griezmann", "Luka Modrić", "Erling Haaland"],
    impostorIndex: 3,
    explanation: "Haaland has never played in a World Cup final with Norway. The other three have all played in one.",
  },
  {
    id: 16,
    trait: "Won the Ballon d'Or",
    players: ["Lionel Messi", "Cristiano Ronaldo", "Luka Modrić", "Neymar"],
    impostorIndex: 3,
    explanation: "Neymar has never won the Ballon d'Or. The other three have all won it.",
  },
  {
    id: 17,
    trait: "English international",
    players: ["Harry Kane", "Raheem Sterling", "Jude Bellingham", "Gareth Bale"],
    impostorIndex: 3,
    explanation: "Gareth Bale is Welsh. The other three are England internationals.",
  },
  {
    id: 18,
    trait: "Played for Liverpool",
    players: ["Steven Gerrard", "Mohamed Salah", "Virgil van Dijk", "Kevin De Bruyne"],
    impostorIndex: 3,
    explanation: "Kevin De Bruyne has never played for Liverpool. The other three have all played there.",
  },
  {
    id: 19,
    trait: "Won the Premier League with Manchester City",
    players: ["Kevin De Bruyne", "Phil Foden", "Erling Haaland", "Mohamed Salah"],
    impostorIndex: 3,
    explanation: "Mohamed Salah won the Premier League with Liverpool, not Manchester City. The other three won it with City.",
  },
  {
    id: 20,
    trait: "Won the Champions League with Real Madrid",
    players: ["Sergio Ramos", "Karim Benzema", "Gareth Bale", "Lionel Messi"],
    impostorIndex: 3,
    explanation: "Lionel Messi has never played for Real Madrid. The other three won the Champions League with Real Madrid.",
  },
  {
    id: 21,
    trait: "German international",
    players: ["Manuel Neuer", "Thomas Müller", "Toni Kroos", "Luka Modrić"],
    impostorIndex: 3,
    explanation: "Luka Modrić is Croatian. The other three are Germany internationals.",
  },
  {
    id: 22,
    trait: "Scored a goal in a World Cup final",
    players: ["Mario Götze", "Kylian Mbappé", "Andrés Iniesta", "Cristiano Ronaldo"],
    impostorIndex: 3,
    explanation: "Cristiano Ronaldo has never played in a World Cup final, so he has never scored in one. The other three all scored in a final.",
  },
  {
    id: 23,
    trait: "Played for Arsenal",
    players: ["Thierry Henry", "Dennis Bergkamp", "Bukayo Saka", "Didier Drogba"],
    impostorIndex: 3,
    explanation: "Didier Drogba never played for Arsenal. The other three all played there.",
  },
  {
    id: 24,
    trait: "Won the World Cup with Argentina",
    players: ["Lionel Messi", "Diego Maradona", "Ángel Di María", "Neymar"],
    impostorIndex: 3,
    explanation: "Neymar is Brazilian and has never won a World Cup. The other three won it with Argentina.",
  },
  {
    id: 25,
    trait: "Won the Champions League with AC Milan",
    players: ["Paolo Maldini", "Kaká", "Andriy Shevchenko", "Francesco Totti"],
    impostorIndex: 3,
    explanation: "Francesco Totti spent his whole career at Roma and never won the Champions League. The other three won it with AC Milan.",
  },
  {
    id: 26,
    trait: "French international",
    players: ["Kylian Mbappé", "Antoine Griezmann", "Zinedine Zidane", "Cristiano Ronaldo"],
    impostorIndex: 3,
    explanation: "Cristiano Ronaldo is Portuguese. The other three are France internationals.",
  },
  {
    id: 27,
    trait: "Played for Juventus",
    players: ["Gianluigi Buffon", "Alessandro Del Piero", "Cristiano Ronaldo", "Lionel Messi"],
    impostorIndex: 3,
    explanation: "Lionel Messi has never played for Juventus. The other three all played there.",
  },
  {
    id: 28,
    trait: "Won the Premier League Golden Boot",
    players: ["Mohamed Salah", "Harry Kane", "Erling Haaland", "Kevin De Bruyne"],
    impostorIndex: 3,
    explanation: "Kevin De Bruyne has never won the Premier League Golden Boot. The other three have all won it.",
  },
  {
    id: 29,
    trait: "Won the Champions League with Liverpool",
    players: ["Mohamed Salah", "Virgil van Dijk", "Steven Gerrard", "Sergio Ramos"],
    impostorIndex: 3,
    explanation: "Sergio Ramos won the Champions League with Real Madrid, not Liverpool. The other three won it with Liverpool.",
  },
  {
    id: 30,
    trait: "Played for Borussia Dortmund",
    players: ["Erling Haaland", "Robert Lewandowski", "Marco Reus", "Mohamed Salah"],
    impostorIndex: 3,
    explanation: "Mohamed Salah has never played for Borussia Dortmund. The other three all played there.",
  },
];

export const ROUNDS_PER_DAY = 5;

export function getDailyRounds(): ImpostorRound[] {
  const epoch = new Date(2024, 0, 1).getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const dayIndex = Math.floor((today - epoch) / 86400000);
  const start = (dayIndex * ROUNDS_PER_DAY) % IMPOSTOR_ROUNDS.length;
  const result: ImpostorRound[] = [];
  for (let i = 0; i < ROUNDS_PER_DAY; i++) {
    result.push(IMPOSTOR_ROUNDS[(start + i) % IMPOSTOR_ROUNDS.length]);
  }
  return result;
}
