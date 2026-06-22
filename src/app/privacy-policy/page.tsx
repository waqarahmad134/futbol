import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — Futbol11",
  description:
    "How Futbol11 handles data, cookies and third-party advertising, including the use of Google AdSense cookies, and how you can opt out of personalized ads.",
  alternates: { canonical: "/privacy-policy" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy",
  url: `${SITE_URL}/privacy-policy`,
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageShell title="Privacy Policy" crumb="Privacy Policy" intro="Last updated: June 22, 2026">
        <p>
          This Privacy Policy explains how Futbol11 ("we", "us" or "our") collects, uses and protects
          information when you visit <a href={SITE_URL}>{SITE_URL.replace("https://", "")}</a> (the
          "Site"). By using the Site you agree to the practices described here.
        </p>

        <h2>Information we collect</h2>
        <p>
          Futbol11 does not require you to create an account, and we do not ask for personal
          information such as your name, email address or payment details to play our games. Your game
          progress, daily score and preferences are stored locally in your browser using{" "}
          <strong>local storage</strong> — this data stays on your device and is not transmitted to
          our servers.
        </p>
        <p>
          Like most websites, our hosting provider and third-party services may automatically receive
          standard technical information such as your IP address, browser type, device type and the
          pages you visit. This information is used in aggregate to keep the Site secure and to
          understand how it is used.
        </p>

        <h2>Cookies and local storage</h2>
        <p>
          Cookies are small text files placed on your device. We use local storage to remember your
          in-game progress. Third-party partners, including advertising and analytics providers, may
          also set cookies as described below. You can control or delete cookies through your browser
          settings; disabling them will not stop you from playing, but some preferences may not be
          remembered between visits.
        </p>

        <h2>Advertising and Google AdSense</h2>
        <p>
          We use third-party advertising companies, including <strong>Google AdSense</strong>, to
          serve ads when you visit the Site. These partners help keep Futbol11 free to play.
        </p>
        <ul>
          <li>
            Third-party vendors, including Google, use cookies to serve ads based on your prior visits
            to this and other websites.
          </li>
          <li>
            Google's use of advertising cookies enables it and its partners to serve ads to you based
            on your visit to our Site and/or other sites on the Internet.
          </li>
          <li>
            You may opt out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>
            .
          </li>
          <li>
            You can also opt out of a third-party vendor's use of cookies for personalized advertising
            by visiting{" "}
            <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
              www.aboutads.info
            </a>
            .
          </li>
          <li>
            For more information on how Google uses data when you use our partners' sites or apps, see{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google's Privacy &amp; Terms
            </a>
            .
          </li>
        </ul>

        <h2>Analytics</h2>
        <p>
          We may use privacy-respecting analytics tools to understand aggregate, anonymized usage of
          the Site (for example, which games are most popular). These tools do not identify you
          personally.
        </p>

        <h2>Children's privacy</h2>
        <p>
          Futbol11 is intended for a general audience and is not directed at children under the age of
          13. We do not knowingly collect personal information from children. If you believe a child
          has provided us with personal information, please contact us so we can remove it.
        </p>

        <h2>Your choices</h2>
        <p>
          When you first visit, a cookie banner lets you accept or reject non-essential (advertising
          and analytics) cookies. Until you accept, these are disabled by default through Google
          Consent Mode. You can change your decision at any time by clearing this Site's browser
          storage, which makes the banner appear again. You can also manage cookies through your
          browser settings, opt out of personalized ads using the links above, and clear your locally
          stored game data the same way.
        </p>

        <h2>Third-party links</h2>
        <p>
          The Site may contain links to other websites. We are not responsible for the privacy
          practices of those sites and encourage you to read their privacy policies.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page
          with an updated "Last updated" date.
        </p>

        <h2>Contact us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or via our{" "}
          <Link href="/contact">Contact page</Link>.
        </p>
      </PageShell>
    </>
  );
}
