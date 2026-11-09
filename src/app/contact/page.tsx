import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import PageShell from "@/components/PageShell";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL, OG_IMAGE, SITE_PUBLISHED, SITE_MODIFIED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us - Futbol11",
  description:
    "Get in touch with the Futbol11 team. Send feedback, report an issue, or suggest a new daily football game.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact Us - Futbol11",
    description:
      "Get in touch with the Futbol11 team. Send feedback, report an issue, or suggest a new daily football game.",
    url: `${SITE_URL}/contact/`,
    images: [OG_IMAGE],
  },
  twitter: {
    title: "Contact Us - Futbol11",
    description:
      "Get in touch with the Futbol11 team. Send feedback, report an issue, or suggest a new daily football game.",
    images: ["/og-image.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Futbol11",
  url: `${SITE_URL}/contact/`,
  datePublished: SITE_PUBLISHED,
  dateModified: SITE_MODIFIED,
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL, email: CONTACT_EMAIL },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageShell
        title="Contact Us"
        intro="We'd love to hear from you, whether it's feedback, a bug report, a correction to one of our trivia answers, or an idea for a brand-new game."
      >
        <h2>Email</h2>
        <p>
          The best way to reach us is by email. We read every message and aim to respond within a few
          business days. Email is our only contact channel, so please use the address below for all
          enquiries, including feedback, corrections and game ideas.
        </p>
        <p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 no-underline rounded-lg border border-border bg-muted/20 px-4 py-2.5 font-semibold text-foreground hover:border-game-card-border"
          >
            <Mail className="w-4 h-4 text-primary" /> {CONTACT_EMAIL}
          </a>
        </p>

        <h2>Before you write</h2>
        <p>
          Many questions are already answered on the site. The{" "}
          <Link href="/#faq">FAQ section on the home page</Link> covers daily resets, mobile play,
          difficulty levels and the daily score. The <Link href="/blog">blog</Link> explains how to
          play Wordle and the Football Grid step by step. If your answer is not there, write to us
          and we will help.
        </p>

        <h2>What to include</h2>
        <ul>
          <li>If reporting a bug, tell us which game, what happened, and what device and browser you used.</li>
          <li>If suggesting a correction, include the game and the date you played it, plus the answer you think is wrong and why.</li>
          <li>If pitching a new game, describe how it would play in a sentence or two, and which sport or competition it covers.</li>
          <li>If your streak or daily score looks wrong, tell us which games you played and on which dates.</li>
        </ul>

        <h2>Report a wrong answer</h2>
        <p>
          Our trivia answers come from football records, but mistakes can slip in. If you spot one,
          send the game name, the date, and the correct answer with a source if you have one. We
          check every report and fix confirmed errors, so the next day&apos;s players get the right
          answer.
        </p>

        <h2>Looking for something else?</h2>
        <p>
          Read more <Link href="/about">about Futbol11</Link>, review our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
          <Link href="/terms">Terms of Service</Link>, or head back to the{" "}
          <Link href="/">games</Link>.
        </p>

        <p className="text-sm">Page last updated: November 9, 2026.</p>
      </PageShell>
    </>
  );
}
