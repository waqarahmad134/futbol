import AboutPage, { aboutMetadata } from "@/app/_shared/AboutPage";

export const metadata = aboutMetadata("en");

export default function Page() {
  return <AboutPage locale="en" />;
}
