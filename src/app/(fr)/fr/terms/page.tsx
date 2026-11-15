import TermsPage, { termsMetadata } from "@/app/_shared/TermsPage";

export const metadata = termsMetadata("fr");

export default function Page() {
  return <TermsPage locale="fr" />;
}
