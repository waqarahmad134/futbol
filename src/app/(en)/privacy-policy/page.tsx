import PrivacyPage, { privacyMetadata } from "@/app/_shared/PrivacyPage";

export const metadata = privacyMetadata("en");

export default function Page() {
  return <PrivacyPage locale="en" />;
}
