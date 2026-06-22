import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import About from "@/pages/About";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import Contact from "@/pages/Contact";

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("content pages", () => {
  it("About renders its H1 and sets the document title", () => {
    renderWithRouter(<About />);
    expect(screen.getByRole("heading", { level: 1, name: /About Futbol11/i })).toBeInTheDocument();
    expect(document.title).toMatch(/About Futbol11/);
  });

  it("Privacy Policy discloses Google AdSense cookie usage (required for AdSense)", () => {
    renderWithRouter(<PrivacyPolicy />);
    expect(screen.getByRole("heading", { level: 1, name: /Privacy Policy/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Google AdSense/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/contact@futbol11\.live/i).length).toBeGreaterThan(0);
  });

  it("Terms renders its H1", () => {
    renderWithRouter(<Terms />);
    expect(screen.getByRole("heading", { level: 1, name: /Terms of Service/i })).toBeInTheDocument();
  });

  it("Contact shows the contact email", () => {
    renderWithRouter(<Contact />);
    expect(screen.getAllByText(/contact@futbol11\.live/i).length).toBeGreaterThan(0);
  });

  it("injects route-level JSON-LD structured data", () => {
    renderWithRouter(<PrivacyPolicy />);
    const ld = document.getElementById("route-jsonld");
    expect(ld).not.toBeNull();
    expect(ld?.textContent).toContain("WebPage");
  });
});
