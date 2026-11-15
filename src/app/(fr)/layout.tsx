import { DictionaryProvider } from "@/i18n/DictionaryContext";

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return <DictionaryProvider locale="fr">{children}</DictionaryProvider>;
}
