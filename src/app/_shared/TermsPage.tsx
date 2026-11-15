import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL, OG_IMAGE, SITE_PUBLISHED, SITE_MODIFIED } from "@/lib/site";
import type { Locale } from "@/i18n/locales";
import { hreflangAlternates, localizedUrl, localizePath } from "@/i18n/locales";
import { localizeStrings } from "@/i18n/dictionary";
import { DictionaryProvider } from "@/i18n/DictionaryContext";
import { rich } from "./rich";

export function termsMetadata(locale: Locale): Metadata {
  const t = localizeStrings(locale, "terms", {
    metaTitle: "Terms of Service - Futbol11",
    metaDesc:
      "The terms and conditions for using Futbol11's free daily football games, including intellectual property, disclaimers and limitations of liability.",
  });
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: { canonical: localizedUrl("/terms", locale), languages: hreflangAlternates("/terms") },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      url: localizedUrl("/terms", locale),
      images: [OG_IMAGE],
    },
    twitter: { title: t.metaTitle, description: t.metaDesc, images: ["/og-image.webp"] },
  };
}

export default function TermsPage({ locale }: { locale: Locale }) {
  const t = localizeStrings(locale, "terms", {
    title: "Terms of Service",
    crumb: "Terms",
    intro: "Last updated: November 9, 2026",
    pIntro:
      "Welcome to Futbol11. By accessing or using this website (the \"Site\") you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the Site.",
    hUse: "Use of the Site",
    pUse:
      "Futbol11 grants you a personal, non-exclusive, non-transferable licence to access and play our games for your own non-commercial entertainment. You agree not to misuse the Site, interfere with its normal operation, attempt to gain unauthorized access to any part of it, or use automated systems to scrape or overload our services.",
    hFair: "Fair play",
    pFair:
      "Play honestly. Do not use bots, scripts or other automated systems to play the games, submit fake results, or manipulate the streak and leaderboard. We may remove results that look automated or dishonest, and we may block access for repeated abuse.",
    hResults: "Game results and leaderboards",
    pResults:
      "When you finish a game, your result may be recorded against a random device ID so your streak and leaderboard position can be tracked. No name, email address or account is involved, and the leaderboard shows only anonymous player labels. See our {privacy} for how this data is handled.",
    hIp: "Intellectual property",
    pIp:
      "The Site, its games, design, text, graphics and logos are the property of Futbol11 or its licensors and are protected by intellectual property laws. Club names, competition names and player names are referenced for informational and editorial purposes; all related trademarks remain the property of their respective owners, and Futbol11 is not affiliated with or endorsed by them.",
    hDisclaimer: "Disclaimer",
    pDisclaimer:
      "The Site and all content are provided on an \"as is\" and \"as available\" basis without warranties of any kind, whether express or implied. While we strive for accuracy in our football facts and trivia, we do not guarantee that all content is complete, current or error-free. If you spot a wrong answer, please tell us through the {contact} so we can check and fix it.",
    hLiability: "Limitation of liability",
    pLiability:
      "To the fullest extent permitted by law, Futbol11 shall not be liable for any indirect, incidental or consequential damages arising from your use of, or inability to use, the Site.",
    hThird: "Third-party links and advertising",
    pThird:
      "The Site may display advertising and contain links to third-party websites. We are not responsible for the content, products or practices of any third party. Your interactions with advertisers or linked sites are solely between you and that third party. See our {privacy} for how advertising cookies are used.",
    hChanges: "Changes to these terms",
    pChanges:
      "We may revise these Terms of Service at any time. Continued use of the Site after changes are posted constitutes your acceptance of the updated terms.",
    hContact: "Contact us",
    pContact:
      "Questions about these terms? Email us at {email} or visit our {contact}.",
    contactPage: "Contact page",
  });
  const privacyLabel = localizeStrings(locale, "common", { privacy: "Privacy Policy" }).privacy;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.title,
    url: localizedUrl("/terms", locale),
    datePublished: SITE_PUBLISHED,
    dateModified: SITE_MODIFIED,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <DictionaryProvider locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageShell title={t.title} crumb={t.crumb} intro={t.intro} locale={locale}>
        <p>{t.pIntro}</p>

        <h2>{t.hUse}</h2>
        <p>{t.pUse}</p>

        <h2>{t.hFair}</h2>
        <p>{t.pFair}</p>

        <h2>{t.hResults}</h2>
        <p>{rich(t.pResults, { privacy: <Link href={localizePath("/privacy-policy", locale)}>{privacyLabel}</Link> })}</p>

        <h2>{t.hIp}</h2>
        <p>{t.pIp}</p>

        <h2>{t.hDisclaimer}</h2>
        <p>{rich(t.pDisclaimer, { contact: <Link href={localizePath("/contact", locale)}>{t.contactPage}</Link> })}</p>

        <h2>{t.hLiability}</h2>
        <p>{t.pLiability}</p>

        <h2>{t.hThird}</h2>
        <p>{rich(t.pThird, { privacy: <Link href={localizePath("/privacy-policy", locale)}>{privacyLabel}</Link> })}</p>

        <h2>{t.hChanges}</h2>
        <p>{t.pChanges}</p>

        <h2>{t.hContact}</h2>
        <p>
          {rich(t.pContact, {
            email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>,
            contact: <Link href={localizePath("/contact", locale)}>{t.contactPage}</Link>,
          })}
        </p>
      </PageShell>
    </DictionaryProvider>
  );
}
