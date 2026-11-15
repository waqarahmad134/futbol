import ContactPage, { contactMetadata } from "@/app/_shared/ContactPage";

export const metadata = contactMetadata("fr");

export default function Page() {
  return <ContactPage locale="fr" />;
}
