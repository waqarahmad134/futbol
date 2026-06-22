import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import PageShell from "@/components/PageShell";
import { useSeo } from "@/hooks/use-seo";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

const Contact = () => {
  useSeo({
    title: "Contact Us — Futbol11",
    description:
      "Get in touch with the Futbol11 team. Send feedback, report an issue, or suggest a new daily football game.",
    path: "/contact",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Futbol11",
      url: `${SITE_URL}/contact`,
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL, email: CONTACT_EMAIL },
    },
  });

  return (
    <PageShell
      title="Contact Us"
      intro="We'd love to hear from you — whether it's feedback, a bug report, a correction to one of our trivia answers, or an idea for a brand-new game."
    >
      <h2>Email</h2>
      <p>
        The best way to reach us is by email. We read every message and aim to respond within a few
        business days.
      </p>
      <p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex items-center gap-2 no-underline rounded-lg border border-border bg-muted/20 px-4 py-2.5 font-semibold text-foreground hover:border-game-card-border"
        >
          <Mail className="w-4 h-4 text-primary" /> {CONTACT_EMAIL}
        </a>
      </p>

      <h2>What to include</h2>
      <ul>
        <li>If reporting a bug, tell us which game and what happened.</li>
        <li>If suggesting a correction, include the game and the date you played it.</li>
        <li>If pitching a new game, describe how it would play in a sentence or two.</li>
      </ul>

      <h2>Looking for something else?</h2>
      <p>
        Read more <Link to="/about">about Futbol11</Link>, review our{" "}
        <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="/terms">Terms of Service</Link>,
        or head back to the <Link to="/">games</Link>.
      </p>
    </PageShell>
  );
};

export default Contact;
