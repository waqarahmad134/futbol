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
  {
    id: "p3",
    groups: [
      {
        category: "Premier League clubs",
        difficulty: 1,
        items: ["Manchester City", "Tottenham", "Newcastle", "Aston Villa"],
      },
      {
        category: "La Liga clubs",
        difficulty: 2,
        items: ["Real Sociedad", "Athletic Bilbao", "Getafe", "Celta Vigo"],
      },
      {
        category: "Serie A clubs",
        difficulty: 3,
        items: ["Napoli", "Inter", "Milan", "Juventus"],
      },
      {
        category: "Bundesliga clubs",
        difficulty: 4,
        items: ["Bayern Munich", "Dortmund", "Leverkusen", "Leipzig"],
      },
    ],
  },
  {
    id: "p4",
    groups: [
      {
        category: "France World Cup winners (2018)",
        difficulty: 1,
        items: ["Mbappé", "Griezmann", "Pogba", "Kanté"],
      },
      {
        category: "Germany World Cup winners (2014)",
        difficulty: 2,
        items: ["Neuer", "Kroos", "Müller", "Özil"],
      },
      {
        category: "Spain World Cup winners (2010)",
        difficulty: 3,
        items: ["Casillas", "Xavi", "Iniesta", "Villa"],
      },
      {
        category: "Italy World Cup winners (2006)",
        difficulty: 4,
        items: ["Cannavaro", "Pirlo", "Totti", "Gattuso"],
      },
    ],
  },
  {
    id: "p5",
    groups: [
      {
        category: "English players",
        difficulty: 1,
        items: ["Kane", "Bellingham", "Saka", "Foden"],
      },
      {
        category: "German players",
        difficulty: 2,
        items: ["Musiala", "Wirtz", "Sané", "Havertz"],
      },
      {
        category: "Portuguese players",
        difficulty: 3,
        items: ["Ronaldo", "Fernandes", "Bernardo Silva", "Leão"],
      },
      {
        category: "Dutch players",
        difficulty: 4,
        items: ["Van Dijk", "De Jong", "Gakpo", "Dumfries"],
      },
    ],
  },
  {
    id: "p6",
    groups: [
      {
        category: "Champions League winning clubs",
        difficulty: 1,
        items: ["Real Madrid", "Barcelona", "Bayern Munich", "Ajax"],
      },
      {
        category: "Europa League winning clubs",
        difficulty: 2,
        items: ["Sevilla", "Atlético Madrid", "Villarreal", "Eintracht Frankfurt"],
      },
      {
        category: "Copa Libertadores winning clubs",
        difficulty: 3,
        items: ["Boca Juniors", "River Plate", "Flamengo", "Palmeiras"],
      },
      {
        category: "World Cup winning nations",
        difficulty: 4,
        items: ["Brazil", "Germany", "Argentina", "France"],
      },
    ],
  },
  {
    id: "p7",
    groups: [
      {
        category: "Coached Manchester United",
        difficulty: 1,
        items: ["Ferguson", "Mourinho", "Ten Hag", "Solskjær"],
      },
      {
        category: "Coached Barcelona",
        difficulty: 2,
        items: ["Guardiola", "Enrique", "Xavi", "Koeman"],
      },
      {
        category: "Coached Liverpool",
        difficulty: 3,
        items: ["Klopp", "Dalglish", "Benítez", "Shankly"],
      },
      {
        category: "Coached Arsenal",
        difficulty: 4,
        items: ["Wenger", "Arteta", "Graham", "Emery"],
      },
    ],
  },
  {
    id: "p8",
    groups: [
      {
        category: "Premier League Golden Boot winners",
        difficulty: 1,
        items: ["Salah", "Henry", "Haaland", "Shearer"],
      },
      {
        category: "La Liga Pichichi winners",
        difficulty: 2,
        items: ["Messi", "Forlán", "Benzema", "Hugo Sánchez"],
      },
      {
        category: "Serie A top scorer winners",
        difficulty: 3,
        items: ["Immobile", "Icardi", "Osimhen", "Lautaro Martínez"],
      },
      {
        category: "Bundesliga top scorer winners",
        difficulty: 4,
        items: ["Lewandowski", "Gerd Müller", "Mario Gómez", "Klose"],
      },
    ],
  },
  {
    id: "p9",
    groups: [
      {
        category: "German goalkeepers",
        difficulty: 1,
        items: ["Neuer", "Ter Stegen", "Leno", "Trapp"],
      },
      {
        category: "Spanish goalkeepers",
        difficulty: 2,
        items: ["Casillas", "De Gea", "Raya", "Unai Simón"],
      },
      {
        category: "Brazilian goalkeepers",
        difficulty: 3,
        items: ["Alisson", "Ederson", "Júlio César", "Taffarel"],
      },
      {
        category: "French goalkeepers",
        difficulty: 4,
        items: ["Lloris", "Mandanda", "Maignan", "Barthez"],
      },
    ],
  },
  {
    id: "p10",
    groups: [
      {
        category: "Eredivisie clubs",
        difficulty: 1,
        items: ["Ajax", "PSV", "Feyenoord", "AZ Alkmaar"],
      },
      {
        category: "Primeira Liga clubs",
        difficulty: 2,
        items: ["Porto", "Benfica", "Sporting CP", "Braga"],
      },
      {
        category: "Scottish Premiership clubs",
        difficulty: 3,
        items: ["Celtic", "Rangers", "Hearts", "Aberdeen"],
      },
      {
        category: "Belgian Pro League clubs",
        difficulty: 4,
        items: ["Club Brugge", "Anderlecht", "Genk", "Gent"],
      },
    ],
  },
  {
    id: "p11",
    groups: [
      {
        category: "Played for Real Madrid",
        difficulty: 1,
        items: ["Ramos", "Modrić", "Benzema", "Casillas"],
      },
      {
        category: "Played for Barcelona",
        difficulty: 2,
        items: ["Piqué", "Busquets", "Alba", "Puyol"],
      },
      {
        category: "Played for Manchester United",
        difficulty: 3,
        items: ["Giggs", "Scholes", "Rooney", "Ferdinand"],
      },
      {
        category: "Played for Bayern Munich",
        difficulty: 4,
        items: ["Lahm", "Müller", "Ribéry", "Neuer"],
      },
    ],
  },
  {
    id: "p12",
    groups: [
      {
        category: "France World Cup winners (1998)",
        difficulty: 1,
        items: ["Zidane", "Henry", "Vieira", "Desailly"],
      },
      {
        category: "Brazil World Cup winners (2002)",
        difficulty: 2,
        items: ["Ronaldo", "Rivaldo", "Ronaldinho", "Cafu"],
      },
      {
        category: "Germany World Cup winners (1990)",
        difficulty: 3,
        items: ["Matthäus", "Klinsmann", "Brehme", "Völler"],
      },
      {
        category: "Argentina World Cup winners (1986)",
        difficulty: 4,
        items: ["Maradona", "Valdano", "Burruchaga", "Pumpido"],
      },
    ],
  },
  {
    id: "p13",
    groups: [
      {
        category: "FA Cup winning clubs",
        difficulty: 1,
        items: ["Arsenal", "Manchester United", "Chelsea", "Tottenham"],
      },
      {
        category: "Copa del Rey winning clubs",
        difficulty: 2,
        items: ["Barcelona", "Real Madrid", "Athletic Bilbao", "Valencia"],
      },
      {
        category: "DFB-Pokal winning clubs",
        difficulty: 3,
        items: ["Bayern Munich", "Dortmund", "Schalke", "Werder Bremen"],
      },
      {
        category: "Coppa Italia winning clubs",
        difficulty: 4,
        items: ["Juventus", "Inter", "Roma", "Napoli"],
      },
    ],
  },
  {
    id: "p14",
    groups: [
      {
        category: "Coached Chelsea",
        difficulty: 1,
        items: ["Tuchel", "Sarri", "Lampard", "Potter"],
      },
      {
        category: "Coached Tottenham",
        difficulty: 2,
        items: ["Redknapp", "Jol", "Sherwood", "Santini"],
      },
      {
        category: "Coached Inter",
        difficulty: 3,
        items: ["Simone Inzaghi", "Mancini", "Spalletti", "Gasperini"],
      },
      {
        category: "Coached AC Milan",
        difficulty: 4,
        items: ["Allegri", "Sacchi", "Capello", "Gattuso"],
      },
    ],
  },
  {
    id: "p15",
    groups: [
      {
        category: "Italian defenders",
        difficulty: 1,
        items: ["Maldini", "Nesta", "Cannavaro", "Chiellini"],
      },
      {
        category: "English defenders",
        difficulty: 2,
        items: ["Terry", "Ferdinand", "Cole", "Walker"],
      },
      {
        category: "Brazilian defenders",
        difficulty: 3,
        items: ["Cafu", "Roberto Carlos", "Thiago Silva", "Marcelo"],
      },
      {
        category: "Spanish defenders",
        difficulty: 4,
        items: ["Ramos", "Piqué", "Puyol", "Alba"],
      },
    ],
  },
  {
    id: "p16",
    groups: [
      {
        category: "Ligue 1 clubs",
        difficulty: 1,
        items: ["PSG", "Marseille", "Lyon", "Monaco"],
      },
      {
        category: "Turkish Super Lig clubs",
        difficulty: 2,
        items: ["Galatasaray", "Fenerbahçe", "Beşiktaş", "Trabzonspor"],
      },
      {
        category: "Argentine Primera clubs",
        difficulty: 3,
        items: ["Boca Juniors", "River Plate", "Racing", "Independiente"],
      },
      {
        category: "Brazilian Serie A clubs",
        difficulty: 4,
        items: ["Flamengo", "Palmeiras", "Corinthians", "São Paulo"],
      },
    ],
  },
  {
    id: "p17",
    groups: [
      {
        category: "Ballon d'Or winners (2000s)",
        difficulty: 1,
        items: ["Figo", "Owen", "Nedvěd", "Shevchenko"],
      },
      {
        category: "Ballon d'Or winners (1990s)",
        difficulty: 2,
        items: ["Baggio", "Weah", "Sammer", "Stoichkov"],
      },
      {
        category: "Ballon d'Or winners (1980s)",
        difficulty: 3,
        items: ["Platini", "Gullit", "Rummenigge", "Belanov"],
      },
      {
        category: "Ballon d'Or winners (1970s)",
        difficulty: 4,
        items: ["Cruyff", "Beckenbauer", "Simonsen", "Keegan"],
      },
    ],
  },
  {
    id: "p18",
    groups: [
      {
        category: "England captains",
        difficulty: 1,
        items: ["Kane", "Gerrard", "Terry", "Beckham"],
      },
      {
        category: "France captains",
        difficulty: 2,
        items: ["Mbappé", "Lloris", "Deschamps", "Platini"],
      },
      {
        category: "Germany captains",
        difficulty: 3,
        items: ["Lahm", "Ballack", "Kahn", "Matthäus"],
      },
      {
        category: "Brazil captains",
        difficulty: 4,
        items: ["Thiago Silva", "Cafu", "Dunga", "Lúcio"],
      },
    ],
  },
  {
    id: "p19",
    groups: [
      {
        category: "Premier League winning managers",
        difficulty: 1,
        items: ["Ferguson", "Wenger", "Pellegrini", "Ranieri"],
      },
      {
        category: "La Liga winning managers",
        difficulty: 2,
        items: ["Enrique", "Valverde", "Simeone", "Zidane"],
      },
      {
        category: "Serie A winning managers",
        difficulty: 3,
        items: ["Allegri", "Simone Inzaghi", "Spalletti", "Sarri"],
      },
      {
        category: "Bundesliga winning managers",
        difficulty: 4,
        items: ["Heynckes", "Flick", "Tuchel", "Alonso"],
      },
    ],
  },
  {
    id: "p20",
    groups: [
      {
        category: "Played for Juventus",
        difficulty: 1,
        items: ["Del Piero", "Buffon", "Chiellini", "Pirlo"],
      },
      {
        category: "Played for Liverpool",
        difficulty: 2,
        items: ["Salah", "Van Dijk", "Gerrard", "Alisson"],
      },
      {
        category: "Played for Arsenal",
        difficulty: 3,
        items: ["Bergkamp", "Pires", "Adams", "Ljungberg"],
      },
      {
        category: "Played for Borussia Dortmund",
        difficulty: 4,
        items: ["Reus", "Hummels", "Lewandowski", "Götze"],
      },
    ],
  },
  {
    id: "p21",
    groups: [
      {
        category: "Italy World Cup winners (1982)",
        difficulty: 1,
        items: ["Rossi", "Zoff", "Scirea", "Tardelli"],
      },
      {
        category: "Brazil World Cup winners (1970)",
        difficulty: 2,
        items: ["Pelé", "Jairzinho", "Rivelino", "Tostão"],
      },
      {
        category: "England World Cup winners (1966)",
        difficulty: 3,
        items: ["Bobby Charlton", "Moore", "Hurst", "Banks"],
      },
      {
        category: "West Germany World Cup winners (1974)",
        difficulty: 4,
        items: ["Beckenbauer", "Gerd Müller", "Overath", "Vogts"],
      },
    ],
  },
  {
    id: "p22",
    groups: [
      {
        category: "MLS clubs",
        difficulty: 1,
        items: ["LA Galaxy", "Seattle Sounders", "Atlanta United", "Inter Miami"],
      },
      {
        category: "Saudi Pro League clubs",
        difficulty: 2,
        items: ["Al Hilal", "Al Nassr", "Al Ittihad", "Al Ahli"],
      },
      {
        category: "Greek Super League clubs",
        difficulty: 3,
        items: ["Olympiacos", "Panathinaikos", "AEK Athens", "PAOK"],
      },
      {
        category: "Swiss Super League clubs",
        difficulty: 4,
        items: ["Basel", "Young Boys", "Zürich", "Servette"],
      },
    ],
  },
  {
    id: "p23",
    groups: [
      {
        category: "Ligue 1 top scorer winners",
        difficulty: 1,
        items: ["Mbappé", "Lacazette", "Cavani", "Ibrahimović"],
      },
      {
        category: "Eredivisie top scorer winners",
        difficulty: 2,
        items: ["Van Nistelrooy", "Suárez", "Huntelaar", "Depay"],
      },
      {
        category: "Primeira Liga top scorer winners",
        difficulty: 3,
        items: ["Gyökeres", "Jonas", "Cardozo", "Bas Dost"],
      },
      {
        category: "Scottish Premiership top scorer winners",
        difficulty: 4,
        items: ["Furuhashi", "Morelos", "Édouard", "Griffiths"],
      },
    ],
  },
  {
    id: "p24",
    groups: [
      {
        category: "Croatian players",
        difficulty: 1,
        items: ["Modrić", "Rakitić", "Kovačić", "Perišić"],
      },
      {
        category: "Belgian players",
        difficulty: 2,
        items: ["De Bruyne", "Lukaku", "Hazard", "Courtois"],
      },
      {
        category: "Uruguayan players",
        difficulty: 3,
        items: ["Suárez", "Cavani", "Federico Valverde", "Núñez"],
      },
      {
        category: "Colombian players",
        difficulty: 4,
        items: ["James Rodríguez", "Falcao", "Luis Díaz", "Cuadrado"],
      },
    ],
  },
  {
    id: "p25",
    groups: [
      {
        category: "Spain Euro winners (2024)",
        difficulty: 1,
        items: ["Yamal", "Rodri", "Morata", "Olmo"],
      },
      {
        category: "Italy Euro winners (2020)",
        difficulty: 2,
        items: ["Donnarumma", "Chiesa", "Verratti", "Bonucci"],
      },
      {
        category: "Portugal Euro winners (2016)",
        difficulty: 3,
        items: ["Ronaldo", "Pepe", "Nani", "Quaresma"],
      },
      {
        category: "Spain Euro winners (2012)",
        difficulty: 4,
        items: ["Casillas", "Xavi", "Iniesta", "Torres"],
      },
    ],
  },
  {
    id: "p26",
    groups: [
      {
        category: "Managed England",
        difficulty: 1,
        items: ["Southgate", "Capello", "Eriksson", "Hodgson"],
      },
      {
        category: "Managed France",
        difficulty: 2,
        items: ["Deschamps", "Blanc", "Domenech", "Jacquet"],
      },
      {
        category: "Managed Germany",
        difficulty: 3,
        items: ["Löw", "Flick", "Nagelsmann", "Klinsmann"],
      },
      {
        category: "Managed Brazil",
        difficulty: 4,
        items: ["Tite", "Scolari", "Dunga", "Ancelotti"],
      },
    ],
  },
  {
    id: "p27",
    groups: [
      {
        category: "Austrian Bundesliga clubs",
        difficulty: 1,
        items: ["Red Bull Salzburg", "Sturm Graz", "Rapid Wien", "LASK"],
      },
      {
        category: "Danish Superliga clubs",
        difficulty: 2,
        items: ["Copenhagen", "Midtjylland", "Brøndby", "Nordsjælland"],
      },
      {
        category: "Swedish Allsvenskan clubs",
        difficulty: 3,
        items: ["Malmö FF", "AIK", "Djurgården", "IFK Göteborg"],
      },
      {
        category: "Norwegian Eliteserien clubs",
        difficulty: 4,
        items: ["Bodø/Glimt", "Rosenborg", "Molde", "Brann"],
      },
    ],
  },
  {
    id: "p28",
    groups: [
      {
        category: "Played for AC Milan",
        difficulty: 1,
        items: ["Maldini", "Baresi", "Gattuso", "Kaká"],
      },
      {
        category: "Played for Inter",
        difficulty: 2,
        items: ["Zanetti", "Cambiasso", "Milito", "Sneijder"],
      },
      {
        category: "Played for Chelsea",
        difficulty: 3,
        items: ["Terry", "Drogba", "Hazard", "Ashley Cole"],
      },
      {
        category: "Played for Manchester City",
        difficulty: 4,
        items: ["Agüero", "David Silva", "Kompany", "Ederson"],
      },
    ],
  },
  {
    id: "p29",
    groups: [
      {
        category: "Copa America winning nations",
        difficulty: 1,
        items: ["Argentina", "Brazil", "Uruguay", "Chile"],
      },
      {
        category: "European Championship winning nations",
        difficulty: 2,
        items: ["Spain", "Germany", "Italy", "France"],
      },
      {
        category: "Africa Cup of Nations winning nations",
        difficulty: 3,
        items: ["Egypt", "Cameroon", "Nigeria", "Ghana"],
      },
      {
        category: "Asian Cup winning nations",
        difficulty: 4,
        items: ["Japan", "Saudi Arabia", "Australia", "Iran"],
      },
    ],
  },
  {
    id: "p30",
    groups: [
      {
        category: "French Ballon d'Or winners",
        difficulty: 1,
        items: ["Benzema", "Zidane", "Platini", "Kopa"],
      },
      {
        category: "German Ballon d'Or winners",
        difficulty: 2,
        items: ["Beckenbauer", "Rummenigge", "Sammer", "Matthäus"],
      },
      {
        category: "Italian Ballon d'Or winners",
        difficulty: 3,
        items: ["Baggio", "Cannavaro", "Rossi", "Rivera"],
      },
      {
        category: "English Ballon d'Or winners",
        difficulty: 4,
        items: ["Bobby Charlton", "Keegan", "Owen", "Stanley Matthews"],
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
