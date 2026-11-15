import ContactPage, { contactMetadata } from "@/app/_shared/ContactPage";

export const metadata = contactMetadata("en");

export default function Page() {
  return <ContactPage locale="en" />;
}
