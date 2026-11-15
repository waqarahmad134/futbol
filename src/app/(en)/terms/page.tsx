import TermsPage, { termsMetadata } from "@/app/_shared/TermsPage";

export const metadata = termsMetadata("en");

export default function Page() {
  return <TermsPage locale="en" />;
}
