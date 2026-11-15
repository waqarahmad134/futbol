"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_SHORT, getLocaleFromPath, switcherHref } from "@/i18n/locales";

// Language switcher: links to the same page in each locale, or to the
// locale homepage when the current page has no translation (e.g. blog
// articles, which stay English).
const LanguageSwitcher = () => {
  const pathname = usePathname();
  const current = getLocaleFromPath(pathname);

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
      {LOCALES.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={switcherHref(pathname, locale)}
            aria-current={active ? "true" : undefined}
            className={`rounded-md px-2 py-1 text-xs font-semibold transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            {LOCALE_SHORT[locale]}
          </Link>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
