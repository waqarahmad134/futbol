// Legacy game: progressive career-path clues to identify a legendary footballer.
export interface LegacyLegend {
  name: string;
  // Clues are revealed cheapest first; the LAST clue is the most obvious.
  clues: string[];
  funFact: string;
}

export const LEGACY_LEGENDS: LegacyLegend[] = [
  {
    name: "Diego Maradona",
    clues: [
      "Played at Argentinos Juniors as a teenager.",
      "Moved to Boca Juniors before a record-breaking transfer to Europe.",
      "Won La Liga's top scorer award after joining a Catalan club.",
      "Lifted the Scudetto twice with a southern Italian club.",
      "Captained his country to win the 1986 World Cup in Mexico.",
    ],
    funFact: "Scored both the 'Hand of God' and 'Goal of the Century' against England in 1986.",
  },
  {
    name: "Pelé",
    clues: [
      "Spent the bulk of his career at Santos in Brazil.",
      "Made his international debut at age 16.",
      "Scored over 1,000 career goals.",
      "Finished his career with the New York Cosmos in the NASL.",
      "Won three FIFA World Cups (1958, 1962, 1970).",
    ],
    funFact: "Is the only player in history to win three World Cups.",
  },
  {
    name: "Johan Cruyff",
    clues: [
      "Came through the Ajax academy and won three European Cups in a row.",
      "Inspired the term 'Total Football'.",
      "Won the Ballon d'Or three times.",
      "Moved to Barcelona and later managed the Catalan club.",
      "His ‘turn' is one of the most iconic skill moves in football.",
    ],
    funFact: "Built Barcelona's modern footballing identity as the architect of La Masia.",
  },
  {
    name: "Zinedine Zidane",
    clues: [
      "Started his career at Cannes before joining Bordeaux.",
      "Won the Serie A title with Juventus.",
      "Became the world's most expensive player when he joined Real Madrid in 2001.",
      "Scored a famous volley in the 2002 Champions League Final.",
      "Won the 1998 World Cup with France with two headed goals in the final.",
    ],
    funFact: "Was sent off for a headbutt in the 2006 World Cup Final, his last ever match.",
  },
  {
    name: "Ronaldinho",
    clues: [
      "Started at Grêmio in southern Brazil.",
      "Joined PSG before a switch to a Catalan club.",
      "Won the Ballon d'Or in 2005.",
      "Earned a standing ovation at the Bernabéu in 2005.",
      "Won the World Cup in 2002 alongside Ronaldo and Rivaldo.",
    ],
    funFact: "Famous for his samba style, no-look passes and constant smile.",
  },
  {
    name: "Andrés Iniesta",
    clues: [
      "Spent his entire European career at one club.",
      "Was the 2010 World Cup Final MVP.",
      "Won six La Liga titles and four Champions Leagues.",
      "Finished his career at Vissel Kobe in Japan.",
      "Scored the winner in the 2010 World Cup Final against the Netherlands.",
    ],
    funFact: "His 116th-minute goal won Spain their only ever World Cup.",
  },
  {
    name: "Thierry Henry",
    clues: [
      "Started at Monaco under Arsène Wenger.",
      "Briefly played as a winger at Juventus before moving to England.",
      "Top-scored in the Premier League four times.",
      "Won La Liga and the Champions League at Barcelona.",
      "Is Arsenal's all-time top scorer.",
    ],
    funFact: "Was the talismanic striker of Arsenal's 2003-04 'Invincibles'.",
  },
  {
    name: "Paolo Maldini",
    clues: [
      "Spent his entire 25-year playing career at one club.",
      "Won 7 Serie A titles.",
      "Played in eight Champions League finals.",
      "Captained both club and country.",
      "Wore the number 3 shirt for AC Milan.",
    ],
    funFact: "Father Cesare also captained AC Milan to a European Cup, 40 years before him.",
  },
  {
    name: "Ronaldo Nazário",
    clues: [
      "Began at Cruzeiro and was nicknamed ‘O Fenômeno'.",
      "Won the Eredivisie's top scorer at PSV.",
      "Won La Liga top scorer at Barcelona before moving to Inter Milan.",
      "Returned to glory at Real Madrid after years of injuries.",
      "Won the Golden Boot at the 2002 World Cup with 8 goals.",
    ],
    funFact: "Won two Ballons d'Or before the age of 22.",
  },
  {
    name: "Xavi Hernández",
    clues: [
      "Spent his entire club career at one Catalan club before moving to Qatar.",
      "Renowned for his pass-completion percentage.",
      "Won Euro 2008, the 2010 World Cup, and Euro 2012 in succession.",
      "Won four Champions League titles.",
      "Came back to manage his boyhood club between 2021 and 2024.",
    ],
    funFact: "Is the most-capped Spanish midfielder of all time.",
  },
];

export function getDailyLegend(): LegacyLegend {
  const epoch = new Date(2024, 0, 1).getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const dayIndex = Math.floor((today - epoch) / 86400000);
  return LEGACY_LEGENDS[dayIndex % LEGACY_LEGENDS.length];
}
