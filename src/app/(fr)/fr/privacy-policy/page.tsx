import PrivacyPage, { privacyMetadata } from "@/app/_shared/PrivacyPage";

export const metadata = privacyMetadata("fr");

export default function Page() {
  return <PrivacyPage locale="fr" />;
}
