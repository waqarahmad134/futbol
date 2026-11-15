import ContactPage, { contactMetadata } from "@/app/_shared/ContactPage";

export const metadata = contactMetadata("es");

export default function Page() {
  return <ContactPage locale="es" />;
}
