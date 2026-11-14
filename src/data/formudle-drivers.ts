// Formudle - guess the Formula 1 driver.
// Stats are career facts: championship titles, F1 debut year and first
// Grand Prix win year. Title counts and debut years do not change during a
// season, so the data stays correct. Drivers with no win yet have
// firstWin set to null. Teams are the 2026 season teams.
export interface F1Driver {
  name: string;
  nationality: string;
  team: string;
  debut: number;
  titles: number;
  firstWin: number | null;
  funFact: string;
}

export const F1_DRIVERS: F1Driver[] = [
  {
    name: "Max Verstappen",
    nationality: "Netherlands",
    team: "Red Bull Racing",
    debut: 2015,
    titles: 4,
    firstWin: 2016,
    funFact: "Won his first Grand Prix on his Red Bull debut at the 2016 Spanish GP, aged 18.",
  },
  {
    name: "Lando Norris",
    nationality: "United Kingdom",
    team: "McLaren",
    debut: 2019,
    titles: 1,
    firstWin: 2024,
    funFact: "Won the 2025 drivers championship with McLaren, the team's first drivers title since 2008.",
  },
  {
    name: "Oscar Piastri",
    nationality: "Australia",
    team: "McLaren",
    debut: 2023,
    titles: 0,
    firstWin: 2024,
    funFact: "Won the F2, F3 and Formula Renault Eurocup titles in three straight seasons before F1.",
  },
  {
    name: "Charles Leclerc",
    nationality: "Monaco",
    team: "Ferrari",
    debut: 2018,
    titles: 0,
    firstWin: 2019,
    funFact: "First driver from Monaco to win a Formula 1 Grand Prix.",
  },
  {
    name: "Lewis Hamilton",
    nationality: "United Kingdom",
    team: "Ferrari",
    debut: 2007,
    titles: 7,
    firstWin: 2007,
    funFact: "Joint record holder with seven world championships and the all-time record for Grand Prix wins.",
  },
  {
    name: "George Russell",
    nationality: "United Kingdom",
    team: "Mercedes",
    debut: 2019,
    titles: 0,
    firstWin: 2022,
    funFact: "Won the F2 championship in his rookie season in 2018 before joining Williams.",
  },
  {
    name: "Andrea Kimi Antonelli",
    nationality: "Italy",
    team: "Mercedes",
    debut: 2025,
    titles: 0,
    firstWin: null,
    funFact: "The youngest Italian to race in Formula 1, debuting for Mercedes aged 18.",
  },
  {
    name: "Carlos Sainz",
    nationality: "Spain",
    team: "Williams",
    debut: 2015,
    titles: 0,
    firstWin: 2022,
    funFact: "Son of two-time World Rally champion Carlos Sainz Sr.",
  },
  {
    name: "Alexander Albon",
    nationality: "Thailand",
    team: "Williams",
    debut: 2019,
    titles: 0,
    firstWin: null,
    funFact: "The first Thai driver to race in Formula 1 since Prince Bira in the 1950s.",
  },
  {
    name: "Fernando Alonso",
    nationality: "Spain",
    team: "Aston Martin",
    debut: 2001,
    titles: 2,
    firstWin: 2003,
    funFact: "The youngest world champion in F1 history when he won his first title in 2005, aged 24.",
  },
  {
    name: "Lance Stroll",
    nationality: "Canada",
    team: "Aston Martin",
    debut: 2017,
    titles: 0,
    firstWin: null,
    funFact: "Won the 2016 European Formula 3 championship before his F1 debut.",
  },
  {
    name: "Esteban Ocon",
    nationality: "France",
    team: "Haas",
    debut: 2016,
    titles: 0,
    firstWin: 2021,
    funFact: "Won his first Grand Prix in a chaotic 2021 Hungarian GP for Alpine.",
  },
  {
    name: "Oliver Bearman",
    nationality: "United Kingdom",
    team: "Haas",
    debut: 2024,
    titles: 0,
    firstWin: null,
    funFact: "Scored points on his shock F1 debut as a stand-in for Ferrari at the 2024 Saudi Arabian GP.",
  },
  {
    name: "Pierre Gasly",
    nationality: "France",
    team: "Alpine",
    debut: 2017,
    titles: 0,
    firstWin: 2020,
    funFact: "Won a shock first Grand Prix at Monza in 2020 for AlphaTauri.",
  },
  {
    name: "Franco Colapinto",
    nationality: "Argentina",
    team: "Alpine",
    debut: 2024,
    titles: 0,
    firstWin: null,
    funFact: "The first Argentine driver in Formula 1 since Gaston Mazzacane in 2001.",
  },
  {
    name: "Isack Hadjar",
    nationality: "France",
    team: "Racing Bulls",
    debut: 2025,
    titles: 0,
    firstWin: null,
    funFact: "Finished runner-up in the 2024 F2 championship before his F1 debut.",
  },
  {
    name: "Liam Lawson",
    nationality: "New Zealand",
    team: "Racing Bulls",
    debut: 2023,
    titles: 0,
    firstWin: null,
    funFact: "The first New Zealander to race in Formula 1 since Brendon Hartley in 2018.",
  },
  {
    name: "Yuki Tsunoda",
    nationality: "Japan",
    team: "Red Bull Racing",
    debut: 2021,
    titles: 0,
    firstWin: null,
    funFact: "The first Japanese driver in Formula 1 since Kamui Kobayashi in 2014.",
  },
  {
    name: "Nico Hulkenberg",
    nationality: "Germany",
    team: "Audi",
    debut: 2010,
    titles: 0,
    firstWin: null,
    funFact: "Holds the record for the most Grand Prix starts without a podium finish.",
  },
  {
    name: "Gabriel Bortoleto",
    nationality: "Brazil",
    team: "Audi",
    debut: 2025,
    titles: 0,
    firstWin: null,
    funFact: "Won the F3 title in 2023 and the F2 title in 2024 in back-to-back rookie seasons.",
  },
  {
    name: "Michael Schumacher",
    nationality: "Germany",
    team: "Retired",
    debut: 1991,
    titles: 7,
    firstWin: 1992,
    funFact: "Joint record holder with seven world championships, five of them in a row with Ferrari.",
  },
  {
    name: "Ayrton Senna",
    nationality: "Brazil",
    team: "Retired",
    debut: 1984,
    titles: 3,
    firstWin: 1985,
    funFact: "Won 41 Grands Prix and is widely regarded as the greatest wet-weather driver ever.",
  },
  {
    name: "Alain Prost",
    nationality: "France",
    team: "Retired",
    debut: 1980,
    titles: 4,
    firstWin: 1981,
    funFact: "Nicknamed The Professor for his smooth, calculated driving style.",
  },
  {
    name: "Sebastian Vettel",
    nationality: "Germany",
    team: "Retired",
    debut: 2007,
    titles: 4,
    firstWin: 2008,
    funFact: "Won four straight world championships with Red Bull from 2010 to 2013.",
  },
  {
    name: "Juan Manuel Fangio",
    nationality: "Argentina",
    team: "Retired",
    debut: 1950,
    titles: 5,
    firstWin: 1950,
    funFact: "Won five world championships with four different teams in the 1950s.",
  },
  {
    name: "Jim Clark",
    nationality: "United Kingdom",
    team: "Retired",
    debut: 1960,
    titles: 2,
    firstWin: 1962,
    funFact: "Won the Indianapolis 500 in 1965, the same year he won his second F1 title.",
  },
  {
    name: "Niki Lauda",
    nationality: "Austria",
    team: "Retired",
    debut: 1971,
    titles: 3,
    firstWin: 1974,
    funFact: "Came back to win the 1977 title after his near-fatal crash at the Nurburgring in 1976.",
  },
  {
    name: "Jackie Stewart",
    nationality: "United Kingdom",
    team: "Retired",
    debut: 1965,
    titles: 3,
    firstWin: 1965,
    funFact: "Won three titles and later campaigned for safety, saving countless drivers lives.",
  },
  {
    name: "Nelson Piquet",
    nationality: "Brazil",
    team: "Retired",
    debut: 1978,
    titles: 3,
    firstWin: 1980,
    funFact: "Won three world championships, the first of them with Brabham in 1981.",
  },
  {
    name: "Nigel Mansell",
    nationality: "United Kingdom",
    team: "Retired",
    debut: 1980,
    titles: 1,
    firstWin: 1985,
    funFact: "Won the F1 title in 1992 and the IndyCar title in 1993, back to back.",
  },
  {
    name: "Mika Hakkinen",
    nationality: "Finland",
    team: "Retired",
    debut: 1991,
    titles: 2,
    firstWin: 1997,
    funFact: "Won back-to-back titles for McLaren in 1998 and 1999, beating Michael Schumacher both times.",
  },
  {
    name: "Kimi Raikkonen",
    nationality: "Finland",
    team: "Retired",
    debut: 2001,
    titles: 1,
    firstWin: 2003,
    funFact: "Won the 2007 world championship for Ferrari by a single point in his first season with the team.",
  },
];

// Day index since the shared epoch, matches the daily rotation used elsewhere.
export function getDayIndex(date: Date = new Date()): number {
  const epoch = new Date(2024, 0, 1).getTime();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  return Math.floor((today - epoch) / 86400000);
}

export function getDailyDriver(date: Date = new Date()): F1Driver {
  return F1_DRIVERS[getDayIndex(date) % F1_DRIVERS.length];
}

export function findDriver(name: string): F1Driver | undefined {
  return F1_DRIVERS.find((d) => d.name.toLowerCase() === name.trim().toLowerCase());
}
