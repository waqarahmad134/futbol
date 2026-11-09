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
      { name: "Zlatan Ibrahimović", via: "Barcelona (2009-11)" },
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
  {
    id: "ronaldo-neymar",
    start: "Cristiano Ronaldo",
    end: "Neymar",
    exampleChain: [
      { name: "Ángel Di María", via: "Real Madrid (2010-14)" },
    ],
    startClubs: ["Sporting CP", "Manchester United", "Real Madrid", "Juventus", "Al Nassr", "Portugal"],
    endClubs: ["Santos", "Barcelona", "Paris Saint-Germain", "Al Hilal", "Brazil"],
    validIntermediates: [
      { name: "Ángel Di María", clubs: ["Rosario Central", "Benfica", "Real Madrid", "Manchester United", "Paris Saint-Germain", "Juventus", "Argentina"] },
      { name: "Sergio Ramos", clubs: ["Sevilla", "Real Madrid", "Paris Saint-Germain", "Monterrey", "Spain"] },
      { name: "Keylor Navas", clubs: ["Saprissa", "Albacete", "Levante", "Real Madrid", "Paris Saint-Germain", "Nottingham Forest", "Newell's Old Boys", "Costa Rica"] },
      { name: "Danilo", clubs: ["América Mineiro", "Santos", "Porto", "Real Madrid", "Manchester City", "Juventus", "Flamengo", "Brazil"] },
    ],
  },
  {
    id: "messi-ronaldo",
    start: "Lionel Messi",
    end: "Cristiano Ronaldo",
    exampleChain: [
      { name: "Ángel Di María", via: "Paris Saint-Germain (2015-22)" },
    ],
    startClubs: ["Barcelona", "Paris Saint-Germain", "Inter Miami", "Argentina"],
    endClubs: ["Sporting CP", "Manchester United", "Real Madrid", "Juventus", "Al Nassr", "Portugal"],
    validIntermediates: [
      { name: "Ángel Di María", clubs: ["Rosario Central", "Benfica", "Real Madrid", "Manchester United", "Paris Saint-Germain", "Juventus", "Argentina"] },
      { name: "Sergio Ramos", clubs: ["Sevilla", "Real Madrid", "Paris Saint-Germain", "Monterrey", "Spain"] },
      { name: "Zlatan Ibrahimović", clubs: ["Ajax", "Juventus", "Inter Milan", "Barcelona", "AC Milan", "Paris Saint-Germain", "Manchester United", "LA Galaxy", "Sweden"] },
      { name: "Keylor Navas", clubs: ["Saprissa", "Albacete", "Levante", "Real Madrid", "Paris Saint-Germain", "Nottingham Forest", "Newell's Old Boys", "Costa Rica"] },
    ],
  },
  {
    id: "kane-lewandowski",
    start: "Harry Kane",
    end: "Robert Lewandowski",
    exampleChain: [
      { name: "Thomas Müller", via: "Bayern Munich (2008-25)" },
    ],
    startClubs: ["Tottenham Hotspur", "Bayern Munich", "England"],
    endClubs: ["Borussia Dortmund", "Bayern Munich", "Barcelona", "Poland"],
    validIntermediates: [
      { name: "Thomas Müller", clubs: ["Bayern Munich", "Vancouver Whitecaps", "Germany"] },
      { name: "Joshua Kimmich", clubs: ["RB Leipzig", "Bayern Munich", "Germany"] },
      { name: "Leon Goretzka", clubs: ["VfL Bochum", "Schalke 04", "Bayern Munich", "Germany"] },
      { name: "Kingsley Coman", clubs: ["Paris Saint-Germain", "Juventus", "Bayern Munich", "France"] },
      { name: "Leroy Sané", clubs: ["Schalke 04", "Manchester City", "Bayern Munich", "Germany"] },
      { name: "Alphonso Davies", clubs: ["Vancouver Whitecaps", "Bayern Munich", "Canada"] },
    ],
  },
  {
    id: "salah-mane",
    start: "Mohamed Salah",
    end: "Sadio Mané",
    exampleChain: [
      { name: "Roberto Firmino", via: "Liverpool (2015-23)" },
    ],
    startClubs: ["Basel", "Chelsea", "Fiorentina", "Roma", "Liverpool", "Egypt"],
    endClubs: ["Metz", "Red Bull Salzburg", "Southampton", "Liverpool", "Bayern Munich", "Al Nassr", "Senegal"],
    validIntermediates: [
      { name: "Roberto Firmino", clubs: ["Figueirense", "Hoffenheim", "Liverpool", "Al Ahli", "Brazil"] },
      { name: "Alisson Becker", clubs: ["Internacional", "Roma", "Liverpool", "Brazil"] },
      { name: "Virgil van Dijk", clubs: ["Groningen", "Celtic", "Southampton", "Liverpool", "Netherlands"] },
      { name: "Jordan Henderson", clubs: ["Sunderland", "Coventry City", "Liverpool", "Al Ettifaq", "Ajax", "Brentford", "England"] },
      { name: "Fabinho", clubs: ["Fluminense", "Rio Ave", "Monaco", "Liverpool", "Al Ittihad", "Brazil"] },
      { name: "Trent Alexander-Arnold", clubs: ["Liverpool", "Real Madrid", "England"] },
    ],
  },
  {
    id: "de-bruyne-haaland",
    start: "Kevin De Bruyne",
    end: "Erling Haaland",
    exampleChain: [
      { name: "Phil Foden", via: "Manchester City (2017-)" },
    ],
    startClubs: ["Genk", "Chelsea", "Wolfsburg", "Manchester City", "Napoli", "Belgium"],
    endClubs: ["Bryne", "Molde", "Red Bull Salzburg", "Borussia Dortmund", "Manchester City", "Norway"],
    validIntermediates: [
      { name: "Phil Foden", clubs: ["Manchester City", "England"] },
      { name: "Bernardo Silva", clubs: ["Benfica", "Monaco", "Manchester City", "Portugal"] },
      { name: "Rodri", clubs: ["Villarreal", "Atlético Madrid", "Manchester City", "Spain"] },
      { name: "Jack Grealish", clubs: ["Aston Villa", "Manchester City", "Everton", "England"] },
      { name: "İlkay Gündoğan", clubs: ["Nürnberg", "Borussia Dortmund", "Manchester City", "Barcelona", "Galatasaray", "Germany"] },
    ],
  },
  {
    id: "mbappe-haaland",
    start: "Kylian Mbappé",
    end: "Erling Haaland",
    exampleChain: [
      { name: "Achraf Hakimi", via: "Paris Saint-Germain (2021-)" },
    ],
    startClubs: ["Monaco", "Paris Saint-Germain", "Real Madrid", "France"],
    endClubs: ["Bryne", "Molde", "Red Bull Salzburg", "Borussia Dortmund", "Manchester City", "Norway"],
    validIntermediates: [
      { name: "Achraf Hakimi", clubs: ["Real Madrid", "Borussia Dortmund", "Inter Milan", "Paris Saint-Germain", "Morocco"] },
      { name: "Ousmane Dembélé", clubs: ["Rennes", "Borussia Dortmund", "Barcelona", "Paris Saint-Germain", "France"] },
      { name: "Jude Bellingham", clubs: ["Birmingham City", "Borussia Dortmund", "Real Madrid", "England"] },
    ],
  },
  {
    id: "bellingham-kane",
    start: "Jude Bellingham",
    end: "Harry Kane",
    exampleChain: [
      { name: "Toni Kroos", via: "Real Madrid (2014-24)" },
    ],
    startClubs: ["Birmingham City", "Borussia Dortmund", "Real Madrid", "England"],
    endClubs: ["Tottenham Hotspur", "Bayern Munich", "England"],
    validIntermediates: [
      { name: "Toni Kroos", clubs: ["Bayern Munich", "Bayer Leverkusen", "Real Madrid", "Germany"] },
      { name: "David Alaba", clubs: ["Bayern Munich", "Real Madrid", "Austria"] },
      { name: "Xabi Alonso", clubs: ["Real Sociedad", "Eibar", "Liverpool", "Real Madrid", "Bayern Munich", "Spain"] },
      { name: "Arjen Robben", clubs: ["Groningen", "PSV", "Chelsea", "Real Madrid", "Bayern Munich", "Netherlands"] },
      { name: "James Rodríguez", clubs: ["Banfield", "Porto", "Monaco", "Real Madrid", "Bayern Munich", "Everton", "Colombia"] },
    ],
  },
  {
    id: "modric-kroos",
    start: "Luka Modrić",
    end: "Toni Kroos",
    exampleChain: [
      { name: "Casemiro", via: "Real Madrid (2013-22)" },
    ],
    startClubs: ["Dinamo Zagreb", "Tottenham Hotspur", "Real Madrid", "AC Milan", "Croatia"],
    endClubs: ["Bayern Munich", "Bayer Leverkusen", "Real Madrid", "Germany"],
    validIntermediates: [
      { name: "Casemiro", clubs: ["São Paulo", "Real Madrid", "Manchester United", "Brazil"] },
      { name: "Sergio Ramos", clubs: ["Sevilla", "Real Madrid", "Paris Saint-Germain", "Monterrey", "Spain"] },
      { name: "Marcelo", clubs: ["Fluminense", "Real Madrid", "Olympiacos", "Brazil"] },
      { name: "Gareth Bale", clubs: ["Southampton", "Tottenham Hotspur", "Real Madrid", "Los Angeles FC", "Wales"] },
      { name: "Isco", clubs: ["Valencia", "Málaga", "Real Madrid", "Sevilla", "Real Betis", "Spain"] },
    ],
  },
  {
    id: "iniesta-xavi",
    start: "Andrés Iniesta",
    end: "Xavi Hernández",
    exampleChain: [
      { name: "Sergio Busquets", via: "Barcelona (2008-23)" },
    ],
    startClubs: ["Barcelona", "Vissel Kobe", "Emirates Club", "Spain"],
    endClubs: ["Barcelona", "Al Sadd", "Spain"],
    validIntermediates: [
      { name: "Sergio Busquets", clubs: ["Barcelona", "Inter Miami", "Spain"] },
      { name: "Gerard Piqué", clubs: ["Manchester United", "Barcelona", "Spain"] },
      { name: "Carles Puyol", clubs: ["Barcelona", "Spain"] },
      { name: "Dani Alves", clubs: ["Bahia", "Sevilla", "Barcelona", "Juventus", "Paris Saint-Germain", "São Paulo", "Pumas UNAM", "Brazil"] },
      { name: "Pedro", clubs: ["Barcelona", "Chelsea", "Roma", "Lazio", "Spain"] },
    ],
  },
  {
    id: "pirlo-buffon",
    start: "Andrea Pirlo",
    end: "Gianluigi Buffon",
    exampleChain: [
      { name: "Giorgio Chiellini", via: "Juventus (2005-22)" },
    ],
    startClubs: ["Brescia", "Inter Milan", "AC Milan", "Juventus", "New York City FC", "Italy"],
    endClubs: ["Parma", "Juventus", "Paris Saint-Germain", "Italy"],
    validIntermediates: [
      { name: "Giorgio Chiellini", clubs: ["Livorno", "Fiorentina", "Juventus", "Los Angeles FC", "Italy"] },
      { name: "Leonardo Bonucci", clubs: ["Inter Milan", "Genoa", "Bari", "Juventus", "AC Milan", "Union Berlin", "Fenerbahçe", "Italy"] },
      { name: "Claudio Marchisio", clubs: ["Empoli", "Juventus", "Zenit Saint Petersburg", "Italy"] },
      { name: "Paulo Dybala", clubs: ["Instituto", "Palermo", "Juventus", "Roma", "Argentina"] },
    ],
  },
  {
    id: "gerrard-lampard",
    start: "Steven Gerrard",
    end: "Frank Lampard",
    exampleChain: [
      { name: "Fernando Torres", via: "Liverpool (2007-11)" },
    ],
    startClubs: ["Liverpool", "LA Galaxy", "England"],
    endClubs: ["West Ham United", "Swansea City", "Chelsea", "Manchester City", "New York City FC", "England"],
    validIntermediates: [
      { name: "Fernando Torres", clubs: ["Atlético Madrid", "Liverpool", "Chelsea", "AC Milan", "Spain"] },
      { name: "Joe Cole", clubs: ["West Ham United", "Chelsea", "Liverpool", "Lille", "Aston Villa", "Coventry City", "Tampa Bay Rowdies", "England"] },
      { name: "Daniel Sturridge", clubs: ["Manchester City", "Chelsea", "Bolton Wanderers", "Liverpool", "West Bromwich Albion", "Trabzonspor", "Perth Glory", "England"] },
      { name: "Raheem Sterling", clubs: ["Liverpool", "Manchester City", "Chelsea", "Arsenal", "England"] },
    ],
  },
  {
    id: "rooney-gerrard",
    start: "Wayne Rooney",
    end: "Steven Gerrard",
    exampleChain: [
      { name: "Michael Owen", via: "Manchester United (2009-12)" },
    ],
    startClubs: ["Everton", "Manchester United", "DC United", "Derby County", "England"],
    endClubs: ["Liverpool", "LA Galaxy", "England"],
    validIntermediates: [
      { name: "Michael Owen", clubs: ["Liverpool", "Real Madrid", "Newcastle United", "Manchester United", "Stoke City", "England"] },
      { name: "Rio Ferdinand", clubs: ["West Ham United", "Bournemouth", "Leeds United", "Manchester United", "Queens Park Rangers", "England"] },
      { name: "Jamie Carragher", clubs: ["Liverpool", "England"] },
      { name: "Gary Neville", clubs: ["Manchester United", "England"] },
    ],
  },
  {
    id: "ronaldo-ramos",
    start: "Cristiano Ronaldo",
    end: "Sergio Ramos",
    exampleChain: [
      { name: "Marcelo", via: "Real Madrid (2007-22)" },
    ],
    startClubs: ["Sporting CP", "Manchester United", "Real Madrid", "Juventus", "Al Nassr", "Portugal"],
    endClubs: ["Sevilla", "Real Madrid", "Paris Saint-Germain", "Monterrey", "Spain"],
    validIntermediates: [
      { name: "Marcelo", clubs: ["Fluminense", "Real Madrid", "Olympiacos", "Brazil"] },
      { name: "Casemiro", clubs: ["São Paulo", "Real Madrid", "Manchester United", "Brazil"] },
      { name: "Gareth Bale", clubs: ["Southampton", "Tottenham Hotspur", "Real Madrid", "Los Angeles FC", "Wales"] },
      { name: "Luka Modrić", clubs: ["Dinamo Zagreb", "Tottenham Hotspur", "Real Madrid", "AC Milan", "Croatia"] },
      { name: "Karim Benzema", clubs: ["Lyon", "Real Madrid", "Al Ittihad", "France"] },
    ],
  },
  {
    id: "neymar-mbappe",
    start: "Neymar",
    end: "Kylian Mbappé",
    exampleChain: [
      { name: "Marco Verratti", via: "Paris Saint-Germain (2012-23)" },
    ],
    startClubs: ["Santos", "Barcelona", "Paris Saint-Germain", "Al Hilal", "Brazil"],
    endClubs: ["Monaco", "Paris Saint-Germain", "Real Madrid", "France"],
    validIntermediates: [
      { name: "Marco Verratti", clubs: ["Pescara", "Paris Saint-Germain", "Al Arabi", "Italy"] },
      { name: "Marquinhos", clubs: ["Corinthians", "Roma", "Paris Saint-Germain", "Brazil"] },
      { name: "Achraf Hakimi", clubs: ["Real Madrid", "Borussia Dortmund", "Inter Milan", "Paris Saint-Germain", "Morocco"] },
      { name: "Ángel Di María", clubs: ["Rosario Central", "Benfica", "Real Madrid", "Manchester United", "Paris Saint-Germain", "Juventus", "Argentina"] },
    ],
  },
  {
    id: "suarez-messi",
    start: "Luis Suárez",
    end: "Lionel Messi",
    exampleChain: [
      { name: "Neymar", via: "Barcelona (2013-17)" },
    ],
    startClubs: ["Nacional", "Groningen", "Ajax", "Liverpool", "Barcelona", "Atlético Madrid", "Grêmio", "Inter Miami", "Uruguay"],
    endClubs: ["Barcelona", "Paris Saint-Germain", "Inter Miami", "Argentina"],
    validIntermediates: [
      { name: "Neymar", clubs: ["Santos", "Barcelona", "Paris Saint-Germain", "Al Hilal", "Brazil"] },
      { name: "Jordi Alba", clubs: ["Valencia", "Barcelona", "Inter Miami", "Spain"] },
      { name: "Sergio Busquets", clubs: ["Barcelona", "Inter Miami", "Spain"] },
      { name: "Ivan Rakitić", clubs: ["Basel", "Schalke 04", "Sevilla", "Barcelona", "Al Shabab", "Hajduk Split", "Croatia"] },
    ],
  },
  {
    id: "benzema-ronaldo",
    start: "Karim Benzema",
    end: "Cristiano Ronaldo",
    exampleChain: [
      { name: "Gareth Bale", via: "Real Madrid (2013-22)" },
    ],
    startClubs: ["Lyon", "Real Madrid", "Al Ittihad", "France"],
    endClubs: ["Sporting CP", "Manchester United", "Real Madrid", "Juventus", "Al Nassr", "Portugal"],
    validIntermediates: [
      { name: "Gareth Bale", clubs: ["Southampton", "Tottenham Hotspur", "Real Madrid", "Los Angeles FC", "Wales"] },
      { name: "Luka Modrić", clubs: ["Dinamo Zagreb", "Tottenham Hotspur", "Real Madrid", "AC Milan", "Croatia"] },
      { name: "Sergio Ramos", clubs: ["Sevilla", "Real Madrid", "Paris Saint-Germain", "Monterrey", "Spain"] },
      { name: "Marcelo", clubs: ["Fluminense", "Real Madrid", "Olympiacos", "Brazil"] },
      { name: "Casemiro", clubs: ["São Paulo", "Real Madrid", "Manchester United", "Brazil"] },
    ],
  },
  {
    id: "lewandowski-muller",
    start: "Robert Lewandowski",
    end: "Thomas Müller",
    exampleChain: [
      { name: "Joshua Kimmich", via: "Bayern Munich (2015-)" },
    ],
    startClubs: ["Borussia Dortmund", "Bayern Munich", "Barcelona", "Poland"],
    endClubs: ["Bayern Munich", "Vancouver Whitecaps", "Germany"],
    validIntermediates: [
      { name: "Joshua Kimmich", clubs: ["RB Leipzig", "Bayern Munich", "Germany"] },
      { name: "Leon Goretzka", clubs: ["VfL Bochum", "Schalke 04", "Bayern Munich", "Germany"] },
      { name: "Kingsley Coman", clubs: ["Paris Saint-Germain", "Juventus", "Bayern Munich", "France"] },
      { name: "Leroy Sané", clubs: ["Schalke 04", "Manchester City", "Bayern Munich", "Germany"] },
      { name: "Alphonso Davies", clubs: ["Vancouver Whitecaps", "Bayern Munich", "Canada"] },
    ],
  },
  {
    id: "van-dijk-salah",
    start: "Virgil van Dijk",
    end: "Mohamed Salah",
    exampleChain: [
      { name: "Alisson Becker", via: "Liverpool (2018-)" },
    ],
    startClubs: ["Groningen", "Celtic", "Southampton", "Liverpool", "Netherlands"],
    endClubs: ["Basel", "Chelsea", "Fiorentina", "Roma", "Liverpool", "Egypt"],
    validIntermediates: [
      { name: "Alisson Becker", clubs: ["Internacional", "Roma", "Liverpool", "Brazil"] },
      { name: "Roberto Firmino", clubs: ["Figueirense", "Hoffenheim", "Liverpool", "Al Ahli", "Brazil"] },
      { name: "Jordan Henderson", clubs: ["Sunderland", "Coventry City", "Liverpool", "Al Ettifaq", "Ajax", "Brentford", "England"] },
      { name: "Trent Alexander-Arnold", clubs: ["Liverpool", "Real Madrid", "England"] },
      { name: "Fabinho", clubs: ["Fluminense", "Rio Ave", "Monaco", "Liverpool", "Al Ittihad", "Brazil"] },
    ],
  },
  {
    id: "courtois-de-bruyne",
    start: "Thibaut Courtois",
    end: "Kevin De Bruyne",
    exampleChain: [
      { name: "Eden Hazard", via: "Chelsea (2012-19)" },
    ],
    startClubs: ["Genk", "Chelsea", "Atlético Madrid", "Real Madrid", "Belgium"],
    endClubs: ["Genk", "Chelsea", "Wolfsburg", "Manchester City", "Napoli", "Belgium"],
    validIntermediates: [
      { name: "Eden Hazard", clubs: ["Lille", "Chelsea", "Real Madrid", "Belgium"] },
      { name: "Romelu Lukaku", clubs: ["Anderlecht", "Chelsea", "West Bromwich Albion", "Everton", "Manchester United", "Inter Milan", "Roma", "Napoli", "Belgium"] },
      { name: "Thorgan Hazard", clubs: ["Genk", "Chelsea", "Borussia Mönchengladbach", "Borussia Dortmund", "Anderlecht", "Belgium"] },
      { name: "Michy Batshuayi", clubs: ["Standard Liège", "Marseille", "Chelsea", "Borussia Dortmund", "Valencia", "Crystal Palace", "Beşiktaş", "Fenerbahçe", "Eintracht Frankfurt", "Belgium"] },
    ],
  },
  {
    id: "griezmann-mbappe",
    start: "Antoine Griezmann",
    end: "Kylian Mbappé",
    exampleChain: [
      { name: "Ousmane Dembélé", via: "Barcelona (2017-23)" },
    ],
    startClubs: ["Real Sociedad", "Atlético Madrid", "Barcelona", "France"],
    endClubs: ["Monaco", "Paris Saint-Germain", "Real Madrid", "France"],
    validIntermediates: [
      { name: "Ousmane Dembélé", clubs: ["Rennes", "Borussia Dortmund", "Barcelona", "Paris Saint-Germain", "France"] },
      { name: "Lucas Hernández", clubs: ["Atlético Madrid", "Bayern Munich", "Paris Saint-Germain", "France"] },
      { name: "Theo Hernández", clubs: ["Atlético Madrid", "Real Sociedad", "Real Madrid", "AC Milan", "Al Hilal", "France"] },
      { name: "Thomas Lemar", clubs: ["Caen", "Monaco", "Atlético Madrid", "Girona", "France"] },
    ],
  },
  {
    id: "pogba-ronaldo",
    start: "Paul Pogba",
    end: "Cristiano Ronaldo",
    exampleChain: [
      { name: "Patrice Evra", via: "Manchester United (2006-14)" },
    ],
    startClubs: ["Le Havre", "Manchester United", "Juventus", "Monaco", "France"],
    endClubs: ["Sporting CP", "Manchester United", "Real Madrid", "Juventus", "Al Nassr", "Portugal"],
    validIntermediates: [
      { name: "Patrice Evra", clubs: ["Marsala", "Monza", "Nice", "Monaco", "Manchester United", "Juventus", "Marseille", "West Ham United", "France"] },
      { name: "Paulo Dybala", clubs: ["Instituto", "Palermo", "Juventus", "Roma", "Argentina"] },
      { name: "Zlatan Ibrahimović", clubs: ["Ajax", "Juventus", "Inter Milan", "Barcelona", "AC Milan", "Paris Saint-Germain", "Manchester United", "LA Galaxy", "Sweden"] },
      { name: "Bruno Fernandes", clubs: ["Novara", "Udinese", "Sampdoria", "Sporting CP", "Manchester United", "Portugal"] },
      { name: "Raphaël Varane", clubs: ["Lens", "Real Madrid", "Manchester United", "Como", "France"] },
    ],
  },
  {
    id: "kane-son",
    start: "Harry Kane",
    end: "Son Heung-min",
    exampleChain: [
      { name: "Dele Alli", via: "Tottenham Hotspur (2015-22)" },
    ],
    startClubs: ["Tottenham Hotspur", "Bayern Munich", "England"],
    endClubs: ["Hamburger SV", "Bayer Leverkusen", "Tottenham Hotspur", "Los Angeles FC", "South Korea"],
    validIntermediates: [
      { name: "Dele Alli", clubs: ["Milton Keynes Dons", "Tottenham Hotspur", "Everton", "Beşiktaş", "Como", "England"] },
      { name: "Christian Eriksen", clubs: ["Ajax", "Tottenham Hotspur", "Inter Milan", "Brentford", "Manchester United", "VfL Wolfsburg", "Denmark"] },
      { name: "Hugo Lloris", clubs: ["Nice", "Lyon", "Tottenham Hotspur", "Los Angeles FC", "France"] },
      { name: "Eric Dier", clubs: ["Sporting CP", "Tottenham Hotspur", "Bayern Munich", "Monaco", "England"] },
      { name: "Pierre-Emile Højbjerg", clubs: ["Bayern Munich", "Augsburg", "Schalke 04", "Southampton", "Tottenham Hotspur", "Marseille", "Denmark"] },
    ],
  },
  {
    id: "odegaard-saka",
    start: "Martin Ødegaard",
    end: "Bukayo Saka",
    exampleChain: [
      { name: "Gabriel Martinelli", via: "Arsenal (2019-)" },
    ],
    startClubs: ["Strømsgodset", "Real Madrid", "Heerenveen", "Vitesse", "Real Sociedad", "Arsenal", "Norway"],
    endClubs: ["Arsenal", "England"],
    validIntermediates: [
      { name: "Gabriel Martinelli", clubs: ["Ituano", "Arsenal", "Brazil"] },
      { name: "Declan Rice", clubs: ["West Ham United", "Arsenal", "England"] },
      { name: "William Saliba", clubs: ["Saint-Étienne", "Nice", "Marseille", "Arsenal", "France"] },
      { name: "Ben White", clubs: ["Brighton", "Newport County", "Peterborough United", "Leeds United", "Arsenal", "England"] },
      { name: "Gabriel Magalhães", clubs: ["Avaí", "Lille", "Troyes", "Dinamo Zagreb", "Arsenal", "Brazil"] },
    ],
  },
  {
    id: "rashford-saka",
    start: "Marcus Rashford",
    end: "Bukayo Saka",
    exampleChain: [
      { name: "Danny Welbeck", via: "Manchester United (2008-14)" },
    ],
    startClubs: ["Manchester United", "Aston Villa", "Barcelona", "England"],
    endClubs: ["Arsenal", "England"],
    validIntermediates: [
      { name: "Danny Welbeck", clubs: ["Manchester United", "Sunderland", "Arsenal", "Watford", "Brighton", "England"] },
      { name: "Alexis Sánchez", clubs: ["Cobreloa", "Udinese", "Barcelona", "Arsenal", "Manchester United", "Inter Milan", "Marseille", "Chile"] },
      { name: "Henrikh Mkhitaryan", clubs: ["Pyunik", "Metalurh Donetsk", "Shakhtar Donetsk", "Borussia Dortmund", "Manchester United", "Arsenal", "Roma", "Inter Milan", "Armenia"] },
      { name: "Robin van Persie", clubs: ["Feyenoord", "Arsenal", "Manchester United", "Fenerbahçe", "Netherlands"] },
    ],
  },
  {
    id: "vinicius-bellingham",
    start: "Vinícius Júnior",
    end: "Jude Bellingham",
    exampleChain: [
      { name: "Rodrygo", via: "Real Madrid (2019-)" },
    ],
    startClubs: ["Flamengo", "Real Madrid", "Brazil"],
    endClubs: ["Birmingham City", "Borussia Dortmund", "Real Madrid", "England"],
    validIntermediates: [
      { name: "Rodrygo", clubs: ["Santos", "Real Madrid", "Brazil"] },
      { name: "Federico Valverde", clubs: ["Peñarol", "Real Madrid", "Uruguay"] },
      { name: "Aurélien Tchouaméni", clubs: ["Bordeaux", "Monaco", "Real Madrid", "France"] },
      { name: "Eduardo Camavinga", clubs: ["Rennes", "Real Madrid", "France"] },
      { name: "Toni Kroos", clubs: ["Bayern Munich", "Bayer Leverkusen", "Real Madrid", "Germany"] },
    ],
  },
  {
    id: "pedri-gavi",
    start: "Pedri",
    end: "Gavi",
    exampleChain: [
      { name: "Frenkie de Jong", via: "Barcelona (2019-)" },
    ],
    startClubs: ["Las Palmas", "Barcelona", "Spain"],
    endClubs: ["Barcelona", "Spain"],
    validIntermediates: [
      { name: "Frenkie de Jong", clubs: ["Willem II", "Ajax", "Barcelona", "Netherlands"] },
      { name: "Lamine Yamal", clubs: ["Barcelona", "Spain"] },
      { name: "Robert Lewandowski", clubs: ["Borussia Dortmund", "Bayern Munich", "Barcelona", "Poland"] },
      { name: "Raphinha", clubs: ["Avaí", "Vitória Guimarães", "Sporting CP", "Rennes", "Leeds United", "Barcelona", "Brazil"] },
      { name: "Jules Koundé", clubs: ["Bordeaux", "Sevilla", "Barcelona", "France"] },
    ],
  },
  {
    id: "haaland-foden",
    start: "Erling Haaland",
    end: "Phil Foden",
    exampleChain: [
      { name: "Bernardo Silva", via: "Manchester City (2017-)" },
    ],
    startClubs: ["Bryne", "Molde", "Red Bull Salzburg", "Borussia Dortmund", "Manchester City", "Norway"],
    endClubs: ["Manchester City", "England"],
    validIntermediates: [
      { name: "Bernardo Silva", clubs: ["Benfica", "Monaco", "Manchester City", "Portugal"] },
      { name: "Rodri", clubs: ["Villarreal", "Atlético Madrid", "Manchester City", "Spain"] },
      { name: "Jack Grealish", clubs: ["Aston Villa", "Manchester City", "Everton", "England"] },
      { name: "Rúben Dias", clubs: ["Benfica", "Manchester City", "Portugal"] },
      { name: "Kevin De Bruyne", clubs: ["Genk", "Chelsea", "Wolfsburg", "Manchester City", "Napoli", "Belgium"] },
    ],
  },
  {
    id: "ronaldinho-kaka",
    start: "Ronaldinho",
    end: "Kaká",
    exampleChain: [
      { name: "Clarence Seedorf", via: "AC Milan (2002-12)" },
    ],
    startClubs: ["Grêmio", "Paris Saint-Germain", "Barcelona", "AC Milan", "Flamengo", "Atlético Mineiro", "Querétaro", "Brazil"],
    endClubs: ["São Paulo", "AC Milan", "Real Madrid", "Orlando City", "Brazil"],
    validIntermediates: [
      { name: "Clarence Seedorf", clubs: ["Ajax", "Sampdoria", "Real Madrid", "Inter Milan", "AC Milan", "Botafogo", "Netherlands"] },
      { name: "Andrea Pirlo", clubs: ["Brescia", "Inter Milan", "AC Milan", "Juventus", "New York City FC", "Italy"] },
      { name: "Gennaro Gattuso", clubs: ["Perugia", "Rangers", "Salernitana", "AC Milan", "Sion", "Italy"] },
      { name: "Alessandro Nesta", clubs: ["Lazio", "AC Milan", "Montreal Impact", "Chennaiyin FC", "Italy"] },
      { name: "Paolo Maldini", clubs: ["AC Milan", "Italy"] },
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
