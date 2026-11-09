// Client-side backend helper. Every call is fire-and-forget and
// never throws: if the backend is off (no DATABASE_URL on the server)
// or the network fails, results are queued in localStorage and the
// game carries on exactly as it does today.
//
// NOTE: the site uses trailingSlash, so Next redirects /api/results
// to /api/results/ (308). These calls use the trailing-slash URLs
// directly to skip the redirect hop.
const DEVICE_KEY = "futbol11-device-id";
const PENDING_KEY = "futbol11-pending-results";
const MAX_PENDING = 50;

export interface PendingResult {
  game: string;
  won: boolean;
  score?: number;
  at: number;
}

export interface ServerStreak {
  current: number;
  best: number;
  totalDays: number;
}

export interface LeaderboardEntry {
  rank: number;
  player: string;
  wins: number;
  bestStreak: number;
}

export function getDeviceId(): string | null {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        id = crypto.randomUUID();
      } else {
        id = `dev-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      }
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

function readPending(): PendingResult[] {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writePending(items: PendingResult[]): void {
  try {
    if (items.length === 0) localStorage.removeItem(PENDING_KEY);
    else localStorage.setItem(PENDING_KEY, JSON.stringify(items.slice(0, MAX_PENDING)));
  } catch {
    // localStorage full or unavailable; the queue is best effort only.
  }
}

async function postResult(deviceId: string, item: PendingResult): Promise<boolean> {
  const res = await fetch("/api/results/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      deviceId,
      game: item.game,
      won: item.won,
      score: item.score,
    }),
  });
  return res.ok;
}

export async function recordGameResult(
  gameSlug: string,
  won: boolean,
  score?: number,
): Promise<void> {
  try {
    const deviceId = getDeviceId();
    if (!deviceId) return;
    const item: PendingResult = { game: gameSlug, won, score, at: Date.now() };
    // First try to flush anything queued while the backend was off.
    const pending = readPending();
    const stillPending: PendingResult[] = [];
    for (const queued of pending) {
      try {
        const sent = await postResult(deviceId, queued);
        if (!sent) stillPending.push(queued);
      } catch {
        stillPending.push(queued);
      }
    }
    try {
      const sent = await postResult(deviceId, item);
      if (!sent) stillPending.push(item);
    } catch {
      stillPending.push(item);
    }
    writePending(stillPending);
  } catch {
    // Never throw, never block the game.
  }
}

export async function getServerStreak(): Promise<ServerStreak | null> {
  try {
    const deviceId = getDeviceId();
    if (!deviceId) return null;
    const res = await fetch(`/api/streak/?deviceId=${encodeURIComponent(deviceId)}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.backend === "unavailable") return null;
    if (typeof data.current !== "number" || typeof data.best !== "number") return null;
    return {
      current: data.current,
      best: data.best,
      totalDays: typeof data.totalDays === "number" ? data.totalDays : 0,
    };
  } catch {
    return null;
  }
}

export async function getLeaderboard(): Promise<LeaderboardEntry[] | null> {
  try {
    const res = await fetch("/api/leaderboard/");
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.backend === "unavailable") return null;
    if (!Array.isArray(data.entries)) return null;
    return data.entries as LeaderboardEntry[];
  } catch {
    return null;
  }
}
