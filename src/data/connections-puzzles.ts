// Connections: 16 items split into 4 groups of 4.
export interface ConnectionsGroup {
  category: string;
  difficulty: 1 | 2 | 3 | 4; // 1 easy, 4 hard
  items: string[]; // exactly 4
}

export interface ConnectionsPuzzle {
  id: string;
  groups: ConnectionsGroup[]; // exactly 4
}

export const CONNECTIONS_PUZZLES: ConnectionsPuzzle[] = [
  {
    id: "p1",
    groups: [
      {
        category: "Argentine World Cup winners (2022)",
        difficulty: 1,
        items: ["Messi", "Di María", "Otamendi", "Romero"],
      },
      {
        category: "Italian goalkeepers",
        difficulty: 2,
        items: ["Buffon", "Donnarumma", "Zoff", "Toldo"],
      },
      {
        category: "Brazilian Ballon d'Or winners",
        difficulty: 3,
        items: ["Kaká", "Ronaldinho", "Ronaldo", "Rivaldo"],
      },
      {
        category: "Coached Real Madrid",
        difficulty: 4,
        items: ["Mourinho", "Ancelotti", "Zidane", "Heynckes"],
      },
    ],
  },
  {
    id: "p2",
    groups: [
      {
        category: "Premier League clubs",
        difficulty: 1,
        items: ["Arsenal", "Chelsea", "Liverpool", "Everton"],
      },
      {
        category: "La Liga clubs",
        difficulty: 2,
        items: ["Sevilla", "Valencia", "Villarreal", "Betis"],
      },
      {
        category: "Bundesliga clubs",
        difficulty: 3,
        items: ["Schalke", "Stuttgart", "Werder", "Hertha"],
      },
      {
        category: "Serie A clubs",
        difficulty: 4,
        items: ["Atalanta", "Lazio", "Roma", "Fiorentina"],
      },
    ],
  },
];

export function getDailyConnections(): ConnectionsPuzzle {
  const epoch = new Date(2024, 0, 1).getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const dayIndex = Math.floor((today - epoch) / 86400000);
  return CONNECTIONS_PUZZLES[dayIndex % CONNECTIONS_PUZZLES.length];
}

export function shuffleItemsForPuzzle(puzzle: ConnectionsPuzzle): string[] {
  const items = puzzle.groups.flatMap((g) => g.items);
  // Deterministic shuffle by puzzle id
  let seed = 0;
  for (const ch of puzzle.id) seed = (seed * 31 + ch.charCodeAt(0)) & 0x7fffffff;
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    const j = seed % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
