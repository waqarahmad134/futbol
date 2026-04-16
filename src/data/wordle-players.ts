// Football player surnames for Wordle (5-letter names only, uppercase)
// Covers legends and current stars from all major leagues
export const WORDLE_PLAYERS_5: string[] = [
  "MESSI", "SILVA", "PIQUE", "VIDAL", "BALDE",
  "JAMES", "MOURA", "BRUNO", "MOUNT", "SALAH",
  "SCHAR", "STONE", "NEVES", "PEDRO", "GOMEZ",
  "KROOS", "NEUER", "RAMOS", "MODIC", "NAVAS",
  "IBRAM", "DIABY", "NKUNKU", "KANTE", "POGBA",
  "HENRY", "ZIDAN", "PIRES", "BLANC", "DIGNE",
  "REYNA", "MUSAH", "ADAMS", "PULSK", "WEISS",
  "VERON", "OTERO", "BAENA", "PARDO", "SOLER",
  "DAVID", "DURAN", "WOODS", "GIBBS", "GRAYS",
  "LEWIN", "CALVE", "REECE", "JONES", "SMITH",
  "AYALA", "HEINZ", "MALEN", "EDGAR", "COSTA",
  "BLANC", "CAVAI", "PABLO", "OTAMP", "LUCAS",
  "YOUNG", "DAVIS", "EVANS", "CLARK", "GREEN",
  "BOWEN", "ARIAS", "DIOGO", "NALDO", "MARIO",
  "INAKI", "SOYUN", "KEANE", "ROONY", "GIGGS",
  "TERRY", "OWEN", "BARRY", "MILLS", "NOLAN",
  "MENDY", "HAKAM", "FODEN", "SAKAT", "OSCAR",
  "KARIM", "ANGEL", "MOREO", "VILLA", "GOMES",
  "GUNDO", "BRAVO", "FIRMA", "ALABA", "MBABU",
  "KAMPL", "LAIME", "SABIR", "NDIDI", "ONANA",
];

// Words that are valid guesses (all 5-letter combos the user can type)
// We allow any 5-letter input for simplicity

// Get the daily word based on date
export function getDailyWord(): string {
  const epoch = new Date(2024, 0, 1).getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const dayIndex = Math.floor((today - epoch) / 86400000);
  return WORDLE_PLAYERS_5[dayIndex % WORDLE_PLAYERS_5.length];
}

export type LetterStatus = "correct" | "present" | "absent" | "empty";

export interface LetterResult {
  letter: string;
  status: LetterStatus;
}

export function evaluateGuess(guess: string, answer: string): LetterResult[] {
  const result: LetterResult[] = guess.split("").map((letter) => ({
    letter,
    status: "absent" as LetterStatus,
  }));

  const answerArr = answer.split("");
  const used = new Array(answer.length).fill(false);

  // First pass: correct positions
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answerArr[i]) {
      result[i].status = "correct";
      used[i] = true;
    }
  }

  // Second pass: present but wrong position
  for (let i = 0; i < guess.length; i++) {
    if (result[i].status === "correct") continue;
    for (let j = 0; j < answerArr.length; j++) {
      if (!used[j] && guess[i] === answerArr[j]) {
        result[i].status = "present";
        used[j] = true;
        break;
      }
    }
  }

  return result;
}
