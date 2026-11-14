import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL, OG_IMAGE, SITE_PUBLISHED, SITE_MODIFIED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service - Futbol11",
  description:
    "The terms and conditions for using Futbol11's free daily football games, including intellectual property, disclaimers and limitations of liability.",
  alternates: { canonical: "/terms/" },
  openGraph: {
    title: "Terms of Service - Futbol11",
    description:
      "The terms and conditions for using Futbol11's free daily football games, including intellectual property, disclaimers and limitations of liability.",
    url: `${SITE_URL}/terms/`,
    images: [OG_IMAGE],
  },
  twitter: {
    title: "Terms of Service - Futbol11",
    description:
      "The terms and conditions for using Futbol11's free daily football games, including intellectual property, disclaimers and limitations of liability.",
    images: ["/og-image.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service",
  url: `${SITE_URL}/terms/`,
  datePublished: SITE_PUBLISHED,
  dateModified: SITE_MODIFIED,
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

export default function TermsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageShell title="Terms of Service" crumb="Terms" intro="Last updated: November 9, 2026">
        <p>
          Welcome to Futbol11. By accessing or using this website (the "Site") you agree to be bound by
          these Terms of Service. If you do not agree with any part of these terms, please do not use
          the Site.
        </p>

        <h2>Use of the Site</h2>
        <p>
          Futbol11 grants you a personal, non-exclusive, non-transferable licence to access and play
          our games for your own non-commercial entertainment. You agree not to misuse the Site,
          interfere with its normal operation, attempt to gain unauthorized access to any part of it,
          or use automated systems to scrape or overload our services.
        </p>

        <h2>Fair play</h2>
        <p>
          Play honestly. Do not use bots, scripts or other automated systems to play the games,
          submit fake results, or manipulate the streak and leaderboard. We may remove results that
          look automated or dishonest, and we may block access for repeated abuse.
        </p>

        <h2>Game results and leaderboards</h2>
        <p>
          When you finish a game, your result may be recorded against a random device ID so your
          streak and leaderboard position can be tracked. No name, email address or account is
          involved, and the leaderboard shows only anonymous player labels. See our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link> for how this data is handled.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The Site, its games, design, text, graphics and logos are the property of Futbol11 or its
          licensors and are protected by intellectual property laws. Club names, competition names and
          player names are referenced for informational and editorial purposes; all related trademarks
          remain the property of their respective owners, and Futbol11 is not affiliated with or
          endorsed by them.
        </p>

        <h2>Disclaimer</h2>
        <p>
          The Site and all content are provided on an &quot;as is&quot; and &quot;as available&quot; basis without
          warranties of any kind, whether express or implied. While we strive for accuracy in our
          football facts and trivia, we do not guarantee that all content is complete, current or
          error-free. If you spot a wrong answer, please tell us through the{" "}
          <Link href="/contact">Contact page</Link> so we can check and fix it.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, Futbol11 shall not be liable for any indirect,
          incidental or consequential damages arising from your use of, or inability to use, the Site.
        </p>

        <h2>Third-party links and advertising</h2>
        <p>
          The Site may display advertising and contain links to third-party websites. We are not
          responsible for the content, products or practices of any third party. Your interactions
          with advertisers or linked sites are solely between you and that third party. See our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link> for how advertising cookies are used.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may revise these Terms of Service at any time. Continued use of the Site after changes are
          posted constitutes your acceptance of the updated terms.
        </p>

        <h2>Contact us</h2>
        <p>
          Questions about these terms? Email us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or visit our{" "}
          <Link href="/contact">Contact page</Link>.
        </p>
      </PageShell>
    </>
  );
}
