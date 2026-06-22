import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import HigherLowerGame from "@/components/games/HigherLowerGame";
import { getDailySequence } from "@/data/higher-lower";

describe("HigherLowerGame", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the first matchup with the current player's goals visible", () => {
    render(<HigherLowerGame />);
    const seq = getDailySequence();

    // Current player's name and goal total are shown.
    expect(screen.getByText(seq[0].name)).toBeInTheDocument();
    expect(screen.getByText(String(seq[0].goals))).toBeInTheDocument();

    // The next player's name is shown but its total is hidden behind a "?".
    expect(screen.getByText(seq[1].name)).toBeInTheDocument();
    expect(screen.getByText("?")).toBeInTheDocument();

    // Both guess controls are available.
    expect(screen.getByRole("button", { name: /higher/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /lower/i })).toBeInTheDocument();
  });

  it("reveals the next player's goals after a guess", () => {
    render(<HigherLowerGame />);
    const seq = getDailySequence();

    fireEvent.click(screen.getByRole("button", { name: /higher/i }));

    // After guessing, the hidden total is revealed somewhere on screen.
    const matches = screen.getAllByText(String(seq[1].goals));
    expect(matches.length).toBeGreaterThan(0);
  });

  it("starts the streak at zero", () => {
    render(<HigherLowerGame />);
    const streak = screen.getByText(/Streak/i);
    expect(within(streak).getByText(/Streak\s*0/i) ?? streak).toBeTruthy();
    expect(streak.textContent).toMatch(/Streak\s*0/);
  });
});
