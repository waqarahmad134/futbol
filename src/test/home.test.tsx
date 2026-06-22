import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Index from "@/pages/Index";

describe("home page", () => {
  it("has exactly one h1 containing the brand", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>,
    );
    const h1s = screen.queryAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).toMatch(/Futbol11/i);
  });

  it("injects FAQPage and ItemList structured data", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>,
    );
    const ld = document.getElementById("route-jsonld");
    expect(ld?.textContent).toContain("FAQPage");
    expect(ld?.textContent).toContain("ItemList");
  });
});
