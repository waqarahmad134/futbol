import AboutPage, { aboutMetadata } from "@/app/_shared/AboutPage";

export const metadata = aboutMetadata("pt");

export default function Page() {
  return <AboutPage locale="pt" />;
}
