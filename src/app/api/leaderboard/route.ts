import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { computeStreaks } from "@/lib/streak";

export const dynamic = "force-dynamic";

// GET /api/leaderboard
// Top 20 anonymous players by wins, then by best streak. Player ids
// are truncated to 8 characters; no personal data is stored or shown.
// Without DATABASE_URL it answers { backend: "unavailable" }.
export async function GET() {
  if (!prisma) {
    return NextResponse.json({ backend: "unavailable" }, { status: 503 });
  }
  try {
    const players = await prisma.player.findMany({
      select: {
        deviceId: true,
        results: { select: { won: true, playedAt: true } },
      },
    });
    const ranked = players
      .map((player) => {
        const wins = player.results.filter((r) => r.won).length;
        const streaks = computeStreaks(
          player.results.map((r) => r.playedAt.toISOString().slice(0, 10)),
        );
        return { player: player.deviceId.slice(0, 8), wins, bestStreak: streaks.best };
      })
      .filter((entry) => entry.wins > 0)
      .sort((a, b) => b.wins - a.wins || b.bestStreak - a.bestStreak)
      .slice(0, 20)
      .map((entry, i) => ({ rank: i + 1, ...entry }));
    return NextResponse.json({ entries: ranked });
  } catch (error) {
    console.error("GET /api/leaderboard failed:", error);
    return NextResponse.json({ backend: "unavailable" }, { status: 503 });
  }
}
