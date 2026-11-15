import HomePage, { homeMetadata } from "@/app/_shared/HomePage";

export const metadata = homeMetadata("fr");

export default function Page() {
  return <HomePage locale="fr" />;
}
