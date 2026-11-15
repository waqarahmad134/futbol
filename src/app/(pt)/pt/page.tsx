import HomePage, { homeMetadata } from "@/app/_shared/HomePage";

export const metadata = homeMetadata("pt");

export default function Page() {
  return <HomePage locale="pt" />;
}
