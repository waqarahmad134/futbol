// Shared lineup data for all "guess the XI" style games.

export interface LineupPlayer {
  name: string;
  position: string;
}

export interface Lineup {
  id: string;
  title: string;
  subtitle: string;
  formation: string;
  context: string;
  players: LineupPlayer[]; // exactly 11
}

const goltextoLineups: Lineup[] = [
  {
    id: "barca-2009-ucl",
    title: "Barcelona — 2009 UCL Final",
    subtitle: "Barcelona 2-0 Manchester United",
    formation: "4-3-3",
    context: "Pep Guardiola's first Champions League trophy with Barça, played in Rome.",
    players: [
      { name: "Víctor Valdés", position: "GK" },
      { name: "Dani Alves", position: "RB" },
      { name: "Gerard Piqué", position: "CB" },
      { name: "Carles Puyol", position: "CB" },
      { name: "Sylvinho", position: "LB" },
      { name: "Yaya Touré", position: "CDM" },
      { name: "Xavi", position: "CM" },
      { name: "Andrés Iniesta", position: "CM" },
      { name: "Lionel Messi", position: "RW" },
      { name: "Samuel Eto'o", position: "ST" },
      { name: "Thierry Henry", position: "LW" },
    ],
  },
  {
    id: "milan-2007-ucl",
    title: "AC Milan — 2007 UCL Final",
    subtitle: "AC Milan 2-1 Liverpool",
    formation: "4-3-1-2",
    context: "Carlo Ancelotti's revenge for Istanbul, with Inzaghi grabbing both goals.",
    players: [
      { name: "Dida", position: "GK" },
      { name: "Massimo Oddo", position: "RB" },
      { name: "Alessandro Nesta", position: "CB" },
      { name: "Paolo Maldini", position: "CB" },
      { name: "Marek Jankulovski", position: "LB" },
      { name: "Gennaro Gattuso", position: "CM" },
      { name: "Massimo Ambrosini", position: "CM" },
      { name: "Andrea Pirlo", position: "CM" },
      { name: "Kaká", position: "CAM" },
      { name: "Filippo Inzaghi", position: "ST" },
      { name: "Clarence Seedorf", position: "ST" },
    ],
  },
];

const countriesLineups: Lineup[] = [
  {
    id: "argentina-2022-final",
    title: "Argentina — 2022 World Cup Final",
    subtitle: "Argentina 3-3 France (4-2 pens)",
    formation: "4-4-2",
    context: "Lionel Scaloni's side lifted the trophy in Qatar, Messi's crowning moment.",
    players: [
      { name: "Emiliano Martínez", position: "GK" },
      { name: "Nahuel Molina", position: "RB" },
      { name: "Cristian Romero", position: "CB" },
      { name: "Nicolás Otamendi", position: "CB" },
      { name: "Nicolás Tagliafico", position: "LB" },
      { name: "Rodrigo De Paul", position: "CM" },
      { name: "Enzo Fernández", position: "CM" },
      { name: "Alexis Mac Allister", position: "CM" },
      { name: "Ángel Di María", position: "RW" },
      { name: "Lionel Messi", position: "ST" },
      { name: "Julián Álvarez", position: "ST" },
    ],
  },
  {
    id: "germany-2014-final",
    title: "Germany — 2014 World Cup Final",
    subtitle: "Germany 1-0 Argentina (a.e.t.)",
    formation: "4-3-3",
    context: "Joachim Löw's side ended a 24-year wait at the Maracanã.",
    players: [
      { name: "Manuel Neuer", position: "GK" },
      { name: "Philipp Lahm", position: "RB" },
      { name: "Jérôme Boateng", position: "CB" },
      { name: "Mats Hummels", position: "CB" },
      { name: "Benedikt Höwedes", position: "LB" },
      { name: "Bastian Schweinsteiger", position: "CM" },
      { name: "Sami Khedira", position: "CM" },
      { name: "Toni Kroos", position: "CM" },
      { name: "Thomas Müller", position: "RW" },
      { name: "Miroslav Klose", position: "ST" },
      { name: "Mesut Özil", position: "LW" },
    ],
  },
];

