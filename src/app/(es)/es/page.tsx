import HomePage, { homeMetadata } from "@/app/_shared/HomePage";

export const metadata = homeMetadata("es");

export default function Page() {
  return <HomePage locale="es" />;
}
