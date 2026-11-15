import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL, OG_IMAGE, SITE_PUBLISHED, SITE_MODIFIED } from "@/lib/site";
import type { Locale } from "@/i18n/locales";
import { hreflangAlternates, localizedUrl, localizePath } from "@/i18n/locales";
import { localizeStrings } from "@/i18n/dictionary";
import { DictionaryProvider } from "@/i18n/DictionaryContext";
import { rich } from "./rich";

export function privacyMetadata(locale: Locale): Metadata {
  const t = localizeStrings(locale, "privacy", {
    metaTitle: "Privacy Policy - Futbol11",
    metaDesc:
      "How Futbol11 handles data, cookies and third-party advertising, including the use of Google AdSense cookies, and how you can opt out of personalized ads.",
  });
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: { canonical: localizedUrl("/privacy-policy", locale), languages: hreflangAlternates("/privacy-policy") },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      url: localizedUrl("/privacy-policy", locale),
      images: [OG_IMAGE],
    },
    twitter: { title: t.metaTitle, description: t.metaDesc, images: ["/og-image.webp"] },
  };
}

export default function PrivacyPage({ locale }: { locale: Locale }) {
  const t = localizeStrings(locale, "privacy", {
    title: "Privacy Policy",
    intro: "Last updated: November 9, 2026",
    pIntro:
      "This Privacy Policy explains how Futbol11 (\"we\", \"us\" or \"our\") collects, uses and protects information when you visit {site} (the \"Site\"). By using the Site you agree to the practices described here.",
    hCollect: "Information we collect",
    pCollect1:
      "Futbol11 does not require you to create an account, and we do not ask for personal information such as your name, email address or payment details to play our games. Your game progress, daily score and preferences are stored locally in your browser using local storage. Game results may also be sent to our server as described in the \"Game results, streaks and leaderboard\" section below, using only a random device ID and never your name or email.",
    pCollect2:
      "Like most websites, our hosting provider and third-party services may automatically receive standard technical information such as your IP address, browser type, device type and the pages you visit. This information is used in aggregate to keep the Site secure and to understand how it is used.",
    hResults: "Game results, streaks and leaderboard",
    pResults1:
      "When you finish a game, your browser may send the result to our server: the game name, whether you won, and your score. It is sent with a random device ID that your browser creates, not with your name, email address or any account. We use these results only to run your streak, which counts the consecutive days you played, and the leaderboard, which ranks the top players by wins and best streak.",
    pResults2:
      "The leaderboard shows anonymous labels taken from the device ID, such as \"Player 7F3A1C9E\", never your name. If the server cannot be reached, results wait in your browser and are sent later. Clearing your browser storage removes your local progress and resets the device ID, which starts a fresh streak and leaderboard entry.",
    hCookies: "Cookies and local storage",
    pCookies:
      "Cookies are small text files placed on your device. We use local storage to remember your in-game progress. Third-party partners, including advertising and analytics providers, may also set cookies as described below. You can control or delete cookies through your browser settings; disabling them will not stop you from playing, but some preferences may not be remembered between visits.",
    hAds: "Advertising and Google AdSense",
    pAds:
      "We use third-party advertising companies, including Google AdSense, to serve ads when you visit the Site. These partners help keep Futbol11 free to play.",
    li1: "Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this and other websites.",
    li2: "Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our Site and/or other sites on the Internet.",
    li3: "You may opt out of personalized advertising by visiting {adsSettings}.",
    adsSettings: "Google Ads Settings",
    li4: "You can also opt out of a third-party vendor's use of cookies for personalized advertising by visiting {aboutAds}.",
    aboutAds: "www.aboutads.info",
    li5: "For more information on how Google uses data when you use our partners' sites or apps, see {googlePrivacy}.",
    googlePrivacy: "Google's Privacy & Terms",
    hAnalytics: "Analytics",
    pAnalytics:
      "We may use privacy-respecting analytics tools to understand aggregate, anonymized usage of the Site (for example, which games are most popular). These tools do not identify you personally.",
    hChildren: "Children's privacy",
    pChildren:
      "Futbol11 is intended for a general audience and is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can remove it.",
    hChoices: "Your choices",
    pChoices:
      "When you first visit, a cookie banner lets you accept or reject non-essential (advertising and analytics) cookies. Until you accept, these are disabled by default through Google Consent Mode. You can change your decision at any time by clearing this Site's browser storage, which makes the banner appear again. You can also manage cookies through your browser settings, opt out of personalized ads using the links above, and clear your locally stored game data the same way.",
    hThird: "Third-party links",
    pThird:
      "The Site may contain links to other websites. We are not responsible for the privacy practices of those sites and encourage you to read their privacy policies.",
    hChanges: "Changes to this policy",
    pChanges:
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated \"Last updated\" date.",
    hContact: "Contact us",
    pContact:
      "If you have any questions about this Privacy Policy, please contact us at {email} or via our {contact}.",
    contactPage: "Contact page",
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.title,
    url: localizedUrl("/privacy-policy", locale),
    datePublished: SITE_PUBLISHED,
    dateModified: SITE_MODIFIED,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <DictionaryProvider locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageShell title={t.title} crumb={t.title} intro={t.intro} locale={locale}>
        <p>{rich(t.pIntro, { site: <a href={SITE_URL}>{SITE_URL.replace("https://", "")}</a> })}</p>

        <h2>{t.hCollect}</h2>
        <p>{t.pCollect1}</p>
        <p>{t.pCollect2}</p>

        <h2>{t.hResults}</h2>
        <p>{t.pResults1}</p>
        <p>{t.pResults2}</p>

        <h2>{t.hCookies}</h2>
        <p>{t.pCookies}</p>

        <h2>{t.hAds}</h2>
        <p>{t.pAds}</p>
        <ul>
          <li>{t.li1}</li>
          <li>{t.li2}</li>
          <li>{rich(t.li3, { adsSettings: <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">{t.adsSettings}</a> })}</li>
          <li>{rich(t.li4, { aboutAds: <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">{t.aboutAds}</a> })}</li>
          <li>{rich(t.li5, { googlePrivacy: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">{t.googlePrivacy}</a> })}</li>
        </ul>

        <h2>{t.hAnalytics}</h2>
        <p>{t.pAnalytics}</p>

        <h2>{t.hChildren}</h2>
        <p>{t.pChildren}</p>

        <h2>{t.hChoices}</h2>
        <p>{t.pChoices}</p>

        <h2>{t.hThird}</h2>
        <p>{t.pThird}</p>

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
