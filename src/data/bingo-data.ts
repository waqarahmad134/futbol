// Bingo: random players reveal one at a time. Mark off cells whose criteria they meet.
export interface BingoCriterion {
  id: string;
  label: string;
  match: (p: BingoPlayer) => boolean;
}

export interface BingoPlayer {
  name: string;
  nation: string;
  clubs: string[];
  era: number; // primary decade like 2010
  position: "GK" | "DF" | "MF" | "FW";
  achievements: string[]; // e.g. "WC", "BdO", "UCL", "GoldenBoot"
}

const C: Record<string, BingoCriterion> = {
  WC: { id: "WC", label: "World Cup winner", match: (p) => p.achievements.includes("WC") },
  BDO: { id: "BDO", label: "Ballon d'Or winner", match: (p) => p.achievements.includes("BdO") },
  UCL: { id: "UCL", label: "Champions League winner", match: (p) => p.achievements.includes("UCL") },
  GB: { id: "GB", label: "Golden Boot winner", match: (p) => p.achievements.includes("GoldenBoot") },
  GK: { id: "GK", label: "Goalkeeper", match: (p) => p.position === "GK" },
  DF: { id: "DF", label: "Defender", match: (p) => p.position === "DF" },
  MF: { id: "MF", label: "Midfielder", match: (p) => p.position === "MF" },
  FW: { id: "FW", label: "Forward", match: (p) => p.position === "FW" },
  BRA: { id: "BRA", label: "Brazilian", match: (p) => p.nation === "Brazil" },
  ARG: { id: "ARG", label: "Argentine", match: (p) => p.nation === "Argentina" },
  ESP: { id: "ESP", label: "Spanish", match: (p) => p.nation === "Spain" },
  FRA: { id: "FRA", label: "French", match: (p) => p.nation === "France" },
  GER: { id: "GER", label: "German", match: (p) => p.nation === "Germany" },
  ITA: { id: "ITA", label: "Italian", match: (p) => p.nation === "Italy" },
  POR: { id: "POR", label: "Portuguese", match: (p) => p.nation === "Portugal" },
  ENG: { id: "ENG", label: "English", match: (p) => p.nation === "England" },
  BARCA: { id: "BARCA", label: "Played at Barcelona", match: (p) => p.clubs.includes("Barcelona") },
  RM: { id: "RM", label: "Played at Real Madrid", match: (p) => p.clubs.includes("Real Madrid") },
  MUFC: { id: "MUFC", label: "Played at Manchester United", match: (p) => p.clubs.includes("Manchester United") },
  ACM: { id: "ACM", label: "Played at AC Milan", match: (p) => p.clubs.includes("AC Milan") },
  JUVE: { id: "JUVE", label: "Played at Juventus", match: (p) => p.clubs.includes("Juventus") },
  PRE2000: { id: "PRE2000", label: "Star before 2000", match: (p) => p.era < 2000 },
  POST2010: { id: "POST2010", label: "Star after 2010", match: (p) => p.era >= 2010 },
};

export const MODERN_PLAYERS: BingoPlayer[] = [
  { name: "Lionel Messi", nation: "Argentina", clubs: ["Barcelona", "Paris Saint-Germain", "Inter Miami"], era: 2010, position: "FW", achievements: ["BdO", "UCL", "WC", "GoldenBoot"] },
  { name: "Cristiano Ronaldo", nation: "Portugal", clubs: ["Sporting CP", "Manchester United", "Real Madrid", "Juventus", "Al Nassr"], era: 2010, position: "FW", achievements: ["BdO", "UCL", "GoldenBoot"] },
  { name: "Andrés Iniesta", nation: "Spain", clubs: ["Barcelona", "Vissel Kobe"], era: 2010, position: "MF", achievements: ["WC", "UCL"] },
  { name: "Manuel Neuer", nation: "Germany", clubs: ["Schalke", "Bayern Munich"], era: 2010, position: "GK", achievements: ["WC", "UCL"] },
  { name: "Sergio Ramos", nation: "Spain", clubs: ["Sevilla", "Real Madrid", "Paris Saint-Germain"], era: 2010, position: "DF", achievements: ["WC", "UCL"] },
  { name: "Karim Benzema", nation: "France", clubs: ["Lyon", "Real Madrid", "Al-Ittihad"], era: 2010, position: "FW", achievements: ["BdO", "UCL"] },
  { name: "Luka Modrić", nation: "Croatia", clubs: ["Tottenham Hotspur", "Real Madrid"], era: 2010, position: "MF", achievements: ["BdO", "UCL"] },
  { name: "Gianluigi Buffon", nation: "Italy", clubs: ["Parma", "Juventus", "Paris Saint-Germain"], era: 2000, position: "GK", achievements: ["WC"] },
  { name: "Kylian Mbappé", nation: "France", clubs: ["Monaco", "Paris Saint-Germain", "Real Madrid"], era: 2020, position: "FW", achievements: ["WC", "GoldenBoot"] },
  { name: "Erling Haaland", nation: "Norway", clubs: ["Red Bull Salzburg", "Borussia Dortmund", "Manchester City"], era: 2020, position: "FW", achievements: ["UCL", "GoldenBoot"] },
  { name: "Robert Lewandowski", nation: "Poland", clubs: ["Borussia Dortmund", "Bayern Munich", "Barcelona"], era: 2010, position: "FW", achievements: ["UCL", "GoldenBoot"] },
];

