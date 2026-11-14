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
  {
    id: "europe-3",
    rows: ["Arsenal", "Chelsea", "AC Milan"],
    cols: ["France", "England", "Brazil"],
    cells: [
      [
        lower(["Thierry Henry", "Henry", "Patrick Vieira", "Vieira", "Robert Pires", "Pires", "William Saliba", "Saliba", "Olivier Giroud", "Giroud", "Laurent Koscielny", "Koscielny"]),
        lower(["Bukayo Saka", "Saka", "Declan Rice", "Rice", "Aaron Ramsdale", "Ramsdale", "Ben White", "White", "Emile Smith Rowe", "Smith Rowe", "Jack Wilshere", "Wilshere"]),
        lower(["Gabriel Jesus", "Jesus", "Gabriel Martinelli", "Martinelli", "Gabriel Magalhaes", "Magalhaes", "Willian", "David Luiz", "Luiz", "Gilberto Silva", "Gilberto"]),
      ],
      [
        lower(["N'Golo Kante", "Kante", "Kanté", "Olivier Giroud", "Giroud", "Claude Makelele", "Makelele", "William Gallas", "Gallas", "Malo Gusto", "Gusto", "Wesley Fofana", "Fofana"]),
        lower(["John Terry", "Terry", "Frank Lampard", "Lampard", "Mason Mount", "Mount", "Reece James", "James", "Cole Palmer", "Palmer", "Raheem Sterling", "Sterling"]),
        lower(["Willian", "David Luiz", "Luiz", "Thiago Silva", "Silva", "Oscar", "Ramires"]),
      ],
      [
        lower(["Olivier Giroud", "Giroud", "Mike Maignan", "Maignan", "Theo Hernandez", "Hernandez", "Hernández", "Pierre Kalulu", "Kalulu", "Yacine Adli", "Adli", "Tiemoue Bakayoko", "Bakayoko"]),
        lower(["Fikayo Tomori", "Tomori", "Tammy Abraham", "Abraham", "Ruben Loftus-Cheek", "Loftus-Cheek", "David Beckham", "Beckham"]),
        lower(["Kaka", "Kaká", "Ronaldo", "Ronaldinho", "Cafu", "Thiago Silva", "Silva", "Alexandre Pato", "Pato", "Robinho", "Serginho"]),
      ],
    ],
  },
  {
    id: "europe-4",
    rows: ["Inter", "Paris Saint-Germain", "Manchester City"],
    cols: ["Argentina", "Brazil", "France"],
    cells: [
      [
        lower(["Javier Zanetti", "Zanetti", "Lautaro Martinez", "Martinez", "Martínez", "Esteban Cambiasso", "Cambiasso", "Diego Milito", "Milito", "Hernan Crespo", "Crespo", "Walter Samuel", "Samuel"]),
        lower(["Ronaldo", "Adriano", "Maicon", "Julio Cesar", "Cesar", "Lucio", "Lúcio", "Roberto Carlos", "Carlos", "Philippe Coutinho", "Coutinho"]),
        lower(["Patrick Vieira", "Vieira", "Lilian Thuram", "Thuram", "Marcus Thuram", "Benjamin Pavard", "Pavard", "Youri Djorkaeff", "Djorkaeff"]),
      ],
      [
        lower(["Lionel Messi", "Messi", "Angel Di Maria", "Di Maria", "Di María", "Javier Pastore", "Pastore", "Ezequiel Lavezzi", "Lavezzi", "Mauro Icardi", "Icardi", "Leandro Paredes", "Paredes"]),
        lower(["Neymar", "Thiago Silva", "Silva", "Marquinhos", "Lucas Moura", "Moura", "Dani Alves", "Alves", "David Luiz", "Luiz", "Ronaldinho", "Rai"]),
        lower(["Kylian Mbappe", "Mbappe", "Mbappé", "Ousmane Dembele", "Dembele", "Dembélé", "Warren Zaire-Emery", "Zaire-Emery", "Presnel Kimpembe", "Kimpembe", "Blaise Matuidi", "Matuidi"]),
      ],
      [
        lower(["Sergio Aguero", "Aguero", "Agüero", "Carlos Tevez", "Tevez", "Julian Alvarez", "Alvarez", "Álvarez", "Pablo Zabaleta", "Zabaleta", "Nicolas Otamendi", "Otamendi", "Martin Demichelis", "Demichelis"]),
        lower(["Ederson", "Fernandinho", "Gabriel Jesus", "Jesus", "Robinho", "Danilo", "Savinho"]),
        lower(["Samir Nasri", "Nasri", "Gael Clichy", "Clichy", "Benjamin Mendy", "Mendy", "Eliaquim Mangala", "Mangala"]),
      ],
    ],
  },
  {
    id: "europe-5",
    rows: ["Real Madrid", "Barcelona", "Bayern Munich"],
    cols: ["Brazil", "Spain", "Germany"],
    cells: [
      [
        lower(["Ronaldo", "Roberto Carlos", "Carlos", "Vinicius Junior", "Vinicius", "Rodrygo", "Marcelo", "Casemiro", "Eder Militao", "Militao", "Militão"]),
        lower(["Raul", "Raúl", "Iker Casillas", "Casillas", "Sergio Ramos", "Ramos", "Dani Carvajal", "Carvajal", "Isco", "Marco Asensio", "Asensio"]),
        lower(["Toni Kroos", "Kroos", "Mesut Ozil", "Ozil", "Özil", "Sami Khedira", "Khedira", "Antonio Rudiger", "Rudiger", "Rüdiger", "Christoph Metzelder", "Metzelder"]),
      ],
      [
        lower(["Ronaldinho", "Neymar", "Ronaldo", "Rivaldo", "Dani Alves", "Alves", "Philippe Coutinho", "Coutinho", "Raphinha"]),
        lower(["Xavi", "Andres Iniesta", "Iniesta", "Carles Puyol", "Puyol", "Sergio Busquets", "Busquets", "Pedri", "Gavi", "Lamine Yamal", "Yamal"]),
        lower(["Marc-Andre ter Stegen", "ter Stegen", "Ilkay Gundogan", "Gundogan", "Gündogan", "Bernd Schuster", "Schuster"]),
      ],
      [
        lower(["Giovane Elber", "Elber", "Élber", "Lucio", "Lúcio", "Ze Roberto", "Zé Roberto", "Rafinha", "Dante", "Breno"]),
        lower(["Javi Martinez", "Martinez", "Martínez", "Thiago Alcantara", "Thiago", "Xabi Alonso", "Alonso"]),
        lower(["Manuel Neuer", "Neuer", "Thomas Muller", "Muller", "Müller", "Philipp Lahm", "Lahm", "Bastian Schweinsteiger", "Schweinsteiger", "Toni Kroos", "Kroos", "Mario Gotze", "Gotze", "Götze", "Jamal Musiala", "Musiala"]),
      ],
    ],
  },
  {
    id: "europe-6",
    rows: ["Manchester United", "Liverpool", "Tottenham Hotspur"],
    cols: ["England", "Netherlands", "Brazil"],
    cells: [
      [
        lower(["Wayne Rooney", "Rooney", "Marcus Rashford", "Rashford", "Harry Maguire", "Maguire", "Luke Shaw", "Shaw", "David Beckham", "Beckham", "Paul Scholes", "Scholes"]),
        lower(["Ruud van Nistelrooy", "van Nistelrooy", "Nistelrooy", "Robin van Persie", "van Persie", "Edwin van der Sar", "van der Sar", "Daley Blind", "Blind", "Donny van de Beek", "van de Beek", "Memphis Depay", "Depay"]),
        lower(["Casemiro", "Antony", "Fred", "Anderson", "Rafael", "Fabio"]),
      ],
      [
        lower(["Steven Gerrard", "Gerrard", "Trent Alexander-Arnold", "Alexander-Arnold", "Jordan Henderson", "Henderson", "Jamie Carragher", "Carragher", "Curtis Jones", "Jones"]),
        lower(["Virgil van Dijk", "van Dijk", "Cody Gakpo", "Gakpo", "Ryan Gravenberch", "Gravenberch", "Dirk Kuyt", "Kuyt", "Georginio Wijnaldum", "Wijnaldum"]),
        lower(["Roberto Firmino", "Firmino", "Alisson", "Philippe Coutinho", "Coutinho", "Fabinho", "Lucas Leiva", "Leiva"]),
      ],
      [
        lower(["Harry Kane", "Kane", "Dele Alli", "Alli", "Eric Dier", "Dier", "Kyle Walker", "Walker", "James Maddison", "Maddison"]),
        lower(["Rafael van der Vaart", "van der Vaart", "Steven Bergwijn", "Bergwijn", "Micky van de Ven", "van de Ven"]),
        lower(["Lucas Moura", "Moura", "Emerson Royal", "Emerson", "Richarlison", "Paulinho", "Sandro"]),
      ],
    ],
  },
  {
    id: "europe-7",
    rows: ["Juventus", "Inter", "AC Milan"],
    cols: ["Italy", "Argentina", "France"],
    cells: [
      [
        lower(["Gianluigi Buffon", "Buffon", "Andrea Pirlo", "Pirlo", "Giorgio Chiellini", "Chiellini", "Leonardo Bonucci", "Bonucci", "Federico Chiesa", "Chiesa", "Alessandro Del Piero", "Del Piero"]),
        lower(["Carlos Tevez", "Tevez", "Paulo Dybala", "Dybala", "Gonzalo Higuain", "Higuain", "Higuaín", "Angel Di Maria", "Di Maria", "Di María"]),
        lower(["Zinedine Zidane", "Zidane", "Didier Deschamps", "Deschamps", "Paul Pogba", "Pogba", "Patrice Evra", "Evra", "Lilian Thuram", "Thuram", "David Trezeguet", "Trezeguet"]),
      ],
      [
        lower(["Francesco Toldo", "Toldo", "Marco Materazzi", "Materazzi", "Alessandro Bastoni", "Bastoni", "Nicolo Barella", "Barella", "Federico Dimarco", "Dimarco", "Davide Frattesi", "Frattesi"]),
        lower(["Javier Zanetti", "Zanetti", "Lautaro Martinez", "Martinez", "Martínez", "Esteban Cambiasso", "Cambiasso", "Diego Milito", "Milito", "Hernan Crespo", "Crespo"]),
        lower(["Patrick Vieira", "Vieira", "Lilian Thuram", "Thuram", "Marcus Thuram", "Benjamin Pavard", "Pavard", "Youri Djorkaeff", "Djorkaeff"]),
      ],
      [
        lower(["Paolo Maldini", "Maldini", "Franco Baresi", "Baresi", "Andrea Pirlo", "Pirlo", "Gennaro Gattuso", "Gattuso", "Alessandro Nesta", "Nesta", "Sandro Tonali", "Tonali"]),
        lower(["Hernan Crespo", "Crespo", "Lucas Biglia", "Biglia", "Mateo Musacchio", "Musacchio"]),
        lower(["Olivier Giroud", "Giroud", "Mike Maignan", "Maignan", "Theo Hernandez", "Hernandez", "Hernández", "Pierre Kalulu", "Kalulu", "Tiemoue Bakayoko", "Bakayoko", "Yacine Adli", "Adli"]),
      ],
    ],
  },
  {
    id: "europe-8",
    rows: ["Real Madrid", "Paris Saint-Germain", "Chelsea"],
    cols: ["France", "Brazil", "Spain"],
    cells: [
      [
        lower(["Karim Benzema", "Benzema", "Zinedine Zidane", "Zidane", "Raphael Varane", "Varane", "Eduardo Camavinga", "Camavinga", "Aurelien Tchouameni", "Tchouameni", "Ferland Mendy", "Mendy"]),
        lower(["Ronaldo", "Roberto Carlos", "Carlos", "Vinicius Junior", "Vinicius", "Rodrygo", "Marcelo", "Casemiro", "Eder Militao", "Militao", "Militão"]),
        lower(["Raul", "Raúl", "Iker Casillas", "Casillas", "Sergio Ramos", "Ramos", "Dani Carvajal", "Carvajal", "Isco", "Marco Asensio", "Asensio"]),
      ],
      [
        lower(["Kylian Mbappe", "Mbappe", "Mbappé", "Ousmane Dembele", "Dembele", "Dembélé", "Warren Zaire-Emery", "Zaire-Emery", "Presnel Kimpembe", "Kimpembe", "Blaise Matuidi", "Matuidi"]),
        lower(["Neymar", "Thiago Silva", "Silva", "Marquinhos", "Lucas Moura", "Moura", "Dani Alves", "Alves", "David Luiz", "Luiz", "Ronaldinho", "Rai"]),
        lower(["Sergio Ramos", "Ramos", "Fabian Ruiz", "Ruiz", "Marco Asensio", "Asensio", "Carlos Soler", "Soler", "Juan Bernat", "Bernat"]),
      ],
      [
        lower(["N'Golo Kante", "Kante", "Kanté", "Olivier Giroud", "Giroud", "Claude Makelele", "Makelele", "William Gallas", "Gallas", "Malo Gusto", "Gusto", "Wesley Fofana", "Fofana"]),
        lower(["Willian", "David Luiz", "Luiz", "Thiago Silva", "Silva", "Oscar", "Ramires"]),
        lower(["Fernando Torres", "Torres", "Cesc Fabregas", "Fabregas", "Fàbregas", "Cesar Azpilicueta", "Azpilicueta", "Marcos Alonso", "Alonso", "Kepa Arrizabalaga", "Kepa", "Diego Costa", "Costa"]),
      ],
    ],
  },
  {
    id: "europe-9",
    rows: ["Barcelona", "Arsenal", "Liverpool"],
    cols: ["Spain", "Netherlands", "Brazil"],
    cells: [
      [
        lower(["Xavi", "Andres Iniesta", "Iniesta", "Carles Puyol", "Puyol", "Sergio Busquets", "Busquets", "Pedri", "Gavi", "Lamine Yamal", "Yamal"]),
        lower(["Johan Cruyff", "Cruyff", "Ronald Koeman", "Koeman", "Frank de Boer", "de Boer", "Patrick Kluivert", "Kluivert", "Frenkie de Jong", "de Jong", "Memphis Depay", "Depay"]),
        lower(["Ronaldinho", "Neymar", "Ronaldo", "Rivaldo", "Dani Alves", "Alves", "Philippe Coutinho", "Coutinho", "Raphinha"]),
      ],
      [
        lower(["Cesc Fabregas", "Fabregas", "Fàbregas", "Santi Cazorla", "Cazorla", "Mikel Arteta", "Arteta", "Hector Bellerin", "Bellerin", "Bellérin", "Nacho Monreal", "Monreal", "David Raya", "Raya"]),
        lower(["Dennis Bergkamp", "Bergkamp", "Robin van Persie", "van Persie", "Marc Overmars", "Overmars", "Jurrien Timber", "Timber"]),
        lower(["Gabriel Jesus", "Jesus", "Gabriel Martinelli", "Martinelli", "Gabriel Magalhaes", "Magalhaes", "Willian", "David Luiz", "Luiz", "Gilberto Silva", "Gilberto"]),
      ],
      [
        lower(["Xabi Alonso", "Alonso", "Fernando Torres", "Torres", "Pepe Reina", "Reina", "Luis Garcia", "Garcia", "García", "Suso", "Thiago Alcantara", "Thiago"]),
        lower(["Virgil van Dijk", "van Dijk", "Cody Gakpo", "Gakpo", "Ryan Gravenberch", "Gravenberch", "Dirk Kuyt", "Kuyt", "Georginio Wijnaldum", "Wijnaldum"]),
        lower(["Roberto Firmino", "Firmino", "Alisson", "Philippe Coutinho", "Coutinho", "Fabinho", "Lucas Leiva", "Leiva"]),
      ],
    ],
  },
  {
    id: "europe-10",
    rows: ["Manchester United", "Tottenham Hotspur", "Newcastle United"],
    cols: ["England", "France", "Brazil"],
    cells: [
      [
        lower(["Wayne Rooney", "Rooney", "Marcus Rashford", "Rashford", "Harry Maguire", "Maguire", "Luke Shaw", "Shaw", "David Beckham", "Beckham", "Paul Scholes", "Scholes"]),
        lower(["Paul Pogba", "Pogba", "Anthony Martial", "Martial", "Patrice Evra", "Evra", "Eric Cantona", "Cantona"]),
        lower(["Casemiro", "Antony", "Fred", "Anderson", "Rafael", "Fabio"]),
      ],
      [
        lower(["Harry Kane", "Kane", "Dele Alli", "Alli", "Eric Dier", "Dier", "Kyle Walker", "Walker", "James Maddison", "Maddison"]),
        lower(["Hugo Lloris", "Lloris", "Moussa Sissoko", "Sissoko", "Tanguy Ndombele", "Ndombele"]),
        lower(["Lucas Moura", "Moura", "Emerson Royal", "Emerson", "Richarlison", "Paulinho", "Sandro"]),
      ],
      [
        lower(["Alan Shearer", "Shearer", "Kieran Trippier", "Trippier", "Callum Wilson", "Wilson", "Anthony Gordon", "Gordon", "Dan Burn", "Burn", "Nick Pope", "Pope"]),
        lower(["Hatem Ben Arfa", "Ben Arfa", "Yoan Gouffran", "Gouffran", "Moussa Sissoko", "Sissoko", "Florian Lejeune", "Lejeune", "Allan Saint-Maximin", "Saint-Maximin"]),
        lower(["Bruno Guimaraes", "Guimaraes", "Guimarães", "Joelinton"]),
      ],
    ],
  },
  {
    id: "europe-11",
    rows: ["Juventus", "Roma", "Lazio"],
    cols: ["Italy", "Argentina", "Brazil"],
    cells: [
      [
        lower(["Gianluigi Buffon", "Buffon", "Andrea Pirlo", "Pirlo", "Giorgio Chiellini", "Chiellini", "Leonardo Bonucci", "Bonucci", "Federico Chiesa", "Chiesa", "Alessandro Del Piero", "Del Piero"]),
        lower(["Carlos Tevez", "Tevez", "Paulo Dybala", "Dybala", "Gonzalo Higuain", "Higuain", "Higuaín", "Angel Di Maria", "Di Maria", "Di María"]),
        lower(["Arthur Melo", "Arthur", "Danilo", "Alex Sandro", "Sandro", "Douglas Costa", "Costa", "Gleison Bremer", "Bremer"]),
      ],
      [
        lower(["Francesco Totti", "Totti", "Daniele De Rossi", "De Rossi", "Lorenzo Pellegrini", "Pellegrini", "Gianluca Mancini", "Mancini", "Stephan El Shaarawy", "El Shaarawy"]),
        lower(["Paulo Dybala", "Dybala", "Leandro Paredes", "Paredes", "Gabriel Batistuta", "Batistuta", "Erik Lamela", "Lamela"]),
        lower(["Cafu", "Aldair", "Emerson", "Juan"]),
      ],
      [
        lower(["Ciro Immobile", "Immobile", "Alessio Romagnoli", "Romagnoli", "Mattia Zaccagni", "Zaccagni", "Manuel Lazzari", "Lazzari"]),
        lower(["Hernan Crespo", "Crespo", "Juan Sebastian Veron", "Veron", "Verón", "Diego Simeone", "Simeone", "Matias Almeyda", "Almeyda", "Claudio Lopez", "Lopez", "López"]),
        lower(["Hernanes", "Felipe Anderson", "Anderson", "Anderson Hernanes"]),
      ],
    ],
  },
  {
    id: "europe-12",
    rows: ["Bayern Munich", "Borussia Dortmund", "Bayer Leverkusen"],
    cols: ["Germany", "Netherlands", "Brazil"],
    cells: [
      [
        lower(["Manuel Neuer", "Neuer", "Thomas Muller", "Muller", "Müller", "Philipp Lahm", "Lahm", "Bastian Schweinsteiger", "Schweinsteiger", "Toni Kroos", "Kroos", "Mario Gotze", "Gotze", "Götze", "Jamal Musiala", "Musiala"]),
        lower(["Arjen Robben", "Robben", "Mark van Bommel", "van Bommel", "Roy Makaay", "Makaay", "Matthijs de Ligt", "de Ligt", "Ryan Gravenberch", "Gravenberch"]),
        lower(["Giovane Elber", "Elber", "Élber", "Lucio", "Lúcio", "Ze Roberto", "Zé Roberto", "Rafinha", "Dante", "Breno"]),
      ],
      [
        lower(["Marco Reus", "Reus", "Mats Hummels", "Hummels", "Mario Gotze", "Gotze", "Götze", "Julian Brandt", "Brandt", "Niclas Fullkrug", "Fullkrug", "Füllkrug", "Emre Can", "Can"]),
        lower(["Donyell Malen", "Malen", "Ian Maatsen", "Maatsen"]),
        lower(["Dede", "Dedé", "Marcio Amoroso", "Amoroso"]),
      ],
      [
        lower(["Florian Wirtz", "Wirtz", "Jonathan Tah", "Tah", "Kai Havertz", "Havertz", "Bernd Leno", "Leno", "Lars Bender", "Bender"]),
        lower(["Jeremie Frimpong", "Frimpong", "Daley Sinkgraven", "Sinkgraven"]),
        lower(["Lucio", "Lúcio", "Ze Roberto", "Zé Roberto", "Paulo Sergio", "Sergio"]),
      ],
    ],
  },
  {
    id: "europe-13",
    rows: ["Porto", "Benfica", "Sporting CP"],
    cols: ["Portugal", "Brazil", "Argentina"],
    cells: [
      [
        lower(["Pepe", "Deco", "Ricardo Quaresma", "Quaresma", "Joao Moutinho", "Moutinho", "Ruben Neves", "Neves", "Sergio Conceicao", "Conceicao", "Conceição"]),
        lower(["Hulk", "Alex Telles", "Telles", "Fernando Reges", "Fernando"]),
        lower(["Lucho Gonzalez", "Gonzalez", "González", "Lisandro Lopez", "Lopez", "López"]),
      ],
      [
        lower(["Rui Costa", "Costa", "Joao Felix", "Felix", "Félix", "Bernardo Silva", "Silva", "Ruben Dias", "Dias", "Joao Cancelo", "Cancelo"]),
        lower(["David Luiz", "Luiz", "Ramires", "Luisao", "Luisão"]),
        lower(["Angel Di Maria", "Di Maria", "Di María", "Nicolas Otamendi", "Otamendi", "Enzo Fernandez", "Fernandez", "Fernández"]),
      ],
      [
        lower(["Cristiano Ronaldo", "Ronaldo", "Nani", "Joao Moutinho", "Moutinho", "Bruno Fernandes", "Fernandes"]),
        lower(["Anderson Polga", "Polga", "Fabio Rochemback", "Rochemback"]),
        lower(["Marcos Rojo", "Rojo", "Alan Ruiz", "Ruiz"]),
      ],
    ],
  },
  {
    id: "europe-14",
    rows: ["Real Madrid", "Manchester City", "Arsenal"],
    cols: ["Spain", "Brazil", "France"],
    cells: [
      [
        lower(["Raul", "Raúl", "Iker Casillas", "Casillas", "Sergio Ramos", "Ramos", "Dani Carvajal", "Carvajal", "Isco", "Marco Asensio", "Asensio"]),
        lower(["Ronaldo", "Roberto Carlos", "Carlos", "Vinicius Junior", "Vinicius", "Rodrygo", "Marcelo", "Casemiro", "Eder Militao", "Militao", "Militão"]),
        lower(["Karim Benzema", "Benzema", "Zinedine Zidane", "Zidane", "Raphael Varane", "Varane", "Eduardo Camavinga", "Camavinga", "Aurelien Tchouameni", "Tchouameni", "Ferland Mendy", "Mendy"]),
      ],
      [
        lower(["Rodri", "David Silva", "Silva", "Jesus Navas", "Navas", "Ferran Torres", "Torres", "Aymeric Laporte", "Laporte"]),
        lower(["Ederson", "Fernandinho", "Gabriel Jesus", "Jesus", "Robinho", "Danilo", "Savinho"]),
        lower(["Samir Nasri", "Nasri", "Gael Clichy", "Clichy", "Benjamin Mendy", "Mendy", "Eliaquim Mangala", "Mangala"]),
      ],
      [
        lower(["Cesc Fabregas", "Fabregas", "Fàbregas", "Santi Cazorla", "Cazorla", "Mikel Arteta", "Arteta", "Hector Bellerin", "Bellerin", "Bellérin", "Nacho Monreal", "Monreal", "David Raya", "Raya"]),
        lower(["Gabriel Jesus", "Jesus", "Gabriel Martinelli", "Martinelli", "Gabriel Magalhaes", "Magalhaes", "Willian", "David Luiz", "Luiz", "Gilberto Silva", "Gilberto"]),
        lower(["Thierry Henry", "Henry", "Patrick Vieira", "Vieira", "Robert Pires", "Pires", "William Saliba", "Saliba", "Olivier Giroud", "Giroud", "Laurent Koscielny", "Koscielny"]),
      ],
    ],
  },
  {
    id: "europe-15",
    rows: ["Liverpool", "Chelsea", "Tottenham Hotspur"],
    cols: ["England", "Brazil", "Netherlands"],
    cells: [
      [
        lower(["Steven Gerrard", "Gerrard", "Trent Alexander-Arnold", "Alexander-Arnold", "Jordan Henderson", "Henderson", "Jamie Carragher", "Carragher", "Curtis Jones", "Jones"]),
        lower(["Roberto Firmino", "Firmino", "Alisson", "Philippe Coutinho", "Coutinho", "Fabinho", "Lucas Leiva", "Leiva"]),
        lower(["Virgil van Dijk", "van Dijk", "Cody Gakpo", "Gakpo", "Ryan Gravenberch", "Gravenberch", "Dirk Kuyt", "Kuyt", "Georginio Wijnaldum", "Wijnaldum"]),
      ],
      [
        lower(["John Terry", "Terry", "Frank Lampard", "Lampard", "Mason Mount", "Mount", "Reece James", "James", "Cole Palmer", "Palmer", "Raheem Sterling", "Sterling"]),
        lower(["Willian", "David Luiz", "Luiz", "Thiago Silva", "Silva", "Oscar", "Ramires"]),
        lower(["Arjen Robben", "Robben", "Marco van Ginkel", "van Ginkel"]),
      ],
      [
        lower(["Harry Kane", "Kane", "Dele Alli", "Alli", "Eric Dier", "Dier", "Kyle Walker", "Walker", "James Maddison", "Maddison"]),
        lower(["Lucas Moura", "Moura", "Emerson Royal", "Emerson", "Richarlison", "Paulinho", "Sandro"]),
        lower(["Rafael van der Vaart", "van der Vaart", "Steven Bergwijn", "Bergwijn", "Micky van de Ven", "van de Ven"]),
      ],
    ],
  },
  {
    id: "europe-16",
    rows: ["Barcelona", "Paris Saint-Germain", "Inter"],
    cols: ["Brazil", "Argentina", "France"],
    cells: [
      [
        lower(["Ronaldinho", "Neymar", "Ronaldo", "Rivaldo", "Dani Alves", "Alves", "Philippe Coutinho", "Coutinho", "Raphinha"]),
        lower(["Lionel Messi", "Messi", "Javier Mascherano", "Mascherano"]),
        lower(["Thierry Henry", "Henry", "Eric Abidal", "Abidal", "Ousmane Dembele", "Dembele", "Dembélé", "Jules Kounde", "Kounde", "Koundé", "Antoine Griezmann", "Griezmann"]),
      ],
      [
        lower(["Neymar", "Thiago Silva", "Silva", "Marquinhos", "Lucas Moura", "Moura", "Dani Alves", "Alves", "David Luiz", "Luiz", "Ronaldinho", "Rai"]),
        lower(["Lionel Messi", "Messi", "Angel Di Maria", "Di Maria", "Di María", "Javier Pastore", "Pastore", "Ezequiel Lavezzi", "Lavezzi", "Mauro Icardi", "Icardi", "Leandro Paredes", "Paredes"]),
        lower(["Kylian Mbappe", "Mbappe", "Mbappé", "Ousmane Dembele", "Dembele", "Dembélé", "Warren Zaire-Emery", "Zaire-Emery", "Presnel Kimpembe", "Kimpembe", "Blaise Matuidi", "Matuidi"]),
      ],
      [
        lower(["Ronaldo", "Adriano", "Maicon", "Julio Cesar", "Cesar", "Lucio", "Lúcio", "Roberto Carlos", "Carlos", "Philippe Coutinho", "Coutinho"]),
        lower(["Javier Zanetti", "Zanetti", "Lautaro Martinez", "Martinez", "Martínez", "Esteban Cambiasso", "Cambiasso", "Diego Milito", "Milito", "Hernan Crespo", "Crespo", "Walter Samuel", "Samuel"]),
        lower(["Patrick Vieira", "Vieira", "Lilian Thuram", "Thuram", "Marcus Thuram", "Benjamin Pavard", "Pavard", "Youri Djorkaeff", "Djorkaeff"]),
      ],
    ],
  },
  {
    id: "europe-17",
    rows: ["Real Madrid", "Juventus", "Bayern Munich"],
    cols: ["Germany", "Spain", "Portugal"],
    cells: [
      [
        lower(["Toni Kroos", "Kroos", "Mesut Ozil", "Ozil", "Özil", "Sami Khedira", "Khedira", "Antonio Rudiger", "Rudiger", "Rüdiger", "Christoph Metzelder", "Metzelder"]),
        lower(["Raul", "Raúl", "Iker Casillas", "Casillas", "Sergio Ramos", "Ramos", "Dani Carvajal", "Carvajal", "Isco", "Marco Asensio", "Asensio"]),
        lower(["Cristiano Ronaldo", "Ronaldo", "Luis Figo", "Figo", "Pepe", "Fabio Coentrao", "Coentrao", "Coentrão"]),
      ],
      [
        lower(["Sami Khedira", "Khedira", "Emre Can", "Can"]),
        lower(["Alvaro Morata", "Morata", "Fernando Llorente", "Llorente"]),
        lower(["Cristiano Ronaldo", "Ronaldo", "Joao Cancelo", "Cancelo"]),
      ],
      [
        lower(["Manuel Neuer", "Neuer", "Thomas Muller", "Muller", "Müller", "Philipp Lahm", "Lahm", "Bastian Schweinsteiger", "Schweinsteiger", "Toni Kroos", "Kroos", "Mario Gotze", "Gotze", "Götze", "Jamal Musiala", "Musiala"]),
        lower(["Javi Martinez", "Martinez", "Martínez", "Thiago Alcantara", "Thiago", "Xabi Alonso", "Alonso"]),
        lower(["Joao Cancelo", "Cancelo", "Raphael Guerreiro", "Guerreiro"]),
      ],
    ],
  },
  {
    id: "europe-18",
    rows: ["Manchester United", "Arsenal", "Chelsea"],
    cols: ["England", "France", "Portugal"],
    cells: [
      [
        lower(["Wayne Rooney", "Rooney", "Marcus Rashford", "Rashford", "Harry Maguire", "Maguire", "Luke Shaw", "Shaw", "David Beckham", "Beckham", "Paul Scholes", "Scholes"]),
        lower(["Paul Pogba", "Pogba", "Anthony Martial", "Martial", "Patrice Evra", "Evra", "Eric Cantona", "Cantona"]),
        lower(["Cristiano Ronaldo", "Ronaldo", "Bruno Fernandes", "Fernandes", "Nani", "Diogo Dalot", "Dalot"]),
      ],
      [
        lower(["Bukayo Saka", "Saka", "Declan Rice", "Rice", "Aaron Ramsdale", "Ramsdale", "Ben White", "White", "Emile Smith Rowe", "Smith Rowe", "Jack Wilshere", "Wilshere"]),
        lower(["Thierry Henry", "Henry", "Patrick Vieira", "Vieira", "Robert Pires", "Pires", "William Saliba", "Saliba", "Olivier Giroud", "Giroud", "Laurent Koscielny", "Koscielny"]),
        lower(["Cedric Soares", "Cedric", "Soares", "Fabio Vieira", "Vieira"]),
      ],
      [
        lower(["John Terry", "Terry", "Frank Lampard", "Lampard", "Mason Mount", "Mount", "Reece James", "James", "Cole Palmer", "Palmer", "Raheem Sterling", "Sterling"]),
        lower(["N'Golo Kante", "Kante", "Kanté", "Olivier Giroud", "Giroud", "Claude Makelele", "Makelele", "William Gallas", "Gallas", "Malo Gusto", "Gusto", "Wesley Fofana", "Fofana"]),
        lower(["Deco", "Joao Felix", "Felix", "Félix", "Pedro Neto", "Neto", "Renato Veiga", "Veiga"]),
      ],
    ],
  },
  {
    id: "europe-19",
    rows: ["AC Milan", "Inter", "Juventus"],
    cols: ["Brazil", "Netherlands", "Argentina"],
    cells: [
      [
        lower(["Kaka", "Kaká", "Ronaldo", "Ronaldinho", "Cafu", "Thiago Silva", "Silva", "Alexandre Pato", "Pato", "Robinho", "Serginho"]),
        lower(["Clarence Seedorf", "Seedorf", "Marco van Basten", "van Basten", "Ruud Gullit", "Gullit", "Frank Rijkaard", "Rijkaard", "Nigel de Jong", "de Jong"]),
        lower(["Hernan Crespo", "Crespo", "Lucas Biglia", "Biglia", "Mateo Musacchio", "Musacchio"]),
      ],
      [
        lower(["Ronaldo", "Adriano", "Maicon", "Julio Cesar", "Cesar", "Lucio", "Lúcio", "Roberto Carlos", "Carlos", "Philippe Coutinho", "Coutinho"]),
        lower(["Wesley Sneijder", "Sneijder", "Stefan de Vrij", "de Vrij", "Denzel Dumfries", "Dumfries", "Clarence Seedorf", "Seedorf", "Edgar Davids", "Davids"]),
        lower(["Javier Zanetti", "Zanetti", "Lautaro Martinez", "Martinez", "Martínez", "Esteban Cambiasso", "Cambiasso", "Diego Milito", "Milito", "Hernan Crespo", "Crespo", "Walter Samuel", "Samuel"]),
      ],
      [
        lower(["Arthur Melo", "Arthur", "Danilo", "Alex Sandro", "Sandro", "Douglas Costa", "Costa", "Gleison Bremer", "Bremer"]),
        lower(["Edgar Davids", "Davids", "Matthijs de Ligt", "de Ligt"]),
        lower(["Carlos Tevez", "Tevez", "Paulo Dybala", "Dybala", "Gonzalo Higuain", "Higuain", "Higuaín", "Angel Di Maria", "Di Maria", "Di María"]),
      ],
    ],
  },
  {
    id: "europe-20",
    rows: ["Liverpool", "Real Madrid", "Paris Saint-Germain"],
    cols: ["Brazil", "Portugal", "Spain"],
    cells: [
      [
        lower(["Roberto Firmino", "Firmino", "Alisson", "Philippe Coutinho", "Coutinho", "Fabinho", "Lucas Leiva", "Leiva"]),
        lower(["Diogo Jota", "Jota", "Fabio Carvalho", "Carvalho"]),
        lower(["Xabi Alonso", "Alonso", "Fernando Torres", "Torres", "Pepe Reina", "Reina", "Luis Garcia", "Garcia", "García", "Suso", "Thiago Alcantara", "Thiago"]),
      ],
      [
        lower(["Ronaldo", "Roberto Carlos", "Carlos", "Vinicius Junior", "Vinicius", "Rodrygo", "Marcelo", "Casemiro", "Eder Militao", "Militao", "Militão"]),
        lower(["Cristiano Ronaldo", "Ronaldo", "Luis Figo", "Figo", "Pepe", "Fabio Coentrao", "Coentrao", "Coentrão"]),
        lower(["Raul", "Raúl", "Iker Casillas", "Casillas", "Sergio Ramos", "Ramos", "Dani Carvajal", "Carvajal", "Isco", "Marco Asensio", "Asensio"]),
      ],
      [
        lower(["Neymar", "Thiago Silva", "Silva", "Marquinhos", "Lucas Moura", "Moura", "Dani Alves", "Alves", "David Luiz", "Luiz", "Ronaldinho", "Rai"]),
        lower(["Vitinha", "Nuno Mendes", "Mendes", "Goncalo Ramos", "Ramos", "Joao Neves", "Neves", "Danilo Pereira", "Pereira"]),
        lower(["Sergio Ramos", "Ramos", "Fabian Ruiz", "Ruiz", "Marco Asensio", "Asensio", "Carlos Soler", "Soler", "Juan Bernat", "Bernat"]),
      ],
    ],
  },
  {
    id: "europe-21",
    rows: ["Arsenal", "Manchester City", "Chelsea"],
    cols: ["England", "Brazil", "Portugal"],
    cells: [
      [
        lower(["Bukayo Saka", "Saka", "Declan Rice", "Rice", "Aaron Ramsdale", "Ramsdale", "Ben White", "White", "Emile Smith Rowe", "Smith Rowe", "Jack Wilshere", "Wilshere"]),
        lower(["Gabriel Jesus", "Jesus", "Gabriel Martinelli", "Martinelli", "Gabriel Magalhaes", "Magalhaes", "Willian", "David Luiz", "Luiz", "Gilberto Silva", "Gilberto"]),
        lower(["Cedric Soares", "Cedric", "Soares", "Fabio Vieira", "Vieira"]),
      ],
      [
        lower(["Phil Foden", "Foden", "Jack Grealish", "Grealish", "John Stones", "Stones", "Kyle Walker", "Walker", "Raheem Sterling", "Sterling", "Kalvin Phillips", "Phillips"]),
        lower(["Ederson", "Fernandinho", "Gabriel Jesus", "Jesus", "Robinho", "Danilo", "Savinho"]),
        lower(["Bernardo Silva", "Silva", "Ruben Dias", "Dias", "Joao Cancelo", "Cancelo", "Matheus Nunes", "Nunes"]),
      ],
      [
        lower(["John Terry", "Terry", "Frank Lampard", "Lampard", "Mason Mount", "Mount", "Reece James", "James", "Cole Palmer", "Palmer", "Raheem Sterling", "Sterling"]),
        lower(["Willian", "David Luiz", "Luiz", "Thiago Silva", "Silva", "Oscar", "Ramires"]),
        lower(["Deco", "Joao Felix", "Felix", "Félix", "Pedro Neto", "Neto", "Renato Veiga", "Veiga"]),
      ],
    ],
  },
  {
    id: "europe-22",
    rows: ["Juventus", "Paris Saint-Germain", "Inter"],
    cols: ["Italy", "France", "Brazil"],
    cells: [
      [
        lower(["Gianluigi Buffon", "Buffon", "Andrea Pirlo", "Pirlo", "Giorgio Chiellini", "Chiellini", "Leonardo Bonucci", "Bonucci", "Federico Chiesa", "Chiesa", "Alessandro Del Piero", "Del Piero"]),
        lower(["Zinedine Zidane", "Zidane", "Didier Deschamps", "Deschamps", "Paul Pogba", "Pogba", "Patrice Evra", "Evra", "Lilian Thuram", "Thuram", "David Trezeguet", "Trezeguet"]),
        lower(["Arthur Melo", "Arthur", "Danilo", "Alex Sandro", "Sandro", "Douglas Costa", "Costa", "Gleison Bremer", "Bremer"]),
      ],
      [
        lower(["Marco Verratti", "Verratti", "Gianluigi Donnarumma", "Donnarumma", "Gianluigi Buffon", "Buffon", "Thiago Motta", "Motta", "Salvatore Sirigu", "Sirigu"]),
        lower(["Kylian Mbappe", "Mbappe", "Mbappé", "Ousmane Dembele", "Dembele", "Dembélé", "Warren Zaire-Emery", "Zaire-Emery", "Presnel Kimpembe", "Kimpembe", "Blaise Matuidi", "Matuidi"]),
        lower(["Neymar", "Thiago Silva", "Silva", "Marquinhos", "Lucas Moura", "Moura", "Dani Alves", "Alves", "David Luiz", "Luiz", "Ronaldinho", "Rai"]),
      ],
      [
        lower(["Francesco Toldo", "Toldo", "Marco Materazzi", "Materazzi", "Alessandro Bastoni", "Bastoni", "Nicolo Barella", "Barella", "Federico Dimarco", "Dimarco", "Davide Frattesi", "Frattesi"]),
        lower(["Patrick Vieira", "Vieira", "Lilian Thuram", "Thuram", "Marcus Thuram", "Benjamin Pavard", "Pavard", "Youri Djorkaeff", "Djorkaeff"]),
        lower(["Ronaldo", "Adriano", "Maicon", "Julio Cesar", "Cesar", "Lucio", "Lúcio", "Roberto Carlos", "Carlos", "Philippe Coutinho", "Coutinho"]),
      ],
    ],
  },
  {
    id: "europe-23",
    rows: ["Barcelona", "Real Madrid", "Manchester United"],
    cols: ["Spain", "England", "Brazil"],
    cells: [
      [
        lower(["Xavi", "Andres Iniesta", "Iniesta", "Carles Puyol", "Puyol", "Sergio Busquets", "Busquets", "Pedri", "Gavi", "Lamine Yamal", "Yamal"]),
        lower(["Gary Lineker", "Lineker", "Marcus Rashford", "Rashford"]),
        lower(["Ronaldinho", "Neymar", "Ronaldo", "Rivaldo", "Dani Alves", "Alves", "Philippe Coutinho", "Coutinho", "Raphinha"]),
      ],
      [
        lower(["Raul", "Raúl", "Iker Casillas", "Casillas", "Sergio Ramos", "Ramos", "Dani Carvajal", "Carvajal", "Isco", "Marco Asensio", "Asensio"]),
        lower(["Jude Bellingham", "Bellingham", "David Beckham", "Beckham", "Michael Owen", "Owen", "Steve McManaman", "McManaman"]),
        lower(["Ronaldo", "Roberto Carlos", "Carlos", "Vinicius Junior", "Vinicius", "Rodrygo", "Marcelo", "Casemiro", "Eder Militao", "Militao", "Militão"]),
      ],
      [
        lower(["David de Gea", "de Gea", "Juan Mata", "Mata", "Ander Herrera", "Herrera"]),
        lower(["Wayne Rooney", "Rooney", "Marcus Rashford", "Rashford", "Harry Maguire", "Maguire", "Luke Shaw", "Shaw", "David Beckham", "Beckham", "Paul Scholes", "Scholes"]),
        lower(["Casemiro", "Antony", "Fred", "Anderson", "Rafael", "Fabio"]),
      ],
    ],
  },
  {
    id: "europe-24",
    rows: ["Sevilla", "Real Madrid", "Barcelona"],
    cols: ["Spain", "Brazil", "France"],
    cells: [
      [
        lower(["Jesus Navas", "Navas", "Sergio Ramos", "Ramos", "Suso", "Pablo Sarabia", "Sarabia"]),
        lower(["Dani Alves", "Alves", "Julio Baptista", "Baptista", "Luis Fabiano", "Fabiano", "Adriano Correia", "Adriano"]),
        lower(["Jules Kounde", "Kounde", "Koundé", "Wissam Ben Yedder", "Ben Yedder", "Steven Nzonzi", "Nzonzi"]),
      ],
      [
        lower(["Raul", "Raúl", "Iker Casillas", "Casillas", "Sergio Ramos", "Ramos", "Dani Carvajal", "Carvajal", "Isco", "Marco Asensio", "Asensio"]),
        lower(["Ronaldo", "Roberto Carlos", "Carlos", "Vinicius Junior", "Vinicius", "Rodrygo", "Marcelo", "Casemiro", "Eder Militao", "Militao", "Militão"]),
        lower(["Karim Benzema", "Benzema", "Zinedine Zidane", "Zidane", "Raphael Varane", "Varane", "Eduardo Camavinga", "Camavinga", "Aurelien Tchouameni", "Tchouameni", "Ferland Mendy", "Mendy"]),
      ],
      [
        lower(["Xavi", "Andres Iniesta", "Iniesta", "Carles Puyol", "Puyol", "Sergio Busquets", "Busquets", "Pedri", "Gavi", "Lamine Yamal", "Yamal"]),
        lower(["Ronaldinho", "Neymar", "Ronaldo", "Rivaldo", "Dani Alves", "Alves", "Philippe Coutinho", "Coutinho", "Raphinha"]),
        lower(["Thierry Henry", "Henry", "Eric Abidal", "Abidal", "Ousmane Dembele", "Dembele", "Dembélé", "Jules Kounde", "Kounde", "Koundé", "Antoine Griezmann", "Griezmann"]),
      ],
    ],
  },
  {
    id: "europe-25",
    rows: ["Manchester United", "Liverpool", "Arsenal"],
    cols: ["Portugal", "Netherlands", "Spain"],
    cells: [
      [
        lower(["Cristiano Ronaldo", "Ronaldo", "Bruno Fernandes", "Fernandes", "Nani", "Diogo Dalot", "Dalot"]),
        lower(["Ruud van Nistelrooy", "van Nistelrooy", "Nistelrooy", "Robin van Persie", "van Persie", "Edwin van der Sar", "van der Sar", "Daley Blind", "Blind", "Donny van de Beek", "van de Beek", "Memphis Depay", "Depay"]),
        lower(["David de Gea", "de Gea", "Juan Mata", "Mata", "Ander Herrera", "Herrera"]),
      ],
      [
        lower(["Diogo Jota", "Jota", "Fabio Carvalho", "Carvalho"]),
        lower(["Virgil van Dijk", "van Dijk", "Cody Gakpo", "Gakpo", "Ryan Gravenberch", "Gravenberch", "Dirk Kuyt", "Kuyt", "Georginio Wijnaldum", "Wijnaldum"]),
        lower(["Xabi Alonso", "Alonso", "Fernando Torres", "Torres", "Pepe Reina", "Reina", "Luis Garcia", "Garcia", "García", "Suso", "Thiago Alcantara", "Thiago"]),
      ],
      [
        lower(["Cedric Soares", "Cedric", "Soares", "Fabio Vieira", "Vieira"]),
        lower(["Dennis Bergkamp", "Bergkamp", "Robin van Persie", "van Persie", "Marc Overmars", "Overmars", "Jurrien Timber", "Timber"]),
        lower(["Cesc Fabregas", "Fabregas", "Fàbregas", "Santi Cazorla", "Cazorla", "Mikel Arteta", "Arteta", "Hector Bellerin", "Bellerin", "Bellérin", "Nacho Monreal", "Monreal", "David Raya", "Raya"]),
      ],
    ],
  },
  {
    id: "europe-26",
    rows: ["Paris Saint-Germain", "Bayern Munich", "Manchester City"],
    cols: ["France", "Germany", "Portugal"],
    cells: [
      [
        lower(["Kylian Mbappe", "Mbappe", "Mbappé", "Ousmane Dembele", "Dembele", "Dembélé", "Warren Zaire-Emery", "Zaire-Emery", "Presnel Kimpembe", "Kimpembe", "Blaise Matuidi", "Matuidi"]),
        lower(["Julian Draxler", "Draxler", "Kevin Trapp", "Trapp", "Thilo Kehrer", "Kehrer"]),
        lower(["Vitinha", "Nuno Mendes", "Mendes", "Goncalo Ramos", "Ramos", "Joao Neves", "Neves", "Danilo Pereira", "Pereira"]),
      ],
      [
        lower(["Franck Ribery", "Ribery", "Ribéry", "Kingsley Coman", "Coman", "Benjamin Pavard", "Pavard", "Dayot Upamecano", "Upamecano", "Lucas Hernandez", "Hernandez", "Hernández"]),
        lower(["Manuel Neuer", "Neuer", "Thomas Muller", "Muller", "Müller", "Philipp Lahm", "Lahm", "Bastian Schweinsteiger", "Schweinsteiger", "Toni Kroos", "Kroos", "Mario Gotze", "Gotze", "Götze", "Jamal Musiala", "Musiala"]),
        lower(["Joao Cancelo", "Cancelo", "Raphael Guerreiro", "Guerreiro"]),
      ],
      [
        lower(["Samir Nasri", "Nasri", "Gael Clichy", "Clichy", "Benjamin Mendy", "Mendy", "Eliaquim Mangala", "Mangala"]),
        lower(["Ilkay Gundogan", "Gundogan", "Gündogan", "Leroy Sane", "Sane", "Sané"]),
        lower(["Bernardo Silva", "Silva", "Ruben Dias", "Dias", "Joao Cancelo", "Cancelo", "Matheus Nunes", "Nunes"]),
      ],
    ],
  },
  {
    id: "europe-27",
    rows: ["Chelsea", "Tottenham Hotspur", "Aston Villa"],
    cols: ["England", "France", "Brazil"],
    cells: [
      [
        lower(["John Terry", "Terry", "Frank Lampard", "Lampard", "Mason Mount", "Mount", "Reece James", "James", "Cole Palmer", "Palmer", "Raheem Sterling", "Sterling"]),
        lower(["N'Golo Kante", "Kante", "Kanté", "Olivier Giroud", "Giroud", "Claude Makelele", "Makelele", "William Gallas", "Gallas", "Malo Gusto", "Gusto", "Wesley Fofana", "Fofana"]),
        lower(["Willian", "David Luiz", "Luiz", "Thiago Silva", "Silva", "Oscar", "Ramires"]),
      ],
      [
        lower(["Harry Kane", "Kane", "Dele Alli", "Alli", "Eric Dier", "Dier", "Kyle Walker", "Walker", "James Maddison", "Maddison"]),
        lower(["Hugo Lloris", "Lloris", "Moussa Sissoko", "Sissoko", "Tanguy Ndombele", "Ndombele"]),
        lower(["Lucas Moura", "Moura", "Emerson Royal", "Emerson", "Richarlison", "Paulinho", "Sandro"]),
      ],
      [
        lower(["Ollie Watkins", "Watkins", "Jack Grealish", "Grealish", "Tyrone Mings", "Mings", "Ezri Konsa", "Konsa"]),
        lower(["Boubacar Kamara", "Kamara", "Lucas Digne", "Digne"]),
        lower(["Douglas Luiz", "Luiz", "Philippe Coutinho", "Coutinho", "Diego Carlos", "Carlos"]),
      ],
    ],
  },
  {
    id: "europe-28",
    rows: ["Chelsea", "Real Madrid", "Barcelona"],
    cols: ["Spain", "Brazil", "England"],
    cells: [
      [
        lower(["Fernando Torres", "Torres", "Cesc Fabregas", "Fabregas", "Fàbregas", "Cesar Azpilicueta", "Azpilicueta", "Marcos Alonso", "Alonso", "Kepa Arrizabalaga", "Kepa", "Diego Costa", "Costa"]),
        lower(["Willian", "David Luiz", "Luiz", "Thiago Silva", "Silva", "Oscar", "Ramires"]),
        lower(["John Terry", "Terry", "Frank Lampard", "Lampard", "Mason Mount", "Mount", "Reece James", "James", "Cole Palmer", "Palmer", "Raheem Sterling", "Sterling"]),
      ],
      [
        lower(["Raul", "Raúl", "Iker Casillas", "Casillas", "Sergio Ramos", "Ramos", "Dani Carvajal", "Carvajal", "Isco", "Marco Asensio", "Asensio"]),
        lower(["Ronaldo", "Roberto Carlos", "Carlos", "Vinicius Junior", "Vinicius", "Rodrygo", "Marcelo", "Casemiro", "Eder Militao", "Militao", "Militão"]),
        lower(["Jude Bellingham", "Bellingham", "David Beckham", "Beckham", "Michael Owen", "Owen", "Steve McManaman", "McManaman"]),
      ],
      [
        lower(["Xavi", "Andres Iniesta", "Iniesta", "Carles Puyol", "Puyol", "Sergio Busquets", "Busquets", "Pedri", "Gavi", "Lamine Yamal", "Yamal"]),
        lower(["Ronaldinho", "Neymar", "Ronaldo", "Rivaldo", "Dani Alves", "Alves", "Philippe Coutinho", "Coutinho", "Raphinha"]),
        lower(["Gary Lineker", "Lineker", "Marcus Rashford", "Rashford"]),
      ],
    ],
  },
  {
    id: "europe-29",
    rows: ["Arsenal", "Liverpool", "Manchester City"],
    cols: ["France", "Brazil", "Spain"],
    cells: [
      [
        lower(["Thierry Henry", "Henry", "Patrick Vieira", "Vieira", "Robert Pires", "Pires", "William Saliba", "Saliba", "Olivier Giroud", "Giroud", "Laurent Koscielny", "Koscielny"]),
        lower(["Gabriel Jesus", "Jesus", "Gabriel Martinelli", "Martinelli", "Gabriel Magalhaes", "Magalhaes", "Willian", "David Luiz", "Luiz", "Gilberto Silva", "Gilberto"]),
        lower(["Cesc Fabregas", "Fabregas", "Fàbregas", "Santi Cazorla", "Cazorla", "Mikel Arteta", "Arteta", "Hector Bellerin", "Bellerin", "Bellérin", "Nacho Monreal", "Monreal", "David Raya", "Raya"]),
      ],
      [
        lower(["Ibrahima Konate", "Konate", "Konaté", "Mamadou Sakho", "Sakho"]),
        lower(["Roberto Firmino", "Firmino", "Alisson", "Philippe Coutinho", "Coutinho", "Fabinho", "Lucas Leiva", "Leiva"]),
        lower(["Xabi Alonso", "Alonso", "Fernando Torres", "Torres", "Pepe Reina", "Reina", "Luis Garcia", "Garcia", "García", "Suso", "Thiago Alcantara", "Thiago"]),
      ],
      [
        lower(["Samir Nasri", "Nasri", "Gael Clichy", "Clichy", "Benjamin Mendy", "Mendy", "Eliaquim Mangala", "Mangala"]),
        lower(["Ederson", "Fernandinho", "Gabriel Jesus", "Jesus", "Robinho", "Danilo", "Savinho"]),
        lower(["Rodri", "David Silva", "Silva", "Jesus Navas", "Navas", "Ferran Torres", "Torres", "Aymeric Laporte", "Laporte"]),
      ],
    ],
  },
  {
    id: "europe-30",
    rows: ["Manchester United", "Chelsea", "Real Madrid"],
    cols: ["France", "Portugal", "Brazil"],
    cells: [
      [
        lower(["Paul Pogba", "Pogba", "Anthony Martial", "Martial", "Patrice Evra", "Evra", "Eric Cantona", "Cantona"]),
        lower(["Cristiano Ronaldo", "Ronaldo", "Bruno Fernandes", "Fernandes", "Nani", "Diogo Dalot", "Dalot"]),
        lower(["Casemiro", "Antony", "Fred", "Anderson", "Rafael", "Fabio"]),
      ],
      [
        lower(["N'Golo Kante", "Kante", "Kanté", "Olivier Giroud", "Giroud", "Claude Makelele", "Makelele", "William Gallas", "Gallas", "Malo Gusto", "Gusto", "Wesley Fofana", "Fofana"]),
        lower(["Deco", "Joao Felix", "Felix", "Félix", "Pedro Neto", "Neto", "Renato Veiga", "Veiga"]),
        lower(["Willian", "David Luiz", "Luiz", "Thiago Silva", "Silva", "Oscar", "Ramires"]),
      ],
      [
        lower(["Karim Benzema", "Benzema", "Zinedine Zidane", "Zidane", "Raphael Varane", "Varane", "Eduardo Camavinga", "Camavinga", "Aurelien Tchouameni", "Tchouameni", "Ferland Mendy", "Mendy"]),
        lower(["Cristiano Ronaldo", "Ronaldo", "Luis Figo", "Figo", "Pepe", "Fabio Coentrao", "Coentrao", "Coentrão"]),
        lower(["Ronaldo", "Roberto Carlos", "Carlos", "Vinicius Junior", "Vinicius", "Rodrygo", "Marcelo", "Casemiro", "Eder Militao", "Militao", "Militão"]),
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
