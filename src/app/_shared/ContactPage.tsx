import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import PageShell from "@/components/PageShell";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL, OG_IMAGE, SITE_PUBLISHED, SITE_MODIFIED } from "@/lib/site";
import type { Locale } from "@/i18n/locales";
import { hreflangAlternates, localizedUrl, localizePath } from "@/i18n/locales";
import { localizeStrings } from "@/i18n/dictionary";
import { DictionaryProvider } from "@/i18n/DictionaryContext";
import { rich } from "./rich";

export function contactMetadata(locale: Locale): Metadata {
  const t = localizeStrings(locale, "contact", {
    metaTitle: "Contact Us - Futbol11",
    metaDesc:
      "Get in touch with the Futbol11 team. Send feedback, report an issue, or suggest a new daily football game.",
  });
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: { canonical: localizedUrl("/contact", locale), languages: hreflangAlternates("/contact") },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      url: localizedUrl("/contact", locale),
      images: [OG_IMAGE],
    },
    twitter: { title: t.metaTitle, description: t.metaDesc, images: ["/og-image.webp"] },
  };
}

export default function ContactPage({ locale }: { locale: Locale }) {
  const t = localizeStrings(locale, "contact", {
    title: "Contact Us",
    intro:
      "We'd love to hear from you, whether it's feedback, a bug report, a correction to one of our trivia answers, or an idea for a brand-new game.",
    hEmail: "Email",
    pEmail:
      "The best way to reach us is by email. We read every message and aim to respond within a few business days. Email is our only contact channel, so please use the address below for all enquiries, including feedback, corrections and game ideas.",
    hBefore: "Before you write",
    pBefore:
      "Many questions are already answered on the site. The {faq} covers daily resets, mobile play, difficulty levels and the daily score. The {blog} explains how to play Wordle and the Football Grid step by step. If your answer is not there, write to us and we will help.",
    faqLink: "FAQ section on the home page",
    hInclude: "What to include",
    li1: "If reporting a bug, tell us which game, what happened, and what device and browser you used.",
    li2: "If suggesting a correction, include the game and the date you played it, plus the answer you think is wrong and why.",
    li3: "If pitching a new game, describe how it would play in a sentence or two, and which sport or competition it covers.",
    li4: "If your streak or daily score looks wrong, tell us which games you played and on which dates.",
    hWrong: "Report a wrong answer",
    pWrong:
      "Our trivia answers come from football records, but mistakes can slip in. If you spot one, send the game name, the date, and the correct answer with a source if you have one. We check every report and fix confirmed errors, so the next day's players get the right answer.",
    hElse: "Looking for something else?",
    pElse:
      "Read more {about}, review our {privacy} and {terms}, or head back to the {games}.",
    aboutLink: "about Futbol11",
    gamesLink: "games",
    updated: "Page last updated: November 9, 2026.",
  });
  const common = localizeStrings(locale, "common", {
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE_NAME}`,
    url: localizedUrl("/contact", locale),
    datePublished: SITE_PUBLISHED,
    dateModified: SITE_MODIFIED,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL, email: CONTACT_EMAIL },
  };

  return (
    <DictionaryProvider locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageShell title={t.title} intro={t.intro} locale={locale}>
        <h2>{t.hEmail}</h2>
        <p>{t.pEmail}</p>
        <p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 no-underline rounded-lg border border-border bg-muted/20 px-4 py-2.5 font-semibold text-foreground hover:border-game-card-border"
          >
            <Mail className="w-4 h-4 text-primary" /> {CONTACT_EMAIL}
          </a>
        </p>

        <h2>{t.hBefore}</h2>
        <p>
          {rich(t.pBefore, {
            faq: <Link href={`${localizePath("/", locale)}#faq`}>{t.faqLink}</Link>,
            blog: <Link href={localizePath("/blog", locale)}>blog</Link>,
          })}
        </p>

        <h2>{t.hInclude}</h2>
        <ul>
          <li>{t.li1}</li>
          <li>{t.li2}</li>
          <li>{t.li3}</li>
          <li>{t.li4}</li>
        </ul>

        <h2>{t.hWrong}</h2>
        <p>{t.pWrong}</p>

        <h2>{t.hElse}</h2>
        <p>
          {rich(t.pElse, {
            about: <Link href={localizePath("/about", locale)}>{t.aboutLink}</Link>,
            privacy: <Link href={localizePath("/privacy-policy", locale)}>{common.privacy}</Link>,
            terms: <Link href={localizePath("/terms", locale)}>{common.terms}</Link>,
            games: <Link href={localizePath("/", locale)}>{t.gamesLink}</Link>,
          })}
        </p>

        <p className="text-sm">{t.updated}</p>
      </PageShell>
    </DictionaryProvider>
  );
}
