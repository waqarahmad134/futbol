import HomePage, { homeMetadata } from "@/app/_shared/HomePage";

export const metadata = homeMetadata("en");

export default function Page() {
  return <HomePage locale="en" />;
}
