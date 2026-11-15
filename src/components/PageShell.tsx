import { ReactNode } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Locale } from "@/i18n/locales";
import { localizeStrings } from "@/i18n/dictionary";
import { localizePath } from "@/i18n/locales";

interface PageShellProps {
  title: string;
  intro?: string;
  /** Breadcrumb label shown after Home (defaults to title). */
  crumb?: string;
  /** Optional middle breadcrumb level, e.g. Blog for article pages. */
  parent?: { label: string; href: string };
  children: ReactNode;
  locale?: Locale;
}

// Shared layout for static content pages (About, Privacy, Terms, Contact).
const PageShell = ({ title, intro, crumb, parent, children, locale = "en" }: PageShellProps) => {
  const t = localizeStrings(locale, "common", { home: "Home" });
  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <main className="container max-w-3xl py-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <Link href={localizePath("/", locale)} className="hover:text-foreground transition-colors">{t.home}</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          {parent && (
            <>
              <Link href={localizePath(parent.href, locale)} className="hover:text-foreground transition-colors">{parent.label}</Link>
              <span className="mx-2" aria-hidden="true">/</span>
            </>
          )}
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
};

export default PageShell;
