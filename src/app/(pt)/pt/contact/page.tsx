import ContactPage, { contactMetadata } from "@/app/_shared/ContactPage";

export const metadata = contactMetadata("pt");

export default function Page() {
  return <ContactPage locale="pt" />;
}
