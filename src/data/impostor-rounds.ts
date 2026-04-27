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
