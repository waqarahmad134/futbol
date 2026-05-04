// Link: chain two players via shared club teammates.
export interface LinkPuzzle {
  id: string;
  start: string;
  end: string;
  // Pre-computed example chain players that connect start->end (excluding start/end).
  // Each name lists the clubs at which they shared a dressing room with the previous link.
  exampleChain: { name: string; via: string }[]; // length is the optimal length
  // Players accepted as a 1-step or 2-step intermediate (lowercased name => clubs).
  // We store each candidate's career club list; the verifier checks transitive overlap.
  validIntermediates: { name: string; clubs: string[] }[];
  // Career clubs of start and end
  startClubs: string[];
  endClubs: string[];
}

export const LINK_PUZZLES: LinkPuzzle[] = [
  {
    id: "messi-rooney",
    start: "Lionel Messi",
    end: "Wayne Rooney",
    exampleChain: [
      { name: "Cristiano Ronaldo", via: "Manchester United (2003-09)" },
    ],
    startClubs: ["Barcelona", "Paris Saint-Germain", "Inter Miami", "Argentina"],
    endClubs: ["Everton", "Manchester United", "DC United", "Derby County", "England"],
    validIntermediates: [
      { name: "Cristiano Ronaldo", clubs: ["Manchester United", "Real Madrid", "Juventus", "Al Nassr", "Portugal"] },
      { name: "Zlatan Ibrahimović", clubs: ["Ajax", "Juventus", "Inter Milan", "Barcelona", "Milan", "Paris Saint-Germain", "Manchester United", "LA Galaxy", "Sweden"] },
      { name: "Memphis Depay", clubs: ["PSV", "Manchester United", "Lyon", "Barcelona", "Atlético Madrid", "Corinthians", "Netherlands"] },
      { name: "Ángel Di María", clubs: ["Rosario Central", "Benfica", "Real Madrid", "Manchester United", "Paris Saint-Germain", "Juventus", "Argentina"] },
    ],
  },
  {
    id: "henry-ronaldinho",
    start: "Thierry Henry",
    end: "Ronaldinho",
    exampleChain: [
      { name: "Patrick Kluivert", via: "Barcelona (1998-2004)" },
    ],
    startClubs: ["Monaco", "Juventus", "Arsenal", "Barcelona", "New York Red Bulls", "France"],
    endClubs: ["Grêmio", "Paris Saint-Germain", "Barcelona", "AC Milan", "Flamengo", "Querétaro", "Brazil"],
    validIntermediates: [
      { name: "Patrick Kluivert", clubs: ["Ajax", "AC Milan", "Barcelona", "Newcastle United", "Valencia", "PSV", "Lille", "Netherlands"] },
      { name: "Edmilson", clubs: ["Lyon", "Barcelona", "Villarreal", "Brazil"] },
      { name: "Samuel Eto'o", clubs: ["Real Madrid", "Mallorca", "Barcelona", "Inter Milan", "Anzhi", "Chelsea", "Cameroon"] },
    ],
  },
];

export function getDailyLink(): LinkPuzzle {
  const epoch = new Date(2024, 0, 1).getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const dayIndex = Math.floor((today - epoch) / 86400000);
  return LINK_PUZZLES[dayIndex % LINK_PUZZLES.length];
}
