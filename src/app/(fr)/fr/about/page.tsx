import AboutPage, { aboutMetadata } from "@/app/_shared/AboutPage";

export const metadata = aboutMetadata("fr");

export default function Page() {
  return <AboutPage locale="fr" />;
}