export const RETRO_PLAYERS: BingoPlayer[] = [
  { name: "Pelé", nation: "Brazil", clubs: ["Santos", "New York Cosmos"], era: 1970, position: "FW", achievements: ["WC"] },
  { name: "Diego Maradona", nation: "Argentina", clubs: ["Boca Juniors", "Barcelona", "Napoli"], era: 1986, position: "MF", achievements: ["WC"] },
  { name: "Johan Cruyff", nation: "Netherlands", clubs: ["Ajax", "Barcelona"], era: 1974, position: "FW", achievements: ["BdO", "UCL"] },
  { name: "Michel Platini", nation: "France", clubs: ["Saint-Étienne", "Juventus"], era: 1980, position: "MF", achievements: ["BdO", "UCL"] },
  { name: "Franz Beckenbauer", nation: "Germany", clubs: ["Bayern Munich", "New York Cosmos"], era: 1974, position: "DF", achievements: ["WC", "BdO", "UCL"] },
  { name: "Marco van Basten", nation: "Netherlands", clubs: ["Ajax", "AC Milan"], era: 1988, position: "FW", achievements: ["BdO", "UCL"] },
  { name: "Roberto Baggio", nation: "Italy", clubs: ["Fiorentina", "Juventus", "AC Milan"], era: 1990, position: "FW", achievements: ["BdO"] },
  { name: "Romário", nation: "Brazil", clubs: ["PSV", "Barcelona", "Flamengo"], era: 1994, position: "FW", achievements: ["WC", "BdO"] },
  { name: "Lothar Matthäus", nation: "Germany", clubs: ["Borussia Mönchengladbach", "Bayern Munich", "Inter Milan"], era: 1990, position: "MF", achievements: ["WC", "BdO"] },
  { name: "Paolo Maldini", nation: "Italy", clubs: ["AC Milan"], era: 1994, position: "DF", achievements: ["UCL"] },
  { name: "Zinedine Zidane", nation: "France", clubs: ["Cannes", "Bordeaux", "Juventus", "Real Madrid"], era: 1998, position: "MF", achievements: ["WC", "BdO", "UCL"] },
];

const RETRO_CARD = [
  C.WC, C.BDO, C.UCL,
  C.FW, C.MF, C.DF,
  C.BRA, C.ITA, C.PRE2000,
];

const MODERN_CARD = [
  C.WC, C.UCL, C.GB,
  C.FW, C.MF, C.GK,
  C.ESP, C.FRA, C.POST2010,
];

export interface BingoSet {
  card: BingoCriterion[]; // 9 cells (3x3)
  pool: BingoPlayer[];
}

export const BINGO_SETS: Record<string, BingoSet> = {
  modern: { card: MODERN_CARD, pool: MODERN_PLAYERS },
  retro: { card: RETRO_CARD, pool: RETRO_PLAYERS },
};

export function getDailyPlayers(set: BingoSet, count = 6): BingoPlayer[] {
  const epoch = new Date(2024, 0, 1).getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const dayIndex = Math.floor((today - epoch) / 86400000);
  const arr = [...set.pool];
  let s = (dayIndex + 1) * 1234567;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}
