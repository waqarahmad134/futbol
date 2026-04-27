// Clubs game: identify the club from progressive visual clues.
export interface ClubEntry {
  name: string;
  acceptedAnswers: string[]; // lowercase
  // Visual identity
  primaryColor: string; // hsl colour
  secondaryColor: string;
  initials: string;
  shape: "stripes" | "halves" | "solid" | "hoops" | "diagonal";
  // Progressive textual clues
  clues: string[];
}

export const CLUBS: ClubEntry[] = [
  {
    name: "FC Barcelona",
    acceptedAnswers: ["barcelona", "fc barcelona", "barca", "barça"],
    primaryColor: "hsl(220 80% 35%)",
    secondaryColor: "hsl(0 80% 45%)",
    initials: "FCB",
    shape: "stripes",
    clues: [
      "Founded in 1899 in Catalonia.",
      "Plays its home games at Spotify Camp Nou.",
      "Motto: ‘Més que un club'.",
      "Famous La Masia academy graduates include Messi, Iniesta and Xavi.",
    ],
  },
  {
    name: "Manchester United",
    acceptedAnswers: ["manchester united", "man united", "man utd", "united", "the red devils"],
    primaryColor: "hsl(0 80% 40%)",
    secondaryColor: "hsl(45 90% 55%)",
    initials: "MUFC",
    shape: "solid",
    clues: [
      "Plays its home games at Old Trafford, ‘the Theatre of Dreams'.",
      "Won the Champions League in 1999, 2008.",
      "Sir Alex Ferguson managed the club for 26 years.",
      "Nicknamed ‘The Red Devils'.",
    ],
  },
  {
    name: "Juventus",
    acceptedAnswers: ["juventus", "juve", "juventus fc", "vecchia signora"],
    primaryColor: "hsl(0 0% 95%)",
    secondaryColor: "hsl(0 0% 10%)",
    initials: "JFC",
    shape: "stripes",
    clues: [
      "Italian record champions, founded in Turin in 1897.",
      "Wears black and white stripes — known as the Bianconeri.",
      "Plays at the Allianz Stadium.",
      "Has reached nine European Cup / Champions League finals.",
    ],
  },
  {
    name: "Bayern Munich",
    acceptedAnswers: ["bayern", "bayern munich", "bayern münchen", "fc bayern", "fc bayern münchen"],
    primaryColor: "hsl(0 80% 40%)",
    secondaryColor: "hsl(0 0% 100%)",
    initials: "FCB",
    shape: "halves",
    clues: [
      "Has won every Bundesliga title from 2012-13 to 2022-23.",
      "Plays its home games at the Allianz Arena.",
      "Won six European Cups / Champions Leagues.",
      "Bavaria's most successful club.",
    ],
  },
  {
    name: "Liverpool",
    acceptedAnswers: ["liverpool", "lfc", "liverpool fc", "the reds"],
    primaryColor: "hsl(0 80% 40%)",
    secondaryColor: "hsl(45 90% 55%)",
    initials: "LFC",
    shape: "solid",
    clues: [
      "Plays its home games at Anfield.",
      "Won the Champions League in 2005 and 2019.",
      "Anthem is ‘You'll Never Walk Alone'.",
      "Won the Premier League in 2019-20 under Jürgen Klopp.",
    ],
  },
  {
    name: "Boca Juniors",
    acceptedAnswers: ["boca", "boca juniors", "club atlético boca juniors"],
    primaryColor: "hsl(220 80% 30%)",
    secondaryColor: "hsl(45 90% 55%)",
    initials: "CABJ",
    shape: "halves",
    clues: [
      "Plays its home games at La Bombonera.",
      "Argentina's most popular football club.",
      "Has won the Copa Libertadores six times.",
      "Diego Maradona scored his first professional goal here.",
    ],
  },
];

export function getDailyClub(): ClubEntry {
  const epoch = new Date(2024, 0, 1).getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const dayIndex = Math.floor((today - epoch) / 86400000);
  return CLUBS[dayIndex % CLUBS.length];
}
