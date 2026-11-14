import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { computeStreaks } from "@/lib/streak";

export const dynamic = "force-dynamic";

// POST /api/results
// Body: { deviceId, game, won, score? }
// Upserts the anonymous player by deviceId, records the result and
// returns the updated cross-game streak. Without DATABASE_URL it
// answers { backend: "unavailable" } and the client keeps the result
// in localStorage instead.
export async function POST(req: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ backend: "unavailable" }, { status: 503 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const { deviceId, game, won, score } = body as {
    deviceId?: unknown;
    game?: unknown;
    won?: unknown;
    score?: unknown;
  };
  if (typeof deviceId !== "string" || deviceId.length < 8 || deviceId.length > 64) {
    return NextResponse.json({ error: "deviceId is required" }, { status: 400 });
  }
  if (typeof game !== "string" || game.length < 1 || game.length > 80) {
    return NextResponse.json({ error: "game is required" }, { status: 400 });
  }
  if (typeof won !== "boolean") {
    return NextResponse.json({ error: "won must be true or false" }, { status: 400 });
  }
  const cleanScore =
    typeof score === "number" && Number.isInteger(score) && score >= 0 && score <= 1000000
      ? score
      : null;
  try {
    const player = await prisma.player.upsert({
      where: { deviceId },
      update: {},
      create: { deviceId },
    });
    await prisma.gameResult.create({
      data: { playerId: player.id, game, won, score: cleanScore },
    });
    const dates = await prisma.gameResult.findMany({
      where: { playerId: player.id },
      select: { playedAt: true },
    });
    const streaks = computeStreaks(dates.map((d) => d.playedAt.toISOString().slice(0, 10)));
    return NextResponse.json({
      ok: true,
      currentStreak: streaks.current,
      bestStreak: streaks.best,
      totalDays: streaks.totalDays,
    });
  } catch (error) {
    console.error("POST /api/results failed:", error);
    return NextResponse.json({ backend: "unavailable" }, { status: 503 });
  }
}
