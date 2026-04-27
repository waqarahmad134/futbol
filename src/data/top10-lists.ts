// Top10 — name as many of a top-10 list as possible.
export interface Top10List {
  id: string;
  title: string;
  items: { name: string; aliases?: string[]; rank?: number }[];
}

export const TOP10_LISTS: Top10List[] = [
  {
    id: "ucl-top-scorers",
    title: "All-time Champions League top scorers (men's)",
    items: [
      { name: "Cristiano Ronaldo", aliases: ["ronaldo cr", "cr7"], rank: 1 },
      { name: "Lionel Messi", aliases: ["messi"], rank: 2 },
      { name: "Robert Lewandowski", aliases: ["lewandowski"], rank: 3 },
      { name: "Karim Benzema", aliases: ["benzema"], rank: 4 },
      { name: "Raúl", aliases: ["raul gonzalez", "raul"], rank: 5 },
      { name: "Ruud van Nistelrooy", aliases: ["van nistelrooy"], rank: 6 },
      { name: "Thomas Müller", aliases: ["thomas muller", "müller"], rank: 7 },
      { name: "Thierry Henry", aliases: ["henry"], rank: 8 },
      { name: "Erling Haaland", aliases: ["haaland"], rank: 9 },
      { name: "Andriy Shevchenko", aliases: ["shevchenko"], rank: 10 },
    ],
  },
  {
    id: "ballon-dor-multi",
    title: "Players with the most Ballon d'Or wins",
    items: [
      { name: "Lionel Messi", rank: 1 }, // 8
      { name: "Cristiano Ronaldo", rank: 2 }, // 5
      { name: "Michel Platini", rank: 3 }, // 3
      { name: "Marco van Basten", rank: 4 }, // 3
      { name: "Johan Cruyff", rank: 5 }, // 3
      { name: "Franz Beckenbauer", rank: 6 }, // 2
      { name: "Alfredo Di Stéfano", aliases: ["di stefano"], rank: 7 }, // 2
      { name: "Karl-Heinz Rummenigge", aliases: ["rummenigge"], rank: 8 }, // 2
      { name: "Kevin Keegan", rank: 9 }, // 2
      { name: "Ronaldo Nazário", aliases: ["ronaldo nazario", "ronaldo r9"], rank: 10 }, // 2
    ],
  },
];

export function getDailyTop10(): Top10List {
  const epoch = new Date(2024, 0, 1).getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const dayIndex = Math.floor((today - epoch) / 86400000);
  return TOP10_LISTS[dayIndex % TOP10_LISTS.length];
}
