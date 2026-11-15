"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getLocaleFromPath, localizePath, stripLocalePrefix } from "@/i18n/locales";

// Navigates to an in-page section by id. Works from any route:
// - On the home page it smooth-scrolls to the section.
// - From another route (e.g. a game page) it navigates home with the hash;
//   the home page's HashScroll then scrolls to the section once it mounts.
// The home page is the current locale's home (e.g. /pt for Portuguese).
export function useSectionNav() {
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (id: string) => {
      const locale = getLocaleFromPath(pathname);
      const homePath = localizePath("/", locale);
      if (stripLocalePrefix(pathname) !== "/") {
        router.push(`${homePath}#${id}`);
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#${id}`);
      }
    },
    [router, pathname],
  );
}