const legendsLineups: Lineup[] = [
  {
    id: "all-time-real-madrid",
    title: "All-Time Real Madrid XI",
    subtitle: "Pick of the Galácticos era and beyond",
    formation: "4-3-3",
    context: "Fans' consensus of Madrid's greatest XI from across eras.",
    players: [
      { name: "Iker Casillas", position: "GK" },
      { name: "Roberto Carlos", position: "LB" },
      { name: "Sergio Ramos", position: "CB" },
      { name: "Fernando Hierro", position: "CB" },
      { name: "Manolo Sanchís", position: "RB" },
      { name: "Zinedine Zidane", position: "CM" },
      { name: "Alfredo Di Stéfano", position: "CM" },
      { name: "Luka Modrić", position: "CM" },
      { name: "Cristiano Ronaldo", position: "LW" },
      { name: "Raúl", position: "ST" },
      { name: "Ferenc Puskás", position: "RW" },
    ],
  },
  {
    id: "all-time-brazil",
    title: "All-Time Brazil XI",
    subtitle: "The Seleção's greatest of all time",
    formation: "4-3-3",
    context: "Five-time World Cup winners' consensus best XI.",
    players: [
      { name: "Taffarel", position: "GK" },
      { name: "Cafu", position: "RB" },
      { name: "Lúcio", position: "CB" },
      { name: "Aldair", position: "CB" },
      { name: "Roberto Carlos", position: "LB" },
      { name: "Sócrates", position: "CM" },
      { name: "Zico", position: "CM" },
      { name: "Rivellino", position: "CM" },
      { name: "Pelé", position: "ST" },
      { name: "Ronaldo Nazário", position: "ST" },
      { name: "Garrincha", position: "RW" },
    ],
  },
];

const americaLineups: Lineup[] = [
  {
    id: "brazil-2002-final",
    title: "Brazil — 2002 World Cup Final",
    subtitle: "Brazil 2-0 Germany",
    formation: "3-5-2",
    context: "Luiz Felipe Scolari's pentacampeões clinched a fifth star in Yokohama.",
    players: [
      { name: "Marcos", position: "GK" },
      { name: "Lúcio", position: "CB" },
      { name: "Edmílson", position: "CB" },
      { name: "Roque Júnior", position: "CB" },
      { name: "Cafu", position: "RWB" },
      { name: "Roberto Carlos", position: "LWB" },
      { name: "Gilberto Silva", position: "CM" },
      { name: "Kléberson", position: "CM" },
      { name: "Ronaldinho", position: "CAM" },
      { name: "Rivaldo", position: "ST" },
      { name: "Ronaldo", position: "ST" },
    ],
  },
  {
    id: "uruguay-1950-final",
    title: "Uruguay — 1950 Maracanazo",
    subtitle: "Uruguay 2-1 Brazil",
    formation: "WM",
    context: "The Maracanazo: Uruguay shocked Brazil at the Maracanã to win the 1950 World Cup.",
    players: [
      { name: "Roque Máspoli", position: "GK" },
      { name: "Matías González", position: "RB" },
      { name: "Eusebio Tejera", position: "LB" },
      { name: "Schubert Gambetta", position: "CB" },
      { name: "Obdulio Varela", position: "CB" },
      { name: "Víctor Andrade", position: "CB" },
      { name: "Alcides Ghiggia", position: "RW" },
      { name: "Julio Pérez", position: "CM" },
      { name: "Óscar Míguez", position: "ST" },
      { name: "Juan Schiaffino", position: "ST" },
      { name: "Rubén Morán", position: "LW" },
    ],
  },
];

const euro2024Lineups: Lineup[] = [
  {
    id: "spain-2024-final",
    title: "Spain — Euro 2024 Final",
    subtitle: "Spain 2-1 England",
    formation: "4-3-3",
    context: "Luis de la Fuente's side won every match of the tournament en route to glory.",
    players: [
      { name: "Unai Simón", position: "GK" },
      { name: "Dani Carvajal", position: "RB" },
      { name: "Robin Le Normand", position: "CB" },
      { name: "Aymeric Laporte", position: "CB" },
      { name: "Marc Cucurella", position: "LB" },
      { name: "Rodri", position: "CDM" },
      { name: "Fabián Ruiz", position: "CM" },
      { name: "Dani Olmo", position: "CM" },
      { name: "Lamine Yamal", position: "RW" },
      { name: "Álvaro Morata", position: "ST" },
      { name: "Nico Williams", position: "LW" },
    ],
  },
  {
    id: "england-2024-final",
    title: "England — Euro 2024 Final",
    subtitle: "England 1-2 Spain",
    formation: "3-4-2-1",
    context: "Gareth Southgate's last match in charge ended in a Berlin defeat.",
    players: [
      { name: "Jordan Pickford", position: "GK" },
      { name: "Kyle Walker", position: "CB" },
      { name: "John Stones", position: "CB" },
      { name: "Marc Guéhi", position: "CB" },
      { name: "Bukayo Saka", position: "RWB" },
      { name: "Declan Rice", position: "CM" },
      { name: "Kobbie Mainoo", position: "CM" },
      { name: "Luke Shaw", position: "LWB" },
      { name: "Jude Bellingham", position: "CAM" },
      { name: "Phil Foden", position: "CAM" },
      { name: "Harry Kane", position: "ST" },
    ],
  },
];

