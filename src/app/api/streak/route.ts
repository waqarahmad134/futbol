import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { computeStreaks } from "@/lib/streak";

export const dynamic = "force-dynamic";

// GET /api/streak?deviceId=...
// Returns the cross-game streak for one anonymous player:
// { current, best, totalDays }. Unknown device ids return zeros.
// Without DATABASE_URL it answers { backend: "unavailable" }.
export async function GET(req: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ backend: "unavailable" }, { status: 503 });
  }
  const deviceId = req.nextUrl.searchParams.get("deviceId");
  if (!deviceId) {
    return NextResponse.json({ error: "deviceId query param is required" }, { status: 400 });
  }
  try {
    const player = await prisma.player.findUnique({
      where: { deviceId },
      select: { id: true },
    });
    if (!player) {
      return NextResponse.json({ current: 0, best: 0, totalDays: 0 });
    }
    const dates = await prisma.gameResult.findMany({
      where: { playerId: player.id },
      select: { playedAt: true },
    });
    const streaks = computeStreaks(dates.map((d) => d.playedAt.toISOString().slice(0, 10)));
    return NextResponse.json(streaks);
  } catch (error) {
    console.error("GET /api/streak failed:", error);
    return NextResponse.json({ backend: "unavailable" }, { status: 503 });
  }
}
