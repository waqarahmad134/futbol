import { describe, it, expect, vi, beforeEach } from "vitest";
import { getDeviceId, recordGameResult } from "./backend";

describe("getDeviceId", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("generates an id once and reuses it", () => {
    const first = getDeviceId();
    expect(first).toBeTruthy();
    expect(getDeviceId()).toBe(first);
    expect(localStorage.getItem("futbol11-device-id")).toBe(first);
  });

  it("returns null when localStorage is unavailable", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("no storage");
    });
    expect(getDeviceId()).toBeNull();
  });
});

describe("recordGameResult", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("never throws and queues locally when the backend is unreachable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    await expect(recordGameResult("futbol11-wordle", true)).resolves.toBeUndefined();
    const queued = JSON.parse(localStorage.getItem("futbol11-pending-results") ?? "[]");
    expect(queued).toHaveLength(1);
    expect(queued[0].game).toBe("futbol11-wordle");
    expect(queued[0].won).toBe(true);
  });

  it("posts to /api/results/ and clears the queue when the backend answers", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
    await recordGameResult("futbol11-wordle", false, 4);
    expect(fetch).toHaveBeenCalledWith(
      "/api/results/",
      expect.objectContaining({ method: "POST" }),
    );
    expect(localStorage.getItem("futbol11-pending-results")).toBeNull();
  });
});
