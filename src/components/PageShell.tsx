import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageShellProps {
  title: string;
  intro?: string;
  /** Breadcrumb label shown after Home (defaults to title). */
  crumb?: string;
  children: ReactNode;
}

// Shared layout for static content pages (About, Privacy, Terms, Contact).
const PageShell = ({ title, intro, crumb, children }: PageShellProps) => (
  <div className="min-h-screen bg-background font-body">
    <Header />
    <main className="container max-w-3xl py-12">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-foreground">{crumb ?? title}</span>
      </nav>
      <h1 className="font-display text-3xl text-foreground mb-4">{title}</h1>
      {intro && <p className="text-muted-foreground mb-8 leading-relaxed">{intro}</p>}
      <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground text-muted-foreground">
        {children}
      </div>
    </main>
    <Footer />
  </div>
);

export default PageShell;
