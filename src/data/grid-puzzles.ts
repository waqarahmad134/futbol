// Grid puzzle: 3x3 grid where rows + columns are clubs/countries.
// Each cell needs a player who satisfies both the row and column criterion.
export interface GridPuzzle {
  id: string;
  rows: string[]; // 3 row criteria (e.g. clubs)
  cols: string[]; // 3 column criteria
  // For each cell (r,c), accepted player names (lowercased, last name or full name).
  cells: string[][][]; // [row][col] => accepted answers
}

const lower = (arr: string[]) => arr.map((s) => s.toLowerCase());

export const GRID_PUZZLES: GridPuzzle[] = [
  {
    id: "europe-1",
    rows: ["Real Madrid", "Manchester United", "Juventus"],
    cols: ["France", "Portugal", "Argentina"],
    cells: [
      [
        lower(["Karim Benzema", "Benzema", "Zinedine Zidane", "Zidane", "Raphaël Varane", "Varane", "Eduardo Camavinga", "Camavinga"]),
        lower(["Cristiano Ronaldo", "Ronaldo", "Luís Figo", "Figo", "Pepe"]),
        lower(["Ángel Di María", "Di Maria", "Di María", "Gonzalo Higuaín", "Higuain", "Higuaín", "Fernando Redondo", "Redondo"]),
      ],
      [
        lower(["Paul Pogba", "Pogba", "Anthony Martial", "Martial", "Patrice Evra", "Evra", "Eric Cantona", "Cantona"]),
        lower(["Cristiano Ronaldo", "Ronaldo", "Bruno Fernandes", "Fernandes", "Nani", "Bébé"]),
        lower(["Ángel Di María", "Di Maria", "Di María", "Sergio Romero", "Romero", "Marcos Rojo", "Rojo", "Carlos Tevez", "Tevez"]),
      ],
      [
        lower(["Zinedine Zidane", "Zidane", "Didier Deschamps", "Deschamps", "Patrice Evra", "Evra", "Paul Pogba", "Pogba"]),
        lower(["Cristiano Ronaldo", "Ronaldo"]),
        lower(["Carlos Tevez", "Tevez", "Paulo Dybala", "Dybala", "Gonzalo Higuaín", "Higuain", "Higuaín", "Omar Sívori", "Sivori"]),
      ],
    ],
  },
  {
    id: "europe-2",
    rows: ["Barcelona", "Liverpool", "Bayern Munich"],
    cols: ["Brazil", "Spain", "Germany"],
    cells: [
      [
        lower(["Ronaldinho", "Neymar", "Ronaldo", "Rivaldo", "Dani Alves", "Alves", "Philippe Coutinho", "Coutinho", "Vitor Roque", "Raphinha"]),
        lower(["Xavi", "Andrés Iniesta", "Iniesta", "Carles Puyol", "Puyol", "Sergio Busquets", "Busquets", "Pedri", "Gavi", "Lamine Yamal", "Yamal"]),
        lower(["Robert Enke", "Enke", "Marc-André ter Stegen", "ter Stegen", "Bernd Schuster", "Schuster"]),
      ],
      [
        lower(["Roberto Firmino", "Firmino", "Lucas Leiva", "Leiva", "Allison", "Alisson", "Philippe Coutinho", "Coutinho", "Fabio Aurelio"]),
        lower(["Luis García", "Garcia", "Xabi Alonso", "Alonso", "Fernando Torres", "Torres", "Pepe Reina", "Reina", "Suso"]),
        lower(["Karl-Heinz Riedle", "Riedle", "Markus Babbel", "Babbel", "Patrik Berger", "Christian Ziege", "Ziege", "Dietmar Hamann", "Hamann"]),
      ],
      [
        lower(["Giovane Élber", "Elber", "Élber", "Lúcio", "Lucio", "Ze Roberto", "Zé Roberto", "Breno", "Rafinha"]),
        lower(["Javi Martínez", "Martinez", "Martínez", "Thiago Alcântara", "Thiago", "Xabi Alonso", "Alonso", "Bernardo Espinosa"]),
        lower(["Manuel Neuer", "Neuer", "Thomas Müller", "Muller", "Müller", "Philipp Lahm", "Lahm", "Bastian Schweinsteiger", "Schweinsteiger", "Toni Kroos", "Kroos", "Mario Götze", "Gotze", "Götze", "Jamal Musiala", "Musiala"]),
      ],
    ],
  },
];

export function getDailyGrid(): GridPuzzle {
  const epoch = new Date(2024, 0, 1).getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const dayIndex = Math.floor((today - epoch) / 86400000);
  return GRID_PUZZLES[dayIndex % GRID_PUZZLES.length];
}