const copaAmericaLineups: Lineup[] = [
  {
    id: "argentina-2024-final",
    title: "Argentina — Copa América 2024 Final",
    subtitle: "Argentina 1-0 Colombia",
    formation: "4-4-2",
    context: "La Albiceleste defended their continental crown in Miami.",
    players: [
      { name: "Emiliano Martínez", position: "GK" },
      { name: "Gonzalo Montiel", position: "RB" },
      { name: "Cristian Romero", position: "CB" },
      { name: "Lisandro Martínez", position: "CB" },
      { name: "Nicolás Tagliafico", position: "LB" },
      { name: "Rodrigo De Paul", position: "CM" },
      { name: "Enzo Fernández", position: "CM" },
      { name: "Alexis Mac Allister", position: "CM" },
      { name: "Ángel Di María", position: "RW" },
      { name: "Lionel Messi", position: "ST" },
      { name: "Lautaro Martínez", position: "ST" },
    ],
  },
  {
    id: "chile-2015-final",
    title: "Chile — Copa América 2015 Final",
    subtitle: "Chile 0-0 Argentina (4-1 pens)",
    formation: "3-4-1-2",
    context: "Jorge Sampaoli's golden generation lifted Chile's first ever Copa América.",
    players: [
      { name: "Claudio Bravo", position: "GK" },
      { name: "Gary Medel", position: "CB" },
      { name: "Gonzalo Jara", position: "CB" },
      { name: "Eugenio Mena", position: "CB" },
      { name: "Mauricio Isla", position: "RWB" },
      { name: "Charles Aránguiz", position: "CM" },
      { name: "Marcelo Díaz", position: "CM" },
      { name: "Jean Beausejour", position: "LWB" },
      { name: "Arturo Vidal", position: "CAM" },
      { name: "Eduardo Vargas", position: "ST" },
      { name: "Alexis Sánchez", position: "ST" },
    ],
  },
];

const worldCupLineups: Lineup[] = [
  {
    id: "brazil-1970-final",
    title: "Brazil — 1970 World Cup Final",
    subtitle: "Brazil 4-1 Italy",
    formation: "4-2-4",
    context: "Often considered the greatest team of all time. Mario Zagallo's masterpiece.",
    players: [
      { name: "Félix", position: "GK" },
      { name: "Carlos Alberto", position: "RB" },
      { name: "Brito", position: "CB" },
      { name: "Wilson Piazza", position: "CB" },
      { name: "Everaldo", position: "LB" },
      { name: "Clodoaldo", position: "CM" },
      { name: "Gérson", position: "CM" },
      { name: "Jairzinho", position: "RW" },
      { name: "Tostão", position: "ST" },
      { name: "Pelé", position: "ST" },
      { name: "Rivellino", position: "LW" },
    ],
  },
  {
    id: "france-1998-final",
    title: "France — 1998 World Cup Final",
    subtitle: "France 3-0 Brazil",
    formation: "4-3-2-1",
    context: "Aimé Jacquet's side won France's first ever World Cup at the Stade de France.",
    players: [
      { name: "Fabien Barthez", position: "GK" },
      { name: "Lilian Thuram", position: "RB" },
      { name: "Marcel Desailly", position: "CB" },
      { name: "Laurent Blanc", position: "CB" },
      { name: "Bixente Lizarazu", position: "LB" },
      { name: "Didier Deschamps", position: "CM" },
      { name: "Christian Karembeu", position: "CM" },
      { name: "Emmanuel Petit", position: "CM" },
      { name: "Zinedine Zidane", position: "CAM" },
      { name: "Youri Djorkaeff", position: "CAM" },
      { name: "Stéphane Guivarc'h", position: "ST" },
    ],
  },
];

export const lineupSets: Record<string, Lineup[]> = {
  goltexto: goltextoLineups,
  countries: countriesLineups,
  legends: legendsLineups,
  america: americaLineups,
  euro2024: euro2024Lineups,
  copaamerica: copaAmericaLineups,
  worldcup: worldCupLineups,
};

export function getDailyLineup(set: keyof typeof lineupSets): Lineup {
  const lineups = lineupSets[set];
  const epoch = new Date(2024, 0, 1).getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const dayIndex = Math.floor((today - epoch) / 86400000);
  return lineups[dayIndex % lineups.length];
}

// Normalises a name for comparison (case, accents, punctuation, whitespace)
export function normaliseName(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{Diacritic}+/gu, "")
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function nameMatches(input: string, target: string): boolean {
  const a = normaliseName(input);
  const b = normaliseName(target);
  if (!a) return false;
  if (a === b) return true;
  // Allow surname-only match (last word of target)
  const lastWord = b.split(" ").slice(-1)[0];
  if (lastWord && a === lastWord) return true;
  return false;
}
